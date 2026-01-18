import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function MetaLearning() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "Meta-Learning",
  citations: [
    {
      paper: "Language Models are Few-Shot Learners (GPT-3)",
      authors: "Brown, T. B., Mann, B., Ryder, N., Subbiah, M., et al.",
      year: "2020",
      pages: "6"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4"><strong>Meta-learning</strong>, in the context of language models, refers to the ability of models to learn how to learn - developing capabilities during pre-training that enable rapid adaptation to new tasks at inference time without weight updates [Brown et al., 2020, p. 6].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Structure</h2>
          <p className="text-slate-700 mb-4">Meta-learning in language models has an <strong>outer-loop-inner-loop structure</strong> [Brown et al., 2020, p. 6]:</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Outer Loop</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Language model pre-training</strong> on a broad distribution of tasks</li>
            <li>Tasks are implicit in the pre-training data</li>
            <li>Weights are updated via gradient descent during unsupervised pre-training</li>
            <li>The model learns general patterns and task recognition abilities</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Inner Loop</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Rapid adaptation</strong> to a new task at inference time</li>
            <li>Happens through in-context examples</li>
            <li><strong>No weight updates</strong> - adaptation occurs purely through the forward pass</li>
            <li>The model recognizes the task pattern from examples and applies learned knowledge</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Connection to In-Context Learning</h2>
          <p className="text-slate-700 mb-4">The GPT-3 paper shows that larger models are <strong>more proficient meta-learners</strong> [Brown et al., 2020, p. 6]. Evidence for this includes:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>The gap between zero-shot, one-shot, and few-shot performance grows with model capacity</li>
            <li>Larger models show stronger in-context learning abilities</li>
            <li>The 175B parameter model demonstrates much better task adaptation than smaller models</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Evidence of Meta-Learning</h2>
          <p className="text-slate-700 mb-4">The finding that "the gap between zero-, one-, and few-shot performance often grows with model capacity" suggests that larger models better learn the meta-skill of adapting to tasks from examples [Brown et al., 2020, p. 6].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Relationship to Broader ML</h2>
          <p className="text-slate-700 mb-4">Few-shot learning in language models is related to few-shot learning in other ML contexts [Brown et al., 2020, p. 6]. Both involve:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Learning from a broad distribution</strong>: Exposure to many different types of tasks</li>
            <li><strong>Rapid adaptation</strong>: Quickly adjusting to new tasks with minimal examples</li>
          </ul>
          <p className="text-slate-700 mb-4">However, language model meta-learning is unique in that:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>The task distribution is implicit in natural language pre-training data</li>
            <li>Adaptation happens through context rather than explicit meta-learning algorithms</li>
            <li>No architectural changes or special meta-learning procedures are required</li>
          </ul>
          <hr className="my-6 border-slate-200" />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Master Craftsperson Story</h2>
          <p className="text-slate-700 mb-4">Imagine two types of expertise:</p>
          <p className="text-slate-700 mb-4"><strong>Specialist (Traditional Learning)</strong>: Spent 10,000 hours making one specific type of chair. Can make that chair perfectly but struggles when asked to make a different furniture piece. Must retrain extensively for each new type of furniture.</p>
          <p className="text-slate-700 mb-4"><strong>Master Craftsperson (Meta-Learner)</strong>: Spent 10,000 hours making thousands of different furniture pieces - chairs, tables, cabinets, beds, shelves. Now, when shown 2-3 examples of a new furniture type they've never made before, they can create it reasonably well.</p>
          <p className="text-slate-700 mb-4"><strong>The Meta-Skill</strong>: The master hasn't just learned to make furniture - they've learned <em>how to learn</em> new furniture types. They've internalized:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>How to recognize patterns from examples</li>
            <li>What features matter for different furniture types</li>
            <li>How to adapt their general woodworking knowledge to new contexts</li>
          </ul>
          <p className="text-slate-700 mb-4">This is meta-learning: during the "outer loop" (years of diverse practice), they developed the "inner loop" skill of rapidly adapting to new furniture types from just a few examples.</p>
          <p className="text-slate-700 mb-4">In GPT-3, the outer loop is pre-training on diverse text, and the inner loop is in-context learning from a few demonstrations.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>[In-Context Learning](/wiki/in-context-learning)</li>
            <li>[Few-Shot Learning](/wiki/few-shot-learning)</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
