import WikiLayout from '../../components/WikiLayout';
import { useState } from 'react';

export const meta = {
  title: "Closed Categories",
  description: "Categories equipped with an internal hom-functor that internalizes the notion of morphisms between objects, providing categorical models for function types without requiring products",
  category: "Category Theory",
  tags: ["Category Theory", "Type Theory", "Semantics", "Closed Structure"],
  citations: [
    {
      paper: "Clones, closed categories, and combinatory logic",
      authors: "Saville, P.",
      year: "2024",
      pages: "13-14, 18-20"
    }
  ],
  relatedConcepts: ["abstract-clones", "combinatory-logic", "multicategories"]
};

export default function ClosedCategories() {
  const [showEval, setShowEval] = useState(false);
  const [showUniversal, setShowUniversal] = useState(false);

  return (
    <WikiLayout {...meta}>
      <section>
        <h2>Overview</h2>
        <p>
          A <strong>closed category</strong> is a category equipped with an internal notion of
          "function space" or "hom-object". This internalizes the external hom-functor C(−, =),
          allowing us to treat "the space of morphisms from A to B" as an object [A, B] within
          the category itself.
        </p>

        <p>
          Closed categories were introduced by Eilenberg and Kelly [1966] to provide categorical
          models for function types without requiring the full structure of products (cartesian structure).
          This makes them more general than cartesian closed categories [Saville, 2024, p. 13].
        </p>
      </section>

      <section>
        <h2>Definition</h2>
        <p>
          A <strong>closed multicategory</strong> M consists of:
        </p>
        <ul>
          <li>An underlying multicategory structure</li>
          <li>An <strong>internal hom</strong> functor [−, =]: |M|^op × |M| → |M|</li>
          <li>An <strong>evaluation multimap</strong> eval_A,B: [A, B], A → B for each pair of objects</li>
        </ul>

        <p>
          These must satisfy a universal property: for any multimap <code>t: Γ, A → B</code>,
          there exists a unique "curried" form <code>Λt: Γ → [A, B]</code> such that composition
          induces isomorphisms [Saville, 2024, p. 13]:
        </p>
        <div className="font-mono bg-slate-100 p-4 rounded my-3">
          M(Γ, A; B) ≅ M(Γ; [A, B])
        </div>

        <p>
          The isomorphism is given by:
        </p>
        <ul>
          <li><strong>Curry</strong>: <code>t ↦ Λt</code> (abstraction)</li>
          <li><strong>Uncurry</strong>: <code>u ↦ eval ∘ ⟨u, Id_A⟩</code> (application)</li>
        </ul>
      </section>

      <section>
        <h2>Closed Categories vs Cartesian Closed Categories</h2>
        <p>
          The key difference:
        </p>
        <ul>
          <li><strong>Closed Category</strong>: Has internal homs [A, B] and evaluation,
              but <em>no products</em></li>
          <li><strong>Cartesian Closed Category</strong>: Has internal homs [A, B], evaluation,
              <em>and finite products</em> (×)</li>
        </ul>

        <p>
          A closed category models the simply-typed λ-calculus <em>without products</em>—just
          function types and application. This is actually closer to Church's original λ-calculus
          [1940], which didn't include pairing [Saville, 2024, p. 2].
        </p>

        <div className="mt-4">
          <button
            onClick={() => setShowEval(!showEval)}
            className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 transition-colors"
          >
            {showEval ? 'Hide Example' : 'Show Evaluation Example'}
          </button>

          {showEval && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fadeIn">
              <p className="font-semibold mb-2">Example: Evaluation in Action</p>
              <p>
                Suppose we have objects A and B in a closed category. The evaluation map
                <code>eval: [A, B], A → B</code> works like function application:
              </p>
              <div className="font-mono bg-white p-3 rounded mt-2">
                eval(f, x) = f(x)
              </div>
              <p className="mt-3">
                Given a "function object" f ∈ [A, B] and an argument x ∈ A, evaluation produces
                the result f(x) ∈ B. This makes [A, B] behave like the "type of functions from A to B".
              </p>
              <p className="mt-2">
                Crucially, this works <em>without</em> needing to form pairs (f, x). The evaluation
                multimap takes <em>two separate inputs</em> rather than a single product input.
              </p>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2>Universal Property</h2>
        <p>
          The defining characteristic of closed structure is the curry-uncurry bijection.
          For any morphisms:
        </p>
        <ul>
          <li><code>t: Γ, A → B</code> (takes Γ and A as inputs)</li>
          <li><code>u: Γ → [A, B]</code> (produces a function from A to B)</li>
        </ul>

        <p>
          These correspond if and only if <code>eval ∘ ⟨u, Id_A⟩ = t</code>, where the composition
          means "apply u to get a function, then apply that function to A" [Saville, 2024, p. 13].
        </p>

        <div className="mt-4">
          <button
            onClick={() => setShowUniversal(!showUniversal)}
            className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 transition-colors"
          >
            {showUniversal ? 'Hide Diagram' : 'Show Universal Property Diagram'}
          </button>

          {showUniversal && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 animate-fadeIn">
              <p className="font-semibold mb-2">The Curry-Uncurry Correspondence</p>
              <p>
                Think of it like this: if you have a function <code>t(x, y)</code> that takes
                two arguments, you can curry it to get <code>Λt</code> which takes x and returns
                a function of y:
              </p>
              <div className="font-mono bg-white p-3 rounded mt-2">
                t: (Γ, A) → B<br />
                &nbsp;&nbsp;&nbsp;↓ curry (Λ)<br />
                Λt: Γ → [A, B]<br />
                <br />
                Going back:<br />
                (Λt)(x) = "function that sends y to t(x,y)"<br />
                eval((Λt)(x), y) = t(x, y)
              </div>
              <p className="mt-3">
                This is exactly how currying works in functional programming! The closed
                category structure makes this an <em>isomorphism</em>: you can always go
                back and forth between curried and uncurried forms without losing information.
              </p>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2>The Library Card Catalog Analogy</h2>
        <p>
          Imagine a library with a special card catalog system (this is the closed structure):
        </p>

        <h3>The Card Catalog as Internal Hom</h3>
        <p>
          For any two subjects A and B, there's a catalog drawer [A, B] containing cards
          representing "books that transform knowledge about A into knowledge about B."
          The drawer itself is a physical object in the library (an internal object in the category).
        </p>

        <h3>Evaluation as Looking Up and Reading</h3>
        <p>
          The evaluation operation <code>eval: [A, B], A → B</code> works like:
        </p>
        <ol className="ml-6 mt-2">
          <li>Go to the catalog drawer [A, B]</li>
          <li>Find a card (representing a transformation)</li>
          <li>Look up information about subject A</li>
          <li>Apply the transformation to get information about B</li>
        </ol>

        <h3>Currying as Creating Card Entries</h3>
        <p>
          If you have a process <code>t</code> that takes information from contexts Γ and A
          to produce information about B, you can create a catalog entry (Λt) in drawer [A, B]
          for context Γ. The entry says "given A, here's how to get B when you already have Γ."
        </p>

        <h3>No Index Required (No Products)</h3>
        <p>
          Notice that you don't need a "master index" that pairs catalog drawers with subjects
          (no product ×). You can navigate directly: "Give me drawer [A, B], and separately
          give me subject A, and I'll look up the result."
        </p>
      </section>

      <section>
        <h2>SK-Categories: Closed Categories for λ-Calculus</h2>
        <p>
          Traditional closed categories often require a <strong>unit object</strong> I (corresponding
          to the unit type). Saville [2024] introduces <strong>SK-categories</strong>, a variant
          of closed categories that avoids this requirement, making them precisely match the
          simply-typed λ-calculus without products [Saville, 2024, p. 18].
        </p>

        <h3>Definition of SK-Categories</h3>
        <p>
          An SK-category consists of:
        </p>
        <ul>
          <li>A category C</li>
          <li>Functors [−, =]: C^op × C → C (internal hom)</li>
          <li>A functor U: C → Set</li>
          <li>Maps S_C,D,E: [C, [D, E]] → [[C, D], [C, E]] (the S combinator)</li>
          <li>Maps K^C_D: D → [C, D] (the K combinator)</li>
          <li>Maps ε_C,D: U[C, D] × UC → UD (application)</li>
        </ul>

        <p>
          These must satisfy coherence axioms corresponding to the laws of combinatory logic.
          The functor U represents "nullary multimaps" (closed terms) [Saville, 2024, p. 18].
        </p>

        <h3>Main Result</h3>
        <p>
          Saville proves an equivalence of categories [Saville, 2024, Theorem 2]:
        </p>
        <p className="text-center font-mono bg-slate-100 p-4 rounded my-3">
          ClClone ≅ SKCat
        </p>

        <p>
          This shows that SK-categories are <em>exactly</em> the categorical models of simply-typed
          λ-calculus without products, filling a gap in the literature.
        </p>
      </section>

      <section>
        <h2>Relationship to Monoidal Categories</h2>
        <p>
          There's a beautiful parallel:
        </p>

        <table className="w-full border-collapse mt-4">
          <thead>
            <tr className="bg-slate-200">
              <th className="border p-2">Monoidal Structure</th>
              <th className="border p-2">Closed Structure</th>
              <th className="border p-2">Relationship</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Monoidal Category (C, ⊗, I)</td>
              <td className="border p-2">Closed Category (C, [−, =])</td>
              <td className="border p-2">[A, =] is right adjoint to (= ⊗ A)</td>
            </tr>
            <tr>
              <td className="border p-2">Cartesian Monoidal (C, ×, 1)</td>
              <td className="border p-2">SK-Category (C, [−, =])</td>
              <td className="border p-2">[A, =] has left adjoint (diagonal)</td>
            </tr>
            <tr>
              <td className="border p-2">Symmetric Monoidal</td>
              <td className="border p-2">Closed Symmetric Monoidal</td>
              <td className="border p-2">Closed + monoidal = linear logic</td>
            </tr>
          </tbody>
        </table>

        <p className="mt-4">
          As Saville shows, SK-categories relate to cartesian monoidal categories in the same
          way that (general) closed categories relate to (general) monoidal categories
          [Saville, 2024, Corollary 2].
        </p>
      </section>

      <section>
        <h2>Internal Language</h2>
        <p>
          The internal language of a closed multicategory is the simply-typed λ-calculus
          <strong>without products</strong>. Terms are built from:
        </p>
        <ul>
          <li><strong>Variables</strong>: x: A</li>
          <li><strong>Abstraction</strong>: λx.t has type A → B when x: A ⊢ t: B</li>
          <li><strong>Application</strong>: (t u) has type B when t: A → B and u: A</li>
        </ul>

        <p>
          The correspondence is:
        </p>
        <ul>
          <li>Type A → B corresponds to internal hom [A, B]</li>
          <li>Application (t u) corresponds to evaluation eval(t, u)</li>
          <li>Abstraction λx.t corresponds to currying Λt</li>
        </ul>

        <p>
          The β and η laws of λ-calculus correspond exactly to the curry-uncurry bijection
          [Saville, 2024, p. 14].
        </p>
      </section>

      <section>
        <h2>Historical Context</h2>
        <p>
          Closed categories were introduced by Samuel Eilenberg and G. Max Kelly in their
          1966 paper "Closed Categories". The motivation was to capture the structure of
          function spaces categorically, generalizing the closed structure found in
          topological and algebraic settings.
        </p>

        <p>
          The connection to λ-calculus was explored by Lambek and others, but as Saville
          notes, most work focused on cartesian closed categories (with products) rather
          than pure closed categories. SK-categories represent the first complete
          characterization of the simply-typed λ-calculus without products in categorical
          terms [Saville, 2024, p. 3].
        </p>
      </section>

      <section>
        <h2>Applications</h2>
        <ul>
          <li><strong>Semantics of λ-calculus</strong>: Providing categorical models for pure
              function types without products</li>
          <li><strong>Linear logic</strong>: Closed symmetric monoidal categories model the
              multiplicative fragment of linear logic</li>
          <li><strong>Type theory</strong>: Understanding the minimal structure needed for
              function types</li>
          <li><strong>Categorical logic</strong>: Relating different notions of "internal hom"
              across various categorical structures</li>
          <li><strong>Theoretical computer science</strong>: SK-categories provide semantics
              for combinatory logic and point-free programming</li>
        </ul>
      </section>
    </WikiLayout>
  );
}
