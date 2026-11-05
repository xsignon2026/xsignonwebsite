import { afterEach, describe, expect, it, vi } from "vitest";

// The Sentry host comes from the DSN at import time, so each case sets the variable and re-imports.
async function siteCsp() {
  vi.resetModules();
  const { buildCsp, SITE_SOURCES } = await import("../lib/csp");
  return buildCsp(SITE_SOURCES);
}

describe("Sentry host in the CSP", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("is added to connect-src from the DSN, whatever the region", async () => {
    vi.stubEnv("NEXT_PUBLIC_SENTRY_DSN", "https://key@o123.ingest.us.sentry.io/456");
    expect(await siteCsp()).toContain("o123.ingest.us.sentry.io");
  });

  it("is absent when there is no DSN or the DSN is not a valid address", async () => {
    vi.stubEnv("NEXT_PUBLIC_SENTRY_DSN", "");
    expect(await siteCsp()).not.toContain("sentry");
    vi.stubEnv("NEXT_PUBLIC_SENTRY_DSN", "not a url");
    expect(await siteCsp()).not.toContain("sentry");
  });
});
