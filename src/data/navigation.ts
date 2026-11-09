import type { NavigationData } from "@/types/navigation";

export const navigationFallback: NavigationData = {
  items: [
    {
      label: "About",
      link: { linkType: "internal", href: "/about" },
      crossLink: { label: "Latest thinking, in Resources", href: "/thinking" },
      children: [
        {
          label: "About XSignOn",
          link: { linkType: "internal", href: "/about" },
          mobileOnly: true,
        },
        { label: "Who we are", link: { linkType: "internal", href: "/about/who-we-are" } },
        { label: "What we do", link: { linkType: "internal", href: "/about/what-we-do" } },
        { label: "How we work", link: { linkType: "internal", href: "/about/how-we-work" } },
        {
          label: "Careers",
          link: { linkType: "internal", href: "/careers" },
          mobileOnly: true,
        },
      ],
    },
    {
      label: "Products",
      link: { linkType: "internal", href: "/products" },
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
        {
          label: "ROI Calculator",
          link: { linkType: "internal", href: "/roi-calculator" },
          mobileOnly: true,
        },
      ],
    },
    {
      label: "Resources",
      link: { linkType: "internal", href: "/solutions" },
      children: [
        { label: "Solutions", link: { linkType: "internal", href: "/solutions" } },
        {
          label: "Identity Governance",
          link: { linkType: "internal", href: "/solutions/identity-governance" },
        },
        {
          label: "AI and Digital Governance",
          link: { linkType: "internal", href: "/solutions/ai-and-digital-governance" },
        },
        {
          label: "Quantum-Safe Security",
          link: { linkType: "internal", href: "/solutions/quantum-safe-security" },
        },
        {
          label: "Business Process",
          link: { linkType: "internal", href: "/solutions/business-process" },
        },
        {
          label: "Enterprise Technology",
          link: { linkType: "internal", href: "/solutions/enterprise-technology" },
        },
        { label: "Enterprise", link: { linkType: "internal", href: "/enterprise" } },
        { label: "Our thinking", link: { linkType: "internal", href: "/thinking" } },
        {
          label: "Industry Thinking",
          link: { linkType: "internal", href: "/thinking/industry" },
        },
      ],
    },
  ],
};
