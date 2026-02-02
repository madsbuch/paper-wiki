# Make Essay Agent Instructions

When creating an essay, follow these instructions to produce a **long-form piece (20-30 min read)** that synthesizes knowledge from multiple papers into an accessible, engaging narrative.

## Core Philosophy

Essays are the crown jewels of the wiki. They:

1. **Synthesize** — Connect ideas across multiple papers into coherent narratives
2. **Explain** — Make complex concepts accessible without sacrificing accuracy
3. **Engage** — Tell stories that draw readers through technical material
4. **Document** — Every claim is backed by citations to source papers

The goal is to write something a curious professional could read on a commute or during a long walk, coming away with deep understanding of a topic they knew little about before.

---

## Prerequisites Before Writing

Before writing an essay, ensure:

1. **Related papers exist** in `ml-wiki/src/pages/papers/` — Essays must cite existing papers in the wiki
2. **Related wiki concepts exist** in `ml-wiki/src/pages/wiki/` — Key concepts should have dedicated wiki pages
3. **You have read the source papers** — Essays require accurate, citation-backed claims

If papers or concepts are missing, create them first using the appropriate agents (`process-paper.md`, `make-wiki-page.md`).

---

## Page Structure

Create the essay at `ml-wiki/src/pages/essays/<slug>.mdx` using the `EssayLayout` component.

### File Template

```mdx
import EssayLayout from "../../components/EssayLayout";

export const meta = {
  title: "Essay Title: A Compelling Subtitle",
  description: "One compelling sentence that hooks readers and summarizes the essay's core insight.",
  readingTime: "22 min read",
  audioPath: "/audio/<slug>.mp3",
  relatedPapers: [
    { title: "Paper Title", slug: "paper-slug" },
    { title: "Another Paper", slug: "another-paper-slug" }
  ],
  relatedConcepts: [
    { name: "Concept Name", slug: "concept-slug" },
    { name: "Another Concept", slug: "another-concept-slug" }
  ],
  citations: [
    {
      paper: "Full Paper Title",
      authors: "Author, A., Author, B., & Author, C.",
      year: "2024",
      pages: "1-15"
    }
  ]
};

<EssayLayout {...meta}>

## Opening Hook

[Your opening section - see writing guidelines below]

## Section Title

[Continue with narrative sections...]

---

*This essay synthesizes findings from [paper names and years]. All empirical claims are supported by direct citations to the source papers.*

</EssayLayout>

export default ({ children }) => children;
```

---

## Meta Object Reference

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Essay title with optional subtitle |
| `description` | Yes | One compelling sentence for metadata/previews |
| `readingTime` | Yes | Estimated reading time (e.g., "22 min read") |
| `audioPath` | No | Path to audio file (e.g., "/audio/essay-slug.mp3") |
| `relatedPapers` | Yes | Array of `{title, slug}` linking to paper pages |
| `relatedConcepts` | Yes | Array of `{name, slug}` linking to wiki concept pages |
| `citations` | Yes | Array of citation objects with paper, authors, year, pages |

---

## Essay Structure Guidelines

### 1. Opening Hook (1-2 paragraphs)

Start with something that grabs attention:
- A vivid scene or scenario
- A provocative question
- A surprising fact
- A historical moment

**Good example:**
> Picture a junior software developer on their first day at a new job. They're handed a task: implement a feature using a Python library they've never seen before. The deadline is tight. Their manager has already moved on to other meetings.

**Bad (too dry):**
> This essay discusses the implications of AI assistance on skill development in software engineering contexts.

### 2. The Problem or Question (1-2 sections)

Establish what question the essay will answer or what problem it explores. Ground this in:
- Real-world stakes
- Historical context
- Existing misconceptions to challenge

### 3. Core Exposition (3-5 sections)

The meat of the essay. Structure around:
- **Key findings** from the source papers
- **Mechanisms** — how things actually work
- **Evidence** — specific data, experiments, results

Each section should:
- Have a clear thesis
- Include direct citations with page numbers
- Build toward the next section

### 4. Synthesis and Implications (1-2 sections)

Connect the dots:
- What does this mean for the field?
- What should practitioners do differently?
- What questions remain open?

### 5. Closing (1-2 paragraphs)

Bring it home:
- Echo the opening
- Leave readers with something to think about
- Avoid moralizing or preaching

---

## Writing Style Guidelines

### Voice and Tone

Write as an informed guide, not an academic:
- Use "we" and "you" appropriately
- Vary sentence length
- Use concrete examples
- Avoid jargon without explanation

**Good:**
> When the model expresses "surprise"—when it says "Wait" or "But actually" or "Oh, that's interesting"—it's not just stylistic flourish. It's a signal that perspectives are shifting, that assumptions are being questioned, that alternatives are being considered.

**Bad (too academic):**
> The manifestation of surprise tokens in the model's output correlates with increased perspectival diversity in the reasoning trace, suggesting a causal relationship between discourse markers and cognitive flexibility.

### Citation Integration

Weave citations naturally into the narrative:

**Good:**
> The results were dramatic. On the Countdown arithmetic task, steering the conversational feature positive (+10 strength) **doubled accuracy** from 27.1% to 54.8% [Kim et al., 2025, p. 7].

**Bad (citation dump):**
> Accuracy increased significantly (Kim et al., 2025).

### Using Block Quotes

Use block quotes for particularly striking passages from source material:

```mdx
> "Most R1 reasoning personas were surprisingly disciplined and hard-working!" the researchers note [Kim et al., 2025, p. 16].
```

### Lists for Clarity

Use numbered or bulleted lists when presenting:
- Multiple findings
- Step-by-step processes
- Comparison of approaches

```mdx
The researchers identified six distinct patterns of AI interaction:

1. **AI Delegation** (average quiz score: 39%): These participants asked AI to generate all their code...
2. **Progressive AI Reliance** (35%): Started by asking a few questions...
```

### Section Headers

Use descriptive headers that tell a story:

**Good:**
- "The Lonely Thinker Problem"
- "Discovering the Society Within"
- "The Causal Test"

**Bad:**
- "Introduction"
- "Results"
- "Discussion"

---

## Length and Pacing

Target **4,000-6,000 words** for a 20-30 minute read.

- **Opening hook**: 200-400 words
- **Problem setup**: 400-800 words
- **Core sections**: 2,500-4,000 words (across 3-5 sections)
- **Implications**: 400-800 words
- **Closing**: 150-300 words

Vary paragraph length. Use short paragraphs for emphasis. Use longer paragraphs for sustained argument.

---

## MDX-Specific Guidelines

### Escape Special Characters

| Character | Escape with |
|-----------|-------------|
| `<` | `&lt;` or `` `<` `` |
| `>` | `&gt;` or `` `>` `` |
| `{` | `\{` or `` `{` `` |
| `}` | `\}` or `` `}` `` |

### Horizontal Rules

Use `---` to separate major sections (before closing, after main content).

### Emphasis

- Use **bold** for key terms and important findings
- Use *italics* for emphasis and paper titles
- Use `code` for technical terms, function names, model names

---

## After Writing

### 1. Update the Database

Run the sync script to index the new essay:

```bash
bun run scripts/sync-collections.ts
```

### 2. Generate Audio (Optional)

If audio is desired, use the audio generation script:

```bash
node scripts/generate-audio.js ml-wiki/src/pages/essays/<slug>.mdx
```

### 3. Validate MDX

Run the validation script to check for syntax errors:

```bash
node scripts/validate-mdx.js
```

---

## Quality Checklist

Before finishing an essay, verify:

- [ ] **Title is compelling** — not generic, hints at the insight
- [ ] **Description hooks readers** — one sentence that makes them want to read
- [ ] **Opening grabs attention** — scene, question, or surprising fact
- [ ] **Every claim is cited** — with page numbers where possible
- [ ] **relatedPapers all exist** — check `ml-wiki/src/pages/papers/`
- [ ] **relatedConcepts all exist** — check `ml-wiki/src/pages/wiki/`
- [ ] **Citations array is complete** — all cited papers included
- [ ] **Writing flows naturally** — read it aloud
- [ ] **Reading time is accurate** — ~250 words per minute
- [ ] **Closing echoes opening** — satisfying narrative arc
- [ ] **MDX syntax is valid** — no unescaped special characters
- [ ] **Sync script runs successfully** — essay appears in database

---

## Example Essays for Reference

Study these existing essays for style and structure:

- `societies-of-thought.mdx` — Strong opening hook, clear narrative arc
- `the-hidden-cost-of-ai-assistance.mdx` — Practical implications well-developed
- `evolution-of-attention.mdx` — Good handling of technical evolution over time
- `philosophy-of-composition.mdx` — Connecting disparate fields effectively

---

## Common Mistakes to Avoid

1. **Starting with definitions** — Hook readers first, define later
2. **Citation dumping** — Integrate citations into sentences
3. **Jargon without explanation** — Define technical terms in context
4. **Missing page numbers** — Include specific page references
5. **Generic section headers** — Use descriptive, engaging headers
6. **Preaching in the conclusion** — Let implications speak for themselves
7. **Forgetting the `export default`** — Required at the end of MDX files
8. **Linking to nonexistent pages** — Verify all relatedPapers and relatedConcepts exist
