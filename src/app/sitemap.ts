import type { MetadataRoute } from "next";
import { canonicalArticles } from "@/data/articles";
import { canonicalCaseStudies } from "@/data/caseStudies";
import { canonicalSolutions } from "@/data/solutions";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xsignon.com";

// T-151: Dynamic XML Sitemap for production search engines.
// Excludes private/internal routes (login, register, api, studio, verify, etc.)
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${BASE_URL}/about/what-we-do`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about/who-we-are`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about/how-we-work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${BASE_URL}/enterprise`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    {
      url: `${BASE_URL}/case-studies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${BASE_URL}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/roi`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${BASE_URL}/roi-calculator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${BASE_URL}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${BASE_URL}/products/compare`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/products/proof`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/products/roi`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${BASE_URL}/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/thinking`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${BASE_URL}/thinking/industry`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${BASE_URL}/proof`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${BASE_URL}/white-papers/zero-trust-posture-guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${BASE_URL}/styleguide`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/tokens`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  // Dynamic Product Pages
  const productSlugs = ["postureone", "evalone", "xsense", "keys", "ams"];
  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic Solution Pages
  const solutionRoutes: MetadataRoute.Sitemap = canonicalSolutions.map((sol) => ({
    url: `${BASE_URL}/solutions/${sol.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic Case Studies
  const caseStudyRoutes: MetadataRoute.Sitemap = canonicalCaseStudies.map((cs) => ({
    url: `${BASE_URL}/proof/${cs.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic Thinking / Articles
  const articleRoutes: MetadataRoute.Sitemap = canonicalArticles.flatMap((art) => [
    {
      url: `${BASE_URL}/thinking/${art.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/articles/${art.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]);

  return [
    ...staticRoutes,
    ...productRoutes,
    ...solutionRoutes,
    ...caseStudyRoutes,
    ...articleRoutes,
  ];
}
