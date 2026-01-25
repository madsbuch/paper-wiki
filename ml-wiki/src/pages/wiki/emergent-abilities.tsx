import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import { useEffect } from "react";

export default function EmergentAbilities() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error("MathJax typesetting failed:", err),
      );
    }
  }, []);

  return (
    <WikiLayout
      title="Emergent Abilities"
      description="Capabilities that arise in large language models at sufficient scale but are not present in smaller models."
      category="Phenomenon"
      difficulty="Advanced"
      citations={[
        {
          paper:
            "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
          authors: "Wei, J., Wang, X., Schuurmans, D., Bosma, M., et al.",
          year: "2022",
          pages: "3",
        },
      ]}
    >
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700">
            Emergent abilities are capabilities that suddenly appear in language
            models when they reach sufficient scale, but are absent in smaller
            models [Wei et al., 2022, p. 3].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Scaling Phenomenon
          </h2>
          <p className="text-slate-700 mb-4">
            As models grow from millions to billions to hundreds of billions of
            parameters, new abilities emerge that weren't explicitly trained
            for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Multi-step reasoning</li>
            <li>Following complex instructions</li>
            <li>Solving math word problems</li>
            <li>Performing analogical reasoning</li>
          </ul>
          <p className="text-slate-700">
            These abilities aren't present in smaller models—they emerge at
            scale [Wei et al., 2022, p. 3].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Chain-of-Thought as Emergent
          </h2>
          <p className="text-slate-700">
            Chain-of-thought reasoning is a prime example of emergence. Models
            below ~100B parameters show no benefit from chain-of-thought
            prompting. But at 100B+ parameters, the ability suddenly appears
            [Wei et al., 2022, p. 3].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Mystery of Emergence
          </h2>
          <p className="text-slate-700 mb-4">
            Why do these abilities emerge? We don't fully understand, but
            theories include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Models cross a capability threshold</li>
            <li>Sufficient capacity to represent complex patterns</li>
            <li>Combination of simpler skills learned at scale</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            A Phase Transition Analogy
          </h2>
          <p className="text-slate-700">
            Think of water freezing. As temperature drops, nothing happens...
            until suddenly at 0°C, the entire structure changes from liquid to
            solid. Emergent abilities work similarly—models gradually improve
            until suddenly, at a certain scale, a new capability appears.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Implications
          </h2>
          <p className="text-slate-700 mb-4">
            Emergent abilities suggest that:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>Scaling continues to unlock new capabilities</li>
            <li>We can't predict all abilities from small-scale experiments</li>
            <li>
              There may be more capabilities waiting at even larger scales
            </li>
          </ul>
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
            to="/wiki/few-shot-learning"
            className="text-blue-600 hover:underline"
          >
            Few-Shot Learning
          </Link>{" "}
          ·{" "}
          <Link
            to="/wiki/reasoning-steps"
            className="text-blue-600 hover:underline"
          >
            Reasoning Steps
          </Link>
        </p>
      </div>
    </WikiLayout>
  );
}
