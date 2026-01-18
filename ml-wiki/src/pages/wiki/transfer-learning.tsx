import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function TransferLearning() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "Transfer Learning",
  description: "Applying knowledge gained from one task to improve learning and performance on a different but related task.",
  category: "Learning Paradigm",
  difficulty: "Beginner",
  citations: [
    {
      paper: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: "Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K.",
      year: "2018",
      pages: "1-2"
    }
  ]
};

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
            <li>Pretrain on massive amounts of text</li>
            <li>Fine-tune on your specific task</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why It's Revolutionary</h2>
          <p className="text-slate-700 mb-4">Transfer learning changed NLP from requiring massive labeled datasets for each task to needing only small amounts of task-specific data. BERT showed you could achieve state-of-the-art results with minimal task-specific architecture [Devlin et al., 2018, p. 2].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">A Real-World Analogy</h2>
          <p className="text-slate-700 mb-4">Learning to drive different vehicles is like transfer learning. Once you learn to drive a car, you can quickly adapt to driving a truck. You transfer core skills (steering, braking) and only need to learn vehicle-specific differences. You don't relearn driving from scratch.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Evidence</h2>
          <p className="text-slate-700 mb-4">BERT achieved state-of-the-art on 11 NLP tasks using the same pretrained model with minimal task-specific modifications [Devlin et al., 2018, p. 1]. This demonstrated the power of transfer learning at scale.</p>
          <hr className="my-6 border-slate-200" />
          <p className="text-slate-700 mb-4"><strong>Related Concepts:</strong> <a href="/wiki/fine-tuning" className="text-blue-600 hover:text-blue-800 underline">Fine-Tuning</a> · <a href="/wiki/bidirectional-pretraining" className="text-blue-600 hover:text-blue-800 underline">Bidirectional Pretraining</a> · <a href="/wiki/few-shot-learning" className="text-blue-600 hover:text-blue-800 underline">Few-Shot Learning</a></p>
        </section>
      </div>
    </WikiLayout>
  );
}
