import WikiLayout from "../../components/WikiLayout";

export default function PrecisionRecall() {
  return (
    <WikiLayout
      title="Precision and Recall"
      description="Fundamental classification metrics that measure the accuracy of positive predictions and the completeness of positive detection"
      category="Machine Learning Evaluation"
      difficulty="beginner"
      tags={["evaluation", "classification", "metrics", "information-retrieval"]}
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
            <strong>Precision</strong> and <strong>recall</strong> are complementary metrics that evaluate different aspects of a classification model's performance. They are particularly important when dealing with imbalanced datasets or when different types of errors have different costs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Definitions</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Precision</h3>
          <p className="text-slate-700 mb-4">
            Precision (also called Positive Predictive Value) measures the proportion of positive predictions that are actually correct:
          </p>
          <p className="text-slate-700 mb-4 font-semibold">
            Precision = TP / (TP + FP)
          </p>
          <p className="text-slate-700 mb-4">
            It answers: "Of all the items we predicted as positive, how many were truly positive?"
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Recall</h3>
          <p className="text-slate-700 mb-4">
            Recall (also called Sensitivity, Hit Rate, or True Positive Rate) measures the proportion of actual positives that were correctly identified:
          </p>
          <p className="text-slate-700 mb-4 font-semibold">
            Recall = TP / (TP + FN)
          </p>
          <p className="text-slate-700 mb-4">
            It answers: "Of all the actual positive items, how many did we successfully find?"
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Error Type Appropriateness</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Precision is Type-1 error appropriate</strong>: Minimizes false positives</li>
            <li><strong>Recall is Type-2 error appropriate</strong>: Minimizes false negatives</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Trade-offs</h2>
          <p className="text-slate-700 mb-4">
            There is typically a trade-off between precision and recall:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>High precision, low recall</strong>: Conservative model that only predicts positive when very confident</li>
            <li><strong>Low precision, high recall</strong>: Aggressive model that casts a wide net but includes many false positives</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Use Cases</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Prioritize Precision when:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>False positives are costly (e.g., spam filtering, fraud detection alerts)</li>
            <li>You want high confidence in positive predictions</li>
            <li>Resources for follow-up are limited</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Prioritize Recall when:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Missing positives is costly (e.g., disease diagnosis, security threats)</li>
            <li>You want to find as many relevant items as possible</li>
            <li>Follow-up verification is inexpensive</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Balanced Metrics</h2>
          <p className="text-slate-700 mb-4">
            When both precision and recall matter equally, use:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>F1-Score</strong>: Harmonic mean of precision and recall</li>
            <li><strong>F-beta Score</strong>: Weighted harmonic mean allowing customizable trade-off</li>
            <li><strong>Precision-Recall Curve</strong>: Visualizes the trade-off across thresholds</li>
            <li><strong>AUC-PR</strong>: Area under the precision-recall curve</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Analogies</h2>
          <p className="text-slate-700 mb-4">
            <strong>Precision</strong> is like a fisherman who only keeps fish that meet strict size requirements. High precision means few undersized fish slip through (low false positives), but some good fish might be thrown back (lower recall).
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Recall</strong> is like a fishing net with fine mesh that catches everything. High recall means you catch all the target fish (low false negatives), but you also catch debris and unwanted species (lower precision).
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
