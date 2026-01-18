import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function FewShotPrompting() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  return (
    <WikiLayout
      title="Few-Shot Prompting"
      description="Providing a language model with a few examples of a task in the prompt to guide its behavior without updating model weights."
      category="Prompting Technique"
      difficulty="Intermediate"
      citations={[
        {
          paper: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
          authors: "Wei, J., Wang, X., Schuurmans, D., Bosma, M., et al.",
          year: "2022",
          pages: "1-3"
        }
      ]}
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700">
            Few-shot prompting is the technique of including a small number of examples (typically 2-10) in the input prompt to demonstrate the desired task to a language model [Wei et al., 2022, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Approach</h2>
          <p className="text-slate-700 mb-4">
            Instead of fine-tuning the model, you simply show it examples in the prompt:
          </p>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm">
            <pre className="text-slate-700">{`Example 1: Input → Output
Example 2: Input → Output
Example 3: Input → Output
Now solve: Your Input → ?`}</pre>
          </div>
          <p className="text-slate-700 mt-4">
            The model learns the pattern from the examples and applies it to the new input.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why It's Powerful</h2>
          <p className="text-slate-700 mb-4">
            Few-shot prompting allows task adaptation without:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Collecting large labeled datasets</li>
            <li>Expensive fine-tuning</li>
            <li>Separate model checkpoints per task</li>
          </ul>
          <p className="text-slate-700">
            One model can perform many tasks just by changing the prompt [Wei et al., 2022, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Chain-of-Thought Enhancement</h2>
          <p className="text-slate-700">
            Chain-of-thought prompting extends few-shot prompting by including reasoning steps in the examples, dramatically improving performance on reasoning tasks [Wei et al., 2022, p. 1].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Scale Factor</h2>
          <p className="text-slate-700">
            Few-shot prompting improves with model scale. Larger models are better at learning from examples in context [Wei et al., 2022, p. 3].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">An Intuitive Story</h2>
          <p className="text-slate-700">
            Few-shot prompting is like showing someone how to solve a math problem by working through a few examples on a whiteboard. They see the pattern and apply it to new problems—no formal training required.
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <p className="text-slate-700">
          <strong>Related Concepts:</strong> <a href="/wiki/chain-of-thought-prompting" className="text-blue-600 hover:underline">Chain-of-Thought Prompting</a> · <a href="/wiki/in-context-learning" className="text-blue-600 hover:underline">In-Context Learning</a> · <a href="/wiki/few-shot-learning" className="text-blue-600 hover:underline">Few-Shot Learning</a>
        </p>
      </div>
    </WikiLayout>
  );
}
