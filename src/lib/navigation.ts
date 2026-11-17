import "server-only";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { NAVIGATION_QUERY } from "@/sanity/queries/navigation";
import { navigationFallback } from "@/data/navigation";
import type { NavigationData } from "@/types/navigation";

export async function getNavigationData(): Promise<NavigationData> {
  if (!isSanityConfigured) return navigationFallback;
  try {
    const data = await sanityFetch<NavigationData>({
      query: NAVIGATION_QUERY,
      tags: ["layout"],
    });
    return data?.items?.length ? data : navigationFallback;
  } catch {
    return navigationFallback;
  }
}
