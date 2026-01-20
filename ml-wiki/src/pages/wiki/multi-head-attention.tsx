import { useEffect } from "react";
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "Multi-Head Attention",
  description:
    "A mechanism that performs multiple attention operations in parallel with different learned linear projections, allowing the model to jointly attend to information from different representation subspaces.",
  category: "Architecture Components",
  difficulty: "Intermediate",
  tags: ["attention", "transformer", "neural-networks"],
  relatedConcepts: [
    "self-attention",
    "scaled-dot-product-attention",
    "transformer-architecture",
  ],
  citations: [
    {
      paper: "Attention Is All You Need",
      authors:
        "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I.",
      year: "2017",
      pages: "4-5",
    },
  ],
};

export default function MultiHeadAttention() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error("MathJax typesetting failed:", err),
      );
    }
  }, []);

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-700">
            <strong>Multi-head attention</strong> is a mechanism that, instead
            of performing a single attention function with{" "}
            <span dangerouslySetInnerHTML={{ __html: "$d_{\\text{model}}$" }} />
            -dimensional keys, values, and queries, linearly projects the
            queries, keys, and values{" "}
            <span dangerouslySetInnerHTML={{ __html: "$h$" }} /> times with
            different learned linear projections. The attention function is then
            performed in parallel on each of these projected versions [Vaswani
            et al., 2017, p. 4].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Mathematical Definition
          </h2>
          <p className="text-slate-700 mb-4">
            The multi-head attention formula is defined as [Vaswani et al.,
            2017, p. 5]:
          </p>
          <div className="bg-slate-100 rounded-lg p-6 my-4">
            <div
              className="text-center mb-4"
              dangerouslySetInnerHTML={{
                __html:
                  "$$\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\ldots, \\text{head}_h)W^O$$",
              }}
            />
            <div
              className="text-center"
              dangerouslySetInnerHTML={{
                __html:
                  "$$\\text{where } \\text{head}_i = \\text{Attention}(QW^Q_i, KW^K_i, VW^V_i)$$",
              }}
            />
          </div>
          <div className="text-slate-700 space-y-2">
            <p>Where the projections are parameter matrices:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li
                dangerouslySetInnerHTML={{
                  __html:
                    "$W^Q_i \\in \\mathbb{R}^{d_{\\text{model}} \\times d_k}$",
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html:
                    "$W^K_i \\in \\mathbb{R}^{d_{\\text{model}} \\times d_k}$",
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html:
                    "$W^V_i \\in \\mathbb{R}^{d_{\\text{model}} \\times d_v}$",
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html:
                    "$W^O \\in \\mathbb{R}^{h \\cdot d_v \\times d_{\\text{model}}}$",
                }}
              />
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Why Multiple Heads?
          </h2>
          <p className="text-slate-700 mb-4">
            Multi-head attention allows the model to jointly attend to
            information from different representation subspaces at different
            positions. With a single attention head, averaging inhibits this
            capability [Vaswani et al., 2017, p. 5].
          </p>
          <p className="text-slate-700 mb-3">
            Think of it this way: different heads can specialize in different
            types of relationships:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>One head might focus on syntactic relationships</li>
            <li>Another on semantic relationships</li>
            <li>Yet another on positional patterns</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Implementation Details
          </h2>
          <p className="text-slate-700 mb-3">
            In the Transformer implementation [Vaswani et al., 2017, p. 5]:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>
              <strong>Number of heads</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: "$(h)$" }} />: 8
            </li>
            <li>
              <strong>Dimension per head</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: "$(d_k = d_v)$" }} />: 64
            </li>
            <li>
              <strong>Model dimension</strong>{" "}
              <span
                dangerouslySetInnerHTML={{ __html: "$(d_{\\text{model}})$" }}
              />
              : 512
            </li>
            <li>
              <strong>Relation</strong>:{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: "$d_k = d_v = d_{\\text{model}} / h = 512 / 8 = 64$",
                }}
              />
            </li>
          </ul>
          <p className="text-slate-700 mt-4">
            Due to the reduced dimension of each head, the total computational
            cost is similar to that of single-head attention with full
            dimensionality [Vaswani et al., 2017, p. 5].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What Different Heads Learn
          </h2>
          <p className="text-slate-700 mb-4">
            Analysis of trained Transformer models reveals that individual
            attention heads clearly learn to perform different, specialized
            tasks [Vaswani et al., 2017, p. 7]:
          </p>
          <ol className="list-decimal list-inside space-y-3 ml-4 text-slate-700">
            <li>
              <strong>Long-Distance Dependencies</strong>: Some heads track
              relationships between words far apart in the sequence
            </li>
            <li>
              <strong>Anaphora Resolution</strong>: Other heads learn to connect
              pronouns to their antecedents
            </li>
            <li>
              <strong>Syntactic Structure</strong>: Certain heads appear to
              capture phrase structure and grammatical relationships
            </li>
            <li>
              <strong>Semantic Relationships</strong>: Some focus on
              meaning-based connections
            </li>
          </ol>
          <p className="text-slate-700 mt-4">
            This specialization happens naturally through training—the model
            learns to partition the attention space in useful ways without
            explicit supervision.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Advantages</h2>
          <p className="text-slate-700 mb-3">
            The multi-head mechanism provides several key benefits:
          </p>
          <ol className="list-decimal list-inside space-y-3 ml-4 text-slate-700">
            <li>
              <strong>Diverse Representations</strong>: Different heads can
              capture different types of relationships simultaneously
            </li>
            <li>
              <strong>Robust Learning</strong>: Multiple perspectives make the
              model less likely to miss important patterns
            </li>
            <li>
              <strong>Interpretability</strong>: Individual heads often develop
              clear, understandable specializations
            </li>
            <li>
              <strong>Efficiency</strong>: Despite having multiple heads, the
              total compute is similar to single-head attention due to dimension
              reduction
            </li>
          </ol>
        </section>

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Detective Team Analogy: A Story
          </h2>
          <p className="text-slate-700 mb-4">
            Imagine you're investigating a complex crime scene, and you have a
            team of 8 specialized detectives (just like the Transformer's 8
            attention heads).
          </p>

          <div className="space-y-4 mb-6">
            <p className="text-slate-700">
              <strong>Detective 1</strong> specializes in{" "}
              <strong>physical evidence</strong>—fingerprints, DNA, material
              traces. When examining the scene, she focuses intensely on
              physical connections between objects and locations.
            </p>
            <p className="text-slate-700">
              <strong>Detective 2</strong> is an expert in{" "}
              <strong>timeline reconstruction</strong>—he tracks when events
              happened and their temporal relationships.
            </p>
            <p className="text-slate-700">
              <strong>Detective 3</strong> specializes in{" "}
              <strong>motive and psychology</strong>—understanding why people
              acted and their emotional connections.
            </p>
            <p className="text-slate-700">
              <strong>Detective 4</strong> focuses on{" "}
              <strong>communication patterns</strong>—who talked to whom, what
              was said, and what was left unsaid.
            </p>
            <p className="text-slate-700">
              The remaining detectives each have their own specializations:
              financial trails, geographical patterns, social relationships, and
              background histories.
            </p>
          </div>

          <div className="mb-6">
            <p className="font-semibold text-slate-900 mb-2">
              The Single Detective Problem:
            </p>
            <p className="text-slate-700">
              If you had only one generalist detective, they'd try to notice
              everything, but would inevitably average out their attention
              across all aspects. They might notice the fingerprint AND the
              timeline AND the motive, but none deeply enough. Important
              connections would be lost in the noise.
            </p>
          </div>

          <div className="mb-6">
            <p className="font-semibold text-slate-900 mb-2">
              The Multi-Head Solution:
            </p>
            <p className="text-slate-700 mb-3">
              With 8 specialized detectives working in parallel:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
              <li>
                Detective 1 notices the fingerprint on the door connects to the
                suspect's apartment
              </li>
              <li>
                Detective 2 realizes the timing of phone calls contradicts the
                alibi
              </li>
              <li>
                Detective 3 identifies the emotional motivation linking the
                suspect to the victim
              </li>
              <li>
                Each detective produces their own theory based on their
                specialty
              </li>
            </ul>
          </div>

          <p className="text-slate-700 mt-6">
            Finally, all 8 reports are{" "}
            <strong>concatenated and projected</strong> through a final analysis
            (the <span dangerouslySetInnerHTML={{ __html: "$W^O$" }} /> matrix),
            where a master detective weighs each specialist's findings to create
            a comprehensive understanding.
          </p>

          <p className="text-slate-700 mt-4">
            This is multi-head attention: parallel specialists, each attending
            to different aspects of the data, their insights combined to form a
            richer, more nuanced understanding than any single perspective could
            provide.
          </p>
        </section>
      </div>
    </WikiLayout>
  );
}
