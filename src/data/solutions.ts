import type { Solution } from "@/types/solution";

// S-14 / T-106 / T-108 / T-109 / T-110: Canonical Solutions dataset.
// Source of truth: xsignon-home-beams.html (lines 3237-3567).
export const canonicalSolutions: Solution[] = [
  {
    title: "Identity Governance",
    slug: "identity-governance",
    summary:
      "Teams want one accountable sign-in for every person and agent. Govern who and what gets access, and prove it with confidence.",
    ctaHeadline: 'Answer "who can reach what" in one view.',
    challenge:
      "Teams want one accountable sign-in for every person and agent. Accounts grow across systems, and leaders want a single, clear view of who can reach what and why, with approvals and provenance for every access.",
    features: [
      {
        lead: "One inventory of access",
        body: "across staff, devices and AI agents, with a named owner for every account and permission.",
      },
      {
        lead: "Findings prioritized by impact",
        body: "so governance effort goes to the improvements that matter first.",
      },
      {
        lead: "Reviews that run on a cycle",
        body: "with approvers, expiry and evidence attached, inside the platform.",
      },
      {
        lead: "Passwordless sign-in",
        body: "that only the account owner can complete, for every staff member.",
      },
    ],
    diagramKey: "identity",
    deliveredBy: ["PostureOne", "AMS", "Passwordless Keys"],
    products: [
      { title: "PostureOne", slug: "postureone", type: "Product", href: "/products/postureone" },
      { title: "AMS", slug: "ams", type: "Product", href: "/products/ams" },
      { title: "Passwordless Keys", slug: "keys", type: "Product", href: "/products/keys" },
    ],
    proofAndReading: [
      {
        title: "Securing Bank Access With FIDO2 Biometric Keys",
        slug: "securing-bank-access-fido2",
        type: "Case study",
        href: "/proof/securing-bank-access-fido2",
      },
      {
        title:
          "Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security Model",
        slug: "non-human-identities",
        type: "Insight",
        href: "/thinking/non-human-identities",
      },
      {
        title: "Back to Solutions",
        slug: "solutions",
        type: "Solutions",
        href: "/solutions",
      },
    ],
    order: 1,
  },
  {
    title: "AI and Digital Governance",
    slug: "ai-and-digital-governance",
    summary:
      "Teams want AI evidence ready with confidence. Map AI use to frameworks and keep evidence ready.",
    ctaHeadline: "Keep AI evidence ready, with confidence.",
    challenge:
      "Teams are bringing AI into production and want clear, ready evidence of how each system is governed: who owns it, what data it touches, and which frameworks it was assessed against. XSignOn keeps that evidence current and ready to share with confidence.",
    features: [
      {
        lead: "AI use inventoried with owners",
        body: "including the deployments that never went through procurement.",
      },
      {
        lead: "Evaluations mapped to frameworks",
        body: "like NIST AI-RMF, so assessments start from a complete map.",
      },
      {
        lead: "Agent access governed",
        body: "like any other access: inventoried, owned, and reviewed on a cycle.",
      },
      {
        lead: "Evidence that stays current",
        body: "as AI use changes, with evidence current at every step.",
      },
    ],
    diagramKey: "ai",
    deliveredBy: ["EvalOne", "PostureOne"],
    products: [
      { title: "EvalOne", slug: "evalone", type: "Product", href: "/products/evalone" },
      { title: "PostureOne", slug: "postureone", type: "Product", href: "/products/postureone" },
    ],
    proofAndReading: [
      {
        title: "All case studies in Proof",
        slug: "proof",
        type: "Case study",
        href: "/proof",
      },
      {
        title: "Data + AI Security Built for Visibility, Control, and Trust",
        slug: "data-ai-security",
        type: "Insight",
        href: "/thinking/data-ai-security",
      },
      {
        title: "Back to Solutions",
        slug: "solutions",
        type: "Solutions",
        href: "/solutions",
      },
    ],
    order: 2,
  },
  {
    title: "Quantum-Safe Security",
    slug: "quantum-safe-security",
    summary:
      "Teams are preparing early for post-quantum methods. Inventory what you rely on and plan the move with clarity and confidence.",
    ctaHeadline: "Start with the inventory, with confidence.",
    challenge:
      "Teams are preparing early for post-quantum methods and want a clear inventory of the cryptography they rely on today. With that inventory in place, planning becomes confident, sequenced and ready to share.",
    features: [
      {
        lead: "Inventory of cryptographic reliance",
        body: "which systems, keys and protocols depend on what you have today.",
      },
      {
        lead: "Prioritized migration order",
        body: "starting with identity and sign-in, where verified access creates the most value.",
      },
      {
        lead: "Verified sign-in now",
        body: "so teams build on a strong foundation today while planning for the quantum timeline.",
      },
      {
        lead: "Evidence of readiness",
        body: "mapped as the migration proceeds, for the reviewers who will ask.",
      },
    ],
    diagramKey: "quantum",
    deliveredBy: ["PostureOne", "Passwordless Keys"],
    products: [
      { title: "PostureOne", slug: "postureone", type: "Product", href: "/products/postureone" },
      { title: "Passwordless Keys", slug: "keys", type: "Product", href: "/products/keys" },
    ],
    proofAndReading: [
      {
        title: "All case studies in Proof",
        slug: "proof",
        type: "Case study",
        href: "/proof",
      },
      {
        title: "Modern Micro-Segmentation for Zero Trust Security",
        slug: "modern-micro-segmentation",
        type: "Insight",
        href: "/thinking/modern-micro-segmentation",
      },
      {
        title: "Back to Solutions",
        slug: "solutions",
        type: "Solutions",
        href: "/solutions",
      },
    ],
    order: 3,
  },
  {
    title: "Business Process",
    slug: "business-process",
    summary:
      "Teams want access reviews, approvals and evidence in one governed, repeatable flow, with clarity at every step.",
    ctaHeadline: "Turn reviews into a clear, confident process.",
    challenge:
      "Teams want access reviews, approvals and evidence collection in one clear, repeatable flow. Each cycle confirms access with confidence, keeps exceptions current, and produces a record reviewers trust.",
    features: [
      {
        lead: "Reviews as governed cycles",
        body: "with named approvers, deadlines and a definition of done.",
      },
      {
        lead: "Approvals that leave a trail",
        body: "who approved what, when, and on what evidence.",
      },
      {
        lead: "Exceptions with clear review dates",
        body: "so temporary access stays temporary by design and every item stays visible.",
      },
      {
        lead: "Evidence collected in the flow of work",
        body: "so the audit record writes itself as the process runs.",
      },
    ],
    diagramKey: "process",
    deliveredBy: ["PostureOne", "AMS"],
    products: [
      { title: "PostureOne", slug: "postureone", type: "Product", href: "/products/postureone" },
      { title: "AMS", slug: "ams", type: "Product", href: "/products/ams" },
    ],
    proofAndReading: [
      {
        title: "Biometric-Only Authentication For A Global IT Enterprise",
        slug: "biometric-only-authentication-global-it",
        type: "Case study",
        href: "/proof/biometric-only-authentication-global-it",
      },
      {
        title:
          "Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security Model",
        slug: "non-human-identities",
        type: "Insight",
        href: "/thinking/non-human-identities",
      },
      {
        title: "Back to Solutions",
        slug: "solutions",
        type: "Solutions",
        href: "/solutions",
      },
    ],
    order: 4,
  },
  {
    title: "Enterprise Technology",
    slug: "enterprise-technology",
    summary:
      "Identity sits across every system you run. Connect the platforms you already have into one governed sign-in and access layer.",
    ctaHeadline: "Make your systems work as one layer.",
    challenge:
      "Identity sits across every system you run: directories, SaaS, branch terminals, plant systems. Teams want the platforms they already have working as one governed layer, with clear ownership for every connection.",
    features: [
      {
        lead: "Connect the platforms you have",
        body: "into one governed sign-in and access layer, through standard protocols.",
      },
      {
        lead: "Verified sign-in",
        body: "with FIDO2 keys that work with your existing identity provider.",
      },
      {
        lead: "One posture view",
        body: "across the connected systems, instead of one console per platform.",
      },
      {
        lead: "Key fleet management",
        body: "through AMS, so hardware stays fully supported by XSignOn.",
      },
    ],
    diagramKey: "enterprise",
    deliveredBy: ["PostureOne", "Passwordless Keys", "AMS"],
    products: [
      { title: "PostureOne", slug: "postureone", type: "Product", href: "/products/postureone" },
      { title: "Passwordless Keys", slug: "keys", type: "Product", href: "/products/keys" },
      { title: "AMS", slug: "ams", type: "Product", href: "/products/ams" },
    ],
    proofAndReading: [
      {
        title: "Securing Bank Access With FIDO2 Biometric Keys",
        slug: "securing-bank-access-fido2",
        type: "Case study",
        href: "/proof/securing-bank-access-fido2",
      },
      {
        title: "Elevate Enterprise Security with Identity-First Controls",
        slug: "identity-first-controls",
        type: "Insight",
        href: "/thinking/identity-first-controls",
      },
      {
        title: "Back to Solutions",
        slug: "solutions",
        type: "Solutions",
        href: "/solutions",
      },
    ],
    order: 5,
  },
];

// Slug alias resolver (e.g., #sol-identity -> identity-governance)
export const solutionSlugAliases: Record<string, string> = {
  "sol-identity": "identity-governance",
  identity: "identity-governance",
  "identity-governance": "identity-governance",
  "sol-ai": "ai-and-digital-governance",
  ai: "ai-and-digital-governance",
  "ai-governance": "ai-and-digital-governance",
  "ai-and-digital-governance": "ai-and-digital-governance",
  "sol-quantum": "quantum-safe-security",
  quantum: "quantum-safe-security",
  "quantum-safe": "quantum-safe-security",
  "quantum-safe-security": "quantum-safe-security",
  "sol-process": "business-process",
  process: "business-process",
  "business-process": "business-process",
  "sol-enterprise": "enterprise-technology",
  enterprise: "enterprise-technology",
  "enterprise-technology": "enterprise-technology",
};
