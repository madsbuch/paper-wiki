import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "Transfer Learning",
  description: "Applying knowledge gained from one task to improve learning and performance on a different but related task.",
  category: "Learning Paradigm",
  difficulty: "Beginner",
  tags: ["learning-paradigm", "pretraining", "fine-tuning"],
  relatedConcepts: ["fine-tuning", "parameter-efficient-fine-tuning", "few-shot-learning"],
  citations: [
    {
      paper: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: "Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K.",
      year: "2018",
      pages: "1-2"
    },
    {
      paper: "The Power of Scale for Parameter-Efficient Prompt Tuning",
      authors: "Lester et al.",
      year: "2021",
      pages: "1"
    }
  ]
};

export default function TransferLearning() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">Transfer learning is the ability to take knowledge learned from one task and apply it to a different but related task, dramatically reducing the amount of task-specific data and training required [Devlin et al., 2018, p. 1].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Core Insight</h2>
          <p className="text-slate-700 mb-4">Instead of training a model from scratch for every new task, transfer learning says: "Let's reuse knowledge from a model trained on a large, general task."</p>
          <p className="text-slate-700 mb-4">In NLP, this typically means:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Pretrain</strong> on massive amounts of text</li>
            <li><strong>Adapt</strong> to your specific task</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Adaptation Approaches</h3>
          <p className="text-slate-700 mb-2">Transfer learning can be accomplished through different adaptation methods:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Full fine-tuning</strong>: Update all model parameters on task-specific data [Devlin et al., 2018]</li>
            <li><strong>Parameter-efficient methods</strong>: Update only a small subset of parameters (LoRA, adapters, prompt tuning) [Lester et al., 2021]</li>
            <li><strong>Few-shot learning</strong>: Adapt via in-context examples without weight updates</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why It's Revolutionary</h2>
          <p className="text-slate-700 mb-4">Transfer learning changed NLP from requiring massive labeled datasets for each task to needing only small amounts of task-specific data. BERT showed you could achieve state-of-the-art results with minimal task-specific architecture [Devlin et al., 2018, p. 2].</p>
          
          <p className="text-slate-700 mb-4">More recently, parameter-efficient transfer learning methods have pushed this even further. For example, <a href="/wiki/prompt-engineering" className="text-blue-600 hover:text-blue-800 underline">prompt tuning</a> achieves competitive performance while updating only 0.01% of model parameters, enabling a single frozen model to serve multiple tasks efficiently [Lester et al., 2021, p. 1].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">A Real-World Analogy</h2>
          <p className="text-slate-700 mb-4">Learning to drive different vehicles is like transfer learning. Once you learn to drive a car, you can quickly adapt to driving a truck. You transfer core skills (steering, braking) and only need to learn vehicle-specific differences. You don't relearn driving from scratch.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Evidence</h2>
          <p className="text-slate-700 mb-4">BERT achieved state-of-the-art on 11 NLP tasks using the same pretrained model with minimal task-specific modifications [Devlin et al., 2018, p. 1]. This demonstrated the power of transfer learning at scale.</p>
          <hr className="my-6 border-slate-200" />
          <p className="text-slate-700 mb-4"><strong>Related Concepts:</strong> <a href="/wiki/fine-tuning" className="text-blue-600 hover:text-blue-800 underline">Fine-Tuning</a> · <a href="/wiki/parameter-efficient-fine-tuning" className="text-blue-600 hover:text-blue-800 underline">Parameter-Efficient Fine-Tuning</a> · <a href="/wiki/prompt-engineering" className="text-blue-600 hover:text-blue-800 underline">Prompt Engineering</a> · <a href="/wiki/few-shot-learning" className="text-blue-600 hover:text-blue-800 underline">Few-Shot Learning</a></p>
        </section>
      </div>
    </WikiLayout>
  );
}
