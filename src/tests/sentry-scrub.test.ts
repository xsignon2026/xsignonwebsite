import type { ErrorEvent } from "@sentry/nextjs";
import { describe, expect, it } from "vitest";
import { scrubBreadcrumb, scrubEvent } from "../lib/sentry-scrub";

describe("scrubEvent", () => {
  it("removes form data, cookies, query string, auth headers and the user", () => {
    const event = {
      type: undefined,
      user: { email: "a@b.com", ip_address: "1.2.3.4" },
      request: {
        url: "https://xsignon.com/verify?token=secret#also-secret",
        query_string: "token=secret",
        cookies: { session: "x" },
        data: { email: "a@b.com", message: "hello" },
        headers: { authorization: "Bearer x", cookie: "a=b", "user-agent": "UA" },
      },
    } as ErrorEvent;

    const out = scrubEvent(event);

    expect(out.request?.data).toBeUndefined();
    expect(out.request?.cookies).toBeUndefined();
    expect(out.request?.query_string).toBeUndefined();
    expect(out.request?.url).toBe("https://xsignon.com/verify");
    expect(out.request?.headers).toEqual({ "user-agent": "UA" });
    expect(out.user).toBeUndefined();
    expect(JSON.stringify(out)).not.toContain("a@b.com");
  });

  it("passes an event with no request through", () => {
    expect(scrubEvent({ type: undefined, message: "boom" } as ErrorEvent).message).toBe("boom");
  });
});

describe("scrubBreadcrumb", () => {
  it("drops typing breadcrumbs", () => {
    expect(scrubBreadcrumb({ category: "ui.input", message: "input#email" })).toBeNull();
  });

  it("strips query strings from request breadcrumbs", () => {
    const crumb = scrubBreadcrumb({ category: "fetch", data: { url: "/api/x?token=abc" } });
    expect(crumb?.data?.url).toBe("/api/x");
  });

  it("strips query strings and fragments from navigation breadcrumbs", () => {
    const crumb = scrubBreadcrumb({
      category: "navigation",
      data: { from: "/subscribe/verify?token=abc", to: "/done?x=1#frag" },
    });
    expect(crumb?.data).toEqual({ from: "/subscribe/verify", to: "/done" });
  });
});
