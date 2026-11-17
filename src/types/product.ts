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

export type ProductChecklistItem = {
  label: string;
  done?: boolean;
};

export type ProductChecklist = {
  meta: string;
  items: ProductChecklistItem[];
};

export type ProductSnapshotRow = {
  label: string;
  value: string;
  percentage: number;
  color?: "green" | "default";
};

export type ProductSnapshot = {
  meta: string;
  rows: ProductSnapshotRow[];
};

export type ProductKeyViz = {
  badge: string;
  description: string;
};

export type ProductDocTab = {
  label: string;
  content: string;
  title?: string;
  badge?: string;
};

export type ProductCaseCard = {
  title: string;
  tag: string;
  description: string;
  statusNotice?: string;
  linkHref: string;
  linkText: string;
};

export type ProductSpecRow = {
  header: string;
  values: string[];
};

export type ProductSpecTable = {
  title: string;
  subtitle?: string;
  columns: string[];
  rows: ProductSpecRow[];
  footnote?: string;
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
  extraNarrative?: string[];
  checklist?: ProductChecklist;
  snapshot?: ProductSnapshot;
  keyViz?: ProductKeyViz;
  caseCards?: ProductCaseCard[];
  specTable?: ProductSpecTable;
  docTabs?: ProductDocTab[];
  capabilityCards?: CapabilityCard[];
  framework?: {
    title: string;
    steps: FrameworkStep[];
  };
  mappedFrameworks?: MappedFrameworks;
  worksWith?: {
    title: string;
    paragraphs: string[];
    linkHref?: string;
    linkText?: string;
  };
  relatedItems?: RelatedItem[];
  cta?: ProductCta;
  seo?: ProductSeo;
};
