import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "Transformer Architecture",
  description: "A neural network architecture that relies entirely on attention mechanisms to draw global dependencies between input and output, enabling parallel processing.",
  category: "Architecture",
  difficulty: "Intermediate",
  tags: ["architecture", "attention", "parallel-processing"],
  relatedConcepts: ["self-attention", "multi-head-attention", "encoder-decoder", "positional-encoding"],
  citations: [
    {
      paper: "Attention Is All You Need",
      authors: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I.",
      year: "2017",
      pages: "2-5"
    }
  ]
};

export default function TransformerArchitecture() {
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
          <p className="text-slate-700 mb-4">The <strong>Transformer</strong> is a model architecture that eschews recurrence entirely and relies solely on an attention mechanism to draw global dependencies between input and output [Vaswani et al., 2017, p. 2]. It represents a fundamental shift from sequential processing (RNNs) to parallel processing via attention.</p>
          <p className="text-slate-700 mb-4">The Transformer follows an encoder-decoder architecture using stacked self-attention and point-wise, fully connected layers [Vaswani et al., 2017, p. 3].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Innovation</h2>
          <p className="text-slate-700 mb-4">Unlike recurrent models which process sequences step-by-step, the Transformer allows for <strong>significantly more parallelization</strong> and can be trained much faster. For machine translation, it achieved a new state of the art while training for as little as twelve hours on eight P100 GPUs [Vaswani et al., 2017, p. 2].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Architecture Components</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Encoder Stack</h3>
          <p className="text-slate-700 mb-4">The encoder is composed of a <strong>stack of N = 6 identical layers</strong> [Vaswani et al., 2017, p. 3]. Each layer has two sub-layers:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>**Multi-head self-attention mechanism**: Allows each position to attend to all positions in the previous layer</li>
            <li>**Position-wise fully connected feed-forward network**: Applied to each position separately and identically</li>
          </ul>
          <p className="text-slate-700 mb-4">Around each of the two sub-layers, the architecture employs:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>**Residual connections** [Vaswani et al., 2017, p. 3]</li>
            <li>**Layer normalization**: The output of each sub-layer is LayerNorm(x + Sublayer(x))</li>
          </ul>
          <p className="text-slate-700 mb-4">All sub-layers and embedding layers produce outputs of dimension <strong>d_model = 512</strong> [Vaswani et al., 2017, p. 3].</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Decoder Stack</h3>
          <p className="text-slate-700 mb-4">The decoder is also composed of a <strong>stack of N = 6 identical layers</strong> [Vaswani et al., 2017, p. 3]. In addition to the two sub-layers in each encoder layer, the decoder inserts a third sub-layer:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>**Masked multi-head self-attention**: Modified to prevent positions from attending to subsequent positions</li>
            <li>**Multi-head attention over encoder output**: Keys and values come from the encoder stack</li>
            <li>**Position-wise fully connected feed-forward network**</li>
          </ul>
          <p className="text-slate-700 mb-4">The masking, combined with the fact that output embeddings are offset by one position, ensures that predictions for position i can depend only on known outputs at positions less than i [Vaswani et al., 2017, p. 3].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Hyperparameters</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Base Model Configuration</h3>
          <p className="text-slate-700 mb-4">The base Transformer model uses the following hyperparameters [Vaswani et al., 2017, p. 5, 9]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>**Number of layers (N)**: 6 (both encoder and decoder)</li>
            <li>**Model dimension (d_model)**: 512</li>
            <li>**Feed-forward dimension (d_ff)**: 2048</li>
            <li>**Number of attention heads (h)**: 8</li>
            <li>**Dimension per head (d_k = d_v)**: 64 (= d_model / h)</li>
            <li>**Dropout rate (P_drop)**: 0.1</li>
            <li>**Label smoothing (ε_ls)**: 0.1</li>
            <li>**Total parameters**: ~65 million</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Big Model Configuration</h3>
          <p className="text-slate-700 mb-4">For their best results, the authors used a "big" variant [Vaswani et al., 2017, p. 9]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>**Model dimension (d_model)**: 1024</li>
            <li>**Feed-forward dimension (d_ff)**: 4096</li>
            <li>**Number of attention heads (h)**: 16</li>
            <li>**Dropout rate (P_drop)**: 0.3</li>
            <li>**Total parameters**: ~213 million</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Position-wise Feed-Forward Networks</h2>
          <p className="text-slate-700 mb-4">Each layer contains a fully connected feed-forward network that is applied to each position separately and identically [Vaswani et al., 2017, p. 5]. This consists of two linear transformations with a ReLU activation in between.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Positional Encoding</h2>
          <p className="text-slate-700 mb-4">Since the Transformer contains no recurrence and no convolution, the model must inject information about the relative or absolute position of tokens in the sequence [Vaswani et al., 2017, p. 6]. The authors use <strong>sinusoidal positional encodings</strong> added to the input embeddings at the bottom of the encoder and decoder stacks.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Training Details</h2>
          <p className="text-slate-700 mb-4">The base model was trained with the following specifications [Vaswani et al., 2017, p. 8]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>**Optimizer**: Adam</li>
            <li>**Training steps**: 100,000 steps</li>
            <li>**Hardware**: 8 NVIDIA P100 GPUs</li>
            <li>**Training time**: 12 hours for base model, 3.5 days for big model</li>
            <li>**Residual dropout**: Applied to output of each sub-layer before addition and normalization</li>
            <li>**Embedding dropout**: Applied to sums of embeddings and positional encodings</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Performance</h2>
          <p className="text-slate-700 mb-4">The Transformer achieved state-of-the-art results on machine translation tasks [Vaswani et al., 2017, p. 8]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>**WMT 2014 English-to-German**: 28.4 BLEU (big model)</li>
            <li>**WMT 2014 English-to-French**: 41.8 BLEU (big model)</li>
            <li>**English Constituency Parsing**: 92.7 F1 score</li>
          </ul>
          <p className="text-slate-700 mb-4">These results were achieved at a fraction of the training cost compared to previous models.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Advantages Over RNNs</h2>
          <p className="text-slate-700 mb-4">The Transformer architecture offers several key advantages over recurrent models [Vaswani et al., 2017, p. 6]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>**Constant path length**: O(1) operations to relate any two positions (vs. O(n) for RNNs)</li>
            <li>**Parallelization**: All positions processed simultaneously</li>
            <li>**Training speed**: Significantly faster training due to parallelization</li>
            <li>**Long-range dependencies**: Easier to learn due to constant path length</li>
            <li>**Interpretability**: Attention mechanisms are more interpretable than recurrent hidden states</li>
          </ul>
          <hr className="my-6 border-slate-200" />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Assembly Line Story</h2>
          <p className="text-slate-700 mb-4">Imagine two factories making complex products:</p>
          <p className="text-slate-700 mb-4"><strong>The RNN Factory (Sequential Processing)</strong>: Workers stand in a line. The first worker receives raw materials and does their job, passing the result to the next worker. Worker 2 can't start until Worker 1 finishes. Worker 10 can't even see what Worker 1 did—they only get what Worker 9 hands them. If Worker 1 discovers something important, that information must pass through 8 other workers before reaching Worker 10, getting diluted each time.</p>
          <p className="text-slate-700 mb-4"><strong>The Transformer Factory (Parallel Processing)</strong>: All workers stand around a large circular table with all the materials visible in the center. When the whistle blows, every worker simultaneously looks at everything on the table (this is self-attention). Each worker decides what's relevant to their specific job.</p>
          <p className="text-slate-700 mb-4">Worker 1 might notice parts A and B fit together. Worker 10 can directly see this too—they don't need to wait for the message to travel through 8 other workers. Within a single moment, all workers understand the entire context and can work simultaneously.</p>
          <p className="text-slate-700 mb-4">The Transformer factory produces the same product in 12 hours instead of 3.5 days, and the quality is better because no worker ever has to rely on diluted second-hand information.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>[Self-Attention](/wiki/self-attention)</li>
            <li>[Multi-Head Attention](/wiki/multi-head-attention)</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
