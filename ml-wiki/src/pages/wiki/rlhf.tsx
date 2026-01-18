import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function RLHF() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "RLHF",
  description: "Reinforcement Learning from Human Feedback - using human preferences as a reward signal to align language models.",
  category: "Training Method",
  difficulty: "Advanced",
  citations: [
    {
      paper: "Training language models to follow instructions with human feedback",
      authors: "Ouyang, L., Wu, J., Jiang, X., Almeida, D., et al.",
      year: "2022",
      pages: "1-3, 6"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">RLHF (Reinforcement Learning from Human Feedback) is a technique that uses human preferences as a reward signal to train language models to behave in helpful, honest, and harmless ways [Ouyang et al., 2022, p. 2].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Three-Step Process</h2>
          <p className="text-slate-700 mb-4">InstructGPT pioneered a three-step RLHF approach [Ouyang et al., 2022, p. 6]:</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Step 1: Supervised Fine-Tuning (SFT)</h3>
          <p className="text-slate-700 mb-4">Collect demonstrations of desired behavior and fine-tune the model on them. Labelers write high-quality responses to prompts, and the model learns to imitate these responses [Ouyang et al., 2022, p. 6].</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Step 2: Reward Model Training</h3>
          <p className="text-slate-700 mb-4">Collect comparison data where labelers rank multiple model outputs. Train a reward model to predict which outputs humans prefer [Ouyang et al., 2022, p. 8].</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Step 3: RL Optimization</h3>
          <p className="text-slate-700 mb-4">Use the reward model as a reward function and fine-tune the SFT model using PPO (Proximal Policy Optimization) to maximize the predicted reward [Ouyang et al., 2022, p. 9].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why RLHF Works</h2>
          <p className="text-slate-700 mb-4">RLHF solves a key problem: it's easier for humans to compare and rank outputs than to write perfect demonstrations from scratch. Comparison data scales better than demonstration data [Ouyang et al., 2022, p. 6].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Results</h2>
          <p className="text-slate-700 mb-4">InstructGPT models trained with RLHF:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Were preferred to 100x larger GPT-3 models</li>
            <li>Made up facts less often</li>
            <li>Generated less toxic output</li>
            <li>Better followed user intentions</li>
          </ul>
          <p className="text-slate-700 mb-4">[Ouyang et al., 2022, p. 1]</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">A Training Analogy</h2>
          <p className="text-slate-700 mb-4">Think of RLHF like training a chef:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>SFT</strong>: Show them how to cook a few dishes (demonstrations)</li>
            <li><strong>Reward Model</strong>: Teach them what good food tastes like (human preferences)</li>
            <li><strong>RL</strong>: Let them practice and improve using taste as feedback (optimization)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Challenges</h2>
          <p className="text-slate-700 mb-4">RLHF faces important challenges:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Reward model quality depends on human labeler agreement</li>
            <li>Can over-optimize on the reward model</li>
            <li>Expensive to collect human feedback</li>
            <li>Alignment to whose values?</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact on Modern AI</h2>
          <p className="text-slate-700 mb-4">RLHF became the foundation for ChatGPT and modern instruction-following models, establishing the standard approach for making AI systems helpful, honest, and harmless [Ouyang et al., 2022, p. 1].</p>
          <hr className="my-6 border-slate-200" />
          <p className="text-slate-700 mb-4"><strong>Related Concepts:</strong> <a href="/wiki/reward-modeling" className="text-blue-600 hover:text-blue-800 underline">Reward Modeling</a> · <a href="/wiki/ppo" className="text-blue-600 hover:text-blue-800 underline">PPO</a> · <a href="/wiki/instruction-following" className="text-blue-600 hover:text-blue-800 underline">Instruction Following</a> · <a href="/wiki/ai-alignment" className="text-blue-600 hover:text-blue-800 underline">AI Alignment</a></p>
        </section>
      </div>
    </WikiLayout>
  );
}
