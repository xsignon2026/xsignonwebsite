"use client";

import { useEffect, useRef, useId } from "react";
import { motionCoordinator } from "./motionCoordinator";

export interface BeamsCanvasProps {
  id?: string;
  className?: string;
  density?: "default" | "subtle";
}

interface Beam {
  horiz: boolean;
  line: number;
  p: number;
  v: number;
  len: number;
  red: boolean;
}

export function BeamsCanvas({
  id: propId,
  className = "hero-beams",
  density = "default",
}: BeamsCanvasProps) {
  const generatedId = useId();
  const canvasId = propId || `beams-${generatedId}`;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const x = c.getContext("2d");
    if (!x) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const S = 56;
    let w = 0;
    let h = 0;
    let beams: Beam[] = [];
    let isIntersecting = false;
    let isCoordinatorActive = false;
    let last = 0;
    let animId: number | null = null;

    function rnd(a: number, b: number): number {
      return a + Math.random() * (b - a);
    }

    function mk(): Beam {
      const horiz = Math.random() < 0.5;
      const max = horiz ? h : w;
      return {
        horiz,
        line: Math.max(1, Math.floor(rnd(1, max / S))) * S,
        p: rnd(-200, horiz ? w : h),
        v: rnd(60, 130),
        len: rnd(90, 190),
        red: Math.random() < 0.2,
      };
    }

    function size() {
      if (!c || !x) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);

      const factor = density === "subtle" ? 80000 : 60000;
      const n = Math.max(4, Math.min(16, Math.round((w * h) / factor)));
      beams = [];
      for (let i = 0; i < n; i++) beams.push(mk());
      draw(0);
    }

    function draw(dt: number) {
      if (!x) return;
      x.clearRect(0, 0, w, h);
      x.strokeStyle = "rgba(255,255,255,.05)";
      x.lineWidth = 1;

      for (let gx = 0; gx < w; gx += S) {
        x.beginPath();
        x.moveTo(gx + 0.5, 0);
        x.lineTo(gx + 0.5, h);
        x.stroke();
      }
      for (let gy = 0; gy < h; gy += S) {
        x.beginPath();
        x.moveTo(0, gy + 0.5);
        x.lineTo(w, gy + 0.5);
        x.stroke();
      }

      if (reduce) return;

      for (let i = 0; i < beams.length; i++) {
        let b = beams[i];
        b.p += b.v * dt;
        if (b.p - b.len > (b.horiz ? w : h)) {
          beams[i] = b = mk();
          b.p = -10;
        }
        const x0 = b.horiz ? b.p - b.len : b.line;
        const y0 = b.horiz ? b.line : b.p - b.len;
        const x1 = b.horiz ? b.p : b.line;
        const y1 = b.horiz ? b.line : b.p;
        const g = x.createLinearGradient(x0, y0, x1, y1);
        const col = b.red ? "255,90,98" : "169,225,255";
        g.addColorStop(0, `rgba(${col},0)`);
        g.addColorStop(1, `rgba(${col},.7)`);
        x.strokeStyle = g;
        x.lineWidth = 1.5;
        x.beginPath();
        x.moveTo(x0, y0);
        x.lineTo(x1, y1);
        x.stroke();
      }
    }

    function loop(now: number) {
      if (isIntersecting && isCoordinatorActive && w && h && !document.hidden) {
        draw(Math.min((now - last) / 1000, 0.05));
      }
      last = now;
      if (!reduce && isCoordinatorActive && isIntersecting) {
        animId = requestAnimationFrame(loop);
      } else {
        animId = null;
      }
    }

    function startLoop() {
      if (reduce || animId !== null) return;
      animId = requestAnimationFrame((t) => {
        last = t;
        loop(t);
      });
    }

    function stopLoop() {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }

    // Register with MotionCoordinator
    motionCoordinator.register(canvasId, {
      resume: () => {
        isCoordinatorActive = true;
        if (isIntersecting) startLoop();
      },
      pause: () => {
        isCoordinatorActive = false;
        stopLoop();
      },
    });

    let resizeObs: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObs = new ResizeObserver(() => {
        if (c.clientWidth && c.clientHeight) size();
      });
      resizeObs.observe(c);
    }

    let interObs: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      interObs = new IntersectionObserver((entries) => {
        const entry = entries[0];
        isIntersecting = entry?.isIntersecting ?? false;
        if (isIntersecting) {
          motionCoordinator.requestActive(canvasId);
          isCoordinatorActive = true;
          startLoop();
        } else {
          motionCoordinator.releaseActive(canvasId);
          isCoordinatorActive = false;
          stopLoop();
        }
      });
      interObs.observe(c);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (isIntersecting && isCoordinatorActive) {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    size();

    return () => {
      stopLoop();
      motionCoordinator.unregister(canvasId);
      resizeObs?.disconnect();
      interObs?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [canvasId, density]);

  return <canvas ref={canvasRef} className={className} id={canvasId} aria-hidden="true" />;
}
