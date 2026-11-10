"use client";

import { useEffect, ViewTransition } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { markLoaded } from "@/lib/viewTransition";

/**
 * Respects the OS "reduce motion" setting: Framer disables transform/layout
 * animations (scatter, slides, scale, rotate, infinite floats) and keeps only
 * gentle opacity fades. The Reveal components inherit this, so their entrances
 * reduce to a fade.
 *
 * Also hosts the route-transition trigger: React only opens a browser view
 * transition when a <ViewTransition> boundary changes, so a 1px marker keyed
 * to the pathname changes on every navigation. The visible animation is all
 * CSS (globals.css): the viewport cross-fades, and elements sharing a
 * view-transition-name (case-study card → hero) morph into each other.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // After the first page has mounted, later navigations are client-side.
  useEffect(() => { markLoaded(); }, []);
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <ViewTransition>
        <span key={pathname} aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, width: 1, height: 1, pointerEvents: "none" }} />
      </ViewTransition>
    </MotionConfig>
  );
}
