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
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element | null;
      setHovering(
        !!t?.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor]')
      );
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
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
            width: hovering ? 56 : 32,
            height: hovering ? 56 : 32,
            opacity: hovering ? 0.9 : 0.55,
            scale: down ? 0.82 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          style={{
            translateX: "-50%",
            translateY: "-50%",
            borderRadius: "9999px",
            border: "1.5px solid var(--gold)",
          }}
        />
      </motion.div>

      {/* Exact-tracking dot */}
      <motion.div style={{ x, y }} className="absolute top-0 left-0">
        <motion.div
          animate={{ scale: hovering ? 0 : down ? 0.6 : 1 }}
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
