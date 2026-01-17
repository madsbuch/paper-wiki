import { useState, useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";

export default function WikiIndex() {
  const [searchQuery, setSearchQuery] = useState("");

  const concepts = [
    {
      title: "Transformer Architecture",
      description: "A revolutionary neural network architecture based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
      slug: "transformer-architecture",
      category: "Architecture",
      difficulty: "Intermediate"
    },
    {
      title: "Self-Attention",
      description: "An attention mechanism relating different positions of a single sequence to compute a representation of that sequence.",
      slug: "self-attention",
      category: "Mechanism",
      difficulty: "Intermediate"
    },
    {
      title: "Multi-Head Attention",
      description: "Running multiple attention mechanisms in parallel to jointly attend to information from different representation subspaces.",
      slug: "multi-head-attention",
      category: "Mechanism",
      difficulty: "Advanced"
    },
    {
      title: "Scaled Dot-Product Attention",
      description: "The fundamental attention computation using dot products scaled by the square root of the key dimension.",
      slug: "scaled-dot-product-attention",
      category: "Mechanism",
      difficulty: "Intermediate"
    },
    {
      title: "Positional Encoding",
      description: "Injecting information about the relative or absolute position of tokens in a sequence using sine and cosine functions.",
      slug: "positional-encoding",
      category: "Technique",
      difficulty: "Intermediate"
    },
    {
      title: "Encoder-Decoder Architecture",
      description: "A two-stage framework where the encoder processes input and the decoder generates output sequentially.",
      slug: "encoder-decoder",
      category: "Architecture",
      difficulty: "Beginner"
    },
    {
      title: "In-Context Learning",
      description: "Learning to perform tasks from examples provided in the model's context without any weight updates or fine-tuning.",
      slug: "in-context-learning",
      category: "Learning Paradigm",
      difficulty: "Intermediate"
    },
    {
      title: "Few-Shot Learning",
      description: "Adapting to new tasks with just a handful of examples (typically 10-100), demonstrating rapid task adaptation.",
      slug: "few-shot-learning",
      category: "Learning Paradigm",
      difficulty: "Intermediate"
    },
    {
      title: "Zero-Shot Learning",
      description: "Performing tasks with only a task description and no examples, relying purely on pre-trained knowledge.",
      slug: "zero-shot-learning",
      category: "Learning Paradigm",
      difficulty: "Advanced"
    },
    {
      title: "Meta-Learning",
      description: "Learning how to learn - developing the ability to rapidly adapt to new tasks through exposure to many diverse tasks during training.",
      slug: "meta-learning",
      category: "Learning Paradigm",
      difficulty: "Advanced"
    },
    {
      title: "Autoregressive Language Model",
      description: "A model that generates sequences token-by-token, where each token is predicted based on all previous tokens.",
      slug: "autoregressive-language-model",
      category: "Architecture",
      difficulty: "Intermediate"
    },
    {
      title: "Masked Language Model",
      description: "A pretraining objective where random tokens are masked and the model learns to predict them based on bidirectional context.",
      slug: "masked-language-model",
      category: "Training Method",
      difficulty: "Intermediate"
    },
    {
      title: "Bidirectional Pretraining",
      description: "Training a language model by conditioning on context from both left and right directions simultaneously in all layers.",
      slug: "bidirectional-pretraining",
      category: "Training Method",
      difficulty: "Intermediate"
    },
    {
      title: "Next Sentence Prediction",
      description: "A binary classification task that predicts whether two sentences appear consecutively in the original text.",
      slug: "next-sentence-prediction",
      category: "Training Method",
      difficulty: "Intermediate"
    },
    {
      title: "Fine-Tuning",
      description: "Adapting a pretrained model to a specific task by continuing training on task-specific data with minimal additional parameters.",
      slug: "fine-tuning",
      category: "Training Method",
      difficulty: "Beginner"
    },
    {
      title: "Transfer Learning",
      description: "Applying knowledge gained from one task to improve learning and performance on a different but related task.",
      slug: "transfer-learning",
      category: "Learning Paradigm",
      difficulty: "Beginner"
    },
    {
      title: "Chain-of-Thought Prompting",
      description: "A prompting technique that elicits reasoning in large language models by demonstrating intermediate reasoning steps in few-shot exemplars.",
      slug: "chain-of-thought-prompting",
      category: "Prompting Technique",
      difficulty: "Intermediate"
    },
    {
      title: "Few-Shot Prompting",
      description: "Providing a language model with a few examples of a task in the prompt to guide its behavior without updating model weights.",
      slug: "few-shot-prompting",
      category: "Prompting Technique",
      difficulty: "Intermediate"
    },
    {
      title: "Reasoning Steps",
      description: "Intermediate computational steps that break down complex reasoning tasks into manageable sub-problems.",
      slug: "reasoning-steps",
      category: "Technique",
      difficulty: "Intermediate"
    },
    {
      title: "Emergent Abilities",
      description: "Capabilities that arise in large language models at sufficient scale but are not present in smaller models.",
      slug: "emergent-abilities",
      category: "Phenomenon",
      difficulty: "Advanced"
    },
    {
      title: "Arithmetic Reasoning",
      description: "The ability to solve mathematical word problems by combining mathematical operations with natural language understanding.",
      slug: "arithmetic-reasoning",
      category: "Task",
      difficulty: "Intermediate"
    },
    {
      title: "RLHF",
      description: "Reinforcement Learning from Human Feedback - using human preferences as a reward signal to align language models.",
      slug: "rlhf",
      category: "Training Method",
      difficulty: "Advanced"
    },
    {
      title: "Instruction Following",
      description: "The ability of a language model to understand and execute natural language instructions provided by users.",
      slug: "instruction-following",
      category: "Capability",
      difficulty: "Intermediate"
    },
    {
      title: "AI Alignment",
      description: "The challenge of ensuring AI systems behave in accordance with human values and intentions.",
      slug: "ai-alignment",
      category: "Research Area",
      difficulty: "Advanced"
    },
    {
      title: "Reward Modeling",
      description: "Training a model to predict human preferences between different outputs, used as a reward signal in reinforcement learning.",
      slug: "reward-modeling",
      category: "Training Method",
      difficulty: "Advanced"
    },
    {
      title: "PPO",
      description: "Proximal Policy Optimization - a reinforcement learning algorithm for stable, incremental policy updates.",
      slug: "ppo",
      category: "Algorithm",
      difficulty: "Advanced"
    },
    {
      title: "Tokenization",
      description: "The process of converting text into discrete units (tokens) that language models can process. Essential preprocessing step for all NLP systems.",
      slug: "tokenization",
      category: "Fundamentals",
      difficulty: "Beginner"
    },
    {
      title: "Layer Normalization",
      description: "A normalization technique that standardizes activations across features within each layer, stabilizing training and enabling deeper networks.",
      slug: "layer-normalization",
      category: "Architecture Components",
      difficulty: "Intermediate"
    },
    {
      title: "Residual Connections",
      description: "Skip connections that allow gradients to flow directly through deep networks by adding layer inputs to their outputs. Critical for training very deep architectures.",
      slug: "residual-connections",
      category: "Architecture Components",
      difficulty: "Intermediate"
    },
    {
      title: "Attention Mechanism",
      description: "A mechanism that allows neural networks to focus on relevant parts of the input when producing outputs, solving the fixed-length bottleneck in encoder-decoder architectures.",
      slug: "attention-mechanism",
      category: "Mechanism",
      difficulty: "Intermediate"
    },
    {
      title: "Soft Alignment",
      description: "A differentiable approach to alignment where all positions contribute with learned weights, enabling end-to-end training without explicit alignment supervision.",
      slug: "soft-alignment",
      category: "Technique",
      difficulty: "Intermediate"
    },
    {
      title: "Bidirectional RNN",
      description: "A recurrent neural network that processes sequences in both forward and backward directions, allowing each position to have context from both past and future.",
      slug: "bidirectional-rnn",
      category: "Architecture Components",
      difficulty: "Intermediate"
    },
    {
      title: "Bottleneck Architecture",
      description: "A design pattern that reduces dimensionality before expensive operations and then restores it, creating an efficiency bottleneck that enables deeper networks.",
      slug: "bottleneck-architecture",
      category: "Architecture Components",
      difficulty: "Advanced"
    },
    {
      title: "Identity Mapping",
      description: "A function that returns its input unchanged (f(x) = x), serving as a critical reference point for residual learning and enabling training of very deep networks.",
      slug: "identity-mapping",
      category: "Architecture Components",
      difficulty: "Intermediate"
    },
    {
      title: "Sequence-to-Sequence Models",
      description: "A neural network architecture that transforms one sequence into another, consisting of an encoder that processes the input and a decoder that generates the output.",
      slug: "seq2seq",
      category: "Architecture",
      difficulty: "Intermediate"
    },
    {
      title: "Low-Rank Adaptation (LoRA)",
      description: "A parameter-efficient fine-tuning technique that freezes pre-trained model weights and injects trainable low-rank decomposition matrices into each layer of the Transformer architecture.",
      slug: "low-rank-adaptation",
      category: "Training Method",
      difficulty: "Advanced"
    },
    {
      title: "Parameter-Efficient Fine-Tuning (PEFT)",
      description: "Techniques for adapting large pre-trained models to downstream tasks while training only a small fraction of parameters, including LoRA, adapters, and prefix tuning.",
      slug: "parameter-efficient-fine-tuning",
      category: "Training Method",
      difficulty: "Advanced"
    },
    {
      title: "Integro-Differential Equations for Transformers",
      description: "A mathematical framework interpreting Transformers as discretizations of continuous integro-differential equations where attention emerges as non-local integral operators.",
      slug: "integro-differential-equations-transformers",
      category: "Mathematical Foundations",
      difficulty: "Advanced"
    },
    {
      title: "Operator Splitting Methods",
      description: "Numerical techniques that decompose complex evolution equations into simpler substeps, enabling systematic design and interpretation of neural network architectures.",
      slug: "operator-splitting",
      category: "Mathematical Foundations",
      difficulty: "Advanced"
    },
    {
      title: "IO-Aware Algorithms",
      description: "Algorithms that explicitly account for data movement between different levels of memory hierarchy, optimizing for memory access patterns rather than just computational complexity.",
      slug: "io-aware-algorithms",
      category: "Optimization & Efficiency",
      difficulty: "Advanced"
    },
    {
      title: "GPU Memory Hierarchy",
      description: "The multi-level structure of memory in GPUs, from fast on-chip SRAM to slower high-bandwidth memory, with dramatic implications for algorithm performance.",
      slug: "gpu-memory-hierarchy",
      category: "Hardware & Systems",
      difficulty: "Intermediate"
    },
    {
      title: "Tiling Techniques",
      description: "Algorithm optimization strategy that divides large computations into smaller blocks (tiles) that fit in fast memory, enabling efficient processing of problems larger than available cache.",
      slug: "tiling-techniques",
      category: "Optimization & Efficiency",
      difficulty: "Advanced"
    },
    {
      title: "Kernel Fusion",
      description: "GPU optimization technique that combines multiple operations into a single kernel to eliminate intermediate memory writes and reads, dramatically improving performance for memory-bound operations.",
      slug: "kernel-fusion",
      category: "Optimization & Efficiency",
      difficulty: "Advanced"
    },
    {
      title: "Block-Sparse Attention",
      description: "Attention mechanism that only computes a predefined sparse pattern of attention blocks, reducing computational and memory costs from O(N²) to O(Ns) where s is the sparsity fraction.",
      slug: "block-sparse-attention",
      category: "Mechanism",
      difficulty: "Advanced"
    }
  ];

  const filteredConcepts = useMemo(() => {
    if (!searchQuery.trim()) return concepts;

    const query = searchQuery.toLowerCase();
    return concepts.filter(concept =>
      concept.title.toLowerCase().includes(query) ||
      concept.description.toLowerCase().includes(query) ||
      concept.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const categories = ["Architecture", "Architecture Components", "Mechanism", "Training Method", "Technique", "Learning Paradigm", "Prompting Technique", "Phenomenon", "Task", "Capability", "Research Area", "Algorithm", "Fundamentals", "Mathematical Foundations", "Optimization & Efficiency", "Hardware & Systems"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
              All Concepts
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-4 sm:mb-6">
              Explore machine learning concepts extracted from academic papers,
              with citations and creative explanations.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search concepts by title, description, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-lg border-2 border-slate-300 focus:border-violet-500 focus:outline-none shadow-sm transition-all"
                />
                <svg
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchQuery && (
                <p className="mt-2 text-sm text-slate-600">
                  Found {filteredConcepts.length} concept{filteredConcepts.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          {/* Concepts by Category */}
          {filteredConcepts.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <p className="text-xl sm:text-2xl text-slate-600">
                No concepts found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-violet-600 hover:text-violet-700 font-semibold text-sm sm:text-base"
              >
                Clear search
              </button>
            </div>
          ) : (
            categories.map(category => {
              const categoryConceptsCount = filteredConcepts.filter(c => c.category === category);
              if (categoryConceptsCount.length === 0) return null;

              return (
                <div key={category} className="mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <span className="w-1.5 sm:w-2 h-6 sm:h-8 bg-violet-500 rounded"></span>
                    <span className="flex-1">{category}</span>
                    <span className="text-base sm:text-lg text-slate-500 font-normal">
                      ({categoryConceptsCount.length})
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {filteredConcepts
                      .filter(concept => concept.category === category)
                      .map(concept => (
                      <Link
                        key={concept.slug}
                        to={`/wiki/${concept.slug}`}
                        className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6 border-l-4 border-violet-400 hover:border-violet-600"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                            {concept.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded shrink-0 ${
                            concept.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            concept.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {concept.difficulty}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3 sm:mb-4">
                          {concept.description}
                        </p>
                        <div className="flex items-center text-violet-600 font-semibold group-hover:translate-x-2 transition-transform text-sm sm:text-base">
                          Read more
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                      ))}
                  </div>
                </div>
              );
            })
          )}

          {/* Source Attribution */}
          {!searchQuery && (
            <div className="mt-12 sm:mt-16 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-3 sm:mb-4 flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">📚</span>
                Source Papers
              </h3>
              <p className="text-sm sm:text-base text-slate-700 mb-3 sm:mb-4">
                All concepts on this page are derived from:
              </p>
              <div className="space-y-2 sm:space-y-3">
                <div className="bg-white rounded-lg p-3 sm:p-4 border border-amber-200">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Neural Machine Translation by Jointly Learning to Align and Translate</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Bahdanau, D., Cho, K., & Bengio, Y. (2014)
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 border border-amber-200">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Deep Residual Learning for Image Recognition</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    He, K., Zhang, X., Ren, S., & Sun, J. (2015)
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 border border-amber-200">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Attention Is All You Need</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017)
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 border border-amber-200">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K. (2018)
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 border border-amber-200">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Language Models are Few-Shot Learners</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Brown, T. B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., et al. (2020)
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 border border-amber-200">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Chain-of-Thought Prompting Elicits Reasoning in Large Language Models</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E., Le, Q., & Zhou, D. (2022)
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 border border-amber-200">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">Training language models to follow instructions with human feedback</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Ouyang, L., Wu, J., Jiang, X., Almeida, D., Wainwright, C. L., Mishkin, P., et al. (2022)
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 border border-amber-200">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">LoRA: Low-Rank Adaptation of Large Language Models</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Hu, E., Shen, Y., Wallis, P., Allen-Zhu, Z., Li, Y., Wang, S., Wang, L., & Chen, W. (2021)
                  </p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 border border-amber-200">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">A Mathematical Explanation of Transformers for Large Language Models and GPTs</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Tai, X., Liu, H., Li, L., & Chan, R. H. (2025)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
