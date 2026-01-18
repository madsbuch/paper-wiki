import ProjectLayout from "../../components/ProjectLayout";

export const meta = {
  title: "Apply LoRA to Fine-Tune a Large Model",
  description: "Use Low-Rank Adaptation to fine-tune a 7B parameter model on a single GPU. Compare results and efficiency with full fine-tuning.",
  category: "Weekend Project" as const,
  difficulty: "Intermediate" as const,
  estimatedTime: "1-2 days",
  relatedPapers: [
    { title: "LoRA", slug: "lora" }
  ],
  relatedConcepts: [
    { name: "Low-Rank Adaptation", slug: "low-rank-adaptation" },
    { name: "Parameter-Efficient Fine-Tuning", slug: "parameter-efficient-fine-tuning" }
  ],
  prerequisites: [
    "Python programming",
    "PyTorch basics",
    "Understanding of fine-tuning",
    "Access to GPU with 16GB+ VRAM"
  ]
};

export default function LoRAFinetuningProject() {
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
      </div>
    </ProjectLayout>
  );
}
