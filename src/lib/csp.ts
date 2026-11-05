// S-17: Content Security Policy. The decision and reasons are in docs/decisions/0001-rendering-and-csp.md.
// Built from plain lists so the allowed sources are easy to review and to test.

const isDev = process.env.NODE_ENV !== "production";

// S-18: the Sentry host comes from the DSN, because it differs by region (ingest.sentry.io, ingest.us.sentry.io).
function sentryHost(): string[] {
  try {
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    return dsn ? [`https://${new URL(dsn).hostname}`] : [];
  } catch {
    return [];
  }
}

// Everything the public site may talk to. Add a source here only with a line in the decision log.
export const SITE_SOURCES = {
  // Next.js writes small inline bootstrap scripts into every page; without a per-request nonce
  // (which would make every page dynamic) they need 'unsafe-inline'. React refresh needs eval in dev.
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

// The embedded studio is a large app: it needs inline styles, eval-free scripts and the Sanity APIs.
export const STUDIO_SOURCES = {
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

export function buildCsp(sources: Sources): string {
  const directives: [string, readonly string[]][] = [
    ["default-src", ["'self'"]],
    ["script-src", sources.script],
    ["style-src", sources.style],
    ["img-src", sources.img],
    ["font-src", sources.font],
    ["connect-src", sources.connect],
    ["frame-src", ["'self'"]],
    ["frame-ancestors", sources.frameAncestors],
    ["object-src", ["'none'"]],
    ["base-uri", ["'self'"]],
    ["form-action", ["'self'"]],
  ];
  const text = directives.map(([name, values]) => `${name} ${values.join(" ")}`).join("; ");
  return isDev ? text : `${text}; upgrade-insecure-requests`;
}
