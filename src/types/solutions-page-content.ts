// What the editors can change on the Solutions hub. The five solution cards are not here: they are built from the
// Solution documents (title, summary and address), so a solution is edited in one place.

export type SolutionsPageContent = {
  hero: { title: string };
  list: { title: string; subtitle: string };
  enterprise: {
    title: string;
    text: string;
    button: { label: string; href: string };
    /** The three deployment models, in order. The icons stay in the design. */
    models: { title: string; text: string }[];
    standardsLabel: string;
    standards: string[];
  };
  thinking: { title: string; allLink: { label: string; href: string } };
  cta: { title: string; button: { label: string; href: string } };
};
