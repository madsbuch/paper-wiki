import { useState } from 'react';
import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

function TropeExercise() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = "Apple A and Apple B are both red and both round. According to trope theory, how many properties exist in this scenario?";

  const options = [
    { id: 1, text: "2 properties (redness and roundness)", isCorrect: false },
    { id: 2, text: "4 properties (A's redness, B's redness, A's roundness, B's roundness)", isCorrect: true },
    { id: 3, text: "1 property (the universal 'being colored and shaped')", isCorrect: false },
    { id: 4, text: "Infinitely many properties", isCorrect: false }
  ];

  const handleSelect = (id: number) => {
    setSelectedAnswer(id);
    setShowFeedback(true);
  };

  const selectedOption = options.find(o => o.id === selectedAnswer);

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Exercise: Counting Tropes</h2>
      <p className="text-slate-700 mb-6">
        Test your understanding of what makes tropes different from universals.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <p className="text-slate-800 font-medium mb-4">{question}</p>

        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedAnswer === option.id
                  ? option.isCorrect
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-red-100 border-red-500 text-red-800'
                  : 'bg-white border-slate-300 hover:border-slate-400 text-slate-700'
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>

        {showFeedback && selectedOption && (
          <div className={`mt-4 p-4 rounded-lg ${selectedOption.isCorrect ? 'bg-green-50' : 'bg-amber-50'}`}>
            {selectedOption.isCorrect ? (
              <p className="text-green-800">
                <strong>Correct!</strong> According to trope theory, each property instance is numerically distinct.
                Apple A's redness is a different particular from Apple B's redness, even though they exactly resemble
                each other. The same goes for their roundness. This is the key difference from universals, where
                there would be just one redness shared by both apples.
              </p>
            ) : (
              <p className="text-amber-800">
                <strong>Not quite.</strong> Remember that tropes are <em>particularized</em> properties. Each apple
                has its own individual redness and its own individual roundness. The redness of Apple A is numerically
                distinct from the redness of Apple B, even though they exactly resemble each other. Try again!
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

const meta: WikiMeta = {
  title: "Tropes",
  description: "Particularized properties that belong to individual objects, as opposed to universals that can be shared across multiple objects.",
  category: "Metaphysics",
  difficulty: "Intermediate",
  tags: ["metaphysics", "properties", "nominalism", "ontology", "philosophy"],
  relatedConcepts: ["universals", "nominalism"],
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
      paper: "Four-Category Ontology: A Metaphysical Foundation for Natural Science",
      authors: "Lowe, E. J.",
      year: "2006",
      pages: "15, 91-92"
    },
    {
      paper: "Abstract Particulars",
      authors: "Campbell, K.",
      year: "1990",
      pages: "14-15, 354-355"
    }
  ]
};

export default function Tropes() {
  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700 mb-4">
            Tropes are <strong>particularized properties</strong>, also called "unit properties," "property instances,"
            "individual accidents," or "modes." Each trope is a particular way that an individual thing can be
            [Jaworski 2016, Lowe 2006]. Unlike universals, which are "repeatable" entities that can be wholly present
            in multiple individuals simultaneously, tropes are unrepeatable particulars tied to specific objects.
          </p>
          <p className="text-slate-700 mb-4">
            Consider two qualitatively identical red apples. A realist about universals would say there is one
            universal—redness—that both apples instantiate. A trope theorist denies this. Instead, apple A has
            <em> its own</em> redness, and apple B has <em>its own</em> redness. These are two numerically distinct
            properties that happen to exactly resemble each other.
          </p>
          <p className="text-slate-700">
            The similarity between the apples isn't explained by them sharing something identical; it's explained
            by their tropes being exactly resembling particulars—just as we might say a father and son have "the
            same nose" without meaning there's literally one nose between them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Problem Tropes Solve</h2>
          <p className="text-slate-700 mb-4">
            The debate between trope theory and realism about universals centers on how to explain objective
            similarities and differences among things. When we say "both apples are red," what makes this true?
            Realists posit universals—abstract entities wholly present in multiple locations. But this raises
            puzzles: How can one thing be wholly present in multiple places? What relates universals to their
            instances?
          </p>
          <p className="text-slate-700">
            Trope theory offers an alternative that maintains ontological parsimony while still taking properties
            seriously. It explains similarity through resemblance between particulars rather than identity of
            shared universals, sidestepping many traditional problems while providing an account of properties
            that meshes well with our understanding of causation and perception.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How Trope Theory Works</h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">Core Claims</h3>
          <p className="text-slate-700 mb-4">
            Trope theory makes several key claims about the nature of properties:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Particularity:</strong> Properties are particulars, not universals. Each property instance is numerically distinct.</li>
            <li><strong>Resemblance:</strong> Similarity between objects is explained by exact resemblance between their tropes, not by sharing identical universals.</li>
            <li><strong>Nontransferability:</strong> A trope belongs necessarily to its bearer. Apple A's redness cannot "migrate" to apple B.</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">Abstract Reference</h3>
          <p className="text-slate-700 mb-4">
            What do abstract nouns like "redness" refer to if not universals? According to the most common
            trope-theoretic account, they refer to <strong>resemblance classes</strong> of tropes. When we say
            "Redness is a color," we're saying that the resemblance class of red tropes is a subset of the
            resemblance class of color tropes [Williams 1953, Campbell 1990].
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">Tropes and Substance</h3>
          <p className="text-slate-700 mb-4">
            Many trope theorists combine tropes with a <strong>bundle theory</strong> of substance, holding that
            objects are nothing but bundles of compresent tropes. However, one can also maintain a
            <strong> substance-attribute ontology</strong> with tropes, holding that there are both substances
            (individual things) and their tropes (particular ways those things are). Jaworski [2016] defends
            this latter view, following Martin [1980, 2007], Molnar [2003], and Heil [2003].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Arguments for Trope Theory</h2>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">1. The Particularity of Causation</h3>
          <p className="text-slate-700 mb-4">
            Causal relations are relations between particulars. When you see a flower's redness, there's a causal
            relationship between you and <em>this</em> flower's redness—not some abstract universal that's also
            present in other flowers. As Lowe [2006] observes, in perceiving this flower's color, you cannot be
            said to perceive the color of any other flower. Trope theory provides the most straightforward account
            of this particularity.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">2. Ontological Parsimony</h3>
          <p className="text-slate-700 mb-4">
            Nominalism posits fewer basic types of entities than realism: particulars only, versus particulars
            plus universals. Ockham's razor suggests we should favor the more parsimonious theory if it can do
            the same theoretical work. Armstrong [1989] acknowledged that resemblance classes of tropes can
            correspond one-to-one with instantiated universals, doing the same work without the ontological cost.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">3. Avoiding States of Affairs</h3>
          <p className="text-slate-700 mb-4">
            Realists like Armstrong need to posit <strong>states of affairs</strong> as additional entities to
            serve as truthmakers. If universals are only contingently related to their instances, what makes it
            true that apple A is red? Trope theorists avoid this problem because tropes are nontransferable—A's
            redness <em>necessarily</em> belongs to A, so the trope itself suffices as truthmaker.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Two Coins Analogy</h2>
          <p className="text-slate-700 mb-4">
            Imagine you have two newly minted coins of the same denomination. They look absolutely identical—same
            size, same color, same weight, same design. A realist about universals would say these coins share
            properties: there's one "copperness" they both have, one "circular shape" they both instantiate.
          </p>
          <p className="text-slate-700 mb-4">
            But think about what happens when you scratch one coin. Only <em>that</em> coin's surface is damaged.
            If both coins literally shared the same surface properties, scratching one should scratch both! The
            fact that each coin can be individually marked shows that each has its <em>own</em> surface, its
            <em>own</em> color, its <em>own</em> shape.
          </p>
          <p className="text-slate-700 mb-4">
            This is the trope theorist's insight: properties are like coins' surfaces, not like a shared bank
            account. Two people can have matching balances in separate accounts (resembling tropes) without
            sharing a single joint account (a universal). The resemblance is real, but it doesn't require identity.
          </p>
          <p className="text-slate-700">
            When we say the coins "have the same color," we mean what we mean when we say twins "have the same
            face"—not that there's one face between them, but that their individual faces closely resemble each other.
          </p>
        </section>

        <hr className="my-8 border-slate-300" />

        <TropeExercise />

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact</h2>
          <p className="text-slate-700 mb-4">
            Trope theory has become a major position in contemporary analytic metaphysics. Even David Armstrong,
            one of the foremost defenders of universals, came to regard trope theory as "a close second to the
            first choice" [Armstrong 1989]. The theory provides the metaphysical foundation for various
            philosophical projects, including Jaworski's hylomorphic approach to the mind-body problem and
            accounts of causation, perception, and events.
          </p>
          <p className="text-slate-700">
            Beyond metaphysics proper, trope theory has implications for philosophy of mind (allowing event
            identity without property identity), philosophy of science (grounding laws of nature), and even
            semantics (explaining predication and abstract reference). The debate between tropes and universals
            remains one of the central disputes in contemporary ontology.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li><Link to="/wiki/universals" className="text-blue-600 hover:text-blue-800 underline">Universals</Link> - The main rival theory: properties as repeatable abstract entities</li>
            <li><Link to="/wiki/nominalism" className="text-blue-600 hover:text-blue-800 underline">Nominalism</Link> - The broader view that only particulars exist</li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
