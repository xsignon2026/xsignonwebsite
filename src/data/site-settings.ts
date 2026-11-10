import type { SiteSettingsData } from "@/types/site-settings";

export const siteSettingsFallback: SiteSettingsData = {
  headerCta: {
    label: "Contact Us",
    link: { linkType: "internal", href: "/contact" },
  },
  footerGroups: [
    {
      title: "About",
      links: [
        { label: "Who we are", link: { linkType: "internal", href: "/about/who-we-are" } },
        { label: "What we do", link: { linkType: "internal", href: "/about/what-we-do" } },
        { label: "How we work", link: { linkType: "internal", href: "/about/how-we-work" } },
        { label: "Careers", link: { linkType: "internal", href: "/careers" } },
        { label: "Contact", link: { linkType: "internal", href: "/contact" } },
      ],
    },
    {
      title: "Products",
      links: [
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
        { label: "ROI Calculator", link: { linkType: "internal", href: "/roi-calculator" } },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Solutions", link: { linkType: "internal", href: "/solutions" } },
        { label: "Enterprise", link: { linkType: "internal", href: "/enterprise" } },
        { label: "Our thinking", link: { linkType: "internal", href: "/thinking" } },
        {
          label: "Industry Thinking",
          link: { linkType: "internal", href: "/thinking/industry" },
        },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", link: { linkType: "internal", href: "/privacy" } },
        { label: "Terms", link: { linkType: "internal", href: "/terms" } },
        { label: "Unsubscribe", link: { linkType: "internal", href: "/unsubscribe" } },
      ],
    },
  ],
  legalLine: "© 2026 XSignOn. All rights reserved.",
};
