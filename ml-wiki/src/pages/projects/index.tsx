import { useState, useMemo } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";
import { useProjectsIndex, type Project, parseTags, parseRelatedPapers } from "../../hooks/useDatabase";

type ProjectCategory = "Exercise" | "Weekend Project" | "Large Project";

const categoryColors: Record<string, string> = {
  "Exercise": "bg-blue-100 text-blue-800 border-blue-300",
  "Weekend Project": "bg-purple-100 text-purple-800 border-purple-300",
  "Large Project": "bg-orange-100 text-orange-800 border-orange-300",
};

const difficultyColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-800 border-green-300",
  Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Advanced: "bg-red-100 text-red-800 border-red-300",
};

export default function ProjectsIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "All">("All");
  
  // Load data from SQLite database
  const { data: projects, loading, error } = useProjectsIndex();

  // Filter projects based on search query and category
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    
    return projects.filter(project => {
      const query = searchQuery.toLowerCase();
      const tags = parseTags(project.tags);
      const relatedPapers = parseRelatedPapers(project.related_papers);
      
      const matchesSearch = !searchQuery.trim() || (
        project.title.toLowerCase().includes(query) ||
        (project.description?.toLowerCase().includes(query)) ||
        tags.some(tag => tag.toLowerCase().includes(query)) ||
        relatedPapers.some(paper => paper.title.toLowerCase().includes(query)) ||
        (project.difficulty?.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query)
      );

      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategory]);

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
              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-10 bg-slate-200 rounded-full w-28"></div>
                ))}
              </div>
              <div className="grid gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-xl p-6 md:p-8">
                    <div className="h-8 bg-slate-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-slate-200 rounded w-24"></div>
                      <div className="h-6 bg-slate-200 rounded w-20"></div>
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
              <h2 className="text-xl font-bold text-red-900 mb-2">Error Loading Projects</h2>
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
              Projects
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8">
              Hands-on projects ranging from quick exercises to multi-week implementations.
              Learn by building systems based on concepts from research papers.
            </p>

            {/* Search Bar */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search projects by title, category, difficulty, tags, or papers..."
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

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(["All", "Exercise", "Weekend Project", "Large Project"] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-violet-600 text-white"
                      : "bg-white text-slate-700 hover:bg-violet-50 border border-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-sm sm:text-base text-slate-600">
              {projects && (filteredProjects.length === projects.length
                ? `${projects.length} ${projects.length === 1 ? 'project' : 'projects'} available`
                : `Found ${filteredProjects.length} of ${projects.length} projects`)}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-4 sm:gap-6">
            {filteredProjects.length === 0 ? (
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
                <p className="text-xl text-slate-600 mb-2">No projects found</p>
                <p className="text-slate-500">Try adjusting your search or filter</p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))
            )}
          </div>
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
 * Project card component
 */
function ProjectCard({ project }: { project: Project }) {
  const tags = parseTags(project.tags);
  const relatedPapers = parseRelatedPapers(project.related_papers);
  
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border-l-4 border-violet-500 hover:border-violet-600"
    >
      <div className="p-4 sm:p-6 md:p-8">
        {/* Project Header */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors mb-2 sm:mb-3">
              {project.title}
            </h2>
            {project.description && (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3 sm:mb-4">
                {project.description}
              </p>
            )}
          </div>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-violet-600 transition-colors shrink-0 mt-1 sm:mt-2"
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
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border text-xs sm:text-sm font-medium ${categoryColors[project.category] || "bg-slate-100 text-slate-800"}`}>
            {project.category}
          </span>
          {project.difficulty && (
            <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border text-xs sm:text-sm font-medium ${difficultyColors[project.difficulty] || "bg-slate-100 text-slate-800"}`}>
              {project.difficulty}
            </span>
          )}
          {project.estimated_time && (
            <span className="flex items-center gap-1 text-xs sm:text-sm text-slate-500">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {project.estimated_time}
            </span>
          )}
          {relatedPapers.length > 0 && (
            <span className="flex items-center gap-1 text-xs sm:text-sm text-slate-500">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {relatedPapers.length} papers
            </span>
          )}
        </div>

        {/* Novel Aspect for Large Projects */}
        {project.novel && (
          <div className="mb-3 sm:mb-4 bg-amber-50 border-l-2 border-amber-500 rounded-r px-3 py-2">
            <p className="text-xs sm:text-sm font-semibold text-amber-900 mb-1">Novel Aspect:</p>
            <p className="text-xs sm:text-sm text-amber-800">{project.novel}</p>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
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
