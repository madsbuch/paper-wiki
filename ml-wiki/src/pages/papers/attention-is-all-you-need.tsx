import PaperLayout from "../../components/PaperLayout";

export default function AttentionIsAllYouNeed() {
  return (
    <PaperLayout
      title="Attention Is All You Need"
      authors="Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I."
      year="2017"
      venue="31st Conference on Neural Information Processing Systems (NIPS 2017)"
      arxivId="1706.03762v7"
      pdfPath="/papers/1706.03762v7.pdf"
      abstract="The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely."
      keyContributions={[
        "Introduced the Transformer architecture",
        "Proposed scaled dot-product attention",
        "Demonstrated multi-head attention mechanism",
        "Achieved state-of-the-art results on machine translation",
        "Enabled massive parallelization in training"
      ]}
      relatedConcepts={[
        { name: "Transformer Architecture", slug: "transformer-architecture" },
        { name: "Self-Attention", slug: "self-attention" },
        { name: "Multi-Head Attention", slug: "multi-head-attention" },
        { name: "Scaled Dot-Product Attention", slug: "scaled-dot-product-attention" },
        { name: "Positional Encoding", slug: "positional-encoding" },
        { name: "Encoder-Decoder Architecture", slug: "encoder-decoder" }
      ]}
      impact="This paper revolutionized natural language processing and became the foundation for modern language models including GPT, BERT, T5, and countless others. It has been cited over 100,000 times and fundamentally changed how we approach sequence modeling tasks."
    />
  );
}
