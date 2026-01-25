import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import { useEffect } from "react";

export default function FineTuning() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error("MathJax typesetting failed:", err),
      );
    }
  }, []);

  return (
    <WikiLayout
      title="Fine-Tuning"
      description="Adapting a pretrained model to a specific task by continuing training on task-specific data with minimal additional parameters."
      category="Training Method"
      difficulty="Beginner"
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
            Fine-tuning is the process of taking a pretrained model and adapting
            it to a specific downstream task by training it on task-specific
            data [Devlin et al., 2018, p. 1].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Two-Stage Paradigm
          </h2>
          <p className="text-slate-700 mb-4">
            Modern NLP follows a two-stage approach:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Pretraining</strong>: Train on large amounts of unlabeled
              data to learn general language representations
            </li>
            <li>
              <strong>Fine-tuning</strong>: Adapt to specific tasks with labeled
              data
            </li>
          </ol>
          <p className="text-slate-700">
            BERT pioneered fine-tuning with just one additional output layer,
            making it extremely simple to adapt the model [Devlin et al., 2018,
            p. 1].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Why It Works
          </h2>
          <p className="text-slate-700">
            Fine-tuning leverages transfer learning—knowledge learned during
            pretraining transfers to the downstream task. The model already
            understands language, so it only needs to learn task-specific
            patterns [Devlin et al., 2018, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            A Simple Analogy
          </h2>
          <p className="text-slate-700">
            Think of pretraining as general education and fine-tuning as job
            training. You learn fundamentals in school (pretraining), then
            quickly adapt those skills to your specific job (fine-tuning). You
            don't start from scratch each time you change jobs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The BERT Approach
          </h2>
          <p className="text-slate-700">
            BERT showed that you can achieve state-of-the-art performance on a
            wide range of tasks by simply adding a classification layer and
            fine-tuning all parameters [Devlin et al., 2018, p. 1].
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <p className="text-slate-700">
          <strong>Related Concepts:</strong>{" "}
          <Link
            to="/wiki/transfer-learning"
            className="text-blue-600 hover:underline"
          >
            Transfer Learning
          </Link>{" "}
          ·{" "}
          <Link
            to="/wiki/bidirectional-pretraining"
            className="text-blue-600 hover:underline"
          >
            Bidirectional Pretraining
          </Link>{" "}
          ·{" "}
          <Link
            to="/wiki/masked-language-model"
            className="text-blue-600 hover:underline"
          >
            Masked Language Model
          </Link>
        </p>
      </div>
    </WikiLayout>
  );
}
