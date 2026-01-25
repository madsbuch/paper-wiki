# CLAUDE.MD

## Project Overview

A paper-based knowledge wiki that transforms academic papers into an accessible, interconnected knowledge base with four content types:

1. **Papers** - Individual pages for each academic paper with metadata, abstracts, key contributions, and links to related concepts
2. **Wiki Concepts** - Structured documentation for concepts, methods, and ideas with technical explanations and creative analogies
3. **Essays** - Longer-form pieces (20-30 min read/audio) synthesizing knowledge from multiple papers
4. **Projects** - Language-agnostic implementation guides based on paper concepts

All content must be **citation-backed**, **accurate**, and **accessible**.

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Routing**: @generouted/react-router
- **Styling**: Tailwind CSS 4
- **Build**: Vite
- **Database**: SQLite (sql.js in browser)

## Project Structure

```
wiki-tech/
├── ml-wiki/                           # Main application
│   ├── public/
│   │   ├── collections.db             # Frontend SQLite database
│   │   └── audio/                     # Essay audio files
│   ├── src/
│   │   ├── pages/
│   │   │   ├── papers/                # Paper pages (*.tsx)
│   │   │   ├── wiki/                  # Wiki concept pages (*.tsx, *.mdx)
│   │   │   ├── essays/                # Essay pages (*.mdx)
│   │   │   └── projects/              # Project pages (*.mdx)
│   │   ├── components/
│   │   │   ├── WikiLayout.tsx
│   │   │   ├── PaperLayout.tsx
│   │   │   ├── EssayLayout.tsx
│   │   │   └── ProjectLayout.tsx
│   │   └── hooks/
│   │       └── useDatabase.tsx        # Database hooks for sql.js
│   └── package.json
├── scripts/
│   ├── collections-schema.sql         # Database schema
│   ├── sync-collections.ts            # Bun: sync content → collections.db
│   ├── sync-content.py                # Python: sync content with embeddings
│   ├── generate-audio.js              # Generate essay audio
│   ├── validate-mdx.js                # Validate MDX syntax
│   └── README.md
├── agents/                            # Agent instructions for content creation
│   ├── process-paper.md               # Instructions for processing PDFs
│   └── make-wiki-page.md              # Instructions for wiki concept pages
├── papers/                            # Source PDF files
└── CLAUDE.md
```

## Database Architecture

The project uses a SQLite database (`collections.db`) for the frontend, loaded via sql.js (WebAssembly).

### Database Location

```
ml-wiki/public/collections.db
```

### Database Schema

The schema is defined in `scripts/collections-schema.sql`. Key tables:

| Table              | Purpose                                                        |
| ------------------ | -------------------------------------------------------------- |
| `papers`           | Paper metadata (title, authors, year, abstract, etc.)          |
| `wiki_concepts`    | Concept metadata (title, description, category, difficulty)    |
| `essays`           | Essay metadata (title, description, reading_time, audio_path)  |
| `projects`         | Project metadata (title, category, difficulty, estimated_time) |
| `paper_concepts`   | Many-to-many: papers ↔ concepts                                |
| `essay_papers`     | Many-to-many: essays ↔ papers                                  |
| `essay_concepts`   | Many-to-many: essays ↔ concepts                                |
| `project_papers`   | Many-to-many: projects ↔ papers                                |
| `project_concepts` | Many-to-many: projects ↔ concepts                              |

Full-text search is provided via FTS5 virtual tables (`papers_fts`, `wiki_fts`, `essays_fts`, `projects_fts`).

### Using the Database in React

The database is accessed via hooks in `src/hooks/useDatabase.tsx`:

```tsx
import {
  usePapersIndex,
  useWikiIndex,
  useEssaysIndex,
  useProjectsIndex,
  useSearch,
  parseTags,
  parseRelatedPapers,
  parseRelatedConcepts,
} from "@/hooks/useDatabase";

// In a component:
function PapersList() {
  const { data: papers, loading, error } = usePapersIndex();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return papers?.map((paper) => (
    <div key={paper.slug}>
      <h2>{paper.title}</h2>
      <p>
        {paper.authors} ({paper.year})
      </p>
      {/* Parse JSON fields */}
      {parseTags(paper.tags).map((tag) => (
        <span>{tag}</span>
      ))}
    </div>
  ));
}

// Search across all content
function SearchComponent() {
  const [query, setQuery] = useState("");
  const { data: results } = useSearch(query, [
    "paper",
    "wiki",
    "essay",
    "project",
  ]);
  // results is SearchResult[] with content_type, slug, title, subtitle, category
}
```

### Available Hooks

| Hook                          | Returns          | Description                                   |
| ----------------------------- | ---------------- | --------------------------------------------- |
| `usePapersIndex()`            | `Paper[]`        | All papers with related concepts              |
| `useWikiIndex(category?)`     | `WikiConcept[]`  | All concepts, optionally filtered by category |
| `useEssaysIndex()`            | `Essay[]`        | All essays with related papers/concepts       |
| `useProjectsIndex(category?)` | `Project[]`      | All projects, optionally filtered             |
| `usePaper(slug)`              | `Paper[]`        | Single paper by slug                          |
| `useWikiConcept(slug)`        | `WikiConcept[]`  | Single concept by slug                        |
| `useEssay(slug)`              | `Essay[]`        | Single essay by slug                          |
| `useProject(slug)`            | `Project[]`      | Single project by slug                        |
| `useSearch(term, types)`      | `SearchResult[]` | Full-text search                              |
| `useWikiCategories()`         | `{category}[]`   | Unique wiki categories                        |
| `useProjectCategories()`      | `{category}[]`   | Unique project categories                     |

### JSON Field Parsers

Database fields storing arrays are JSON strings. Use these helpers:

```tsx
import {
  parseTags,
  parseRelatedPapers,
  parseRelatedConcepts,
  parseKeyContributions,
} from "@/hooks/useDatabase";

// Parse tags: string | null → string[]
const tags = parseTags(paper.tags);

// Parse related papers: string | null → {title, slug}[]
const papers = parseRelatedPapers(essay.related_papers);

// Parse related concepts: string | null → {name, slug}[]
const concepts = parseRelatedConcepts(paper.related_concepts);
```

### Database Types

```typescript
interface Paper {
  id: number;
  slug: string;
  title: string;
  authors: string;
  year: number | null;
  venue: string | null;
  arxiv_id: string | null;
  arxiv_url: string | null;
  abstract: string | null;
  key_contributions: string | null; // JSON array
  impact: string | null;
  tags: string | null; // JSON array
  related_concepts: string | null; // JSON array from view
}

interface WikiConcept {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  difficulty: string | null;
  tags: string | null;
  citations: string | null;
  prerequisites: string | null;
  related_papers: string | null; // JSON from view
}

interface Essay {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  reading_time: string | null;
  audio_path: string | null;
  tags: string | null;
  related_papers: string | null;
  related_concepts: string | null;
}

interface Project {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  category: string;
  difficulty: string | null;
  estimated_time: string | null;
  novel: string | null;
  prerequisites: string | null;
  tags: string | null;
  related_papers: string | null;
  related_concepts: string | null;
}
```

## Content Creation Workflows

This project uses **agent instructions** in the `agents/` directory to guide content creation. Always use the appropriate agent for the task.

### Available Agents

| Agent | File | Use When |
|-------|------|----------|
| **Process Paper** | `agents/process-paper.md` | Processing a PDF paper into a paper page + wiki concepts |
| **Make Wiki Page** | `agents/make-wiki-page.md` | Creating or improving a standalone wiki concept page |

### When to Use Each Agent

**Process Paper** (`agents/process-paper.md`):
- User says "process this paper" or provides a PDF
- Creates both the paper page AND any missing wiki concept pages
- Focuses on extracting key information from the paper

**Make Wiki Page** (`agents/make-wiki-page.md`):
- User asks to create a wiki page for a concept
- User asks to improve an existing wiki page
- When process-paper needs to create a new wiki concept (it references this agent)

### Agent Workflow

1. Read the relevant agent file before starting
2. Follow the instructions in the agent file
3. The agents reference each other when needed (e.g., process-paper → make-wiki-page)

## MDX Syntax Guidelines

**Escape special characters in MDX:**

| Character | Escape with         |
| --------- | ------------------- |
| `<`       | `&lt;` or `` `<` `` |
| `>`       | `&gt;` or `` `>` `` |
| `{`       | `\{` or `` `{` ``   |
| `}`       | `\}` or `` `}` ``   |

**Validate before committing:**

```bash
node scripts/validate-mdx.js
```
