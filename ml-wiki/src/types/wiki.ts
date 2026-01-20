/**
 * Citation information for wiki concepts
 */
export interface WikiCitation {
  paper: string;
  authors: string;
  year: string;
  pages?: string;
}

/**
 * Related concept reference
 */
export interface RelatedConcept {
  name: string;
  slug: string;
}

/**
 * Metadata for wiki concept pages
 * This should be defined as a const outside the component function
 * 
 * @example
 * ```tsx
 * const meta: WikiMeta = {
 *   title: "Transformer Architecture",
 *   description: "A neural network architecture that relies entirely on attention mechanisms",
 *   category: "Architecture",
 *   difficulty: "Intermediate",
 *   tags: ["attention", "neural-networks"],
 *   citations: [
 *     { paper: "Attention Is All You Need", authors: "Vaswani et al.", year: "2017", pages: "2-5" }
 *   ]
 * };
 * 
 * export default function TransformerArchitecture() {
 *   return (
 *     <WikiLayout {...meta}>
 *       {content}
 *     </WikiLayout>
 *   );
 * }
 * ```
 */
export interface WikiMeta {
  /** The title of the wiki concept (required) */
  title: string;
  
  /** Brief description of the concept (required for database) */
  description: string;
  
  /** Category for grouping concepts (e.g., "Architecture", "Training Techniques") */
  category?: string;
  
  /** Difficulty level: "Beginner", "Intermediate", or "Advanced" */
  difficulty?: string;
  
  /** Tags for additional categorization */
  tags?: string[];
  
  /** Related concept slugs (for linking) */
  relatedConcepts?: string[];
  
  /** Academic citations supporting this concept */
  citations: WikiCitation[];
  
  /** Prerequisites for understanding this concept */
  prerequisites?: string[];
}
