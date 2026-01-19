# PDF Ingestion Pipeline

A complete pipeline for ingesting academic papers (PDFs) into a searchable SQLite database with vector embeddings for semantic search.

## Features

- **PDF Text Extraction**: Extracts text while preserving page numbers
- **Automatic Metadata Extraction**: Parses title, authors, year, and arXiv ID from PDF content
- **Semantic Chunking**: Splits documents into meaningful chunks with overlap
- **Vector Embeddings**: Generates embeddings using OpenAI's `text-embedding-3-small`
- **Vector Search**: Semantic search using sqlite-vec extension
- **SQLite Storage**: Single-file database, no external vector DB needed

## Installation

### 1. Install Python Dependencies

```bash
pip install pdfplumber openai langchain tiktoken sqlite-vec
pip install langchain-text-splitters
```

### 2. Install sqlite-vec Extension

The sqlite-vec extension is required for vector similarity search.

**macOS (Homebrew):**

```bash
brew install sqlite-vec
```

**From Source:**

```bash
git clone https://github.com/asg017/sqlite-vec
cd sqlite-vec
make
# Copy the compiled extension to a system location
```

**Note:** The script will warn if sqlite-vec is not available, but you can still ingest PDFs. Search functionality requires the extension.

### 3. Set OpenAI API Key

```bash
# Add to .env file in project root
echo 'OPENAI_API_KEY="your-api-key-here"' >> .env

# Or export directly
export OPENAI_API_KEY="your-api-key-here"
```

## Usage

### Ingest a Single PDF

```bash
python scripts/pdf-ingestion/ingest.py /path/to/paper.pdf
```

### Ingest All PDFs in a Directory

```bash
python scripts/pdf-ingestion/ingest.py /path/to/papers/
```

Example with the papers directory:

```bash
python scripts/pdf-ingestion/ingest.py ../../papers/
```

### Search the Database

```bash
# Basic search
python scripts/pdf-ingestion/ingest.py --search "attention mechanisms in transformers"

# Limit results
python scripts/pdf-ingestion/ingest.py --search "graph neural networks" --limit 10
```

## How It Works

### 1. PDF Text Extraction

Uses `pdfplumber` to extract text from PDFs while tracking page numbers. This is more robust for academic papers than simple text extraction.

### 2. Metadata Extraction

Automatically extracts metadata from the PDF:

- **Title**: First substantial text block (heuristic-based)
- **Authors**: Lines following the title containing names
- **Year**: 4-digit year found in first pages
- **arXiv ID**: Extracted from filename or PDF text

### 3. Semantic Chunking

Uses LangChain's `RecursiveCharacterTextSplitter`:

- **Chunk size**: 1000 characters (~250 tokens)
- **Overlap**: 200 characters (preserves context across boundaries)
- **Splitting strategy**: Paragraphs → Sentences → Characters
- **Page tracking**: Each chunk knows which pages it spans

Why these parameters?

- Academic papers benefit from paragraph-level chunks
- Overlap ensures concepts split across boundaries are captured
- Size balances granularity with context

### 4. Embedding Generation

Generates vector embeddings using OpenAI's `text-embedding-3-small`:

- **Dimension**: 1536
- **Cost**: ~$0.02 per 1M tokens
- **Batching**: Processes up to 100 chunks per API call
- **Truncation**: Automatically truncates chunks exceeding token limits

### 5. Storage

Stores everything in SQLite:

```
papers table:
  - id, filename, title, authors, year, arxiv_id
  - pdf_path, total_pages, total_chunks
  - metadata (JSON blob)

chunks table:
  - id, paper_id, chunk_index, content
  - page_numbers, char_count, token_count

embeddings table (sqlite-vec):
  - chunk_id, embedding (1536-dimensional vector)
```

### 6. Vector Search

Uses sqlite-vec for cosine similarity search:

1. Generate embedding for query
2. Find most similar chunk embeddings
3. Join with papers table for metadata
4. Return ranked results with similarity scores

## Database Location

The database is created at:

```
scripts/pdf-ingestion/papers.db
```

## Example Output

### Ingestion

```
Ingesting: 2404.12534v3.pdf
  Extracting text...
  Extracting metadata...
  Chunking text...
  Created 47 chunks
  Generating embeddings...
  Storing in database...
  ✓ Ingested successfully (paper_id: 1)
```

### Search

```
Searching for: attention mechanisms in transformers

Found 5 results:

1. [0.892] Attention Is All You Need
   Pages: 3-4 | Vaswani, A., et al. (2017)
   The Transformer model architecture is based entirely on attention mechanisms,
   dispensing with recurrence and convolutions entirely. In this section we
   describe the Transformer...

2. [0.856] BERT: Pre-training of Deep Bidirectional Transformers
   Pages: 2-3 | Devlin, J., et al. (2018)
   Unlike recent language representation models, BERT is designed to pre-train
   deep bidirectional representations by jointly conditioning on both left and
   right context...
```

## Cost Estimates

**Embedding Generation (OpenAI text-embedding-3-small):**

- $0.02 per 1M tokens
- Typical academic paper: ~50,000 tokens → ~$0.001 per paper
- 100 papers: ~$0.10

**Storage:**

- SQLite database grows linearly with content
- Typical paper: ~2-5 MB in database (including embeddings)
- 100 papers: ~200-500 MB

## Metadata Extraction Heuristics

The pipeline uses several heuristics to extract metadata:

**Title:**

- First substantial line (20-200 chars)
- Excludes common header text (preprint, accepted, etc.)
- Looks within first 10 lines

**Authors:**

- Lines following title
- Contains commas or "and"
- Under 200 characters

**Year:**

- First 4-digit number matching 19xx or 20xx
- Searched in first 2 pages

**arXiv ID:**

- Pattern: `\d{4}.\d{4,5}(v\d+)?`
- Checked in filename first, then PDF text

**Limitations:**

- Heuristics work well for standard academic papers
- May fail on unusual formatting
- You can manually update metadata in the database after ingestion

## Advanced Usage

### Query the Database Directly

```python
import sqlite3

conn = sqlite3.connect("scripts/pdf-ingestion/papers.db")
cursor = conn.cursor()

# List all papers
cursor.execute("SELECT id, title, authors, year FROM papers")
for row in cursor.fetchall():
    print(row)

# Get chunks from a specific paper
cursor.execute("""
    SELECT content, page_numbers
    FROM chunks
    WHERE paper_id = ?
    ORDER BY chunk_index
""", (1,))
```

### Update Metadata

```sql
-- Fix a title
UPDATE papers
SET title = 'Corrected Title'
WHERE id = 1;

-- Add arXiv ID
UPDATE papers
SET arxiv_id = '1706.03762v7'
WHERE filename = 'attention-is-all-you-need.pdf';
```

### Export Data

```bash
# Export to CSV
sqlite3 scripts/pdf-ingestion/papers.db \
  "SELECT title, authors, year FROM papers" \
  -csv -header > papers.csv

# Backup database
cp scripts/pdf-ingestion/papers.db papers-backup.db
```

## Troubleshooting

### "sqlite-vec extension not found"

Install the extension:

- macOS: `brew install sqlite-vec`
- Linux: Build from source (https://github.com/asg017/sqlite-vec)

The pipeline will still ingest PDFs, but search won't work.

### "OPENAI_API_KEY environment variable not set"

Set your API key:

```bash
export OPENAI_API_KEY="your-key-here"
```

Or add to `.env` file in project root.

### "No text extracted from PDF"

Some PDFs are scanned images without text. You'll need OCR:

```bash
pip install pytesseract
# Modify ingest.py to add OCR fallback
```

### "Too many tokens in chunk"

The pipeline automatically truncates chunks exceeding OpenAI's limit (8191 tokens). This is rare with the default chunk size of 1000 characters.

## Integration with Wiki Project

This ingestion pipeline is separate from the LlamaCloud MCP integration described in `CLAUDE.md`. Use this pipeline when:

- You want local control over embeddings and search
- You need to query across many papers simultaneously
- You want to build custom search interfaces
- You prefer SQLite over cloud services

Use LlamaCloud MCP when:

- You want Claude to answer questions about specific papers
- You need more sophisticated document understanding
- You prefer managed infrastructure

Both approaches can coexist - use LlamaCloud for interactive exploration and this pipeline for systematic search.

## Future Enhancements

Potential improvements:

1. **OCR Support**: Add pytesseract for scanned PDFs
2. **Better Metadata Extraction**: Use GPT-4 Vision to extract metadata from first page
3. **Citation Extraction**: Parse references and build citation graph
4. **Figure/Table Extraction**: Store images and tables separately
5. **Hybrid Search**: Combine vector search with keyword search (BM25)
6. **Web Interface**: Build a simple web UI for search
7. **Incremental Updates**: Detect and skip already-ingested papers
8. **Multi-modal Embeddings**: Include figures and equations in embeddings

## License

This script is part of the wiki-tech project and follows the same license.
