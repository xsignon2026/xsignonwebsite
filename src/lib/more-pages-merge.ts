import { PROOF_PICTURES } from "@/components/prototype/proof-pictures";
import type { ContactPageContent } from "@/types/contact-page-content";
import type { LegalPage } from "@/types/legal-page";
import type { ProofPageContent } from "@/types/proof-page-content";

// Merge helpers for the legal pages, the Contact page and the Proof hub. Kept apart from the loaders (server only)
// so they can be tested on their own. In every case: an empty or incomplete edit keeps the built-in value.

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;
const texts = (value: unknown): string[] => (Array.isArray(value) ? value.filter(hasText) : []);
const pick = (value: unknown, def: string) => (hasText(value) ? value : def);

type Link = { label?: string; href?: string } | undefined | null;
const link = (value: Link, fallback: { label: string; href: string }) =>
  value && hasText(value.label) && hasText(value.href)
    ? { label: value.label, href: value.href }
    : fallback;

// ---------------- legal
export function mergeLegalPage(
  fallback: LegalPage,
  data: Partial<LegalPage> | null | undefined,
): LegalPage {
  if (!data) return fallback;
  const sections = (Array.isArray(data.sections) ? data.sections : []).map((s) =>
    s && hasText(s.heading) && texts(s.paragraphs).length > 0
      ? { heading: s.heading, paragraphs: texts(s.paragraphs) }
      : null,
  );
  return {
    ...fallback,
    title: pick(data.title, fallback.title),
    crumb: pick(data.crumb, fallback.crumb),
    notice: pick(data.notice, fallback.notice),
    showNotice: typeof data.showNotice === "boolean" ? data.showNotice : fallback.showNotice,
    sections:
      sections.length > 0 && sections.every((s) => s !== null)
        ? (sections as LegalPage["sections"])
        : fallback.sections,
    ctaHeadline: pick(data.ctaHeadline, fallback.ctaHeadline),
    ctaButton: link(data.ctaButton, fallback.ctaButton),
  };
}

// ---------------- contact
export function mergeContactPage(
  fallback: ContactPageContent,
  data: Partial<ContactPageContent> | null | undefined,
): ContactPageContent {
  if (!data) return fallback;
  const details = (Array.isArray(data.details) ? data.details : []).filter(
    (d) => d && hasText(d.label) && hasText(d.text),
  );
  return {
    hero: { title: pick(data.hero?.title, fallback.hero.title) },
    details:
      details.length > 0
        ? details.map((d) => ({ ...d, href: d.href || undefined }))
        : fallback.details,
    closing: pick(data.closing, fallback.closing),
    cta: {
      title: pick(data.cta?.title, fallback.cta.title),
      button: link(data.cta?.button, fallback.cta.button),
    },
  };
}

// ---------------- proof hub
const goodCard = (c: Partial<ProofPageContent["cards"][number]> | null | undefined) =>
  !!c &&
  [c.title, c.summary, c.noteLabel, c.noteText, c.href].every(hasText) &&
  texts(c.tags).length > 0 &&
  typeof c.picture === "string" &&
  c.picture in PROOF_PICTURES;

export function mergeProofPage(
  fallback: ProofPageContent,
  data: Partial<ProofPageContent> | null | undefined,
): ProofPageContent {
  if (!data) return fallback;
  const cards = Array.isArray(data.cards) ? data.cards : [];
  return {
    hero: { title: pick(data.hero?.title, fallback.hero.title) },
    intro: {
      bold: pick(data.intro?.bold, fallback.intro.bold),
      text: pick(data.intro?.text, fallback.intro.text),
    },
    cards:
      cards.length > 0 && cards.every(goodCard)
        ? (cards as ProofPageContent["cards"])
        : fallback.cards,
    roi: {
      title: pick(data.roi?.title, fallback.roi.title),
      text: pick(data.roi?.text, fallback.roi.text),
      link: link(data.roi?.link, fallback.roi.link),
    },
    cta: {
      title: pick(data.cta?.title, fallback.cta.title),
      button: link(data.cta?.button, fallback.cta.button),
    },
  };
}
