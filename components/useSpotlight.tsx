"use client";

import { useRef, useState } from "react";

type SpotlightOpts = {
  radius?: number;
  color?: string;
};

/**
 * Cursor-following radial glow. Spread `handlers` onto a position:relative,
 * overflow:hidden container and render `overlay` as its first child. Keep the
 * real content above it (position:relative / z-index).
 *
 * Works on touch too: tapping/dragging lights the glow at the finger, then it
 * fades out shortly after release so mobile cards aren't visually dead.
 */
export function useSpotlight({ radius = 340, color = "rgb(var(--gold-rgb) / 0.13)" }: SpotlightOpts = {}) {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [active, setActive] = useState(false);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const moveTo = (clientX: number, clientY: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setPos({ x: clientX - r.left, y: clientY - r.top });
  };

  const handlers = {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => moveTo(e.clientX, e.clientY, e.currentTarget),
    onMouseEnter: () => setActive(true),
    onMouseLeave: () => setActive(false),
    onTouchStart: (e: React.TouchEvent<HTMLElement>) => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      const t = e.touches[0];
      if (t) moveTo(t.clientX, t.clientY, e.currentTarget);
      setActive(true);
    },
    onTouchMove: (e: React.TouchEvent<HTMLElement>) => {
      const t = e.touches[0];
      if (t) moveTo(t.clientX, t.clientY, e.currentTarget);
    },
    onTouchEnd: () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      fadeTimer.current = setTimeout(() => setActive(false), 900);
    },
  };

  const overlay = (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        borderRadius: "inherit",
        background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 65%)`,
        opacity: active ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    />
  );

  return { handlers, overlay };
}
