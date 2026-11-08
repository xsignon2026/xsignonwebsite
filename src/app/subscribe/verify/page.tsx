import type { Metadata } from "next";
import React, { Suspense } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { VerifyClient } from "./VerifyClient";

export const metadata: Metadata = {
  title: "Verify Request | XSignOn",
  description: "Confirm your email verification for XSignOn updates and technical white papers.",
};

export default function VerifyPage() {
  return (
    <article className="min-h-screen">
      {/* 1. Page Hero: dark violet */}
      <section
        data-nav="dark"
        className="bg-d1 pt-32 pb-16 md:pt-40 md:pb-20 text-white border-b border-d-line"
      >
        <Container>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Verify" }]}
            onDark={true}
            className="mb-6"
          />
          <h1 className="text-display font-bold tracking-tight text-white leading-tight">
            Email verification
          </h1>
        </Container>
      </section>

      {/* 2. Verification Status Body */}
      <div data-nav="light" className="bg-paper text-txt py-(--section-pad)">
        <Container>
          <Suspense
            fallback={
              <div className="rounded-2xl border border-line bg-card p-12 text-center max-w-xl mx-auto">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-3 border-line border-t-txt" />
              </div>
            }
          >
            <VerifyClient />
          </Suspense>
        </Container>
      </div>
    </article>
  );
}
