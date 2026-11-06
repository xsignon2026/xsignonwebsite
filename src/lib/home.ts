import "server-only";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { HOME_QUERY } from "@/sanity/queries/home";
import { fallbackHomeData } from "@/data/home";
import type { HomePageData } from "@/types/home";

// S-14 / T-090: Homepage data provider with resilient fallback.
export async function getHomePageData(): Promise<HomePageData> {
  if (!isSanityConfigured) return fallbackHomeData;
  try {
    const data = await sanityFetch<HomePageData | null>({
      query: HOME_QUERY,
      tags: ["singleton:home"],
    });
    return data ?? fallbackHomeData;
  } catch {
    return fallbackHomeData;
  }
}
