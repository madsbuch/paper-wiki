import { Link } from "react-router";
import WikiLayout from "../../components/WikiLayout";
import { useEffect } from "react";

export default function PromptEngineering() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise?.([document.body]).catch((err: Error) =>
        console.error("MathJax typesetting failed:", err),
      );
    }
  }, []);

  const meta = {
    title: "Prompt Engineering",
    description:
      "Techniques for conditioning language models to perform specific tasks through carefully designed text prompts or learned continuous embeddings",
    category: "Training Techniques",
    difficulty: "Intermediate",
    tags: [
      "prompting",
      "few-shot-learning",
      "parameter-efficient",
      "adaptation",
    ],
    relatedConcepts: [
      "few-shot-learning",
      "parameter-efficient-fine-tuning",
      "in-context-learning",
      "zero-shot-learning",
    ],
    citations: [
      {
        paper: "The Power of Scale for Parameter-Efficient Prompt Tuning",
        authors: "Lester et al.",
        year: "2021",
        pages: "1-4",
      },
      {
        paper: "Language Models are Few-Shot Learners (GPT-3)",
        authors: "Brown et al.",
        year: "2020",
        pages: "5-7",
      },
    ],
  };

  return (
    <WikiLayout {...meta}>
      <div className="space-y-6">
        <section>
          <p className="text-slate-700 mb-4">
            <strong>Prompt Engineering</strong> refers to the practice of
            designing effective prompts to elicit desired behaviors from
            language models. This encompasses both{" "}
            <strong>discrete prompting</strong> (manually crafted text) and{" "}
            <strong>soft prompting</strong> (learned continuous embeddings)
            [Lester et al., 2021, p.1].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Two Paradigms
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            1. Discrete Prompt Design
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Discrete prompting</strong> uses natural language text to
            condition the model. As demonstrated by GPT-3, carefully crafted
            text prompts can guide models to perform specific tasks through
            few-shot examples or instructions [Brown et al., 2020, p.6].
          </p>

          <div className="bg-slate-100 rounded-lg p-4 mb-4">
            <p className="font-semibold text-slate-900 mb-2">
              Example: Few-Shot Translation
            </p>
            <pre className="text-sm text-slate-700 font-mono">{`Translate English to French:
sea otter => loutre de mer
peppermint => menthe poivrée
cheese => fromage`}</pre>
          </div>

          <p className="text-slate-700 mb-2">
            <strong>Challenges with Discrete Prompting:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>
              Task description is error-prone and requires trial-and-error
            </li>
            <li>
              Even slight modifications can drastically change performance
            </li>
            <li>Difficult to optimize systematically</li>
            <li>Requires understanding of model biases and failure modes</li>
          </ul>
          <p className="text-slate-700 text-sm italic mb-4">
            [Lester et al., 2021, p.1]
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            2. Soft Prompt Tuning
          </h3>
          <p className="text-slate-700 mb-4">
            <strong>Soft prompt tuning</strong> (or simply "prompt tuning")
            learns continuous prompt embeddings through backpropagation rather
            than using discrete text. These learned prompts are prepended to the
            input while keeping the language model frozen [Lester et al., 2021,
            p.1].
          </p>

          <h4 className="text-lg font-semibold text-slate-900 mb-2">
            How It Works
          </h4>
          <p className="text-slate-700 mb-2">
            For a model with vocabulary embeddings{" "}
            <strong>
              X ∈ ℝ<sup>(V×E)</sup>
            </strong>
            :
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              Prepend <strong>n</strong> learnable "soft prompt" embeddings{" "}
              <strong>
                P ∈ ℝ<sup>(n×E)</sup>
              </strong>{" "}
              to the input
            </li>
            <li>Keep all language model parameters frozen</li>
            <li>Train only P via backpropagation on task-specific data</li>
            <li>
              During inference, use learned P to condition the frozen model
            </li>
          </ol>

          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-blue-900 mb-2">Key Insight:</p>
            <p className="text-slate-700 text-sm">
              Unlike discrete prompts which are limited to actual words, soft
              prompts can occupy any point in the continuous embedding space,
              potentially finding more optimal conditioning signals [Lester et
              al., 2021, p.2].
            </p>
          </div>

          <h4 className="text-lg font-semibold text-slate-900 mb-2 mt-6">
            Advantages of Soft Prompting
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>End-to-end optimization</strong>: Can incorporate signal
              from any number of labeled examples
            </li>
            <li>
              <strong>Superior performance</strong>: Outperforms GPT-3's
              few-shot learning by a large margin [Lester et al., 2021, p.1]
            </li>
            <li>
              <strong>Scales with model size</strong>: As models exceed 10B
              parameters, matches full fine-tuning performance
            </li>
            <li>
              <strong>Parameter efficiency</strong>: Only tunes ~0.01% of model
              parameters
            </li>
            <li>
              <strong>Multi-task serving</strong>: Single frozen model +
              swappable prompt embeddings
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            The Power of Scale
          </h2>
          <p className="text-slate-700 mb-4">
            One of the most important findings in prompt tuning research is that{" "}
            <strong>
              effectiveness dramatically increases with model size
            </strong>{" "}
            [Lester et al., 2021, p.2].
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-slate-50 rounded-lg">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">
                    Model Size
                  </th>
                  <th className="px-4 py-2 text-left text-slate-900 font-semibold">
                    Prompt Tuning vs Full Fine-Tuning
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-2">&lt;1B params</td>
                  <td className="px-4 py-2">Significant gap (~20 points)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-2">~3B params</td>
                  <td className="px-4 py-2">Gap narrows (~10 points)</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-2 font-semibold">&gt;10B params</td>
                  <td className="px-4 py-2 font-semibold">
                    Matches performance (SuperGLUE)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-slate-700 mb-4">
            This scale-dependent behavior suggests that larger models have
            greater capacity to be steered by soft prompts without requiring
            weight updates [Lester et al., 2021, p.2].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Comparison with Other Methods
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            vs. Prefix Tuning
          </h3>
          <p className="text-slate-700 mb-4">
            Prompt tuning is a simplification of prefix tuning [Lester et al.,
            2021, p.1]:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Prefix tuning</strong>: Inserts trainable activations at{" "}
              <em>every layer</em> of the Transformer
            </li>
            <li>
              <strong>Prompt tuning</strong>: Only prepends to the{" "}
              <em>input</em>, letting representations evolve naturally
            </li>
            <li>
              Prompt tuning is simpler, has fewer parameters, yet achieves
              comparable performance
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            vs. Adapter Layers
          </h3>
          <p className="text-slate-700 mb-2">
            <strong>Similarities:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>Both freeze the pre-trained model</li>
            <li>Both add task-specific trainable parameters</li>
          </ul>
          <p className="text-slate-700 mb-2">
            <strong>Differences:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-slate-700 mb-4">
            <li>
              Adapters modify the <em>model architecture</em> by inserting
              layers
            </li>
            <li>
              Prompt tuning modifies the <em>input</em>, keeping architecture
              unchanged
            </li>
            <li>
              Adapters can introduce inference latency; prompt tuning does not
              (when prompts are cached)
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            vs. LoRA
          </h3>
          <p className="text-slate-700 mb-4">
            Both are{" "}
            <Link
              to="/wiki/parameter-efficient-fine-tuning"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              parameter-efficient fine-tuning
            </Link>{" "}
            methods:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Prompt tuning</strong>: Modifies input representation only
              (~20k params for 11B model)
            </li>
            <li>
              <strong>LoRA</strong>: Injects low-rank updates into weight
              matrices (~4.7M params for similar model)
            </li>
            <li>
              LoRA typically achieves slightly better performance but with more
              parameters
            </li>
            <li>
              Prompt tuning is simpler and requires no architectural changes
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Practical Considerations
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Prompt Length
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              Typical range: <strong>20-100 tokens</strong>
            </li>
            <li>Performance generally improves with longer prompts</li>
            <li>Diminishing returns beyond ~100 tokens</li>
            <li>
              Trade-off: longer prompts reduce available context for input
            </li>
          </ul>
          <p className="text-slate-700 text-sm italic mb-4">
            [Lester et al., 2021, p.4]
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            Initialization Strategies
          </h3>
          <p className="text-slate-700 mb-2">
            Multiple initialization approaches have been explored:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Random initialization</strong>: Sampled from vocabulary
              embedding distribution
            </li>
            <li>
              <strong>Vocabulary initialization</strong>: Start from actual word
              embeddings
            </li>
            <li>
              <strong>Class label initialization</strong>: Use task-relevant
              words (e.g., "true"/"false" for classification)
            </li>
          </ul>
          <p className="text-slate-700 mb-4">
            For large models (&gt;10B), initialization method matters less as
            training converges to similar performance [Lester et al., 2021,
            p.5].
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            Domain Transfer Robustness
          </h3>
          <p className="text-slate-700 mb-4">
            Prompt tuning shows{" "}
            <strong>better robustness to domain shift</strong> compared to full
            fine-tuning. When trained on one domain and tested on another,
            prompt tuning degrades more gracefully, likely because the frozen
            model retains broader pre-trained knowledge [Lester et al., 2021,
            p.7].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Creative Analogy: The Stage Director
          </h2>
          <p className="text-slate-700 mb-4">
            Imagine a language model as a highly trained theater actor who has
            performed thousands of different roles and can adapt to almost any
            character.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">
                Discrete Prompt Design:
              </h4>
              <p className="text-sm text-slate-700">
                You give the actor written instructions: "Act like Shakespeare's
                Hamlet in Scene 3." The performance quality depends entirely on
                how well you write those instructions. Ambiguous directions lead
                to unpredictable performances.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">
                Soft Prompt Tuning:
              </h4>
              <p className="text-sm text-slate-700">
                Instead of written instructions, you train a director (the soft
                prompt) who learns—through watching many performances—exactly
                how to set the stage, lighting, and mood to elicit the perfect
                performance. The director's cues are optimized through practice,
                not trial-and-error writing.
              </p>
            </div>
          </div>

          <p className="text-slate-700 mb-4">
            <strong>Full fine-tuning</strong> would be like retraining the actor
            from scratch for each role—effective but wasteful when the actor
            already has the skills.
          </p>
          <p className="text-slate-700">
            <strong>Prompt tuning</strong> recognizes that the actor (model) is
            already capable; you just need the right "directorial cues" (soft
            prompts) to bring out the desired performance. As the actor becomes
            more experienced (larger models), they respond better to subtle
            directorial guidance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            When to Use Prompt Engineering
          </h2>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Use Discrete Prompting When:
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>You have zero or very few labeled examples (&lt;10)</li>
            <li>You need immediate results without training</li>
            <li>The task can be clearly described in natural language</li>
            <li>You're exploring model capabilities</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            Use Soft Prompt Tuning When:
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              You have labeled task data (hundreds to thousands of examples)
            </li>
            <li>You're using a very large model (&gt;10B parameters)</li>
            <li>You need to serve many tasks from a single model</li>
            <li>You want to avoid the brittleness of discrete prompt design</li>
            <li>Storage and memory efficiency are important</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">
            Consider Alternatives When:
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>
              <strong>Model is small (&lt;1B)</strong>: Prompt tuning's gap with
              full fine-tuning is larger
            </li>
            <li>
              <strong>Maximum performance is critical</strong>: Full fine-tuning
              or LoRA may achieve slightly better results
            </li>
            <li>
              <strong>Task is very different from pre-training</strong>: May
              need more extensive adaptation
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Impact and Adoption
          </h2>
          <p className="text-slate-700 mb-2">
            Prompt engineering, particularly soft prompt tuning, has become a
            foundational technique in modern NLP:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Integrated into frameworks like HuggingFace PEFT</li>
            <li>Widely used for efficient multi-task serving</li>
            <li>Inspired related methods like P-tuning and P-tuning v2</li>
            <li>Core technique in production LLM deployments</li>
            <li>
              Demonstrated importance of scale in parameter-efficient methods
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Related Concepts
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>
              <Link
                to="/wiki/few-shot-learning"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Few-Shot Learning
              </Link>{" "}
              - Learning from few examples without weight updates
            </li>
            <li>
              <Link
                to="/wiki/parameter-efficient-fine-tuning"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Parameter-Efficient Fine-Tuning
              </Link>{" "}
              - Family of efficient adaptation methods
            </li>
            <li>
              <Link
                to="/wiki/in-context-learning"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                In-Context Learning
              </Link>{" "}
              - The mechanism enabling prompt-based adaptation
            </li>
            <li>
              <Link
                to="/wiki/transfer-learning"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Transfer Learning
              </Link>{" "}
              - Broader paradigm of knowledge transfer
            </li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
