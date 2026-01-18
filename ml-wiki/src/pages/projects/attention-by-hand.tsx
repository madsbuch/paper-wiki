import { useState, useEffect } from "react";
import ProjectLayout from "../../components/ProjectLayout";

export const meta = {
  title: "Calculate Multi-Head Attention by Hand",
  description: "Work through the mathematics of scaled dot-product attention and multi-head attention with concrete numerical examples. Build intuition for how attention weights are computed.",
  category: "Exercise" as const,
  difficulty: "Beginner" as const,
  estimatedTime: "15-20 min",
  relatedPapers: [
    { title: "Attention Is All You Need", slug: "attention-is-all-you-need" }
  ],
  relatedConcepts: [
    { name: "Self-Attention", slug: "self-attention" },
    { name: "Multi-Head Attention", slug: "multi-head-attention" }
  ],
  prerequisites: [
    "Basic linear algebra (matrix multiplication, dot products)",
    "Understanding of softmax function"
  ]
};

function AttentionCalculator() {
  const [answers, setAnswers] = useState({
    dotProduct: "",
    scaled: "",
    softmax1: "",
    softmax2: "",
    softmax3: ""
  });
  const [feedback, setFeedback] = useState<Record<string, { correct: boolean; message: string } | null>>({
    dotProduct: null,
    scaled: null,
    softmax1: null,
    softmax2: null,
    softmax3: null
  });

  // Trigger MathJax typesetting after render
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, [feedback]);

  const checkAnswer = (field: string, correctValue: number, tolerance: number = 0.01) => {
    const userValue = parseFloat(answers[field as keyof typeof answers]);
    if (isNaN(userValue)) {
      setFeedback(prev => ({ ...prev, [field]: { correct: false, message: "Please enter a valid number" } }));
      return false;
    }

    const isCorrect = Math.abs(userValue - correctValue) < tolerance;
    setFeedback(prev => ({
      ...prev,
      [field]: {
        correct: isCorrect,
        message: isCorrect ? "✓ Correct!" : `Not quite. The answer is ${correctValue.toFixed(3)}`
      }
    }));
    return isCorrect;
  };

  const allStepsComplete = feedback.dotProduct?.correct && feedback.scaled?.correct &&
                          feedback.softmax1?.correct && feedback.softmax2?.correct &&
                          feedback.softmax3?.correct;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 my-8 border-2 border-blue-200">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Interactive Attention Calculator</h3>

      <div className="bg-white rounded-lg p-4 mb-6">
        <p className="text-sm font-semibold text-slate-700 mb-2">Given:</p>
        <div className="text-sm space-y-2 text-slate-600">
          <div dangerouslySetInnerHTML={{ __html: "$Q = \\begin{bmatrix} 1 & 0 \\end{bmatrix}$ (query: $1 \\times 2$ matrix)" }} />
          <div dangerouslySetInnerHTML={{ __html: "$K = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\\\ 1 & 1 \\end{bmatrix}$ (keys: $3 \\times 2$ matrix)" }} />
          <div dangerouslySetInnerHTML={{ __html: "$V = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\\\ 3 & 3 \\end{bmatrix}$ (values: $3 \\times 2$ matrix)" }} />
          <div dangerouslySetInnerHTML={{ __html: "$d_k = 2$ (key dimension)" }} />
        </div>
      </div>

      <div className="space-y-6">
        {/* Step 1: Dot Product */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="font-bold text-slate-900 mb-2" dangerouslySetInnerHTML={{ __html: "Step 1: Calculate $QK^T$" }} />
          <p className="text-sm text-slate-600 mb-3">
            Compute the dot product between <span dangerouslySetInnerHTML={{ __html: "$Q$" }} /> and the first key vector <span dangerouslySetInnerHTML={{ __html: "$K_0 = \\begin{bmatrix} 1 & 0 \\end{bmatrix}^T$" }} />
          </p>
          <div className="text-sm text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: "$Q \\cdot K_0 = (1 \\times 1) + (0 \\times 0) = ?$" }} />
          <div className="flex gap-2 items-center">
            <input
              type="number"
              step="0.1"
              value={answers.dotProduct}
              onChange={(e) => setAnswers(prev => ({...prev, dotProduct: e.target.value}))}
              className="px-3 py-2 border-2 border-slate-200 rounded-lg w-32 focus:border-blue-500 focus:outline-none"
              placeholder="Answer"
            />
            <button
              onClick={() => checkAnswer('dotProduct', 1.0)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Check
            </button>
          </div>
          {feedback.dotProduct && (
            <p className={`text-sm mt-2 font-medium ${feedback.dotProduct.correct ? 'text-green-600' : 'text-red-600'}`}>
              {feedback.dotProduct.message}
            </p>
          )}
        </div>

        {/* Step 2: Scaling */}
        {feedback.dotProduct?.correct && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="font-bold text-slate-900 mb-2" dangerouslySetInnerHTML={{ __html: "Step 2: Scale by $\\sqrt{d_k}$" }} />
            <p className="text-sm text-slate-600 mb-3">
              Divide the dot product by the square root of the key dimension to prevent large values
            </p>
            <div className="text-sm text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: "$\\text{Scaled} = \\frac{QK^T}{\\sqrt{d_k}} = \\frac{1.0}{\\sqrt{2}} = ?$" }} />
            <div className="flex gap-2 items-center">
              <input
                type="number"
                step="0.001"
                value={answers.scaled}
                onChange={(e) => setAnswers(prev => ({...prev, scaled: e.target.value}))}
                className="px-3 py-2 border-2 border-slate-200 rounded-lg w-32 focus:border-blue-500 focus:outline-none"
                placeholder="Answer"
              />
              <button
                onClick={() => checkAnswer('scaled', 0.707, 0.01)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Check
              </button>
            </div>
            {feedback.scaled && (
              <p className={`text-sm mt-2 font-medium ${feedback.scaled.correct ? 'text-green-600' : 'text-red-600'}`}>
                {feedback.scaled.message}
              </p>
            )}
          </div>
        )}

        {/* Step 3: Softmax */}
        {feedback.scaled?.correct && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-2">Step 3: Apply Softmax</h4>
            <p className="text-sm text-slate-600 mb-3" dangerouslySetInnerHTML={{ __html: "For all three positions, we get scaled scores: $\\begin{bmatrix} 0.707 & 0 & 0.707 \\end{bmatrix}$" }} />
            <div className="text-sm text-slate-600 mb-3" dangerouslySetInnerHTML={{ __html: "Softmax formula: $\\text{softmax}(x_i) = \\frac{\\exp(x_i)}{\\sum_j \\exp(x_j)}$" }} />
            <div className="text-sm text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: "$\\exp(0.707) \\approx 2.028, \\quad \\exp(0) = 1.000$" }} />
            <div className="text-sm text-slate-600 mb-4" dangerouslySetInnerHTML={{ __html: "$\\text{Sum} = 2.028 + 1.000 + 2.028 = 5.056$" }} />

            <div className="space-y-3">
              <div>
                <div className="text-sm text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: "$\\alpha_0 = \\frac{2.028}{5.056} = ?$" }} />
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    step="0.001"
                    value={answers.softmax1}
                    onChange={(e) => setAnswers(prev => ({...prev, softmax1: e.target.value}))}
                    className="px-3 py-2 border-2 border-slate-200 rounded-lg w-32 focus:border-blue-500 focus:outline-none"
                    placeholder="Answer"
                  />
                  <button
                    onClick={() => checkAnswer('softmax1', 0.401, 0.01)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Check
                  </button>
                </div>
                {feedback.softmax1 && (
                  <p className={`text-sm mt-2 font-medium ${feedback.softmax1.correct ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback.softmax1.message}
                  </p>
                )}
              </div>

              {feedback.softmax1?.correct && (
                <div>
                  <div className="text-sm text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: "$\\alpha_1 = \\frac{1.000}{5.056} = ?$" }} />
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      step="0.001"
                      value={answers.softmax2}
                      onChange={(e) => setAnswers(prev => ({...prev, softmax2: e.target.value}))}
                      className="px-3 py-2 border-2 border-slate-200 rounded-lg w-32 focus:border-blue-500 focus:outline-none"
                      placeholder="Answer"
                    />
                    <button
                      onClick={() => checkAnswer('softmax2', 0.198, 0.01)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Check
                    </button>
                  </div>
                  {feedback.softmax2 && (
                    <p className={`text-sm mt-2 font-medium ${feedback.softmax2.correct ? 'text-green-600' : 'text-red-600'}`}>
                      {feedback.softmax2.message}
                    </p>
                  )}
                </div>
              )}

              {feedback.softmax2?.correct && (
                <div>
                  <div className="text-sm text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: "$\\alpha_2 = \\frac{2.028}{5.056} = ?$" }} />
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      step="0.001"
                      value={answers.softmax3}
                      onChange={(e) => setAnswers(prev => ({...prev, softmax3: e.target.value}))}
                      className="px-3 py-2 border-2 border-slate-200 rounded-lg w-32 focus:border-blue-500 focus:outline-none"
                      placeholder="Answer"
                    />
                    <button
                      onClick={() => checkAnswer('softmax3', 0.401, 0.01)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Check
                    </button>
                  </div>
                  {feedback.softmax3 && (
                    <p className={`text-sm mt-2 font-medium ${feedback.softmax3.correct ? 'text-green-600' : 'text-red-600'}`}>
                      {feedback.softmax3.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Completion */}
        {allStepsComplete && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold text-green-900 mb-2">Excellent work!</h4>
                <p className="text-sm text-slate-700 mb-2" dangerouslySetInnerHTML={{ __html: "You've calculated the complete attention mechanism for one query. The attention weights $\\begin{bmatrix} 0.401 & 0.198 & 0.401 \\end{bmatrix}$ show that the query $\\begin{bmatrix} 1 & 0 \\end{bmatrix}$ attends most to keys 0 and 2 (which are similar), and less to key 1 (which is dissimilar)." }} />
                <div className="text-sm text-slate-700">
                  The final step would be to multiply these weights by the value vectors to get the output:
                  <div className="mt-2" dangerouslySetInnerHTML={{ __html: "$\\text{Output} = 0.401 \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} + 0.198 \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix} + 0.401 \\begin{bmatrix} 3 \\\\ 3 \\end{bmatrix} = \\begin{bmatrix} 2.203 \\\\ 2.000 \\end{bmatrix}$" }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AttentionByHandProject() {
  return (
    <ProjectLayout {...meta}>
      <div className="prose prose-slate max-w-none">
        <h2>Overview</h2>
        <p>
          The attention mechanism is the heart of the Transformer architecture. While the equations might look intimidating,
          the underlying mathematics is just linear algebra. In this exercise, you'll work through concrete numerical examples
          to build intuition for how attention weights are computed.
        </p>

        <p>By the end, you'll understand:</p>
        <ul>
          <li>How queries, keys, and values interact</li>
          <li>Why we scale by √d_k</li>
          <li>How attention weights are computed from dot products</li>
        </ul>

        <h2>Background</h2>
        <p>
          From "Attention Is All You Need" (Vaswani et al., 2017), the scaled dot-product attention is defined as:
        </p>

        <div className="bg-slate-100 rounded-lg p-4 text-sm my-4" dangerouslySetInnerHTML={{ __html: "$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$" }} />

        <p>Where:</p>
        <ul>
          <li><strong dangerouslySetInnerHTML={{ __html: "$Q$" }} /> (queries): What we're looking for</li>
          <li><strong dangerouslySetInnerHTML={{ __html: "$K$" }} /> (keys): What each position offers</li>
          <li><strong dangerouslySetInnerHTML={{ __html: "$V$" }} /> (values): The actual content at each position</li>
          <li><strong dangerouslySetInnerHTML={{ __html: "$d_k$" }} />: Dimension of the key vectors (used for scaling)</li>
        </ul>

        <p>
          The intuition: queries and keys determine <em>where</em> to look (via dot products),
          while values determine <em>what</em> to retrieve.
        </p>

        <h2>Interactive Exercise</h2>
        <p>Work through the calculator below to compute attention step-by-step:</p>

        <AttentionCalculator />

        <h2>Understanding the Results</h2>

        <h3>Why Scaling Matters</h3>
        <p dangerouslySetInnerHTML={{ __html: "The scaling factor $1/\\sqrt{d_k}$ is crucial. As noted in the paper: <em>\"We suspect that for large values of $d_k$, the dot products grow large in magnitude, pushing the softmax function into regions where it has extremely small gradients\"</em> (p. 4)." }} />
        <p>
          Without scaling, large dot products would cause softmax to output values very close to 0 or 1,
          making gradients vanish and training difficult.
        </p>

        <h3>Attention Weights as Similarity</h3>
        <p dangerouslySetInnerHTML={{ __html: "Notice how the query $\\begin{bmatrix} 1 & 0 \\end{bmatrix}$ attends most strongly to keys that are similar (keys 0 and 2), and weakly to the dissimilar key (key 1). This is the core mechanism that allows Transformers to focus on relevant information." }} />

        <h2>Multi-Head Attention</h2>
        <p>
          In practice, Transformers use multiple attention heads running in parallel. Each head can learn
          to focus on different aspects of the input.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 my-4">
          <p className="text-sm font-semibold text-blue-900 mb-2">From the paper:</p>
          <p className="text-sm text-slate-700 italic">
            "Multi-head attention allows the model to jointly attend to information from different
            representation subspaces at different positions" (p. 5).
          </p>
        </div>

        <p dangerouslySetInnerHTML={{ __html: "With $h=8$ heads and $d_{\\text{model}}=512$, each head uses $d_k = d_v = 512/8 = 64$ dimensions. The outputs are concatenated and projected through a final weight matrix." }} />

        <h2>Practice Questions</h2>

        <details className="my-4">
          <summary className="cursor-pointer font-semibold text-slate-900 hover:text-violet-600">
            Question 1: If all keys are identical, what happens to attention weights?
          </summary>
          <div className="mt-2 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-700" dangerouslySetInnerHTML={{ __html: "All keys get equal attention weight (uniform distribution), since $QK^T$ yields the same value for all positions. After softmax, each position gets weight $1/n$ where $n$ is the number of keys." }} />
          </div>
        </details>

        <details className="my-4">
          <summary className="cursor-pointer font-semibold text-slate-900 hover:text-violet-600">
            Question 2: What if one key has a much larger dot product (e.g., 10 vs 0.1)?
          </summary>
          <div className="mt-2 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-700">
              After softmax, nearly all attention weight goes to that key. Softmax amplifies differences,
              creating "sharp" attention. This allows the model to focus intensely on the most relevant information.
            </p>
          </div>
        </details>

        <details className="my-4">
          <summary className="cursor-pointer font-semibold text-slate-900 hover:text-violet-600">
            Question 3: Why use multiple heads instead of one larger attention mechanism?
          </summary>
          <div className="mt-2 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-700">
              Multiple heads allow the model to attend to different aspects simultaneously. For example,
              one head might focus on syntactic relationships while another focuses on semantic similarity.
              This parallel processing is more powerful than a single large attention mechanism.
            </p>
          </div>
        </details>

        <h2>Next Steps</h2>
        <p>Now that you understand the mechanics:</p>
        <ol>
          <li><strong>Implement it</strong>: Code scaled dot-product attention from scratch in your preferred language</li>
          <li><strong>Visualize</strong>: Plot attention weights as heatmaps for real sentences</li>
          <li><strong>Explore</strong>: Read about relative positional encoding and other attention variants</li>
        </ol>

        <h2>Key Takeaways</h2>
        <ul>
          <li>Dot products measure similarity between queries and keys</li>
          <li dangerouslySetInnerHTML={{ __html: "Scaling by $\\sqrt{d_k}$ prevents gradient vanishing in deep networks" }} />
          <li>Softmax converts scores to probabilities that sum to 1</li>
          <li>Multiple heads enable attending to different patterns simultaneously</li>
        </ul>
      </div>
    </ProjectLayout>
  );
}
