import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function BottleneckArchitecture() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  const meta = {
  title: "Bottleneck Architecture",
  category: "Architecture Components",
  description: "A design pattern that reduces dimensionality before expensive operations and then restores it, creating an efficiency bottleneck that enables deeper networks.",
  relatedConcepts: ["residual-connections", "identity-mapping", "layer-normalization"],
  citations: [
    {
      paper: "Deep Residual Learning for Image Recognition",
      authors: "He, K., Zhang, X., Ren, S., & Sun, J.",
      year: "2015",
      pages: "6"
    }
  ]
};

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Bottleneck Architecture?</h2>
          <p className="text-slate-700 mb-4">A bottleneck architecture reduces the dimension of the input, processes it at the reduced dimension, and then restores the original dimension. This creates a computational "bottleneck" where the expensive operation happens at lower dimensionality, significantly reducing parameters and computation.</p>
          <p className="text-slate-700 mb-4">Think of it like compressing data before transmitting it over a slow network connection, then decompressing at the destination. The bottleneck (the narrow network connection) is where you minimize resource usage.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Core Pattern</h2>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input (high-dim) → Reduce → Process → Expand → Output (high-dim)
                                 ↓         ↓          ↓
                               1×1 conv  3×3 conv  1×1 conv
                               (fewer    (bottleneck) (restore
                               channels)  operation)  channels)
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Mathematical form:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            x (256-d) → W₁ (256→64) → f(·) → W₂ (64→64) → W₃ (64→256) → y (256-d)
                        [1×1 reduce]   [ReLU]  [3×3 conv]   [ReLU]   [1×1 expand]
          </code></pre>
          <p className="text-slate-700 mb-4">The middle layer (64-d) is the "bottleneck" - narrower than the input/output.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">ResNet Bottleneck Blocks</h2>
          <p className="text-slate-700 mb-4">The bottleneck design was introduced in ResNet to make very deep networks (50+ layers) computationally feasible:</p>
          <p className="text-slate-700 mb-4">"For each residual function F, we use a stack of 3 layers instead of 2. The three layers are 1×1, 3×3, and 1×1 convolutions, where the 1×1 layers are responsible for reducing and then increasing (restoring) dimensions, leaving the 3×3 layer a bottleneck with smaller input/output dimensions" [He et al., 2015, p. 6].</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Basic Block vs Bottleneck Block</h3>
          <p className="text-slate-700 mb-4"><strong>Basic Block (ResNet-18, ResNet-34):</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input (64-d)
              ↓
            3×3 conv, 64 channels → ReLU
              ↓
            3×3 conv, 64 channels
              ↓
            Add residual → ReLU
              ↓
            Output (64-d)
            
            Parameters: 3×3×64×64 × 2 = 73,728
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Bottleneck Block (ResNet-50, ResNet-101, ResNet-152):</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input (256-d)
              ↓
            1×1 conv, 64 channels → ReLU    [Reduce: 256→64]
              ↓
            3×3 conv, 64 channels → ReLU    [Process at bottleneck]
              ↓
            1×1 conv, 256 channels           [Expand: 64→256]
              ↓
            Add residual → ReLU
              ↓
            Output (256-d)
            
            Parameters: (1×1×256×64) + (3×3×64×64) + (1×1×64×256) = 69,632
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Comparison:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Basic block: 73,728 parameters</li>
            <li>Bottleneck block: 69,632 parameters (similar)</li>
            <li>But bottleneck allows input/output of 256-d vs 64-d (4× wider)</li>
            <li>For same width, bottleneck is significantly cheaper</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Bottleneck Works</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Computational Efficiency</h3>
          <p className="text-slate-700 mb-4">The expensive operation (3×3 convolution) happens at reduced dimensionality:</p>
          <p className="text-slate-700 mb-4"><strong>Without bottleneck (256-d throughout):</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            3×3 conv on 256 channels: 3×3×256×256 = 589,824 parameters
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>With bottleneck (reduce to 64-d):</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            1×1 reduce: 1×1×256×64 = 16,384 parameters
            3×3 bottleneck: 3×3×64×64 = 36,864 parameters
            1×1 expand: 1×1×64×256 = 16,384 parameters
            Total: 69,632 parameters (8.5× fewer!)
          </code></pre>
          <p className="text-slate-700 mb-4">The 3×3 operation costs 36,864 instead of 589,824 - a massive reduction.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Enabling Deeper Networks</h3>
          <p className="text-slate-700 mb-4">With bottlenecks, you can stack more layers for the same compute budget:</p>
          <p className="text-slate-700 mb-4"><strong>Without bottleneck:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>34 layers × ~74K params/layer = ~2.5M params</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>With bottleneck:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>50 layers × ~70K params/layer = ~3.5M params</li>
            <li>101 layers × ~70K params/layer = ~7M params</li>
            <li>152 layers × ~70K params/layer = ~10M params</li>
          </ul>
          <p className="text-slate-700 mb-4">Bottlenecks made ResNet-152 possible with reasonable computation.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Why 1×1 Convolutions Are Cheap</h3>
          <p className="text-slate-700 mb-4">A 1×1 convolution is just a learned linear projection across channels:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input: H × W × C_in
            1×1 conv: 1 × 1 × C_in × C_out parameters
            Output: H × W × C_out
          </code></pre>
          <p className="text-slate-700 mb-4">No spatial processing (1×1 kernel), only channel mixing. Very parameter-efficient for dimensionality changes.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Three-Layer Structure</h2>
          <p className="text-slate-700 mb-4">ResNet bottleneck follows a consistent three-layer pattern:</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Layer 1: Reduce (1×1 Conv)</h3>
          <p className="text-slate-700 mb-4"><strong>Purpose:</strong> Reduce channel dimensionality</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input: 256 channels
            ↓ 1×1 conv
            Output: 64 channels (4× reduction)
          </code></pre>
          <p className="text-slate-700 mb-4">Reduces the number of feature maps before expensive spatial operations.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Layer 2: Transform (3×3 Conv)</h3>
          <p className="text-slate-700 mb-4"><strong>Purpose:</strong> Spatial feature extraction</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input: 64 channels
            ↓ 3×3 conv (bottleneck operation)
            Output: 64 channels
          </code></pre>
          <p className="text-slate-700 mb-4">This is where spatial patterns are learned. Operating at 64 channels instead of 256 channels makes it 16× cheaper.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Layer 3: Expand (1×1 Conv)</h3>
          <p className="text-slate-700 mb-4"><strong>Purpose:</strong> Restore original dimensionality</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input: 64 channels
            ↓ 1×1 conv
            Output: 256 channels (4× expansion)
          </code></pre>
          <p className="text-slate-700 mb-4">Expands back to high-dimensional space for the next layer. Ensures dimensions match for the residual connection.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Bottleneck with Residual Connections</h2>
          <p className="text-slate-700 mb-4">The bottleneck design is especially powerful with residual connections:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input x (256-d)
              ↓
            ┌─────────────────┐
            │ 1×1 conv → ReLU │  Reduce
            │ 3×3 conv → ReLU │  Transform
            │ 1×1 conv        │  Expand
            └─────────────────┘
              ↓ F(x)
              (+) ← x (skip connection)
              ↓
            ReLU
              ↓
            Output (256-d)
          </code></pre>
          <p className="text-slate-700 mb-4">The skip connection is crucial: it passes the input directly while the bottleneck path processes a compressed representation.</p>
          <p className="text-slate-700 mb-4">"The parameter-free identity shortcuts are particularly important for the bottleneck architectures. If the identity shortcut in Fig. 5 (right) is replaced with projection, one can show that the time complexity and model size are doubled, as the shortcut is connected to the two high-dimensional ends. So identity shortcuts lead to more efficient models for the bottleneck designs" [He et al., 2015, p. 6].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Dimension Reduction Ratios</h2>
          <p className="text-slate-700 mb-4">ResNet typically uses a 4× reduction:</p>
          <p className="text-slate-700 mb-4"><strong>conv2_x block:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Input/Output: 256 channels</li>
            <li>Bottleneck: 64 channels</li>
            <li>Ratio: 256/64 = 4×</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>conv3_x block:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Input/Output: 512 channels</li>
            <li>Bottleneck: 128 channels</li>
            <li>Ratio: 512/128 = 4×</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>conv4_x block:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Input/Output: 1024 channels</li>
            <li>Bottleneck: 256 channels</li>
            <li>Ratio: 1024/256 = 4×</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>conv5_x block:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Input/Output: 2048 channels</li>
            <li>Bottleneck: 512 channels</li>
            <li>Ratio: 2048/512 = 4×</li>
          </ul>
          <p className="text-slate-700 mb-4">The 4× ratio balances efficiency with representational capacity.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Comparison with Other Architectures</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Inception Modules (GoogLeNet)</h3>
          <p className="text-slate-700 mb-4">Inception also uses 1×1 convolutions for dimensionality reduction:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input
              ├→ 1×1 conv → output
              ├→ 1×1 reduce → 3×3 conv → output
              ├→ 1×1 reduce → 5×5 conv → output
              └→ pool → 1×1 conv → output
                 ↓
              Concatenate
          </code></pre>
          <p className="text-slate-700 mb-4">Multiple parallel bottlenecks with different operations.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">MobileNet Depthwise Separable Convolutions</h3>
          <p className="text-slate-700 mb-4">MobileNet separates spatial and channel operations:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            3×3 depthwise conv (per channel) → 1×1 pointwise conv (across channels)
          </code></pre>
          <p className="text-slate-700 mb-4">Similar bottleneck principle but more extreme separation.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Transformer Feed-Forward</h3>
          <p className="text-slate-700 mb-4">Transformers use an inverted bottleneck:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input (512-d) → Linear expand (512→2048) → ReLU → Linear reduce (2048→512)
          </code></pre>
          <p className="text-slate-700 mb-4">Expands then reduces, opposite of ResNet. The middle layer is wider, not narrower.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Parameter Analysis</h2>
          <p className="text-slate-700 mb-4">Let's analyze a concrete example from ResNet-50:</p>
          <p className="text-slate-700 mb-4"><strong>conv4_x bottleneck block:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Input: 1024 channels
            
            Layer 1 (1×1 reduce):
            - Params: 1×1×1024×256 = 262,144
            - Output: 256 channels
            
            Layer 2 (3×3 transform):
            - Params: 3×3×256×256 = 589,824
            - Output: 256 channels
            
            Layer 3 (1×1 expand):
            - Params: 1×1×256×1024 = 262,144
            - Output: 1024 channels
            
            Total: 1,114,112 parameters
          </code></pre>
          <p className="text-slate-700 mb-4"><strong>Alternative without bottleneck:</strong></p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            Two 3×3 convolutions at 1024 channels:
            - Layer 1: 3×3×1024×1024 = 9,437,184
            - Layer 2: 3×3×1024×1024 = 9,437,184
            Total: 18,874,368 parameters (17× more!)
          </code></pre>
          <p className="text-slate-700 mb-4">The bottleneck achieves massive parameter savings.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Training Considerations</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Batch Normalization Placement</h3>
          <p className="text-slate-700 mb-4">ResNet places batch normalization after each convolution:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            1×1 conv → BN → ReLU
            3×3 conv → BN → ReLU
            1×1 conv → BN
            (+) residual
            ReLU
          </code></pre>
          <p className="text-slate-700 mb-4">BN helps normalize activations through the narrow bottleneck.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Activation Functions</h3>
          <p className="text-slate-700 mb-4">ReLU is applied after reduce and transform, but NOT after expand:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            1×1 reduce → ReLU ✓
            3×3 transform → ReLU ✓
            1×1 expand → (no ReLU) ✗
            (+) residual → ReLU ✓
          </code></pre>
          <p className="text-slate-700 mb-4">The final ReLU comes after adding the residual, not after the expansion.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Initialization</h3>
          <p className="text-slate-700 mb-4">Proper initialization is important for bottlenecks:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Weights initialized to avoid too much reduction initially</li>
            <li>BN helps stabilize training through dimensional changes</li>
            <li>Residual connections provide gradient flow even if bottleneck is poorly initialized</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">When to Use Bottleneck Architecture</h2>
          <p className="text-slate-700 mb-4"><strong>Good for:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Very deep networks (50+ layers)</li>
            <li>Limited computational budget</li>
            <li>Need to maximize depth for fixed compute</li>
            <li>High-dimensional inputs/outputs with spatial operations</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Not needed for:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Shallow networks (&amp;lt; 20 layers)</li>
            <li>Already operating at low dimensions</li>
            <li>When compute is not a constraint</li>
            <li>Channel-wise operations (already efficient)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Common Pitfalls</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">1. Too Aggressive Reduction</h3>
          <p className="text-slate-700 mb-4"><strong>Problem:</strong> Reducing too much (e.g., 1024 → 16 channels)</p>
          <p className="text-slate-700 mb-4"><strong>Result:</strong> Information bottleneck, loss of representation capacity</p>
          <p className="text-slate-700 mb-4"><strong>Solution:</strong> Use moderate reduction ratios (4× is standard)</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. Forgetting to Expand</h3>
          <p className="text-slate-700 mb-4"><strong>Problem:</strong> Not restoring dimensions before residual connection</p>
          <p className="text-slate-700 mb-4"><strong>Result:</strong> Dimension mismatch, can't add residual</p>
          <p className="text-slate-700 mb-4"><strong>Solution:</strong> Always expand back to input dimension</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Wrong Activation Placement</h3>
          <p className="text-slate-700 mb-4"><strong>Problem:</strong> ReLU after expansion layer</p>
          <p className="text-slate-700 mb-4"><strong>Result:</strong> Suboptimal, breaks some gradient flow benefits</p>
          <p className="text-slate-700 mb-4"><strong>Solution:</strong> ReLU only after reduce and transform, final ReLU after residual addition</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">4. Projection Shortcuts</h3>
          <p className="text-slate-700 mb-4"><strong>Problem:</strong> Using learned projection for skip connection in bottlenecks</p>
          <p className="text-slate-700 mb-4"><strong>Result:</strong> Doubles parameters and computation</p>
          <p className="text-slate-700 mb-4"><strong>Solution:</strong> Use identity shortcuts when possible (parameter-free)</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Analogy: Data Compression</h2>
          <p className="text-slate-700 mb-4">Bottleneck architecture is like compressing data for efficient processing:</p>
          <p className="text-slate-700 mb-4"><strong>Uncompressed processing:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Store 1GB file</li>
            <li>Apply operation to 1GB file</li>
            <li>Store 1GB result</li>
            <li>High memory, high computation</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Compressed processing (bottleneck):</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Compress 1GB → 100MB (reduce)</li>
            <li>Apply operation to 100MB (process at bottleneck)</li>
            <li>Decompress 100MB → 1GB (expand)</li>
            <li>Lower computation on core operation</li>
          </ul>
          <p className="text-slate-700 mb-4">The compression step (1×1 reduce) and decompression step (1×1 expand) are cheap. The expensive operation (3×3 conv) works on compressed representation, saving massive compute.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Takeaways</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Bottleneck reduces then restores dimensions</strong>: 1×1 reduce → 3×3 process → 1×1 expand</li>
            <li><strong>Enables deeper networks</strong>: Same compute budget, more layers</li>
            <li><strong>Massive parameter savings</strong>: Up to 17× fewer parameters for same operation</li>
            <li><strong>Critical for ResNet-50+</strong>: Makes 50, 101, 152 layer networks feasible</li>
            <li><strong>Works with identity shortcuts</strong>: Parameter-free skip connections preserve efficiency</li>
            <li><strong>Standard 4× reduction</strong>: Balances efficiency and capacity</li>
          </ul>
          <p className="text-slate-700 mb-4">Bottleneck architecture is a key innovation that made extremely deep networks practical. By processing at reduced dimensionality, it achieves the depth needed for state-of-the-art performance without prohibitive computational costs.</p>
        </section>
      </div>
    </WikiLayout>
  );
}
