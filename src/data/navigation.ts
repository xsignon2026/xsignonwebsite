import type { NavigationData } from "@/types/navigation";

// The menu as shown on the site. Each entry has a name and one line of description; each menu may carry
// a picture card and a link along the bottom. (The same shape is read from Sanity when it is connected.)
export const navigationFallback: NavigationData = {
  items: [
    {
      label: "About",
      link: { linkType: "internal", href: "/about" },
      children: [
        {
          label: "Who we are",
          link: { linkType: "internal", href: "/about/who-we-are" },
          description: "Sign-in people can trust, governance an auditor can check.",
        },
        {
          label: "What we do",
          link: { linkType: "internal", href: "/about/what-we-do" },
          description: "Identity, AI governance and passwordless sign-in.",
        },
        {
          label: "How we work",
          link: { linkType: "internal", href: "/about/how-we-work" },
          description: "Baseline, architecture and continuous governance.",
        },
        {
          label: "Careers",
          link: { linkType: "internal", href: "/careers" },
          description: "Open roles in McKinney, Texas and remote.",
        },
      ],
      footerLink: { label: "About XSignOn", href: "/about" },
    },
    {
      label: "Products",
      link: { linkType: "internal", href: "/products" },
      children: [
        {
          label: "PostureOne",
          link: { linkType: "internal", href: "/products/postureone" },
          description: "Website and cloud security posture in one view.",
        },
        {
          label: "EvalOne",
          link: { linkType: "internal", href: "/products/evalone" },
          description: "AI systems evaluated against recognized frameworks.",
        },
        {
          label: "XSense",
          link: { linkType: "internal", href: "/products/xsense" },
          description: "Identity analytics and a governed identity provider.",
        },
        {
          label: "Passwordless Keys",
          link: { linkType: "internal", href: "/products/passwordless-keys" },
          description: "FIDO2 biometric keys in four models.",
        },
        {
          label: "AMS",
          link: { linkType: "internal", href: "/products/ams" },
          description: "Deliver, enroll and manage passwordless keys.",
        },
        {
          label: "How XSignOn compares",
          link: { linkType: "internal", href: "/products/compare" },
          description: "Four ways to run sign-in, side by side.",
        },
        {
          label: "ROI Calculator",
          link: { linkType: "internal", href: "/roi-calculator" },
          description: "Estimate what password resets cost you.",
        },
        {
          label: "Proof",
          link: { linkType: "internal", href: "/proof" },
          description: "Case studies from real rollouts.",
        },
      ],
      featured: {
        eyebrow: "Customer proof",
        title: "Securing Bank Access With FIDO2 Biometric Keys",
        href: "/proof/securing-bank-access-fido2",
        image: { src: "/images/proof/img-c033247b.jpg", alt: "Stone bank building with columns" },
      },
      footerLink: { label: "All products", href: "/products" },
    },
    {
      label: "Resources",
      link: { linkType: "internal", href: "/solutions" },
      children: [
        {
          label: "Solutions",
          link: { linkType: "internal", href: "/solutions" },
          description: "Start from the problem you are solving.",
        },
        {
          label: "Enterprise",
          link: { linkType: "internal", href: "/enterprise" },
          description: "Every identity, fully in control.",
        },
        {
          label: "Our thinking",
          link: { linkType: "internal", href: "/thinking" },
          description: "Articles on identity, AI governance and sign-in.",
        },
        {
          label: "Industry Thinking",
          link: { linkType: "internal", href: "/thinking/industry" },
          description: "Practical thinking for modern enterprises.",
        },
      ],
      featured: {
        eyebrow: "Latest thinking",
        title: "Elevate Enterprise Security with Identity-First Controls",
        href: "/thinking/identity-first-controls",
        image: {
          src: "/images/about/img-7e2521fe.jpg",
          alt: "Glass office towers photographed from below",
        },
      },
      footerLink: { label: "All articles", href: "/thinking" },
    },
  ],
};
