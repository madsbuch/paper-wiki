import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function RewardModeling() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "Reward Modeling",
  description: "Training a model to predict human preferences between different outputs, used as a reward signal in reinforcement learning.",
  category: "Training Method",
  difficulty: "Advanced",
  citations: [
    {
      paper: "Training language models to follow instructions with human feedback",
      authors: "Ouyang, L., Wu, J., Jiang, X., Almeida, D., et al.",
      year: "2022",
      pages: "6, 8-9"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">Reward modeling is the technique of training a model to predict which outputs humans prefer, then using those predictions as a reward signal for reinforcement learning [Ouyang et al., 2022, p. 8].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Two-Step Process</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Step 1: Collect Comparisons</h3>
          <p className="text-slate-700 mb-4">Show humans multiple model outputs for the same input and have them rank them by preference:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Output A vs Output B vs Output C vs Output D</li>
            <li>Human ranks: B &amp;gt; D &amp;gt; C &amp;gt; A</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Step 2: Train the Reward Model</h3>
          <p className="text-slate-700 mb-4">Train a model to predict these human preferences. Given an output, the reward model predicts a score representing how much a human would like it [Ouyang et al., 2022, p. 8].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Not Direct Human Feedback?</h2>
          <p className="text-slate-700 mb-4">Getting human ratings for every training sample is expensive and slow. The reward model learns to approximate human preferences, providing fast feedback for millions of training examples.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The InstructGPT Reward Model</h2>
          <p className="text-slate-700 mb-4">InstructGPT's reward model:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Started from the supervised fine-tuned model</li>
            <li>Was trained on 33K comparison examples</li>
            <li>Predicted a scalar reward for each output</li>
            <li>Achieved high agreement with human preferences</li>
          </ul>
          <p className="text-slate-700 mb-4">[Ouyang et al., 2022, p. 8]</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Insight</h2>
          <p className="text-slate-700 mb-4">The reward model doesn't need to be perfect—it just needs to guide the policy in the right direction. Even an imperfect reward model significantly improves model behavior [Ouyang et al., 2022, p. 9].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Challenges</h2>
          <p className="text-slate-700 mb-4">Reward modeling faces several challenges:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Over-optimization: Models can exploit reward model weaknesses</li>
            <li>Distribution shift: Performance on novel inputs</li>
            <li>Capturing human values: What should the model learn?</li>
          </ul>
          <p className="text-slate-700 mb-4">InstructGPT addressed over-optimization using KL divergence penalties [Ouyang et al., 2022, p. 9].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Power of Preference Data</h2>
          <p className="text-slate-700 mb-4">Preference comparisons are easier for humans than writing demonstrations, making reward modeling a scalable approach to alignment [Ouyang et al., 2022, p. 6].</p>
          <hr className="my-6 border-slate-200" />
          <p className="text-slate-700 mb-4"><strong>Related Concepts:</strong> <a href="/wiki/rlhf" className="text-blue-600 hover:text-blue-800 underline">RLHF</a> · <a href="/wiki/ppo" className="text-blue-600 hover:text-blue-800 underline">PPO</a> · <a href="/wiki/ai-alignment" className="text-blue-600 hover:text-blue-800 underline">AI Alignment</a> · <a href="/wiki/instruction-following" className="text-blue-600 hover:text-blue-800 underline">Instruction Following</a></p>
        </section>
      </div>
    </WikiLayout>
  );
}
