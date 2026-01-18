import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function AiAlignment() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  return (
    <WikiLayout
      title="AI Alignment"
      description="The challenge of ensuring AI systems behave in accordance with human values and intentions."
      category="Research Area"
      difficulty="Advanced"
      citations={[
        {
          paper: "Training language models to follow instructions with human feedback",
          authors: "Ouyang, L., Wu, J., Jiang, X., Almeida, D., et al.",
          year: "2022",
          pages: "2-3, 19"
        }
      ]}
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700">
            AI alignment is the problem of ensuring that AI systems pursue goals and exhibit behaviors that align with human values and intentions [Ouyang et al., 2022, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Core Challenge</h2>
          <p className="text-slate-700 mb-4">
            Language models are trained to predict text from the internet. But predicting internet text does not equal being helpful to users. This is a misalignment between the training objective and what we actually want from AI systems [Ouyang et al., 2022, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The InstructGPT Approach</h2>
          <p className="text-slate-700 mb-4">
            InstructGPT demonstrated one approach to alignment:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Define what "aligned" behavior means (helpful, honest, harmless)</li>
            <li>Collect human feedback on model outputs</li>
            <li>Use that feedback to train the model to behave as desired</li>
          </ol>
          <p className="text-slate-700">
            This isn't perfect alignment, but it's practical progress [Ouyang et al., 2022, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Three H's</h2>
          <p className="text-slate-700 mb-4">
            InstructGPT aimed for models that are:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Helpful</strong>: They solve the user's task effectively</li>
            <li><strong>Honest</strong>: They don't fabricate information or mislead</li>
            <li><strong>Harmless</strong>: They don't cause harm to people or society</li>
          </ul>
          <p className="text-slate-700">
            [Ouyang et al., 2022, p. 2]
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why It Matters</h2>
          <p className="text-slate-700 mb-4">
            As AI systems become more capable and deployed more widely, alignment becomes critical. An extremely capable but misaligned AI could:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Provide harmful advice</li>
            <li>Spread misinformation</li>
            <li>Reinforce biases</li>
            <li>Cause unintended consequences</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Alignment Tax</h2>
          <p className="text-slate-700">
            Sometimes alignment hurts performance on academic benchmarks—an "alignment tax." But InstructGPT showed this can be minimized while still improving real-world helpfulness [Ouyang et al., 2022, p. 3].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">A Philosophical Challenge</h2>
          <p className="text-slate-700">
            Who decides what "aligned" means? InstructGPT aligned to preferences of their labelers, but broader societal alignment remains an open challenge [Ouyang et al., 2022, p. 19].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Path Forward</h2>
          <p className="text-slate-700 mb-4">
            InstructGPT represents one step toward alignment, but much work remains:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Scaling oversight as models become more capable</li>
            <li>Aligning with diverse human values</li>
            <li>Preventing specification gaming</li>
            <li>Ensuring robustness</li>
          </ul>
        </section>

        <hr className="my-8 border-slate-300" />

        <p className="text-slate-700">
          <strong>Related Concepts:</strong> <a href="/wiki/rlhf" className="text-blue-600 hover:underline">RLHF</a> · <a href="/wiki/instruction-following" className="text-blue-600 hover:underline">Instruction Following</a> · <a href="/wiki/reward-modeling" className="text-blue-600 hover:underline">Reward Modeling</a>
        </p>
      </div>
    </WikiLayout>
  );
}
