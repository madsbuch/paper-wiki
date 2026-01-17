import { useState } from "react";
import { Link } from "react-router";
import Header from "../../components/Header";

type ProjectCategory = "Exercise" | "Weekend Project" | "Large Project";

interface Project {
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  relatedPapers: string[];
  tags: string[];
  novel?: string; // For Large Projects - what's novel about this project
}

const projects: Project[] = [
  // Exercises (10-30 minutes)
  {
    title: "Calculate Multi-Head Attention by Hand",
    slug: "attention-by-hand",
    description: "Work through the mathematics of scaled dot-product attention and multi-head attention with concrete numerical examples. Build intuition for how attention weights are computed.",
    category: "Exercise",
    difficulty: "Beginner",
    estimatedTime: "15-20 min",
    relatedPapers: ["Attention Is All You Need"],
    tags: ["Attention", "Mathematics", "Linear Algebra"]
  },
  {
    title: "Derive the Gradient of Cross-Entropy Loss",
    slug: "cross-entropy-gradient",
    description: "Step through the calculus to derive the gradient of cross-entropy loss with softmax. Understand why it has such a clean form and how it drives learning in language models.",
    category: "Exercise",
    difficulty: "Intermediate",
    estimatedTime: "20-30 min",
    relatedPapers: ["Attention Is All You Need", "BERT"],
    tags: ["Mathematics", "Optimization", "Calculus"]
  },
  {
    title: "Prove Transformer Universal Approximation",
    slug: "transformer-universal-approximation",
    description: "Work through a simplified proof that Transformers can approximate any sequence-to-sequence function. Understand the theoretical foundations of why they're so powerful.",
    category: "Exercise",
    difficulty: "Advanced",
    estimatedTime: "25-30 min",
    relatedPapers: ["A Mathematical Explanation of Transformers for Large Language Models and GPTs"],
    tags: ["Theory", "Mathematics", "Transformers"]
  },

  // Weekend Projects (1-2 days)
  {
    title: "Build a Mini-GPT from Scratch",
    slug: "mini-gpt",
    description: "Implement a small GPT-style language model (6 layers, 384 dimensions) and train it on a simple text dataset. Get hands-on experience with the full training pipeline.",
    category: "Weekend Project",
    difficulty: "Intermediate",
    estimatedTime: "1-2 days",
    relatedPapers: ["Attention Is All You Need", "Language Models are Few-Shot Learners"],
    tags: ["GPT", "Implementation", "Training", "Transformers"]
  },
  {
    title: "Fine-Tune BERT for Sentiment Analysis",
    slug: "bert-sentiment",
    description: "Take a pre-trained BERT model and fine-tune it for sentiment classification. Learn the full pipeline from data preparation to evaluation.",
    category: "Weekend Project",
    difficulty: "Beginner",
    estimatedTime: "6-8 hours",
    relatedPapers: ["BERT"],
    tags: ["BERT", "Fine-Tuning", "Classification", "NLP"]
  },
  {
    title: "Implementing Few-Shot Learning with Prompt Engineering",
    slug: "few-shot-learning",
    description: "Build a practical few-shot learning system using prompt engineering techniques. Learn how to select examples, design templates, and integrate chain-of-thought reasoning.",
    category: "Weekend Project",
    difficulty: "Intermediate",
    estimatedTime: "1-2 days",
    relatedPapers: ["Language Models are Few-Shot Learners", "Chain-of-Thought Prompting"],
    tags: ["Few-Shot Learning", "Prompt Engineering", "Chain-of-Thought", "In-Context Learning"]
  },
  {
    title: "Apply LoRA to Fine-Tune a Large Model",
    slug: "lora-finetuning",
    description: "Use Low-Rank Adaptation to fine-tune a 7B parameter model on a single GPU. Compare results and efficiency with full fine-tuning.",
    category: "Weekend Project",
    difficulty: "Intermediate",
    estimatedTime: "1-2 days",
    relatedPapers: ["LoRA"],
    tags: ["LoRA", "Fine-Tuning", "Parameter Efficiency"]
  },

  // Large Projects (multiple weeks)
  {
    title: "Building a Small Transformer for Translation",
    slug: "transformer-translation",
    description: "Implement a complete Transformer model for sequence-to-sequence translation, following the architecture from the original paper. Build from scratch and train on a parallel corpus.",
    category: "Large Project",
    difficulty: "Advanced",
    estimatedTime: "2-3 weeks",
    relatedPapers: ["Attention Is All You Need"],
    tags: ["Transformer", "Attention", "Translation", "Seq2Seq"],
    novel: "Custom positional encoding scheme designed for morphologically-rich languages with flexible word order"
  },
  {
    title: "Constitutional AI for Domain-Specific Alignment",
    slug: "constitutional-ai-domain",
    description: "Implement a Constitutional AI system for aligning a language model to domain-specific values (e.g., medical ethics, legal reasoning). Design principles, implement RLAIF, and evaluate alignment.",
    category: "Large Project",
    difficulty: "Advanced",
    estimatedTime: "3-4 weeks",
    relatedPapers: ["Constitutional AI", "InstructGPT"],
    tags: ["Alignment", "RLAIF", "Constitutional AI", "Fine-Tuning"],
    novel: "Domain-specific constitutional principles and evaluation metrics for specialized fields beyond general helpfulness"
  }
];

const categoryColors = {
  "Exercise": "bg-blue-100 text-blue-800 border-blue-300",
  "Weekend Project": "bg-purple-100 text-purple-800 border-purple-300",
  "Large Project": "bg-orange-100 text-orange-800 border-orange-300",
};

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800 border-green-300",
  Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Advanced: "bg-red-100 text-red-800 border-red-300",
};

export default function ProjectsIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "All">("All");

  const filteredProjects = projects.filter(project => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query)) ||
      project.relatedPapers.some(paper => paper.toLowerCase().includes(query)) ||
      project.difficulty.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query);

    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
              {filteredProjects.length === projects.length
                ? `${projects.length} ${projects.length === 1 ? 'project' : 'projects'} available`
                : `Found ${filteredProjects.length} of ${projects.length} projects`}
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
                <Link
                  key={project.slug}
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
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3 sm:mb-4">
                          {project.description}
                        </p>
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
                      <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border text-xs sm:text-sm font-medium ${categoryColors[project.category]}`}>
                        {project.category}
                      </span>
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {project.relatedPapers.length} papers
                      </span>
                    </div>

                    {/* Novel Aspect for Large Projects */}
                    {project.novel && (
                      <div className="mb-3 sm:mb-4 bg-amber-50 border-l-2 border-amber-500 rounded-r px-3 py-2">
                        <p className="text-xs sm:text-sm font-semibold text-amber-900 mb-1">Novel Aspect:</p>
                        <p className="text-xs sm:text-sm text-amber-800">{project.novel}</p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-violet-100 text-violet-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
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
