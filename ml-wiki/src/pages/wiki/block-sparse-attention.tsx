import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import { useEffect } from "react";

export default function BlockSparseAttention() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error("MathJax typesetting failed:", err),
      );
    }
  }, []);

  return (
    <WikiLayout
      title="Block-Sparse Attention"
      description="Attention mechanism that only computes a predefined sparse pattern of attention blocks, reducing computational and memory costs from O(N²) to O(Ns) where s is the sparsity fraction"
      category="Model Architecture"
      citations={[
        {
          paper:
            "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
          authors: "Dao, T., Fu, D. Y., Ermon, S., Rudra, A., & Ré, C.",
          year: "2022",
          pages: "6",
        },
      ]}
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700">
            <strong>Block-Sparse Attention</strong> is a variant of the
            attention mechanism that only computes attention for a predefined
            sparse pattern of blocks, rather than the full dense N×N attention
            matrix. By restricting attention to specific block patterns,
            block-sparse attention reduces computational complexity from O(N²)
            to O(Ns), where s is the sparsity fraction (proportion of blocks
            computed) [Dao et al., 2022, p.6].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Quadratic Cost Problem
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Standard Dense Attention
          </h3>
          <p className="text-slate-700 mb-2">
            <strong>Computation:</strong>
          </p>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-slate-700">{`S = QK^T     # O(N²d) operations
P = softmax(S)  # O(N²) operations
O = PV       # O(N²d) operations`}</pre>
          </div>
          <p className="text-slate-700 mb-2">
            <strong>Complexity:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Time:</strong> O(N²d) operations
            </li>
            <li>
              <strong>Memory:</strong> O(N²) storage for attention matrix
            </li>
            <li>
              <strong>Problem:</strong> Quadratic scaling prevents long
              sequences (N &gt; 4K difficult, N &gt; 16K infeasible)
            </li>
          </ul>
          <p className="text-slate-700">
            <strong>Example:</strong> For N=16K, d=64:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Attention matrix: 16K × 16K × 2 bytes = 512MB per head</li>
            <li>With 16 heads: 8GB just for attention matrices!</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Sparse Attention Idea
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Key Insight
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Observation:</strong> Not all positions need to attend to
            all other positions [Dao et al., 2022, p.6].
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Intuition:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Nearby tokens are usually most relevant (local attention)</li>
            <li>Some global context is useful (global tokens)</li>
            <li>Many distant token pairs have minimal interaction</li>
          </ul>
          <p className="text-slate-700 mb-4">
            <strong>Proposal:</strong> Compute attention only for important
            pairs, set others to zero.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Block-Sparse Structure
          </h3>
          <p className="text-slate-700 mb-4">
            Instead of element-wise sparsity, use{" "}
            <strong>block-level sparsity</strong> [Dao et al., 2022, p.6]:
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Why blocks?</strong>
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Hardware efficiency: GPUs process blocks efficiently</li>
            <li>Regular patterns: Easier to implement and optimize</li>
            <li>IO-aware: Aligns with tiling strategies</li>
          </ol>
          <p className="text-slate-700 mb-2">
            <strong>Block mask:</strong> Binary matrix M indicating which blocks
            to compute:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>M[i,j] = 1: Compute attention block between Q_i and K_j</li>
            <li>M[i,j] = 0: Skip this block (treat as zero attention)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Common Sparse Patterns
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            1. Local (Banded) Attention
          </h3>
          <p className="text-slate-700 mb-2">
            <strong>Pattern:</strong> Each position attends to w neighbors on
            each side.
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Block structure:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Diagonal band of width w</li>
            <li>All other blocks are zero</li>
          </ul>
          <p className="text-slate-700 mb-4">
            <strong>Sparsity:</strong> s = w/N (for w &#60;&#60; N)
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Use case:</strong> Text modeling where nearby context is
            most important.
          </p>
          <p className="text-slate-700">
            <strong>Example:</strong> With w=256, N=4096: s = 256/4096 = 6.25%
            (16× reduction)
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            2. Strided (Dilated) Attention
          </h3>
          <p className="text-slate-700 mb-2">
            <strong>Pattern:</strong> Each position attends to every k-th
            position.
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Block structure:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Sparse diagonal stripes at stride k</li>
          </ul>
          <p className="text-slate-700 mb-4">
            <strong>Sparsity:</strong> s = 1/k
          </p>
          <p className="text-slate-700">
            <strong>Use case:</strong> Capturing different levels of
            granularity.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            3. Local + Global Attention
          </h3>
          <p className="text-slate-700 mb-2">
            <strong>Pattern:</strong> Local window + a few global tokens.
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Block structure:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Diagonal band (local)</li>
            <li>First/last few rows/columns (global tokens)</li>
          </ul>
          <p className="text-slate-700 mb-4">
            <strong>Sparsity:</strong> s = (w + g)/N, where g is number of
            global tokens
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Use case:</strong> Document processing with summary tokens.
          </p>
          <p className="text-slate-700">
            <strong>Example (Longformer pattern):</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Local window: w=512</li>
            <li>Global tokens: g=64</li>
            <li>For N=4096: s = (512 + 64)/4096 = 14% (7× reduction)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            4. Fixed Random Pattern
          </h3>
          <p className="text-slate-700 mb-2">
            <strong>Pattern:</strong> Random subset of blocks.
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Block structure:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Randomly selected blocks (fixed per layer)</li>
          </ul>
          <p className="text-slate-700 mb-4">
            <strong>Sparsity:</strong> s = fraction of selected blocks
          </p>
          <p className="text-slate-700">
            <strong>Use case:</strong> When no obvious attention pattern known.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            5. Block-Local + Block-Global
          </h3>
          <p className="text-slate-700 mb-2">
            <strong>Pattern:</strong> Divide sequence into blocks, attend within
            block + to all block representatives.
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Block structure:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Block diagonal</li>
            <li>Additional rows/columns for representatives</li>
          </ul>
          <p className="text-slate-700 mb-4">
            <strong>Sparsity:</strong> s = (b + r)/N, where b is block size, r
            is representatives
          </p>
          <p className="text-slate-700">
            <strong>Use case:</strong> Hierarchical sequence processing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Block-Sparse FlashAttention
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Extending FlashAttention
          </h3>
          <p className="text-slate-700 mb-4">
            FlashAttention naturally extends to block-sparse patterns [Dao et
            al., 2022, p.6]:
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Key idea:</strong> Only load and compute blocks where mask
            M[i,j] = 1.
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Algorithm modification:</strong>
          </p>
          <div className="bg-slate-100 rounded-lg p-4 font-mono text-sm mb-4">
            <pre className="text-slate-700">{`For each K_j, V_j block:
    For each Q_i block:
        If M[i,j] == 1:  # Check mask
            Load Q_i, K_j, V_j to SRAM
            Compute attention for this block
            Update output O_i
        Else:
            Skip (treat as zero attention)`}</pre>
          </div>
          <p className="text-slate-700 mb-2">
            <strong>Benefits:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Same tiling and fusion techniques apply</li>
            <li>
              Skip blocks efficiently (no computation or memory for zero blocks)
            </li>
            <li>Exact attention on non-zero blocks (no approximation)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            IO Complexity Analysis
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Dense FlashAttention:</strong> Θ(N²d²M⁻¹) HBM accesses [Dao
            et al., 2022, p.3]
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Block-Sparse FlashAttention:</strong> Θ(Nd + N²d²M⁻¹s) HBM
            accesses [Dao et al., 2022, p.6]
          </p>
          <p className="text-slate-700 mb-4">
            where s = sparsity fraction (proportion of blocks computed).
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Example:</strong> With s=10% (90% sparse):
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Reduce HBM accesses by ~10×</li>
            <li>Reduce computation by ~10×</li>
            <li>
              <strong>Result:</strong> ~10× speedup
            </li>
          </ul>
          <p className="text-slate-700 mb-2">
            <strong>Comparison to other sparse methods:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>
              Approximate sparse attention (e.g., LSH, linformer): Faster but
              less accurate
            </li>
            <li>
              Block-sparse FlashAttention: Faster AND exact (on non-zero blocks)
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            Performance Results
          </h3>
          <p className="text-slate-700 mb-4">
            From the FlashAttention paper [Dao et al., 2022, p.11]:
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Task:</strong> Long Range Arena (LRA) benchmarks
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Configuration:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Local attention window: 256</li>
            <li>Sequence lengths: 1K-4K</li>
          </ul>
          <p className="text-slate-700 mb-2">
            <strong>Results:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>2-4× speedup over dense attention</li>
            <li>
              Faster than approximate sparse methods (e.g., Performer, Linear
              Attention)
            </li>
            <li>Better accuracy than approximate methods</li>
          </ul>
          <p className="text-slate-700">
            <strong>Key insight:</strong> IO-aware block-sparse is faster than
            approximate methods while being exact!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Sparse Pattern Design Considerations
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            1. Information Flow
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Question:</strong> Can information flow between all
            positions?
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Challenge:</strong> With local-only attention, distant
            positions can't communicate directly.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Solution:</strong> Stack multiple layers, each allowing some
            long-range connections.
          </p>
          <p className="text-slate-700">
            <strong>Example:</strong> With local window w=256 and 12 layers:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Effective receptive field: 256 × 12 = 3,072 positions</li>
            <li>Sufficient for most sequences</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            2. Task-Specific Patterns
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Different tasks benefit from different patterns:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Language modeling:</strong> Causal (lower-triangular) with
              local bias
            </li>
            <li>
              <strong>Document classification:</strong> Local + global tokens
            </li>
            <li>
              <strong>Protein sequences:</strong> Residue contact patterns
            </li>
            <li>
              <strong>Images (as sequences):</strong> 2D local patterns
            </li>
          </ul>
          <p className="text-slate-700">
            <strong>Strategy:</strong> Design pattern based on inductive bias of
            the task.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            3. Learnable vs. Fixed Patterns
          </h3>
          <p className="text-slate-700 mb-2">
            <strong>Fixed patterns:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Defined by algorithm (local, strided, etc.)</li>
            <li>Efficient, predictable</li>
            <li>May not be optimal for data</li>
          </ul>
          <p className="text-slate-700 mb-2">
            <strong>Learnable patterns:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Learned from data (e.g., sparse routing)</li>
            <li>Potentially better performance</li>
            <li>Irregular, harder to optimize</li>
          </ul>
          <p className="text-slate-700">
            <strong>Hybrid:</strong> Fixed structure with learnable parameters
            (e.g., learned window sizes)
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            4. Gradient Flow
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Challenge:</strong> Sparse attention can create gradient
            bottlenecks.
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Mitigation:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Ensure all positions reachable within few layers</li>
            <li>Use residual connections</li>
            <li>Careful pattern design</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Memory and Computational Savings
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Memory Savings
          </h3>
          <p className="text-slate-700 mb-2">
            <strong>Dense attention:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Store S, P: 2 × N² × precision</li>
            <li>Example: N=16K, FP16: 2 × 16K² × 2 bytes = 1GB</li>
          </ul>
          <p className="text-slate-700 mb-2">
            <strong>Block-sparse attention:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Store only non-zero blocks: 2 × N² × s × precision</li>
            <li>
              Example: N=16K, s=10%, FP16: 2 × 16K² × 0.1 × 2 bytes = 100MB
            </li>
          </ul>
          <p className="text-slate-700 mb-4">
            <strong>Savings:</strong> 10× reduction in memory
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Computational Savings
          </h3>
          <p className="text-slate-700 mb-2">
            <strong>Dense attention:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Matmul operations: 2 × N²d</li>
            <li>Softmax operations: O(N²)</li>
          </ul>
          <p className="text-slate-700 mb-2">
            <strong>Block-sparse attention:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Matmul operations: 2 × N²ds (only for non-zero blocks)</li>
            <li>Softmax operations: O(N²s)</li>
          </ul>
          <p className="text-slate-700 mb-4">
            <strong>Savings:</strong> s⁻¹ reduction (10× for s=10%)
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Practical Speedup
          </h3>
          <p className="text-slate-700 mb-2">
            <strong>Factors affecting speedup:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Sparsity fraction s</li>
            <li>Hardware efficiency (GPU utilization)</li>
            <li>Pattern regularity (irregular patterns have overhead)</li>
            <li>Sequence length (longer sequences benefit more)</li>
          </ol>
          <p className="text-slate-700">
            <strong>Typical speedups:</strong> 2-5× for s=10-20% [Dao et al.,
            2022, p.11]
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Applications and Use Cases
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Long Sequences
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Problem:</strong> Dense attention infeasible for N &gt; 16K.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Solution:</strong> Block-sparse attention enables sequences
            up to 64K+ [Dao et al., 2022, p.12].
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Applications:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Long documents (books, legal contracts)</li>
            <li>DNA sequences</li>
            <li>Long videos</li>
            <li>Long-context language modeling</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            Efficiency-Focused Models
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Goal:</strong> Reduce cost while maintaining quality.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Approach:</strong> Use sparse attention with carefully
            designed patterns.
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Examples:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Longformer (document understanding)</li>
            <li>BigBird (long sequences)</li>
            <li>Sparse Transformers (generative modeling)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            Multi-Resolution Modeling
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Idea:</strong> Attend densely to local context, sparsely to
            distant context.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Pattern:</strong> Local + strided or local + global.
          </p>
          <p className="text-slate-700">
            <strong>Benefit:</strong> Captures both fine-grained and
            coarse-grained structure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Trade-offs and Limitations
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Accuracy vs. Efficiency
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Trade-off:</strong> Sparse attention may miss important
            long-range dependencies.
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Mitigation:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Careful pattern design</li>
            <li>Stack more layers</li>
            <li>Include global tokens for critical information flow</li>
          </ul>
          <p className="text-slate-700 mb-4">
            <strong>Empirical finding:</strong> Well-designed sparse patterns
            often match dense attention accuracy [Dao et al., 2022, p.11].
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Pattern Generalizability
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Challenge:</strong> Optimal pattern may vary by task.
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Solutions:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Use flexible patterns (local + global)</li>
            <li>Meta-learn patterns</li>
            <li>Adaptive sparsity</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            Implementation Complexity
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Dense attention:</strong> Simple, standard implementations
            available.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Sparse attention:</strong> Requires custom kernels, more
            complex code.
          </p>
          <p className="text-slate-700">
            <strong>Pragmatic approach:</strong> Use libraries like
            FlashAttention with sparse support.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Creative Analogy: The Party Conversation
          </h2>
          <p className="text-slate-700 mb-4">
            Imagine a party with N=1000 people.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Dense Attention (Full Party)
          </h3>
          <p className="text-slate-700 mb-2">
            <strong>Scenario:</strong> Everyone must hear everyone else's
            conversation.
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Process:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Person 1 talks, all 999 others listen</li>
            <li>Person 2 talks, all 999 others listen</li>
            <li>...continue for all 1000 people</li>
          </ul>
          <p className="text-slate-700 mb-2">
            <strong>Cost:</strong> 1000 × 999 ≈ 1,000,000 conversation pairs
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Time:</strong> Days!
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Problem:</strong> Infeasible, exhausting, most conversations
            irrelevant
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Block-Sparse Attention (Smart Networking)
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Scenario:</strong> People use efficient conversation
            patterns.
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Pattern (Local + Global):</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Talk to nearby people (local attention window w=10)</li>
            <li>Listen to keynote speakers (global tokens g=5)</li>
          </ul>
          <p className="text-slate-700 mb-2">
            <strong>Cost:</strong> 1000 × (10 + 5) = 15,000 conversation pairs
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Savings:</strong> 1M → 15K = 67× reduction!
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Result:</strong> Feasible in a few hours, most important
            info captured
          </p>
          <p className="text-slate-700">
            <strong>Key insight:</strong> Most useful information comes from
            nearby people and key speakers—no need for everyone to talk to
            everyone.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Related Concepts
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>
              <Link
                to="/wiki/attention-mechanism"
                className="text-blue-600 hover:underline"
              >
                Attention Mechanism
              </Link>
            </li>
            <li>
              <Link
                to="/wiki/io-aware-algorithms"
                className="text-blue-600 hover:underline"
              >
                IO-Aware Algorithms
              </Link>
            </li>
            <li>
              <Link
                to="/wiki/tiling-techniques"
                className="text-blue-600 hover:underline"
              >
                Tiling Techniques
              </Link>
            </li>
            <li>
              <Link
                to="/wiki/kernel-fusion"
                className="text-blue-600 hover:underline"
              >
                Kernel Fusion
              </Link>
            </li>
            <li>
              <Link
                to="/wiki/transformer-architecture"
                className="text-blue-600 hover:underline"
              >
                Transformer Architecture
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
