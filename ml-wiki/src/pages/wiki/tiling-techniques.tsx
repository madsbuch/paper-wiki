import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function TilingTechniques() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "Tiling Techniques",
  description: "Algorithm optimization strategy that divides large computations into smaller blocks (tiles) that fit in fast memory, enabling efficient processing of problems larger than available cache",
  category: "Optimization & Efficiency",
  tags: ["algorithm-optimization", "memory", "blocking", "cache-optimization"],
  citations: [
    {
      paper: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
      authors: "Dao, T., Fu, D. Y., Ermon, S., Rudra, A., & Ré, C.",
      year: "2022",
      pages: "4-5"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4"><strong>Tiling</strong> (also called <strong>blocking</strong>) is an optimization technique that divides a large computation into smaller sub-problems called tiles or blocks, where each tile fits entirely in fast memory (e.g., GPU SRAM or CPU cache). By processing one tile at a time and maximizing data reuse within each tile, tiling dramatically reduces expensive accesses to slow memory [Dao et al., 2022, p.4].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Core Idea</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Problem: Data Doesn't Fit in Fast Memory</h3>
          <p className="text-slate-700 mb-4"><strong>Scenario:</strong> You need to process a large dataset or matrix, but:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Fast memory (SRAM/cache) is small (~20MB on A100 GPU)</li>
            <li>Your data is large (&amp;gt;100MB, 1GB, or more)</li>
            <li>Processing requires random access to data (can't just stream through)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Example:</strong> Computing attention for sequence length N=4096:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Attention matrix: 4096 × 4096 × 2 bytes = 32MB</li>
            <li>GPU SRAM: ~20MB</li>
            <li><strong>Problem:</strong> Doesn't fit!</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Solution: Divide and Conquer</h3>
          <p className="text-slate-700 mb-4">Instead of processing the entire problem at once, <strong>break it into tiles</strong> [Dao et al., 2022, p.4]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Divide:</strong> Split the data into smaller blocks (tiles)</li>
            <li><strong>Fit:</strong> Each tile fits in fast memory</li>
            <li><strong>Process:</strong> Load one tile into fast memory, compute, store results</li>
            <li><strong>Iterate:</strong> Repeat for all tiles</li>
            <li><strong>Combine:</strong> Assemble final result from tile results</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Key benefit:</strong> Each tile stays in fast memory throughout its processing, minimizing slow memory accesses.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Tiling in FlashAttention</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Standard Attention Problem</h3>
          <p className="text-slate-700 mb-4">Standard attention computes [Dao et al., 2022, p.3]:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            S = QK^T     # N×N matrix
            P = softmax(S)
            O = PV
          </code></pre>
          <p className="text-slate-700 mb-4">For N=4096, sequence length:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Q, K, V: 4096 × 64 = 0.5MB each (manageable)</li>
            <li>S, P: 4096 × 4096 = 32MB each (doesn't fit in SRAM)</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Tiling Strategy</h3>
          <p className="text-slate-700 mb-4">FlashAttention tiles Q, K, V into blocks [Dao et al., 2022, p.4-5]:</p>
          <p className="text-slate-700 mb-4"><strong>Block sizes:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>B_c = ⌈M/(4d)⌉ (columns, K/V blocks)</li>
            <li>B_r = min(⌈M/(4d)⌉, d) (rows, Q blocks)</li>
            <li>M = SRAM size</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Example:</strong> With M=20MB, d=64:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>B_c = ⌈20MB/(4×64×2bytes)⌉ = 40,960</li>
            <li>B_r = min(40,960, 64) = 64</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Tiling pattern:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Split Q into T_r = ⌈N/B_r⌉ row blocks</li>
            <li>Split K, V into T_c = ⌈N/B_c⌉ column blocks</li>
            <li>Process Q_i with all K_j, V_j blocks</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Algorithm Flow</h3>
          <p className="text-slate-700 mb-4">For each block K_j, V_j (outer loop) [Dao et al., 2022, p.5]:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Load K_j, V_j from HBM to SRAM (size B_c × d)</li>
            <li>For each block Q_i (inner loop):</li>
            <li>Load Q_i from HBM to SRAM (size B_r × d)</li>
            <li><strong>Compute S_ij = Q_i K_j^T in SRAM</strong> (size B_r × B_c)</li>
            <li><strong>Compute softmax block and accumulate output in SRAM</strong></li>
            <li>Update output O_i in HBM</li>
            <li>Move to next K_j, V_j block</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Key insight:</strong> The full N×N attention matrix S never exists in memory—only one B_r × B_c tile at a time [Dao et al., 2022, p.4].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Tile Size Selection</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Trade-off</h3>
          <p className="text-slate-700 mb-4"><strong>Larger tiles:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>✓ Fewer tiles total → fewer memory reads of Q, K, V</li>
            <li>✓ More computation per tile → better amortization</li>
            <li>✗ May not fit in SRAM</li>
            <li>✗ More computation before results are written</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Smaller tiles:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>✓ Always fit in SRAM</li>
            <li>✓ Faster individual tile processing</li>
            <li>✗ More tiles → more overhead</li>
            <li>✗ More passes over data</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Optimal Tile Size</h3>
          <p className="text-slate-700 mb-4"><strong>Goal:</strong> Maximize tile size while fitting in SRAM [Dao et al., 2022, p.4].</p>
          <p className="text-slate-700 mb-4"><strong>Constraint:</strong> For FlashAttention, all of these must fit in SRAM simultaneously:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Q block: B_r × d</li>
            <li>K block: B_c × d</li>
            <li>V block: B_c × d</li>
            <li>S block: B_r × B_c</li>
            <li>Intermediate values (m, ℓ for softmax): B_r</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Total SRAM usage:</strong> ~2B_r d + 2B_c d + B_r B_c + B_r</p>
          <p className="text-slate-700 mb-4"><strong>Choice:</strong> Set B_c = B_r to balance memory usage, then maximize to fill SRAM [Dao et al., 2022, p.4].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Incremental Computation: Online Softmax</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Softmax Challenge</h3>
          <p className="text-slate-700 mb-4"><strong>Problem:</strong> Softmax requires seeing all values before normalizing:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            softmax(x)_i = exp(x_i) / Σ_j exp(x_j)
          </code></pre>
          <p className="text-slate-700 mb-4">With tiling, we only see one block of values at a time!</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Solution: Online Softmax</h3>
          <p className="text-slate-700 mb-4">FlashAttention uses <strong>online softmax</strong> to compute softmax incrementally across blocks [Dao et al., 2022, p.4]:</p>
          <p className="text-slate-700 mb-4"><strong>Key idea:</strong> Maintain running statistics that can be updated as new blocks arrive:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>m:</strong> Maximum value seen so far (for numerical stability)</li>
            <li><strong>ℓ:</strong> Sum of exponentials (softmax denominator)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Update rule:</strong> When seeing new block with max m̃, sum ℓ̃:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            m_new = max(m_old, m̃)
            ℓ_new = exp(m_old - m_new) × ℓ_old + exp(m̃ - m_new) × ℓ̃
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Output update:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            O_new = [exp(m_old - m_new) × ℓ_old × O_old + exp(m̃ - m_new) × P̃ V] / ℓ_new
          </code></pre>
          <p className="text-slate-700 mb-4">where P̃ = exp(S̃ - m̃).</p>
          <p className="text-slate-700 mb-4"><strong>Result:</strong> Can compute softmax(S) block-by-block without materializing full S [Dao et al., 2022, p.4].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">General Tiling Principles</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">1. Identify Data Reuse</h3>
          <p className="text-slate-700 mb-4"><strong>Question:</strong> What data is accessed multiple times?</p>
          <p className="text-slate-700 mb-4"><strong>Strategy:</strong> Keep that data in fast memory (the tile) while it's being reused.</p>
          <p className="text-slate-700 mb-4"><strong>Example in matrix multiplication C = AB:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Each element A[i,k] is reused N times (for all columns of B)</li>
            <li>Each element B[k,j] is reused N times (for all rows of A)</li>
            <li><strong>Tiling opportunity:</strong> Load tile of A and tile of B, compute all interactions</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. Choose Tile Dimensions</h3>
          <p className="text-slate-700 mb-4"><strong>Factors to consider:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Memory capacity:</strong> Tiles must fit in SRAM</li>
            <li><strong>Data reuse:</strong> Larger tiles → more reuse per load</li>
            <li><strong>Parallelism:</strong> Tiles should enable concurrent processing</li>
            <li><strong>Memory alignment:</strong> Respect hardware memory access patterns</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Common patterns:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Square tiles:</strong> Balanced dimensions (e.g., 64×64)</li>
            <li><strong>Rectangular tiles:</strong> When one dimension has more reuse</li>
            <li><strong>1D tiles:</strong> When processing is row-wise or column-wise</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Minimize Tile Overhead</h3>
          <p className="text-slate-700 mb-4"><strong>Overhead sources:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Loading tiles from slow memory</li>
            <li>Storing tile results back to slow memory</li>
            <li>Setup/teardown for each tile</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Mitigation strategies:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Maximize tile size (fill SRAM)</li>
            <li>Process multiple tiles before writing results</li>
            <li>Prefetch next tile while processing current one</li>
            <li>Fuse operations to avoid intermediate stores</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Creative Analogy: Reading a Large Book</h2>
          <p className="text-slate-700 mb-4">Imagine you need to summarize a 1,000-page book, but you can only focus on 10 pages at once (your "working memory" or fast memory).</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Naive Approach (No Tiling)</h3>
          <p className="text-slate-700 mb-4"><strong>Strategy:</strong> Try to keep the entire book in your mind at once.</p>
          <p className="text-slate-700 mb-4"><strong>Problem:</strong> Impossible! You keep forgetting earlier sections, constantly flipping back, losing your place.</p>
          <p className="text-slate-700 mb-4"><strong>Result:</strong> Takes forever, extremely inefficient.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Tiling Approach</h3>
          <p className="text-slate-700 mb-4"><strong>Strategy:</strong> Break the book into 10-page chapters (tiles).</p>
          <p className="text-slate-700 mb-4"><strong>Process:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Read chapter 1 (10 pages) carefully, take notes</li>
            <li>Summarize chapter 1 based on notes</li>
            <li>Set chapter 1 aside</li>
            <li>Read chapter 2 (10 pages) carefully, take notes</li>
            <li>Summarize chapter 2, relate to chapter 1 summary</li>
            <li>Continue for all chapters</li>
            <li>Combine chapter summaries into final book summary</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Each chapter fits in your working memory</li>
            <li>You fully understand each chapter before moving on</li>
            <li>Notes allow you to combine information later</li>
            <li>Much faster and more accurate than constant page-flipping</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Key insight:</strong> By working on manageable chunks (tiles) that fit in fast memory (working memory), you process the large problem (book) efficiently.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Tiling Patterns</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Outer Product Tiling</h3>
          <p className="text-slate-700 mb-4"><strong>Use case:</strong> Matrix multiplication C = AB</p>
          <p className="text-slate-700 mb-4"><strong>Pattern:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Outer loop: tiles of C (output)</li>
            <li>Inner loop: tiles of A and B that contribute to each C tile</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Data flow:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Load tile of A (rows)</li>
            <li>Load tile of B (columns)</li>
            <li>Compute partial result for C tile</li>
            <li>Accumulate to C</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Inner Product Tiling</h3>
          <p className="text-slate-700 mb-4"><strong>Use case:</strong> Dot products, attention</p>
          <p className="text-slate-700 mb-4"><strong>Pattern:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Outer loop: output elements</li>
            <li>Inner loop: tiles of input vectors</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Data flow:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>For each output element:</li>
            <li>Load tiles of input vectors</li>
            <li>Compute partial dot product</li>
            <li>Accumulate result</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Block-Recursive Tiling</h3>
          <p className="text-slate-700 mb-4"><strong>Use case:</strong> Hierarchical structures (e.g., hierarchical attention)</p>
          <p className="text-slate-700 mb-4"><strong>Pattern:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Recursively divide problem into quarters/halves</li>
            <li>Process at multiple granularities</li>
            <li>Combine results up the hierarchy</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Tiling for Different Operations</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Matrix Multiplication</h3>
          <p className="text-slate-700 mb-4"><strong>Standard tiling:</strong> Divide A, B, C into tiles, compute C_tile = Σ A_tile × B_tile</p>
          <p className="text-slate-700 mb-4"><strong>IO complexity:</strong> Θ(n³/√M) with optimal tiling vs. Θ(n³) without</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Attention (FlashAttention)</h3>
          <p className="text-slate-700 mb-4"><strong>Tiling strategy:</strong> Outer loop over K/V tiles, inner loop over Q tiles [Dao et al., 2022, p.5]</p>
          <p className="text-slate-700 mb-4"><strong>IO complexity:</strong> Θ(N²d²M⁻¹) with tiling vs. Θ(N²) without [Dao et al., 2022, p.3]</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Convolution</h3>
          <p className="text-slate-700 mb-4"><strong>Tiling strategy:</strong> Tile input and kernel, compute output tile from overlapping input tiles</p>
          <p className="text-slate-700 mb-4"><strong>Benefit:</strong> Reuse input values for multiple output locations</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Sorting</h3>
          <p className="text-slate-700 mb-4"><strong>Tiling strategy:</strong> Divide array into tiles, sort each tile, merge sorted tiles</p>
          <p className="text-slate-700 mb-4"><strong>IO complexity:</strong> Θ(N/B log<sub>M/B</sub>(N/B)) with optimal tiling</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Combining Tiling with Other Techniques</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Tiling + Kernel Fusion</h3>
          <p className="text-slate-700 mb-4"><strong>Technique:</strong> Fuse multiple operations within each tile [Dao et al., 2022, p.4].</p>
          <p className="text-slate-700 mb-4"><strong>Example in FlashAttention:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Within each tile: matmul + softmax + matmul</li>
            <li>All intermediate values stay in SRAM</li>
            <li>Only final output written to HBM</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Benefit:</strong> Reduces memory accesses even further</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Tiling + Recomputation</h3>
          <p className="text-slate-700 mb-4"><strong>Technique:</strong> Don't store intermediate tiles, recompute them when needed [Dao et al., 2022, p.5].</p>
          <p className="text-slate-700 mb-4"><strong>Trade-off:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Saves memory: no need to store all intermediate tiles</li>
            <li>Costs computation: must recompute tiles</li>
            <li><strong>When beneficial:</strong> If computation is cheap but storage is expensive</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Example in FlashAttention backward pass:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Don't store full attention matrix S (would require Θ(N²) memory)</li>
            <li>Recompute tiles of S as needed using saved Q, K (requires Θ(Nd) memory)</li>
            <li>Net savings: Θ(N²) → Θ(Nd) memory usage</li>
          </ul>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Tiling + Prefetching</h3>
          <p className="text-slate-700 mb-4"><strong>Technique:</strong> Load next tile into SRAM while processing current tile.</p>
          <p className="text-slate-700 mb-4"><strong>Benefit:</strong> Overlaps memory transfer with computation, hiding latency.</p>
          <p className="text-slate-700 mb-4"><strong>Requirement:</strong> Sufficient SRAM to hold both current and next tile.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Performance Analysis</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Memory Access Reduction</h3>
          <p className="text-slate-700 mb-4"><strong>Standard attention (no tiling):</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Materialize S: write N² values to HBM</li>
            <li>Read S for softmax: read N² values from HBM</li>
            <li>Materialize P: write N² values to HBM</li>
            <li>Read P for output: read N² values from HBM</li>
            <li><strong>Total:</strong> 4N² HBM accesses</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>FlashAttention (with tiling):</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Load Q, K, V: read 3Nd values from HBM</li>
            <li>Load Q, K, V tiles multiple times: read T_c × T_r tiles</li>
            <li>Write O: write Nd values to HBM</li>
            <li><strong>Total:</strong> Θ(N²d²M⁻¹) HBM accesses [Dao et al., 2022, p.3]</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Speedup:</strong> For d=64, M=20MB, N=1024: ~10× fewer HBM accesses</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Computational Overhead</h3>
          <p className="text-slate-700 mb-4"><strong>Question:</strong> Does tiling add extra computation?</p>
          <p className="text-slate-700 mb-4"><strong>Answer:</strong> No! Same number of arithmetic operations, just reordered.</p>
          <p className="text-slate-700 mb-4"><strong>Key insight:</strong> Tiling changes <strong>memory access patterns</strong>, not the <strong>computation</strong> [Dao et al., 2022, p.4].</p>
          <p className="text-slate-700 mb-4"><strong>Benefit:</strong> All speedup comes from reduced memory access, with no computational trade-off.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Implementation Considerations</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">CUDA Implementation</h3>
          <p className="text-slate-700 mb-4"><strong>Shared memory allocation:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            __shared__ float tile_Q[BLOCK_SIZE][HEAD_DIM];
            __shared__ float tile_K[BLOCK_SIZE][HEAD_DIM];
            __shared__ float tile_S[BLOCK_SIZE][BLOCK_SIZE];
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Loading tiles:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            // Cooperatively load tile from global memory (HBM) to shared memory (SRAM)
            tile_Q[threadIdx.x][threadIdx.y] = Q[block_idx * BLOCK_SIZE + threadIdx.x][threadIdx.y];
            __syncthreads();  // Ensure entire tile is loaded before processing
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Processing tiles:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            // All operations on tile happen in shared memory (fast)
            for (int k = 0; k &lt; BLOCK_SIZE; k++) &#123;
                tile_S[threadIdx.x][threadIdx.y] += tile_Q[threadIdx.x][k] * tile_K[threadIdx.y][k];
            &#125;
            __syncthreads();
          </code></pre>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Choosing Block Sizes</h3>
          <p className="text-slate-700 mb-4"><strong>Hardware constraints:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>SRAM size (e.g., 20MB on A100)</li>
            <li>Maximum threads per block (e.g., 1024 on modern GPUs)</li>
            <li>Memory alignment requirements (e.g., 128-byte alignment)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Software constraints:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Problem dimensions (e.g., head dimension d in attention)</li>
            <li>Parallelism requirements (multiple blocks running concurrently)</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Tuning approach:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Start with maximum block size that fits in SRAM</li>
            <li>Profile performance</li>
            <li>Adjust based on occupancy and bandwidth utilization</li>
            <li>Iterate</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>[IO-Aware Algorithms](/wiki/io-aware-algorithms)</li>
            <li>[GPU Memory Hierarchy](/wiki/gpu-memory-hierarchy)</li>
            <li>[Kernel Fusion](/wiki/kernel-fusion)</li>
            <li>[Attention Mechanism](/wiki/attention-mechanism)</li>
            <li>[Operator Splitting Methods](/wiki/operator-splitting)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">References</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Dao, T., Fu, D. Y., Ermon, S., Rudra, A., &amp; Ré, C. (2022). FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness. In Advances in Neural Information Processing Systems (NeurIPS 2022).</li>
            <li>Lam, M. D., Rothberg, E. E., &amp; Wolf, M. E. (1991). The cache performance and optimizations of blocked algorithms. ACM SIGPLAN Notices, 26(4), 63-74.</li>
            <li>Frigo, M., Leiserson, C. E., Prokop, H., &amp; Ramachandran, S. (1999). Cache-oblivious algorithms. In Proceedings of the 40th Annual Symposium on Foundations of Computer Science (FOCS).</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
