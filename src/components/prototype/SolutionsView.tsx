import Link from "next/link";
import { SolutionVideo } from "@/components/home/SolutionVideo";
import { ThinkingShowcase } from "@/components/about/ThinkingShowcase";
import { BeamsCanvas } from "@/components/motion/BeamsCanvas";
import type { Solution } from "@/types/solution";
import type { SolutionsPageContent } from "@/types/solutions-page-content";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// NOTE: the article block inside #solThinkHost is added by hand (the prototype copies it from About).
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
// The same illustrations as "What XSignOn does" on Home. Business Process and Enterprise Technology have none of
// their own yet, so they borrow the closest one (checks and approvals; sign-in and recovery).
const PHOTO: Record<Solution["diagramKey"], "identity" | "ai" | "key" | "atom"> = {
  identity: "identity",
  ai: "ai",
  quantum: "atom",
  process: "ai",
  enterprise: "key",
};

export function SolutionsView({
  content,
  solutions,
}: {
  content: SolutionsPageContent;
  solutions: Solution[];
}) {
  return (
    <div id="view-solutions" className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <BeamsCanvas className="page-beams" />
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Solutions</span>
          </nav>
          <h1 className="h-display">{content.hero.title}</h1>
        </div>
      </section>
      <div>
        <section className="page-sec" id="solList" data-nav="dark">
          <div className="wrap">
            <div className="sol-grid">
              {solutions.map((solution) => (
                <article className="sol-card rv" key={solution.slug}>
                  <div className="sol-photo">
                    <SolutionVideo name={PHOTO[solution.diagramKey]} />
                  </div>
                  <div className="sol-body">
                    <h3>{solution.title}</h3>
                    <p>{solution.summary}</p>
                    <div className="sol-by">
                      <span>Delivered by</span>
                      {solution.deliveredBy.map((name) => (
                        <b key={name}>{name}</b>
                      ))}
                    </div>
                    <Link className="link-arrow" href={`/solutions/${solution.slug}`}>
                      View solution{" "}
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

        <section className="page-sec" id="solMore" data-nav="light">
          <div className="wrap">
            <div className="sec-row rv">
              <h2 className="h2">Enterprise and insights</h2>
            </div>

            <div className="ent-band rv">
              <div className="eb-top">
                <div className="eb-copy">
                  <h3>{content.enterprise.title}</h3>
                  <p>{content.enterprise.text}</p>
                  <Link className="btn btn-white" href={content.enterprise.button.href}>
                    {content.enterprise.button.label}{" "}
                    <span className="chev" aria-hidden="true">
                      &#8250;
                    </span>
                  </Link>
                </div>
                <div className="eb-models">
                  <div className="eb-m">
                    <span className="ic">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 9.5a4.2 4.2 0 0 1 0 8.5z" />
                      </svg>
                    </span>
                    <b>{content.enterprise.models[0].title}</b>
                    <p>{content.enterprise.models[0].text}</p>
                  </div>
                  <div className="eb-m">
                    <span className="ic">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M6 21V4h12v17M4 21h16M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
                      </svg>
                    </span>
                    <b>{content.enterprise.models[1].title}</b>
                    <p>{content.enterprise.models[1].text}</p>
                  </div>
                  <div className="eb-m">
                    <span className="ic">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="5" y="11" width="14" height="9" rx="2" />
                        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                      </svg>
                    </span>
                    <b>{content.enterprise.models[2].title}</b>
                    <p>{content.enterprise.models[2].text}</p>
                  </div>
                </div>
              </div>
              <div className="eb-std">
                <span className="eb-lbl">{content.enterprise.standardsLabel}</span>
                {content.enterprise.standards.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
            </div>

            <div className="sec-row sol-think-head rv">
              <h3 className="h3">{content.thinking.title}</h3>
              <Link className="products-all" href={content.thinking.allLink.href}>
                {content.thinking.allLink.label}{" "}
                <span className="arr" aria-hidden="true">
                  &#8594;
                </span>
              </Link>
            </div>
            <div id="solThinkHost">
              <ThinkingShowcase />
            </div>
          </div>
        </section>
        <section className="cta-sec sm" data-nav="light">
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
