import type { HomeContent } from "@/types/home-content";

// Kept apart from the loader (which only runs on the server) so it can be tested on its own.

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const list = <T>(value: unknown, fallback: T[], min = 1): T[] =>
  Array.isArray(value) && value.length >= min ? (value as T[]) : fallback;

/** Takes the editors' content and fills any missing or empty part from the defaults. */
export function mergeHomeContent(
  fallback: HomeContent,
  data: Partial<HomeContent> | null | undefined,
): HomeContent {
  if (!data) return fallback;
  const hero = { ...fallback.hero, ...(data.hero ?? {}) };
  for (const key of ["eyebrow", "headlineLead", "headlineAccent", "description"] as const) {
    if (!hasText(hero[key])) hero[key] = fallback.hero[key];
  }
  for (const key of ["primaryButton", "secondaryLink"] as const) {
    const item = hero[key];
    if (!item || !hasText(item.label) || !hasText(item.href)) hero[key] = fallback.hero[key];
  }

  const slides = list(data.heroSlides, fallback.heroSlides).filter(
    (slide) =>
      slide && hasText(slide.id) && Array.isArray(slide.heading) && slide.heading.length > 0,
  );

  const eco = data.ecosystem;
  const ecoItems = list(eco?.items, fallback.ecosystem.items, 4).filter(
    (item) => item && hasText(item.title) && Array.isArray(item.lines) && item.lines.length === 2,
  );
  const panels = list(data.whatWeDo?.panels, fallback.whatWeDo.panels, 4).filter(
    (panel) => panel && hasText(panel.title) && hasText(panel.text),
  );

  return {
    hero,
    heroSlides: slides.length > 0 ? slides : fallback.heroSlides,
    standards: list(data.standards, fallback.standards, 2).filter(hasText),
    ecosystem: {
      title: hasText(eco?.title) ? eco.title : fallback.ecosystem.title,
      items: ecoItems.length === 4 ? ecoItems : fallback.ecosystem.items,
    },
    whatWeDo: {
      title: hasText(data.whatWeDo?.title) ? data.whatWeDo.title : fallback.whatWeDo.title,
      allLink:
        data.whatWeDo?.allLink && hasText(data.whatWeDo.allLink.label)
          ? data.whatWeDo.allLink
          : fallback.whatWeDo.allLink,
      panels: panels.length === 4 ? panels : fallback.whatWeDo.panels,
    },
    cta: {
      title: hasText(data.cta?.title) ? data.cta.title : fallback.cta.title,
      button:
        data.cta?.button && hasText(data.cta.button.label) && hasText(data.cta.button.href)
          ? data.cta.button
          : fallback.cta.button,
    },
  };
}
