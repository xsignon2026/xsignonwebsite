// Interactive pieces shared by the pages that were converted from the approved prototype, ported from
// reference/prototype-v5/js (01.js, 05.js). They work on markup rendered on the server, so every page is
// readable before any of this runs. The only HTML written here is built from the fixed text below.
import { listen, q, qa, reveal, type Cleanup } from "@/components/home/home-behaviors";

export type Feature =
  "reveal" | "docTabs" | "productTabs" | "overview" | "reviewLoop" | "thinkCarousel";

// Documentation tabs (XSense, AMS, key pages): click a tab to show its panel.
function docTabs(root: HTMLElement, cleanups: Cleanup[]) {
  qa<HTMLElement>(root, "[data-tabs]").forEach((box) => {
    const buttons = qa<HTMLElement>(box, ".tab-btn");
    const panels = qa<HTMLElement>(box, ".tab-panel");
    buttons.forEach((button) =>
      listen(
        button,
        "click",
        () => {
          buttons.forEach((b) => b.setAttribute("aria-selected", "false"));
          button.setAttribute("aria-selected", "true");
          const index = button.getAttribute("data-tab");
          panels.forEach((panel) => {
            panel.hidden = panel.getAttribute("data-panel") !== index;
          });
        },
        cleanups,
      ),
    );
  });
}

// Products hub, "Platform" tabs: arrow keys move between tabs.
function productTabs(root: HTMLElement, cleanups: Cleanup[]) {
  const list = q<HTMLElement>(root, "#prodxTabs");
  if (!list) return;
  const tabs = qa<HTMLElement>(list, ".prodx-tab");
  const panels = qa<HTMLElement>(root, ".prodx-panel");
  const show = (index: number, focus = false) => {
    tabs.forEach((tab, j) => {
      tab.setAttribute("aria-selected", j === index ? "true" : "false");
      tab.tabIndex = j === index ? 0 : -1;
    });
    panels.forEach((panel, j) => {
      panel.classList.toggle("on", j === index);
      panel.hidden = j !== index;
    });
    if (focus) tabs[index].focus();
  };
  tabs.forEach((tab, i) => listen(tab, "click", () => show(i), cleanups));
  listen(
    list,
    "keydown",
    (e: KeyboardEvent) => {
      const i = tabs.indexOf(document.activeElement as HTMLElement);
      if (i < 0) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        show((i + 1) % tabs.length, true);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        show((i - 1 + tabs.length) % tabs.length, true);
      }
    },
    cleanups,
  );
}

const OVERVIEW_NAMES: Record<string, string> = {
  postureone: "PostureOne",
  xsense: "XSense",
  authtouch: "AUTH Touch",
};

// Products hub overview: pick which products appear in the comparison table.
function overview(root: HTMLElement, cleanups: Cleanup[]) {
  const count = q<HTMLElement>(root, "#ovCount");
  if (!count) return;
  const clear = q<HTMLElement>(root, "#ovClear");
  const addback = q<HTMLElement>(root, "#ovAddback");
  const addButtons = q<HTMLElement>(root, "#ovAddBtns");
  const tableWrap = q<HTMLElement>(root, "#ovTableWrap");
  const selected: Record<string, boolean> = { postureone: true, xsense: true, authtouch: true };

  const render = (focusKey: string | null, focusAdd: boolean) => {
    let n = 0;
    const removed: string[] = [];
    Object.keys(OVERVIEW_NAMES).forEach((key) => {
      if (selected[key]) n++;
      else removed.push(key);
      qa<HTMLElement>(root, `[data-ov-card="${key}"]`).forEach((c) => (c.hidden = !selected[key]));
      qa<HTMLElement>(root, `[data-ov-col="${key}"]`).forEach((c) =>
        c.classList.toggle("ov-hidden", !selected[key]),
      );
    });
    count.textContent = `${n} of 3 selected`;
    if (clear) clear.hidden = n === 0;
    if (tableWrap) tableWrap.hidden = n === 0;
    if (addback && addButtons) {
      addback.hidden = removed.length === 0;
      addButtons.replaceChildren(
        ...removed.map((key) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "ov-add-btn";
          button.textContent = `Add ${OVERVIEW_NAMES[key]}`;
          button.setAttribute("data-ov-add", key);
          button.addEventListener("click", () => {
            selected[key] = true;
            render(key, false);
          });
          return button;
        }),
      );
    }
    if (focusKey) {
      q<HTMLElement>(
        root,
        focusAdd ? `[data-ov-add="${focusKey}"]` : `[data-ov-remove="${focusKey}"]`,
      )?.focus();
    }
  };

  qa<HTMLElement>(root, "[data-ov-remove]").forEach((button) =>
    listen(
      button,
      "click",
      () => {
        const key = button.getAttribute("data-ov-remove") ?? "";
        selected[key] = false;
        render(key, true);
      },
      cleanups,
    ),
  );
  if (clear) {
    listen(
      clear,
      "click",
      () => {
        Object.keys(OVERVIEW_NAMES).forEach((key) => (selected[key] = false));
        render("postureone", true);
      },
      cleanups,
    );
  }
  render(null, false);
}

// PostureOne panel: an ambient review loop that ticks items off every 2.3 seconds.
function reviewLoop(root: HTMLElement, reduced: boolean, cleanups: Cleanup[]) {
  const items = qa<HTMLElement>(root, "[data-rev]");
  const countEl = q<HTMLElement>(root, "#poCount");
  const statusEl = q<HTMLElement>(root, "#poStatus");
  if (items.length === 0 || !countEl || !statusEl || reduced) return;
  const states = ["Checking evidence", "Owner confirmed", "Evidence attached", "Review complete"];
  let step = 0;
  const timer = window.setInterval(() => {
    step++;
    if (step > items.length) {
      items.forEach((item) => item.classList.remove("done"));
      step = 0;
      countEl.textContent = "1 of 4 reviewed";
      statusEl.textContent = "Evidence attached";
      return;
    }
    items[step - 1].classList.add("done");
    countEl.textContent = `${step + 1} of 4 reviewed`;
    statusEl.textContent = states[step - 1];
  }, 2300);
  cleanups.push(() => window.clearInterval(timer));
}

// "Our thinking" carousel: article cards glide past, three at a time on wide screens, two on tablets, one
// on phones. The row is doubled so it loops without a jump. It stands still under "reduce motion".
function thinkCarousel(root: HTMLElement, reduced: boolean, cleanups: Cleanup[]) {
  const carousel = q<HTMLElement>(root, "#prodThinkCar");
  if (!carousel) return;
  const GAP = 18;
  const STEP = 3200;
  const track = q<HTMLElement>(carousel, ".tc2-track");
  const view = q<HTMLElement>(carousel, ".tc2-view");
  const dotsEl = q<HTMLElement>(carousel, ".tc2-dots");
  if (!track || !view || !dotsEl) return;
  const originals = Array.from(track.children) as HTMLElement[];
  const total = originals.length;
  originals.forEach((card) => {
    const copy = card.cloneNode(true) as HTMLElement;
    copy.setAttribute("aria-hidden", "true");
    copy.tabIndex = -1;
    track.appendChild(copy);
  });
  const cards = Array.from(track.children) as HTMLElement[];
  let index = 0;
  let width = 0;
  let timer: number | null = null;

  const perView = () => (window.innerWidth >= 1000 ? 3 : window.innerWidth >= 640 ? 2 : 1);
  const mark = () =>
    Array.from(dotsEl.children).forEach((dot, j) =>
      dot.classList.toggle("on", j === index % total),
    );
  const move = (animate: boolean) => {
    if (!animate) track.style.transition = "none";
    track.style.transform = `translateX(${-index * (width + GAP)}px)`;
    if (!animate) {
      void track.offsetWidth;
      track.style.transition = "";
    }
    mark();
  };
  const stop = () => {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
  };
  const restart = () => {
    stop();
    if (reduced) return;
    timer = window.setInterval(() => {
      if (!document.hidden && width) {
        index += 1;
        move(true);
      }
    }, STEP);
  };
  const layout = () => {
    const w = view.clientWidth;
    if (!w) return;
    const n = perView();
    width = (w - GAP * (n - 1)) / n;
    cards.forEach((card) => (card.style.width = `${width}px`));
    move(false);
  };

  dotsEl.replaceChildren(
    ...originals.map((_, i) => {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Show article ${i + 1}`);
      button.addEventListener("click", () => {
        index = i;
        move(true);
        restart();
      });
      return button;
    }),
  );
  listen(
    track,
    "transitionend",
    (e: TransitionEvent) => {
      if (e.target !== track) return;
      if (index >= total) {
        index -= total;
        move(false);
      }
    },
    cleanups,
  );
  mark();
  const observer = new ResizeObserver(layout);
  observer.observe(view);
  listen(window, "resize", layout, cleanups);
  layout();
  restart();
  cleanups.push(() => {
    observer.disconnect();
    stop();
    cards.slice(total).forEach((copy) => copy.remove());
  });
}

export function initPrototypePage(root: HTMLElement, features: Feature[]): Cleanup {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanups: Cleanup[] = [];
  // The prototype's styles hide things (reveal-on-scroll, collapsed panels) only when this class is on
  // <html>, so a visitor without JavaScript sees everything. Removed again on leaving the page.
  document.documentElement.classList.add("js");
  cleanups.push(() => document.documentElement.classList.remove("js"));
  if (features.includes("reveal")) reveal(root, reduced, cleanups);
  if (features.includes("docTabs")) docTabs(root, cleanups);
  if (features.includes("productTabs")) productTabs(root, cleanups);
  if (features.includes("overview")) overview(root, cleanups);
  if (features.includes("reviewLoop")) reviewLoop(root, reduced, cleanups);
  if (features.includes("thinkCarousel")) thinkCarousel(root, reduced, cleanups);
  return () => cleanups.forEach((fn) => fn());
}
