export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  pullQuote?: string;
}

export interface RelatedItemLink {
  title: string;
  type: "Product" | "Solution" | "Insight" | "Case study" | "Our thinking";
  href: string;
}

export interface RelatedWhitePaper {
  title: string;
  slug: string;
  href: string;
  description?: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  topic: string;
  readingTime: string;
  featured?: boolean;
  pullQuote?: string;
  sections: ArticleSection[];
  coverImage?: {
    src: string;
    alt: string;
  };
  relatedWhitePaper?: RelatedWhitePaper;
  relatedLinks: RelatedItemLink[];
  ctaHeadline: string;
  slugAliases?: string[];
}
