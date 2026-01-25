import { useState } from "react";
import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

function UniversalsExercise() {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const scenarios = [
    {
      id: 1,
      text: "Two electrons have the same charge",
      realistAnswer: "One universal (charge) instantiated by both",
      tropistAnswer: "Two exactly resembling charge tropes",
    },
    {
      id: 2,
      text: "Justice is a virtue",
      realistAnswer: "The universal Justice falls under the universal Virtue",
      tropistAnswer:
        "The resemblance class of justice-tropes is a subset of virtue-tropes",
    },
    {
      id: 3,
      text: "This apple caused me to see red",
      realistAnswer:
        "The apple instantiates redness, which somehow causes perception",
      tropistAnswer:
        "This apple's particular redness causally affects my visual system",
    },
  ];

  const handleSelect = (id: number, view: string) => {
    setAnswers((prev) => ({ ...prev, [id]: view }));
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        Exercise: Realist vs. Trope Explanations
      </h2>
      <p className="text-slate-700 mb-6">
        For each scenario, consider how a realist about universals and a trope
        theorist would explain it differently. Select which view you think
        provides a better explanation, then reveal the comparison.
      </p>

      <div className="space-y-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="bg-slate-50 p-4 rounded-lg border border-slate-200"
          >
            <p className="text-slate-800 font-medium mb-3">"{scenario.text}"</p>

            <div className="flex gap-3 mb-3">
              <button
                onClick={() => handleSelect(scenario.id, "realist")}
                className={`flex-1 p-2 rounded border text-sm ${
                  answers[scenario.id] === "realist"
                    ? "bg-blue-100 border-blue-500 text-blue-800"
                    : "bg-white border-slate-300 hover:border-slate-400"
                }`}
              >
                Realism better
              </button>
              <button
                onClick={() => handleSelect(scenario.id, "trope")}
                className={`flex-1 p-2 rounded border text-sm ${
                  answers[scenario.id] === "trope"
                    ? "bg-green-100 border-green-500 text-green-800"
                    : "bg-white border-slate-300 hover:border-slate-400"
                }`}
              >
                Tropes better
              </button>
            </div>

            {answers[scenario.id] && (
              <div className="text-sm space-y-2 mt-3 pt-3 border-t border-slate-200">
                <p>
                  <strong className="text-blue-700">Realist:</strong>{" "}
                  {scenario.realistAnswer}
                </p>
                <p>
                  <strong className="text-green-700">Trope theorist:</strong>{" "}
                  {scenario.tropistAnswer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {Object.keys(answers).length === scenarios.length && (
        <div className="mt-6 p-4 bg-amber-50 rounded-lg">
          <p className="text-amber-800">
            <strong>Note:</strong> Neither view is definitively
            "better"—philosophers continue to debate these issues. The exercise
            illustrates how the same facts can be explained by different
            ontological frameworks. Many philosophers consider the debate to end
            in stalemate, with parsimony considerations slightly favoring trope
            theory.
          </p>
        </div>
      )}
    </section>
  );
}

const meta: WikiMeta = {
  title: "Universals",
  description:
    "Abstract entities that can be wholly present in multiple individuals simultaneously, proposed by realists as the ground of objective similarities.",
  category: "Metaphysics",
  difficulty: "Intermediate",
  tags: ["metaphysics", "properties", "realism", "ontology", "philosophy"],
  relatedConcepts: ["tropes", "nominalism"],
  citations: [
    {
      paper: "Universals: An Opinionated Introduction",
      authors: "Armstrong, D. M.",
      year: "1989",
      pages: "1-131",
    },
    {
      paper: "On the Elements of Being: I",
      authors: "Williams, D. C.",
      year: "1953",
      pages: "3-18",
    },
    {
      paper:
        "Structure and the Metaphysics of Mind: How Hylomorphism Solves the Mind-Body Problem",
      authors: "Jaworski, W.",
      year: "2016",
      pages: "Chapter 3",
    },
    {
      paper: "Metaphysics: A Contemporary Introduction",
      authors: "Loux, M. J.",
      year: "2006",
      pages: "31-36",
    },
  ],
};

export default function Universals() {
  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            Universals are <strong>"repeatable" entities</strong> that can be
            instantiated by and thereby be wholly present in diverse individuals
            [Loux 2006]. According to realists about universals, when two apples
            are both red, there is numerically one and the same entity—the
            universal <em>redness</em>—that both apples instantiate. As
            Aristotle put it, a universal is a "one-in-many."
          </p>
          <p className="text-slate-700 mb-4">
            This view stands in contrast to nominalism, which denies that there
            are universals. The central motivation for positing universals is to
            explain objective similarities: what grounds the fact that different
            things can share the same property? Realists answer that they
            literally share something—a universal.
          </p>
          <p className="text-slate-700">
            Major defenders of realism about universals include Plato, Aristotle
            (with important qualifications), Bertrand Russell, and David
            Armstrong. The theory remains one of the two dominant accounts of
            properties in contemporary analytic metaphysics, alongside trope
            theory.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Problem Universals Solve
          </h2>
          <p className="text-slate-700 mb-4">
            Properties are supposed to account for objective similarities and
            differences among things. When we say both apples are red, we're
            reporting a real similarity—not just a linguistic convention.
            Realists argue this similarity demands explanation: <em>why</em> are
            both apples red?
          </p>
          <p className="text-slate-700">
            The realist's answer is elegant: both apples instantiate the same
            universal. The similarity is grounded in numerical identity—not mere
            resemblance, but literal sharing of a common element. This provides
            what many philosophers consider the most robust explanation of
            qualitative sameness.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How Universals Work
          </h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">
            Instantiation
          </h3>
          <p className="text-slate-700 mb-4">
            The key relation in realist theories is{" "}
            <strong>instantiation</strong>—the relation between a particular and
            a universal. When we say "this apple is red," the realist analyzes
            this as: this apple <em>instantiates</em> the universal redness. The
            universal is not located at the apple's position in the way physical
            parts are; rather, it is "wholly present" wherever it is
            instantiated.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">
            Platonic vs. Aristotelian Universals
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Platonic realism</strong> holds that universals exist
            independently of their instances, in a separate realm of abstract
            objects. On this view, redness would exist even if nothing red
            existed. <strong>Aristotelian realism</strong> (or immanent realism)
            holds that universals exist only in their instances—there are no
            uninstantiated universals. Armstrong [1978, 1989] defends an
            Aristotelian view.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">
            Abstract Reference
          </h3>
          <p className="text-slate-700 mb-4">
            For realists, abstract nouns like "redness" and "justice" refer
            directly to universals. When we say "Redness is a color," we're
            stating a relation between two universals: the universal redness
            falls under the universal coloredness. This provides a
            straightforward semantics for abstract discourse.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Objections to Universals
          </h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">
            1. Location Problem
          </h3>
          <p className="text-slate-700 mb-4">
            How can one thing be wholly present in multiple locations
            simultaneously? If apple A is in New York and apple B is in London,
            and both instantiate redness, then redness is wholly present in both
            places at once. This seems to violate our ordinary understanding of
            location [Campbell 1990, Heil 2003].
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">
            2. Bradley's Regress
          </h3>
          <p className="text-slate-700 mb-4">
            If "A is red" is true because A instantiates redness, what makes "A
            instantiates redness" true? If the answer involves another
            instantiation relation, we face an infinite regress [Loux 2006].
            While realists have responses (treating instantiation as primitive),
            critics argue these are ad hoc.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">
            3. Ontological Extravagance
          </h3>
          <p className="text-slate-700 mb-4">
            Realism posits both particulars and universals as fundamental
            categories. Nominalists argue this violates Ockham's razor: if we
            can explain similarity with particulars alone (through resemblance),
            why posit a second category of entities? [Jaworski 2016]
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">
            4. States of Affairs
          </h3>
          <p className="text-slate-700 mb-4">
            Armstrong [1989, 1997] argues that universals plus individuals
            aren't enough for truthmaking—we also need{" "}
            <strong>states of affairs</strong> (A's being red) as additional
            entities. This further inflates the ontology.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Shared Blueprint Analogy
          </h2>
          <p className="text-slate-700 mb-4">
            Imagine an architect creates a blueprint for a house. The same
            blueprint can be used to build houses in New York, Tokyo, and Paris.
            In some sense, all three houses "share" the blueprint—they're all
            instances of the same design.
          </p>
          <p className="text-slate-700 mb-4">
            For a realist about universals, properties work similarly. The
            universal "redness" is like a cosmic blueprint that gets
            instantiated whenever something is red. Just as the Tokyo house and
            the Paris house share the <em>same</em> blueprint (not just similar
            ones), two red apples share the
            <em> same</em> redness (not just resembling rednesses).
          </p>
          <p className="text-slate-700 mb-4">
            The trope theorist, by contrast, would say each house has its own
            copy of the blueprint. The copies might be identical in content, but
            they're numerically distinct documents. Similarly, each apple has
            its own redness that happens to exactly resemble the other's.
          </p>
          <p className="text-slate-700">
            The debate turns on whether genuine similarity requires numerical
            identity of a shared element (the realist view) or whether exact
            resemblance between distinct particulars suffices (the trope view).
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <UniversalsExercise />

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact</h2>
          <p className="text-slate-700 mb-4">
            Realism about universals has been one of the dominant positions in
            metaphysics from ancient Greece to the present day. Plato's theory
            of Forms set the agenda for much of Western philosophy, and the
            debate between realists and nominalists has been called one of the
            most enduring disputes in the history of philosophy.
          </p>
          <p className="text-slate-700">
            In contemporary philosophy, Armstrong's systematic defense of
            immanent universals [1978, 1989, 1997] reinvigorated the debate. His
            work on laws of nature, causation, and truthmaking relies heavily on
            universals. The realist framework continues to influence philosophy
            of science (what are natural kinds?), philosophy of mathematics
            (what are numbers?), and metaethics (what is goodness?).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Related Concepts
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>
              <Link
                to="/wiki/tropes"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Tropes
              </Link>{" "}
              - The main rival: properties as unrepeatable particulars
            </li>
            <li>
              <Link
                to="/wiki/nominalism"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Nominalism
              </Link>{" "}
              - The denial that universals exist
            </li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
