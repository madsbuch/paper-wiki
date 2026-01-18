import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function NextSentencePrediction() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "Next Sentence Prediction",
  description: "A binary classification task that predicts whether two sentences appear consecutively in the original text.",
  category: "Training Method",
  difficulty: "Intermediate",
  citations: [
    {
      paper: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: "Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K.",
      year: "2018",
      pages: "4, 8"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">Next sentence prediction is a pretraining task where the model learns to predict whether sentence B follows sentence A in the original text [Devlin et al., 2018, p. 4].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-700 mb-4">During pretraining, BERT is given pairs of sentences:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>50% of the time: B actually follows A (label: IsNext)</li>
            <li>50% of the time: B is a random sentence (label: NotNext)</li>
          </ul>
          <p className="text-slate-700 mb-4">The model must predict which case it is [Devlin et al., 2018, p. 4].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why It Matters</h2>
          <p className="text-slate-700 mb-4">Many NLP tasks require understanding relationships between sentences:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Question answering: Understanding the relationship between question and passage</li>
            <li>Natural language inference: Determining if one sentence implies another</li>
          </ul>
          <p className="text-slate-700 mb-4">NSP helps BERT learn these sentence-level relationships [Devlin et al., 2018, p. 4].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Results</h2>
          <p className="text-slate-700 mb-4">BERT's ablation studies showed that removing NSP hurt performance significantly on question answering and NLI tasks, confirming its importance [Devlin et al., 2018, p. 8].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">A Teaching Analogy</h2>
          <p className="text-slate-700 mb-4">NSP is like teaching a student reading comprehension by asking: "Does this sentence logically follow the previous one?" The student learns to understand how ideas connect across sentences, not just within them.</p>
          <hr className="my-6 border-slate-200" />
          <p className="text-slate-700 mb-4"><strong>Related Concepts:</strong> <a href="/wiki/masked-language-model" className="text-blue-600 hover:text-blue-800 underline">Masked Language Model</a> · <a href="/wiki/bidirectional-pretraining" className="text-blue-600 hover:text-blue-800 underline">Bidirectional Pretraining</a> · <a href="/wiki/fine-tuning" className="text-blue-600 hover:text-blue-800 underline">Fine-Tuning</a></p>
        </section>
      </div>
    </WikiLayout>
  );
}
