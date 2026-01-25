import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import { useEffect } from "react";

export default function ArithmeticReasoning() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error("MathJax typesetting failed:", err),
      );
    }
  }, []);

  return (
    <WikiLayout
      title="Arithmetic Reasoning"
      description="The ability to solve mathematical word problems by combining mathematical operations with natural language understanding."
      category="Task"
      difficulty="Intermediate"
      citations={[
        {
          paper:
            "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
          authors: "Wei, J., Wang, X., Schuurmans, D., Bosma, M., et al.",
          year: "2022",
          pages: "1-3",
        },
      ]}
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700">
            Arithmetic reasoning is the capability to solve math word problems
            by understanding the linguistic description, extracting relevant
            numbers, and performing appropriate mathematical operations [Wei et
            al., 2022, p. 1].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Challenge
          </h2>
          <p className="text-slate-700 mb-4">
            Arithmetic reasoning is surprisingly difficult for language models
            because it requires:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Understanding natural language descriptions</li>
            <li>Identifying relevant numbers and relationships</li>
            <li>Selecting appropriate operations</li>
            <li>Performing multi-step calculations</li>
            <li>Combining linguistic and mathematical reasoning</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Chain-of-Thought Breakthrough
          </h2>
          <p className="text-slate-700">
            Chain-of-thought prompting dramatically improved arithmetic
            reasoning. On the GSM8K benchmark, PaLM 540B improved from 18% to
            57% accuracy just by showing reasoning steps [Wei et al., 2022, p.
            2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Example Problem
          </h2>
          <p className="text-slate-700 mb-4">
            "Josh decides to try flipping a house. He buys a house for $80,000
            and then puts in $50,000 in repairs. This increased the value of the
            house by 150%. How much profit did he make?"
          </p>
          <p className="text-slate-700 mb-2">
            <strong>Chain-of-thought solution:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Cost: $80,000 + $50,000 = $130,000</li>
            <li>Value increase: 150% of $80,000 = $120,000</li>
            <li>New value: $80,000 + $120,000 = $200,000</li>
            <li>Profit: $200,000 - $130,000 = $70,000</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Why Show the Steps?
          </h2>
          <p className="text-slate-700 mb-4">
            Breaking down the problem into steps allows the model to:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700">
            <li>Handle multi-step reasoning</li>
            <li>Keep track of intermediate results</li>
            <li>Apply operations in the correct order</li>
            <li>Self-correct along the way</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Beyond Simple Arithmetic
          </h2>
          <p className="text-slate-700">
            Arithmetic reasoning benchmarks test more than calculation—they test
            linguistic understanding, logical reasoning, and the ability to
            extract relevant information from text [Wei et al., 2022, p. 3].
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <p className="text-slate-700">
          <strong>Related Concepts:</strong>{" "}
          <Link
            to="/wiki/chain-of-thought-prompting"
            className="text-blue-600 hover:underline"
          >
            Chain-of-Thought Prompting
          </Link>{" "}
          ·{" "}
          <Link
            to="/wiki/reasoning-steps"
            className="text-blue-600 hover:underline"
          >
            Reasoning Steps
          </Link>{" "}
          ·{" "}
          <Link
            to="/wiki/emergent-abilities"
            className="text-blue-600 hover:underline"
          >
            Emergent Abilities
          </Link>
        </p>
      </div>
    </WikiLayout>
  );
}
