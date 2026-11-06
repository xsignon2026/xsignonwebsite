import type { Metadata } from "next";
import React from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { CtaSection } from "@/components/blocks/CtaSection";
import { RelatedItems } from "@/components/products/RelatedItems";

export const metadata: Metadata = {
  title: "How XSignOn Compares | Zero-Trust Sign-In Comparison",
  description:
    "Compare XSignOn passwordless sign-in against password-based sign-in, one-time codes, and legacy MFA across seven key capabilities.",
  alternates: {
    canonical: "/products/compare",
  },
};

const COMPARISON_ROWS = [
  {
    capability: "Sign-in only the account owner can complete",
    xsignon: "Yes, with a verified key",
    password: "Shared secret",
    otp: "Code shared by message",
    legacyMfa: "Added on top of a password",
  },
  {
    capability: "Nothing to remember or type",
    xsignon: "Yes",
    password: "Password to remember",
    otp: "Code to type each time",
    legacyMfa: "Password plus a second step",
  },
  {
    capability: "Hardware-backed verification",
    xsignon: "Yes, FIDO2 keys",
    password: "No",
    otp: "No",
    legacyMfa: "Varies by setup",
  },
  {
    capability: "Enrollment and lifecycle managed for you",
    xsignon: "Yes, through AMS",
    password: "Reset by help desk",
    otp: "Managed per account",
    legacyMfa: "Managed per account",
  },
  {
    capability: "Recovery with a verified replacement",
    xsignon: "Yes, guided by AMS",
    password: "Reset questions and calls",
    otp: "Re-registration per service",
    legacyMfa: "Re-registration per service",
  },
  {
    capability: "Evidence ready for access reviews",
    xsignon: "Yes, in PostureOne and XSense",
    password: "Assembled by hand",
    otp: "Assembled by hand",
    legacyMfa: "Assembled by hand",
  },
  {
    capability: "Works with your existing identity provider",
    xsignon: "Yes, standard protocols",
    password: "Yes",
    otp: "Yes",
    legacyMfa: "Yes",
  },
];

const RELATED_ITEMS = [
  {
    title: "Passwordless Keys",
    typeLabel: "Product",
    href: "/products/keys",
  },
  {
    title: "Securing Bank Access With FIDO2 Biometric Keys",
    typeLabel: "Case study",
    href: "/proof#case-bank",
  },
  {
    title: "Back to Our products",
    typeLabel: "Products",
    href: "/products",
  },
];

// S-14 / T-087: How XSignOn compares page.
export default function ComparePage() {
  return (
    <article className="min-h-screen">
      {/* 1. Page Hero: dark violet base */}
      <section
        data-nav="dark"
        className="bg-d1 pt-32 pb-16 md:pt-40 md:pb-20 text-white border-b border-d-line"
      >
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "How XSignOn compares" },
            ]}
            onDark={true}
            className="mb-6"
          />

          <h1 className="text-display font-bold tracking-tight text-white leading-tight">
            How XSignOn compares
          </h1>
        </Container>
      </section>

      {/* 2. Light sections body */}
      <div data-nav="light" className="bg-paper text-txt">
        <section className="py-(--section-pad)">
          <Container>
            <div className="max-w-3xl mb-10">
              <p className="text-xl md:text-2xl text-gray leading-relaxed font-normal">
                <b className="font-semibold text-txt">
                  Four ways to run sign-in, compared on what each one gives your team.{" "}
                </b>
                XSignOn pairs FIDO2 hardware with a governed platform, so the sign-in itself, the
                enrollment behind it, and the evidence after it all come from one place.
              </p>
            </div>

            {/* Comparison Table */}
            <div
              tabIndex={0}
              role="region"
              aria-label="How XSignOn compares matrix"
              className="overflow-x-auto rounded-2xl border border-line bg-card shadow-xs focus:outline-none focus:ring-2 focus:ring-focus"
            >
              <table className="w-full border-collapse text-left text-sm md:text-base">
                <thead>
                  <tr className="border-b border-line bg-soft">
                    <th scope="col" className="p-4 sm:p-5 font-semibold text-txt w-1/4 min-w-[200px]">
                      Capability
                    </th>
                    <th
                      scope="col"
                      className="p-4 sm:p-5 font-bold text-acc-ink bg-soft/80 w-1/4 min-w-[180px]"
                    >
                      XSignOn
                    </th>
                    <th scope="col" className="p-4 sm:p-5 font-semibold text-txt w-1/6 min-w-[160px]">
                      Password-based sign-in
                    </th>
                    <th scope="col" className="p-4 sm:p-5 font-semibold text-txt w-1/6 min-w-[160px]">
                      One-time codes
                    </th>
                    <th scope="col" className="p-4 sm:p-5 font-semibold text-txt w-1/6 min-w-[160px]">
                      Legacy MFA
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-soft/30 transition-colors">
                      <th scope="row" className="p-4 sm:p-5 font-semibold text-txt align-top">
                        {row.capability}
                      </th>
                      <td
                        data-th="XSignOn"
                        className="p-4 sm:p-5 font-medium text-txt bg-soft/30 align-top"
                      >
                        <span className="text-acc-ink font-semibold">{row.xsignon}</span>
                      </td>
                      <td data-th="Password-based sign-in" className="p-4 sm:p-5 text-gray align-top">
                        {row.password}
                      </td>
                      <td data-th="One-time codes" className="p-4 sm:p-5 text-gray align-top">
                        {row.otp}
                      </td>
                      <td data-th="Legacy MFA" className="p-4 sm:p-5 text-gray align-top">
                        {row.legacyMfa}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-sm md:text-base text-gray-2 leading-relaxed max-w-3xl">
              Every XSignOn row is delivered by the products on this site: the keys, AMS, XSense and
              PostureOne, working as one program.
            </p>
          </Container>
        </section>

        {/* Related Items */}
        <RelatedItems items={RELATED_ITEMS} />

        {/* Bottom CTA */}
        <CtaSection
          title="Compare it against your current sign-in."
          subtitle="Speak with our security architects to evaluate your infrastructure and design a roadmap."
          buttonText="Book a strategy call"
          buttonHref="/contact"
        />
      </div>
    </article>
  );
}
