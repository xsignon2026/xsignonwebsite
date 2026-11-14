import Link from "next/link";

// Converted from the approved prototype by compare/gen_view.py. Interactive pieces are switched on by
// PrototypeBehaviors (a port of the prototype's scripts). Edit the copy here, not the generator output format.
export function ThankYouView() {
  return (
    <div id="view-thankyou">
      <section className="page-hero" data-nav="dark" style={{ paddingBottom: "110px" }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Thank you</span>
          </nav>
          <h1 className="h-display">Thank you.</h1>
          <div className="pmeta">
            <span className="ptag">Received</span>
          </div>
          <div
            className="hero-cta"
            style={{
              justifyContent: "flex-start",
              marginTop: "44px",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <Link className="btn btn-white" href="/">
              Back to home{" "}
              <span className="chev" aria-hidden="true">
                &#8250;
              </span>
            </Link>
            <Link className="btn btn-ghost-d" href="/products">
              Our products
            </Link>
            <Link className="btn btn-ghost-d" href="/thinking">
              Our thinking
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
