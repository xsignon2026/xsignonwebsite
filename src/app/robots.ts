import type { MetadataRoute } from "next";
import { isProduction, siteUrl } from "@/lib/site";

// S-07: block search engines everywhere except production.
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
