import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = createPageMetadata({
  title: "Create account | XSignOn",
  description:
    "Your identity, ready for what's next. Create an enterprise account with XSignOn.",
  path: "/register",
  noindex: true,
});

export default function RegisterPage() {
  return (
    <div id="view-register">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Create account</span>
          </nav>
          <h1 className="h-display">Your identity, ready for what&apos;s next.</h1>
        </div>
      </section>

      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <RegisterForm />
          </div>
        </section>
      </div>
    </div>
  );
}
