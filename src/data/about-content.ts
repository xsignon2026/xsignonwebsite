import type { AboutContent } from "@/types/about-content";

// The About page as it is today. Used when Sanity is not connected, and for any part the editors leave empty.
export const aboutContentFallback: AboutContent = {
  hero: {
    eyebrow: "About XSignOn",
    title: "Security built around identity, governance, and what comes next.",
    description:
      "XSignOn develops cybersecurity products and security approaches that help organizations strengthen access, govern emerging technology, and prepare for evolving digital risk.",
  },
  who: {
    title: "Who we are",
    statement:
      "XSignOn is a cybersecurity and identity company developing products across security posture, passwordless authentication, and AI evaluation.",
    paragraphs: [
      "Our work connects identity, governance, data and emerging technology risk. We help organizations understand exposure, strengthen access, and build controls that can evolve with their operating environment.",
      "We combine product development, security architecture and continuous governance into one connected approach.",
    ],
  },
  whatWeDo: {
    title: "What we do",
    items: [
      {
        title: "Identity governance",
        text: "Understand identities, access, permissions and control gaps across your environment.",
        art: "identity",
      },
      {
        title: "AI and digital governance",
        text: "Evaluate AI systems and digital risk against defined security and governance requirements.",
        art: "ai",
      },
      {
        title: "Passwordless authentication",
        text: "Reduce credential exposure with biometric, phishing-resistant sign-in.",
        art: "key",
      },
      {
        title: "Quantum-safe security",
        text: "Understand and prepare for emerging cryptographic risk.",
        art: "atom",
      },
    ],
  },
  how: {
    title: "How we work",
    steps: [
      {
        title: "Understand the environment",
        kind: "Baseline report",
        text: "Establish the identity, technology, data and risk baseline.",
      },
      {
        title: "Define the architecture",
        kind: "Architecture plan",
        text: "Identify control gaps and design the right security approach.",
      },
      {
        title: "Implement the solution",
        kind: "Working controls",
        text: "Introduce products, controls and workflows without unnecessary disruption.",
      },
      {
        title: "Govern continuously",
        kind: "Ongoing evidence",
        text: "Monitor change, evaluate risk and maintain evidence over time.",
      },
    ],
  },
  why: {
    title: "Why XSignOn",
    principles: [
      {
        title: "Security must work in practice",
        lines: ["A control is valuable only when it", "works in the real environment."],
        via: "Real environments",
      },
      {
        title: "Identity is foundational",
        lines: ["Access, governance and accountability", "begin with who or what is acting."],
        via: "Who or what is acting",
      },
      {
        title: "Evidence over assumption",
        lines: ["Decisions rest on observable risk,", "controls and outcomes."],
        via: "Observable outcomes",
      },
      {
        title: "Prepare without disruption",
        lines: ["Address emerging risk without", "abandoning systems that still serve you."],
        via: "Systems still in use",
      },
    ],
  },
  productsLine: {
    text: "Our products put this approach into practice: one posture view, sign-in without passwords, and evidence for AI systems.",
    links: [
      { label: "PostureOne", href: "/products/postureone" },
      { label: "Passwordless Authenticators", href: "/products/passwordless-keys" },
      { label: "EvalOne", href: "/products/evalone" },
    ],
  },
  careers: {
    title: "Build security for what comes next",
    text: "We bring together people working across identity, cybersecurity, AI governance, product development and enterprise technology. Based in McKinney, Texas.",
    emptyNote: "There are no open positions right now. Follow XSignOn for future opportunities.",
  },
};
