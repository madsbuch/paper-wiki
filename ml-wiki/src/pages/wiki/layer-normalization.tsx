import { useEffect, useState } from 'react';
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "Layer Normalization",
  description: "A normalization technique that standardizes activations across features within each layer, stabilizing training and enabling deeper networks.",
  category: "Architecture Components",
  difficulty: "Intermediate",
  tags: ["normalization", "training-stability", "deep-learning"],
  relatedConcepts: ["residual-connections", "transformer-architecture", "batch-normalization", "training-stability"],
  citations: [
    {
      paper: "Attention Is All You Need",
      authors: "Vaswani et al.",
      year: "2017",
      pages: "3-4"
    },
    {
      paper: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: "Devlin et al.",
      year: "2019",
      pages: "4"
    }
  ]
};

export default function LayerNormalization() {
  const [inputValues, setInputValues] = useState([2.5, -1.0, 3.5]);
  const [gamma, setGamma] = useState([1.0, 1.0, 1.0]);
  const [beta, setBeta] = useState([0.0, 0.0, 0.0]);
  const epsilon = 1e-5;

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const computeLayerNorm = () => {
    // Compute mean
    const mean = inputValues.reduce((a, b) => a + b, 0) / inputValues.length;

    // Compute variance
    const variance = inputValues.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / inputValues.length;

    // Compute standard deviation
    const std = Math.sqrt(variance + epsilon);

    // Normalize
    const normalized = inputValues.map(x => (x - mean) / std);

    // Apply scale and shift
    const output = normalized.map((x, i) => gamma[i] * x + beta[i]);

    return { mean, variance, std, normalized, output };
  };

  const { mean, variance, std, normalized, output } = computeLayerNorm();

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Layer Normalization?</h2>
          <p className="text-slate-700 mb-4">
            Layer normalization is a technique that normalizes the activations in a neural network layer by computing the mean and variance across all features for each individual example. It helps stabilize training, especially in deep networks like <a href="/wiki/transformer-architecture" className="text-blue-600 hover:text-blue-800 underline">Transformers</a>.
          </p>
          <p className="text-slate-700">
            Think of it like adjusting the brightness and contrast of an image. Each layer in a neural network receives inputs that might have wildly different scales. Layer normalization adjusts these inputs to have consistent statistics (mean of 0, standard deviation of 1), making them easier for the next layer to process.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Math Behind It</h2>
          <p className="text-slate-700 mb-4">For each example in a batch, layer norm computes:</p>
          <div className="bg-slate-100 rounded-lg p-4 mb-4" dangerouslySetInnerHTML={{
            __html: `
              $$\\mu = \\frac{1}{H} \\sum_{i=1}^{H} x_i \\quad \\text{(mean across features)}$$
              $$\\sigma^2 = \\frac{1}{H} \\sum_{i=1}^{H} (x_i - \\mu)^2 \\quad \\text{(variance across features)}$$
              $$y_i = \\gamma \\cdot \\frac{x_i - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} + \\beta$$
            `
          }} />
          <p className="text-slate-700 mb-4">Where:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><span dangerouslySetInnerHTML={{ __html: "$x_i$ is the i-th feature/dimension of the input" }} /></li>
            <li><span dangerouslySetInnerHTML={{ __html: "$H$ is the total number of features (hidden dimension)" }} /></li>
            <li><span dangerouslySetInnerHTML={{ __html: "$\\mu$ is the mean across all features" }} /></li>
            <li><span dangerouslySetInnerHTML={{ __html: "$\\sigma^2$ is the variance across all features" }} /></li>
            <li><span dangerouslySetInnerHTML={{ __html: "$\\epsilon$ is a small constant (e.g., 1e-5) for numerical stability" }} /></li>
            <li><span dangerouslySetInnerHTML={{ __html: "$\\gamma$ and $\\beta$ are learned parameters (scale and shift)" }} /></li>
          </ul>
          <p className="text-slate-700">
            The key insight: <strong>normalize across features for each example independently</strong>, not across examples.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Exercise: Calculate Layer Norm by Hand</h2>
          <p className="text-slate-700 mb-4">
            Adjust the input values and learned parameters to see how layer normalization works in real-time.
          </p>

          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Input Features</h3>
                {inputValues.map((val, idx) => (
                  <div key={idx} className="mb-3">
                    <label className="block text-sm text-slate-700 mb-1">
                      x<sub>{idx + 1}</sub>: <span className="font-mono">{val.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.1"
                      value={val}
                      onChange={(e) => {
                        const newValues = [...inputValues];
                        newValues[idx] = parseFloat(e.target.value);
                        setInputValues(newValues);
                      }}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Learned Parameters</h3>
                <p className="text-sm text-slate-600 mb-2">Gamma (scale):</p>
                {gamma.map((val, idx) => (
                  <div key={idx} className="mb-2">
                    <label className="block text-xs text-slate-600 mb-1">
                      γ<sub>{idx + 1}</sub>: <span className="font-mono">{val.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      step="0.1"
                      value={val}
                      onChange={(e) => {
                        const newGamma = [...gamma];
                        newGamma[idx] = parseFloat(e.target.value);
                        setGamma(newGamma);
                      }}
                      className="w-full"
                    />
                  </div>
                ))}

                <p className="text-sm text-slate-600 mb-2 mt-4">Beta (shift):</p>
                {beta.map((val, idx) => (
                  <div key={idx} className="mb-2">
                    <label className="block text-xs text-slate-600 mb-1">
                      β<sub>{idx + 1}</sub>: <span className="font-mono">{val.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="-2"
                      max="2"
                      step="0.1"
                      value={val}
                      onChange={(e) => {
                        const newBeta = [...beta];
                        newBeta[idx] = parseFloat(e.target.value);
                        setBeta(newBeta);
                      }}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg p-4 border-2 border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-3">Computation Steps:</h3>

              <div className="space-y-3 font-mono text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-blue-900 font-semibold mb-1">1. Compute Mean:</p>
                  <p className="text-slate-700">
                    μ = ({inputValues.map(v => v.toFixed(2)).join(' + ')}) / {inputValues.length} = <strong>{mean.toFixed(4)}</strong>
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded">
                  <p className="text-green-900 font-semibold mb-1">2. Compute Variance:</p>
                  <p className="text-slate-700">
                    σ² = {inputValues.map(v => `(${v.toFixed(2)} - ${mean.toFixed(2)})²`).join(' + ')} / {inputValues.length}
                  </p>
                  <p className="text-slate-700 mt-1">
                    = <strong>{variance.toFixed(4)}</strong>
                  </p>
                </div>

                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-purple-900 font-semibold mb-1">3. Standard Deviation:</p>
                  <p className="text-slate-700">
                    σ = √(σ² + ε) = √({variance.toFixed(4)} + {epsilon}) = <strong>{std.toFixed(4)}</strong>
                  </p>
                </div>

                <div className="bg-orange-50 p-3 rounded">
                  <p className="text-orange-900 font-semibold mb-1">4. Normalize:</p>
                  {normalized.map((val, idx) => (
                    <p key={idx} className="text-slate-700">
                      z<sub>{idx + 1}</sub> = ({inputValues[idx].toFixed(2)} - {mean.toFixed(2)}) / {std.toFixed(2)} = <strong>{val.toFixed(4)}</strong>
                    </p>
                  ))}
                </div>

                <div className="bg-pink-50 p-3 rounded">
                  <p className="text-pink-900 font-semibold mb-1">5. Scale & Shift:</p>
                  {output.map((val, idx) => (
                    <p key={idx} className="text-slate-700">
                      y<sub>{idx + 1}</sub> = {gamma[idx].toFixed(2)} × {normalized[idx].toFixed(2)} + {beta[idx].toFixed(2)} = <strong>{val.toFixed(4)}</strong>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 rounded-lg p-4">
              <p className="font-semibold text-blue-900 mb-2">Try this:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                <li>Set all inputs to the same value - variance becomes 0 (epsilon saves us!)</li>
                <li>Set γ = [1,1,1] and β = [0,0,0] to see pure normalization</li>
                <li>Set γ = [2,1,0.5] to see how scale affects each dimension differently</li>
                <li>Notice: normalized values always have mean ≈ 0 and std ≈ 1</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why It Works</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Training Stability</h3>
          <p className="text-slate-700 mb-4">
            Deep networks suffer from internal covariate shift: as lower layers change during training, the distribution of inputs to higher layers keeps changing. This makes training unstable and slow. Layer normalization addresses this by ensuring each layer receives inputs with consistent statistics, regardless of what's happening in earlier layers.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Gradient Flow</h3>
          <p className="text-slate-700 mb-4">
            Normalization helps gradients flow more smoothly through the network. Without normalization, large activations in one layer can cause exploding gradients. With normalization, activations stay in a reasonable range and gradients remain stable. This is crucial for very deep networks like Transformers, which can have 12, 24, or even 96 layers.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Enables Larger Learning Rates</h3>
          <p className="text-slate-700">
            With stable activations and gradients, you can use larger learning rates, speeding up training significantly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Test Score Analogy</h2>
          <p className="text-slate-700 mb-4">
            Imagine students taking tests in different subjects:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">Without Normalization:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                <li>Math test: scores 0-100</li>
                <li>History test: scores 0-50</li>
                <li>English test: scores 0-200</li>
              </ul>
              <p className="text-slate-700 text-sm mt-2 italic">Comparing raw scores is meaningless because scales differ.</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">With Normalization (Z-Score):</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                <li>Convert each score to "standard deviations from mean"</li>
                <li>Math score 75 → z-score +1.2 (above average)</li>
                <li>History score 30 → z-score +0.8 (above average)</li>
                <li>English score 120 → z-score -0.5 (below average)</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-700">
            Now scores are comparable. Layer normalization does the same for neural network activations: it puts everything on a common scale, making them easier to work with.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Layer Norm vs Batch Norm</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Batch Normalization:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                <li>Normalizes across the batch dimension</li>
                <li>Computes mean/variance over all examples for each feature</li>
                <li>Requires batch statistics</li>
                <li>Works well for CNNs with large batches</li>
                <li>Problematic for small batches or sequence models</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Layer Normalization:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                <li>Normalizes across the feature dimension</li>
                <li>Computes mean/variance over all features for each example</li>
                <li>Independent of batch size</li>
                <li>Works well for RNNs and Transformers</li>
                <li>Consistent between training and inference</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Usage in Transformers</h2>
          <p className="text-slate-700 mb-4">
            The Transformer architecture uses layer normalization extensively. "We apply dropout to the output of each sub-layer, before it is added to the sub-layer input and normalized" [Vaswani et al., 2017, p. 4].
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-100 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Post-Norm (Original):</h4>
              <pre className="text-sm text-slate-700 font-mono">
{`x' = x + Dropout(Sublayer(x))
output = LayerNorm(x')`}
              </pre>
            </div>
            <div className="bg-slate-100 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Pre-Norm (Modern):</h4>
              <pre className="text-sm text-slate-700 font-mono">
{`output = x +
  Dropout(Sublayer(LayerNorm(x)))`}
              </pre>
            </div>
          </div>
          <p className="text-slate-700 mb-4">
            Pre-norm tends to be more stable for very deep networks, though post-norm sometimes achieves slightly better performance.
          </p>
          <p className="text-slate-700">
            In a Transformer encoder layer with 12 layers, layer norm appears twice per layer (after <a href="/wiki/self-attention" className="text-blue-600 hover:text-blue-800 underline">self-attention</a> and after feed-forward) - that's 24 normalization operations per forward pass.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li><a href="/wiki/residual-connections" className="text-blue-600 hover:text-blue-800 underline">Residual Connections</a> - Layer norm is used after residual additions</li>
            <li><a href="/wiki/transformer-architecture" className="text-blue-600 hover:text-blue-800 underline">Transformer Architecture</a> - Uses layer norm extensively</li>
            <li><a href="/wiki/self-attention" className="text-blue-600 hover:text-blue-800 underline">Self-Attention</a> - Layer norm stabilizes attention layers</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
