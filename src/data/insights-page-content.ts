import type { InsightsPageContent } from "@/types/insights-page-content";

// The Our thinking hub as it is today. Used when Sanity is not connected, and for any part the editors leave empty.
export const insightsPageFallback: InsightsPageContent = {
  hero: { title: "Our thinking" },
  featured: {
    label: "Featured",
    title: "Elevate Enterprise Security with Identity-First Controls",
    excerpt:
      "Removing passwords changes more than the login screen. Enrollment, recovery and support all shift, and the rollout order matters more than the hardware.",
    author: "XSignOn Team",
    date: "June 29, 2026",
    href: "/thinking/identity-first-controls",
    cta: "Read the article",
    picture: "identity-first",
  },
  cards: [
    {
      title: "Data + AI Security Built for Visibility, Control, and Trust",
      excerpt:
        "The questions that show up in AI assessments, and the evidence that answers each one.",
      author: "XSignOn Team",
      date: "June 29, 2026",
      href: "/thinking/data-and-ai-security",
      cta: "Read the article",
      picture: "data-ai",
    },
    {
      title: "Modern Micro-Segmentation for Zero Trust Security",
      excerpt:
        "Segments drawn around identities stay accurate, because they follow the thing that actually requests access.",
      author: "XSignOn Team",
      date: "June 29, 2026",
      href: "/thinking/modern-micro-segmentation",
      cta: "Read the article",
      picture: "micro-segmentation",
    },
    {
      title:
        "Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security Model",
      excerpt:
        "Service accounts, automations and AI agents hold access too. Each one gets an owner, a scope, and a review cycle.",
      author: "XSignOn Team",
      date: "June 29, 2026",
      href: "/thinking/non-human-identities",
      cta: "Read the article",
      picture: "non-human",
    },
    {
      title: "Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework",
      excerpt:
        "Agents that plan, act and check each other's work, governed with owners and evidence from the first deployment.",
      author: "XSignOn Team",
      date: "June 29, 2026",
      href: "/thinking/agentic-ai-cybersecurity",
      cta: "Read the article",
      picture: "agentic-ai",
    },
  ],
  cta: {
    title: "Discuss what you are reading.",
    button: { label: "Book a strategy call", href: "/contact" },
  },
};
