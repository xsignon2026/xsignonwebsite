import type { NavigationData } from "@/types/navigation";

export const navigationFallback: NavigationData = {
  items: [
    {
      label: "About",
      link: null,
      children: [
        { label: "Who we are", link: { linkType: "internal", href: "/about/who-we-are" } },
        { label: "What we do", link: { linkType: "internal", href: "/about/what-we-do" } },
        { label: "How we work", link: { linkType: "internal", href: "/about/how-we-work" } },
      ],
    },
    {
      label: "Products",
      link: null,
      children: [
        { label: "Our products", link: { linkType: "internal", href: "/products" } },
        { label: "PostureOne", link: { linkType: "internal", href: "/products/postureone" } },
        { label: "EvalOne", link: { linkType: "internal", href: "/products/evalone" } },
        { label: "XSense", link: { linkType: "internal", href: "/products/xsense" } },
        {
          label: "Passwordless Keys",
          link: { linkType: "internal", href: "/products/passwordless-keys" },
        },
        { label: "AMS", link: { linkType: "internal", href: "/products/ams" } },
        {
          label: "How XSignOn compares",
          link: { linkType: "internal", href: "/products/compare" },
        },
        { label: "Proof", link: { linkType: "internal", href: "/products/proof" } },
      ],
    },
    {
      label: "Resources",
      link: null,
      children: [
        { label: "Solutions", link: { linkType: "internal", href: "/resources/solutions" } },
        {
          label: "Identity Governance",
          link: { linkType: "internal", href: "/resources/identity-governance" },
        },
        {
          label: "AI and Digital Governance",
          link: { linkType: "internal", href: "/resources/ai-and-digital-governance" },
        },
        {
          label: "Quantum-Safe Security",
          link: { linkType: "internal", href: "/resources/quantum-safe-security" },
        },
        {
          label: "Business Process",
          link: { linkType: "internal", href: "/resources/business-process" },
        },
        {
          label: "Enterprise Technology",
          link: { linkType: "internal", href: "/resources/enterprise-technology" },
        },
        { label: "Enterprise", link: { linkType: "internal", href: "/resources/enterprise" } },
        { label: "Our thinking", link: { linkType: "internal", href: "/resources/thinking" } },
        {
          label: "Industry Thinking",
          link: { linkType: "internal", href: "/resources/industry-thinking" },
        },
      ],
    },
  ],
};
