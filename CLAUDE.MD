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

## Project Structure

```
wiki-tech/
├── ml-wiki/                        # Main application
│   ├── public/
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

### MDX Syntax Guidelines

**CRITICAL**: MDX combines Markdown with JSX, which means certain characters have special meaning and must be escaped or handled properly.

**Common Errors to Avoid:**

1. **Comparison Operators (`<` and `>`)**:
   - MDX interprets `<` as the start of a JSX tag
   - **WRONG**: `performance < 50%` or `value > 100`
   - **CORRECT**: Use HTML entities: `performance &lt; 50%` or `value &gt; 100`
   - Alternative: Use code formatting: `` `performance < 50%` ``

2. **Curly Braces (`{` and `}`)**:
   - MDX interprets `{` as the start of a JSX expression
   - **WRONG**: `The set {1, 2, 3}` in regular text
   - **CORRECT**: Escape with backslash: `The set \{1, 2, 3\}`
   - Alternative: Use code formatting: `` `{1, 2, 3}` ``

3. **Layout Component Props**:
   - **WRONG**: `<WikiLayout meta={meta}>` (passing meta as prop)
   - **CORRECT**: `<WikiLayout {...meta}>` (spreading meta object)
   - All layout components (WikiLayout, EssayLayout, PaperLayout, ProjectLayout) expect individual props

4. **Mathematical Notation**:
   - For complex math, use code blocks with triple backticks
   - For inline math with special characters, use HTML entities or code formatting
   - Example: `x &lt; y &lt; z` or `` `x < y < z` ``

**Quick Reference for HTML Entities:**

- `&lt;` for `<` (less than)
- `&gt;` for `>` (greater than)
- `&amp;` for `&` (ampersand)
- `&quot;` for `"` (quote)
- `&apos;` for `'` (apostrophe)

**Testing and Validation:**

- **ALWAYS** run the MDX validator after creating/editing MDX files: `node scripts/validate-mdx.js`
- The validator will catch unescaped comparison operators and other common errors
- Fix all errors before committing - zero errors required
- After validation, run the dev server to test in browser
- Check the browser console for MDX compilation errors
- Common error: "Unexpected character" or "X is not defined" usually means unescaped special characters
- Look for `<`, `>`, `{`, `}` in regular text outside of code blocks

**Validation Script:**

The project includes an automated MDX validator at `scripts/validate-mdx.js` that checks for:

- Unescaped `<` and `>` characters (must use `&lt;` and `&gt;`)
- Unescaped `{` and `}` characters in text (must use `\{` and `\}`)
- Incorrect layout component usage (must use `{...meta}` spread)

Run it before committing:

```bash
node scripts/validate-mdx.js              # Validate all MDX files
node scripts/validate-mdx.js path/to/file.mdx  # Validate specific file
```

### Citation Format

All claims should reference papers like:

- `[Paper Title, Author et al., Year]`
- Include page numbers for specific claims
- Link to the actual paper in the papers directory

## Paper Ingestion Workflow

The project uses a local PDF ingestion pipeline to extract, chunk, and embed academic papers into a searchable SQLite database.

### Step 1: Add Paper to Papers Directory

1. Add paper PDF to the `/papers/` directory in the project root
2. Use arXiv filename format if possible (e.g., `1706.03762v7.pdf`)
3. Or use descriptive filename (e.g., `attention-is-all-you-need.pdf`)

### Step 2: Ingest Paper into Database

Run the ingestion script to process the PDF:

```bash
# Ingest a single paper
python scripts/pdf-ingestion/ingest.py papers/1706.03762v7.pdf

# Ingest all papers in directory
python scripts/pdf-ingestion/ingest.py papers/
```

The script will:
- Extract text with page tracking
- Parse metadata (title, authors, year, arXiv ID)
- Chunk text into ~1000 character segments with overlap
- Generate OpenAI embeddings (text-embedding-3-small)
- Store everything in SQLite database at `scripts/pdf-ingestion/papers.db`

### Step 3: Query Papers for Content Extraction

Use the search functionality to find relevant content:

```bash
# Search for specific concepts
python scripts/pdf-ingestion/ingest.py --search "attention mechanisms"

# Get more results
python scripts/pdf-ingestion/ingest.py --search "transformer architecture" --limit 10
```

Search returns:
- Most relevant text chunks with similarity scores
- Page numbers for citation
- Paper metadata (title, authors, year)
- Full chunk content for analysis

### Step 4: Extract Content for Wiki

Use search results to:
- Identify key concepts for wiki entries
- Extract definitions and explanations
- Find relevant citations with page numbers
- Pull technical details for implementation

**Direct Database Access:**

For more complex queries, access the SQLite database directly:

```python
import sqlite3

conn = sqlite3.connect("scripts/pdf-ingestion/papers.db")
cursor = conn.cursor()

# Get all papers
cursor.execute("SELECT id, title, authors, year FROM papers")

# Get chunks from specific paper
cursor.execute("""
    SELECT content, page_numbers
    FROM chunks
    WHERE paper_id = ?
    ORDER BY chunk_index
""", (paper_id,))
```

**Cost:**
- ~$0.001 per paper for embeddings (OpenAI text-embedding-3-small)
- ~100 papers costs ~$0.10

**Requirements:**
- Python packages: `pdfplumber`, `openai`, `langchain-text-splitters`, `tiktoken`, `numpy`
- OpenAI API key (stored in `.env` file)
- See `scripts/pdf-ingestion/README.md` for full documentation

## Content Creation Workflows

### Paper Page Creation Workflow

When creating a paper page at `/ml-wiki/src/pages/papers/<slug>.tsx`, follow these guidelines:

**Required Props:**

- `title`: Full paper title
- `authors`: Complete author list in citation format
- `year`: Publication year
- `venue`: Conference/journal name
- `arxivId`: Full arXiv ID with version (e.g., "1706.03762v7")
- `arxivUrl`: **MUST be arXiv URL** in format `https://arxiv.org/abs/XXXXXX` (without version suffix)
- `abstract`: Paper abstract
- `keyContributions`: Array of key contributions
- `relatedConcepts`: Array of `{name, slug}` objects linking to wiki concepts
- `impact`: Impact statement describing the paper's significance

**CRITICAL: arXiv URL Format**

- Always use `arxivUrl` prop (not `pdfPath`)
- Format: `https://arxiv.org/abs/` + base ID (without version)
- Example: For arXiv ID "1706.03762v7", use `arxivUrl="https://arxiv.org/abs/1706.03762"`
- The "View on arXiv" button will link users directly to the arXiv page where they can download the PDF

**Example:**

```tsx
<PaperLayout
  title="Attention Is All You Need"
  authors="Vaswani, A., et al."
  year="2017"
  venue="NIPS 2017"
  arxivId="1706.03762v7"
  arxivUrl="https://arxiv.org/abs/1706.03762"
  // ... other props
/>
```

### Wiki Concept Workflow

Wiki pages should provide understanding at multiple levels through three aspects:

1. **Formal Definition and Explanation** - Technical, rigorous explanation with citations
2. **Story / Analogy** - Narrative or analogy to contextualize and build intuition
3. **Exercise** - Hands-on activity to internalize the concept

**IMPORTANT**: These are aspects to include, NOT a rigid structure. The page should flow naturally.

**Process:**

1. Search the ingested papers database for relevant content:
   ```bash
   python scripts/pdf-ingestion/ingest.py --search "attention mechanism" --limit 10
   ```
2. Review search results to identify key concepts (e.g., "Attention Mechanism", "Transformer Architecture")
3. Query database for specific details about each concept
4. Create MDX files for each concept in `/ml-wiki/src/pages/wiki/`
5. Write content that naturally incorporates the three aspects:
   - **Formal Definition**: Can be in "Overview", "Definition", "How It Works", etc. - whatever feels natural
   - **Story / Analogy**: Can be a dedicated "Story" section, or woven into explanations with "Think of it like..." or "Imagine..." - use judgment
   - **Exercise**: Usually works best as a dedicated section at the end, but placement should feel natural
6. Add whatever other sections make sense (Architecture, Implementation, Examples, etc.)
7. Cross-link related concepts
8. Verify all citations are accurate with page numbers from search results

**Content Guidelines:**

The three aspects MUST be present somewhere, but the structure should feel natural and appropriate for the concept:

```tsx
// Example 1: Natural flow with sections that make sense
export default function TransformerArchitecture() {
  return (
    <WikiLayout {...meta}>
      <section>
        <h2>Overview</h2>
        [Brief introduction with formal definition woven in naturally]
      </section>

      <section>
        <h2>Key Innovation</h2>
        [What makes this important, with analogies if helpful]
      </section>

      <section>
        <h2>Architecture Components</h2>
        [Technical details, formulas, implementation]
      </section>

      <section>
        <h2>The Assembly Line Story</h2>
        [Story/analogy section - can be anywhere that flows well]
      </section>

      <section>
        <h2>Exercise</h2>
        [Interactive exercise with show/hide answer]
      </section>
    </WikiLayout>
  );
}

// Example 2: Analogies woven throughout
export default function Tokenization() {
  return (
    <WikiLayout {...meta}>
      <section>
        <h2>What is Tokenization?</h2>
        <p>[Formal definition]</p>
        <p>Think of tokenization like breaking speech into words... [analogy inline]</p>
      </section>

      <section>
        <h2>Why It Matters</h2>
        [Technical explanation]
      </section>

      <section>
        <h2>Strategies</h2>
        [Different approaches with examples]
      </section>

      <section>
        <h2>The Analogy: Digital Audio</h2>
        [Deeper analogy if needed]
      </section>

      <section>
        <h2>Try It Yourself</h2>
        [Interactive exercise]
      </section>
    </WikiLayout>
  );
}
```

**Guidelines:**

- **Formal Definition**: Should be sufficient for someone with the prerequisites to implement or use the concept. Can be in any section that makes sense ("Overview", "Definition", "How It Works", etc.)
- **Story/Analogy**: Should make the concept memorable and provide context for why it matters. Can be:
  - A dedicated section (like "The Assembly Line Story")
  - Woven inline ("Think of it like...", "Imagine...")
  - Multiple analogies throughout if that helps
- **Exercise**: Should be completable in 5-15 minutes and reinforce key insights. Usually best as a dedicated section, but use judgment.
- All three aspects must be present somewhere in the page
- All content must be citation-backed and accurate
- The page should read naturally - don't force structure
- Look at transformer-architecture.tsx as a good example of natural flow
- **Section naming**: Use whatever section names make sense for the content:
  - "Overview", "Definition", "How It Works" for formal explanations
  - "Key Innovation", "Why It Matters", "Applications" for context
  - "The [X] Analogy", "Story", or just weave analogies inline
  - "Exercise", "Try It Yourself", "Practice" for hands-on work
  - Add any other sections that help (Examples, Implementation Details, History, etc.)
- **Cross-linking**: Wiki pages MUST link to related content:
  - Link to papers that introduce or use the concept (in citations and body text)
  - Link to related wiki concepts (use markdown links: `[Concept Name](/wiki/concept-slug)`)
  - Link to relevant projects or essays that apply the concept
  - Include `relatedConcepts` in metadata with proper slugs
  - Use inline links within the text to connect ideas naturally

**Interactive Exercise Patterns:**

Exercises MUST be interactive - users should actively engage, not just read. Be creative! Here are some patterns:

**Pattern 1: Input & Validation**
```tsx
import { useState } from 'react';

export default function ConceptName() {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const checkAnswer = () => {
    const answer = parseInt(userAnswer);
    if (answer === 9) {
      setFeedback('✓ Correct! RNN needs 9 sequential operations.');
    } else {
      setFeedback(`Not quite. Think about how many layers information must pass through...`);
    }
  };

  return (
    <section>
      <h2>Exercise: Calculate Path Length</h2>
      <p>For an RNN with sequence length 10, how many sequential operations
         are needed for information to flow from position 1 to position 10?</p>

      <div className="flex gap-2 my-4">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="Your answer..."
        />
        <button onClick={checkAnswer} className="bg-blue-500 text-white px-4 py-2 rounded">
          Check Answer
        </button>
      </div>
      {feedback && <div className="mt-2 p-3 bg-green-50 rounded">{feedback}</div>}
    </section>
  );
}
```

**Pattern 2: Multi-Step Calculator**
```tsx
export default function TokenizationExercise() {
  const [step, setStep] = useState(0);
  const [tokens, setTokens] = useState([]);

  const tokenize = (text) => {
    // Interactive tokenization logic
    return text.split(' ');
  };

  return (
    <section>
      <h2>Try It: Tokenize a Sentence</h2>
      {step === 0 && (
        <div>
          <p>Enter a sentence to tokenize:</p>
          <input onChange={(e) => setTokens(tokenize(e.target.value))} />
        </div>
      )}
      {tokens.length > 0 && (
        <div>
          <p>Tokens: {tokens.map((t, i) => <span key={i} className="token">{t}</span>)}</p>
          <p>Total: {tokens.length} tokens</p>
        </div>
      )}
    </section>
  );
}
```

**Pattern 3: Slider/Interactive Visualization**
```tsx
export default function ComplexityExercise() {
  const [seqLength, setSeqLength] = useState(100);

  const calcComplexity = (n) => ({
    rnn: n * 512 * 512,
    attention: n * n * 512
  });

  const complexity = calcComplexity(seqLength);

  return (
    <section>
      <h2>Explore: Computational Complexity</h2>
      <label>Sequence Length: {seqLength}</label>
      <input
        type="range"
        min="10"
        max="10000"
        value={seqLength}
        onChange={(e) => setSeqLength(e.target.value)}
      />
      <div>
        <p>RNN Operations: {complexity.rnn.toLocaleString()}</p>
        <p>Self-Attention Operations: {complexity.attention.toLocaleString()}</p>
        <p>Winner: {complexity.rnn < complexity.attention ? 'RNN' : 'Self-Attention'}</p>
      </div>
    </section>
  );
}
```

**Pattern 4: Multiple Choice with Immediate Feedback**
```tsx
export default function QuizExercise() {
  const [selected, setSelected] = useState(null);

  const options = [
    { id: 'a', text: 'O(1)', correct: true },
    { id: 'b', text: 'O(n)', correct: false },
    { id: 'c', text: 'O(n²)', correct: false },
  ];

  return (
    <section>
      <h2>Quick Check</h2>
      <p>What is the path length for self-attention?</p>
      {options.map(opt => (
        <button
          key={opt.id}
          onClick={() => setSelected(opt.id)}
          className={`block my-2 p-2 rounded ${
            selected === opt.id
              ? opt.correct ? 'bg-green-100' : 'bg-red-100'
              : 'bg-gray-100'
          }`}
        >
          {opt.text}
          {selected === opt.id && (opt.correct ? ' ✓' : ' ✗')}
        </button>
      ))}
    </section>
  );
}
```

**Pattern 5: Step-by-Step Guided Calculation**
```tsx
export default function StepByStepExercise() {
  const [answers, setAnswers] = useState({});

  return (
    <section>
      <h2>Work Through: Attention Calculation</h2>
      <div className="space-y-4">
        <div>
          <p>Step 1: Calculate attention scores</p>
          <input
            type="text"
            onChange={(e) => setAnswers({...answers, step1: e.target.value})}
            placeholder="e₁₁ = ?"
          />
        </div>
        {answers.step1 && (
          <div>
            <p>Step 2: Apply softmax</p>
            <input placeholder="α₁₁ = ?" />
          </div>
        )}
        {/* More steps as needed */}
      </div>
    </section>
  );
}
```

**Guidelines:**

- **Make it interactive**: Users should type, click, drag, or manipulate something
- **Provide immediate feedback**: Don't make users wait to know if they're right
- **Be creative**: Sliders, calculators, visualizations, quizzes, fill-in-the-blank, etc.
- **Match the concept**: Math concepts → calculators, Algorithms → step-through, Comparisons → sliders
- **Keep it simple**: 5-15 minutes max, focus on one key insight
- **Use appropriate input types**: numbers for calculations, text for code, radio/checkboxes for choices

The `animate-fadeIn` class is defined in `/ml-wiki/src/index.css` for smooth transitions.

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

- OpenAI API key with TTS access (stored in `.env` file in project root)
- Node.js 18+ installed

**Generate Audio:**

The OpenAI API key is stored in the `.env` file at the project root as `OPEN_AI_API_KEY`. The audio generation script automatically reads this key when needed.

```bash
# Generate audio for a single essay (reads API key from .env automatically)
OPENAI_API_KEY="$(grep OPEN_AI_API_KEY .env | cut -d '=' -f 2 | tr -d '"')" node scripts/generate-audio.js <essay-slug>

# Example
OPENAI_API_KEY="$(grep OPEN_AI_API_KEY .env | cut -d '=' -f 2 | tr -d '"')" node scripts/generate-audio.js transformers-continuous-mathematics

# Generate audio for all essays
OPENAI_API_KEY="$(grep OPEN_AI_API_KEY .env | cut -d '=' -f 2 | tr -d '"')" node scripts/generate-audio.js --all
```

**Important:** The API key is read from the `.env` file. Never commit the `.env` file to version control.

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
  audioPath: "/audio/your-essay-slug.mp3", // Add this line
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

Projects are hands-on learning experiences that range from quick exercises to multi-week implementations. All projects are language-agnostic and grounded in academic papers.

**Project Categories:**

1. **Exercises (10-30 minutes)**
   - Quick challenges focusing on understanding
   - Work through calculations, derivations, or proofs by hand
   - No code deliverables - just answers and understanding
   - Examples: "Calculate Multi-Head Attention by Hand", "Derive Cross-Entropy Gradient", "Prove Transformer Universal Approximation"

2. **Weekend Projects (1-2 days)**
   - Hands-on implementations with tangible outputs
   - Interesting but not novel - well-understood techniques
   - Complete small systems or components
   - Examples: "Build a Mini-GPT from Scratch", "Fine-Tune BERT for Sentiment Analysis", "Apply LoRA to Fine-Tune a Large Model"

3. **Large Projects (multiple weeks)**
   - Substantial implementations with novel aspects
   - **CRITICAL**: Must clearly identify what is novel
   - Can lead to publishable work or significant learning
   - Examples: "Building a Small Transformer for Translation" (novel: custom positional encoding for morphologically-rich languages)

**Requirements:**

1. **Paper-grounded** - Must reference specific papers that describe the techniques
2. **Category-appropriate scope** - Exercises are quick, Weekend projects are doable in 1-2 days, Large projects take weeks
3. **Language-agnostic** - Use pseudocode and high-level descriptions
4. **Practical** - Include implementation guidance and verification strategies
5. **Self-contained** - Should be understandable independently
6. **Novel aspects** (Large Projects only) - Clearly state what makes this project novel/interesting

**Process:**

1. Identify the appropriate category for your project
2. Query papers via MCP to extract relevant information
3. For Large Projects: Identify and clearly define the novel aspect
4. Design the project structure and break into steps
5. Write the project guide in MDX format in `/ml-wiki/src/pages/projects/`
6. Include citations to relevant papers
7. Add metadata with all required fields including `category` and `novel` (for Large Projects)
8. Add project to projects index at `/ml-wiki/src/pages/projects/index.tsx`

**Metadata Structure:**

```typescript
// Exercise Example
export const meta = {
  title: "Calculate Multi-Head Attention by Hand",
  description:
    "Work through the mathematics of attention with concrete examples...",
  category: "Exercise",
  difficulty: "Beginner",
  estimatedTime: "15-20 min",
  relatedPapers: [
    { title: "Attention Is All You Need", slug: "attention-is-all-you-need" },
  ],
  relatedConcepts: [
    { name: "Multi-Head Attention", slug: "multi-head-attention" },
  ],
  prerequisites: ["Linear algebra basics"],
};

// Weekend Project Example
export const meta = {
  title: "Build a Mini-GPT from Scratch",
  description: "Implement a small GPT-style language model and train it...",
  category: "Weekend Project",
  difficulty: "Intermediate",
  estimatedTime: "1-2 days",
  relatedPapers: [
    { title: "Attention Is All You Need", slug: "attention-is-all-you-need" },
  ],
  relatedConcepts: [
    { name: "Transformer Architecture", slug: "transformer-architecture" },
  ],
  prerequisites: ["Neural networks basics", "PyTorch or TensorFlow"],
};

// Large Project Example
export const meta = {
  title: "Building a Small Transformer for Translation",
  description: "Implement a complete Transformer model for translation...",
  category: "Large Project",
  difficulty: "Advanced",
  estimatedTime: "2-3 weeks",
  novel:
    "Custom positional encoding scheme designed for morphologically-rich languages with flexible word order",
  relatedPapers: [
    { title: "Attention Is All You Need", slug: "attention-is-all-you-need" },
  ],
  relatedConcepts: [
    { name: "Transformer Architecture", slug: "transformer-architecture" },
  ],
  prerequisites: ["Deep learning fundamentals", "Attention mechanisms"],
};
```

**Key Differences Between Categories:**

| Aspect        | Exercise             | Weekend Project        | Large Project   |
| ------------- | -------------------- | ---------------------- | --------------- |
| Time          | 10-30 min            | 1-2 days               | Multiple weeks  |
| Deliverable   | Answer/Understanding | Working implementation | Novel system    |
| Code          | None or minimal      | Substantial            | Complete system |
| Novel Aspect  | Not required         | Not required           | **Required**    |
| Prerequisites | Minimal              | Moderate               | Significant     |

**Examples by Category:**

**Exercises:**

- "Calculate Multi-Head Attention by Hand"
- "Derive the Gradient of Cross-Entropy Loss"
- "Prove Transformer Universal Approximation"

**Weekend Projects:**

- "Build a Mini-GPT from Scratch"
- "Fine-Tune BERT for Sentiment Analysis"
- "Implementing Few-Shot Learning with Prompt Engineering"
- "Apply LoRA to Fine-Tune a Large Model"

**Large Projects:**

- "Building a Small Transformer for Translation" (novel: custom positional encodings)
- "Constitutional AI for Domain-Specific Alignment" (novel: domain-specific principles and metrics)

## System Consistency Requirements

**CRITICAL**: For every paper in the collection, the following properties MUST always be true:

### 1. Concepts Extracted

- All key concepts from the paper have been identified
- Each concept has a corresponding MDX file in `/ml-wiki/src/pages/wiki/`
- Wiki entries include proper citations referencing the paper

### 2. Paper Page Entry

- Paper has individual page at `/ml-wiki/src/pages/papers/<slug>.tsx`
- Paper is listed in papers index at `/ml-wiki/src/pages/papers/index.tsx`
- Contains: title, authors, year, venue, abstract, key contributions, related concepts, impact statement
- **IMPORTANT**: Paper pages must link to arXiv (not local PDFs) - use `arxivUrl` prop pointing to `https://arxiv.org/abs/XXXXXX` format

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

- [ ] Paper PDF exists in local storage
- [ ] Paper uploaded to LlamaCloud and indexed
- [ ] Key concepts extracted via MCP queries
- [ ] Wiki entries created for all concepts
- [ ] Individual paper page created at `/ml-wiki/src/pages/papers/<slug>.tsx`
- [ ] Paper page uses `arxivUrl` prop (not `pdfPath`) pointing to `https://arxiv.org/abs/XXXXXX`
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
