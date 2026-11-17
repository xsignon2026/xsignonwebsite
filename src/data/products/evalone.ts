import type { Product } from "@/types/product";

// S-14 / T-083: Canonical EvalOne product data.
// Source of truth: xsignon-home-beams.html (lines 2549-2643).
export const evalOneProduct: Product = {
  name: "EvalOne",
  slug: "evalone",
  tagline: "EvalOne evaluates AI systems against recognized frameworks.",
  hero: {
    subline:
      "EvalOne evaluates AI systems against recognized frameworks. AI is moving into production with momentum, and reviewers value clear evidence of how AI is governed. EvalOne maps AI use to frameworks, tracks the gaps, and produces evidence a reviewer can follow with ease.",
    tags: ["AI governance", "Evaluation", "Evidence"],
  },
  checklist: {
    meta: "Evaluation checklist",
    items: [
      { label: "AI use inventory across teams", done: true },
      { label: "Control mapping to NIST AI-RMF", done: true },
      { label: "Gap register with owners and deadlines", done: false },
      { label: "Evidence pack for reviewers", done: false },
    ],
  },
  capabilityCards: [
    {
      title: "AI use inventory",
      description:
        "Which AI systems are in use, where they run, and who is responsible for them. Every system joins the inventory with an owner, so coverage stays complete and clear.",
    },
    {
      title: "Framework control mapping",
      description:
        "AI use is mapped control by control to the frameworks your reviewers use, so assessments start from a complete map instead of a blank questionnaire.",
    },
    {
      title: "Gap register",
      description:
        "Gaps carry owners and deadlines. Progress is visible in one list, and every item stays active until it closes with evidence.",
    },
    {
      title: "Reviewer-ready evidence",
      description:
        "Evidence attaches as work completes, so an assessment exports a pack a reviewer can follow with ease.",
    },
  ],
  framework: {
    title: "How it works",
    steps: [
      {
        stepNumber: "01",
        title: "Inventory AI use",
        description:
          "Systems, vendors and deployments are listed with owners, including AI adopted directly by teams across the organization.",
      },
      {
        stepNumber: "02",
        title: "Map the controls",
        description:
          "Each system is mapped to the controls of the frameworks that apply to it, showing coverage clearly for every system.",
      },
      {
        stepNumber: "03",
        title: "Close the gaps",
        description:
          "Owners work the gap register in priority order, attaching evidence as each gap closes.",
      },
      {
        stepNumber: "04",
        title: "Export the evidence",
        description:
          "Assessments and audits receive an evidence pack that traces each claim back to its source.",
      },
    ],
  },
  specTable: {
    title: "Frameworks it evaluates against",
    subtitle:
      "EvalOne runs a six-layer evaluation framework, and every layer is mapped to the recognized frameworks your reviewers use, so one evaluation produces evidence for all five.",
    columns: ["Framework", "What EvalOne maps"],
    rows: [
      {
        header: "NIST AI RMF",
        values: ["Govern, map, measure and manage functions, evidenced layer by layer."],
      },
      {
        header: "OWASP",
        values: ["Application and LLM security checks, with results attached to each system."],
      },
      {
        header: "MITRE ATLAS",
        values: ["Technique coverage for AI systems, tracked in the gap register."],
      },
      {
        header: "EU AI Act",
        values: ["Obligations by system category, with owners and evidence for each one."],
      },
      {
        header: "ISO/IEC 42001",
        values: ["AI management system controls, mapped to your policies and reviews."],
      },
    ],
    footnote:
      "Evaluations apply where the framework fits your AI use. A system is only shown as evaluated against the frameworks it was actually assessed on.",
  },
  relatedItems: [
    {
      title: "AI and Digital Governance",
      typeLabel: "Solution",
      href: "/resources/solutions#sol-ai",
    },
    {
      title: "Data + AI Security Built for Visibility, Control, and Trust",
      typeLabel: "Insight",
      href: "/resources/thinking#article-data-ai",
    },
    {
      title: "All case studies in Proof",
      typeLabel: "Proof",
      href: "/proof",
    },
    {
      title: "Back to Our products",
      typeLabel: "Products",
      href: "/products",
    },
  ],
  cta: {
    title: "Know what your AI is governed against.",
    buttonText: "Book a strategy call",
    buttonHref: "/contact",
  },
  seo: {
    title: "EvalOne | AI Governance & Framework Evaluation | XSignOn",
    description:
      "EvalOne evaluates AI systems against recognized frameworks, tracks gaps, and produces audit-ready evidence packs.",
  },
};
