// Content types for the Industry Thinking page, the Compare page and the Enterprise page.

export type LinkContent = { label: string; href: string };
export type RelatedRow = { title: string; type: string; href: string };
export type CtaContent = { title: string; button: LinkContent };

export type IndustryNote = { noteLabel: string; noteText: string };

export type IndustryPageContent = {
  hero: { title: string; tag: string };
  featured: { label: string; title: string; text: string } & IndustryNote;
  cards: ({ title: string; text: string } & IndustryNote)[];
  cta: CtaContent;
};

export type ComparePageContent = {
  hero: { title: string };
  intro: { bold: string; text: string };
  /** The column headings, the first being the capability column. */
  columns: string[];
  /** Each row: the capability, then one value per remaining column. */
  rows: { capability: string; values: string[] }[];
  lede: string;
  related: RelatedRow[];
  cta: CtaContent;
};

export type EnterprisePageContent = {
  hero: { title: string; tags: string[] };
  intro: { bold: string; text: string };
  deployment: { title: string; models: { title: string; text: string }[] };
  standards: { title: string; chips: string[]; text: string };
  related: RelatedRow[];
  cta: CtaContent;
};
