// What the editors can change on the Contact page. The form itself and how it is sent stay in the code.

export type ContactPageContent = {
  hero: { title: string };
  /** The notes beside the form. A note with a link shows its text as that link (a phone or email). */
  details: { label: string; text: string; href?: string }[];
  closing: string;
  cta: { title: string; button: { label: string; href: string } };
};
