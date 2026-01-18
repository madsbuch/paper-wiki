import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function IntegroDifferentialEquationsforTransformers() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "Integro-Differential Equations for Transformers",
  description: "A mathematical framework interpreting Transformers as discretizations of continuous integro-differential equations where attention emerges as non-local integral operators",
  category: "Mathematical Foundations",
  tags: ["transformers", "differential-equations", "integral-operators", "mathematical-theory"],
  citations: [
    {
      paper: "A Mathematical Explanation of Transformers for Large Language Models and GPTs",
      authors: "Tai, X., Liu, H., Li, L., & Chan, R. H.",
      year: "2025",
      pages: "1-7"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4"><strong>Integro-Differential Equations for Transformers</strong> is a rigorous mathematical framework that interprets the Transformer architecture as a discretization of a continuous integro-differential equation, where self-attention emerges naturally as a non-local integral operator and layer normalization as a projection to time-dependent constraints [Tai et al., 2025, p.1].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Core Concept</h2>
          <p className="text-slate-700 mb-4">The key insight is that Transformers can be understood as solving a continuous evolution equation that combines:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Differential operators</strong> (time evolution)</li>
            <li><strong>Integral operators</strong> (non-local attention mechanisms)</li>
            <li><strong>Constraint projections</strong> (normalization and activation functions)</li>
          </ul>
          <p className="text-slate-700 mb-4">This provides a unified mathematical foundation for understanding all components of the Transformer architecture.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Continuous Transformer Equation</h2>
          <p className="text-slate-700 mb-4">For a function u(x, y, t) where:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>x ∈ Ωx</strong> = token index (position in sequence)</li>
            <li><strong>y ∈ Ωy</strong> = feature dimension (entries of token vectors)</li>
            <li><strong>t ∈ [0, T]</strong> = time (corresponding to layer depth)</li>
          </ul>
          <p className="text-slate-700 mb-4">The continuous Transformer solves [Tai et al., 2025, p.3]:</p>
          <div className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto" dangerouslySetInnerHTML={{
            __html: `$$\\begin{align}
u_t &= \\langle\\gamma(x,\\cdot,t;u), V(\\cdot,y,t;u)\\rangle_{\\Omega_x} + \\partial I_{S_1}(\\sigma_1(t),\\sigma_2(t))(u) \\\\
    &\\quad + \\sum_j [\\langle W_j(\\cdot,y,t), u(x,\\cdot,t)\\rangle_{\\Omega_y} + b_j(x,t)] + \\partial I_{S_2}(u) \\\\
u(x, y, 0) &= f(x, y)
\\end{align}$$`
          }} />
          <p className="text-slate-700 mb-4">where the right-hand side decomposes into three sets of operations.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Component I: Attention as Non-Local Integral Operator</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Integral Transformations</h3>
          <p className="text-slate-700 mb-4">Three kernel functions W<sup>Q</sup>, W<sup>K</sup>, W<sup>V</sup> define integral transformations [Tai et al., 2025, p.4-5]:</p>
          <div className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto" dangerouslySetInnerHTML={{
            __html: `$$\\begin{align}
Q(x, y, t; u) &= \\langle W^Q(\\cdot,y,t), u(x,\\cdot,t)\\rangle_{\\Omega_y} = \\int_{\\Omega_y} W^Q(\\xi,y,t)u(x,\\xi,t)d\\xi \\\\
K(x, y, t; u) &= \\langle W^K(\\cdot,y,t), u(x,\\cdot,t)\\rangle_{\\Omega_y} = \\int_{\\Omega_y} W^K(\\xi,y,t)u(x,\\xi,t)d\\xi \\\\
V(x, y, t; u) &= \\langle W^V(\\cdot,y,t), u(x,\\cdot,t)\\rangle_{\\Omega_y} = \\int_{\\Omega_y} W^V(\\xi,y,t)u(x,\\xi,t)d\\xi
\\end{align}$$`
          }} />
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Attention Score</h3>
          <p className="text-slate-700 mb-4">The attention score is computed as a softmax of inner products [Tai et al., 2025, p.5]:</p>
          <div className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto" dangerouslySetInnerHTML={{
            __html: `$$\\begin{align}
\\gamma(x, \\tilde{x}, t; u) &= \\text{Softmax}_2\\left[\\frac{1}{\\sqrt{|\\Omega_y|}}\\langle Q(x,\\cdot,t;u), K(\\tilde{x},\\cdot,t;u)\\rangle_{\\Omega_y}\\right] \\\\
&= \\frac{\\exp\\left(\\langle Q(x,\\cdot,t;u), K(\\tilde{x},\\cdot,t;u)\\rangle_{\\Omega_y}/\\sqrt{|\\Omega_y|}\\right)}{\\int_{\\Omega_x} \\exp\\left(\\langle Q(x,\\cdot,t;u), K(\\eta,\\cdot,t;u)\\rangle_{\\Omega_y}/\\sqrt{|\\Omega_y|}\\right)d\\eta}
\\end{align}$$`
          }} />
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Non-Local Nature</h3>
          <p className="text-slate-700 mb-4">The attention output ⟨γ(x,·,t;u), V(·,y,t;u)⟩_Ωx is <strong>non-local</strong> because:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>It integrates over all token positions x̃ ∈ Ωx</li>
            <li>Each token's update depends on all other tokens through γ</li>
            <li>This is fundamentally different from local differential operators (like convolutions)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Mathematical Interpretation:</strong> Attention is a <strong>non-local integral operator</strong> where the kernel γ(x, x̃, t; u) is data-dependent and computed via the softmax mechanism [Tai et al., 2025, p.3].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Component II: Layer Normalization as Projection</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Constraint Sets</h3>
          <p className="text-slate-700 mb-4">Define sets with specified mean σ<sub>1</sub> and variance σ<sub>2</sub>² [Tai et al., 2025, p.5]:</p>
          <div className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto" dangerouslySetInnerHTML={{
            __html: `$$S_1(\\sigma_1, \\sigma_2) = \\left\\{u : \\frac{1}{|\\Omega_y|}\\int_{\\Omega_y} u(x,\\xi,t)d\\xi = \\sigma_1, \\; \\frac{1}{|\\Omega_y|}\\int_{\\Omega_y} (u(x,\\xi,t) - \\sigma_1)^2d\\xi = \\sigma_2^2\\right\\}$$`
          }} />
          <p className="text-slate-700 mb-4">The indicator function ∂I<sub>S1</sub>(u) enforces this constraint.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Projection Theorem</h3>
          <p className="text-slate-700 mb-4"><strong>Theorem (Tai et al., 2025):</strong> The solution to <span dangerouslySetInnerHTML={{ __html: "$u - v = \\partial I_{S_1}(\\sigma_1,\\sigma_2)(u)$" }} /> is [Tai et al., 2025, p.8-9]:</p>
          <div className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto" dangerouslySetInnerHTML={{
            __html: `$$\\begin{align}
u(x,y) &= \\frac{v(x,y) - \\alpha(x)}{\\sqrt{\\beta(x)}} \\cdot \\sigma_2 + \\sigma_1 \\\\
\\text{where:} \\quad \\alpha(x) &= \\frac{1}{|\\Omega_y|}\\int_{\\Omega_y} v(x,\\xi)d\\xi \\quad \\text{(mean of } v\\text{)} \\\\
\\beta(x) &= \\frac{1}{|\\Omega_y|}\\int_{\\Omega_y} (v(x,\\xi) - \\alpha(x))^2d\\xi \\quad \\text{(variance of } v\\text{)}
\\end{align}$$`
          }} />
          <p className="text-slate-700 mb-4"><strong>Mathematical Interpretation:</strong> Layer normalization is a <strong>projection</strong> of a function onto the set S1(σ1, σ2), which can be solved in closed form. This is equivalent to standardizing v to have mean 0 and variance 1, then rescaling to mean σ1 and variance σ2² [Tai et al., 2025, p.9].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Component III: Feedforward Networks</h2>
          <p className="text-slate-700 mb-4">The feedforward component consists of [Tai et al., 2025, p.6]:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Σ_j [⟨W_j(·,y,t), u(x,·,t)⟩_Ωy + b_j(x,t)] + ∂I_S2(u)
          </code></pre>
          <p className="text-slate-700 mb-4">where:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>First term:</strong> J linear layers with kernels W_j and biases b_j</li>
            <li><strong>Second term:</strong> ReLU activation via projection to S2 = &#123;u : u ≥ 0&#125;</li>
          </ul>
          <p className="text-slate-700 mb-4">The ReLU activation solves u - ū = ∂I_S2(u), which has closed-form solution [Tai et al., 2025, p.9]:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            u = max&#123;ū, 0&#125; = ReLU(ū)
          </code></pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Operator Splitting Discretization</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Lie Splitting Scheme</h3>
          <p className="text-slate-700 mb-4">To discretize the continuous equation, use sequential Lie splitting [Tai et al., 2025, p.7]. Given u^n, compute u^(n+1) by M substeps:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Substep 1 (Attention):</strong> Solve u^(1/M) - u^0 = ⟨γ^0(x,·;u^0), V^0(·,y;u^0)⟩_Ωx</li>
            <li><strong>Substep 2 (LayerNorm):</strong> Solve u^(2/M) - u^(1/M) = ∂I_S1(u^(2/M))</li>
            <li><strong>Substeps 3 to 2+J (Feedforward):</strong> For j=1,...,J solve feedforward layer equations</li>
            <li><strong>Substep 3+J (Skip Connection):</strong> u^((3+J)/M) = (1/2)(u^((2+J)/M) + u^(2/M))</li>
            <li><strong>Substep 4+J (LayerNorm):</strong> Solve u^1 - u^((3+J)/M) = ∂I_S1(u^1)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Critical Insight:</strong> With M = 6 (corresponding to J = 2 feedforward layers), this splitting scheme <strong>exactly recovers</strong> the Transformer encoder architecture from Vaswani et al. (2017) [Tai et al., 2025, p.12].</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Spatial Discretization</h3>
          <p className="text-slate-700 mb-4">Discretize Ωx and Ωy with Nx and Ny grid points:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>u^0 ∈ ℝ^(Nx × Ny)</strong> represents Nx tokens with Ny-dimensional embeddings</li>
            <li><strong>W^Q, W^K, W^V ∈ ℝ^(Ny × Ny)</strong> are weight matrices</li>
            <li><strong>Integral transformations become matrix multiplications:</strong> Q^0(u^0) = u^0 W^Q,0</li>
          </ul>
          <p className="text-slate-700 mb-4">After spatial discretization, the continuous formulation reduces to standard Transformer operations [Tai et al., 2025, p.10-11].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why This Framework Matters</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Theoretical Insights</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Unified Understanding:</strong> Connects CNNs, UNets, and Transformers as discretizations of differential/integral equations</li>
            <li><strong>Design Principles:</strong> Systematic exploration of architectures using numerical analysis tools (stability, convergence)</li>
            <li><strong>Interpretability:</strong> Each component has clear mathematical meaning (attention = non-local operator, normalization = projection)</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Practical Implications</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Architecture Design:</strong> Can design new architectures by modifying the continuous equation</li>
            <li><strong>Embedding Domain Knowledge:</strong> Can incorporate physical laws or conservation principles directly into the formulation</li>
            <li><strong>Multi-Head Attention:</strong> Naturally extends by adding a head dimension h ∈ Ωh and integrating: ∫_Ωh ⟨γ(x,·,h,t;u), V(·,y,h,t;u)⟩dh [Tai et al., 2025, p.13]</li>
            <li><strong>Convolutional Transformers:</strong> For structured data (images), specialize to convolutions: Q = W^Q * u [Tai et al., 2025, p.14-15]</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Training as PDE-Constrained Optimization</h2>
          <p className="text-slate-700 mb-4">Given dataset &#123;(u<sub>i</sub>, v<sub>i</sub>)&#125;<sub>i=1</sub><sup>B</sup>, training solves [Tai et al., 2025, p.6]:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            min_θ (1/B)Σ_i ℓ(N_θ(ui), vi)

            subject to: N_θ(ui) solves the continuous Transformer equation
          </code></pre>
          <p className="text-slate-700 mb-4">where θ = &#123;W<sup>Q</sup>, W<sup>K</sup>, W<sup>V</sup>, &#123;W<sub>j</sub>, b<sub>j</sub>&#125;<sub>j=1</sub><sup>J</sup>, σ<sub>1</sub>(t), σ<sub>2</sub>(t)&#125; are control variables.</p>
          <p className="text-slate-700 mb-4"><strong>Interpretation:</strong> Training is a <strong>PDE-constrained optimization problem</strong>—a classical formulation in optimal control theory connecting deep learning to variational methods and calculus of variations [Tai et al., 2025, p.6].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Connections to Prior Work</h2>
          <p className="text-slate-700 mb-4">Previous works interpreted Transformers as:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Multi-particle dynamical systems</strong> (Dutta et al., 2021; Geshkovski et al., 2023)</li>
            <li><strong>ODE solvers</strong> (Lu et al., 2020)</li>
            <li><strong>Nonlocal variational models</strong> (Meng et al., 2024)</li>
          </ul>
          <p className="text-slate-700 mb-4">This framework differs fundamentally by:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Providing a <strong>complete operator-theoretic formulation</strong> for all components</li>
            <li>Using <strong>operator splitting</strong> to derive the architecture systematically</li>
            <li>Embedding in <strong>continuous domains for both tokens and features</strong></li>
            <li>Offering <strong>variational perspective</strong> via indicator functions and projections</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Creative Analogy: The Flow of a River</h2>
          <p className="text-slate-700 mb-4">Imagine the Transformer as modeling the evolution of a river system:</p>
          <p className="text-slate-700 mb-4"><strong>Traditional View:</strong> The river consists of discrete water molecules (tokens) that interact through discrete timesteps (layers).</p>
          <p className="text-slate-700 mb-4"><strong>Integro-Differential View:</strong> The river is a continuous fluid u(x,y,t) where:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>x</strong> = position along the river (token index)</li>
            <li><strong>y</strong> = depth and properties of water (feature dimension)</li>
            <li><strong>t</strong> = time as the river flows (layer depth)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Attention as Non-Local Operator:</strong> Water at position x is influenced by water at all other positions x̃ through long-range currents and eddies. The attention score γ(x,x̃,t) determines how strongly position x̃ influences position x—like vortices creating non-local interactions.</p>
          <p className="text-slate-700 mb-4"><strong>Layer Normalization as Projection:</strong> At each cross-section x, the water is constrained to have a certain average depth (mean σ1) and turbulence level (variance σ2²). This projection ensures stable flow.</p>
          <p className="text-slate-700 mb-4"><strong>Discretization:</strong> We observe the river at discrete positions (tokens) and time snapshots (layers), but the underlying dynamics are continuous. The Transformer is how we sample and approximate this continuous evolution.</p>
          <p className="text-slate-700 mb-4">The key insight: Just as fluid dynamics equations (Navier-Stokes) describe continuous flow that we discretize for computation, the Transformer solves a continuous integro-differential equation that we discretize into layers and tokens.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Implementation Considerations</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Choosing Time Discretization</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Number of layers Nt:</strong> Each layer corresponds to one time step Δt = T/Nt</li>
            <li><strong>Operator splitting order:</strong> Lie splitting (M=6) recovers standard Transformer</li>
            <li><strong>Hybrid splitting:</strong> Can combine sequential and parallel substeps for multi-stage architectures</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Spatial Discretization</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Nx (number of tokens):</strong> Determines sequence length</li>
            <li><strong>Ny (embedding dimension):</strong> Determines capacity of each token representation</li>
            <li><strong>Grid structure:</strong> Uniform grid for language, structured grid for images</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Extensions and Variations</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Multi-Head Attention</h3>
          <p className="text-slate-700 mb-4">Add continuous head dimension h ∈ Ωh [Tai et al., 2025, p.13]:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            u_t = ∫_Ωh ⟨γ(x,·,h,t;u), V(·,y,h,t;u)⟩_Ωx dh + ...
          </code></pre>
          <p className="text-slate-700 mb-4">After discretizing with Nh heads, this recovers multi-head attention exactly.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Convolutional Transformers</h3>
          <p className="text-slate-700 mb-4">For image data, define Q, K, V as convolutions [Tai et al., 2025, p.15]:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Q(x,y,t;u) = W^Q(·,t) * u(x,·,t) = ∫_Ωy W^Q(ξ,t)u(x, y-ξ, t)dξ
          </code></pre>
          <p className="text-slate-700 mb-4">This incorporates spatial locality while maintaining global context through attention.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Future Directions</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Stability Analysis:</strong> Study stability conditions for the integro-differential equation</li>
            <li><strong>Convergence Theory:</strong> Prove convergence rates as discretization is refined (Nx, Ny → ∞)</li>
            <li><strong>Adaptive Discretization:</strong> Learn optimal token positions x and feature dimensions y</li>
            <li><strong>Physics-Informed Transformers:</strong> Incorporate conservation laws or symmetries into the formulation</li>
            <li><strong>Higher-Order Schemes:</strong> Use Strang splitting or Runge-Kutta methods for better accuracy</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>[Transformer Architecture](/wiki/transformer-architecture)</li>
            <li>[Self-Attention](/wiki/self-attention)</li>
            <li>[Layer Normalization](/wiki/layer-normalization)</li>
            <li>[Operator Splitting Methods](/wiki/operator-splitting)</li>
            <li>[Non-Local Integral Operators](/wiki/non-local-operators)</li>
            <li>[Continuous Neural Networks](/wiki/continuous-neural-networks)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">References</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Tai, X., Liu, H., Li, L., &amp; Chan, R. H. (2025). A Mathematical Explanation of Transformers for Large Language Models and GPTs. arXiv preprint arXiv:2510.03989.</li>
            <li>Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., &amp; Polosukhin, I. (2017). Attention Is All You Need. Advances in Neural Information Processing Systems, 30.</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
