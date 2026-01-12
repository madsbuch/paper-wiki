import PaperLayout from "../../components/PaperLayout";

export default function BERT() {
  return (
    <PaperLayout
      title="BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
      authors="Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K."
      year="2018"
      venue="NAACL 2019"
      arxivId="1810.04805v2"
      pdfPath="/papers/1810.04805v2.pdf"
      abstract="We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pretrain deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers. As a result, the pre-trained BERT model can be finetuned with just one additional output layer to create state-of-the-art models for a wide range of tasks, such as question answering and language inference, without substantial task-specific architecture modifications."
      keyContributions={[
        "Introduced bidirectional pretraining for language models",
        "Proposed masked language model (MLM) training objective",
        "Introduced next sentence prediction (NSP) task",
        "Achieved state-of-the-art on 11 NLP tasks",
        "Demonstrated the power of transfer learning via fine-tuning"
      ]}
      relatedConcepts={[
        { name: "Masked Language Model", slug: "masked-language-model" },
        { name: "Bidirectional Pretraining", slug: "bidirectional-pretraining" },
        { name: "Next Sentence Prediction", slug: "next-sentence-prediction" },
        { name: "Fine-Tuning", slug: "fine-tuning" },
        { name: "Transfer Learning", slug: "transfer-learning" }
      ]}
      impact="BERT revolutionized NLP by showing that bidirectional pretraining produces representations that understand context from both directions. This approach became foundational for countless downstream applications and inspired a generation of BERT-based models. It demonstrated that a single pretrained model could be adapted to many tasks with minimal architecture changes, making NLP more accessible and practical."
    />
  );
}
