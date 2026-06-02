"use client";

import { MotionConfig } from "framer-motion";

/**
 * Respects the OS "reduce motion" setting: Framer disables transform/layout
 * animations (scatter, slides, scale, rotate, infinite floats) and keeps only
 * gentle opacity fades. Pairs with useReveal, which also goes static.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
