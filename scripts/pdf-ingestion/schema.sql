-- PDF Knowledge Base Schema
-- SQLite database with vector search capabilities

-- Papers table: metadata and document information
CREATE TABLE IF NOT EXISTS papers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL UNIQUE,
    title TEXT,
    authors TEXT,
    year INTEGER,
    arxiv_id TEXT,
    pdf_path TEXT NOT NULL,
    total_pages INTEGER,
    total_chunks INTEGER DEFAULT 0,
    ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata TEXT -- JSON blob for additional metadata
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_papers_arxiv_id ON papers(arxiv_id);
CREATE INDEX IF NOT EXISTS idx_papers_year ON papers(year);
CREATE INDEX IF NOT EXISTS idx_papers_title ON papers(title);

-- Chunks table: text segments with context
CREATE TABLE IF NOT EXISTS chunks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    paper_id INTEGER NOT NULL,
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    page_numbers TEXT, -- e.g., "5-6" for chunks spanning pages
    char_count INTEGER,
    token_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paper_id) REFERENCES papers(id) ON DELETE CASCADE,
    UNIQUE(paper_id, chunk_index)
);

-- Index for chunk retrieval
CREATE INDEX IF NOT EXISTS idx_chunks_paper_id ON chunks(paper_id);
CREATE INDEX IF NOT EXISTS idx_chunks_page_numbers ON chunks(page_numbers);

-- Embeddings table: vector representations using sqlite-vec
-- Note: This will be created using the vec0 virtual table after sqlite-vec is loaded
-- Dimension: 1536 for OpenAI text-embedding-3-small
-- The actual table creation happens in Python after loading the extension
