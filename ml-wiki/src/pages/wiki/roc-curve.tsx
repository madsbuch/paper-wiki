import WikiLayout from "../../components/WikiLayout";

export default function ROCCurve() {
  return (
    <WikiLayout
      title="ROC Curve (Receiver Operating Characteristic)"
      description="A graphical evaluation tool that plots the true positive rate against the false positive rate across different classification thresholds"
      category="Machine Learning Evaluation"
      difficulty="intermediate"
      tags={["evaluation", "classification", "visualization", "threshold-analysis"]}
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
            The <strong>ROC curve</strong> (Receiver Operating Characteristic curve) is a graphical tool for visualizing classifier performance across all possible decision thresholds. It plots the True Positive Rate (TPR) on the y-axis against the False Positive Rate (FPR) on the x-axis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Components</h2>
          
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Axes</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Y-axis</strong>: True Positive Rate (TPR) = TP / (TP + FN)
              <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                <li>Also called Recall, Sensitivity, or Hit Rate</li>
              </ul>
            </li>
            <li><strong>X-axis</strong>: False Positive Rate (FPR) = FP / (FP + TN)
              <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                <li>Proportion of negatives incorrectly classified as positive</li>
              </ul>
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Reference Lines</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Diagonal line</strong>: Random classifier (TPR = FPR)</li>
            <li><strong>Top-left corner</strong>: Perfect classifier (TPR = 1, FPR = 0)</li>
            <li><strong>Below diagonal</strong>: Worse than random</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">AUC-ROC (Area Under the Curve)</h2>
          <p className="text-slate-700 mb-4">
            The <strong>AUC-ROC</strong> quantifies overall classifier performance as a single number:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>AUC = 1.0</strong>: Perfect classifier</li>
            <li><strong>AUC = 0.5</strong>: Random classifier (no discriminative power)</li>
            <li><strong>AUC &lt; 0.5</strong>: Worse than random (predictions may be inverted)</li>
            <li><strong>AUC &gt; 0.7</strong>: Generally considered acceptable</li>
            <li><strong>AUC &gt; 0.8</strong>: Good performance</li>
            <li><strong>AUC &gt; 0.9</strong>: Excellent performance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Interpretation</h2>
          <p className="text-slate-700 mb-4">
            The AUC-ROC represents the probability that the classifier will rank a randomly chosen positive instance higher than a randomly chosen negative instance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Advantages</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Threshold-independent</strong>: Evaluates performance across all thresholds</li>
            <li><strong>Scale-invariant</strong>: Measures prediction quality, not raw values</li>
            <li><strong>Classification-threshold-invariant</strong>: Not affected by threshold choice</li>
            <li><strong>Easy to interpret</strong>: Single number summary</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitations</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Overly optimistic for imbalanced datasets</strong>: Can show high AUC even with poor minority class performance</li>
            <li><strong>Equal weighting</strong>: Treats all classification errors equally</li>
            <li><strong>Not ideal for imbalanced data</strong>: Precision-Recall curve often better</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">When to Use</h2>
          
          <p className="text-slate-700 mb-4"><strong>Use ROC-AUC when:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Classes are relatively balanced</li>
            <li>Both positive and negative classes are equally important</li>
            <li>You need threshold-independent comparison</li>
            <li>Probability calibration matters</li>
          </ul>

          <p className="text-slate-700 mb-4 mt-6"><strong>Avoid ROC-AUC when:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Severe class imbalance exists (prefer AUC-PR)</li>
            <li>Positive class is rare and critical</li>
            <li>False positives and false negatives have very different costs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Alternatives</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Precision-Recall Curve (AUC-PR)</strong>: Better for imbalanced datasets</li>
            <li><strong>DET Curve</strong>: Detection Error Trade-off curve, often more linear</li>
            <li><strong>Cost curves</strong>: Incorporate misclassification costs directly</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Multi-Class Extensions</h2>
          <p className="text-slate-700 mb-4">For multi-class problems:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>One-vs-All (OvA)</strong>: One ROC curve per class</li>
            <li><strong>One-vs-One (OvO)</strong>: ROC curve for each class pair</li>
            <li><strong>Macro-average</strong>: Average AUC across classes</li>
            <li><strong>Micro-average</strong>: Aggregate predictions across classes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Analogies</h2>
          <p className="text-slate-700 mb-4">
            Think of the ROC curve as a trade-off diagram for a metal detector at airport security. Moving the sensitivity threshold:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Higher threshold (left side)</strong>: Few alarms but might miss threats (low FPR, low TPR)</li>
            <li><strong>Lower threshold (right side)</strong>: Catches all threats but many false alarms (high FPR, high TPR)</li>
            <li><strong>Ideal detector</strong>: Catches all threats with minimal false alarms (top-left corner)</li>
            <li><strong>Random detector</strong>: False alarms proportional to detections (diagonal line)</li>
          </ul>
          <p className="text-slate-700 mb-4">
            The AUC summarizes how well the detector performs across all sensitivity settings.
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
