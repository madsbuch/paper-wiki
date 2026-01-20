import PaperLayout from "../../components/PaperLayout";

export default function PromptTuningPaper() {
  return (
    <PaperLayout
      title="The Power of Scale for Parameter-Efficient Prompt Tuning"
      authors="Lester, B., Al-Rfou, R., & Constant, N."
      year="2021"
      venue="EMNLP 2021"
      arxivId="2104.08691v2"
      arxivUrl="https://arxiv.org/abs/2104.08691"
      abstract="In this work, we explore 'prompt tuning', a simple yet effective mechanism for learning 'soft prompts' to condition frozen language models to perform specific downstream tasks. Unlike the discrete text prompts used by GPT-3, soft prompts are learned through backpropagation and can be tuned to incorporate signal from any number of labeled examples. Our end-to-end learned approach outperforms GPT-3's 'few-shot' learning by a large margin. More remarkably, through ablations on model size using T5, we show that prompt tuning becomes more competitive with scale: as models exceed billions of parameters, our method 'closes the gap' and matches the strong performance of model tuning (where all model weights are tuned)."
      keyContributions={[
        "Soft Prompts: Introduces learnable continuous prompt embeddings instead of discrete text prompts. These 'soft prompts' are prepended to the input and optimized via backpropagation while keeping the language model frozen.",
        "Scale-Dependent Performance: Demonstrates that prompt tuning's effectiveness increases with model size. For models exceeding 10B parameters, prompt tuning matches the performance of full model fine-tuning on SuperGLUE benchmark.",
        "Parameter Efficiency: Achieves competitive results while only tuning 0.01% of model parameters (20,000 parameters for a 11B model vs. 11B for full fine-tuning), enabling efficient multi-task serving with a single frozen model.",
        "Simplification of Prefix Tuning: Provides a simpler alternative to prefix tuning by only prepending soft prompts to the input rather than inserting them at every layer, reducing complexity while maintaining effectiveness.",
        "Robustness to Domain Shift: Shows that prompt tuning provides better robustness to domain transfer compared to full model tuning, likely due to keeping the pre-trained model's knowledge frozen."
      ]}
      relatedConcepts={[
        { name: "Prompt Engineering", slug: "prompt-engineering" },
        { name: "Parameter-Efficient Fine-Tuning", slug: "parameter-efficient-fine-tuning" },
        { name: "Transfer Learning", slug: "transfer-learning" },
        { name: "Few-Shot Learning", slug: "few-shot-learning" }
      ]}
      impact="Prompt tuning has become a foundational technique in parameter-efficient fine-tuning, especially for very large language models. The method's ability to achieve strong performance with minimal trainable parameters makes it ideal for scenarios where multiple tasks need to be served from a single model. The insight that effectiveness scales with model size has influenced subsequent research on efficient adaptation methods. Prompt tuning has been integrated into frameworks like HuggingFace's PEFT library and is widely used in both research and production environments. The technique has also inspired related methods such as P-tuning and the broader field of soft prompt optimization."
    />
  );
}
