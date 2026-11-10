"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

export default function LaptopMockup({ src, initialScroll = 0 }: { src: string; initialScroll?: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hasOverflow, setHasOverflow] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let io: IntersectionObserver | undefined;
    let raf = 0;
    let played = false;

    const setup = () => {
      setHasOverflow(el.scrollHeight > el.clientHeight + 4);
      const range = el.scrollHeight - el.clientHeight;
      const target = initialScroll > 0 ? initialScroll * range : 0;
      if (target <= 0) return;
      if (reduce) { el.scrollTop = target; return; }
      // When the frame enters view, animate the screen from the top down to the
      // meaningful region — the screen "plays" instead of appearing pre-scrolled.
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting || played) return;
          played = true;
          const start = performance.now();
          const dur = 1300;
          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            el.scrollTop = easeOut(p) * target;
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        },
        { threshold: 0.4 }
      );
      io.observe(el);
    };

    const img = imgRef.current;
    const onResize = () => setHasOverflow(el.scrollHeight > el.clientHeight + 4);
    if (img?.complete) setup();
    else img?.addEventListener("load", setup);
    window.addEventListener("resize", onResize);
    return () => {
      img?.removeEventListener("load", setup);
      window.removeEventListener("resize", onResize);
      io?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [initialScroll, reduce]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="keep-dark"
      style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
    >
      <div style={{ width: "100%", maxWidth: "920px", filter: "drop-shadow(0 50px 70px rgb(var(--shadow-rgb) / calc(0.6 * var(--shadow-k))))" }}>
        {/* ── Screen / lid ── */}
        <div style={{
          background: "linear-gradient(160deg, #2a2a2c 0%, #161617 100%)",
          borderRadius: "16px 16px 5px 5px",
          padding: "12px 12px 14px",
          border: "1px solid rgb(var(--ink-rgb) / calc(0.12 * var(--ink-k)))",
          boxShadow: "inset 0 1px 0 rgb(var(--ink-rgb) / calc(0.12 * var(--ink-k)))",
        }}>
          {/* Camera */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0e0e1a", border: "1px solid rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))", boxShadow: "inset 0 0 2px rgba(0,0,80,0.6)" }} />
          </div>

          {/* Screen */}
          <div style={{ position: "relative", aspectRatio: "16/10", borderRadius: "4px", overflow: "hidden", background: "#ffffff", border: "1px solid #000" }}>
            <div ref={scrollRef} style={{ position: "absolute", inset: 0, overflowY: "scroll", scrollbarWidth: "none" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" ref={imgRef} src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>

            {hasOverflow && (
              <>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top, rgb(var(--ink-rgb) / calc(0.85 * var(--ink-k))), transparent)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "16px", left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ display: "flex", alignItems: "center", gap: "7px", background: "rgb(var(--gold-rgb) / 0.92)", backdropFilter: "blur(8px)", border: "1px solid rgb(var(--ink-rgb) / calc(0.18 * var(--ink-k)))", borderRadius: "var(--radius-pill)", padding: "7px 16px", boxShadow: "0 8px 24px rgb(var(--gold-rgb) / 0.4)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2v10M3.5 8l3.5 4 3.5-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: "var(--text-label)", fontWeight: 600, color: "white", whiteSpace: "nowrap" }}>Scroll to explore</span>
                  </motion.div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Base / hinge ── */}
        <div style={{ position: "relative", width: "112%", marginLeft: "-6%", height: "16px", background: "linear-gradient(180deg, #cfd3d6 0%, #a7adb2 45%, #7d8388 100%)", borderRadius: "0 0 14px 14px", boxShadow: "0 8px 14px rgb(var(--shadow-rgb) / calc(0.45 * var(--shadow-k)))" }}>
          {/* opening notch */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "13%", height: "6px", background: "linear-gradient(180deg, #6c7176, #565b60)", borderRadius: "0 0 7px 7px" }} />
        </div>
      </div>
    </motion.div>
  );
}
