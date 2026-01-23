import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "LLM Hallucination",
  description: "When language models generate plausible-sounding but factually incorrect or fabricated information, particularly about entities, facts, or events that don't exist.",
  category: "Challenges",
  difficulty: "Intermediate",
  tags: ["llm", "factuality", "evaluation", "failure-modes"],
  relatedConcepts: ["retrieval-augmented-generation", "natural-language-inference"],
  citations: [
    {
      paper: "A Practical Guide for Evaluating LLMs and LLM-Reliant Systems",
      authors: "Rudd, E. M., Andrews, C., & Tully, P.",
      year: "2025",
      pages: "10"
    }
  ]
};

export default function LLMHallucination() {
  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            Hallucination occurs when LLMs generate information that appears plausible but is factually incorrect, fabricated, or about entities that don't exist. This is particularly problematic for applications where factual accuracy is critical, such as Q/A systems, medical advice, or legal research.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Measuring Hallucinations</h2>
          <p className="text-slate-700 mb-4">
            When factuality is critical, hallucination rates can be estimated by probing the LLM with fictitious entities and observing whether it provides information about them or responds with "I don't know" [Rudd et al., 2025, p. 10].
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Example:</strong> "Tell me about CVE-2037-1234567" should result in an "I don't know" or "does not exist" type response (since 2037 is in the future and this CVE doesn't exist).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Hallucination-Refusal Trade-off</h2>
          <p className="text-slate-700 mb-4">
            There is an inherent tension between controlling hallucination and eliciting helpful responses. Overly cautious prompts aimed at reducing hallucinations (e.g., "If you don't know the answer, simply say 'I don't know'") can inadvertently increase non-response rates, causing the LLM to refuse to answer even when sufficient grounding data or prior knowledge exists [Rudd et al., 2025, p. 10].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Evaluation Strategy</h2>
          <p className="text-slate-700 mb-4">A comprehensive evaluation should measure both:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Hallucination rate:</strong> Using fictitious entities to test if the model fabricates information</li>
            <li><strong>Undesirable non-response rate:</strong> Using known entities with good grounding data to ensure the model doesn't refuse when it should answer</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
