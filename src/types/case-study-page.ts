// What a case study page shows. The pictures-free layout is part of the design; every word is editable.

export type CaseStudyPageFeature = { lead: string; joiner: "" | "," | ":"; body: string };
export type CaseStudyPageStep = { number: string; title: string; text: string };
export type CaseStudyPageNote = { label: string; text: string };

export type CaseStudyPageSection = {
  heading: string;
  paragraphs: string[];
  features: CaseStudyPageFeature[];
  steps: CaseStudyPageStep[];
  /** Notes shown in a highlighted box, for example "Case details pending". */
  notes: CaseStudyPageNote[];
};

export type CaseStudyPage = {
  slug: string;
  title: string;
  /** Short name for the breadcrumb, for example Banking. */
  crumb: string;
  /** Small tags under the title, for example the industry, date and products. */
  tags: string[];
  sections: CaseStudyPageSection[];
  related: { title: string; type: string; href: string }[];
  ctaHeadline: string;
};
