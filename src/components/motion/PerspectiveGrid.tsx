"use client";

import { useEffect, useRef, useId } from "react";
import { motionCoordinator } from "./motionCoordinator";

export interface PerspectiveGridProps {
  id?: string;
  className?: string;
  horizon?: number;
  alpha?: number;
}

export function PerspectiveGrid({
  id: propId,
  className = "bg-persp",
  horizon = 0.35,
  alpha = 0.6,
}: PerspectiveGridProps) {
  const generatedId = useId();
  const canvasId = propId || `persp-${generatedId}`;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const x = c.getContext("2d");
    if (!x) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let isIntersecting = false;
    let isCoordinatorActive = false;
    let last = 0;
    let t = 0;
    let animId: number | null = null;

    function bandRGB(): string {
      if (typeof window === "undefined") return "8,7,13";
      try {
        const hVal = getComputedStyle(document.documentElement)
          .getPropertyValue("--d1")
          .trim()
          .replace("#", "");
        if (hVal.length !== 6) return "8,7,13";
        return [0, 2, 4].map((i) => parseInt(hVal.substring(i, i + 2), 16)).join(",");
      } catch {
        return "8,7,13";
      }
    }

    function size() {
      if (!c || !x) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    function draw() {
      if (!x) return;
      x.clearRect(0, 0, w, h);
      const hy = h * horizon;
      const cx = w * 0.5;
      const rows = 12;
      const off = reduce ? 0 : (t * 0.3) % 1;

      x.lineWidth = 1;
      for (let i = -22; i <= 22; i++) {
        x.strokeStyle = `rgba(120,170,255,${0.2 * alpha})`;
        x.beginPath();
        x.moveTo(cx + i * 14, hy);
        x.lineTo(cx + i * (w / 9), h);
        x.stroke();
      }

      for (let k = 0; k < rows; k++) {
        const p = (k + off) / rows;
        const y = hy + (h - hy) * Math.pow(p, 2.2);
        x.strokeStyle = `rgba(120,170,255,${(0.04 + 0.24 * p) * alpha})`;
        x.beginPath();
        x.moveTo(0, y);
        x.lineTo(w, y);
        x.stroke();
      }

      const g = x.createLinearGradient(0, hy - 2, 0, hy + h * 0.18);
      const d = bandRGB();
      g.addColorStop(0, `rgb(${d})`);
      g.addColorStop(1, `rgba(${d},0)`);
      x.fillStyle = g;
      x.fillRect(0, hy - 2, w, h * 0.18 + 2);
    }

    function loop(now: number) {
      if (isIntersecting && isCoordinatorActive && w && h && !document.hidden) {
        t += Math.min((now - last) / 1000, 0.05);
        draw();
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
      animId = requestAnimationFrame((n) => {
        last = n;
        loop(n);
      });
    }

    function stopLoop() {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }

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
  }, [canvasId, horizon, alpha]);

  return <canvas ref={canvasRef} className={className} id={canvasId} aria-hidden="true" />;
}
