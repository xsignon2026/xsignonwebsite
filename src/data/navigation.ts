import type { NavigationData } from "@/types/navigation";

// The menu as shown on the site. Every menu is a labelled set of links in the same panel, and the Insights
// menu also carries a featured card. (A plain list of links, without sections, is also understood, so a menu
// edited in Studio still shows.)
const link = (href: string) => ({ linkType: "internal" as const, href });

export const navigationFallback: NavigationData = {
  items: [
    {
      label: "About",
      link: link("/about"),
      sections: [
        {
          heading: "Company",
          columns: 2,
          wide: true,
          items: [
            { label: "Who we are", link: link("/about/who-we-are") },
            { label: "What we do", link: link("/about/what-we-do") },
            { label: "How we work", link: link("/about/how-we-work") },
            { label: "Meet the team", link: link("/about/meet-the-team") },
            { label: "Careers", link: link("/careers") },
          ],
        },
      ],
      footerLink: { label: "View the About page", href: "/about" },
    },
    {
      label: "Products",
      link: link("/products"),
      sections: [
        {
          heading: "Software",
          items: [
            { label: "PostureOne", link: link("/products/postureone") },
            { label: "EvalOne", link: link("/products/evalone") },
            { label: "XSense", link: link("/products/xsense") },
            { label: "AMS", link: link("/products/ams") },
            { label: "XSignOn Mesh", link: link("/products/xsignon-mesh"), badge: "NEW" },
          ],
        },
        {
          heading: "Passwordless",
          items: [
            { label: "Passwordless Keys", link: link("/products/passwordless-keys") },
            { label: "AUTH Bio", link: link("/products/passwordless-keys/bio") },
            { label: "AUTH Bio Touch", link: link("/products/passwordless-keys/touch") },
            { label: "AUTH Bio Pro", link: link("/products/passwordless-keys/pro") },
            { label: "AUTH Bio Desktop", link: link("/products/passwordless-keys/desktop") },
          ],
        },
        {
          heading: "Compare",
          wide: true,
          columns: 3,
          items: [
            { label: "How XSignOn compares", link: link("/products/compare") },
            { label: "ROI Calculator", link: link("/roi-calculator") },
            { label: "Free Domain Check", link: link("/domain-check"), badge: "FREE" },
          ],
        },
      ],
      footerLink: { label: "All products", href: "/products" },
    },
    {
      label: "Solutions",
      link: link("/solutions"),
      sections: [
        {
          heading: "By focus",
          items: [
            { label: "Identity Governance", link: link("/solutions/identity-governance") },
            {
              label: "AI and Digital Governance",
              link: link("/solutions/ai-and-digital-governance"),
            },
            { label: "Quantum-Safe Security", link: link("/solutions/quantum-safe-security") },
          ],
        },
        {
          heading: "By need",
          items: [
            { label: "Business Process", link: link("/solutions/business-process") },
            { label: "Enterprise Technology", link: link("/solutions/enterprise-technology") },
          ],
        },
      ],
      footerLink: { label: "All solutions", href: "/solutions" },
    },
    {
      label: "Insights",
      link: link("/thinking"),
      sections: [
        {
          heading: "Thinking",
          items: [
            { label: "Case Study", link: link("/thinking#case-studies") },
            { label: "Articles", link: link("/thinking#articles") },
          ],
        },
        {
          heading: "Enterprise",
          items: [{ label: "Enterprise", link: link("/enterprise") }],
        },
      ],
      featured: {
        eyebrow: "Latest Thinking",
        title: "Elevate Enterprise Security with Identity-First Controls",
        href: "/thinking/identity-first-controls",
        image: {
          src: "/images/about/img-7e2521fe.jpg",
          alt: "Glass office towers photographed from below",
        },
      },
      footerLink: { label: "All insights", href: "/thinking" },
    },
  ],
};
