import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "Natural Language Inference (NLI)",
  description: "A task and evaluation approach that determines the logical relationship between two text statements: whether one entails, contradicts, or is neutral to the other.",
  category: "Evaluation",
  difficulty: "Intermediate",
  tags: ["nli", "entailment", "evaluation", "factuality"],
  relatedConcepts: ["rouge-metrics", "bleu-score", "llm-hallucination"],
  citations: [
    {
      paper: "A Practical Guide for Evaluating LLMs and LLM-Reliant Systems",
      authors: "Rudd, E. M., Andrews, C., & Tully, P.",
      year: "2025",
      pages: "7"
    }
  ]
};

export default function NaturalLanguageInference() {
  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            Natural Language Inference (NLI), also known as entailment, uses ML models to determine the relationship between two statements: a premise (A) and a hypothesis (B). NLI assesses if B logically follows from A (entailment), if A and B are unrelated (neutral), or if B contradicts A (contradiction) [Rudd et al., 2025, p. 7].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Evaluation Use Case</h2>
          <p className="text-slate-700 mb-4">
            NLI is particularly valuable for evaluating factuality by checking if a generated statement aligns with known facts. For example:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Premise (ground truth):</strong> "The Apollo 11 mission landed astronauts on the Moon"</li>
            <li><strong>Hypothesis A:</strong> "Apollo 11 landed on Mars" → <strong>Contradiction</strong></li>
            <li><strong>Hypothesis B:</strong> "Astronauts visited the lunar surface" → <strong>Entailment</strong></li>
            <li><strong>Hypothesis C:</strong> "This led to advances in airline safety" → <strong>Neutral</strong></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Implementation</h2>
          <p className="text-slate-700 mb-4">
            To implement NLI for evaluation, a language model is fine-tuned on an entailment dataset to generate entailment scores. The model can incorporate additional context to guide evaluation toward specific aspects like factual consistency or fluency [Rudd et al., 2025, p. 7].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Advantages Over Term Overlap Metrics</h2>
          <p className="text-slate-700 mb-4">
            Unlike ROUGE or BLEU, NLI can detect factual errors even when there is high word overlap, and can recognize semantic equivalence even when wording differs significantly. This makes it a powerful tool for evaluating factuality beyond surface-level text matching.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitations</h2>
          <p className="text-slate-700 mb-4">
            As with all model-derived metrics, the quality of an entailment metric depends on the quality of the model used - the model must appropriately capture the syntax and semantics of both the premise and hypothesis [Rudd et al., 2025, p. 7].
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
