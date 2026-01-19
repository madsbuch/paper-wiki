import WikiLayout from '../../components/WikiLayout';
import { useState } from 'react';

export const meta = {
  title: "Abstract Clones",
  description: "Multi-sorted algebraic structures that model cartesian type theories with structural rules of weakening, contraction, and permutation",
  category: "Category Theory",
  tags: ["Category Theory", "Type Theory", "Algebra", "Semantics", "Cartesian"],
  citations: [
    {
      paper: "Clones, closed categories, and combinatory logic",
      authors: "Saville, P.",
      year: "2024",
      pages: "6-7"
    }
  ],
  relatedConcepts: ["multicategories", "combinatory-logic", "closed-categories"]
};

export default function AbstractClones() {
  const [step, setStep] = useState(0);

  return (
    <WikiLayout {...meta}>
      <section>
        <h2>Overview</h2>
        <p>
          An <strong>abstract clone</strong> (also called a cartesian multicategory) is a
          multi-sorted algebraic structure that captures the essence of cartesian type theories.
          Unlike plain multicategories, clones support the structural rules of:
        </p>
        <ul>
          <li><strong>Weakening</strong>: Variables can be unused</li>
          <li><strong>Contraction</strong>: Variables can be used multiple times</li>
          <li><strong>Permutation</strong>: Variables can be reordered</li>
        </ul>

        <p>
          Clones provide the natural semantic framework for the simply-typed λ-calculus with
          products, where these structural rules are implicitly assumed [Saville, 2024, p. 6].
        </p>
      </section>

      <section>
        <h2>Formal Definition</h2>
        <p>
          An abstract clone <strong>C</strong> consists of:
        </p>
        <ul>
          <li>A set |C| of <strong>sorts</strong> (types)</li>
          <li>For every sequence Γ = (A₁, ..., Aₙ) and sort B, a set C(Γ; B) of
              <strong>multimaps</strong></li>
          <li><strong>Projection multimaps</strong> pᵢᴬ⃗ ∈ C(A₁, ..., Aₙ; Aᵢ) for each i = 1, ..., n</li>
          <li>A <strong>substitution operation</strong> that combines multimaps</li>
        </ul>

        <p>
          The key difference from multicategories is in the substitution operation. For a multimap
          <code>t: A₁, ..., Aₙ → B</code> and multimaps <code>(uᵢ: Δ → Aᵢ)</code> all from the
          <em>same</em> context Δ, substitution produces <code>t[u₁, ..., uₙ]: Δ → B</code>
          [Saville, 2024, p. 6].
        </p>

        <p>
          This contrasts with multicategories where the uᵢ can come from <em>different</em> contexts.
          The restriction to a shared context Δ is what enables weakening and contraction.
        </p>

        <h3>Clone Axioms</h3>
        <p>
          The substitution operation must satisfy:
        </p>
        <ul>
          <li><strong>Associativity</strong>: <code>(t[u⃗])[v⃗] = t[..., uᵢ[v⃗], ...]</code></li>
          <li><strong>Projection law</strong>: <code>pᵢᴬ⃗[u₁, ..., uₙ] = uᵢ</code></li>
          <li><strong>Identity law</strong>: <code>t[p₁ᴬ⃗, ..., pₙᴬ⃗] = t</code></li>
        </ul>
      </section>

      <section>
        <h2>The Variable Management Analogy</h2>
        <p>
          Think of a clone like a programming language's variable scoping system. In most programming
          languages, you can:
        </p>
        <ul>
          <li><strong>Declare variables you don't use</strong> (weakening): <code>let x = 5; let y = 10; return y;</code>
              — x is declared but unused</li>
          <li><strong>Use variables multiple times</strong> (contraction): <code>x + x</code> uses x twice</li>
          <li><strong>Reorder operations</strong> (permutation): <code>x + y = y + x</code> in commutative contexts</li>
        </ul>

        <p>
          A plain multicategory is like a restrictive language where:
        </p>
        <ul>
          <li>Every variable must be used exactly once (linear logic)</li>
          <li>Variables must be used in declaration order (ordered logic)</li>
        </ul>

        <p>
          The projections pᵢᴬ⃗ are like "getter" functions that extract the i-th variable from context.
          Substitution t[u₁, ..., uₙ] is like replacing each variable in t with a computed expression.
        </p>
      </section>

      <section>
        <h2>Relationship to Categories</h2>
        <p>
          Every abstract clone C has an underlying category (called its <strong>nucleus</strong>)
          obtained by restricting to unary multimaps. Conversely, every cartesian category
          (C, ×) induces a clone PC where [Saville, 2024, p. 6]:
        </p>
        <ul>
          <li>Objects of PC are objects of C</li>
          <li><code>PC(A₁, ..., Aₙ; B) = C(A₁ × ... × Aₙ, B)</code></li>
        </ul>

        <p>
          This establishes an <strong>equivalence of categories</strong>:
        </p>
        <p className="text-center font-mono bg-slate-100 p-4 rounded">
          CartClone ≅ CartCat
        </p>

        <p>
          This means clones and cartesian categories are essentially the same structure, just
          viewed from different perspectives—multi-ary vs. unary [Saville, 2024, Corollary 1].
        </p>
      </section>

      <section>
        <h2>Internal Language</h2>
        <p>
          The internal language of a clone is exactly the simply-typed λ-calculus with products
          (but not necessarily function types). Terms are built from:
        </p>
        <ul>
          <li><strong>Variables</strong>: Identified with projections pᵢ</li>
          <li><strong>Constants</strong>: For each c in the signature</li>
        </ul>

        <p>
          Substitution in the clone corresponds exactly to substitution in the type theory.
          The syntactic clone Syn(Λˣ_S) is the free cartesian clone on a signature S
          [Saville, 2024, Lemma 6].
        </p>
      </section>

      <section>
        <h2>Exercise: Working with Substitution</h2>
        <p>
          Let's work through an example of substitution in a clone with sorts Int and Bool.
        </p>

        {step === 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="font-semibold mb-2">Step 1: Define the context</p>
            <p>
              Suppose we have a multimap <code>add: Int, Int → Int</code> representing addition.
              We also have multimaps from a shared context:
            </p>
            <ul className="ml-6 mt-2">
              <li><code>double: Int → Int</code> (doubles its input)</li>
              <li><code>triple: Int → Int</code> (triples its input)</li>
            </ul>
            <p className="mt-2">
              Question: What is <code>add[double, triple]</code>? What is its type?
            </p>
            <button
              onClick={() => setStep(1)}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Show Answer
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 animate-fadeIn">
            <p className="font-semibold mb-2">Answer:</p>
            <p>
              <code>add[double, triple]: Int → Int</code>
            </p>
            <p className="mt-2">
              This substitutes the first argument of add with double and the second with triple.
              Since both double and triple take a single Int, the resulting multimap takes a
              single Int and computes <code>double(x) + triple(x) = 2x + 3x = 5x</code>.
            </p>
            <p className="mt-3">
              Notice how <strong>contraction</strong> happened automatically: the input x was used
              twice (once for double, once for triple). This is only possible in a clone, not in
              a plain multicategory!
            </p>
            <button
              onClick={() => setStep(2)}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Continue to Step 2
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fadeIn">
            <p className="font-semibold mb-2">Step 2: Using projections</p>
            <p>
              In a clone, we have projection multimaps. For context (x: Int, y: Int),
              what are p₁ and p₂?
            </p>
            <button
              onClick={() => setStep(3)}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Show Answer
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200 animate-fadeIn">
            <p className="font-semibold mb-2">Answer:</p>
            <ul className="ml-6 mt-2">
              <li><code>p₁: (Int, Int) → Int</code> extracts the first component (x)</li>
              <li><code>p₂: (Int, Int) → Int</code> extracts the second component (y)</li>
            </ul>
            <p className="mt-3">
              The identity law states: <code>add[p₁, p₂] = add</code>
            </p>
            <p className="mt-2">
              This says that substituting add's arguments with "just extract those arguments"
              gives you back add itself—a fundamental property of substitution!
            </p>
            <button
              onClick={() => setStep(0)}
              className="mt-3 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Restart Exercise
            </button>
          </div>
        )}
      </section>

      <section>
        <h2>Representability and Products</h2>
        <p>
          A key result in Saville's work is that for clones, there are two equivalent ways
          to define product structure [Saville, 2024, Proposition 3]:
        </p>

        <h3>1. Traditional Products (Finite Products)</h3>
        <p>
          Equip the clone with product objects ∏ᵢAᵢ and projection morphisms πᵢ: ∏ⱼAⱼ → Aᵢ,
          satisfying the universal property: <code>C(Γ; ∏ᵢAᵢ) ≅ ∏ᵢ C(Γ; Aᵢ)</code>.
        </p>

        <h3>2. Representability (Hermida)</h3>
        <p>
          Equip the clone with tensor objects ⊗ᵢAᵢ and universal multimaps
          <code>ρ: A₁, ..., Aₙ → ⊗ᵢAᵢ</code>, satisfying: <code>C(A₁, ..., Aₙ; B) ≅ C(⊗ᵢAᵢ; B)</code>.
        </p>

        <p className="mt-3">
          For clones (but not general multicategories), these two notions coincide: products
          and tensors are the same! This reflects the fact that in cartesian logic, the additive
          (&amp;) and multiplicative (⊗) conjunctions collapse to the same connective.
        </p>
      </section>

      <section>
        <h2>Applications</h2>
        <ul>
          <li><strong>Semantics of λ-calculus</strong>: Clones provide the natural semantics for
              simply-typed λ-calculus with products</li>
          <li><strong>Algebraic syntax</strong>: Clones are equivalent to multi-sorted algebraic
              theories, connecting categorical and algebraic approaches</li>
          <li><strong>Universal algebra</strong>: Clones originated in universal algebra as collections
              of operations closed under composition</li>
          <li><strong>Free constructions</strong>: The free clone is easier to construct than the
              free cartesian category, simplifying completeness proofs</li>
        </ul>
      </section>
    </WikiLayout>
  );
}
