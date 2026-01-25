import { useState } from 'react';
import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

function NominalismExercise() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const types = [
    {
      id: 'extreme',
      name: 'Extreme Nominalism',
      description: 'Only concrete individuals exist',
      example: '"Red" is just a word we apply to certain individuals. What makes them red is nothing more than our linguistic practice.',
      challenge: 'Struggles to explain objective similarities—why do we group these things together rather than others?'
    },
    {
      id: 'class',
      name: 'Class Nominalism',
      description: 'Individuals and classes of individuals exist',
      example: '"Redness" refers to the class of all red things. To be red is to be a member of this class.',
      challenge: 'Classes seem too abundant (any arbitrary collection forms a class) and too coarse-grained for natural properties.'
    },
    {
      id: 'trope',
      name: 'Trope Theory (Moderate Nominalism)',
      description: 'Individuals and abstract particulars (tropes) exist',
      example: '"Redness" refers to a resemblance class of tropes. Each red thing has its own particular redness that resembles others.',
      challenge: 'Must take resemblance as primitive; critics say this needs explanation just as much as similarity does.'
    }
  ];

  const handleSelect = (id: string) => {
    setSelectedType(id);
    setShowExplanation(true);
  };

  const selected = types.find(t => t.id === selectedType);

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Exercise: Varieties of Nominalism</h2>
      <p className="text-slate-700 mb-6">
        Nominalism comes in different forms depending on what entities it accepts beyond concrete individuals.
        Select each type to explore its commitments and challenges.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`p-4 rounded-lg border text-left transition-colors ${
              selectedType === type.id
                ? 'bg-blue-50 border-blue-500'
                : 'bg-white border-slate-300 hover:border-slate-400'
            }`}
          >
            <h4 className="font-semibold text-slate-800">{type.name}</h4>
            <p className="text-sm text-slate-600 mt-1">{type.description}</p>
          </button>
        ))}
      </div>

      {showExplanation && selected && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-slate-800 mb-2">{selected.name}</h4>
          <p className="text-slate-700 mb-3">
            <strong>How it explains "This apple is red":</strong> {selected.example}
          </p>
          <p className="text-slate-700">
            <strong>Main challenge:</strong> {selected.challenge}
          </p>
        </div>
      )}

      {selectedType && (
        <div className="mt-4 p-4 bg-amber-50 rounded-lg">
          <p className="text-amber-800 text-sm">
            <strong>Note:</strong> Jaworski [2016] argues that trope theory combines the strengths of both
            nominalism (everything is particular) and realism (properties are real) while avoiding their
            weaknesses. It provides ontologically robust explanations without positing universals.
          </p>
        </div>
      )}
    </section>
  );
}

const meta: WikiMeta = {
  title: "Nominalism",
  description: "The view that universals do not exist; only particular things are real. Comes in extreme and moderate varieties.",
  category: "Metaphysics",
  difficulty: "Intermediate",
  tags: ["metaphysics", "properties", "ontology", "philosophy", "nominalism"],
  relatedConcepts: ["tropes", "universals"],
  citations: [
    {
      paper: "On the Elements of Being: I",
      authors: "Williams, D. C.",
      year: "1953",
      pages: "3-18"
    },
    {
      paper: "Structure and the Metaphysics of Mind: How Hylomorphism Solves the Mind-Body Problem",
      authors: "Jaworski, W.",
      year: "2016",
      pages: "Chapter 3"
    },
    {
      paper: "Universals: An Opinionated Introduction",
      authors: "Armstrong, D. M.",
      year: "1989",
      pages: "119-131"
    },
    {
      paper: "Powers: A Study in Metaphysics",
      authors: "Molnar, G.",
      year: "2003",
      pages: "23-25"
    }
  ]
};

export default function Nominalism() {
  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            Nominalism is the view that <strong>there are no universals</strong>—only particulars exist [Jaworski 2016].
            The name derives from the Latin <em>nomen</em> (name), reflecting the nominalist idea that general
            terms like "red" or "human" are merely names we apply to groups of individuals, not names of
            abstract entities that those individuals share.
          </p>
          <p className="text-slate-700 mb-4">
            Nominalism comes in different varieties depending on what particulars are admitted into one's
            ontology. <strong>Extreme nominalists</strong> posit only concrete individuals (ordinary objects).
            <strong> Moderate nominalists</strong> also posit abstract particulars such as classes [Quine 1960,
            Lewis 1983] or tropes [Williams 1953, Campbell 1990]. The common thread is denial of universals.
          </p>
          <p className="text-slate-700">
            The nominalist tradition includes medieval figures like William of Ockham and modern philosophers
            like W.V.O. Quine, Nelson Goodman, and David Lewis. Trope theory, while sometimes classified as a
            form of nominalism, occupies middle ground between traditional nominalism and realism.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Problem Nominalism Addresses</h2>
          <p className="text-slate-700 mb-4">
            Universals are "strange posits indeed," as Molnar [2003] puts it. They are supposed to be wholly
            present in multiple locations simultaneously, which conflicts with our ordinary understanding of
            how things exist in space. They require an instantiation relation that itself seems to demand
            explanation, threatening infinite regress. And they seem to multiply entities beyond necessity.
          </p>
          <p className="text-slate-700">
            Nominalists argue we can explain everything we need to explain—similarity, predication, abstract
            reference—without positing these mysterious entities. The challenge is to show that a nominalist
            ontology can do the same theoretical work as realism while remaining more parsimonious.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Varieties of Nominalism</h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">Extreme Nominalism</h3>
          <p className="text-slate-700 mb-4">
            The most austere form of nominalism admits only concrete individuals into its ontology. General
            terms like "red" don't refer to anything; they're just predicates that apply to certain individuals.
            Similarity between objects is explained by their both falling under the same predicate—but this
            explanation strikes many as insufficiently robust.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">Class Nominalism</h3>
          <p className="text-slate-700 mb-4">
            Class nominalists like Quine [1960] and Lewis [1983] identify properties with classes of individuals.
            To be red is to be a member of the class of red things. While classes are abstract objects, they're
            particulars (each class is numerically distinct from every other) rather than universals. However,
            this view faces the "coextension problem": properties that happen to apply to the same things would
            be identical, even if intuitively distinct.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">Trope Theory</h3>
          <p className="text-slate-700 mb-4">
            Trope theorists [Williams 1953, Campbell 1990, Martin 2007] posit abstract particulars that are
            particularized properties. Each red thing has its own particular redness (a trope) that exactly
            resembles the redness-tropes of other red things. This provides the ontological seriousness of
            realism (properties are real things in the world) while maintaining nominalism's commitment to
            particularity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Arguments for Nominalism</h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">1. Ockham's Razor</h3>
          <p className="text-slate-700 mb-4">
            The principle of parsimony tells us not to multiply entities beyond necessity. If nominalism can
            explain everything realism can, we should prefer the simpler ontology. As Jaworski [2016] notes,
            nominalism posits "particulars only versus particulars plus universals."
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">2. Problems with Location</h3>
          <p className="text-slate-700 mb-4">
            Universals are supposedly wholly present wherever they're instantiated. But nothing else we know
            of can be wholly present in multiple disconnected locations. This makes universals fundamentally
            mysterious in a way that particulars are not.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">3. Particularity of Causation</h3>
          <p className="text-slate-700 mb-4">
            Causal relations hold between particulars. When this flower causes me to see red, it's
            <em> this</em> flower's redness affecting <em>my</em> visual system. If properties were universals,
            perceiving this flower's color would somehow involve perceiving something shared with all red things,
            which seems wrong [Lowe 2006].
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">4. The Regress Problem</h3>
          <p className="text-slate-700 mb-4">
            If "A is red" is explained by A's instantiating redness, what explains "A instantiates redness"?
            Realists seem committed to an infinite hierarchy of instantiation relations, which nominalists avoid.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Family Resemblance Analogy</h2>
          <p className="text-slate-700 mb-4">
            Wittgenstein's notion of "family resemblance" captures the nominalist intuition well. Consider the
            members of an extended family: grandmother has the family nose, which she passed to her son, who
            passed it to his daughter. But grandmother also has the family eyes, which went to a different
            branch of the family entirely. There's no single feature that all family members share—just a
            network of overlapping similarities.
          </p>
          <p className="text-slate-700 mb-4">
            The nominalist says properties work similarly. What makes things "games"—board games, card games,
            Olympic games, children's games—isn't some universal gameness they all share. It's a network of
            resemblances: some have competition, some have rules, some are for amusement, some involve skill.
            No single feature runs through all cases.
          </p>
          <p className="text-slate-700 mb-4">
            For the trope theorist, this becomes: each game has its own particular "gamehood" (if we want to
            speak that way), and these tropes form a resemblance class. The resemblance is real, but it doesn't
            require positing an abstract universal that exists over and above the particular games.
          </p>
          <p className="text-slate-700">
            The realist retorts that if there's no universal, what grounds the resemblance? Why do we group
            <em>these</em> things together? The nominalist must either take resemblance as primitive or explain
            it in terms of something other than shared universals.
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <NominalismExercise />

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact</h2>
          <p className="text-slate-700 mb-4">
            The nominalism-realism debate is one of the oldest and most persistent in philosophy, stretching
            from Plato and Aristotle through medieval scholasticism to contemporary analytic metaphysics. The
            debate has implications for philosophy of mathematics (are numbers universals?), philosophy of
            science (what are natural kinds and laws of nature?), and metaethics (is goodness a universal?).
          </p>
          <p className="text-slate-700">
            In contemporary philosophy, the emergence of trope theory has shifted the landscape. Molnar [2003]
            argues that trope theory "recover[s] and preserve[s] the insights of both realism and nominalism"—
            it takes properties seriously as real entities (like realism) while maintaining that everything is
            particular (like nominalism). Even Armstrong, the foremost defender of universals, acknowledged
            trope theory as "a close second to the first choice" [Armstrong 1989].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li><Link to="/wiki/tropes" className="text-blue-600 hover:text-blue-800 underline">Tropes</Link> - A moderate nominalist position: properties as abstract particulars</li>
            <li><Link to="/wiki/universals" className="text-blue-600 hover:text-blue-800 underline">Universals</Link> - The realist alternative that nominalism rejects</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
