import "server-only";
import { homeContentFallback } from "@/data/home-content";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { HOME_QUERY } from "@/sanity/queries/home";
import { mergeHomeContent } from "@/lib/home-content-merge";
import type { HomeContent } from "@/types/home-content";

// The home page content: from Sanity when it is connected, from the default data otherwise. Any section the
// editors have left empty or removed falls back to the default for that section, so the page never breaks.
export async function getHomeContent(): Promise<HomeContent> {
  if (!isSanityConfigured) return homeContentFallback;
  try {
    const data = await sanityFetch<Partial<HomeContent> | null>({
      query: HOME_QUERY,
      tags: ["type:home", "doc:home"],
    });
    return mergeHomeContent(homeContentFallback, data);
  } catch {
    return homeContentFallback;
  }
}
