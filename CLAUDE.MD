# CLAUDE.MD

## Project Overview

This project is a paper-based knowledge wiki system that extracts and organizes information from academic papers into an accessible, interconnected knowledge base.

## Core Purpose

Transform academic papers into four content types:

1. **Papers** - Individual pages for each academic paper with full metadata, abstracts, key contributions, and links to related concepts
2. **Wiki Concepts** - Structured documentation for specific concepts, methods, and ideas with technical explanations and creative analogies
3. **Essays** - Longer-form non-fiction pieces (20-30 minutes when read aloud) that synthesize knowledge from multiple papers into cohesive narratives
4. **Projects** - Language-agnostic implementation guides that describe how to build systems based on concepts from papers

All content must be:
- **Citation-backed** - Every claim must be properly cited and verifiable
- **Accurate** - Faithful to source material
- **Accessible** - Make complex topics understandable through creative explanations

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
├── ml-wiki/                        # Main application
│   ├── public/
│   │   └── papers/                # Academic papers (PDFs)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── papers/            # Individual paper pages
│   │   │   │   ├── index.tsx      # Papers overview with search
│   │   │   │   ├── bert.tsx       # Individual paper page
│   │   │   │   └── ...
│   │   │   ├── wiki/              # Wiki concept pages (MDX)
│   │   │   │   ├── index.tsx      # Wiki concepts overview
│   │   │   │   ├── attention.mdx  # Individual concept
│   │   │   │   └── ...
│   │   │   ├── essays/            # Essay pages (MDX)
│   │   │   │   ├── index.tsx      # Essays overview with search
│   │   │   │   └── *.mdx          # Individual essays
│   │   │   ├── projects/          # Project pages (MDX)
│   │   │   │   ├── index.tsx      # Projects overview
│   │   │   │   └── *.mdx          # Individual projects
│   │   │   └── index.tsx          # Home page
│   │   └── components/
│   │       ├── WikiLayout.tsx     # Layout for wiki concepts
│   │       ├── PaperLayout.tsx    # Layout for papers
│   │       ├── EssayLayout.tsx    # Layout for essays
│   │       └── ProjectLayout.tsx  # Layout for projects
│   └── package.json
└── CLAUDE.MD                      # This file
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

## Content Creation Workflows

### Wiki Concept Workflow

1. Use MCP tools to query the paper for concepts
2. Identify key concepts (e.g., "Attention Mechanism", "Transformer Architecture")
3. Create MDX files for each concept in `/ml-wiki/src/pages/wiki/`
4. Write technical documentation with citations
5. Add creative explanations (stories, analogies)
6. Cross-link related concepts
7. Verify all citations are accurate

### Essay Creation Workflow

Essays are longer-form non-fiction pieces designed to be engaging when read aloud (20-30 minutes).

**Purpose:**
- Synthesize knowledge from multiple papers into a cohesive narrative
- Explore connections between concepts across different research
- Make complex topics accessible through storytelling
- Suitable for audio consumption during walks, commutes, etc.

**Format Flexibility:**
Essays can take many forms:
- Traditional narrative essays
- Dialogue/conversation format (podcast-style)
- Historical narratives ("The Story of...")
- Comparative analyses
- Deep dives into a single idea across multiple papers

**Requirements:**
1. **Multi-paper integration** - Must draw from at least 2-3 papers
2. **Self-contained** - Should be understandable without reading other content
3. **Length** - Approximately 3,000-5,000 words (20-30 minutes when read aloud)
   - Audio compression ensures files stay under 25MB limit
4. **Citations** - Every claim must cite specific papers with page numbers
5. **Narrative flow** - Should read naturally, not like a reference document
6. **Accessibility** - Use creative explanations, analogies, stories to enhance understanding
7. **Audio-friendly** - Write with the spoken word in mind

**Process:**
1. Identify a theme or question that spans multiple papers
2. Query papers via MCP to extract relevant information
3. Create an outline that tells a compelling story
4. Write the essay in MDX format in `/ml-wiki/src/pages/essays/`
5. Include citations throughout (inline references)
6. Add metadata: title, description, related papers, related concepts, estimated reading time
7. Test by reading aloud - does it flow naturally?
8. **REQUIRED:** Generate audio version using the audio generation script (see below)
9. **REQUIRED:** Add `audioPath` to essay metadata
10. Add essay to essays index at `/ml-wiki/src/pages/essays/index.tsx`

**IMPORTANT:** Audio generation is MANDATORY for all essays. Essays are designed to be consumed while walking, commuting, or doing other activities. Every essay must have an audio version.

**Examples of Essay Topics:**
- "The Evolution of Attention: From RNNs to Transformers"
- "How Language Models Learn Without Being Taught: A Conversation"
- "Three Breakthroughs in AI Alignment"
- "The Surprising Emergence of Reasoning in Large Models"

### Audio Generation for Essays

Essays include audio versions for listening during walks, commutes, or other activities. Audio is generated using OpenAI's Text-to-Speech API.

**Prerequisites:**
- OpenAI API key with TTS access
- Node.js 18+ installed
- Set environment variable: `export OPENAI_API_KEY=your-api-key`

**Generate Audio:**

```bash
# Generate audio for a single essay
node scripts/generate-audio.js <essay-slug>

# Example
node scripts/generate-audio.js evolution-of-attention

# Generate audio for all essays
node scripts/generate-audio.js --all
```

**How It Works:**
1. Script (located in project root `/scripts/`) reads the MDX file from `/ml-wiki/src/pages/essays/`
2. Removes MDX/JSX syntax, code blocks, and metadata
3. Splits text into chunks of ~3,500 characters (OpenAI has 4,096 char limit)
4. Generates audio for each chunk using OpenAI TTS API
5. Concatenates all audio chunks into a single MP3 file
6. Saves audio output to `/ml-wiki/public/audio/<essay-slug>.mp3` (inside web project for serving)

**Configuration:**
- Voice: `alloy` (options: alloy, echo, fable, onyx, nova, shimmer)
- Model: `tts-1-hd` (HD quality)
- Output: MP3 format, automatically compressed with FFmpeg
- Compression: 64 kbps bitrate, mono, 22.05 kHz (optimized for speech)
- File size limit: 25MB maximum (enforced after compression)

**Audio Compression:**
The script automatically compresses audio files using FFmpeg to ensure they stay under 25MB:
- Original TTS output: ~6-8 MB per 1,000 words
- After compression: ~1.5-2 MB per 1,000 words (~75% reduction)
- Quality remains excellent for speech content
- Typical 4,000-word essay: ~6-8 MB (well under 25MB limit)

**Cost Estimate:**
- tts-1-hd: $30 per 1M characters
- Typical 4,000-word essay (~25,000 chars): ~$0.75

**Adding Audio to Essay:**
After generating audio, add the `audioPath` to your essay's metadata:

```typescript
export const meta = {
  title: "Your Essay Title",
  description: "...",
  readingTime: "25 min read",
  audioPath: "/audio/your-essay-slug.mp3",  // Add this line
  // ... rest of meta
};
```

The audio player will automatically appear on the essay page with:
- Play/pause/seek controls
- Volume control
- Download button for offline listening
- Visual indicator of audio availability

**Regenerating Audio:**
If you edit an essay and need to regenerate audio:

```bash
# Delete the existing audio file
rm ml-wiki/public/audio/essay-slug.mp3

# Generate new audio
node scripts/generate-audio.js essay-slug
```

**Technical Details:**
- Script location: `/scripts/generate-audio.js` (project root)
- Documentation: `/scripts/README.md`
- Text chunking: Splits at sentence boundaries to avoid awkward cuts
- Handles essays of any length (tested with 15,000+ characters)

### Project Creation Workflow

Projects are language-agnostic implementation guides that teach how to build systems based on concepts from papers.

**Purpose:**
- Guide readers through implementing complete systems
- Focus on architecture and design, not specific code
- Connect theory from papers to practical implementation
- Language-agnostic descriptions with optional language-specific examples

**Requirements:**
1. **Paper-grounded** - Must reference specific papers that describe the techniques
2. **Architecture-focused** - Describe system design, components, and data flow
3. **Language-agnostic** - Use pseudocode and high-level descriptions
4. **Practical** - Include implementation guidance and verification strategies
5. **Self-contained** - Should be understandable independently

**Process:**
1. Identify a system that integrates concepts from papers
2. Query papers via MCP to extract implementation details
3. Design the architecture and break into components
4. Write the project guide in MDX format in `/ml-wiki/src/pages/projects/`
5. Include citations to relevant papers
6. Add metadata: title, description, difficulty, related papers, related concepts
7. Add project to projects index at `/ml-wiki/src/pages/projects/index.tsx`

**Metadata Structure:**
```typescript
export const meta = {
  title: "Building a Small Transformer for Translation",
  description: "Implement a complete Transformer model...",
  difficulty: "Advanced", // Beginner, Intermediate, Advanced
  estimatedTime: "2-3 weeks",
  relatedPapers: [
    { title: "Attention Is All You Need", slug: "attention-is-all-you-need" }
  ],
  relatedConcepts: [
    { name: "Transformer Architecture", slug: "transformer-architecture" },
    { name: "Multi-Head Attention", slug: "multi-head-attention" }
  ],
  prerequisites: ["Understanding of neural networks", "Linear algebra basics"]
};
```

**Examples of Projects:**
- "Building a Small Transformer for Translation"
- "Implementing BERT for Text Classification"
- "Creating a Few-Shot Learning System"

## System Consistency Requirements

**CRITICAL**: For every paper in `/ml-wiki/public/papers/`, the following properties MUST always be true:

### 1. Concepts Extracted
- All key concepts from the paper have been identified
- Each concept has a corresponding MDX file in `/ml-wiki/src/pages/wiki/`
- Wiki entries include proper citations referencing the paper

### 2. Paper Page Entry
- Paper has individual page at `/ml-wiki/src/pages/papers/<slug>.tsx`
- Paper is listed in papers index at `/ml-wiki/src/pages/papers/index.tsx`
- Contains: title, authors, year, venue, abstract, key contributions, related concepts, impact statement

### 3. Wiki Index Updated
- All concepts appear in `/ml-wiki/src/pages/wiki/index.tsx`
- Correct slugs matching the MDX filenames
- Appropriate categories assigned
- Descriptions are accurate

### 4. Essays Reference Papers
- Essays cite papers they draw from
- Essays link to relevant concept pages
- Essays index at `/ml-wiki/src/pages/essays/index.tsx` includes all essays with searchability

### 5. Bidirectional Links
- Paper pages link to concept pages (via `relatedConcepts`)
- Concept pages cite papers (via `citations` in meta)
- Essays cite papers and link to concepts
- Home page can feature content from all three types

### Verification Checklist

When a new paper is added, verify:
- [ ] Paper PDF exists in `/ml-wiki/public/papers/`
- [ ] Paper uploaded to LlamaCloud and indexed
- [ ] Key concepts extracted via MCP queries
- [ ] Wiki entries created for all concepts
- [ ] Individual paper page created at `/ml-wiki/src/pages/papers/<slug>.tsx`
- [ ] Paper added to papers index at `/ml-wiki/src/pages/papers/index.tsx`
- [ ] Concepts added to `wiki/index.tsx`
- [ ] All slugs are correct and consistent
- [ ] Citations are accurate with page numbers
- [ ] Cross-links work in both directions

When creating essays, verify:
- [ ] Essay draws from at least 2-3 papers
- [ ] Length is appropriate (3,000-5,000 words / 20-30 minutes audio)
- [ ] All claims are cited with paper references and page numbers
- [ ] Essay is self-contained and understandable independently
- [ ] Narrative flows naturally when read aloud
- [ ] Audio generated using `node scripts/generate-audio.js <essay-slug>`
- [ ] `audioPath` added to essay metadata
- [ ] Audio file exists at `/public/audio/<essay-slug>.mp3`
- [ ] Essay added to essays index with proper metadata
- [ ] Related papers and concepts are linked

**Your Responsibility**: Maintain these properties across all content. When inconsistencies are found, fix them immediately.

## Goals

- Make academic papers more accessible through multiple formats
- Build an interconnected knowledge base spanning papers, concepts, and essays
- Maintain rigorous citation standards across all content
- Use creative methods to enhance understanding (stories, analogies, conversations)
- Create a valuable learning resource suitable for both reading and audio consumption
- Build a library of hundreds of essays for walking/commuting listening
