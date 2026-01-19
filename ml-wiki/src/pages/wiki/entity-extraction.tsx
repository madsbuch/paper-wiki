import { useState } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function EntityExtraction() {
  const [userInput, setUserInput] = useState("");
  const [extractedEntities, setExtractedEntities] = useState<Array<{name: string, type: string, description: string}>>([]);
  const [showExample, setShowExample] = useState(false);

  const handleExtract = () => {
    // Simple demonstration - in reality this would use an LLM
    if (userInput.toLowerCase().includes("tesla")) {
      setExtractedEntities([
        { name: "Tesla", type: "ORGANIZATION", description: "Electric vehicle and clean energy company" },
        { name: "Elon Musk", type: "PERSON", description: "CEO of Tesla" }
      ]);
    } else {
      setExtractedEntities([
        { name: "Example Entity", type: "ORGANIZATION", description: "This is a demonstration" }
      ]);
    }
  };

  const meta = {
    title: "Entity Extraction",
    citations: [
      {
        paper: "From Local to Global: A GraphRAG Approach to Query-Focused Summarization",
        authors: "Edge, D., Trinh, H., et al.",
        year: "2024",
        pages: "4-5"
      }
    ]
  };

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Definition</h2>
          <p className="text-slate-700 mb-4">
            <strong>Entity extraction</strong> (also called named entity recognition or NER) is the process of identifying and extracting instances of entities from text. In the context of GraphRAG, an LLM is prompted to identify entities along with their name, type, and a comprehensive description of their attributes and activities [Edge et al., 2024, p. 4].
          </p>
          <p className="text-slate-700 mb-4">
            Entities represent the fundamental objects or concepts in a knowledge graph - the <strong>nodes</strong> that will be connected by relationships. They can be people, organizations, locations, products, concepts, or any other meaningful unit of information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">LLM-Based Entity Extraction</h2>
          <p className="text-slate-700 mb-4">
            GraphRAG uses a multi-step LLM prompting process for entity extraction [Edge et al., 2024, p. 4]:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Identify all entities</strong>: The LLM scans a text chunk and identifies all entities of specified types</li>
            <li><strong>Extract attributes</strong>: For each entity, extract:
              <ul className="list-disc list-inside space-y-1 ml-8 mt-2 text-slate-700">
                <li><strong>Entity name</strong>: Capitalized name of the entity</li>
                <li><strong>Entity type</strong>: Category (e.g., PERSON, ORGANIZATION, LOCATION)</li>
                <li><strong>Entity description</strong>: Comprehensive description of attributes and activities</li>
              </ul>
            </li>
            <li><strong>Format output</strong>: Return structured tuples like ("entity"|name|type|description)</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Example from GraphRAG Paper</h2>
          <p className="text-slate-700 mb-4">Given the text chunk:</p>
          <div className="bg-slate-100 p-4 rounded-lg mb-4">
            <p className="text-slate-700 font-mono text-sm">
              "NeoChip's (NC) shares surged in their first week of trading on the NewTech Exchange. However, market analysts caution that the chipmaker's public debut may not reflect trends for other technology IPOs. NeoChip, previously a private entity, was acquired by Quantum Systems in 2016. The innovative semiconductor firm specializes in low-power processors for wearables and IoT devices."
            </p>
          </div>
          <p className="text-slate-700 mb-4">The LLM extracts [Edge et al., 2024, p. 5]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>NeoChip</strong> (ORGANIZATION): "NeoChip is a publicly traded company specializing in low-power processors for wearables and IoT devices."</li>
            <li><strong>Quantum Systems</strong> (ORGANIZATION): "Quantum Systems is a firm that previously owned NeoChip."</li>
            <li><strong>NewTech Exchange</strong> (ORGANIZATION): "NewTech Exchange is a stock exchange where NeoChip's shares are traded."</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Domain-Tailored Extraction</h2>
          <p className="text-slate-700 mb-4">
            Entity extraction prompts can be tailored to specific domains through <strong>few-shot in-context learning</strong> [Edge et al., 2024, p. 5]:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>General domains</strong>: Extract broad categories like people, places, and organizations</li>
            <li><strong>Specialized domains</strong>: Science, medicine, law benefit from domain-specific entity types and few-shot exemplars
              <ul className="list-disc list-inside space-y-1 ml-8 mt-2 text-slate-700">
                <li>Medical: DISEASE, SYMPTOM, TREATMENT, DRUG</li>
                <li>Scientific: THEORY, EXPERIMENT, MEASUREMENT, PHENOMENON</li>
                <li>Legal: STATUTE, CASE, PARTY, COURT</li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Entity Matching and Deduplication</h2>
          <p className="text-slate-700 mb-4">
            Since entities are extracted from multiple text chunks, the same real-world entity often appears multiple times with slight variations. <strong>Entity matching</strong> (also called entity resolution) reconciles different extracted names for the same entity [Edge et al., 2024, p. 5].
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Matching Approaches</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Exact string matching</strong>: Simple but effective baseline (used in GraphRAG paper)</li>
            <li><strong>Fuzzy matching</strong>: Handles minor variations and typos</li>
            <li><strong>Semantic matching</strong>: Uses embeddings to match entities with different names but same meaning</li>
          </ul>
          <p className="text-slate-700 mb-4">
            GraphRAG is generally resilient to duplicate entities since duplicates are typically clustered together during community detection, so they get summarized together anyway [Edge et al., 2024, p. 5].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Self-Reflection for Improved Recall</h2>
          <p className="text-slate-700 mb-4">
            Larger text chunks are more cost-effective (fewer LLM calls) but LLMs tend to miss entities in longer chunks. GraphRAG uses a <strong>self-reflection</strong> technique:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Initial extraction</strong>: Extract entities from the chunk</li>
            <li><strong>Self-assessment</strong>: Prompt the LLM to assess whether all entities were found</li>
            <li><strong>Gleaning</strong>: If entities were missed, prompt again to find them</li>
            <li><strong>Iteration</strong>: Repeat up to a maximum number of times</li>
          </ol>
          <p className="text-slate-700 mb-4">
            This allows using larger chunk sizes (e.g., 600 tokens) without sacrificing recall, reducing costs while maintaining quality [Edge et al., 2024, Appendix A.2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Detective Story Analogy</h2>
          <p className="text-slate-700 mb-4">
            Imagine you're a detective reading through witness statements about a crime:
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-slate-700 mb-3">
              <strong>Witness 1:</strong> "I saw John Smith leave the building at 9 PM."
            </p>
            <p className="text-slate-700 mb-3">
              <strong>Witness 2:</strong> "A man in a blue jacket, later identified as J. Smith, was at the corner store."
            </p>
            <p className="text-slate-700">
              <strong>Witness 3:</strong> "Smith works at TechCorp as a software engineer."
            </p>
          </div>
          <p className="text-slate-700 mb-4">
            Your job as a detective (entity extraction):
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Identify who's who</strong>: Recognize that "John Smith", "J. Smith", and "Smith" are the same person</li>
            <li><strong>Note their attributes</strong>: Male, wears blue jacket, software engineer, works at TechCorp</li>
            <li><strong>Track locations and organizations</strong>: The building, corner store, TechCorp</li>
            <li><strong>Build a coherent picture</strong>: Merge all mentions into a single entity profile</li>
          </ul>
          <p className="text-slate-700 mb-4">
            This is exactly what entity extraction does - it reads through many "witness statements" (text chunks), identifies all the "characters" (entities), figures out when different names refer to the same entity, and builds comprehensive profiles of each one.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Try It: Extract Entities</h2>
          <p className="text-slate-700 mb-4">
            Enter some text and see what entities might be extracted:
          </p>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter text mentioning people, companies, or places..."
            className="w-full p-4 border-2 border-slate-300 rounded-lg mb-4 font-mono text-sm"
            rows={4}
          />
          <button
            onClick={handleExtract}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors mb-4"
          >
            Extract Entities
          </button>

          {extractedEntities.length > 0 && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg animate-fadeIn">
              <p className="text-slate-700 font-semibold mb-3">Extracted Entities:</p>
              {extractedEntities.map((entity, i) => (
                <div key={i} className="mb-3 p-3 bg-white rounded border border-green-200">
                  <p className="text-slate-900 font-bold">{entity.name}</p>
                  <p className="text-slate-600 text-sm">Type: {entity.type}</p>
                  <p className="text-slate-700 text-sm mt-1">{entity.description}</p>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowExample(!showExample)}
            className="mt-4 text-violet-600 hover:text-violet-700 text-sm underline"
          >
            {showExample ? "Hide" : "Show"} Full Example
          </button>

          {showExample && (
            <div className="mt-4 p-4 bg-slate-100 rounded-lg animate-fadeIn">
              <p className="text-slate-700 font-semibold mb-2">Example Input:</p>
              <p className="text-slate-700 font-mono text-sm mb-4">
                "Tesla announced a new Gigafactory in Texas. CEO Elon Musk stated the facility will produce Cybertrucks and employ 10,000 workers."
              </p>
              <p className="text-slate-700 font-semibold mb-2">Expected Extraction:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 text-sm">
                <li><strong>Tesla</strong> (ORGANIZATION): "Electric vehicle manufacturer"</li>
                <li><strong>Gigafactory</strong> (LOCATION): "Manufacturing facility in Texas"</li>
                <li><strong>Texas</strong> (LOCATION): "U.S. state"</li>
                <li><strong>Elon Musk</strong> (PERSON): "CEO of Tesla"</li>
                <li><strong>Cybertruck</strong> (PRODUCT): "Electric pickup truck model"</li>
              </ul>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Role in Knowledge Graph Construction</h2>
          <p className="text-slate-700 mb-4">
            Entity extraction is the <strong>first critical step</strong> in building a knowledge graph:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Entity extraction</strong>: Identify all entities → becomes graph nodes</li>
            <li><strong>Relationship extraction</strong>: Find connections between entities → becomes graph edges</li>
            <li><strong>Claim extraction</strong>: Extract factual statements → becomes node/edge metadata</li>
            <li><strong>Graph construction</strong>: Assemble nodes, edges, and metadata into knowledge graph</li>
            <li><strong>Community detection</strong>: Partition graph for hierarchical summarization</li>
          </ol>
          <p className="text-slate-700 mb-4">
            Without accurate entity extraction, the entire knowledge graph suffers. High-quality entity extraction with comprehensive descriptions is essential for GraphRAG's success in global sensemaking.
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
