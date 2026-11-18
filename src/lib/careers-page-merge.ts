import type { CareersPageContent } from "@/types/careers-page-content";

// Kept apart from the loader (server only) so it can be tested on its own.

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

type Link = { label?: string; href?: string } | undefined | null;
const link = (value: Link, fallback: { label: string; href: string }) =>
  value && hasText(value.label) && hasText(value.href)
    ? { label: value.label, href: value.href }
    : fallback;

/** Takes the editors' content and fills any missing or empty part from the defaults. */
export function mergeCareersPage(
  fallback: CareersPageContent,
  data: Partial<CareersPageContent> | null | undefined,
): CareersPageContent {
  if (!data) return fallback;
  const pick = (value: unknown, def: string) => (hasText(value) ? value : def);
  const values = data.working?.values;
  const general = data.roles?.general;

  return {
    hero: { title: pick(data.hero?.title, fallback.hero.title) },
    working: {
      title: pick(data.working?.title, fallback.working.title),
      values:
        Array.isArray(values) &&
        values.length === fallback.working.values.length &&
        values.every((v) => v && hasText(v.title) && hasText(v.text))
          ? values
          : fallback.working.values,
    },
    roles: {
      title: pick(data.roles?.title, fallback.roles.title),
      emptyNote: pick(data.roles?.emptyNote, fallback.roles.emptyNote),
      general: {
        title: pick(general?.title, fallback.roles.general.title),
        text: pick(general?.text, fallback.roles.general.text),
        button: link(general?.button, fallback.roles.general.button),
      },
    },
    cta: {
      title: pick(data.cta?.title, fallback.cta.title),
      button: link(data.cta?.button, fallback.cta.button),
    },
  };
}
