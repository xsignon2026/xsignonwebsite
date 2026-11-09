import type { Article } from "@/types/article";

// S-14 / T-113 to T-120: Canonical Articles Dataset.
// Source of truth: xsignon-home-beams.html (#view-thinking, #view-article-*).
export const canonicalArticles: Article[] = [
  {
    slug: "identity-first-controls",
    title: "Elevate Enterprise Security with Identity-First Controls",
    excerpt:
      "Removing passwords changes more than the login screen. Enrollment, recovery and support all shift, and the rollout order matters more than the hardware.",
    author: "XSignOn Team",
    date: "June 29, 2026",
    topic: "Identity-First",
    readingTime: "4 min read",
    featured: true,
    pullQuote:
      "The rollout order matters more than the hardware: pilot the priority group first, and everyone keeps access during the move.",
    sections: [
      {
        heading: "The login screen is the smallest change",
        paragraphs: [
          "Teams planning a passwordless rollout spend most of their energy on the sign-in moment: the key, the tap, the biometric. That moment is the easiest part. Moving to verified keys improves enrollment, recovery and support even more than the login screen, and those three shape a confident rollout.",
          "Enrollment is the first contact most staff have with the new system, and clear, guided enrollment sets a confident tone from day one. Recovery is the moment that matters most: a staff member who needs a replacement key on a Monday morning is working again by Monday afternoon, with a verified key and human support. The help desk shines in both, because every enrollment and recovery is a chance to give staff a smooth, supported experience.",
        ],
      },
      {
        heading: "Rollout order matters more than the hardware",
        paragraphs: [
          "The instinct is to start with the easiest group. The better move is to start with a priority group small enough to learn from. A pilot with branch managers or field staff shows how enrollment works in the real world, while the group is small enough that each person gets a human response.",
          "Phasing protects access during the move. Every team member keeps access to the systems they need throughout the rollout. Parallel sign-in during the transition is a strength: it keeps the business running smoothly while the secure path becomes the default.",
        ],
        pullQuote:
          "The rollout order matters more than the hardware: pilot the priority group first, and everyone keeps access during the move.",
      },
      {
        heading: "What the help desk actually gets",
        paragraphs: [
          "Keys move help desk work to enrollment and replacement, which are planned events teams can schedule. The help desk gains work it can plan, measure and improve, and staff gain time back every week.",
          "That shift is worth naming when you ask for the budget. The value case for passwordless is clear: time saved on resets every week, smoother days at the branch, and sign-in that meets the same high standard as the rest of the program.",
        ],
      },
    ],
    relatedLinks: [
      { title: "Passwordless Keys", type: "Product", href: "/products/keys" },
      {
        title: "Enterprise Technology",
        type: "Solution",
        href: "/solutions/enterprise-technology",
      },
      {
        title:
          "Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security Model",
        type: "Insight",
        href: "/thinking/non-human-identities",
      },
      { title: "Back to Our thinking", type: "Our thinking", href: "/thinking" },
    ],
    ctaHeadline: "Plan a rollout in the right order.",
    slugAliases: ["article-identity-first", "identity-first"],
  },
  {
    slug: "data-and-ai-security",
    title: "Data + AI Security Built for Visibility, Control, and Trust",
    excerpt:
      "The questions that show up in AI assessments, and the evidence that answers each one.",
    author: "XSignOn Team",
    date: "June 29, 2026",
    topic: "Data + AI",
    readingTime: "4 min read",
    featured: false,
    pullQuote:
      "An assessment that begins with a document search is already a finding: governance leads the way, with evidence ready at every step.",
    sections: [
      {
        heading: "The questions arrive before the evidence exists",
        paragraphs: [
          "AI governance assessments start with questions that sound simple: which AI systems are in production, who owns them, what data they touch, and which frameworks they were assessed against. Most teams hear these questions and start a document search, because the answers live in procurement threads, vendor pages and someone's memory.",
          "That search is the finding. An assessment that begins with assembling evidence from scratch is already telling the reviewer that governance follows use instead of preceding it.",
        ],
      },
      {
        heading: "What evidence answers each question",
        paragraphs: [
          "Inventory. A list of AI systems with owners and deployment locations. Team-led AI, the deployments adopted directly by teams, belongs on this list with pride of place, because a complete inventory gives the assessment its full, accurate scope.",
          "Control mapping. Each system mapped to the controls of the frameworks that apply to it, showing coverage clearly for every system. A map with gaps marked clearly is credible and ready to act on.",
          "Ownership and change. Who is responsible when a model changes, a vendor updates terms, or a new deployment appears. Evidence that a system was assessed once is worth less than evidence that it is assessed continuously.",
        ],
        pullQuote:
          "An assessment that begins with a document search is already a finding: governance leads the way, with evidence ready at every step.",
      },
      {
        heading: "Start before the assessment letter arrives",
        paragraphs: [
          "The cheapest time to build AI governance evidence is before anyone asks for it. Inventory first, map controls second, and attach evidence as work completes. When the assessment comes, the evidence pack exports from work already done, and the questions become a walkthrough instead of a search.",
        ],
      },
    ],
    relatedLinks: [
      { title: "EvalOne", type: "Product", href: "/products/evalone" },
      {
        title: "AI and Digital Governance",
        type: "Solution",
        href: "/solutions/ai-and-digital-governance",
      },
      {
        title: "Modern Micro-Segmentation for Zero Trust Security",
        type: "Insight",
        href: "/thinking/modern-micro-segmentation",
      },
      { title: "Back to Our thinking", type: "Our thinking", href: "/thinking" },
    ],
    ctaHeadline: "Have evidence before the letter arrives.",
    slugAliases: ["article-data-ai", "data-ai", "data-and-ai"],
  },
  {
    slug: "modern-micro-segmentation",
    title: "Modern Micro-Segmentation for Zero Trust Security",
    excerpt:
      "Segments drawn around identities stay accurate, because they follow the thing that actually requests access.",
    author: "XSignOn Team",
    date: "June 29, 2026",
    topic: "Zero Trust",
    readingTime: "3 min read",
    featured: false,
    pullQuote:
      "Segments drawn around identities stay accurate, because they follow the thing that actually requests access.",
    sections: [
      {
        heading: "Segments shaped around identity",
        paragraphs: [
          "Micro-segmentation divides an estate into small, governed zones, so each workload and service reaches only what it needs to do its job. The traditional approach draws those boundaries around network addresses, which change whenever workloads scale or move.",
          "Identity-based segmentation anchors the boundary to the workload itself: who or what is asking, with what credentials, under what posture. The segment moves with the workload, so rules stay simple and enforcement stays current.",
        ],
      },
      {
        heading: "Segments that follow the workload",
        paragraphs: [
          "When workloads carry their own identity, policy does not depend on subnet maps or firewall rules that degrade over time. A workload deployed in a new cluster joins its segment automatically, evaluated on posture and credentials from its first connection.",
          "That model simplifies change. Teams add, retire or move workloads without re-architecting the network, and the security posture remains continuous.",
        ],
        pullQuote:
          "Segments drawn around identities stay accurate, because they follow the thing that actually requests access.",
      },
      {
        heading: "Evidence is part of the design",
        paragraphs: [
          "Each segment produces its own record: what it contains, who owns it, and which connections it allows. When reviewers ask how the estate is divided and why, the answer is the working map itself, current and complete.",
        ],
      },
    ],
    relatedLinks: [
      { title: "PostureOne", type: "Product", href: "/products/postureone" },
      {
        title: "Identity Governance",
        type: "Solution",
        href: "/solutions/identity-governance",
      },
      {
        title: "Elevate Enterprise Security with Identity-First Controls",
        type: "Insight",
        href: "/thinking/identity-first-controls",
      },
      { title: "Back to Our thinking", type: "Our thinking", href: "/thinking" },
    ],
    ctaHeadline: "Draw segments around identity.",
    slugAliases: ["article-microseg", "microseg", "micro-segmentation"],
  },
  {
    slug: "non-human-identities",
    title: "Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security Model",
    excerpt:
      "Service accounts, automations and AI agents hold access too. Each one gets an owner, a scope, and a review cycle.",
    author: "XSignOn Team",
    date: "June 29, 2026",
    topic: "Non-Human Identity",
    readingTime: "4 min read",
    featured: false,
    pullQuote:
      "Every identity, human or not, gets an owner, a scope, and a review cycle. That is the whole model.",
    sections: [
      {
        heading: "The identities doing the work are changing",
        paragraphs: [
          "A growing share of sign-ins comes from non-human identities: service accounts, automations, integrations and AI agents acting on behalf of teams. Each one holds access, and each one deserves the same governance as a person's account: an owner, a scope, and a review cycle.",
          "The opportunity is to govern them by design from the start. Human sign-in took years of programs to bring under one view; non-human identities can join that view now, while their numbers are still easy to inventory.",
        ],
      },
      {
        heading: "A dynamic model, in practice",
        paragraphs: [
          "A dynamic security model treats identity as a living inventory. Non-human identities are registered when they are created, their access is scoped to the task they perform, and their activity is recorded with the same evidence as any staff sign-in.",
          "Reviews then cover the whole estate: people, devices, services and agents in one cycle, with approvers named in advance and exceptions carrying clear dates.",
        ],
        pullQuote:
          "Every identity, human or not, gets an owner, a scope, and a review cycle. That is the whole model.",
      },
      {
        heading: "Where to start",
        paragraphs: [
          "Start with the inventory: which non-human identities exist, what they can reach, and who is responsible for each. That single list turns agent and service access from background noise into governed, provable access, and it is the foundation every later control builds on.",
        ],
      },
    ],
    relatedLinks: [
      { title: "XSense", type: "Product", href: "/products/xsense" },
      {
        title: "AI and Digital Governance",
        type: "Solution",
        href: "/solutions/ai-and-digital-governance",
      },
      {
        title: "Data + AI Security Built for Visibility, Control, and Trust",
        type: "Insight",
        href: "/thinking/data-and-ai-security",
      },
      { title: "Back to Our thinking", type: "Our thinking", href: "/thinking" },
    ],
    ctaHeadline: "Govern every identity, human or not.",
    slugAliases: ["article-nonhuman", "nonhuman", "non-human"],
  },
  {
    slug: "agentic-ai-cybersecurity",
    title: "Building Smarter Cybersecurity with Agentic AI and the AutoGen Framework",
    excerpt:
      "Agents that plan, act and check each other's work, governed with owners and evidence from the first deployment.",
    author: "XSignOn Team",
    date: "June 29, 2026",
    topic: "Agentic AI",
    readingTime: "3 min read",
    featured: false,
    pullQuote:
      "The system prepares, and the human decides. Agentic AI earns its place when every action it takes is owned, scoped and reviewable.",
    sections: [
      {
        heading: "Agents that work in teams",
        paragraphs: [
          "Agentic AI systems divide a job among specialized agents that plan, act and check each other's work. Frameworks such as AutoGen make that pattern practical: agents hold defined roles, pass tasks between them, and keep a record of what each one did.",
          "For security and governance work, that structure is the point. A finding can be gathered by one agent, verified by a second, and prepared for human review by a third, with the full trail available as evidence.",
        ],
      },
      {
        heading: "Governance is designed in, from the first agent",
        paragraphs: [
          "Every agent is a non-human identity, and it earns the same treatment as any other: a named owner, a scoped set of permissions, and activity that is recorded and reviewable. The system prepares, and the human decides, at the steps that matter.",
          "Evaluation keeps pace with deployment. Agent behavior is tested against recognized frameworks before release and monitored after it, so confidence in the system is based on evidence, refreshed continuously.",
        ],
        pullQuote:
          "The system prepares, and the human decides. Agentic AI earns its place when every action it takes is owned, scoped and reviewable.",
      },
      {
        heading: "What good looks like",
        paragraphs: [
          "A well-governed agentic deployment reads like a good team roster: each agent has a role, a manager, and a clear boundary. Teams that set those three things up first find that scale is the easy part.",
        ],
      },
    ],
    relatedLinks: [
      { title: "EvalOne", type: "Product", href: "/products/evalone" },
      {
        title: "AI and Digital Governance",
        type: "Solution",
        href: "/solutions/ai-and-digital-governance",
      },
      {
        title:
          "Non-Human Identities, and the Future of Cyber Risk: Embracing a Dynamic Security Model",
        type: "Insight",
        href: "/thinking/non-human-identities",
      },
      { title: "Back to Our thinking", type: "Our thinking", href: "/thinking" },
    ],
    ctaHeadline: "Put agents to work, with owners.",
    slugAliases: ["article-agentic", "agentic", "agentic-ai", "autogen"],
  },
];

// Slug alias resolver (e.g. #article-identity-first -> identity-first-controls)
export const articleSlugAliases: Record<string, string> = {
  "article-identity-first": "identity-first-controls",
  "identity-first": "identity-first-controls",
  "identity-first-controls": "identity-first-controls",
  "article-data-ai": "data-and-ai-security",
  "data-ai": "data-and-ai-security",
  "data-and-ai": "data-and-ai-security",
  "data-and-ai-security": "data-and-ai-security",
  "article-microseg": "modern-micro-segmentation",
  microseg: "modern-micro-segmentation",
  "micro-segmentation": "modern-micro-segmentation",
  "modern-micro-segmentation": "modern-micro-segmentation",
  "article-nonhuman": "non-human-identities",
  nonhuman: "non-human-identities",
  "non-human": "non-human-identities",
  "non-human-identities": "non-human-identities",
  "article-agentic": "agentic-ai-cybersecurity",
  agentic: "agentic-ai-cybersecurity",
  "agentic-ai": "agentic-ai-cybersecurity",
  autogen: "agentic-ai-cybersecurity",
  "agentic-ai-cybersecurity": "agentic-ai-cybersecurity",
};
