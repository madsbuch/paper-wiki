import { useEffect, useState } from "react";
import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

function PNMExercise() {
  const [architecture, setArchitecture] = useState<
    "traditional" | "pim" | "pnm"
  >("traditional");
  const [showComparison, setShowComparison] = useState(false);

  const architectures = {
    traditional: {
      name: "Traditional (GPU + HBM)",
      dataMovement: "High",
      bandwidth: "~1.2 TB/s (HBM3)",
      shardSize: "Flexible (GBs)",
      logicProcess: "Advanced (5nm)",
      softwareComplexity: "Standard",
      costPerGB: "High ($$$)",
      bestFor: "Compute-bound workloads",
    },
    pim: {
      name: "Processing-In-Memory (PIM)",
      dataMovement: "Very Low (on-chip)",
      bandwidth: "5-10X standard",
      shardSize: "32-64 MB banks",
      logicProcess: "DRAM process (slower)",
      softwareComplexity: "High (bank sharding)",
      costPerGB: "Higher (custom)",
      bestFor: "Simple, parallel ops",
    },
    pnm: {
      name: "Processing-Near-Memory (PNM)",
      dataMovement: "Low (off-chip nearby)",
      bandwidth: "2-5X standard",
      shardSize: "16-32 GB",
      logicProcess: "Logic process (fast)",
      softwareComplexity: "Moderate",
      costPerGB: "Standard",
      bestFor: "LLM inference",
    },
  };

  const current = architectures[architecture];

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Exercise: Compare Memory Architectures
      </h2>
      <p className="text-slate-700 mb-6">
        Select different memory architectures to compare their trade-offs for
        LLM inference workloads.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg">
        <div className="flex flex-wrap gap-4 mb-6">
          {(["traditional", "pim", "pnm"] as const).map((arch) => (
            <button
              key={arch}
              onClick={() => setArchitecture(arch)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                architecture === arch
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {arch === "traditional" ? "Traditional" : arch.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            {current.name}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <span className="text-sm text-slate-500">
                  Data Movement Power
                </span>
                <div
                  className={`font-semibold ${
                    current.dataMovement === "Very Low (on-chip)"
                      ? "text-green-600"
                      : current.dataMovement === "Low (off-chip nearby)"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {current.dataMovement}
                </div>
              </div>

              <div>
                <span className="text-sm text-slate-500">
                  Bandwidth vs Standard
                </span>
                <div className="font-semibold text-slate-900">
                  {current.bandwidth}
                </div>
              </div>

              <div>
                <span className="text-sm text-slate-500">
                  Minimum Shard Size
                </span>
                <div
                  className={`font-semibold ${
                    current.shardSize === "32-64 MB banks"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {current.shardSize}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm text-slate-500">Logic Process</span>
                <div
                  className={`font-semibold ${
                    current.logicProcess.includes("DRAM")
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {current.logicProcess}
                </div>
              </div>

              <div>
                <span className="text-sm text-slate-500">
                  Software Complexity
                </span>
                <div className="font-semibold text-slate-900">
                  {current.softwareComplexity}
                </div>
              </div>

              <div>
                <span className="text-sm text-slate-500">Cost per GB</span>
                <div className="font-semibold text-slate-900">
                  {current.costPerGB}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <span className="text-sm text-slate-500">Best suited for</span>
            <div className="font-semibold text-blue-600">{current.bestFor}</div>
          </div>
        </div>

        <button
          onClick={() => setShowComparison(!showComparison)}
          className="mt-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded text-slate-700"
        >
          {showComparison ? "Hide" : "Show"} Full Comparison
        </button>

        {showComparison && (
          <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">
              Why PNM wins for LLM inference:
            </h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>
                <strong>Sharding:</strong> PIM requires splitting LLMs into
                32-64MB pieces that rarely interact—nearly impossible for
                attention operations. PNM allows 16-32GB shards, matching
                natural model partitioning.
              </li>
              <li>
                <strong>Logic efficiency:</strong> PIM logic runs on DRAM
                process (slow, power-hungry). PNM uses separate logic dies with
                advanced process nodes, delivering better performance per watt.
              </li>
              <li>
                <strong>Cost:</strong> PIM requires custom memory manufacturing
                with lower volume and fewer suppliers. PNM can use commodity
                memory with separate logic, maintaining standard pricing.
              </li>
              <li>
                <strong>Thermal budget:</strong> PIM has severe thermal
                constraints on the memory die. PNM separates concerns, allowing
                proper cooling of both components.
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

const meta: WikiMeta = {
  title: "Processing-Near-Memory (PNM)",
  description:
    "A memory architecture that places compute logic near (but not on) memory dies to reduce data movement while maintaining flexibility and manufacturing efficiency.",
  category: "Hardware Architecture",
  difficulty: "Advanced",
  tags: ["memory", "hardware", "AI accelerators", "inference", "architecture"],
  relatedConcepts: [
    "high-bandwidth-memory",
    "gpu-memory-hierarchy",
    "transformer-architecture",
  ],
  citations: [
    {
      paper:
        "Challenges and Research Directions for Large Language Model Inference Hardware",
      authors: "Ma, X. & Patterson, D.",
      year: "2025",
      pages: "7-9",
    },
  ],
};

export default function ProcessingNearMemory() {
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
            Processing-Near-Memory (PNM) is a memory architecture technique that
            places compute logic near memory dies but on separate silicon,
            connected through short, high-bandwidth paths. Unlike
            Processing-In-Memory (PIM), which integrates logic directly into
            memory dies, PNM keeps memory and logic on distinct dies, avoiding
            the manufacturing and thermal constraints of in-memory compute [Ma
            &amp; Patterson, 2025].
          </p>
          <p className="text-slate-700">
            The key distinction: PIM means processor and memory share the same
            die; PNM means they are on nearby but separate dies. This seemingly
            small difference has major implications for datacenter LLM
            inference, where PNM is strongly preferred due to its practical
            advantages in software sharding, logic performance, and cost.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Problem It Solves
          </h2>
          <p className="text-slate-700 mb-4">
            Data movement between memory and compute consumes significant energy
            and introduces latency. In traditional architectures, data must
            travel from HBM stacks across an interposer to the GPU die, through
            a memory controller, and into compute units. This path, while
            optimized, still represents a bandwidth and energy bottleneck.
          </p>
          <p className="text-slate-700">
            For memory-bound workloads like LLM Decode inference, compute units
            often sit idle waiting for data. Moving compute closer to
            memory—whether through PIM or PNM—can provide 2-10X bandwidth
            improvements per watt, enabling more efficient inference.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-slate-700 mb-4">
            PNM architectures take several forms:
          </p>

          <div className="bg-slate-50 p-6 rounded-lg mb-6 space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                1. Compute-on-HBM-Base-Die
              </h3>
              <p className="text-slate-700">
                Reuses HBM designs by inserting compute logic into the HBM base
                die (the logic die at the bottom of each HBM stack). The memory
                interface remains unchanged, providing HBM-level bandwidth while
                reducing power 2-3X due to shortened data paths.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                2. Custom 3D Stacking
              </h3>
              <p className="text-slate-700">
                Stacks DRAM dies directly on top of a compute ASIC, using
                through-silicon vias (TSVs) for a wide, dense memory interface.
                This can achieve bandwidth and bandwidth-per-watt higher than
                HBM through denser TSV arrangements.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                3. CXL-Based PNM
              </h3>
              <p className="text-slate-700">
                Uses the CXL (Compute Express Link) interface to attach compute
                accelerators to DRAM modules. Examples include Marvell&apos;s
                Structera, which provides programmable compute near standard DDR
                memory with improved software integration.
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-slate-900 mb-3">
            PNM vs PIM Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-slate-300">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-2 text-left border-b border-slate-300">
                    Aspect
                  </th>
                  <th className="px-4 py-2 text-left border-b border-slate-300">
                    PIM
                  </th>
                  <th className="px-4 py-2 text-left border-b border-slate-300">
                    PNM
                  </th>
                  <th className="px-4 py-2 text-left border-b border-slate-300">
                    Winner
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Data movement power
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Very low (on-chip)
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Low (off-chip nearby)
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200 font-semibold text-green-600">
                    PIM
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Bandwidth per watt
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    5-10X standard
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    2-5X standard
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200 font-semibold text-green-600">
                    PIM
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Software sharding
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    32-64 MB banks
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    16-32 GB
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200 font-semibold text-blue-600">
                    PNM
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Logic performance
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    DRAM process (slow)
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Logic process (fast)
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200 font-semibold text-blue-600">
                    PNM
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Memory density
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Reduced (shared area)
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Full density
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200 font-semibold text-blue-600">
                    PNM
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Cost per GB
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Higher (custom)
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Commodity pricing
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200 font-semibold text-blue-600">
                    PNM
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Thermal budget
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Severely constrained
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200">
                    Less constrained
                  </td>
                  <td className="px-4 py-2 border-b border-slate-200 font-semibold text-blue-600">
                    PNM
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Kitchen Organization Analogy
          </h2>
          <p className="text-slate-700 mb-4">
            Think of a busy restaurant kitchen where chefs (compute) need
            ingredients (data) from storage (memory).
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Traditional architecture</strong> is like having one large
            walk-in refrigerator at the back of the kitchen. Chefs must walk
            back and forth constantly, spending more time traveling than
            cooking. The fridge is highly organized and can store everything,
            but access is slow.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>PIM (Processing-In-Memory)</strong> is like embedding small
            cooking stations inside the refrigerator itself. Data movement is
            minimal—ingredients are right there! But you can only cook simple
            things in the cold, cramped space, and each station can only access
            its own small shelf (32-64MB bank). Try to make a dish requiring
            ingredients from multiple shelves, and you&apos;re back to
            inefficient shuffling.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>PNM (Processing-Near-Memory)</strong> is like having prep
            stations positioned right next to the refrigerator doors, with
            pass-through windows. Ingredients travel a very short distance,
            stations have proper cooking equipment (logic process), and each
            station can access a large section of the fridge (16-32GB). You get
            most of the proximity benefits without sacrificing cooking
            capability.
          </p>
          <p className="text-slate-700">
            For complex dishes like LLM inference—where you need many
            ingredients combined in sophisticated ways—PNM&apos;s balance of
            proximity and capability wins over PIM&apos;s extreme locality but
            limited flexibility.
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <PNMExercise />

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Research Directions
          </h2>
          <p className="text-slate-700 mb-4">
            PNM and 3D stacking open several research questions [Ma &amp;
            Patterson, 2025]:
          </p>
          <ul className="list-disc list-inside ml-4 text-slate-700 space-y-2">
            <li>
              How should software adapt to the different ratio of memory
              bandwidth to capacity/compute FLOPS?
            </li>
            <li>
              For systems with multiple memory types (HBM, HBF, DDR), how do we
              efficiently map LLM components?
            </li>
            <li>
              What are the tradeoffs in bandwidth, power, thermal, and
              reliability for compute-on-top vs compute-on-bottom designs?
            </li>
            <li>
              How do these opportunities change for mobile devices versus
              datacenter accelerators?
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact</h2>
          <p className="text-slate-700">
            PNM represents a promising middle ground between traditional memory
            hierarchies and the more radical PIM approach. For datacenter LLM
            inference, PNM&apos;s practical advantages—easier software sharding,
            faster logic, commodity memory pricing—make it the preferred
            near-memory computing approach. As inference costs become an
            increasingly critical concern (with companies struggling to serve
            state-of-the-art models economically), PNM architectures like 3D
            stacking and CXL-based accelerators offer concrete paths to improved
            performance-per-dollar and performance-per-watt.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Related Concepts
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>
              <Link
                to="/wiki/high-bandwidth-memory"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                High Bandwidth Memory
              </Link>{" "}
              - The memory technology that PNM often enhances
            </li>
            <li>
              <Link
                to="/wiki/gpu-memory-hierarchy"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                GPU Memory Hierarchy
              </Link>{" "}
              - The broader memory system context for PNM
            </li>
            <li>
              <Link
                to="/wiki/kv-cache"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                KV Cache
              </Link>{" "}
              - A major consumer of memory bandwidth that benefits from PNM
            </li>
            <li>
              <Link
                to="/wiki/transformer-architecture"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Transformer Architecture
              </Link>{" "}
              - The architecture whose inference PNM can accelerate
            </li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
