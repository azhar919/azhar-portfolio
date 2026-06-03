"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function LaptopMockup({ src }: { src: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hasOverflow, setHasOverflow] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => setHasOverflow(el.scrollHeight > el.clientHeight + 4);
    const img = imgRef.current;
    if (img?.complete) check();
    else img?.addEventListener("load", check);
    window.addEventListener("resize", check);
    return () => {
      img?.removeEventListener("load", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
    >
      <div style={{ width: "100%", maxWidth: "920px", filter: "drop-shadow(0 50px 70px rgba(0,0,0,0.6))" }}>
        {/* ── Screen / lid ── */}
        <div style={{
          background: "linear-gradient(160deg, #2a2a2c 0%, #161617 100%)",
          borderRadius: "16px 16px 5px 5px",
          padding: "12px 12px 14px",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        }}>
          {/* Camera */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0e0e1a", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "inset 0 0 2px rgba(0,0,80,0.6)" }} />
          </div>

          {/* Screen */}
          <div style={{ position: "relative", aspectRatio: "16/10", borderRadius: "4px", overflow: "hidden", background: "#ffffff", border: "1px solid #000" }}>
            <div ref={scrollRef} style={{ position: "absolute", inset: 0, overflowY: "scroll", scrollbarWidth: "none" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img ref={imgRef} src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>

            {hasOverflow && (
              <>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top, rgba(255,255,255,0.85), transparent)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "16px", left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    style={{ display: "flex", alignItems: "center", gap: "7px", background: "rgb(var(--gold-rgb) / 0.92)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "var(--radius-pill)", padding: "7px 16px", boxShadow: "0 8px 24px rgb(var(--gold-rgb) / 0.4)" }}
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
        <div style={{ position: "relative", width: "112%", marginLeft: "-6%", height: "16px", background: "linear-gradient(180deg, #cfd3d6 0%, #a7adb2 45%, #7d8388 100%)", borderRadius: "0 0 14px 14px", boxShadow: "0 8px 14px rgba(0,0,0,0.45)" }}>
          {/* opening notch */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "13%", height: "6px", background: "linear-gradient(180deg, #6c7176, #565b60)", borderRadius: "0 0 7px 7px" }} />
        </div>
      </div>
    </motion.div>
  );
}
