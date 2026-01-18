import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function GPUMemoryHierarchy() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "GPU Memory Hierarchy",
  description: "The multi-level structure of memory in GPUs, from fast on-chip SRAM to slower high-bandwidth memory, with dramatic implications for algorithm performance",
  category: "Hardware & Systems",
  tags: ["gpu", "memory", "hardware", "performance", "optimization"],
  citations: [
    {
      paper: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
      authors: "Dao, T., Fu, D. Y., Ermon, S., Rudra, A., & Ré, C.",
      year: "2022",
      pages: "2"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">The <strong>GPU Memory Hierarchy</strong> is a multi-level system of memory storage in Graphics Processing Units (GPUs), where different levels trade off capacity for speed. Understanding this hierarchy is critical for writing high-performance GPU code, as data movement between levels can dominate overall runtime [Dao et al., 2022, p.2].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Memory Hierarchy Levels</h2>
          <p className="text-slate-700 mb-4">Modern GPUs like the NVIDIA A100 have a clear memory hierarchy [Dao et al., 2022, p.2]:</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Level 1: Registers</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Capacity:</strong> Smallest (~256KB per SM)</li>
            <li><strong>Bandwidth:</strong> Highest (~20+ TB/s effective)</li>
            <li><strong>Latency:</strong> Lowest (1 cycle)</li>
            <li><strong>Scope:</strong> Per-thread</li>
            <li><strong>Use:</strong> Immediate computation values</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Level 2: SRAM (On-Chip Memory / Shared Memory)</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Capacity:</strong> Small (~20MB total, ~164KB per SM on A100)</li>
            <li><strong>Bandwidth:</strong> Very high (~19 TB/s on A100)</li>
            <li><strong>Latency:</strong> Very low (~20-30 cycles)</li>
            <li><strong>Scope:</strong> Per-block (shared across threads in a thread block)</li>
            <li><strong>Use:</strong> Intermediate results, shared data</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Level 3: L2 Cache</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Capacity:</strong> Medium (~40MB on A100)</li>
            <li><strong>Bandwidth:</strong> High (~7 TB/s)</li>
            <li><strong>Latency:</strong> Moderate (~200 cycles)</li>
            <li><strong>Scope:</strong> GPU-wide</li>
            <li><strong>Use:</strong> Recently accessed data (automatic caching)</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Level 4: HBM (High Bandwidth Memory / Global Memory)</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Capacity:</strong> Largest (40-80GB on A100)</li>
            <li><strong>Bandwidth:</strong> Lower (~1.5-2.0 TB/s on A100)</li>
            <li><strong>Latency:</strong> Higher (~300-600 cycles)</li>
            <li><strong>Scope:</strong> GPU-wide</li>
            <li><strong>Use:</strong> Main storage, all data starts/ends here</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Speed-Capacity Trade-off</h2>
          <p className="text-slate-700 mb-4"><strong>Key Insight:</strong> Fast memory is small, slow memory is large [Dao et al., 2022, p.2].</p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-slate-50 rounded-lg">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">Memory Level</th>
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">Capacity</th>
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">Bandwidth</th>
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">Relative Speed</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-2">Registers</td>
                  <td className="px-4 py-2">~256KB</td>
                  <td className="px-4 py-2">~20 TB/s</td>
                  <td className="px-4 py-2">10-15×</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-2">SRAM</td>
                  <td className="px-4 py-2">~20MB</td>
                  <td className="px-4 py-2">~19 TB/s</td>
                  <td className="px-4 py-2">10×</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-2">L2 Cache</td>
                  <td className="px-4 py-2">~40MB</td>
                  <td className="px-4 py-2">~7 TB/s</td>
                  <td className="px-4 py-2">4×</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">HBM</td>
                  <td className="px-4 py-2">40-80GB</td>
                  <td className="px-4 py-2">~1.5-2 TB/s</td>
                  <td className="px-4 py-2">1× (baseline)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-700 mb-4"><strong>Implication:</strong> Algorithms must be designed to keep data in fast memory (SRAM) as much as possible to achieve good performance.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Memory Access Patterns</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Sequential Access</h3>
          <p className="text-slate-700 mb-4">Reading/writing consecutive memory addresses is faster due to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Coalescing:</strong> Multiple threads' accesses combined into fewer transactions</li>
            <li><strong>Prefetching:</strong> Hardware can predict and load ahead</li>
            <li><strong>Cache-friendly:</strong> Better spatial locality</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Random Access</h3>
          <p className="text-slate-700 mb-4">Reading/writing scattered addresses is slower due to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>No coalescing:</strong> Each access may be a separate transaction</li>
            <li><strong>Poor prefetching:</strong> Hardware can't predict patterns</li>
            <li><strong>Cache-unfriendly:</strong> Poor spatial locality</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Performance difference:</strong> Sequential access can be 10-100× faster than random access!</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Memory Bottleneck</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Compute vs. Memory Bound</h3>
          <p className="text-slate-700 mb-4"><strong>Compute-bound operation:</strong> Performance limited by how fast arithmetic operations can execute.</p>
          <p className="text-slate-700 mb-4"><strong>Memory-bound operation:</strong> Performance limited by how fast data can move through memory hierarchy [Dao et al., 2022, p.2].</p>
          <p className="text-slate-700 mb-4"><strong>Modern reality:</strong> Most deep learning operations are <strong>memory-bound</strong>, not compute-bound [Dao et al., 2022, p.2].</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Why Memory is the Bottleneck</h3>
          <p className="text-slate-700 mb-4">Modern GPUs have enormous computational capacity:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>A100 GPU:</strong> ~312 TFLOPS (FP16)</li>
            <li><strong>Computation time for N² operations:</strong> ~3μs for N=1024</li>
          </ul>
          <p className="text-slate-700 mb-4">But limited memory bandwidth:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>A100 HBM bandwidth:</strong> ~1.5-2.0 TB/s</li>
            <li><strong>Time to read N² values:</strong> ~500μs for N=1024</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Result:</strong> Reading data takes 100-200× longer than computing on it!</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Movement Costs</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Quantifying the Cost</h3>
          <p className="text-slate-700 mb-4">For an N×N attention matrix (N=1024, FP16 precision) [Dao et al., 2022, p.2-3]:</p>
          <p className="text-slate-700 mb-4"><strong>Storage:</strong> N² × 2 bytes = 1024² × 2 = 2MB</p>
          <p className="text-slate-700 mb-4"><strong>HBM read time:</strong> 2MB / 1.5 TB/s ≈ 1.3μs</p>
          <p className="text-slate-700 mb-4"><strong>SRAM read time:</strong> 2MB / 19 TB/s ≈ 0.1μs</p>
          <p className="text-slate-700 mb-4"><strong>Computation time (matmul):</strong> 1024² operations / 312 TFLOPS ≈ 0.003μs</p>
          <p className="text-slate-700 mb-4"><strong>Observation:</strong> HBM read takes 400× longer than the actual computation!</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The 10× Rule</h3>
          <p className="text-slate-700 mb-4"><strong>Rule of thumb:</strong> SRAM is roughly 10× faster than HBM [Dao et al., 2022, p.2].</p>
          <p className="text-slate-700 mb-4"><strong>Design implication:</strong> If an algorithm reduces HBM accesses by 10×, it can provide near 10× speedup (if memory-bound).</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Managing the Memory Hierarchy</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Programmer-Controlled: SRAM (Shared Memory)</h3>
          <p className="text-slate-700 mb-4">In CUDA/GPU programming, SRAM (shared memory) is <strong>explicitly managed</strong> by the programmer:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            __shared__ float shared_data[BLOCK_SIZE];  // Explicitly allocated SRAM
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Programmer responsibilities:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Explicitly allocate shared memory</li>
            <li>Explicitly load data from HBM to SRAM</li>
            <li>Synchronize threads accessing shared memory</li>
            <li>Explicitly write results back to HBM</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Benefit:</strong> Fine-grained control for maximum performance</p>
          <p className="text-slate-700 mb-4"><strong>Challenge:</strong> Requires careful programming to avoid errors</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Hardware-Controlled: L2 Cache</h3>
          <p className="text-slate-700 mb-4">The L2 cache is <strong>automatically managed</strong> by hardware:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>No explicit allocation needed</li>
            <li>Hardware decides what to cache</li>
            <li>Transparent to programmer</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Benefit:</strong> Easy to use, no extra code</p>
          <p className="text-slate-700 mb-4"><strong>Limitation:</strong> Less control, may not cache what you need</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Optimizing for the Memory Hierarchy</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Principle 1: Minimize HBM Accesses</h3>
          <p className="text-slate-700 mb-4"><strong>Strategy:</strong> Keep data in SRAM as long as possible [Dao et al., 2022, p.3-4].</p>
          <p className="text-slate-700 mb-4"><strong>Techniques:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Load data once, use multiple times (data reuse)</li>
            <li>Process in blocks (tiling) that fit in SRAM</li>
            <li>Fuse operations to avoid intermediate HBM writes</li>
            <li>Recompute instead of storing when beneficial</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Example:</strong> FlashAttention reduces HBM accesses from Θ(N²) to Θ(N²d²M⁻¹) by tiling [Dao et al., 2022, p.3].</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Principle 2: Maximize Data Reuse</h3>
          <p className="text-slate-700 mb-4"><strong>Strategy:</strong> Amortize the cost of loading data by doing as much work on it as possible.</p>
          <p className="text-slate-700 mb-4"><strong>Techniques:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Block/tile algorithms: load block once, use in many operations</li>
            <li>Kernel fusion: combine multiple operations on same data</li>
            <li>Loop reordering: access same data while it's still in fast memory</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Principle 3: Coalesce Memory Accesses</h3>
          <p className="text-slate-700 mb-4"><strong>Strategy:</strong> Structure memory access patterns so multiple threads read consecutive addresses.</p>
          <p className="text-slate-700 mb-4"><strong>Benefit:</strong> Hardware combines multiple accesses into one transaction.</p>
          <p className="text-slate-700 mb-4"><strong>Techniques:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Organize data in memory to match access patterns</li>
            <li>Ensure threads in a warp access consecutive addresses</li>
            <li>Avoid strided or random access patterns</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Memory Capacity Constraints</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">SRAM Size Limitations</h3>
          <p className="text-slate-700 mb-4"><strong>Problem:</strong> SRAM is small (~20MB), many algorithms need more [Dao et al., 2022, p.2].</p>
          <p className="text-slate-700 mb-4"><strong>Solution 1: Tiling</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Split computation into tiles that fit in SRAM</li>
            <li>Process one tile at a time</li>
            <li>Iterate through all tiles</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Solution 2: Recomputation</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Don't store all intermediate values</li>
            <li>Recompute them when needed</li>
            <li>Trade computation for memory</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Example:</strong> FlashAttention doesn't store the N×N attention matrix (could be &gt;1GB for N=16K). Instead, it recomputes blocks of the matrix as needed during the backward pass [Dao et al., 2022, p.5].</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">HBM Size Limitations</h3>
          <p className="text-slate-700 mb-4"><strong>Problem:</strong> HBM is large but finite (40-80GB on A100).</p>
          <p className="text-slate-700 mb-4"><strong>Solutions:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Gradient checkpointing: store only some activations, recompute others</li>
            <li>Model parallelism: split model across multiple GPUs</li>
            <li>Mixed precision: use FP16/BF16 instead of FP32</li>
            <li>Efficient attention: reduce O(N²) memory usage</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Practical Considerations</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Measuring Memory Bandwidth</h3>
          <p className="text-slate-700 mb-4">Tools to measure actual memory bandwidth:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>NVIDIA Profiler (Nsight Compute):</strong> Detailed memory metrics</li>
            <li><strong>Achieved bandwidth:</strong> Actual bandwidth utilized by kernel</li>
            <li><strong>Theoretical bandwidth:</strong> Maximum possible bandwidth</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Metric:</strong> Memory bandwidth utilization = (Achieved / Theoretical) × 100%</p>
          <p className="text-slate-700 mb-4"><strong>Goal:</strong> High-performance kernels should achieve &gt;80% of theoretical bandwidth</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Memory-Bound vs. Compute-Bound</h3>
          <p className="text-slate-700 mb-4"><strong>How to identify:</strong></p>
          <p className="text-slate-700 mb-4"><strong>Memory-bound:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Low arithmetic intensity (ops per byte &lt; 10)</li>
            <li>Low GPU utilization (&lt;50%)</li>
            <li>Memory bandwidth near maximum</li>
            <li>Doubling memory bandwidth would nearly double speed</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Compute-bound:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>High arithmetic intensity (ops per byte &gt; 100)</li>
            <li>High GPU utilization (&gt;80%)</li>
            <li>Memory bandwidth not saturated</li>
            <li>Doubling memory bandwidth wouldn't help</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Most attention operations are memory-bound</strong> [Dao et al., 2022, p.2].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Creative Analogy: The Factory Storage System</h2>
          <p className="text-slate-700 mb-4">Imagine a manufacturing facility:</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Level 1: Worker's Hands (Registers)</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Capacity:</strong> Can hold 1-2 parts</li>
            <li><strong>Access time:</strong> Instant (already in hand)</li>
            <li><strong>Use:</strong> Currently being assembled</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Level 2: Workbench (SRAM)</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Capacity:</strong> Can hold 10-20 parts and tools</li>
            <li><strong>Access time:</strong> 1 second (reach to bench)</li>
            <li><strong>Use:</strong> Parts for current assembly task</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Level 3: Tool Cart (L2 Cache)</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Capacity:</strong> Can hold 50-100 items</li>
            <li><strong>Access time:</strong> 10 seconds (walk to cart)</li>
            <li><strong>Use:</strong> Recently used tools and parts (automatic)</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Level 4: Warehouse (HBM)</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Capacity:</strong> Thousands of items</li>
            <li><strong>Access time:</strong> 5 minutes (walk to warehouse, find item, return)</li>
            <li><strong>Use:</strong> All inventory</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Inefficient process:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Walk to warehouse, get part A (5 min)</li>
            <li>Walk back, attach to product (10 sec)</li>
            <li>Walk to warehouse, get part B (5 min)</li>
            <li>Walk back, attach to product (10 sec)</li>
            <li>Total: 10 minutes of walking, 20 seconds of work!</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Efficient process:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Walk to warehouse once, get all parts for next hour (5 min)</li>
            <li>Place on workbench (10 sec)</li>
            <li>Assemble from workbench for 1 hour (work continuously)</li>
            <li>Return finished products to warehouse (5 min)</li>
            <li>Total: 10 minutes of walking, 60 minutes of work!</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Key insight:</strong> Minimize trips to the warehouse (HBM), keep everything you need on the workbench (SRAM).</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact on Algorithm Design</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Traditional Algorithm Analysis</h3>
          <p className="text-slate-700 mb-4"><strong>Focus:</strong> Count number of operations (adds, multiplies)</p>
          <p className="text-slate-700 mb-4"><strong>Assumption:</strong> All operations cost the same</p>
          <p className="text-slate-700 mb-4"><strong>Metric:</strong> Big-O computational complexity (e.g., O(N²))</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Modern Algorithm Analysis (IO-Aware)</h3>
          <p className="text-slate-700 mb-4"><strong>Focus:</strong> Count number of memory accesses between slow (HBM) and fast (SRAM) memory [Dao et al., 2022, p.3]</p>
          <p className="text-slate-700 mb-4"><strong>Assumption:</strong> Memory access dominates cost</p>
          <p className="text-slate-700 mb-4"><strong>Metric:</strong> IO complexity (e.g., Θ(N²) HBM accesses)</p>
          <p className="text-slate-700 mb-4"><strong>Example:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Standard attention: O(N²d) operations, Θ(Nd + N²) HBM accesses</li>
            <li>FlashAttention: Same O(N²d) operations, Θ(N²d²M⁻¹) HBM accesses</li>
            <li><strong>Speedup:</strong> Comes from reducing HBM accesses, not reducing operations!</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Real-World Performance Impact</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">FlashAttention Example</h3>
          <p className="text-slate-700 mb-4">On A100 GPU with sequence length N=1024 [Dao et al., 2022, p.8]:</p>
          <p className="text-slate-700 mb-4"><strong>Standard attention:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>HBM accesses: ~2MB (attention matrix)</li>
            <li>HBM bandwidth: ~1.5 TB/s</li>
            <li>Memory access time: ~1.3ms</li>
            <li>Compute time: ~0.01ms</li>
            <li><strong>Total time:</strong> ~1.3ms (99% memory, 1% compute)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>FlashAttention:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>HBM accesses: ~0.5MB (inputs/outputs only, no attention matrix)</li>
            <li>Memory access time: ~0.3ms</li>
            <li>Compute time: ~0.01ms (same)</li>
            <li><strong>Total time:</strong> ~0.3ms (97% memory, 3% compute)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Speedup:</strong> 1.3ms / 0.3ms ≈ <strong>4× faster</strong>, purely from reducing memory accesses!</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Scaling to Long Sequences</h3>
          <p className="text-slate-700 mb-4">For N=16K (long context) [Dao et al., 2022, p.12]:</p>
          <p className="text-slate-700 mb-4"><strong>Standard attention:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Attention matrix: 16K × 16K × 2 bytes = 512MB</li>
            <li>Doesn't fit in HBM efficiently (with other activations)</li>
            <li><strong>Result:</strong> Out of memory or extremely slow</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>FlashAttention:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Never materializes full attention matrix</li>
            <li>HBM usage: ~32MB (just inputs/outputs)</li>
            <li><strong>Result:</strong> Feasible, 2-4× faster than approximate methods</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Emerging Trends</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Larger SRAM</h3>
          <p className="text-slate-700 mb-4">Newer GPUs are increasing on-chip memory:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>A100:</strong> ~20MB SRAM</li>
            <li><strong>H100:</strong> ~50MB SRAM</li>
            <li><strong>Trend:</strong> More SRAM enables larger tiles, fewer HBM accesses</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Memory-Compute Co-Design</h3>
          <p className="text-slate-700 mb-4">Future architectures may bring compute closer to memory:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Processing-in-memory (PIM)</li>
            <li>Near-data processing</li>
            <li>Reduces data movement costs fundamentally</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>[IO-Aware Algorithms](/wiki/io-aware-algorithms)</li>
            <li>[Tiling Techniques](/wiki/tiling-techniques)</li>
            <li>[Kernel Fusion](/wiki/kernel-fusion)</li>
            <li>[Attention Mechanism](/wiki/attention-mechanism)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">References</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Dao, T., Fu, D. Y., Ermon, S., Rudra, A., &amp; Ré, C. (2022). FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness. In Advances in Neural Information Processing Systems (NeurIPS 2022).</li>
            <li>NVIDIA Corporation. (2020). NVIDIA A100 Tensor Core GPU Architecture. Technical Whitepaper.</li>
            <li>Jia, Z., Maggioni, M., Staiger, B., &amp; Scarpazza, D. P. (2018). Dissecting the NVIDIA Volta GPU Architecture via Microbenchmarking. arXiv preprint arXiv:1804.06826.</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
