import { useState } from 'react';
import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";

export default function AttentionMechanism() {
  const [sourceWeights, setSourceWeights] = useState([0.33, 0.33, 0.34]);
  const [currentTarget, setCurrentTarget] = useState(0);

  const frenchWords = ['Je', 'suis', 'étudiant'];
  const englishWords = ['I', 'am', 'a', 'student'];

  // Correct alignments for each target word
  const correctAlignments = [
    [0.89, 0.07, 0.04],  // "I" should focus on "Je"
    [0.10, 0.85, 0.05],  // "am" should focus on "suis"
    [0.05, 0.12, 0.83],  // "a" should focus on "étudiant"
    [0.02, 0.08, 0.90],  // "student" should focus on "étudiant"
  ];

  const updateWeight = (index: number, value: number) => {
    const newWeights = [...sourceWeights];
    newWeights[index] = value;

    // Normalize to sum to 1
    const sum = newWeights.reduce((a, b) => a + b, 0);
    if (sum > 0) {
      const normalized = newWeights.map(w => w / sum);
      setSourceWeights(normalized);
    }
  };

  const checkAlignment = () => {
    const correct = correctAlignments[currentTarget];
    const error = sourceWeights.reduce((sum, w, i) => sum + Math.abs(w - correct[i]), 0);
    return error < 0.3; // Tolerance for "close enough"
  };

  const isCorrect = checkAlignment();

  return (
    <WikiLayout
      title="Attention Mechanism"
      category="Architecture Components"
      description="A mechanism that allows neural networks to focus on relevant parts of the input when producing outputs, solving the fixed-length bottleneck in encoder-decoder architectures."
      relatedConcepts={["encoder-decoder", "seq2seq", "soft-alignment", "bidirectional-rnn", "transformer-architecture"]}
      citations={[
        {
          paper: "Neural Machine Translation by Jointly Learning to Align and Translate",
          authors: "Bahdanau, D., Cho, K., & Bengio, Y.",
          year: "2014",
          pages: "3-4"
        },
        {
          paper: "Attention Is All You Need",
          authors: "Vaswani et al.",
          year: "2017",
          pages: "2-4"
        }
      ]}
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is the Attention Mechanism?</h2>
          <p className="text-slate-700 mb-4">
            The attention mechanism allows a neural network to selectively focus on different parts of the input when producing each part of the output. Instead of compressing the entire input into a single fixed-length vector, attention lets the model dynamically access all input positions as needed.
          </p>
          <p className="text-slate-700">
            Think of it like reading a textbook while answering exam questions. You don't memorize the entire textbook into one thought before answering. Instead, for each question, you flip back to the relevant sections and focus your attention there. The attention mechanism does exactly this for neural networks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Problem It Solves</h2>
          <p className="text-slate-700 mb-4">
            Before attention, encoder-decoder architectures had a critical limitation: they compressed the entire input sequence into a single fixed-length context vector. This became a bottleneck, especially for long sequences.
          </p>
          <p className="text-slate-700 mb-4">
            "A potential issue with this encoder–decoder approach is that a neural network needs to be able to compress all the necessary information of a source sentence into a fixed-length vector. This may make it difficult for the neural network to cope with long sentences" [Bahdanau et al., 2014, p. 1].
          </p>
          <p className="text-slate-700">
            Imagine trying to summarize an entire book in one sentence, then writing a review using only that sentence. You'd lose most of the details. That's what early encoder-decoder models had to do.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-700 mb-4">
            The attention mechanism solves this by computing a dynamic context vector for each output position, allowing the model to "attend to" different parts of the input.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Core Formula</h3>
          <p className="text-slate-700 mb-4">
            <span dangerouslySetInnerHTML={{ __html: "For each output position $i$, attention computes a context vector $c_i$:" }} />
          </p>
          <div className="bg-slate-100 rounded-lg p-4 mb-4" dangerouslySetInnerHTML={{
            __html: "$$c_i = \\sum_{j=1}^{T_x} \\alpha_{ij} \\cdot h_j$$"
          }} />
          <div className="text-slate-700 space-y-2 mb-4">
            <p>Where:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><span dangerouslySetInnerHTML={{ __html: "$c_i$ is the context vector for position $i$" }} /></li>
              <li><span dangerouslySetInnerHTML={{ __html: "$h_j$ is the hidden state of the encoder at position $j$" }} /></li>
              <li><span dangerouslySetInnerHTML={{ __html: "$\\alpha_{ij}$ is the attention weight (how much to focus on position $j$ when generating output $i$)" }} /></li>
              <li><span dangerouslySetInnerHTML={{ __html: "$T_x$ is the input sequence length" }} /></li>
            </ul>
          </div>
          <p className="text-slate-700">
            This is a weighted sum: we take all encoder hidden states and combine them, but with different weights for each position.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Computing Attention Weights</h3>
          <p className="text-slate-700 mb-4">
            The attention weights <span dangerouslySetInnerHTML={{ __html: "$\\alpha_{ij}$" }} /> are computed using an alignment model:
          </p>
          <div className="bg-slate-100 rounded-lg p-4 mb-4 space-y-2">
            <div dangerouslySetInnerHTML={{ __html: "$$e_{ij} = a(s_{i-1}, h_j) \\quad \\text{(alignment score)}$$" }} />
            <div dangerouslySetInnerHTML={{ __html: "$$\\alpha_{ij} = \\frac{\\exp(e_{ij})}{\\sum_{k=1}^{T_x} \\exp(e_{ik})} \\quad \\text{(softmax normalization)}$$" }} />
          </div>
          <div className="text-slate-700 space-y-2 mb-4">
            <p>Where:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><span dangerouslySetInnerHTML={{ __html: "$e_{ij}$ is the alignment score between decoder state $s_{i-1}$ and encoder state $h_j$" }} /></li>
              <li><span dangerouslySetInnerHTML={{ __html: "$a()$ is the alignment model (typically a small feedforward network)" }} /></li>
              <li>The softmax ensures all weights sum to 1</li>
            </ul>
          </div>
          <p className="text-slate-700 mb-4">
            <span dangerouslySetInnerHTML={{
              __html: '"The probability $\\alpha_{ij}$ reflects the importance of the annotation $h_j$ with respect to the previous hidden state $s_{i−1}$ in deciding the next state $s_i$ and generating $y_i$" [Bahdanau et al., 2014, p. 4].'
            }} />
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Research Assistant Analogy</h2>
          <p className="text-slate-700 mb-4">
            Imagine you're writing a research paper with an assistant.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">Without Attention (Old Way):</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                <li>You read all 20 source papers</li>
                <li>Summarize everything in your head into one thought</li>
                <li>Write the entire paper from that single summarized thought</li>
                <li>Your assistant can't help you look things up</li>
              </ul>
              <p className="text-slate-700 text-sm mt-2 italic">This fails for complex topics with many sources.</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">With Attention (Bahdanau Way):</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                <li>You have all 20 papers open on your desk</li>
                <li>For each paragraph you write, your assistant finds and highlights the relevant sections from the most important papers</li>
                <li>You can dynamically reference different papers as needed</li>
                <li>Nothing needs to fit in one thought</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-700">
            Attention is like having a smart research assistant who knows exactly which sources to pull up for each paragraph you write.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Exercise: Set the Attention Weights</h2>
          <p className="text-slate-700 mb-4">
            Let's translate "Je suis étudiant" to English. For each English word, adjust the attention weights to focus on the correct French word(s).
          </p>

          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <div className="mb-4">
              <label className="block text-slate-900 font-semibold mb-2">
                Generating English word: <span className="text-blue-600">{englishWords[currentTarget]}</span>
              </label>
              <div className="flex gap-2">
                {englishWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTarget(idx)}
                    className={`px-4 py-2 rounded font-semibold ${
                      idx === currentTarget
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4 border-2 border-slate-200">
              <p className="font-semibold text-slate-900 mb-3">
                Attention weights (must sum to 1.0):
              </p>
              {frenchWords.map((word, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-slate-700 w-24">{word}:</span>
                    <span className="text-slate-900 font-mono w-16">{sourceWeights[idx].toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sourceWeights[idx] * 100}
                    onChange={(e) => updateWeight(idx, parseFloat(e.target.value) / 100)}
                    className="w-full"
                  />
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  Sum: {sourceWeights.reduce((a, b) => a + b, 0).toFixed(2)}
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-yellow-50 border-2 border-yellow-200'}`}>
              {isCorrect ? (
                <div>
                  <p className="font-semibold text-green-900 mb-2">✓ Great alignment!</p>
                  <p className="text-sm text-slate-700">
                    Your attention weights correctly focus on the right French word(s) for "{englishWords[currentTarget]}".
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-yellow-900 mb-2">Try adjusting the weights</p>
                  <p className="text-sm text-slate-700">
                    Think about which French word(s) should be most important when generating "{englishWords[currentTarget]}".
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 bg-blue-50 rounded-lg p-4">
              <p className="font-semibold text-blue-900 mb-2">Hints:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                <li>"I" should strongly attend to "Je" (~0.89)</li>
                <li>"am" should strongly attend to "suis" (~0.85)</li>
                <li>"a" and "student" both need "étudiant" (~0.83-0.90)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Visualizing Attention</h2>
          <p className="text-slate-700 mb-4">
            Attention weights can be visualized as a heatmap showing which source words the model focuses on for each target word:
          </p>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-slate-700">
{`Source:    Je    suis    étudiant
           ↓      ↓       ↓
Target: I  [0.89] [0.07]  [0.04]     ← Focuses on "Je"
        am [0.10] [0.85]  [0.05]     ← Focuses on "suis"
        a  [0.05] [0.12]  [0.83]     ← Focuses on "étudiant"
        student [0.02] [0.08] [0.90]  ← Strongly on "étudiant"`}
            </pre>
          </div>
          <p className="text-slate-700 mt-4">
            Bright cells show strong attention. The diagonal pattern reveals the learned alignment between French and English word order.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Attention Works So Well</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Solves the Bottleneck</h3>
          <p className="text-slate-700 mb-4">
            No more compressing everything into one vector. The decoder has direct access to all encoder states: "The decoder decides parts of the source sentence to pay attention to. By letting the decoder have an attention mechanism, we relieve the encoder from the burden of having to encode all information in the source sentence into a fixed-length vector" [Bahdanau et al., 2014, p. 3].
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Handles Long Sequences</h3>
          <p className="text-slate-700 mb-4">
            Performance no longer degrades for long inputs. Each output can attend to the specific input positions it needs, regardless of distance.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Interpretable Alignments</h3>
          <p className="text-slate-700 mb-4">
            The attention weights <span dangerouslySetInnerHTML={{ __html: "$\\alpha_{ij}$" }} /> show which input positions influenced each output. This is valuable for understanding model decisions, debugging translation errors, and visualizing learned patterns.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Learnable Alignment</h3>
          <p className="text-slate-700">
            The model discovers alignment patterns automatically during training, without any explicit alignment supervision. It learns what to focus on purely from translation examples.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">From Bahdanau to Transformers</h2>
          <p className="text-slate-700 mb-4">
            The Bahdanau attention mechanism sparked a revolution. It was later generalized and refined:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Bahdanau Attention (2014):</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                <li>RNN encoder + attention mechanism</li>
                <li>Additive attention (feedforward network)</li>
                <li>Sequential processing</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Transformer Attention (2017):</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                <li>Pure attention, no RNNs</li>
                <li><Link to="/wiki/scaled-dot-product-attention" className="text-blue-600 hover:text-blue-800 underline">Scaled dot-product attention</Link></li>
                <li>Parallel processing</li>
                <li><Link to="/wiki/multi-head-attention" className="text-blue-600 hover:text-blue-800 underline">Multi-head attention</Link></li>
              </ul>
            </div>
          </div>
          <p className="text-slate-700 mb-4">
            "The Transformer is the first transduction model relying entirely on self-attention to compute representations of its input and output without using sequence-aligned RNNs or convolution" [Vaswani et al., 2017, p. 1].
          </p>
          <p className="text-slate-700">
            The <Link to="/wiki/transformer-architecture" className="text-blue-600 hover:text-blue-800 underline">Transformer</Link> took Bahdanau's insight—that attention is all you need—and built an entire architecture around it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li><Link to="/wiki/encoder-decoder" className="text-blue-600 hover:text-blue-800 underline">Encoder-Decoder Architecture</Link> - The architecture that attention improves</li>
            <li><Link to="/wiki/seq2seq" className="text-blue-600 hover:text-blue-800 underline">Sequence-to-Sequence Models</Link> - Early models that used fixed-length vectors</li>
            <li><Link to="/wiki/soft-alignment" className="text-blue-600 hover:text-blue-800 underline">Soft Alignment</Link> - The weighted attention approach</li>
            <li><Link to="/wiki/bidirectional-rnn" className="text-blue-600 hover:text-blue-800 underline">Bidirectional RNN</Link> - Used in the Bahdanau encoder</li>
            <li><Link to="/wiki/transformer-architecture" className="text-blue-600 hover:text-blue-800 underline">Transformer Architecture</Link> - Pure attention-based architecture</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
