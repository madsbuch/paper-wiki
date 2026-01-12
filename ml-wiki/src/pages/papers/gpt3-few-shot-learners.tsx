import PaperLayout from "../../components/PaperLayout";

export default function GPT3FewShotLearners() {
  return (
    <PaperLayout
      title="Language Models are Few-Shot Learners"
      authors="Brown, T. B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., et al."
      year="2020"
      venue="Advances in Neural Information Processing Systems 33 (NeurIPS 2020)"
      arxivId="2005.14165v4"
      pdfPath="/papers/2005.14165v4.pdf"
      abstract="We train GPT-3, a 175 billion parameter autoregressive language model, and test its in-context learning abilities. We evaluate GPT-3 on over two dozen NLP datasets in zero-shot, one-shot, and few-shot settings. GPT-3 achieves strong performance on many NLP tasks without any gradient updates or fine-tuning, sometimes matching or exceeding state-of-the-art despite being evaluated without task-specific fine-tuning."
      keyContributions={[
        "Introduced GPT-3, a 175 billion parameter language model",
        "Demonstrated in-context learning without weight updates",
        "Showed few-shot learning scales with model size",
        "Proved larger models are better meta-learners",
        "Achieved near state-of-the-art on many tasks without fine-tuning"
      ]}
      relatedConcepts={[
        { name: "In-Context Learning", slug: "in-context-learning" },
        { name: "Few-Shot Learning", slug: "few-shot-learning" },
        { name: "Zero-Shot Learning", slug: "zero-shot-learning" },
        { name: "Meta-Learning", slug: "meta-learning" },
        { name: "Autoregressive Language Model", slug: "autoregressive-language-model" }
      ]}
      impact="GPT-3 demonstrated that scaling language models to 175 billion parameters unlocks powerful in-context learning capabilities. This paper fundamentally changed how we think about task adaptation in AI, showing that models can perform new tasks from just a few examples without retraining. It sparked the modern era of large language models and prompted widespread exploration of emergent abilities at scale."
    />
  );
}
