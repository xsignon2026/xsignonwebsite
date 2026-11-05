import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | XSignOn",
  description:
    "Speak with our security architects to evaluate your identity posture, AI governance, or quantum readiness goals.",
};

export default function ContactPage() {
  return (
    <article className="min-h-screen">
      {/* 1. Page Hero: dark violet */}
      <section
        data-nav="dark"
        className="bg-d1 pt-32 pb-16 md:pt-40 md:pb-20 text-white border-b border-d-line"
      >
        <Container>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
            onDark={true}
            className="mb-6"
          />
          <h1 className="text-display font-bold tracking-tight text-white leading-tight">
            Contact us
          </h1>
        </Container>
      </section>

      {/* 2. Form & Office Information */}
      <div data-nav="light" className="bg-paper text-txt py-(--section-pad)">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
            {/* Form Column */}
            <div>
              <ContactForm />
            </div>

            {/* Office & Details Column */}
            <div className="space-y-8 text-body text-gray leading-relaxed pt-2">
              <div>
                <h2 className="text-xl font-bold text-txt mb-2">What happens next.</h2>
                <p>
                  Every inquiry goes directly to an architect who replies with care. Strategy calls are short working sessions on your access, AI governance, or quantum readiness goals, leaving you with a clear, actionable next step.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-txt mb-1">Office</h3>
                <p>
                  XSignOn Corporation<br />
                  3900 S Stonebridge Dr., Suite 1101<br />
                  McKinney, TX 75070
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-txt mb-1">Phone</h3>
                <p>
                  <a
                    href="tel:+14698979399"
                    className="font-medium text-txt hover:text-acc-ink transition-colors"
                  >
                    +1 469-897-9399
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-txt mb-1">Email</h3>
                <p>
                  <a
                    href="mailto:info@xsignon.com"
                    className="font-medium text-txt hover:text-acc-ink transition-colors"
                  >
                    info@xsignon.com
                  </a>
                </p>
              </div>

              <div className="rounded-card border border-line bg-card p-6 text-sm">
                <p className="m-0 text-gray">
                  This form is designed to be quick and welcoming. To book quickly, choose <strong className="text-txt">&quot;Book a strategy call&quot;</strong> and share your preferred timing in the message.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* 3. Secondary CTA */}
      <section className="bg-white py-16 border-t border-line/60" data-nav="light">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-card border border-line bg-paper p-8">
            <div>
              <h2 className="text-xl font-bold text-txt">Prefer reading first?</h2>
              <p className="text-body text-gray mt-1">
                Explore our engineering perspectives on identity security, micro-segmentation, and AI governance.
              </p>
            </div>
            <Link
              href="/#thinking"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-txt bg-white px-6 py-2.5 text-button font-semibold text-txt shadow-xs transition-colors hover:bg-txt hover:text-white"
            >
              Browse our thinking
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}
