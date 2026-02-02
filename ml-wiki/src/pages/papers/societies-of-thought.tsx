import PaperLayout from "../../components/PaperLayout";

export default function SocietiesOfThoughtPaper() {
  return (
    <PaperLayout
      title="Reasoning Models Generate Societies of Thought"
      authors="Kim, J., Lai, S., Scherrer, N., Agüera y Arcas, B., & Evans, J."
      year="2025"
      venue="arXiv preprint"
      arxivId="2601.10825"
      arxivUrl="https://arxiv.org/abs/2601.10825"
      abstract="Large language models have achieved remarkable capabilities across domains, yet mechanisms underlying sophisticated reasoning remain elusive. Recent reasoning-reinforced models, including OpenAI's o-series, DeepSeek-R1, and QwQ-32B, outperform comparable instruction-tuned models on complex cognitive tasks, attributed to extended test-time computation through longer chains of thought. Here we show that enhanced reasoning emerges not from extended computation alone, but from the implicit simulation of complex, multi-agent-like interactions—a society of thought—which enables the deliberate diversification and debate among internal cognitive perspectives characterized by distinct personality traits and domain expertise. Through quantitative analysis using classified outputs and mechanistic interpretability methods applied to reasoning traces, we find that reasoning models like DeepSeek-R1 and QwQ-32B exhibit much greater perspective diversity than baseline and merely instruction-tuned models, activating broader conflict between heterogeneous personality- and expertise-related features during reasoning."
      keyContributions={[
        "Society of Thought Hypothesis: Demonstrates that reasoning models like DeepSeek-R1 and QwQ-32B implicitly simulate multi-agent-like interactions with distinct personalities and expertise, rather than simply generating longer chains of thought. This 'society of thought' enables diversification and debate among internal cognitive perspectives.",
        "Conversational Behavior Analysis: Identifies four key conversational behaviors in reasoning traces—question-answering, perspective shifts, conflicts of perspectives, and reconciliation—that appear significantly more frequently in reasoning models than instruction-tuned models, even when controlling for trace length.",
        "Mechanistic Interpretability Evidence: Uses sparse autoencoders to identify that steering conversational features (like 'discourse markers for surprise') doubles reasoning accuracy on arithmetic tasks, with effects mediated both directly and through cognitive strategies like verification and backtracking.",
        "Personality and Expertise Diversity: Shows that reasoning models generate perspectives with significantly higher diversity in personality traits (extraversion, agreeableness, neuroticism, openness) and domain expertise compared to non-reasoning models, paralleling findings from human team research.",
        "Reinforcement Learning Emergence: Demonstrates through controlled RL experiments that conversational behaviors spontaneously emerge when models are rewarded solely for reasoning accuracy, and that fine-tuning with conversational scaffolding accelerates reasoning improvement compared to monologue-style reasoning."
      ]}
      relatedConcepts={[
        { name: "Chain-of-Thought Prompting", slug: "chain-of-thought-prompting" },
        { name: "Reinforcement Learning from Human Feedback", slug: "rlhf" },
        { name: "Reasoning Steps", slug: "reasoning-steps" },
        { name: "Society of Mind", slug: "society-of-mind" },
        { name: "Multi-Agent Systems", slug: "multi-agent-systems" },
        { name: "Sparse Autoencoders", slug: "sparse-autoencoders" },
        { name: "Mechanistic Interpretability", slug: "mechanistic-interpretability" }
      ]}
      impact="This paper provides mechanistic evidence for how reasoning emerges in large language models, suggesting that effective reasoning is fundamentally social in nature. The findings have significant implications for AI alignment and interpretability, showing that reasoning models develop internal 'collective intelligence' analogous to human group problem-solving. The work bridges cognitive science theories (like Mercier and Sperber's social theory of reasoning and Minsky's Society of Mind) with empirical AI research, opening new directions for improving reasoning through diversity and conversational scaffolding rather than purely scaling compute."
    />
  );
}
