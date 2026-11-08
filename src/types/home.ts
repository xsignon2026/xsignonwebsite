export type HomeAnnouncement = {
  enabled: boolean;
  badge?: string;
  text?: string;
  href?: string;
};

export type HomeHeroSlide = {
  name: string;
  category: string;
  count: string;
  desc: string;
  iconKey: "postureone" | "evalone" | "xsense" | "keys" | "ams";
};

export type HomeHero = {
  headline: string;
  subline: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
  slides?: HomeHeroSlide[];
};

export type HomeCoverflowCard = {
  name: string;
  desc: string;
  tags: string[];
  href: string;
  iconKey: "postureone" | "keys" | "evalone" | "xsense" | "ams";
  imageAlt: string;
};

export type HomePartnerCategory = {
  id: string;
  label: string;
  fromPartners: string[];
  inXSignOn: string[];
  deliveredThrough: string[];
  detailText: string;
};

export type HomeSolutionItem = {
  title: string;
  desc: string;
  href: string;
  deliveredBy: string[];
  diagramKey: "identity" | "ai" | "quantum" | "process" | "enterprise";
};

export type HomeThinkingItem = {
  title: string;
  date: string;
  desc: string;
  href: string;
  imageAlt: string;
};

export type HomeThinking = {
  lead: HomeThinkingItem;
  items: HomeThinkingItem[];
};

export type HomeFeaturedProof = {
  title: string;
  tag: string;
  metric?: string;
  href: string;
};

export type HomeCta = {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonHref: string;
};

export type HomePageData = {
  announcement?: HomeAnnouncement;
  hero: HomeHero;
  standardsMarquee?: string[];
  featuredProductSlugs: string[];
  coverflowCards?: HomeCoverflowCard[];
  partnerCategories?: HomePartnerCategory[];
  solutions?: HomeSolutionItem[];
  thinking?: HomeThinking;
  featuredProof: HomeFeaturedProof[];
  selectedInsightSlugs: string[];
  cta: HomeCta;
};
