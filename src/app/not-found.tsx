import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found (404) | XSignOn",
  description: "The page you are looking for has moved or does not exist.",
};

export default function NotFound() {
  return (
    <div id="view-404">
      <section className="page-hero" data-nav="dark" style={{ paddingBottom: "110px", minHeight: "70vh" }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Page moved</span>
          </nav>
          <h1 className="h-display">This page has moved.</h1>
          <div className="pmeta">
            <span className="ptag">404</span>
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
              Back to home <span className="chev" aria-hidden="true">&#8250;</span>
            </Link>
            <Link className="btn btn-ghost-d" href="/products">
              Our products
            </Link>
            <Link className="btn btn-ghost-d" href="/contact">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
