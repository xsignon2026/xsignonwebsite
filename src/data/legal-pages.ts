import type { LegalPage } from "@/types/legal-page";

// The Privacy Policy and Terms as they are today. Both are placeholder text that says so on the page; legal
// review must replace them before launch. Used when Sanity is not connected, and for any part left empty.
export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    crumb: "Privacy Policy",
    notice: "Placeholder copy for legal review",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "Placeholder copy for legal review. This section will describe the categories of information XSignOn collects from visitors, customers and trial users, and how each category is collected.",
        ],
      },
      {
        heading: "How we use information",
        paragraphs: [
          "Placeholder copy for legal review. This section will describe the purposes for which collected information is used, including providing products, responding to enquiries and improving the service.",
        ],
      },
      {
        heading: "Sharing and disclosure",
        paragraphs: [
          "Placeholder copy for legal review. This section will describe when information is shared with service providers, partners or authorities, and the safeguards that apply.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Placeholder copy for legal review. This section will describe the rights individuals have over their information, including access, correction and deletion, and how to exercise them.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Placeholder copy for legal review. This section will name the point of contact for privacy questions and requests.",
        ],
      },
    ],
    ctaHeadline: "Questions about your data?",
    ctaButton: { label: "Contact us", href: "/contact" },
  },
  {
    slug: "terms",
    title: "Terms",
    crumb: "Terms",
    notice: "Placeholder copy for legal review",
    sections: [
      {
        heading: "Use of the site",
        paragraphs: [
          "Placeholder copy for legal review. This section will set out the acceptable and prohibited uses of this website and its content.",
        ],
      },
      {
        heading: "Products and services",
        paragraphs: [
          "Placeholder copy for legal review. This section will describe how product descriptions, trials and orders on this site relate to the agreements that govern actual use.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Placeholder copy for legal review. This section will describe ownership of site content, trademarks and product names.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "Placeholder copy for legal review. This section will describe the limits that apply to liability arising from use of the site.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Placeholder copy for legal review. This section will name the point of contact for questions about these terms.",
        ],
      },
    ],
    ctaHeadline: "Questions about these terms?",
    ctaButton: { label: "Contact us", href: "/contact" },
  },
];
