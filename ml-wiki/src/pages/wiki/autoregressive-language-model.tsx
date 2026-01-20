import { useEffect } from 'react';
import WikiLayout from "../../components/WikiLayout";
import type { WikiMeta } from "../../types/wiki";

const meta: WikiMeta = {
  title: "Autoregressive Language Model",
  description: "A language model that generates text by predicting each token based on all previous tokens in the sequence.",
  category: "Model Architecture",
  difficulty: "Intermediate",
  tags: ["language-model", "autoregressive", "text-generation"],
  relatedConcepts: ["transformer-architecture", "few-shot-learning", "in-context-learning"],
  citations: [
    {
      paper: "Language Models are Few-Shot Learners (GPT-3)",
      authors: "Brown, T. B., Mann, B., Ryder, N., Subbiah, M., et al.",
      year: "2020",
      pages: "5, 8"
    }
  ]
};

export default function AutoregressiveLanguageModel() {
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
          <p className="text-slate-700">
            An <strong>autoregressive language model</strong> is a type of language model that generates text by predicting each token based on all previous tokens in the sequence [Brown et al., 2020, p. 5]. GPT-3 is a 175 billion parameter autoregressive language model.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p className="text-slate-700 mb-4">
            In an autoregressive model:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>The model receives a sequence of tokens as input</li>
            <li>For each position, it predicts the next token based on all previous tokens</li>
            <li>During generation, each predicted token becomes part of the context for predicting the next token</li>
            <li>This process continues sequentially, one token at a time</li>
          </ol>
          <p className="text-slate-700">
            The key characteristic is that the model can only attend to <strong>previous tokens</strong>, not future ones - making it autoregressive.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Architecture</h2>
          <p className="text-slate-700 mb-4">
            GPT-3 uses the same model and architecture as GPT-2, with modifications including [Brown et al., 2020, p. 8]:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>Modified initialization</li>
            <li>Pre-normalization</li>
            <li>Reversible tokenization</li>
            <li>Alternating dense and locally banded sparse attention patterns (similar to Sparse Transformer)</li>
          </ul>
          <p className="text-slate-700">
            The model scales across 8 different sizes, from 125 million to 175 billion parameters [Brown et al., 2020, p. 8].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Context Window</h2>
          <p className="text-slate-700 mb-4">
            All GPT-3 models use a <strong>context window of n_ctx = 2048 tokens</strong> [Brown et al., 2020, p. 8]. This means:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>The model can attend to up to 2048 previous tokens</li>
            <li>For few-shot learning, K examples must fit within this window</li>
            <li>Typically allows 10-100 examples for few-shot learning, depending on example length</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Training</h2>
          <p className="text-slate-700 mb-4">
            GPT-3 was trained on [Brown et al., 2020, p. 8]:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li>A filtered version of Common Crawl (570GB after filtering)</li>
            <li>High-quality reference corpora including WebText, Books1, Books2, and Wikipedia</li>
            <li>300 billion tokens total</li>
            <li>Training involved scaling up model size, dataset size, and training length</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Advantages for In-Context Learning</h2>
          <p className="text-slate-700 mb-4">
            The autoregressive structure is particularly well-suited for in-context learning because:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-700">
            <li><strong>Natural task framing</strong>: Examples can be provided sequentially in the context</li>
            <li><strong>Pattern recognition</strong>: The model learns to recognize task patterns from the sequence of examples</li>
            <li><strong>No architectural changes needed</strong>: In-context learning emerges naturally from the autoregressive objective</li>
          </ol>
        </section>

        <hr className="my-8 border-slate-300" />

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">The Storyteller Analogy</h2>
          <p className="text-slate-700 mb-4">
            Imagine a storyteller who must continue a story one word at a time.
          </p>
          <p className="text-slate-700 mb-4">
            <strong>Autoregressive Process</strong>:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 mb-4">
            <li>They hear: "Once upon a time, there was a brave..."</li>
            <li>They can only use those words to predict the next word: "knight"</li>
            <li>Now they hear: "Once upon a time, there was a brave knight..."</li>
            <li>They predict: "who"</li>
            <li>The context grows: "Once upon a time, there was a brave knight who..."</li>
            <li>They predict: "lived"</li>
          </ul>
          <p className="text-slate-700 mb-4">
            Each prediction is based on <strong>all previous words</strong> but cannot look ahead to future words. The storyteller builds the narrative step by step, where each word depends on the entire history but not on what comes next.
          </p>
          <p className="text-slate-700">
            <strong>In-Context Learning</strong>: When you show the storyteller several example stories in a specific genre (say, fairy tales), they pick up on the patterns and can generate new stories in that style - all without being explicitly retrained. They learned the meta-skill of recognizing story patterns during their years of reading (pre-training).
          </p>
          <p className="text-slate-700 mt-4">
            This is how GPT-3 works: autoregressive token prediction that enables natural in-context learning.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Concepts</h2>
          <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700">
            <li><a href="/wiki/in-context-learning" className="text-blue-600 hover:underline">In-Context Learning</a></li>
            <li><a href="/wiki/transformer-architecture" className="text-blue-600 hover:underline">Transformer Architecture</a></li>
          </ul>
        </section>
      </div>
    </WikiLayout>
  );
}
