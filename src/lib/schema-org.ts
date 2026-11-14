import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

// T-151: Type-safe Schema.org structured data generators for SEO rich snippets.

// T-151 & T-163: Safe JSON-LD serializer with XSS escaping
export function serializeJsonLd(schema: unknown): string {
  return JSON.stringify(schema)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint?: {
    "@type": "ContactPoint";
    contactType: string;
    url: string;
  };
}

export function createOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "XSignOn",
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    description:
      "Enterprise identity, credential orchestration, and passwordless authentication platform.",
    sameAs: [
      "https://www.linkedin.com/company/xsignon",
      "https://twitter.com/xsignon",
      "https://github.com/xsignon",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      url: `${SITE_URL}/contact`,
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${SITE_URL}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
    })),
  };
}

export function createArticleSchema(article: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    author: {
      "@type": "Person",
      name: article.author || "XSignOn Security Research Team",
    },
    publisher: {
      "@type": "Organization",
      name: "XSignOn",
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_OG_IMAGE,
      },
    },
    image: article.imageUrl || DEFAULT_OG_IMAGE,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/thinking/${article.slug}`,
    },
  };
}

export function createJobPostingSchema(job: {
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  datePosted?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.datePosted || "2026-06-01",
    employmentType: job.type.toUpperCase().includes("FULL") ? "FULL_TIME" : "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: "XSignOn",
      sameAs: SITE_URL,
      logo: DEFAULT_OG_IMAGE,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "AE",
      },
    },
  };
}

export function createSoftwareApplicationSchema(product: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    applicationCategory: "SecurityApplication",
    operatingSystem: "Cross-platform",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Enterprise quote available on request",
    },
    url: `${SITE_URL}/products/${product.slug}`,
  };
}

export function createServiceSchema(solution: { title: string; summary: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.title,
    description: solution.summary,
    provider: {
      "@type": "Organization",
      name: "XSignOn",
      url: SITE_URL,
    },
    serviceType: "Identity and Access Management",
    url: `${SITE_URL}/solutions/${solution.slug}`,
  };
}
