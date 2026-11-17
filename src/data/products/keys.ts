import type { Product } from "@/types/product";

// S-14 / T-085: Canonical Passwordless Keys product data.
// Source of truth: xsignon-home-beams.html (lines 2644-2735).
export const keysProduct: Product = {
  name: "Passwordless Keys",
  slug: "keys",
  tagline: "Enterprise FIDO2 biometric security keys, delivered and supported by XSignOn.",
  hero: {
    subline:
      "Enterprise FIDO2 biometric security keys, delivered and supported by XSignOn. Keys provide verified authentication that only the account owner can complete. Staff carry their key with confidence, enrollment included, and XSignOn handles the hardware from order to replacement.",
    tags: ["FIDO2", "Hardware", "Biometric"],
  },
  caseCards: [
    {
      title: "AUTH Bio",
      tag: "Biometric",
      description: "Fingerprint-based sign-in for everyday staff roles.",
      statusNotice: "Spec confirmation pending: full specifications are confirmed before ordering.",
      linkHref: "/products/keys#key-bio",
      linkText: "View the AUTH Bio specifications",
    },
    {
      title: "AUTH Bio Pro",
      tag: "Biometric",
      description: "Biometric sign-in for roles that need extended management options.",
      statusNotice: "Spec confirmation pending: full specifications are confirmed before ordering.",
      linkHref: "/products/keys#key-pro",
      linkText: "View the AUTH Bio Pro specifications",
    },
    {
      title: "AUTH Bio Touch",
      tag: "Touch-activated",
      description: "Touch-activated sign-in where a tap confirms the attempt.",
      statusNotice: "Spec confirmation pending: full specifications are confirmed before ordering.",
      linkHref: "/products/keys#key-touch",
      linkText: "View the AUTH Bio Touch specifications",
    },
    {
      title: "AUTH Bio Desktop",
      tag: "Desktop",
      description: "Desktop-based sign-in for fixed workstations and shared terminals.",
      statusNotice: "Spec confirmation pending: full specifications are confirmed before ordering.",
      linkHref: "/products/keys#key-desktop",
      linkText: "View the AUTH Bio Desktop specifications",
    },
  ],
  specTable: {
    title: "Hardware comparison",
    columns: ["Detail", "AUTH Bio", "AUTH Bio Pro", "AUTH Bio Touch", "AUTH Bio Desktop"],
    rows: [
      {
        header: "Sign-in method",
        values: ["Confirm spec", "Confirm spec", "Confirm spec", "Confirm spec"],
      },
      {
        header: "Form factor",
        values: ["Confirm spec", "Confirm spec", "Confirm spec", "Confirm spec"],
      },
      {
        header: "Interface",
        values: ["Confirm spec", "Confirm spec", "Confirm spec", "Confirm spec"],
      },
      {
        header: "FIDO2 certification",
        values: ["FIDO2 certified", "FIDO2 certified", "FIDO2 certified", "FIDO2 certified"],
      },
      {
        header: "Delivered and supported by XSignOn",
        values: ["Yes", "Yes", "Yes", "Yes"],
      },
    ],
    footnote:
      "Specifications are confirmed against your identity provider and device mix before any hardware is ordered. Cells marked for confirmation are never shipped as fact.",
  },
  worksWith: {
    title: "Works with what you have",
    paragraphs: [
      "The keys are FIDO2 certified and work with existing identity providers through standard protocols, so the rollout does not start with replacing your stack. Compatibility and enrollment are confirmed against your provider before any hardware is ordered.",
      "Enrollment, replacement and exceptions run through AMS, so your help desk stays focused on supporting staff.",
    ],
    linkText: "How AMS manages the keys",
    linkHref: "/products/ams",
  },
  relatedItems: [
    {
      title: "AMS",
      typeLabel: "Product",
      href: "/products/ams",
    },
    {
      title: "How XSignOn compares",
      typeLabel: "Comparison",
      href: "/products/compare",
    },
    {
      title: "Securing Bank Access With FIDO2 Biometric Keys",
      typeLabel: "Case study",
      href: "/proof#case-bank",
    },
    {
      title: "Elevate Enterprise Security with Identity-First Controls",
      typeLabel: "Insight",
      href: "/resources/thinking#article-identity-first",
    },
    {
      title: "Back to Our products",
      typeLabel: "Products",
      href: "/products",
    },
  ],
  cta: {
    title: "Get keys that arrive ready to enroll.",
    buttonText: "Book a strategy call",
    buttonHref: "/contact",
  },
  seo: {
    title: "Passwordless Keys | FIDO2 Biometric Security Keys | XSignOn",
    description:
      "Enterprise FIDO2 biometric security keys delivered and supported by XSignOn, with full enrollment and lifecycle management through AMS.",
  },
};
