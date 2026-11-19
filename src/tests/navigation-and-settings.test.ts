import { describe, expect, it } from "vitest";
import { navigationFallback } from "../data/navigation";
import { navSections } from "../lib/nav-sections";
import { siteSettingsFallback } from "../data/site-settings";

describe("Navigation & Site Settings Fallback Data", () => {
  it("provides the four menus, each with labelled groups of links", () => {
    expect(navigationFallback.items.length).toBe(4);
    const labels = navigationFallback.items.map((i) => i.label);
    expect(labels).toEqual(["About", "Products", "Solutions", "Insights"]);

    for (const item of navigationFallback.items) {
      const sections = navSections(item);
      expect(sections.length).toBeGreaterThan(0);
      // No bottom link row: every menu ends with its last group.
      expect(item.footerLink).toBeUndefined();
      // Every menu carries a picture card on the right.
      expect(item.featured?.image.src.startsWith("/images/")).toBe(true);
      expect(item.featured?.href.startsWith("/")).toBe(true);
      for (const section of sections) {
        expect(section.heading).toBeTruthy();
        for (const child of section.items) {
          expect(child.label.length).toBeGreaterThan(0);
          // Every link is a page path on this site, with an optional in-page anchor.
          expect(child.link.href).toMatch(/^\/[a-z0-9\-/]*(#[a-z-]+)?$/);
        }
      }
    }
  });

  it("lists the agreed links in each menu", () => {
    const menu = (name: string) =>
      Object.fromEntries(
        navSections(navigationFallback.items.find((i) => i.label === name)!).map((s) => [
          s.heading,
          s.items.map((c) => c.label),
        ]),
      );
    expect(menu("About")).toEqual({
      Company: ["Who we are", "What we do", "How we work", "Meet the team", "Careers"],
    });
    expect(menu("Products")).toEqual({
      Software: ["PostureOne", "EvalOne", "XSense", "AMS", "XSignOn Mesh"],
      Passwordless: [
        "Passwordless Keys",
        "AUTH Bio",
        "AUTH Bio Touch",
        "AUTH Bio Pro",
        "AUTH Bio Desktop",
      ],
      Compare: ["How XSignOn compares", "ROI Calculator", "Free Domain Check"],
    });
    expect(menu("Solutions")).toEqual({
      "By focus": ["Identity Governance", "AI and Digital Governance", "Quantum-Safe Security"],
      "By need": ["Business Process", "Enterprise Technology"],
    });
    expect(menu("Insights")).toEqual({
      Thinking: ["Case Study", "Articles"],
      Enterprise: ["Enterprise"],
    });
    const card = (name: string) => navigationFallback.items.find((i) => i.label === name)?.featured;
    expect(card("Insights")?.eyebrow).toBe("Latest Thinking");
    expect(card("Insights")?.title).toBe(
      "Elevate Enterprise Security with Identity-First Controls",
    );
    expect(card("Products")?.eyebrow).toBe("New launch");
    expect(card("About")?.eyebrow).toBe("Meet the team");
    expect(card("Solutions")?.eyebrow).toBe("Featured solution");
  });

  it("tags Mesh as new and the domain check as free", () => {
    const products = navSections(navigationFallback.items.find((i) => i.label === "Products")!);
    const all = products.flatMap((s) => s.items);
    expect(all.find((c) => c.label === "XSignOn Mesh")?.badge).toBe("NEW");
    expect(all.find((c) => c.label === "Free Domain Check")?.badge).toBe("FREE");
  });

  it("still shows a plain list of links (the shape Studio saves) as one group", () => {
    const sections = navSections({
      label: "Menu",
      children: [
        { label: "One", link: { linkType: "internal", href: "/one" } },
        { label: "Broken", link: { linkType: "internal", href: null } },
      ],
    });
    expect(sections).toHaveLength(1);
    expect(sections[0].items.map((c) => c.label)).toEqual(["One"]);
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
