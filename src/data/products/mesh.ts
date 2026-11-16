import type { Product } from "@/types/product";

// XSignOn Mesh: the micro-segmentation and containment product. Copy to be confirmed by the product owner.
export const meshProduct: Product = {
  name: "XSignOn Mesh",
  slug: "xsignon-mesh",
  tagline: "XSignOn Mesh is the micro-segmentation and containment product from XSignOn.",
  hero: {
    subline:
      "XSignOn Mesh divides an environment into small, controlled zones, sets the policy for every flow between them, and contains a threat before it can spread. Its zone maps, policies and containment events feed the posture view in PostureOne.",
    tags: ["Micro-segmentation", "Containment", "Zero trust"],
  },
  extraNarrative: [
    "Segmentation works alongside the tools your teams already use, so nothing has to be replaced to start.",
  ],
  keyViz: {
    badge: "XM",
    description:
      "Zones, flows and containment events in one map, feeding the evidence your governance reviews rely on.",
  },
  docTabs: [
    {
      label: "Product Details",
      content:
        "XSignOn Mesh is the micro-segmentation and containment product. It maps zones and flows, applies segmentation policy and records containment events.",
    },
    {
      label: "Overview",
      content:
        "Mesh shows which systems talk to which, proposes zones and flow policy, and limits movement between zones so a single failure stays small.",
    },
    {
      label: "Features",
      content:
        "Features include zone and flow maps, segmentation policy, containment events and evidence that feeds PostureOne.",
      badge: "Feature list confirmed at release",
    },
    {
      label: "Deployment",
      content:
        "Deployment follows your estate, with details published alongside the product documentation.",
      badge: "Deployment details pending publication",
    },
  ],
  relatedItems: [
    { title: "PostureOne", typeLabel: "Product", href: "/products/postureone" },
    { title: "XSense", typeLabel: "Product", href: "/products/xsense" },
    {
      title: "Enterprise Technology",
      typeLabel: "Solution",
      href: "/solutions/enterprise-technology",
    },
    { title: "Back to Our products", typeLabel: "Products", href: "/products" },
  ],
  cta: {
    title: "Contain risk before it spreads.",
    buttonText: "Contact us",
    buttonHref: "/contact",
  },
  seo: {
    title: "XSignOn Mesh | Micro-segmentation and Containment | XSignOn",
    description:
      "XSignOn Mesh maps zones and flows, applies segmentation policy and contains threats, with evidence that feeds the PostureOne posture view.",
  },
};
