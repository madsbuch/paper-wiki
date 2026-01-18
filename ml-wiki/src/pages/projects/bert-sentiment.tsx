import ProjectLayout from "../../components/ProjectLayout";

export const meta = {
  title: "Fine-Tune BERT for Sentiment Analysis",
  description: "Take a pre-trained BERT model and fine-tune it for sentiment classification. Learn the full pipeline from data preparation to evaluation.",
  category: "Weekend Project" as const,
  difficulty: "Beginner" as const,
  estimatedTime: "6-8 hours",
  relatedPapers: [
    { title: "BERT", slug: "bert" }
  ],
  relatedConcepts: [
    { name: "Transfer Learning", slug: "transfer-learning" },
    { name: "Fine-Tuning", slug: "fine-tuning" }
  ],
  prerequisites: [
    "Python programming",
    "Basic understanding of BERT",
    "Hugging Face Transformers library (helpful)",
    "Access to a GPU"
  ]
};

export default function BertSentimentProject() {
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
