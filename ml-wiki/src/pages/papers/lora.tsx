import PaperLayout from "../../components/PaperLayout";

export default function LoRAPaper() {
  return (
    <PaperLayout
      title="LoRA: Low-Rank Adaptation of Large Language Models"
      authors="Hu, E., Shen, Y., Wallis, P., Allen-Zhu, Z., Li, Y., Wang, S., Wang, L., & Chen, W."
      year="2021"
      venue="arXiv preprint"
      arxivId="2106.09685v2"
      arxivUrl="https://arxiv.org/abs/2106.09685"
      abstract="An important paradigm of natural language processing consists of large-scale pre-training on general domain data and adaptation to particular tasks or domains. As we pre-train larger models, full fine-tuning, which retrains all model parameters, becomes less feasible. We propose Low-Rank Adaptation, or LoRA, which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture, greatly reducing the number of trainable parameters for downstream tasks. Compared to GPT-3 175B fine-tuned with Adam, LoRA can reduce the number of trainable parameters by 10,000 times and the GPU memory requirement by 3 times."
      keyContributions={[
        "Low-Rank Decomposition: Proposes representing weight updates ΔW as a product of two low-rank matrices: ΔW = BA, where B ∈ ℝ^(d×r) and A ∈ ℝ^(r×k), with rank r ≪ min(d,k). This reduces trainable parameters from |ΔW| to 2×d×r.",
        "No Inference Latency: During deployment, the low-rank matrices can be merged with frozen weights (W = W₀ + BA), introducing zero additional latency compared to the original model.",
        "Task Switching: Multiple LoRA modules can be stored and swapped efficiently, enabling quick task switching by replacing just the small adapter matrices rather than the entire model.",
        "Empirical Validation: Demonstrates that very low ranks (r=1 or r=2) suffice for adaptation on multiple tasks, even when the full rank is 12,288, suggesting the intrinsic dimensionality of adaptation is low.",
        "Memory Efficiency: For GPT-3 175B with r=4, reduces checkpoint size from 350GB to 35MB (~10,000× reduction) and VRAM usage from 1.2TB to 350GB during training."
      ]}
      relatedConcepts={[
        { name: "Low-Rank Adaptation", slug: "low-rank-adaptation" },
        { name: "Parameter-Efficient Fine-Tuning", slug: "parameter-efficient-fine-tuning" },
        { name: "Transformer Architecture", slug: "transformer-architecture" },
        { name: "Transfer Learning", slug: "transfer-learning" }
      ]}
      impact="LoRA has become one of the most widely adopted parameter-efficient fine-tuning methods for large language models. Its practical advantages—no inference latency, easy task switching, and massive parameter reduction—make it ideal for production deployment scenarios. The theoretical insight that adaptation has low intrinsic rank has influenced subsequent research on efficient fine-tuning and our understanding of how pre-trained models adapt to downstream tasks. The method has been integrated into popular libraries (HuggingFace PEFT) and is used extensively in the open-source LLM community."
    />
  );
}
