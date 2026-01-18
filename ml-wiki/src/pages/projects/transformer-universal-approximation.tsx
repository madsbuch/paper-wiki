import { useState } from "react";
import ProjectLayout from "../../components/ProjectLayout";

export const meta = {
  title: "Prove Transformer Universal Approximation",
  description: "Work through a simplified proof that Transformers can approximate any sequence-to-sequence function. Understand the theoretical foundations of why they're so powerful.",
  category: "Exercise" as const,
  difficulty: "Advanced" as const,
  estimatedTime: "25-30 min",
  relatedPapers: [
    { title: "A Mathematical Explanation of Transformers for Large Language Models and GPTs", slug: "mathematical-transformers" }
  ],
  relatedConcepts: [
    { name: "Transformer Architecture", slug: "transformer-architecture" }
  ],
  prerequisites: [
    "Understanding of Transformer architecture",
    "Basic real analysis (continuity, approximation)",
    "Functional analysis concepts helpful but not required"
  ]
};

function ProofQuiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const questions = [
    {
      id: "q1",
      question: "What does it mean for a Transformer to be a 'universal approximator'?",
      options: [
        "It can learn any task with zero training data",
        "It can approximate any continuous sequence-to-sequence function given sufficient capacity",
        "It always converges to the global optimum during training",
        "It can process sequences of infinite length"
      ],
      correct: 1,
      explanation: "Universal approximation means the model architecture has the theoretical capacity to represent any continuous function, given enough layers and width. This doesn't guarantee we can find those parameters through training."
    },
    {
      id: "q2",
      question: "How does self-attention enable universal approximation?",
      options: [
        "It applies the same weights to all positions uniformly",
        "It can selectively route information from any input position to any output position",
        "It removes the need for feed-forward networks",
        "It automatically learns the optimal function representation"
      ],
      correct: 1,
      explanation: "Self-attention computes weighted combinations of all positions, allowing information to be routed flexibly. This selectivity is key to approximating complex sequence functions."
    },
    {
      id: "q3",
      question: "Why are residual connections important for approximation power?",
      options: [
        "They reduce the number of parameters needed",
        "They speed up training convergence",
        "They allow the network to learn the identity function easily, preserving information while enabling complex transformations",
        "They prevent overfitting to the training data"
      ],
      correct: 2,
      explanation: "Residual connections let the network pass information unchanged (identity) or transform it, making it easier to build complex functions by composition while maintaining gradient flow."
    },
    {
      id: "q4",
      question: "What determines the approximation capacity of a Transformer?",
      options: [
        "Only the number of attention heads",
        "Only the depth (number of layers)",
        "Depth, width (d_model), number of heads, and FFN size all contribute",
        "Only the vocabulary size"
      ],
      correct: 2,
      explanation: "All architectural hyperparameters contribute: depth enables hierarchical composition, width controls information capacity, heads enable diverse patterns, and FFN size determines local function complexity."
    }
  ];

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex.toString() }));
  };

  const revealAnswer = (questionId: string) => {
    setRevealed(prev => ({ ...prev, [questionId]: true }));
  };

  const allCorrect = questions.every(q => answers[q.id] === q.correct.toString());
  const allRevealed = questions.every(q => revealed[q.id]);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 my-8 border-2 border-orange-200">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Interactive Proof Quiz</h3>
      <p className="text-sm text-slate-600 mb-6">
        Test your understanding of why Transformers are universal approximators:
      </p>

      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.correct.toString();
          const isRevealed = revealed[q.id];

          return (
            <div key={q.id} className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-3">
                Question {qIndex + 1}: {q.question}
              </h4>

              <div className="space-y-2 mb-4">
                {q.options.map((option, optIndex) => {
                  const isSelected = userAnswer === optIndex.toString();
                  const isCorrectOption = optIndex === q.correct;

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleAnswer(q.id, optIndex)}
                      disabled={isRevealed}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                        isRevealed
                          ? isCorrectOption
                            ? 'border-green-500 bg-green-50'
                            : isSelected
                            ? 'border-red-300 bg-red-50'
                            : 'border-slate-200 bg-slate-50'
                          : isSelected
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-slate-200 hover:border-orange-300 bg-white'
                      } ${isRevealed ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isRevealed && isCorrectOption
                            ? 'border-green-600 bg-green-600'
                            : isSelected
                            ? 'border-orange-600 bg-orange-600'
                            : 'border-slate-300'
                        }`}>
                          {isRevealed && isCorrectOption && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {isSelected && !isRevealed && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="text-sm text-slate-700">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {userAnswer && !isRevealed && (
                <button
                  onClick={() => revealAnswer(q.id)}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                >
                  Check Answer
                </button>
              )}

              {isRevealed && (
                <div className={`mt-4 p-4 rounded-lg border-l-4 ${
                  isCorrect ? 'bg-green-50 border-green-500' : 'bg-blue-50 border-blue-500'
                }`}>
                  <p className={`text-sm font-semibold mb-2 ${
                    isCorrect ? 'text-green-900' : 'text-blue-900'
                  }`}>
                    {isCorrect ? '✓ Correct!' : 'ℹ️ Explanation:'}
                  </p>
                  <p className="text-sm text-slate-700">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}

        {allRevealed && allCorrect && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold text-green-900 mb-2">Perfect score!</h4>
                <p className="text-sm text-slate-700">
                  You have a solid understanding of why Transformers are universal approximators.
                  Continue reading below for the detailed mathematical proof.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TransformerUniversalApproximationProject() {
  return (
    <ProjectLayout {...meta}>
      <div className="prose prose-slate max-w-none">
        <h2>Overview</h2>
        <p>
          Universal approximation theorems tell us what a model <em>can</em> represent, even if finding
          that representation is difficult. In this exercise, you'll work through a simplified proof
          that Transformers can approximate any continuous sequence-to-sequence function.
        </p>

        <h2>Quick Knowledge Check</h2>
        <p>
          Before diving into the proof, test your intuition with this interactive quiz:
        </p>

        <ProofQuiz />

        <h2>The Proof</h2>

        <h2>Theorem Statement</h2>

        <div className="bg-slate-100 rounded-lg p-6 my-6">
          <p className="font-semibold mb-3">Informal Statement:</p>
          <p className="text-sm">
            For any continuous function f: ℝ^(n×d) → ℝ^(m×d) mapping sequences to sequences,
            and any ε &gt; 0, there exists a Transformer with sufficient depth and width such that
            the approximation error is less than ε.
          </p>
        </div>

        <p>
          In plain language: given enough layers and attention heads, a Transformer can approximate
          any smooth sequence-to-sequence mapping arbitrarily well.
        </p>

        <h2>Proof Strategy</h2>

        <p>We'll prove this in three steps:</p>
        <ol>
          <li>Show self-attention can select and combine information from any positions</li>
          <li>Show feed-forward networks can approximate any function (standard UAT)</li>
          <li>Combine these to approximate arbitrary sequence mappings</li>
        </ol>

        <h2>Step 1: Self-Attention as Universal Selector</h2>

        <h3>Claim</h3>
        <p>
          Self-attention with proper parameters can compute any weighted combination of input positions.
        </p>

        <h3>Your Task</h3>
        <div className="bg-blue-50 rounded-lg p-4 my-4">
          <p className="text-sm font-semibold text-blue-900 mb-2">Exercise 1.1:</p>
          <p className="text-sm text-slate-700 mb-3">
            Given input X = [x₁, x₂, ..., xₙ] where xᵢ ∈ ℝ^d, show that you can construct
            query/key matrices Q and K such that the attention weights select only position j.
          </p>
          <details>
            <summary className="cursor-pointer text-sm font-medium text-blue-700 hover:text-blue-900">
              Hint
            </summary>
            <p className="text-sm text-slate-600 mt-2">
              Set Q and K such that q·kⱼ is very large and q·kᵢ is very small for i ≠ j.
              Softmax will concentrate all weight on position j.
            </p>
          </details>
        </div>

        <h3>Solution Sketch</h3>
        <p>
          Construct position embeddings pᵢ that are orthogonal. Set queries to match specific positions.
          With temperature β → ∞, softmax becomes argmax (one-hot selection).
        </p>

        <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm my-4">
          attention_weights[i] = exp(β × q·kᵢ) / Σⱼ exp(β × q·kⱼ)
          <br />
          As β → ∞, this approaches 1 for i=target, 0 otherwise
        </div>

        <h2>Step 2: Feed-Forward Layers</h2>

        <h3>Classical Result</h3>
        <p>
          The Universal Approximation Theorem states that a feed-forward network with one hidden layer
          can approximate any continuous function on a compact set.
        </p>

        <p>
          Transformers use two-layer MLPs at each position: FFN(x) = max(0, xW₁ + b₁)W₂ + b₂
        </p>

        <div className="bg-blue-50 rounded-lg p-4 my-4">
          <p className="text-sm font-semibold text-blue-900 mb-2">Exercise 2.1:</p>
          <p className="text-sm text-slate-700">
            The feed-forward network operates identically at each position. How does this
            positional independence matter for approximation capability?
          </p>
          <details>
            <summary className="cursor-pointer text-sm font-medium text-blue-700 hover:text-blue-900 mt-2">
              Answer
            </summary>
            <p className="text-sm text-slate-600 mt-2">
              Each position's representation can be transformed independently. This means we can
              approximate different functions at different positions (after attention has routed
              the right information to each position).
            </p>
          </details>
        </div>

        <h2>Step 3: Composing Layers</h2>

        <h3>Inductive Construction</h3>
        <p>
          Now we combine attention (for routing) and FFN (for transformation):
        </p>

        <div className="bg-slate-100 rounded-lg p-6 my-4">
          <p className="font-semibold mb-3">Layer ℓ computes:</p>
          <ol className="text-sm space-y-2">
            <li>
              <strong>Attention</strong>: Gather information from other positions
              <br />
              <span className="font-mono text-xs">H^(ℓ) = Attention(X^(ℓ), X^(ℓ), X^(ℓ))</span>
            </li>
            <li>
              <strong>Residual</strong>: Add to input to preserve information
              <br />
              <span className="font-mono text-xs">X^(ℓ+0.5) = X^(ℓ) + H^(ℓ)</span>
            </li>
            <li>
              <strong>FFN</strong>: Transform each position's representation
              <br />
              <span className="font-mono text-xs">X^(ℓ+1) = X^(ℓ+0.5) + FFN(X^(ℓ+0.5))</span>
            </li>
          </ol>
        </div>

        <h3>Key Insight</h3>
        <p>
          By stacking L layers, we can:
        </p>
        <ul>
          <li>Layer 1: Route basic features to where they're needed</li>
          <li>Layer 2: Combine those features and route higher-level patterns</li>
          <li>Layer L: Compute complex functions of the entire sequence</li>
        </ul>

        <div className="bg-blue-50 rounded-lg p-4 my-4">
          <p className="text-sm font-semibold text-blue-900 mb-2">Exercise 3.1:</p>
          <p className="text-sm text-slate-700 mb-3">
            Why do residual connections matter for universal approximation?
          </p>
          <details>
            <summary className="cursor-pointer text-sm font-medium text-blue-700 hover:text-blue-900">
              Answer
            </summary>
            <p className="text-sm text-slate-600 mt-2">
              Residual connections ensure that the network can always choose to pass information
              through unchanged (by learning zero for the residual branch). This makes it easier
              to approximate the identity function, which is crucial for preserving information
              across deep networks while still allowing complex transformations.
            </p>
          </details>
        </div>

        <h2>Putting It Together</h2>

        <h3>Approximation Procedure</h3>
        <p>
          To approximate a function f: ℝ^(n×d) → ℝ^(m×d):
        </p>

        <ol>
          <li>
            <strong>Attention routing</strong>: Configure attention to send information where it's needed
            <ul>
              <li>Output position i can attend to all input positions</li>
              <li>Can compute weighted combinations (convex combinations with normalized weights)</li>
            </ul>
          </li>
          <li>
            <strong>FFN approximation</strong>: At each position, use FFN to approximate the local function
            <ul>
              <li>Universal approximation theorem guarantees this is possible</li>
              <li>May need wide hidden layers (controlled by d_ff parameter)</li>
            </ul>
          </li>
          <li>
            <strong>Depth for composition</strong>: Stack layers to build complex functions from simple ones
            <ul>
              <li>Each layer adds one "level" of composition</li>
              <li>Deeper networks can express more complex relationships</li>
            </ul>
          </li>
        </ol>

        <h2>Practical Implications</h2>

        <h3>What This Means</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-4">
            <p className="font-semibold text-green-900 mb-2">Theoretical Power</p>
            <p className="text-sm text-slate-700">
              Transformers are theoretically capable of representing any sequence function.
              This explains why they work across diverse tasks (translation, generation, classification).
            </p>
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4">
            <p className="font-semibold text-amber-900 mb-2">Training is Hard</p>
            <p className="text-sm text-slate-700">
              Universal approximation doesn't guarantee we can <em>find</em> the parameters through
              gradient descent. Training requires careful initialization, optimization, and lots of data.
            </p>
          </div>
        </div>

        <h3>What Determines Capacity?</h3>
        <ul>
          <li><strong>Depth (L)</strong>: Number of composition steps, enables hierarchical reasoning</li>
          <li><strong>Width (d_model)</strong>: Dimensionality of representations, controls information capacity</li>
          <li><strong>Heads (h)</strong>: Number of parallel attention mechanisms, enables diverse patterns</li>
          <li><strong>FFN size (d_ff)</strong>: Hidden layer size, determines local function complexity</li>
        </ul>

        <h2>Limitations of the Proof</h2>

        <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 my-6">
          <p className="font-semibold text-red-900 mb-2">Important Caveats</p>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>
              <strong>Compact domain</strong>: Only guarantees approximation on bounded input sequences
            </li>
            <li>
              <strong>Sample complexity</strong>: Doesn't tell us how many examples are needed to learn
            </li>
            <li>
              <strong>Computational cost</strong>: May require exponentially many parameters for some functions
            </li>
            <li>
              <strong>Optimization</strong>: No guarantee that SGD will find the approximating parameters
            </li>
          </ul>
        </div>

        <h2>Connection to Practice</h2>

        <p>
          Modern Transformers (GPT-4, etc.) use:
        </p>
        <ul>
          <li>Depth: 96+ layers (enables complex hierarchical reasoning)</li>
          <li>Width: 12,288+ dimensions (massive representational capacity)</li>
          <li>Heads: 96+ (diverse attention patterns)</li>
        </ul>

        <p>
          This gives them tremendous approximation power, but they still require:
        </p>
        <ul>
          <li>Trillions of tokens of training data</li>
          <li>Careful optimization (learning rate schedules, warmup)</li>
          <li>Architectural innovations (RoPE, Flash Attention, MoE)</li>
        </ul>

        <h2>Further Reading</h2>

        <ol>
          <li>
            <strong>"Attention is Turing Complete"</strong> (Pérez et al., 2019):
            Shows that Transformers with sufficient depth can simulate any Turing machine
          </li>
          <li>
            <strong>"On the Turing Completeness of Modern Neural Network Architectures"</strong> (2019):
            Formal analysis of Transformer computational power
          </li>
          <li>
            <strong>"A Mathematical Explanation of Transformers"</strong>:
            Rigorous treatment connecting Transformers to continuous integro-differential equations
          </li>
        </ol>

        <h2>Key Takeaways</h2>
        <ul>
          <li>Transformers can theoretically approximate any sequence-to-sequence function</li>
          <li>Self-attention provides flexible information routing</li>
          <li>Feed-forward networks provide local transformation power</li>
          <li>Depth enables hierarchical composition</li>
          <li>Approximation capacity ≠ learning ability (training is still hard)</li>
        </ul>
      </div>
    </ProjectLayout>
  );
}
