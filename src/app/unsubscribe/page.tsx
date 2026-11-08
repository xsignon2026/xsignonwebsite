import type { Metadata } from "next";
import React, { Suspense } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { UnsubscribeForm } from "./UnsubscribeForm";

export const metadata: Metadata = {
  title: "Unsubscribe | XSignOn",
  description: "Manage your marketing email preferences for XSignOn updates and announcements.",
};

export default function UnsubscribePage() {
  return (
    <article className="min-h-screen">
      {/* 1. Page Hero: dark violet */}
      <section
        data-nav="dark"
        className="bg-d1 pt-32 pb-16 md:pt-40 md:pb-20 text-white border-b border-d-line"
      >
        <Container>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Unsubscribe" }]}
            onDark={true}
            className="mb-6"
          />
          <h1 className="text-display font-bold tracking-tight text-white leading-tight">
            Unsubscribe
          </h1>
        </Container>
      </section>

      {/* 2. Unsubscribe Form Body */}
      <div data-nav="light" className="bg-paper text-txt py-(--section-pad)">
        <Container>
          <div className="max-w-[560px]">
            <Suspense
              fallback={
                <div className="rounded-2xl border border-line bg-card p-8 md:p-10 shadow-sm text-center">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-line border-t-txt" />
                </div>
              }
            >
              <UnsubscribeForm />
            </Suspense>
          </div>
        </Container>
      </div>
    </article>
  );
}
