import { useState } from 'react';
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "ROUGE Metrics",
  description: "Recall-Oriented Understudy for Gisting Evaluation - a set of metrics for assessing the quality of automatically generated summaries by comparing overlapping units of text.",
  category: "Evaluation",
  difficulty: "Beginner",
  tags: ["metrics", "evaluation", "summarization", "nlp"],
  relatedConcepts: ["bleu-score", "natural-language-inference"],
  citations: [
    {
      paper: "A Practical Guide for Evaluating LLMs and LLM-Reliant Systems",
      authors: "Rudd, E. M., Andrews, C., & Tully, P.",
      year: "2025",
      pages: "5-6"
    },
    {
      paper: "Absolute Evaluation Measures for Machine Learning: A Survey",
      authors: "Beddar-Wiesing, S., et al.",
      year: "2025",
      pages: "16"
    },
    {
      paper: "ROUGE: A Package for Automatic Evaluation of Summaries",
      authors: "Lin, C.",
      year: "2004",
      pages: "74-81"
    }
  ]
};

export default function ROUGEMetrics() {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            <strong>ROUGE (Recall-Oriented Understudy for Gisting Evaluation)</strong> is a set of metrics which assesses the quality of automatically generated summaries by comparing overlapping units of text between a generated summary and human-written reference summaries [Rudd et al., 2025, p. 5].
          </p>
          <p className="text-slate-700 mb-4">
            ROUGE compares various text units including words, phrases, n-grams (ROUGE-n), longest common subsequence (ROUGE-L), and skip-bigrams (ROUGE-S). Scores range from 0 to 1, with higher scores indicating better alignment with reference summaries [Rudd et al., 2025, p. 5].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">ROUGE Variants</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>ROUGE-N:</strong> Measures overlap of n-grams (e.g., ROUGE-1 for unigrams, ROUGE-2 for bigrams)</li>
            <li><strong>ROUGE-L:</strong> Based on longest common subsequence, capturing sentence-level structure</li>
            <li><strong>ROUGE-S:</strong> Uses skip-bigrams, allowing for gaps in matching sequences</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Precision, Recall, and F-Measure</h2>
          <p className="text-slate-700 mb-4">
            ROUGE can be computed based on different criteria:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Recall-based ROUGE:</strong> Emphasizes capturing relevant information from the reference, but may not penalize summaries for being too long</li>
            <li><strong>Precision-based ROUGE:</strong> Favors concise summaries, even if they miss some relevant details</li>
            <li><strong>F<sub>β</sub>-Measure:</strong> Weights respective contributions between precision and recall according to β</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">When to Use ROUGE</h2>
          <p className="text-slate-700 mb-4">
            ROUGE scores are particularly useful for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Summarization tasks:</strong> When an LLM is tasked with summarizing reports, logs, or briefs into shorter/different versions with golden samples of specific length and style containing specific meaningful terms [Rudd et al., 2025, p. 5]</li>
            <li><strong>Question answering:</strong> When the golden response contains multiple key terms and phrases that are considered mandatory for a "good" response [Rudd et al., 2025, p. 5]</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitations</h2>
          <p className="text-slate-700 mb-4">
            ROUGE has significant limitations that practitioners should be aware of:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Surface-level similarity:</strong> Captures only word/phrase overlap, missing deeper semantic meaning and context [Rudd et al., 2025, p. 5-6]</li>
            <li><strong>Syntax over substance:</strong> High scores can be achieved through syntactic term overlap rather than underlying semantics, limiting utility for evaluating Q/A and generation tasks requiring semantic accuracy [Rudd et al., 2025, p. 6]</li>
            <li><strong>Paraphrasing sensitivity:</strong> Factually correct paraphrases may receive lower scores than factually incorrect responses that share more n-grams with the reference [Rudd et al., 2025, p. 6]</li>
            <li><strong>Cannot assess factuality, fluency, or structure:</strong> Does not evaluate whether information is accurate, well-written, or logically organized [Rudd et al., 2025, p. 4]</li>
            <li><strong>Sensitive to length and repetition:</strong> Can be gamed by adjusting output length or repeating key phrases [Rudd et al., 2025, p. 4]</li>
          </ul>
          <p className="text-slate-700 mb-4">
            <em>Best practice:</em> Compute ROUGE metrics over multiple diverse, well-written ground truth examples capturing the same semantics for each LLM response [Rudd et al., 2025, p. 4].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Recipe Analogy</h2>
          <p className="text-slate-700 mb-4">
            Imagine you're comparing two recipes for chocolate chip cookies. ROUGE is like counting how many ingredients match between your recipe and the "perfect" reference recipe.
          </p>
          <p className="text-slate-700 mb-4">
            Your recipe says: "Mix butter, sugar, eggs, flour, and chocolate chips. Bake at 350°F."
          </p>
          <p className="text-slate-700 mb-4">
            Reference recipe says: "Combine butter, brown sugar, eggs, all-purpose flour, and chocolate chips. Bake at 375°F."
          </p>
          <p className="text-slate-700 mb-4">
            ROUGE would give you credit for matching ingredients: butter ✓, sugar ✓, eggs ✓, flour ✓, chocolate chips ✓. High score!
          </p>
          <p className="text-slate-700 mb-4">
            But here's the problem: What if your recipe said "Mix butter, sugar, eggs, flour, and chocolate chips. Bake at 900°F for 5 minutes"? ROUGE would still give you a high score because the <em>words</em> match, even though 900°F would burn the cookies to a crisp! This is the "syntax over substance" limitation - ROUGE can't tell if the recipe will actually work, only if the words match.
          </p>
          <p className="text-slate-700 mb-4">
            Similarly, if your recipe said "Cream together fat from milk, sweetener, poultry ovum, ground grain, and cacao pieces," ROUGE would score it terribly even though it's describing the exact same ingredients - just with different words (paraphrasing).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Exercise: Understanding ROUGE Scores</h2>
          <p className="text-slate-700 mb-4">
            Consider this golden reference: "The Apollo 11 mission landed astronauts Neil Armstrong and Buzz Aldrin on the Moon."
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Question:</strong> Which candidate would receive a higher ROUGE score?
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Candidate A (Factually incorrect):</strong> "The Apollo 11 mission landed astronauts Neil Armstrong and Buzz Aldrin on Mars."</li>
            <li><strong>Candidate B (Correct paraphrase):</strong> "Apollo 11 successfully put Armstrong and Aldrin on the lunar surface."</li>
          </ul>

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>

          {showAnswer && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg animate-fadeIn">
              <p className="text-slate-700 mb-3">
                <strong>Candidate A would score higher!</strong> This demonstrates ROUGE's key limitation.
              </p>
              <p className="text-slate-700 mb-3">
                Candidate A shares most n-grams with the reference: "Apollo 11 mission", "landed astronauts", "Neil Armstrong and Buzz Aldrin". Only "Mars" differs from "Moon". This gives it a deceptively high ROUGE score despite being factually incorrect.
              </p>
              <p className="text-slate-700 mb-3">
                Candidate B is factually correct but uses synonyms: "put" instead of "landed", "lunar surface" instead of "Moon". It would receive a lower ROUGE score because fewer exact n-grams match.
              </p>
              <p className="text-slate-700">
                This is why ROUGE should be combined with other metrics like NLI/entailment or LLM autoraters that can assess semantic meaning and factual accuracy.
              </p>
            </div>
          )}
        </section>
      </div>
    </WikiLayout>
  );
}
