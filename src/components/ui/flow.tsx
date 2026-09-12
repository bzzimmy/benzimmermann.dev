"use client";

import { useEffect, useRef } from "react";

const WIDTH = 1200;
const STEP = 20;
const LINES = 10;

type Line = {
  speed: number;
  seed: number;
  amp: number;
  y: number;
  opacity: number;
};

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeLines(height: number): Line[] {
  return Array.from({ length: LINES }, (_, i) => ({
    speed: rand(0.08, 0.16),
    seed: rand(0, 100),
    amp: height * rand(0.06, 0.11),
    y: height * (0.3 + (i / (LINES - 1)) * 0.45) + rand(-4, 4),
    opacity: rand(0.25, 0.9),
  }));
}

function noise(x: number, t: number, seed: number) {
  return (
    Math.sin(x * 0.006 + t + seed) * Math.sin(x * 0.0025 + t * 0.6 + seed * 2) +
    Math.sin(x * 0.011 + t * 1.1 + seed * 0.5) * 0.45 +
    Math.sin(x * 0.0017 + t * 0.35 + seed * 3) * 1.6 +
    Math.sin(x * 0.021 - t * 0.8 + seed * 1.7) * 0.2
  );
}

function path(t: number, l: Line) {
  let prevY = l.y + noise(0, t, l.seed) * l.amp;
  let d = `M 0 ${prevY}`;
  for (let x = STEP; x <= WIDTH; x += STEP) {
    const y = l.y + noise(x, t, l.seed) * l.amp;
    d += ` Q ${x - STEP / 2} ${prevY} ${x} ${y}`;
    prevY = y;
  }
  return d;
}

export function Flow({
  height = 180,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const paths = ref.current?.querySelectorAll("path");
    if (!paths) return;
    const lines = makeLines(height);
    lines.forEach((l, i) => paths[i].setAttribute("opacity", String(l.opacity)));
    const start = performance.now() - Math.random() * 10000;
    let frame: number;
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      lines.forEach((l, i) => paths[i].setAttribute("d", path(t * l.speed, l)));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [height]);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${height}`}
      preserveAspectRatio="none"
      className={`pointer-events-none w-full ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flow-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.2" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="flow-mask">
          <rect width={WIDTH} height={height} fill="url(#flow-fade)" />
        </mask>
      </defs>
      <g
        ref={ref}
        mask="url(#flow-mask)"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      >
        {Array.from({ length: LINES }, (_, i) => (
          <path key={i} />
        ))}
      </g>
    </svg>
  );
}
