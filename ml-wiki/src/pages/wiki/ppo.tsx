import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";

export default function PPOProximalPolicyOptimization() {
  const meta = {
    title: "PPO (Proximal Policy Optimization)",
    description:
      "A reinforcement learning algorithm that makes stable, incremental updates to policies, widely used for fine-tuning language models with human feedback.",
    category: "Algorithms",
    difficulty: "Advanced",
    citations: [
      {
        paper:
          "Training language models to follow instructions with human feedback",
        authors: "Ouyang, L., Wu, J., Jiang, X., Almeida, D., et al.",
        year: "2022",
        pages: "9",
      },
    ],
  };

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            PPO is a reinforcement learning algorithm that enables stable
            training by making small, controlled updates to the policy,
            preventing catastrophic deviations from good behavior [Ouyang et
            al., 2022, p. 9].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Core Idea
          </h2>
          <p className="text-slate-700 mb-4">
            PPO constrains how much the policy can change in a single update.
            This "proximal" (nearby) optimization prevents the model from making
            large, destabilizing changes that could destroy previously learned
            good behavior.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Why PPO for Language Models?
          </h2>
          <p className="text-slate-700 mb-4">
            Language model fine-tuning with RL faces unique challenges:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Large action spaces (vocabulary size)</li>
            <li>Long sequences (many timesteps)</li>
            <li>Risk of mode collapse</li>
            <li>Need to preserve language capabilities</li>
          </ul>
          <p className="text-slate-700 mb-4">
            PPO's stable updates make it ideal for this setting [Ouyang et al.,
            2022, p. 9].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            InstructGPT's PPO Implementation
          </h2>
          <p className="text-slate-700 mb-4">
            InstructGPT used PPO with two key components:
          </p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            1. Reward Model Optimization
          </h3>
          <p className="text-slate-700 mb-4">
            Maximize the reward predicted by the trained reward model
          </p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            2. KL Penalty
          </h3>
          <p className="text-slate-700 mb-4">
            Add a penalty for deviating too far from the supervised fine-tuned
            model. This prevents over-optimization of the reward model [Ouyang
            et al., 2022, p. 9].
          </p>
          <p className="text-slate-700 mb-4">The combined objective:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto">
            <code className="text-sm">
              reward - β * KL_divergence(policy || SFT_model)
            </code>
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Pretraining Mix
          </h2>
          <p className="text-slate-700 mb-4">
            InstructGPT also mixed in pretraining gradients during PPO to
            prevent performance regressions on academic benchmarks—creating
            "PPO-ptx" [Ouyang et al., 2022, p. 9].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            A Balance Analogy
          </h2>
          <p className="text-slate-700 mb-4">
            Imagine training a dog. You want it to learn new tricks (optimize
            reward) while maintaining good basic behavior (KL penalty) and
            general health (pretraining mix). PPO balances these competing
            goals.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Why It Works
          </h2>
          <p className="text-slate-700 mb-4">
            PPO's success in RLHF stems from:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Preventing catastrophic forgetting</li>
            <li>Stable, reliable training</li>
            <li>Flexibility to add constraints (KL, pretraining)</li>
            <li>Sample efficiency</li>
          </ul>
          <hr className="my-6 border-slate-200" />
          <p className="text-slate-700 mb-4">
            <strong>Related Concepts:</strong>{" "}
            <Link
              to="/wiki/rlhf"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              RLHF
            </Link>{" "}
            ·{" "}
            <Link
              to="/wiki/reward-modeling"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Reward Modeling
            </Link>{" "}
            ·{" "}
            <Link
              to="/wiki/instruction-following"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Instruction Following
            </Link>
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
