import PaperLayout from "../../components/PaperLayout";

export default function AbsoluteEvaluationMeasuresMLSurvey() {
  return (
    <PaperLayout
      title="Absolute Evaluation Measures for Machine Learning: A Survey"
      authors="Beddar-Wiesing, S., Moallemy-Oureh, A., Kempkes, M., & Thomas, J. M."
      year="2025"
      venue="arXiv preprint"
      arxivId="2507.03392v1"
      arxivUrl="https://arxiv.org/abs/2507.03392"
      abstract="Machine Learning is a diverse field applied across various domains such as computer science, social sciences, medicine, chemistry, and finance. This diversity results in varied evaluation approaches, making it difficult to compare models effectively. Absolute evaluation measures offer a practical solution by assessing a model's performance on a fixed scale, independent of reference models and data ranges, enabling explicit comparisons. However, many commonly used measures are not universally applicable, leading to a lack of comprehensive guidance on their appropriate use. This survey addresses this gap by providing an overview of absolute evaluation metrics in ML, organized by the type of learning problem. While classification metrics have been extensively studied, this work also covers clustering, regression, and ranking metrics."
      keyContributions={[
        "Comprehensive survey of absolute evaluation measures for ML organized by learning problem type (classification, clustering, ranking)",
        "Decision trees for metric selection based on data characteristics (balanced/imbalanced, single/multi-class)",
        "Systematic categorization of metrics by error type appropriateness (Type-1 vs Type-2 errors)",
        "Discussion of chance-corrected measures (Cohen's Kappa, MCC, Scott's Pi, ARI) for imbalanced data",
        "Coverage of domain-specific measures for image, text, and graph learning tasks"
      ]}
      relatedConcepts={[
        { name: "Confusion Matrix", slug: "confusion-matrix" },
        { name: "Precision and Recall", slug: "precision-recall" },
        { name: "F-Score", slug: "f-score" },
        { name: "ROC Curve", slug: "roc-curve" },
        { name: "Matthews Correlation Coefficient", slug: "matthews-correlation-coefficient" },
        { name: "Cohen's Kappa", slug: "cohens-kappa" },
        { name: "BLEU Score", slug: "bleu-score" },
        { name: "ROUGE Metrics", slug: "rouge-metrics" }
      ]}
      impact="Provides a unified framework for selecting appropriate evaluation metrics in ML by organizing measures according to learning problem characteristics. Addresses the critical gap in comprehensive guidance for metric selection, enabling practitioners to make informed choices based on data balance, number of classes, and error type priorities. The decision trees offer practical tools for metric selection across classification, clustering, and ranking tasks."
    />
  );
}
