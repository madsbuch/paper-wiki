import PaperLayout from "../../components/PaperLayout";

export default function ChainOfThoughtPrompting() {
  return (
    <PaperLayout
      title="Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"
      authors="Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E., Le, Q., & Zhou, D."
      year="2022"
      venue="36th Conference on Neural Information Processing Systems (NeurIPS 2022)"
      arxivId="2201.11903v6"
      pdfPath="/papers/2201.11903v6.pdf"
      abstract="We explore how generating a chain of thought—a series of intermediate reasoning steps—significantly improves the ability of large language models to perform complex reasoning. In particular, we show how such reasoning abilities emerge naturally in sufficiently large language models via a simple method called chain-of-thought prompting, where a few chain of thought demonstrations are provided as exemplars in prompting. Experiments on three large language models show that chain-of-thought prompting improves performance on a range of arithmetic, commonsense, and symbolic reasoning tasks."
      keyContributions={[
        "Introduced chain-of-thought prompting technique",
        "Showed intermediate reasoning steps improve performance",
        "Demonstrated emergent reasoning in large models",
        "Achieved state-of-the-art on GSM8K math benchmark",
        "Proved reasoning abilities scale with model size"
      ]}
      relatedConcepts={[
        { name: "Chain-of-Thought Prompting", slug: "chain-of-thought-prompting" },
        { name: "Reasoning Steps", slug: "reasoning-steps" },
        { name: "Few-Shot Prompting", slug: "few-shot-prompting" },
        { name: "Emergent Abilities", slug: "emergent-abilities" },
        { name: "Arithmetic Reasoning", slug: "arithmetic-reasoning" }
      ]}
      impact="Chain-of-thought prompting unlocked reasoning capabilities in large language models without requiring additional training. This simple yet powerful technique showed that models could solve complex multi-step problems by breaking them down into intermediate steps, making LLMs far more capable on mathematical and logical reasoning tasks. It has become a standard technique in prompt engineering."
    />
  );
}
