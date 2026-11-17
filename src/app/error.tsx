"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log safe error telemetry without leaking sensitive memory
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div id="view-error">
      <section
        className="page-hero"
        data-nav="dark"
        style={{ paddingBottom: "110px", minHeight: "70vh" }}
      >
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Application Error</span>
          </nav>
          <h1 className="h-display">An unexpected error occurred.</h1>
          <div className="pmeta">
            <span className="ptag">Error code: {error.digest || "500"}</span>
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
            <button className="btn btn-white" onClick={() => reset()} type="button">
              Try again{" "}
              <span className="chev" aria-hidden="true">
                &#8250;
              </span>
            </button>
            <Link className="btn btn-ghost-d" href="/">
              Back to home
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
