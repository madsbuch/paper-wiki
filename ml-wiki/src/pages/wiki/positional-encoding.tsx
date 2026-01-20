import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "Positional Encoding",
  description: "Information about the relative or absolute position of tokens in a sequence, injected into the model through encodings added to input embeddings.",
  category: "Architecture Components",
  difficulty: "Intermediate",
  tags: ["transformer", "positional-encoding", "sequence-modeling"],
  relatedConcepts: ["transformer-architecture", "self-attention", "tokenization"],
  citations: [
    {
      paper: "Attention Is All You Need",
      authors: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I.",
      year: "2017",
      pages: "5-6"
    }
  ]
};

export default function PositionalEncoding() {
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
          <p className="text-slate-700 mb-4">Since the Transformer contains no recurrence and no convolution, in order for the model to make use of the order of the sequence, it must inject some information about the relative or absolute position of tokens in the sequence. This is accomplished through <strong>positional encodings</strong> added to the input embeddings at the bottoms of the encoder and decoder stacks [Vaswani et al., 2017, p. 6].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Positional Encoding Is Necessary</h2>
          <p className="text-slate-700 mb-4">Unlike RNNs, which inherently process sequences in order (position 1, then 2, then 3...), the Transformer's self-attention mechanism processes all positions simultaneously in parallel. This is great for speed but creates a problem: the model has no inherent notion of sequence order!</p>
          <p className="text-slate-700 mb-4">Without positional encoding, the sentence "The cat chased the mouse" would be indistinguishable from "The mouse chased the cat" or "cat The mouse chased the"—the model would see the same words but have no idea about their order.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Sinusoidal Approach</h2>
          <p className="text-slate-700 mb-4">The Transformer uses sine and cosine functions of different frequencies [Vaswani et al., 2017, p. 6]:</p>
          <pre className="bg-slate-100 rounded-lg p-4 mb-4 overflow-x-auto"><code className="text-sm">
            PE(pos, 2i) = sin(pos / 10000^(2i/d_model))
            PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
          </code></pre>
          <p className="text-slate-700 mb-4">Where:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>pos</strong>: Position of the token in the sequence</li>
            <li><strong>i</strong>: Dimension index</li>
            <li><strong>d_model</strong>: Dimension of the model (512 in the base Transformer)</li>
          </ul>
          <p className="text-slate-700 mb-4">This means:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Even dimensions (2i) use sine functions</li>
            <li>Odd dimensions (2i+1) use cosine functions</li>
            <li>Different dimensions use different frequencies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Properties of Sinusoidal Encoding</h2>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">1. Unique Representation</h3>
          <p className="text-slate-700 mb-4">Each position gets a unique positional encoding vector. Position 0 has one pattern, position 1 has another, position 100 has yet another—all distinct [Vaswani et al., 2017, p. 6].</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2. Relative Position Learning</h3>
          <p className="text-slate-700 mb-4">The wavelengths form a geometric progression from 2π to 10000 · 2π. The authors hypothesized this would allow the model to easily learn to attend by relative positions, since for any fixed offset k, PE_&#123;pos+k&#125; can be represented as a linear function of PE_&#123;pos&#125; [Vaswani et al., 2017, p. 6].</p>
          <p className="text-slate-700 mb-4">This means the model can learn patterns like "attend to the word 3 positions back" without hardcoding specific positions.</p>
          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">3. Extrapolation Capability</h3>
          <p className="text-slate-700 mb-4">Sinusoidal encodings may allow the model to extrapolate to sequence lengths longer than those encountered during training—a critical advantage for generalization [Vaswani et al., 2017, p. 6].</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Learned vs. Sinusoidal Encodings</h2>
          <p className="text-slate-700 mb-4">The paper also experimented with learned positional embeddings instead of fixed sinusoidal functions. Both versions produced nearly identical results [Vaswani et al., 2017, p. 6, Table 3 row E].</p>
          <p className="text-slate-700 mb-4">The sinusoidal version was chosen because:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>It may allow extrapolation to longer sequences</li>
            <li>It requires no learned parameters (more parameter-efficient)</li>
            <li>It works just as well in practice</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Implementation Details</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Positional encodings have the same dimension as the embeddings (d_model = 512)</li>
            <li>They are <strong>added</strong> to the token embeddings (not concatenated)</li>
            <li>The same positional encodings are used at the bottom of both encoder and decoder stacks [Vaswani et al., 2017, p. 6]</li>
          </ul>
          <hr className="my-6 border-slate-200" />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Theater Seating Analogy: A Story</h2>
          <p className="text-slate-700 mb-4">Imagine you're directing a play, and you have 100 actors on stage for a massive ensemble scene. Each actor wears a costume that identifies their character (this is like the token embedding—it tells you "who" they are).</p>
          <p className="text-slate-700 mb-4">But there's a problem: you also need to know "where" each actor stands, because position matters! The person standing front-center should be treated differently from someone in the back corner, even if they're wearing the same costume.</p>
          <p className="text-slate-700 mb-4"><strong>The Positional Encoding Solution</strong>: You give each position on stage a unique colored spotlight pattern. These spotlights don't change the actors' costumes (character identity) but add information about location:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li><strong>Front-left corner</strong>: Illuminated by slowly pulsing red and quickly oscillating blue</li>
            <li><strong>Center stage</strong>: Medium-pulsing green and medium-oscillating yellow</li>
            <li><strong>Back-right</strong>: Quickly pulsing red and slowly oscillating blue</li>
          </ul>
          <p className="text-slate-700 mb-4">Each position has its own unique "light signature"—a combination of different pulsing frequencies that can never be confused with any other position.</p>
          <p className="text-slate-700 mb-4"><strong>Why Sine/Cosine Waves?</strong></p>
          <p className="text-slate-700 mb-4">Think of the spotlights as rotating color wheels spinning at different speeds:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Some dimensions (spotlight colors) spin very slowly (long wavelengths): these help distinguish nearby vs. far-away positions</li>
            <li>Others spin very quickly (short wavelengths): these help distinguish adjacent positions</li>
            <li>The combination creates a unique "fingerprint" for each location</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>The Magic Property</strong>: Because these are smooth mathematical functions, positions near each other have similar patterns. Position 5's lights look similar to position 6's lights—just shifted slightly. This helps the model learn that "nearby positions are related," which is crucial for understanding language.</p>
          <p className="text-slate-700 mb-4">When an actor at position 10 needs to interact with the actor at position 7, the model can learn to recognize the 3-position offset from the pattern of how their light signatures differ, regardless of their absolute positions. This is the power of positional encoding: making position information accessible in a learnable, extrapolatable way.</p>
        </section>
      </div>
    </WikiLayout>
  );
}
