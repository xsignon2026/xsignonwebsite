import Link from "next/link";
import { jobTag } from "@/lib/job-merge";
import type { CareersPageContent } from "@/types/careers-page-content";
import type { JobListing } from "@/types/job";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function CareersView({
  content,
  jobs,
}: {
  content: CareersPageContent;
  jobs: readonly JobListing[];
}) {
  return (
    <div id="view-careers">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/about">About</Link>
            <span className="sep">/</span>
            <span className="cur">Careers</span>
          </nav>
          <h1 className="h-display">{content.hero.title}</h1>
        </div>
      </section>
      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">{content.working.title}</h2>
            </div>
            <div className="steps-grid three">
              {content.working.values.map((value) => (
                <div className="step-card rv" key={value.title}>
                  <h4>{value.title}</h4>
                  <p>{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="page-sec">
          <div className="wrap">
            <div className="sec-head rv">
              <h2 className="h2">{content.roles.title}</h2>
            </div>
            {jobs.length > 0 ? (
              <div className="case-grid">
                {jobs.map((job) => (
                  <article className="case-card rv" key={job.slug}>
                    <div className="pmeta">
                      <span
                        className="ptag"
                        style={{ borderColor: "var(--line)", color: "var(--gray)" }}
                      >
                        {jobTag(job)}
                      </span>
                    </div>
                    <h3 className="h3">{job.title}</h3>
                    <p>{job.description}</p>
                    <Link className="link-arrow" href="/contact">
                      Apply through Contact{" "}
                      <span className="arr" aria-hidden="true">
                        &#8594;
                      </span>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <p className="body-copy rv">{content.roles.emptyNote}</p>
            )}
            <div className="role-state rv" style={{ marginTop: "26px" }}>
              <h3 className="h3">{content.roles.general.title}</h3>
              <p>{content.roles.general.text}</p>
              <Link className="btn btn-navy" href={content.roles.general.button.href}>
                {content.roles.general.button.label}
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
