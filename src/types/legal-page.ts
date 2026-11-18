// A legal page (Privacy Policy, Terms). The wording is for legal review to supply; this only holds it.

export type LegalPage = {
  slug: "privacy" | "terms";
  title: string;
  /** Short name for the breadcrumb. */
  crumb: string;
  /** The small tag under the title, for example "Placeholder copy for legal review". */
  notice: string;
  /** Switch off once the wording has been through legal review. */
  showNotice?: boolean;
  sections: { heading: string; paragraphs: string[] }[];
  ctaHeadline: string;
  ctaButton: { label: string; href: string };
};
