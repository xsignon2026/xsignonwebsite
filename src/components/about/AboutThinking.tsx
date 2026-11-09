"use client";

import Image from "next/image";
import { useState } from "react";
import { aboutThinking } from "@/data/about";

// Four small article cards that open in place to show their full summary ("Read more" / "Show less").
export function AboutThinkingCards() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="t-list">
      {aboutThinking.cards.map((card, i) => {
        const isOpen = open === i;
        return (
          <article className={`tcard rv${isOpen ? " open" : ""}`} key={card.title}>
            <div className="tc-img">
              <Image src={card.image.src} alt={card.image.alt} width={360} height={240} />
            </div>
            <div className="tc-body">
              <h3>{card.title}</h3>
              <p className="excerpt">{card.text}</p>
              <button
                className="t-toggle"
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{isOpen ? "Show less" : "Read more"}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
