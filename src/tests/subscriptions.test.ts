import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { Db } from "@/lib/db/types";
import { generateUnsubscribeToken, verifyUnsubscribeToken } from "@/lib/newsletter/tokens";
import { signedDownloadPath, verifySignedDownload } from "@/lib/storage/signed-urls";
import {
  cleanup,
  confirmVerification,
  logDownload,
  mayDownload,
  requestVerification,
  suppress,
  unsubscribe,
} from "@/lib/subscriptions/core";
import { isValidSvixSignature } from "@/lib/svix-signature";
import { createTestDb } from "./helpers/pglite-db";

let db: Db;
let close: () => Promise<void>;
beforeEach(async () => {
  const made = await createTestDb();
  db = made.db;
  close = () => made.pg.close();
});
afterEach(() => close());

const ask = (email: string, purpose: "newsletter" | "whitepaper_download" = "newsletter") =>
  requestVerification(db, {
    email,
    purpose,
    targetSlug: purpose === "whitepaper_download" ? "zero-trust-posture-guide" : undefined,
    sourcePage: "/thinking",
    wordingVersion: "v1-2026-global",
  });

const count = async (table: string) =>
  Number((await db.query<{ n: string }>(`select count(*) as n from ${table}`)).rows[0].n);

describe("confirming a sign-up", () => {
  it("stores only a hash of the token, never the token", async () => {
    const token = (await ask("a@example.com"))!;
    const { rows } = await db.query<{ token_hash: string }>(`select token_hash from verifications`);
    expect(rows[0].token_hash).not.toContain(token);
    expect(rows[0].token_hash).toHaveLength(64);
  });

  it("records the subscriber only after the link is used", async () => {
    const token = (await ask("a@example.com"))!;
    expect(await count("subscribers")).toBe(0);
    const result = await confirmVerification(db, token, "iphash");
    expect(result.status).toBe("ok");
    expect(await count("subscribers")).toBe(1);
  });

  it("works exactly once", async () => {
    const token = (await ask("a@example.com"))!;
    expect((await confirmVerification(db, token, "h")).status).toBe("ok");
    expect((await confirmVerification(db, token, "h")).status).toBe("used");
  });

  it("two requests at the same moment cannot both win", async () => {
    const token = (await ask("a@example.com"))!;
    const results = await Promise.all([
      confirmVerification(db, token, "h"),
      confirmVerification(db, token, "h"),
    ]);
    expect(results.filter((r) => r.status === "ok")).toHaveLength(1);
  });

  it("rejects an unknown token and an expired one", async () => {
    expect((await confirmVerification(db, "nope-nope-nope-nope-nope", "h")).status).toBe("invalid");
    const token = (await ask("a@example.com"))!;
    await db.query(`update verifications set expires_at = now() - interval '1 minute'`);
    expect((await confirmVerification(db, token, "h")).status).toBe("expired");
    expect(await count("subscribers")).toBe(0);
  });

  it("a bounced address can never confirm", async () => {
    const token = (await ask("a@example.com"))!;
    await suppress(db, "a@example.com", "bounced");
    expect((await confirmVerification(db, token, "h")).status).toBe("bounced");
    expect(await count("subscribers")).toBe(0);
  });
});

describe("who gets an email", () => {
  it("nothing is sent (null) to a blocked address or an active subscriber", async () => {
    await suppress(db, "blocked@example.com", "complained");
    expect(await ask("blocked@example.com")).toBeNull();

    const token = (await ask("a@example.com"))!;
    await confirmVerification(db, token, "h");
    expect(await ask("a@example.com")).toBeNull();
  });

  it("someone who unsubscribed can subscribe again", async () => {
    await confirmVerification(db, (await ask("a@example.com"))!, "h");
    await unsubscribe(db, "a@example.com");
    const again = await ask("a@example.com");
    expect(again).not.toBeNull();
    await confirmVerification(db, again!, "h");
    const { rows } = await db.query<{ unsubscribed_at: string | null }>(
      `select unsubscribed_at from subscribers`,
    );
    expect(rows[0].unsubscribed_at).toBeNull();
  });
});

describe("white paper downloads", () => {
  it("needs a confirmation for that paper, and a bounce cancels it", async () => {
    const token = (await ask("a@example.com", "whitepaper_download"))!;
    const result = await confirmVerification(db, token, "h");
    if (result.status !== "ok") throw new Error("not confirmed");
    const slug = "zero-trust-posture-guide";

    expect(await mayDownload(db, result.verificationId, slug)).toBe(true);
    expect(await mayDownload(db, result.verificationId, "another-paper")).toBe(false);
    expect(await mayDownload(db, "00000000-0000-0000-0000-000000000000", slug)).toBe(false);

    await suppress(db, "a@example.com", "bounced");
    expect(await mayDownload(db, result.verificationId, slug)).toBe(false);
  });

  it("a newsletter confirmation does not open a download", async () => {
    const result = await confirmVerification(db, (await ask("a@example.com"))!, "h");
    if (result.status !== "ok") throw new Error("not confirmed");
    expect(await mayDownload(db, result.verificationId, "zero-trust-posture-guide")).toBe(false);
  });
});

describe("housekeeping", () => {
  it("removes old unconfirmed requests and old download records, keeps confirmed ones", async () => {
    await ask("old@example.com");
    const keep = (await ask("keep@example.com", "whitepaper_download"))!;
    const kept = await confirmVerification(db, keep, "h");
    if (kept.status !== "ok") throw new Error("not confirmed");
    await logDownload(db, kept.verificationId, "zero-trust-posture-guide");
    await db.query(`update verifications set created_at = now() - interval '8 days'`);
    await db.query(`update download_log set downloaded_at = now() - interval '91 days'`);

    const report = await cleanup(db);
    expect(report).toEqual({ unconfirmed: 1, downloads: 1 });
    expect(await count("verifications")).toBe(1);
  });
});

describe("signed download links", () => {
  const id = "11111111-1111-4111-8111-111111111111";
  const parse = (path: string) => new URL(path, "http://x").searchParams;

  it("accepts its own link and carries no email address", () => {
    const params = parse(signedDownloadPath("paper", id, 1000, 60_000));
    expect([...params.keys()].sort()).toEqual(["expires", "sig", "slug", "v"]);
    expect(
      verifySignedDownload("paper", id, params.get("expires")!, params.get("sig")!, 2000),
    ).toEqual({ valid: true });
  });

  it("refuses an expired link, a changed paper, a changed confirmation and a changed expiry", () => {
    const params = parse(signedDownloadPath("paper", id, 1000, 60_000));
    const sig = params.get("sig")!;
    const expires = params.get("expires")!;
    expect(verifySignedDownload("paper", id, expires, sig, 61_001)).toEqual({
      valid: false,
      reason: "expired",
    });
    expect(verifySignedDownload("other", id, expires, sig, 2000).valid).toBe(false);
    expect(verifySignedDownload("paper", id.replace("1", "2"), expires, sig, 2000).valid).toBe(
      false,
    );
    expect(
      verifySignedDownload("paper", id, String(Number(expires) + 99999), sig, 2000).valid,
    ).toBe(false);
  });
});

describe("unsubscribe tokens", () => {
  it("work for the address they were made for, in any letter case, and no other", () => {
    const token = generateUnsubscribeToken("A@Example.com");
    expect(verifyUnsubscribeToken("a@example.com", token)).toBe(true);
    expect(verifyUnsubscribeToken("b@example.com", token)).toBe(false);
    expect(verifyUnsubscribeToken("a@example.com", "")).toBe(false);
  });
});

describe("Resend webhook signatures (Svix)", () => {
  const secretBytes = Buffer.from("0123456789abcdef0123456789abcdef");
  const secret = `whsec_${secretBytes.toString("base64")}`;
  const body = '{"type":"email.bounced"}';
  const now = 1_700_000_000_000;
  const sign = (id: string, ts: string, text: string) =>
    createHmac("sha256", secretBytes).update(`${id}.${ts}.${text}`).digest("base64");
  const ts = String(now / 1000);

  it("accepts a good signature, also when several are listed", () => {
    const good = `v1,${sign("msg_1", ts, body)}`;
    const headers = (signature: string) => ({ id: "msg_1", timestamp: ts, signature });
    expect(isValidSvixSignature(body, headers(good), secret, now)).toBe(true);
    expect(isValidSvixSignature(body, headers(`v1,AAAA ${good}`), secret, now)).toBe(true);
  });

  it("refuses a changed body, a wrong secret, an old timestamp and missing headers", () => {
    const signature = `v1,${sign("msg_1", ts, body)}`;
    const headers = { id: "msg_1", timestamp: ts, signature };
    expect(isValidSvixSignature(body + " ", headers, secret, now)).toBe(false);
    expect(isValidSvixSignature(body, headers, "whsec_AAAAAAAA", now)).toBe(false);
    expect(isValidSvixSignature(body, headers, secret, now + 6 * 60 * 1000)).toBe(false);
    expect(isValidSvixSignature(body, { ...headers, signature: null }, secret, now)).toBe(false);
  });
});
