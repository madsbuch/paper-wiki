import { useEffect, useState } from "react";
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

function TranslationStepThrough() {
  const [currentStep, setCurrentStep] = useState(0);

  // Translation example: "Je suis étudiant" -> "I am a student"
  const sourceTokens = ["Je", "suis", "étudiant"];
  const targetTokens = ["<START>", "I", "am", "a", "student"];

  // Simulated encoder representations (showing which source tokens are "active")
  const encoderRepresentations = [
    {
      token: "Je",
      representation: "[0.8, -0.2, 0.5, ...]",
      meaning: "first person singular",
    },
    {
      token: "suis",
      representation: "[0.1, 0.9, -0.3, ...]",
      meaning: 'present tense "to be"',
    },
    {
      token: "étudiant",
      representation: "[-0.4, 0.3, 0.7, ...]",
      meaning: "student (masculine)",
    },
  ];

  // Step-by-step generation process
  const steps = [
    {
      stage: "Encoding",
      description:
        "The encoder processes all input tokens in parallel, creating continuous representations.",
      encoderActive: [true, true, true],
      decoderInput: [],
      decoderOutput: null,
      attention: [] as number[],
      explanation:
        'The encoder reads the entire French sentence at once, understanding "Je" (I), "suis" (am), and "étudiant" (student). It creates vector representations capturing their meanings and relationships.',
    },
    {
      stage: "Decoding Step 1",
      description: 'Generate first output token "I"',
      encoderActive: [true, true, true],
      decoderInput: ["<START>"],
      decoderOutput: "I",
      attention: [0.85, 0.1, 0.05], // Focus heavily on "Je"
      explanation:
        'The decoder starts with <START> token. It attends strongly to "Je" (85% attention weight) since that\'s the subject. It generates "I" as the first English word.',
    },
    {
      stage: "Decoding Step 2",
      description: 'Generate second output token "am"',
      encoderActive: [true, true, true],
      decoderInput: ["<START>", "I"],
      decoderOutput: "am",
      attention: [0.08, 0.87, 0.05], // Focus heavily on "suis"
      explanation:
        'Now the decoder has generated "I". It shifts attention to "suis" (87% weight) to translate the verb. It generates "am", building on what it already wrote.',
    },
    {
      stage: "Decoding Step 3",
      description: 'Generate third output token "a"',
      encoderActive: [true, true, true],
      decoderInput: ["<START>", "I", "am"],
      decoderOutput: "a",
      attention: [0.05, 0.12, 0.83], // Focus heavily on "étudiant"
      explanation:
        'With "I am" generated, the decoder looks at "étudiant" (83% weight). In English, we need the article "a" before "student", which the decoder learned during training.',
    },
    {
      stage: "Decoding Step 4",
      description: 'Generate fourth output token "student"',
      encoderActive: [true, true, true],
      decoderInput: ["<START>", "I", "am", "a"],
      decoderOutput: "student",
      attention: [0.03, 0.05, 0.92], // Almost all attention on "étudiant"
      explanation:
        'Finally, the decoder translates "étudiant" to "student" (92% attention). It has the full context of what it\'s written ("I am a") and focuses on the remaining French word.',
    },
  ];

  const step = steps[currentStep];

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Interactive Exercise: Step Through Translation
      </h2>
      <p className="text-slate-700 mb-6">
        Watch how the encoder-decoder architecture translates{" "}
        <em>"Je suis étudiant"</em> (French) to <em>"I am a student"</em>{" "}
        (English). Click through each step to see how the decoder generates
        output <strong>one token at a time</strong>, attending to different
        parts of the encoder's representation.
      </p>

      <div className="bg-white border-2 border-violet-300 rounded-lg p-6 mb-6">
        {/* Step indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-violet-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-slate-600">{step.stage}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-violet-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current step description */}
        <div className="bg-violet-50 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-violet-900 mb-2">{step.description}</h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            {step.explanation}
          </p>
        </div>

        {/* Encoder visualization */}
        <div className="mb-6">
          <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-2">
              Encoder
            </span>
            Input (French)
          </h4>
          <div className="flex gap-2 mb-3">
            {sourceTokens.map((token, i) => (
              <div
                key={i}
                className={`px-4 py-2 rounded border-2 transition-all ${
                  step.encoderActive[i]
                    ? "bg-blue-100 border-blue-400 text-blue-900 font-semibold"
                    : "bg-slate-100 border-slate-300 text-slate-400"
                }`}
              >
                {token}
              </div>
            ))}
          </div>
          {currentStep >= 0 && (
            <div className="text-xs text-slate-600 space-y-1 animate-fadeIn">
              <p className="font-semibold mb-1">Encoder Representations:</p>
              {encoderRepresentations.map((rep, i) => (
                <p key={i} className="ml-2">
                  <code className="bg-slate-100 px-1 rounded">{rep.token}</code>{" "}
                  →
                  <code className="bg-slate-100 px-1 rounded ml-1">
                    {rep.representation}
                  </code>
                  <span className="text-slate-500 ml-2">({rep.meaning})</span>
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Decoder visualization */}
        {currentStep > 0 && (
          <div className="animate-fadeIn">
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm mr-2">
                Decoder
              </span>
              Output (English)
            </h4>

            {/* Decoder input (previous tokens) */}
            <div className="mb-3">
              <p className="text-xs text-slate-600 mb-1">
                Decoder input (previous tokens):
              </p>
              <div className="flex gap-2">
                {step.decoderInput.map((token, i) => (
                  <div
                    key={i}
                    className="px-3 py-1 rounded bg-green-50 border border-green-300 text-green-800 text-sm"
                  >
                    {token}
                  </div>
                ))}
              </div>
            </div>

            {/* Attention weights visualization */}
            {step.attention.length > 0 && (
              <div className="mb-3 p-3 bg-amber-50 rounded border border-amber-200">
                <p className="text-xs font-semibold text-amber-900 mb-2">
                  Cross-Attention (decoder → encoder):
                </p>
                <div className="space-y-1">
                  {sourceTokens.map((token, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-slate-700 w-20">
                        {token}
                      </span>
                      <div className="flex-1 bg-slate-200 rounded-full h-4 relative">
                        <div
                          className="bg-amber-500 h-4 rounded-full transition-all duration-500"
                          style={{ width: `${step.attention[i] * 100}%` }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-slate-700">
                          {(step.attention[i] * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  The decoder attends most to{" "}
                  <strong>
                    {
                      sourceTokens[
                        step.attention.indexOf(Math.max(...step.attention))
                      ]
                    }
                  </strong>{" "}
                  when generating this token.
                </p>
              </div>
            )}

            {/* Decoder output */}
            <div className="mb-2">
              <p className="text-xs text-slate-600 mb-1">Decoder generates:</p>
              <div className="px-4 py-2 rounded bg-green-500 text-white font-bold inline-block">
                {step.decoderOutput}
              </div>
            </div>

            {/* Full translation so far */}
            <div className="mt-4 p-3 bg-slate-50 rounded border border-slate-200">
              <p className="text-xs text-slate-600 mb-1">
                Full translation so far:
              </p>
              <p className="font-semibold text-slate-900">
                {targetTokens.slice(1, currentStep + 1).join(" ")}
                {currentStep < steps.length - 1 && (
                  <span className="text-slate-400"> ...</span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={() =>
              setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
            }
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
          <button
            onClick={() => setCurrentStep(0)}
            className="px-4 py-2 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors ml-auto"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p className="text-blue-900 font-semibold mb-2">Key Observations:</p>
        <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm">
          <li>
            <strong>Parallel encoding</strong>: All French words are processed
            at once
          </li>
          <li>
            <strong>Sequential decoding</strong>: English words are generated
            one at a time
          </li>
          <li>
            <strong>Auto-regressive</strong>: Each new token depends on
            previously generated tokens
          </li>
          <li>
            <strong>Dynamic attention</strong>: The decoder focuses on different
            source words at each step
          </li>
          <li>
            <strong>Context-aware</strong>: The decoder uses both encoder output
            and its own previous outputs
          </li>
        </ul>
      </div>
    </section>
  );
}

const meta: WikiMeta = {
  title: "Encoder-Decoder Architecture",
  description: "A neural network architecture that maps an input sequence to a continuous representation (encoder) and generates an output sequence from that representation (decoder).",
  category: "Architecture",
  difficulty: "Intermediate",
  tags: ["architecture", "sequence-to-sequence", "neural-networks"],
  relatedConcepts: ["seq2seq", "attention-mechanism", "transformer-architecture"],
  citations: [
    {
      paper: "Attention Is All You Need",
      authors:
        "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I.",
      year: "2017",
      pages: "2-3",
    },
  ]
};

export default function EncoderDecoder() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error("MathJax typesetting failed:", err),
      );
    }
  }, []);

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700">
            Most competitive neural sequence transduction models have an{" "}
            <strong>encoder-decoder structure</strong>. The encoder maps an
            input sequence of symbol representations (x₁, ..., xₙ) to a sequence
            of continuous representations z = (z₁, ..., zₙ). Given z, the
            decoder then generates an output sequence (y₁, ..., yₘ) of symbols
            one element at a time. At each step, the model is auto-regressive,
            consuming the previously generated symbols as additional input when
            generating the next [Vaswani et al., 2017, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Two-Stage Process
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Stage 1: Encoding
          </h3>
          <p className="text-slate-700 mb-4">
            The <strong>encoder</strong> processes the entire input sequence and
            creates a continuous representation:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              Input: Sequence of tokens/symbols (e.g., words in a sentence)
            </li>
            <li>
              Output: Sequence of continuous vectors that capture the meaning
              and context
            </li>
            <li>Processing: All input positions are processed in parallel</li>
          </ul>
          <p className="text-slate-700 mb-4">
            The encoder's job is to understand and represent the input in a form
            the decoder can use.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Stage 2: Decoding
          </h3>
          <p className="text-slate-700 mb-4">
            The <strong>decoder</strong> generates the output sequence one token
            at a time:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              Input: The encoder's continuous representation + previously
              generated output tokens
            </li>
            <li>Output: Next token in the sequence</li>
            <li>Processing: Sequential and auto-regressive</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Auto-Regressive Generation
          </h2>
          <p className="text-slate-700 mb-4">
            A crucial property of the decoder is that it's{" "}
            <strong>auto-regressive</strong>: when generating position i, it can
            only depend on the known outputs at positions less than i [Vaswani
            et al., 2017, p. 3].
          </p>
          <p className="text-slate-700 mb-2">This means:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              Generating the 1st output token uses only the encoder's
              representation
            </li>
            <li>
              Generating the 2nd token uses the encoder representation + the 1st
              token
            </li>
            <li>
              Generating the 3rd token uses the encoder representation + the 1st
              and 2nd tokens
            </li>
            <li>And so on...</li>
          </ul>
          <p className="text-slate-700">
            To enforce this, the decoder's self-attention is modified with{" "}
            <strong>masking</strong> to prevent positions from attending to
            subsequent positions [Vaswani et al., 2017, p. 3].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Transformer's Implementation
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Encoder Structure
          </h3>
          <p className="text-slate-700 mb-2">
            The Transformer encoder consists of a stack of N = 6 identical
            layers. Each layer has [Vaswani et al., 2017, p. 3]:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Multi-head self-attention mechanism</strong>
            </li>
            <li>
              <strong>Position-wise feed-forward network</strong>
            </li>
            <li>
              <strong>Residual connections</strong> around each sub-layer
            </li>
            <li>
              <strong>Layer normalization</strong> after each sub-layer
            </li>
          </ol>
          <p className="text-slate-700 mb-4">
            All sub-layers produce outputs of dimension d_model = 512.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Decoder Structure
          </h3>
          <p className="text-slate-700 mb-2">
            The Transformer decoder also has N = 6 identical layers. Each layer
            has [Vaswani et al., 2017, p. 3]:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Masked multi-head self-attention</strong> (over previous
              decoder outputs)
            </li>
            <li>
              <strong>Multi-head attention over encoder output</strong>{" "}
              (encoder-decoder attention)
            </li>
            <li>
              <strong>Position-wise feed-forward network</strong>
            </li>
            <li>
              <strong>Residual connections</strong> and{" "}
              <strong>layer normalization</strong>
            </li>
          </ol>
          <p className="text-slate-700">
            The key difference: the decoder has an extra attention sub-layer
            that attends to the encoder's output, allowing it to focus on
            relevant parts of the input when generating each output token.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Why This Architecture?
          </h2>
          <p className="text-slate-700 mb-4">
            The encoder-decoder structure with attention provides several
            benefits:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700">
            <li>
              <strong>Separation of Concerns</strong>: The encoder focuses on
              understanding the input, the decoder on generating the output
            </li>
            <li>
              <strong>Variable-Length I/O</strong>: Can handle input and output
              sequences of different lengths
            </li>
            <li>
              <strong>Contextual Generation</strong>: Decoder can selectively
              attend to relevant input positions
            </li>
            <li>
              <strong>Parallel Encoding</strong>: Input can be processed in
              parallel
            </li>
            <li>
              <strong>Flexible Generation</strong>: Output generation can
              condition on full input context
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Applications
          </h2>
          <p className="text-slate-700 mb-4">
            Encoder-decoder architectures excel at{" "}
            <strong>sequence transduction</strong> tasks, including:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Machine translation (e.g., English → German)</li>
            <li>Text summarization (long text → short summary)</li>
            <li>Question answering (question + context → answer)</li>
            <li>Speech recognition (audio → text)</li>
            <li>Image captioning (image → text description)</li>
          </ul>
          <p className="text-slate-700">
            The WMT 2014 English-to-German translation results demonstrate the
            power of this architecture: the Transformer achieved 28.4 BLEU,
            improving over previous best results by over 2.0 BLEU [Vaswani et
            al., 2017, p. 1].
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Translator Analogy: A Story
          </h2>
          <p className="text-slate-700 mb-4">
            Imagine you're a professional translator working with two
            specialists: a reader (encoder) and a writer (decoder).
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            The Reader (Encoder)
          </h3>
          <p className="text-slate-700 mb-4">
            The <strong>reader</strong> receives a document in German and
            carefully studies the entire text:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              They read every sentence, understanding context, idioms, and
              relationships
            </li>
            <li>They make detailed notes about what each part means</li>
            <li>They identify which words relate to which concepts</li>
            <li>
              They create a comprehensive internal representation of the
              document's meaning
            </li>
          </ul>
          <p className="text-slate-700 mb-4">
            Crucially, the reader examines the{" "}
            <strong>entire document at once</strong>, making connections between
            the beginning, middle, and end. They understand that the pronoun
            "sie" in paragraph 5 refers back to "die Frau" mentioned in
            paragraph 2.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            The Writer (Decoder)
          </h3>
          <p className="text-slate-700 mb-4">
            The <strong>writer</strong> creates the English translation{" "}
            <strong>one sentence at a time</strong>:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>They start with the reader's notes (encoder output)</li>
            <li>
              For each new English sentence they write:
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>
                  They review what they've already written (previous output
                  tokens)
                </li>
                <li>
                  They consult the reader's notes, focusing on the relevant
                  German passages
                </li>
                <li>
                  They write the next sentence that flows naturally from what
                  came before
                </li>
              </ul>
            </li>
          </ul>
          <p className="text-slate-700 mb-4">
            <strong>The Auto-Regressive Nature</strong>: The writer can't see
            "future" English sentences they haven't written yet—they can only
            look at what's already been written. This is enforced by masking in
            the decoder's self-attention. They build the translation
            incrementally, where each sentence depends on the previous ones.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>The Cross-Attention Link</strong>: When writing sentence 5
            in English, the writer might need to focus heavily on German
            paragraph 3 (where the relevant information is). This selective
            focus is the encoder-decoder attention mechanism—the writer queries
            the reader's notes to find what's most relevant for the current
            output.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Why Two Separate Roles?
          </h3>
          <p className="text-slate-700 mb-4">
            You might ask: why not have one person do both jobs?
          </p>
          <p className="text-slate-700 mb-4">
            The separation provides key advantages:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Parallel Understanding</strong>: The reader can process
              the entire German document simultaneously, understanding all
              contexts at once
            </li>
            <li>
              <strong>Sequential Fluency</strong>: The writer generates English
              one piece at a time, ensuring grammatical flow and coherence
            </li>
            <li>
              <strong>Flexible Attention</strong>: The writer can selectively
              consult any part of the reader's notes as needed, focusing on
              different input sections for different output sections
            </li>
          </ul>
          <p className="text-slate-700">
            This is the encoder-decoder architecture: two complementary
            processes that together transform one sequence into another,
            combining global understanding with sequential generation.
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <TranslationStepThrough />
      </div>
    </WikiLayout>
  );
}
