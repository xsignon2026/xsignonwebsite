// T-079: Structured sub-processor register and retention policies.

export type SubProcessor = {
  name: string;
  category: "Communications" | "Storage" | "Security" | "Monitoring" | "Hosting" | "CMS";
  purpose: string;
  location: string;
  retention: string;
  safeguards: string;
};

export const SUB_PROCESSORS: SubProcessor[] = [
  {
    name: "Transactional Email Provider",
    category: "Communications",
    purpose:
      "Dispatch of verification links, signed white paper delivery links, and bounce telemetry processing.",
    location: "United States / European Union",
    retention:
      "30 days maximum for delivery transmission logs; email message bodies purged within 7 days.",
    safeguards: "EU Standard Contractual Clauses (SCCs), DPA, TLS 1.3 enforced.",
  },
  {
    name: "Private Document Storage",
    category: "Storage",
    purpose:
      "Encrypted hosting of gated white paper PDF assets. Assets are served strictly via short-lived HMAC signed URLs.",
    location: "United States (AES-256 encrypted at rest)",
    retention: "Active document lifecycle. Download access logs retained for 90 days then pruned.",
    safeguards: "Private bucket isolation with zero direct public egress; KMS envelope encryption.",
  },
  {
    name: "Spam & Threat Mitigation",
    category: "Security",
    purpose:
      "In-memory rate limiting and request throttling to prevent bot attacks and token enumeration.",
    location: "Local Instance Memory",
    retention:
      "15 to 60 minutes in volatile RAM. Raw IP addresses are hashed using SHA-256 and never persisted to disk.",
    safeguards: "Truncated cryptographic hashing; zero PII disk logging.",
  },
  {
    name: "Error Telemetry & Monitoring",
    category: "Monitoring",
    purpose: "Operational crash telemetry and API error diagnostics.",
    location: "United States",
    retention:
      "30 days rolling retention. PII scrubbers sanitize email addresses, tokens, and payloads before persistence.",
    safeguards: "SOC 2 Type II, ISO 27001, automated data sanitizers.",
  },
  {
    name: "Edge Hosting & CDN",
    category: "Hosting",
    purpose: "Edge serverless execution, static page caching, and global delivery.",
    location: "Global Edge Network (US, EU)",
    retention: "30 days for edge network access logs.",
    safeguards: "SOC 2 Type II, ISO 27001, EU-US Data Privacy Framework.",
  },
  {
    name: "Sanity.io",
    category: "CMS",
    purpose: "Headless content management for public articles and product metadata.",
    location: "United States / European Union",
    retention: "No visitor data is transmitted to or stored within the CMS repository.",
    safeguards: "Read-only decoupled client architecture.",
  },
];
