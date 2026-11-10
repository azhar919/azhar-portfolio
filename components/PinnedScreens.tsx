"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PhoneMockup from "./PhoneMockup";
import { EASE } from "@/lib/motion";

/**
 * Scroll-told screens: one phone stays pinned while the page scrolls, and its
 * screen swaps as each step passes. A step list beside it shows where you are
 * and lets you jump. (Desktop layout — callers fall back to a plain row of
 * phones on small screens.)
 */
export default function PinnedScreens({ srcs, captions }: { srcs: string[]; captions?: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = srcs.length;

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight * 0.75; // distance scrolled while pinned
      const p = travel > 0 ? Math.max(0, Math.min(0.999, (150 - r.top) / travel)) : 0;
      setActive(Math.floor(p * n));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [n]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight * 0.75;
    window.scrollTo({ top: top - 150 + ((i + 0.5) / n) * travel, behavior: "smooth" });
  };

  return (
    // Each screen gets ~70vh of scroll while the phone is pinned.
    <div ref={trackRef} style={{ position: "relative", height: `calc(75vh + ${n * 70}vh)` }}>
      <div style={{ position: "sticky", top: "150px", display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(20px, 3vw, 44px)" }}>
        {/* Step list */}
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "6px", minWidth: "150px" }}>
          {srcs.map((_, i) => {
            const on = i === active;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={on ? "step" : undefined}
                  style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 0", textAlign: "left", width: "100%" }}
                >
                  <span aria-hidden="true" style={{ position: "relative", width: on ? "34px" : "16px", height: "2px", borderRadius: "2px", background: on ? "var(--gold)" : "rgb(var(--ink-rgb) / calc(0.22 * var(--ink-k)))", transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s" }} />
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "var(--text-micro)", fontWeight: 700, letterSpacing: "0.12em", color: on ? "var(--teal)" : "rgb(var(--ink-rgb) / calc(0.4 * var(--ink-k)))", fontVariantNumeric: "tabular-nums", transition: "color 0.3s" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: "var(--text-sm)", fontWeight: on ? 600 : 500, color: on ? "var(--ink-strong)" : "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", transition: "color 0.3s" }}>
                      {captions?.[i] ?? `Screen ${i + 1}`}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* The pinned phone — screen swaps with the active step */}
        <div style={{ position: "relative", width: "300px", flexShrink: 0 }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.985 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <PhoneMockup src={srcs[active]} showStatusBar={false} instant />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
