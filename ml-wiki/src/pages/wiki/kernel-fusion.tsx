import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function KernelFusion() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "Kernel Fusion",
  description: "GPU optimization technique that combines multiple operations into a single kernel to eliminate intermediate memory writes and reads, dramatically improving performance for memory-bound operations",
  category: "Optimization & Efficiency",
  tags: ["gpu-optimization", "performance", "memory", "cuda"],
  citations: [
    {
      paper: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
      authors: "Dao, T., Fu, D. Y., Ermon, S., Rudra, A., & Ré, C.",
      year: "2022",
      pages: "4"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4"><strong>Kernel Fusion</strong> is a GPU optimization technique that combines multiple operations into a single GPU kernel, eliminating the need to write intermediate results to global memory (HBM) and read them back. This dramatically reduces memory traffic and improves performance for memory-bound operations [Dao et al., 2022, p.4].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Problem: Kernel Boundaries and Memory Traffic</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Separate Kernels</h3>
          <p className="text-slate-700 mb-4">In standard GPU programming, each operation launches a separate kernel:</p>
          <p className="text-slate-700 mb-4"><strong>Example: Computing attention</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            # Kernel 1: Matrix multiplication
            S = torch.matmul(Q, K.transpose(-2, -1))  # Write S to HBM
            
            # Kernel 2: Softmax
            P = torch.softmax(S, dim=-1)  # Read S from HBM, write P to HBM
            
            # Kernel 3: Matrix multiplication
            O = torch.matmul(P, V)  # Read P from HBM, write O to HBM
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Memory traffic:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Kernel 1: Read Q, K (2Nd), write S (N²)</li>
            <li>Kernel 2: Read S (N²), write P (N²)</li>
            <li>Kernel 3: Read P (N²), V (Nd), write O (Nd)</li>
            <li><strong>Total:</strong> 3Nd + 4N² memory accesses [Dao et al., 2022, p.3]</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Problem:</strong> For N=1024, d=64, the intermediate matrices S and P require multiple GB of memory traffic!</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Why Separate Kernels?</h3>
          <p className="text-slate-700 mb-4"><strong>Question:</strong> Why not fuse by default?</p>
          <p className="text-slate-700 mb-4"><strong>Reasons:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Simplicity:</strong> Each operation is independent, easier to implement</li>
            <li><strong>Modularity:</strong> Reusable kernels for different operations</li>
            <li><strong>Framework design:</strong> Deep learning frameworks (PyTorch, TensorFlow) historically operated at this granularity</li>
            <li><strong>Automatic differentiation:</strong> Easier to track gradients with discrete operations</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Cost:</strong> Significant performance loss from memory traffic</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Solution: Fused Kernels</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Combining Operations</h3>
          <p className="text-slate-700 mb-4"><strong>Kernel fusion</strong> combines multiple operations into one kernel that:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Reads inputs once from global memory</li>
            <li>Performs all intermediate computations in fast memory (SRAM/registers)</li>
            <li>Writes only final output to global memory</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Fused attention kernel:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            __global__ void fused_attention_kernel(Q, K, V, O) &#123;
                // Load Q, K, V tiles to shared memory (SRAM)
                __shared__ float tile_Q[...], tile_K[...], tile_V[...];
            
                // Compute S = QK^T in shared memory
                float S_local[...];
                matmul_shared(tile_Q, tile_K, S_local);
            
                // Compute P = softmax(S) in shared memory/registers
                float P_local[...];
                softmax_local(S_local, P_local);
            
                // Compute O = PV in shared memory
                float O_local[...];
                matmul_local(P_local, tile_V, O_local);
            
                // Write O to global memory
                store_global(O_local, O);
            &#125;
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Memory traffic:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Read Q, K, V (3Nd)</li>
            <li>Write O (Nd)</li>
            <li><strong>Total:</strong> 4Nd memory accesses [Dao et al., 2022, p.4]</li>
            <li><strong>Speedup:</strong> (3Nd + 4N²) / 4Nd ≈ N²/Nd = N/d ≈ 16× for N=1024, d=64!</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">FlashAttention's Kernel Fusion</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Fused Operations</h3>
          <p className="text-slate-700 mb-4">FlashAttention fuses the entire attention computation [Dao et al., 2022, p.4]:</p>
          <p className="text-slate-700 mb-4"><strong>Fused operations within each tile:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Matrix multiply: S_ij = Q_i K_j^T</li>
            <li>Softmax: P_ij = softmax(S_ij)</li>
            <li>Matrix multiply: O_i += P_ij V_j</li>
            <li>Normalization: Update running softmax statistics (m, ℓ)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Key benefit:</strong> The N×N matrices S and P never touch global memory—they exist only in SRAM/registers [Dao et al., 2022, p.4].</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Implementation Strategy</h3>
          <p className="text-slate-700 mb-4"><strong>Challenges:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Softmax normalization:</strong> Requires seeing all values (solved by online softmax)</li>
            <li><strong>Memory capacity:</strong> Must fit tiles in SRAM (solved by tiling)</li>
            <li><strong>Backward pass:</strong> Must recompute attention matrix (solved by selective recomputation)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Result:</strong> Exact attention with minimal memory traffic [Dao et al., 2022, p.5].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Benefits of Kernel Fusion</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">1. Reduced Memory Traffic</h3>
          <p className="text-slate-700 mb-4"><strong>Primary benefit:</strong> Eliminate reads/writes of intermediate results.</p>
          <p className="text-slate-700 mb-4"><strong>Impact:</strong> For memory-bound operations (most deep learning), this directly translates to speedup.</p>
          <p className="text-slate-700 mb-4"><strong>Example:</strong> FlashAttention achieves 3-4× speedup primarily from kernel fusion [Dao et al., 2022, p.8].</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. Improved Memory Bandwidth Utilization</h3>
          <p className="text-slate-700 mb-4"><strong>Effect:</strong> More effective use of available memory bandwidth.</p>
          <p className="text-slate-700 mb-4"><strong>Reason:</strong> Fewer, larger memory transactions are more efficient than many small ones.</p>
          <p className="text-slate-700 mb-4"><strong>Measurement:</strong> Kernel fusion can increase memory bandwidth utilization from 40% to 80%+.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Reduced Kernel Launch Overhead</h3>
          <p className="text-slate-700 mb-4"><strong>Overhead:</strong> Each kernel launch has fixed cost (~1-10μs).</p>
          <p className="text-slate-700 mb-4"><strong>Benefit:</strong> Fusing 3 kernels → save 2 kernel launches.</p>
          <p className="text-slate-700 mb-4"><strong>Impact:</strong> Significant for small operations, less important for large ones.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">4. Enabling Other Optimizations</h3>
          <p className="text-slate-700 mb-4"><strong>Synergy with tiling:</strong> Fusion allows processing tiles completely in SRAM.</p>
          <p className="text-slate-700 mb-4"><strong>Synergy with recomputation:</strong> Can recompute fused operations efficiently.</p>
          <p className="text-slate-700 mb-4"><strong>Synergy with mixed precision:</strong> Can use different precisions for different operations within kernel.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">When to Apply Kernel Fusion</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">High-Impact Scenarios</h3>
          <p className="text-slate-700 mb-4"><strong>1. Memory-bound pipelines</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Operations where memory access &amp;gt;&amp;gt; computation</li>
            <li>Multiple operations with large intermediate results</li>
            <li>Example: Attention (matmul → softmax → matmul)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>2. Small operations</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Operations where kernel launch overhead is significant</li>
            <li>Many tiny kernels in sequence</li>
            <li>Example: Element-wise operations, activations</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>3. Data-dependent patterns</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Operations that must process data in specific order</li>
            <li>Cannot be easily parallelized across kernels</li>
            <li>Example: Softmax, layer normalization</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Low-Impact Scenarios</h3>
          <p className="text-slate-700 mb-4"><strong>1. Compute-bound operations</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Operations where computation &amp;gt;&amp;gt; memory access</li>
            <li>Fusion doesn't reduce the bottleneck</li>
            <li>Example: Large matrix multiplications on modern hardware</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>2. Irregular patterns</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Operations with unpredictable control flow</li>
            <li>Hard to fuse efficiently</li>
            <li>Example: Sparse operations with dynamic sparsity</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>3. Limited SRAM</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Fused operations too large to fit in SRAM</li>
            <li>Must split anyway, reducing fusion benefits</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Trade-offs and Challenges</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Code Complexity</h3>
          <p className="text-slate-700 mb-4"><strong>Separate kernels:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Simple, modular code</li>
            <li>Easy to understand and maintain</li>
            <li>Framework-friendly (PyTorch, TensorFlow)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Fused kernels:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Complex, monolithic code</li>
            <li>Harder to debug and modify</li>
            <li>Requires custom CUDA/Triton kernels</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Decision:</strong> Fuse when performance gain justifies complexity.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Compilation and Tuning</h3>
          <p className="text-slate-700 mb-4"><strong>Challenge:</strong> Fused kernels often require problem-specific tuning.</p>
          <p className="text-slate-700 mb-4"><strong>Factors to tune:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Block sizes</li>
            <li>Thread counts</li>
            <li>Shared memory allocation</li>
            <li>Register usage</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Effort:</strong> Significant engineering time for optimal performance.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Portability</h3>
          <p className="text-slate-700 mb-4"><strong>Separate kernels:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Hardware-agnostic</li>
            <li>Run on CPU, GPU, TPU with minimal changes</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Fused kernels:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Hardware-specific optimizations</li>
            <li>May need different implementations for different GPUs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Implementation Approaches</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Manual Fusion (CUDA)</h3>
          <p className="text-slate-700 mb-4"><strong>Approach:</strong> Write custom CUDA kernels with fused operations.</p>
          <p className="text-slate-700 mb-4"><strong>Pros:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Maximum control and performance</li>
            <li>Can optimize for specific hardware</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Cons:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>High development cost</li>
            <li>Requires CUDA expertise</li>
            <li>Maintenance burden</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Example:</strong> FlashAttention's CUDA implementation [Dao et al., 2022, p.7].</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Compiler-Based Fusion (XLA, TorchScript)</h3>
          <p className="text-slate-700 mb-4"><strong>Approach:</strong> Let compiler automatically fuse operations.</p>
          <p className="text-slate-700 mb-4"><strong>Pros:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Automatic, no manual effort</li>
            <li>Works with existing code</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Cons:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Limited fusion opportunities</li>
            <li>Less control over optimization</li>
            <li>May not achieve optimal performance</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Example:</strong> TensorFlow's XLA compiler, PyTorch's TorchScript.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">DSL-Based Fusion (Triton, Halide)</h3>
          <p className="text-slate-700 mb-4"><strong>Approach:</strong> Use domain-specific language for kernel description.</p>
          <p className="text-slate-700 mb-4"><strong>Pros:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Easier than raw CUDA</li>
            <li>Good performance</li>
            <li>More portable</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Cons:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Still requires kernel programming</li>
            <li>Limited to supported operations</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Example:</strong> FlashAttention also has Triton implementation [Dao et al., 2022, p.7].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Creative Analogy: The Assembly Line</h2>
          <p className="text-slate-700 mb-4">Imagine manufacturing a product with three steps: cut, paint, dry.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Unfused Approach (Separate Kernels)</h3>
          <p className="text-slate-700 mb-4"><strong>Setup:</strong> Three separate stations (cut station, paint station, dry station).</p>
          <p className="text-slate-700 mb-4"><strong>Process:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Cut all pieces at cut station → store in warehouse</li>
            <li>Retrieve all pieces from warehouse → move to paint station</li>
            <li>Paint all pieces at paint station → store in warehouse</li>
            <li>Retrieve all pieces from warehouse → move to dry station</li>
            <li>Dry all pieces at dry station → store finished products</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Problems:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Constant trips to/from warehouse (memory traffic)</li>
            <li>Pieces sit idle between stations</li>
            <li>Workers wait for pieces to arrive</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Time:</strong> 1 hour cutting + 30 min warehouse + 1 hour painting + 30 min warehouse + 1 hour drying = 4 hours</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Fused Approach (Kernel Fusion)</h3>
          <p className="text-slate-700 mb-4"><strong>Setup:</strong> Integrated assembly line where all stations are adjacent.</p>
          <p className="text-slate-700 mb-4"><strong>Process:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Cut piece → immediately pass to painter (no warehouse)</li>
            <li>Paint piece → immediately pass to dryer (no warehouse)</li>
            <li>Dry piece → store finished product</li>
            <li>Repeat continuously</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>No warehouse trips (no intermediate memory accesses)</li>
            <li>Pieces flow smoothly through pipeline</li>
            <li>Workers always productive</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Time:</strong> 1 hour (throughput limited by slowest station, no warehouse overhead)</p>
          <p className="text-slate-700 mb-4"><strong>Key insight:</strong> By fusing operations into one continuous process, we eliminate the expensive warehouse (global memory) trips.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Practical Examples</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Element-wise Operations</h3>
          <p className="text-slate-700 mb-4"><strong>Unfused:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            x = input + bias          # Kernel 1: write x to HBM
            y = activation(x)          # Kernel 2: read x, write y to HBM
            z = dropout(y)             # Kernel 3: read y, write z to HBM
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Fused:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            z = fused_add_act_dropout(input, bias)  # One kernel, no intermediate writes
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Speedup:</strong> 3-5× (dominated by memory access elimination)</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Layer Normalization</h3>
          <p className="text-slate-700 mb-4"><strong>Unfused:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            mean = x.mean(dim=-1)              # Kernel 1
            var = x.var(dim=-1)                # Kernel 2 (or combined with mean)
            normalized = (x - mean) / sqrt(var + eps)  # Kernel 3
            scaled = normalized * gamma + beta  # Kernel 4
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Fused:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            scaled = fused_layer_norm(x, gamma, beta)  # One kernel
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Speedup:</strong> 2-3× (reduced memory accesses)</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Attention (FlashAttention)</h3>
          <p className="text-slate-700 mb-4"><strong>Unfused:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            S = Q @ K.T       # Kernel 1: write N²
            P = softmax(S)    # Kernel 2: read/write N²
            O = P @ V         # Kernel 3: read N²
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Fused (with tiling):</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            O = fused_attention(Q, K, V)  # One kernel, no N² writes
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Speedup:</strong> 3-4× for typical sequence lengths [Dao et al., 2022, p.8]</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Measuring Fusion Effectiveness</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Memory Traffic Reduction</h3>
          <p className="text-slate-700 mb-4"><strong>Metric:</strong> Compare HBM reads/writes before and after fusion.</p>
          <p className="text-slate-700 mb-4"><strong>Tool:</strong> NVIDIA Nsight Compute profiler.</p>
          <p className="text-slate-700 mb-4"><strong>Target:</strong> Reduce HBM traffic proportional to eliminated intermediate results.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Bandwidth Utilization</h3>
          <p className="text-slate-700 mb-4"><strong>Metric:</strong> Achieved memory bandwidth / theoretical bandwidth.</p>
          <p className="text-slate-700 mb-4"><strong>Before fusion:</strong> Often 20-40% (many small transfers)</p>
          <p className="text-slate-700 mb-4"><strong>After fusion:</strong> Should be 60-80%+ (fewer, larger transfers)</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Speedup</h3>
          <p className="text-slate-700 mb-4"><strong>Metric:</strong> Wall-clock time before / after fusion.</p>
          <p className="text-slate-700 mb-4"><strong>Expected:</strong> For memory-bound operations, speedup ≈ memory traffic reduction.</p>
          <p className="text-slate-700 mb-4"><strong>Example:</strong> FlashAttention: 3-4× speedup from 3-4× memory traffic reduction [Dao et al., 2022, p.8].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>[IO-Aware Algorithms](/wiki/io-aware-algorithms)</li>
            <li>[GPU Memory Hierarchy](/wiki/gpu-memory-hierarchy)</li>
            <li>[Tiling Techniques](/wiki/tiling-techniques)</li>
            <li>[Attention Mechanism](/wiki/attention-mechanism)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">References</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Dao, T., Fu, D. Y., Ermon, S., Rudra, A., &amp; Ré, C. (2022). FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness. In Advances in Neural Information Processing Systems (NeurIPS 2022).</li>
            <li>Chen, T., et al. (2018). TVM: An Automated End-to-End Optimizing Compiler for Deep Learning. In OSDI 2018.</li>
            <li>Ragan-Kelley, J., et al. (2013). Halide: A Language and Compiler for Optimizing Parallelism, Locality, and Recomputation in Image Processing Pipelines. In PLDI 2013.</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
