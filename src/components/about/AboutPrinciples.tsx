import type { AboutContent } from "@/types/about-content";

// "Why XSignOn": the four principles as four plain cards, each with its number, a two-line description and
// the area it focuses on.
export function AboutPrinciples({ principles }: { principles: AboutContent["why"]["principles"] }) {
  return (
    <ul className="ab-why">
      {principles.map((principle, i) => (
        <li key={principle.title}>
          <span className="ab-why-n" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3>{principle.title}</h3>
          <p>{principle.lines.join(" ")}</p>
          <span className="ab-why-focus">
            <b>Focus:</b> {principle.via}
          </span>
        </li>
      ))}
    </ul>
  );
}
