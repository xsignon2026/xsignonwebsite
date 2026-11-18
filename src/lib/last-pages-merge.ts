import type {
  ComparePageContent,
  CtaContent,
  EnterprisePageContent,
  IndustryPageContent,
  LinkContent,
  RelatedRow,
} from "@/types/last-pages-content";

// Merge helpers for the Industry Thinking, Compare and Enterprise pages. Kept apart from the loaders (server only)
// so they can be tested on their own. An empty or incomplete edit keeps the built-in value.

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;
const texts = (value: unknown): string[] => (Array.isArray(value) ? value.filter(hasText) : []);
const pick = (value: unknown, def: string) => (hasText(value) ? value : def);

const link = (value: Partial<LinkContent> | undefined | null, fallback: LinkContent) =>
  value && hasText(value.label) && hasText(value.href)
    ? { label: value.label, href: value.href }
    : fallback;

const cta = (value: Partial<CtaContent> | undefined, fallback: CtaContent): CtaContent => ({
  title: pick(value?.title, fallback.title),
  button: link(value?.button, fallback.button),
});

const related = (value: unknown, fallback: RelatedRow[]): RelatedRow[] => {
  const list = Array.isArray(value) ? (value as Partial<RelatedRow>[]) : [];
  return list.length > 0 &&
    list.every((r) => r && hasText(r.title) && hasText(r.type) && hasText(r.href))
    ? (list as RelatedRow[])
    : fallback;
};

// ---------------- Industry Thinking
export function mergeIndustryPage(
  fallback: IndustryPageContent,
  data: Partial<IndustryPageContent> | null | undefined,
): IndustryPageContent {
  if (!data) return fallback;
  const f = data.featured;
  const goodFeatured = f && [f.label, f.title, f.text, f.noteLabel, f.noteText].every(hasText);
  const cards = Array.isArray(data.cards) ? data.cards : [];
  return {
    hero: {
      title: pick(data.hero?.title, fallback.hero.title),
      tag: pick(data.hero?.tag, fallback.hero.tag),
    },
    featured: goodFeatured ? (f as IndustryPageContent["featured"]) : fallback.featured,
    cards:
      cards.length > 0 &&
      cards.every((c) => c && [c.title, c.text, c.noteLabel, c.noteText].every(hasText))
        ? cards
        : fallback.cards,
    cta: cta(data.cta, fallback.cta),
  };
}

// ---------------- Compare
export function mergeComparePage(
  fallback: ComparePageContent,
  data: Partial<ComparePageContent> | null | undefined,
): ComparePageContent {
  if (!data) return fallback;
  const columns = texts(data.columns);
  const rows = Array.isArray(data.rows) ? data.rows : [];
  // The table is taken as a whole: every row needs a capability and one value for each column after the first.
  const tableOk =
    columns.length >= 2 &&
    rows.length > 0 &&
    rows.every(
      (r) =>
        r &&
        hasText(r.capability) &&
        Array.isArray(r.values) &&
        r.values.length === columns.length - 1 &&
        r.values.every(hasText),
    );
  return {
    hero: { title: pick(data.hero?.title, fallback.hero.title) },
    intro: {
      bold: pick(data.intro?.bold, fallback.intro.bold),
      text: pick(data.intro?.text, fallback.intro.text),
    },
    columns: tableOk ? columns : fallback.columns,
    rows: tableOk ? rows : fallback.rows,
    lede: pick(data.lede, fallback.lede),
    related: related(data.related, fallback.related),
    cta: cta(data.cta, fallback.cta),
  };
}

// ---------------- Enterprise
export function mergeEnterprisePage(
  fallback: EnterprisePageContent,
  data: Partial<EnterprisePageContent> | null | undefined,
): EnterprisePageContent {
  if (!data) return fallback;
  const tags = texts(data.hero?.tags);
  const models = data.deployment?.models;
  const chips = texts(data.standards?.chips);
  return {
    hero: {
      title: pick(data.hero?.title, fallback.hero.title),
      tags: tags.length > 0 ? tags : fallback.hero.tags,
    },
    intro: {
      bold: pick(data.intro?.bold, fallback.intro.bold),
      text: pick(data.intro?.text, fallback.intro.text),
    },
    deployment: {
      title: pick(data.deployment?.title, fallback.deployment.title),
      models:
        Array.isArray(models) &&
        models.length === fallback.deployment.models.length &&
        models.every((m) => m && hasText(m.title) && hasText(m.text))
          ? models
          : fallback.deployment.models,
    },
    standards: {
      title: pick(data.standards?.title, fallback.standards.title),
      chips: chips.length > 0 ? chips : fallback.standards.chips,
      text: pick(data.standards?.text, fallback.standards.text),
    },
    related: related(data.related, fallback.related),
    cta: cta(data.cta, fallback.cta),
  };
}
