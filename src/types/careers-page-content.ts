// What the editors can change on the Careers page. The open roles themselves are the Job documents.

export type CareersPageContent = {
  hero: { title: string };
  working: { title: string; values: { title: string; text: string }[] };
  roles: {
    title: string;
    /** Shown instead of the list when no role is open. */
    emptyNote: string;
    general: { title: string; text: string; button: { label: string; href: string } };
  };
  cta: { title: string; button: { label: string; href: string } };
};
