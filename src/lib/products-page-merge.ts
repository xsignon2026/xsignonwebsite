import { PRODUCT_PICTURES } from "@/components/prototype/product-pictures";
import type { ProductsPageContent } from "@/types/products-page-content";

// Kept apart from the loader (server only) so it can be tested on its own.

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const knownPicture = (value: unknown): boolean =>
  typeof value === "string" && value in PRODUCT_PICTURES;

/** Keeps the editors' list only when it has the same number of complete entries as the default. */
function sameSize<T>(data: T[] | null | undefined, fallback: T[], complete: (item: T) => boolean) {
  return Array.isArray(data) &&
    data.length === fallback.length &&
    data.every((item) => item && complete(item))
    ? data
    : fallback;
}

const link = (
  value: { label?: string; href?: string } | undefined,
  fallback: { label: string; href: string },
) =>
  value && hasText(value.label) && hasText(value.href)
    ? { label: value.label, href: value.href }
    : fallback;

/** Takes the editors' content and fills any missing or empty part from the defaults. */
export function mergeProductsPage(
  fallback: ProductsPageContent,
  data: Partial<ProductsPageContent> | null | undefined,
): ProductsPageContent {
  if (!data) return fallback;
  const pick = (value: unknown, def: string) => (hasText(value) ? value : def);

  return {
    hero: { title: pick(data.hero?.title, fallback.hero.title) },
    newLaunches: {
      title: pick(data.newLaunches?.title, fallback.newLaunches.title),
      items: sameSize(
        data.newLaunches?.items,
        fallback.newLaunches.items,
        (i) => [i.name, i.tag, i.text, i.href, i.cta].every(hasText) && knownPicture(i.picture),
      ),
    },
    cards: {
      items: sameSize(
        data.cards?.items,
        fallback.cards.items,
        (i) =>
          [i.name, i.text, i.href].every(hasText) &&
          Array.isArray(i.tags) &&
          i.tags.length > 0 &&
          i.tags.every(hasText) &&
          knownPicture(i.picture),
      ),
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
