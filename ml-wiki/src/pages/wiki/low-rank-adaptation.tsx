import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function LowRankAdaptationLoRA() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
    title: "Low-Rank Adaptation (LoRA)",
    description: "A parameter-efficient fine-tuning technique that freezes pre-trained model weights and injects trainable low-rank decomposition matrices",
    category: "Training Techniques",
    tags: ["fine-tuning", "efficiency", "transformers", "adaptation"],
    relatedConcepts: ["parameter-efficient-fine-tuning", "transfer-learning", "transformer-architecture", "fine-tuning"],
    citations: [
      {
        paper: "LoRA: Low-Rank Adaptation of Large Language Models",
        authors: "Hu et al.",
        year: "2021",
        pages: "1-4"
      }
    ]
  };

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <p className="text-slate-700 mb-4">
            <strong>Low-Rank Adaptation (LoRA)</strong> is a parameter-efficient fine-tuning technique that enables adaptation of large pre-trained models to downstream tasks by freezing the original weights and training small, low-rank decomposition matrices injected into the model architecture [Hu et al., 2021, p.1].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Core Concept</h2>
          <p className="text-slate-700 mb-4">
            LoRA is based on the hypothesis that the updates to weights during model adaptation have a low "intrinsic rank" - meaning the essential changes needed for a new task lie in a low-dimensional subspace [Hu et al., 2021, p.2].
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Mathematical Formulation</h3>
          <p className="text-slate-700 mb-4">
            For a pre-trained weight matrix <strong>W₀ ∈ ℝ<sup>(d×k)</sup></strong>, LoRA represents the weight update as:
          </p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            W = W₀ + ΔW = W₀ + BA
          </code></pre>
          <p className="text-slate-700 mb-2">where:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li><strong>B ∈ ℝ<sup>(d×r)</sup></strong> and <strong>A ∈ ℝ<sup>(r×k)</sup></strong> are trainable low-rank matrices</li>
            <li><strong>r ≪ min(d, k)</strong> is the rank (typically 1-8)</li>
            <li><strong>W₀</strong> remains frozen during training</li>
          </ul>
          <p className="text-slate-700 mb-4">The forward pass becomes:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            h = W₀x + ΔWx = W₀x + BAx
          </code></pre>
          <p className="text-slate-700 text-sm italic">[Hu et al., 2021, p.4]</p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Initialization and Scaling</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>B</strong> is initialized to zero, so ΔW = 0 at the start of training</li>
            <li><strong>A</strong> is initialized with random Gaussian values</li>
            <li>The update ΔWx is scaled by <strong>α/r</strong>, where α is a constant</li>
            <li>This scaling helps reduce the need to retune hyperparameters when varying r</li>
          </ul>
          <p className="text-slate-700 text-sm italic">[Hu et al., 2021, p.4]</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why It Works</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Low Intrinsic Dimensionality</h3>
          <p className="text-slate-700 mb-4">
            Empirical evidence shows that even when the full weight matrix has rank 12,288, adaptation can be performed effectively with ranks as low as r=1 or r=2 [Hu et al., 2021, p.10].
          </p>
          <p className="text-slate-700 mb-2">The paper demonstrates that:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>The top singular directions of ΔW for different ranks (r=8 vs r=64) overlap significantly</li>
            <li>This overlap suggests most of the "important" adaptation happens in a very low-dimensional subspace</li>
            <li>Additional dimensions beyond r≈4-8 often contain noise rather than useful signal</li>
          </ul>
          <p className="text-slate-700 text-sm italic mb-4">[Hu et al., 2021, p.11]</p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Feature Amplification</h3>
          <p className="text-slate-700 mb-4">
            LoRA amplifies features that exist in the pre-trained model but aren't emphasized. Analysis reveals:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>ΔW has stronger correlation with W₀ compared to a random matrix</li>
            <li>However, ΔW does <strong>not</strong> repeat the top singular directions of W₀</li>
            <li>Instead, it amplifies directions orthogonal to or weakly represented in W₀</li>
            <li>The amplification factor can be as large as <strong>21.5×</strong> for r=4</li>
          </ul>
          <p className="text-slate-700 mb-4">
            This suggests LoRA strengthens "task-specific features that were learned but not emphasized in the general pre-training model" [Hu et al., 2021, p.12].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Practical Advantages</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">1. Massive Parameter Reduction</h3>
          <p className="text-slate-700 mb-2">For GPT-3 175B with r=4:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Trainable parameters: <strong>0.01%</strong> of the full model</li>
            <li>Checkpoint size: <strong>35MB</strong> instead of 350GB (~10,000× reduction)</li>
            <li>Can store 100 task-specific models in 354GB vs. 35TB</li>
          </ul>
          <p className="text-slate-700 text-sm italic mb-4">[Hu et al., 2021, p.5]</p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. No Inference Latency</h3>
          <p className="text-slate-700 mb-4">
            Unlike adapter layers that add sequential computation, LoRA matrices can be merged with frozen weights during deployment:
          </p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            W_deployed = W₀ + BA
          </code></pre>
          <p className="text-slate-700 mb-4">
            This means <strong>zero additional latency</strong> compared to the fully fine-tuned model [Hu et al., 2021, p.4].
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Efficient Task Switching</h3>
          <p className="text-slate-700 mb-2">To switch tasks:</p>
          <ol className="list-decimal list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>Subtract the current BA from W₀</li>
            <li>Add a different B'A' for the new task</li>
          </ol>
          <p className="text-slate-700 mb-4">
            This is a fast operation with minimal memory overhead [Hu et al., 2021, p.5].
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">4. Memory Efficiency During Training</h3>
          <p className="text-slate-700 mb-2">For large models trained with Adam:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>No need to compute gradients for frozen parameters</li>
            <li>No need to maintain optimizer states for frozen parameters</li>
            <li>Results in <strong>3× reduction in VRAM</strong> usage for GPT-3 175B</li>
            <li>25% speedup in training throughput</li>
          </ul>
          <p className="text-slate-700 text-sm italic">[Hu et al., 2021, p.5]</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Application to Transformers</h2>
          <p className="text-slate-700 mb-2">In Transformer models, LoRA is typically applied to the self-attention weight matrices:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li><strong>Wq</strong> (query projection)</li>
            <li><strong>Wk</strong> (key projection)</li>
            <li><strong>Wv</strong> (value projection)</li>
            <li><strong>Wo</strong> (output projection)</li>
          </ul>
          <p className="text-slate-700 mb-4">
            The MLP modules are usually kept frozen for simplicity and parameter efficiency [Hu et al., 2021, p.5].
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Optimal Weight Selection</h3>
          <p className="text-slate-700 mb-2">Empirical results show that:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Adapting both <strong>Wq and Wv</strong> gives the best performance overall</li>
            <li>Adapting only Wq or Wk performs significantly worse</li>
            <li>Adapting all four attention matrices provides marginal gains at increased parameter cost</li>
          </ul>
          <p className="text-slate-700 mb-4">
            Even with r=4, adapting both Wq and Wv is more effective than adapting just Wq with r=8, suggesting it's better to adapt more weight types with lower rank than fewer types with higher rank [Hu et al., 2021, p.10].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Performance</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Compared to Full Fine-Tuning</h3>
          <p className="text-slate-700 mb-2">LoRA achieves <strong>better</strong> performance than full fine-tuning on:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>GPT-3 175B on WikiSQL: 74.0% vs. 73.8% accuracy</li>
            <li>GPT-3 175B on MNLI: 91.7% vs. 89.5% accuracy</li>
            <li>GPT-3 175B on SAMSum: Rouge-1 53.8 vs. 52.0</li>
          </ul>
          <p className="text-slate-700 text-sm italic mb-4">[Hu et al., 2021, p.8]</p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Low-Data Regime</h3>
          <p className="text-slate-700 mb-4">
            LoRA shows particularly strong performance in low-data settings. On MNLI with only 100 training examples:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>LoRA: <strong>63.8%</strong> accuracy</li>
            <li>Full fine-tuning: 60.2%</li>
            <li>Prefix-embedding: 37.6%</li>
            <li>Prefix-layer: 48.3%</li>
          </ul>
          <p className="text-slate-700 text-sm italic">[Hu et al., 2021, p.23]</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Comparison with Other Methods</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">vs. Adapter Layers</h3>
          <p className="text-slate-700 mb-2"><strong>Advantages over Adapters:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>No inference latency (adapters add sequential computation)</li>
            <li>Better performance with comparable parameters</li>
            <li>Simpler to implement and deploy</li>
          </ul>
          <p className="text-slate-700 mb-4">
            <strong>Adapter Latency:</strong> Even with small bottleneck dimensions, adapters can add 20-30% latency in online inference scenarios with small batch sizes [Hu et al., 2021, p.3, 17].
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">vs. Prefix Tuning</h3>
          <p className="text-slate-700 mb-2"><strong>Advantages over Prefix Methods:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>More stable and consistent performance</li>
            <li>Better in low-data regimes</li>
            <li>Doesn't reduce available sequence length</li>
            <li>Easier to optimize</li>
          </ul>
          <p className="text-slate-700 mb-4">
            Prefix-tuning performance "changes non-monotonically in trainable parameters" and can be difficult to optimize [Hu et al., 2021, p.3].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Creative Analogy: The Sculptor's Touch</h2>
          <p className="text-slate-700 mb-4">
            Imagine you have a massive block of marble (the pre-trained model) that already contains beautiful, general-purpose sculptures (learned representations). You want to create something specific - say, a portrait of a particular person.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Traditional fine-tuning</strong> is like re-carving the entire block. It works, but it's expensive, takes forever, and you need a whole new massive block for each portrait.
          </p>
          <p className="text-slate-700 mb-2">
            <strong>LoRA</strong> is like a sculptor who only adds small clay adjustments (the low-rank matrices) on top of the marble surface. These adjustments are:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Tiny</strong> (only r=1-8 dimensions)</li>
            <li><strong>Strategic</strong> (amplify features already present but subtle in the marble)</li>
            <li><strong>Removable</strong> (can swap different clay overlays for different portraits)</li>
            <li><strong>Invisible</strong> at distance (when merged, looks like the marble itself)</li>
          </ul>
          <p className="text-slate-700">
            The key insight: most of what you need is already in the marble (pre-trained model). You just need to emphasize certain contours and de-emphasize others - and that can be done with very small, strategic additions rather than re-carving everything.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Implementation Considerations</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Choosing the Rank</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>r=1-2</strong>: Often sufficient for many tasks on large models like GPT-3</li>
            <li><strong>r=4-8</strong>: Sweet spot for most applications</li>
            <li><strong>r&gt;16</strong>: Usually provides diminishing returns</li>
          </ul>
          <p className="text-slate-700 mb-2">The optimal rank depends on:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>Task complexity</li>
            <li>Amount of training data</li>
            <li>Model size</li>
          </ul>
          <p className="text-slate-700 text-sm italic mb-4">[Hu et al., 2021, p.10]</p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Scaling Factor α</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Typically set α equal to the first r tried</li>
            <li>Acts as a learning rate multiplier for the LoRA parameters</li>
            <li>Helps avoid retuning hyperparameters when changing r</li>
          </ul>
          <p className="text-slate-700 text-sm italic mb-4">[Hu et al., 2021, p.4]</p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Training Setup</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Use the same learning rate as full fine-tuning (often works well)</li>
            <li>AdamW optimizer commonly used</li>
            <li>No special learning rate scheduling required</li>
            <li>Can be combined with other techniques like gradient clipping</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitations</h2>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Batch Processing:</strong> Not straightforward to batch inputs for different tasks with different A and B matrices in a single forward pass (if not merging weights)</li>
            <li><strong>Heuristic Weight Selection:</strong> Choosing which weights to apply LoRA to is largely heuristic</li>
            <li><strong>Task Dependent:</strong> The optimal rank can vary by task</li>
            <li><strong>Not Universal:</strong> Very different downstream tasks (e.g., different languages) may benefit from higher ranks or full fine-tuning</li>
          </ol>
          <p className="text-slate-700 text-sm italic">[Hu et al., 2021, p.5, 13]</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Extensions and Future Directions</h2>
          <p className="text-slate-700 mb-2">Potential research directions identified in the paper:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Combining LoRA with other efficient adaptation methods</li>
            <li>Understanding the mechanisms of how pre-trained features transform for downstream tasks</li>
            <li>More principled methods for selecting which weights to adapt</li>
            <li>Investigating if W₀ itself could be rank-deficient</li>
          </ol>
          <p className="text-slate-700 text-sm italic">[Hu et al., 2021, p.12]</p>
        </section>
      </div>
    </WikiLayout>
  );
}
