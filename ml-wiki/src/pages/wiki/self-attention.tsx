import { useEffect, useState } from 'react';
import WikiLayout from '../../components/WikiLayout';

export default function SelfAttention() {
  const [rnnAnswer, setRnnAnswer] = useState('');
  const [attentionAnswer, setAttentionAnswer] = useState('');
  const [generalAnswer, setGeneralAnswer] = useState('');
  const [feedback, setFeedback] = useState({ q1: '', q2: '', q3: '' });
  const [seqLength, setSeqLength] = useState(100);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const checkRnnAnswer = () => {
    const answer = parseInt(rnnAnswer);
    if (answer === 9) {
      setFeedback({ ...feedback, q1: '✓ Correct! The RNN needs 9 sequential operations to pass through positions 2-9.' });
    } else if (answer === 10) {
      setFeedback({ ...feedback, q1: 'Close! Remember, we\'re counting the steps between position 1 and position 10, not including the starting position.' });
    } else {
      setFeedback({ ...feedback, q1: 'Not quite. Think: how many positions must the information pass through to get from 1 to 10?' });
    }
  };

  const checkAttentionAnswer = () => {
    const answer = parseInt(attentionAnswer);
    if (answer === 1) {
      setFeedback({ ...feedback, q2: '✓ Perfect! Self-attention allows direct connection between any two positions in a single operation.' });
    } else if (answer === 0) {
      setFeedback({ ...feedback, q2: 'Almost! There is still one attention operation, even if it\'s direct. Think O(1) = 1 operation.' });
    } else {
      setFeedback({ ...feedback, q2: 'Not quite. Self-attention creates direct connections - no intermediate steps needed!' });
    }
  };

  const checkGeneralAnswer = () => {
    const cleaned = generalAnswer.toLowerCase().replace(/\s/g, '');
    if (cleaned.includes('o(n)') && cleaned.includes('o(1)')) {
      setFeedback({ ...feedback, q3: '✓ Excellent! RNN is O(n) and Self-Attention is O(1) for path length.' });
    } else if (cleaned.includes('n') && cleaned.includes('1')) {
      setFeedback({ ...feedback, q3: 'You\'re on the right track! Try expressing it in Big-O notation: O(?)' });
    } else {
      setFeedback({ ...feedback, q3: 'Think about how path length scales with sequence length n for each approach.' });
    }
  };

  const d = 512; // model dimension
  const rnnOps = seqLength * d * d;
  const attentionOps = seqLength * seqLength * d;

  return (
    <WikiLayout
      title="Self-Attention"
      category="Architecture Components"
      description="An attention mechanism that relates different positions of a single sequence to compute a representation, enabling constant-time connectivity between all positions."
      relatedConcepts={["attention-mechanism", "multi-head-attention", "scaled-dot-product-attention", "transformer-architecture"]}
      citations={[
        {
          paper: "Attention Is All You Need",
          authors: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I.",
          year: "2017",
          pages: "2-5"
        }
      ]}
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Self-Attention?</h2>
          <p className="text-slate-700 mb-4">
            <strong>Self-attention</strong>, sometimes called <strong>intra-attention</strong>, is an attention mechanism that relates different positions of a single sequence in order to compute a representation of that sequence [Vaswani et al., 2017, p. 2].
          </p>
          <p className="text-slate-700 mb-4">
            Think of it like being at a cocktail party. Instead of listening to people one at a time in sequence (like an RNN), you can simultaneously hear everyone in the room and instantly recognize connections—when Person A mentions "attention," you immediately link it to Person F's discussion of "transformers," even though they're on opposite sides of the room.
          </p>
          <p className="text-slate-700 mb-4">
            In a self-attention layer, all of the keys, values, and queries come from the same place—in the <a href="/wiki/transformer-architecture" className="text-blue-600 hover:text-blue-800 underline">Transformer</a>'s case, from the output of the previous layer in the encoder. This allows each position in the encoder to attend to all positions in the previous layer [Vaswani et al., 2017, p. 5].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Key Innovation: Constant-Time Connectivity</h2>
          <p className="text-slate-700 mb-4">
            The breakthrough of self-attention is that it connects all positions with a <strong>constant number of sequentially executed operations</strong>, whereas a recurrent layer requires <span dangerouslySetInnerHTML={{ __html: "$O(n)$" }} /> sequential operations, where <span dangerouslySetInnerHTML={{ __html: "$n$" }} /> is the sequence length [Vaswani et al., 2017, p. 6].
          </p>
          <p className="text-slate-700 mb-4">
            Imagine you're trying to connect two ideas in a long document. With an RNN, the information must flow through every single word in between—like a game of telephone where the message gets passed from person to person. By the time it reaches the end, it might be garbled or lost. With self-attention, you can directly connect any two words, regardless of distance—like having a direct phone line between them.
          </p>
          <p className="text-slate-700 mb-3">This has profound implications:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Learning long-range dependencies becomes easier</strong>: The path between any two positions is <span dangerouslySetInnerHTML={{ __html: "$O(1)$" }} /> instead of <span dangerouslySetInnerHTML={{ __html: "$O(n)$" }} /></li>
            <li><strong>Parallelization</strong>: All positions can be processed simultaneously, not sequentially</li>
            <li><strong>No information bottleneck</strong>: Unlike RNNs which compress everything through a fixed-size hidden state</li>
            <li><strong>Better gradient flow</strong>: Gradients don't have to backpropagate through many sequential steps</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Computational Trade-offs</h2>
          <p className="text-slate-700 mb-4">
            Self-attention layers are faster than recurrent layers when the sequence length <span dangerouslySetInnerHTML={{ __html: "$n$" }} /> is smaller than the representation dimensionality <span dangerouslySetInnerHTML={{ __html: "$d$" }} />, which is typically the case with modern word-piece and byte-pair representations [Vaswani et al., 2017, p. 6-7].
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Self-Attention Complexity</strong>: <span dangerouslySetInnerHTML={{ __html: "$O(n^2 \\cdot d)$" }} /></li>
            <li><strong>Recurrent Complexity</strong>: <span dangerouslySetInnerHTML={{ __html: "$O(n \\cdot d^2)$" }} /></li>
            <li><strong>Maximum Path Length</strong>: <span dangerouslySetInnerHTML={{ __html: "$O(1)$" }} /> vs <span dangerouslySetInnerHTML={{ __html: "$O(n)$" }} /> for recurrent</li>
          </ul>

          <div className="bg-slate-50 rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Explore: When is Self-Attention Faster?</h3>
            <p className="text-slate-700 mb-4">
              Adjust the sequence length to see how computational cost changes (with d = 512):
            </p>
            <div className="mb-4">
              <label className="block text-slate-700 mb-2">
                Sequence Length: <strong>{seqLength}</strong>
              </label>
              <input
                type="range"
                min="10"
                max="2000"
                step="10"
                value={seqLength}
                onChange={(e) => setSeqLength(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded p-4 border-2 border-blue-200">
                <p className="text-sm text-slate-600 mb-1">RNN Operations</p>
                <p className="text-2xl font-bold text-blue-600">{rnnOps.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded p-4 border-2 border-purple-200">
                <p className="text-sm text-slate-600 mb-1">Self-Attention Operations</p>
                <p className="text-2xl font-bold text-purple-600">{attentionOps.toLocaleString()}</p>
              </div>
            </div>
            <div className={`p-3 rounded ${attentionOps < rnnOps ? 'bg-purple-50 text-purple-900' : 'bg-blue-50 text-blue-900'}`}>
              <p className="font-semibold">
                {attentionOps < rnnOps ? '✓ Self-Attention is faster!' : '✓ RNN is faster!'}
              </p>
              <p className="text-sm mt-1">
                {attentionOps < rnnOps
                  ? `Self-attention wins when n &lt; d (${seqLength} &lt; 512)`
                  : `RNN wins when n &gt; d (${seqLength} &gt; 512)`}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It's Used in Transformers</h2>
          <p className="text-slate-700 mb-4">
            Self-attention is used in three different ways in the <a href="/wiki/transformer-architecture" className="text-blue-600 hover:text-blue-800 underline">Transformer</a> [Vaswani et al., 2017, p. 5]:
          </p>
          <ol className="list-decimal list-inside space-y-3 ml-4 text-slate-700 mb-4">
            <li><strong>Encoder Self-Attention</strong>: Each position in the encoder can attend to all positions in the previous encoder layer—allowing the model to build rich representations by considering the entire context</li>
            <li><strong>Decoder Self-Attention</strong>: Each position in the decoder attends to all positions in the decoder up to and including that position (with masking to preserve the auto-regressive property)</li>
            <li><strong>Encoder-Decoder Attention</strong>: Queries come from the previous decoder layer, while keys and values come from the encoder output—this is how the decoder "attends" to the input sequence</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What Models Learn to Attend To</h2>
          <p className="text-slate-700 mb-4">
            One of the side benefits of self-attention is that it yields more interpretable models. Individual <a href="/wiki/multi-head-attention" className="text-blue-600 hover:text-blue-800 underline">attention heads</a> clearly learn to perform different tasks, and many exhibit behavior related to the syntactic and semantic structure of sentences [Vaswani et al., 2017, p. 7].
          </p>
          <p className="text-slate-700 mb-3">For example, when researchers visualize attention patterns, they find heads that:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Track long-distance dependencies</strong>: Connecting verbs to their objects even when they're far apart ("The keys that were on the table <em>were lost</em>")</li>
            <li><strong>Perform anaphora resolution</strong>: Linking pronouns to what they refer to ("Sarah went to <strong>her</strong> car" → attention connects "her" back to "Sarah")</li>
            <li><strong>Learn sentence structure</strong>: Some heads attend primarily to adjacent words, others to the beginning/end of clauses</li>
          </ul>
          <p className="text-slate-700 mb-4">
            This interpretability is remarkable—we can actually see what the model is "paying attention to" at each layer, giving us insight into how it processes language.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Exercise: Calculate Path Lengths</h2>
          <p className="text-slate-700 mb-4">
            Let's make the constant-time connectivity concrete. Consider a sequence of length n = 10.
          </p>

          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <div className="mb-6">
              <p className="font-semibold text-slate-900 mb-3">Question 1: Recurrent Neural Network</p>
              <p className="text-slate-700 mb-3">
                How many sequential operations are needed for information to travel from position 1 to position 10?
              </p>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={rnnAnswer}
                  onChange={(e) => setRnnAnswer(e.target.value)}
                  className="border-2 border-slate-300 rounded px-3 py-2 w-32"
                  placeholder="?"
                />
                <button
                  onClick={checkRnnAnswer}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
                >
                  Check
                </button>
              </div>
              {feedback.q1 && (
                <div className={`mt-3 p-3 rounded ${feedback.q1.startsWith('✓') ? 'bg-green-50 text-green-900' : 'bg-yellow-50 text-yellow-900'}`}>
                  {feedback.q1}
                </div>
              )}
            </div>

            <div className="mb-6">
              <p className="font-semibold text-slate-900 mb-3">Question 2: Self-Attention Layer</p>
              <p className="text-slate-700 mb-3">
                How many sequential operations are needed for information to travel from position 1 to position 10?
              </p>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={attentionAnswer}
                  onChange={(e) => setAttentionAnswer(e.target.value)}
                  className="border-2 border-slate-300 rounded px-3 py-2 w-32"
                  placeholder="?"
                />
                <button
                  onClick={checkAttentionAnswer}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
                >
                  Check
                </button>
              </div>
              {feedback.q2 && (
                <div className={`mt-3 p-3 rounded ${feedback.q2.startsWith('✓') ? 'bg-green-50 text-green-900' : 'bg-yellow-50 text-yellow-900'}`}>
                  {feedback.q2}
                </div>
              )}
            </div>

            <div>
              <p className="font-semibold text-slate-900 mb-3">Question 3: General Case</p>
              <p className="text-slate-700 mb-3">
                For a sequence of length n, what are the path lengths? Express using Big-O notation.
              </p>
              <p className="text-sm text-slate-600 mb-2">(Example format: "RNN: O(n), Self-Attention: O(1)")</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={generalAnswer}
                  onChange={(e) => setGeneralAnswer(e.target.value)}
                  className="border-2 border-slate-300 rounded px-3 py-2 flex-1"
                  placeholder="Your answer..."
                />
                <button
                  onClick={checkGeneralAnswer}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
                >
                  Check
                </button>
              </div>
              {feedback.q3 && (
                <div className={`mt-3 p-3 rounded ${feedback.q3.startsWith('✓') ? 'bg-green-50 text-green-900' : 'bg-yellow-50 text-yellow-900'}`}>
                  {feedback.q3}
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="font-semibold text-blue-900 mb-2">Think about:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Why does constant path length matter for learning long-range dependencies?</li>
              <li>How does this affect gradient flow during backpropagation?</li>
              <li>What's the trade-off? (Hint: look at the complexity explorer above)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li><a href="/wiki/attention-mechanism" className="text-blue-600 hover:text-blue-800 underline">Attention Mechanism</a> - The general concept of attention in neural networks</li>
            <li><a href="/wiki/multi-head-attention" className="text-blue-600 hover:text-blue-800 underline">Multi-Head Attention</a> - Running multiple self-attention operations in parallel</li>
            <li><a href="/wiki/scaled-dot-product-attention" className="text-blue-600 hover:text-blue-800 underline">Scaled Dot-Product Attention</a> - The specific attention computation used in Transformers</li>
            <li><a href="/wiki/transformer-architecture" className="text-blue-600 hover:text-blue-800 underline">Transformer Architecture</a> - The full architecture built on self-attention</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
