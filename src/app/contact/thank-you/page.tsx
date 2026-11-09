import type { Metadata } from "next";
import Link from "next/link";
import React, { Suspense } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Thank You | XSignOn",
  description: "Your inquiry has been received.",
  robots: {
    index: false,
    follow: false,
  },
};

// T-058: only reachable right after sending. The contact route sets a short-lived cookie; anyone
// else who opens this address is sent back to the form.
async function ThankYouContent() {
  if (!(await cookies()).has("contact_sent")) redirect("/contact");
  return (
    <div className="mt-8 max-w-xl text-lg text-on-dark-mut leading-relaxed">
      <p>
        Your message has been received. Someone on our team will read it and reply by email within
        one business day.
      </p>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <article className="min-h-screen">
      <section
        data-nav="dark"
        className="bg-d1 pt-32 pb-24 md:pt-40 md:pb-32 text-white border-b border-d-line"
      >
        <Container>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Thank you" }]}
            onDark={true}
            className="mb-6"
          />

          <h1 className="text-display font-bold tracking-tight text-white leading-tight">
            Thank you.
          </h1>

          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
              Received
            </span>
          </div>

          <Suspense
            fallback={
              <div className="mt-8 max-w-xl text-lg text-on-dark-mut leading-relaxed">
                <p>
                  Your inquiry has been accepted into our architecture review queue. We will review
                  your requirements and reach out within one business day.
                </p>
              </div>
            }
          >
            <ThankYouContent />
          </Suspense>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-button font-semibold text-d1 shadow-md transition-[background-color,transform] duration-200 hover:bg-on-dark-soft active:scale-[.98]"
            >
              Back to home
            </Link>

            <Link
              href="/#products"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-button font-semibold text-white transition-colors hover:bg-white/10"
            >
              Our products
            </Link>

            <Link
              href="/#thinking"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-button font-semibold text-white transition-colors hover:bg-white/10"
            >
              Our thinking
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}
