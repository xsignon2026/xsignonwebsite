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
  poweredByHeader: false, // do not announce the framework
  // S-17: CSP is set here (static headers) rather than per request, so pages stay prerendered.
  async headers() {
    return [
      {
        // Everything except /studio itself. A path like /studio-stories must still get the site policy.
        source: "/((?!studio(?:/|$)).*)",
        headers: [{ key: "Content-Security-Policy", value: buildCsp(SITE_SOURCES) }],
      },
      {
        // Cheap, safe headers for every path. HSTS is added at T-161 once the domain plan is final.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
      {
        source: "/studio/:path*",
        headers: [{ key: "Content-Security-Policy", value: buildCsp(STUDIO_SOURCES) }],
      },
    ];
  },
};

export default nextConfig;
