import PaperLayout from "../../components/PaperLayout";

export default function ClonesClosedCategoriesCombinatoryLogicPaper() {
  return (
    <PaperLayout
      title="Clones, closed categories, and combinatory logic"
      authors="Philip Saville"
      year="2024"
      venue="arXiv Preprint"
      arxivId="2405.01675v1"
      arxivUrl="https://arxiv.org/abs/2405.01675"
      abstract="We give an exposition of the semantics of the simply-typed λ-calculus, and its linear and ordered variants, using multi-ary structures. We define universal properties for multicategories, and use these to derive familiar rules for products, tensors, and exponentials. Finally we explain how to recover both the category-theoretic syntactic model and its semantic interpretation from the multi-ary framework. We then use these ideas to study the semantic interpretation of combinatory logic and the simply-typed λ-calculus without products. We introduce extensional SK-clones and show these are sound and complete for both combinatory logic with extensional weak equality and the simply-typed λ-calculus without products. We then show such SK-clones are equivalent to a variant of closed categories called SK-categories, so the simply-typed λ-calculus without products is the internal language of SK-categories. As a corollary, we deduce that SK-categories have the same relationship to cartesian monoidal categories that closed categories have to monoidal categories."
      keyContributions={[
        "Exposition of multi-ary structures (multicategories, clones) for semantics of typed λ-calculi",
        "Definition of universal properties for multicategories to derive type-theoretic rules",
        "Introduction of extensional SK-clones as multi-ary models of combinatory logic",
        "Proof that extensional SK-clones are equivalent to closed clones (λ-calculus without products)",
        "Introduction of SK-categories as categorical models for λ-calculus without products",
        "Establishment of equivalence between SK-categories and extensional SK-clones",
        "Demonstration that SK-categories relate to cartesian categories as closed categories relate to monoidal categories",
      ]}
      relatedConcepts={[
        { name: "Abstract Clones", slug: "abstract-clones" },
        { name: "Multicategories", slug: "multicategories" },
        { name: "Combinatory Logic", slug: "combinatory-logic" },
        { name: "Closed Categories", slug: "closed-categories" },
        {
          name: "Simply-Typed Lambda Calculus",
          slug: "simply-typed-lambda-calculus",
        },
        {
          name: "Cartesian Closed Categories",
          slug: "cartesian-closed-categories",
        },
      ]}
      impact="This paper provides a unified multi-ary framework for understanding the categorical semantics of typed λ-calculi, clarifying the relationship between syntax and semantics. The introduction of SK-categories fills a gap in the literature by providing a sound and complete categorical model for the simply-typed λ-calculus without products, which has a stronger claim to being 'the' simply-typed λ-calculus than variants with products. The work also provides a categorical statement of the classical correspondence between λ-calculus and extensional combinatory logic."
    ></PaperLayout>
  );
}
