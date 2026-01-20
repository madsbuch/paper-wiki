import { useState } from 'react';
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "Community Detection",
  description: "The process of identifying groups of nodes in a graph that are more densely connected to each other than to nodes outside the group.",
  category: "Graph Algorithms",
  difficulty: "Intermediate",
  tags: ["graph-theory", "clustering", "modularity"],
  relatedConcepts: ["knowledge-graph", "global-sensemaking"],
  citations: [
    {
      paper: "From Local to Global: A GraphRAG Approach to Query-Focused Summarization",
      authors: "Edge, D., Trinh, H., et al.",
      year: "2024",
      pages: "3, 5-6"
    },
    {
      paper: "From Louvain to Leiden: guaranteeing well-connected communities",
      authors: "Traag, V. A., Waltman, L., & Van Eck, N. J.",
      year: "2019",
      pages: "1-2"
    }
  ]
};

export default function CommunityDetection() {
  const [showVisualization, setShowVisualization] = useState(false);

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Definition</h2>
          <p className="text-slate-700 mb-4">
            <strong>Community detection</strong> is the process of identifying groups (communities) of nodes in a graph that are more densely connected to each other than to nodes outside the group [Edge et al., 2024, p. 5]. In the context of knowledge graphs, communities represent thematic groupings of related entities.
          </p>
          <p className="text-slate-700 mb-4">
            A key quality of graphs is their inherent <strong>modularity</strong> - the ability to partition graphs into nested modular communities of closely related nodes [Edge et al., 2024, p. 3]. This property enables hierarchical organization of information at multiple levels of abstraction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Leiden Algorithm</h2>
          <p className="text-slate-700 mb-4">
            GraphRAG uses the <strong>Leiden community detection algorithm</strong>, which partitions a graph into communities of strongly connected nodes [Edge et al., 2024, p. 5]. The Leiden algorithm improves upon the earlier Louvain algorithm by guaranteeing well-connected communities [Traag et al., 2019, p. 1].
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Hierarchical Community Detection</h3>
          <p className="text-slate-700 mb-4">
            GraphRAG applies Leiden in a <strong>hierarchical manner</strong>, recursively detecting sub-communities within each detected community until reaching leaf communities that can no longer be partitioned [Edge et al., 2024, p. 5].
          </p>
          <p className="text-slate-700 mb-4">
            Each level of this hierarchy provides a community partition that covers the nodes of the graph in a <strong>mutually exclusive, collectively exhaustive way</strong>, enabling divide-and-conquer global summarization [Edge et al., 2024, p. 6].
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Community Levels</h3>
          <p className="text-slate-700 mb-4">GraphRAG creates multiple levels of communities:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Level 0 (C0)</strong>: Root-level communities (fewest in number, broadest themes)</li>
            <li><strong>Level 1 (C1)</strong>: High-level communities (sub-communities of C0)</li>
            <li><strong>Level 2 (C2)</strong>: Intermediate-level communities (sub-communities of C1)</li>
            <li><strong>Level 3 (C3)</strong>: Low-level communities (greatest in number, most specific)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Community Summaries</h2>
          <p className="text-slate-700 mb-4">
            After partitioning the graph, GraphRAG creates <strong>report-like summaries</strong> of each community in the community hierarchy [Edge et al., 2024, p. 6]. These summaries are generated using an LLM and include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Title</strong>: A name that represents the community's key entities</li>
            <li><strong>Summary</strong>: An executive summary of the community's overall structure</li>
            <li><strong>Impact severity rating</strong>: A score representing the importance of entities within the community</li>
            <li><strong>Detailed findings</strong>: Key insights about the community with citations to supporting data</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Bottom-Up Summarization</h3>
          <p className="text-slate-700 mb-4">
            Community summaries are generated in a <strong>bottom-up manner</strong> following the hierarchical structure:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Leaf-level communities</strong>: Element summaries (nodes, edges, claims) are prioritized and summarized directly</li>
            <li><strong>Higher-level communities</strong>: Summaries recursively incorporate lower-level community summaries, providing increasingly global descriptions [Edge et al., 2024, p. 6]</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Example from GraphRAG Evaluation</h2>
          <p className="text-slate-700 mb-4">
            In the GraphRAG experiments on a ~1 million token podcast transcript dataset:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Graph size</strong>: 8,564 nodes and 20,691 edges</li>
            <li><strong>C0 communities</strong>: 34 root-level communities</li>
            <li><strong>C1 communities</strong>: 367 high-level communities</li>
            <li><strong>C2 communities</strong>: 969 intermediate-level communities</li>
            <li><strong>C3 communities</strong>: 1,310 low-level communities [Edge et al., 2024, p. 9]</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Neighborhood Analogy</h2>
          <p className="text-slate-700 mb-4">
            Imagine mapping the social structure of a large city:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Individual people</strong> are nodes in your graph</li>
            <li><strong>Friendships, work relationships</strong> are edges connecting them</li>
          </ul>
          <p className="text-slate-700 mb-4">
            Without community detection, you'd have a tangled mess of millions of connections. But with community detection, clear patterns emerge:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Neighborhoods</strong>: People in the same area are more connected to each other</li>
            <li><strong>Workplaces</strong>: Colleagues form tight clusters</li>
            <li><strong>Hobby groups</strong>: Rock climbers, book clubs, sports teams cluster together</li>
            <li><strong>Hierarchical structure</strong>: The city divides into districts, which divide into neighborhoods, which divide into street-level social groups</li>
          </ul>
          <p className="text-slate-700 mb-4">
            Now if someone asks "What's the culture like in the downtown area?", you can summarize the downtown community instead of reading every individual connection. If they ask "What are the main social groups in the entire city?", you can look at the highest-level communities (districts) instead of processing millions of individual relationships.
          </p>
          <p className="text-slate-700 mb-4">
            This is exactly what community detection does for knowledge graphs: it reveals the natural thematic organization of information, enabling efficient summarization at multiple levels of detail.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Benefits for RAG Systems</h2>
          <p className="text-slate-700 mb-4">
            Community detection provides several key advantages:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Thematic organization</strong>: Automatically groups related entities into meaningful topics</li>
            <li><strong>Multi-level understanding</strong>: Different granularities for different query types</li>
            <li><strong>Efficient summarization</strong>: Pre-computed community summaries enable fast query answering</li>
            <li><strong>Scalability</strong>: Hierarchical structure reduces computational complexity</li>
            <li><strong>Global sensemaking</strong>: Root communities provide corpus-wide themes</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Interactive Exploration</h2>
          <p className="text-slate-700 mb-4">
            Community summaries can be used independently for understanding a corpus without a specific query. For example, a user may:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Scan through community summaries at one level looking for general themes of interest</li>
            <li>Read linked reports at a lower level that provide additional details for each subtopic [Edge et al., 2024, p. 6]</li>
          </ol>

          <button
            onClick={() => setShowVisualization(!showVisualization)}
            className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            {showVisualization ? "Hide Visualization" : "Show Hierarchical Example"}
          </button>

          {showVisualization && (
            <div className="mt-4 p-6 bg-slate-100 rounded-lg animate-fadeIn">
              <p className="text-slate-700 font-semibold mb-4">Example: 3-Level Hierarchy</p>
              <div className="space-y-4">
                <div className="bg-violet-100 p-4 rounded-lg">
                  <p className="font-bold text-violet-900">Level 0: AI and Machine Learning</p>
                  <p className="text-sm text-violet-700 mt-2">Broadest theme covering all AI-related entities</p>
                </div>
                <div className="ml-8 space-y-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <p className="font-bold text-blue-900">Level 1: Natural Language Processing</p>
                    <p className="text-sm text-blue-700 mt-1">Sub-community focused on language models</p>
                  </div>
                  <div className="ml-8 space-y-2">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <p className="font-bold text-green-900">Level 2: Transformer Architectures</p>
                      <p className="text-sm text-green-700 mt-1">Specific sub-topic: BERT, GPT, T5, etc.</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-slate-700 mt-4 text-sm">
                Each level provides summaries at different granularities, enabling both broad understanding (Level 0) and detailed exploration (Level 2).
              </p>
            </div>
          )}
        </section>
      </div>
    </WikiLayout>
  );
}
