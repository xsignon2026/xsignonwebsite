import type { SolutionsPageContent } from "@/types/solutions-page-content";

// The Solutions hub as it is today. Used when Sanity is not connected, and for any part the editors leave empty.
// The "standards posture" names are shown to visitors as they are today; each one needs proof before it stays
// (see the claims rules in the XSignOn content skill).
export const solutionsPageFallback: SolutionsPageContent = {
  hero: { title: "Solutions" },
  list: { title: "Solutions", subtitle: "Start from the problem you are solving" },
  enterprise: {
    title: "Enterprise",
    text: "Every identity, fully in control: identity command, three deployment models, and a standards posture for enterprise estates.",
    button: { label: "View the Enterprise page", href: "/enterprise" },
    models: [
      { title: "SaaS", text: "Runs in the cloud, with identity command from day one." },
      { title: "On-premises", text: "Runs in your own data centers, under your control." },
      { title: "Air-gapped", text: "Runs fully on site, apart from public networks." },
    ],
    standardsLabel: "Standards posture",
    standards: [
      "FIDO2",
      "SOC 2",
      "ISO 27001",
      "HIPAA",
      "GDPR",
      "PCI DSS",
      "NIST AI RMF",
      "NIST 800-207",
      "NIST PQC",
    ],
  },
  thinking: { title: "Our thinking", allLink: { label: "All articles", href: "/thinking" } },
  cta: {
    title: "Which solution fits your goals?",
    button: { label: "Book a strategy call", href: "/contact" },
  },
};
