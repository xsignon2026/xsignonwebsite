import React from "react";
import { getNavigationData } from "@/lib/navigation";
import { getSiteSettingsData } from "@/lib/site-settings";
import { HeaderClient } from "./HeaderClient";

// Handoff 5.1 / CSV T-041: Server Component Header.
// Reads navigation and site settings using the zero-lockin fallback provider pattern.
export async function Header() {
  const [navData, siteSettings] = await Promise.all([
    getNavigationData(),
    getSiteSettingsData(),
  ]);

  const headerCta = siteSettings.headerCta?.link?.href
    ? {
        label: siteSettings.headerCta.label,
        href: siteSettings.headerCta.link.href,
      }
    : null;

  return <HeaderClient navItems={navData.items} headerCta={headerCta} />;
}
