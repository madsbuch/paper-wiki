import PaperLayout from "../../components/PaperLayout";

export default function FlashAttentionPaper() {
  return (
    <PaperLayout
      title="FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness"
      authors="Dao, T., Fu, D. Y., Ermon, S., Rudra, A., & Ré, C."
      year="2022"
      venue="NeurIPS 2022"
      arxivId="2205.14135v2"
      arxivUrl="https://arxiv.org/abs/2205.14135"
      abstract="Transformers are slow and memory-hungry on long sequences, since the time and memory complexity of self-attention are quadratic in sequence length. Approximate attention methods have attempted to address this problem by trading off model quality to reduce the compute complexity, but often do not achieve wall-clock speedup. We argue that a missing principle is making attention algorithms IO-aware—accounting for reads and writes between levels of GPU memory. We propose FlashAttention, an IO-aware exact attention algorithm that uses tiling to reduce the number of memory reads/writes between GPU high bandwidth memory (HBM) and GPU on-chip SRAM. FlashAttention trains Transformers faster than existing baselines: 15% end-to-end wall-clock speedup on BERT-large (seq. length 512), 3× speedup on GPT-2 (seq. length 1K), and 2.4× speedup on long-range arena (seq. length 1K-4K). FlashAttention and block-sparse FlashAttention enable longer context in Transformers, yielding higher quality models and entirely new capabilities: the first Transformers to achieve better-than-chance performance on the Path-X challenge (seq. length 16K, 61.4% accuracy) and Path-256 (seq. length 64K, 63.1% accuracy)."
      keyContributions={[
        "IO-Aware Attention Algorithm: Introduces the concept of IO-awareness to attention computation, accounting for data movement between GPU memory hierarchies (HBM and SRAM). Reduces HBM accesses from Θ(Nd + N²) to Θ(N²d²M⁻¹), where N is sequence length, d is head dimension, and M is SRAM size.",
        "Tiling and Recomputation: Uses tiling to split the attention computation into blocks that fit in fast SRAM, avoiding the need to materialize the full N×N attention matrix in slow HBM. Applies kernel fusion to compute softmax without storing large intermediate values. In the backward pass, stores only the output and softmax normalization statistics, recomputing the attention matrix from blocks of Q, K, V in SRAM.",
        "Block-Sparse FlashAttention: Extends FlashAttention to support block-sparse attention patterns, where the attention matrix has a sparse structure. Achieves 2-4× speedup compared to standard attention, even faster than approximate attention methods while maintaining higher quality.",
        "Empirical Speedups: Demonstrates substantial wall-clock speedups: 15% faster BERT-large training (sequence length 512), 3× faster GPT-2 training (sequence length 1K), and 2.4× speedup on Long Range Arena tasks (sequence length 1K-4K). Enables training with sequences up to 64K tokens.",
        "Extended Context Capabilities: Enables Transformers to handle significantly longer contexts than previously possible. Achieves the first better-than-chance results on Path-X (sequence length 16K) and Path-256 (sequence length 64K) benchmarks. Improves model quality with 0.7 better perplexity on GPT-2 and 6.4 point improvement on long-document classification."
      ]}
      relatedConcepts={[
        { name: "Attention Mechanism", slug: "attention-mechanism" },
        { name: "IO-Aware Algorithms", slug: "io-aware-algorithms" },
        { name: "GPU Memory Hierarchy", slug: "gpu-memory-hierarchy" },
        { name: "Tiling Techniques", slug: "tiling-techniques" },
        { name: "Kernel Fusion", slug: "kernel-fusion" },
        { name: "Block-Sparse Attention", slug: "block-sparse-attention" }
      ]}
      impact="FlashAttention has been widely adopted in the ML community and integrated into major frameworks including PyTorch, Hugging Face Transformers, and various production systems. It has enabled practical training and inference of long-context models that were previously infeasible. The IO-aware approach has inspired similar optimizations for other neural network operations and has become a standard technique for efficient Transformer training. FlashAttention's success demonstrates the critical importance of hardware-aware algorithm design in modern deep learning."
    />
  );
}
