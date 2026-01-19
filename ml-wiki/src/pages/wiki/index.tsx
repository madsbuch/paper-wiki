import { useState, useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import { useWikiIndex, useWikiCategories, type WikiConcept } from "../../hooks/useDatabase";

export default function WikiIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Load data from SQLite database
  const { data: concepts, loading, error } = useWikiIndex();
  const { data: categoriesData } = useWikiCategories();

  // Get unique categories from the data, or use categories from DB
  const categories = useMemo(() => {
    if (categoriesData && categoriesData.length > 0) {
      return categoriesData.map(c => c.category);
    }
    // Fallback: extract from concepts
    if (!concepts) return [];
    const cats = new Set(concepts.map(c => c.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [concepts, categoriesData]);

  // Filter concepts based on search query
  const filteredConcepts = useMemo(() => {
    if (!concepts) return [];
    if (!searchQuery.trim()) return concepts;

    const query = searchQuery.toLowerCase();
    return concepts.filter(concept =>
      concept.title.toLowerCase().includes(query) ||
      (concept.description?.toLowerCase().includes(query)) ||
      (concept.category?.toLowerCase().includes(query))
    );
  }, [concepts, searchQuery]);

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-lg p-6 h-40">
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
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
              <h2 className="text-xl font-bold text-red-900 mb-2">Error Loading Concepts</h2>
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
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
              All Concepts
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-4 sm:mb-6">
              Explore machine learning concepts extracted from academic papers,
              with citations and creative explanations.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search concepts by title, description, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg rounded-lg border-2 border-slate-300 focus:border-violet-500 focus:outline-none shadow-sm transition-all"
                />
                <svg
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-slate-400"
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
              {searchQuery && (
                <p className="mt-2 text-sm text-slate-600">
                  Found {filteredConcepts.length} concept{filteredConcepts.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          {/* Concepts by Category */}
          {filteredConcepts.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <p className="text-xl sm:text-2xl text-slate-600">
                No concepts found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-violet-600 hover:text-violet-700 font-semibold text-sm sm:text-base"
              >
                Clear search
              </button>
            </div>
          ) : (
            categories.map(category => {
              const categoryConcepts = filteredConcepts.filter(c => c.category === category);
              if (categoryConcepts.length === 0) return null;

              return (
                <div key={category} className="mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    <span className="w-1.5 sm:w-2 h-6 sm:h-8 bg-violet-500 rounded"></span>
                    <span className="flex-1">{category}</span>
                    <span className="text-base sm:text-lg text-slate-500 font-normal">
                      ({categoryConcepts.length})
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {categoryConcepts.map(concept => (
                      <ConceptCard key={concept.slug} concept={concept} />
                    ))}
                  </div>
                </div>
              );
            })
          )}

          {/* Show concepts without category */}
          {(() => {
            const uncategorized = filteredConcepts.filter(c => !c.category);
            if (uncategorized.length === 0) return null;
            
            return (
              <div className="mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <span className="w-1.5 sm:w-2 h-6 sm:h-8 bg-slate-400 rounded"></span>
                  <span className="flex-1">Other</span>
                  <span className="text-base sm:text-lg text-slate-500 font-normal">
                    ({uncategorized.length})
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {uncategorized.map(concept => (
                    <ConceptCard key={concept.slug} concept={concept} />
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Stats */}
          {!searchQuery && concepts && (
            <div className="mt-12 sm:mt-16 bg-violet-50 border-l-4 border-violet-500 rounded-r-lg p-4 sm:p-6">
              <p className="text-slate-700">
                <span className="font-bold text-violet-900">{concepts.length}</span> concepts across{" "}
                <span className="font-bold text-violet-900">{categories.length}</span> categories
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/**
 * Concept card component
 */
function ConceptCard({ concept }: { concept: WikiConcept }) {
  return (
    <Link
      to={`/wiki/${concept.slug}`}
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6 border-l-4 border-violet-400 hover:border-violet-600"
    >
      <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
          {concept.title}
        </h3>
        {concept.difficulty && (
          <span className={`text-xs px-2 py-1 rounded shrink-0 ${
            concept.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
            concept.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {concept.difficulty}
          </span>
        )}
      </div>
      {concept.description && (
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3 sm:mb-4">
          {concept.description}
        </p>
      )}
      <div className="flex items-center text-violet-600 font-semibold group-hover:translate-x-2 transition-transform text-sm sm:text-base">
        Read more
        <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
