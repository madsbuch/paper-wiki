import PaperLayout from "../../components/PaperLayout";

export default function ConstitutionalAIPaper() {
  return (
    <PaperLayout
      title="Constitutional AI: Harmlessness from AI Feedback"
      authors="Bai, Y., Kadavath, S., Kundu, S., Askell, A., Kernion, J., Jones, A., Chen, A., Goldie, A., Mirhoseini, A., McKinnon, C., et al."
      year="2022"
      venue="arXiv preprint"
      arxivId="2212.08073v1"
      arxivUrl="https://arxiv.org/abs/2212.08073"
      abstract="As AI systems become more capable, we would like to enlist their help to supervise other AIs. We experiment with methods for training a harmless AI assistant through self-improvement, without any human labels identifying harmful outputs. The only human oversight is provided through a list of rules or principles, and so we refer to the method as 'Constitutional AI'. The process involves both a supervised learning and a reinforcement learning phase. In the supervised phase we sample from an initial model, then generate self-critiques and revisions, and then finetune the original model on revised responses. In the RL phase, we sample from the finetuned model, use a model to evaluate which of the two samples is better, and then train a preference model from this dataset of AI preferences. We then train with RL using the preference model as the reward signal, i.e. we use 'RL from AI Feedback' (RLAIF). As a result we are able to train a harmless but non-evasive AI assistant that engages with harmful queries by explaining its objections to them."
      keyContributions={[
        "Constitutional AI Method: Introduces a two-stage training process: (1) Supervised Learning stage where models critique and revise their own responses based on constitutional principles, and (2) Reinforcement Learning from AI Feedback (RLAIF) stage where AI-generated preference labels replace human labels for harmlessness. This reduces human oversight to just providing a small set of principles.",
        "Scaling Supervision with AI Feedback: Demonstrates that AI systems can effectively supervise other AIs by generating critiques, revisions, and preference labels guided by constitutional principles. This 'scaling supervision' approach makes it possible to train helpful and harmless models with far fewer human labels—using only ~10 natural language principles instead of tens of thousands of human preference labels.",
        "Harmless but Non-Evasive Assistants: Resolves the tension between helpfulness and harmlessness by training models that are harmless without being evasive. RL-CAI models thoughtfully explain why they cannot help with harmful requests rather than giving canned 'I can't answer that' responses, making them more transparent and compatible with helpfulness.",
        "Chain-of-Thought for AI Feedback: Shows that chain-of-thought reasoning significantly improves AI evaluation of harmful content. Models using CoT achieve competitive performance with preference models trained on extensive human feedback, with accuracy improving with model scale. CoT also makes AI decision-making more transparent and interpretable.",
        "Empirical Validation: RL-CAI models trained with AI feedback are preferred by crowdworkers over models trained with human feedback for harmlessness. The method achieves Pareto improvements—models become significantly more harmless without sacrificing helpfulness. The approach also enables faster iteration since changing the constitution doesn't require collecting new human labels."
      ]}
      relatedConcepts={[
        { name: "RLHF", slug: "rlhf" },
        { name: "AI Alignment", slug: "ai-alignment" },
        { name: "Chain-of-Thought Reasoning", slug: "chain-of-thought-reasoning" },
        { name: "Preference Modeling", slug: "preference-modeling" },
        { name: "Red Teaming", slug: "red-teaming" },
        { name: "Self-Critique and Revision", slug: "self-critique" }
      ]}
      impact="Constitutional AI represents a significant advancement in AI alignment by demonstrating that models can effectively supervise themselves using natural language principles. This work has influenced the development of safer AI systems and reduced the reliance on extensive human labeling for harmlessness training. The RLAIF approach has been adopted by multiple organizations and has become a key technique for scaling oversight of increasingly capable AI systems. The method's emphasis on transparency and non-evasiveness has helped shape the design of modern AI assistants."
    />
  );
}
