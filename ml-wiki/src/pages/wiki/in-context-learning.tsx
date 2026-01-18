import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function InContextLearning() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "In-Context Learning",
  citations: [
    {
      paper: "Language Models are Few-Shot Learners (GPT-3)",
      authors: "Brown, T. B., Mann, B., Ryder, N., Subbiah, M., et al.",
      year: "2020",
      pages: "5-7"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4"><strong>In-context learning</strong> is the ability of large language models to perform tasks by conditioning on a few demonstrations provided at inference time as context, without any gradient updates or fine-tuning [Brown et al., 2020, p. 6]. This approach represents a fundamental shift from traditional fine-tuning methods.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-700 mb-4">In-context learning works by giving the model K examples of a task (context and desired completion) in its context window, then providing a final context for which the model must generate a completion [Brown et al., 2020, p. 6]. For example, to translate English to French:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Translate English to French:
            sea otter =&gt; loutre de mer
            peppermint =&gt; menthe poivrée
            plush giraffe =&gt; girafe peluche
            cheese =&gt; [model generates: fromage]
          </code></pre>
          <p className="text-slate-700 mb-4">The key characteristic is that <strong>no weight updates are performed</strong> - the model adapts to the task purely through the forward pass [Brown et al., 2020, p. 6].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Three Settings</h2>
          <p className="text-slate-700 mb-4">The GPT-3 paper identifies three main settings for in-context learning [Brown et al., 2020, p. 6-7]:</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">1. Zero-Shot Learning</h3>
          <p className="text-slate-700 mb-4">The model is given only a natural language description of the task with no demonstrations [Brown et al., 2020, p. 7]. This provides maximum convenience but is the most challenging setting.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. One-Shot Learning</h3>
          <p className="text-slate-700 mb-4">The model receives one demonstration of the task in addition to a natural language description [Brown et al., 2020, p. 6]. This most closely matches how some tasks are communicated to humans.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Few-Shot Learning</h3>
          <p className="text-slate-700 mb-4">The model is given K demonstrations of the task (typically 10-100 examples, limited by the context window of n_ctx = 2048 tokens) [Brown et al., 2020, p. 6]. This provides the strongest performance while still requiring no weight updates.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Advantages</h2>
          <p className="text-slate-700 mb-4">In-context learning offers several advantages over traditional fine-tuning [Brown et al., 2020, p. 6]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Reduced Data Requirements</strong>: Major reduction in the need for task-specific labeled data</li>
            <li><strong>Avoids Narrow Distributions</strong>: Reduced potential to learn overly narrow distributions from fine-tuning datasets</li>
            <li><strong>Prevents Spurious Correlations</strong>: Less likely to exploit spurious features present only in narrow training data</li>
            <li><strong>Task Agnostic</strong>: No need to update model weights for each new task</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Performance Scaling</h2>
          <p className="text-slate-700 mb-4">A critical finding from the GPT-3 paper is that <strong>larger models are more proficient at in-context learning</strong> [Brown et al., 2020, p. 6]. The gap between zero-shot, one-shot, and few-shot performance grows with model capacity, suggesting that larger models are better meta-learners [Brown et al., 2020, p. 6].</p>
          <p className="text-slate-700 mb-4">For the 175B parameter GPT-3 model [Brown et al., 2020, p. 5]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Zero-shot</strong>: 42% aggregate accuracy</li>
            <li><strong>One-shot</strong>: 52% aggregate accuracy</li>
            <li><strong>Few-shot</strong>: 58% aggregate accuracy</li>
          </ul>
          <p className="text-slate-700 mb-4">In contrast, smaller models (e.g., 125M parameters) show much smaller differences between these settings, indicating limited in-context learning ability.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Typical K Values</h2>
          <p className="text-slate-700 mb-4">For few-shot learning, K is typically set in the range of <strong>10 to 100 examples</strong>, which is how many can fit in the model's context window [Brown et al., 2020, p. 6]. The exact number depends on:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>The length of each example</li>
            <li>The complexity of the task</li>
            <li>The model's context window size (2048 tokens for GPT-3)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Connection to Meta-Learning</h2>
          <p className="text-slate-700 mb-4">In-context learning has structural similarities to meta-learning in machine learning more broadly [Brown et al., 2020, p. 6]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Outer loop</strong>: Language model pre-training on a broad distribution of tasks (implicit in the pre-training data)</li>
            <li><strong>Inner loop</strong>: Rapid adaptation to a new task at inference time through in-context examples</li>
          </ul>
          <p className="text-slate-700 mb-4">The model learns during pre-training to recognize and adapt to task patterns, then applies this meta-learned ability at inference time.</p>
          <hr className="my-6 border-slate-200" />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Apprentice Story</h2>
          <p className="text-slate-700 mb-4">Imagine two apprentice craftspeople learning to make furniture:</p>
          <p className="text-slate-700 mb-4"><strong>Traditional Apprentice (Fine-Tuning)</strong>: Gets sent to a specialized workshop for weeks where they practice making one specific type of chair over and over, thousands of times. Their muscle memory becomes perfectly tuned to that exact chair. When asked to make a different type of furniture, they need to go back to another specialized workshop and retrain for weeks.</p>
          <p className="text-slate-700 mb-4"><strong>In-Context Learning Apprentice (GPT-3)</strong>: Has spent years watching master craftspeople create thousands of different furniture pieces. Now, when you show them 2-3 examples of a new chair design, they can immediately start making that chair reasonably well - not from specialized drilling, but from their broad understanding of furniture-making principles. Show them table examples instead, and they pivot immediately to making tables.</p>
          <p className="text-slate-700 mb-4">The in-context learning apprentice doesn't need retraining for each task. Their broad experience lets them recognize "Oh, this is a chair-making task" from just a few examples and apply their general knowledge appropriately.</p>
          <p className="text-slate-700 mb-4">The magic happens because during their years of observation (pre-training), they didn't just memorize specific pieces - they learned the <strong>meta-skill of recognizing and adapting to different furniture-making tasks</strong>.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>[Few-Shot Learning](/wiki/few-shot-learning)</li>
            <li>[Zero-Shot Learning](/wiki/zero-shot-learning)</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
