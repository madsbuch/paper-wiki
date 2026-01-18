import ProjectLayout from "../../components/ProjectLayout";

export const meta = {
  title: "Build a Mini-GPT from Scratch",
  description: "Implement a small GPT-style language model (6 layers, 384 dimensions) and train it on a simple text dataset. Get hands-on experience with the full training pipeline.",
  category: "Weekend Project" as const,
  difficulty: "Intermediate" as const,
  estimatedTime: "1-2 days",
  relatedPapers: [
    { title: "Attention Is All You Need", slug: "attention-is-all-you-need" },
    { title: "Language Models are Few-Shot Learners", slug: "gpt3-few-shot-learners" }
  ],
  relatedConcepts: [
    { name: "Transformer Architecture", slug: "transformer-architecture" },
    { name: "Self-Attention", slug: "self-attention" }
  ],
  prerequisites: [
    "Python programming",
    "PyTorch or TensorFlow basics",
    "Understanding of Transformer architecture",
    "Access to a GPU (optional but recommended)"
  ]
};

export default function MiniGPTProject() {
  return (
    <ProjectLayout {...meta}>
      <div className="prose prose-slate max-w-none">
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6 my-6">
          <p className="text-lg font-semibold text-blue-900 mb-2">
            🚧 Project Page Under Construction
          </p>
          <p className="text-sm text-slate-700">
            This project page is being developed. Check back soon for the complete implementation guide!
          </p>
        </div>

        <h2>Coming Soon</h2>
        <p>
          This weekend project will guide you through building a small GPT-style language model from scratch,
          including architecture implementation, training loop, and text generation.
        </p>
      </div>
    </ProjectLayout>
  );
}
