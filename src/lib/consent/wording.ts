// T-077: Versioned consent wording constants for multi-jurisdiction compliance (GDPR, CAN-SPAM, CASL).

export const CONSENT_VERSION = "v1-2026-global" as const;

export const NEWSLETTER_CONSENT_TEXT =
  "I agree to receive security insights and product updates from XSignOn. I can unsubscribe at any time." as const;

export const WHITEPAPER_CONSENT_TEXT =
  "I agree that XSignOn may process my contact details to deliver this white paper and follow up on my architecture inquiry." as const;

export type ConsentRecordPayload = {
  version: typeof CONSENT_VERSION;
  text: string;
  agreed: boolean;
  timestamp: string;
};
