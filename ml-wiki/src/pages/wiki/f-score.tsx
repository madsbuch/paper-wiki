import WikiLayout from "../../components/WikiLayout";

export default function FScore() {
  return (
    <WikiLayout
      title="F-Score (F-beta Score)"
      description="A weighted harmonic mean of precision and recall that balances the trade-off between Type-1 and Type-2 errors"
      category="Machine Learning Evaluation"
      difficulty="beginner"
      tags={["evaluation", "classification", "metrics", "harmonic-mean"]}
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
            The <strong>F-beta score</strong> (or F-score) is a metric that combines precision and recall into a single value using their weighted harmonic mean. It allows practitioners to balance the importance of Type-1 errors (false positives) and Type-2 errors (false negatives) through the parameter β.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Formula</h2>
          <p className="text-slate-700 mb-4 font-semibold">
            F<sub>β</sub> = (1 + β²) · (precision · recall) / (β² · precision + recall)
          </p>
          <p className="text-slate-700 mb-4">Where:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>precision</strong> = TP / (TP + FP)</li>
            <li><strong>recall</strong> = TP / (TP + FN)</li>
            <li><strong>β</strong> controls the weight given to recall versus precision</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Common Variants</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">F0.5-Score</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>β = 0.5</strong>: Emphasizes <strong>precision over recall</strong></li>
            <li>Use when false positives are more costly than false negatives</li>
            <li>Example: Email spam detection (marking legitimate emails as spam is worse)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">F1-Score</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>β = 1</strong>: <strong>Balances precision and recall equally</strong></li>
            <li>Most commonly used variant</li>
            <li>Harmonic mean of precision and recall</li>
            <li>Also known as Sørensen-Dice coefficient or Dice similarity coefficient</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">F2-Score</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>β = 2</strong>: Emphasizes <strong>recall over precision</strong></li>
            <li>Use when false negatives are more costly than false positives</li>
            <li>Example: Disease screening (missing a sick patient is worse)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Harmonic Mean?</h2>
          <p className="text-slate-700 mb-4">
            The F-score uses a harmonic mean (not arithmetic mean) because:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>It heavily penalizes extreme values</li>
            <li>A model must perform reasonably well on BOTH precision and recall to achieve a high F-score</li>
            <li>If either precision or recall is very low, the F-score will be low</li>
            <li>Example: precision=1.0, recall=0.1 → F1=0.18 (not 0.55 with arithmetic mean)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Use Cases</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">F1-Score is recommended when:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Both false positives and false negatives are important</li>
            <li>Data is imbalanced</li>
            <li>You need a single metric for model selection</li>
            <li>Loan approval: Both rejecting good customers and approving risky ones matter</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">F-beta Score with custom β when:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>One error type has a known cost ratio</li>
            <li>Domain requirements clearly prioritize one type of error</li>
            <li>You need to tune the trade-off for specific applications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Multi-Class Extensions</h2>
          <p className="text-slate-700 mb-4">For multi-class problems:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Micro F-score</strong>: Aggregate TP, FP, FN across all classes, then compute F-score</li>
            <li><strong>Macro F-score</strong>: Compute F-score per class, then average</li>
            <li>Micro favors larger classes; Macro treats all classes equally</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Analogies</h2>
          <p className="text-slate-700 mb-4">
            Think of the F1-score as grading a student's performance where both accuracy (precision) and coverage (recall) matter. A student who only answers easy questions correctly (high precision, low recall) gets a low grade. Similarly, a student who attempts all questions but makes many mistakes (high recall, low precision) also gets a low grade. Only a student who balances both gets a high F1-score.
          </p>
          <p className="text-slate-700 mb-4">
            The β parameter is like adjusting the weight of different sections on an exam—increasing β is like making the comprehensive section (recall) worth more points.
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
