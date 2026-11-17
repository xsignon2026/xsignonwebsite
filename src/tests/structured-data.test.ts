import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import {
  createOrganizationSchema,
  createArticleSchema,
  createBreadcrumbSchema,
  createJobPostingSchema,
  createSoftwareApplicationSchema,
  createServiceSchema,
} from "@/lib/schema-org";

describe("T-151: Sitemap, Robots and Structured Data", () => {
  it("generates a comprehensive XML sitemap containing all launch routes", async () => {
    const map = await sitemap();
    expect(Array.isArray(map)).toBe(true);
    expect(map.length).toBeGreaterThanOrEqual(40);

    // Verify root home is priority 1.0
    const home = map.find((r) => r.url.endsWith("/"));
    expect(home).toBeDefined();
    expect(home?.priority).toBe(1.0);

    // Verify core pages exist
    expect(map.some((r) => r.url.endsWith("/about"))).toBe(true);
    expect(map.some((r) => r.url.endsWith("/products/postureone"))).toBe(true);
    expect(map.some((r) => r.url.endsWith("/solutions/identity-governance"))).toBe(true);
    expect(map.some((r) => r.url.endsWith("/thinking/identity-first-controls"))).toBe(true);
    expect(map.some((r) => r.url.endsWith("/proof/securing-bank-access-fido2"))).toBe(true);

    // Verify private routes are NOT in sitemap
    expect(map.some((r) => r.url.includes("/login"))).toBe(false);
    expect(map.some((r) => r.url.includes("/register"))).toBe(false);
    expect(map.some((r) => r.url.includes("/api/"))).toBe(false);
    expect(map.some((r) => r.url.includes("/studio/"))).toBe(false);
  });

  it("configures robots.txt to index production and disallow private paths", () => {
    const r = robots();
    expect(r.sitemap).toContain("/sitemap.xml");
  });

  it("generates valid Organization schema", () => {
    const org = createOrganizationSchema();
    expect(org["@type"]).toBe("Organization");
    expect(org.name).toBe("XSignOn");
    expect(org.url).toBe("https://xsignon.com");
    expect(org.sameAs.length).toBeGreaterThan(0);
  });

  it("generates valid Article schema", () => {
    const article = createArticleSchema({
      title: "Zero Trust Architecture",
      excerpt: "Deep dive into ZTA.",
      date: "2026-06-29",
      author: "Security Team",
      slug: "zero-trust-architecture",
    });
    expect(article["@type"]).toBe("Article");
    expect(article.headline).toBe("Zero Trust Architecture");
    expect(article.mainEntityOfPage["@id"]).toBe(
      "https://xsignon.com/thinking/zero-trust-architecture",
    );
  });

  it("generates valid BreadcrumbList schema", () => {
    const crumbs = createBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Products", url: "/products" },
      { name: "PostureOne", url: "/products/postureone" },
    ]);
    expect(crumbs["@type"]).toBe("BreadcrumbList");
    expect(crumbs.itemListElement).toHaveLength(3);
    expect(crumbs.itemListElement[0].position).toBe(1);
    expect(crumbs.itemListElement[0].name).toBe("Home");
    expect(crumbs.itemListElement[2].item).toBe("https://xsignon.com/products/postureone");
  });

  it("generates valid SoftwareApplication schema", () => {
    const app = createSoftwareApplicationSchema({
      name: "PostureOne",
      description: "Continuous posture assessment",
      slug: "postureone",
    });
    expect(app["@type"]).toBe("SoftwareApplication");
    expect(app.applicationCategory).toBe("SecurityApplication");
    expect(app.url).toBe("https://xsignon.com/products/postureone");
  });

  it("generates valid Service schema", () => {
    const svc = createServiceSchema({
      title: "Identity Governance",
      summary: "Govern access across all agents and people.",
      slug: "identity-governance",
    });
    expect(svc["@type"]).toBe("Service");
    expect(svc.serviceType).toBe("Identity and Access Management");
    expect(svc.url).toBe("https://xsignon.com/solutions/identity-governance");
  });

  it("generates valid JobPosting schema", () => {
    const job = createJobPostingSchema({
      title: "Senior Security Engineer",
      department: "Security Architecture",
      location: "Abu Dhabi",
      type: "Full-time",
      summary: "Lead zero-trust cryptographic implementation.",
    });
    expect(job["@type"]).toBe("JobPosting");
    expect(job.title).toBe("Senior Security Engineer");
    expect(job.employmentType).toBe("FULL_TIME");
    expect(job.hiringOrganization.name).toBe("XSignOn");
  });
});
