"use client";

import { useState } from "react";

type SpotlightOpts = {
  radius?: number;
  color?: string;
};

/**
 * Cursor-following radial glow. Spread `handlers` onto a position:relative,
 * overflow:hidden container and render `overlay` as its first child. Keep the
 * real content above it (position:relative / z-index).
 */
export function useSpotlight({ radius = 340, color = "rgba(196,98,45,0.13)" }: SpotlightOpts = {}) {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [active, setActive] = useState(false);

  const handlers = {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    },
    onMouseEnter: () => setActive(true),
    onMouseLeave: () => setActive(false),
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
