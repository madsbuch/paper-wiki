import { useEffect, useState } from 'react';
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

function MultiAgentExercise() {
  const [agents, setAgents] = useState([
    { id: 'A', x: 20, y: 50, role: 'Explorer', message: '' },
    { id: 'B', x: 50, y: 50, role: 'Validator', message: '' },
    { id: 'C', x: 80, y: 50, role: 'Critic', message: '' },
  ]);
  const [problem] = useState("What is 24 ÷ (8 - 2)?");
  const [step, setStep] = useState(0);
  const [solution, setSolution] = useState<string | null>(null);

  const messages = [
    { agent: 'A', text: "Let me try: 8 - 2 = 6, then 24 ÷ 6 = 4" },
    { agent: 'B', text: "Checking: 4 × 6 = 24 ✓ The math is correct." },
    { agent: 'C', text: "Wait—did we handle order of operations? Parentheses first..." },
    { agent: 'B', text: "Yes, (8-2) was computed first. The answer 4 is verified." },
  ];

  const nextStep = () => {
    if (step < messages.length) {
      const msg = messages[step];
      setAgents(agents.map(a => ({
        ...a,
        message: a.id === msg.agent ? msg.text : a.message
      })));
      setStep(step + 1);
      if (step === messages.length - 1) {
        setSolution("4");
      }
    }
  };

  const reset = () => {
    setAgents(agents.map(a => ({ ...a, message: '' })));
    setStep(0);
    setSolution(null);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Exercise: Watch Agents Collaborate</h2>
      <p className="text-slate-700 mb-4">
        Click "Next Step" to see how three agents with different roles collaborate to solve a math problem.
        Notice how each agent contributes something the others can't provide alone.
      </p>

      <div className="bg-slate-50 p-4 rounded-lg mb-4">
        <p className="font-medium text-slate-900">Problem: {problem}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {agents.map(agent => (
          <div
            key={agent.id}
            className={`p-4 rounded-lg border-2 ${
              agent.message ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="font-bold text-slate-900">{agent.role}</div>
            <div className="text-xs text-slate-500 mb-2">Agent {agent.id}</div>
            {agent.message && (
              <div className="text-sm text-slate-700 italic">"{agent.message}"</div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={nextStep}
          disabled={step >= messages.length}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Next Step ({step}/{messages.length})
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
        >
          Reset
        </button>
      </div>

      {solution && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">
            ✓ Solution verified: {solution}
          </p>
          <p className="text-green-700 text-sm mt-1">
            The Explorer proposed a solution, the Validator checked the arithmetic, and the Critic
            verified the reasoning approach. This division of cognitive labor is exactly what
            "societies of thought" do inside reasoning models like DeepSeek-R1.
          </p>
        </div>
      )}
    </section>
  );
}

const meta: WikiMeta = {
  title: "Multi-Agent Systems",
  description: "Computational systems composed of multiple autonomous agents that interact to solve problems that are difficult for individual agents.",
  category: "AI Architecture",
  difficulty: "Intermediate",
  tags: ["distributed-ai", "cooperation", "coordination", "autonomous-agents", "reasoning"],
  relatedConcepts: ["society-of-mind", "chain-of-thought-prompting", "reasoning-steps"],
  citations: [
    {
      paper: "An Introduction to MultiAgent Systems",
      authors: "Wooldridge, M.",
      year: "2009",
      pages: "1-484"
    },
    {
      paper: "Reasoning Models Generate Societies of Thought",
      authors: "Kim, J., Lai, S., Scherrer, N., Agüera y Arcas, B., & Evans, J.",
      year: "2025",
      pages: "1-17"
    },
    {
      paper: "Improving Factuality and Reasoning in Language Models through Multiagent Debate",
      authors: "Du, Y., Li, S., Torralba, A., Tenenbaum, J. B., & Mordatch, I.",
      year: "2023",
      pages: "1-27"
    }
  ]
};

export default function MultiAgentSystems() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error('MathJax typesetting failed:', err)
      );
    }
  }, []);

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            A multi-agent system (MAS) is a computational system composed of multiple autonomous
            agents that interact within an environment to achieve individual or collective goals
            [Wooldridge, 2009, p. 3]. Each agent perceives its environment, makes decisions, and
            takes actions, while the emergent behavior of the system arises from agent interactions
            rather than centralized control.
          </p>
          <p className="text-slate-700">
            In the context of large language models, research has shown that reasoning models
            like DeepSeek-R1 implicitly develop multi-agent-like internal structures during training,
            where distinct "perspectives" with different personality traits and expertise debate
            and collaborate to solve problems [Kim et al., 2025].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Problem It Solves</h2>
          <p className="text-slate-700 mb-4">
            Many real-world problems are too complex or distributed for a single agent to solve
            effectively. Consider challenges like coordinating a fleet of delivery robots, diagnosing
            a complex medical case, or reasoning through a multi-step mathematical proof. These
            problems benefit from multiple specialized perspectives that can:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>Divide labor according to expertise</li>
            <li>Provide checks and balances against errors</li>
            <li>Explore diverse solution paths in parallel</li>
            <li>Catch blind spots that a single perspective might miss</li>
          </ul>
          <p className="text-slate-700">
            Single-agent approaches often suffer from "sycophancy"—following misleading initial
            assumptions without meaningful disagreement. Multi-agent debate helps avoid this echo
            chamber effect [Kim et al., 2025].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-700 mb-4">
            Multi-agent systems are characterized by several key properties:
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-2">Agent Architecture</h3>
          <p className="text-slate-700 mb-4">
            Each agent typically has:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li><strong>Perception</strong>: Sensing the environment and other agents</li>
            <li><strong>Reasoning</strong>: Processing information and making decisions</li>
            <li><strong>Action</strong>: Executing behaviors that affect the environment</li>
            <li><strong>Communication</strong>: Exchanging information with other agents</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-2">Interaction Patterns</h3>
          <p className="text-slate-700 mb-4">
            Agents can interact through:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li><strong>Cooperation</strong>: Working together toward shared goals</li>
            <li><strong>Competition</strong>: Pursuing conflicting objectives</li>
            <li><strong>Debate</strong>: Arguing positions to refine solutions</li>
            <li><strong>Coordination</strong>: Synchronizing actions without explicit cooperation</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-2">Emergent Multi-Agent Reasoning in LLMs</h3>
          <p className="text-slate-700 mb-4">
            Recent research has discovered that reasoning-optimized language models spontaneously
            develop multi-agent-like behaviors. In DeepSeek-R1, reasoning traces exhibit:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700">
            <li><strong>Question-answering sequences</strong>: Internal Q&A dialogue</li>
            <li><strong>Perspective shifts</strong>: Switching between different viewpoints</li>
            <li><strong>Conflicts of perspectives</strong>: Explicit disagreement and correction</li>
            <li><strong>Reconciliation</strong>: Integrating conflicting views into coherent solutions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Editorial Board</h2>
          <p className="text-slate-700 mb-4">
            Think of a newspaper's editorial board deciding on a controversial opinion piece.
            The board includes people with different backgrounds: a legal expert who checks for
            liability, a fact-checker who verifies claims, a senior editor who considers the
            publication's reputation, and a junior editor who represents reader perspectives.
          </p>
          <p className="text-slate-700 mb-4">
            No single person could do all these jobs well. The legal expert might miss reader
            appeal; the junior editor might miss legal risks. But together, through structured
            debate—each person pushing back on the others, asking "wait, have you considered..."—
            the board produces something better than any individual could.
          </p>
          <p className="text-slate-700">
            This is exactly what happens inside reasoning models. When DeepSeek-R1 tackles a
            hard problem, it doesn't just think in a straight line. Instead, distinct internal
            "voices" emerge—one that proposes solutions, one that checks them, one that challenges
            assumptions—and their interaction produces more reliable answers than monologue-style
            reasoning [Kim et al., 2025].
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <MultiAgentExercise />

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact</h2>
          <p className="text-slate-700 mb-4">
            Multi-agent systems have been applied across many domains: robotics, economics,
            distributed computing, and now AI reasoning. Research on multi-agent debate in
            LLMs has shown that having multiple models argue about a problem improves factuality
            and reasoning [Du et al., 2023].
          </p>
          <p className="text-slate-700">
            The discovery that reasoning models spontaneously develop internal multi-agent
            structure suggests that this pattern may be fundamental to effective reasoning.
            When steering experiments amplify "conversational" features in DeepSeek-R1-Llama-8B,
            accuracy on the Countdown arithmetic task doubles from 27% to 55%, demonstrating
            that multi-agent-like patterns aren't just correlated with but causally linked to
            better reasoning [Kim et al., 2025].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li><a href="/wiki/society-of-mind" className="text-blue-600 hover:text-blue-800 underline">Society of Mind</a> - Minsky's theory of intelligence as emergent from agent interaction</li>
            <li><a href="/wiki/chain-of-thought-prompting" className="text-blue-600 hover:text-blue-800 underline">Chain-of-Thought Prompting</a> - Reasoning technique that may leverage implicit multi-agent patterns</li>
            <li><a href="/wiki/reasoning-steps" className="text-blue-600 hover:text-blue-800 underline">Reasoning Steps</a> - The units of inference in sequential reasoning</li>
            <li><a href="/wiki/mechanistic-interpretability" className="text-blue-600 hover:text-blue-800 underline">Mechanistic Interpretability</a> - Methods for understanding internal model structure</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
