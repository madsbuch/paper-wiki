import WikiLayout from "../../components/WikiLayout";

export default function ConfusionMatrix() {
  return (
    <WikiLayout
      title="Confusion Matrix"
      description="A table layout that visualizes the performance of a classification algorithm by showing predicted vs. actual class labels"
      category="Machine Learning Evaluation"
      difficulty="beginner"
      tags={["evaluation", "classification", "metrics", "supervised-learning"]}
      citations={[
        {
          paper: "Absolute Evaluation Measures for Machine Learning: A Survey",
          authors: "Beddar-Wiesing et al.",
          year: "2025"
        }
      ]}
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            A <strong>confusion matrix</strong> is a fundamental tool for evaluating classification models. It provides a tabular summary of predictions versus actual class labels, enabling detailed analysis of where a model succeeds and fails.
          </p>
          <p className="text-slate-700 mb-4">
            For a binary classification problem, the confusion matrix has four components:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>True Positive (TP)</strong>: Correctly predicted positive class</li>
            <li><strong>True Negative (TN)</strong>: Correctly predicted negative class</li>
            <li><strong>False Positive (FP)</strong>: Incorrectly predicted positive (Type I error)</li>
            <li><strong>False Negative (FN)</strong>: Incorrectly predicted negative (Type II error)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Multi-Class Extension</h2>
          <p className="text-slate-700 mb-4">
            For C classes, the confusion matrix is a C×C matrix where entry c<sub>i,j</sub> represents the number of samples belonging to class i but predicted as class j. The diagonal entries represent correct classifications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Derived Metrics</h2>
          <p className="text-slate-700 mb-4">
            The confusion matrix forms the foundation for many evaluation metrics:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Accuracy</strong>: (TP + TN) / (TP + TN + FP + FN)</li>
            <li><strong>Precision</strong>: TP / (TP + FP)</li>
            <li><strong>Recall (Sensitivity)</strong>: TP / (TP + FN)</li>
            <li><strong>Specificity</strong>: TN / (TN + FP)</li>
            <li><strong>F1-Score</strong>: Harmonic mean of precision and recall</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Use Cases</h2>
          <p className="text-slate-700 mb-4">
            Confusion matrices are essential for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Understanding class-specific model performance</li>
            <li>Identifying systematic misclassification patterns</li>
            <li>Diagnosing imbalanced data issues</li>
            <li>Selecting appropriate evaluation metrics based on error types</li>
            <li>Comparing multiple models on the same dataset</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Analogies</h2>
          <p className="text-slate-700 mb-4">
            Think of a confusion matrix as a scorecard for a multiple-choice test. The diagonal shows questions answered correctly for each topic, while off-diagonal entries show which topics were confused with each other.
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
