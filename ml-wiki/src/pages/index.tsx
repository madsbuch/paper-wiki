import { Link } from "react-router";
import Logo from "../components/Logo";

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
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6 gap-4">
            <Logo className="w-20 h-20" />
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
              ML Wiki
            </h1>
          </div>
          <p className="text-2xl text-slate-700 mb-8 leading-relaxed">
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
          <div className="inline-block bg-amber-100 border-l-4 border-amber-500 px-6 py-4 rounded-r-lg">
            <p className="text-slate-700 text-lg">
              <strong className="text-amber-900">🔬 Evidence-Based:</strong> All
              content backed by citations from academic papers
            </p>
          </div>
        </div>
      </header>

      {/* Featured Concepts Grid */}
      <main className="container mx-auto px-4 pb-20">
        <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
          Featured Concepts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {featuredConcepts.map((concept) => (
            <Link
              key={concept.slug}
              to={`/wiki/${concept.slug}`}
              className={`group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-t-4 border-${concept.color}-500 hover:-translate-y-1`}
            >
              <h3
                className={`text-2xl font-bold text-${concept.color}-600 mb-3 group-hover:text-${concept.color}-700`}
              >
                {concept.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {concept.description}
              </p>
              <div className="mt-4 text-violet-600 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                Read more →
              </div>
            </Link>
          ))}
        </div>

        {/* Papers Section */}
        <div className="mt-20 max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            📄 Available Papers
          </h2>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-6 border border-violet-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Attention Is All You Need
              </h3>
              <p className="text-slate-600 mb-2">Vaswani et al. (2017)</p>
              <p className="text-slate-700 leading-relaxed">
                The groundbreaking paper that introduced the Transformer
                architecture, revolutionizing natural language processing and
                becoming the foundation for models like GPT, BERT, and countless
                others.
              </p>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Language Models are Few-Shot Learners
              </h3>
              <p className="text-slate-600 mb-2">Brown et al. (2020)</p>
              <p className="text-slate-700 leading-relaxed">
                The GPT-3 paper that demonstrated powerful in-context learning
                at scale, showing that 175 billion parameter models can perform
                tasks from just a few examples without fine-tuning.
              </p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/papers"
              className="inline-block bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Papers →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
