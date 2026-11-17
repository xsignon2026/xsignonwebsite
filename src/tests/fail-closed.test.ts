import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST as cleanup } from "@/app/api/cron/cleanup/route";
import { POST as webhook } from "@/app/api/webhooks/email/route";
import { requireSecret } from "@/lib/require-secret";

vi.mock("next/server", async (original) => ({
  ...(await original<typeof import("next/server")>()),
  connection: async () => {},
}));

afterEach(() => vi.unstubAllEnvs());

const call = (url: string, headers: Record<string, string> = {}) =>
  new NextRequest(`http://localhost${url}`, { method: "POST", headers, body: "{}" });

describe("routes that need a secret refuse to run without one", () => {
  it("rejects cron cleanup when CRON_SECRET is not set", async () => {
    vi.stubEnv("CRON_SECRET", "");
    expect((await cleanup(call("/api/cron/cleanup"))).status).toBe(401);
  });

  it("rejects the email webhook when its secret is not set, even with a header", async () => {
    vi.stubEnv("RESEND_WEBHOOK_SECRET", "");
    const res = await webhook(
      call("/api/webhooks/email", {
        "svix-id": "a",
        "svix-timestamp": "1",
        "svix-signature": "v1,x",
      }),
    );
    expect(res.status).toBe(401);
  });

  it("rejects a wrong secret", async () => {
    vi.stubEnv("RESEND_WEBHOOK_SECRET", "whsec_dGVzdC1zZWNyZXQtdmFsdWU=");
    const res = await webhook(
      call("/api/webhooks/email", {
        "svix-id": "a",
        "svix-timestamp": "1",
        "svix-signature": "v1,x",
      }),
    );
    expect(res.status).toBe(401);
  });
});

describe("requireSecret", () => {
  it("throws outside tests when nothing is configured", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SIGNED_URL_SECRET", "");
    expect(() => requireSecret("SIGNED_URL_SECRET")).toThrow(/Missing secret/);
  });

  it("rejects a short secret", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SIGNED_URL_SECRET", "short");
    expect(() => requireSecret("SIGNED_URL_SECRET")).toThrow();
  });

  it("accepts a long secret", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SIGNED_URL_SECRET", "x".repeat(40));
    expect(requireSecret("SIGNED_URL_SECRET")).toHaveLength(40);
  });
});
