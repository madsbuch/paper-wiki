import ProjectLayout from "../../components/ProjectLayout";

export const meta = {
  title: "Constitutional AI for Domain-Specific Alignment",
  description: "Implement a Constitutional AI system for aligning a language model to domain-specific values (e.g., medical ethics, legal reasoning). Design principles, implement RLAIF, and evaluate alignment.",
  category: "Large Project" as const,
  difficulty: "Advanced" as const,
  estimatedTime: "3-4 weeks",
  novel: "Domain-specific constitutional principles and evaluation metrics for specialized fields beyond general helpfulness",
  relatedPapers: [
    { title: "Constitutional AI", slug: "constitutional-ai" },
    { title: "InstructGPT", slug: "instructgpt" }
  ],
  relatedConcepts: [
    { name: "Constitutional AI", slug: "constitutional-ai" },
    { name: "RLAIF", slug: "rlaif" },
    { name: "Alignment", slug: "alignment" }
  ],
  prerequisites: [
    "Deep understanding of reinforcement learning",
    "Experience with language model fine-tuning",
    "Access to significant compute resources",
    "Understanding of Constitutional AI paper"
  ]
};

export default function ConstitutionalAIDomainProject() {
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
