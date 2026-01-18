import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function BidirectionalRnn() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  return (
    <WikiLayout
      title="Bidirectional RNN"
      category="Architecture Components"
      description="A recurrent neural network that processes sequences in both forward and backward directions, allowing each position to have context from both past and future."
      relatedConcepts={["encoder-decoder", "attention-mechanism", "seq2seq", "soft-alignment"]}
      citations={[
        {
          paper: "Neural Machine Translation by Jointly Learning to Align and Translate",
          authors: "Bahdanau, D., Cho, K., & Bengio, Y.",
          year: "2014",
          pages: "3"
        }
      ]}
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is a Bidirectional RNN?</h2>
          <p className="text-slate-700 mb-4">
            A Bidirectional RNN (BiRNN) processes a sequence in two directions simultaneously: forward (left-to-right) and backward (right-to-left). The outputs from both directions are then combined, giving each position access to context from both the past and the future.
          </p>
          <p className="text-slate-700">
            Think of it like reading a mystery novel twice: once from beginning to end to see how events unfold, and once from end to beginning to see how everything connects. After both readings, you understand each scene in the context of what came before AND what comes after.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Motivation</h2>
          <p className="text-slate-700 mb-4">
            Standard RNNs only see the past:
          </p>
          <p className="text-slate-700 mb-4">
            "In conventional RNNs, the hidden state hj at time j depends only on the previous hidden state hj−1 and the input xj" [Bahdanau et al., 2014, p. 3].
          </p>
          <p className="text-slate-700 mb-4">
            But in many tasks, especially language understanding, future context is equally important. Consider:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>"The bank was <strong>steep</strong>" (river bank)</li>
            <li>"The bank was <strong>closed</strong>" (financial bank)</li>
          </ul>
          <p className="text-slate-700">
            To understand "bank" in position 2, you need to see the adjective in position 3. A forward-only RNN wouldn't have that information yet.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How Bidirectional RNNs Work</h2>
          <p className="text-slate-700 mb-4">
            A BiRNN runs two separate RNNs over the same sequence:
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Forward RNN (Left-to-Right)</h3>
          <p className="text-slate-700 mb-4">
            Processes the sequence from start to end:
          </p>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-slate-700">{`→h1 = f(→h0, x1)
→h2 = f(→h1, x2)
→h3 = f(→h2, x3)
...
→hT = f(→hT-1, xT)`}</pre>
          </div>
          <p className="text-slate-700 mb-4">
            Each forward hidden state →hj contains information about positions 1 through j (the past).
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Backward RNN (Right-to-Left)</h3>
          <p className="text-slate-700 mb-4">
            Processes the sequence from end to start:
          </p>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-slate-700">{`←hT = f(←hT+1, xT)
←hT-1 = f(←hT, xT-1)
←hT-2 = f(←hT-1, xT-2)
...
←h1 = f(←h2, x1)`}</pre>
          </div>
          <p className="text-slate-700 mb-4">
            Each backward hidden state ←hj contains information about positions j through T (the future).
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Combining Directions</h3>
          <p className="text-slate-700 mb-4">
            The final annotation for position j combines both:
          </p>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-slate-700">{`hj = [→hj ; ←hj]`}</pre>
          </div>
          <p className="text-slate-700 mb-4">
            This is typically concatenation, creating a vector that contains both past and future context.
          </p>
          <p className="text-slate-700">
            "We propose to use a bidirectional RNN (BiRNN), which has been successfully used recently in speech recognition. A BiRNN consists of forward and backward RNNs. The forward RNN →f reads the input sequence as it is ordered (from x1 to xT) and calculates a sequence of forward hidden states. The backward RNN ←f reads the sequence in the reverse order (from xT to x1), resulting in a sequence of backward hidden states" [Bahdanau et al., 2014, p. 3].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Complete Picture</h2>
          <p className="text-slate-700 mb-4">
            For a sequence "The cat sat":
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Forward pass:</strong>
          </p>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-slate-700">{`→h1 ("The") = f(→h0, "The")           → knows: "The"
→h2 ("cat") = f(→h1, "cat")           → knows: "The", "cat"
→h3 ("sat") = f(→h2, "sat")           → knows: "The", "cat", "sat"`}</pre>
          </div>
          <p className="text-slate-700 mb-2">
            <strong>Backward pass:</strong>
          </p>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-slate-700">{`←h3 ("sat") = f(←h4, "sat")           → knows: "sat"
←h2 ("cat") = f(←h3, "cat")           → knows: "cat", "sat"
←h1 ("The") = f(←h2, "The")           → knows: "The", "cat", "sat"`}</pre>
          </div>
          <p className="text-slate-700 mb-2">
            <strong>Combined annotations:</strong>
          </p>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-slate-700">{`h1 = [→h1 ; ←h1]  → knows: "The" + ("cat", "sat")
h2 = [→h2 ; ←h2]  → knows: ("The", "cat") + ("sat")
h3 = [→h3 ; ←h3]  → knows: ("The", "cat", "sat") + nothing ahead`}</pre>
          </div>
          <p className="text-slate-700">
            Now h2 for "cat" has context from both "The" (before) and "sat" (after).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why BiRNNs Are Powerful</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">1. Full Context at Every Position</h3>
          <p className="text-slate-700 mb-4">
            Each hidden state has information from the entire sequence:
          </p>
          <p className="text-slate-700 mb-4">
            "We would like the annotation of each word to summarize not only the preceding words, but also the following words. Hence we propose to use a bidirectional RNN" [Bahdanau et al., 2014, p. 3].
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">2. Better Representations</h3>
          <p className="text-slate-700 mb-4">
            With both directions, the model can resolve ambiguities:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Word sense disambiguation (bank = river or finance?)</li>
            <li>Coreference resolution (pronouns)</li>
            <li>Syntactic parsing (understanding sentence structure)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">3. Rich Encodings for Attention</h3>
          <p className="text-slate-700 mb-4">
            When used as an encoder with attention, BiRNN provides rich annotations:
          </p>
          <p className="text-slate-700 mb-4">
            "By doing so, the annotation hj contains the summaries of both the preceding words and the following words" [Bahdanau et al., 2014, p. 3].
          </p>
          <p className="text-slate-700">
            The attention mechanism can then focus on positions that have complete context, making better alignment decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Architecture Details</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Hidden State Dimensions</h3>
          <p className="text-slate-700 mb-2">
            If each direction has hidden dimension d:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Forward RNN: →hj ∈ ℝᵈ</li>
            <li>Backward RNN: ←hj ∈ ℝᵈ</li>
            <li>Combined: hj ∈ ℝ²ᵈ (concatenation doubles the size)</li>
          </ul>
          <p className="text-slate-700 mb-4">
            This is why BiRNN encodings are typically twice as large as unidirectional RNN encodings.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Independent RNNs</h3>
          <p className="text-slate-700 mb-4">
            The forward and backward RNNs are independent:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Separate parameters (weights and biases)</li>
            <li>Trained jointly but process independently</li>
            <li>No information flow between them during the forward pass</li>
          </ul>
          <p className="text-slate-700 mb-4">
            They only interact when their outputs are concatenated.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">RNN Cell Types</h3>
          <p className="text-slate-700 mb-4">
            Any RNN variant can be used for both directions:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Vanilla RNN cells</li>
            <li>LSTM cells (most common)</li>
            <li>GRU cells (used in Bahdanau et al., 2014)</li>
          </ul>
          <p className="text-slate-700">
            The choice affects capacity and training dynamics, but the bidirectional structure remains the same.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">BiRNN in the Encoder</h2>
          <p className="text-slate-700 mb-4">
            In sequence-to-sequence models, BiRNN is typically used in the encoder:
          </p>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-slate-700">{`Input: x1, x2, ..., xT

Encoder (BiRNN):
  For each position j:
    →hj = →f(→hj-1, xj)    (forward)
    ←hj = ←f(←hj+1, xj)    (backward)
    hj = [→hj ; ←hj]        (combine)

Decoder (unidirectional):
  Uses encoder annotations {h1, h2, ..., hT}
  Generates output left-to-right`}</pre>
          </div>
          <p className="text-slate-700">
            The decoder is still unidirectional because it generates sequentially (can't look into the future during generation).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">A Concrete Example</h2>
          <p className="text-slate-700 mb-4">
            Encoding "Je suis étudiant" (I am a student):
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Forward RNN:</strong>
          </p>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-slate-700">{`→h1 (Je):       [0.2, 0.5, -0.3, ...]  ← knows: "Je"
→h2 (suis):     [0.4, -0.1, 0.7, ...]  ← knows: "Je suis"
→h3 (étudiant): [0.1, 0.3, -0.5, ...]  ← knows: "Je suis étudiant"`}</pre>
          </div>
          <p className="text-slate-700 mb-2">
            <strong>Backward RNN:</strong>
          </p>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-slate-700">{`←h1 (Je):       [0.8, -0.2, 0.4, ...]  ← knows: "Je suis étudiant"
←h2 (suis):     [-0.3, 0.6, 0.1, ...]  ← knows: "suis étudiant"
←h3 (étudiant): [0.5, 0.2, -0.1, ...]  ← knows: "étudiant"`}</pre>
          </div>
          <p className="text-slate-700 mb-2">
            <strong>Combined BiRNN:</strong>
          </p>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-slate-700">{`h1 = [0.2, 0.5, -0.3, ..., 0.8, -0.2, 0.4, ...]  ← both directions
h2 = [0.4, -0.1, 0.7, ..., -0.3, 0.6, 0.1, ...]
h3 = [0.1, 0.3, -0.5, ..., 0.5, 0.2, -0.1, ...]`}</pre>
          </div>
          <p className="text-slate-700">
            Now when the attention mechanism looks at h2 ("suis"), it has information about:
            What came before: "Je" and what comes after: "étudiant". This helps align "suis" correctly with "am" in English.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Training BiRNNs</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Forward and Backward Pass</h3>
          <p className="text-slate-700 mb-4">
            Training requires two forward passes (one per direction) and backpropagation through both:
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Forward pass:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Compute forward RNN: →h1, →h2, ..., →hT</li>
            <li>Compute backward RNN: ←hT, ←hT-1, ..., ←h1</li>
            <li>Concatenate: hj = [→hj ; ←hj] for all j</li>
            <li>Use in decoder/task</li>
            <li>Compute loss</li>
          </ol>
          <p className="text-slate-700 mb-2">
            <strong>Backward pass (gradient computation):</strong>
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Gradients flow to both →hj and ←hj</li>
            <li>Backpropagate through forward RNN (right to left in time)</li>
            <li>Backpropagate through backward RNN (left to right in time)</li>
            <li>Update both sets of parameters</li>
          </ol>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Memory Requirements</h3>
          <p className="text-slate-700 mb-2">
            BiRNNs require storing all hidden states:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Can't process streaming (need entire sequence)</li>
            <li>Memory: O(T × d) for both directions</li>
            <li>About twice the memory of unidirectional RNN</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Computational Cost</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Two RNN passes instead of one</li>
            <li>Approximately 2× computation of unidirectional RNN</li>
            <li>Can't parallelize over sequence length (still sequential)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">BiRNN vs Alternatives</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Unidirectional RNN</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Only past context</li>
            <li>Can process streaming</li>
            <li>Half the parameters</li>
            <li>Worse representations for understanding tasks</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">BiRNN</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Full context (past + future)</li>
            <li>Requires entire sequence</li>
            <li>Double the parameters</li>
            <li>Better representations</li>
            <li>Gold standard for encoders</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Transformer (Self-Attention)</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Full context in one pass</li>
            <li>Parallel computation</li>
            <li>No sequential bottleneck</li>
            <li>Even better representations</li>
            <li>Eventually replaced BiRNN in most applications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">When to Use BiRNN</h2>

          <p className="text-slate-700 mb-4">
            <strong>Good for:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Encoding text for classification (sentiment, NER, etc.)</li>
            <li>Sequence-to-sequence encoders (translation, summarization)</li>
            <li>Feature extraction for downstream tasks</li>
            <li>Any task where full sequence is available upfront</li>
          </ul>

          <p className="text-slate-700 mb-4">
            <strong>Not suitable for:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Real-time processing (need to see future)</li>
            <li>Autoregressive generation (decoder)</li>
            <li>Streaming applications</li>
            <li>When you must generate left-to-right</li>
          </ul>

          <p className="text-slate-700 mb-2">
            <strong>Modern alternative:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Transformers largely replaced BiRNNs</li>
            <li>Self-attention gives similar benefits with parallelization</li>
            <li>But BiRNN is still conceptually important and used in some applications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Analogy: Writing a Book Review</h2>
          <p className="text-slate-700 mb-4">
            Imagine writing a review after reading a book:
          </p>
          <div className="bg-red-50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-red-900 mb-2">Unidirectional (forward only):</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              <li>You write notes while reading, page by page</li>
              <li>Your understanding of chapter 3 only includes chapters 1-3</li>
              <li>You don't know how the story ends yet</li>
              <li>Your interpretation might change later</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-green-900 mb-2">Bidirectional (read both ways):</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              <li>You read the entire book first</li>
              <li>Then you analyze each chapter knowing the full story</li>
              <li>Your understanding of chapter 3 includes:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>Setup from chapters 1-2 (forward context)</li>
                  <li>Consequences in chapters 4-10 (backward context)</li>
                </ul>
              </li>
              <li>Your analysis is informed by the complete narrative</li>
            </ul>
          </div>
          <p className="text-slate-700">
            BiRNN is like reading the whole book before writing your review, so every comment has full context.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>BiRNN processes sequences in both directions</strong>: Forward (past) and backward (future)</li>
            <li><strong>Each position gets full context</strong>: Knows what came before and what comes after</li>
            <li><strong>Concatenation combines directions</strong>: Typically [→hj ; ←hj], doubling dimension</li>
            <li><strong>Better representations</strong>: Resolves ambiguities and captures dependencies</li>
            <li><strong>Essential for encoders</strong>: Standard choice before Transformers</li>
            <li><strong>Requires full sequence</strong>: Can't process streaming or incomplete sequences</li>
            <li><strong>Foundation for modern NLP</strong>: Influenced Transformer design and attention mechanisms</li>
          </ul>
          <p className="text-slate-700">
            Bidirectional RNNs were a key innovation that showed the power of using full sequence context. While Transformers have largely superseded them in modern applications, the core insight—that both past and future context matter—remains fundamental to how we design language models.
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
