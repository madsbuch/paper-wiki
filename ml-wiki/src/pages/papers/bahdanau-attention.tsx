import PaperLayout from "../../components/PaperLayout";

export default function BahdanauAttention() {
  return (
    <PaperLayout
      title="Neural Machine Translation by Jointly Learning to Align and Translate"
      authors="Bahdanau, D., Cho, K., & Bengio, Y."
      year="2014"
      venue="International Conference on Learning Representations (ICLR 2015)"
      arxivId="1409.0473v7"
      pdfPath="/papers/1409.0473v7.pdf"
      abstract="Neural machine translation is a recently proposed approach to machine translation. Unlike the traditional statistical machine translation, the neural machine translation aims at building a single neural network that can be jointly tuned to maximize the translation performance. The models proposed recently for neural machine translation often belong to a family of encoder-decoders and encode a source sentence into a fixed-length vector from which a decoder generates a translation. In this paper, we conjecture that the use of a fixed-length vector is a bottleneck in improving the performance of this basic encoder-decoder architecture, and propose to extend this by allowing a model to automatically (soft-)search for parts of a source sentence that are relevant to predicting a target word, without having to form these parts as a hard segment explicitly. With this new approach, we achieve a translation performance comparable to the existing state-of-the-art phrase-based system on the task of English-to-French translation. Furthermore, qualitative analysis reveals that the (soft-)alignments found by the model agree well with our intuition."
      keyContributions={[
        "Invented the attention mechanism for neural networks",
        "Introduced soft alignment for sequence-to-sequence models",
        "Solved the fixed-length context vector bottleneck in encoder-decoder architectures",
        "Enabled neural machine translation to handle long sequences effectively",
        "Provided interpretable alignments between source and target sequences"
      ]}
      relatedConcepts={[
        { name: "Attention Mechanism", slug: "attention-mechanism" },
        { name: "Encoder-Decoder Architecture", slug: "encoder-decoder" },
        { name: "Sequence-to-Sequence Models", slug: "seq2seq" },
        { name: "Soft Alignment", slug: "soft-alignment" },
        { name: "Bidirectional RNN", slug: "bidirectional-rnn" }
      ]}
      impact="This paper introduced the attention mechanism, which became one of the most important innovations in deep learning. It directly inspired 'Attention Is All You Need' (the Transformer), which built an entire architecture around attention. The attention mechanism is now fundamental to modern NLP, appearing in BERT, GPT, and virtually every state-of-the-art language model. This paper has been cited over 50,000 times and fundamentally changed how neural networks process sequential data."
    />
  );
}
