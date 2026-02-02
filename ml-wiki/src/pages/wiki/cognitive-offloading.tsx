import { useState } from "react";
import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";

const meta = {
  title: "Cognitive Offloading",
  description: "The practice of using external tools or AI to reduce mental effort, potentially at the cost of skill development.",
  category: "Human-AI Interaction",
  difficulty: "Beginner",
  citations: [
    {
      paper: "How AI Impacts Skill Formation",
      authors: "Shen, J. H. & Tamkin, A.",
      year: "2026",
      pages: "3, 12-13"
    },
    {
      paper: "The impact of generative ai on critical thinking: Self-reported reductions in cognitive effort and confidence effects from a survey of knowledge workers",
      authors: "Lee, H., Sarkar, A., Tankelevitch, L., et al.",
      year: "2025",
      pages: "1-22"
    },
    {
      paper: "AI tools in society: Impacts on cognitive offloading and the future of critical thinking",
      authors: "Gerlich, M.",
      year: "2025",
      pages: "6"
    }
  ]
};

function CognitiveOffloadingExercise() {
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const patterns = [
    {
      id: "delegation",
      name: "AI Delegation",
      description: "Ask AI to generate all code, paste directly without reading",
      quizScore: 39,
      time: "19.5 min",
      learning: "low"
    },
    {
      id: "progressive",
      name: "Progressive AI Reliance",
      description: "Start asking questions, then delegate everything to AI",
      quizScore: 35,
      time: "22 min",
      learning: "low"
    },
    {
      id: "iterative-debug",
      name: "Iterative AI Debugging",
      description: "Repeatedly ask AI to check and fix code (5-15 queries)",
      quizScore: 24,
      time: "31 min",
      learning: "low"
    },
    {
      id: "conceptual",
      name: "Conceptual Inquiry",
      description: "Only ask conceptual questions, resolve errors independently",
      quizScore: 65,
      time: "22 min",
      learning: "high"
    },
    {
      id: "hybrid",
      name: "Hybrid Code-Explanation",
      description: "Ask for code WITH explanations, read and understand both",
      quizScore: 68,
      time: "24 min",
      learning: "high"
    },
    {
      id: "generation-comprehension",
      name: "Generation-Then-Comprehension",
      description: "Generate code first, then ask follow-up questions to understand it",
      quizScore: 86,
      time: "24 min",
      learning: "high"
    }
  ];

  const handleSelect = (id: string) => {
    setSelectedPattern(id);
    setShowResult(true);
  };

  const selected = patterns.find(p => p.id === selectedPattern);

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Exercise: Identify the Learning Pattern</h2>
      <p className="text-slate-700 mb-6">
        Below are six AI interaction patterns observed in the Shen &amp; Tamkin (2026) study.
        Click on each to see its learning outcome. Can you identify which patterns preserve skill formation?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {patterns.map((pattern) => (
          <button
            key={pattern.id}
            onClick={() => handleSelect(pattern.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selectedPattern === pattern.id
                ? pattern.learning === "high"
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : "border-slate-200 hover:border-slate-400 bg-white"
            }`}
          >
            <div className="font-semibold text-slate-900">{pattern.name}</div>
            <div className="text-sm text-slate-600 mt-1">{pattern.description}</div>
          </button>
        ))}
      </div>

      {showResult && selected && (
        <div className={`p-4 rounded-lg ${selected.learning === "high" ? "bg-green-100 border border-green-300" : "bg-red-100 border border-red-300"}`}>
          <div className="font-bold text-lg mb-2">
            {selected.learning === "high" ? "High Learning Outcome" : "Low Learning Outcome"}
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Quiz Score:</span>
              <span className="ml-2 font-semibold">{selected.quizScore}%</span>
            </div>
            <div>
              <span className="text-slate-600">Time:</span>
              <span className="ml-2 font-semibold">{selected.time}</span>
            </div>
            <div>
              <span className="text-slate-600">Cognitive Engagement:</span>
              <span className="ml-2 font-semibold">{selected.learning === "high" ? "High" : "Low"}</span>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-700">
            {selected.learning === "high"
              ? "This pattern involves active cognitive engagement—the learner stays mentally involved rather than fully delegating to AI."
              : "This pattern involves cognitive offloading—the learner delegates mental effort to AI without engaging deeply with the material."}
          </p>
        </div>
      )}

      <div className="mt-6 p-4 bg-slate-100 rounded-lg">
        <p className="text-sm text-slate-600">
          <strong>Key insight:</strong> The three high-learning patterns all share one thing: they require the human to think.
          Whether asking conceptual questions, requesting explanations, or verifying understanding after generation,
          cognitive engagement is what preserves learning—not avoiding AI entirely.
        </p>
      </div>
    </section>
  );
}

export default function CognitiveOffloading() {
  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            Cognitive offloading refers to the practice of using external aids—whether tools, technologies, or other people—to
            reduce the mental effort required to complete a task. In the context of AI assistance, cognitive offloading occurs
            when humans delegate thinking, problem-solving, or skill-requiring work to AI systems rather than engaging with the
            task themselves [Gerlich, 2025].
          </p>
          <p className="text-slate-700">
            While offloading can improve immediate productivity, research suggests it may come at a cost: "frequent use of AI
            has been associated with worse critical thinking abilities and increased cognitive offloading" [Gerlich, 2025].
            Furthermore, "knowledge workers reported a lower cognitive effort and confidence when using generative AI tools"
            [Lee et al., 2025].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Problem It Solves (And Creates)</h2>
          <p className="text-slate-700 mb-4">
            Cognitive offloading exists because human working memory is limited. We naturally use external aids—writing
            things down, using calculators, consulting experts—to extend our cognitive capabilities. AI represents a
            powerful new form of this ancient practice.
          </p>
          <p className="text-slate-700">
            The challenge is that some cognitive load is actually beneficial for learning. When novice workers offload too
            much to AI, they may "compromise their own skill acquisition in the process" [Shen &amp; Tamkin, 2026, p. 1].
            The very errors and struggles that feel unproductive are often what build lasting competence.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Empirical Evidence</h2>
          <p className="text-slate-700 mb-4">
            Shen &amp; Tamkin (2026) conducted randomized experiments where developers learned a new Python library with
            or without AI assistance. Their findings were striking:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>17% lower quiz scores</strong> for AI-assisted participants (Cohen's d = 0.738, p = 0.010)</li>
            <li><strong>No significant time savings</strong> on average—some participants spent up to 11 minutes just composing AI queries</li>
            <li><strong>Fewer errors encountered</strong>: AI group median of 1 error vs. control group median of 3</li>
            <li><strong>Debugging skills</strong> showed the largest gap—critical for supervising AI-generated code</li>
          </ul>
          <p className="text-slate-700">
            The control group's process of "encountering and subsequently resolving errors independently" was key to their
            superior learning outcomes [Shen &amp; Tamkin, 2026, p. 3].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Apprentice and the Power Tool</h2>
          <p className="text-slate-700 mb-4">
            Imagine an apprentice carpenter learning to build furniture. A master carpenter gives them access to a CNC
            machine that can cut any piece perfectly. The apprentice has two choices:
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Path A:</strong> Program the CNC to cut all pieces. The furniture gets built quickly and perfectly.
            But years later, the apprentice still can't visualize joints, doesn't understand wood grain, and panics when
            the CNC breaks down.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Path B:</strong> Use the CNC strategically—perhaps for complex curves—while doing simpler cuts by hand.
            Ask the master to explain why certain joints work. Make mistakes, ruin some wood, learn to see the material.
            Then use the CNC to enhance already-developed skills.
          </p>
          <p className="text-slate-700">
            AI assistance works the same way. The tool isn't the problem—it's whether you're building skills alongside
            using it, or substituting the tool for skills you never develop.
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <CognitiveOffloadingExercise />

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Implications for AI Safety</h2>
          <p className="text-slate-700 mb-4">
            Cognitive offloading has serious implications for the oversight of AI systems. As Shen &amp; Tamkin note:
          </p>
          <blockquote className="border-l-4 border-violet-500 pl-4 italic text-slate-600 my-4">
            "As AI development progresses, the problem of supervising more and more capable AI systems becomes more
            difficult if humans have weaker abilities to understand code" [Shen &amp; Tamkin, 2026, p. 1].
          </blockquote>
          <p className="text-slate-700">
            If workers develop their skills with heavy AI assistance, they may lack the competencies needed to verify,
            debug, and supervise AI-generated outputs—creating a concerning feedback loop where humans become less
            capable of overseeing increasingly capable AI systems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Preserving Learning While Using AI</h2>
          <p className="text-slate-700 mb-4">
            The research identifies patterns that preserve learning even with AI assistance:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Ask for explanations, not just code:</strong> Request that AI explain its reasoning alongside any generated output</li>
            <li><strong>Use AI for concepts, solve problems yourself:</strong> Ask AI conceptual questions but implement solutions independently</li>
            <li><strong>Verify understanding after generation:</strong> If AI generates code, ask follow-up questions to ensure you understand it</li>
            <li><strong>Embrace productive struggle:</strong> Try to solve problems and encounter errors before turning to AI</li>
          </ul>
          <p className="text-slate-700">
            Major AI providers have begun offering learning-focused modes (e.g., ChatGPT Study Mode, Claude's explanatory mode)
            that encourage these patterns [Shen &amp; Tamkin, 2026, p. 20].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li><Link to="/wiki/ai-alignment" className="text-blue-600 hover:text-blue-800 underline">AI Alignment</Link> - The challenge of ensuring AI systems behave in accordance with human values</li>
            <li><Link to="/wiki/rlhf" className="text-blue-600 hover:text-blue-800 underline">RLHF</Link> - Training AI to be helpful while maintaining safety</li>
            <li><Link to="/wiki/transfer-learning" className="text-blue-600 hover:text-blue-800 underline">Transfer Learning</Link> - How skills and knowledge transfer between domains</li>
            <li><Link to="/wiki/few-shot-learning" className="text-blue-600 hover:text-blue-800 underline">Few-Shot Learning</Link> - Learning from limited examples</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
