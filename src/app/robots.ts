import type { MetadataRoute } from "next";
import { isProduction, siteUrl } from "@/lib/site";

// S-07 / T-151: Block search engines on non-production and protect private/auth routes on production.
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" },
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/studio/",
        "/login",
        "/register",
        "/unsubscribe",
        "/contact/thank-you",
        "/subscribe/verify",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
