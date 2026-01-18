import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function OperatorSplittingMethods() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "Operator Splitting Methods",
  description: "Numerical techniques that decompose complex evolution equations into simpler substeps, enabling systematic design and interpretation of neural network architectures",
  category: "Mathematical Foundations",
  tags: ["numerical-methods", "differential-equations", "neural-architecture", "discretization"],
  citations: [
    {
      paper: "A Mathematical Explanation of Transformers for Large Language Models and GPTs",
      authors: "Tai, X., Liu, H., Li, L., & Chan, R. H.",
      year: "2025",
      pages: "7, 18-19"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4"><strong>Operator Splitting Methods</strong> are numerical techniques that decompose complicated time-evolution problems into several simpler substeps, where each substep can be solved efficiently. In the context of neural networks, operator splitting provides a systematic framework for designing architectures by viewing each layer as a substep in solving a continuous evolution equation [Tai et al., 2025, p.7].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Core Concept</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The General Evolution Problem</h3>
          <p className="text-slate-700 mb-4">Consider an evolution equation of the form [Tai et al., 2025, p.18]:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            u_t + Σ_(k=1)^K A_k(t; u) = 0  for (x,t) ∈ Ω × (0,T]
            u(0) = u_0
          </code></pre>
          <p className="text-slate-700 mb-4">where <code className="bg-slate-100 px-1 rounded">A_k(t; u)</code> are operators applied to <code className="bg-slate-100 px-1 rounded">u</code> (e.g., differential operators, integral operators, projections).</p>
          <p className="text-slate-700 mb-4"><strong>Challenge:</strong> Solving this equation directly may be difficult when operators <code className="bg-slate-100 px-1 rounded">A_k</code> have different properties (e.g., one is nonlinear, another is non-local, another enforces constraints).</p>
          <p className="text-slate-700 mb-4"><strong>Solution:</strong> Decompose the problem into K simpler subproblems, each involving only one operator <code className="bg-slate-100 px-1 rounded">A_k</code>, then compose the solutions.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Three Main Splitting Strategies</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">1. Sequential (Lie) Splitting</h3>
          <p className="text-slate-700 mb-4"><strong>Most common for neural networks.</strong> Decomposes computation into K sequential substeps [Tai et al., 2025, p.19].</p>
          <p className="text-slate-700 mb-4">Given u<sup>n</sup>, compute u<sup>n+1</sup> by solving for k = 1,...,K:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            u_t + A_k(t; u) = 0  in Ω × (t_n, t_(n+1)]
            u(t_n) = u&lt;sup&gt;n+(k-1)/K&lt;/sup&gt;
          </code></pre>
          <p className="text-slate-700 mb-4">Set <code className="bg-slate-100 px-1 rounded">u<sup>n+k/K</sup> = u(t_(n+1))</code>, and finally <code className="bg-slate-100 px-1 rounded">u<sup>n+1</sup> = u<sup>n+K/K</sup></code>.</p>
          <p className="text-slate-700 mb-4"><strong>Characteristics:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Order:</strong> First-order accurate in time</li>
            <li><strong>Sequential:</strong> Must solve substeps in order</li>
            <li><strong>Neural network interpretation:</strong> Each substep = one layer type (attention, normalization, feedforward)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Example for Transformers:</strong> With K=6 substeps [Tai et al., 2025, p.7-8]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Attention layer</li>
            <li>Layer normalization</li>
            <li>Feedforward layer 1</li>
            <li>Feedforward layer 2</li>
            <li>Skip connection</li>
            <li>Final layer normalization</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. Parallel (Strang) Splitting</h3>
          <p className="text-slate-700 mb-4">Solves all K subproblems <strong>in parallel</strong> from the same initial condition [Tai et al., 2025, p.19].</p>
          <p className="text-slate-700 mb-4">For k = 1,...,K, compute:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            v_t + K·A_k(t; v) = 0  in Ω × (t_n, t_(n+1)]
            v(t_n) = u&lt;sup&gt;n&lt;/sup&gt;
          </code></pre>
          <p className="text-slate-700 mb-4">Set <code className="bg-slate-100 px-1 rounded">v_k = v(t_(n+1))</code>, then combine:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            u&lt;sup&gt;n+1&lt;/sup&gt; = (1/K) Σ_(k=1)^K v_k
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Characteristics:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Order:</strong> First-order accurate</li>
            <li><strong>Parallelizable:</strong> All substeps can run simultaneously</li>
            <li><strong>Averaging:</strong> Final solution is weighted average of parallel solutions</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Hybrid Splitting</h3>
          <p className="text-slate-700 mb-4">Combination of sequential and parallel splitting—decomposes into sequential substeps, where each substep may contain parallel substeps [Tai et al., 2025, p.19].</p>
          <p className="text-slate-700 mb-4"><strong>Use case:</strong> Multi-scale or multi-stage architectures (e.g., UNet, multi-stage vision transformers)</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Application to Neural Networks</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Viewing Layers as Substeps</h3>
          <p className="text-slate-700 mb-4"><strong>Key Insight:</strong> Each layer in a neural network can be viewed as one substep in an operator-splitting scheme for a continuous evolution equation [Tai et al., 2025, p.2].</p>
          <p className="text-slate-700 mb-4"><strong>Workflow:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Define a continuous evolution equation capturing desired dynamics</li>
            <li>Identify operators `A_k` corresponding to different operations (convolution, nonlinearity, normalization, attention)</li>
            <li>Apply operator splitting to discretize in time</li>
            <li>Each substep becomes a layer in the neural network</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Example: Transformer as Operator Splitting</h3>
          <p className="text-slate-700 mb-4">The Transformer solves [Tai et al., 2025, p.3]:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            u_t = ⟨γ(x,·,t;u), V(·,y,t;u)⟩ + ∂I_(S1)(u) + Σ_j [⟨W_j(·,y,t), u(x,·,t)⟩ + b_j(x,t)] + ∂I_(S2)(u)
          </code></pre>
          <p className="text-slate-700 mb-4">Using Lie splitting with M = 4 + J substeps decomposes this into:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Substep 1:</strong> Attention operator</li>
            <li><strong>Substep 2:</strong> Layer normalization (projection to S1)</li>
            <li><strong>Substeps 3 to 2+J:</strong> J feedforward layers with ReLU</li>
            <li><strong>Substep 3+J:</strong> Skip connection (averaging)</li>
            <li><strong>Substep 4+J:</strong> Final layer normalization</li>
          </ul>
          <p className="text-slate-700 mb-4">After spatial discretization, this <strong>exactly recovers</strong> the Transformer architecture [Tai et al., 2025, p.12].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Mathematical Properties</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Consistency</h3>
          <p className="text-slate-700 mb-4">An operator-splitting scheme is <strong>consistent</strong> if the discrete solution converges to the continuous solution as Δt → 0.</p>
          <p className="text-slate-700 mb-4"><strong>First-order consistency:</strong> Error is O(Δt)</p>
          <p className="text-slate-700 mb-4"><strong>Second-order consistency:</strong> Error is O(Δt²)</p>
          <p className="text-slate-700 mb-4">Lie splitting is first-order consistent. Strang splitting (symmetrized Lie splitting) is second-order consistent.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Stability</h3>
          <p className="text-slate-700 mb-4">A splitting scheme is <strong>stable</strong> if small perturbations in initial conditions lead to bounded perturbations in the solution.</p>
          <p className="text-slate-700 mb-4"><strong>Implications for neural networks:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Stability ensures gradients don't explode/vanish during backpropagation</li>
            <li>Can analyze stability of architectures through stability of underlying evolution equation</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Convergence</h3>
          <p className="text-slate-700 mb-4"><strong>Lax Equivalence Theorem:</strong> For linear problems, consistency + stability = convergence.</p>
          <p className="text-slate-700 mb-4">For neural networks: If the continuous evolution equation is well-posed and the splitting scheme is consistent and stable, the neural network (discrete solution) will approximate the continuous dynamics accurately.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Solving Each Substep</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Explicit vs. Implicit Schemes</h3>
          <p className="text-slate-700 mb-4">For substep <code className="bg-slate-100 px-1 rounded">u_t + A_k(t; u) = 0</code>, discretize as:</p>
          <p className="text-slate-700 mb-4"><strong>Explicit:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            (u&lt;sup&gt;n+k/K&lt;/sup&gt; - u&lt;sup&gt;n+(k-1)/K&lt;/sup&gt;)/Δt + A_k(t&lt;sup&gt;n&lt;/sup&gt;; u&lt;sup&gt;n+(k-1)/K&lt;/sup&gt;) = 0
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Solution:</strong> <code className="bg-slate-100 px-1 rounded">u<sup>n+k/K</sup> = u<sup>n+(k-1)/K</sup> - Δt·A_k(t<sup>n</sup>; u<sup>n+(k-1)/K</sup>)</code></p>
          <p className="text-slate-700 mb-4"><strong>Implicit:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            (u&lt;sup&gt;n+k/K&lt;/sup&gt; - u&lt;sup&gt;n+(k-1)/K&lt;/sup&gt;)/Δt + A_k(t&lt;sup&gt;n+1&lt;/sup&gt;; u&lt;sup&gt;n+k/K&lt;/sup&gt;) = 0
          </code></pre>
          <p className="text-slate-700 mb-4">Must solve for <code className="bg-slate-100 px-1 rounded">u<sup>n+k/K</sup></code> (may require iterative solver).</p>
          <p className="text-slate-700 mb-4"><strong>In Transformers [Tai et al., 2025, p.7-9]:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Attention substep: Explicit</li>
            <li>Layer normalization substeps: Implicit (but has closed-form solution via projection theorem)</li>
            <li>Feedforward substeps: Semi-implicit (linear part explicit, ReLU implicit with closed-form solution)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Advantages for Neural Architecture Design</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">1. Systematic Framework</h3>
          <p className="text-slate-700 mb-4">Instead of designing architectures heuristically, operator splitting provides principled approach:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Define continuous equation encoding desired properties</li>
            <li>Choose splitting strategy</li>
            <li>Discretize to obtain architecture</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Example:</strong> Want a network with:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Non-local interactions → Include integral operator</li>
            <li>Stable representations → Include normalization constraints</li>
            <li>Nonlinearity → Include ReLU via projection to S2 = `&#123;u : u ≥ 0&#125;`</li>
          </ul>
          <p className="text-slate-700 mb-4">Result: Transformer-like architecture emerges automatically from operator splitting.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. Theoretical Guarantees</h3>
          <p className="text-slate-700 mb-4">Can leverage numerical analysis theory:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Stability analysis:</strong> Ensure network won't have exploding/vanishing gradients</li>
            <li><strong>Convergence rates:</strong> Know how accuracy improves as depth increases</li>
            <li><strong>Error bounds:</strong> Quantify approximation quality</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Flexibility</h3>
          <p className="text-slate-700 mb-4">Easy to modify by changing:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Operators:</strong> Different `A_k` → different layer types</li>
            <li><strong>Splitting order:</strong> Sequential vs. parallel → different connectivity patterns</li>
            <li><strong>Time step:</strong> Larger Δt → shallower network, smaller Δt → deeper network</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">4. Interpretability</h3>
          <p className="text-slate-700 mb-4">Each layer has clear meaning as a substep solving a specific part of the evolution equation. Not a "black box"—each component has mathematical justification.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Choosing the Splitting Strategy</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">When to Use Sequential (Lie) Splitting</h3>
          <p className="text-slate-700 mb-4"><strong>Best for:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Operations that naturally occur in sequence</li>
            <li>Enforcing constraints after transformations</li>
            <li>Standard feedforward architectures</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Examples:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Transformers: Attention → Normalize → Feedforward → Normalize</li>
            <li>ResNets: Convolution → Batch norm → ReLU</li>
            <li>UNets: Encoder → Bottleneck → Decoder</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">When to Use Parallel Splitting</h3>
          <p className="text-slate-700 mb-4"><strong>Best for:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Combining multiple parallel pathways</li>
            <li>Ensemble-like architectures</li>
            <li>Multi-branch networks</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Examples:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Inception modules (parallel convolutions of different sizes)</li>
            <li>Multi-path aggregation</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">When to Use Hybrid Splitting</h3>
          <p className="text-slate-700 mb-4"><strong>Best for:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Multi-scale architectures</li>
            <li>Hierarchical processing</li>
            <li>Different operations at different resolutions</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Examples:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>UNet (sequential stages, each with parallel skip connections)</li>
            <li>Multi-stage vision transformers</li>
            <li>Encoder-decoder architectures</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Time Step Size and Network Depth</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Relationship</h3>
          <p className="text-slate-700 mb-4">Given final time T and time step Δt = T/N_t:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Smaller Δt</strong> → More time steps N_t → <strong>Deeper network</strong></li>
            <li><strong>Larger Δt</strong> → Fewer time steps N_t → <strong>Shallower network</strong></li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Choosing Δt</h3>
          <p className="text-slate-700 mb-4"><strong>Considerations:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Accuracy:</strong> Smaller Δt = more accurate approximation of continuous dynamics</li>
            <li><strong>Stability:</strong> Δt must satisfy CFL condition for explicit schemes</li>
            <li><strong>Computation:</strong> Smaller Δt = more layers = more computation</li>
            <li><strong>Regularization:</strong> Larger Δt can act as implicit regularization</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Common choice:</strong> Δt = 1 (convenient for changing network parameters) [Tai et al., 2025, p.7].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Creative Analogy: Cooking a Complex Dish</h2>
          <p className="text-slate-700 mb-4">Imagine cooking a sophisticated multi-course meal:</p>
          <p className="text-slate-700 mb-4"><strong>Direct Approach (No Splitting):</strong> Try to do everything at once—chop vegetables while sautéing while the oven is preheating while plating. Chaotic and error-prone.</p>
          <p className="text-slate-700 mb-4"><strong>Sequential Splitting (Lie):</strong> Follow a recipe step-by-step:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Prep ingredients (attention extracts features)</li>
            <li>Season to taste (normalize to standard levels)</li>
            <li>Cook protein (first feedforward layer)</li>
            <li>Add sauce (second feedforward layer)</li>
            <li>Combine with sides (skip connection)</li>
            <li>Final seasoning (final normalization)</li>
          </ul>
          <p className="text-slate-700 mb-4">Each step is simple and well-defined. The order matters—you can't plate before cooking!</p>
          <p className="text-slate-700 mb-4"><strong>Parallel Splitting (Strang):</strong> Have multiple cooks working on different components simultaneously:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Cook 1: Makes appetizer</li>
            <li>Cook 2: Makes main course</li>
            <li>Cook 3: Makes dessert</li>
          </ul>
          <p className="text-slate-700 mb-4">Then combine into a complete meal. Faster, but requires coordination.</p>
          <p className="text-slate-700 mb-4"><strong>Hybrid Splitting:</strong> Restaurant kitchen with multiple stations (sequential) where each station has multiple cooks (parallel). Scales to complex service.</p>
          <p className="text-slate-700 mb-4">The key insight: Breaking a complex process into manageable steps makes it tractable, reproducible, and analyzable—whether cooking or computing.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Practical Considerations</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Implementation</h3>
          <p className="text-slate-700 mb-4">When implementing operator splitting for neural networks:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Define operators clearly:</strong> What does each `A_k` represent?</li>
            <li><strong>Choose splitting order:</strong> Based on physical/mathematical constraints</li>
            <li><strong>Solve each substep:</strong> Use appropriate numerical method (explicit, implicit, closed-form)</li>
            <li><strong>Set time step:</strong> Balance accuracy vs. efficiency</li>
            <li><strong>Verify consistency:</strong> Check that discrete scheme approximates continuous equation</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Debugging</h3>
          <p className="text-slate-700 mb-4">If network doesn't train well:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Check operator ordering:</strong> Are constraints enforced in right order?</li>
            <li><strong>Verify stability:</strong> Is Δt too large for explicit schemes?</li>
            <li><strong>Test each substep:</strong> Does each layer work correctly in isolation?</li>
            <li><strong>Analyze continuous equation:</strong> Is the continuous model well-posed?</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Extensions and Variations</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Adaptive Splitting</h3>
          <p className="text-slate-700 mb-4">Adjust Δt dynamically based on:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Local error estimates</li>
            <li>Gradient magnitudes</li>
            <li>Task difficulty</li>
          </ul>
          <p className="text-slate-700 mb-4">Analogous to adaptive ODE solvers (e.g., Runge-Kutta-Fehlberg).</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Higher-Order Splitting</h3>
          <p className="text-slate-700 mb-4"><strong>Strang Splitting (Second-Order):</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            For operators A_1, A_2:
              Solve A_1 for Δt/2
              Solve A_2 for Δt
              Solve A_1 for Δt/2
          </code></pre>
          <p className="text-slate-700 mb-4">More accurate but more expensive per time step.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Fractional Stepping</h3>
          <p className="text-slate-700 mb-4">Use different time steps for different operators:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Fast operators: Small Δt</li>
            <li>Slow operators: Large Δt</li>
          </ul>
          <p className="text-slate-700 mb-4">Improves efficiency for multi-scale problems.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>[Integro-Differential Equations for Transformers](/wiki/integro-differential-equations-transformers)</li>
            <li>[Transformer Architecture](/wiki/transformer-architecture)</li>
            <li>[Layer Normalization](/wiki/layer-normalization)</li>
            <li>[Residual Connections](/wiki/residual-connections)</li>
            <li>[Continuous Neural Networks](/wiki/continuous-neural-networks)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">References</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Tai, X., Liu, H., Li, L., &amp; Chan, R. H. (2025). A Mathematical Explanation of Transformers for Large Language Models and GPTs. arXiv preprint arXiv:2510.03989.</li>
            <li>Glowinski, R., Pan, T.-W., &amp; Tai, X.-C. (2016). Some facts about operator-splitting and alternating direction methods. In Splitting Methods in Communication, Imaging, Science, and Engineering (pp. 19-94). Springer.</li>
            <li>Glowinski, R., &amp; Le Tallec, P. (1989). Augmented Lagrangian and operator-splitting methods in nonlinear mechanics (Vol. 9). Society for Industrial Mathematics.</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
