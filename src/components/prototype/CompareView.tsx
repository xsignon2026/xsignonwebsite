import Link from "next/link";
import type { ComparePageContent } from "@/types/last-pages-content";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function CompareView({ content }: { content: ComparePageContent }) {
  return (
    <div id="view-compare">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <span className="cur">{content.hero.title}</span>
          </nav>
          <h1 className="h-display">{content.hero.title}</h1>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="body-copy rv" style={{ marginBottom: "34px" }}>
              <p>
                <b>{content.intro.bold}</b> {content.intro.text}
              </p>
            </div>
            <div className="tbl-wrap rv">
              <table className="spec">
                <thead>
                  <tr>
                    {content.columns.map((column) => (
                      <th scope="col" key={column}>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.rows.map((row) => (
                    <tr key={row.capability}>
                      <th scope="row">{row.capability}</th>
                      {row.values.map((value, i) => (
                        <td data-th={content.columns[i + 1]} key={content.columns[i + 1]}>
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="lede rv" style={{ marginTop: "22px", maxWidth: "760px" }}>
              {content.lede}
            </p>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">Related</h2>
            </div>
            {content.related.map((row) => (
              <Link className="rel-row rv" href={row.href} key={row.href}>
                <span className="t">{row.title}</span>
                <span className="d">{row.type}</span>
              </Link>
            ))}
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
