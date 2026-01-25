import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import { useEffect } from "react";

export default function BidirectionalPretraining() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error("MathJax typesetting failed:", err),
      );
    }
  }, []);

  return (
    <WikiLayout
      title="Bidirectional Pretraining"
      description="Training a language model by conditioning on context from both left and right directions simultaneously in all layers."
      category="Training Method"
      difficulty="Intermediate"
      citations={[
        {
          paper:
            "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
          authors: "Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K.",
          year: "2018",
          pages: "1-2",
        },
      ]}
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700">
            Bidirectional pretraining is the technique of training language
            models by jointly conditioning on both left and right context in all
            layers, enabling the model to learn representations that understand
            meaning from both directions [Devlin et al., 2018, p. 1].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Breakthrough
          </h2>
          <p className="text-slate-700">
            Traditional language models only looked in one direction
            (left-to-right or right-to-left). BERT changed this by pretraining
            deep bidirectional representations, allowing each token to attend to
            tokens on both sides [Devlin et al., 2018, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Why Bidirectional Matters
          </h2>
          <p className="text-slate-700 mb-4">
            Consider the sentence: "The bank by the river was flooded."
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Left-to-right only</strong>: When processing "bank," the
              model only sees "The"
            </li>
            <li>
              <strong>Bidirectional</strong>: The model sees both "The" before
              and "by the river" after, understanding "bank" means riverbank,
              not a financial institution
            </li>
          </ul>
          <p className="text-slate-700">
            This bidirectional context is crucial for tasks like question
            answering where understanding requires seeing the full context
            [Devlin et al., 2018, p. 1].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            A Story About Context
          </h2>
          <p className="text-slate-700">
            Imagine reading a mystery novel where you can only read forward—you
            might misunderstand clues early on. But if you could see ahead and
            behind simultaneously, you'd understand each clue's true meaning
            immediately. That's what bidirectional pretraining gives language
            models.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Technical Implementation
          </h2>
          <p className="text-slate-700">
            BERT achieves bidirectionality through masked language modeling,
            which randomly masks tokens and requires the model to predict them
            using full bidirectional context [Devlin et al., 2018, p. 4].
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <p className="text-slate-700">
          <strong>Related Concepts:</strong>{" "}
          <Link
            to="/wiki/masked-language-model"
            className="text-blue-600 hover:underline"
          >
            Masked Language Model
          </Link>{" "}
          ·{" "}
          <Link
            to="/wiki/transfer-learning"
            className="text-blue-600 hover:underline"
          >
            Transfer Learning
          </Link>
        </p>
      </div>
    </WikiLayout>
  );
}
