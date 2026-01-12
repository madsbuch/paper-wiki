import type { ReactNode } from "react";
import { Link } from "react-router";
import Logo from "./Logo";

interface EssayLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  readingTime: string;
  audioPath?: string; // Path to audio file, e.g., "/audio/evolution-of-attention.mp3"
  relatedPapers?: Array<{ title: string; slug: string }>;
  relatedConcepts?: Array<{ name: string; slug: string }>;
  citations?: Array<{
    paper: string;
    authors: string;
    year: string;
    pages?: string;
  }>;
}

// Map paper titles to their slugs for linking
const getPaperSlug = (paperTitle: string): string | null => {
  const slugMap: Record<string, string> = {
    "Attention Is All You Need": "attention-is-all-you-need",
    "Language Models are Few-Shot Learners": "gpt3-few-shot-learners",
    "Language Models are Few-Shot Learners (GPT-3)": "gpt3-few-shot-learners",
    "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding":
      "bert",
    "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models":
      "chain-of-thought-prompting",
    "Training language models to follow instructions with human feedback":
      "instructgpt",
  };

  return slugMap[paperTitle] || null;
};

export default function EssayLayout({
  children,
  title,
  description,
  readingTime,
  audioPath,
  relatedPapers,
  relatedConcepts,
  citations,
}: EssayLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <Logo className="w-8 h-8 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                ML Wiki
              </span>
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
        <article className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/essays"
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
            Back to Essays
          </Link>

          {/* Essay Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-slate-900 mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-slate-600 mb-4 leading-relaxed">
              {description}
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {readingTime}
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
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
                Audio-friendly
              </span>
            </div>
          </div>

          {/* Audio Player */}
          {audioPath && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl shadow-lg p-6 mb-8 border-l-4 border-emerald-500">
              <div className="flex items-center gap-4 mb-3">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Listen to this essay
                  </h3>
                  <p className="text-sm text-slate-600">
                    Perfect for walks, commutes, or while doing other activities
                  </p>
                </div>
              </div>
              <audio controls className="w-full" preload="metadata">
                <source src={audioPath} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <div className="mt-3 text-xs text-slate-500 flex items-center gap-4">
                <span>Audio generated with OpenAI TTS</span>
                <a
                  href={audioPath}
                  download
                  className="text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
                >
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
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download MP3
                </a>
              </div>
            </div>
          )}

          {/* Essay Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mdx-content">
            {children}
          </div>

          {/* Related Papers */}
          {relatedPapers && relatedPapers.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">📄</span>
                Papers Referenced
              </h2>
              <div className="grid gap-3">
                {relatedPapers.map((paper, index) => (
                  <Link
                    key={index}
                    to={`/papers/${paper.slug}`}
                    className="group flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-violet-50 transition-colors border border-slate-200 hover:border-violet-300"
                  >
                    <span className="text-2xl">📖</span>
                    <span className="text-slate-700 group-hover:text-violet-700 font-medium">
                      {paper.title}
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
          )}

          {/* Related Concepts */}
          {relatedConcepts && relatedConcepts.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">🔗</span>
                Related Concepts
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {relatedConcepts.map((concept, index) => (
                  <Link
                    key={index}
                    to={`/wiki/${concept.slug}`}
                    className="group flex items-center gap-2 p-3 bg-slate-50 rounded-lg hover:bg-violet-50 transition-colors border border-slate-200 hover:border-violet-300"
                  >
                    <span className="text-slate-700 group-hover:text-violet-700 font-medium text-sm">
                      {concept.name}
                    </span>
                    <svg
                      className="w-4 h-4 ml-auto text-slate-400 group-hover:text-violet-600 transition-colors"
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

          {/* Citations Section */}
          {citations && citations.length > 0 && (
            <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">📚</span>
                Citations
              </h2>
              <div className="space-y-3">
                {citations.map((citation, index) => {
                  const paperSlug = getPaperSlug(citation.paper);

                  return (
                    <div key={index} className="text-slate-700 leading-relaxed">
                      <span className="font-semibold text-amber-900">
                        [{index + 1}]
                      </span>{" "}
                      {paperSlug ? (
                        <Link
                          to={`/papers/${paperSlug}`}
                          className="text-violet-600 hover:text-violet-800 hover:underline font-medium"
                        >
                          {citation.paper}
                        </Link>
                      ) : (
                        <span className="font-medium">{citation.paper}</span>
                      )}
                      . {citation.authors} ({citation.year})
                      {citation.pages && `, pp. ${citation.pages}`}
                    </div>
                  );
                })}
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
