import "server-only";
import { aboutContentFallback } from "@/data/about-content";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ABOUT_QUERY } from "@/sanity/queries/about";
import { mergeAboutContent } from "@/lib/about-content-merge";
import type { AboutContent } from "@/types/about-content";

// The About page content: from Sanity when it is connected, from the default data otherwise.
export async function getAboutContent(): Promise<AboutContent> {
  if (!isSanityConfigured) return aboutContentFallback;
  try {
    const data = await sanityFetch<Partial<AboutContent> | null>({
      query: ABOUT_QUERY,
      tags: ["type:about", "doc:about"],
    });
    return mergeAboutContent(aboutContentFallback, data);
  } catch {
    return aboutContentFallback;
  }
}
