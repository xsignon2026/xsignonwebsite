import type { ProductsPageContent } from "@/types/products-page-content";

// The Products listing page as it is today. Used when Sanity is not connected, and for any part the editors leave empty.
export const productsPageFallback: ProductsPageContent = {
  hero: { title: "Our products" },
  newLaunches: {
    title: "New launches",
    items: [
      {
        name: "XSignOn Mesh",
        tag: "Micro-segmentation",
        text: "Micro-segmentation and containment that keeps one failure small, with zone and flow maps that feed your posture view.",
        href: "/products/xsignon-mesh",
        cta: "Explore XSignOn Mesh",
        picture: "analytics",
      },
      {
        name: "Passwordless Keys",
        tag: "Passwordless",
        text: "Passkeys, biometrics and hardware keys in one calm sign-in flow, so people prove who they are without a password.",
        href: "/products/passwordless-keys",
        cta: "Explore the keys",
        picture: "passwordless",
      },
      {
        name: "EvalOne",
        tag: "AI evaluation",
        text: "Agents evaluated with structured checks, evidence and a named reviewer, ready for the people who sign off.",
        href: "/products/evalone",
        cta: "Explore EvalOne",
        picture: "workshop",
      },
    ],
  },
  cards: {
    items: [
      {
        name: "PostureOne",
        tags: ["Identity inventory", "Posture scoring", "Continuous review"],
        text: "A living inventory of every person, device and agent, with posture scored continuously so reviews start from evidence instead of spreadsheets.",
        href: "/products/postureone",
        picture: "postureone",
      },
      {
        name: "Passwordless Keys",
        tags: ["Passkeys", "Biometrics", "Hardware keys", "4 AUTH models"],
        text: "Sign-in your team will love: passkeys, biometrics and hardware keys in one calm flow, with recovery paths people can actually follow.",
        href: "/products/passwordless-keys",
        picture: "passwordless",
      },
      {
        name: "EvalOne",
        tags: ["Agent evaluation", "Evidence packs", "Sign-off flows"],
        text: "Agents are evaluated the way great teams review code: structured checks, attached evidence and a named reviewer before authority grows.",
        href: "/products/evalone",
        picture: "workshop",
      },
      {
        name: "XSense",
        tags: ["Live signals", "Behaviour context", "Adaptive decisions"],
        text: "Behavioural and contextual signals stream into every access decision, so the platform responds to the moment rather than a static rule.",
        href: "/products/xsense",
        picture: "analytics",
      },
      {
        name: "AMS",
        tags: ["Access requests", "Approvals", "Periodic reviews"],
        text: "The day-to-day home of access operations: requests, approvals and periodic reviews with clear owners and a complete trail.",
        href: "/products/ams",
        picture: "warehouse",
      },
    ],
  },
  thinking: { title: "Our thinking", allLink: { label: "All articles", href: "/thinking" } },
  cta: {
    title: "Talk to us about sign-in your team will love.",
    button: { label: "Book a strategy call", href: "/contact" },
  },
};
