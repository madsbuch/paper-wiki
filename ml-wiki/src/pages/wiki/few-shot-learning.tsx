import { useEffect, useState } from "react";
import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "Few-Shot Learning",
  description:
    "A learning approach where models adapt to new tasks using just a few examples at inference time, without weight updates.",
  category: "Learning Paradigms",
  difficulty: "Intermediate",
  tags: ["learning-paradigm", "in-context-learning", "prompting"],
  relatedConcepts: [
    "zero-shot-learning",
    "meta-learning",
    "in-context-learning",
    "few-shot-prompting",
  ],
  citations: [
    {
      paper: "Language Models are Few-Shot Learners (GPT-3)",
      authors: "Brown, T. B., Mann, B., Ryder, N., Subbiah, M., et al.",
      year: "2020",
      pages: "5-7",
    },
    {
      paper: "The Power of Scale for Parameter-Efficient Prompt Tuning",
      authors: "Lester et al.",
      year: "2021",
      pages: "1-2",
    },
  ],
};

export default function FewShotLearning() {
  const [examples, setExamples] = useState([
    { input: "dog", output: "animal" },
    { input: "oak", output: "plant" },
    { input: "sparrow", output: "animal" },
  ]);
  const [testInput, setTestInput] = useState("rose");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error("MathJax typesetting failed:", err),
      );
    }
  }, []);

  const checkAnswer = () => {
    const correctAnswer = "plant";
    if (userAnswer.toLowerCase().trim() === correctAnswer) {
      setFeedback(
        '✓ Correct! The pattern from the examples shows that "rose" should be classified as "plant".',
      );
    } else if (userAnswer.toLowerCase().trim() === "flower") {
      setFeedback(
        'Close! But the examples use broader categories. Look at how "oak" (a specific tree) maps to "plant".',
      );
    } else {
      setFeedback(
        'Not quite. Look at the pattern: living things → their category. "dog" and "sparrow" are animals, "oak" is a plant.',
      );
    }
  };

  const updateExample = (
    index: number,
    field: "input" | "output",
    value: string,
  ) => {
    const newExamples = [...examples];
    newExamples[index][field] = value;
    setExamples(newExamples);
    setFeedback(""); // Reset feedback when examples change
  };

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What is Few-Shot Learning?
          </h2>
          <p className="text-slate-700 mb-4">
            <strong>Few-shot learning</strong> refers to the setting where a
            language model is given a few demonstrations of a task at inference
            time as conditioning, but{" "}
            <strong>no weight updates are allowed</strong> [Brown et al., 2020,
            p. 6]. It represents a middle ground between{" "}
            <Link
              to="/wiki/zero-shot-learning"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              zero-shot
            </Link>{" "}
            and traditional fine-tuning approaches.
          </p>
          <p className="text-slate-700">
            Think of it like showing someone a few examples of a puzzle type
            they've never seen. If they're smart and experienced with puzzles
            generally, they can figure out the pattern and solve new
            instances—without needing weeks of specialized training on that
            specific puzzle.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-slate-700 mb-4">
            For a typical dataset where an example has a context and a desired
            completion (e.g., an English sentence and its French translation),
            few-shot learning works by [Brown et al., 2020, p. 6]:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Providing K examples of context and completion</li>
            <li>Then providing one final example of context</li>
            <li>
              The model generates the completion based on the pattern it
              recognizes
            </li>
          </ol>
          <p className="text-slate-700">
            The number K is typically set in the range of{" "}
            <strong>10 to 100</strong>, limited by the model's context window
            (n_ctx = 2048 tokens for GPT-3) [Brown et al., 2020, p. 6].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            A Concrete Example
          </h2>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm">
            <pre className="text-slate-700">{`Translate English to French:
sea otter => loutre de mer
peppermint => menthe poivrée
plush giraffe => girafe peluche
cheese => ?`}</pre>
          </div>
          <p className="text-slate-700 mt-4">
            The model must infer from the examples that it should translate
            "cheese" to French ("fromage"). No gradient updates, no
            fine-tuning—just pattern recognition from the few examples provided
            in context.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Exercise: Build Your Own Few-Shot Prompt
          </h2>
          <p className="text-slate-700 mb-4">
            Try creating and modifying a few-shot prompt to see how the model
            would learn from your examples.
          </p>

          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-slate-900 mb-3">
              Your Few-Shot Examples:
            </h3>

            {examples.map((example, idx) => (
              <div
                key={idx}
                className="mb-3 p-3 bg-white rounded border border-slate-200"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      Input:
                    </label>
                    <input
                      type="text"
                      value={example.input}
                      onChange={(e) =>
                        updateExample(idx, "input", e.target.value)
                      }
                      className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      Output:
                    </label>
                    <input
                      type="text"
                      value={example.output}
                      onChange={(e) =>
                        updateExample(idx, "output", e.target.value)
                      }
                      className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
              <p className="font-semibold text-blue-900 mb-2">Test Case:</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    Input:
                  </label>
                  <input
                    type="text"
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    className="w-full border border-slate-300 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">
                    Your Prediction:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="?"
                      className="flex-1 border border-slate-300 rounded px-2 py-1 text-sm"
                    />
                    <button
                      onClick={checkAnswer}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold"
                    >
                      Check
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {feedback && (
              <div
                className={`mt-3 p-3 rounded ${feedback.startsWith("✓") ? "bg-green-50 text-green-900" : "bg-yellow-50 text-yellow-900"}`}
              >
                {feedback}
              </div>
            )}

            <div className="mt-4 bg-slate-100 rounded-lg p-4">
              <p className="font-semibold text-slate-900 mb-2">
                The Full Prompt:
              </p>
              <pre className="text-xs text-slate-700 font-mono whitespace-pre-wrap">
                {examples
                  .map((ex) => `${ex.input} => ${ex.output}`)
                  .join("\n") +
                  "\n" +
                  testInput +
                  " => ?"}
              </pre>
            </div>

            <div className="mt-4 bg-purple-50 rounded-lg p-4">
              <p className="font-semibold text-purple-900 mb-2">Try This:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                <li>
                  Change the examples to different patterns (e.g., country →
                  capital city)
                </li>
                <li>Add more examples - does it make the pattern clearer?</li>
                <li>
                  Try examples with inconsistent patterns - how would a model
                  struggle?
                </li>
                <li>
                  Notice: the model has to infer the task just from the
                  examples!
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Why Few-Shot Works
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Advantages
          </h3>
          <p className="text-slate-700 mb-4">
            Few-shot learning provides several key benefits [Brown et al., 2020,
            p. 6]:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Minimal data requirements</strong>: Only need 10-100
              examples vs thousands for fine-tuning
            </li>
            <li>
              <strong>No overfitting risk</strong>: Doesn't overfit to narrow
              task distributions
            </li>
            <li>
              <strong>No weight updates</strong>: Model remains general-purpose
              and can switch between tasks instantly
            </li>
            <li>
              <strong>Instant adaptation</strong>: Can perform new tasks
              immediately without retraining
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            Trade-offs
          </h3>
          <p className="text-slate-700 mb-4">
            The main challenges [Brown et al., 2020, p. 6]:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Lower performance than fine-tuning</strong>: Results have
              historically been worse than state-of-the-art fine-tuned models
              (though GPT-3 narrows this gap)
            </li>
            <li>
              <strong>Still requires some data</strong>: A small amount of
              task-specific data is still needed
            </li>
            <li>
              <strong>Context window limitations</strong>: Number of examples is
              limited by model's context size
            </li>
          </ul>

          <div className="bg-blue-50 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-blue-900 mb-2">
              Beyond Discrete Prompts:
            </h4>
            <p className="text-slate-700 text-sm">
              While traditional few-shot learning uses discrete text examples,{" "}
              <Link
                to="/wiki/prompt-engineering"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                soft prompt tuning
              </Link>{" "}
              extends this idea by learning continuous prompt embeddings. This
              approach outperforms GPT-3's discrete few-shot learning by a large
              margin, while still keeping the model frozen [Lester et al., 2021,
              p.1].
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Scaling Changes Everything
          </h2>
          <p className="text-slate-700 mb-4">
            One of the most important findings from the GPT-3 paper is that{" "}
            <strong>
              few-shot learning performance scales dramatically with model size
            </strong>{" "}
            [Brown et al., 2020, p. 5]:
          </p>
          <div className="bg-slate-100 rounded-lg p-4">
            <table className="w-full text-slate-700 text-sm">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="text-left py-2">Model Size</th>
                  <th className="text-left py-2">
                    Few-Shot Accuracy (42 Benchmarks)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-2">0.1B params</td>
                  <td>25%</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2">1.3B params</td>
                  <td>36%</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2">6.7B params</td>
                  <td>43%</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2">13B params</td>
                  <td>48%</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">175B params (GPT-3)</td>
                  <td className="font-bold">58%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-700 mt-4">
            The gap between zero-shot, one-shot, and few-shot performance grows
            with model capacity, suggesting that{" "}
            <strong>larger models are more proficient meta-learners</strong>{" "}
            [Brown et al., 2020, p. 6].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Notable Performance
          </h2>
          <p className="text-slate-700 mb-4">
            GPT-3's few-shot performance on various tasks [Brown et al., 2020,
            p. 5]:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>
              <strong>CoQA</strong> (conversational QA): 85.0 F1 (few-shot) vs
              81.5 F1 (zero-shot)
            </li>
            <li>
              <strong>TriviaQA</strong>: 71.2% accuracy (few-shot,
              state-of-the-art for closed-book)
            </li>
            <li>
              <strong>SuperGLUE</strong>: Sometimes competitive with fine-tuned
              models
            </li>
            <li>
              <strong>Arithmetic</strong>: Can perform 2-digit addition with
              100% accuracy, 3-digit addition at 80.2%
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Detective Analogy
          </h2>
          <p className="text-slate-700 mb-4">
            Imagine you're a detective who has solved thousands of different
            types of crimes over your career.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">Zero-Shot:</h4>
              <p className="text-sm text-slate-700">
                Someone says "It's a breaking-and-entering." No photos, no
                examples—just the category name. You have to guess the pattern.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Few-Shot:</h4>
              <p className="text-sm text-slate-700">
                You see 3-5 photos of similar crimes from last week. You
                immediately recognize the entry method, items targeted, and
                likely next target. No weeks of study needed.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Fine-Tuning:</h4>
              <p className="text-sm text-slate-700">
                You spend weeks studying ONLY breaking-and-entering cases. You
                become hyper-specialized but lose your general detective
                flexibility.
              </p>
            </div>
          </div>
          <p className="text-slate-700 mb-4">
            Few-shot gives you enough examples to recognize the pattern while
            keeping you flexible. Your years of diverse training (pre-training
            on varied data) mean you can quickly adapt to this specific pattern
            without specialized retraining.
          </p>
          <p className="text-slate-700">
            The power comes from the <strong>combination</strong> of: (1) Broad
            experience (pre-training), (2) A few specific examples (few-shot
            conditioning), (3) No need for retraining (no weight updates).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Connection to Meta-Learning
          </h2>
          <p className="text-slate-700 mb-4">
            Few-shot learning in language models is related to{" "}
            <Link
              to="/wiki/meta-learning"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              meta-learning
            </Link>{" "}
            in other ML contexts [Brown et al., 2020, p. 6]. Both involve:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Broad distribution learning</strong>: Learning from a wide
              variety of tasks (implicit in pre-training data for LMs)
            </li>
            <li>
              <strong>Rapid adaptation</strong>: Quickly adapting to a new task
              with minimal examples
            </li>
          </ul>
          <p className="text-slate-700">
            The model essentially learns <strong>how to learn</strong> during
            pre-training, then applies this meta-learning ability at inference
            time. The GPT-3 paper emphasizes that these "learning" curves
            involve <strong>no gradient updates or fine-tuning</strong>, just
            increasing numbers of demonstrations given as conditioning [Brown et
            al., 2020, p. 5].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Related Concepts
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>
              <Link
                to="/wiki/zero-shot-learning"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Zero-Shot Learning
              </Link>{" "}
              - No examples, just task description
            </li>
            <li>
              <Link
                to="/wiki/meta-learning"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Meta-Learning
              </Link>{" "}
              - Learning how to learn from few examples
            </li>
            <li>
              <Link
                to="/wiki/in-context-learning"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                In-Context Learning
              </Link>{" "}
              - The mechanism behind few-shot learning
            </li>
            <li>
              <Link
                to="/wiki/few-shot-prompting"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Few-Shot Prompting
              </Link>{" "}
              - Practical techniques for crafting few-shot prompts
            </li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
