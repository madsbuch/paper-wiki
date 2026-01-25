import { useEffect, useState } from "react";
import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

function HBMExercise() {
  const [modelSize, setModelSize] = useState(70); // billions of parameters
  const [precision, setPrecision] = useState(16); // bits per parameter
  const [batchSize, setBatchSize] = useState(1);
  const [seqLength, setSeqLength] = useState(4096);
  const [showAnswer, setShowAnswer] = useState(false);

  // Calculate memory requirements
  const weightMemoryGB = (modelSize * precision) / 8; // GB for weights
  // Rough KV cache estimate: 2 * layers * hidden_dim * seq_len * batch * precision
  // For a ~70B model: ~80 layers, ~8192 hidden dim
  const layers = Math.round(modelSize * 1.14); // rough approximation
  const hiddenDim = Math.round(Math.sqrt((modelSize * 1e9) / 12)); // rough estimate
  const kvCacheGB =
    (2 * layers * hiddenDim * seqLength * batchSize * precision) / (8 * 1e9);
  const totalGB = weightMemoryGB + kvCacheGB;

  // HBM3E stack capacity is 48GB, typical GPU has 8 stacks = 384GB (like H100)
  const hbm3eStacks = Math.ceil(totalGB / 48);
  const gpusNeeded = Math.ceil(hbm3eStacks / 8);

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Exercise: Calculate HBM Requirements
      </h2>
      <p className="text-slate-700 mb-6">
        Adjust the parameters below to see how model size, precision, and
        context length affect HBM requirements.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Model Size: {modelSize}B parameters
          </label>
          <input
            type="range"
            min="7"
            max="405"
            value={modelSize}
            onChange={(e) => setModelSize(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>7B (Llama 2)</span>
            <span>70B</span>
            <span>405B (Llama 3)</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Precision: {precision}-bit
          </label>
          <div className="flex gap-4">
            {[4, 8, 16, 32].map((p) => (
              <button
                key={p}
                onClick={() => setPrecision(p)}
                className={`px-4 py-2 rounded ${
                  precision === p
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {p}-bit
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Sequence Length: {seqLength.toLocaleString()} tokens
          </label>
          <input
            type="range"
            min="512"
            max="128000"
            step="512"
            value={seqLength}
            onChange={(e) => setSeqLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Batch Size: {batchSize}
          </label>
          <input
            type="range"
            min="1"
            max="64"
            value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="border-t border-slate-300 pt-4">
          <h3 className="font-semibold text-slate-900 mb-3">
            Memory Requirements:
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-3 rounded border border-slate-200">
              <div className="text-slate-500">Weight Memory</div>
              <div className="text-xl font-bold text-slate-900">
                {weightMemoryGB.toFixed(1)} GB
              </div>
            </div>
            <div className="bg-white p-3 rounded border border-slate-200">
              <div className="text-slate-500">KV Cache (estimate)</div>
              <div className="text-xl font-bold text-slate-900">
                {kvCacheGB.toFixed(1)} GB
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-200 col-span-2">
              <div className="text-blue-700">Total Memory Required</div>
              <div className="text-2xl font-bold text-blue-900">
                {totalGB.toFixed(1)} GB
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="mt-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded text-slate-700"
          >
            {showAnswer ? "Hide" : "Show"} Hardware Requirements
          </button>

          {showAnswer && (
            <div className="mt-4 p-4 bg-green-50 rounded border border-green-200">
              <p className="text-green-800">
                <strong>HBM3E stacks needed:</strong> {hbm3eStacks} (at 48GB
                each)
              </p>
              <p className="text-green-800 mt-2">
                <strong>H100 GPUs needed:</strong> ~{gpusNeeded} (with 80GB HBM3
                each)
              </p>
              <p className="text-sm text-green-600 mt-2">
                Note: This is a simplified estimate. Real deployments also need
                memory for activations, optimizer states (for training), and
                overhead.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const meta: WikiMeta = {
  title: "High Bandwidth Memory (HBM)",
  description:
    "A 3D-stacked DRAM memory technology that provides high bandwidth for AI accelerators by connecting multiple memory dies vertically through silicon vias.",
  category: "Hardware Architecture",
  difficulty: "Intermediate",
  tags: ["memory", "hardware", "GPU", "AI accelerators", "inference"],
  relatedConcepts: [
    "gpu-memory-hierarchy",
    "transformer-architecture",
    "attention-mechanism",
  ],
  citations: [
    {
      paper:
        "Challenges and Research Directions for Large Language Model Inference Hardware",
      authors: "Ma, X. & Patterson, D.",
      year: "2025",
      pages: "1-11",
    },
  ],
};

export default function HighBandwidthMemory() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error("MathJax typesetting failed:", err),
      );
    }
  }, []);

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            High Bandwidth Memory (HBM) is a 3D-stacked memory architecture that
            vertically connects multiple DRAM dies using through-silicon vias
            (TSVs), achieving significantly higher bandwidth than traditional
            DDR memory while maintaining a smaller footprint. Current datacenter
            GPUs and TPUs connect several HBM stacks to a single monolithic
            accelerator ASIC via a silicon interposer [Ma &amp; Patterson,
            2025].
          </p>
          <p className="text-slate-700">
            HBM has evolved through six generations since its introduction in
            2013, with each generation increasing bandwidth and capacity. HBM3E
            (2023) achieves 1254 GB/s per stack with up to 48GB capacity, while
            HBM4 (2026) is expected to reach 2048 GB/s with 64GB per stack
            through doubling the number of pins to 2048.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Problem It Solves
          </h2>
          <p className="text-slate-700 mb-4">
            AI workloads face a fundamental &quot;Memory Wall&quot;—the gap
            between compute performance and memory bandwidth is widening
            dramatically. From 2012 to 2022, NVIDIA GPU 64-bit FLOPS rose by
            80X, but memory bandwidth grew only 17X [Ma &amp; Patterson, 2025].
            This disparity is particularly problematic for LLM inference, where
            the autoregressive decode phase is inherently memory-bound,
            generating one token at a time.
          </p>
          <p className="text-slate-700">
            Traditional memory interfaces cannot provide the bandwidth needed
            for modern AI models. A single DDR5 module provides only 51 GB/s of
            bandwidth, while a single HBM3E stack provides 1254 GB/s—a 24X
            improvement. Without HBM, serving large language models would be
            impractically slow.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-slate-700 mb-4">
            HBM achieves high bandwidth through three key innovations:
          </p>

          <div className="bg-slate-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-slate-900 mb-3">
              1. 3D Stacking with TSVs
            </h3>
            <p className="text-slate-700 mb-4">
              Multiple DRAM dies (up to 16 in HBM4) are stacked vertically and
              connected through thousands of through-silicon vias. This provides
              a much wider data path than edge-connected memory.
            </p>

            <h3 className="font-semibold text-slate-900 mb-3">
              2. Wide Interface
            </h3>
            <p className="text-slate-700 mb-4">
              Each HBM stack uses 1024 pins (2048 in HBM4), compared to 288 pins
              for a DDR5 module. The total bandwidth is: pins × pin_bandwidth ×
              8 (bits to bytes).
            </p>

            <h3 className="font-semibold text-slate-900 mb-3">
              3. Silicon Interposer
            </h3>
            <p className="text-slate-700">
              HBM stacks sit on a silicon interposer alongside the GPU/TPU die,
              providing short, high-bandwidth connections. This is more
              expensive than standard packaging but essential for the bandwidth
              achieved.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-slate-300">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-2 text-left border-b border-slate-300">
                    Generation
                  </th>
                  <th className="px-4 py-2 text-left border-b border-slate-300">
                    Year
                  </th>
                  <th className="px-4 py-2 text-left border-b border-slate-300">
                    Stack BW (GB/s)
                  </th>
                  <th className="px-4 py-2 text-left border-b border-slate-300">
                    Max Capacity
                  </th>
                  <th className="px-4 py-2 text-left border-b border-slate-300">
                    NVIDIA GPU
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">HBM</td>
                  <td className="px-4 py-2 border-b border-slate-200">2013</td>
                  <td className="px-4 py-2 border-b border-slate-200">128</td>
                  <td className="px-4 py-2 border-b border-slate-200">4 GB</td>
                  <td className="px-4 py-2 border-b border-slate-200">—</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">HBM2</td>
                  <td className="px-4 py-2 border-b border-slate-200">2016</td>
                  <td className="px-4 py-2 border-b border-slate-200">307</td>
                  <td className="px-4 py-2 border-b border-slate-200">8 GB</td>
                  <td className="px-4 py-2 border-b border-slate-200">V100</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">HBM2E</td>
                  <td className="px-4 py-2 border-b border-slate-200">2019</td>
                  <td className="px-4 py-2 border-b border-slate-200">461</td>
                  <td className="px-4 py-2 border-b border-slate-200">24 GB</td>
                  <td className="px-4 py-2 border-b border-slate-200">A100</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">HBM3</td>
                  <td className="px-4 py-2 border-b border-slate-200">2022</td>
                  <td className="px-4 py-2 border-b border-slate-200">819</td>
                  <td className="px-4 py-2 border-b border-slate-200">24 GB</td>
                  <td className="px-4 py-2 border-b border-slate-200">H100</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">HBM3E</td>
                  <td className="px-4 py-2 border-b border-slate-200">2023</td>
                  <td className="px-4 py-2 border-b border-slate-200">1254</td>
                  <td className="px-4 py-2 border-b border-slate-200">48 GB</td>
                  <td className="px-4 py-2 border-b border-slate-200">B100</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">HBM4</td>
                  <td className="px-4 py-2 border-b border-slate-200">2026</td>
                  <td className="px-4 py-2 border-b border-slate-200">2048</td>
                  <td className="px-4 py-2 border-b border-slate-200">64 GB</td>
                  <td className="px-4 py-2 border-b border-slate-200">R100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Apartment Building Analogy
          </h2>
          <p className="text-slate-700 mb-4">
            Think of memory architectures like housing in a city where the
            &quot;residents&quot; are data that need to commute to a
            &quot;workplace&quot; (the processor) every day.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Traditional DDR memory</strong> is like suburban sprawl:
            houses spread out along roads, with each family needing their own
            driveway to the main highway. The highway has limited lanes, so even
            though there&apos;s lots of housing, the commute is slow and
            congested.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>HBM</strong> is like a high-rise apartment building built
            right next to the workplace, with a private underground transit
            system connecting them. Multiple floors (stacked DRAM dies) share
            vertical elevators (TSVs) that connect directly to a massive transit
            hub (the interposer). Residents don&apos;t compete for highway
            lanes—they have dedicated, high-capacity routes.
          </p>
          <p className="text-slate-700">
            The trade-off? Apartment buildings are more expensive to construct
            per square foot, just as HBM costs more per gigabyte than DDR. But
            for residents (data) who need frequent, fast access to work (the
            processor), the premium is worth paying.
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <HBMExercise />

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Cost Challenge
          </h2>
          <p className="text-slate-700 mb-4">
            Despite its performance benefits, HBM faces increasing cost
            challenges. The normalized price of both capacity ($/GB) and
            bandwidth ($/GBps) increased 1.35x from 2023-2025, driven by
            manufacturing and packaging difficulties as dies per stack and
            density increase [Ma &amp; Patterson, 2025].
          </p>
          <p className="text-slate-700">
            In contrast, standard DDR4 DRAM costs have decreased—capacity cost
            shrank to 0.54x and bandwidth cost to 0.45x from 2022-2025. This
            diverging trend is driving research into alternative memory
            architectures like High Bandwidth Flash (HBF), which could provide
            10X capacity with HBM-like bandwidth for suitable workloads.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact</h2>
          <p className="text-slate-700">
            HBM has become the enabling technology for modern AI accelerators.
            Without HBM, training and serving large language models would be
            impractically slow due to the memory-bound nature of transformer
            attention. The NVIDIA H100, with 8 HBM3 stacks providing 3.35 TB/s
            aggregate bandwidth, can serve models that would be impossible on
            DDR-based systems. However, the growing cost and limited capacity of
            HBM is driving the AI industry to explore complementary technologies
            like HBF for model weights and PNM for bandwidth improvements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Related Concepts
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>
              <Link
                to="/wiki/gpu-memory-hierarchy"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                GPU Memory Hierarchy
              </Link>{" "}
              - The broader memory system including SRAM, HBM, and system memory
            </li>
            <li>
              <Link
                to="/wiki/kv-cache"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                KV Cache
              </Link>{" "}
              - Key-value cache that stores attention state and consumes HBM
              during inference
            </li>
            <li>
              <Link
                to="/wiki/transformer-architecture"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Transformer Architecture
              </Link>{" "}
              - The architecture whose memory-bound inference drives HBM demand
            </li>
            <li>
              <Link
                to="/wiki/processing-near-memory"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Processing-Near-Memory
              </Link>{" "}
              - Alternative approach placing compute close to memory
            </li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
