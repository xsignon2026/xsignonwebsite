export type WhitePaper = {
  _id?: string;
  title: string;
  slug: string;
  summary: string;
  storageKey: string;
  gated: boolean;
  version: string;
  publishedAt: string;
  coverImage?: {
    alt?: string;
    asset?: {
      _ref?: string;
      url?: string;
    };
  };
  seo?: {
    title?: string;
    description?: string;
  };
};
