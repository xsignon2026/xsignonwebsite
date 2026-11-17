import type { MailConfig } from "@/lib/mail/config";
import type { Mail } from "@/lib/mail/types";
import { siteUrl } from "@/lib/site";
import type { Purpose } from "./core";

// The confirmation email. Plain text, fixed subject, and nothing a visitor typed except where it must
// go (the "to" field). The link always points at our own site address from the environment, never at
// the Host header of the request (which a visitor controls).
export function composeVerification(
  to: string,
  rawToken: string,
  purpose: Purpose,
  config: MailConfig,
  idempotencyKey: string,
): Mail {
  const link = `${siteUrl.replace(/\/$/, "")}/subscribe/verify?token=${encodeURIComponent(rawToken)}`;
  const what =
    purpose === "whitepaper_download"
      ? "get the XSignOn white paper you asked for"
      : "receive XSignOn updates and thinking";
  return {
    to,
    from: config.from,
    subject: `${config.subjectPrefix}Confirm your email address`,
    text: [
      `Please confirm that you want to ${what}.`,
      "",
      "Open this link to confirm. It works once and expires in 24 hours:",
      link,
      "",
      "If you did not ask for this, ignore this email and nothing will happen.",
      "",
      "XSignOn",
    ].join("\n"),
    idempotencyKey,
  };
}

// Sent when someone types an address into the unsubscribe form. The link carries a token that only we
// can make, so only the owner of the inbox can use it.
export function composeUnsubscribeLink(
  to: string,
  token: string,
  config: MailConfig,
  idempotencyKey: string,
): Mail {
  const query = new URLSearchParams({ email: to, token });
  const link = `${siteUrl.replace(/\/$/, "")}/unsubscribe?${query.toString()}`;
  return {
    to,
    from: config.from,
    subject: `${config.subjectPrefix}Confirm that you want to unsubscribe`,
    text: [
      "We received a request to remove this address from XSignOn marketing emails.",
      "",
      "Open this link to confirm:",
      link,
      "",
      "If you did not ask for this, ignore this email and nothing will change.",
      "",
      "XSignOn",
    ].join("\n"),
    idempotencyKey,
  };
}
