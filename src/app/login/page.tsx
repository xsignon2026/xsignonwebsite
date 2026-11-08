import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = createPageMetadata({
  title: "Log in | XSignOn",
  description:
    "Secure access starts with one sign-in. Access your XSignOn authentication dashboard.",
  path: "/login",
  noindex: true,
});

export default function LoginPage() {
  return (
    <div id="view-login">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="cur">Log in</span>
          </nav>
          <h1 className="h-display">Secure access starts with one sign-in.</h1>
        </div>
      </section>

      <div data-nav="light">
        <section className="page-sec">
          <div className="wrap">
            <LoginForm />
          </div>
        </section>
      </div>
    </div>
  );
}
