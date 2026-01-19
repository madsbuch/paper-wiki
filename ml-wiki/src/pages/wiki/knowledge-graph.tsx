import { useState } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function KnowledgeGraph() {
  const [step, setStep] = useState(0);
  const [extractedEntities, setExtractedEntities] = useState<string[]>([]);

  const sampleText = "NeoChip's shares surged in their first week of trading on the NewTech Exchange. The chipmaker was acquired by Quantum Systems in 2016.";

  const handleExtraction = () => {
    if (step === 0) {
      setExtractedEntities(["NeoChip (company)", "NewTech Exchange (organization)", "Quantum Systems (company)"]);
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    }
  };

  const meta = {
    title: "Knowledge Graph",
    citations: [
      {
        paper: "From Local to Global: A GraphRAG Approach to Query-Focused Summarization",
        authors: "Edge, D., Trinh, H., et al.",
        year: "2024",
        pages: "3-5"
      }
    ]
  };

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Definition</h2>
          <p className="text-slate-700 mb-4">
            A <strong>knowledge graph</strong> is a structured representation of information where <strong>nodes</strong> correspond to entities (such as people, places, organizations, or concepts) and <strong>edges</strong> represent relationships between those entities [Edge et al., 2024, p. 3]. In the context of document analysis, knowledge graphs can be automatically extracted from text using large language models.
          </p>
          <p className="text-slate-700 mb-4">
            In GraphRAG, the knowledge graph serves as an index that enables both local retrieval (finding specific entities and relationships) and global sensemaking (understanding themes and patterns across the entire corpus) [Edge et al., 2024, p. 3].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Components of a Knowledge Graph</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">1. Entities (Nodes)</h3>
          <p className="text-slate-700 mb-4">
            <strong>Entities</strong> are the fundamental objects or concepts in the knowledge graph. In GraphRAG, an LLM extracts entities from text chunks, identifying their name, type, and a comprehensive description of their attributes and activities [Edge et al., 2024, p. 4].
          </p>
          <p className="text-slate-700 mb-4">Example entities from a business text:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>NeoChip</strong> (Organization): A publicly traded company specializing in low-power processors</li>
            <li><strong>Quantum Systems</strong> (Organization): A firm that previously owned NeoChip</li>
            <li><strong>NewTech Exchange</strong> (Location/Organization): A stock exchange where NeoChip trades</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. Relationships (Edges)</h3>
          <p className="text-slate-700 mb-4">
            <strong>Relationships</strong> connect entities and describe how they interact or relate to each other. Each relationship includes a source entity, target entity, description, and optionally a strength score [Edge et al., 2024, p. 4].
          </p>
          <p className="text-slate-700 mb-4">Example relationships:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>NeoChip → NewTech Exchange</strong>: "NeoChip's shares trade on the NewTech Exchange"</li>
            <li><strong>Quantum Systems → NeoChip</strong>: "Quantum Systems acquired NeoChip in 2016 and held ownership until NeoChip became publicly traded"</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Claims (Covariates)</h3>
          <p className="text-slate-700 mb-4">
            <strong>Claims</strong> are factual statements about entities - dates, events, and interactions. The LLM can be prompted to extract claims which become important metadata attached to entities [Edge et al., 2024, p. 5].
          </p>
          <p className="text-slate-700 mb-4">Example claims:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>"NeoChip's shares surged during their first week of trading on the NewTech Exchange"</li>
            <li>"Quantum Systems acquired NeoChip in 2016"</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">LLM-Based Knowledge Graph Extraction</h2>
          <p className="text-slate-700 mb-4">
            GraphRAG uses an LLM to build the knowledge graph in several stages [Edge et al., 2024, p. 4-5]:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Text Chunking</strong>: Source documents are split into text chunks of manageable size (e.g., 600 tokens)</li>
            <li><strong>Entity Extraction</strong>: For each chunk, the LLM identifies entities with their names, types, and descriptions</li>
            <li><strong>Relationship Extraction</strong>: The LLM identifies pairs of related entities and describes their relationships</li>
            <li><strong>Claim Extraction</strong>: Important factual statements about entities are extracted</li>
            <li><strong>Entity Reconciliation</strong>: Multiple instances of the same entity are merged through entity matching</li>
            <li><strong>Graph Construction</strong>: Entities become nodes, relationships become edges, with aggregated descriptions and weights</li>
          </ol>
          <p className="text-slate-700 mb-4">
            The use of an LLM to extract entities, relationships, and claims is a form of <strong>abstractive summarization</strong> - these are meaningful summaries of concepts that may not be explicitly stated in the text [Edge et al., 2024, p. 5].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Graph Modularity and Community Detection</h2>
          <p className="text-slate-700 mb-4">
            A key property of knowledge graphs is their inherent <strong>modularity</strong> - the ability to partition graphs into communities of closely related nodes [Edge et al., 2024, p. 3]. GraphRAG uses the Leiden community detection algorithm to hierarchically partition the graph, creating nested communities at multiple levels.
          </p>
          <p className="text-slate-700 mb-4">
            Each community represents a thematic group of related entities. The hierarchical structure enables summarization at different levels of detail, from fine-grained sub-topics to broad themes [Edge et al., 2024, p. 5].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The City Map Analogy</h2>
          <p className="text-slate-700 mb-4">
            Imagine you're creating a map of a city's social and business connections. Instead of just listing everyone who lives there, you create a network diagram:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>People, companies, and places are dots</strong> (entities/nodes) on your map</li>
            <li><strong>Lines connect them</strong> (relationships/edges) showing "works for", "owns", "partners with"</li>
            <li><strong>Labels on the lines</strong> describe the nature of each connection</li>
            <li><strong>Clusters emerge</strong> naturally - the tech startup community, the restaurant district, the university network</li>
          </ul>
          <p className="text-slate-700 mb-4">
            Now, instead of reading thousands of pages of city documents to understand "What's happening in the tech scene?", you can look at the tech cluster on your graph and see all the relevant companies, their investors, their relationships, and patterns at a glance.
          </p>
          <p className="text-slate-700 mb-4">
            This is what a knowledge graph does for text: it transforms linear documents into a connected, navigable structure that reveals relationships and enables both detailed lookups and high-level understanding.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Try It: Entity and Relationship Extraction</h2>
          <p className="text-slate-700 mb-4">
            Let's practice extracting entities and relationships from text:
          </p>
          <div className="bg-slate-100 p-4 rounded-lg mb-4">
            <p className="text-slate-700 font-mono text-sm">{sampleText}</p>
          </div>

          <button
            onClick={handleExtraction}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors mb-4"
          >
            {step === 0 ? "Extract Entities" : step === 1 ? "Extract Relationships" : "Reset"}
          </button>

          {step >= 1 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg animate-fadeIn">
              <p className="text-slate-700 font-semibold mb-2">Extracted Entities:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                {extractedEntities.map((entity, i) => (
                  <li key={i}>{entity}</li>
                ))}
              </ul>
            </div>
          )}

          {step >= 2 && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg animate-fadeIn">
              <p className="text-slate-700 font-semibold mb-2">Extracted Relationships:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
                <li><strong>NeoChip → NewTech Exchange</strong>: "NeoChip's shares trade on NewTech Exchange"</li>
                <li><strong>Quantum Systems → NeoChip</strong>: "Quantum Systems acquired NeoChip in 2016"</li>
              </ul>
              <p className="text-slate-700 mt-4">
                These entities and relationships would form part of a larger knowledge graph, connecting to other entities mentioned throughout the document corpus!
              </p>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Advantages for RAG Systems</h2>
          <p className="text-slate-700 mb-4">
            Knowledge graphs provide several advantages over traditional vector-based retrieval:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Structured representation</strong>: Explicit relationships vs. implicit semantic similarity</li>
            <li><strong>Hierarchical organization</strong>: Community detection enables multi-level understanding</li>
            <li><strong>Global understanding</strong>: Supports corpus-wide sensemaking queries</li>
            <li><strong>Explainability</strong>: Clear provenance through entity and relationship descriptions</li>
            <li><strong>Scalability</strong>: Pre-computed summaries enable efficient query answering</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
