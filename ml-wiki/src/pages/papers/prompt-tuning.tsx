import PaperLayout from "../../components/PaperLayout";

export default function PromptTuningPaper() {
  return (
    <PaperLayout
      title="The Power of Scale for Parameter-Efficient Prompt Tuning"
      authors="Lester, B., Al-Rfou, R., & Constant, N."
      year={"2021"}
      venue="arXiv preprint"
      arxivId="2104.08691v2"
      arxivUrl="https://arxiv.org/abs/2104.08691"
      abstract="In this work, we explore 'prompt tuning,' a simple yet effective mechanism for learning 'soft prompts' to condition frozen language models to perform specific downstream tasks. Unlike the discrete text prompts used by GPT-3, soft prompts are learned through backpropagation and can be tuned to incorporate signals from any number of labeled examples. Our end-to-end learned approach outperforms GPT-3's few-shot learning by a large margin. More remarkably, through ablations on model size using T5, we show that prompt tuning becomes more competitive with scale: as models exceed billions of parameters, our method 'closes the gap' and matches the strong performance of model tuning (where all model weights are tuned). This finding is especially relevant because large models are costly to share and serve and the ability to reuse one frozen model for multiple downstream tasks can ease this burden."
      keyContributions={[
        "Introduces prompt tuning: learning continuous 'soft prompts' to adapt frozen language models to downstream tasks",
        "Demonstrates that prompt tuning matches full model tuning performance at scale (11B+ parameters) while using 20,000× fewer parameters per task",
        "Shows prompt tuning outperforms GPT-3 few-shot learning by large margins despite using much smaller models",
        "Reveals that effectiveness improves with model scale - larger models need shorter prompts and are more robust to initialization",
        "Demonstrates superior zero-shot domain transfer compared to model tuning, avoiding overfitting",
        "Introduces efficient prompt ensembling technique that enables multiple task adaptations with a single frozen model",
      ]}
      relatedConcepts={[
        { name: "Prompt Engineering", slug: "prompt-engineering" },
        { name: "Transfer Learning", slug: "transfer-learning" },
        {
          name: "Parameter-Efficient Fine-Tuning",
          slug: "parameter-efficient-fine-tuning",
        },
      ]}
      impact="This paper introduced prompt tuning as a practical parameter-efficient adaptation method, showing that with sufficient model scale, a handful of trainable prompt tokens can match full fine-tuning performance. The work demonstrated that a single frozen 11B parameter model can serve multiple tasks by only swapping small prompt parameters (20K vs 11B), enabling efficient multi-task deployment. The finding that prompt tuning improves with scale has influenced the design of large language model deployment strategies and spawned research into various soft prompting techniques."
    ></PaperLayout>
  );
}
