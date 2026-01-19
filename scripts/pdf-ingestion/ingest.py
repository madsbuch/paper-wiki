#!/usr/bin/env python3
"""
PDF Ingestion Pipeline with Embeddings and Vector Search

Ingests PDF files into SQLite database with:
- Text extraction with page tracking
- Metadata extraction (title, authors, year, arXiv ID)
- Semantic chunking with overlap
- OpenAI embeddings for vector search
- sqlite-vec for similarity search

Usage:
    # Ingest single PDF
    python ingest.py /path/to/paper.pdf

    # Ingest directory of PDFs
    python ingest.py /path/to/papers/

    # Search the database
    python ingest.py --search "attention mechanisms in transformers"
"""

import os
import sys
import re
import json
import sqlite3
import struct
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Tuple, Optional
import argparse

# Load .env file if it exists
def load_env_file():
    """Load environment variables from .env file in project root."""
    # Look for .env in project root (two levels up from this script)
    env_path = Path(__file__).parent.parent.parent / ".env"
    if env_path.exists():
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    # Remove quotes if present
                    value = value.strip().strip('"').strip("'")
                    os.environ[key] = value

load_env_file()

# Third-party imports
try:
    import pdfplumber
    from openai import OpenAI
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    import tiktoken
    import numpy as np
except ImportError as e:
    print(f"Missing required package: {e}")
    print("\nInstall required packages:")
    print("  pip install pdfplumber openai langchain-text-splitters tiktoken numpy")
    sys.exit(1)

# Configuration
DB_PATH = Path(__file__).parent / "papers.db"
EMBEDDING_MODEL = "text-embedding-3-small"
EMBEDDING_DIMENSION = 1536
CHUNK_SIZE = 1000  # characters
CHUNK_OVERLAP = 200  # characters
MAX_TOKENS_PER_CHUNK = 8000  # OpenAI limit is 8191


class PDFIngestionPipeline:
    """Pipeline for ingesting PDFs into searchable database."""

    def __init__(self, db_path: Path = DB_PATH):
        self.db_path = db_path
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.encoding = tiktoken.get_encoding("cl100k_base")
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=CHUNK_SIZE,
            chunk_overlap=CHUNK_OVERLAP,
            separators=["\n\n", "\n", ". ", " ", ""],
            length_function=len,
        )
        self._init_database()

    def _init_database(self):
        """Initialize database with schema."""
        conn = sqlite3.connect(self.db_path)

        # Read and execute schema
        schema_path = Path(__file__).parent / "schema.sql"
        with open(schema_path) as f:
            conn.executescript(f.read())

        # Create embeddings table as a regular table (not virtual table)
        # Store embeddings as BLOB for portability
        conn.execute("""
            CREATE TABLE IF NOT EXISTS embeddings (
                chunk_id INTEGER PRIMARY KEY,
                embedding BLOB NOT NULL,
                FOREIGN KEY (chunk_id) REFERENCES chunks(id) ON DELETE CASCADE
            )
        """)

        conn.commit()
        conn.close()

    def extract_text_from_pdf(self, pdf_path: Path) -> List[Dict]:
        """Extract text from PDF with page numbers.

        Returns:
            List of dicts with 'page' and 'text' keys
        """
        pages = []
        with pdfplumber.open(pdf_path) as pdf:
            for i, page in enumerate(pdf.pages, start=1):
                text = page.extract_text() or ""
                if text.strip():
                    pages.append({"page": i, "text": text})
        return pages

    def extract_metadata(self, pages: List[Dict], filename: str) -> Dict:
        """Extract metadata from PDF text.

        Uses heuristics to extract:
        - Title (usually first large text block)
        - Authors (often follows title)
        - Year (4-digit number in first pages)
        - arXiv ID (if present in filename or text)
        """
        metadata = {
            "title": None,
            "authors": None,
            "year": None,
            "arxiv_id": None,
        }

        if not pages:
            return metadata

        # Combine first 2 pages for metadata extraction
        first_pages_text = "\n".join(p["text"] for p in pages[:2])
        lines = [l.strip() for l in first_pages_text.split("\n") if l.strip()]

        # Extract arXiv ID from filename
        arxiv_match = re.search(r'(\d{4}\.\d{4,5})(v\d+)?', filename)
        if arxiv_match:
            metadata["arxiv_id"] = arxiv_match.group(0)

        # Extract arXiv ID from text
        if not metadata["arxiv_id"]:
            arxiv_match = re.search(r'arXiv:(\d{4}\.\d{4,5})(v\d+)?', first_pages_text, re.IGNORECASE)
            if arxiv_match:
                metadata["arxiv_id"] = arxiv_match.group(1) + (arxiv_match.group(2) or "")

        # Extract year (4-digit number, likely 19xx or 20xx)
        year_match = re.search(r'\b(19|20)\d{2}\b', first_pages_text)
        if year_match:
            metadata["year"] = int(year_match.group(0))

        # Extract title (first substantial line, usually capitalized)
        for line in lines[:10]:
            if len(line) > 20 and len(line) < 200:
                # Skip common header text
                if not any(skip in line.lower() for skip in ["preprint", "accepted", "published", "conference"]):
                    metadata["title"] = line
                    break

        # Extract authors (often follows title, contains names)
        if metadata["title"]:
            title_idx = next((i for i, l in enumerate(lines) if metadata["title"] in l), -1)
            if title_idx >= 0 and title_idx + 1 < len(lines):
                # Next few lines might be authors
                potential_authors = []
                for i in range(title_idx + 1, min(title_idx + 5, len(lines))):
                    line = lines[i]
                    # Heuristic: authors line often contains commas or "and"
                    if ("," in line or " and " in line.lower()) and len(line) < 200:
                        potential_authors.append(line)

                if potential_authors:
                    metadata["authors"] = potential_authors[0]

        return metadata

    def chunk_text(self, pages: List[Dict]) -> List[Dict]:
        """Chunk text with page tracking.

        Returns:
            List of dicts with 'content', 'page_numbers', 'char_count', 'token_count'
        """
        chunks = []

        # Process each page separately, then combine chunks
        for page_info in pages:
            page_num = page_info['page']
            page_text = page_info['text']

            # Split this page's text into chunks
            page_chunks = self.text_splitter.split_text(page_text)

            for chunk_text in page_chunks:
                if not chunk_text.strip():
                    continue

                # Count tokens
                tokens = self.encoding.encode(chunk_text)

                chunks.append({
                    "content": chunk_text,
                    "page_numbers": str(page_num),
                    "char_count": len(chunk_text),
                    "token_count": len(tokens),
                    "page_num": page_num,  # For sorting
                })

        # Now handle overlaps across page boundaries
        # Combine adjacent chunks if they're from consecutive pages and small
        enhanced_chunks = []
        i = 0
        while i < len(chunks):
            current = chunks[i]

            # If chunk is small and there's a next chunk from next page, combine with overlap
            if (i + 1 < len(chunks) and
                current['char_count'] < CHUNK_SIZE and
                chunks[i + 1]['page_num'] == current['page_num'] + 1):

                # Create overlap chunk spanning page boundary
                next_chunk = chunks[i + 1]
                overlap_text = current['content'][-CHUNK_OVERLAP:] + " " + next_chunk['content'][:CHUNK_OVERLAP]

                if len(overlap_text.strip()) > 100:  # Only if substantial
                    tokens = self.encoding.encode(overlap_text)
                    enhanced_chunks.append({
                        "content": overlap_text,
                        "page_numbers": f"{current['page_num']}-{next_chunk['page_num']}",
                        "char_count": len(overlap_text),
                        "token_count": len(tokens),
                    })

            # Add the original chunk
            enhanced_chunks.append({
                "content": current['content'],
                "page_numbers": current['page_numbers'],
                "char_count": current['char_count'],
                "token_count": current['token_count'],
            })

            i += 1

        return enhanced_chunks

    def generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings using OpenAI API.

        Handles batching for large inputs.
        """
        embeddings = []
        batch_size = 100  # OpenAI allows up to 2048 inputs per request

        for i in range(0, len(texts), batch_size):
            batch = texts[i:i + batch_size]

            # Truncate texts that are too long
            truncated_batch = []
            for text in batch:
                tokens = self.encoding.encode(text)
                if len(tokens) > MAX_TOKENS_PER_CHUNK:
                    # Truncate to max tokens
                    truncated_tokens = tokens[:MAX_TOKENS_PER_CHUNK]
                    truncated_text = self.encoding.decode(truncated_tokens)
                    truncated_batch.append(truncated_text)
                else:
                    truncated_batch.append(text)

            response = self.client.embeddings.create(
                model=EMBEDDING_MODEL,
                input=truncated_batch,
            )

            batch_embeddings = [item.embedding for item in response.data]
            embeddings.extend(batch_embeddings)

        return embeddings

    def ingest_pdf(self, pdf_path: Path) -> int:
        """Ingest a single PDF file.

        Returns:
            paper_id of ingested paper
        """
        print(f"\nIngesting: {pdf_path.name}")

        # Extract text
        print("  Extracting text...")
        pages = self.extract_text_from_pdf(pdf_path)
        if not pages:
            print(f"  Warning: No text extracted from {pdf_path.name}")
            return -1

        # Extract metadata
        print("  Extracting metadata...")
        metadata = self.extract_metadata(pages, pdf_path.name)

        # Chunk text
        print("  Chunking text...")
        chunks = self.chunk_text(pages)
        print(f"  Created {len(chunks)} chunks")

        # Generate embeddings
        print("  Generating embeddings...")
        chunk_texts = [c["content"] for c in chunks]
        embeddings = self.generate_embeddings(chunk_texts)

        # Store in database
        print("  Storing in database...")
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        try:
            # Insert paper
            cursor.execute("""
                INSERT INTO papers (filename, title, authors, year, arxiv_id, pdf_path, total_pages, total_chunks, metadata)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                pdf_path.name,
                metadata.get("title"),
                metadata.get("authors"),
                metadata.get("year"),
                metadata.get("arxiv_id"),
                str(pdf_path),
                len(pages),
                len(chunks),
                json.dumps(metadata),
            ))
            paper_id = cursor.lastrowid

            # Insert chunks
            for i, chunk in enumerate(chunks):
                cursor.execute("""
                    INSERT INTO chunks (paper_id, chunk_index, content, page_numbers, char_count, token_count)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (
                    paper_id,
                    i,
                    chunk["content"],
                    chunk["page_numbers"],
                    chunk["char_count"],
                    chunk["token_count"],
                ))
                chunk_id = cursor.lastrowid

                # Insert embedding
                try:
                    # Convert embedding to bytes for storage
                    embedding_bytes = struct.pack(f'{EMBEDDING_DIMENSION}f', *embeddings[i])
                    cursor.execute("""
                        INSERT INTO embeddings (chunk_id, embedding)
                        VALUES (?, ?)
                    """, (chunk_id, embedding_bytes))
                except Exception as e:
                    print(f"    Warning: Could not store embedding: {e}")

            conn.commit()
            print(f"  ✓ Ingested successfully (paper_id: {paper_id})")
            return paper_id

        except Exception as e:
            conn.rollback()
            print(f"  ✗ Error: {e}")
            return -1
        finally:
            conn.close()

    def ingest_directory(self, directory: Path):
        """Ingest all PDFs in a directory."""
        pdf_files = list(directory.glob("*.pdf"))

        if not pdf_files:
            print(f"No PDF files found in {directory}")
            return

        print(f"Found {len(pdf_files)} PDF files")

        for pdf_path in pdf_files:
            try:
                self.ingest_pdf(pdf_path)
            except Exception as e:
                print(f"Error ingesting {pdf_path.name}: {e}")

    def search(self, query: str, limit: int = 5) -> List[Dict]:
        """Search database using vector similarity.

        Uses NumPy for cosine similarity calculation.

        Returns:
            List of results with paper info, chunk content, and similarity score
        """
        print(f"\nSearching for: {query}")

        # Generate query embedding
        query_embedding = np.array(self.generate_embeddings([query])[0])

        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        try:
            # Fetch all embeddings and metadata
            cursor.execute("""
                SELECT
                    c.id,
                    c.content,
                    c.page_numbers,
                    p.title,
                    p.authors,
                    p.year,
                    p.filename,
                    e.embedding
                FROM embeddings e
                JOIN chunks c ON e.chunk_id = c.id
                JOIN papers p ON c.paper_id = p.id
            """)

            # Calculate cosine similarity for each chunk
            results = []
            for row in cursor.fetchall():
                # Unpack embedding from bytes
                embedding_bytes = row[7]
                chunk_embedding = np.array(struct.unpack(f'{EMBEDDING_DIMENSION}f', embedding_bytes))

                # Calculate cosine similarity
                similarity = np.dot(query_embedding, chunk_embedding) / (
                    np.linalg.norm(query_embedding) * np.linalg.norm(chunk_embedding)
                )

                results.append({
                    "chunk_id": row[0],
                    "content": row[1],
                    "pages": row[2],
                    "paper_title": row[3],
                    "authors": row[4],
                    "year": row[5],
                    "filename": row[6],
                    "similarity": float(similarity),
                })

            # Sort by similarity (descending) and take top N
            results.sort(key=lambda x: x["similarity"], reverse=True)
            return results[:limit]

        except Exception as e:
            print(f"Search error: {e}")
            import traceback
            traceback.print_exc()
            return []
        finally:
            conn.close()


def main():
    parser = argparse.ArgumentParser(description="PDF Ingestion Pipeline")
    parser.add_argument("path", nargs="?", help="PDF file or directory to ingest")
    parser.add_argument("--search", "-s", help="Search query")
    parser.add_argument("--limit", "-l", type=int, default=5, help="Number of search results")

    args = parser.parse_args()

    # Check for OpenAI API key
    if not os.getenv("OPENAI_API_KEY"):
        print("Error: OPENAI_API_KEY environment variable not set")
        print("\nSet your API key:")
        print("  export OPENAI_API_KEY='your-key-here'")
        print("Or add to .env file in project root")
        sys.exit(1)

    pipeline = PDFIngestionPipeline()

    # Search mode
    if args.search:
        results = pipeline.search(args.search, limit=args.limit)

        if not results:
            print("\nNo results found.")
            return

        print(f"\nFound {len(results)} results:\n")
        for i, result in enumerate(results, 1):
            print(f"{i}. [{result['similarity']:.3f}] {result['paper_title'] or result['filename']}")
            print(f"   Pages: {result['pages']} | {result['authors'] or 'Unknown'} ({result['year'] or 'N/A'})")
            print(f"   {result['content'][:200]}...")
            print()
        return

    # Ingest mode
    if not args.path:
        parser.print_help()
        return

    path = Path(args.path)

    if not path.exists():
        print(f"Error: Path does not exist: {path}")
        sys.exit(1)

    if path.is_file():
        pipeline.ingest_pdf(path)
    elif path.is_dir():
        pipeline.ingest_directory(path)
    else:
        print(f"Error: Invalid path: {path}")
        sys.exit(1)


if __name__ == "__main__":
    main()
