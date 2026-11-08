"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from "framer-motion";
import { SPRING } from "@/lib/motion";

/**
 * 3D tilt-on-hover for cards. The surface leans toward the cursor (rotateX/Y
 * via spring) with an optional light sheen that tracks the pointer, and a
 * subtle lift. Physics-driven, not a canned CSS transition — reads as crafted.
 *
 * Mouse-driven, so it's naturally inert on touch (no hover events fire), and
 * fully disabled under the OS reduce-motion setting (renders a plain box).
 *
 * Give the styled surface to Tilt via `style` so the box itself tilts (not a
 * flat background behind tilting content). Nest inside a reveal wrapper when
 * both are wanted — each div owns its own transform.
 */
export default function Tilt({
  children,
  className = "",
  style,
  max = 7,
  hoverScale = 1.015,
  sheen = true,
  glare = "rgba(255,255,255,0.14)",
  fill = false,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  max?: number;
  hoverScale?: number;
  sheen?: boolean;
  glare?: string;
  /** Stretch to fill the parent's height (for grid/stretch cells). Off = hug content. */
  fill?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const srx = useSpring(rx, SPRING.magnetic);
  const sry = useSpring(ry, SPRING.magnetic);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width; // 0..1
    const ny = (e.clientY - r.top) / r.height;
    ry.set((nx - 0.5) * 2 * max); // horizontal → rotateY
    rx.set(-(ny - 0.5) * 2 * max); // vertical → rotateX
    px.set(nx * 100);
    py.set(ny * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    setActive(false);
  };

  const sheenBg = useMotionTemplate`radial-gradient(240px circle at ${px}% ${py}%, ${glare}, transparent 62%)`;

  if (reduced) {
    return (
      <div className={className} style={{ ...style, ...(fill ? { height: "100%" } : null) }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={reset}
      style={{ perspective: 900, ...(fill ? { height: "100%" } : null) }}
    >
      <motion.div
        whileHover={{ scale: hoverScale }}
        transition={{ type: "spring", ...SPRING.gentle }}
        style={{
          ...style,
          ...(fill ? { height: "100%" } : null),
          position: "relative",
          rotateX: srx,
          rotateY: sry,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        {sheen && (
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: sheenBg,
              opacity: active ? 1 : 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
