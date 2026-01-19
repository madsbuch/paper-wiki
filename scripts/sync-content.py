#!/usr/bin/env python3
"""
Sync Content to Papers Database

Syncs wiki/essay/project content to papers.db for LLM semantic search.
Generates embeddings for content chunks.

Usage:
    python scripts/sync-content.py              # Full sync
    python scripts/sync-content.py --reset      # Reset content tables and rebuild
    python scripts/sync-content.py --no-embed   # Sync without generating embeddings
"""

import os
import sys
import json
import re
import sqlite3
import argparse
from pathlib import Path
from datetime import datetime
from typing import Optional, List, Dict, Any, Tuple

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent / "pdf-ingestion"))

try:
    from openai import OpenAI

    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False
    print("Warning: OpenAI not installed. Embeddings will be skipped.")

try:
    from langchain_text_splitters import RecursiveCharacterTextSplitter

    SPLITTER_AVAILABLE = True
except ImportError:
    SPLITTER_AVAILABLE = False
    print("Warning: langchain_text_splitters not installed. Using basic chunking.")

try:
    import numpy as np

    NUMPY_AVAILABLE = True
except ImportError:
    NUMPY_AVAILABLE = False

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
ML_WIKI_DIR = PROJECT_ROOT / "ml-wiki"
PAGES_DIR = ML_WIKI_DIR / "src" / "pages"
PAPERS_DB = SCRIPT_DIR / "pdf-ingestion" / "papers.db"
CONTENT_SCHEMA = SCRIPT_DIR / "pdf-ingestion" / "content-schema.sql"

# Content directories
WIKI_DIR = PAGES_DIR / "wiki"
ESSAYS_DIR = PAGES_DIR / "essays"
PROJECTS_DIR = PAGES_DIR / "projects"

# Embedding settings
EMBEDDING_MODEL = "text-embedding-3-small"
EMBEDDING_DIM = 1536
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200


def load_env() -> Dict[str, str]:
    """Load environment variables from .env file"""
    env_file = PROJECT_ROOT / ".env"
    env_vars = {}

    if env_file.exists():
        with open(env_file) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, value = line.split("=", 1)
                    # Remove quotes
                    value = value.strip().strip('"').strip("'")
                    env_vars[key] = value

    return env_vars


def get_openai_client() -> Optional["OpenAI"]:
    """Get OpenAI client with API key from .env"""
    if not OPENAI_AVAILABLE:
        return None

    env = load_env()
    api_key = env.get("OPEN_AI_API_KEY") or env.get("OPENAI_API_KEY")

    if not api_key:
        print("Warning: No OpenAI API key found in .env")
        return None

    return OpenAI(api_key=api_key)


def init_database(db_path: Path, reset: bool = False) -> sqlite3.Connection:
    """Initialize database with content schema"""
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    if reset:
        print("  Resetting content tables...")
        cursor = conn.cursor()
        tables = [
            "content_embeddings",
            "citation_graph",
            "concept_relationships",
            "content_status",
            "wiki_content",
            "essay_content",
            "project_content",
        ]
        for table in tables:
            cursor.execute(f"DROP TABLE IF EXISTS {table}")
        conn.commit()

    # Apply content schema
    if CONTENT_SCHEMA.exists():
        schema = CONTENT_SCHEMA.read_text()
        conn.executescript(schema)
        conn.commit()

    return conn


def extract_meta_from_tsx(content: str) -> Dict[str, Any]:
    """Extract metadata from TSX file"""
    meta = {}

    # Try to find meta export
    meta_match = re.search(r"export\s+const\s+meta\s*=\s*({[\s\S]*?});", content)
    if meta_match:
        try:
            # Basic JS object to Python dict conversion
            meta_str = meta_match.group(1)
            # This is simplified - in production use a proper parser
            meta_str = re.sub(r"(\w+):", r'"\1":', meta_str)  # Quote keys
            meta_str = meta_str.replace("'", '"')  # Single to double quotes
            meta_str = re.sub(r",\s*}", "}", meta_str)  # Remove trailing commas
            meta_str = re.sub(r",\s*]", "]", meta_str)
            meta = json.loads(meta_str)
        except:
            pass

    # Extract title from various patterns
    if not meta.get("title"):
        title_match = re.search(r'title[=:]\s*["\']([^"\']+)["\']', content)
        if title_match:
            meta["title"] = title_match.group(1)

    return meta


def extract_meta_from_mdx(content: str) -> Dict[str, Any]:
    """Extract metadata from MDX file"""
    meta = {}

    # Try export const meta = { ... }
    meta_match = re.search(r"export\s+const\s+meta\s*=\s*({[\s\S]*?});", content)
    if meta_match:
        try:
            meta_str = meta_match.group(1)
            meta_str = re.sub(r"(\w+):", r'"\1":', meta_str)
            meta_str = meta_str.replace("'", '"')
            meta_str = re.sub(r",\s*}", "}", meta_str)
            meta_str = re.sub(r",\s*]", "]", meta_str)
            meta = json.loads(meta_str)
        except:
            pass

    return meta


def extract_text_content(content: str) -> str:
    """Extract plain text from MDX/TSX content"""
    # Remove imports
    text = re.sub(r"^import\s+.*$", "", content, flags=re.MULTILINE)

    # Remove export statements (but keep exported content)
    text = re.sub(
        r"^export\s+(const|default|function)\s+\w+\s*=?\s*",
        "",
        text,
        flags=re.MULTILINE,
    )

    # Remove JSX tags but keep content
    text = re.sub(r"<[^>]+>", "", text)

    # Remove code blocks
    text = re.sub(r"```[\s\S]*?```", "", text)

    # Remove inline code
    text = re.sub(r"`[^`]+`", "", text)

    # Remove markdown links but keep text
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)

    # Remove markdown formatting
    text = re.sub(r"[*_#]+", "", text)

    # Clean up whitespace
    text = re.sub(r"\n\s*\n", "\n\n", text)
    text = text.strip()

    return text


def chunk_text(
    text: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP
) -> List[str]:
    """Split text into chunks"""
    if SPLITTER_AVAILABLE:
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=overlap,
            separators=["\n\n", "\n", ". ", " ", ""],
        )
        return splitter.split_text(text)
    else:
        # Basic chunking fallback
        chunks = []
        start = 0
        while start < len(text):
            end = start + chunk_size
            chunk = text[start:end]
            chunks.append(chunk)
            start = end - overlap
        return chunks


def generate_embedding(client: "OpenAI", text: str) -> Optional[bytes]:
    """Generate embedding for text"""
    if not client:
        return None

    try:
        response = client.embeddings.create(model=EMBEDDING_MODEL, input=text)
        embedding = response.data[0].embedding

        if NUMPY_AVAILABLE:
            return np.array(embedding, dtype=np.float32).tobytes()
        else:
            import struct

            return struct.pack(f"{len(embedding)}f", *embedding)
    except Exception as e:
        print(f"    Error generating embedding: {e}")
        return None


def sync_wiki_content(
    conn: sqlite3.Connection,
    client: Optional["OpenAI"],
    generate_embeddings: bool = True,
) -> int:
    """Sync wiki content to database"""
    print("\n  Syncing wiki content...")
    cursor = conn.cursor()
    count = 0

    if not WIKI_DIR.exists():
        print(f"    Wiki directory not found: {WIKI_DIR}")
        return 0

    for file in WIKI_DIR.iterdir():
        if file.suffix not in [".tsx", ".mdx"] or file.name == "index.tsx":
            continue

        slug = file.stem
        content = file.read_text()

        if file.suffix == ".mdx":
            meta = extract_meta_from_mdx(content)
        else:
            meta = extract_meta_from_tsx(content)

        title = meta.get("title", slug.replace("-", " ").title())
        full_text = extract_text_content(content)

        # Insert/update content
        cursor.execute(
            """
            INSERT OR REPLACE INTO wiki_content 
            (slug, title, full_text, metadata, file_path, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
        """,
            (
                slug,
                title,
                full_text,
                json.dumps(meta),
                str(file.relative_to(PROJECT_ROOT)),
                datetime.now().isoformat(),
            ),
        )

        content_id = cursor.lastrowid

        # Generate embeddings for chunks
        if generate_embeddings and client and full_text:
            chunks = chunk_text(full_text)

            # Delete old embeddings
            cursor.execute(
                """
                DELETE FROM content_embeddings 
                WHERE content_type = 'wiki' AND content_id = ?
            """,
                (content_id,),
            )

            for i, chunk in enumerate(chunks):
                embedding = generate_embedding(client, chunk)
                if embedding:
                    cursor.execute(
                        """
                        INSERT INTO content_embeddings 
                        (content_type, content_id, chunk_index, chunk_text, embedding)
                        VALUES (?, ?, ?, ?, ?)
                    """,
                        ("wiki", content_id, i, chunk, embedding),
                    )

        print(f"    + {slug}: {title}")
        count += 1

    conn.commit()
    print(f"  Synced {count} wiki pages")
    return count


def sync_essay_content(
    conn: sqlite3.Connection,
    client: Optional["OpenAI"],
    generate_embeddings: bool = True,
) -> int:
    """Sync essay content to database"""
    print("\n  Syncing essay content...")
    cursor = conn.cursor()
    count = 0

    if not ESSAYS_DIR.exists():
        print(f"    Essays directory not found: {ESSAYS_DIR}")
        return 0

    for file in ESSAYS_DIR.iterdir():
        if file.suffix != ".mdx":
            continue

        slug = file.stem
        content = file.read_text()
        meta = extract_meta_from_mdx(content)

        title = meta.get("title", slug.replace("-", " ").title())
        full_text = extract_text_content(content)

        cursor.execute(
            """
            INSERT OR REPLACE INTO essay_content 
            (slug, title, full_text, metadata, file_path, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
        """,
            (
                slug,
                title,
                full_text,
                json.dumps(meta),
                str(file.relative_to(PROJECT_ROOT)),
                datetime.now().isoformat(),
            ),
        )

        content_id = cursor.lastrowid

        if generate_embeddings and client and full_text:
            chunks = chunk_text(full_text)

            cursor.execute(
                """
                DELETE FROM content_embeddings 
                WHERE content_type = 'essay' AND content_id = ?
            """,
                (content_id,),
            )

            for i, chunk in enumerate(chunks):
                embedding = generate_embedding(client, chunk)
                if embedding:
                    cursor.execute(
                        """
                        INSERT INTO content_embeddings 
                        (content_type, content_id, chunk_index, chunk_text, embedding)
                        VALUES (?, ?, ?, ?, ?)
                    """,
                        ("essay", content_id, i, chunk, embedding),
                    )

        print(f"    + {slug}: {title}")
        count += 1

    conn.commit()
    print(f"  Synced {count} essays")
    return count


def sync_project_content(
    conn: sqlite3.Connection,
    client: Optional["OpenAI"],
    generate_embeddings: bool = True,
) -> int:
    """Sync project content to database"""
    print("\n  Syncing project content...")
    cursor = conn.cursor()
    count = 0

    if not PROJECTS_DIR.exists():
        print(f"    Projects directory not found: {PROJECTS_DIR}")
        return 0

    for file in PROJECTS_DIR.iterdir():
        if file.suffix != ".mdx":
            continue

        slug = file.stem
        content = file.read_text()
        meta = extract_meta_from_mdx(content)

        title = meta.get("title", slug.replace("-", " ").title())
        full_text = extract_text_content(content)

        cursor.execute(
            """
            INSERT OR REPLACE INTO project_content 
            (slug, title, full_text, metadata, file_path, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
        """,
            (
                slug,
                title,
                full_text,
                json.dumps(meta),
                str(file.relative_to(PROJECT_ROOT)),
                datetime.now().isoformat(),
            ),
        )

        content_id = cursor.lastrowid

        if generate_embeddings and client and full_text:
            chunks = chunk_text(full_text)

            cursor.execute(
                """
                DELETE FROM content_embeddings 
                WHERE content_type = 'project' AND content_id = ?
            """,
                (content_id,),
            )

            for i, chunk in enumerate(chunks):
                embedding = generate_embedding(client, chunk)
                if embedding:
                    cursor.execute(
                        """
                        INSERT INTO content_embeddings 
                        (content_type, content_id, chunk_index, chunk_text, embedding)
                        VALUES (?, ?, ?, ?, ?)
                    """,
                        ("project", content_id, i, chunk, embedding),
                    )

        print(f"    + {slug}: {title}")
        count += 1

    conn.commit()
    print(f"  Synced {count} projects")
    return count


def print_stats(conn: sqlite3.Connection):
    """Print database statistics"""
    print("\n  Database Statistics:")
    cursor = conn.cursor()

    tables = [
        ("papers", "papers"),
        ("chunks", "paper chunks"),
        ("embeddings", "paper embeddings"),
        ("wiki_content", "wiki pages"),
        ("essay_content", "essays"),
        ("project_content", "projects"),
        ("content_embeddings", "content embeddings"),
    ]

    for table, label in tables:
        try:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f"    {label}: {count}")
        except:
            pass


def main():
    parser = argparse.ArgumentParser(description="Sync content to papers.db")
    parser.add_argument("--reset", action="store_true", help="Reset content tables")
    parser.add_argument(
        "--no-embed", action="store_true", help="Skip embedding generation"
    )
    args = parser.parse_args()

    print("===========================================")
    print("  Wiki-Tech Content Sync (papers.db)")
    print("===========================================")

    print(f"\n  Database: {PAPERS_DB}")
    print(f"  Generate embeddings: {not args.no_embed}")

    # Check database exists
    if not PAPERS_DB.exists():
        print(f"\n  Error: Database not found at {PAPERS_DB}")
        print("  Run the PDF ingestion first to create the database.")
        sys.exit(1)

    # Initialize
    conn = init_database(PAPERS_DB, reset=args.reset)
    client = get_openai_client() if not args.no_embed else None

    if not args.no_embed and not client:
        print("\n  Warning: OpenAI client not available. Skipping embeddings.")

    # Sync content
    sync_wiki_content(conn, client, generate_embeddings=not args.no_embed)
    sync_essay_content(conn, client, generate_embeddings=not args.no_embed)
    sync_project_content(conn, client, generate_embeddings=not args.no_embed)

    # Print stats
    print_stats(conn)

    conn.close()

    print("\n  Sync complete!")
    print("===========================================\n")


if __name__ == "__main__":
    main()
