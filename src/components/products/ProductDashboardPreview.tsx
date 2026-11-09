import React from "react";
import type { ProductDashboard } from "@/types/product";

type ProductDashboardPreviewProps = {
  dashboard?: ProductDashboard;
  appName?: string;
};

// Handoff lines 2457-2475: Accessible decorative CSS preview of the product posture dashboard.
export function ProductDashboardPreview({
  dashboard = {
    score: 86,
    maxScore: 100,
    statusChip: "Evidence ready",
    firewallCoverage: 92,
    trafficProtection: 78,
    fileIntegrityChecks: 64,
  },
  appName = "postureone.xsignon.app",
}: ProductDashboardPreviewProps) {
  return (
    <div
      className="relative overflow-hidden rounded-card border border-white/10 bg-d2 text-white shadow-2xl text-left mt-11"
      aria-hidden="true"
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 bg-d1/60">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        <span className="ml-3 rounded bg-white/5 px-3 py-1 font-sans text-xs text-on-dark-sub">
          {appName}
        </span>
      </div>

      {/* Dashboard Body */}
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] min-h-[280px]">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col gap-1 border-r border-white/10 p-4 text-xs text-on-dark-sub">
          <span className="rounded bg-white/10 px-2.5 py-1.5 font-medium text-white">Overview</span>
          <span className="px-2.5 py-1.5">Protection</span>
          <span className="px-2.5 py-1.5">Findings</span>
          <span className="px-2.5 py-1.5">Evidence</span>
          <span className="px-2.5 py-1.5">Reports</span>
        </aside>

        {/* Main Panel */}
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-on-dark-sub">
                Security posture
              </div>
              <div className="mt-1 font-bold text-4xl text-white tracking-tight">
                {dashboard.score}
                <span className="text-lg font-normal text-on-dark-sub">
                  {" "}
                  / {dashboard.maxScore}
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {dashboard.statusChip}
            </span>
          </div>

          {/* Metric Coverage Bars */}
          <div className="mt-6 space-y-3.5">
            <div className="grid grid-cols-[140px_1fr_40px] items-center gap-3 text-xs text-on-dark-mut">
              <span>Firewall coverage</span>
              <div className="h-1.5 w-full overflow-hidden rounded bg-white/10">
                <div
                  className="h-full rounded bg-emerald-400 transition-all duration-500"
                  style={{ width: `${dashboard.firewallCoverage}%` }}
                />
              </div>
              <b className="text-right text-white font-semibold">{dashboard.firewallCoverage}%</b>
            </div>

            <div className="grid grid-cols-[140px_1fr_40px] items-center gap-3 text-xs text-on-dark-mut">
              <span>Traffic protection</span>
              <div className="h-1.5 w-full overflow-hidden rounded bg-white/10">
                <div
                  className="h-full rounded bg-blue-400 transition-all duration-500"
                  style={{ width: `${dashboard.trafficProtection}%` }}
                />
              </div>
              <b className="text-right text-white font-semibold">{dashboard.trafficProtection}%</b>
            </div>

            <div className="grid grid-cols-[140px_1fr_40px] items-center gap-3 text-xs text-on-dark-mut">
              <span>File integrity checks</span>
              <div className="h-1.5 w-full overflow-hidden rounded bg-white/10">
                <div
                  className="h-full rounded bg-blue-400 transition-all duration-500"
                  style={{ width: `${dashboard.fileIntegrityChecks}%` }}
                />
              </div>
              <b className="text-right text-white font-semibold">
                {dashboard.fileIntegrityChecks}%
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
