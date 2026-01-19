import { useState, useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import { usePapersIndex, type Paper, parseTags } from "../../hooks/useDatabase";

export default function PapersIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Load data from SQLite database
  const { data: papers, loading, error } = usePapersIndex();

  // Filter papers based on search query
  const filteredPapers = useMemo(() => {
    if (!papers) return [];
    if (!searchQuery.trim()) return papers;

    const query = searchQuery.toLowerCase();
    return papers.filter(paper => {
      const tags = parseTags(paper.tags);
      return (
        paper.title.toLowerCase().includes(query) ||
        paper.authors.toLowerCase().includes(query) ||
        (paper.abstract?.toLowerCase().includes(query)) ||
        tags.some(tag => tag.toLowerCase().includes(query)) ||
        (paper.year?.toString().includes(query))
      );
    });
  }, [papers, searchQuery]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
        <Header />
        <main className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-12 bg-slate-200 rounded w-1/3 mb-4"></div>
              <div className="h-6 bg-slate-200 rounded w-2/3 mb-8"></div>
              <div className="grid gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-xl p-6">
                    <div className="h-8 bg-slate-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
        <Header />
        <main className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-bold text-red-900 mb-2">Error Loading Papers</h2>
              <p className="text-red-700">{error.message}</p>
              <p className="text-sm text-red-600 mt-2">
                Make sure the database has been synced: <code className="bg-red-100 px-2 py-1 rounded">bun run db:sync</code>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
              Academic Papers
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8">
              Source materials for all concepts in this wiki. Every claim is derived from and cited back to these papers.
            </p>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, author, keyword, or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-14 text-base sm:text-lg rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none shadow-sm"
              />
              <svg
                className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-slate-400"
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
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600">
              {papers && (filteredPapers.length === papers.length
                ? `Showing all ${papers.length} papers`
                : `Found ${filteredPapers.length} of ${papers.length} papers`)}
            </p>
          </div>

          {/* Papers Grid */}
          <div className="grid gap-4 sm:gap-6">
            {filteredPapers.map((paper) => (
              <PaperCard key={paper.slug} paper={paper} />
            ))}
          </div>

          {/* No results message */}
          {filteredPapers.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-3 sm:mb-4"
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
              <p className="text-lg sm:text-xl text-slate-600 mb-1 sm:mb-2">No papers found</p>
              <p className="text-sm sm:text-base text-slate-500">Try adjusting your search query</p>
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

/**
 * Paper card component
 */
function PaperCard({ paper }: { paper: Paper }) {
  const tags = parseTags(paper.tags);
  
  return (
    <Link
      to={`/papers/${paper.slug}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border-l-4 border-violet-500 hover:border-violet-600"
    >
      <div className="p-4 sm:p-6">
        {/* Paper Header */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-2 sm:mb-3">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
            {paper.title}
          </h2>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-violet-600 transition-colors shrink-0 mt-0.5 sm:mt-1"
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
        <p className="text-sm sm:text-base text-slate-600 mb-2 sm:mb-3">
          {paper.authors}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">
          {paper.year && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {paper.year}
            </span>
          )}
          {paper.venue && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {paper.venue}
            </span>
          )}
          {paper.arxiv_id && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              arXiv:{paper.arxiv_id}
            </span>
          )}
        </div>

        {/* Abstract */}
        {paper.abstract && (
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
            {paper.abstract}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-violet-100 text-violet-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
