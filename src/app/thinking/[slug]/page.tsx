import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import {
  getAllArticles,
  getArticleBySlug,
  isValidArticleSlug,
  resolveArticleCanonicalSlug,
} from "@/lib/article";
import { HeroBeams } from "@/components/home/HeroBeams";
import { ReadingProgressBar } from "@/components/thinking/ReadingProgressBar";
import { NewsletterSubscribe } from "@/components/thinking/NewsletterSubscribe";
import { JsonLd } from "@/components/common/JsonLd";
import { createArticleSchema, createBreadcrumbSchema } from "@/lib/schema-org";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidArticleSlug(slug)) {
    return { title: "Article Not Found | XSignOn" };
  }

  const article = await getArticleBySlug(slug);
  if (!article) {
    return { title: "Article Not Found | XSignOn" };
  }

  return {
    title: `${article.title} | XSignOn Thinking`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isValidArticleSlug(slug)) {
    notFound();
  }

  const canonicalSlug = resolveArticleCanonicalSlug(slug);
  if (!canonicalSlug) {
    notFound();
  }

  // If accessed by alias (e.g. article-identity-first), 308 redirect to canonical URL
  if (slug !== canonicalSlug) {
    permanentRedirect(`/thinking/${canonicalSlug}`);
  }

  const article = await getArticleBySlug(canonicalSlug);
  if (!article) {
    notFound();
  }

  const articleSchema = createArticleSchema({
    title: article.title,
    excerpt: article.excerpt,
    date: article.date,
    author: article.author,
    slug: article.slug,
  });

  const breadcrumbsSchema = createBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Thinking", url: "/thinking" },
    { name: article.title, url: `/thinking/${article.slug}` },
  ]);

  return (
    <div id={`view-article-${article.slug}`} className="res-view">
      {/* Unobtrusive reading progress line at top of page */}
      <ReadingProgressBar />

      {/* JSON-LD Structured Data */}
      <JsonLd schema={[articleSchema, breadcrumbsSchema]} />

      {/* Page Hero with Interactive Beams */}
      <section className="page-hero has-beams" data-nav="dark">
        <HeroBeams />
        <div className="page-fade" aria-hidden="true" />
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/thinking">Our thinking</Link>
            <span className="sep">/</span>
            <span className="cur">{article.topic}</span>
          </nav>
          <h1 className="h-display">{article.title}</h1>
          <div className="pmeta">
            <span className="ptag">{article.author}</span>
            <span className="ptag">{article.date}</span>
          </div>
        </div>
      </section>

      {/* Light Content Band */}
      <div data-nav="light">
        {/* Article Body: Calm Reading Column */}
        <section className="page-sec">
          <div className="wrap">
            <div className="art-body">
              {article.sections.map((section, idx) => (
                <div key={idx}>
                  <h3 className="h3">{section.heading}</h3>
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                  {section.pullQuote && <div className="pull">{section.pullQuote}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Items Section */}
        {article.relatedLinks.length > 0 && (
          <section className="page-sec">
            <div className="wrap">
              <div className="sec-head rv">
                <h2 className="h2">Related</h2>
              </div>
              {article.relatedLinks.map((link, idx) => (
                <Link key={idx} className="rel-row rv" href={link.href}>
                  <span className="t">{link.title}</span>
                  <span className="d">{link.type}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Optional Related White Paper Slot */}
        {article.relatedWhitePaper && (
          <section className="page-sec">
            <div className="wrap">
              <div className="sec-head rv">
                <h2 className="h2">Related White Paper</h2>
              </div>
              <div className="bcard rv">
                <div className="pmeta">
                  <span className="pill-cat">White Paper</span>
                </div>
                <h3 className="h3" style={{ marginTop: "14px" }}>
                  {article.relatedWhitePaper.title}
                </h3>
                {article.relatedWhitePaper.description && (
                  <p>{article.relatedWhitePaper.description}</p>
                )}
                <Link className="link-arrow" href={article.relatedWhitePaper.href}>
                  Download White Paper{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Subscription Band */}
        <section className="page-sec">
          <div className="wrap">
            <NewsletterSubscribe sourcePage={`/thinking/${article.slug}`} />
          </div>
        </section>

        {/* Closing Strategy CTA */}
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">{article.ctaHeadline}</h2>
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
