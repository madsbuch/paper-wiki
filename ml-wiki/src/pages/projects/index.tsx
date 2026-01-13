import { useState } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";

interface Project {
  title: string;
  slug: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  relatedPapers: string[];
  tags: string[];
}

const projects: Project[] = [
  {
    title: "Building a Small Transformer for Translation",
    slug: "transformer-translation",
    description: "Learn how to implement a complete Transformer model for sequence-to-sequence translation, following the architecture from the original paper.",
    difficulty: "Advanced",
    estimatedTime: "2-3 weeks",
    relatedPapers: ["Attention Is All You Need"],
    tags: ["Transformer", "Attention", "Translation", "Seq2Seq"]
  },
  {
    title: "Implementing Few-Shot Learning with Prompt Engineering",
    slug: "few-shot-learning",
    description: "Build a practical few-shot learning system using prompt engineering techniques. Learn how to select examples, design templates, and integrate chain-of-thought reasoning.",
    difficulty: "Intermediate",
    estimatedTime: "1-2 weeks",
    relatedPapers: ["Language Models are Few-Shot Learners", "Chain-of-Thought Prompting"],
    tags: ["Few-Shot Learning", "Prompt Engineering", "Chain-of-Thought", "In-Context Learning"]
  }
];

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800 border-green-300",
  Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Advanced: "bg-red-100 text-red-800 border-red-300",
};

export default function ProjectsIndex() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(project => {
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query)) ||
      project.relatedPapers.some(paper => paper.toLowerCase().includes(query)) ||
      project.difficulty.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
            Implementation Projects
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600">
            Language-agnostic guides for building systems based on concepts from research papers.
            Learn by implementing complete architectures and algorithms.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
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
            <input
              type="text"
              placeholder="Search projects by title, description, difficulty, tags, or papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all outline-none text-slate-900"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="max-w-4xl mx-auto grid gap-4 sm:gap-6">
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 text-center">
              <p className="text-slate-600 text-base sm:text-lg">
                No projects found matching "{searchQuery}"
              </p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-4 sm:p-6 border-2 border-transparent hover:border-violet-300"
              >
                <div className="flex items-start justify-between gap-3 mb-2 sm:mb-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                    {project.title}
                  </h2>
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-violet-600 transition-colors flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                  <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border text-xs sm:text-sm font-medium ${difficultyColors[project.difficulty]}`}>
                    {project.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-xs sm:text-sm text-slate-500">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {project.estimatedTime}
                  </span>
                  <span className="flex items-center gap-1 text-xs sm:text-sm text-slate-500">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Language-agnostic
                  </span>
                </div>

                {/* Related Papers */}
                {project.relatedPapers.length > 0 && (
                  <div className="mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 mb-2">Based on papers:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.relatedPapers.map((paper, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-violet-100 text-violet-700 rounded-md"
                        >
                          {paper}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm">
            All content derived from academic papers. Citations required for accuracy.
          </p>
        </div>
      </footer>
    </div>
  );
}
