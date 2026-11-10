"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Minimal terracotta cursor for fine-pointer (mouse) devices: an exact-tracking
 * dot plus a lagging ring that grows over interactive elements and contracts on
 * press. Touch devices keep the native cursor (component renders nothing).
 */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const read = (t: Element | null) => {
      setHovering(
        !!t?.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor]')
      );
      setLabel(t?.closest("[data-cursor-label]")?.getAttribute("data-cursor-label") ?? null);
    };
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      read(e.target as Element | null);
    };
    // The page can scroll under a still pointer — re-read what is beneath it so
    // the hover / label state never goes stale.
    const onScroll = () => read(document.elementFromPoint(x.get(), y.get()));
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Lagging ring */}
      <motion.div style={{ x: ringX, y: ringY }} className="absolute top-0 left-0">
        <motion.div
          animate={{
            width: label ? 78 : hovering ? 56 : 32,
            height: label ? 78 : hovering ? 56 : 32,
            opacity: label ? 1 : hovering ? 0.9 : 0.55,
            scale: down ? 0.82 : 1,
            backgroundColor: label ? "rgba(204, 106, 51, 0.94)" : "rgba(204, 106, 51, 0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          style={{
            translateX: "-50%",
            translateY: "-50%",
            borderRadius: "9999px",
            border: "1.5px solid var(--gold)",
            display: "grid",
            placeItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Labelled state — e.g. "View" over a case-study link */}
          <motion.span
            animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.6 }}
            transition={{ duration: 0.18 }}
            style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-strong)", whiteSpace: "nowrap" }}
          >
            {label ?? ""}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Exact-tracking dot */}
      <motion.div style={{ x, y }} className="absolute top-0 left-0">
        <motion.div
          animate={{ scale: hovering || label ? 0 : down ? 0.6 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          style={{
            width: 6,
            height: 6,
            translateX: "-50%",
            translateY: "-50%",
            borderRadius: "9999px",
            background: "var(--gold)",
          }}
        />
      </motion.div>
    </div>
  );
}
