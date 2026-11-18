import { describe, expect, it } from "vitest";
import { homeContentFallback } from "@/data/home-content";
import { mergeHomeContent } from "@/lib/home-content-merge";

describe("home content", () => {
  it("the default content fits the shapes the page and the CMS schema expect", () => {
    const c = homeContentFallback;
    expect(c.ecosystem.items).toHaveLength(4);
    expect(c.whatWeDo.panels).toHaveLength(4);
    for (const item of c.ecosystem.items) expect(item.lines).toHaveLength(2);
    for (const slide of c.heroSlides) expect(slide.heading.length).toBeGreaterThan(0);
    expect(c.heroSlides.filter((s) => s.action.type === "scan").length).toBeLessThanOrEqual(1);
    expect(c.standards.length).toBeGreaterThanOrEqual(2);
  });

  it("uses the defaults when the CMS has nothing", () => {
    expect(mergeHomeContent(homeContentFallback, null)).toBe(homeContentFallback);
    expect(mergeHomeContent(homeContentFallback, {})).toEqual(homeContentFallback);
  });

  it("takes editors' text and keeps defaults for empty or broken parts", () => {
    const merged = mergeHomeContent(homeContentFallback, {
      hero: { ...homeContentFallback.hero, headlineLead: "New headline.", description: "  " },
      standards: ["FIDO2"],
      cta: { title: "", button: { label: "", href: "" } },
      whatWeDo: {
        ...homeContentFallback.whatWeDo,
        panels: homeContentFallback.whatWeDo.panels.slice(0, 2),
      },
    });
    expect(merged.hero.headlineLead).toBe("New headline.");
    expect(merged.hero.description).toBe(homeContentFallback.hero.description);
    // one name is too few for a strip, so the defaults stay
    expect(merged.standards).toEqual(homeContentFallback.standards);
    expect(merged.cta).toEqual(homeContentFallback.cta);
    // the section needs four panels
    expect(merged.whatWeDo.panels).toEqual(homeContentFallback.whatWeDo.panels);
  });

  it("accepts a changed list of the right size", () => {
    const panels = homeContentFallback.whatWeDo.panels.map((p) => ({ ...p, cta: "Read more now" }));
    const merged = mergeHomeContent(homeContentFallback, {
      whatWeDo: { ...homeContentFallback.whatWeDo, panels },
    });
    expect(merged.whatWeDo.panels[0].cta).toBe("Read more now");
  });
});
