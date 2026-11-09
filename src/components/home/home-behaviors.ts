// The Home page's interactive pieces, ported from the approved prototype's scripts
// (reference/prototype-v5/js/01.js and 04.js). They work on the page markup that HomeView renders on
// the server, so the page is fully readable before any of this runs. Every function returns nothing
// and registers its clean-up in `cleanups`. Nothing here handles visitor-supplied text: the only HTML
// it writes comes from the constants in this file.

type Cleanup = () => void;

const q = <T extends Element>(root: ParentNode, selector: string) =>
  root.querySelector<T>(selector);
const qa = <T extends Element>(root: ParentNode, selector: string) =>
  Array.from(root.querySelectorAll<T>(selector));

function listen<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | Document | Window,
  type: K | string,
  handler: (event: never) => void,
  cleanups: Cleanup[],
  options?: boolean | AddEventListenerOptions,
) {
  target.addEventListener(type, handler as EventListener, options);
  cleanups.push(() => target.removeEventListener(type, handler as EventListener, options));
}

// Hero product card: auto-advance every 6 seconds, dots, arrow keys, pauses on hover and focus.
function heroCard(root: HTMLElement, reduced: boolean, cleanups: Cleanup[]) {
  const card = q<HTMLElement>(root, "#heroCard");
  if (!card) return;
  const slides = qa<HTMLElement>(card, ".hslide");
  const dots = qa<HTMLElement>(card, ".hdot");
  let index = 0;
  let timer: number | null = null;

  const show = (n: number, user = false) => {
    index = ((n % slides.length) + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("act", i === index);
      slide.setAttribute("aria-hidden", i === index ? "false" : "true");
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("act", i === index);
      if (i === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    if (user) {
      stop();
      start();
    }
  };
  const start = () => {
    if (reduced || timer !== null || document.hidden) return;
    timer = window.setInterval(() => show(index + 1), 6000);
  };
  const stop = () => {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
  };

  dots.forEach((dot, i) => listen(dot, "click", () => show(i, true), cleanups));
  listen(
    card,
    "keydown",
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") show(index - 1, true);
      else if (e.key === "ArrowRight") show(index + 1, true);
    },
    cleanups,
  );
  listen(card, "mouseenter", stop, cleanups);
  listen(card, "mouseleave", start, cleanups);
  listen(card, "focusin", stop, cleanups);
  listen(
    card,
    "focusout",
    (e: FocusEvent) => {
      if (!card.contains(e.relatedTarget as Node | null)) start();
    },
    cleanups,
  );
  listen(document, "visibilitychange", () => (document.hidden ? stop() : start()), cleanups);
  show(0);
  start();
  cleanups.push(stop);
}

// Product coverflow: the active card in the middle, neighbours angled, arrows, dots, drag, keyboard.
function coverflow(root: HTMLElement, reduced: boolean, cleanups: Cleanup[]) {
  const flow = q<HTMLElement>(root, "#productCoverflow");
  if (!flow) return;
  const viewport = q<HTMLElement>(flow, "#cfViewport");
  const cards = qa<HTMLElement>(flow, ".cf-card");
  const dots = qa<HTMLElement>(flow, ".cf-dot");
  const status = q<HTMLElement>(flow, "#cfStatus");
  const names = cards.map((card) => q(card, "h3")?.textContent ?? "");
  const bar = q<HTMLElement>(flow, ".cf-timer i");
  let index = 0;
  let timer: number | null = null;
  let hovering = false;
  let focusing = false;
  let dragX: number | null = null;
  let dragged = false;

  const runBar = (on: boolean) => {
    if (!bar) return;
    bar.classList.remove("run");
    if (on && !reduced) {
      void bar.offsetWidth;
      bar.classList.add("run");
    }
  };
  const layout = () => {
    const n = cards.length;
    const fan = !reduced && flow.clientWidth >= 1180;
    const spread = fan ? Math.max(300, (flow.clientWidth / 2 - 100) / 2) : 0;
    cards.forEach((card, i) => {
      let off = (((i - index) % n) + n) % n;
      if (off > n / 2) off -= n;
      const a = Math.abs(off);
      card.classList.toggle("is-active", off === 0);
      card.classList.toggle("side-l", fan && off < 0);
      card.classList.toggle("side-r", fan && off > 0);
      if (!reduced) {
        card.style.transform = fan
          ? `translateX(-50%) translateX(${off * spread}px) translateZ(${-a * 110}px) rotateY(${off === 0 ? 0 : -off * 38}deg) scale(${1 - a * 0.05})`
          : `translateX(-50%) translateX(${off * 62}%) translateZ(${-a * 130}px) rotateY(${off === 0 ? 0 : -off * 36}deg) scale(${1 - a * 0.07})`;
        card.style.opacity = String(1 - a * 0.16);
        card.style.zIndex = String(20 - a);
      }
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("act", i === index);
      if (i === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    if (status) status.textContent = `${names[index]}, ${index + 1} of ${cards.length}`;
  };
  const start = () => {
    if (reduced || hovering || focusing || timer !== null || document.hidden) return;
    runBar(true);
    timer = window.setInterval(() => {
      index = (index + 1) % cards.length;
      layout();
      runBar(true);
    }, 5200);
  };
  const stop = () => {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
    runBar(false);
  };
  const go = (n: number, user = false) => {
    index = ((n % cards.length) + cards.length) % cards.length;
    layout();
    if (user) {
      stop();
      start();
    }
  };

  const prev = q<HTMLElement>(flow, ".cf-prev");
  const next = q<HTMLElement>(flow, ".cf-next");
  if (prev) listen(prev, "click", () => go(index - 1, true), cleanups);
  if (next) listen(next, "click", () => go(index + 1, true), cleanups);
  dots.forEach((dot, i) => listen(dot, "click", () => go(i, true), cleanups));
  cards.forEach((card, i) => {
    listen(
      card,
      "click",
      (e: MouseEvent) => {
        if (dragged) return;
        if (i !== index && !(e.target as HTMLElement).closest("a")) go(i, true);
      },
      cleanups,
    );
    listen(card, "focusin", () => i !== index && go(i), cleanups);
  });
  listen(
    flow,
    "keydown",
    (e: KeyboardEvent) => {
      const key = e.key;
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;
      e.preventDefault();
      if (key === "ArrowLeft") go(index - 1, true);
      else if (key === "ArrowRight") go(index + 1, true);
      else if (key === "Home") go(0, true);
      else go(cards.length - 1, true);
    },
    cleanups,
  );
  if (viewport) {
    listen(
      viewport,
      "pointerdown",
      (e: PointerEvent) => {
        dragX = e.clientX;
        dragged = false;
      },
      cleanups,
    );
    listen(
      viewport,
      "pointermove",
      (e: PointerEvent) => {
        if (dragX !== null && Math.abs(e.clientX - dragX) > 8) dragged = true;
      },
      cleanups,
    );
    listen(
      viewport,
      "pointerup",
      (e: PointerEvent) => {
        if (dragX === null) return;
        const dx = e.clientX - dragX;
        dragX = null;
        if (Math.abs(dx) > 48) go(dx < 0 ? index + 1 : index - 1, true);
        window.setTimeout(() => (dragged = false), 0);
      },
      cleanups,
    );
    listen(
      viewport,
      "pointercancel",
      () => {
        dragX = null;
        dragged = false;
      },
      cleanups,
    );
  }
  listen(
    flow,
    "mouseenter",
    () => {
      hovering = true;
      stop();
    },
    cleanups,
  );
  listen(
    flow,
    "mouseleave",
    () => {
      hovering = false;
      start();
    },
    cleanups,
  );
  listen(
    flow,
    "focusin",
    () => {
      focusing = true;
      stop();
    },
    cleanups,
  );
  listen(
    flow,
    "focusout",
    (e: FocusEvent) => {
      if (!flow.contains(e.relatedTarget as Node | null)) {
        focusing = false;
        start();
      }
    },
    cleanups,
  );
  listen(document, "visibilitychange", () => (document.hidden ? stop() : start()), cleanups);
  listen(window, "resize", layout, cleanups);
  layout();
  start();
  cleanups.push(stop);
}

// Headings and cards fade in as they scroll into view. Nothing stays hidden: after 1.6 s all show.
function reveal(root: HTMLElement, reduced: boolean, cleanups: Cleanup[]) {
  const items = qa<HTMLElement>(root, ".rv");
  const showAll = () => items.forEach((el) => el.classList.add("in"));
  if (!("IntersectionObserver" in window) || reduced) {
    showAll();
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  items.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
    else observer.observe(el);
  });
  const timer = window.setTimeout(showAll, 1600);
  cleanups.push(() => {
    observer.disconnect();
    window.clearTimeout(timer);
  });
}

// "Proof": the statement darkens word by word as it scrolls up the page.
function proofWords(root: HTMLElement, reduced: boolean, cleanups: Cleanup[]) {
  const statement = q<HTMLElement>(root, "#proofStmt");
  if (!statement || reduced) return;
  const text = statement.textContent?.trim() ?? "";
  statement.replaceChildren(
    ...text.split(/\s+/).flatMap((word, i) => {
      const span = document.createElement("span");
      span.className = "w";
      span.style.color = "#d5dbe5";
      span.textContent = word;
      return i === 0 ? [span] : [document.createTextNode(" "), span];
    }),
  );
  const words = qa<HTMLElement>(statement, ".w");
  let done = false;
  const update = () => {
    if (done) return;
    const rect = statement.getBoundingClientRect();
    const f = Math.max(
      0,
      Math.min(1, (window.innerHeight * 0.95 - rect.top) / (rect.height * 0.6)),
    );
    if (f >= 1) done = true;
    const n = Math.round(f * words.length);
    words.forEach((word, i) => (word.style.color = i < n ? "#081325" : "#d5dbe5"));
  };
  listen(window, "scroll", update, cleanups, { passive: true });
  update();
}

// Solutions journey: the stage stays in place on wide screens while the visitor scrolls through steps.
function journey(root: HTMLElement, reduced: boolean, cleanups: Cleanup[]) {
  const el = q<HTMLElement>(root, "#journey");
  if (!el) return;
  const panels = qa<HTMLElement>(el, ".j-panel");
  const rail = qa<HTMLElement>(el, ".j-rail button");
  const step = () => window.innerHeight * 0.46;
  const set = (index: number) => {
    panels.forEach((panel, i) => panel.classList.toggle("act", i === index));
    rail.forEach((button, i) => button.classList.toggle("act", i === index));
  };
  const mode = () => el.classList.toggle("pin-on", window.innerWidth >= 900 && !reduced);
  const onScroll = () => {
    if (!el.classList.contains("pin-on")) return;
    const rect = el.getBoundingClientRect();
    if (rect.height === 0) return;
    set(Math.max(0, Math.min(panels.length - 1, Math.floor(-rect.top / step()))));
  };
  rail.forEach((button, i) =>
    listen(
      button,
      "click",
      () => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + i * step() + 4, behavior: reduced ? "auto" : "smooth" });
      },
      cleanups,
    ),
  );
  const both = () => {
    mode();
    onScroll();
  };
  listen(window, "resize", both, cleanups);
  listen(window, "scroll", onScroll, cleanups, { passive: true });
  both();
}

// "Our thinking": each heading row opens into its full card on hover, keyboard focus or tap.
function thinkingRows(root: HTMLElement, cleanups: Cleanup[]) {
  const items = qa<HTMLElement & { _pinned?: boolean }>(root, ".think-item");
  if (items.length === 0) return;
  const hoverable = window.matchMedia("(hover: hover) and (pointer: fine)");
  let lastTouch = false;
  listen(
    document,
    "pointerdown",
    (e: PointerEvent) => {
      lastTouch = e.pointerType === "touch" || e.pointerType === "pen";
    },
    cleanups,
    true,
  );
  const setOpen = (item: HTMLElement, open: boolean) => {
    item.classList.toggle("open", open);
    q(item, ".think-row")?.setAttribute("aria-expanded", open ? "true" : "false");
  };
  const closeOthers = (except: HTMLElement) =>
    items.forEach((it) => {
      if (it !== except && (it.classList.contains("open") || it._pinned)) {
        it._pinned = false;
        setOpen(it, false);
      }
    });
  items.forEach((item) => {
    const row = q<HTMLElement>(item, ".think-row");
    if (!row) return;
    listen(
      item,
      "mouseenter",
      () => {
        if (!hoverable.matches || lastTouch) return;
        closeOthers(item);
        setOpen(item, true);
      },
      cleanups,
    );
    listen(
      item,
      "mouseleave",
      () => {
        if (!hoverable.matches || item._pinned || item.contains(document.activeElement)) return;
        setOpen(item, false);
      },
      cleanups,
    );
    listen(
      item,
      "focusin",
      () => {
        closeOthers(item);
        setOpen(item, true);
      },
      cleanups,
    );
    listen(
      item,
      "focusout",
      (e: FocusEvent) => {
        if (item._pinned) return;
        if (!item.contains(e.relatedTarget as Node | null)) setOpen(item, false);
      },
      cleanups,
    );
    listen(
      item,
      "click",
      (e: MouseEvent) => {
        if (!lastTouch || !row.contains(e.target as Node)) return;
        e.preventDefault();
        e.stopPropagation();
        if (item.classList.contains("open") && item._pinned) {
          item._pinned = false;
          setOpen(item, false);
        } else {
          closeOthers(item);
          item._pinned = true;
          setOpen(item, true);
        }
      },
      cleanups,
      true,
    );
  });
}

const HUB = [
  {
    l: ["Segmentation policies", "Zone and flow maps", "Containment events"],
    r: ["One posture view", "Owners and findings", "Audit-ready evidence"],
    b: ["PostureOne"],
    d: "<strong>Micro-Segmentation and Containment.</strong> Segmentation partners whose platforms PostureOne brings into one posture view.",
  },
  {
    l: ["Data discovery findings", "Classification results", "AI data access"],
    r: ["PostureOne evidence", "EvalOne evidence", "Reviewer-ready reports"],
    b: ["PostureOne", "EvalOne"],
    d: "<strong>Data + AI Security and DSPM.</strong> Data security partners whose findings flow into PostureOne and EvalOne evidence.",
  },
  {
    l: ["FIDO2 biometric keys", "Key enrolment", "Hardware supply"],
    r: ["The AUTH key range", "Governed sign-in", "Support from XSignOn"],
    b: ["Passwordless Keys", "XSense"],
    d: "<strong>Hardware Biometric Passwordless Authentication.</strong> The hardware behind the AUTH key range, delivered and supported by XSignOn.",
  },
  {
    l: ["Cryptographic inventory", "Post-quantum methods", "Certificate and key use"],
    r: ["Migration plan", "Evidence per system", "Clear owners"],
    b: ["Quantum-Safe Security"],
    d: "<strong>Quantum-Safe Encryption and Cryptography.</strong> Cryptography partners supporting the move to post-quantum methods.",
  },
];

// Partner ecosystem hub: four tabs rotate every five seconds while on screen; Pause is in the prototype.
function partnerHub(root: HTMLElement, reduced: boolean, cleanups: Cleanup[]) {
  const hub = q<HTMLElement>(root, "#partnerHub");
  if (!hub) return;
  const INTERVAL = 5000;
  const tabs = qa<HTMLElement>(hub, ".hubx-tab");
  const pill = q<HTMLElement>(hub, "#hubxPill");
  const detail = q<HTMLElement>(hub, "#hubxDetail");
  const left = q<HTMLElement>(hub, "#hubxLeft");
  const right = q<HTMLElement>(hub, "#hubxRight");
  const plat = q<HTMLElement>(hub, "#hubxPlat");
  const prog = q<HTMLElement>(hub, "#hubxProg");
  const pauseButton = q<HTMLElement>(hub, "#hubxPause");
  const conns = qa<SVGElement>(hub, ".hx-conn");
  const pulses = qa<SVGElement>(hub, ".hx-pulse");
  let current = -1;
  let timer: number | null = null;
  let visible = false;
  let paused = false;

  const rowsHtml = (list: string[]) => list.map((t) => `<div class="hubx-row">${t}</div>`).join("");
  const place = () => {
    const tab = tabs[current];
    if (pill && tab) {
      pill.style.left = `${tab.offsetLeft}px`;
      pill.style.width = `${tab.offsetWidth}px`;
    }
  };
  const fill = (d: (typeof HUB)[number]) => {
    if (left) left.innerHTML = rowsHtml(d.l);
    if (right) right.innerHTML = rowsHtml(d.r);
    if (plat) plat.innerHTML = d.b.map((t) => `<div>${t}</div>`).join("");
    if (detail) detail.innerHTML = d.d;
  };
  const activate = (i: number, pulse: boolean) => {
    const first = current < 0;
    current = i;
    tabs.forEach((tab, j) => tab.setAttribute("aria-selected", j === i ? "true" : "false"));
    conns.forEach((c, j) => c.classList.toggle("on", j === i));
    place();
    if (first || reduced) fill(HUB[i]);
    else {
      left?.classList.add("swap");
      right?.classList.add("swap");
      window.setTimeout(() => {
        fill(HUB[i]);
        left?.classList.remove("swap");
        right?.classList.remove("swap");
      }, 160);
    }
    const p = pulses[i];
    if (pulse && !reduced && p) {
      p.classList.remove("go");
      void p.getBoundingClientRect();
      p.classList.add("go");
    }
  };
  const bar = (on: boolean) => {
    if (!prog) return;
    prog.classList.remove("run");
    if (on && !reduced) {
      void prog.offsetWidth;
      prog.style.animationDuration = `${INTERVAL}ms`;
      prog.classList.add("run");
    }
  };
  const clear = () => {
    if (timer !== null) window.clearTimeout(timer);
    timer = null;
    bar(false);
  };
  const schedule = () => {
    clear();
    if (paused || !visible || document.hidden) return;
    bar(true);
    timer = window.setTimeout(() => {
      activate((current + 1) % tabs.length, true);
      schedule();
    }, INTERVAL);
  };

  tabs.forEach((tab, i) =>
    listen(
      tab,
      "click",
      () => {
        activate(i, true);
        schedule();
      },
      cleanups,
    ),
  );
  if (pauseButton) {
    listen(
      pauseButton,
      "click",
      () => {
        paused = !paused;
        pauseButton.setAttribute("aria-pressed", String(paused));
        pauseButton.textContent = paused ? "Play" : "Pause";
        schedule();
      },
      cleanups,
    );
  }
  listen(document, "visibilitychange", schedule, cleanups);
  listen(window, "resize", place, cleanups);
  activate(0, false);
  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      if (visible) {
        hub.classList.add("inview");
        place();
        activate(current, true);
      }
      schedule();
    },
    { threshold: 0.15 },
  );
  observer.observe(hub);
  cleanups.push(() => {
    observer.disconnect();
    clear();
  });
}

export function initHome(root: HTMLElement): Cleanup {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanups: Cleanup[] = [];
  // The prototype's styles hide things (collapsed rows, reveal-on-scroll) only when this class is on
  // <html>, so a visitor without JavaScript sees everything. Added here, and removed on leaving Home.
  document.documentElement.classList.add("js");
  cleanups.push(() => document.documentElement.classList.remove("js"));
  heroCard(root, reduced, cleanups);
  coverflow(root, reduced, cleanups);
  reveal(root, reduced, cleanups);
  proofWords(root, reduced, cleanups);
  journey(root, reduced, cleanups);
  thinkingRows(root, cleanups);
  partnerHub(root, reduced, cleanups);
  return () => cleanups.forEach((fn) => fn());
}
