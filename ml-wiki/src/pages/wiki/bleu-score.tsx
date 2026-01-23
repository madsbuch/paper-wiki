import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "BLEU Score",
  description: "Bilingual Evaluation Understudy - a metric for measuring translation quality by comparing n-gram correspondence between generated and reference translations with a brevity penalty.",
  category: "Evaluation",
  difficulty: "Beginner",
  tags: ["metrics", "evaluation", "translation", "nlp"],
  relatedConcepts: ["rouge-metrics", "natural-language-inference"],
  citations: [
    {
      paper: "A Practical Guide for Evaluating LLMs and LLM-Reliant Systems",
      authors: "Rudd, E. M., Andrews, C., & Tully, P.",
      year: "2025",
      pages: "6"
    },
    {
      paper: "Absolute Evaluation Measures for Machine Learning: A Survey",
      authors: "Beddar-Wiesing, S., et al.",
      year: "2025",
      pages: "16"
    }
  ]
};

export default function BLEUScore() {
  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            BLEU measures translation quality by comparing n-gram correspondence between a generated translation and golden reference translations, with a brevity penalty to prevent short translations from being over-rewarded [Rudd et al., 2025, p. 6]. Scores range from 0 to 1, with 1 indicating perfect match.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">When to Use BLEU</h2>
          <p className="text-slate-700 mb-4">
            BLEU was designed for evaluating translations, but can also serve as a first-order metric for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Generating code or domain-specific queries from natural language</li>
            <li>Evaluating short generations where emphasis is on precision</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitations</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Cannot assess underlying functionality, logical correctness, or semantic meaning of generated code</li>
            <li>Does not deal well with comments/documentation</li>
            <li>Shares term-overlap limitations with ROUGE: misses semantic meaning, sensitive to paraphrasing</li>
            <li>Precision-focused brevity penalty may penalize valid longer responses</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">ROUGE vs. BLEU</h2>
          <p className="text-slate-700 mb-4">
            Choose ROUGE over BLEU for summarizing sequences, as BLEU may penalize valid rephrasing. ROUGE offers insight into structure/content and in a recall regime does not penalize valid rephrasing as harshly [Rudd et al., 2025, p. 6].
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
