"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { ChevronsLeftRight } from "@/components/icons";
import { EASE } from "@/lib/motion";

/**
 * Draggable before/after comparison.
 *
 * Both full-page screenshots are stacked in one browser frame; the divider
 * reveals the redesign (right) over the original (left). The frame scrolls, so
 * the two pages can be compared all the way down, not just above the fold.
 * Drag the handle, or focus it and use the arrow keys.
 */
export default function CompareSlider({
  before, after, beforeLabel = "Before", afterLabel = "After",
}: { before: string; after: string; beforeLabel?: string; afterLabel?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50); // % from the left where the divider sits
  const [dragging, setDragging] = useState(false);
  const inView = useInView(frameRef, { once: true, margin: "0px 0px -25% 0px" });
  const reduced = useReducedMotion();
  const touched = useRef(false);

  // On first view, sweep the divider across once so it reads as draggable.
  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(88, 50, {
      duration: 1.3, ease: EASE, delay: 0.35,
      onUpdate: (v) => { if (!touched.current) setPos(v); },
    });
    return () => controls.stop();
  }, [inView, reduced]);

  const setFromClientX = (clientX: number) => {
    const r = frameRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    touched.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => { if (dragging) setFromClientX(e.clientX); };
  const onPointerUp = () => setDragging(false);

  const chip: React.CSSProperties = {
    position: "absolute", top: "12px", zIndex: 3, pointerEvents: "none",
    fontSize: "var(--text-label)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
    borderRadius: "var(--radius-pill)", padding: "6px 14px", whiteSpace: "nowrap",
    maxWidth: "46%", overflow: "hidden", textOverflow: "ellipsis",
    transition: "opacity 0.25s ease",
  };

  return (
    <div className="keep-dark" style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgb(var(--ink-rgb) / calc(0.12 * var(--ink-k)))", boxShadow: "0 34px 90px rgb(var(--shadow-rgb) / calc(0.55 * var(--shadow-k)))", background: "#1C1813" }}>
      {/* browser bar */}
      <div style={{ height: "34px", display: "flex", alignItems: "center", gap: "6px", padding: "0 14px", borderBottom: "1px solid rgb(var(--ink-rgb) / calc(0.06 * var(--ink-k)))" }}>
        {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
          <span key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }} />
        ))}
        <span className="inline-flex items-center" style={{ marginLeft: "auto", gap: "6px", fontSize: "var(--text-label)", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", letterSpacing: "0.04em" }}>
          <ChevronsLeftRight size={13} /> Drag to compare
        </span>
      </div>

      <div ref={frameRef} style={{ position: "relative", aspectRatio: "16 / 10", background: "#fff" }}>
        {/* one scroller, both pages stacked in the same grid cell */}
        <div style={{ position: "absolute", inset: 0, overflowY: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          <div style={{ display: "grid", alignItems: "start" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={before} alt={beforeLabel} loading="lazy" decoding="async" draggable={false} style={{ gridArea: "1 / 1", display: "block", width: "100%", height: "auto" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={after} alt={afterLabel} loading="lazy" decoding="async" draggable={false} style={{ gridArea: "1 / 1", display: "block", width: "100%", height: "auto", background: "#fff", clipPath: `inset(0 0 0 ${pos}%)` }} />
          </div>
        </div>

        <span style={{ ...chip, left: "12px", opacity: pos > 14 ? 1 : 0, color: "rgb(var(--ink-rgb) / calc(0.85 * var(--ink-k)))", background: "rgba(20,17,14,0.78)", border: "1px solid rgb(var(--ink-rgb) / calc(0.16 * var(--ink-k)))", backdropFilter: "blur(6px)" }}>{beforeLabel}</span>
        <span style={{ ...chip, right: "12px", opacity: pos < 86 ? 1 : 0, color: "#1A1206", background: "var(--gold)" }}>{afterLabel}</span>

        {/* divider + handle (the only draggable part, so the page still scrolls by touch) */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Before and after comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(100 - pos)}% redesign shown`}
          data-cursor
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={(e) => {
            const step = e.shiftKey ? 10 : 4;
            if (e.key === "ArrowLeft") { touched.current = true; setPos((p) => Math.max(0, p - step)); e.preventDefault(); }
            if (e.key === "ArrowRight") { touched.current = true; setPos((p) => Math.min(100, p + step)); e.preventDefault(); }
          }}
          className="compare-handle"
          style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: "44px", marginLeft: "-22px", zIndex: 4, cursor: "ew-resize", touchAction: "none", display: "flex", justifyContent: "center" }}
        >
          <span aria-hidden="true" style={{ width: "2px", height: "100%", background: "var(--gold)", boxShadow: "0 0 14px rgb(var(--gold-rgb) / 0.7)" }} />
          <span aria-hidden="true" style={{
            position: "absolute", top: "50%", left: "50%", width: "44px", height: "44px", borderRadius: "50%",
            transform: `translate(-50%, -50%) scale(${dragging ? 1.12 : 1})`, transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1)",
            display: "grid", placeItems: "center", color: "#1A1206",
            background: "var(--gold)", border: "2px solid rgb(var(--ink-rgb) / calc(0.85 * var(--ink-k)))", boxShadow: "0 10px 28px rgb(var(--shadow-rgb) / calc(0.45 * var(--shadow-k)))",
          }}>
            <ChevronsLeftRight size={20} strokeWidth={1.8} />
          </span>
        </div>
      </div>
    </div>
  );
}
