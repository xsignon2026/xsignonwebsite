// The About page content, word for word from the approved prototype (view-about).
// Images are in public/images/about; each has its own text description for people who cannot see it.

export const aboutImages = {
  team: { src: "/images/about/img-4414a7be.jpg", width: 900, height: 600 },
  what: [
    {
      src: "/images/about/img-4b87cab8.jpg",
      alt: "IT team working at laptops around a table",
      caption: "Identity governance",
    },
    {
      src: "/images/about/img-fc10b560.jpg",
      alt: "Analytics dashboard with charts on a laptop screen",
      caption: "AI governance",
    },
    {
      src: "/images/about/img-127cbff0.jpg",
      alt: "Person holding a phone while signing in on a laptop",
      caption: "Passwordless sign-in",
    },
    {
      src: "/images/about/img-12ac7d61.jpg",
      alt: "Illuminated circuit board",
      caption: "Quantum-safe security",
    },
  ],
} as const;

export const principles = [
  {
    title: "Evidence over assertion",
    text: "Every claim about posture points at evidence a reviewer can open.",
  },
  {
    title: "The secure way is the easy way",
    text: "The governed path is the fastest path, with clear guidance at every step.",
  },
  {
    title: "Every access has an owner",
    text: "Every account, key and AI agent has a named owner.",
  },
] as const;

type Row = { href: string; title: string; kind: string };

export const whatWeDo: ReadonlyArray<{
  number: string;
  title: string;
  text: string;
  label: string;
  rows: ReadonlyArray<Row>;
  more: string;
}> = [
  {
    number: "01",
    title: "Identity governance",
    text: "Control who and what gets access across staff, devices and AI agents.",
    label: "Products that deliver it",
    rows: [
      { href: "/products/postureone", title: "PostureOne", kind: "Product" },
      { href: "/products/ams", title: "AMS", kind: "Product" },
      { href: "/products/passwordless-keys", title: "Passwordless Keys", kind: "Product" },
    ],
    more: "/solutions/identity-governance",
  },
  {
    number: "02",
    title: "AI governance",
    text: "Map AI use to recognized frameworks and keep the evidence ready.",
    label: "Products that deliver it",
    rows: [
      { href: "/products/evalone", title: "EvalOne", kind: "Product" },
      { href: "/products/postureone", title: "PostureOne", kind: "Product" },
    ],
    more: "/solutions/ai-and-digital-governance",
  },
  {
    number: "03",
    title: "Passwordless sign-in",
    text: "Replace passwords with FIDO2 keys and managed enrollment.",
    label: "Key models",
    rows: [
      { href: "/products/passwordless-keys", title: "AUTH Bio", kind: "Biometric" },
      { href: "/products/passwordless-keys", title: "AUTH Bio Pro", kind: "Biometric" },
      { href: "/products/passwordless-keys", title: "AUTH Bio Touch", kind: "Touch-activated" },
      { href: "/products/passwordless-keys", title: "AUTH Bio Desktop", kind: "Desktop" },
    ],
    more: "/products/passwordless-keys",
  },
  {
    number: "04",
    title: "Quantum-safe security",
    text: "Inventory what you rely on today, then plan the move.",
    label: "Products that deliver it",
    rows: [
      { href: "/products/postureone", title: "PostureOne", kind: "Product" },
      { href: "/products/passwordless-keys", title: "Passwordless Keys", kind: "Product" },
    ],
    more: "/solutions/quantum-safe-security",
  },
];

export const howWeWork = {
  steps: [
    {
      rail: "01 · Baseline",
      title: "Identity and Confidence Baseline",
      text: "We assess how sign-in, access and AI use actually work today: which accounts exist, who owns them, and where passwords remain.",
      get: "You get: a posture snapshot in PostureOne and a prioritized list with owners.",
    },
    {
      rail: "02 · Architecture",
      title: "Zero Trust Security Architecture",
      text: "We design the target state across products, policies and frameworks, then sequence the rollout so every team keeps continuous access.",
      get: "You get: a target architecture, a phased plan, and recovery flows tested with real staff.",
    },
    {
      rail: "03 · Continuous governance",
      title: "Continuous Governance and Response",
      text: "Posture stays current after go-live. Access reviews run on a cycle and evidence stays mapped to the frameworks your auditors use.",
      get: "You get: current posture in one view and evidence ready when an auditor asks.",
    },
  ],
} as const;

export const whyXSignOn = [
  {
    n: "01",
    title: "Human oversight by design",
    text: "Review, approval and override are built into the flow of work, with a named person accountable at every step that matters.",
  },
  {
    n: "02",
    title: "Autonomy within authority",
    text: "Agents act freely inside the tier they have earned, and the boundary is always visible to the people who set it.",
  },
  {
    n: "03",
    title: "Evidence everywhere",
    text: "Every decision carries its signals, sources and reasoning, ready for reviewers today and auditors tomorrow.",
  },
  {
    n: "04",
    title: "Governance on the inside",
    text: "Policy lives inside the product, applied as work happens, rather than in documents checked after the fact.",
  },
] as const;

export const aboutThinking = {
  featured: {
    title: "Tiers, not toggles: a richer language for agent authority",
    text: "On and off is too blunt for agents that book, buy and build. Five tiers give teams a vocabulary for autonomy that grows with evidence.",
    href: "/thinking",
    image: {
      src: "/images/about/img-7e2521fe.jpg",
      alt: "Glass office towers photographed from below",
      width: 900,
      height: 600,
    },
  },
  cards: [
    {
      title: "Micro-segmentation for agents: small scopes, clear ownership",
      text: "Give each agent the smallest scope that lets it do great work, name the owner, and let the boundary do the reassuring.",
      image: { src: "/images/about/img-e1bbd4c1.jpg", alt: "Illuminated circuit board" },
    },
    {
      title: "Sign-in people love: lessons from four AUTH models",
      text: "Passkeys, biometrics, hardware keys and one-time codes each shine in different moments. The craft is in choosing per moment, not per policy.",
      image: {
        src: "/images/about/img-399d1f08.jpg",
        alt: "Combination padlock and chip cards on a keyboard",
      },
    },
    {
      title: "Evaluating agents the way great teams review code",
      text: "Small scopes, attached evidence, a named reviewer. Code review culture already solved the shape of agent evaluation; we borrowed it.",
      image: {
        src: "/images/about/img-640949d3.jpg",
        alt: "Engineer working on a laptop in a technology lab",
      },
    },
    {
      title: "Confidence you can show: provenance as a product feature",
      text: "When every decision carries its sources with it, trust stops being a promise and becomes something a reviewer can open and inspect.",
      image: {
        src: "/images/about/img-a42dd1b1.jpg",
        alt: "Close-up of server hardware and cabling",
      },
    },
  ],
} as const;
