import { useState, useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import { useEssaysIndex, type Essay, parseTags, parseRelatedPapers } from "../../hooks/useDatabase";

export default function EssaysIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Load data from SQLite database
  const { data: essays, loading, error } = useEssaysIndex();

  // Filter essays based on search query
  const filteredEssays = useMemo(() => {
    if (!essays) return [];
    if (!searchQuery.trim()) return essays;

    const query = searchQuery.toLowerCase();
    return essays.filter(essay => {
      const tags = parseTags(essay.tags);
      const relatedPapers = parseRelatedPapers(essay.related_papers);
      return (
        essay.title.toLowerCase().includes(query) ||
        (essay.description?.toLowerCase().includes(query)) ||
        tags.some(tag => tag.toLowerCase().includes(query)) ||
        relatedPapers.some(paper => paper.title.toLowerCase().includes(query))
      );
    });
  }, [essays, searchQuery]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-24">
        <Header />
        <main className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-12 bg-slate-200 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-slate-200 rounded w-2/3 mb-8"></div>
              <div className="grid gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-xl p-6 md:p-8">
                    <div className="h-8 bg-slate-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-slate-200 rounded w-20"></div>
                      <div className="h-6 bg-slate-200 rounded w-24"></div>
                    </div>
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
              <h2 className="text-xl font-bold text-red-900 mb-2">Error Loading Essays</h2>
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
              Essays
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8">
              Long-form explorations that synthesize knowledge from multiple papers. Perfect for walks, commutes, or deep reading sessions.
            </p>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search essays by title, topic, or related paper..."
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
              {essays && (filteredEssays.length === essays.length
                ? `${essays.length} ${essays.length === 1 ? 'essay' : 'essays'} available`
                : `Found ${filteredEssays.length} of ${essays.length} essays`)}
            </p>
          </div>

          {/* Essays Grid */}
          <div className="grid gap-4 sm:gap-6">
            {filteredEssays.map((essay) => (
              <EssayCard key={essay.slug} essay={essay} />
            ))}
          </div>

          {/* No results message */}
          {filteredEssays.length === 0 && (
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
              <p className="text-xl text-slate-600 mb-2">No essays found</p>
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

/**
 * Essay card component
 */
function EssayCard({ essay }: { essay: Essay }) {
  const tags = parseTags(essay.tags);
  const relatedPapers = parseRelatedPapers(essay.related_papers);
  
  return (
    <Link
      to={`/essays/${essay.slug}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border-l-4 border-emerald-500 hover:border-emerald-600"
    >
      <div className="p-4 sm:p-6 md:p-8">
        {/* Essay Header */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2 sm:mb-3">
              {essay.title}
            </h2>
            {essay.description && (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3 sm:mb-4">
                {essay.description}
              </p>
            )}
          </div>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0 mt-1 sm:mt-2"
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

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">
          {essay.reading_time && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {essay.reading_time}
            </span>
          )}
          {essay.audio_path && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              Audio available
            </span>
          )}
          {relatedPapers.length > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {relatedPapers.length} papers
            </span>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-emerald-100 text-emerald-700 rounded-full"
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
