import type { MetadataRoute } from "next";
import { canonicalArticles } from "@/data/articles";
import { canonicalCaseStudies } from "@/data/caseStudies";
import { canonicalSolutions } from "@/data/solutions";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xsignon.com";

type Entry = MetadataRoute.Sitemap[number];
const entry = (
  path: string,
  priority: number,
  changeFrequency: Entry["changeFrequency"],
  now: Date,
): Entry => ({ url: `${BASE_URL}${path}`, lastModified: now, changeFrequency, priority });

// T-151: XML sitemap for search engines. It lists only pages that answer 200 and can be indexed: no
// address that redirects (for example /about/who-we-are or /case-studies), no internal page (style guide,
// tokens, studio, verify) and no duplicate (/articles/:slug is the same page as /thinking/:slug).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    entry("/", 1.0, "daily", now),
    entry("/about", 0.7, "monthly", now),
    entry("/enterprise", 0.9, "weekly", now),
    entry("/careers", 0.7, "weekly", now),
    entry("/contact", 0.7, "monthly", now),
    entry("/privacy", 0.5, "yearly", now),
    entry("/terms", 0.5, "yearly", now),
    entry("/roi-calculator", 0.8, "monthly", now),
    entry("/domain-check", 0.6, "monthly", now),
    entry("/products", 0.9, "weekly", now),
    entry("/products/compare", 0.8, "monthly", now),
    entry("/solutions", 0.9, "weekly", now),
    entry("/thinking", 0.8, "weekly", now),
    entry("/thinking/industry", 0.8, "weekly", now),
    entry("/proof", 0.8, "weekly", now),
    entry("/white-papers/zero-trust-posture-guide", 0.8, "monthly", now),
  ];

  const productSlugs = [
    "postureone",
    "evalone",
    "xsense",
    "ams",
    "xsignon-mesh",
    "passwordless-keys",
  ];
  const keyModels = ["bio", "touch", "pro", "desktop"];
  const productRoutes: MetadataRoute.Sitemap = [
    ...productSlugs.map((slug) => entry(`/products/${slug}`, 0.9, "weekly", now)),
    ...keyModels.map((model) => entry(`/products/passwordless-keys/${model}`, 0.8, "weekly", now)),
  ];

  const solutionRoutes = canonicalSolutions.map((sol) =>
    entry(`/solutions/${sol.slug}`, 0.9, "weekly", now),
  );
  const caseStudyRoutes = canonicalCaseStudies.map((cs) =>
    entry(`/proof/${cs.slug}`, 0.8, "monthly", now),
  );
  const articleRoutes = canonicalArticles.map((art) =>
    entry(`/thinking/${art.slug}`, 0.8, "monthly", now),
  );

  return [
    ...staticRoutes,
    ...productRoutes,
    ...solutionRoutes,
    ...caseStudyRoutes,
    ...articleRoutes,
  ];
}
