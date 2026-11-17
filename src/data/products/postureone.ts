import type { Product } from "@/types/product";

// S-14 / T-053: Canonical PostureOne product data.
// Source of truth: xsignon-home-beams.html (lines 2447-2548).
export const postureOneProduct: Product = {
  name: "PostureOne",
  slug: "postureone",
  tagline: "A living inventory of every person, device and agent, scored continuously.",
  hero: {
    subline:
      "PostureOne protects public infrastructure: websites and cloud services, in one posture view. Firewall, traffic protection, file integrity, content security policy, data posture and micro-segmentation come together with findings, owners and evidence, so every answer is clear and within reach.",
    tags: ["Website security", "Cloud security", "Evidence"],
    dashboard: {
      score: 86,
      maxScore: 100,
      statusChip: "Evidence ready",
      firewallCoverage: 92,
      trafficProtection: 78,
      fileIntegrityChecks: 64,
    },
  },
  capabilityCards: [
    {
      title: "Web application firewall",
      description:
        "Firewall protection for public websites and applications, with rules reviewed on a cycle and every change recorded as evidence.",
    },
    {
      title: "Always-on traffic protection",
      description:
        "Traffic protection that stays on around the clock, keeping public services reachable and steady for the people who rely on them.",
    },
    {
      title: "File integrity monitoring",
      description:
        "Files across web and cloud estates are monitored continuously, and every change is logged with an owner and a timestamp.",
    },
    {
      title: "Content security policy management",
      description:
        "Content security policies are managed from one place, so coverage stays complete as sites and services change.",
    },
    {
      title: "Data security posture management",
      description:
        "DSPM brings data stores into the same posture view, with findings assigned to owners and tracked to closure.",
    },
    {
      title: "Micro-segmentation",
      description:
        "Workloads are segmented so each service reaches only what it needs, with the segments visible in the posture view.",
    },
  ],
  framework: {
    title: "The PostureOne framework",
    steps: [
      {
        stepNumber: "01",
        title: "See everything",
        description:
          "Websites, cloud services, data stores and segments are inventoried into one view.",
      },
      {
        stepNumber: "02",
        title: "Close every gap",
        description: "Findings carry owners and next steps, and close with evidence attached.",
      },
      {
        stepNumber: "03",
        title: "Stay audit-ready",
        description:
          "Evidence stays mapped to the frameworks your auditors use, ready at any moment.",
      },
      {
        stepNumber: "04",
        title: "Govern AI with confidence",
        description: "AI services on the estate join the same posture view, with owners named.",
      },
      {
        stepNumber: "05",
        title: "Keep exposure low",
        description:
          "Segmentation and policy coverage keep every public service at its best posture.",
      },
      {
        stepNumber: "06",
        title: "Move with confidence",
        description: "Posture stays current as the estate changes, so teams ship with clarity.",
      },
    ],
  },
  mappedFrameworks: {
    chips: ["SOC 2", "ISO 27001", "NIST 800-207", "GDPR", "PCI DSS"],
    note: "Mappings apply where the framework fits your setup. Nothing is shown as mapped until its source is connected and its evidence is attached.",
  },
  relatedItems: [
    {
      title: "Identity Governance",
      typeLabel: "Solution",
      href: "/resources/solutions#sol-identity",
    },
    {
      title: "Enterprise Technology",
      typeLabel: "Solution",
      href: "/resources/solutions#sol-enterprise",
    },
    {
      title: "Biometric FIDO2 Access For Air-Gapped Industrial Systems",
      typeLabel: "Case study",
      href: "/resources/proof#case-electrical",
    },
    {
      title: "Back to Our products",
      typeLabel: "Products",
      href: "/#products",
    },
  ],
  cta: {
    title: "See your posture in one view.",
    buttonText: "Book a strategy call",
    buttonHref: "/contact",
  },
  seo: {
    title: "PostureOne | Website and Cloud Security Posture | XSignOn",
    description:
      "Website and cloud security posture in one view, with findings, owners and evidence in a single place.",
  },
};
