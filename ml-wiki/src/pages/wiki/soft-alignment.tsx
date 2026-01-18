import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function SoftAlignment() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "Soft Alignment",
  category: "Architecture Components",
  description: "A differentiable approach to alignment where all positions contribute with learned weights, enabling end-to-end training without explicit alignment supervision.",
  relatedConcepts: ["attention-mechanism", "encoder-decoder", "seq2seq", "bidirectional-rnn"],
  citations: [
    {
      paper: "Neural Machine Translation by Jointly Learning to Align and Translate",
      authors: "Bahdanau, D., Cho, K., & Bengio, Y.",
      year: "2014",
      pages: "4"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Soft Alignment?</h2>
          <p className="text-slate-700 mb-4">Soft alignment is an approach where a model computes a weighted combination of all input positions rather than selecting a single position. The "soft" refers to the smooth, differentiable nature of this weighted sum, as opposed to "hard" discrete selection.</p>
          <p className="text-slate-700 mb-4">Think of soft alignment like blending paint colors. Instead of choosing one color (hard selection), you mix multiple colors with different proportions (soft weighting). The result is influenced by all colors, but some contribute more than others.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Soft vs Hard Alignment</h2>
          <p className="text-slate-700 mb-4">The key distinction is how positions are selected:</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Hard Alignment</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Discrete selection</strong>: Pick exactly one position at a time</li>
            <li><strong>Binary weights</strong>: Position is either selected (weight=1) or not (weight=0)</li>
            <li><strong>Non-differentiable</strong>: Can't use standard backpropagation</li>
            <li><strong>Requires special training</strong>: Reinforcement learning, sampling, or other techniques</li>
          </ul>
          <p className="text-slate-700 mb-4">Example:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input positions:  [h1, h2, h3, h4]
            Hard selection:   [0,  0,  1,  0]   ← Only h3 is used
            Output: h3
          </code></pre>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Soft Alignment</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Weighted combination</strong>: Use all positions with different weights</li>
            <li><strong>Continuous weights</strong>: Any value between 0 and 1, summing to 1</li>
            <li><strong>Differentiable</strong>: Compatible with standard backpropagation</li>
            <li><strong>End-to-end training</strong>: Learn alignment patterns from task signal alone</li>
          </ul>
          <p className="text-slate-700 mb-4">Example:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input positions:  [h1,   h2,   h3,   h4]
            Soft weights:     [0.05, 0.10, 0.75, 0.10]   ← All contribute
            Output: 0.05·h1 + 0.10·h2 + 0.75·h3 + 0.10·h4
          </code></pre>
          <p className="text-slate-700 mb-4">"We only focus on the soft attention mechanism in this work" [Bahdanau et al., 2014, p. 4].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How Soft Alignment Works</h2>
          <p className="text-slate-700 mb-4">Soft alignment uses a weighted sum with learned attention weights:</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Formula</h3>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            ci = Σ(j=1 to Tx) αij · hj
          </code></pre>
          <p className="text-slate-700 mb-4">Where:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>`ci` is the soft-aligned context for output position i</li>
            <li>`αij` are the soft alignment weights (between 0 and 1)</li>
            <li>`hj` are the encoder hidden states</li>
            <li>All weights sum to 1: `Σ αij = 1`</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Computing Soft Weights</h3>
          <p className="text-slate-700 mb-4">The weights are computed using an alignment model and softmax:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            eij = a(si-1, hj)                           (alignment score)
            αij = exp(eij) / Σ(k=1 to Tx) exp(eik)     (softmax → soft weights)
          </code></pre>
          <p className="text-slate-700 mb-4">The softmax function is what makes the alignment "soft":</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Converts arbitrary scores into probabilities (0 to 1)</li>
            <li>Ensures all weights sum to 1</li>
            <li>Is differentiable everywhere</li>
            <li>Allows all positions to contribute</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Soft Alignment Won</h2>
          <p className="text-slate-700 mb-4">Soft alignment became the dominant approach for several key reasons:</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">1. Differentiable End-to-End</h3>
          <p className="text-slate-700 mb-4">Hard alignment involves discrete decisions that break the gradient flow. Soft alignment is differentiable everywhere:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            ∂ci/∂αij = hj        (gradient flows through weights)
            ∂αij/∂eij = ...     (gradient flows through softmax)
            ∂eij/∂parameters = ... (gradient flows to alignment model)
          </code></pre>
          <p className="text-slate-700 mb-4">This means you can train the entire system with standard backpropagation. No need for reinforcement learning, REINFORCE trick, or Gumbel-Softmax approximations.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. No Alignment Supervision Needed</h3>
          <p className="text-slate-700 mb-4">The model learns alignment patterns automatically from the task signal (e.g., translation loss). You don't need:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Hand-aligned training data</li>
            <li>External alignment tools</li>
            <li>Pre-training on alignment task</li>
          </ul>
          <p className="text-slate-700 mb-4">The alignment emerges as a by-product of learning the main task.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Robust to Uncertainty</h3>
          <p className="text-slate-700 mb-4">When the model is uncertain which position to focus on, soft alignment gracefully spreads weight across multiple positions:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Uncertain case:
            α = [0.3, 0.4, 0.2, 0.1]   ← Distributes weight across top candidates
            
            Hard alignment would force a binary choice:
            α = [0, 1, 0, 0]            ← Might pick the wrong one
          </code></pre>
          <p className="text-slate-700 mb-4">This robustness is especially valuable early in training when the model hasn't learned good alignments yet.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">4. Interpretable Yet Flexible</h3>
          <p className="text-slate-700 mb-4">The soft weights αij can be visualized to show what the model is focusing on, providing interpretability. But unlike hard alignment, the model isn't forced to commit to a single position when multiple positions are relevant.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Probability Interpretation</h2>
          <p className="text-slate-700 mb-4">Soft alignment weights can be interpreted as probabilities:</p>
          <p className="text-slate-700 mb-4">"The probability αij reflects the importance of the annotation hj with respect to the previous hidden state si−1 in deciding the next state si and generating yi" [Bahdanau et al., 2014, p. 4].</p>
          <p className="text-slate-700 mb-4">This probabilistic view means:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>`αij` = probability that position j is important for generating output i</li>
            <li>Higher αij means position j contributes more to the context</li>
            <li>Weights naturally capture uncertainty and relevance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">A Visual Example</h2>
          <p className="text-slate-700 mb-4">Translating "The cat sat" to "Le chat était assis":</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Source:     The      cat      sat
                        ↓        ↓        ↓
                        h1       h2       h3
            
            Generating "Le" (The):
            Soft weights: [0.85, 0.10, 0.05]
            Context: c1 = 0.85·h1 + 0.10·h2 + 0.05·h3
                     ↑ Mostly h1, but h2 and h3 still contribute
            
            Generating "chat" (cat):
            Soft weights: [0.05, 0.90, 0.05]
            Context: c2 = 0.05·h1 + 0.90·h2 + 0.05·h3
                     ↑ Mostly h2, but others still influence
            
            Generating "était" (was):
            Soft weights: [0.05, 0.15, 0.80]
            Context: c3 = 0.05·h1 + 0.15·h2 + 0.80·h3
                     ↑ Mostly h3, with some h2 (verb relates to subject)
          </code></pre>
          <p className="text-slate-700 mb-4">Notice how each context is a blend of all positions, but with different mixing ratios. This is the essence of soft alignment.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Soft Alignment in Practice</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Smooth Attention Patterns</h3>
          <p className="text-slate-700 mb-4">Soft alignment produces smooth, continuous attention patterns:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Hard alignment (discrete):
            Position 1: ||||||||||| (100%)
            Position 2:             (0%)
            Position 3:             (0%)
            Position 4:             (0%)
            
            Soft alignment (continuous):
            Position 1: ||||||||||||||||||||||||| (75%)
            Position 2: |||||||| (15%)
            Position 3: ||||| (7%)
            Position 4: || (3%)
          </code></pre>
          <p className="text-slate-700 mb-4">The soft version captures that position 1 is most important, but positions 2-4 also matter a bit.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Gradient Flow</h3>
          <p className="text-slate-700 mb-4">During backpropagation, gradients flow through all positions:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Loss → ∂L/∂ci → ∂L/∂αij → ∂L/∂eij → ∂L/∂parameters
            
            All positions j receive gradients proportional to their weight αij
          </code></pre>
          <p className="text-slate-700 mb-4">This means even low-weight positions get training signal, helping the model learn better alignments over time.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Computational Cost</h3>
          <p className="text-slate-700 mb-4">Soft alignment requires computing scores for all positions:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>For input length Tx and output length Ty: O(Tx × Ty) scores</li>
            <li>Each score requires evaluating the alignment model a()</li>
            <li>All weights are used (no sparsity)</li>
          </ul>
          <p className="text-slate-700 mb-4">This is more expensive than hard alignment (which only computes one position), but the training benefits outweigh the cost.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">From Soft Alignment to Modern Attention</h2>
          <p className="text-slate-700 mb-4">The soft alignment concept evolved into modern attention mechanisms:</p>
          <p className="text-slate-700 mb-4"><strong>Bahdanau Soft Alignment (2014):</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Additive alignment: `eij = vᵀ tanh(Wa·si-1 + Ua·hj)`</li>
            <li>Context for decoder at each step</li>
            <li>RNN-based encoder and decoder</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Transformer Soft Attention (2017):</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Scaled dot-product: `eij = (qi · kj) / √dk`</li>
            <li>Self-attention (input attends to itself)</li>
            <li>Multi-head for multiple attention patterns</li>
            <li>No RNNs, pure soft attention</li>
          </ul>
          <p className="text-slate-700 mb-4">The core idea remains: compute soft weights over all positions using a differentiable function.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Analogy: Reading Comprehension</h2>
          <p className="text-slate-700 mb-4">Imagine answering questions about a passage:</p>
          <p className="text-slate-700 mb-4"><strong>Hard Alignment (one sentence at a time):</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Question: "What color was the cat?"</li>
            <li>You must pick exactly one sentence to look at</li>
            <li>If you pick wrong, you can't recover</li>
            <li>Risk missing relevant context from other sentences</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Soft Alignment (weighted reading):</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Question: "What color was the cat?"</li>
            <li>You look at all sentences, but focus more on relevant ones:</li>
            <li>70% attention on "The cat was orange and white"</li>
            <li>20% attention on "It sat on the orange cushion"</li>
            <li>10% distributed across other sentences</li>
            <li>You integrate information from multiple sources</li>
            <li>More robust if relevance is unclear</li>
          </ul>
          <p className="text-slate-700 mb-4">Soft alignment is like having a variable highlighter that can emphasize text to different degrees, rather than a binary on/off highlighter.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Advantages of Soft Alignment</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">1. Training Stability</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Gradients always flow</li>
            <li>No discrete sampling variance</li>
            <li>Smooth optimization landscape</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. Automatic Learning</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>No need for alignment annotations</li>
            <li>Learns from task loss alone</li>
            <li>Discovers alignment patterns automatically</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Robustness</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Handles ambiguity gracefully</li>
            <li>Recovers from uncertain alignments</li>
            <li>Integrates multiple relevant positions</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">4. Interpretability</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Visualize attention weights</li>
            <li>Understand what model focuses on</li>
            <li>Debug errors by inspecting alignments</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitations</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">1. Computational Cost</h3>
          <p className="text-slate-700 mb-4">All positions are always used, even irrelevant ones. No sparsity benefits.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. Dilution of Signal</h3>
          <p className="text-slate-700 mb-4">When many positions have low weights, the context can become diluted:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Weights: [0.25, 0.25, 0.25, 0.25]  ← All equal, no real focus
          </code></pre>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Quadratic Complexity</h3>
          <p className="text-slate-700 mb-4">For self-attention with sequence length n: O(n²) operations</p>
          <p className="text-slate-700 mb-4">This becomes prohibitive for very long sequences.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Soft alignment uses weighted sums</strong>: All positions contribute with learned weights</li>
            <li><strong>Differentiable</strong>: Enables end-to-end training with backpropagation</li>
            <li><strong>Automatic learning</strong>: No explicit alignment supervision required</li>
            <li><strong>Robust to uncertainty</strong>: Gracefully handles ambiguous alignments</li>
            <li><strong>Foundation for modern attention</strong>: Led to Transformer and beyond</li>
            <li><strong>Trade-offs</strong>: More computation, but better trainability</li>
          </ul>
          <p className="text-slate-700 mb-4">Soft alignment was a key innovation that made attention mechanisms practical and effective. By replacing discrete selection with continuous weighting, it opened the door to the attention revolution in deep learning.</p>
        </section>
      </div>
    </WikiLayout>
  );
}
