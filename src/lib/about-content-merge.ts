import type { AboutContent } from "@/types/about-content";

// Kept apart from the loader (server only) so it can be tested on its own.

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const allText = (values: unknown[]): boolean => values.every(hasText);

/** Keeps the editors' list only when it has the same number of complete entries as the default. */
function sameSize<T>(data: T[] | null | undefined, fallback: T[], complete: (item: T) => boolean) {
  return Array.isArray(data) &&
    data.length === fallback.length &&
    data.every((i) => i && complete(i))
    ? data
    : fallback;
}

/** Takes the editors' content and fills any missing or empty part from the defaults. */
export function mergeAboutContent(
  fallback: AboutContent,
  data: Partial<AboutContent> | null | undefined,
): AboutContent {
  if (!data) return fallback;
  const pick = (value: unknown, def: string) => (hasText(value) ? value : def);

  const paragraphs = (data.who?.paragraphs ?? []).filter(hasText);
  const links = (data.productsLine?.links ?? []).filter(
    (l) => l && hasText(l.label) && hasText(l.href),
  );

  return {
    hero: {
      eyebrow: pick(data.hero?.eyebrow, fallback.hero.eyebrow),
      title: pick(data.hero?.title, fallback.hero.title),
      description: pick(data.hero?.description, fallback.hero.description),
    },
    who: {
      title: pick(data.who?.title, fallback.who.title),
      statement: pick(data.who?.statement, fallback.who.statement),
      paragraphs: paragraphs.length > 0 ? paragraphs : fallback.who.paragraphs,
    },
    whatWeDo: {
      title: pick(data.whatWeDo?.title, fallback.whatWeDo.title),
      items: sameSize(data.whatWeDo?.items, fallback.whatWeDo.items, (i) =>
        allText([i.title, i.text, i.art]),
      ),
    },
    how: {
      title: pick(data.how?.title, fallback.how.title),
      steps: sameSize(data.how?.steps, fallback.how.steps, (s) =>
        allText([s.title, s.kind, s.text]),
      ),
    },
    why: {
      title: pick(data.why?.title, fallback.why.title),
      principles: sameSize(
        data.why?.principles,
        fallback.why.principles,
        (p) =>
          hasText(p.title) && Array.isArray(p.lines) && p.lines.length === 2 && allText(p.lines),
      ),
    },
    productsLine: {
      text: pick(data.productsLine?.text, fallback.productsLine.text),
      links: links.length > 0 ? links : fallback.productsLine.links,
    },
    careers: {
      title: pick(data.careers?.title, fallback.careers.title),
      text: pick(data.careers?.text, fallback.careers.text),
      emptyNote: pick(data.careers?.emptyNote, fallback.careers.emptyNote),
    },
    team: {
      title: pick(data.team?.title, fallback.team.title),
      // A member needs a name and a role; a photo is used only if it is an https address.
      members: (Array.isArray(data.team?.members) ? data.team.members : [])
        .filter((m) => m && hasText(m.name) && hasText(m.role))
        .map((m) => ({
          name: m.name.trim(),
          role: m.role.trim(),
          bio: hasText(m.bio) ? m.bio.trim() : "",
          photo: hasText(m.photo) && m.photo.startsWith("https://") ? m.photo : undefined,
        })),
    },
  };
}
