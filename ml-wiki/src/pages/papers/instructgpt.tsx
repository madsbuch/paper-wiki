import PaperLayout from "../../components/PaperLayout";

export default function InstructGPT() {
  return (
    <PaperLayout
      title="Training language models to follow instructions with human feedback"
      authors="Ouyang, L., Wu, J., Jiang, X., Almeida, D., Wainwright, C. L., Mishkin, P., et al."
      year="2022"
      venue="arXiv preprint"
      arxivId="2203.02155v1"
      pdfPath="/papers/2203.02155v1.pdf"
      abstract="Making language models bigger does not inherently make them better at following a user's intent. For example, large language models can generate outputs that are untruthful, toxic, or simply not helpful to the user. In other words, these models are not aligned with their users. In this paper, we show an avenue for aligning language models with user intent on a wide range of tasks by fine-tuning with human feedback. We call the resulting models InstructGPT. In human evaluations on our prompt distribution, outputs from the 1.3B parameter InstructGPT model are preferred to outputs from the 175B GPT-3, despite having 100x fewer parameters."
      keyContributions={[
        "Introduced InstructGPT using RLHF for alignment",
        "Demonstrated human feedback improves instruction following",
        "Showed smaller aligned models outperform larger unaligned ones",
        "Improved truthfulness and reduced toxicity",
        "Established three-step RLHF training procedure"
      ]}
      relatedConcepts={[
        { name: "RLHF", slug: "rlhf" },
        { name: "Instruction Following", slug: "instruction-following" },
        { name: "AI Alignment", slug: "ai-alignment" },
        { name: "Reward Modeling", slug: "reward-modeling" },
        { name: "PPO", slug: "ppo" }
      ]}
      impact="InstructGPT demonstrated that alignment through human feedback is more important than raw model scale. This work established RLHF as the standard approach for making language models helpful, honest, and harmless. It directly led to ChatGPT and influenced how modern AI systems are trained to follow user intentions safely and effectively."
    />
  );
}
