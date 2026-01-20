import { useState } from 'react';
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "Retrieval-Augmented Generation (RAG)",
  description: "An approach that enables LLMs to answer questions over external knowledge sources by retrieving relevant information and incorporating it into the generation process.",
  category: "Techniques",
  difficulty: "Intermediate",
  tags: ["retrieval", "generation", "knowledge-bases"],
  relatedConcepts: ["query-focused-summarization", "knowledge-graph", "entity-extraction"],
  citations: [
    {
      paper: "From Local to Global: A GraphRAG Approach to Query-Focused Summarization",
      authors: "Edge, D., Trinh, H., et al.",
      year: "2024",
      pages: "1-2"
    },
    {
      paper: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      authors: "Lewis, P., Perez, E., et al.",
      year: "2020",
      pages: "1-3"
    }
  ]
};

export default function RetrievalAugmentedGeneration() {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            <strong>Retrieval-Augmented Generation (RAG)</strong> is an approach that enables large language models (LLMs) to answer questions over external knowledge sources by retrieving relevant information and incorporating it into the generation process [Edge et al., 2024, p. 1]. The system has access to a large external corpus of text records and retrieves a subset of records that are individually relevant to the query and collectively small enough to fit into the context window of the LLM [Edge et al., 2024, p. 1].
          </p>
          <p className="text-slate-700 mb-4">
            RAG combines the strengths of retrieval systems (access to large knowledge bases) with generative models (natural language generation capabilities). The query and retrieved records populate a prompt template, which is then passed to the LLM to generate the final answer [Edge et al., 2024, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-700 mb-4">The canonical RAG workflow consists of three stages:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Retrieval</strong>: Given a user query, the system retrieves relevant documents or text chunks from an external knowledge base</li>
            <li><strong>Context Augmentation</strong>: The retrieved information is added to the LLM's context window along with the original query</li>
            <li><strong>Generation</strong>: The LLM generates a response based on both the query and the retrieved context</li>
          </ol>
          <p className="text-slate-700 mb-4">
            RAG is ideal when the total number of records in a data source is too large to include in a single prompt to the LLM, meaning the amount of text in the data source exceeds the LLM's context window [Edge et al., 2024, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Vector RAG vs. Graph RAG</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Vector RAG (Conventional Approach)</h3>
          <p className="text-slate-700 mb-4">
            A common approach to conventional RAG uses <strong>text embeddings</strong>, retrieving records closest to the query in vector space where closeness corresponds to semantic similarity [Edge et al., 2024, p. 2]. This approach works well for <strong>local queries</strong> that can be answered with information localized within a small set of records.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Limitations of Vector RAG</h3>
          <p className="text-slate-700 mb-4">
            However, vector RAG approaches do not support <strong>sensemaking queries</strong>, meaning queries that require global understanding of the entire dataset, such as "What are the key trends in how scientific discoveries are influenced by interdisciplinary research over the past decade?" [Edge et al., 2024, p. 2].
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">GraphRAG Extension</h3>
          <p className="text-slate-700 mb-4">
            GraphRAG contrasts with vector RAG in its ability to answer queries that require global sensemaking over the entire data corpus [Edge et al., 2024, p. 2]. It uses a knowledge graph index and community summaries to enable comprehensive understanding of corpus-wide themes and patterns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Library Analogy</h2>
          <p className="text-slate-700 mb-4">
            Think of RAG like having a research assistant in a vast library. You ask a question, and instead of the assistant trying to recall everything from memory (which would be impossible for millions of books), they:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Search the catalog</strong> to find the most relevant books and passages</li>
            <li><strong>Pull those specific sections</strong> from the shelves</li>
            <li><strong>Read and synthesize</strong> the information to answer your question</li>
          </ol>
          <p className="text-slate-700 mb-4">
            The assistant (LLM) has strong comprehension and synthesis abilities, but limited memory. The library (external knowledge base) has vast information storage, but no understanding. Together, they create a powerful question-answering system.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Vector RAG</strong> is like having an assistant who can only answer "Where can I find information about X?" questions - they excel at finding specific passages but struggle with questions like "What are the major themes across all history books?"
          </p>
          <p className="text-slate-700 mb-4">
            <strong>GraphRAG</strong> is like having an assistant who has first read through the entire library, created a detailed map of how all the books and concepts relate to each other, and written summaries of major topic areas - enabling them to answer both specific and broad, thematic questions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Applications</h2>
          <p className="text-slate-700 mb-4">RAG systems are particularly valuable for:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Question answering</strong> over private document collections</li>
            <li><strong>Enterprise knowledge management</strong> where information changes frequently</li>
            <li><strong>Research assistance</strong> across large corpora of papers and documents</li>
            <li><strong>Customer support</strong> using company-specific documentation</li>
            <li><strong>Legal and medical domains</strong> requiring up-to-date, specialized knowledge</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Exercise: Design a RAG System</h2>
          <p className="text-slate-700 mb-4">
            Imagine you need to build a RAG system to answer questions about your company's internal documentation (500,000 pages).
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Question:</strong> Which type of queries would work well with vector RAG, and which would need GraphRAG? Categorize these questions:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>"What is our vacation policy?"</li>
            <li>"What are the major themes in employee feedback from the past year?"</li>
            <li>"How do I reset my password?"</li>
            <li>"What strategic priorities emerge from analyzing all department plans?"</li>
          </ul>

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>

          {showAnswer && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg animate-fadeIn">
              <p className="text-slate-700 mb-3"><strong>Vector RAG works well for:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
                <li>"What is our vacation policy?" - Specific factual retrieval from localized information</li>
                <li>"How do I reset my password?" - Clear, narrow query with direct answer in documentation</li>
              </ul>
              <p className="text-slate-700 mb-3"><strong>GraphRAG needed for:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
                <li>"What are the major themes in employee feedback from the past year?" - Requires global understanding across many documents</li>
                <li>"What strategic priorities emerge from analyzing all department plans?" - Needs to synthesize information across the entire corpus to identify patterns</li>
              </ul>
            </div>
          )}
        </section>
      </div>
    </WikiLayout>
  );
}
