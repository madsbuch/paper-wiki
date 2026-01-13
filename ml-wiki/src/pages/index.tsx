import { Link } from "react-router";
import Logo from "../components/Logo";
import Header from "../components/Header";

export default function Home() {
  console.log("Showing index.tsx");

  const featuredConcepts = [
    {
      title: "Transformer Architecture",
      description:
        "A revolutionary neural network architecture based solely on attention mechanisms",
      slug: "transformer-architecture",
      color: "violet",
    },
    {
      title: "Self-Attention",
      description:
        "An attention mechanism that relates different positions of a single sequence",
      slug: "self-attention",
      color: "blue",
    },
    {
      title: "Multi-Head Attention",
      description:
        "Multiple attention mechanisms running in parallel to capture different aspects",
      slug: "multi-head-attention",
      color: "purple",
    },
    {
      title: "In-Context Learning",
      description:
        "Learning to perform tasks from examples in context without weight updates",
      slug: "in-context-learning",
      color: "emerald",
    },
    {
      title: "Few-Shot Learning",
      description: "Adapting to new tasks with just a handful of examples",
      slug: "few-shot-learning",
      color: "amber",
    },
    {
      title: "Meta-Learning",
      description:
        "Learning how to learn - developing rapid task adaptation abilities",
      slug: "meta-learning",
      color: "rose",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <Header />

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-12 sm:pt-20 pb-12 sm:pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-3 sm:gap-4">
            <Logo className="w-16 h-16 sm:w-20 sm:h-20" />
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
              ML Wiki
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed px-4">
            Making machine learning papers accessible through
            <br />
            <span className="font-semibold text-violet-600">
              wiki entries
            </span>,{" "}
            <span className="font-semibold text-purple-600">stories</span>, and{" "}
            <span className="font-semibold text-pink-600">
              creative explanations
            </span>
          </p>
          <div className="inline-block bg-amber-100 border-l-4 border-amber-500 px-4 sm:px-6 py-3 sm:py-4 rounded-r-lg max-w-full">
            <p className="text-slate-700 text-sm sm:text-base md:text-lg">
              <strong className="text-amber-900">🔬 Evidence-Based:</strong> All
              content backed by citations from academic papers
            </p>
          </div>
        </div>
      </div>

      {/* Featured Concepts Grid */}
      <main className="container mx-auto px-4 pb-12 sm:pb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 sm:mb-12 text-center">
          Featured Concepts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {featuredConcepts.map((concept) => (
            <Link
              key={concept.slug}
              to={`/wiki/${concept.slug}`}
              className={`group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 border-t-4 border-${concept.color}-500 hover:-translate-y-1`}
            >
              <h3
                className={`text-xl sm:text-2xl font-bold text-${concept.color}-600 mb-2 sm:mb-3 group-hover:text-${concept.color}-700`}
              >
                {concept.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {concept.description}
              </p>
              <div className="mt-3 sm:mt-4 text-violet-600 font-semibold group-hover:translate-x-2 transition-transform inline-block text-sm sm:text-base">
                Read more →
              </div>
            </Link>
          ))}
        </div>

        {/* Papers Section */}
        <div className="mt-12 sm:mt-20 max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
            📄 Available Papers
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-4 sm:p-6 border border-violet-200">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                Attention Is All You Need
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mb-2">Vaswani et al. (2017)</p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                The groundbreaking paper that introduced the Transformer
                architecture, revolutionizing natural language processing and
                becoming the foundation for models like GPT, BERT, and countless
                others.
              </p>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 sm:p-6 border border-emerald-200">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                Language Models are Few-Shot Learners
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mb-2">Brown et al. (2020)</p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                The GPT-3 paper that demonstrated powerful in-context learning
                at scale, showing that 175 billion parameter models can perform
                tasks from just a few examples without fine-tuning.
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 text-center">
            <Link
              to="/papers"
              className="inline-block bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
            >
              View All Papers →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
