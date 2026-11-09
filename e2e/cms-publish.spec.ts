import { test, expect } from "@playwright/test";

test.describe("E2E: CMS Publish-to-Live & Webhook Security", () => {
  test("rejects unauthenticated requests to revalidation webhook with 401 or 500", async ({
    request,
  }) => {
    const response = await request.post("/api/revalidate", {
      data: {
        _id: "test-product-id",
        _type: "product",
      },
    });

    // Unsigned webhook should be rejected
    expect([401, 500]).toContain(response.status());
  });

  test("rejects malformed CSP violation reports with 400", async ({ request }) => {
    const response = await request.post("/api/csp-report", {
      headers: {
        "content-type": "text/plain",
      },
      data: "not json",
    });

    expect(response.status()).toBe(400);
  });
});
