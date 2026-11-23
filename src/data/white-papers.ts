import type { WhitePaper } from "@/types/white-paper";

// The white papers as they are today. Used when Sanity is not connected, and for any text the editors leave empty.
export const FALLBACK_WHITE_PAPERS: Record<string, WhitePaper> = {
  "zero-trust-posture-guide": {
    title: "Zero-Trust Device & Cloud Security Posture Guide",
    slug: "zero-trust-posture-guide",
    summary:
      "A pragmatic framework for enterprise security leaders on integrating continuous endpoint health, FIDO2 authentication, and automated audit evidence.",
    storageKey: "zero-trust-posture-guide-v1.pdf",
    gated: true,
    version: "1.0",
    publishedAt: "2026-04-01T00:00:00Z",
    seo: {
      title: "Zero-Trust Device & Cloud Security Posture Guide",
      description:
        "Download the XSignOn technical white paper on continuous endpoint posture and zero-trust verification.",
    },
  },
};
