import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Pins the ORDER of checks in the webhook route: secret, size, signature, parse, then refresh.
// Deleting any one of them must make a test here fail.
const revalidateTag = vi.fn();
vi.mock("next/cache", () => ({ revalidateTag }));

const SECRET = "route-test-secret";

function sign(body: string, timestamp = Date.now(), secret = SECRET): string {
  const v1 = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("base64url");
  return `t=${timestamp},v1=${v1}`;
}

function post(body: string, headers: Record<string, string> = {}): Request {
  return new Request("http://localhost/api/revalidate", { method: "POST", body, headers });
}

async function call(request: Request) {
  const { POST } = await import("../app/api/revalidate/route");
  const promise = POST(request as never);
  await vi.runAllTimersAsync(); // skip the settle delay
  return promise;
}

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    revalidateTag.mockClear();
    process.env.SANITY_REVALIDATE_SECRET = SECRET;
  });
  afterEach(() => {
    vi.useRealTimers();
    delete process.env.SANITY_REVALIDATE_SECRET;
  });

  it("fails closed with 500 when no secret is configured", async () => {
    delete process.env.SANITY_REVALIDATE_SECRET;
    const res = await call(post("{}"));
    expect(res.status).toBe(500);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects an oversized body with 413, signed or not", async () => {
    const big = "x".repeat(70 * 1024);
    const res = await call(post(big, { "sanity-webhook-signature": sign(big) }));
    expect(res.status).toBe(413);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("returns 401 for unsigned, wrongly signed and replayed calls, without parsing", async () => {
    const body = '{"_id":"a","_type":"product"}';
    expect((await call(post(body))).status).toBe(401);
    expect((await call(post("{not json", { "sanity-webhook-signature": "t=1,v1=x" }))).status).toBe(
      401,
    );
    expect(
      (await call(post(body, { "sanity-webhook-signature": sign(body, Date.now(), "wrong") })))
        .status,
    ).toBe(401);
    expect(
      (
        await call(
          post(body, { "sanity-webhook-signature": sign(body, Date.now() - 10 * 60 * 1000) }),
        )
      ).status,
    ).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("returns 400 for a signed body that is not valid JSON or has no type", async () => {
    const notJson = "{not json";
    expect((await call(post(notJson, { "sanity-webhook-signature": sign(notJson) }))).status).toBe(
      400,
    );
    const noType = '{"_id":"a"}';
    expect((await call(post(noType, { "sanity-webhook-signature": sign(noType) }))).status).toBe(
      400,
    );
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("ignores drafts and release versions", async () => {
    for (const id of ["drafts.a", "versions.r1.a"]) {
      const body = JSON.stringify({ _id: id, _type: "product" });
      const res = await call(post(body, { "sanity-webhook-signature": sign(body) }));
      expect(res.status).toBe(200);
      expect(await res.json()).toMatchObject({ tags: [] });
    }
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("refreshes the right tags immediately for a valid published change", async () => {
    const body = JSON.stringify({ _id: "p1", _type: "product", slug: "new", previousSlug: "old" });
    const res = await call(post(body, { "sanity-webhook-signature": sign(body) }));
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith("slug:product:old", { expire: 0 });
    expect(revalidateTag).toHaveBeenCalledWith("slug:product:new", { expire: 0 });
    expect(revalidateTag).toHaveBeenCalledWith("type:home", { expire: 0 });
  });
});
