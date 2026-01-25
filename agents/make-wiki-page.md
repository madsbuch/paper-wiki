# Make Wiki Page Agent Instructions

When creating a wiki concept page, follow these instructions to produce content that is **formally rigorous yet naturally readable**.

## Core Philosophy

A wiki page teaches a concept through three complementary approaches:

1. **Formal Definition** — What it *is*, precisely
2. **Intuitive Understanding** — Why it makes sense, through analogy or story
3. **Active Practice** — A small exercise to solidify the concept

The page should feel like a conversation with a knowledgeable friend who happens to have expertise, not like reading a textbook or encyclopedia entry.

---

## Page Structure

Create the wiki page at `ml-wiki/src/pages/wiki/<slug>.tsx` using the `WikiLayout` component.

### Required Sections

#### 1. Overview / Definition (2-3 paragraphs)

Start with a clear, formal definition. Be precise but accessible.

**Good:**
> The attention mechanism allows a neural network to selectively focus on different parts of the input when producing each part of the output. Instead of compressing the entire input into a single fixed-length vector, attention lets the model dynamically access all input positions as needed.

**Bad (too dry):**
> Attention is a function that maps a query and a set of key-value pairs to an output.

**Bad (too informal):**
> So basically attention is when the model looks at stuff more carefully.

Include at least one citation backing up the definition.

#### 2. The Problem It Solves (1-2 paragraphs)

Explain *why* this concept exists. What limitation or challenge does it address? This provides motivation before diving deeper.

#### 3. How It Works (flexible length)

The technical meat. Include:
- Core formulas with explanations (use MathJax via `dangerouslySetInnerHTML`)
- Step-by-step breakdown of the mechanism
- Visual representations where helpful (ASCII diagrams, comparison tables)

Keep it accurate but don't assume advanced prerequisite knowledge unless explicitly stated.

#### 4. Analogy or Story Section

**This is required and should have its own heading.**

Create an analogy that:
- Maps to the actual mechanism (not just surface similarity)
- Uses familiar, everyday situations
- Illuminates *why* the approach works, not just *what* it does

**Example patterns that work:**

- **The Research Assistant** (for attention): Like having an assistant who finds and highlights relevant sections from source papers for each paragraph you write
- **The Translator's Notebook** (for encoder-decoder): Like reading an entire speech, jotting notes, then translating from notes alone
- **The Apprentice Chef** (for transfer learning): Like a chef trained in French cuisine adapting to Italian—most skills transfer, only details change

**What makes a good analogy:**
- Concrete and visual
- The relationships between elements map correctly to the technical concept
- Reveals insight about *why* the approach is effective

**Avoid:**
- Analogies that require as much explanation as the concept itself
- Overly cute comparisons that sacrifice accuracy
- Generic "it's like X but for computers" framings

#### 5. Exercise Section

**This is required.**

Create a small interactive exercise that lets readers practice the concept. The exercise should:

- Be completable in 2-5 minutes
- Test understanding of the core mechanism
- Provide immediate feedback
- Use React state for interactivity

**Good exercise types:**
- Adjust parameters and see the effect (like setting attention weights)
- Compare approaches side-by-side (like standard vs chain-of-thought prompting)
- Match inputs to outputs
- Predict what happens given certain inputs

**Implementation notes:**
- Use React `useState` for interactivity
- Keep the UI simple (sliders, buttons, text inputs)
- Provide clear instructions and feedback
- Include hints for users who get stuck

#### 6. Impact / Why It Matters (1-2 paragraphs)

Concrete results or historical significance. Include specific numbers/benchmarks where available, with citations.

#### 7. Related Concepts

Link to other wiki pages. Format as a list with brief descriptions:

```tsx
<ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
  <li><a href="/wiki/encoder-decoder" className="text-blue-600 hover:text-blue-800 underline">Encoder-Decoder Architecture</a> - The architecture that attention improves</li>
  <li><a href="/wiki/transformer-architecture" className="text-blue-600 hover:text-blue-800 underline">Transformer Architecture</a> - Pure attention-based architecture</li>
</ul>
```

---

## Writing Style Guidelines

### Natural Flow

Write in a way that flows naturally when read aloud. Vary sentence length. Use transitions between ideas.

**Good:**
> Think of it like reading a textbook while answering exam questions. You don't memorize the entire textbook into one thought before answering. Instead, for each question, you flip back to the relevant sections and focus your attention there. The attention mechanism does exactly this for neural networks.

**Bad (choppy):**
> It works like a textbook. You read the textbook. You answer questions. You don't memorize everything. You look things up.

### Citation Integration

Weave citations into the narrative rather than dumping them at paragraph ends.

**Good:**
> "A potential issue with this encoder–decoder approach is that a neural network needs to be able to compress all the necessary information of a source sentence into a fixed-length vector" [Bahdanau et al., 2014, p. 1]. Imagine trying to summarize an entire book in one sentence.

**Bad:**
> The encoder-decoder has issues with long sequences. This is a problem because long sequences are common [Bahdanau et al., 2014].

### Technical Accuracy

- Every claim should be verifiable
- Formulas must be correct
- Use precise terminology but explain it
- Don't oversimplify to the point of incorrectness

---

## Template

```tsx
import { useEffect, useState } from 'react';
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

// Optional: Exercise component if complex
function ConceptExercise() {
  const [state, setState] = useState(/* initial state */);

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Exercise: [Title]</h2>
      <p className="text-slate-700 mb-6">[Brief instructions]</p>
      {/* Interactive elements */}
    </section>
  );
}

const meta: WikiMeta = {
  title: "Concept Name",
  description: "One-sentence description for metadata/previews.",
  category: "Category Name",  // e.g., "Architecture Components", "Training Techniques"
  difficulty: "Beginner|Intermediate|Advanced",
  tags: ["tag1", "tag2"],
  relatedConcepts: ["concept-slug-1", "concept-slug-2"],
  citations: [
    {
      paper: "Full Paper Title",
      authors: "Author, A., Author, B., & Author, C.",
      year: "2024",
      pages: "1-5"
    }
  ]
};

export default function ConceptName() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700">
            [Formal definition with citation]
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Problem It Solves</h2>
          <p className="text-slate-700">
            [Motivation and context]
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-700 mb-4">[Technical explanation]</p>
          {/* Formulas, diagrams, etc. */}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">[Analogy Title]</h2>
          <p className="text-slate-700">
            [Relatable story or analogy that maps to the concept]
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <ConceptExercise />

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact</h2>
          <p className="text-slate-700">
            [Why this matters, concrete results]
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li><a href="/wiki/related-concept" className="text-blue-600 hover:text-blue-800 underline">Related Concept</a> - Brief description</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
```

---

## Quality Checklist

Before finishing a wiki page, verify:

- [ ] **Formal definition** is precise and cited
- [ ] **Analogy/story** section exists with its own heading
- [ ] **Exercise** is interactive and tests the core concept
- [ ] Writing flows **naturally** — read it aloud
- [ ] **Citations** are woven into the text, not dumped
- [ ] **Technical accuracy** — formulas and claims are correct
- [ ] **Related concepts** link to other wiki pages
- [ ] Page renders without errors (MathJax, React state, etc.)
