import { useState, useEffect } from "react";
import ProjectLayout from "../../components/ProjectLayout";

export const meta = {
  title: "Derive the Gradient of Cross-Entropy Loss",
  description: "Step through the calculus to derive the gradient of cross-entropy loss with softmax. Understand why it has such a clean form and how it drives learning in language models.",
  category: "Exercise" as const,
  difficulty: "Intermediate" as const,
  estimatedTime: "20-30 min",
  relatedPapers: [
    { title: "Attention Is All You Need", slug: "attention-is-all-you-need" },
    { title: "BERT", slug: "bert" }
  ],
  relatedConcepts: [
    { name: "Self-Attention", slug: "self-attention" }
  ],
  prerequisites: [
    "Calculus (chain rule, partial derivatives)",
    "Understanding of softmax and cross-entropy",
    "Basic probability theory"
  ]
};

function GradientCalculator() {
  const [answers, setAnswers] = useState({
    softmax1: "",
    softmax2: "",
    softmax3: "",
    loss: "",
    grad1: "",
    grad2: "",
    grad3: ""
  });
  const [feedback, setFeedback] = useState<Record<string, { correct: boolean; message: string } | null>>({
    softmax1: null,
    softmax2: null,
    softmax3: null,
    loss: null,
    grad1: null,
    grad2: null,
    grad3: null
  });

  // Trigger MathJax typesetting after render
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, [feedback]);

  // Given values
  const z = [2.0, 1.0, 0.1];
  const t = [1, 0, 0]; // Class 0 is correct

  // Correct values
  const expZ = z.map(zi => Math.exp(zi));
  const sumExp = expZ.reduce((a, b) => a + b, 0);
  const y = expZ.map(e => e / sumExp);
  const loss = -Math.log(y[0]);
  const grad = y.map((yi, i) => yi - t[i]);

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
        message: isCorrect ? "✓ Correct!" : `Not quite. The answer is ${correctValue.toFixed(4)}`
      }
    }));
    return isCorrect;
  };

  const allSoftmaxCorrect = feedback.softmax1?.correct && feedback.softmax2?.correct && feedback.softmax3?.correct;
  const allGradCorrect = feedback.grad1?.correct && feedback.grad2?.correct && feedback.grad3?.correct;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 my-8 border-2 border-purple-200">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Interactive Gradient Calculator</h3>

      <div className="bg-white rounded-lg p-4 mb-6">
        <p className="text-sm font-semibold text-slate-700 mb-2">Given:</p>
        <div className="text-sm space-y-2 text-slate-600">
          <div dangerouslySetInnerHTML={{ __html: "Logits: $\\mathbf{z} = \\begin{bmatrix} 2.0 & 1.0 & 0.1 \\end{bmatrix}^T$" }} />
          <div dangerouslySetInnerHTML={{ __html: "True label: $\\mathbf{t} = \\begin{bmatrix} 1 & 0 & 0 \\end{bmatrix}^T$ (class 0 is correct)" }} />
        </div>
      </div>

      <div className="space-y-6">
        {/* Step 1: Compute Softmax */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h4 className="font-bold text-slate-900 mb-2">Step 1: Compute Softmax Probabilities</h4>
          <div className="text-sm text-slate-600 mb-3" dangerouslySetInnerHTML={{ __html: "Formula: $y_i = \\frac{\\exp(z_i)}{\\sum_j \\exp(z_j)}$" }} />
          <div className="text-sm text-slate-600 mb-3">
            <div dangerouslySetInnerHTML={{ __html: `$\\exp(\\mathbf{z}) = \\begin{bmatrix} ${expZ[0].toFixed(3)} & ${expZ[1].toFixed(3)} & ${expZ[2].toFixed(3)} \\end{bmatrix}^T$` }} />
            <br />
            <div dangerouslySetInnerHTML={{ __html: `$\\sum \\exp(z_j) = ${sumExp.toFixed(3)}$` }} />
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-sm text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: `$y_0 = \\frac{${expZ[0].toFixed(3)}}{${sumExp.toFixed(3)}} = ?$` }} />
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  step="0.001"
                  value={answers.softmax1}
                  onChange={(e) => setAnswers(prev => ({...prev, softmax1: e.target.value}))}
                  className="px-3 py-2 border-2 border-slate-200 rounded-lg w-32 focus:border-purple-500 focus:outline-none"
                  placeholder="Answer"
                />
                <button
                  onClick={() => checkAnswer('softmax1', y[0], 0.01)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
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
              <>
                <div>
                  <div className="text-sm text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: `$y_1 = \\frac{${expZ[1].toFixed(3)}}{${sumExp.toFixed(3)}} = ?$` }} />
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      step="0.001"
                      value={answers.softmax2}
                      onChange={(e) => setAnswers(prev => ({...prev, softmax2: e.target.value}))}
                      className="px-3 py-2 border-2 border-slate-200 rounded-lg w-32 focus:border-purple-500 focus:outline-none"
                      placeholder="Answer"
                    />
                    <button
                      onClick={() => checkAnswer('softmax2', y[1], 0.01)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
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

                {feedback.softmax2?.correct && (
                  <div>
                    <div className="text-sm text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: `$y_2 = \\frac{${expZ[2].toFixed(3)}}{${sumExp.toFixed(3)}} = ?$` }} />
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        step="0.001"
                        value={answers.softmax3}
                        onChange={(e) => setAnswers(prev => ({...prev, softmax3: e.target.value}))}
                        className="px-3 py-2 border-2 border-slate-200 rounded-lg w-32 focus:border-purple-500 focus:outline-none"
                        placeholder="Answer"
                      />
                      <button
                        onClick={() => checkAnswer('softmax3', y[2], 0.01)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
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
              </>
            )}
          </div>
        </div>

        {/* Step 2: Compute Loss */}
        {allSoftmaxCorrect && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-2">Step 2: Compute Cross-Entropy Loss</h4>
            <div className="text-sm text-slate-600 mb-3" dangerouslySetInnerHTML={{ __html: "Formula: $L = -\\sum_i t_i \\log(y_i)$" }} />
            <div className="text-sm text-slate-600 mb-3" dangerouslySetInnerHTML={{ __html: "Since $\\mathbf{t} = \\begin{bmatrix} 1 & 0 & 0 \\end{bmatrix}^T$, only the first term matters:" }} />
            <div className="text-sm text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: `$L = -\\log(y_0) = -\\log(${y[0].toFixed(4)}) = ?$` }} />
            <div className="flex gap-2 items-center">
              <input
                type="number"
                step="0.001"
                value={answers.loss}
                onChange={(e) => setAnswers(prev => ({...prev, loss: e.target.value}))}
                className="px-3 py-2 border-2 border-slate-200 rounded-lg w-32 focus:border-purple-500 focus:outline-none"
                placeholder="Answer"
              />
              <button
                onClick={() => checkAnswer('loss', loss, 0.01)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                Check
              </button>
            </div>
            {feedback.loss && (
              <p className={`text-sm mt-2 font-medium ${feedback.loss.correct ? 'text-green-600' : 'text-red-600'}`}>
                {feedback.loss.message}
              </p>
            )}
          </div>
        )}

        {/* Step 3: Compute Gradient */}
        {feedback.loss?.correct && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="font-bold text-slate-900 mb-2" dangerouslySetInnerHTML={{ __html: "Step 3: Compute Gradient $\\frac{\\partial L}{\\partial \\mathbf{z}}$" }} />
            <div className="text-sm text-slate-600 mb-3" dangerouslySetInnerHTML={{ __html: "The beautiful result: $\\frac{\\partial L}{\\partial z_i} = y_i - t_i$" }} />
            <div className="text-sm text-slate-600 mb-4">
              Calculate the gradient for each logit:
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: `$\\frac{\\partial L}{\\partial z_0} = y_0 - t_0 = ${y[0].toFixed(4)} - 1 = ?$` }} />
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    step="0.001"
                    value={answers.grad1}
                    onChange={(e) => setAnswers(prev => ({...prev, grad1: e.target.value}))}
                    className="px-3 py-2 border-2 border-slate-200 rounded-lg w-32 focus:border-purple-500 focus:outline-none"
                    placeholder="Answer"
                  />
                  <button
                    onClick={() => checkAnswer('grad1', grad[0], 0.01)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    Check
                  </button>
                </div>
                {feedback.grad1 && (
                  <p className={`text-sm mt-2 font-medium ${feedback.grad1.correct ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback.grad1.message}
                  </p>
                )}
              </div>

              {feedback.grad1?.correct && (
                <>
                  <div>
                    <div className="text-sm text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: `$\\frac{\\partial L}{\\partial z_1} = y_1 - t_1 = ${y[1].toFixed(4)} - 0 = ?$` }} />
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        step="0.001"
                        value={answers.grad2}
                        onChange={(e) => setAnswers(prev => ({...prev, grad2: e.target.value}))}
                        className="px-3 py-2 border-2 border-slate-200 rounded-lg w-32 focus:border-purple-500 focus:outline-none"
                        placeholder="Answer"
                      />
                      <button
                        onClick={() => checkAnswer('grad2', grad[1], 0.01)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                      >
                        Check
                      </button>
                    </div>
                    {feedback.grad2 && (
                      <p className={`text-sm mt-2 font-medium ${feedback.grad2.correct ? 'text-green-600' : 'text-red-600'}`}>
                        {feedback.grad2.message}
                      </p>
                    )}
                  </div>

                  {feedback.grad2?.correct && (
                    <div>
                      <div className="text-sm text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: `$\\frac{\\partial L}{\\partial z_2} = y_2 - t_2 = ${y[2].toFixed(4)} - 0 = ?$` }} />
                      <div className="flex gap-2 items-center">
                        <input
                          type="number"
                          step="0.001"
                          value={answers.grad3}
                          onChange={(e) => setAnswers(prev => ({...prev, grad3: e.target.value}))}
                          className="px-3 py-2 border-2 border-slate-200 rounded-lg w-32 focus:border-purple-500 focus:outline-none"
                          placeholder="Answer"
                        />
                        <button
                          onClick={() => checkAnswer('grad3', grad[2], 0.01)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                        >
                          Check
                        </button>
                      </div>
                      {feedback.grad3 && (
                        <p className={`text-sm mt-2 font-medium ${feedback.grad3.correct ? 'text-green-600' : 'text-red-600'}`}>
                          {feedback.grad3.message}
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Completion */}
        {allGradCorrect && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold text-green-900 mb-2">Perfect! You've derived the gradient!</h4>
                <div className="text-sm text-slate-700 mb-2" dangerouslySetInnerHTML={{ __html: `The gradient vector is $\\nabla L = \\begin{bmatrix} ${grad[0].toFixed(4)} & ${grad[1].toFixed(4)} & ${grad[2].toFixed(4)} \\end{bmatrix}^T$. Notice how it's simply $\\mathbf{y} - \\mathbf{t}$!` }} />
                <p className="text-sm text-slate-700">
                  The negative value for the correct class ({grad[0].toFixed(4)}) will increase its logit,
                  while the positive values for incorrect classes will decrease theirs. The model learns to
                  be more confident in the correct answer.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CrossEntropyGradientProject() {
  return (
    <ProjectLayout {...meta}>
      <div className="prose prose-slate max-w-none">
        <h2>Overview</h2>
        <p>
          Cross-entropy loss combined with softmax is the most common output layer in language models
          and classifiers. The gradient has a remarkably clean form that makes backpropagation efficient.
          In this exercise, you'll compute it step-by-step with real numbers.
        </p>

        <h2>Interactive Exercise</h2>
        <p>
          Work through the calculator below to compute softmax, loss, and gradient with a concrete example:
        </p>

        <GradientCalculator />

        <h2>Mathematical Background</h2>

        <p>Given:</p>
        <ul>
          <li><strong>Logits</strong>: z = [z₁, z₂, ..., zₖ] (raw scores from the network)</li>
          <li><strong>Softmax</strong>: yᵢ = exp(zᵢ) / Σⱼ exp(zⱼ)</li>
          <li><strong>True label</strong>: one-hot vector t = [t₁, t₂, ..., tₖ] where tⱼ = 1 for correct class</li>
          <li><strong>Loss</strong>: L = -Σᵢ tᵢ log(yᵢ) (cross-entropy)</li>
        </ul>

        <p>Goal: Find ∂L/∂zᵢ for all i</p>

        <h2>Step 1: Simplify the Loss</h2>
        <p>Since t is one-hot (only one element is 1, rest are 0), the sum collapses:</p>

        <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm my-4">
          L = -log(yⱼ) where j is the correct class
        </div>

        <p>
          This means we only care about the probability assigned to the correct class.
        </p>

        <h2>Step 2: Express in Terms of Logits</h2>
        <p>Substitute the softmax formula:</p>

        <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm my-4">
          L = -log(exp(zⱼ) / Σₖ exp(zₖ))
          <br />
          L = -log(exp(zⱼ)) + log(Σₖ exp(zₖ))
          <br />
          L = -zⱼ + log(Σₖ exp(zₖ))
        </div>

        <h2>Step 3: Take the Derivative</h2>
        <p>
          Now we need ∂L/∂zᵢ. We have to consider two cases:
        </p>

        <h3>Case 1: When i = j (the correct class)</h3>

        <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm my-4">
          ∂L/∂zⱼ = ∂/∂zⱼ [-zⱼ + log(Σₖ exp(zₖ))]
          <br />
          = -1 + (1/Σₖ exp(zₖ)) × exp(zⱼ)
          <br />
          = -1 + exp(zⱼ)/Σₖ exp(zₖ)
          <br />
          = -1 + yⱼ
          <br />
          = yⱼ - 1
        </div>

        <h3>Case 2: When i ≠ j (incorrect classes)</h3>

        <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm my-4">
          ∂L/∂zᵢ = ∂/∂zᵢ [log(Σₖ exp(zₖ))]
          <br />
          = (1/Σₖ exp(zₖ)) × exp(zᵢ)
          <br />
          = exp(zᵢ)/Σₖ exp(zₖ)
          <br />
          = yᵢ
        </div>

        <h2>The Beautiful Result</h2>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200 my-6">
          <h3 className="text-lg font-bold text-green-900 mb-3">Final Answer</h3>
          <div className="bg-white rounded-lg p-4 font-mono text-base mb-4">
            ∂L/∂zᵢ = yᵢ - tᵢ
          </div>
          <p className="text-sm text-slate-700">
            In vector form: <strong>∇L = y - t</strong>
          </p>
          <p className="text-sm text-slate-700 mt-2">
            The gradient is simply the predicted probability minus the true label!
          </p>
        </div>

        <h2>Why This is Remarkable</h2>

        <h3>1. Computational Efficiency</h3>
        <p>
          No complicated chain rule through softmax. The gradient computation is just a subtraction.
          This makes backpropagation through the output layer extremely fast.
        </p>

        <h3>2. Intuitive Meaning</h3>
        <p>
          The gradient tells us: "adjust the logit proportionally to how wrong the prediction was."
        </p>
        <ul>
          <li>If y = 0.9 and t = 1 (almost correct), gradient = -0.1 (small update)</li>
          <li>If y = 0.1 and t = 1 (very wrong), gradient = -0.9 (large update)</li>
          <li>If y = 0.9 and t = 0 (incorrectly confident), gradient = +0.9 (large correction)</li>
        </ul>

        <h3>3. Well-Behaved Gradients</h3>
        <p>
          Unlike sigmoid activation with MSE loss (which can saturate), cross-entropy with softmax
          produces gradients that scale with the error. This prevents the "vanishing gradient" problem
          at the output layer.
        </p>

        <h2>Verification Example</h2>

        <div className="bg-blue-50 rounded-lg p-6 my-6">
          <h4 className="font-bold text-slate-900 mb-3">Example</h4>
          <p className="text-sm mb-2">
            Logits: z = [2.0, 1.0, 0.1]
          </p>
          <p className="text-sm mb-2">
            After softmax: y ≈ [0.659, 0.242, 0.099]
          </p>
          <p className="text-sm mb-2">
            True label: t = [1, 0, 0] (class 0 is correct)
          </p>
          <p className="text-sm mb-4">
            Gradient: y - t = [-0.341, 0.242, 0.099]
          </p>
          <p className="text-sm text-slate-700">
            The negative gradient for class 0 will increase its logit, while positive gradients
            for classes 1 and 2 will decrease theirs. The model learns to assign more probability
            to the correct class.
          </p>
        </div>

        <h2>Connection to Language Models</h2>

        <p>
          In Transformers (BERT, GPT, etc.), the final layer predicts the next token using
          cross-entropy loss over the vocabulary:
        </p>

        <ul>
          <li>Logits: one score per token in vocabulary (often 50k+ tokens)</li>
          <li>Softmax: converts to probability distribution</li>
          <li>Loss: cross-entropy between predicted and actual next token</li>
          <li>Gradient: y - t (incredibly efficient even with huge vocabularies)</li>
        </ul>

        <p>
          From "Attention Is All You Need": The model uses "a linear transformation and softmax function
          to convert the decoder output to predicted next-token probabilities" (p. 5), trained with
          cross-entropy loss.
        </p>

        <h2>Practice Questions</h2>

        <details className="my-4">
          <summary className="cursor-pointer font-semibold text-slate-900 hover:text-violet-600">
            Why use cross-entropy instead of MSE for classification?
          </summary>
          <div className="mt-2 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-700 mb-2">
              <strong>MSE gradient with softmax</strong>: 2(yᵢ - tᵢ) × yᵢ(1-yᵢ)
            </p>
            <p className="text-sm text-slate-700 mb-2">
              The yᵢ(1-yᵢ) term vanishes when yᵢ is near 0 or 1, causing slow learning when the
              model is very wrong.
            </p>
            <p className="text-sm text-slate-700">
              <strong>Cross-entropy gradient</strong>: yᵢ - tᵢ has no such saturation.
              The gradient remains large when the model is confident but wrong.
            </p>
          </div>
        </details>

        <details className="my-4">
          <summary className="cursor-pointer font-semibold text-slate-900 hover:text-violet-600">
            What happens if we use cross-entropy without softmax?
          </summary>
          <div className="mt-2 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-700">
              The loss would require log(zᵢ), but zᵢ can be negative (making log undefined).
              Softmax ensures all outputs are positive probabilities in [0,1], making the loss
              well-defined. The combination also produces the clean gradient.
            </p>
          </div>
        </details>

        <h2>Key Takeaways</h2>
        <ul>
          <li>Cross-entropy + softmax gradient is simply y - t</li>
          <li>The gradient scales with prediction error (large when wrong, small when right)</li>
          <li>This combination avoids gradient saturation at the output layer</li>
          <li>Computational efficiency: no expensive chain rule through softmax</li>
          <li>Used in virtually all modern language models and classifiers</li>
        </ul>

        <h2>Next Steps</h2>
        <ol>
          <li>Implement cross-entropy loss and its gradient from scratch</li>
          <li>Verify your derivation with numerical gradient checking</li>
          <li>Explore label smoothing (adds small constant to prevent overconfidence)</li>
          <li>Study focal loss (addresses class imbalance)</li>
        </ol>
      </div>
    </ProjectLayout>
  );
}
