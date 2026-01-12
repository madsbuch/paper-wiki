import { ReactNode } from "react";
import { Link } from "react-router";

interface WikiLayoutProps {
  children: ReactNode;
  title: string;
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
    "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding": "bert",
    "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models": "chain-of-thought-prompting",
    "Training language models to follow instructions with human feedback": "instructgpt",
  };

  return slugMap[paperTitle] || null;
};

export default function WikiLayout({ children, title, citations }: WikiLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-slate-900 hover:text-violet-600 transition-colors">
              ML Wiki
            </Link>
            <nav className="flex gap-6">
              <Link to="/wiki" className="text-slate-600 hover:text-violet-600 transition-colors">
                All Concepts
              </Link>
              <Link to="/papers" className="text-slate-600 hover:text-violet-600 transition-colors">
                Papers
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-5xl font-bold text-slate-900 mb-8 border-b-4 border-violet-500 pb-4">
            {title}
          </h1>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mdx-content">
            {children}
          </div>

          {/* Citations Section */}
          {citations && citations.length > 0 && (
            <div className="mt-12 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">📚</span>
                Citations
              </h2>
              <div className="space-y-3">
                {citations.map((citation, index) => {
                  const paperSlug = getPaperSlug(citation.paper);

                  return (
                    <div key={index} className="text-slate-700 leading-relaxed">
                      <span className="font-semibold text-amber-900">[{index + 1}]</span>{" "}
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
            All content derived from academic papers. Citations required for accuracy.
          </p>
        </div>
      </footer>
    </div>
  );
}
