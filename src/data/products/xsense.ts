import type { Product } from "@/types/product";

// S-14 / T-084: Canonical XSense product data.
// Source of truth: xsignon-home-beams.html (lines 2831-2892).
export const xsenseProduct: Product = {
  name: "XSense",
  slug: "xsense",
  tagline: "XSense is the identity analytics and MFA platform behind XSignOn sign-in.",
  hero: {
    subline:
      "XSense is the identity analytics and MFA platform behind XSignOn sign-in. It is a software-bound identity provider: it runs the sign-in itself, analyses how identities are used across the organization, and gives governance teams a live, clear view of who is signing in, where, and with what assurance.",
    tags: ["Identity analytics", "MFA platform", "Identity provider"],
  },
  extraNarrative: [
    "Deployment follows your estate: SaaS, on-premises, or air-gapped, with the same identity platform in each model.",
  ],
  keyViz: {
    badge: "XS",
    description:
      "Sign-in events, MFA coverage and identity analytics in one platform view, feeding the evidence your governance reviews rely on.",
  },
  docTabs: [
    {
      label: "Product Details",
      content:
        "XSense is a software-bound IAM and identity provider platform. It pairs identity analytics with MFA in one product, deployed as SaaS, on-premises, or air-gapped.",
    },
    {
      label: "Overview",
      content:
        "XSense runs sign-in for staff and systems, records every authentication with its assurance level, and surfaces the patterns governance teams review.",
    },
    {
      label: "MFA Targets",
      content:
        "MFA targets set the assurance each application needs, so high-value systems ask for verified, hardware-backed sign-in while everyday tools stay fast.",
    },
    {
      label: "Verify App",
      content:
        "The Verify app gives staff a clear approval step on their own device, paired with the identity XSense holds for them.",
    },
    {
      label: "Features",
      content:
        "Features include identity analytics, MFA policy by application, deployment in SaaS, on-premises and air-gapped models, and evidence exports for review.",
    },
    {
      label: "Roadmap",
      content: "Roadmap items are published with each release.",
      badge: "Roadmap details confirmed at release",
    },
    {
      label: "Patent",
      content: "Patent information is published with the product documentation.",
      badge: "Patent details pending publication",
    },
  ],
  relatedItems: [
    {
      title: "AMS",
      typeLabel: "Product",
      href: "/products/ams",
    },
    {
      title: "Passwordless Keys",
      typeLabel: "Product",
      href: "/products/keys",
    },
    {
      title: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
      typeLabel: "Case study",
      href: "/proof#case-electrical",
    },
    {
      title: "Identity Governance",
      typeLabel: "Solution",
      href: "/resources/solutions#sol-identity",
    },
    {
      title: "Back to Our products",
      typeLabel: "Products",
      href: "/products",
    },
  ],
  cta: {
    title: "See your sign-in clearly.",
    buttonText: "Book a strategy call",
    buttonHref: "/contact",
  },
  seo: {
    title: "XSense | Identity Analytics & Governed MFA Platform | XSignOn",
    description:
      "Software-bound identity provider platform pairing live identity analytics with MFA policy, deployed in SaaS, on-premises, or air-gapped environments.",
  },
};
