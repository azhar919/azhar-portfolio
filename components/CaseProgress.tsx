"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Check, ChevronDown } from "@/components/icons";
import { EASE, SPRING } from "@/lib/motion";

type Item = { label: string; id: string };

/** Where in the viewport a section counts as "being read" (fraction from the top). */
const READ_LINE = 0.42;

/**
 * Tracks reading position through a list of sections.
 *  · active   — index of the section under the read line (state: changes rarely)
 *  · within   — 0–1 progress through that section        (motion value: per frame)
 *  · overall  — 0–1 progress through the whole story     (motion value: per frame)
 */
function useStoryProgress(items: Item[]) {
  const [active, setActive] = useState(0);
  const within = useMotionValue(0);
  const overall = useMotionValue(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * READ_LINE;
      let idx = 0;
      let p = 0;
      for (let i = 0; i < items.length; i++) {
        const el = document.getElementById(items[i].id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line) {
          idx = i;
          p = Math.max(0, Math.min(1, (line - r.top) / Math.max(1, r.height)));
        }
      }
      setActive(idx);
      within.set(p);
      overall.set((idx + p) / items.length);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items, within, overall]);

  return { active, within, overall };
}

const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/** Step number inside a ring that fills as the section is read. */
function StepBadge({ n, state, progress, size = 26 }: { n: number; state: "done" | "active" | "todo"; progress: ReturnType<typeof useSpring>; size?: number }) {
  const r = size / 2 - 1.5;
  return (
    <span style={{ position: "relative", width: size, height: size, flexShrink: 0, display: "grid", placeItems: "center" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill={state === "done" ? "rgb(var(--gold-rgb) / 0.2)" : "none"} stroke={state === "done" ? "rgb(var(--gold-rgb) / 0.55)" : "rgb(var(--ink-rgb) / calc(0.18 * var(--ink-k)))"} strokeWidth="1.5" />
        {state === "active" && (
          <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" style={{ pathLength: progress }} />
        )}
      </svg>
      <span style={{ position: "relative", fontSize: "12px", fontWeight: 700, lineHeight: 1, fontVariantNumeric: "tabular-nums", color: state === "todo" ? "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))" : "var(--gold)" }}>
        {state === "done" ? <Check size={13} strokeWidth={2.2} /> : n}
      </span>
    </span>
  );
}

export default function CaseProgress({ items }: { items: Item[] }) {
  const { active, within, overall } = useStoryProgress(items);
  const ring = useSpring(within, SPRING.smooth);
  const bar = useSpring(overall, SPRING.smooth);
  const [open, setOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Close the mobile list on outside tap / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!mobileRef.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("pointerdown", onDown); window.removeEventListener("keydown", onKey); };
  }, [open]);

  const shell: React.CSSProperties = {
    position: "relative", overflow: "hidden",
    background: "rgb(var(--bg-rgb) / 0.82)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))", boxShadow: "0 10px 36px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))",
  };
  // Whole-story progress — a hairline along the bottom edge of the rail.
  const track = (
    <span aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "2px", background: "rgb(var(--ink-rgb) / calc(0.06 * var(--ink-k)))" }}>
      <motion.span style={{ display: "block", height: "100%", transformOrigin: "0% 50%", scaleX: bar, background: "linear-gradient(90deg, var(--gold), var(--teal))" }} />
    </span>
  );

  return (
    <>
      {/* ── Desktop: every step, the active one carried by a sliding pill ── */}
      <nav aria-label="Case study sections" className="hidden md:block" style={{ position: "sticky", top: "84px", zIndex: 30 }}>
        <div className="page-container">
          <div style={{ ...shell, display: "flex", alignItems: "center", gap: "2px", borderRadius: "var(--radius-pill)", padding: "8px 10px 10px" }}>
            {items.map((item, i) => {
              const state = i === active ? "active" : i < active ? "done" : "todo";
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => jump(item.id)}
                  aria-current={state === "active" ? "step" : undefined}
                  className="group"
                  style={{ position: "relative", flex: 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "9px", padding: "6px 10px", borderRadius: "var(--radius-pill)" }}
                >
                  {state === "active" && (
                    <motion.span layoutId="case-step-pill" transition={{ type: "spring", ...SPRING.smooth }} style={{ position: "absolute", inset: 0, borderRadius: "var(--radius-pill)", background: "rgb(var(--gold-rgb) / 0.16)" }} />
                  )}
                  <StepBadge n={i + 1} state={state} progress={ring} />
                  <span
                    className="transition-colors duration-300 group-hover:text-white"
                    style={{ position: "relative", fontSize: "var(--text-xs)", fontWeight: state === "active" ? 600 : 500, color: state === "active" ? "var(--ink-strong)" : state === "done" ? "rgb(var(--ink-rgb) / calc(0.75 * var(--ink-k)))" : "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
            {track}
          </div>
        </div>
      </nav>

      {/* ── Mobile: current step in a compact bar; tap to jump to any section ── */}
      <div ref={mobileRef} className="md:hidden" style={{ position: "sticky", top: "78px", zIndex: 30, padding: "0 16px" }}>
        <div style={{ ...shell, borderRadius: open ? "20px" : "var(--radius-pill)", transition: "border-radius 0.25s ease" }}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={`Section ${active + 1} of ${items.length}: ${items[active]?.label}. Show all sections`}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: "11px", padding: "9px 14px 11px 10px", textAlign: "left" }}
          >
            <StepBadge n={active + 1} state="active" progress={ring} size={28} />
            <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "1px" }}>
              <span style={{ fontSize: "var(--text-micro)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", fontVariantNumeric: "tabular-nums" }}>
                Step {active + 1} of {items.length}
              </span>
              <span style={{ position: "relative", height: "19px", overflow: "hidden" }}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={active}
                    initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--ink-strong)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {items[active]?.label}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: EASE }} style={{ display: "inline-flex", color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))" }}>
              <ChevronDown size={18} />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.ol
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
                style={{ overflow: "hidden", listStyle: "none", margin: 0, padding: "0 8px" }}
              >
                {items.map((item, i) => {
                  const state = i === active ? "active" : i < active ? "done" : "todo";
                  return (
                    <li key={item.id} style={{ borderTop: "1px solid rgb(var(--ink-rgb) / calc(0.06 * var(--ink-k)))" }}>
                      <button
                        type="button"
                        onClick={() => { setOpen(false); jump(item.id); }}
                        aria-current={state === "active" ? "step" : undefined}
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "11px 6px", textAlign: "left" }}
                      >
                        <StepBadge n={i + 1} state={state} progress={ring} size={24} />
                        <span style={{ fontSize: "var(--text-sm)", fontWeight: state === "active" ? 600 : 500, color: state === "active" ? "var(--ink-strong)" : state === "done" ? "rgb(var(--ink-rgb) / calc(0.75 * var(--ink-k)))" : "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))" }}>
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
                <li aria-hidden="true" style={{ height: "8px" }} />
              </motion.ol>
            )}
          </AnimatePresence>
          {track}
        </div>
      </div>
    </>
  );
}
