import type { RelatedSolutionLink, Solution, SolutionFeature } from "@/types/solution";

// Kept apart from the loader so it can be tested on its own.

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const goodFeature = (f: Partial<SolutionFeature> | null | undefined): f is SolutionFeature =>
  !!f && hasText(f.lead) && hasText(f.body);

type EditedLink = Partial<RelatedSolutionLink> | null | undefined;
const goodLink = (l: EditedLink): l is RelatedSolutionLink =>
  !!l && hasText(l.title) && hasText(l.type) && hasText(l.href);

// The address at the end of the link, used as the item's short name.
const withSlug = (link: RelatedSolutionLink): RelatedSolutionLink => ({
  ...link,
  slug: link.href.split("/").filter(Boolean).pop() ?? link.href,
});

const links = (data: EditedLink[] | undefined, fallback: RelatedSolutionLink[]) => {
  const list = (data ?? []).filter((l) => l !== null);
  return list.length > 0 && list.every(goodLink) ? list.map(withSlug) : fallback;
};

/**
 * Lays the editors' solution over the built-in one. Anything left empty keeps the built-in value. Lists are
 * taken as a whole when every entry is complete, otherwise the built-in list stays.
 */
export function mergeSolution(
  fallback: Solution,
  data: Partial<Solution> | null | undefined,
): Solution {
  if (!data) return fallback;
  const text = (value: unknown, def: string) => (hasText(value) ? value : def);
  const features = (data.features ?? []).filter((f) => f !== null);
  const delivered = (data.deliveredBy ?? []).filter(hasText);

  return {
    ...fallback,
    title: text(data.title, fallback.title),
    summary: text(data.summary, fallback.summary),
    ctaHeadline: text(data.ctaHeadline, fallback.ctaHeadline),
    challenge: text(data.challenge, fallback.challenge),
    features:
      features.length > 0 && features.every(goodFeature)
        ? features.map((f) => ({ ...f, joiner: f.joiner || undefined }))
        : fallback.features,
    diagramKey: data.diagramKey ?? fallback.diagramKey,
    deliveredBy: delivered.length > 0 ? delivered : fallback.deliveredBy,
    products: links(data.products, fallback.products),
    proofAndReading: links(data.proofAndReading, fallback.proofAndReading),
    order: typeof data.order === "number" ? data.order : fallback.order,
  };
}
