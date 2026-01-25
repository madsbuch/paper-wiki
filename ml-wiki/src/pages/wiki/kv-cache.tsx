import { useEffect, useState } from "react";
import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

function KVCacheExercise() {
  const [step, setStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const tokens = ["The", "cat", "sat", "on", "the", "mat"];
  const currentTokens = tokens.slice(0, step + 1);

  // Simplified visualization of what gets computed vs cached
  const computeWithoutCache =
    step > 0 ? currentTokens.length * currentTokens.length : 1;
  const computeWithCache = step > 0 ? currentTokens.length : 1;
  const cacheSize = step > 0 ? step : 0;

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Exercise: KV Cache in Action
      </h2>
      <p className="text-slate-700 mb-6">
        Step through autoregressive generation to see how the KV cache reduces
        redundant computation. Watch how many attention computations are needed
        with and without caching.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg">
        <div className="mb-6">
          <p className="text-sm text-slate-600 mb-2">Generated sequence:</p>
          <div className="flex flex-wrap gap-2">
            {tokens.map((token, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 rounded font-mono ${
                  idx <= step
                    ? idx === step
                      ? "bg-green-500 text-white"
                      : "bg-blue-100 text-blue-800"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {token}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            <span className="inline-block w-3 h-3 bg-blue-100 rounded mr-1"></span>{" "}
            Cached tokens
            <span className="inline-block w-3 h-3 bg-green-500 rounded ml-4 mr-1"></span>{" "}
            Current token
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded border border-red-200">
            <h3 className="font-semibold text-red-800 mb-2">
              Without KV Cache
            </h3>
            <p className="text-sm text-slate-600 mb-2">
              Recompute K, V for all tokens at each step
            </p>
            <div className="text-2xl font-bold text-red-600">
              {computeWithoutCache} attention ops
            </div>
            <p className="text-xs text-slate-500">
              (current_len × current_len)
            </p>
          </div>

          <div className="bg-white p-4 rounded border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">With KV Cache</h3>
            <p className="text-sm text-slate-600 mb-2">
              Only compute for new token, reuse cached K, V
            </p>
            <div className="text-2xl font-bold text-green-600">
              {computeWithCache} attention ops
            </div>
            <p className="text-xs text-slate-500">
              Cache size: {cacheSize} token{cacheSize !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className={`px-4 py-2 rounded ${
              step === 0
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-slate-600 text-white hover:bg-slate-700"
            }`}
          >
            ← Previous
          </button>
          <button
            onClick={() => setStep(Math.min(tokens.length - 1, step + 1))}
            disabled={step === tokens.length - 1}
            className={`px-4 py-2 rounded ${
              step === tokens.length - 1
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Generate Next →
          </button>
          <button
            onClick={() => setStep(0)}
            className="px-4 py-2 rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Reset
          </button>
        </div>

        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="mt-4 text-blue-600 hover:text-blue-800 text-sm underline"
        >
          {showExplanation ? "Hide" : "Show"} explanation
        </button>

        {showExplanation && (
          <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200 text-sm text-blue-800">
            <p className="mb-2">
              <strong>At step {step + 1}:</strong> Without caching, we&apos;d
              need to recompute the Key and Value projections for all {step + 1}{" "}
              tokens, then compute {(step + 1) * (step + 1)} attention scores.
            </p>
            <p>
              With KV caching, we only compute K and V for the new token (&quot;
              {tokens[step]}&quot;), append them to the cache, and compute
              attention between the new Query and all cached Keys. The savings
              grow quadratically with sequence length!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

const meta: WikiMeta = {
  title: "KV Cache",
  description:
    "A memory optimization for transformer inference that stores computed key and value vectors to avoid redundant computation during autoregressive generation.",
  category: "Architecture Components",
  difficulty: "Intermediate",
  tags: ["inference", "optimization", "memory", "transformers", "attention"],
  relatedConcepts: [
    "attention-mechanism",
    "transformer-architecture",
    "high-bandwidth-memory",
  ],
  citations: [
    {
      paper:
        "Challenges and Research Directions for Large Language Model Inference Hardware",
      authors: "Ma, X. & Patterson, D.",
      year: "2025",
      pages: "1-11",
    },
    {
      paper: "Attention Is All You Need",
      authors:
        "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I.",
      year: "2017",
      pages: "1-15",
    },
  ],
};

export default function KVCache() {
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
            The Key-Value (KV) Cache is a memory optimization technique for
            transformer inference that stores the computed Key (K) and Value (V)
            projection vectors from previous tokens, allowing the model to avoid
            redundant computation during autoregressive text generation. The KV
            cache connects the Prefill and Decode phases of LLM inference, with
            its size proportional to the input plus output sequence length [Ma
            &amp; Patterson, 2025].
          </p>
          <p className="text-slate-700">
            In each attention layer, rather than recomputing K and V for all
            previous tokens when generating a new token, the model retrieves
            cached values and only computes K and V for the new token. This
            transforms attention computation from O(n²) per token to O(n) per
            token, though it requires storing O(n) vectors per layer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Problem It Solves
          </h2>
          <p className="text-slate-700 mb-4">
            Autoregressive generation produces one token at a time. Without
            caching, generating token t would require recomputing attention over
            all t-1 previous tokens, making the total complexity O(n²) for
            generating n tokens. With KV caching, each token generation only
            requires O(n) new computation.
          </p>
          <p className="text-slate-700">
            For a 1000-token response, naive generation would require
            approximately 500,000 full attention computations per layer. With KV
            caching, this drops to approximately 1000 incremental computations—a
            500x reduction in redundant work.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-slate-700 mb-4">
            In standard self-attention, for an input sequence X, we compute:
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mb-4 overflow-x-auto">
            <div
              dangerouslySetInnerHTML={{
                __html: `
              \\[Q = XW_Q, \\quad K = XW_K, \\quad V = XW_V\\]
              \\[\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V\\]
            `,
              }}
            />
          </div>

          <p className="text-slate-700 mb-4">
            During autoregressive generation, the KV cache works in two phases:
          </p>

          <div className="bg-slate-50 p-6 rounded-lg mb-6 space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                1. Prefill Phase
              </h3>
              <p className="text-slate-700">
                Process the entire input prompt in parallel (compute-bound,
                similar to training). Store all K and V vectors in the cache for
                each layer.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                2. Decode Phase
              </h3>
              <p className="text-slate-700">For each new token generated:</p>
              <ul className="list-disc list-inside ml-4 text-slate-700 mt-2">
                <li>Compute Q, K, V only for the new token</li>
                <li>Append new K, V to the cache</li>
                <li>Compute attention: new Q attends to all cached K, V</li>
                <li>
                  This is memory-bound (small compute, large memory access)
                </li>
              </ul>
            </div>
          </div>

          <h3 className="font-semibold text-slate-900 mb-3">
            Memory Requirements
          </h3>
          <p className="text-slate-700 mb-4">
            The KV cache size for a transformer model scales as:
          </p>
          <div className="bg-slate-50 p-4 rounded-lg mb-4 overflow-x-auto">
            <div
              dangerouslySetInnerHTML={{
                __html: `
              \\[\\text{Cache Size} = 2 \\times L \\times H \\times S \\times B \\times P\\]
            `,
              }}
            />
          </div>
          <p className="text-slate-700 mb-4">
            Where L = layers, H = hidden dimension, S = sequence length, B =
            batch size, P = precision (bytes).
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-slate-300">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-2 text-left border-b border-slate-300">
                    Model
                  </th>
                  <th className="px-4 py-2 text-left border-b border-slate-300">
                    Layers
                  </th>
                  <th className="px-4 py-2 text-left border-b border-slate-300">
                    Hidden Dim
                  </th>
                  <th className="px-4 py-2 text-left border-b border-slate-300">
                    KV Cache @ 4K seq (FP16)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Llama 2 7B
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">32</td>
                  <td className="px-4 py-2 border-b border-slate-200">4096</td>
                  <td className="px-4 py-2 border-b border-slate-200">~2 GB</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Llama 2 70B
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">80</td>
                  <td className="px-4 py-2 border-b border-slate-200">8192</td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    ~10 GB
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">
                    GPT-4 scale (~1.7T)
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">~120</td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    ~12288
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    ~23 GB
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Library Research Assistant Analogy
          </h2>
          <p className="text-slate-700 mb-4">
            Imagine you&apos;re writing a research paper and need to repeatedly
            reference information from a large library. Without any system,
            every time you want to cite something, you&apos;d walk to the
            library, find the book, read the relevant section, and return to
            your desk.
          </p>
          <p className="text-slate-700 mb-4">
            The <strong>KV cache is like hiring a research assistant</strong>{" "}
            with a rolling cart of books. The first time you need information
            from a source (Prefill), the assistant reads through everything and
            takes organized notes—the &quot;Key&quot; notes help identify what
            information is where, and the &quot;Value&quot; notes contain the
            actual content.
          </p>
          <p className="text-slate-700 mb-4">
            For each subsequent paragraph you write (Decode), you only need to
            tell the assistant what you&apos;re looking for (Query). They
            quickly scan their Key notes to find relevant sources, then read you
            the Value notes. No trip to the library needed—just a glance at the
            cart.
          </p>
          <p className="text-slate-700">
            The trade-off? The assistant&apos;s cart has limited space. For a
            very long paper with many sources (long context), you might need
            multiple carts (more memory). And occasionally, for very long
            projects, you may need to summarize older notes to make room for new
            sources (KV cache compression techniques).
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <KVCacheExercise />

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Challenges and Trends
          </h2>
          <p className="text-slate-700 mb-4">
            The KV cache creates a memory-latency trade-off that becomes more
            challenging with modern trends:
          </p>
          <ul className="list-disc list-inside ml-4 text-slate-700 space-y-2">
            <li>
              <strong>Long context:</strong> Models supporting 128K+ tokens
              require proportionally larger caches
            </li>
            <li>
              <strong>Reasoning models:</strong> Generate many
              &quot;thought&quot; tokens before the answer, expanding cache
              requirements
            </li>
            <li>
              <strong>Batched inference:</strong> Each request in a batch needs
              its own KV cache
            </li>
            <li>
              <strong>MoE models:</strong> While sparse for compute, MoE still
              requires full KV caches
            </li>
          </ul>
          <p className="text-slate-700 mt-4">
            Research directions include KV cache compression, quantization, and
            offloading to slower memory (like the High Bandwidth Flash proposed
            by Ma &amp; Patterson for slow-changing context).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact</h2>
          <p className="text-slate-700">
            The KV cache is essential for practical LLM inference. Without it,
            the quadratic cost of recomputing attention would make real-time
            generation of long responses infeasible. However, it transforms the
            Decode phase from compute-bound to memory-bound, shifting the
            bottleneck from GPU FLOPS to HBM bandwidth and capacity. This
            fundamental shift is why Ma &amp; Patterson argue that current AI
            hardware—optimized for high FLOPS—is mismatched to LLM inference
            needs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Related Concepts
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>
              <Link
                to="/wiki/attention-mechanism"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Attention Mechanism
              </Link>{" "}
              - The core operation that KV caching optimizes
            </li>
            <li>
              <Link
                to="/wiki/transformer-architecture"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Transformer Architecture
              </Link>{" "}
              - The architecture that uses KV caching for efficient inference
            </li>
            <li>
              <Link
                to="/wiki/high-bandwidth-memory"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                High Bandwidth Memory
              </Link>{" "}
              - The memory technology that stores the KV cache
            </li>
            <li>
              <Link
                to="/wiki/autoregressive-language-model"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Autoregressive Language Model
              </Link>{" "}
              - The generation paradigm that requires KV caching
            </li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
