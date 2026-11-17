"use client";

import { useEffect } from "react";

// The stacking effect for the "New launches" cards: each card stays near the top of the screen while the next
// one slides up over it, and the card underneath shrinks a little as it is covered. The sticking itself is CSS
// (see .nl-list in primitives.css); this only sets how much each card is covered. It does nothing on phones
// and for visitors who ask for reduced motion, where the cards are a plain list.

export function NewLaunchesFx() {
  useEffect(() => {
    const list = document.getElementById("nlList");
    if (!list) return;
    const wide = window.matchMedia("(min-width: 901px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = Array.from(list.children) as HTMLElement[];
    let frame = 0;

    const clear = () => {
      for (const c of cards) {
        c.style.removeProperty("--nl-p");
      }
    };

    const update = () => {
      frame = 0;
      if (!wide.matches || calm.matches) return clear();
      for (let i = 0; i < cards.length - 1; i++) {
        const card = cards[i];
        const next = cards[i + 1];
        const stuck = parseFloat(getComputedStyle(card).top) || 0;
        const h = card.offsetHeight;
        const gap = next.getBoundingClientRect().top - stuck;
        // 0 while the next card is still below, 1 once it has fully covered this one.
        const p = Math.min(1, Math.max(0, 1 - gap / h));
        card.style.setProperty("--nl-p", p.toFixed(3));
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    wide.addEventListener("change", schedule);
    calm.addEventListener("change", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      wide.removeEventListener("change", schedule);
      calm.removeEventListener("change", schedule);
      clear();
    };
  }, []);

  return null;
}
