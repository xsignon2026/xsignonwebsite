import { describe, expect, it } from "vitest";
import { navigationFallback } from "../data/navigation";
import { siteSettingsFallback } from "../data/site-settings";

describe("Navigation & Site Settings Fallback Data", () => {
  it("provides valid navigation fallback items", () => {
    expect(navigationFallback.items.length).toBe(3);
    const labels = navigationFallback.items.map((i) => i.label);
    expect(labels).toEqual(["About", "Products", "Resources"]);

    for (const item of navigationFallback.items) {
      expect(item.children?.length).toBeGreaterThan(0);
      for (const child of item.children ?? []) {
        expect(child.label.length).toBeGreaterThan(0);
        expect(child.link.href).toBeTruthy();
      }
    }
  });

  it("provides valid siteSettings fallback data", () => {
    expect(siteSettingsFallback.headerCta).not.toBeNull();
    expect(siteSettingsFallback.headerCta?.label).toBe("Contact Us");
    expect(siteSettingsFallback.headerCta?.link.href).toBe("/contact");

    expect(siteSettingsFallback.footerGroups.length).toBe(4);
    const groupTitles = siteSettingsFallback.footerGroups.map((g) => g.title);
    expect(groupTitles).toEqual(["About", "Products", "Resources", "Legal"]);

    expect(siteSettingsFallback.legalLine).toContain("XSignOn");
  });
});
