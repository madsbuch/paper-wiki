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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 pb-24">
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
          <p className="text-lg sm:text-xl md:text-2xl text-slate-700 mb-6 leading-relaxed px-4">
            Making machine learning papers accessible through
            <br />
            <span className="font-semibold text-violet-600">
              wiki entries
            </span>,{" "}
            <span className="font-semibold text-purple-600">essays</span>, and{" "}
            <span className="font-semibold text-pink-600">
              hands-on projects
            </span>
          </p>

          {/* AI-Generated Notice */}
          <div className="max-w-2xl mx-auto mb-8 bg-blue-50 border-l-4 border-blue-500 px-4 sm:px-6 py-3 sm:py-4 rounded-r-lg">
            <p className="text-slate-700 text-sm sm:text-base md:text-lg">
              <strong className="text-blue-900">🤖 Experimental Project:</strong> This is an experiment in AI-assisted knowledge synthesis. All content is AI-generated from academic papers, combining technical accuracy with creative explanations.
            </p>
          </div>

          <div className="inline-block bg-amber-100 border-l-4 border-amber-500 px-4 sm:px-6 py-3 sm:py-4 rounded-r-lg max-w-full">
            <p className="text-slate-700 text-sm sm:text-base md:text-lg">
              <strong className="text-amber-900">🔬 Evidence-Based:</strong> All
              content backed by citations from academic papers
            </p>
          </div>
        </div>
      </div>

      {/* Content Navigation Grid */}
      <main className="container mx-auto px-4 pb-12 sm:pb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">
          Explore the Knowledge Base
        </h2>
        <p className="text-center text-slate-600 text-base sm:text-lg mb-8 sm:mb-12 max-w-3xl mx-auto">
          Navigate through academic papers and discover concepts through multiple formats: technical documentation, narrative essays, and hands-on projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16">
          {/* Papers Card */}
          <Link
            to="/papers"
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 border-t-4 border-violet-500 hover:-translate-y-1"
          >
            <div className="text-4xl mb-3 sm:mb-4">📄</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-violet-600 mb-2 sm:mb-3 group-hover:text-violet-700">
              Papers
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3 sm:mb-4">
              Individual pages for each academic paper with full metadata, abstracts, key contributions, and links to related concepts. The source material for everything else.
            </p>
            <div className="text-violet-600 font-semibold group-hover:translate-x-2 transition-transform inline-block text-sm sm:text-base">
              Browse Papers →
            </div>
          </Link>

          {/* Wiki Card */}
          <Link
            to="/wiki"
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 border-t-4 border-blue-500 hover:-translate-y-1"
          >
            <div className="text-4xl mb-3 sm:mb-4">📚</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2 sm:mb-3 group-hover:text-blue-700">
              Wiki Concepts
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3 sm:mb-4">
              Structured documentation for specific concepts, methods, and ideas extracted from papers. Technical explanations paired with creative analogies for understanding.
            </p>
            <div className="text-blue-600 font-semibold group-hover:translate-x-2 transition-transform inline-block text-sm sm:text-base">
              Explore Concepts →
            </div>
          </Link>

          {/* Essays Card */}
          <Link
            to="/essays"
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 border-t-4 border-purple-500 hover:-translate-y-1"
          >
            <div className="text-4xl mb-3 sm:mb-4">✍️</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2 sm:mb-3 group-hover:text-purple-700">
              Essays
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3 sm:mb-4">
              Longer-form pieces (20-30 minutes) that synthesize knowledge from multiple papers into engaging narratives. Perfect for listening during walks or commutes.
            </p>
            <div className="text-purple-600 font-semibold group-hover:translate-x-2 transition-transform inline-block text-sm sm:text-base">
              Read Essays →
            </div>
          </Link>

          {/* Projects Card */}
          <Link
            to="/projects"
            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 border-t-4 border-pink-500 hover:-translate-y-1"
          >
            <div className="text-4xl mb-3 sm:mb-4">🛠️</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-2 sm:mb-3 group-hover:text-pink-700">
              Projects
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3 sm:mb-4">
              Language-agnostic implementation guides ranging from quick exercises to multi-week projects. Learn by building systems based on concepts from papers.
            </p>
            <div className="text-pink-600 font-semibold group-hover:translate-x-2 transition-transform inline-block text-sm sm:text-base">
              Start Building →
            </div>
          </Link>
        </div>

        {/* Featured Concepts Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">
            Featured Concepts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
        </div>
      </main>
    </div>
  );
}
