import { createResendMailer } from "./resend";
import type { Mailer } from "./types";

// T-056, T-057, T-060: how the site is set up to send email, from the environment.
// Returns null when anything is missing. Nothing is then sent, enquiries stay saved as pending, and
// the stale-delivery check (src/lib/contact/deliver.ts) raises the alarm: a missing setting can delay
// an enquiry but never lose it.
//
// T-060, staging and previews: they must never email real people or reach the real inbox.
//   - ENQUIRY_INBOX is set per environment: a test inbox on staging and previews, the real one only
//     on Production. There is deliberately no default.
//   - Outside Production the visitor confirmation is NOT sent (a visitor on staging would be a real
//     person getting mail from a test site) and subjects start with "[staging]".
export type MailConfig = {
  mailer: Mailer;
  from: string;
  inbox: string;
  sendConfirmations: boolean;
  subjectPrefix: string;
};

const ADDRESS = /^[^\s<>@,;"]+@[^\s<>@,;"]+\.[^\s<>@,;"]+$/;
// "name@host" or "Display Name <name@host>". No line breaks, so no header injection.
const SENDER =
  /^(?:[^<>\r\n"]+ <[^\s<>@,;"]+@[^\s<>@,;"]+\.[^\s<>@,;"]+>|[^\s<>@,;"]+@[^\s<>@,;"]+\.[^\s<>@,;"]+)$/;

export function getMailConfig(
  env: Record<string, string | undefined> = process.env,
  mailer?: Mailer,
): MailConfig | null {
  const apiKey = env.RESEND_API_KEY;
  const from = env.EMAIL_FROM?.trim();
  const inbox = env.ENQUIRY_INBOX?.trim();
  if (!apiKey || !from || !inbox) return null;
  if (!SENDER.test(from) || !ADDRESS.test(inbox)) return null;

  const production = env.NEXT_PUBLIC_SITE_ENV === "production";
  return {
    mailer: mailer ?? createResendMailer({ apiKey }),
    from,
    inbox,
    sendConfirmations: production,
    subjectPrefix: production ? "" : "[staging] ",
  };
}
