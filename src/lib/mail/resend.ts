import { MailError, type Mailer } from "./types";

// T-056: Resend over its HTTP API (no SDK, so no extra dependency). The Idempotency-Key header makes
// Resend ignore a repeat of a send it already accepted, which covers "it accepted the email but we
// never saw the answer".
export function createResendMailer(options: {
  apiKey: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}): Mailer {
  const { apiKey, fetchImpl = fetch, timeoutMs = 8000 } = options;
  return {
    async send(mail) {
      let response: Response;
      try {
        response = await fetchImpl("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "Idempotency-Key": mail.idempotencyKey,
          },
          body: JSON.stringify({
            from: mail.from,
            to: [mail.to],
            ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
            subject: mail.subject,
            text: mail.text,
          }),
          signal: AbortSignal.timeout(timeoutMs),
        });
      } catch (error) {
        const timedOut = error instanceof Error && error.name === "TimeoutError";
        throw new MailError(timedOut ? "timeout" : "network", true);
      }
      if (response.ok) return;
      // 429 and 5xx are worth trying again. Other 4xx (bad address, bad key, bad sender) will not
      // get better by waiting. The response body is never read or stored.
      const retryable = response.status === 429 || response.status >= 500;
      throw new MailError(`http_${response.status}`, retryable);
    },
  };
}
