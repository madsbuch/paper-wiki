import { useEffect } from "react";
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "Zero-Shot Learning",
  description: "A setting where a language model is given only a natural language instruction describing a task, with no demonstrations and no weight updates.",
  category: "Learning Paradigms",
  difficulty: "Intermediate",
  tags: ["learning-paradigm", "prompting", "generalization"],
  relatedConcepts: ["few-shot-learning", "in-context-learning", "prompt-engineering"],
  citations: [
    {
      paper: "Language Models are Few-Shot Learners (GPT-3)",
      authors: "Brown, T. B., Mann, B., Ryder, N., Subbiah, M., et al.",
      year: "2020",
      pages: "5-7",
    },
  ],
};

export default function ZeroShotLearning() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error("MathJax typesetting failed:", err),
      );
    }
  }, []);

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            <strong>Zero-shot learning</strong> is the setting where a language
            model is given only a natural language instruction describing a
            task, with <strong>no demonstrations</strong> allowed and{" "}
            <strong>no weight updates</strong> performed [Brown et al., 2020, p.
            7]. The model must predict the answer based purely on the task
            description.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-slate-700 mb-4">
            In zero-shot learning, the model receives only a text instruction
            and must infer what to do [Brown et al., 2020, p. 7]:
          </p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto">
            <code className="text-sm">
              Translate English to French: cheese =&gt; ?
            </code>
          </pre>
          <p className="text-slate-700 mb-4">
            No examples are provided - just the task description "Translate
            English to French".
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Characteristics
          </h2>
          <p className="text-slate-700 mb-4">
            Zero-shot learning provides [Brown et al., 2020, p. 7]:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>**Maximum convenience**: No examples needed at all</li>
            <li>
              **Potential for robustness**: Avoids spurious correlations from
              training examples
            </li>
            <li>
              **Avoidance of spurious correlations**: Unless they occur broadly
              across pre-training data
            </li>
            <li>
              **Most challenging**: Hardest of the in-context learning settings
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Challenge
          </h2>
          <p className="text-slate-700 mb-4">
            Zero-shot is sometimes considered "unfairly hard" [Brown et al.,
            2020, p. 7]. In some cases, it may even be difficult for humans to
            understand the format of the task without prior examples. For
            example, being asked to "make a table of world records for the 200m
            dash" can be ambiguous regarding the exact format and what should be
            included.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Performance with GPT-3
          </h2>
          <p className="text-slate-700 mb-4">
            For the 175B parameter GPT-3 model, zero-shot achieves [Brown et
            al., 2020, p. 5]:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>**42% aggregate accuracy** across 42 benchmarks</li>
            <li>**81.5 F1** on CoQA (conversational question answering)</li>
            <li>**64.3% accuracy** on TriviaQA</li>
            <li>**76% accuracy** on LAMBADA (8% gain over previous SOTA)</li>
          </ul>
          <p className="text-slate-700 mb-4">
            While this is impressive without any examples, it's significantly
            below few-shot performance (58% aggregate accuracy).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Scaling Behavior
          </h2>
          <p className="text-slate-700 mb-4">
            Zero-shot performance improves steadily with model size, but the
            improvement is more gradual than for few-shot learning [Brown et
            al., 2020, p. 5]:
          </p>
          <p className="text-slate-700 mb-4">
            | Model Size | Zero-Shot Accuracy |
          </p>
          <p className="text-slate-700 mb-4">
            |------------|-------------------|
          </p>
          <p className="text-slate-700 mb-4">| 0.1B params | 23% |</p>
          <p className="text-slate-700 mb-4">| 1.3B params | 32% |</p>
          <p className="text-slate-700 mb-4">| 13B params | 41% |</p>
          <p className="text-slate-700 mb-4">| 175B params | 42% |</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Comparison to Human Performance
          </h2>
          <p className="text-slate-700 mb-4">
            Zero-shot is often closest to how humans actually perform tasks
            [Brown et al., 2020, p. 7]. For example, in translation, a human
            would likely know what to do from just the text instruction
            "Translate English to French" without needing examples.
          </p>
          <p className="text-slate-700 mb-4">
            This makes zero-shot an important target for future work and a
            fairer comparison to human performance than few-shot learning.
          </p>
          <hr className="my-6 border-slate-200" />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Cold Call Story
          </h2>
          <p className="text-slate-700 mb-4">
            Imagine you're an expert consultant who gets called into emergency
            situations.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Zero-Shot</strong>: You get a phone call: "We need you to
            optimize our database queries." Click. That's it. No context, no
            examples of what's wrong, no sample queries. You show up and have to
            figure out what "optimize" means in their context, what their
            performance goals are, and what kinds of queries they run - all from
            scratch.
          </p>
          <p className="text-slate-700 mb-4">
            Despite the challenge, because you're an expert (large model with
            extensive pre-training), you can often do a reasonable job. You've
            seen so many database systems that you can make educated guesses
            about common issues and solutions.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Few-Shot (for comparison)</strong>: Would be like arriving
            and seeing 10-20 examples of their slow queries and the desired
            performance metrics. Much easier.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Fine-Tuning (for comparison)</strong>: Would be like
            spending weeks embedded in their organization, studying thousands of
            their specific queries until you're hyper-specialized.
          </p>
          <p className="text-slate-700 mb-4">
            Zero-shot is the hardest, but also the most flexible and closest to
            how expert humans actually work - we often figure out what to do
            from just a task description, using our broad background knowledge.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Related Concepts
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>[Few-Shot Learning](/wiki/few-shot-learning)</li>
            <li>[In-Context Learning](/wiki/in-context-learning)</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
