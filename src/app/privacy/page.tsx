import type { Metadata } from "next";
import React from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { SUB_PROCESSORS } from "@/data/legal/sub-processors";

export const metadata: Metadata = {
  title: "Privacy Policy & Sub-Processors | XSignOn",
  description:
    "XSignOn privacy policy, sub-processor registry, and data retention schedules for technical resources and communications.",
};

export default function PrivacyPage() {
  return (
    <article className="min-h-screen">
      {/* 1. Page Hero: dark violet base */}
      <section
        data-nav="dark"
        className="bg-d1 pt-32 pb-16 md:pt-40 md:pb-20 text-white border-b border-d-line"
      >
        <Container>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
            onDark={true}
            className="mb-6"
          />
          <h1 className="text-display font-bold tracking-tight text-white leading-tight">
            Privacy Policy &amp; Sub-Processors
          </h1>
          <p className="mt-4 text-xl text-[#b4bfd3] max-w-2xl leading-relaxed">
            How XSignOn protects visitor data, manages third-party sub-processors, and enforces automated data minimization.
          </p>
        </Container>
      </section>

      {/* 2. Policy Narrative & Sub-Processor Register */}
      <div data-nav="light" className="bg-paper text-txt py-(--section-pad)">
        <Container>
          <div className="max-w-4xl space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-txt">
                Data Minimization &amp; Retention Commitments
              </h2>
              <p className="text-body text-gray leading-relaxed">
                At XSignOn, we believe security begins with restraint. We collect only the information necessary to fulfill your technical resource requests and provide relevant product updates. Unverified requests are automatically purged after 7 days, and resource download audit logs are strictly retained for 90 days before deletion.
              </p>
            </section>

            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-txt">
                  Authorized Sub-Processors
                </h2>
                <p className="mt-2 text-sm text-gray">
                  The following third-party infrastructure and service providers process limited visitor data on behalf of XSignOn. Each is bound by contractual data protection agreements (DPAs) and strict retention limits.
                </p>
              </div>

              <div
                tabIndex={0}
                role="region"
                aria-label="Authorized Sub-Processors table"
                className="overflow-x-auto rounded-2xl border border-line bg-card shadow-sm focus:outline-none focus:ring-2 focus:ring-txt"
              >
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-line bg-surface text-txt font-semibold">
                      <th className="py-3.5 px-4">Sub-Processor</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Purpose</th>
                      <th className="py-3.5 px-4">Location</th>
                      <th className="py-3.5 px-4">Data Retention</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-gray">
                    {SUB_PROCESSORS.map((sp, idx) => (
                      <tr key={idx} className="hover:bg-soft/40 transition-colors">
                        <td className="py-4 px-4 font-semibold text-txt whitespace-nowrap">
                          {sp.name}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="inline-block rounded-full bg-soft px-2.5 py-0.5 text-xs font-medium text-txt">
                            {sp.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 leading-relaxed max-w-xs">
                          {sp.purpose}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          {sp.location}
                        </td>
                        <td className="py-4 px-4 leading-relaxed max-w-xs font-mono text-xs">
                          {sp.retention}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4 rounded-2xl border border-line bg-card p-8">
              <h3 className="text-xl font-bold tracking-tight text-txt">
                Exercising Your Rights
              </h3>
              <p className="text-sm text-gray leading-relaxed">
                You have the right to request access to, correction of, or permanent deletion of your personal contact data at any time. You may also unsubscribe from any mailing list with a single click using the link in any email footer or at our{" "}
                <a href="/unsubscribe" className="text-txt font-semibold underline underline-offset-2 hover:text-acc-ink">
                  unsubscribe page
                </a>.
              </p>
              <div className="pt-2 text-xs text-gray space-y-1">
                <p><strong>XSignOn Privacy Office</strong>: privacy@xsignon.com</p>
                <p>3900 S Stonebridge Dr., Suite 1101, McKinney, TX 75070, USA &bull; +1 469-897-9399</p>
              </div>
            </section>
          </div>
        </Container>
      </div>
    </article>
  );
}
