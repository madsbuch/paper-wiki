import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function IOAwareAlgorithms() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "IO-Aware Algorithms",
  description: "Algorithms that explicitly account for data movement between different levels of memory hierarchy, optimizing for memory access patterns rather than just computational complexity",
  category: "Optimization & Efficiency",
  tags: ["memory-optimization", "gpu", "performance", "algorithm-design"],
  citations: [
    {
      paper: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
      authors: "Dao, T., Fu, D. Y., Ermon, S., Rudra, A., & Ré, C.",
      year: "2022",
      pages: "1-3"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4"><strong>IO-Aware Algorithms</strong> are computational algorithms that explicitly account for the cost of data movement between different levels of the memory hierarchy, rather than focusing solely on the number of arithmetic operations. In modern computing, especially on GPUs, memory access patterns often dominate overall performance, making IO-awareness critical for achieving practical speedups [Dao et al., 2022, p.1].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Memory Access Bottleneck</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Traditional Algorithmic Analysis</h3>
          <p className="text-slate-700 mb-4">Historically, algorithm analysis focused primarily on <strong>computational complexity</strong>—counting the number of operations (additions, multiplications, comparisons) required [Dao et al., 2022, p.2].</p>
          <p className="text-slate-700 mb-4"><strong>Example:</strong> Matrix multiplication of two N×N matrices requires O(N³) operations using the standard algorithm.</p>
          <p className="text-slate-700 mb-4"><strong>Problem:</strong> This analysis assumes all operations cost the same, regardless of where data is stored or how it's accessed.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Modern Reality: Memory is the Bottleneck</h3>
          <p className="text-slate-700 mb-4">On modern hardware, <strong>many operations are memory-bound</strong> rather than compute-bound [Dao et al., 2022, p.2]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Memory-bound:</strong> Performance limited by how fast data can be read from/written to memory</li>
            <li><strong>Compute-bound:</strong> Performance limited by how fast arithmetic operations can be performed</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Key Insight:</strong> GPUs can perform trillions of operations per second, but memory bandwidth is much more limited. Reading data from slow memory (HBM) can take 10-20× longer than the actual computation [Dao et al., 2022, p.2].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The GPU Memory Hierarchy</h2>
          <p className="text-slate-700 mb-4">Modern GPUs have multiple levels of memory with different characteristics [Dao et al., 2022, p.2]:</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">High Bandwidth Memory (HBM)</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Capacity:</strong> Large (40-80GB on A100 GPU)</li>
            <li><strong>Bandwidth:</strong> Moderate (~1.5-2.0 TB/s)</li>
            <li><strong>Latency:</strong> Slower</li>
            <li><strong>Location:</strong> Off-chip (separate from GPU cores)</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">SRAM (On-Chip Memory)</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Capacity:</strong> Small (~20MB on A100 GPU)</li>
            <li><strong>Bandwidth:</strong> Very high (~19 TB/s, 10× faster than HBM)</li>
            <li><strong>Latency:</strong> Much faster</li>
            <li><strong>Location:</strong> On-chip (directly accessible by GPU cores)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>The Challenge:</strong> Data must move from HBM → SRAM → compute units → SRAM → HBM. Each data transfer has a cost [Dao et al., 2022, p.2].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">IO Complexity</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Definition</h3>
          <p className="text-slate-700 mb-4"><strong>IO Complexity</strong> measures the number of memory accesses (reads and writes) between slow memory (HBM) and fast memory (SRAM), not just the number of arithmetic operations [Dao et al., 2022, p.3].</p>
          <p className="text-slate-700 mb-4"><strong>Notation:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>N = problem size (e.g., sequence length)</li>
            <li>M = fast memory (SRAM) size</li>
            <li>Standard big-O notation applies: Θ(·) describes the asymptotic growth</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Example: Standard Attention</h3>
          <p className="text-slate-700 mb-4"><strong>Computational complexity:</strong> O(N²d) operations</p>
          <p className="text-slate-700 mb-4"><strong>IO complexity:</strong> Θ(Nd + N²) memory accesses [Dao et al., 2022, p.3]</p>
          <p className="text-slate-700 mb-4"><strong>Why Θ(Nd + N²)?</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Read Q, K, V from HBM: Θ(Nd) accesses (three N×d matrices)</li>
            <li>Write S = QK^T to HBM: Θ(N²) accesses (N×N matrix)</li>
            <li>Read S from HBM: Θ(N²) accesses</li>
            <li>Write P = softmax(S) to HBM: Θ(N²) accesses</li>
            <li>Read P from HBM: Θ(N²) accesses</li>
            <li>Write O = PV to HBM: Θ(Nd) accesses</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Total:</strong> Θ(Nd + N²) ≈ Θ(N²) for long sequences (since d is typically fixed, e.g., 64 or 128)</p>
          <p className="text-slate-700 mb-4"><strong>Problem:</strong> The N² term means memory accesses grow quadratically with sequence length, making long sequences prohibitively slow.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Principles of IO-Aware Algorithm Design</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">1. Minimize Data Movement</h3>
          <p className="text-slate-700 mb-4"><strong>Goal:</strong> Reduce the number of reads/writes between slow and fast memory.</p>
          <p className="text-slate-700 mb-4"><strong>Techniques:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Keep data in fast memory (SRAM) as long as possible</li>
            <li>Recompute instead of storing intermediate results when beneficial</li>
            <li>Fuse multiple operations to avoid writing/reading intermediate values</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. Maximize Data Reuse</h3>
          <p className="text-slate-700 mb-4"><strong>Goal:</strong> Once data is loaded into fast memory, perform as many operations on it as possible before evicting it.</p>
          <p className="text-slate-700 mb-4"><strong>Techniques:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Process data in blocks (tiling)</li>
            <li>Reorder operations to increase temporal locality</li>
            <li>Structure computation to match memory hierarchy</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Account for Memory Constraints</h3>
          <p className="text-slate-700 mb-4"><strong>Goal:</strong> Design algorithms that fit within the available fast memory.</p>
          <p className="text-slate-700 mb-4"><strong>Techniques:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Tile computations to fit in SRAM</li>
            <li>Use streaming algorithms that process data in passes</li>
            <li>Trade-off between memory usage and recomputation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">IO-Aware Design in Practice: FlashAttention</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Problem</h3>
          <p className="text-slate-700 mb-4">Standard attention requires Θ(N²) HBM accesses because it materializes the full N×N attention matrix S and P in HBM [Dao et al., 2022, p.3].</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The IO-Aware Solution</h3>
          <p className="text-slate-700 mb-4">FlashAttention achieves Θ(N²d²M⁻¹) HBM accesses by [Dao et al., 2022, p.3-5]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Tiling:</strong> Split Q, K, V into blocks that fit in SRAM</li>
            <li><strong>Incremental computation:</strong> Compute attention block-by-block without materializing the full matrix</li>
            <li><strong>Kernel fusion:</strong> Fuse all operations (matmul, softmax, output accumulation) into one kernel</li>
            <li><strong>Recomputation:</strong> In backward pass, recompute attention blocks instead of storing them</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Why This Works:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Each block of K and V is loaded once from HBM</li>
            <li>All operations on that block happen in SRAM (fast memory)</li>
            <li>Only the final output block is written back to HBM</li>
            <li>No intermediate N×N matrices are stored in HBM</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Result:</strong> For typical values (d ≈ 64-128, M ≈ 20MB), FlashAttention reduces HBM accesses by 5-20× compared to standard attention [Dao et al., 2022, p.8].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Creative Analogy: The Warehouse vs. Workbench</h2>
          <p className="text-slate-700 mb-4">Imagine you're assembling furniture:</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Traditional Approach (Not IO-Aware)</h3>
          <p className="text-slate-700 mb-4"><strong>Setup:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Warehouse</strong> (HBM): Large storage area, 10-minute walk from your workbench</li>
            <li><strong>Workbench</strong> (SRAM): Small table with your tools, where you actually work</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Process:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Walk to warehouse, get piece A, walk back (10 min)</li>
            <li>Walk to warehouse, get piece B, walk back (10 min)</li>
            <li>Attach A to B (30 seconds)</li>
            <li>Walk to warehouse, store AB, walk back (10 min)</li>
            <li>Walk to warehouse, get AB, walk back (10 min)</li>
            <li>Walk to warehouse, get piece C, walk back (10 min)</li>
            <li>Attach AB to C (30 seconds)</li>
            <li>...continue...</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Problem:</strong> You spend 99% of your time walking to/from the warehouse, only 1% actually working!</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The IO-Aware Approach (FlashAttention)</h3>
          <p className="text-slate-700 mb-4"><strong>Same setup, but smarter strategy:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Identify which pieces you'll need for the next hour of work</li>
            <li>Carry as many as will fit in your backpack (tiling)</li>
            <li>Walk to warehouse once, get all those pieces (10 min)</li>
            <li>Do ALL the assembly work for those pieces at your workbench (30 min of actual work)</li>
            <li>Carry finished sub-assemblies back to warehouse in one trip (10 min)</li>
            <li>Repeat for the next batch</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Result:</strong> 50 minutes of round-trip warehouse walks, 30 minutes of productive work—ratio has flipped from 99:1 to 5:3!</p>
          <p className="text-slate-700 mb-4"><strong>Key Insight:</strong> The algorithm explicitly planned for the cost of walking to the warehouse (data movement), not just the cost of turning screws (computation).</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">When to Use IO-Aware Design</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">High Impact Scenarios</h3>
          <p className="text-slate-700 mb-4">IO-aware optimization is most impactful when:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Memory-bound operations:</strong> Operations where memory access dominates computation</li>
            <li><strong>Large intermediate data:</strong> Algorithms that create large temporary arrays</li>
            <li><strong>Repeated access patterns:</strong> Operations that access the same data multiple times</li>
            <li><strong>Limited fast memory:</strong> When working with hardware that has small on-chip cache</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Common Candidates</h3>
          <p className="text-slate-700 mb-4">Operations that benefit from IO-aware design:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Attention mechanisms:</strong> Quadratic memory access in sequence length</li>
            <li><strong>Large matrix operations:</strong> Matrix multiplication, factorizations</li>
            <li><strong>Sparse operations:</strong> Irregular access patterns</li>
            <li><strong>Recurrent computations:</strong> Sequential dependencies with state</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Comparing Computational vs. IO Complexity</h2>
          <p className="text-slate-700 mb-4">| Operation | Computational Complexity | IO Complexity (Standard) | IO Complexity (IO-Aware) |</p>
          <p className="text-slate-700 mb-4">|-----------|-------------------------|--------------------------|--------------------------|</p>
          <p className="text-slate-700 mb-4">| Attention | O(N²d) | Θ(Nd + N²) | Θ(N²d²M⁻¹) |</p>
          <p className="text-slate-700 mb-4">| Matrix Multiply | O(N³) | Θ(N³/√M) | Θ(N³/M) |</p>
          <p className="text-slate-700 mb-4">| Sorting | O(N log N) | Θ(N log N) | Θ(N/B log_&#123;M/B&#125; N/B) |</p>
          <p className="text-slate-700 mb-4"><strong>Note:</strong> For attention with typical values (d=64, M=20MB, N=1024), IO-aware gives ~10× fewer HBM accesses [Dao et al., 2022, p.8].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Design Trade-offs</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Recomputation vs. Storage</h3>
          <p className="text-slate-700 mb-4"><strong>Trade-off:</strong> Recompute values vs. store them in memory [Dao et al., 2022, p.5].</p>
          <p className="text-slate-700 mb-4"><strong>When to recompute:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>If computation is fast (e.g., cheap arithmetic operations)</li>
            <li>If storage cost is high (e.g., large intermediate tensors)</li>
            <li>If recomputation fits in fast memory</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Example:</strong> FlashAttention recomputes the attention matrix in the backward pass instead of storing it, because:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Computing S = QK^T is fast (~O(Bd²) operations for a block)</li>
            <li>Storing full S would require Θ(N²) memory</li>
            <li>Q, K blocks fit in SRAM, so recomputation is done in fast memory</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Tiling Granularity</h3>
          <p className="text-slate-700 mb-4"><strong>Trade-off:</strong> Larger tiles vs. more passes [Dao et al., 2022, p.4-5].</p>
          <p className="text-slate-700 mb-4"><strong>Larger tiles (blocks):</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Fewer passes over data (fewer HBM accesses)</li>
            <li>May not fit in SRAM</li>
            <li>More computation per tile</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Smaller tiles:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Always fit in SRAM</li>
            <li>More passes needed (more HBM accesses)</li>
            <li>Less computation per tile</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Optimal choice:</strong> Depends on M (SRAM size), N (problem size), and operation characteristics.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Practical Implementation Considerations</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Hardware-Specific Tuning</h3>
          <p className="text-slate-700 mb-4">IO-aware algorithms often require hardware-specific optimization [Dao et al., 2022, p.7]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Know your hardware:</strong> Measure actual SRAM size, bandwidth, latency</li>
            <li><strong>Profile memory access:</strong> Use tools to identify memory bottlenecks</li>
            <li><strong>Tune tile sizes:</strong> Experiment with different block sizes for your hardware</li>
            <li><strong>Benchmark:</strong> Measure wall-clock time, not just FLOPs</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Software Techniques</h3>
          <p className="text-slate-700 mb-4"><strong>Kernel fusion:</strong> Combine multiple operations into a single GPU kernel to avoid intermediate writes [Dao et al., 2022, p.4].</p>
          <p className="text-slate-700 mb-4"><strong>Example:</strong> Instead of three separate kernels:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            S = matmul(Q, K^T)    # Kernel 1: write S to HBM
            P = softmax(S)         # Kernel 2: read S, write P to HBM
            O = matmul(P, V)       # Kernel 3: read P, write O to HBM
          </code></pre>
          <p className="text-slate-700 mb-4">Fuse into one kernel:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            # Single kernel: read Q, K, V; write O
            # S and P never touch HBM
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Online algorithms:</strong> Process data in streaming fashion without materializing full intermediate structures [Dao et al., 2022, p.4].</p>
          <p className="text-slate-700 mb-4"><strong>Example:</strong> Online softmax computes softmax in blocks without storing the full input.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact and Applications</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Performance Gains</h3>
          <p className="text-slate-700 mb-4">When applied to attention mechanisms, IO-aware design achieves [Dao et al., 2022, p.1, 8-11]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>15% speedup on BERT training (sequence length 512)</li>
            <li>3× speedup on GPT-2 (sequence length 1K)</li>
            <li>2.4× speedup on Long Range Arena (sequence length 1K-4K)</li>
            <li>Enables sequences up to 64K (previously infeasible)</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Broader Applications</h3>
          <p className="text-slate-700 mb-4">IO-aware principles apply beyond attention:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Sparse matrix operations:</strong> Block sparse formats</li>
            <li><strong>Graph neural networks:</strong> Efficient neighbor aggregation</li>
            <li><strong>Scientific computing:</strong> PDE solvers, linear algebra</li>
            <li><strong>Database systems:</strong> Query optimization, join algorithms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>[GPU Memory Hierarchy](/wiki/gpu-memory-hierarchy)</li>
            <li>[Tiling Techniques](/wiki/tiling-techniques)</li>
            <li>[Kernel Fusion](/wiki/kernel-fusion)</li>
            <li>[Attention Mechanism](/wiki/attention-mechanism)</li>
            <li>[Block-Sparse Attention](/wiki/block-sparse-attention)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">References</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Dao, T., Fu, D. Y., Ermon, S., Rudra, A., &amp; Ré, C. (2022). FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness. In Advances in Neural Information Processing Systems (NeurIPS 2022).</li>
            <li>Hong, S., &amp; Kim, H. H. (2009). An analytical model for a GPU architecture with memory-level and thread-level parallelism awareness. ACM SIGARCH Computer Architecture News, 37(3), 152-163.</li>
            <li>Ballard, G., Demmel, J., Holtz, O., &amp; Schwartz, O. (2011). Minimizing communication in numerical linear algebra. SIAM Journal on Matrix Analysis and Applications, 32(3), 866-901.</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
