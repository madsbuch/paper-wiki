import WikiLayout from "../../components/WikiLayout";

export default function MatthewsCorrelationCoefficient() {
  return (
    <WikiLayout
      title="Matthews Correlation Coefficient (MCC)"
      description="A chance-corrected evaluation metric that considers all entries of the confusion matrix, providing reliable assessment for imbalanced datasets"
      category="Machine Learning Evaluation"
      difficulty="intermediate"
      tags={["evaluation", "classification", "imbalanced-data", "chance-correction"]}
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
            The <strong>Matthews Correlation Coefficient (MCC)</strong>, also known as the phi coefficient, is a balanced evaluation metric that incorporates all four entries of the confusion matrix. It is particularly valuable for imbalanced datasets and provides chance correction, making it superior to accuracy in many scenarios.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Formula</h2>
          <p className="text-slate-700 mb-4">
            <strong>MCC = (TP · TN - FP · FN) / √[(TP + FP)(TP + FN)(TN + FP)(TN + FN)]</strong>
          </p>
          <p className="text-slate-700 mb-4">Where:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>TP</strong>: True Positives</li>
            <li><strong>TN</strong>: True Negatives</li>
            <li><strong>FP</strong>: False Positives</li>
            <li><strong>FN</strong>: False Negatives</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Interpretation</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>MCC = +1</strong>: Perfect prediction</li>
            <li><strong>MCC = 0</strong>: Random prediction (no better than chance)</li>
            <li><strong>MCC = -1</strong>: Total disagreement (complete inverse prediction)</li>
          </ul>
          <p className="text-slate-700 mb-4">
            The MCC essentially measures the correlation between observed and predicted classifications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Properties</h2>
          
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">1. Chance-Corrected</h3>
          <p className="text-slate-700 mb-4">
            MCC automatically accounts for imbalance. A random classifier achieves MCC ≈ 0 regardless of class distribution, because the numerator (TP·TN - FP·FN) will be approximately zero.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. All Confusion Matrix Entries</h3>
          <p className="text-slate-700 mb-4">
            Unlike accuracy, precision, or recall, MCC uses all four values (TP, TN, FP, FN), providing a complete picture of classifier performance.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Symmetric</h3>
          <p className="text-slate-700 mb-4">
            MCC treats both classes equally—swapping positive and negative classes gives the same absolute value.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">4. Reliable for Imbalanced Data</h3>
          <p className="text-slate-700 mb-4">
            MCC remains informative even when one class dominates, whereas accuracy can be misleadingly high.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Advantages</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Robust to class imbalance</strong>: Works well even with severe imbalance</li>
            <li><strong>Single, interpretable value</strong>: Ranges from -1 to +1</li>
            <li><strong>Incorporates all prediction types</strong>: Considers both classes equally</li>
            <li><strong>Chance-corrected</strong>: Explicitly accounts for random agreement</li>
            <li><strong>Statistically grounded</strong>: Based on Pearson correlation coefficient</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Comparison with Other Metrics</h2>
          
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">vs. Accuracy</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Accuracy can be high due to predicting majority class</li>
            <li>MCC penalizes such naive strategies</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">vs. F1-Score</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>F1 focuses only on positive class (uses TP, FP, FN)</li>
            <li>MCC considers both classes equally (uses all four confusion matrix values)</li>
            <li>MCC more informative for binary classification</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">vs. Cohen's Kappa</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Both are chance-corrected</li>
            <li>MCC more sensitive to class imbalance</li>
            <li>MCC preferred for binary classification; Kappa for multi-class</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">When to Use</h2>
          
          <p className="text-slate-700 mb-4"><strong>Prefer MCC when:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Dataset has class imbalance</li>
            <li>Both classes are important to predict correctly</li>
            <li>You need a single, robust metric</li>
            <li>Comparing models across different imbalance ratios</li>
            <li>You want to ensure performance better than random</li>
          </ul>

          <p className="text-slate-700 mb-4 mt-6"><strong>Consider alternatives when:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Multi-class problems (use RC statistics extension)</li>
            <li>One class is much more important (use class-specific metrics)</li>
            <li>Computational simplicity is priority (use simpler metrics)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Multi-Class Extension: RC Statistics</h2>
          <p className="text-slate-700 mb-4">
            For C classes, MCC extends to the <strong>RC statistics</strong>:
          </p>
          <p className="text-slate-700 mb-4">
            <strong>RC = Σ(c<sub>ii</sub> · c<sub>jk</sub> - c<sub>ij</sub> · c<sub>ki</sub>) / √[Σc<sub>ij</sub>(...) · Σc<sub>ji</sub>(...)]</strong>
          </p>
          <p className="text-slate-700 mb-4">
            This preserves MCC's properties for multi-class scenarios.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Practical Example</h2>
          <p className="text-slate-700 mb-4">
            Consider a medical test for a rare disease (1% prevalence):
          </p>
          
          <p className="text-slate-700 mb-4"><strong>Naive classifier:</strong> Always predict "healthy"</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Accuracy: 99%</li>
            <li>MCC: ≈ 0 (no better than random for detecting disease)</li>
          </ul>

          <p className="text-slate-700 mb-4 mt-4"><strong>Good classifier:</strong> Catches 80% of cases with 95% specificity</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Accuracy: 95.8%</li>
            <li>MCC: ≈ 0.62 (substantially better than random)</li>
          </ul>

          <p className="text-slate-700 mb-4">
            MCC correctly identifies that the naive classifier is useless despite high accuracy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Analogies</h2>
          <p className="text-slate-700 mb-4">
            Think of MCC as a balanced judge evaluating two aspects of performance:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Accuracy</strong> is like grading a student only on easy questions they get right (can be misleadingly high)</li>
            <li><strong>MCC</strong> is like evaluating performance on both easy and hard questions, with a penalty for getting hard ones wrong, and credit only given for performance better than guessing</li>
          </ul>
          <p className="text-slate-700 mb-4">
            The correlation perspective: MCC measures how well predictions and reality "move together"—when actual is positive, prediction is positive; when actual is negative, prediction is negative.
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
