import Image from "next/image";
import Link from "next/link";
import { NewsletterSubscribe } from "@/components/thinking/NewsletterSubscribe";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";
import { CASE_STUDY_PICTURES } from "@/components/prototype/case-study-pictures";
import { THINKING_PICTURES } from "@/components/prototype/thinking-pictures";
import type { CaseStudyPage } from "@/types/case-study-page";
import type { InsightsPageContent } from "@/types/insights-page-content";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
// Article photos live in /public/images/thinking; the card layout is styled under #view-thinking in primitives.css.

export function ThinkingView({
  content,
  caseStudies = [],
}: {
  content: InsightsPageContent;
  caseStudies?: CaseStudyPage[];
}) {
  const featured = content.featured;
  const featuredPicture = THINKING_PICTURES[featured.picture];
  return (
    <div id="view-thinking" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Our thinking</span>
          </nav>
          <h1 className="h-display">{content.hero.title}</h1>
        </div>
      </section>
      <div data-nav="light">
        {caseStudies.length > 0 && (
          <section className="page-sec" id="case-studies">
            <div className="wrap">
              <div className="sec-head rv">
                <h2 className="h2">Case studies</h2>
              </div>
              <div className="cs-feature-grid">
                {(() => {
                  const [first, ...rest] = caseStudies;
                  const pic = (slug: string) => CASE_STUDY_PICTURES[slug]?.hero;
                  const main = pic(first.slug);
                  return (
                    <>
                      <article className="case-card th-card cs-main rv">
                        {main && (
                          <div className="th-img th-card-img">
                            <Image
                              src={main.src}
                              alt={main.alt}
                              fill
                              sizes="(max-width: 900px) 100vw, 620px"
                            />
                          </div>
                        )}
                        <div className="th-card-body">
                          <div className="pmeta">
                            {first.tags.slice(0, 2).map((tag) => (
                              <span className="pill-cat" key={tag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="h3">{first.title}</h3>
                          <p>{first.sections[0]?.paragraphs[0]}</p>
                          <Link className="link-arrow" href={`/proof/${first.slug}`}>
                            Read the case study{" "}
                            <span className="arr" aria-hidden="true">
                              &#8594;
                            </span>
                          </Link>
                        </div>
                      </article>
                      <div className="cs-side">
                        {rest.map((study) => {
                          const picture = pic(study.slug);
                          return (
                            <article className="case-card cs-mini rv" key={study.slug}>
                              {picture && (
                                <div className="cs-mini-img">
                                  <Image src={picture.src} alt={picture.alt} fill sizes="150px" />
                                </div>
                              )}
                              <div className="cs-mini-body">
                                <span className="pill-cat">{study.tags[0]}</span>
                                <h3 className="h4">{study.title}</h3>
                                <Link className="link-arrow" href={`/proof/${study.slug}`}>
                                  Read the case study{" "}
                                  <span className="arr" aria-hidden="true">
                                    &#8594;
                                  </span>
                                </Link>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </section>
        )}
        <section className="page-sec" id="articles">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Articles</h2>
            </div>
            <article className="bcard th-feat rv" style={{ marginBottom: "34px" }}>
              <div className="th-feat-body">
                <div className="pmeta">
                  <span className="pill-cat">{featured.label}</span>
                  <span className="pill-cat">{featured.author}</span>
                  <span className="pill-cat">{featured.date}</span>
                </div>
                <h3 className="h3" style={{ marginTop: "18px" }}>
                  {featured.title}
                </h3>
                <p>{featured.excerpt}</p>
                <Link className="link-arrow" href={featured.href}>
                  {featured.cta}{" "}
                  <span className="arr" aria-hidden="true">
                    &#8594;
                  </span>
                </Link>
              </div>
              <div className="th-img th-feat-img">
                <Image
                  src={featuredPicture.src}
                  alt={featuredPicture.alt}
                  fill
                  priority
                  sizes="(max-width: 760px) 100vw, 560px"
                />
              </div>
            </article>
            <div className="case-grid">
              {content.cards.map((a) => (
                <article key={a.href} className="case-card th-card rv">
                  <div className="th-img th-card-img">
                    <Image
                      src={THINKING_PICTURES[a.picture].src}
                      alt={THINKING_PICTURES[a.picture].alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 400px"
                    />
                  </div>
                  <div className="th-card-body">
                    <div className="pmeta">
                      <span className="pill-cat">{a.author}</span>
                      <span className="pill-cat">{a.date}</span>
                    </div>
                    <h3 className="h4">{a.title}</h3>
                    <p>{a.excerpt}</p>
                    <Link className="link-arrow" href={a.href}>
                      {a.cta}{" "}
                      <span className="arr" aria-hidden="true">
                        &#8594;
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="page-sec" id="newsletter">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Newsletter</h2>
            </div>
            <NewsletterSubscribe popup sourcePage="/thinking" />
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
