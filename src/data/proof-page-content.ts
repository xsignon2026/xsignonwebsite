import type { ProofPageContent } from "@/types/proof-page-content";

// The Proof hub as it is today. Used when Sanity is not connected, and for any part the editors leave empty.
// Cards marked pending stay visible to visitors until sourced details replace them.
export const proofPageFallback: ProofPageContent = {
  hero: {
    title: "Proof",
  },
  intro: {
    bold: "Case studies live here, attached to the products they prove.",
    text: "Each study names the product deployed and the goal it supported. Where outcomes are still being sourced, that is marked clearly.",
  },
  cards: [
    {
      picture: "bank",
      tags: ["Banking · Abu Dhabi", "Passwordless Keys · AMS"],
      title: "Securing Bank Access With FIDO2 Biometric Keys",
      summary:
        "A bank in Abu Dhabi replaced password sign-in for branch and back-office staff with FIDO2 keys supplied and supported by XSignOn, managed through AMS.",
      noteLabel: "Sourced outcome needed",
      noteText:
        "one verifiable result, with its source and date, is added here before this page ships. No number is shown until it is sourced.",
      href: "/proof/securing-bank-access-fido2",
    },
    {
      picture: "health",
      tags: ["Healthcare", "March 2020", "Passwordless Keys"],
      title: "Passwordless Access For A Global Healthcare Enterprise",
      summary:
        "Passwordless access for a global healthcare enterprise, where clinical and administrative staff sign in across shared workstations and shift changes.",
      noteLabel: "Case details pending",
      noteText: "deployment specifics are confirmed and sourced before this page ships.",
      href: "/proof/passwordless-access-global-healthcare",
    },
    {
      picture: "industrial",
      tags: ["Electrical", "December 2023", "XSense · AMS"],
      title: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
      summary:
        "Biometric FIDO2 access for air-gapped industrial systems in Asia, running on the XSense identity platform with the AMS module.",
      noteLabel: "Case details pending",
      noteText: "deployment specifics are confirmed and sourced before this page ships.",
      href: "/proof/biometric-fido2-air-gapped-industrial",
    },
    {
      picture: "it",
      tags: ["IT", "July 2020", "Passwordless Keys · XSense"],
      title: "Biometric-Only Authentication For A Global IT Enterprise",
      summary:
        "Biometric-only authentication for a global IT enterprise, where every sign-in is completed with a verified key.",
      noteLabel: "Case details pending",
      noteText: "deployment specifics are confirmed and sourced before this page ships.",
      href: "/proof/biometric-only-authentication-global-it",
    },
  ],
  roi: {
    title: "Estimate your own numbers",
    text: "No case study result is shown without a source. To see the time your own team can save, the ROI calculator computes an estimate from the numbers you enter.",
    link: {
      label: "Open the ROI Calculator",
      href: "/roi-calculator",
    },
  },
  cta: {
    title: "Become the next case study.",
    button: {
      label: "Book a strategy call",
      href: "/contact",
    },
  },
};
