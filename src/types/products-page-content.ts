// What the editors can change on the Products listing page. The pictures are chosen from a fixed set (see
// src/components/prototype/product-pictures.ts); layout, motion and the compare table stay in the design.

export type ProductPicture =
  | "analytics"
  | "fingerprint"
  | "workshop"
  | "servers"
  | "warehouse"
  | "postureone"
  | "passwordless";

export type ProductsPageContent = {
  hero: { title: string };
  newLaunches: {
    title: string;
    items: {
      name: string;
      tag: string;
      text: string;
      href: string;
      cta: string;
      picture: ProductPicture;
    }[];
  };
  cards: {
    items: { name: string; tags: string[]; text: string; href: string; picture: ProductPicture }[];
  };
  thinking: { title: string; allLink: { label: string; href: string } };
  cta: { title: string; button: { label: string; href: string } };
};
