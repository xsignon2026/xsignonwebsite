"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { aboutImages, whatWeDo } from "@/data/about";

// "What we do": a picture beside four cards. Hovering or focusing a card changes the picture; opening a
// card shows the products behind it. Only one card is open at a time (prototype js/08.js).
export function AboutWhatWeDo() {
  const [open, setOpen] = useState<number | null>(null);
  const [shown, setShown] = useState(0);

  return (
    <div className="what-cover rv">
      <div className="about-split flip">
        <figure className="about-fig wf" id="whatFig">
          {aboutImages.what.map((image, i) => (
            <Image
              key={image.src}
              className={`wf-img${shown === i ? " on" : ""}`}
              src={image.src}
              alt={image.alt}
              width={900}
              height={600}
              sizes="(max-width: 900px) 100vw, 520px"
            />
          ))}
          <figcaption>
            <i className="live" aria-hidden="true" />
            <span id="whatCap">{aboutImages.what[shown].caption}</span>
          </figcaption>
        </figure>
        <div className="what-list">
          {whatWeDo.map((item, i) => {
            const isOpen = open === i;
            const panelId = `wc-${i}`;
            return (
              <article
                key={item.title}
                className={`what-item rv${isOpen ? " open" : ""}`}
                onMouseEnter={() => setShown(i)}
                onMouseLeave={() => setShown(open ?? shown)}
                onFocus={() => setShown(i)}
              >
                <button
                  className="what-card"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => {
                    setOpen(isOpen ? null : i);
                    if (!isOpen) setShown(i);
                  }}
                >
                  <span className="wn">{item.number}</span>
                  <span className="wc-text">
                    <span className="wc-t">{item.title}</span>
                    <span className="wc-d">{item.text}</span>
                  </span>
                  <span className="wa">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div className="wc-panel" id={panelId} role="region" aria-label={item.title}>
                  <div className="wc-inner">
                    <p className="wc-label">{item.label}</p>
                    {item.rows.map((row) => (
                      <Link className="rel-row" href={row.href} key={row.title}>
                        <span className="t">{row.title}</span>
                        <span className="d">{row.kind}</span>
                      </Link>
                    ))}
                    <Link className="wc-more" href={item.more}>
                      View more{" "}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M4 12h16m-6-6 6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
