import { useEffect } from 'react';
import WikiLayout from '../../components/WikiLayout';

export default function ScaledDotProductAttention() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  return (
    <WikiLayout
      title="Scaled Dot-Product Attention"
      citations={[
        {
          paper: "Attention Is All You Need",
          authors: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I.",
          year: "2017",
          pages: "3-4"
        }
      ]}
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700">
            <strong>Scaled Dot-Product Attention</strong> is the specific attention mechanism used in the Transformer architecture.
            An attention function maps a query and a set of key-value pairs to an output, where the query, keys, values, and output
            are all vectors. The output is computed as a weighted sum of the values, where the weight assigned to each value is computed
            by a compatibility function of the query with the corresponding key [Vaswani et al., 2017, p. 3].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Mathematical Formula</h2>
          <p className="text-slate-700 mb-4">
            The attention is computed as [Vaswani et al., 2017, p. 4]:
          </p>
          <div
            className="bg-slate-100 rounded-lg p-6 text-center text-lg my-4"
            dangerouslySetInnerHTML={{
              __html: "$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$"
            }}
          />
          <div className="text-slate-700 space-y-2">
            <p>Where:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li dangerouslySetInnerHTML={{ __html: "<strong>Q</strong>: Matrix of queries" }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>K</strong>: Matrix of keys" }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>V</strong>: Matrix of values" }} />
              <li dangerouslySetInnerHTML={{ __html: "<strong>$d_k$</strong>: Dimension of the keys" }} />
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Algorithm Steps</h2>
          <ol className="list-decimal list-inside space-y-3 ml-4 text-slate-700">
            <li>
              <span dangerouslySetInnerHTML={{ __html: "<strong>Compute dot products</strong>: Calculate $QK^T$ to measure compatibility between all queries and keys" }} />
            </li>
            <li>
              <span dangerouslySetInnerHTML={{ __html: "<strong>Scale</strong>: Divide each dot product by $\\sqrt{d_k}$" }} />
            </li>
            <li>
              <strong>Apply softmax</strong>: Convert scores to probabilities (weights)
            </li>
            <li>
              <span dangerouslySetInnerHTML={{ __html: "<strong>Weight the values</strong>: Multiply the weights by $V$ to get the output" }} />
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Scaling Matters</h2>
          <p className="text-slate-700 mb-4">
            <span dangerouslySetInnerHTML={{ __html: "The scaling factor $1/\\sqrt{d_k}$ is crucial for performance [Vaswani et al., 2017, p. 4]." }} />
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Problem Without Scaling</h3>
          <p className="text-slate-700 mb-4">
            <span dangerouslySetInnerHTML={{ __html: "For large values of $d_k$, the dot products grow large in magnitude. This pushes the softmax function into regions where it has extremely small gradients, making learning difficult [Vaswani et al., 2017, p. 4]." }} />
          </p>
          <p className="text-slate-700 mb-4">
            <span dangerouslySetInnerHTML={{
              __html: "<strong>Statistical Explanation</strong>: If the components of $q$ and $k$ are independent random variables with mean 0 and variance 1, then their dot product $q \\cdot k = \\sum_i q_i k_i$ has mean 0 and variance $d_k$. As $d_k$ grows, the variance increases, causing the dot products to spread out to larger values [Vaswani et al., 2017, p. 4, footnote 4]."
            }} />
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Solution: Scaling</h3>
          <p className="text-slate-700">
            <span dangerouslySetInnerHTML={{
              __html: "By dividing by $\\sqrt{d_k}$, we normalize the variance back to 1, keeping the dot products in a reasonable range for the softmax function. This maintains good gradient flow during training [Vaswani et al., 2017, p. 4]."
            }} />
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Comparison to Other Attention Types</h2>
          <p className="text-slate-700 mb-4">
            The two most commonly used attention functions are [Vaswani et al., 2017, p. 4]:
          </p>
          <ol className="list-decimal list-inside space-y-3 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Additive Attention</strong>: Uses a feed-forward network with a single hidden layer to compute the compatibility function
            </li>
            <li>
              <strong>Dot-Product Attention</strong>: Identical to scaled dot-product attention, except without the scaling factor
            </li>
          </ol>
          <p className="text-slate-700 mb-3">
            While theoretically similar in complexity, dot-product attention is:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Much faster</strong> in practice (highly optimized matrix multiplication)</li>
            <li><strong>More space-efficient</strong> (no learned parameters for the attention function itself)</li>
          </ul>
          <p className="text-slate-700">
            <span dangerouslySetInnerHTML={{
              __html: "However, additive attention outperforms unscaled dot-product attention for larger values of $d_k$, which is why the scaling factor is essential [Vaswani et al., 2017, p. 4]."
            }} />
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Practical Implementation</h2>
          <p className="text-slate-700">
            The formula is computed on <strong>sets of queries simultaneously</strong>, packed together into matrices.
            This enables parallel processing and makes the operation highly efficient on modern hardware [Vaswani et al., 2017, p. 4].
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Search Engine Analogy: A Story</h2>
          <p className="text-slate-700 mb-4">
            Imagine you're building a search engine for a vast digital library. Users type queries, and you need to find the most relevant documents.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Matching Process</h3>

          <div className="mb-6">
            <p className="font-semibold text-slate-900 mb-2">
              <span dangerouslySetInnerHTML={{ __html: "Step 1: Compute Similarity ($QK^T$)" }} />
            </p>
            <p className="text-slate-700">
              When a user searches for "machine learning," you compute how similar this query is to every document in your library.
              Each document (key) gets a similarity score with the query. Documents about "neural networks," "AI," and "deep learning"
              get high scores. Documents about "cooking recipes" get low scores.
            </p>
          </div>

          <div className="mb-6">
            <p className="font-semibold text-slate-900 mb-2">
              <span dangerouslySetInnerHTML={{ __html: "Step 2: The Scaling Problem (Why $\\sqrt{d_k}$?)" }} />
            </p>
            <p className="text-slate-700 mb-3">
              Imagine your library has two sections:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-3">
              <li>
                <span dangerouslySetInnerHTML={{ __html: "<strong>Simple Library</strong>: Documents described by 10 features ($d_k = 10$)" }} />
              </li>
              <li>
                <span dangerouslySetInnerHTML={{ __html: "<strong>Detailed Library</strong>: Documents described by 1000 features ($d_k = 1000$)" }} />
              </li>
            </ul>
            <p className="text-slate-700 mb-3">
              In the Detailed Library, similarity scores naturally become much larger just because you're summing 1000 numbers instead of 10.
              A good match might score 500, a bad match -300. These huge numbers cause problems!
            </p>
            <p className="text-slate-700 mb-3">
              When you try to convert these scores to probabilities using softmax, the large numbers create extreme values: 0.99999 for the
              top match and 0.00001 for everything else. The top match completely dominates, and the model can't learn from subtle
              differences—it's too confident, too quickly.
            </p>
            <p className="text-slate-700">
              <span dangerouslySetInnerHTML={{
                __html: "<strong>The Scaling Fix</strong>: Divide all scores by $\\sqrt{1000} \\approx 31.6$. Now scores are back in a reasonable range (maybe +16 for good matches, -10 for bad ones). The softmax can now produce more balanced probabilities like 0.7, 0.2, 0.1, allowing the model to learn from multiple relevant documents."
              }} />
            </p>
          </div>

          <div className="mb-6">
            <p className="font-semibold text-slate-900 mb-2">
              Step 3: Softmax (Converting to Weights)
            </p>
            <p className="text-slate-700">
              Now you convert similarity scores to probabilities. Documents with higher similarity get higher weights. This creates a
              probability distribution—weights sum to 1, and each weight represents how much attention to pay to that document.
            </p>
          </div>

          <div className="mb-6">
            <p className="font-semibold text-slate-900 mb-2">
              <span dangerouslySetInnerHTML={{ __html: "Step 4: Weighted Sum (Multiply by $V$)" }} />
            </p>
            <p className="text-slate-700">
              Finally, you combine the actual content (values) of documents according to their weights. If the "neural networks" document
              has weight 0.7 and the "deep learning" document has weight 0.3, your output is 70% from the first and 30% from the second.
            </p>
          </div>

          <p className="text-slate-700 mt-6">
            This is scaled dot-product attention: intelligently weighted averaging, where the weights come from measuring relevance
            (dot products), carefully scaled to avoid extreme confidence, and converted to probabilities that determine how to mix the information.
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
