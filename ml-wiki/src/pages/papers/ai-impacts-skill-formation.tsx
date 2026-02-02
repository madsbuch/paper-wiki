import PaperLayout from "../../components/PaperLayout";

export default function AIImpactsSkillFormationPaper() {
  return (
    <PaperLayout
      title="How AI Impacts Skill Formation"
      authors="Shen, J. H. & Tamkin, A."
      year="2026"
      venue="arXiv preprint"
      arxivId="2601.20245v1"
      arxivUrl="https://arxiv.org/abs/2601.20245"
      abstract="AI assistance produces significant productivity gains across professional domains, particularly for novice workers. Yet how this assistance affects the development of skills required to effectively supervise AI remains unclear. Novice workers who rely heavily on AI to complete unfamiliar tasks may compromise their own skill acquisition in the process. We conduct randomized experiments to study how developers gained mastery of a new asynchronous programming library with and without the assistance of AI. We find that AI use impairs conceptual understanding, code reading, and debugging abilities, without delivering significant efficiency gains on average. Participants who fully delegated coding tasks showed some productivity improvements, but at the cost of learning the library. We identify six distinct AI interaction patterns, three of which involve cognitive engagement and preserve learning outcomes even when participants receive AI assistance. Our findings suggest that AI-enhanced productivity is not a shortcut to competence and AI assistance should be carefully adopted into workflows to preserve skill formation – particularly in safety-critical domains."
      keyContributions={[
        "Empirical Evidence of Skill Formation Impairment: Randomized experiments demonstrate that AI assistance reduces skill formation by 17% (Cohen's d = 0.738, p = 0.010) when learning a new Python library, without delivering significant efficiency gains on average. The largest gap occurred in debugging skills, critical for supervising AI-generated code.",
        "Six AI Interaction Patterns: Identifies distinct usage patterns with vastly different learning outcomes. Low-scoring patterns (24-39% quiz scores) include AI Delegation, Progressive AI Reliance, and Iterative AI Debugging. High-scoring patterns (65-86%) include Generation-Then-Comprehension, Hybrid Code-Explanation, and Conceptual Inquiry—all involving cognitive engagement.",
        "Cognitive Engagement as Key Differentiator: Participants who stayed cognitively engaged (asking conceptual questions, requesting explanations alongside code, or independently resolving errors) preserved learning outcomes even with AI assistance. Those who fully delegated to AI completed tasks fastest but learned the least.",
        "Error Encounters Drive Learning: Control group participants encountered significantly more errors (median 3 vs 1) and independently resolving these errors—particularly Trio-specific errors like RuntimeWarning and TypeError—was crucial for skill development. AI assistance prevented these learning opportunities.",
        "Implications for AI Safety and Supervision: As AI systems become more capable, humans need skills to supervise and debug AI-generated outputs. The study suggests that aggressive AI adoption in workplace learning contexts may undermine the very competencies needed for effective AI oversight."
      ]}
      relatedConcepts={[
        { name: "Cognitive Offloading", slug: "cognitive-offloading" },
        { name: "AI Alignment", slug: "ai-alignment" },
        { name: "Transfer Learning", slug: "transfer-learning" },
        { name: "RLHF", slug: "rlhf" },
        { name: "Few-Shot Learning", slug: "few-shot-learning" }
      ]}
      impact="This study provides the first rigorous experimental evidence that AI coding assistance can impair skill formation in professional learning contexts. The findings have significant implications for AI safety: if humans lose the skills needed to supervise AI systems, the problem of scalable oversight becomes more difficult. The identification of high-engagement interaction patterns offers practical guidance for workers and organizations seeking to balance productivity gains with skill development. The work suggests that AI assistance should be carefully integrated into workflows—particularly for novice workers and in safety-critical domains—to preserve the human expertise necessary for effective AI oversight."
    />
  );
}
