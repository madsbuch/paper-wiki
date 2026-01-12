import type { ReactNode } from "react";
import { Link } from "react-router";

interface PaperLayoutProps {
  title: string;
  authors: string;
  year: string;
  venue: string;
  arxivId: string;
  pdfPath: string;
  abstract: string;
  keyContributions: string[];
  relatedConcepts: Array<{ name: string; slug: string }>;
  impact: string;
  children?: ReactNode;
}

export default function PaperLayout({
  title,
  authors,
  year,
  venue,
  arxivId,
  pdfPath,
  abstract,
  keyContributions,
  relatedConcepts,
  impact,
  children,
}: PaperLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold text-slate-900 hover:text-violet-600 transition-colors"
            >
              ML Wiki
            </Link>
            <nav className="flex gap-6">
              <Link
                to="/wiki"
                className="text-slate-600 hover:text-violet-600 transition-colors"
              >
                Wiki
              </Link>
              <Link
                to="/papers"
                className="text-slate-600 hover:text-violet-600 transition-colors"
              >
                Papers
              </Link>
              <Link
                to="/essays"
                className="text-slate-600 hover:text-violet-600 transition-colors"
              >
                Essays
              </Link>
              <Link
                to="/projects"
                className="text-slate-600 hover:text-violet-600 transition-colors"
              >
                Projects
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            to="/papers"
            className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-800 mb-6 transition-colors"
          >
            <svg
              className="w-5 h-5"
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
            Back to Papers
          </Link>

          {/* Paper Header */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-violet-500 mb-8">
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-8 border-b border-violet-100">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-slate-900 mb-4">
                    {title}
                  </h1>
                  <p className="text-lg text-slate-600 mb-3">{authors}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {year}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      {venue}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      arXiv:{arxivId}
                    </span>
                  </div>
                </div>
                <a
                  href={pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors shadow-md hover:shadow-lg"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  View PDF
                </a>
              </div>
            </div>

            {/* Abstract */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Abstract
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                {abstract}
              </p>
            </div>
          </div>

          {/* Key Contributions */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">🎯</span>
              Key Contributions
            </h2>
            <ul className="space-y-3">
              {keyContributions.map((contribution, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-violet-500 font-bold mt-1">•</span>
                  <span className="text-slate-700 leading-relaxed">
                    {contribution}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-lg p-8 mb-8 border-l-4 border-amber-500">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-3xl">💡</span>
              Impact
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg">{impact}</p>
          </div>

          {/* Related Concepts */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-3xl">🔗</span>
              Related Concepts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedConcepts.map((concept, index) => (
                <Link
                  key={index}
                  to={`/wiki/${concept.slug}`}
                  className="group flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-violet-50 transition-colors border border-slate-200 hover:border-violet-300"
                >
                  <span className="text-2xl">📖</span>
                  <span className="text-slate-700 group-hover:text-violet-700 font-medium">
                    {concept.name}
                  </span>
                  <svg
                    className="w-5 h-5 ml-auto text-slate-400 group-hover:text-violet-600 transition-colors"
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

          {/* Additional Content */}
          {children && (
            <div className="bg-white rounded-xl shadow-lg p-8">{children}</div>
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
