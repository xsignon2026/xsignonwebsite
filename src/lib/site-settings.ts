import "server-only";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/site-settings";
import { siteSettingsFallback } from "@/data/site-settings";
import type { SiteSettingsData } from "@/types/site-settings";

export async function getSiteSettingsData(): Promise<SiteSettingsData> {
  if (!isSanityConfigured) return siteSettingsFallback;
  try {
    const data = await sanityFetch<SiteSettingsData>({
      query: SITE_SETTINGS_QUERY,
      tags: ["layout"],
    });
    return data ?? siteSettingsFallback;
  } catch {
    return siteSettingsFallback;
  }
}
