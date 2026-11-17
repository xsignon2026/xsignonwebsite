import type { Product } from "@/types/product";

// S-14 / T-086: Canonical AMS product data.
// Source of truth: xsignon-home-beams.html (lines 2736-2830).
export const amsProduct: Product = {
  name: "AMS",
  slug: "ams",
  tagline:
    "AMS is the platform that delivers, enrolls and manages passwordless keys across the organization.",
  hero: {
    subline:
      "AMS is the platform that delivers, enrolls and manages passwordless keys across the organization. Hardware is only half a passwordless program; the other half is getting keys into hands, arranging replacements with ease, and knowing at any moment which key belongs to whom. AMS carries that half, delivered and supported by XSignOn.",
    tags: ["Key management", "Enrollment", "Lifecycle"],
  },
  snapshot: {
    meta: "Lifecycle snapshot",
    rows: [
      { label: "Keys enrolled", value: "92%", percentage: 92, color: "green" },
      { label: "Replacements in transit", value: "24", percentage: 24, color: "default" },
      { label: "Enrollment exceptions open", value: "7", percentage: 12, color: "default" },
    ],
  },
  capabilityCards: [
    {
      title: "Delivery and support",
      description:
        "Keys ship to staff ready to enroll, with support handled by XSignOn. Keys that need replacement are handled through AMS, with clear tracking and support from XSignOn.",
    },
    {
      title: "Enrollment workflows",
      description:
        "Guided enrollment for pilots, new starters and role changes, with recovery paths built around a verified key.",
    },
    {
      title: "Lifecycle and exceptions",
      description:
        "Every key carries its state: enrolled, active, scheduled for review, replaced. Exceptions stay visible until they are resolved with evidence.",
    },
    {
      title: "Reporting for review",
      description:
        "Enrollment coverage and exception counts feed posture reporting, so key management shows up in governance evidence instead of a separate spreadsheet.",
    },
  ],
  framework: {
    title: "How it works",
    steps: [
      {
        stepNumber: "01",
        title: "Plan the rollout",
        description:
          "Roles are matched to key models, and the pilot group is enrolled first so recovery flows are proven before scale-up.",
      },
      {
        stepNumber: "02",
        title: "Enroll staff",
        description:
          "Keys arrive ready to enroll. Staff complete guided enrollment, and exceptions are handled with a human guide at every step.",
      },
      {
        stepNumber: "03",
        title: "Manage the fleet",
        description:
          "Replacements, suspensions and revocations run through AMS with a full history per key.",
      },
      {
        stepNumber: "04",
        title: "Prove coverage",
        description:
          "Enrollment and exception data feed governance evidence, so the rollout result is checkable and ready to share.",
      },
    ],
  },
  docTabs: [
    {
      label: "Product Details",
      content:
        "AMS is the asset management system for AUTH keys. It tracks every key from delivery to retirement, with its holder, state and history in one record.",
    },
    {
      label: "Users & Roles",
      content:
        "Users and roles define who administers the fleet: platform admins, enrollment leads and support staff each get the access their role needs, with named owners.",
    },
    {
      label: "Inventory",
      content:
        "Inventory shows every key and its state: ordered, in transit, enrolled, active, scheduled for review, or replaced.",
    },
    {
      label: "Enrollment",
      content:
        "Enrollment workflows guide pilots, new starters and replacements, with recovery paths built around a verified key.",
    },
    {
      label: "Policy Controls",
      content:
        "Policy controls set how keys are issued, reviewed and retired, so the fleet follows one consistent policy everywhere.",
    },
    {
      label: "Audit",
      content:
        "Audit exports the full history per key and per holder, ready for reviewers and governance evidence.",
    },
    {
      label: "Deployments",
      content:
        "Deployments run in phases: pilot group first, then priority teams, with coverage visible at every step.",
    },
  ],
  relatedItems: [
    {
      title: "Passwordless Keys",
      typeLabel: "Product",
      href: "/products/keys",
    },
    {
      title: "Securing Bank Access With FIDO2 Biometric Keys",
      typeLabel: "Case study",
      href: "/proof#case-bank",
    },
    {
      title: "Enterprise Technology",
      typeLabel: "Solution",
      href: "/resources/solutions#sol-enterprise",
    },
    {
      title: "Back to Our products",
      typeLabel: "Products",
      href: "/products",
    },
  ],
  cta: {
    title: "Run key management without the tickets.",
    buttonText: "Book a strategy call",
    buttonHref: "/contact",
  },
  seo: {
    title: "AMS | Asset Management System for Passwordless Keys | XSignOn",
    description:
      "Delivering, enrolling, and managing enterprise FIDO2 biometric security keys throughout their full lifecycle.",
  },
};
