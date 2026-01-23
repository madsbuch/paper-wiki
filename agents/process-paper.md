# Process Paper Agent Instructions

When the user asks to "process" a paper PDF, follow these steps:

## 1. Create Paper Page

Create a paper page at `ml-wiki/src/pages/papers/<slug>.tsx` using `PaperLayout` with:

- All required metadata (title, authors, year, venue, arxiv info)
- Abstract
- Key contributions (3-5 bullet points)
- Related concepts (link to wiki pages)
- Impact statement

**The PaperLayout component should be self-closing with no children.** All content goes in props only.

**Keep it concise.** Focus on extracting key information from the paper, not creating exhaustive documentation.

## 2. Create or Update Wiki Concepts

For each concept in `relatedConcepts`:

- Check if wiki page exists
- If exists: Add paper citation to the wiki page's citations array
- If not exists: Create minimal wiki page with:
  - Title and description
  - One overview section citing the paper
  - Citations array with the paper
  - NO overly long analogies or exercises unless truly helpful

**Keep wiki pages short and focused.** The goal is documentation, not textbooks.

## Guidelines

- **Be concise**: Don't bloat pages with unnecessary content
- **Extract, don't expand**: Pull key info from the paper, don't write essays
- **Focus on utility**: What does a developer/researcher need to know?
- **Citations first**: Always include proper citations for claims
- **Link bidirectionally**: Paper → concepts AND concepts → paper
