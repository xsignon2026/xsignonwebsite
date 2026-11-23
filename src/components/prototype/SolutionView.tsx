import Link from "next/link";
import type { RelatedSolutionLink, Solution } from "@/types/solution";

function RelatedRows({ rows }: { rows: RelatedSolutionLink[] }) {
  return (
    <>
      {rows.map((row) => (
        <Link className="rel-row rv" href={row.href} key={row.href}>
          <span className="t">{row.title}</span>
          <span className="d">{row.type}</span>
        </Link>
      ))}
    </>
  );
}

// One solution page, from the solution's content (the built-in text, or the editors' version from Sanity).
export function SolutionView({ solution }: { solution: Solution }) {
  return (
    <div id={`view-sol-${solution.slug}`} className="res-view">
      <section className="page-hero has-beams" data-nav="dark">
        <div className="page-fade" aria-hidden="true"></div>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/solutions">Solutions</Link>
            <span className="sep">/</span>
            <span className="cur">{solution.title}</span>
          </nav>
          <h1 className="h-display">{solution.title}</h1>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">What teams come to XSignOn to achieve</h2>
            </div>
            <div className="body-copy">
              <p>{solution.challenge}</p>
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">How XSignOn supports it</h2>
            </div>
            <ul className="feat-list rv">
              {solution.features.map((feature) => (
                <li key={feature.lead}>
                  <span>
                    <b>{feature.lead}</b>
                    {feature.joiner} {feature.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Products that deliver it</h2>
            </div>
            <RelatedRows rows={solution.products} />
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Proof and reading</h2>
            </div>
            <RelatedRows rows={solution.proofAndReading} />
          </div>
        </section>
        <section className="cta-sec sm">
          <div className="wrap">
            <div className="cta-panel plain rv">
              <h2 className="h2">{solution.ctaHeadline}</h2>
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
