import { Fragment } from "react";
import Link from "next/link";
import { NewsletterSubscribe } from "@/components/thinking/NewsletterSubscribe";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";
import type { Article } from "@/types/article";

// One article page, from the article's content (the built-in text, or the editors' version from Sanity).
export function ArticleView({ article }: { article: Article }) {
  return (
    <div id={`view-article-${article.slug}`} className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/thinking">Our thinking</Link>
            <span className="sep">/</span>
            <span className="cur">{article.crumb ?? article.title}</span>
          </nav>
          <h1 className="h-display">{article.title}</h1>
          <div className="pmeta">
            <span className="ptag">{article.author}</span>
            <span className="ptag">{article.date}</span>
          </div>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="art-body">
              {article.sections.map((section) => (
                <Fragment key={section.heading}>
                  <h3 className="h3">{section.heading}</h3>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.pullQuote && <div className="pull">{section.pullQuote}</div>}
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <NewsletterSubscribe popup sourcePage={`/thinking/${article.slug}`} />
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            {article.relatedLinks.map((link) => (
              <Link className="rel-row rv" href={link.href} key={link.href}>
                <span className="t">{link.title}</span>
                <span className="d">{link.type}</span>
              </Link>
            ))}
          </div>
        </section>
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
