import { useState } from 'react';
import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

function PromptComparison() {
  const [selectedMode, setSelectedMode] = useState<'standard' | 'cot'>('standard');
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showModelResponse, setShowModelResponse] = useState(false);
  const [feedback, setFeedback] = useState('');

  const problems = [
    {
      question: "Maria had 8 cookies. She baked 2 batches of cookies with 12 cookies in each batch. She ate 5 cookies. How many cookies does she have now?",
      correctAnswer: 27,
      standardPrompt: "Q: Maria had 8 cookies. She baked 2 batches of cookies with 12 cookies in each batch. She ate 5 cookies. How many cookies does she have now?\nA:",
      standardResponse: "27",
      standardExplanation: "The model outputs just the answer without showing its work. It might be correct, but we can't verify its reasoning.",
      cotPrompt: "Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now?\nA: Roger started with 5 balls. 2 cans of 3 balls each is 6 balls. 5 + 6 = 11. The answer is 11.\n\nQ: Maria had 8 cookies. She baked 2 batches of cookies with 12 cookies in each batch. She ate 5 cookies. How many cookies does she have now?\nA:",
      cotResponse: "Maria started with 8 cookies. She baked 2 batches of 12 cookies each, which is 2 × 12 = 24 cookies. Now she has 8 + 24 = 32 cookies. She ate 5 cookies, so 32 - 5 = 27. The answer is 27.",
      cotExplanation: "The model breaks down the problem into steps: calculate new cookies (2 × 12 = 24), add to existing (8 + 24 = 32), subtract eaten (32 - 5 = 27). We can follow and verify each step."
    },
    {
      question: "A parking lot has 15 cars. Each car has 4 wheels. 3 cars drive away, and then 2 motorcycles (with 2 wheels each) arrive. How many wheels are in the parking lot now?",
      correctAnswer: 52,
      standardPrompt: "Q: A parking lot has 15 cars. Each car has 4 wheels. 3 cars drive away, and then 2 motorcycles (with 2 wheels each) arrive. How many wheels are in the parking lot now?\nA:",
      standardResponse: "48",
      standardExplanation: "The model gives an incorrect answer (48 instead of 52). Without seeing its reasoning, we can't tell where it went wrong.",
      cotPrompt: "Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now?\nA: Roger started with 5 balls. 2 cans of 3 balls each is 6 balls. 5 + 6 = 11. The answer is 11.\n\nQ: A parking lot has 15 cars. Each car has 4 wheels. 3 cars drive away, and then 2 motorcycles (with 2 wheels each) arrive. How many wheels are in the parking lot now?\nA:",
      cotResponse: "The parking lot starts with 15 cars × 4 wheels = 60 wheels. Then 3 cars leave, taking away 3 × 4 = 12 wheels. So we have 60 - 12 = 48 wheels left. Then 2 motorcycles arrive with 2 × 2 = 4 wheels. Finally, 48 + 4 = 52 wheels. The answer is 52.",
      cotExplanation: "With chain-of-thought, the model correctly works through: initial wheels (60), wheels leaving (12), remaining (48), motorcycles arriving (4), and final total (52). The step-by-step reasoning prevents errors."
    },
    {
      question: "If a train travels at 60 mph for 2.5 hours, then slows to 40 mph for 1.5 hours, what is the total distance traveled?",
      correctAnswer: 210,
      standardPrompt: "Q: If a train travels at 60 mph for 2.5 hours, then slows to 40 mph for 1.5 hours, what is the total distance traveled?\nA:",
      standardResponse: "200 miles",
      standardExplanation: "The model gives an incorrect answer (200 instead of 210). Multi-step arithmetic is challenging without explicit reasoning.",
      cotPrompt: "Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now?\nA: Roger started with 5 balls. 2 cans of 3 balls each is 6 balls. 5 + 6 = 11. The answer is 11.\n\nQ: If a train travels at 60 mph for 2.5 hours, then slows to 40 mph for 1.5 hours, what is the total distance traveled?\nA:",
      cotResponse: "In the first segment, the train travels at 60 mph for 2.5 hours. Distance = speed × time = 60 × 2.5 = 150 miles. In the second segment, it travels at 40 mph for 1.5 hours. Distance = 40 × 1.5 = 60 miles. Total distance = 150 + 60 = 210 miles. The answer is 210 miles.",
      cotExplanation: "The chain-of-thought approach correctly calculates each segment (150 miles + 60 miles) and sums them to 210 miles. The explicit steps prevent calculation errors."
    }
  ];

  const problem = problems[currentProblem];

  const checkAnswer = () => {
    const answer = parseFloat(userAnswer);
    if (answer === problem.correctAnswer) {
      setFeedback(`✓ Correct! The answer is ${problem.correctAnswer}.`);
    } else {
      setFeedback(`✗ Not quite. The correct answer is ${problem.correctAnswer}. Try working through it step by step!`);
    }
  };

  const resetProblem = () => {
    setUserAnswer('');
    setShowModelResponse(false);
    setFeedback('');
  };

  const changeProblem = (index: number) => {
    setCurrentProblem(index);
    resetProblem();
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Interactive Exercise: Compare Prompting Strategies</h2>
      <p className="text-slate-700 mb-6">
        See the difference between <strong>standard prompting</strong> (just answer) and <strong>chain-of-thought prompting</strong> (showing reasoning steps).
        Try solving the problem yourself, then see how each prompting strategy performs.
      </p>

      {/* Problem selector */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-slate-700 mb-2">Choose a problem:</p>
        <div className="flex gap-2">
          {problems.map((_, i) => (
            <button
              key={i}
              onClick={() => changeProblem(i)}
              className={`px-4 py-2 rounded transition-colors ${
                currentProblem === i
                  ? 'bg-violet-600 text-white font-semibold'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Problem {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Problem statement */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6 mb-6">
        <h3 className="font-bold text-amber-900 mb-3">Problem:</h3>
        <p className="text-slate-800 text-lg leading-relaxed">{problem.question}</p>

        {/* User's attempt */}
        <div className="mt-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Your answer:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="flex-1 px-3 py-2 border-2 border-slate-300 rounded focus:border-violet-500 focus:outline-none"
            />
            <button
              onClick={checkAnswer}
              className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors"
            >
              Check
            </button>
          </div>
          {feedback && (
            <p className={`mt-2 text-sm font-semibold ${
              feedback.startsWith('✓') ? 'text-green-700' : 'text-red-700'
            }`}>
              {feedback}
            </p>
          )}
        </div>
      </div>

      {/* Mode selector */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-700 mb-2">Compare prompting strategies:</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedMode('standard');
              setShowModelResponse(false);
            }}
            className={`px-4 py-2 rounded transition-colors ${
              selectedMode === 'standard'
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Standard Prompting
          </button>
          <button
            onClick={() => {
              setSelectedMode('cot');
              setShowModelResponse(false);
            }}
            className={`px-4 py-2 rounded transition-colors ${
              selectedMode === 'cot'
                ? 'bg-green-600 text-white font-semibold'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Chain-of-Thought Prompting
          </button>
        </div>
      </div>

      {/* Prompt display */}
      {selectedMode === 'standard' && (
        <div className="bg-white border-2 border-blue-300 rounded-lg p-6 mb-4 animate-fadeIn">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center">
            <span className="bg-blue-100 px-2 py-1 rounded text-sm mr-2">Standard Prompting</span>
            Input → Output (no reasoning shown)
          </h3>

          <div className="bg-slate-50 p-4 rounded border border-slate-200 mb-4">
            <p className="text-xs text-slate-600 mb-2 font-semibold">Full Prompt:</p>
            <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono">
              {problem.standardPrompt}
            </pre>
          </div>

          {!showModelResponse && (
            <button
              onClick={() => setShowModelResponse(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Show Model Response →
            </button>
          )}

          {showModelResponse && (
            <div className="animate-fadeIn">
              <div className="bg-blue-50 p-4 rounded border-2 border-blue-300 mb-3">
                <p className="text-xs text-blue-700 mb-2 font-semibold">Model Output:</p>
                <p className="text-blue-900 text-lg font-semibold">{problem.standardResponse}</p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                <p className="text-yellow-900 text-sm">
                  <strong>Analysis:</strong> {problem.standardExplanation}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedMode === 'cot' && (
        <div className="bg-white border-2 border-green-300 rounded-lg p-6 mb-4 animate-fadeIn">
          <h3 className="font-bold text-green-900 mb-3 flex items-center">
            <span className="bg-green-100 px-2 py-1 rounded text-sm mr-2">Chain-of-Thought Prompting</span>
            Input → Reasoning Steps → Output
          </h3>

          <div className="bg-slate-50 p-4 rounded border border-slate-200 mb-4">
            <p className="text-xs text-slate-600 mb-2 font-semibold">Full Prompt (with reasoning example):</p>
            <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono">
              {problem.cotPrompt}
            </pre>
            <p className="text-xs text-green-700 mt-2 italic">
              Note: The prompt includes an example showing step-by-step reasoning before asking the actual question.
            </p>
          </div>

          {!showModelResponse && (
            <button
              onClick={() => setShowModelResponse(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Show Model Response →
            </button>
          )}

          {showModelResponse && (
            <div className="animate-fadeIn">
              <div className="bg-green-50 p-4 rounded border-2 border-green-300 mb-3">
                <p className="text-xs text-green-700 mb-2 font-semibold">Model Output:</p>
                <p className="text-green-900 leading-relaxed">{problem.cotResponse}</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                <p className="text-green-900 text-sm">
                  <strong>Analysis:</strong> {problem.cotExplanation}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Key insights */}
      <div className="bg-violet-50 border-l-4 border-violet-400 p-4 rounded mt-6">
        <p className="text-violet-900 font-semibold mb-2">Key Insights:</p>
        <ul className="list-disc list-inside space-y-1 text-violet-800 text-sm">
          <li><strong>Transparency</strong>: CoT shows the model's reasoning, making it easier to identify and fix errors</li>
          <li><strong>Accuracy</strong>: Breaking problems into steps reduces calculation mistakes</li>
          <li><strong>Debugging</strong>: When CoT gives wrong answers, you can see exactly where the reasoning fails</li>
          <li><strong>No training needed</strong>: This improvement comes purely from better prompting, not model retraining</li>
          <li><strong>Emergent ability</strong>: Only works with large models (100B+ parameters)</li>
        </ul>
      </div>
    </section>
  );
}

const meta: WikiMeta = {
  title: "Chain-of-Thought Prompting",
  description: "A prompting technique that elicits reasoning in large language models by demonstrating intermediate reasoning steps in few-shot exemplars.",
  category: "Prompting Technique",
  difficulty: "Intermediate",
  tags: ["prompting", "reasoning", "few-shot-learning"],
  relatedConcepts: ["few-shot-prompting", "prompt-engineering", "arithmetic-reasoning"],
  citations: [
    {
      paper: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
      authors: "Wei, J., Wang, X., Schuurmans, D., Bosma, M., et al.",
      year: "2022",
      pages: "1-3"
    }
  ]
};

export default function ChainOfThoughtPrompting() {
  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700">
            Chain-of-thought prompting is a technique where language models are prompted with exemplars that include intermediate reasoning steps, significantly improving their ability to solve complex reasoning tasks [Wei et al., 2022, p. 1].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Simple Yet Powerful Idea</h2>
          <p className="text-slate-700 mb-4">
            Instead of just showing input-output pairs, chain-of-thought prompting shows the model how to think through a problem step by step. For example:
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Standard Prompting:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Q: Roger has 5 balls. He buys 2 cans of 3 balls each. How many does he have?</li>
            <li>A: 11</li>
          </ul>
          <p className="text-slate-700 mb-2">
            <strong>Chain-of-Thought Prompting:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Q: Roger has 5 balls. He buys 2 cans of 3 balls each. How many does he have?</li>
            <li>A: Roger started with 5 balls. 2 cans of 3 balls each is 6 balls. 5 + 6 = 11. The answer is 11.</li>
          </ul>
          <p className="text-slate-700">
            This simple change led to dramatic improvements on reasoning tasks [Wei et al., 2022, p. 1].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why It Works</h2>
          <p className="text-slate-700 mb-4">
            Chain-of-thought prompting enables models to:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Decompose complex problems into manageable steps</li>
            <li>Show their reasoning process explicitly</li>
            <li>Achieve better performance on multi-step reasoning</li>
            <li>Self-correct through intermediate steps</li>
          </ol>
          <p className="text-slate-700">
            The technique is particularly powerful because it requires no additional training—just better prompts [Wei et al., 2022, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Emergence of Reasoning</h2>
          <p className="text-slate-700">
            Remarkably, chain-of-thought reasoning only emerges at sufficient model scale (around 100B parameters). Smaller models don't benefit from the technique, suggesting reasoning is an emergent ability of large language models [Wei et al., 2022, p. 3].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">A Story About Learning</h2>
          <p className="text-slate-700">
            Think of how a math teacher doesn't just write the answer on the board—they show each step of solving the problem. Students learn better by seeing the process, not just the result. Chain-of-thought prompting teaches language models the same way.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact</h2>
          <p className="text-slate-700">
            Chain-of-thought prompting achieved state-of-the-art results on the GSM8K math benchmark, with PaLM 540B improving from 18% to 57% accuracy using this technique alone [Wei et al., 2022, p. 2].
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <PromptComparison />

        <hr className="my-8 border-slate-300" />

        <p className="text-slate-700">
          <strong>Related Concepts:</strong> <Link to="/wiki/few-shot-prompting" className="text-blue-600 hover:underline">Few-Shot Prompting</Link> · <Link to="/wiki/emergent-abilities" className="text-blue-600 hover:underline">Emergent Abilities</Link> · <Link to="/wiki/reasoning-steps" className="text-blue-600 hover:underline">Reasoning Steps</Link>
        </p>
      </div>
    </WikiLayout>
  );
}
