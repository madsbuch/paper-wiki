import { useEffect, useState } from "react";
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

function SAEExercise() {
  const [inputActivation] = useState([0.7, 0.3, 0.8, 0.2, 0.5]);
  const [features, setFeatures] = useState([
    { id: 1, name: "Surprise marker", activation: 0, threshold: 0.6 },
    { id: 2, name: "Technical term", activation: 0, threshold: 0.5 },
    { id: 3, name: "Question pattern", activation: 0, threshold: 0.4 },
    { id: 4, name: "Agreement signal", activation: 0, threshold: 0.55 },
    { id: 5, name: "Reasoning step", activation: 0, threshold: 0.45 },
  ]);
  const [sparsity, setSparsity] = useState(0.8);

  const encode = () => {
    const encoded = features.map((f, i) => {
      const rawActivation =
        inputActivation.reduce(
          (sum, a, j) => sum + a * Math.sin((i + 1) * (j + 1) * 0.5),
          0,
        ) / inputActivation.length;
      const activation = Math.max(0, rawActivation - (1 - sparsity) * 0.5);
      return { ...f, activation: Math.min(1, Math.abs(activation)) };
    });
    setFeatures(encoded);
  };

  const reset = () => {
    setFeatures(features.map((f) => ({ ...f, activation: 0 })));
  };

  const activeFeatures = features.filter((f) => f.activation > f.threshold);

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Exercise: Sparse Encoding
      </h2>
      <p className="text-slate-700 mb-4">
        Adjust the sparsity level and click "Encode" to see how a sparse
        autoencoder identifies interpretable features from dense neural
        activations. Higher sparsity means fewer features activate, making each
        one more meaningful.
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Sparsity: {(sparsity * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0.5"
          max="0.95"
          step="0.05"
          value={sparsity}
          onChange={(e) => setSparsity(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-slate-500">
          Higher sparsity = fewer but more interpretable features
        </p>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg mb-4">
        <h3 className="font-medium text-slate-900 mb-2">
          Input Activations (dense)
        </h3>
        <div className="flex gap-2">
          {inputActivation.map((a, i) => (
            <div key={i} className="text-center">
              <div
                className="w-8 h-16 bg-blue-500 rounded"
                style={{ height: `${a * 64}px`, opacity: 0.3 + a * 0.7 }}
              />
              <span className="text-xs text-slate-600">{a.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={encode}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Encode
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
        >
          Reset
        </button>
      </div>

      <div className="bg-white border border-slate-200 p-4 rounded-lg mb-4">
        <h3 className="font-medium text-slate-900 mb-2">Sparse Features</h3>
        <div className="space-y-2">
          {features.map((f) => (
            <div key={f.id} className="flex items-center gap-2">
              <span className="w-32 text-sm text-slate-700">{f.name}</span>
              <div className="flex-1 h-4 bg-slate-100 rounded overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    f.activation > f.threshold ? "bg-green-500" : "bg-slate-300"
                  }`}
                  style={{ width: `${f.activation * 100}%` }}
                />
              </div>
              <span
                className={`text-xs ${f.activation > f.threshold ? "text-green-600 font-medium" : "text-slate-400"}`}
              >
                {f.activation.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {activeFeatures.length > 0 && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">
            <strong>Active features:</strong>{" "}
            {activeFeatures.map((f) => f.name).join(", ")}
          </p>
          <p className="text-green-700 text-xs mt-1">
            These features represent interpretable concepts that the model
            "sees" in the input. In research on reasoning models, features like
            "surprise markers" have been causally linked to improved
            problem-solving.
          </p>
        </div>
      )}
    </section>
  );
}

const meta: WikiMeta = {
  title: "Sparse Autoencoders",
  description:
    "Neural networks that learn compressed, interpretable representations by encouraging most features to remain inactive for any given input.",
  category: "Interpretability",
  difficulty: "Advanced",
  tags: [
    "interpretability",
    "representation-learning",
    "neural-networks",
    "feature-learning",
  ],
  relatedConcepts: [
    "mechanistic-interpretability",
    "attention-mechanism",
    "transformer-architecture",
  ],
  citations: [
    {
      paper:
        "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet",
      authors: "Templeton, A., et al.",
      year: "2024",
      pages: "1-100",
    },
    {
      paper:
        "Towards Monosemanticity: Decomposing Language Models With Dictionary Learning",
      authors: "Bricken, T., et al.",
      year: "2023",
      pages: "1-80",
    },
    {
      paper: "Reasoning Models Generate Societies of Thought",
      authors:
        "Kim, J., Lai, S., Scherrer, N., Agüera y Arcas, B., & Evans, J.",
      year: "2025",
      pages: "7-12",
    },
  ],
};

export default function SparseAutoencoders() {
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
          <p className="text-slate-700 mb-4">
            A sparse autoencoder (SAE) is a type of neural network that learns
            to compress and reconstruct its inputs while enforcing that only a
            small fraction of its internal features activate for any given input
            [Bricken et al., 2023]. This sparsity constraint encourages the
            network to learn features that correspond to meaningful,
            interpretable concepts rather than tangled, polysemantic
            representations.
          </p>
          <p className="text-slate-700">
            SAEs have become a key tool in mechanistic interpretability
            research, enabling researchers to decompose the activations of large
            language models into human-understandable features. In studies of
            reasoning models, SAEs have been used to identify features
            associated with conversational behaviors that causally improve
            problem-solving [Kim et al., 2025].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Problem It Solves
          </h2>
          <p className="text-slate-700 mb-4">
            Neural network activations are notoriously difficult to interpret. A
            single neuron might respond to many unrelated concepts
            (polysemanticity), and meaningful concepts are often distributed
            across many neurons (superposition). This makes it hard to
            understand what a model "knows" or why it produces certain outputs.
          </p>
          <p className="text-slate-700">
            Sparse autoencoders address this by learning a new set of features
            that are:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
            <li>
              <strong>Sparse</strong>: Most features are inactive for any given
              input
            </li>
            <li>
              <strong>Monosemantic</strong>: Each feature tends to correspond to
              one concept
            </li>
            <li>
              <strong>Interpretable</strong>: Features can be understood by
              examining what activates them
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-slate-700 mb-4">
            A sparse autoencoder has an encoder-decoder structure with a
            sparsity penalty:
          </p>

          <div className="bg-slate-50 p-4 rounded-lg mb-4">
            <p
              className="text-slate-700 mb-2"
              dangerouslySetInnerHTML={{
                __html: `
              <strong>Encoder:</strong> \\( f(x) = \\text{ReLU}(W_{\\text{enc}} x + b_{\\text{enc}}) \\)
            `,
              }}
            />
            <p
              className="text-slate-700 mb-2"
              dangerouslySetInnerHTML={{
                __html: `
              <strong>Decoder:</strong> \\( \\hat{x} = W_{\\text{dec}} f(x) + b_{\\text{dec}} \\)
            `,
              }}
            />
            <p
              className="text-slate-700"
              dangerouslySetInnerHTML={{
                __html: `
              <strong>Loss:</strong> \\( \\mathcal{L} = ||x - \\hat{x}||^2 + \\lambda ||f(x)||_1 \\)
            `,
              }}
            />
          </div>

          <p className="text-slate-700 mb-4">The key components are:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Reconstruction loss</strong>: Ensures the autoencoder can
              recover the original activations
            </li>
            <li>
              <strong>L1 sparsity penalty</strong>: Encourages most features to
              be zero, controlled by λ
            </li>
            <li>
              <strong>ReLU activation</strong>: Ensures feature activations are
              non-negative
            </li>
            <li>
              <strong>Overcomplete representation</strong>: SAEs typically have
              more features than input dimensions
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Feature Interpretation
          </h3>
          <p className="text-slate-700 mb-4">
            After training, each feature can be interpreted by examining:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
            <li>Which inputs cause it to activate most strongly</li>
            <li>
              What happens when the feature is artificially increased or
              decreased
            </li>
            <li>The words/tokens that appear when the feature is active</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Color Palette Analogy
          </h2>
          <p className="text-slate-700 mb-4">
            Imagine you're an artist trying to describe a complex painting to
            someone who can't see it. You could describe it as a grid of RGB
            values—technically complete but nearly impossible to understand. Or
            you could say "it's mostly blue sky with a red barn and green
            trees."
          </p>
          <p className="text-slate-700 mb-4">
            Neural network activations are like the RGB values—technically
            informative but incomprehensible. A sparse autoencoder is like
            learning a palette of meaningful colors ("sky blue," "barn red,"
            "leaf green") where most colors don't appear in any given painting,
            but the ones that do tell you something meaningful.
          </p>
          <p className="text-slate-700">
            When Anthropic applied SAEs to Claude 3 Sonnet, they found features
            for concepts like "the Golden Gate Bridge," "code errors," and
            "deceptive behavior"—each sparse (only activating for relevant
            inputs) and interpretable [Templeton et al., 2024].
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <SAEExercise />

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact</h2>
          <p className="text-slate-700 mb-4">
            Sparse autoencoders have become central to mechanistic
            interpretability research. Anthropic's work identified millions of
            interpretable features in Claude 3 Sonnet, including features
            related to safety-relevant behaviors [Templeton et al., 2024].
          </p>
          <p className="text-slate-700">
            In the study of reasoning models, SAEs trained on
            DeepSeek-R1-Llama-8B revealed that conversational features—like
            "discourse markers for surprise"—are causally linked to reasoning
            performance. Steering feature 30939 (a surprise/realization marker
            with 65.7% conversation ratio) doubled accuracy on arithmetic tasks,
            demonstrating that SAE-identified features aren't just correlational
            but mechanistically important [Kim et al., 2025].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Related Concepts
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>
              <a
                href="/wiki/mechanistic-interpretability"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Mechanistic Interpretability
              </a>{" "}
              - The broader field of understanding neural network internals
            </li>
            <li>
              <a
                href="/wiki/transformer-architecture"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Transformer Architecture
              </a>{" "}
              - The architecture SAEs are commonly applied to
            </li>
            <li>
              <a
                href="/wiki/attention-mechanism"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Attention Mechanism
              </a>{" "}
              - A component whose activations SAEs can decompose
            </li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
