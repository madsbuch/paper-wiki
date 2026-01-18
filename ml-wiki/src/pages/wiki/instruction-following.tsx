import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function InstructionFollowing() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  return (
    <WikiLayout
      title="Instruction Following"
      description="The ability of a language model to understand and execute natural language instructions provided by users."
      category="Capability"
      difficulty="Intermediate"
      citations={[
        {
          paper: "Training language models to follow instructions with human feedback",
          authors: "Ouyang, L., Wu, J., Jiang, X., Almeida, D., et al.",
          year: "2022",
          pages: "1-4"
        }
      ]}
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700">
            Instruction following is the ability of a language model to understand and accurately execute instructions given in natural language, behaving helpfully and safely [Ouyang et al., 2022, p. 1].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Alignment Problem</h2>
          <p className="text-slate-700 mb-4">
            Large language models trained on internet text learn to predict the next token, but this doesn't make them good at following user instructions. A model might:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Generate plausible but incorrect information</li>
            <li>Produce toxic or harmful content</li>
            <li>Fail to follow the user's actual intent</li>
          </ul>
          <p className="text-slate-700">
            Instruction following addresses this misalignment [Ouyang et al., 2022, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The InstructGPT Solution</h2>
          <p className="text-slate-700 mb-4">
            InstructGPT showed that models can be taught to follow instructions through:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Collecting demonstrations of desired behavior</li>
            <li>Training a reward model on human preferences</li>
            <li>Fine-tuning with reinforcement learning</li>
          </ol>
          <p className="text-slate-700">
            The result: A 1.3B InstructGPT was preferred to 175B GPT-3 [Ouyang et al., 2022, p. 1].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What Makes Good Instruction Following?</h2>
          <p className="text-slate-700 mb-4">
            According to InstructGPT's criteria, good instruction following means being:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Helpful</strong>: Actually solving the user's task</li>
            <li><strong>Honest</strong>: Not making up facts or misleading</li>
            <li><strong>Harmless</strong>: Not causing harm to users or others</li>
          </ul>
          <p className="text-slate-700">
            [Ouyang et al., 2022, p. 2]
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">A Simple Example</h2>
          <p className="text-slate-700 mb-2">
            <strong>Poor instruction following:</strong>
          </p>
          <p className="text-slate-700 mb-1">User: "Summarize this article in 2 sentences."</p>
          <p className="text-slate-700 mb-4">Model: <em>Writes 10 sentences</em></p>
          <p className="text-slate-700 mb-2">
            <strong>Good instruction following:</strong>
          </p>
          <p className="text-slate-700 mb-1">User: "Summarize this article in 2 sentences."</p>
          <p className="text-slate-700">Model: <em>Writes exactly 2 sentences summarizing key points</em></p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Generalization Surprise</h2>
          <p className="text-slate-700">
            InstructGPT models could follow instructions in domains with little training data (like code, foreign languages), suggesting they learned a general concept of "following instructions" [Ouyang et al., 2022, p. 4].
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <p className="text-slate-700">
          <strong>Related Concepts:</strong> <a href="/wiki/rlhf" className="text-blue-600 hover:underline">RLHF</a> · <a href="/wiki/ai-alignment" className="text-blue-600 hover:underline">AI Alignment</a> · <a href="/wiki/reward-modeling" className="text-blue-600 hover:underline">Reward Modeling</a>
        </p>
      </div>
    </WikiLayout>
  );
}
