import PaperLayout from "../../components/PaperLayout";

export default function PracticalGuideLLMEvaluation() {
  return (
    <PaperLayout
      title="A Practical Guide for Evaluating LLMs and LLM-Reliant Systems"
      authors="Rudd, E. M., Andrews, C., & Tully, P."
      year="2025"
      venue="arXiv preprint"
      arxivId="2506.13023v2"
      arxivUrl="https://arxiv.org/abs/2506.13023"
      abstract="Recent advances in generative AI have led to remarkable interest in using systems that rely on large language models (LLMs) for practical applications. However, meaningful evaluation of these systems in real-world scenarios comes with a distinct set of challenges, which are not well-addressed by synthetic benchmarks and de-facto metrics that are often seen in the literature. This paper presents a practical evaluation framework which outlines how to proactively curate representative datasets, select meaningful evaluation metrics, and employ meaningful evaluation methodologies that integrate well with practical development and deployment of LLM-reliant systems that must adhere to real-world requirements and meet user-facing needs."
      keyContributions={[
        "A structured three-pillar framework (Datasets, Metrics, Methodology) for evaluating LLM-reliant systems",
        "The 5 Ds principle for dataset curation: Defined Scope, Demonstrative of Production Usage, Diverse, Decontaminated, and Dynamic",
        "Comprehensive taxonomy of evaluation metrics including term overlap (ROUGE, BLEU), semantic similarity, NLI/entailment, LLM autoraters, and perplexity",
        "Practical methodologies for handling non-determinism, prompt sensitivity, and measuring hallucinations"
      ]}
      relatedConcepts={[
        { name: "ROUGE Metrics", slug: "rouge-metrics" },
        { name: "BLEU Score", slug: "bleu-score" },
        { name: "LLM Hallucination", slug: "llm-hallucination" },
        { name: "Retrieval-Augmented Generation", slug: "retrieval-augmented-generation" },
        { name: "Natural Language Inference", slug: "natural-language-inference" }
      ]}
      impact="Provides a comprehensive, actionable framework for practitioners developing and deploying LLM-based systems. Addresses the gap between academic benchmarks and real-world evaluation needs by focusing on practical challenges like non-determinism, prompt sensitivity, data contamination, and component-level evaluation."
    />
  );
}
