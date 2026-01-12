# CLAUDE.MD

## Project Overview

This project is a paper-based knowledge wiki system that extracts and organizes information from academic papers into an accessible, interconnected knowledge base.

## Core Purpose

Transform academic papers into:
1. **Wiki entries** - Structured documentation for concepts, methods, and ideas
2. **Artistic expressions** - Stories, analogies, and creative explanations to enhance understanding
3. **Accurate, citation-backed content** - All claims must be properly cited and verifiable

## Key Requirements

### 1. Citation Integrity
- **ALL content MUST be deferred to papers**
- Every claim, fact, or concept must include proper citations
- Accuracy is paramount - no unsupported statements
- Citations must reference specific papers in the collection

### 2. Wiki Structure
- Create entries for concepts, methods, techniques, and terminology
- Cross-reference related concepts
- Build an interconnected knowledge graph
- Make technical content accessible

### 3. Creative Explanations
- Use stories, analogies, and artistic expressions
- Make complex concepts easier to understand
- Balance creativity with accuracy
- All creative content must still be grounded in the papers

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Routing**: @generouted/react-router
- **Content**: MDX (Markdown + JSX) for rich, interactive documentation
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite (Rolldown)
- **Paper Storage**: `/ml-wiki/public/papers/`

## Project Structure

```
wiki-tech/
├── ml-wiki/                  # Main application
│   ├── public/
│   │   └── papers/          # Academic papers (PDFs)
│   ├── src/                 # Application source
│   └── package.json
└── CLAUDE.MD               # This file
```

## Development Guidelines

### When Adding Content

1. **Read the paper first** - Understand the source material
2. **Extract concepts** - Identify key ideas, methods, and terminology
3. **Create wiki entries** - Document each concept with proper structure
4. **Add citations** - Reference specific sections/pages of papers
5. **Create explanations** - Develop stories or analogies to aid understanding
6. **Verify accuracy** - Ensure all content is faithful to the source

### Content Standards

- Use MDX for all wiki content
- Include paper references in standardized format
- Link related concepts
- Provide both technical and accessible explanations
- Maintain a consistent citation format

### Citation Format

All claims should reference papers like:
- `[Paper Title, Author et al., Year]`
- Include page numbers for specific claims
- Link to the actual paper in the papers directory

## Paper Ingestion Workflow

### Step 1: Add Paper to Local Storage
1. Add paper PDF to `/ml-wiki/public/papers/`
2. Keep original filename or rename descriptively

### Step 2: Upload to LlamaCloud
1. Go to https://cloud.llamaindex.ai
2. Access or create the "papers" index
3. Manually upload the PDF through the web interface
4. Wait for processing to complete

### Step 3: Process with Claude via MCP
Once uploaded, Claude can access the paper through the LlamaCloud MCP server to:
- Query specific sections and concepts
- Extract definitions and terminology
- Pull citations and references
- Identify key ideas for wiki entries

**Why Manual Upload?**
- Security: Control what gets processed externally
- Trust: Verify the platform before automated uploads
- Review: Confirm paper is appropriate for indexing

## Wiki Creation Workflow

1. Use MCP tools to query the paper for concepts
2. Identify key concepts (e.g., "Attention Mechanism", "Transformer Architecture")
3. Create MDX files for each concept in `/ml-wiki/src/pages/wiki/`
4. Write technical documentation with citations
5. Add creative explanations (stories, analogies)
6. Cross-link related concepts
7. Verify all citations are accurate

## System Consistency Requirements

**CRITICAL**: For every paper in `/ml-wiki/public/papers/`, the following properties MUST always be true:

### 1. Concepts Extracted
- All key concepts from the paper have been identified
- Each concept has a corresponding MDX file in `/ml-wiki/src/pages/wiki/`
- Wiki entries include proper citations referencing the paper

### 2. Paper Page Entry
- Paper is listed in `/ml-wiki/src/pages/papers.tsx` with:
  - Title, authors, year, venue
  - Abstract and key contributions
  - Related concepts with correct slugs
  - Impact statement

### 3. Wiki Index Updated
- All concepts appear in `/ml-wiki/src/pages/wiki/index.tsx`
- Correct slugs matching the MDX filenames
- Appropriate categories assigned
- Descriptions are accurate

### 4. Bidirectional Links
- Papers page links to concept pages (via `relatedConcepts`)
- Concept pages cite the papers (via `citations` in meta)
- Home page can feature concepts from any paper

### Verification Checklist

When a new paper is added, verify:
- [ ] Paper PDF exists in `/ml-wiki/public/papers/`
- [ ] Paper uploaded to LlamaCloud and indexed
- [ ] Key concepts extracted via MCP queries
- [ ] Wiki entries created for all concepts
- [ ] Paper entry added to `papers.tsx`
- [ ] Concepts added to `wiki/index.tsx`
- [ ] All slugs are correct and consistent
- [ ] Citations are accurate with page numbers
- [ ] Cross-links work in both directions

**Your Responsibility**: Maintain these properties across all papers. When inconsistencies are found, fix them immediately.

## Goals

- Make academic papers more accessible
- Build an interconnected knowledge base
- Maintain rigorous citation standards
- Use creative methods to enhance understanding
- Create a valuable learning resource
