import type { NextConfig } from "next";

// S-17: Content Security Policy configuration.
const isDev = process.env.NODE_ENV !== "production";

function sentryHost(): string[] {
  try {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    return dsn ? [`https://${new URL(dsn).hostname}`] : [];
  } catch {
    return [];
  }
}

const SITE_SOURCES = {
  script: ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : [])],
  style: ["'self'", "'unsafe-inline'"],
  img: ["'self'", "data:", "blob:", "https://cdn.sanity.io"],
  font: ["'self'"],
  connect: [
    "'self'",
    "https://*.sanity.io",
    ...sentryHost(),
    ...(isDev ? ["ws:", "http://localhost:*"] : []),
  ],
  frameAncestors: ["'self'"],
} as const;

const STUDIO_SOURCES = {
  script: [
    "'self'",
    "'unsafe-inline'",
    "https://core.sanity-cdn.com",
    ...(isDev ? ["'unsafe-eval'"] : []),
  ],
  style: ["'self'", "'unsafe-inline'"],
  img: ["'self'", "data:", "blob:", "https://*.sanity.io", "https://*.sanity-cdn.com"],
  font: ["'self'", "data:", "https://*.sanity.io", "https://*.sanity-cdn.com"],
  connect: [
    "'self'",
    "https://*.sanity.io",
    "wss://*.sanity.io",
    "https://*.sanity-cdn.com",
    ...(isDev ? ["ws:", "http://localhost:*"] : []),
  ],
  frameAncestors: ["'self'"],
} as const;

type Sources = typeof SITE_SOURCES | typeof STUDIO_SOURCES;

function buildCsp(sources: Sources): string {
  const directives: [string, readonly string[]][] = [
    ["default-src", ["'self'"]],
    ["script-src", sources.script],
    ["style-src", sources.style],
    ["img-src", sources.img],
    ["font-src", sources.font],
    ["connect-src", sources.connect],
    ["frame-ancestors", sources.frameAncestors],
    ["base-uri", ["'self'"]],
    ["form-action", ["'self'"]],
    ["report-uri", ["/api/csp-report"]],
    ["report-to", ["csp-endpoint"]],
  ];
  return directives
    .filter(([, src]) => src && src.length > 0)
    .map(([dir, src]) => `${dir} ${src.join(" ")}`)
    .join("; ");
}

const COMMON_SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
] as const;

const SITE_FRAME_HEADER = { key: "X-Frame-Options", value: "DENY" } as const;
const STUDIO_FRAME_HEADER = { key: "X-Frame-Options", value: "SAMEORIGIN" } as const;

const CANONICAL_REDIRECTS = [
  // Products
  { source: "/product", destination: "/products", permanent: true },
  { source: "/features", destination: "/products", permanent: true },
  { source: "/products/fido2", destination: "/products/keys", permanent: true },
  { source: "/products/posture", destination: "/products/postureone", permanent: true },
  { source: "/products/eval", destination: "/products/evalone", permanent: true },
  { source: "/products/proof", destination: "/proof", permanent: true },
  { source: "/products/roi", destination: "/roi-calculator", permanent: true },
  { source: "/roi", destination: "/roi-calculator", permanent: true },
  // Solutions
  { source: "/solution", destination: "/solutions", permanent: true },
  { source: "/solutions/identity", destination: "/solutions/identity-governance", permanent: true },
  { source: "/solutions/ai", destination: "/solutions/ai-and-digital-governance", permanent: true },
  {
    source: "/solutions/quantum",
    destination: "/solutions/quantum-safe-security",
    permanent: true,
  },
  { source: "/solutions/process", destination: "/solutions/business-process", permanent: true },
  {
    source: "/solutions/enterprise",
    destination: "/solutions/enterprise-technology",
    permanent: true,
  },
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
  // White Papers & Resources
  { source: "/white-papers", destination: "/resources", permanent: true },
  { source: "/white-papers/:slug*", destination: "/resources/:slug*", permanent: true },
  { source: "/docs", destination: "/resources", permanent: true },
  { source: "/documentation", destination: "/resources", permanent: true },
];

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false,
  // The private PDFs are read from disk by the download route, so they must be shipped with it.
  outputFileTracingIncludes: { "/api/white-papers/download": ["./private/white-papers/**/*"] },
  experimental: {
    cpus: 1,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [...CANONICAL_REDIRECTS];
  },
  // S-17 & T-161: Full A+ security headers configured statically to preserve static/PPR rendering.
  async headers() {
    return [
      {
        // Everything except the studio.
        source: "/((?!studio).*)",
        headers: [
          ...COMMON_SECURITY_HEADERS,
          SITE_FRAME_HEADER,
          { key: "Content-Security-Policy", value: buildCsp(SITE_SOURCES) },
        ],
      },
      {
        source: "/studio/:path*",
        headers: [
          ...COMMON_SECURITY_HEADERS,
          STUDIO_FRAME_HEADER,
          { key: "Content-Security-Policy", value: buildCsp(STUDIO_SOURCES) },
        ],
      },
    ];
  },
};

export default nextConfig;
