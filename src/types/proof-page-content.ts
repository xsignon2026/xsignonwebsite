// What the editors can change on the Proof hub. The case study pages themselves are the Case Study documents.

export type ProofPicture = "bank" | "health" | "industrial" | "it";

export type ProofCard = {
  picture: ProofPicture;
  tags: string[];
  title: string;
  summary: string;
  /** The highlighted note under the card, for example "Case details pending". */
  noteLabel: string;
  noteText: string;
  href: string;
};

export type ProofPageContent = {
  hero: { title: string };
  intro: { bold: string; text: string };
  cards: ProofCard[];
  roi: { title: string; text: string; link: { label: string; href: string } };
  cta: { title: string; button: { label: string; href: string } };
};
