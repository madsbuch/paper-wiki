import { useState } from 'react';
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "Global Sensemaking",
  description: "Understanding themes, trends, and patterns across an entire corpus rather than within localized passages, requiring reasoning over connections and relationships.",
  category: "Information Retrieval",
  difficulty: "Intermediate",
  tags: ["sensemaking", "query-focused-summarization", "information-retrieval"],
  relatedConcepts: ["query-focused-summarization", "knowledge-graph", "retrieval-augmented-generation"],
  citations: [
    {
      paper: "From Local to Global: A GraphRAG Approach to Query-Focused Summarization",
      authors: "Edge, D., Trinh, H., et al.",
      year: "2024",
      pages: "1-2"
    }
  ]
};

export default function GlobalSensemaking() {
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const questions = [
    { type: "local", text: "What is the population of Paris?", reason: "Specific fact, localized answer" },
    { type: "global", text: "What are the main themes in climate policy discussions this decade?", reason: "Requires understanding patterns across entire corpus" },
    { type: "local", text: "Who won the 2020 US presidential election?", reason: "Specific factual retrieval" },
    { type: "global", text: "How has AI safety research evolved over the past 5 years?", reason: "Needs synthesis of trends across many papers" },
  ];

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Definition</h2>
          <p className="text-slate-700 mb-4">
            <strong>Sensemaking</strong> is the process of understanding and making meaning from complex information by identifying patterns, connections, and significance [Edge et al., 2024, p. 2]. In the context of document analysis, <strong>global sensemaking</strong> refers to understanding themes, trends, and patterns across an <em>entire corpus</em> rather than within localized passages.
          </p>
          <p className="text-slate-700 mb-4">
            Sensemaking tasks require reasoning over "connections (which can be among people, places, and events) in order to anticipate their trajectories and act effectively" [Klein et al., 2006, as cited in Edge et al., 2024, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Local vs. Global Questions</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Local Questions</h3>
          <p className="text-slate-700 mb-4">
            <strong>Local questions</strong> can be answered with information localized within a small set of records. Vector RAG excels at these:
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-slate-700 mb-2"><strong>Examples:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
              <li>"What is the capital of France?"</li>
              <li>"Who invented the transistor?"</li>
              <li>"What are the side effects of aspirin?"</li>
              <li>"When was the Transformer architecture introduced?"</li>
            </ul>
            <p className="text-blue-700 text-sm mt-3">
              ✓ Answers exist in specific, identifiable passages
            </p>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Global Sensemaking Questions</h3>
          <p className="text-slate-700 mb-4">
            <strong>Global questions</strong> require understanding of the entire dataset. They ask about themes, patterns, and high-level summaries that emerge from synthesizing information across the whole corpus:
          </p>
          <div className="bg-violet-100 p-4 rounded-lg mb-4">
            <p className="text-slate-700 mb-2"><strong>Examples:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
              <li>"What are the main themes in the dataset?" [Edge et al., 2024, p. 1]</li>
              <li>"What are the key trends in how scientific discoveries are influenced by interdisciplinary research over the past decade?" [Edge et al., 2024, p. 2]</li>
              <li>"What strategic priorities emerge from analyzing all department plans?"</li>
              <li>"How do tech leaders view the role of policy and regulation?" [Edge et al., 2024, p. 7]</li>
            </ul>
            <p className="text-violet-700 text-sm mt-3">
              ⚠ Requires synthesis across entire corpus - vector RAG fails
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Vector RAG Fails at Sensemaking</h2>
          <p className="text-slate-700 mb-4">
            Vector RAG approaches retrieve a small set of passages most similar to the query. This works for local questions but fails for sensemaking because:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Missing the forest for the trees</strong>: You might get relevant passages but miss the overall pattern</li>
            <li><strong>Incomplete coverage</strong>: Themes and trends emerge from many documents, not just top-k similar ones</li>
            <li><strong>No synthesis mechanism</strong>: Retrieved passages aren't organized to reveal corpus-level patterns</li>
            <li><strong>Context window limits</strong>: Can't fit enough passages to capture global understanding</li>
          </ol>
          <p className="text-slate-700 mb-4">
            However, vector RAG approaches do not support sensemaking queries, meaning queries that require global understanding of the entire dataset [Edge et al., 2024, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">GraphRAG's Approach to Global Sensemaking</h2>
          <p className="text-slate-700 mb-4">
            GraphRAG enables global sensemaking through a multi-stage process:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-slate-100 p-4 rounded-lg">
              <p className="text-slate-900 font-bold mb-2">1. Knowledge Graph Construction</p>
              <p className="text-slate-700 text-sm">Extract entities and relationships from the entire corpus, building a structured representation of all information</p>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              <p className="text-slate-900 font-bold mb-2">2. Community Detection</p>
              <p className="text-slate-700 text-sm">Partition the graph hierarchically into thematic communities using Leiden algorithm</p>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              <p className="text-slate-900 font-bold mb-2">3. Community Summarization</p>
              <p className="text-slate-700 text-sm">Generate summaries for each community at multiple levels - these capture themes across related entities</p>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              <p className="text-slate-900 font-bold mb-2">4. Map-Reduce Query Answering</p>
              <p className="text-slate-700 text-sm">Use community summaries to generate partial answers (map), then combine into comprehensive global answer (reduce)</p>
            </div>
          </div>

          <p className="text-slate-700 mb-4">
            Together, these community summaries provide global descriptions and insights over the corpus [Edge et al., 2024, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Intelligence Analyst Analogy</h2>
          <p className="text-slate-700 mb-4">
            Imagine you're an intelligence analyst trying to answer: "What are the major geopolitical trends in the Middle East this year?"
          </p>

          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <p className="text-slate-700 font-semibold mb-2">❌ Local Search Approach (Vector RAG)</p>
            <p className="text-slate-700 mb-3">
              Search for documents containing "geopolitical trends Middle East", retrieve the top 10 most similar reports, and try to answer from those alone.
            </p>
            <p className="text-red-700 text-sm">
              <strong>Problem:</strong> You might get 10 reports about oil prices but miss major developments in diplomacy, conflicts, trade relationships, and regional alliances that are spread across hundreds of other reports.
            </p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg mb-4">
            <p className="text-slate-700 font-semibold mb-2">✓ Global Sensemaking Approach (GraphRAG)</p>
            <p className="text-slate-700 mb-3">First, build a knowledge graph:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-3">
              <li><strong>Extract entities</strong>: Countries, leaders, organizations, events, policies</li>
              <li><strong>Map relationships</strong>: Trade agreements, conflicts, alliances, diplomatic ties</li>
              <li><strong>Identify communities</strong>: Oil sector cluster, Syria conflict cluster, Iran nuclear cluster, Saudi-Israel normalization cluster, etc.</li>
              <li><strong>Summarize each cluster</strong>: Generate comprehensive summaries of what's happening in each thematic area</li>
              <li><strong>Synthesize</strong>: When the query comes in, pull relevant summaries and combine them into a comprehensive answer covering ALL major trends</li>
            </ol>
            <p className="text-green-700 text-sm">
              <strong>Result:</strong> A truly global answer that identifies patterns across the entire intelligence corpus, not just a sample of reports.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Performance on Sensemaking Tasks</h2>
          <p className="text-slate-700 mb-4">
            GraphRAG was evaluated on global sensemaking questions over datasets in the ~1 million token range, showing substantial improvements over vector RAG [Edge et al., 2024, p. 1]:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Comprehensiveness</strong>: 72-83% win rate (more complete coverage of all aspects)</li>
            <li><strong>Diversity</strong>: 62-82% win rate (more varied perspectives and insights)</li>
            <li><strong>Empowerment</strong>: Mixed results (helping users make informed judgments)</li>
            <li><strong>Directness</strong>: Vector RAG wins (more concise, as expected for the tradeoff)</li>
          </ul>
          <p className="text-slate-700 mb-4">
            The results demonstrate that GraphRAG successfully enables sensemaking over entire text corpora - a task that was previously out of reach for RAG systems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Try It: Identify Sensemaking Questions</h2>
          <p className="text-slate-700 mb-4">
            For each question below, determine if it's a local question (specific fact retrieval) or a global sensemaking question:
          </p>

          <div className="space-y-3 mb-4">
            {questions.map((q, i) => (
              <div key={i} className="bg-slate-100 p-4 rounded-lg">
                <p className="text-slate-700 mb-3">"{q.text}"</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedQuestion(`${i}-local`)}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      selectedQuestion === `${i}-local`
                        ? q.type === 'local'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
                    }`}
                  >
                    Local
                  </button>
                  <button
                    onClick={() => setSelectedQuestion(`${i}-global`)}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      selectedQuestion === `${i}-global`
                        ? q.type === 'global'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
                    }`}
                  >
                    Global
                  </button>
                </div>
                {selectedQuestion === `${i}-${q.type}` && (
                  <p className="text-green-700 text-sm mt-2 animate-fadeIn">
                    ✓ Correct! {q.reason}
                  </p>
                )}
                {selectedQuestion && selectedQuestion.startsWith(`${i}-`) && selectedQuestion !== `${i}-${q.type}` && (
                  <p className="text-red-700 text-sm mt-2 animate-fadeIn">
                    ✗ Not quite. {q.reason}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Applications of Global Sensemaking</h2>
          <p className="text-slate-700 mb-4">
            Global sensemaking is valuable for many real-world applications:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Intelligence analysis</strong>: Identifying patterns and trends across large volumes of reports [Edge et al., 2024, p. 2]</li>
            <li><strong>Scientific discovery</strong>: Understanding how research themes evolve and interconnect [Edge et al., 2024, p. 2]</li>
            <li><strong>Business intelligence</strong>: Extracting strategic insights from market research and customer feedback</li>
            <li><strong>Legal discovery</strong>: Understanding overarching narratives in large document collections</li>
            <li><strong>Policy analysis</strong>: Identifying common themes and priorities across government documents</li>
            <li><strong>News analysis</strong>: Understanding media coverage patterns and emerging narratives</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Independent Exploration</h2>
          <p className="text-slate-700 mb-4">
            Community summaries can be used independently as a way to understand the global structure and semantics of a dataset, even without a specific query [Edge et al., 2024, p. 6]:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Scan through community summaries at one level looking for general themes of interest</li>
            <li>Read linked reports at a lower level that provide additional details for each subtopic</li>
            <li>Navigate the hierarchical structure to explore from broad themes to specific details</li>
          </ul>
          <p className="text-slate-700 mb-4">
            This exploratory sensemaking enables users to discover insights they might not have known to ask about explicitly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Key Insight</h2>
          <p className="text-slate-700 mb-4">
            Global sensemaking is fundamentally different from information retrieval:
          </p>
          <div className="bg-violet-100 p-4 rounded-lg">
            <p className="text-slate-900 font-bold mb-2">Retrieval asks:</p>
            <p className="text-slate-700 mb-4">"Which specific passages are most relevant to my query?"</p>

            <p className="text-slate-900 font-bold mb-2">Sensemaking asks:</p>
            <p className="text-slate-700">"What patterns, themes, and insights emerge when I consider the entire corpus?"</p>
          </div>
          <p className="text-slate-700 mt-4">
            GraphRAG bridges this gap by pre-computing thematic organization (via community detection) and hierarchical summaries, enabling efficient global sensemaking at query time.
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
