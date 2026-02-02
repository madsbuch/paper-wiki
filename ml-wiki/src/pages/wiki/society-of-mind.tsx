import { useEffect, useState } from 'react';
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

function AgentExercise() {
  const [agents, setAgents] = useState([
    { id: 1, name: "Critic", active: true, opinion: "This approach seems risky" },
    { id: 2, name: "Builder", active: false, opinion: "Let's try a concrete solution" },
    { id: 3, name: "Skeptic", active: false, opinion: "Wait, have we verified this?" },
    { id: 4, name: "Synthesizer", active: false, opinion: "We can combine both ideas" },
  ]);
  const [problem] = useState("How should we organize a complex codebase?");
  const [discussion, setDiscussion] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  const activateAgent = (id: number) => {
    setAgents(agents.map(a => ({ ...a, active: a.id === id })));
    const agent = agents.find(a => a.id === id);
    if (agent) {
      setDiscussion([...discussion, `${agent.name}: "${agent.opinion}"`]);
      setStep(step + 1);
    }
  };

  const reset = () => {
    setDiscussion([]);
    setStep(0);
    setAgents(agents.map(a => ({ ...a, active: a.id === 1 })));
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Exercise: Orchestrating a Society of Agents</h2>
      <p className="text-slate-700 mb-4">
        Click on different "agents" to see how diverse perspectives contribute to solving a problem.
        Notice how each agent brings a different viewpoint that the others might miss.
      </p>

      <div className="bg-slate-50 p-4 rounded-lg mb-4">
        <p className="font-medium text-slate-900 mb-2">Problem: {problem}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {agents.map(agent => (
          <button
            key={agent.id}
            onClick={() => activateAgent(agent.id)}
            className={`p-3 rounded-lg border-2 text-left transition-colors ${
              agent.active
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="font-medium text-slate-900">{agent.name}</div>
            <div className="text-sm text-slate-600">{agent.opinion}</div>
          </button>
        ))}
      </div>

      {discussion.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-slate-900 mb-2">Discussion ({step} turns)</h3>
          {discussion.map((line, i) => (
            <p key={i} className="text-slate-700 text-sm mb-1">{line}</p>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={reset}
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
        >
          Reset
        </button>
      </div>

      {step >= 3 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">
            Great! You've engaged multiple perspectives. In Minsky's Society of Mind, intelligence
            emerges from the interaction of many such specialized agents, each contributing their
            unique viewpoint to solve problems that none could handle alone.
          </p>
        </div>
      )}
    </section>
  );
}

const meta: WikiMeta = {
  title: "Society of Mind",
  description: "A theory that intelligence emerges from the interaction of many simple, specialized agents rather than a single unified process.",
  category: "Cognitive Architecture",
  difficulty: "Intermediate",
  tags: ["cognitive-science", "ai-theory", "multi-agent", "emergence", "reasoning"],
  relatedConcepts: ["multi-agent-systems", "chain-of-thought-prompting", "reasoning-steps"],
  citations: [
    {
      paper: "The Society of Mind",
      authors: "Minsky, M.",
      year: "1986",
      pages: "1-339"
    },
    {
      paper: "Reasoning Models Generate Societies of Thought",
      authors: "Kim, J., Lai, S., Scherrer, N., Agüera y Arcas, B., & Evans, J.",
      year: "2025",
      pages: "1-17"
    }
  ]
};

export default function SocietyOfMind() {
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
            The Society of Mind is a theory proposed by Marvin Minsky in his 1986 book of the same name,
            arguing that intelligence is not the product of a single, unified process but emerges from the
            interaction of many small, specialized "agents" that are individually mindless [Minsky, 1986, p. 17].
            Each agent performs a simple function, but through their organization and cooperation, complex
            cognitive abilities arise.
          </p>
          <p className="text-slate-700">
            This theory has gained renewed relevance in the era of large language models, where recent research
            suggests that reasoning models like DeepSeek-R1 implicitly simulate "societies of thought"—internal
            multi-agent-like interactions that enable effective problem-solving through diversity and debate
            [Kim et al., 2025].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Problem It Solves</h2>
          <p className="text-slate-700 mb-4">
            Traditional AI research often assumed that intelligence requires a single, powerful reasoning
            mechanism—a "central executive" that controls all cognitive processes. This approach struggled
            to explain how minds handle the vast diversity of problems they encounter, from perception to
            planning to social reasoning.
          </p>
          <p className="text-slate-700">
            Minsky's insight was that trying to build one unified intelligent system is the wrong approach.
            Instead, intelligence emerges from organizing many smaller, specialized processes that each handle
            specific tasks. The challenge shifts from building smart agents to organizing the interactions
            between simple ones.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-700 mb-4">
            In Minsky's framework, the mind consists of hierarchically organized agents:
          </p>

          <div className="bg-slate-50 p-4 rounded-lg mb-4 font-mono text-sm">
            <pre>{`
Higher-level agents (K-lines, frames)
    ├── Middle-level agents (memory, planning)
    │       ├── Low-level agents (feature detection)
    │       │       └── Micro-agents (sensory processing)
    │       └── ...
    └── ...
            `}</pre>
          </div>

          <p className="text-slate-700 mb-4">
            Key mechanisms include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>K-lines (Knowledge-lines)</strong>: Connections that remember which agents were active during a successful experience, allowing the mind to recreate similar mental states</li>
            <li><strong>Frames</strong>: Data structures representing stereotyped situations, with slots for expected features</li>
            <li><strong>Censors and Suppressors</strong>: Agents that prevent certain actions or thoughts based on past failures</li>
            <li><strong>Proto-specialists</strong>: Basic agents that become specialized through learning</li>
          </ul>

          <p className="text-slate-700">
            The power comes from organization: agents can cooperate, compete, suppress each other, and form
            coalitions. There is no single "self"—what we experience as unified consciousness is the outcome
            of ongoing negotiations among agents.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Committee in Your Head</h2>
          <p className="text-slate-700 mb-4">
            Imagine your mind as a company with no CEO. Instead, there's a committee of specialists: a
            risk assessor who worries about what could go wrong, a creative who generates wild ideas, a
            planner who thinks about logistics, and a critic who points out flaws. When you face a decision,
            these specialists don't sit quietly—they argue, interrupt each other, form alliances, and
            sometimes override one another.
          </p>
          <p className="text-slate-700 mb-4">
            When you're deciding whether to take a new job, the risk assessor might highlight the
            uncertainty, while the creative sees exciting possibilities. The planner works out the
            practicalities, and the critic questions everyone's assumptions. What feels like "you"
            deciding is actually the outcome of this internal debate.
          </p>
          <p className="text-slate-700">
            This maps directly to how reasoning models work: recent research shows that models like
            DeepSeek-R1 develop internal "personas" with different personality traits and expertise
            that debate with each other during reasoning, leading to better problem-solving than
            monologue-style thinking [Kim et al., 2025].
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <AgentExercise />

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact</h2>
          <p className="text-slate-700 mb-4">
            The Society of Mind theory influenced cognitive science, artificial intelligence, and
            philosophy of mind for decades. It anticipated many modern developments: multi-agent
            systems, ensemble methods in machine learning, and modular neural networks.
          </p>
          <p className="text-slate-700">
            Recent work on reasoning in large language models has found striking parallels: models
            trained via reinforcement learning spontaneously develop multi-agent-like internal
            dialogues, complete with perspective shifts, conflicts, and reconciliation. Steering
            these "conversational" features can double accuracy on reasoning tasks, suggesting that
            the society of mind isn't just a metaphor—it may be a fundamental structure that emerges
            when systems learn to reason effectively [Kim et al., 2025].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li><a href="/wiki/multi-agent-systems" className="text-blue-600 hover:text-blue-800 underline">Multi-Agent Systems</a> - Computational implementations of interacting autonomous agents</li>
            <li><a href="/wiki/chain-of-thought-prompting" className="text-blue-600 hover:text-blue-800 underline">Chain-of-Thought Prompting</a> - Technique that may implicitly leverage society-of-mind-like reasoning</li>
            <li><a href="/wiki/mechanistic-interpretability" className="text-blue-600 hover:text-blue-800 underline">Mechanistic Interpretability</a> - Methods for understanding the internal structure of neural networks</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
