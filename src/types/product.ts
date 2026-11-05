export type CapabilityCard = {
  title: string;
  description: string;
};

export type FrameworkStep = {
  stepNumber: string;
  title: string;
  description: string;
};

export type MappedFrameworks = {
  chips: string[];
  note: string;
};

export type RelatedItem = {
  title: string;
  typeLabel: string;
  href: string;
};

export type ProductDashboard = {
  score: number;
  maxScore: number;
  statusChip: string;
  firewallCoverage: number;
  trafficProtection: number;
  fileIntegrityChecks: number;
};

export type ProductHero = {
  subline: string;
  tags: string[];
  dashboard?: ProductDashboard;
};

export type ProductCta = {
  title: string;
  buttonText: string;
  buttonHref: string;
};

export type ProductSeo = {
  title: string;
  description: string;
  canonical?: string;
  noIndex?: boolean;
};

export type Product = {
  _id?: string;
  name: string;
  slug: string;
  tagline: string;
  hero: ProductHero;
  capabilityCards: CapabilityCard[];
  framework: {
    title: string;
    steps: FrameworkStep[];
  };
  mappedFrameworks: MappedFrameworks;
  relatedItems: RelatedItem[];
  cta: ProductCta;
  seo: ProductSeo;
};
