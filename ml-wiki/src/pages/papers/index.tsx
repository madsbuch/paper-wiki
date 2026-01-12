import { useState } from "react";
import { Link } from "react-router";

interface Paper {
  title: string;
  authors: string;
  year: string;
  venue: string;
  arxivId: string;
  slug: string;
  abstract: string;
  tags: string[];
}

export default function PapersIndex() {
  const [searchQuery, setSearchQuery] = useState("");

  const papers: Paper[] = [
    {
      title: "Attention Is All You Need",
      authors: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I.",
      year: "2017",
      venue: "NIPS 2017",
      arxivId: "1706.03762v7",
      slug: "attention-is-all-you-need",
      abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
      tags: ["Architecture", "Attention", "Transformer", "NLP"]
    },
    {
      title: "Language Models are Few-Shot Learners",
      authors: "Brown, T. B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P., et al.",
      year: "2020",
      venue: "NeurIPS 2020",
      arxivId: "2005.14165v4",
      slug: "gpt3-few-shot-learners",
      abstract: "We train GPT-3, a 175 billion parameter autoregressive language model, and test its in-context learning abilities. We evaluate GPT-3 on over two dozen NLP datasets in zero-shot, one-shot, and few-shot settings.",
      tags: ["GPT", "Few-Shot Learning", "In-Context Learning", "Scaling"]
    },
    {
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: "Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K.",
      year: "2018",
      venue: "NAACL 2019",
      arxivId: "1810.04805v2",
      slug: "bert",
      abstract: "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pretrain deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers.",
      tags: ["BERT", "Pretraining", "Bidirectional", "Transfer Learning"]
    },
    {
      title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
      authors: "Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E., Le, Q., & Zhou, D.",
      year: "2022",
      venue: "NeurIPS 2022",
      arxivId: "2201.11903v6",
      slug: "chain-of-thought-prompting",
      abstract: "We explore how generating a chain of thought—a series of intermediate reasoning steps—significantly improves the ability of large language models to perform complex reasoning.",
      tags: ["Prompting", "Reasoning", "Emergent Abilities", "Few-Shot"]
    },
    {
      title: "Training language models to follow instructions with human feedback",
      authors: "Ouyang, L., Wu, J., Jiang, X., Almeida, D., Wainwright, C. L., Mishkin, P., et al.",
      year: "2022",
      venue: "arXiv preprint",
      arxivId: "2203.02155v1",
      slug: "instructgpt",
      abstract: "Making language models bigger does not inherently make them better at following a user's intent. In this paper, we show an avenue for aligning language models with user intent on a wide range of tasks by fine-tuning with human feedback. We call the resulting models InstructGPT.",
      tags: ["RLHF", "Alignment", "InstructGPT", "Human Feedback"]
    }
  ];

  const filteredPapers = papers.filter(paper => {
    const query = searchQuery.toLowerCase();
    return (
      paper.title.toLowerCase().includes(query) ||
      paper.authors.toLowerCase().includes(query) ||
      paper.abstract.toLowerCase().includes(query) ||
      paper.tags.some(tag => tag.toLowerCase().includes(query)) ||
      paper.year.includes(query)
    );
  });

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
              <Link to="/papers" className="text-violet-600 font-semibold">
                Papers
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">
              Academic Papers
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Source materials for all concepts in this wiki. Every claim is derived from and cited back to these papers.
            </p>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, author, keyword, or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 text-lg rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none shadow-sm"
              />
              <svg
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400"
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

            {/* Results count */}
            <p className="mt-4 text-slate-600">
              {filteredPapers.length === papers.length
                ? `Showing all ${papers.length} papers`
                : `Found ${filteredPapers.length} of ${papers.length} papers`}
            </p>
          </div>

          {/* Papers Grid */}
          <div className="grid gap-6">
            {filteredPapers.map((paper) => (
              <Link
                key={paper.slug}
                to={`/papers/${paper.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border-l-4 border-violet-500 hover:border-violet-600"
              >
                <div className="p-6">
                  {/* Paper Header */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-2xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                      {paper.title}
                    </h2>
                    <svg
                      className="w-6 h-6 text-slate-400 group-hover:text-violet-600 transition-colors shrink-0 mt-1"
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
                  </div>

                  {/* Authors */}
                  <p className="text-slate-600 mb-3">
                    {paper.authors}
                  </p>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {paper.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {paper.venue}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      arXiv:{paper.arxivId}
                    </span>
                  </div>

                  {/* Abstract */}
                  <p className="text-slate-700 leading-relaxed mb-4 line-clamp-3">
                    {paper.abstract}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {paper.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-violet-100 text-violet-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No results message */}
          {filteredPapers.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-slate-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 21a9 9 0 110-18 9 9 0 010 18z"
                />
              </svg>
              <p className="text-xl text-slate-600 mb-2">No papers found</p>
              <p className="text-slate-500">Try adjusting your search query</p>
            </div>
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
