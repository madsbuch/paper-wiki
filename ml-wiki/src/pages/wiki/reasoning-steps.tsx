import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function ReasoningSteps() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "Reasoning Steps",
  description: "Intermediate computational steps that break down complex reasoning tasks into manageable sub-problems.",
  category: "Technique",
  difficulty: "Intermediate",
  citations: [
    {
      paper: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
      authors: "Wei, J., Wang, X., Schuurmans, D., Bosma, M., et al.",
      year: "2022",
      pages: "1-3"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">Reasoning steps are the intermediate computational steps that break down complex problems into simpler sub-problems, making them easier to solve [Wei et al., 2022, p. 2].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Decomposition Principle</h2>
          <p className="text-slate-700 mb-4">Complex reasoning requires breaking problems down:</p>
          <p className="text-slate-700 mb-4"><strong>Without reasoning steps:</strong></p>
          <p className="text-slate-700 mb-4">"Roger has 5 balls. He buys 2 cans of 3 balls each. How many now?" → 11</p>
          <p className="text-slate-700 mb-4"><strong>With reasoning steps:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Roger started with 5 balls</li>
            <li>He bought 2 cans</li>
            <li>Each can has 3 balls</li>
            <li>2 × 3 = 6 balls from cans</li>
            <li>5 + 6 = 11 total balls</li>
          </ul>
          <p className="text-slate-700 mb-4">Each step is simpler than the whole problem [Wei et al., 2022, p. 1].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why They Matter</h2>
          <p className="text-slate-700 mb-4">Reasoning steps allow language models to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Solve problems they couldn't solve in one step</li>
            <li>Show their work for interpretability</li>
            <li>Self-correct by catching errors in intermediate steps</li>
            <li>Handle longer and more complex reasoning chains</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Emergence at Scale</h2>
          <p className="text-slate-700 mb-4">Only sufficiently large models (100B+ parameters) can effectively use reasoning steps. Smaller models don't benefit, suggesting reasoning is an emergent ability [Wei et al., 2022, p. 3].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">A Human Analogy</h2>
          <p className="text-slate-700 mb-4">Humans use reasoning steps constantly. When calculating a tip, you don't instantly know the answer—you break it down: "15% of $40... 10% is $4... 5% is $2... so 15% is $6." Language models can now do the same.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact on Performance</h2>
          <p className="text-slate-700 mb-4">Chain-of-thought prompting (which elicits reasoning steps) improved PaLM 540B from 18% to 57% on GSM8K math problems—just by making the model show its reasoning [Wei et al., 2022, p. 2].</p>
          <hr className="my-6 border-slate-200" />
          <p className="text-slate-700 mb-4"><strong>Related Concepts:</strong> <a href="/wiki/chain-of-thought-prompting" className="text-blue-600 hover:text-blue-800 underline">Chain-of-Thought Prompting</a> · <a href="/wiki/emergent-abilities" className="text-blue-600 hover:text-blue-800 underline">Emergent Abilities</a> · <a href="/wiki/arithmetic-reasoning" className="text-blue-600 hover:text-blue-800 underline">Arithmetic Reasoning</a></p>
        </section>
      </div>
    </WikiLayout>
  );
}
