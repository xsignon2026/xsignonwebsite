import type { EnterprisePageContent } from "@/types/last-pages-content";

// The Enterprise page text as it is today (the dashboard picture stays in the code). Used when Sanity is not
// connected, and for any part left empty. Each standard named here needs proof before it stays.
export const enterprisePageFallback: EnterprisePageContent = {
  hero: {
    title: "Every identity. Fully in control.",
    tags: ["Enterprise", "Identity command"],
  },
  intro: {
    bold: "Enterprise teams run identity across thousands of people, devices, services and AI agents.",
    text: "XSignOn gives those teams one command view: every identity inventoried, every sign-in verified, and every access carrying an owner and evidence.",
  },
  deployment: {
    title: "Deployment models",
    models: [
      {
        title: "SaaS",
        text: "The platform runs in the cloud, with identity command available from day one and updates handled by XSignOn.",
      },
      {
        title: "On-premises",
        text: "The platform runs inside your own data centers, under your operational control, with the same continuous posture scoring.",
      },
      {
        title: "Air-gapped",
        text: "For estates separated from public networks, the platform runs fully on site, as proven in critical infrastructure deployments.",
      },
    ],
  },
  standards: {
    title: "Standards posture",
    chips: ["FIDO2", "SOC 2", "ISO 27001", "HIPAA", "NIST AI-RMF", "NIST PQC"],
    text: "Evidence for each standard is produced from the work itself: sign-ins, reviews and evaluations carry the timestamps and cryptographic proofs auditors require.",
  },
  related: [
    {
      title: "Enterprise Technology",
      type: "Solution",
      href: "/solutions/enterprise-technology",
    },
    {
      title: "XSense",
      type: "Product",
      href: "/products/xsense",
    },
    {
      title: "Biometric-Only Authentication For A Global IT Enterprise",
      type: "Case study",
      href: "/proof/case-it",
    },
    {
      title: "Back to Solutions",
      type: "Solutions",
      href: "/solutions",
    },
  ],
  cta: {
    title: "Bring every identity into one view.",
    button: {
      label: "Book a strategy call",
      href: "/contact",
    },
  },
};
