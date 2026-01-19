import WikiLayout from '../../components/WikiLayout';
import { useState } from 'react';

export const meta = {
  title: "Combinatory Logic",
  description: "A model of computation based on combinators (higher-order functions) S and K that eliminates the need for variable binding, providing an alternative foundation to lambda calculus",
  category: "Type Theory",
  tags: ["Logic", "Computation", "Combinators", "Type Theory", "Foundations"],
  citations: [
    {
      paper: "Clones, closed categories, and combinatory logic",
      authors: "Saville, P.",
      year: "2024",
      pages: "15-17"
    }
  ],
  relatedConcepts: ["abstract-clones", "closed-categories", "multicategories"]
};

export default function CombinatoryLogic() {
  const [showReduction, setShowReduction] = useState(false);
  const [showExtensionality, setShowExtensionality] = useState(false);

  return (
    <WikiLayout {...meta}>
      <section>
        <h2>Overview</h2>
        <p>
          <strong>Combinatory logic</strong> is a system of computation based on combinators—
          higher-order functions that manipulate other functions. Unlike lambda calculus,
          combinatory logic eliminates variable binding entirely, expressing all computation
          through the composition of primitive combinators.
        </p>

        <p>
          The two fundamental combinators are:
        </p>
        <ul>
          <li><strong>S combinator</strong>: <code>S x y z = (x z) (y z)</code> — distributes application</li>
          <li><strong>K combinator</strong>: <code>K x y = x</code> — constant function (discards second argument)</li>
        </ul>

        <p>
          These two combinators alone are sufficient to express any computable function, making
          combinatory logic Turing-complete [Saville, 2024, p. 15].
        </p>
      </section>

      <section>
        <h2>Formal Definition</h2>
        <p>
          In typed combinatory logic CL_S over a signature S, types are built from base types
          using function types (→). Terms are given by:
        </p>
        <ul>
          <li><strong>Variables</strong>: x, y, z, ...</li>
          <li><strong>Constants</strong>: c ∈ S(Γ; B) for each constant in the signature</li>
          <li><strong>Application</strong>: (t u) if t: A → B and u: A</li>
          <li><strong>S combinator</strong>: <code>S_A,B,C: (A → B → C) → (A → B) → A → C</code></li>
          <li><strong>K combinator</strong>: <code>K_A,B: A → B → A</code></li>
        </ul>

        <p>
          The combinators are indexed by types to ensure type correctness. For a context
          Γ = (x₁: A₁, ..., xₙ: Aₙ), we write <code>S^Γ</code> for the weakening of S to context Γ
          [Saville, 2024, p. 15].
        </p>
      </section>

      <section>
        <h2>Weak Equality</h2>
        <p>
          <strong>Weak equality</strong> (≡_w) is the smallest congruence relation containing
          the reduction rules:
        </p>
        <ul>
          <li><code>S x y z ≡_w (x z) (y z)</code></li>
          <li><code>K x y ≡_w x</code></li>
        </ul>

        <p>
          This corresponds to β-reduction in lambda calculus. Two terms are weakly equal if
          they reduce to the same result [Saville, 2024, p. 15].
        </p>

        <div className="mt-4">
          <button
            onClick={() => setShowReduction(!showReduction)}
            className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 transition-colors"
          >
            {showReduction ? 'Hide Example' : 'Show Reduction Example'}
          </button>

          {showReduction && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fadeIn">
              <p className="font-semibold mb-2">Example: Deriving the Identity Function</p>
              <p>
                The identity function I can be derived from S and K:
              </p>
              <div className="font-mono bg-white p-3 rounded mt-2">
                I = S K K<br />
                <br />
                Proof:<br />
                &nbsp;&nbsp;I x<br />
                &nbsp;&nbsp;= (S K K) x<br />
                &nbsp;&nbsp;≡_w (K x) (K x)    [S reduction]<br />
                &nbsp;&nbsp;≡_w x              [K reduction]
              </div>
              <p className="mt-3">
                So <code>S K K</code> behaves exactly like the identity function λx.x from lambda calculus!
              </p>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2>Extensional Weak Equality</h2>
        <p>
          <strong>Extensional weak equality</strong> (≡_wext) extends weak equality with the
          extensionality rule:
        </p>
        <div className="font-mono bg-slate-100 p-4 rounded my-3">
          t x₁ ... xₙ ≡ t' x₁ ... xₙ&nbsp;&nbsp;&nbsp;&nbsp;(x₁, ..., xₙ not free in t or t')<br />
          ────────────────────────────────<br />
          t ≡ t'
        </div>

        <p>
          This corresponds to η-equality in lambda calculus: two functions are equal if they
          produce the same output for all inputs [Saville, 2024, p. 15].
        </p>

        <div className="mt-4">
          <button
            onClick={() => setShowExtensionality(!showExtensionality)}
            className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 transition-colors"
          >
            {showExtensionality ? 'Hide Example' : 'Show Extensionality Example'}
          </button>

          {showExtensionality && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 animate-fadeIn">
              <p className="font-semibold mb-2">Example: Multiple Identities Collapse</p>
              <p>
                Under extensional weak equality, all expressions that behave like the identity
                are equal:
              </p>
              <div className="font-mono bg-white p-3 rounded mt-2">
                I = S K K<br />
                I' = S K (S K K)<br />
                I'' = S (K I) K<br />
                <br />
                All satisfy: f x ≡_wext x<br />
                Therefore: I ≡_wext I' ≡_wext I''
              </div>
              <p className="mt-3">
                Without extensionality, these would be distinct terms. Extensionality identifies
                all terms with the same input-output behavior.
              </p>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2>The Recipe Book Analogy</h2>
        <p>
          Think of combinatory logic like cooking with a recipe book that has only two fundamental
          cooking techniques:
        </p>

        <h3>The K Technique (Constant Function)</h3>
        <p>
          <strong>K</strong> is like a recipe that says "use the first ingredient, discard the second":
        </p>
        <ul className="ml-6 mt-2">
          <li>K(sugar, flour) = sugar</li>
          <li>K(olive oil, vinegar) = olive oil</li>
        </ul>
        <p className="mt-2">
          No matter what the second ingredient is, K always returns the first one.
        </p>

        <h3>The S Technique (Distribution)</h3>
        <p>
          <strong>S</strong> is like a recipe that distributes a preparation method:
        </p>
        <ul className="ml-6 mt-2">
          <li>S(chop, season, vegetables) = chop(vegetables) mixed-with season(vegetables)</li>
        </ul>
        <p className="mt-2">
          S takes three arguments: two "preparation methods" (functions) and an ingredient.
          It applies both methods to the ingredient and combines the results.
        </p>

        <h3>Building Complex Recipes</h3>
        <p>
          Just as complex dishes are built from basic techniques, all computable functions can
          be built from S and K. For example, the identity "do nothing" recipe is S K K:
        </p>
        <div className="font-mono bg-white p-3 rounded mt-2">
          S K K (tomato)<br />
          = (K tomato) (K tomato)  [apply S]<br />
          = tomato                  [apply K]
        </div>
      </section>

      <section>
        <h2>Bracket Abstraction</h2>
        <p>
          A key feature of typed combinatory logic is <strong>bracket abstraction</strong>: the
          ability to convert a term with free variables into a closed term (combinator expression)
          [Saville, 2024, p. 16].
        </p>

        <p>
          For any term <code>Γ ⊢ t: B</code> where Γ = (x₁: A₁, ..., xₙ: Aₙ), there exists
          a closed term <code>t^c: [Γ; B]</code> such that:
        </p>
        <div className="font-mono bg-slate-100 p-4 rounded my-3">
          (t^c)^Γ x₁ ... xₙ ≡_w t
        </div>

        <p>
          The notation [Γ; B] means the type "A₁ → (A₂ → (... → (Aₙ → B)...))". Under
          extensional weak equality, t^c is unique [Saville, 2024, p. 16].
        </p>

        <h3>Why Bracket Abstraction Matters</h3>
        <p>
          Bracket abstraction shows that combinatory logic is as expressive as lambda calculus:
          any lambda term λx.t can be translated to a combinator expression that behaves the same way.
          This establishes the classical equivalence between the two systems.
        </p>
      </section>

      <section>
        <h2>SK-Clones: Multi-ary Semantics</h2>
        <p>
          An <strong>SK-clone</strong> is a multi-ary structure that models typed combinatory logic
          [Saville, 2024, p. 16]. It consists of:
        </p>
        <ul>
          <li>An underlying clone structure (supporting weakening/contraction)</li>
          <li>A function type constructor [−, =]</li>
          <li>Nullary multimaps S and K (the combinators)</li>
          <li>A binary application operation (· =)</li>
        </ul>

        <p>
          The key insight is that extensional SK-clones (where bracket abstraction is unique)
          are equivalent to closed clones—the multi-ary models of simply-typed λ-calculus
          without products [Saville, 2024, Theorem 1]:
        </p>
        <p className="text-center font-mono bg-slate-100 p-4 rounded my-3">
          SKClone_ext ≅ ClClone
        </p>

        <p>
          This provides a categorical statement of the classical correspondence between
          combinatory logic and lambda calculus.
        </p>
      </section>

      <section>
        <h2>Relationship to Lambda Calculus</h2>
        <p>
          Combinatory logic and lambda calculus are two sides of the same coin:
        </p>

        <table className="w-full border-collapse mt-4">
          <thead>
            <tr className="bg-slate-200">
              <th className="border p-2 text-left">Feature</th>
              <th className="border p-2 text-left">Lambda Calculus</th>
              <th className="border p-2 text-left">Combinatory Logic</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Variables</td>
              <td className="border p-2">Explicitly bound (λx.t)</td>
              <td className="border p-2">Free variables, no binding</td>
            </tr>
            <tr>
              <td className="border p-2">Abstraction</td>
              <td className="border p-2">Built-in (λ)</td>
              <td className="border p-2">Derived (bracket abstraction)</td>
            </tr>
            <tr>
              <td className="border p-2">Primitives</td>
              <td className="border p-2">Variables, abstraction, application</td>
              <td className="border p-2">S and K combinators</td>
            </tr>
            <tr>
              <td className="border p-2">β-reduction</td>
              <td className="border p-2">(λx.t) u → t[u/x]</td>
              <td className="border p-2">S x y z → (x z) (y z), K x y → x</td>
            </tr>
            <tr>
              <td className="border p-2">Extensionality</td>
              <td className="border p-2">η-law: λx.(f x) = f</td>
              <td className="border p-2">ext-rule: t x = t' x ⇒ t = t'</td>
            </tr>
          </tbody>
        </table>

        <p className="mt-4">
          Both systems are Turing-complete and can express the same set of computable functions.
          The choice between them is largely a matter of technical convenience.
        </p>
      </section>

      <section>
        <h2>Historical Note</h2>
        <p>
          Combinatory logic was introduced by Moses Schönfinkel in 1924, predating Alonzo Church's
          lambda calculus (1930s). Schönfinkel's goal was to eliminate the need for variables
          entirely, creating a purely compositional system of logic.
        </p>

        <p>
          The system was later developed by Haskell Curry, who introduced the type system and
          proved many fundamental results. The S and K combinators are named after Schönfinkel
          and Curry's work (though Curry also considered other combinator bases).
        </p>
      </section>

      <section>
        <h2>Applications</h2>
        <ul>
          <li><strong>Theoretical computer science</strong>: Combinatory logic provides an
              alternative foundation for computation theory</li>
          <li><strong>Implementation of functional languages</strong>: Early implementations
              used combinator reduction as an execution model</li>
          <li><strong>Categorical semantics</strong>: SK-clones and SK-categories provide
              categorical models of computation without explicit variable binding</li>
          <li><strong>Proof theory</strong>: Combinatory logic relates to Hilbert-style
              proof systems (in contrast to natural deduction for lambda calculus)</li>
        </ul>
      </section>
    </WikiLayout>
  );
}
