import type { CSSProperties } from "react";
import type { AboutContent } from "@/types/about-content";

// "How we work": four numbered steps in a row. A red line runs from one number to the next, and each number
// lights up in turn, so the order is clear. It stands still for visitors who prefer reduced motion.
export function AboutSteps({ steps }: { steps: AboutContent["how"]["steps"] }) {
  return (
    <ol className="ab-flow">
      {steps.map((step, i) => (
        <li key={step.title} style={{ "--i": i } as CSSProperties}>
          <span className="ab-flow-n" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="ab-flow-card">
            <h3>{step.title}</h3>
            <span className="ab-flow-kind">{step.kind}</span>
            <p>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
