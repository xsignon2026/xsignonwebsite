// What the editors can change on the About page. Pictures, colours and layout stay in the design.

export type AboutArt = "identity" | "ai" | "key" | "atom";

export type AboutContent = {
  hero: { eyebrow: string; title: string; description: string };
  who: { title: string; statement: string; paragraphs: string[] };
  whatWeDo: { title: string; items: { title: string; text: string; art: AboutArt }[] };
  how: { title: string; steps: { title: string; kind: string; text: string }[] };
  why: { title: string; principles: { title: string; lines: string[]; via: string }[] };
  careers: { title: string; text: string; emptyNote: string };
  /** The "Meet our team" section. With no members it shows the heading only. */
  team: { title: string; emptyNote: string; members: TeamMember[] };
};

export type TeamMember = { name: string; role: string; bio: string; photo?: string };
