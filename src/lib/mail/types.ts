// T-056, T-057: the small slice of an email provider the site needs. The provider (Resend, Postmark)
// sits behind this, so changing it is one file. Recipients, sender and reply-to are always separate
// fields, never built into a string or a header.
export type Mail = {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  /** Plain text only: nothing a visitor typed can ever become markup in an email. */
  text: string;
  /** Sent to the provider so a retry of the same delivery never sends a second email. */
  idempotencyKey: string;
};

export type Mailer = { send(mail: Mail): Promise<void> };

// code is a short word such as "http_503" or "timeout": safe to store and report. It never holds
// the provider's response text, which could echo what was sent.
export class MailError extends Error {
  constructor(
    public readonly code: string,
    public readonly retryable: boolean,
  ) {
    super(code);
  }
}
