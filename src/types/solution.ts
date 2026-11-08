// S-14 / T-106: TypeScript declarations for Solutions architecture.

export interface SolutionFeature {
  lead: string;
  body: string;
}

export interface RelatedSolutionLink {
  title: string;
  slug: string;
  type: "Product" | "Case study" | "Insight" | "Solutions";
  href: string;
}

export interface Solution {
  title: string;
  slug: string;
  summary: string;
  ctaHeadline: string;
  challenge: string;
  features: SolutionFeature[];
  diagramKey: "identity" | "ai" | "quantum" | "process" | "enterprise";
  deliveredBy: string[];
  products: RelatedSolutionLink[];
  proofAndReading: RelatedSolutionLink[];
  order: number;
}
