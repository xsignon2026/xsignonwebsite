import type { CaseStudyPage, CaseStudyPageSection } from "@/types/case-study-page";

// Kept apart from the loader so it can be tested on its own.

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const texts = (value: unknown): string[] => (Array.isArray(value) ? value.filter(hasText) : []);
const objects = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

/** Cleans one edited section. Returns null when it is not usable (no heading, or nothing under it). */
function cleanSection(section: Partial<CaseStudyPageSection> | null): CaseStudyPageSection | null {
  if (!section || !hasText(section.heading)) return null;
  const paragraphs = texts(section.paragraphs);
  const features = objects<CaseStudyPageSection["features"][number]>(section.features)
    .filter((f) => f && hasText(f.lead) && hasText(f.body))
    .map((f) => ({ lead: f.lead, joiner: f.joiner || "", body: f.body }) as const);
  const steps = objects<CaseStudyPageSection["steps"][number]>(section.steps).filter(
    (s) => s && hasText(s.number) && hasText(s.title) && hasText(s.text),
  );
  const notes = objects<CaseStudyPageSection["notes"][number]>(section.notes).filter(
    (n) => n && hasText(n.label) && hasText(n.text),
  );
  if (paragraphs.length + features.length + steps.length + notes.length === 0) return null;
  return { heading: section.heading, paragraphs, features: [...features], steps, notes };
}

/**
 * Lays the editors' case study page over the built-in one. Anything left empty keeps the built-in value. The
 * sections are taken as a whole only when every edited section is usable; otherwise the built-in ones stay.
 * Pass `approved` as false to ignore the edits altogether (a case study not signed off is never shown).
 */
export function mergeCaseStudyPage(
  fallback: CaseStudyPage,
  data: Partial<CaseStudyPage> | null | undefined,
  approved: boolean,
): CaseStudyPage {
  if (!data || !approved) return fallback;
  const text = (value: unknown, def: string) => (hasText(value) ? value : def);
  const edited = objects<Partial<CaseStudyPageSection> | null>(data.sections);
  const cleaned = edited.map(cleanSection);
  const tags = texts(data.tags);
  const related = objects<CaseStudyPage["related"][number]>(data.related);

  return {
    ...fallback,
    title: text(data.title, fallback.title),
    crumb: text(data.crumb, fallback.crumb),
    tags: tags.length > 0 ? tags : fallback.tags,
    sections:
      cleaned.length > 0 && cleaned.every((s) => s !== null)
        ? (cleaned as CaseStudyPageSection[])
        : fallback.sections,
    related:
      related.length > 0 &&
      related.every((r) => r && hasText(r.title) && hasText(r.type) && hasText(r.href))
        ? related
        : fallback.related,
    ctaHeadline: text(data.ctaHeadline, fallback.ctaHeadline),
  };
}
