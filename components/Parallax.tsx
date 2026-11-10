"use client";

import { useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const PHONE = "(max-width: 767px)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(PHONE);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/** True below the md breakpoint (false during SSR / first paint). */
export function useIsPhone() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(PHONE).matches, () => false);
}

/**
 * Scroll parallax: the wrapped content drifts vertically as it passes through
 * the viewport, so layers move at slightly different rates.
 *
 *   travel > 0  — moves faster than the page (reads as nearer)
 *   travel < 0  — moves slower than the page (reads as further back)
 *
 * `phone` scales the travel on small screens (0 switches it off there).
 * Off entirely for reduced motion.
 */
export default function Parallax({
  children, travel = 24, phone = 0.4, className, style,
}: { children: ReactNode; travel?: number; phone?: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isPhone = useIsPhone();
  const amount = reduced ? 0 : travel * (isPhone ? phone : 1);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}
