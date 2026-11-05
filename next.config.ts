import type { NextConfig } from "next";
import { buildCsp, SITE_SOURCES, STUDIO_SOURCES } from "./src/lib/csp";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // S-17: CSP is set here (static headers) rather than per request, so pages stay prerendered.
  async headers() {
    return [
      {
        // Everything except the studio.
        source: "/((?!studio).*)",
        headers: [{ key: "Content-Security-Policy", value: buildCsp(SITE_SOURCES) }],
      },
      {
        source: "/studio/:path*",
        headers: [{ key: "Content-Security-Policy", value: buildCsp(STUDIO_SOURCES) }],
      },
    ];
  },
};

export default nextConfig;
