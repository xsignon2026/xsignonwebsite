import type { NextConfig } from "next";
import { buildCsp, SITE_SOURCES, STUDIO_SOURCES } from "./src/lib/csp";
import { CANONICAL_REDIRECTS } from "./src/data/redirects";
import {
  COMMON_SECURITY_HEADERS,
  SITE_FRAME_HEADER,
  STUDIO_FRAME_HEADER,
} from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
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
