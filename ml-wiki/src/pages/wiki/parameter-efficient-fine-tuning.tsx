import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function ParameterEfficientFineTuningPEFT() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
    title: "Parameter-Efficient Fine-Tuning (PEFT)",
    description: "Techniques for adapting large pre-trained models to downstream tasks while training only a small fraction of parameters",
    category: "Training Techniques",
    tags: ["fine-tuning", "efficiency", "transfer-learning", "adaptation"],
    relatedConcepts: ["low-rank-adaptation", "transfer-learning", "fine-tuning", "few-shot-learning"],
    citations: [
      {
        paper: "LoRA: Low-Rank Adaptation of Large Language Models",
        authors: "Hu et al.",
        year: "2021",
        pages: "3, 6, 9"
      },
      {
        paper: "The Power of Scale for Parameter-Efficient Prompt Tuning",
        authors: "Lester et al.",
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
            <strong>Parameter-Efficient Fine-Tuning (PEFT)</strong> refers to a family of techniques for adapting large pre-trained models to downstream tasks while training only a small fraction of the model's parameters. These methods address the computational and storage challenges of traditional fine-tuning as models scale to hundreds of billions of parameters.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Motivation</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">The Full Fine-Tuning Problem</h3>
          <p className="text-slate-700 mb-2">Traditional transfer learning follows this paradigm:</p>
          <ol className="list-decimal list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>Pre-train a model on large-scale general data</li>
            <li>Fine-tune all parameters on task-specific data</li>
          </ol>
          <p className="text-slate-700 mb-4">
            This approach becomes prohibitively expensive for very large models [Hu et al., 2021, p.1]:
          </p>
          <p className="text-slate-700 mb-2"><strong>For GPT-3 175B:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>Each fine-tuned instance requires 175B parameters (~350GB storage)</li>
            <li>Deploying 100 task-specific models requires ~35TB</li>
            <li>Training requires massive GPU memory and compute</li>
            <li>Switching between tasks requires loading entirely new models</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The PEFT Solution</h3>
          <p className="text-slate-700 mb-2">PEFT methods adapt models by:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Freezing</strong> the pre-trained model weights</li>
            <li>Training only a <strong>small set of additional or selected parameters</strong></li>
            <li>Achieving comparable or better performance than full fine-tuning</li>
            <li>Dramatically reducing memory, storage, and compute requirements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Major PEFT Approaches</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">1. Adapter Layers</h3>
          <p className="text-slate-700 mb-4">
            <strong>Concept:</strong> Insert small neural network modules (adapters) between layers of the pre-trained model.
          </p>
          <p className="text-slate-700 mb-2"><strong>How it works:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>Add bottleneck feed-forward layers after attention and MLP modules</li>
            <li>Only train the adapter parameters while freezing the original model</li>
            <li>Typically 2 fully-connected layers with a nonlinearity between them</li>
          </ul>
          <p className="text-slate-700 mb-2"><strong>Variants:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li><strong>AdapterH</strong> (Houlsby et al., 2019): Two adapters per Transformer block</li>
            <li><strong>AdapterL</strong> (Lin et al., 2020): One adapter per block, after MLP module</li>
            <li><strong>AdapterP</strong> (Pfeiffer et al., 2021): Similar to AdapterL with additional LayerNorm</li>
          </ul>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Advantages:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                <li>Modular design</li>
                <li>Easy to add/remove for different tasks</li>
                <li>Well-studied with many variants</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">Disadvantages:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                <li>Introduces inference latency (20-30% in online scenarios)</li>
                <li>Sequential computation cannot be fully parallelized</li>
                <li>Requires synchronization in distributed settings</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-700 text-sm italic">[Hu et al., 2021, p.3, 6]</p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. Prefix Tuning / Prompt Tuning</h3>
          <p className="text-slate-700 mb-4">
            <strong>Concept:</strong> Add trainable "prefix" or "prompt" tokens to the input or intermediate activations.
          </p>
          <p className="text-slate-700 mb-2"><strong>Variants:</strong></p>
          <div className="space-y-4 mb-4">
            <div>
              <p className="text-slate-700 font-semibold mb-1">Prompt Tuning (Lester et al., 2021):</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 text-sm">
                <li>Prepends learnable continuous "soft prompt" embeddings to the input</li>
                <li>Only these prompt embeddings are trainable (~20k params for 11B model)</li>
                <li>Performance scales with model size: matches full fine-tuning for models &gt;10B params</li>
                <li>Simpler than prefix tuning, only modifies input rather than every layer</li>
              </ul>
              <p className="text-slate-700 text-sm italic mt-1">[Lester et al., 2021, p.1-2]</p>
            </div>
            <div>
              <p className="text-slate-700 font-semibold mb-1">Prefix-Embedding Tuning:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 text-sm">
                <li>Inserts special trainable tokens at the input level</li>
                <li>Only the embeddings of these tokens are trainable</li>
                <li>Positions can be "prefix" (prepend) or "infix" (append)</li>
              </ul>
            </div>
            <div>
              <p className="text-slate-700 font-semibold mb-1">Prefix-Layer Tuning:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 text-sm">
                <li>Extends prefix-embedding by making activations trainable at every layer</li>
                <li>Instead of letting representations evolve naturally, replace them with trainable vectors</li>
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Advantages:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                <li>No architectural changes to the model</li>
                <li>Relatively simple to implement</li>
                <li>No additional parameters in the base model</li>
                <li><strong>Prompt tuning</strong>: Scales excellently with model size [Lester et al., 2021]</li>
                <li><strong>Prompt tuning</strong>: Better domain transfer robustness than full fine-tuning</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">Disadvantages:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                <li>Reduces available sequence length for actual task tokens</li>
                <li><strong>Prefix methods</strong>: Performance can be unstable and "changes non-monotonically"</li>
                <li><strong>Prefix methods</strong>: Difficult to optimize, especially on small datasets</li>
                <li><strong>Prefix methods</strong>: Poor performance in low-data regimes (e.g., 37.6% on MNLI-100 vs 63.8% for LoRA)</li>
                <li><strong>Prompt tuning</strong>: Gap with full fine-tuning larger for models &lt;10B params</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-700 mb-4">
            <strong>Details:</strong> See <a href="/wiki/prompt-engineering" className="text-blue-600 hover:text-blue-800 underline">Prompt Engineering</a>
          </p>
          <p className="text-slate-700 text-sm italic">[Hu et al., 2021, p.3, 6, 23; Lester et al., 2021, p.1-7]</p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Low-Rank Adaptation (LoRA)</h3>
          <p className="text-slate-700 mb-4">
            <strong>Concept:</strong> Inject trainable low-rank decomposition matrices in parallel to existing weights.
          </p>
          <p className="text-slate-700 mb-2"><strong>How it works:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>Represent weight updates as ΔW = BA where B and A are low-rank</li>
            <li>Train only B and A while freezing W₀</li>
            <li>Can merge during inference: W = W₀ + BA</li>
          </ul>
          <p className="text-slate-700 mb-2"><strong>Advantages:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>No inference latency (unlike adapters)</li>
            <li>Massive parameter reduction (10,000× for GPT-3)</li>
            <li>Better performance than adapters and prefix methods</li>
            <li>Easy task switching</li>
          </ul>
          <p className="text-slate-700 mb-4">
            <strong>Details:</strong> See <a href="/wiki/low-rank-adaptation" className="text-blue-600 hover:text-blue-800 underline">Low-Rank Adaptation</a>
          </p>
          <p className="text-slate-700 text-sm italic">[Hu et al., 2021, p.1-5]</p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">4. BitFit / Bias-Only Tuning</h3>
          <p className="text-slate-700 mb-4">
            <strong>Concept:</strong> Train only the bias vectors while freezing all other parameters.
          </p>
          <p className="text-slate-700 mb-2"><strong>Characteristics:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>Extremely simple approach</li>
            <li>Minimal trainable parameters (~0.1M for RoBERTa base)</li>
            <li>Performance is decent but typically worse than other PEFT methods</li>
          </ul>
          <p className="text-slate-700 text-sm italic">[Hu et al., 2021, p.6]</p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">5. Selective Layer Tuning</h3>
          <p className="text-slate-700 mb-4">
            <strong>Concept:</strong> Train only specific layers or modules while freezing the rest.
          </p>
          <p className="text-slate-700 mb-2"><strong>Example:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li><strong>FTTop2</strong>: Train only the top 2 layers of the model</li>
            <li>Can also train specific modules (e.g., only attention, only MLP)</li>
          </ul>
          <p className="text-slate-700 mb-2"><strong>Characteristics:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>Simple to implement</li>
            <li>Performance varies greatly depending on which layers are chosen</li>
            <li>Often underperforms compared to more sophisticated methods</li>
          </ul>
          <p className="text-slate-700 text-sm italic">[Hu et al., 2021, p.6]</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Comparison of PEFT Methods</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Performance Comparison</h3>
          <p className="text-slate-700 mb-2"><strong>T5-XXL (11B params) on SuperGLUE:</strong></p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-slate-50 rounded-lg">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">Method</th>
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">Trainable Params</th>
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">Score</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-2">Full Fine-Tuning</td>
                  <td className="px-4 py-2">11B</td>
                  <td className="px-4 py-2">89.3</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-4 py-2 font-semibold">Prompt Tuning</td>
                  <td className="px-4 py-2 font-semibold">~20K (0.01%)</td>
                  <td className="px-4 py-2 font-semibold">88.5</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-700 text-sm italic mb-4">[Lester et al., 2021, p.3]</p>

          <p className="text-slate-700 mb-2 mt-6"><strong>GPT-3 175B on WikiSQL:</strong></p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-slate-50 rounded-lg">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">Method</th>
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">Trainable Params</th>
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">Accuracy</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-2">Full Fine-Tuning</td>
                  <td className="px-4 py-2">175B</td>
                  <td className="px-4 py-2">73.8%</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-2">BitFit</td>
                  <td className="px-4 py-2">14.2M</td>
                  <td className="px-4 py-2">71.3%</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-2">Prefix-Embedding</td>
                  <td className="px-4 py-2">3.2M</td>
                  <td className="px-4 py-2">63.1%</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-2">Prefix-Layer</td>
                  <td className="px-4 py-2">20.2M</td>
                  <td className="px-4 py-2">70.1%</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-2">AdapterH</td>
                  <td className="px-4 py-2">7.1M - 40.1M</td>
                  <td className="px-4 py-2">71.9% - 73.2%</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-2 font-semibold">LoRA</td>
                  <td className="px-4 py-2 font-semibold">4.7M</td>
                  <td className="px-4 py-2 font-semibold">73.4%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-700 text-sm italic mb-4">[Hu et al., 2021, p.8]</p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Trade-offs</h3>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Adapters:</h4>
              <ul className="space-y-1 text-slate-700 text-sm">
                <li>✅ Well-established, many variants</li>
                <li>✅ Modular design</li>
                <li>❌ Inference latency</li>
                <li>❌ Synchronization overhead in distributed settings</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Prefix Tuning:</h4>
              <ul className="space-y-1 text-slate-700 text-sm">
                <li>✅ No architectural changes</li>
                <li>✅ Simple concept</li>
                <li>❌ Reduces sequence length</li>
                <li>❌ Unstable training</li>
                <li>❌ Poor low-data performance</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Prompt Tuning:</h4>
              <ul className="space-y-1 text-slate-700 text-sm">
                <li>✅ Extreme parameter efficiency (0.01%)</li>
                <li>✅ Scales excellently with model size</li>
                <li>✅ Better domain transfer robustness</li>
                <li>✅ No architectural changes</li>
                <li>❌ Requires very large models (&gt;10B) for best results</li>
                <li>❌ Reduces sequence length slightly</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">LoRA:</h4>
              <ul className="space-y-1 text-slate-700 text-sm">
                <li>✅ No inference latency</li>
                <li>✅ Highest parameter efficiency among weight-based methods</li>
                <li>✅ Best performance across model sizes</li>
                <li>✅ Easy task switching</li>
                <li>❌ Cannot easily batch different tasks in single forward pass</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-700 text-sm italic mt-4">[Hu et al., 2021, p.3-5; Lester et al., 2021, p.1-7]</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why PEFT Works</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Intrinsic Dimensionality Hypothesis</h3>
          <p className="text-slate-700 mb-4">
            Pre-trained language models have low "intrinsic dimension" - they can learn efficiently even when constrained to a random low-dimensional subspace (Aghajanyan et al., 2020).
          </p>
          <p className="text-slate-700 mb-2">PEFT methods exploit this by hypothesizing that:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>The changes needed for adaptation</strong> also lie in a low-dimensional space</li>
            <li>Most model capacity is needed for general knowledge (pre-training)</li>
            <li>Task-specific adaptation requires relatively few degrees of freedom</li>
          </ul>
          <p className="text-slate-700 text-sm italic mb-4">[Hu et al., 2021, p.2]</p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Over-Parametrization</h3>
          <p className="text-slate-700 mb-2">
            Large pre-trained models are heavily over-parametrized for any single downstream task. PEFT methods effectively:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Use the pre-trained weights as a powerful feature extractor</li>
            <li>Add minimal task-specific capacity on top</li>
            <li>Avoid overfitting that can occur with full fine-tuning on small datasets</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Practical Considerations</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">When to Use PEFT</h3>
          <p className="text-slate-700 mb-2"><strong>Ideal scenarios:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>Limited compute/memory resources</li>
            <li>Many downstream tasks to support</li>
            <li>Frequent task switching required</li>
            <li>Small task-specific datasets</li>
            <li>Production deployment with latency constraints</li>
          </ul>
          <p className="text-slate-700 mb-2"><strong>When full fine-tuning might be better:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>Single task deployment</li>
            <li>Extremely different task from pre-training (e.g., different language)</li>
            <li>Abundant compute resources</li>
            <li>Very large task-specific datasets</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Choosing a PEFT Method</h3>
          <p className="text-slate-700 mb-2">Consider:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Inference Latency:</strong> Use LoRA or Prefix methods if latency is critical</li>
            <li><strong>Parameter Budget:</strong> LoRA offers best performance per parameter</li>
            <li><strong>Ease of Implementation:</strong> BitFit is simplest, Prefix methods next, then LoRA and Adapters</li>
            <li><strong>Stability:</strong> LoRA and Adapters more stable than Prefix methods</li>
            <li><strong>Low-Data Performance:</strong> LoRA significantly outperforms others</li>
          </ol>
          <p className="text-slate-700 text-sm italic">[Hu et al., 2021, p.23]</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Creative Analogy: The Specialist Team</h2>
          <p className="text-slate-700 mb-4">
            Imagine your pre-trained model is like a massive general hospital with thousands of expert doctors, nurses, and equipment (parameters). You want to adapt it for specialized clinics - cardiology, pediatrics, orthopedics, etc.
          </p>
          <div className="space-y-4">
            <div className="bg-red-50 rounded-lg p-4">
              <p className="font-semibold text-red-900 mb-2">Full Fine-Tuning:</p>
              <p className="text-slate-700 text-sm">Building entirely new hospitals for each specialty, each with thousands of staff. Expensive and wasteful since most medical knowledge overlaps.</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="font-semibold text-yellow-900 mb-2">Adapter Layers:</p>
              <p className="text-slate-700 text-sm">Hiring a small specialist team for each clinic that works alongside the general hospital staff. Works well, but the specialist team has to be consulted sequentially, adding time to each patient visit.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="font-semibold text-purple-900 mb-2">Prefix Tuning:</p>
              <p className="text-slate-700 text-sm">Creating special intake questionnaires that prime the general hospital for each specialty. Simple, but takes up space in the waiting room and doesn't always work reliably.</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="font-semibold text-green-900 mb-2">LoRA:</p>
              <p className="text-slate-700 text-sm">Training a handful of general hospital staff to adjust their techniques slightly for each specialty. The adjustments are so seamless that when a patient arrives, it's as if the hospital was always specialized for that condition - no extra waiting time, minimal extra training needed.</p>
            </div>
          </div>
          <p className="text-slate-700 mt-4">
            The key insight: The general hospital already knows most of what's needed. You just need small, strategic adjustments, not entirely new facilities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Implementation Examples</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">Storage Requirements</h3>
          <p className="text-slate-700 mb-4"><strong>Example: 100 Task Adaptation for GPT-3 175B</strong></p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-slate-50 rounded-lg">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">Method</th>
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">Storage Required</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-2">Full Fine-Tuning</td>
                  <td className="px-4 py-2">35 TB (100 × 350GB)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-2">Adapters (r=8)</td>
                  <td className="px-4 py-2">4.3 TB (350GB + 100 × 40GB)</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-2 font-semibold">LoRA (r=4)</td>
                  <td className="px-4 py-2 font-semibold">354 GB (350GB + 100 × 35MB)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-700 text-sm italic mb-4">[Hu et al., 2021, p.5]</p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Training Memory</h3>
          <p className="text-slate-700 mb-4"><strong>GPT-3 175B with Adam Optimizer:</strong></p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-slate-50 rounded-lg">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">Method</th>
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">VRAM Usage</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-2">Full Fine-Tuning</td>
                  <td className="px-4 py-2">1.2 TB</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-2 font-semibold">LoRA</td>
                  <td className="px-4 py-2 font-semibold">350 GB (3× reduction)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-700 text-sm italic">[Hu et al., 2021, p.5]</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Current Trends and Adoption</h2>
          <p className="text-slate-700 mb-2">
            PEFT methods, particularly LoRA, have seen rapid adoption:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Integrated into major libraries (HuggingFace PEFT, PyTorch, etc.)</li>
            <li>Standard practice in open-source LLM community</li>
            <li>Enables fine-tuning on consumer hardware</li>
            <li>Facilitates sharing of adapted models (small LoRA weights vs. full models)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Future Directions</h2>
          <p className="text-slate-700 mb-2">Open research questions:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Optimal Selection:</strong> More principled methods for choosing which parameters/layers to adapt</li>
            <li><strong>Theoretical Understanding:</strong> Better formal understanding of why low-rank/sparse updates suffice</li>
            <li><strong>Combination Methods:</strong> How to optimally combine different PEFT approaches</li>
            <li><strong>Task Relationships:</strong> How to leverage relationships between tasks in multi-task PEFT</li>
            <li><strong>Automatic Configuration:</strong> Methods to automatically determine optimal rank/adapter size per task</li>
          </ol>
          <p className="text-slate-700 text-sm italic">[Hu et al., 2021, p.13]</p>
        </section>
      </div>
    </WikiLayout>
  );
}
