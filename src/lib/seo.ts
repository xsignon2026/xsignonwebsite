import type { Metadata } from "next";

export const SITE_URL = "https://xsignon.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  image?: string;
  noindex?: boolean;
}

/**
 * T-150: Generates complete, standardized SEO metadata across launch pages.
 * Enforces canonical uniqueness, OpenGraph standard properties, and Twitter cards.
 */
export function createPageMetadata(options: PageSeoOptions): Metadata {
  const cleanPath = options.path.startsWith("/") ? options.path : `/${options.path}`;
  const url = `${SITE_URL}${cleanPath}`;
  const imageUrl = options.image || DEFAULT_OG_IMAGE;

  return {
    title: options.title,
    description: options.description,
    alternates: {
      canonical: url,
    },
    robots: options.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      siteName: "XSignOn",
      type: options.ogType || "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: options.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [imageUrl],
    },
  };
}
