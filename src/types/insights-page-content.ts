// What the editors can change on the Our thinking hub. The article pages themselves are not part of this yet.
// Pictures are chosen from a fixed set (see src/components/prototype/thinking-pictures.ts).

export type ThinkingPicture =
  "identity-first" | "data-ai" | "micro-segmentation" | "non-human" | "agentic-ai";

export type InsightCard = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  href: string;
  cta: string;
  picture: ThinkingPicture;
};

export type InsightsPageContent = {
  hero: { title: string };
  featured: InsightCard & { label: string };
  cards: InsightCard[];
  cta: { title: string; button: { label: string; href: string } };
};
