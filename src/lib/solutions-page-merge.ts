import type { SolutionsPageContent } from "@/types/solutions-page-content";

// Kept apart from the loader (server only) so it can be tested on its own.

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

type Link = { label?: string; href?: string } | undefined | null;
const link = (value: Link, fallback: { label: string; href: string }) =>
  value && hasText(value.label) && hasText(value.href)
    ? { label: value.label, href: value.href }
    : fallback;

/** Takes the editors' content and fills any missing or empty part from the defaults. */
export function mergeSolutionsPage(
  fallback: SolutionsPageContent,
  data: Partial<SolutionsPageContent> | null | undefined,
): SolutionsPageContent {
  if (!data) return fallback;
  const pick = (value: unknown, def: string) => (hasText(value) ? value : def);
  const e = data.enterprise;
  const models = e?.models;
  const standards = (e?.standards ?? []).filter(hasText);

  return {
    hero: { title: pick(data.hero?.title, fallback.hero.title) },
    enterprise: {
      title: pick(e?.title, fallback.enterprise.title),
      text: pick(e?.text, fallback.enterprise.text),
      button: link(e?.button, fallback.enterprise.button),
      models:
        Array.isArray(models) &&
        models.length === fallback.enterprise.models.length &&
        models.every((m) => m && hasText(m.title) && hasText(m.text))
          ? models
          : fallback.enterprise.models,
      standardsLabel: pick(e?.standardsLabel, fallback.enterprise.standardsLabel),
      standards: standards.length > 0 ? standards : fallback.enterprise.standards,
    },
    thinking: {
      title: pick(data.thinking?.title, fallback.thinking.title),
      allLink: link(data.thinking?.allLink, fallback.thinking.allLink),
    },
    cta: {
      title: pick(data.cta?.title, fallback.cta.title),
      button: link(data.cta?.button, fallback.cta.button),
    },
  };
}
