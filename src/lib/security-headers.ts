// T-161: Security headers meeting Mozilla Observatory and SecurityHeaders.com A+ standards.
// Configured statically in next.config.ts so that static pages and PPR remain intact.

export const COMMON_SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
] as const;

export const SITE_FRAME_HEADER = {
  key: "X-Frame-Options",
  value: "DENY",
} as const;

export const STUDIO_FRAME_HEADER = {
  key: "X-Frame-Options",
  value: "SAMEORIGIN",
} as const;
