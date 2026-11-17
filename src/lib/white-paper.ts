import type { WhitePaper } from "@/types/white-paper";

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
      title: "Zero-Trust Device & Cloud Security Posture Guide | XSignOn",
      description:
        "Download the XSignOn technical white paper on continuous endpoint posture and zero-trust verification.",
    },
  },
};

export async function getWhitePaperBySlug(slug: string): Promise<WhitePaper | null> {
  const normalized = slug.toLowerCase().trim();
  return FALLBACK_WHITE_PAPERS[normalized] ?? null;
}
