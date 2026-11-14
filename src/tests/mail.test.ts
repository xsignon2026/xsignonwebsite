import { describe, expect, it, vi } from "vitest";
import { composeConfirmation, composeNotification, type EnquiryRow } from "../lib/mail/compose";
import { getMailConfig } from "../lib/mail/config";
import { createResendMailer } from "../lib/mail/resend";
import { MailError, type Mail, type Mailer } from "../lib/mail/types";

const mail: Mail = {
  to: "team@example.com",
  from: "XSignOn <hello@mail.example.com>",
  replyTo: "ada@example.com",
  subject: "New website enquiry",
  text: "Hello",
  idempotencyKey: "11111111-1111-4111-8111-111111111111",
};

describe("the Resend mailer", () => {
  it("sends separate fields, a plain-text body and the idempotency key", async () => {
    const fetchImpl = vi.fn(async () => new Response("{}", { status: 200 }));
    await createResendMailer({ apiKey: "re_test", fetchImpl }).send(mail);

    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer re_test");
    expect(headers["Idempotency-Key"]).toBe(mail.idempotencyKey);
    const body = JSON.parse(init.body as string);
    expect(body).toEqual({
      from: mail.from,
      to: ["team@example.com"],
      reply_to: "ada@example.com",
      subject: "New website enquiry",
      text: "Hello",
    });
    expect(body.html).toBeUndefined();
  });

  it("calls rate limits and server errors retryable, and other errors permanent", async () => {
    const send = (status: number) =>
      createResendMailer({
        apiKey: "k",
        fetchImpl: async () => new Response("secret provider text", { status }),
      }).send(mail);
    for (const status of [429, 500, 503]) {
      await expect(send(status)).rejects.toMatchObject({ code: `http_${status}`, retryable: true });
    }
    for (const status of [400, 401, 403, 422]) {
      await expect(send(status)).rejects.toMatchObject({
        code: `http_${status}`,
        retryable: false,
      });
    }
  });

  it("treats a network failure and a timeout as retryable, with a short code only", async () => {
    const failing = (error: Error) =>
      createResendMailer({
        apiKey: "k",
        fetchImpl: async () => {
          throw error;
        },
      }).send(mail);
    await expect(failing(new TypeError("fetch failed: secret"))).rejects.toMatchObject({
      code: "network",
      retryable: true,
    });
    const timeout = Object.assign(new Error("slow"), { name: "TimeoutError" });
    await expect(failing(timeout)).rejects.toMatchObject({ code: "timeout", retryable: true });
    await expect(failing(new TypeError("secret"))).rejects.toBeInstanceOf(MailError);
  });
});

describe("getMailConfig", () => {
  const stub: Mailer = { send: async () => {} };
  const env = {
    RESEND_API_KEY: "re_x",
    EMAIL_FROM: "XSignOn <hello@mail.example.com>",
    ENQUIRY_INBOX: "team@example.com",
  };

  it("is null (nothing is sent) when anything is missing or malformed", () => {
    expect(getMailConfig({}, stub)).toBeNull();
    for (const key of Object.keys(env)) {
      expect(getMailConfig({ ...env, [key]: "" }, stub), key).toBeNull();
    }
    expect(getMailConfig({ ...env, ENQUIRY_INBOX: "a@x.com, b@y.com" }, stub)).toBeNull();
    expect(getMailConfig({ ...env, ENQUIRY_INBOX: "a@x.com\nBcc: v@z.com" }, stub)).toBeNull();
    expect(
      getMailConfig({ ...env, EMAIL_FROM: "Name <a@x.com>\r\nBcc: v@z.com" }, stub),
    ).toBeNull();
  });

  it("emails visitors only on Production, and marks every other environment", () => {
    const production = getMailConfig({ ...env, NEXT_PUBLIC_SITE_ENV: "production" }, stub);
    expect(production).toMatchObject({ sendConfirmations: true, subjectPrefix: "" });
    for (const siteEnv of [undefined, "staging", "preview", "development", "ci"]) {
      const config = getMailConfig({ ...env, NEXT_PUBLIC_SITE_ENV: siteEnv }, stub);
      expect(config, String(siteEnv)).toMatchObject({
        sendConfirmations: false,
        subjectPrefix: "[staging] ",
      });
    }
  });
});

describe("the two emails", () => {
  const config = getMailConfig(
    {
      RESEND_API_KEY: "k",
      EMAIL_FROM: "hello@mail.example.com",
      ENQUIRY_INBOX: "team@example.com",
    },
    { send: async () => {} },
  )!;
  const enquiry: EnquiryRow = {
    id: "42",
    name: "Mallory <script>alert(1)</script>",
    email: "victim@example.com",
    company: "Evil Corp",
    phone: null,
    reason: "strategy-call",
    message: "Click https://evil.example/phish now",
    created_at: new Date(),
  };

  it("the team email has the whole enquiry, a fixed subject, and replies to the visitor", () => {
    const m = composeNotification(enquiry, config, "key");
    expect(m).toMatchObject({
      to: "team@example.com",
      replyTo: "victim@example.com",
      subject: "[staging] New website enquiry",
      idempotencyKey: "key",
    });
    expect(m.text).toContain("ID 42");
    expect(m.text).toContain(enquiry.message);
    expect(m.text).toContain("Book a strategy call");
    expect(m.subject).not.toContain("Mallory");
    expect(m.subject).not.toContain("evil");
  });

  it("the visitor's email repeats nothing they typed", () => {
    const m = composeConfirmation(enquiry, config, "key2");
    expect(m.to).toBe("victim@example.com");
    expect(m.replyTo).toBe("team@example.com");
    const everything = `${m.subject}\n${m.text}`;
    for (const typed of [
      "Mallory",
      "script",
      "Evil Corp",
      "evil.example",
      "phish",
      "strategy-call",
    ]) {
      expect(everything, typed).not.toContain(typed);
    }
  });

  it("a name with a line break cannot reach a header: addresses are separate fields", () => {
    const m = composeNotification({ ...enquiry, name: "A\nBcc: x@y.com" }, config, "k");
    expect(m.subject).not.toContain("Bcc");
    expect(m.to).toBe("team@example.com");
  });
});
