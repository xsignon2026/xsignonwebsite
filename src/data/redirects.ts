export interface RedirectEntry {
  source: string;
  destination: string;
  permanent: boolean;
}

export const CANONICAL_REDIRECTS: ReadonlyArray<RedirectEntry> = [
  // Products
  { source: "/product", destination: "/products", permanent: true },
  { source: "/products/fido2", destination: "/products/keys", permanent: true },
  { source: "/products/posture", destination: "/products/postureone", permanent: true },
  { source: "/products/eval", destination: "/products/evalone", permanent: true },
  { source: "/products/compare", destination: "/compare", permanent: true },
  { source: "/products/proof", destination: "/proof", permanent: true },
  { source: "/products/roi", destination: "/roi-calculator", permanent: true },
  { source: "/roi", destination: "/roi-calculator", permanent: true },

  // Solutions
  { source: "/solution", destination: "/solutions", permanent: true },
  { source: "/solutions/identity", destination: "/solutions/identity-governance", permanent: true },
  { source: "/solutions/ai", destination: "/solutions/ai-and-digital-governance", permanent: true },
  { source: "/solutions/quantum", destination: "/solutions/quantum-safe-security", permanent: true },
  { source: "/solutions/process", destination: "/solutions/business-process", permanent: true },
  { source: "/solutions/enterprise", destination: "/solutions/enterprise-technology", permanent: true },

  // Company & About
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/company", destination: "/about", permanent: true },
  { source: "/company/who-we-are", destination: "/about#who-we-are", permanent: true },
  { source: "/company/what-we-do", destination: "/about#what-we-do", permanent: true },
  { source: "/company/how-we-work", destination: "/about#how-we-work", permanent: true },
  { source: "/team", destination: "/about#who-we-are", permanent: true },
  { source: "/leadership", destination: "/about#who-we-are", permanent: true },

  // Careers
  { source: "/jobs", destination: "/careers", permanent: true },
  { source: "/careers/apply", destination: "/contact", permanent: true },

  // Contact & Inquiries
  { source: "/contact-us", destination: "/contact", permanent: true },
  { source: "/demo", destination: "/contact", permanent: true },
  { source: "/talk-to-us", destination: "/contact", permanent: true },

  // Case Studies & Proof
  { source: "/case-studies", destination: "/proof", permanent: true },
  { source: "/case-studies/:slug*", destination: "/proof/:slug*", permanent: true },

  // Articles & Thinking
  { source: "/articles", destination: "/thinking", permanent: true },
  { source: "/articles/:slug*", destination: "/thinking/:slug*", permanent: true },

  // White Papers
  { source: "/whitepaper", destination: "/white-papers/zero-trust-posture-guide", permanent: true },
  { source: "/whitepapers", destination: "/resources", permanent: true },
];
