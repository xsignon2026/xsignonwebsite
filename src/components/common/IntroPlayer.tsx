"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const SEEN_KEY = "xs-intro-seen";
// If the video cannot start or stalls, the intro ends on its own so nobody is stuck behind it.
const FAILSAFE_MS = 9000;
const FADE_MS = 700;

const subscribeNothing = () => () => {};

function readSkip(): boolean {
  try {
    return (
      sessionStorage.getItem(SEEN_KEY) === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  } catch {
    return false;
  }
}

// The start-of-visit intro: the XSignOn sign-in animation plays full screen once per visit (muted),
// then fades away to reveal the page. It can be skipped with the button or the Escape key, and it is not
// shown at all when the visitor prefers reduced motion.
export function IntroPlayer({ src }: { src: string }) {
  const [state, setState] = useState<"playing" | "leaving" | "done">("playing");
  const videoRef = useRef<HTMLVideoElement>(null);

  const finish = useCallback(() => {
    setState((s) => (s === "playing" ? "leaving" : s));
  }, []);

  // Skip straight away when this visit has already seen it or motion is reduced. Read through
  // useSyncExternalStore so the server render and the first client render agree.
  const skipped = useSyncExternalStore(subscribeNothing, readSkip, () => false);

  // Keep the page still behind the intro, and allow Escape to skip it.
  useEffect(() => {
    if (state !== "playing" || skipped) return;
    document.documentElement.classList.add("intro-lock");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    const timer = window.setTimeout(finish, FAILSAFE_MS);
    void videoRef.current?.play().catch(finish);
    return () => {
      document.documentElement.classList.remove("intro-lock");
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [state, skipped, finish]);

  useEffect(() => {
    if (state !== "leaving") return;
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Private mode: the intro may play again on the next page load, which is harmless.
      }
      setState("done");
    }, FADE_MS);
    return () => window.clearTimeout(timer);
  }, [state]);

  if (state === "done" || skipped) return null;

  return (
    <div
      className={state === "leaving" ? "intro intro-out" : "intro"}
      role="region"
      aria-label="XSignOn introduction"
    >
      <video
        ref={videoRef}
        className="intro-video"
        src={src}
        muted
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
        onEnded={finish}
        onError={finish}
      />
      <button type="button" className="intro-skip" onClick={finish}>
        Skip intro
      </button>
    </div>
  );
}
