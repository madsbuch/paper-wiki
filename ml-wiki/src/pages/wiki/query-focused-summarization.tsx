import { useState } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function QueryFocusedSummarization() {
  const [selectedConcept, setSelectedConcept] = useState("");

  const meta = {
    title: "Query-Focused Summarization",
    citations: [
      {
        paper: "From Local to Global: A GraphRAG Approach to Query-Focused Summarization",
        authors: "Edge, D., Trinh, H., et al.",
        year: "2024",
        pages: "1-2, 6"
      }
    ]
  };

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Definition</h2>
          <p className="text-slate-700 mb-4">
            <strong>Query-Focused Summarization (QFS)</strong> is the task of generating a summary of a document or corpus that specifically addresses a given query or question [Edge et al., 2024, p. 1]. Unlike generic summarization which extracts main points regardless of context, QFS tailors the summary to be relevant to the user's information need.
          </p>
          <p className="text-slate-700 mb-4">
            When vector RAG fails on global questions directed at an entire text corpus (such as "What are the main themes in the dataset?"), this is fundamentally a QFS task rather than an explicit retrieval task [Edge et al., 2024, p. 1].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Challenge for RAG Systems</h2>
          <p className="text-slate-700 mb-4">
            Traditional vector RAG systems excel at <strong>local queries</strong> where relevant information is localized within a small set of records. However, they struggle with <strong>global sensemaking questions</strong> that require understanding themes and patterns across an entire corpus [Edge et al., 2024, p. 2].
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Local vs. Global Questions</h3>
          <div className="bg-slate-100 p-4 rounded-lg mb-4">
            <p className="text-slate-700 font-semibold mb-2">Local Question (Vector RAG works well):</p>
            <p className="text-slate-700 mb-4">"What is the capital of France?"</p>
            <p className="text-slate-600 text-sm">→ Answer found in specific, localized passages</p>
          </div>

          <div className="bg-violet-100 p-4 rounded-lg mb-4">
            <p className="text-slate-700 font-semibold mb-2">Global Question (Needs QFS):</p>
            <p className="text-slate-700 mb-4">"What are the key trends in how scientific discoveries are influenced by interdisciplinary research over the past decade?"</p>
            <p className="text-violet-700 text-sm">→ Requires synthesizing information from across the entire corpus</p>
          </div>

          <p className="text-slate-700 mb-4">
            Prior QFS methods do not scale to the quantities of text indexed by typical RAG systems [Edge et al., 2024, p. 1]. GraphRAG addresses this by combining graph-based indexing with hierarchical query-focused summarization.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Map-Reduce Approach in GraphRAG</h2>
          <p className="text-slate-700 mb-4">
            GraphRAG answers global queries through <strong>map-reduce processing</strong> of community summaries [Edge et al., 2024, p. 2]:
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Map Step: Generate Community Answers</h3>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Prepare summaries</strong>: Community summaries are randomly shuffled and divided into chunks of pre-specified token size to ensure relevant information is distributed</li>
            <li><strong>Generate intermediate answers</strong>: The LLM generates partial answers for each chunk in parallel</li>
            <li><strong>Score helpfulness</strong>: The LLM generates a score (0-100) indicating how helpful each answer is for the target question</li>
            <li><strong>Filter irrelevant answers</strong>: Answers with score 0 are filtered out [Edge et al., 2024, p. 6]</li>
          </ol>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Reduce Step: Generate Global Answer</h3>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Sort by helpfulness</strong>: Intermediate community answers are sorted in descending order of helpfulness score</li>
            <li><strong>Fill context window</strong>: Answers are iteratively added to a new context window until the token limit is reached</li>
            <li><strong>Generate final answer</strong>: This final context is used to generate the global answer returned to the user [Edge et al., 2024, p. 6]</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Hierarchical Community Levels</h2>
          <p className="text-slate-700 mb-4">
            The hierarchical nature of the community structure means questions can be answered using community summaries from different levels, offering different balances of summary detail and scope [Edge et al., 2024, p. 6].
          </p>
          <div className="bg-slate-100 p-4 rounded-lg mb-4">
            <p className="text-slate-700 font-semibold mb-3">Which level to use?</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
              <li><strong>C0 (Root level)</strong>: Broadest themes, fewest summaries, fastest/cheapest queries</li>
              <li><strong>C1-C2 (Intermediate)</strong>: Balance of detail and breadth</li>
              <li><strong>C3 (Low level)</strong>: Most detailed, greatest number of summaries, more comprehensive</li>
            </ul>
          </div>
          <p className="text-slate-700 mb-4">
            GraphRAG experiments showed that intermediate-level (C2) and low-level (C3) community summaries achieved the best balance of comprehensiveness and cost [Edge et al., 2024, p. 9-10].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The News Reporter Analogy</h2>
          <p className="text-slate-700 mb-4">
            Imagine you're a news editor and someone asks: "What are the major themes in climate policy this year?"
          </p>

          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <p className="text-slate-700 font-semibold mb-2">❌ Bad Approach (Vector RAG)</p>
            <p className="text-slate-700">
              Search for articles mentioning "climate policy", grab the top 10 most relevant articles, and try to answer based on those 10 articles alone.
            </p>
            <p className="text-red-700 text-sm mt-2">
              Problem: You might miss major themes that are widely distributed across hundreds of articles.
            </p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg mb-4">
            <p className="text-slate-700 font-semibold mb-2">✓ Good Approach (GraphRAG + QFS)</p>
            <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700">
              <li><strong>First</strong>, organize all year's articles into thematic groups (climate finance, renewable energy, emissions targets, etc.)</li>
              <li><strong>Second</strong>, write brief summaries of each theme</li>
              <li><strong>Third</strong>, when the question comes in, ask each theme summarizer: "Does your theme relate to this question?"</li>
              <li><strong>Fourth</strong>, collect all relevant theme summaries and synthesize them into a final comprehensive answer</li>
            </ol>
            <p className="text-green-700 text-sm mt-2">
              Result: A truly comprehensive answer drawing from corpus-wide patterns, not just a few cherry-picked articles.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Performance Gains</h2>
          <p className="text-slate-700 mb-4">
            GraphRAG's QFS approach showed substantial improvements over vector RAG baselines:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Comprehensiveness</strong>: 72-83% win rate (how much detail does the answer provide?)</li>
            <li><strong>Diversity</strong>: 62-82% win rate (how varied and rich are the perspectives?)</li>
            <li><strong>Empowerment</strong>: Mixed results (ability to help users make informed judgments)</li>
            <li><strong>Directness</strong>: Vector RAG wins (conciseness, as expected for the tradeoff) [Edge et al., 2024, p. 9]</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Exercise: Identify the Right Approach</h2>
          <p className="text-slate-700 mb-4">
            For each question, select whether it's better suited for Local Retrieval (Vector RAG) or Query-Focused Summarization (GraphRAG):
          </p>

          <div className="space-y-3 mb-4">
            <div className="bg-slate-100 p-4 rounded-lg">
              <p className="text-slate-700 font-semibold mb-2">Question 1:</p>
              <p className="text-slate-700 mb-3">"What is the melting point of aluminum?"</p>
              <select
                className="w-full p-2 border-2 border-slate-300 rounded-lg"
                value={selectedConcept === "q1" ? "local" : ""}
                onChange={(e) => e.target.value && setSelectedConcept("q1")}
              >
                <option value="">Select answer...</option>
                <option value="local">Local Retrieval (Vector RAG)</option>
                <option value="global">Query-Focused Summarization (GraphRAG)</option>
              </select>
              {selectedConcept === "q1" && (
                <p className="text-green-700 text-sm mt-2 animate-fadeIn">
                  ✓ Correct! This is a factual lookup - perfect for local retrieval.
                </p>
              )}
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              <p className="text-slate-700 font-semibold mb-2">Question 2:</p>
              <p className="text-slate-700 mb-3">"What are the emerging trends in AI safety research based on this corpus of 500 papers?"</p>
              <select
                className="w-full p-2 border-2 border-slate-300 rounded-lg"
                value={selectedConcept === "q2" ? "global" : ""}
                onChange={(e) => e.target.value && setSelectedConcept("q2")}
              >
                <option value="">Select answer...</option>
                <option value="local">Local Retrieval (Vector RAG)</option>
                <option value="global">Query-Focused Summarization (GraphRAG)</option>
              </select>
              {selectedConcept === "q2" && (
                <p className="text-green-700 text-sm mt-2 animate-fadeIn">
                  ✓ Correct! This requires understanding themes across the entire corpus - perfect for QFS with GraphRAG.
                </p>
              )}
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              <p className="text-slate-700 font-semibold mb-2">Question 3:</p>
              <p className="text-slate-700 mb-3">"Which episodes of the podcast discuss privacy laws?"</p>
              <select
                className="w-full p-2 border-2 border-slate-300 rounded-lg"
                value={selectedConcept === "q3" ? "local" : ""}
                onChange={(e) => e.target.value && setSelectedConcept("q3")}
              >
                <option value="">Select answer...</option>
                <option value="local">Local Retrieval (Vector RAG)</option>
                <option value="global">Query-Focused Summarization (GraphRAG)</option>
              </select>
              {selectedConcept === "q3" && (
                <p className="text-green-700 text-sm mt-2 animate-fadeIn">
                  ✓ Correct! Finding specific episodes is local retrieval.
                </p>
              )}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Takeaway</h2>
          <p className="text-slate-700 mb-4">
            Query-Focused Summarization bridges the gap between traditional summarization and retrieval. By combining graph-based indexing with hierarchical community summaries and map-reduce processing, GraphRAG enables QFS at scale - answering global sensemaking questions over large corpora that were previously out of reach for RAG systems.
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
