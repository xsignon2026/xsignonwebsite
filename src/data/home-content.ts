import type { HomeContent } from "@/types/home-content";

// The default home page content. It is shown when the CMS is not connected or a field is empty. The wording
// follows the XSignOn content skill (.claude/skills/xsignon-content): plain, specific, nothing claimed that is
// not backed by the live site or approved by the team.

export const homeContentFallback: HomeContent = {
  hero: {
    eyebrow: "Identity, governance and security",
    headlineLead: "Protect identity. Govern risk.",
    headlineAccent: "Prepare for what's next.",
    description:
      "XSignOn develops security products across identity governance, passwordless authentication, AI evaluation, and emerging digital risk.",
    primaryButton: { label: "Explore our products", href: "/products" },
    secondaryLink: { label: "About XSignOn", href: "/about" },
  },
  heroSlides: [
    {
      id: "domain-check",
      variant: 0,
      tag: "Free check",
      heading: ["Can someone send", "email as your", "domain?"],
      sub: ["Reads public DNS only."],
      action: { type: "scan" },
    },
    {
      id: "xsignon-mesh",
      variant: 1,
      tag: "New product",
      heading: ["Contain risk", "before it", "spreads."],
      sub: ["XSignOn Mesh"],
      line: "Micro-segmentation and containment that keeps one failure small.",
      action: { type: "link", label: "Explore XSignOn Mesh", href: "/products/xsignon-mesh" },
    },
    {
      id: "passwordless",
      variant: 2,
      tag: "Product",
      heading: ["Sign in", "without a", "password."],
      sub: ["Passwordless Authenticators"],
      line: "Hardware biometric keys for phishing-resistant sign-in.",
      action: { type: "link", label: "Explore the keys", href: "/products/passwordless-keys" },
    },
  ],
  standards: ["GDPR", "FIDO2", "SOC 2", "ISO 27001", "NIST AI-RMF", "NIST 800-207"],
  ecosystem: {
    title: "XSignOn Security Ecosystem",
    items: [
      {
        title: "Contain threats faster",
        lines: ["Zone and flow maps and containment", "events, in one posture view."],
        icon: "grid",
        via: ["PostureOne", "XSignOn Mesh"],
        to: ["One posture view", "Owners and findings", "Audit-ready evidence"],
      },
      {
        title: "Protect data and AI",
        lines: ["Discovery findings, classification", "results and AI data access."],
        icon: "database",
        via: ["PostureOne", "EvalOne"],
        to: ["PostureOne evidence", "EvalOne evidence", "Reviewer-ready reports"],
      },
      {
        title: "Sign in without passwords",
        lines: ["FIDO2 biometric keys, enrolment", "and hardware, governed end to end."],
        icon: "key",
        via: ["Passwordless Keys", "XSense"],
        to: ["The AUTH key range", "Governed sign-in", "Support from XSignOn"],
      },
      {
        title: "Prepare for quantum risk",
        lines: ["A cryptographic inventory and a path", "to post-quantum methods."],
        icon: "atom",
        via: ["Quantum-Safe Security"],
        to: ["Migration plan", "Evidence per system", "Clear owners"],
      },
    ],
  },
  whatWeDo: {
    title: "What XSignOn does",
    allLink: { label: "View all solutions", href: "/solutions" },
    panels: [
      {
        title: "Identity governance",
        text: "See who and what has access, and who owns each account. Remove credential risk with FIDO2 passwordless sign-in, without slowing people down.",
        href: "/solutions/identity-governance",
        cta: "View solution",
        art: "identity",
      },
      {
        title: "AI and digital governance",
        text: "Deploy AI agents and large language models with evidence ready. PostureOne maps each deployment to NIST AI-RMF, so reviews start from facts.",
        href: "/solutions/ai-and-digital-governance",
        cta: "View solution",
        art: "ai",
      },
      {
        title: "Passwordless security",
        text: "Replace passwords with a fingerprint on a FIDO2 hardware key. Sign-in resists phishing and works across your enterprise systems.",
        href: "/products/passwordless-keys",
        cta: "View solution",
        art: "key",
      },
      {
        title: "Quantum-safe security",
        text: "Find the cryptography you rely on and plan the move to post-quantum methods. Protect sensitive data now against attackers who store it to decrypt later.",
        href: "/solutions/quantum-safe-security",
        cta: "View solution",
        art: "atom",
      },
    ],
  },
  cta: {
    title: "Let's talk about your organization's security priorities.",
    button: { label: "Contact us", href: "/contact" },
  },
};
