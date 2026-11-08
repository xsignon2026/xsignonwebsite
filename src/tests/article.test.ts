import { describe, expect, it } from "vitest";
import {
  getAllArticles,
  getArticleBySlug,
  getFeaturedArticle,
  isValidArticleSlug,
  resolveArticleCanonicalSlug,
} from "@/lib/article";

describe("Epic E09: Article Data, Aliases & Security Verification (T-113 to T-120)", () => {
  it("T-113: returns all 5 canonical articles in sequence", async () => {
    const articles = await getAllArticles();
    expect(articles.length).toBe(5);

    expect(articles[0].slug).toBe("identity-first-controls");
    expect(articles[1].slug).toBe("data-and-ai-security");
    expect(articles[2].slug).toBe("modern-micro-segmentation");
    expect(articles[3].slug).toBe("non-human-identities");
    expect(articles[4].slug).toBe("agentic-ai-cybersecurity");

    for (const art of articles) {
      expect(art.title).toBeTruthy();
      expect(art.excerpt).toBeTruthy();
      expect(art.author).toBe("XSignOn Team");
      expect(art.date).toBe("June 29, 2026");
      expect(art.topic).toBeTruthy();
      expect(art.readingTime).toBeTruthy();
      expect(art.sections.length).toBeGreaterThanOrEqual(3);
      expect(art.pullQuote).toBeTruthy();
      expect(art.relatedLinks.length).toBeGreaterThan(0);
      expect(art.ctaHeadline).toBeTruthy();
    }
  });

  it("T-114: retrieves the featured article correctly", async () => {
    const featured = await getFeaturedArticle();
    expect(featured).not.toBeNull();
    expect(featured?.slug).toBe("identity-first-controls");
    expect(featured?.title).toBe(
      "Elevate Enterprise Security with Identity-First Controls"
    );
    expect(featured?.featured).toBe(true);
  });

  it("T-116: retrieves Identity-First Controls article and resolves aliases", async () => {
    const article = await getArticleBySlug("identity-first-controls");
    expect(article).not.toBeNull();
    expect(article?.topic).toBe("Identity-First");
    expect(article?.sections[0].heading).toBe("The login screen is the smallest change");
    expect(article?.ctaHeadline).toBe("Plan a rollout in the right order.");

    const byAlias = await getArticleBySlug("article-identity-first");
    expect(byAlias?.slug).toBe("identity-first-controls");
  });

  it("T-117: retrieves Data + AI Security article and resolves aliases", async () => {
    const article = await getArticleBySlug("data-and-ai-security");
    expect(article).not.toBeNull();
    expect(article?.topic).toBe("Data + AI");
    expect(article?.sections[0].heading).toBe(
      "The questions arrive before the evidence exists"
    );
    expect(article?.ctaHeadline).toBe("Have evidence before the letter arrives.");

    const byAlias = await getArticleBySlug("article-data-ai");
    expect(byAlias?.slug).toBe("data-and-ai-security");
  });

  it("T-118: retrieves Modern Micro-Segmentation article and resolves aliases", async () => {
    const article = await getArticleBySlug("modern-micro-segmentation");
    expect(article).not.toBeNull();
    expect(article?.topic).toBe("Zero Trust");
    expect(article?.sections[0].heading).toBe("Segments shaped around identity");
    expect(article?.ctaHeadline).toBe("Draw segments around identity.");

    const byAlias = await getArticleBySlug("article-microseg");
    expect(byAlias?.slug).toBe("modern-micro-segmentation");
  });

  it("T-119: retrieves Non-Human Identities article and resolves aliases", async () => {
    const article = await getArticleBySlug("non-human-identities");
    expect(article).not.toBeNull();
    expect(article?.topic).toBe("Non-Human Identity");
    expect(article?.sections[0].heading).toBe(
      "The identities doing the work are changing"
    );
    expect(article?.ctaHeadline).toBe("Govern every identity, human or not.");

    const byAlias = await getArticleBySlug("article-nonhuman");
    expect(byAlias?.slug).toBe("non-human-identities");
  });

  it("T-120: retrieves Agentic AI Cybersecurity article and resolves aliases", async () => {
    const article = await getArticleBySlug("agentic-ai-cybersecurity");
    expect(article).not.toBeNull();
    expect(article?.topic).toBe("Agentic AI");
    expect(article?.sections[0].heading).toBe("Agents that work in teams");
    expect(article?.ctaHeadline).toBe("Put agents to work, with owners.");

    const byAlias = await getArticleBySlug("article-agentic");
    expect(byAlias?.slug).toBe("agentic-ai-cybersecurity");
  });

  it("security: validates slug pattern and rejects path traversal, uppercase, and injection", () => {
    expect(isValidArticleSlug("identity-first-controls")).toBe(true);
    expect(isValidArticleSlug("article-data-ai")).toBe(true);

    expect(isValidArticleSlug("../etc/passwd")).toBe(false);
    expect(isValidArticleSlug("Article_Invalid")).toBe(false);
    expect(isValidArticleSlug("<script>")).toBe(false);
    expect(isValidArticleSlug("")).toBe(false);
    expect(isValidArticleSlug("a".repeat(100))).toBe(false);

    expect(resolveArticleCanonicalSlug("../exploit")).toBeNull();
  });

  it("security: getArticleBySlug returns null for invalid or malicious slugs", async () => {
    expect(await getArticleBySlug("../admin")).toBeNull();
    expect(await getArticleBySlug("invalid<tags>")).toBeNull();
    expect(await getArticleBySlug("unknown-non-existent-article")).toBeNull();
  });
});
