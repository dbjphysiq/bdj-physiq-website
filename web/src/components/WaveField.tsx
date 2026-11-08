"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative wave-interference field: three coherent point sources whose
 * circular waves add and cancel, sampled on a grid of points. Crests are
 * drawn in amber, the rest in sky blue.
 *
 * - Pure canvas, no image download, no dependencies.
 * - Draws in a handful of batched paths per frame (one per brightness level).
 * - Draws nothing until the canvas nears the viewport, and starts animating
 *   only once the browser is idle, so it never competes with page load.
 * - Runs at about 30 fps on screens 768 px and wider, and pauses when off
 *   screen or in a background tab. Phones get a still frame (battery, CPU).
 * - Visitors who prefer reduced motion get a single still frame.
 */
type Source = { x: number; y: number; k: number; w: number; p: number };

// Two coherent sources (same wavenumber and frequency): the classic
// interference pattern, with rings and the hyperbolic fringes between them.
const DEFAULT_SOURCES: Source[] = [
  { x: 0.74, y: 0.22, k: 0.05, w: 1.4, p: 0 },
  { x: 0.94, y: 0.68, k: 0.05, w: 1.4, p: 0 },
];

const LEVELS = 7;

export function WaveField({
  className = "",
  spacing = 18,
  intensity = 1,
  animated = true,
  sources = DEFAULT_SOURCES,
  amberAt = 0.9,
}: {
  className?: string;
  /** Distance between sample points, in CSS pixels. */
  spacing?: number;
  /** Overall opacity multiplier, 0 to 1. */
  intensity?: number;
  animated?: boolean;
  sources?: Source[];
  /** Normalised amplitude above which a point is drawn in amber (crests only). */
  amberAt?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const shouldAnimate = animated && !reduce && wide;
    const STILL_T = 2.4;

    let width = 0;
    let height = 0;
    let raf = 0;
    let idle = 0;
    let last = 0;
    let onScreen = false;
    let drawn = false;
    let cancelled = false;
    const start = performance.now();
    const now = () => (shouldAnimate ? (performance.now() - start) / 1000 : STILL_T);

    // Run work when the main thread is free, so it never delays page load.
    // (Safari before 18 has no requestIdleCallback; fall back to a short timeout.)
    const hasIdle = typeof window.requestIdleCallback === "function";
    const whenIdle = (fn: () => void) => {
      idle = hasIdle ? window.requestIdleCallback(fn, { timeout: 1500 }) : window.setTimeout(fn, 200);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const blue: Path2D[] = Array.from({ length: LEVELS }, () => new Path2D());
      const amber: Path2D[] = Array.from({ length: LEVELS }, () => new Path2D());
      const half = spacing / 2;

      for (let y = half; y < height; y += spacing) {
        for (let x = half; x < width; x += spacing) {
          let a = 0;
          for (let i = 0; i < sources.length; i++) {
            const s = sources[i];
            const dx = x - s.x * width;
            const dy = y - s.y * height;
            const r = Math.sqrt(dx * dx + dy * dy);
            a += Math.sin(r * s.k - t * s.w + s.p) / Math.sqrt(1 + r * 0.006);
          }
          // Map amplitude to 0..1, then emphasise the crests so fringes read clearly.
          const m = Math.min(1, Math.max(0, (a / 1.25 + 1) / 2));
          const level = Math.min(LEVELS - 1, Math.floor(Math.pow(m, 1.6) * LEVELS));
          if (level === 0) continue;
          const radius = 0.6 + (level / (LEVELS - 1)) * 1.7;
          const target = m > amberAt ? amber[level] : blue[level];
          target.moveTo(x + radius, y);
          target.arc(x, y, radius, 0, Math.PI * 2);
        }
      }

      for (let l = 1; l < LEVELS; l++) {
        const alpha = (0.05 + (l / (LEVELS - 1)) * 0.7) * intensity;
        ctx.fillStyle = `rgba(139, 185, 242, ${alpha.toFixed(3)})`;
        ctx.fill(blue[l]);
        ctx.fillStyle = `rgba(237, 161, 0, ${Math.min(1, alpha * 1.25).toFixed(3)})`;
        ctx.fill(amber[l]);
      }
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!onScreen || document.hidden || !drawn) return;
      if (t - last < 33) return; // about 30 fps
      last = t;
      draw((t - start) / 1000);
    };

    const firstDraw = () => {
      if (cancelled || drawn) return;
      resize();
      draw(now());
      drawn = true;
      canvas.style.opacity = "1";
      if (shouldAnimate) raf = requestAnimationFrame(frame);
    };

    // Redraw on resize, but only once the first frame exists.
    const ro = new ResizeObserver(() => {
      if (!drawn) return;
      resize();
      draw(now());
    });
    ro.observe(canvas);

    // First draw is lazy: only when the canvas comes near the viewport.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !drawn) whenIdle(firstDraw);
      },
      { rootMargin: "200px" },
    );
    io.observe(canvas);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      ro.disconnect();
      io.disconnect();
    };
  }, [animated, intensity, spacing, sources, amberAt]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none opacity-0 transition-opacity duration-1000 ${className}`}
    />
  );
}
