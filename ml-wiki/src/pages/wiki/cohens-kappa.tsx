import WikiLayout from "../../components/WikiLayout";

export default function CohensKappa() {
  return (
    <WikiLayout
      title="Cohen's Kappa"
      description="A chance-corrected measure of inter-rater agreement that adjusts for the agreement expected by random chance"
      category="Machine Learning Evaluation"
      difficulty="intermediate"
      tags={["evaluation", "classification", "chance-correction", "agreement"]}
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
            <strong>Cohen's Kappa (κ)</strong> is a chance-corrected metric for evaluating classification performance, particularly useful for imbalanced datasets. It measures the agreement between predicted and actual classifications while accounting for the agreement that would occur purely by chance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Formula</h2>
          <p className="text-slate-700 mb-4">
            <strong>κ = (p₀ - pₑ) / (1 - pₑ)</strong>
          </p>
          <p className="text-slate-700 mb-4">Where:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>p₀</strong>: Observed agreement (accuracy) = (TP + TN) / (TP + TN + FP + FN)</li>
            <li><strong>pₑ</strong>: Expected agreement by chance</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Calculating Expected Agreement (pₑ)</h3>
          <p className="text-slate-700 mb-4">For binary classification:</p>
          <p className="text-slate-700 mb-4">
            <strong>pₑ = p_correct + p_incorrect</strong>
          </p>
          <p className="text-slate-700 mb-4">Where:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>p_correct</strong> = [(TP + FP)(TP + FN)] / N²</li>
            <li><strong>p_incorrect</strong> = [(FN + TN)(FP + TN)] / N²</li>
            <li><strong>N</strong> = Total number of samples</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Interpretation</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>κ = 1</strong>: Perfect agreement</li>
            <li><strong>κ = 0</strong>: Agreement no better than chance</li>
            <li><strong>κ &lt; 0</strong>: Agreement worse than chance (rare)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Landis and Koch Guidelines (1977)</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>κ &lt; 0</strong>: Poor agreement</li>
            <li><strong>0.00 - 0.20</strong>: Slight agreement</li>
            <li><strong>0.21 - 0.40</strong>: Fair agreement</li>
            <li><strong>0.41 - 0.60</strong>: Moderate agreement</li>
            <li><strong>0.61 - 0.80</strong>: Substantial agreement</li>
            <li><strong>0.81 - 1.00</strong>: Almost perfect agreement</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Properties</h2>
          
          <h3 className="text-xl font-semibold text-slate-900 mb-3">1. Chance Correction</h3>
          <p className="text-slate-700 mb-4">
            Unlike accuracy, κ explicitly subtracts the agreement expected by random predictions based on the marginal distributions.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. Handles Imbalance</h3>
          <p className="text-slate-700 mb-4">
            κ remains informative even with class imbalance, as it accounts for the base rate of each class.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Inter-Rater Agreement Origins</h3>
          <p className="text-slate-700 mb-4">
            Originally designed to measure agreement between two human raters, adapted for ML to measure agreement between predictions and ground truth.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Multi-Class Extension: Cohen's Kappa_n</h2>
          <p className="text-slate-700 mb-4">For C classes:</p>
          <p className="text-slate-700 mb-4">
            <strong>κ_n = (p₀ - pₑ) / (1 - pₑ)</strong>
          </p>
          <p className="text-slate-700 mb-4">
            With <strong>pₑ = 1/C</strong> for balanced classes (base rate agreement).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Weighted Kappa</h2>
          <p className="text-slate-700 mb-4">
            <strong>Cohen's weighted kappa (κ_w)</strong> assigns different weights to different types of disagreement:
          </p>
          <p className="text-slate-700 mb-4">
            <strong>κ_w = Σ(w<sub>ij</sub> · p<sub>ij</sub>) - Σ(w<sub>ij</sub> · p<sub>i</sub>p<sub>j</sub>) / 1 - Σ(w<sub>ij</sub> · p<sub>i</sub>p<sub>j</sub>)</strong>
          </p>
          <p className="text-slate-700 mb-4">Useful for:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Ordinal classifications (e.g., disease severity: mild, moderate, severe)</li>
            <li>Cost-sensitive classification</li>
            <li>Different misclassification penalties</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Comparison with Other Metrics</h2>
          
          <h3 className="text-xl font-semibold text-slate-900 mb-3">vs. Accuracy</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Accuracy doesn't account for chance agreement</li>
            <li>κ adjusts for expected random performance</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">vs. Matthews Correlation Coefficient (MCC)</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Both are chance-corrected</li>
            <li>MCC more sensitive to class imbalance in binary case</li>
            <li>MCC generally preferred for binary classification</li>
            <li>κ better established for multi-class and ordinal data</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">vs. Scott's Pi</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Both are chance-corrected agreement measures</li>
            <li>κ uses marginal distributions from both raters</li>
            <li>Scott's Pi assumes both raters have the same distribution</li>
            <li>For ML evaluation, they often give similar results</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Advantages</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Chance-corrected</strong>: Explicitly accounts for random agreement</li>
            <li><strong>Interpretable</strong>: Well-established interpretation guidelines</li>
            <li><strong>Handles imbalance</strong>: Remains meaningful with skewed classes</li>
            <li><strong>Multi-class support</strong>: Naturally extends to multiple classes</li>
            <li><strong>Weighted variant</strong>: Can incorporate ordinal relationships</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitations</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Less sensitive than MCC</strong>: For severe binary imbalance</li>
            <li><strong>Interpretation complexity</strong>: Requires understanding of chance correction</li>
            <li><strong>Affected by prevalence</strong>: Can vary with class distribution changes</li>
            <li><strong>Paradoxes</strong>: Can produce unintuitive results in edge cases</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">When to Use</h2>
          
          <p className="text-slate-700 mb-4"><strong>Use Cohen's Kappa when:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Multi-class classification with imbalanced classes</li>
            <li>You need an established, well-understood metric</li>
            <li>Comparing classifiers across different datasets</li>
            <li>Ordinal classifications (use weighted κ)</li>
            <li>Want to ensure performance better than random</li>
          </ul>

          <p className="text-slate-700 mb-4 mt-6"><strong>Consider alternatives when:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Binary classification with severe imbalance (prefer MCC)</li>
            <li>Only positive class matters (prefer precision/recall)</li>
            <li>Need maximum sensitivity to imbalance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Practical Example</h2>
          <p className="text-slate-700 mb-4">
            <strong>Scenario:</strong> Disease diagnosis with 10% prevalence
          </p>
          
          <p className="text-slate-700 mb-4">A classifier that always predicts "healthy":</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Accuracy</strong>: 90% (looks good!)</li>
            <li><strong>κ</strong>: ≈ 0 (correctly shows no better than chance)</li>
          </ul>

          <p className="text-slate-700 mb-4 mt-4">A good classifier with 85% sensitivity, 95% specificity:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Accuracy</strong>: 94%</li>
            <li><strong>κ</strong>: ≈ 0.76 (substantial agreement, clearly better than random)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Analogies</h2>
          <p className="text-slate-700 mb-4">
            Imagine two teachers grading essays as pass/fail, where most essays pass (imbalanced):
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Accuracy</strong> just counts agreement, which will be high if both teachers mostly give "pass"</li>
            <li><strong>Cohen's Kappa</strong> asks: "Are they agreeing more than we'd expect if they were just randomly giving grades based on their individual tendencies?"</li>
          </ul>
          <p className="text-slate-700 mb-4">
            If Teacher A passes 90% and Teacher B passes 85%, we'd expect about 80% agreement just by chance (0.9 × 0.85 + 0.1 × 0.15). Kappa measures agreement beyond this baseline.
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
