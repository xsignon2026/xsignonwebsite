import { REASONS } from "@/lib/contact/schema";
import type { MailConfig } from "./config";
import type { Mail } from "./types";

// T-056, T-057: the two emails an enquiry produces. Plain text only.
//
// Security rules, each pinned by a test:
//   - Subjects are fixed text. Nothing a visitor typed is ever in a subject.
//   - The visitor's confirmation repeats NOTHING they typed (no name, no message). Otherwise the form
//     could be used to send signed mail with an attacker's words to anyone's address.
//   - The visitor's address is only ever used as a "to" or "reply-to" field.

export type EnquiryRow = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  reason: string;
  message: string;
  created_at: Date | string;
};

const reasonLabel = (value: string) => REASONS.find((r) => r.value === value)?.label ?? "Other";

// To the team's shared inbox. Replying goes straight to the visitor.
export function composeNotification(
  enquiry: EnquiryRow,
  config: MailConfig,
  idempotencyKey: string,
): Mail {
  const lines = [
    `New enquiry (ID ${enquiry.id})`,
    "",
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Company: ${enquiry.company ?? "-"}`,
    `Phone: ${enquiry.phone ?? "-"}`,
    `About: ${reasonLabel(enquiry.reason)}`,
    "",
    "Message:",
    enquiry.message,
    "",
    "-- ",
    "Sent from the website contact form. Reply to this email to answer the visitor.",
    `If you see this email twice, the ID above is the same: it is one enquiry.`,
  ];
  return {
    to: config.inbox,
    from: config.from,
    replyTo: enquiry.email,
    subject: `${config.subjectPrefix}New website enquiry`,
    text: lines.join("\n"),
    idempotencyKey,
  };
}

// To the visitor. Says only that the message arrived.
export function composeConfirmation(
  enquiry: Pick<EnquiryRow, "email">,
  config: MailConfig,
  idempotencyKey: string,
): Mail {
  return {
    to: enquiry.email,
    from: config.from,
    replyTo: config.inbox,
    subject: `${config.subjectPrefix}We received your message`,
    text: [
      "Thank you for contacting XSignOn.",
      "",
      "We have received your message and will reply by email.",
      "",
      "If you did not send a message to us, you can ignore this email.",
    ].join("\n"),
    idempotencyKey,
  };
}
