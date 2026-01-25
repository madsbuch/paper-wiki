import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import { useEffect } from "react";

export default function MaskedLanguageModel() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error("MathJax typesetting failed:", err),
      );
    }
  }, []);

  const meta = {
    title: "Masked Language Model",
    description:
      "A pretraining objective where random tokens are masked and the model learns to predict them based on bidirectional context.",
    category: "Training Method",
    difficulty: "Intermediate",
    citations: [
      {
        paper:
          "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
        authors: "Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K.",
        year: "2018",
        pages: "2-4",
      },
    ],
  };

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            A masked language model is a pretraining objective that enables deep
            bidirectional representations by randomly masking tokens in the
            input and training the model to predict the original masked tokens
            based on their surrounding context.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Core Idea
          </h2>
          <p className="text-slate-700 mb-4">
            Unlike traditional left-to-right language models that can only see
            previous tokens, MLM allows the model to see context from both
            directions. This is achieved by randomly masking some percentage of
            input tokens (typically 15%) and having the model predict the masked
            tokens using the full bidirectional context [Devlin et al., 2018, p.
            4].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Masking Strategy
          </h2>
          <p className="text-slate-700 mb-4">
            BERT uses a clever masking strategy to avoid mismatch between
            pretraining and fine-tuning [Devlin et al., 2018, p. 4]:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>80% of the time: Replace with [MASK] token</li>
            <li>10% of the time: Replace with a random token</li>
            <li>10% of the time: Keep the original token</li>
          </ul>
          <p className="text-slate-700 mb-4">
            This prevents the model from relying too heavily on the [MASK]
            token, which doesn't appear during fine-tuning.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Why It Works
          </h2>
          <p className="text-slate-700 mb-4">
            The masked language model objective forces the model to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Learn rich contextual representations of each word</li>
            <li>Understand relationships between words in both directions</li>
            <li>Develop deep bidirectional understanding of language</li>
          </ul>
          <p className="text-slate-700 mb-4">
            Think of it like a fill-in-the-blank exercise where you need to
            understand the entire sentence, not just what comes before the
            blank.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact</h2>
          <p className="text-slate-700 mb-4">
            MLM revolutionized NLP by enabling truly bidirectional pretraining.
            This led to dramatic improvements on downstream tasks and spawned
            countless BERT-inspired models [Devlin et al., 2018, p. 1].
          </p>
          <hr className="my-6 border-slate-200" />
          <p className="text-slate-700 mb-4">
            <strong>Related Concepts:</strong>{" "}
            <Link
              to="/wiki/bidirectional-pretraining"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Bidirectional Pretraining
            </Link>{" "}
            ·{" "}
            <Link
              to="/wiki/fine-tuning"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Fine-Tuning
            </Link>{" "}
            ·{" "}
            <Link
              to="/wiki/transfer-learning"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Transfer Learning
            </Link>
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
