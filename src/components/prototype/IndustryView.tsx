import Link from "next/link";
import { NewsletterSubscribe } from "@/components/thinking/NewsletterSubscribe";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";
import type { IndustryPageContent } from "@/types/last-pages-content";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function IndustryView({ content }: { content: IndustryPageContent }) {
  return (
    <div id="view-industry" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/thinking">Our thinking</Link>
            <span className="sep">/</span>
            <span className="cur">Industry Thinking</span>
          </nav>
          <h1 className="h-display">{content.hero.title}</h1>
          <div className="pmeta">
            <span className="ptag">{content.hero.tag}</span>
          </div>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <article className="bcard rv" style={{ marginBottom: "34px" }}>
              <div className="pmeta">
                <span className="pill-cat">{content.featured.label}</span>
              </div>
              <h3 className="h3" style={{ marginTop: "18px" }}>
                {content.featured.title}
              </h3>
              <p>{content.featured.text}</p>
              <span className="status-chip" style={{ marginTop: "18px" }}>
                <b>{content.featured.noteLabel}:</b> {content.featured.noteText}
              </span>
            </article>
            <div className="case-grid">
              {content.cards.map((card) => (
                <article className="case-card rv" key={card.title}>
                  <h3 className="h4">{card.title}</h3>
                  <p>{card.text}</p>
                  <span className="status-chip">
                    <b>{card.noteLabel}:</b> {card.noteText}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <NewsletterSubscribe sourcePage="/thinking/industry" />
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">{content.cta.title}</h2>
              <Link className="btn btn-white" href={content.cta.button.href}>
                {content.cta.button.label}{" "}
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
