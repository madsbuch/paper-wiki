import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function SequencetoSequenceModels() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "Sequence-to-Sequence Models",
  category: "Architecture",
  description: "A neural network architecture that transforms one sequence into another, consisting of an encoder that processes the input and a decoder that generates the output.",
  relatedConcepts: ["encoder-decoder", "attention-mechanism", "rnn", "machine-translation"],
  citations: [
    {
      paper: "Neural Machine Translation by Jointly Learning to Align and Translate",
      authors: "Bahdanau, D., Cho, K., & Bengio, Y.",
      year: "2014",
      pages: "1-2"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What are Sequence-to-Sequence Models?</h2>
          <p className="text-slate-700 mb-4">Sequence-to-sequence (seq2seq) models are neural networks designed to transform one sequence into another sequence of potentially different length. They're the foundation of modern machine translation, text summarization, dialogue systems, and many other sequence transformation tasks.</p>
          <p className="text-slate-700 mb-4">Think of seq2seq like a translator who first reads and understands an entire sentence in one language (encoding), then expresses that understanding in another language (decoding).</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Core Architecture</h2>
          <p className="text-slate-700 mb-4">A seq2seq model consists of two main components:</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">1. Encoder</h3>
          <p className="text-slate-700 mb-4">The encoder processes the input sequence and compresses it into a fixed-length representation:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input: x1, x2, x3, ..., xT
              ↓
            Encoder RNN
              ↓
            Context vector c (fixed length)
          </code></pre>
          <p className="text-slate-700 mb-4">"The models proposed recently for neural machine translation often belong to a family of encoder-decoders and encode a source sentence into a fixed-length vector from which a decoder generates a translation" [Bahdanau et al., 2014, p. 1].</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. Decoder</h3>
          <p className="text-slate-700 mb-4">The decoder generates the output sequence from the context vector:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Context vector c
              ↓
            Decoder RNN
              ↓
            Output: y1, y2, y3, ..., yT'
          </code></pre>
          <p className="text-slate-700 mb-4">The decoder is typically an autoregressive model, generating one token at a time based on the context and previously generated tokens.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How Seq2Seq Works</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Encoding Phase</h3>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            h1 = f(h0, x1)
            h2 = f(h1, x2)
            h3 = f(h2, x3)
            ...
            hT = f(hT-1, xT)
            
            c = hT  (context = final hidden state)
          </code></pre>
          <p className="text-slate-700 mb-4">The encoder processes the input sequence token by token, updating its hidden state. The final hidden state becomes the context vector.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Decoding Phase</h3>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            s1 = g(s0, c, y0)  → predict y1
            s2 = g(s1, c, y1)  → predict y2
            s3 = g(s2, c, y2)  → predict y3
            ...
          </code></pre>
          <p className="text-slate-700 mb-4">The decoder generates output tokens one at a time, using:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>The context vector c</li>
            <li>Its own hidden state</li>
            <li>The previously generated token</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Example: Machine Translation</h2>
          <p className="text-slate-700 mb-4">Translating "Je suis étudiant" → "I am a student"</p>
          <p className="text-slate-700 mb-4"><strong>Encoding:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input: [Je] [suis] [étudiant]
              ↓
            Encoder RNN processes left-to-right
              ↓
            Context vector c (captures meaning)
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Decoding:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            c → Decoder → [I]
            c + [I] → Decoder → [am]
            c + [I] + [am] → Decoder → [a]
            c + [I] + [am] + [a] → Decoder → [student]
            c + [I] + [am] + [a] + [student] → Decoder → [EOS]
          </code></pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Fixed-Length Bottleneck Problem</h2>
          <p className="text-slate-700 mb-4">The original seq2seq architecture had a critical limitation:</p>
          <p className="text-slate-700 mb-4">"We conjecture that the use of a fixed-length vector is a bottleneck in improving the performance of this basic encoder-decoder architecture" [Bahdanau et al., 2014, p. 1].</p>
          <p className="text-slate-700 mb-4"><strong>The problem:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Long input sequences must compress into a single fixed-size vector</li>
            <li>Information loss increases with sequence length</li>
            <li>Decoder must reconstruct everything from one vector</li>
            <li>Performance degrades on long sequences</li>
          </ul>
          <p className="text-slate-700 mb-4">This bottleneck led to the invention of the attention mechanism, which allows the decoder to access all encoder states instead of just a single context vector.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Seq2Seq with Attention</h2>
          <p className="text-slate-700 mb-4">Modern seq2seq models use attention to overcome the bottleneck:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Encoder:
            x1, x2, ..., xT → h1, h2, ..., hT (all states available)
            
            Decoder with Attention:
            For each output position i:
              - Compute attention over all encoder states
              - Create dynamic context ci (weighted combination)
              - Generate yi using ci and previous outputs
          </code></pre>
          <p className="text-slate-700 mb-4">This is a major improvement over the fixed context vector approach.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Applications</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Machine Translation</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>English → French</li>
            <li>Any language pair</li>
            <li>Handles variable-length inputs and outputs</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Text Summarization</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Long document → Short summary</li>
            <li>Encoder reads document, decoder writes summary</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Dialogue Systems</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>User utterance → Bot response</li>
            <li>Contextual conversation generation</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Question Answering</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Question + Context → Answer</li>
            <li>Encoder processes both, decoder generates answer</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Code Generation</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Natural language description → Code</li>
            <li>Specification to implementation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Training Seq2Seq Models</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Teacher Forcing</h3>
          <p className="text-slate-700 mb-4">During training, use ground truth previous tokens instead of model predictions:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Training:
            Decoder input: [SOS] [I] [am] [a]
            Decoder output: [I] [am] [a] [student]
            
            (Use real tokens, not predictions)
          </code></pre>
          <p className="text-slate-700 mb-4">This speeds up training and provides stable gradients.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Inference (No Teacher Forcing)</h3>
          <p className="text-slate-700 mb-4">At test time, use model's own predictions:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Inference:
            Generate [I]
            Generate [am] (using [I])
            Generate [a] (using [I] [am])
            Generate [student] (using [I] [am] [a])
          </code></pre>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Loss Function</h3>
          <p className="text-slate-700 mb-4">Cross-entropy loss on predicted tokens:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Loss = -Σ log P(yt | y&lt;t, x)
          </code></pre>
          <p className="text-slate-700 mb-4">Minimize negative log-likelihood of correct output sequence.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Beam Search Decoding</h2>
          <p className="text-slate-700 mb-4">Instead of greedily selecting the most likely token at each step, beam search maintains multiple hypotheses:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Beam size = 3:
            Step 1: Keep top 3 completions: [I], [The], [A]
            Step 2: Expand each, keep top 3 overall
            Step 3: Continue until [EOS]
          </code></pre>
          <p className="text-slate-700 mb-4">This often finds better translations than greedy decoding.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Analogy: Two-Person Communication</h2>
          <p className="text-slate-700 mb-4"><strong>Without attention (original seq2seq):</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Person A reads a long story</li>
            <li>Person A whispers one sentence to Person B (the bottleneck!)</li>
            <li>Person B must retell the entire story from that one sentence</li>
            <li>Information loss is inevitable</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>With attention (modern seq2seq):</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Person A reads the story and remembers all of it</li>
            <li>Person B can ask Person A about any part while retelling</li>
            <li>Person B attends to relevant parts for each sentence</li>
            <li>Much more accurate retelling</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Advantages</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>End-to-end learning</strong>: Single model, trained jointly</li>
            <li><strong>Variable lengths</strong>: Input and output can differ in length</li>
            <li><strong>Flexible</strong>: Same architecture for many tasks</li>
            <li><strong>No explicit alignment</strong>: Learns relationships automatically</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitations</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Fixed context bottleneck</strong>: Without attention, long sequences suffer</li>
            <li><strong>Sequential decoding</strong>: Slow, can't parallelize generation</li>
            <li><strong>Exposure bias</strong>: Training vs inference mismatch</li>
            <li><strong>Error propagation</strong>: Early mistakes affect later outputs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Modern Improvements</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Attention Mechanisms</h3>
          <p className="text-slate-700 mb-4">Added dynamic context via attention over all encoder states.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Transformers</h3>
          <p className="text-slate-700 mb-4">Replaced RNNs with self-attention, enabling parallelization and better long-range dependencies.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Copy Mechanisms</h3>
          <p className="text-slate-700 mb-4">Allow decoder to copy tokens from input (useful for names, numbers).</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Coverage Mechanisms</h3>
          <p className="text-slate-700 mb-4">Prevent repetition and ensure all input is covered.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Seq2seq = Encoder + Decoder</strong>: Two-stage architecture for sequence transformation</li>
            <li><strong>Fixed-length bottleneck</strong>: Original limitation that motivated attention</li>
            <li><strong>Foundation for NMT</strong>: Revolutionized machine translation</li>
            <li><strong>General framework</strong>: Applicable to many sequence tasks</li>
            <li><strong>Evolved with attention</strong>: Modern versions use attention mechanisms</li>
            <li><strong>Preceded Transformers</strong>: Conceptual ancestor of current state-of-the-art</li>
          </ul>
          <p className="text-slate-700 mb-4">Sequence-to-sequence models established the encoder-decoder paradigm that remains fundamental to modern NLP, even as the specific implementations (RNNs → Transformers) have evolved.</p>
        </section>
      </div>
    </WikiLayout>
  );
}
