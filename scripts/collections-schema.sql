-- Collections Database Schema (Frontend)
-- SQLite database for wiki-tech frontend with FTS5 search
-- Used by: React frontend via sql.js

PRAGMA foreign_keys = ON;

--------------------------------------------------------------------------------
-- CORE CONTENT TABLES
--------------------------------------------------------------------------------

-- Papers table (metadata for display, not full content)
CREATE TABLE IF NOT EXISTS papers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    authors TEXT NOT NULL,              -- JSON array of author names
    year INTEGER,
    venue TEXT,
    arxiv_id TEXT UNIQUE,
    arxiv_url TEXT,
    abstract TEXT,
    key_contributions TEXT,             -- JSON array of contribution strings
    impact TEXT,
    tags TEXT,                          -- JSON array for filtering
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_papers_year ON papers(year);
CREATE INDEX IF NOT EXISTS idx_papers_slug ON papers(slug);

-- Wiki concepts table
CREATE TABLE IF NOT EXISTS wiki_concepts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,                      -- Architecture, Mechanism, Training, etc.
    difficulty TEXT,                    -- Beginner, Intermediate, Advanced
    tags TEXT,                          -- JSON array
    citations TEXT,                     -- JSON array of {paper, authors, year, pages}
    prerequisites TEXT,                 -- JSON array of prerequisite concept slugs
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_wiki_category ON wiki_concepts(category);
CREATE INDEX IF NOT EXISTS idx_wiki_difficulty ON wiki_concepts(difficulty);
CREATE INDEX IF NOT EXISTS idx_wiki_slug ON wiki_concepts(slug);

-- Essays table
CREATE TABLE IF NOT EXISTS essays (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    reading_time TEXT,
    audio_path TEXT,
    tags TEXT,                          -- JSON array
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_essays_slug ON essays(slug);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,             -- Exercise, Weekend Project, Large Project
    difficulty TEXT,                    -- Beginner, Intermediate, Advanced
    estimated_time TEXT,
    novel TEXT,                         -- Required for Large Projects
    prerequisites TEXT,                 -- JSON array
    tags TEXT,                          -- JSON array
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_difficulty ON projects(difficulty);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

--------------------------------------------------------------------------------
-- RELATIONSHIP TABLES (many-to-many)
--------------------------------------------------------------------------------

-- Papers <-> Concepts relationship
CREATE TABLE IF NOT EXISTS paper_concepts (
    paper_id INTEGER NOT NULL,
    concept_id INTEGER NOT NULL,
    relevance_score REAL DEFAULT 1.0,   -- Optional: rank relevance
    PRIMARY KEY (paper_id, concept_id),
    FOREIGN KEY (paper_id) REFERENCES papers(id) ON DELETE CASCADE,
    FOREIGN KEY (concept_id) REFERENCES wiki_concepts(id) ON DELETE CASCADE
);

-- Essays <-> Papers relationship
CREATE TABLE IF NOT EXISTS essay_papers (
    essay_id INTEGER NOT NULL,
    paper_id INTEGER NOT NULL,
    PRIMARY KEY (essay_id, paper_id),
    FOREIGN KEY (essay_id) REFERENCES essays(id) ON DELETE CASCADE,
    FOREIGN KEY (paper_id) REFERENCES papers(id) ON DELETE CASCADE
);

-- Essays <-> Concepts relationship
CREATE TABLE IF NOT EXISTS essay_concepts (
    essay_id INTEGER NOT NULL,
    concept_id INTEGER NOT NULL,
    PRIMARY KEY (essay_id, concept_id),
    FOREIGN KEY (essay_id) REFERENCES essays(id) ON DELETE CASCADE,
    FOREIGN KEY (concept_id) REFERENCES wiki_concepts(id) ON DELETE CASCADE
);

-- Projects <-> Papers relationship
CREATE TABLE IF NOT EXISTS project_papers (
    project_id INTEGER NOT NULL,
    paper_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, paper_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (paper_id) REFERENCES papers(id) ON DELETE CASCADE
);

-- Projects <-> Concepts relationship
CREATE TABLE IF NOT EXISTS project_concepts (
    project_id INTEGER NOT NULL,
    concept_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, concept_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (concept_id) REFERENCES wiki_concepts(id) ON DELETE CASCADE
);

--------------------------------------------------------------------------------
-- FULL-TEXT SEARCH (FTS5)
--------------------------------------------------------------------------------

-- Papers FTS
CREATE VIRTUAL TABLE IF NOT EXISTS papers_fts USING fts5(
    slug,
    title,
    authors,
    abstract,
    key_contributions,
    tags,
    content='papers',
    content_rowid='id'
);

-- Wiki concepts FTS
CREATE VIRTUAL TABLE IF NOT EXISTS wiki_fts USING fts5(
    slug,
    title,
    description,
    category,
    tags,
    content='wiki_concepts',
    content_rowid='id'
);

-- Essays FTS
CREATE VIRTUAL TABLE IF NOT EXISTS essays_fts USING fts5(
    slug,
    title,
    description,
    tags,
    content='essays',
    content_rowid='id'
);

-- Projects FTS
CREATE VIRTUAL TABLE IF NOT EXISTS projects_fts USING fts5(
    slug,
    title,
    description,
    category,
    tags,
    content='projects',
    content_rowid='id'
);

--------------------------------------------------------------------------------
-- FTS SYNC TRIGGERS
--------------------------------------------------------------------------------

-- Papers triggers
CREATE TRIGGER IF NOT EXISTS papers_ai AFTER INSERT ON papers BEGIN
    INSERT INTO papers_fts(rowid, slug, title, authors, abstract, key_contributions, tags)
    VALUES (new.id, new.slug, new.title, new.authors, new.abstract, new.key_contributions, new.tags);
END;

CREATE TRIGGER IF NOT EXISTS papers_ad AFTER DELETE ON papers BEGIN
    INSERT INTO papers_fts(papers_fts, rowid, slug, title, authors, abstract, key_contributions, tags)
    VALUES ('delete', old.id, old.slug, old.title, old.authors, old.abstract, old.key_contributions, old.tags);
END;

CREATE TRIGGER IF NOT EXISTS papers_au AFTER UPDATE ON papers BEGIN
    INSERT INTO papers_fts(papers_fts, rowid, slug, title, authors, abstract, key_contributions, tags)
    VALUES ('delete', old.id, old.slug, old.title, old.authors, old.abstract, old.key_contributions, old.tags);
    INSERT INTO papers_fts(rowid, slug, title, authors, abstract, key_contributions, tags)
    VALUES (new.id, new.slug, new.title, new.authors, new.abstract, new.key_contributions, new.tags);
END;

-- Wiki concepts triggers
CREATE TRIGGER IF NOT EXISTS wiki_ai AFTER INSERT ON wiki_concepts BEGIN
    INSERT INTO wiki_fts(rowid, slug, title, description, category, tags)
    VALUES (new.id, new.slug, new.title, new.description, new.category, new.tags);
END;

CREATE TRIGGER IF NOT EXISTS wiki_ad AFTER DELETE ON wiki_concepts BEGIN
    INSERT INTO wiki_fts(wiki_fts, rowid, slug, title, description, category, tags)
    VALUES ('delete', old.id, old.slug, old.title, old.description, old.category, old.tags);
END;

CREATE TRIGGER IF NOT EXISTS wiki_au AFTER UPDATE ON wiki_concepts BEGIN
    INSERT INTO wiki_fts(wiki_fts, rowid, slug, title, description, category, tags)
    VALUES ('delete', old.id, old.slug, old.title, old.description, old.category, old.tags);
    INSERT INTO wiki_fts(rowid, slug, title, description, category, tags)
    VALUES (new.id, new.slug, new.title, new.description, new.category, new.tags);
END;

-- Essays triggers
CREATE TRIGGER IF NOT EXISTS essays_ai AFTER INSERT ON essays BEGIN
    INSERT INTO essays_fts(rowid, slug, title, description, tags)
    VALUES (new.id, new.slug, new.title, new.description, new.tags);
END;

CREATE TRIGGER IF NOT EXISTS essays_ad AFTER DELETE ON essays BEGIN
    INSERT INTO essays_fts(essays_fts, rowid, slug, title, description, tags)
    VALUES ('delete', old.id, old.slug, old.title, old.description, old.tags);
END;

CREATE TRIGGER IF NOT EXISTS essays_au AFTER UPDATE ON essays BEGIN
    INSERT INTO essays_fts(essays_fts, rowid, slug, title, description, tags)
    VALUES ('delete', old.id, old.slug, old.title, old.description, old.tags);
    INSERT INTO essays_fts(rowid, slug, title, description, tags)
    VALUES (new.id, new.slug, new.title, new.description, new.tags);
END;

-- Projects triggers
CREATE TRIGGER IF NOT EXISTS projects_ai AFTER INSERT ON projects BEGIN
    INSERT INTO projects_fts(rowid, slug, title, description, category, tags)
    VALUES (new.id, new.slug, new.title, new.description, new.category, new.tags);
END;

CREATE TRIGGER IF NOT EXISTS projects_ad AFTER DELETE ON projects BEGIN
    INSERT INTO projects_fts(projects_fts, rowid, slug, title, description, category, tags)
    VALUES ('delete', old.id, old.slug, old.title, old.description, old.category, old.tags);
END;

CREATE TRIGGER IF NOT EXISTS projects_au AFTER UPDATE ON projects BEGIN
    INSERT INTO projects_fts(projects_fts, rowid, slug, title, description, category, tags)
    VALUES ('delete', old.id, old.slug, old.title, old.description, old.category, old.tags);
    INSERT INTO projects_fts(rowid, slug, title, description, category, tags)
    VALUES (new.id, new.slug, new.title, new.description, new.category, new.tags);
END;

--------------------------------------------------------------------------------
-- CONVENIENCE VIEWS
--------------------------------------------------------------------------------

-- Paper index view with related concepts
CREATE VIEW IF NOT EXISTS paper_index AS
SELECT 
    p.id,
    p.slug,
    p.title,
    p.authors,
    p.year,
    p.venue,
    p.arxiv_id,
    p.arxiv_url,
    p.abstract,
    p.key_contributions,
    p.impact,
    p.tags,
    (
        SELECT json_group_array(json_object('name', wc.title, 'slug', wc.slug))
        FROM paper_concepts pc
        JOIN wiki_concepts wc ON pc.concept_id = wc.id
        WHERE pc.paper_id = p.id
    ) as related_concepts
FROM papers p
ORDER BY p.year DESC, p.title;

-- Wiki index view with related papers
CREATE VIEW IF NOT EXISTS wiki_index AS
SELECT 
    wc.id,
    wc.slug,
    wc.title,
    wc.description,
    wc.category,
    wc.difficulty,
    wc.tags,
    wc.citations,
    wc.prerequisites,
    (
        SELECT json_group_array(json_object('title', p.title, 'slug', p.slug))
        FROM paper_concepts pc
        JOIN papers p ON pc.paper_id = p.id
        WHERE pc.concept_id = wc.id
    ) as related_papers
FROM wiki_concepts wc
ORDER BY wc.category, wc.title;

-- Essay index view with related papers and concepts
CREATE VIEW IF NOT EXISTS essay_index AS
SELECT 
    e.id,
    e.slug,
    e.title,
    e.description,
    e.reading_time,
    e.audio_path,
    e.tags,
    (
        SELECT json_group_array(json_object('title', p.title, 'slug', p.slug))
        FROM essay_papers ep
        JOIN papers p ON ep.paper_id = p.id
        WHERE ep.essay_id = e.id
    ) as related_papers,
    (
        SELECT json_group_array(json_object('name', wc.title, 'slug', wc.slug))
        FROM essay_concepts ec
        JOIN wiki_concepts wc ON ec.concept_id = wc.id
        WHERE ec.essay_id = e.id
    ) as related_concepts
FROM essays e
ORDER BY e.title;

-- Project index view with related papers and concepts
CREATE VIEW IF NOT EXISTS project_index AS
SELECT 
    pr.id,
    pr.slug,
    pr.title,
    pr.description,
    pr.category,
    pr.difficulty,
    pr.estimated_time,
    pr.novel,
    pr.prerequisites,
    pr.tags,
    (
        SELECT json_group_array(json_object('title', p.title, 'slug', p.slug))
        FROM project_papers pp
        JOIN papers p ON pp.paper_id = p.id
        WHERE pp.project_id = pr.id
    ) as related_papers,
    (
        SELECT json_group_array(json_object('name', wc.title, 'slug', wc.slug))
        FROM project_concepts pc
        JOIN wiki_concepts wc ON pc.concept_id = wc.id
        WHERE pc.project_id = pr.id
    ) as related_concepts
FROM projects pr
ORDER BY 
    CASE pr.category 
        WHEN 'Exercise' THEN 1 
        WHEN 'Weekend Project' THEN 2 
        WHEN 'Large Project' THEN 3 
    END,
    pr.title;

-- Unified search view (for cross-content search results)
CREATE VIEW IF NOT EXISTS unified_content AS
SELECT 'paper' as content_type, slug, title, authors as subtitle, NULL as category, year as sort_key
FROM papers
UNION ALL
SELECT 'wiki' as content_type, slug, title, description as subtitle, category, title as sort_key
FROM wiki_concepts
UNION ALL
SELECT 'essay' as content_type, slug, title, description as subtitle, NULL as category, title as sort_key
FROM essays
UNION ALL
SELECT 'project' as content_type, slug, title, description as subtitle, category, title as sort_key
FROM projects;
