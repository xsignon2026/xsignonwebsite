"use client";

import { useEffect, useRef, useState } from "react";
import { PHISHLENS_URL, toDomain, type ScanSummary } from "@/lib/phishlens";

// The home hero's free domain check. The scan runs through /api/phishlens-scan (PhishLens), a short
// result shows here, and the full report opens on PhishLens.

// Shown in turn while the scan runs (it takes up to about a minute).
const STEPS = [
  "Reading SPF",
  "Checking DMARC policy",
  "Looking for DKIM keys",
  "Testing mail servers",
  "Checking blocklists",
  "Reading DNSSEC and CAA",
  "Checking the website",
  "Working out your score",
];

const STATUS_LABEL = { pass: "Pass", warn: "Warning", fail: "Fail" } as const;

const INVALID = "Enter a domain like yourcompany.com, or a work email.";

type State =
  | { kind: "idle" }
  | { kind: "scanning"; domain: string }
  | { kind: "error"; message: string; local: boolean }
  | { kind: "done"; scan: ScanSummary };

export function HeroDomainScan() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });
  const [step, setStep] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (state.kind !== "scanning") return;
    const t = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 5500);
    return () => clearInterval(t);
  }, [state.kind]);

  // The form is replaced by the result, so focus moves to the result.
  useEffect(() => {
    if (state.kind === "done") resultRef.current?.focus();
  }, [state.kind]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "scanning") return;
    const domain = toDomain(value);
    if (!domain) {
      setState({ kind: "error", message: INVALID, local: true });
      inputRef.current?.focus();
      return;
    }
    setValue(domain);
    setStep(0);
    setState({ kind: "scanning", domain });
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/phishlens-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.reportUrl) setState({ kind: "done", scan: data as ScanSummary });
      else
        setState({
          kind: "error",
          message: data.message || "The scanner is unavailable right now. Please try later.",
          local: res.status === 400,
        });
    } catch {
      if (!controller.signal.aborted)
        setState({ kind: "error", message: "Network error. Please try again.", local: false });
    }
  }

  function scanAnother() {
    setState({ kind: "idle" });
    setValue("");
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  const scanning = state.kind === "scanning";
  const error = state.kind === "error";

  // One short line for screen readers: the step text and the result card are not read out as they change.
  const announcement =
    state.kind === "scanning"
      ? `Scanning ${state.domain}. This takes up to a minute.`
      : state.kind === "done"
        ? `Scan complete for ${state.scan.domain}: grade ${state.scan.grade}, score ${state.scan.score} out of 100.`
        : "";

  return (
    <div className="hero-scan">
      <p className="hero-scan-lead" id="heroScanLead">
        Free check: can someone send email as your domain?
      </p>

      {state.kind !== "done" && (
        <form className="hero-scan-form" onSubmit={handleSubmit} noValidate>
          <input
            ref={inputRef}
            type="text"
            inputMode="url"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="Read public DNS only"
            aria-label="Domain or work email to scan"
            aria-describedby={error ? "heroScanLead heroScanError" : "heroScanLead"}
            aria-invalid={(error && state.local) || undefined}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setState({ kind: "idle" });
            }}
            readOnly={scanning}
          />
          {/* Not disabled while scanning, so keyboard focus stays on it. */}
          <button className="btn btn-white" type="submit" aria-disabled={scanning || undefined}>
            {scanning ? "Scanning…" : "Scan your domain for free"}
          </button>
        </form>
      )}

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      {state.kind === "scanning" && (
        <div className="hero-scan-progress">
          <div className="hero-scan-bar" aria-hidden="true">
            <span />
          </div>
          <p>
            {STEPS[step]} for <strong>{state.domain}</strong>… This takes up to a minute.
          </p>
        </div>
      )}

      {state.kind === "done" && (
        <div
          className="hero-scan-result"
          ref={resultRef}
          tabIndex={-1}
          aria-label={`Scan result for ${state.scan.domain}`}
          role="group"
        >
          <div className="hsr-head">
            <span className={`hsr-grade hsr-grade-${gradeTone(state.scan.grade)}`}>
              {state.scan.grade}
            </span>
            <div>
              <p className="hsr-domain">{state.scan.domain}</p>
              <p className="hsr-score">
                Score <strong>{state.scan.score}</strong> / 100
              </p>
            </div>
          </div>
          <ul className="hsr-checks">
            {state.scan.checks.map((c) => (
              <li key={c.key} className={`hsr-${c.status}`}>
                <span className="hsr-dot" aria-hidden="true" />
                {c.title}
                <span className="hsr-status">{STATUS_LABEL[c.status]}</span>
              </li>
            ))}
          </ul>
          {state.scan.topRisk && (
            <p className="hsr-risk">
              <strong>Top risk:</strong> {state.scan.topRisk}
            </p>
          )}
          <div className="hsr-actions">
            <a
              className="btn btn-white"
              href={state.scan.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              See your full report on PhishLens{" "}
              <span className="arr-up" aria-hidden="true">
                &#8599;
              </span>
            </a>
            <button type="button" className="hsr-again" onClick={scanAnother}>
              Scan another domain
            </button>
          </div>
        </div>
      )}

      {state.kind === "error" && (
        <p className="hero-scan-error" id="heroScanError" role="alert">
          {state.message}
          {!state.local && (
            <>
              {" "}
              <a href={PHISHLENS_URL} target="_blank" rel="noopener noreferrer">
                Try it on PhishLens
              </a>
            </>
          )}
        </p>
      )}
    </div>
  );
}

function gradeTone(grade: string): "good" | "mid" | "bad" {
  const g = grade.toUpperCase()[0];
  if (g === "A" || g === "B") return "good";
  if (g === "C") return "mid";
  return "bad";
}
