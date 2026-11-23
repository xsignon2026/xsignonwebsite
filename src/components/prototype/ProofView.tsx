import Image from "next/image";
import Link from "next/link";
import { CASE_STUDY_PICTURES } from "@/components/prototype/case-study-pictures";
import { PROOF_PICTURES } from "@/components/prototype/proof-pictures";
import type { ProofPageContent } from "@/types/proof-page-content";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function ProofView({ content }: { content: ProofPageContent }) {
  return (
    <div id="view-proof">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <span className="cur">Proof</span>
          </nav>
          <h1 className="h-display">{content.hero.title}</h1>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="body-copy">
              <p>
                <b>{content.intro.bold}</b> {content.intro.text}
              </p>
            </div>
            <div className="case-grid" style={{ marginTop: "44px" }}>
              {content.cards.map((card) => {
                // The real case study picture when there is one, otherwise the picture chosen for the card.
                const real = CASE_STUDY_PICTURES[card.href.replace("/proof/", "")]?.hero;
                const picture = real ?? PROOF_PICTURES[card.picture];
                return (
                  <article className="case-card rv" key={card.href}>
                    <div className="case-photo">
                      <Image src={picture.src} alt={picture.alt} width={1200} height={800} />
                    </div>
                    <div className="pmeta">
                      {card.tags.map((tag) => (
                        <span className="ptag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="h3">{card.title}</h2>
                    <p>{card.summary}</p>
                    <span className="status-chip">
                      <b>{card.noteLabel}:</b> {card.noteText}
                    </span>
                    <Link className="link-arrow" href={card.href}>
                      Read the case study{" "}
                      <span className="arr" aria-hidden="true">
                        &#8594;
                      </span>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">{content.roi.title}</h2>
            </div>
            <div className="body-copy">
              <p>{content.roi.text}</p>
            </div>
            <div style={{ marginTop: "28px" }}>
              <Link className="link-arrow" href={content.roi.link.href}>
                {content.roi.link.label}{" "}
                <span className="arr" aria-hidden="true">
                  &#8594;
                </span>
              </Link>
            </div>
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
