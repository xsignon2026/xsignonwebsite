"use client";

import { useEffect, useRef } from "react";

// T-091: Hero background canvas: faint grid with traveling light beams.
// Self-pausing when off-screen, static under prefers-reduced-motion.
// Source: xsignon-home-beams.html (lines 5389-5433).
export function HeroBeams() {
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
    interface Beam {
      horiz: boolean;
      line: number;
      p: number;
      v: number;
      len: number;
      red: boolean;
    }
    let beams: Beam[] = [];
    let vis = true;
    let last = 0;
    let animId: number | null = null;

    function rnd(a: number, b: number) {
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
      if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      x?.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(6, Math.min(16, Math.round((w * h) / 60000)));
      beams = [];
      for (let i = 0; i < n; i++) beams.push(mk());
      draw(0);
    }

    function draw(dt: number) {
      if (!x) return;
      x.clearRect(0, 0, w, h);
      x.strokeStyle = "rgba(255,255,255,.05)";
      x.lineWidth = 1;
      let gx: number;
      let gy: number;
      for (gx = 0; gx < w; gx += S) {
        x.beginPath();
        x.moveTo(gx + 0.5, 0);
        x.lineTo(gx + 0.5, h);
        x.stroke();
      }
      for (gy = 0; gy < h; gy += S) {
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
      if (vis && w && h && !document.hidden) {
        draw(Math.min((now - last) / 1000, 0.05));
      }
      last = now;
      if (!reduce) animId = requestAnimationFrame(loop);
    }

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
        vis = entries[0]?.isIntersecting ?? true;
      });
      interObs.observe(c);
    }

    size();
    animId = requestAnimationFrame((t) => {
      last = t;
      loop(t);
    });

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObs?.disconnect();
      interObs?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-beams"
      id="heroBeams"
      aria-hidden="true"
    />
  );
}
