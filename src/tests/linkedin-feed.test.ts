import { describe, it, expect, vi, beforeEach } from "vitest";
import { INITIAL_LINKEDIN_POSTS } from "@/data/linkedin-posts";
import { NextRequest } from "next/server";

vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return {
    ...actual,
    connection: async () => {},
  };
});

import { POST } from "@/app/api/cron/sync-linkedin/route";

describe("LinkedIn Feed - Data Integrity", () => {
  it("provides valid initial LinkedIn posts matching schema", () => {
    expect(INITIAL_LINKEDIN_POSTS.length).toBeGreaterThan(0);

    for (const post of INITIAL_LINKEDIN_POSTS) {
      expect(post.id).toBeDefined();
      expect(post.urn).toMatch(/^urn:li:/);
      expect(post.authorName).toBe("XSignOn");
      expect(post.url).toContain("linkedin.com");
      expect(post.text.length).toBeGreaterThan(20);
      expect(new Date(post.publishedAt).getTime()).not.toBeNaN();
      expect(post.likesCount).toBeGreaterThanOrEqual(0);
    }
  });

  it("contains relevant identity security topics in post badges", () => {
    const badges = INITIAL_LINKEDIN_POSTS.map((p) => p.badge);
    expect(badges).toContain("Identity-First");
    expect(badges).toContain("Agentic AI");
    expect(badges).toContain("Zero Trust");
  });
});

describe("LinkedIn Daily Sync Cron - Route & Security", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  it("rejects unauthorized cron requests when CRON_SECRET is configured", async () => {
    process.env.CRON_SECRET = "super-secret-cron-key-123456";

    const request = new NextRequest("http://localhost:3000/api/cron/sync-linkedin", {
      method: "POST",
      headers: {
        authorization: "Bearer wrong-secret",
      },
    });

    const response = await POST(request);
    expect(response.status).toBe(401);

    const data = await response.json();
    expect(data.error).toBe("Unauthorized");
  });

  it("authorizes cron request with matching CRON_SECRET and returns sync payload", async () => {
    process.env.CRON_SECRET = "super-secret-cron-key-123456";

    const request = new NextRequest("http://localhost:3000/api/cron/sync-linkedin", {
      method: "POST",
      headers: {
        authorization: "Bearer super-secret-cron-key-123456",
      },
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.postsCount).toBe(INITIAL_LINKEDIN_POSTS.length);
    expect(data.source).toBe("fallback");
    expect(data.syncedAtCST).toBeDefined();
    expect(typeof data.syncedAtCST).toBe("string");
  });

  it("formats CST timezone correctly for America/Chicago 9:00 AM schedule", () => {
    const cstFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // Test fixed winter time (CST UTC-6)
    const winterDate = new Date("2026-01-15T15:00:00.000Z");
    const winterFormatted = cstFormatter.format(winterDate);
    expect(winterFormatted).toContain("9:00:00");

    // Test fixed summer time (CDT UTC-5)
    const summerDate = new Date("2026-07-15T14:00:00.000Z");
    const summerFormatted = cstFormatter.format(summerDate);
    expect(summerFormatted).toContain("9:00:00");
  });
});
