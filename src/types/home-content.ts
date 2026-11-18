// The editable content of the home page. It comes from Sanity when the CMS is connected, and from
// src/data/home-content.ts otherwise, so the page always has something to show.

export type HomeLink = { label: string; href: string };

export type HeroSlideContent = {
  id: string;
  /** Look of the picture: 0 violet and red, 1 red, 2 light. */
  variant: 0 | 1 | 2;
  tag: string;
  /** Up to three short lines printed on the picture's glowing panel. */
  heading: string[];
  sub: string[];
  /** One-liner under the picture (not used when the slide is the free domain check). */
  line?: string;
  action: { type: "scan" } | { type: "link"; label: string; href: string };
};

export type EcosystemItemContent = {
  title: string;
  /** Two short lines of description. */
  lines: [string, string];
  icon: "grid" | "database" | "key" | "atom";
  /** Products that deliver it. */
  via: string[];
  /** Short text lines for the hover detail. */
  to: string[];
};

export type SolutionPanelContent = {
  /** Name in the left-hand list and the card heading. */
  title: string;
  text: string;
  href: string;
  cta: string;
  art: "identity" | "ai" | "key" | "atom";
};

export type HomeContent = {
  hero: {
    eyebrow: string;
    headlineLead: string;
    headlineAccent: string;
    description: string;
    primaryButton: HomeLink;
    secondaryLink: HomeLink;
  };
  heroSlides: HeroSlideContent[];
  /** Names shown in the scrolling standards strip. */
  standards: string[];
  ecosystem: { title: string; items: EcosystemItemContent[] };
  whatWeDo: { title: string; allLink: HomeLink; panels: SolutionPanelContent[] };
  cta: { title: string; button: HomeLink };
};
