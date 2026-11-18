import { THINKING_PICTURES } from "@/components/prototype/thinking-pictures";
import type { InsightCard, InsightsPageContent } from "@/types/insights-page-content";

// Kept apart from the loader (server only) so it can be tested on its own.

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const validCard = (card: Partial<InsightCard> | null | undefined): card is InsightCard =>
  !!card &&
  [card.title, card.excerpt, card.author, card.date, card.href, card.cta].every(hasText) &&
  typeof card.picture === "string" &&
  card.picture in THINKING_PICTURES;

/** Takes the editors' content and fills any missing or empty part from the defaults. */
export function mergeInsightsPage(
  fallback: InsightsPageContent,
  data: Partial<InsightsPageContent> | null | undefined,
): InsightsPageContent {
  if (!data) return fallback;
  const pick = (value: unknown, def: string) => (hasText(value) ? value : def);
  const button = data.cta?.button;
  const cards = (data.cards ?? []).filter(validCard);

  return {
    hero: { title: pick(data.hero?.title, fallback.hero.title) },
    featured:
      validCard(data.featured) && hasText(data.featured.label)
        ? { ...data.featured, label: data.featured.label }
        : fallback.featured,
    cards: cards.length > 0 ? cards : fallback.cards,
    cta: {
      title: pick(data.cta?.title, fallback.cta.title),
      button:
        button && hasText(button.label) && hasText(button.href)
          ? { label: button.label, href: button.href }
          : fallback.cta.button,
    },
  };
}
