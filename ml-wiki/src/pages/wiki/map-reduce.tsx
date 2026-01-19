import { useState } from 'react';
import WikiLayout from "../../components/WikiLayout";

export default function MapReduce() {
  const [showVisualization, setShowVisualization] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Input Data", description: "Large corpus divided into chunks" },
    { title: "Map Phase", description: "Process each chunk independently in parallel" },
    { title: "Intermediate Results", description: "Collect partial answers from all chunks" },
    { title: "Reduce Phase", description: "Combine partial answers into final result" }
  ];

  const meta = {
    title: "Map-Reduce",
    citations: [
      {
        paper: "From Local to Global: A GraphRAG Approach to Query-Focused Summarization",
        authors: "Edge, D., Trinh, H., et al.",
        year: "2024",
        pages: "2, 6"
      }
    ]
  };

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Definition</h2>
          <p className="text-slate-700 mb-4">
            <strong>Map-Reduce</strong> is a programming model for processing large datasets in parallel by dividing work into two phases: the <strong>map</strong> phase transforms or processes data independently in parallel, and the <strong>reduce</strong> phase aggregates the results into a final output.
          </p>
          <p className="text-slate-700 mb-4">
            In GraphRAG, map-reduce is used for query-focused summarization: community summaries are processed in parallel (map) to generate partial answers, which are then combined (reduce) into a comprehensive global answer [Edge et al., 2024, p. 2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Two Phases</h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Map Phase: Parallel Processing</h3>
          <p className="text-slate-700 mb-4">
            The <strong>map</strong> phase applies the same operation to many data elements independently and in parallel. This enables massive parallelization since each operation doesn't depend on any other.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-slate-700 font-semibold mb-2">In GraphRAG:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
              <li>Community summaries are randomly shuffled and divided into chunks</li>
              <li>Each chunk is processed independently to generate a partial answer</li>
              <li>The LLM scores how helpful each partial answer is (0-100)</li>
              <li>Answers with score 0 are filtered out [Edge et al., 2024, p. 6]</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Reduce Phase: Aggregation</h3>
          <p className="text-slate-700 mb-4">
            The <strong>reduce</strong> phase combines the results from the map phase into a final output. This typically involves aggregation, summarization, or synthesis.
          </p>
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <p className="text-slate-700 font-semibold mb-2">In GraphRAG:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
              <li>Partial answers are sorted by helpfulness score (descending)</li>
              <li>Answers are iteratively added to context window until token limit is reached</li>
              <li>Final context is used to generate the global answer [Edge et al., 2024, p. 6]</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">GraphRAG's Map-Reduce Implementation</h2>
          <p className="text-slate-700 mb-4">
            GraphRAG uses map-reduce to answer global queries over hierarchical community summaries:
          </p>

          <div className="space-y-4 mb-6">
            <div className="border-l-4 border-violet-500 pl-4">
              <p className="text-slate-900 font-bold mb-1">Step 1: Prepare Summaries</p>
              <p className="text-slate-700 text-sm">Community summaries are shuffled and chunked to distribute relevant information</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-slate-900 font-bold mb-1">Step 2: Map - Generate Community Answers</p>
              <p className="text-slate-700 text-sm">Each chunk generates a partial answer + helpfulness score in parallel</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-slate-900 font-bold mb-1">Step 3: Filter</p>
              <p className="text-slate-700 text-sm">Remove irrelevant answers (score = 0)</p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <p className="text-slate-900 font-bold mb-1">Step 4: Reduce - Generate Global Answer</p>
              <p className="text-slate-700 text-sm">Combine top-scoring partial answers into comprehensive final answer</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Map-Reduce for Summarization?</h2>
          <p className="text-slate-700 mb-4">
            Map-reduce solves a fundamental challenge: <strong>how to process more information than fits in the LLM's context window</strong>.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Problem</h3>
          <p className="text-slate-700 mb-4">
            For a corpus with thousands of community summaries, you can't fit them all in a single LLM call. You need a strategy to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Process information in chunks small enough for the context window</li>
            <li>Ensure all relevant information is considered</li>
            <li>Combine insights from all chunks into a coherent answer</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Solution</h3>
          <p className="text-slate-700 mb-4">
            Map-reduce provides a systematic framework:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Parallelization</strong>: Process many chunks simultaneously</li>
            <li><strong>Scalability</strong>: Handle arbitrarily large corpora</li>
            <li><strong>Quality control</strong>: Score and filter intermediate results</li>
            <li><strong>Hierarchical processing</strong>: Can apply map-reduce recursively for very large datasets</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Restaurant Kitchen Analogy</h2>
          <p className="text-slate-700 mb-4">
            Imagine you're running a large restaurant and a food critic asks: "What defines your cuisine?"
          </p>

          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <p className="text-slate-700 font-semibold mb-2">❌ Naive Approach (Doesn't Scale)</p>
            <p className="text-slate-700">
              Try to explain every single dish, every ingredient, every technique all at once. This overwhelms the critic and misses the big picture.
            </p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg mb-4">
            <p className="text-slate-700 font-semibold mb-2">✓ Map-Reduce Approach</p>
            <p className="text-slate-700 mb-3"><strong>Map Phase:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-3">
              <li>Ask your appetizer chef: "What themes do you see in your section?"</li>
              <li>Ask your main course chef: "What themes do you see in your section?"</li>
              <li>Ask your dessert chef: "What themes do you see in your section?"</li>
              <li>Ask your sommelier: "What themes do you see in the wine program?"</li>
            </ul>
            <p className="text-slate-700 mb-3">Each gives you a partial answer in parallel.</p>

            <p className="text-slate-700 mb-3"><strong>Reduce Phase:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
              <li>Collect all their insights</li>
              <li>Identify common themes (e.g., "local ingredients", "French technique", "seasonal rotation")</li>
              <li>Synthesize into a coherent answer: "Our cuisine is defined by French technique applied to hyper-local, seasonal ingredients"</li>
            </ul>
          </div>

          <p className="text-slate-700 mb-4">
            This map-reduce approach lets you process information from many specialized sources (chefs/community summaries) in parallel, then combine their insights into a comprehensive answer that captures the big picture.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Interactive Visualization</h2>
          <button
            onClick={() => setShowVisualization(!showVisualization)}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors mb-4"
          >
            {showVisualization ? "Hide" : "Show"} Map-Reduce Flow
          </button>

          {showVisualization && (
            <div className="mt-4 space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center mb-6">
                {steps.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentStep(i)}
                    className={`flex-1 mx-1 p-3 rounded-lg transition-colors ${
                      currentStep === i
                        ? 'bg-violet-600 text-white'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    <p className="font-bold text-sm">{i + 1}. {step.title}</p>
                  </button>
                ))}
              </div>

              <div className="bg-slate-100 p-6 rounded-lg">
                {currentStep === 0 && (
                  <div>
                    <p className="text-slate-900 font-bold mb-3">Input: 1000 Community Summaries</p>
                    <div className="grid grid-cols-10 gap-2">
                      {Array.from({length: 30}).map((_, i) => (
                        <div key={i} className="h-8 bg-slate-400 rounded"></div>
                      ))}
                      <div className="col-span-10 text-center text-slate-600 text-sm mt-2">
                        ... (970 more summaries)
                      </div>
                    </div>
                    <p className="text-slate-700 mt-4 text-sm">
                      Too much to process at once - we need to break it down!
                    </p>
                  </div>
                )}

                {currentStep === 1 && (
                  <div>
                    <p className="text-slate-900 font-bold mb-3">Map: Process 10 Chunks in Parallel</p>
                    <div className="grid grid-cols-2 gap-4">
                      {Array.from({length: 10}).map((_, i) => (
                        <div key={i} className="bg-blue-100 p-3 rounded border-2 border-blue-300">
                          <p className="text-blue-900 font-semibold text-sm">Chunk {i + 1}</p>
                          <p className="text-blue-700 text-xs mt-1">→ Partial Answer {i + 1}</p>
                          <p className="text-blue-600 text-xs">Score: {85 + i}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-slate-700 mt-4 text-sm">
                      Each chunk generates a partial answer independently - fully parallel!
                    </p>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <p className="text-slate-900 font-bold mb-3">Intermediate Results: 10 Partial Answers</p>
                    <div className="space-y-2">
                      {Array.from({length: 10}).map((_, i) => (
                        <div key={i} className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
                          <p className="text-yellow-900 font-semibold text-sm">Partial Answer {i + 1}</p>
                          <p className="text-yellow-700 text-xs">Helpfulness Score: {94 - i}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <p className="text-slate-900 font-bold mb-3">Reduce: Combine Top Answers</p>
                    <div className="space-y-3">
                      <div className="bg-green-100 p-4 rounded border-2 border-green-400">
                        <p className="text-green-900 font-semibold mb-2">Selected Partial Answers (sorted by score):</p>
                        <ul className="list-disc list-inside space-y-1 ml-4 text-green-700 text-sm">
                          <li>Partial Answer 1 (Score: 94) ✓</li>
                          <li>Partial Answer 2 (Score: 93) ✓</li>
                          <li>Partial Answer 3 (Score: 92) ✓</li>
                          <li>Partial Answer 4 (Score: 91) ✓</li>
                          <li>Partial Answer 5 (Score: 90) ✓</li>
                        </ul>
                        <p className="text-green-600 text-xs mt-3">Context window full - ready to generate final answer</p>
                      </div>

                      <div className="bg-violet-100 p-4 rounded border-2 border-violet-500">
                        <p className="text-violet-900 font-bold mb-2">Final Global Answer:</p>
                        <p className="text-violet-700 text-sm">
                          Comprehensive synthesis of all partial answers, combining insights from across the entire corpus into a coherent, detailed response to the user's query.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep === steps.length - 1}
                  className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Advantages of Map-Reduce</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Scalability</strong>: Handle datasets much larger than context window</li>
            <li><strong>Parallelization</strong>: Process many chunks simultaneously for speed</li>
            <li><strong>Fault tolerance</strong>: If one chunk fails, others can continue</li>
            <li><strong>Quality control</strong>: Score and rank intermediate results</li>
            <li><strong>Hierarchical application</strong>: Can apply recursively for massive datasets</li>
            <li><strong>Flexibility</strong>: Works with any aggregation function in reduce phase</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Beyond GraphRAG</h2>
          <p className="text-slate-700 mb-4">
            Map-reduce is a fundamental pattern used throughout computing:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Big data processing</strong>: Hadoop, Spark use map-reduce for distributed computing</li>
            <li><strong>Search engines</strong>: Index billions of web pages using map-reduce</li>
            <li><strong>Machine learning</strong>: Train models on large datasets</li>
            <li><strong>Database queries</strong>: Aggregate operations use map-reduce internally</li>
            <li><strong>LLM applications</strong>: Any task requiring processing more data than fits in context</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
