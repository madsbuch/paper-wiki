import PaperLayout from "../../components/PaperLayout";

export default function GraphRAG() {
  return (
    <PaperLayout
      title="From Local to Global: A GraphRAG Approach to Query-Focused Summarization"
      authors="Edge, D., Trinh, H., Cheng, N., Bradley, J., Chao, A., Mody, A., Truitt, S., Metropolitansky, D., Ness, R. O., & Larson, J."
      year="2024"
      venue="arXiv preprint"
      arxivId="2404.16130v2"
      arxivUrl="https://arxiv.org/abs/2404.16130"
      abstract="The use of retrieval-augmented generation (RAG) to retrieve relevant information from an external knowledge source enables large language models (LLMs) to answer questions over private and/or previously unseen document collections. However, RAG fails on global questions directed at an entire text corpus, such as 'What are the main themes in the dataset?', since this is inherently a query-focused summarization (QFS) task, rather than an explicit retrieval task. Prior QFS methods, meanwhile, do not scale to the quantities of text indexed by typical RAG systems. To combine the strengths of these contrasting methods, we propose GraphRAG, a graph-based approach to question answering over private text corpora that scales with both the generality of user questions and the quantity of source text. Our approach uses an LLM to build a graph index in two stages: first, to derive an entity knowledge graph from the source documents, then to pregenerate community summaries for all groups of closely related entities. Given a question, each community summary is used to generate a partial response, before all partial responses are again summarized in a final response to the user. For a class of global sensemaking questions over datasets in the 1 million token range, we show that GraphRAG leads to substantial improvements over a conventional RAG baseline for both the comprehensiveness and diversity of generated answers."
      keyContributions={[
        "Introduced GraphRAG: a graph-based RAG approach for global sensemaking queries",
        "Proposed LLM-based knowledge graph extraction from source documents",
        "Applied hierarchical community detection (Leiden algorithm) to partition entity graphs",
        "Developed community summary generation for bottom-up global understanding",
        "Demonstrated map-reduce summarization over community summaries for query answering",
        "Showed 72-83% win rate over vector RAG on comprehensiveness and 62-82% on diversity",
        "Introduced adaptive benchmarking approach for evaluating global sensemaking tasks"
      ]}
      relatedConcepts={[
        { name: "Retrieval-Augmented Generation", slug: "retrieval-augmented-generation" },
        { name: "Knowledge Graph", slug: "knowledge-graph" },
        { name: "Query-Focused Summarization", slug: "query-focused-summarization" },
        { name: "Community Detection", slug: "community-detection" },
        { name: "Entity Extraction", slug: "entity-extraction" },
        { name: "Map-Reduce", slug: "map-reduce" },
        { name: "Global Sensemaking", slug: "global-sensemaking" }
      ]}
      impact="GraphRAG addresses a fundamental limitation of conventional vector RAG: the inability to answer global questions that require understanding of an entire corpus. By combining knowledge graph construction, community detection, and hierarchical summarization, GraphRAG enables LLMs to perform sensemaking over large text collections. This approach is particularly valuable for intelligence analysis, research synthesis, and understanding themes across document collections. The open-source implementation has been integrated into major frameworks including LangChain, LlamaIndex, NebulaGraph, and Neo4J, demonstrating its practical applicability."
    />
  );
}
