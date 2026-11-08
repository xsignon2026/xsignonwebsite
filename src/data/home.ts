import type { HomePageData } from "@/types/home";

// S-14 / T-090 / T-096: Canonical Homepage fallback data.
// Source of truth: xsignon-home-beams.html (lines 1705-2156).
export const fallbackHomeData: HomePageData = {
  hero: {
    headline: "Identity and access built on trust.",
    subline:
      "XSignOn gives people and AI agents the right access at the right moment, with human oversight woven into every decision. One platform for posture, sign-in, evaluation and day-to-day access operations.",
    primaryButton: {
      text: "Book a strategy call",
      href: "/contact",
    },
    secondaryButton: {
      text: "View all products",
      href: "/products",
    },
    slides: [
      {
        name: "PostureOne",
        category: "Security Posture",
        count: "01 / 05",
        desc: "Website and cloud security posture in one view, with findings, owners and evidence in a single place.",
        iconKey: "postureone",
      },
      {
        name: "EvalOne",
        category: "AI Evaluation",
        count: "02 / 05",
        desc: "AI systems evaluated against recognized frameworks, with evidence a reviewer can follow.",
        iconKey: "evalone",
      },
      {
        name: "XSense",
        category: "Identity Analytics and MFA",
        count: "03 / 05",
        desc: "Identity analytics and a software-bound identity provider for governed sign-in at scale.",
        iconKey: "xsense",
      },
      {
        name: "Passwordless Keys",
        category: "FIDO2 Hardware Keys",
        count: "04 / 05",
        desc: "FIDO2 biometric keys in four models, delivered and supported by XSignOn.",
        iconKey: "keys",
      },
      {
        name: "AMS",
        category: "Key Management",
        count: "05 / 05",
        desc: "The platform that delivers, enrolls and manages passwordless keys across the organization.",
        iconKey: "ams",
      },
    ],
  },
  standardsMarquee: [
    "FIDO2",
    "SOC 2",
    "ISO 27001",
    "NIST AI-RMF",
    "NIST 800-207",
    "GDPR",
  ],
  featuredProductSlugs: ["postureone", "keys", "evalone", "xsense", "ams"],
  coverflowCards: [
    {
      name: "PostureOne",
      desc: "A living inventory of every person, device and agent, scored continuously.",
      tags: ["Identity inventory", "Posture scoring", "Continuous review"],
      href: "/products/postureone",
      iconKey: "postureone",
      imageAlt: "Server racks with network cabling in a data centre",
    },
    {
      name: "Passwordless Keys",
      desc: "Passkeys, biometrics and hardware keys in one calm sign-in flow.",
      tags: ["Passkeys", "Biometrics", "Hardware keys"],
      href: "/products/keys",
      iconKey: "keys",
      imageAlt: "Person holding a phone in one hand while signing in on a laptop",
    },
    {
      name: "EvalOne",
      desc: "Agents evaluated with structured checks, evidence and a named reviewer.",
      tags: ["Agent evaluation", "Evidence packs", "Sign-off flows"],
      href: "/products/evalone",
      iconKey: "evalone",
      imageAlt: "Team running an evaluation workshop with notes on a wall",
    },
    {
      name: "XSense",
      desc: "Identity analytics and software-bound sign-in for enterprise access.",
      tags: ["Identity analytics", "Software MFA", "Session telemetry"],
      href: "/products/xsense",
      iconKey: "xsense",
      imageAlt: "Engineer reviewing analytics on a monitor",
    },
    {
      name: "AMS",
      desc: "Access requests, approvals and periodic reviews with a complete trail.",
      tags: ["Access requests", "Approvals", "Periodic reviews"],
      href: "/products/ams",
      iconKey: "ams",
      imageAlt: "Warehouse shelves of tracked inventory and parts",
    },
  ],
  partnerCategories: [
    {
      id: "microseg",
      label: "Micro-segmentation",
      fromPartners: ["Workload labels", "Flow telemetry", "Enforcement points"],
      inXSignOn: ["Identity binding", "Attestation events", "Audit timeline"],
      deliveredThrough: ["PostureOne", "XSense"],
      detailText:
        "Network micro-segmentation telemetry feeds into XSignOn to map network flows to verified identities and posture states.",
    },
    {
      id: "data-ai",
      label: "Data + AI security",
      fromPartners: ["Prompt evaluations", "Data classification", "Model registry"],
      inXSignOn: ["Agent identities", "Owner sign-offs", "Review cycles"],
      deliveredThrough: ["EvalOne", "PostureOne"],
      detailText:
        "AI security scanners and data classifications connect directly into EvalOne to assemble human-reviewed evidence packs.",
    },
    {
      id: "biometrics",
      label: "Hardware biometrics",
      fromPartners: ["FIDO2 authenticators", "Biometric matches", "Firmware attestation"],
      inXSignOn: ["Enrollment records", "Lifecycle state", "Audit evidence"],
      deliveredThrough: ["Passwordless Keys", "AMS"],
      detailText:
        "Certified biometric authenticators pair with AMS for hands-free organizational provisioning and revocation.",
    },
    {
      id: "quantum",
      label: "Quantum-safe",
      fromPartners: ["Post-quantum crypto", "Hybrid key exchange", "Entropy sources"],
      inXSignOn: ["Algorithm inventory", "Migration status", "Policy guardrails"],
      deliveredThrough: ["PostureOne", "XSense"],
      detailText:
        "Quantum-resilient algorithm discovery feeds into PostureOne dashboards to plan safe cryptographic transitions.",
    },
  ],
  solutions: [
    {
      title: "Identity Governance",
      desc: "Teams want one accountable sign-in for every person and agent. Govern who and what gets access, and prove it with confidence.",
      href: "/products",
      deliveredBy: ["PostureOne", "AMS", "Passwordless Keys"],
      diagramKey: "identity",
    },
    {
      title: "AI and Digital Governance",
      desc: "Teams want AI evidence ready with confidence. Map AI use to frameworks and keep evidence ready.",
      href: "/products/evalone",
      deliveredBy: ["EvalOne", "PostureOne"],
      diagramKey: "ai",
    },
    {
      title: "Quantum-Safe Security",
      desc: "Teams are preparing early for post-quantum methods. Inventory what you rely on and plan the move with clarity and confidence.",
      href: "/products/postureone",
      deliveredBy: ["PostureOne", "XSense"],
      diagramKey: "quantum",
    },
    {
      title: "Business Process",
      desc: "Access operations built around how teams work, with human review at every critical checkpoint.",
      href: "/products/ams",
      deliveredBy: ["AMS", "XSense"],
      diagramKey: "process",
    },
    {
      title: "Enterprise Technology",
      desc: "Unify legacy on-prem infrastructure, air-gapped zones, and modern cloud estates under one zero-trust control plane.",
      href: "/products",
      deliveredBy: ["PostureOne", "Passwordless Keys", "XSense"],
      diagramKey: "enterprise",
    },
  ],
  thinking: {
    lead: {
      title: "Data + AI Security Built for Visibility, Control, and Trust",
      date: "June 29, 2026",
      desc: "AI governance assessments start with simple questions: which AI systems are in production, who owns them, and what data they touch. This article sets out the evidence that answers each one, ready before the assessment letter arrives.",
      href: "/thinking/data-and-ai-security",
      imageAlt: "Engineer with a laptop walking past server racks in a data centre",
    },
    items: [
      {
        title: "Modern Micro-Segmentation for Zero Trust Security",
        date: "June 29, 2026",
        desc: "Micro-segmentation divides an estate into small, governed zones, and the modern version starts with identity: who and what is asking, with what assurance, before any connection is allowed.",
        href: "/thinking/modern-micro-segmentation",
        imageAlt: "Close-up of server hardware and cabling in a rack",
      },
      {
        title: "Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework",
        date: "June 29, 2026",
        desc: "Agentic AI divides a job among specialized agents that plan, act and check each other's work. For security and governance, that structure is the point: every action owned, scoped and reviewable.",
        href: "/thinking/agentic-ai-cybersecurity",
        imageAlt: "Engineer working on a laptop in a technology lab",
      },
      {
        title: "Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security Model",
        date: "June 29, 2026",
        desc: "A growing share of sign-ins comes from non-human identities: service accounts, automations and AI agents. Each one deserves the same governance as a person's account: an owner, a scope, and a review cycle.",
        href: "/thinking/non-human-identities",
        imageAlt: "Close-up photograph of an illuminated circuit board",
      },
    ],
  },
  featuredProof: [
    {
      title: "Securing Bank Access With FIDO2 Biometric Keys",
      tag: "Banking",
      metric: "100% passwordless enrollment",
      href: "/proof/securing-bank-access-fido2",
    },
    {
      title: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
      tag: "Manufacturing",
      metric: "Air-gapped verification",
      href: "/proof/biometric-fido2-air-gapped-industrial",
    },
  ],
  selectedInsightSlugs: [
    "data-ai-security",
    "modern-microsegmentation",
    "agentic-ai-autogen",
    "non-human-identities",
  ],
  cta: {
    title: "Talk to us about sign-in your team will love.",
    subtitle:
      "Speak with our security architects to evaluate your infrastructure and design a roadmap.",
    buttonText: "Book a strategy call",
    buttonHref: "/contact",
  },
};
