// PhishLens, the company's free domain email-security scanner. The home hero runs a scan through
// /api/phishlens-scan and links to the full report on PhishLens (its page opens a stored report from
// "?scan=<id>").

export const PHISHLENS_URL = "https://phishlens-latest-l8n7.onrender.com";

export function phishlensReportUrl(scanId: string): string {
  return `${PHISHLENS_URL}/?scan=${encodeURIComponent(scanId)}`;
}

// What a visitor types may be a domain, an email address or a link. Keep only the domain:
// "you@acme.com", "https://www.acme.com/about" and "ACME.com." all become "acme.com".
// Returns null when what is left is not a domain name.
export function toDomain(input: string): string | null {
  let v = input.trim().toLowerCase();
  if (!v) return null;
  if (v.includes("@")) v = v.slice(v.lastIndexOf("@") + 1);
  v = v.replace(/^[a-z][a-z0-9+.-]*:\/\//, "");
  v = v.split(/[/?#]/)[0];
  v = v.replace(/:\d+$/, "").replace(/\.$/, "").replace(/^www\./, "");
  if (v.length > 253) return null;
  const label = /^(?!-)[a-z0-9-]{1,63}(?<!-)$/;
  const labels = v.split(".");
  if (labels.length < 2 || !labels.every((l) => label.test(l))) return null;
  if (!/[a-z]/.test(labels[labels.length - 1])) return null;
  return v;
}

export type ScanCheckStatus = "pass" | "warn" | "fail";

export type ScanSummary = {
  id: string;
  domain: string;
  score: number;
  grade: string;
  checks: { key: string; title: string; status: ScanCheckStatus }[];
  topRisk: string | null;
  reportUrl: string;
};
