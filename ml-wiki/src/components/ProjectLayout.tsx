import type { ReactNode } from "react";
import { Link } from "react-router";
import Header from "./Header";

interface ProjectLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime?: string;
  relatedPapers?: Array<{ title: string; slug: string }>;
  relatedConcepts?: Array<{ name: string; slug: string }>;
  prerequisites?: string[];
}

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800 border-green-300",
  Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Advanced: "bg-red-100 text-red-800 border-red-300",
};

export default function ProjectLayout({
  children,
  title,
  description,
  difficulty,
  estimatedTime,
  relatedPapers,
  relatedConcepts,
  prerequisites,
}: ProjectLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <article className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-800 mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Projects
          </Link>

          {/* Project Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-3 sm:mb-4 leading-relaxed">
              {description}
            </p>
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm flex-wrap">
              <span
                className={`px-2 sm:px-3 py-1 rounded-full border font-medium ${difficultyColors[difficulty]}`}
              >
                {difficulty}
              </span>
              {estimatedTime && (
                <span className="flex items-center gap-1 text-slate-500">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {estimatedTime}
                </span>
              )}
              <span className="flex items-center gap-1 text-slate-500">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                Language-agnostic
              </span>
            </div>
          </div>

          {/* Prerequisites */}
          {prerequisites && prerequisites.length > 0 && (
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-2 sm:mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Prerequisites
              </h3>
              <ul className="space-y-1 text-sm sm:text-base text-slate-700">
                {prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5 sm:mt-1">•</span>
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Project Content */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-12 mdx-content">
            {children}
          </div>

          {/* Related Papers */}
          {relatedPapers && relatedPapers.length > 0 && (
            <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">📄</span>
                Papers Referenced
              </h2>
              <div className="grid gap-2 sm:gap-3">
                {relatedPapers.map((paper, index) => (
                  <Link
                    key={index}
                    to={`/papers/${paper.slug}`}
                    className="group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-50 rounded-lg hover:bg-violet-50 transition-colors border border-slate-200 hover:border-violet-300"
                  >
                    <span className="text-xl sm:text-2xl">📖</span>
                    <span className="text-sm sm:text-base text-slate-700 group-hover:text-violet-700 font-medium">
                      {paper.title}
                    </span>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 ml-auto text-slate-400 group-hover:text-violet-600 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Concepts */}
          {relatedConcepts && relatedConcepts.length > 0 && (
            <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">🔗</span>
                Related Concepts
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                {relatedConcepts.map((concept, index) => (
                  <Link
                    key={index}
                    to={`/wiki/${concept.slug}`}
                    className="group flex items-center gap-2 p-2 sm:p-3 bg-slate-50 rounded-lg hover:bg-violet-50 transition-colors border border-slate-200 hover:border-violet-300"
                  >
                    <span className="text-xs sm:text-sm text-slate-700 group-hover:text-violet-700 font-medium">
                      {concept.name}
                    </span>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 ml-auto text-slate-400 group-hover:text-violet-600 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm">
            All content derived from academic papers. Citations required for
            accuracy.
          </p>
        </div>
      </footer>
    </div>
  );
}
