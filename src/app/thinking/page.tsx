import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, getFeaturedArticle } from "@/lib/article";
import { HeroBeams } from "@/components/home/HeroBeams";
import { ArticleCard } from "@/components/thinking/ArticleCard";
import { NewsletterSubscribe } from "@/components/thinking/NewsletterSubscribe";

export const metadata: Metadata = {
  title: "Our thinking | XSignOn",
  description:
    "Practical perspectives on identity governance, AI security, micro-segmentation, and zero-trust engineering.",
};

export default async function ThinkingHubPage() {
  const [articles, featuredArticle] = await Promise.all([
    getAllArticles(),
    getFeaturedArticle(),
  ]);

  const gridArticles = articles.filter(
    (art) => art.slug !== featuredArticle?.slug
  );

  return (
    <div id="view-thinking" className="res-view">
      {/* Page Hero with Interactive Beams */}
      <section className="page-hero has-beams" data-nav="dark">
        <HeroBeams />
        <div className="page-fade" aria-hidden="true" />
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Our thinking</span>
          </nav>
          <h1 className="h-display">Our thinking</h1>
        </div>
      </section>

      {/* Main Content Area */}
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            {/* Featured Article Card */}
            {featuredArticle && (
              <ArticleCard article={featuredArticle} featured={true} />
            )}

            {/* Grid of Other Articles */}
            <div className="case-grid" style={{ marginTop: "34px" }}>
              {gridArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {/* Link to Industry Thinking */}
            <div style={{ marginTop: "34px" }}>
              <Link className="link-arrow" href="/thinking/industry">
                Industry Thinking: practical thinking for security, governance, and growth{" "}
                <span className="arr" aria-hidden="true">
                  &#8594;
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription Band */}
        <section className="page-sec">
          <div className="wrap">
            <NewsletterSubscribe sourcePage="/thinking" />
          </div>
        </section>

        {/* Closing CTA */}
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">Discuss what you are reading.</h2>
              <Link className="btn btn-white" href="/contact">
                Book a strategy call{" "}
                <span className="chev" aria-hidden="true">
                  &#8250;
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
