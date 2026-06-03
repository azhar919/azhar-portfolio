"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function PhoneMockup({ src, delay = 0.25, showStatusBar = true }: { src: string; delay?: number; showStatusBar?: boolean }) {
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
      transition={{ duration: 0.9, delay, ease: EASE }}
      style={{ display: "flex", justifyContent: "center", filter: "drop-shadow(0 60px 80px rgba(0,0,0,0.8))" }}
    >
      {/* Outer titanium frame */}
      <div style={{
        position: "relative",
        width: "300px",
        borderRadius: "52px",
        background: "linear-gradient(160deg, #8a8a8a 0%, #5a5a5a 15%, #3a3a3a 40%, #4a4a4a 60%, #6a6a6a 80%, #8a8a8a 100%)",
        padding: "3px",
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.35),
          inset 0 -1px 0 rgba(0,0,0,0.5),
          0 0 0 1px rgba(0,0,0,0.6)
        `,
      }}>

        {/* Side buttons — Power (right) */}
        <div style={{ position: "absolute", right: "-4px", top: "140px", width: "4px", height: "72px", background: "linear-gradient(to right, #555, #777, #555)", borderRadius: "0 4px 4px 0", boxShadow: "inset -1px 0 0 rgba(255,255,255,0.1), 1px 0 0 rgba(0,0,0,0.4)" }} />

        {/* Volume up (left) */}
        <div style={{ position: "absolute", left: "-4px", top: "110px", width: "4px", height: "52px", background: "linear-gradient(to left, #555, #777, #555)", borderRadius: "4px 0 0 4px", boxShadow: "inset 1px 0 0 rgba(255,255,255,0.1), -1px 0 0 rgba(0,0,0,0.4)" }} />
        {/* Volume down (left) */}
        <div style={{ position: "absolute", left: "-4px", top: "174px", width: "4px", height: "52px", background: "linear-gradient(to left, #555, #777, #555)", borderRadius: "4px 0 0 4px", boxShadow: "inset 1px 0 0 rgba(255,255,255,0.1), -1px 0 0 rgba(0,0,0,0.4)" }} />
        {/* Action button (left, small) */}
        <div style={{ position: "absolute", left: "-4px", top: "76px", width: "4px", height: "28px", background: "linear-gradient(to left, #555, #777, #555)", borderRadius: "4px 0 0 4px", boxShadow: "inset 1px 0 0 rgba(255,255,255,0.1), -1px 0 0 rgba(0,0,0,0.4)" }} />

        {/* Inner screen body */}
        <div style={{
          background: "#000",
          borderRadius: "50px",
          overflow: "hidden",
          position: "relative",
        }}>

          {/* Status bar */}
          {showStatusBar && <div style={{ height: "54px", background: "#000", position: "relative", flexShrink: 0, display: "flex", alignItems: "center" }}>
            {/* Dynamic Island */}
            <div style={{
              position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)",
              width: "118px", height: "34px",
              background: "#000",
              borderRadius: "var(--radius-2xl)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 0 0 1px rgba(0,0,0,1)",
              zIndex: 2,
              display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "10px", gap: "5px",
            }}>
              {/* Front camera */}
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.04)", boxShadow: "inset 0 0 3px rgba(0,0,100,0.5)" }} />
            </div>
            {/* Time */}
            <span style={{ position: "absolute", left: "22px", fontSize: "var(--text-xs)", fontWeight: 700, color: "white", letterSpacing: "-0.3px", fontFamily: "system-ui" }}>9:41</span>
            {/* Status icons */}
            <div style={{ position: "absolute", right: "18px", display: "flex", alignItems: "center", gap: "6px" }}>
              <svg width="14" height="10" viewBox="0 0 16 12" fill="none">
                <rect x="0" y="8" width="3" height="4" rx="1" fill="white"/>
                <rect x="4.5" y="5" width="3" height="7" rx="1" fill="white"/>
                <rect x="9" y="2" width="3" height="10" rx="1" fill="white"/>
                <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="white" opacity="0.3"/>
              </svg>
              <svg width="14" height="11" viewBox="0 0 16 12" fill="none">
                <path d="M8 9.5a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" fill="white"/>
                <path d="M3.5 6C4.8 4.5 6.3 3.6 8 3.6s3.2.9 4.5 2.4" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M1 3.5C2.9 1.4 5.3.3 8 .3s5.1 1.1 7 3.2" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.4"/>
              </svg>
              <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
                <div style={{ width: "23px", height: "11px", border: "1.5px solid rgba(255,255,255,0.65)", borderRadius: "3px", padding: "1.5px", display: "flex", alignItems: "center" }}>
                  <div style={{ width: "75%", height: "100%", background: "white", borderRadius: "1px" }} />
                </div>
                <div style={{ width: "2px", height: "5px", background: "rgba(255,255,255,0.4)", borderRadius: "0 1px 1px 0", marginLeft: "1px" }} />
              </div>
            </div>
          </div>}

          {/* Scrollable screen */}
          <div
            ref={scrollRef}
            style={{
              height: "560px",
              overflowY: "scroll",
              scrollbarWidth: "none",
              position: "relative",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imgRef} src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>

          {/* Home indicator */}
          <div style={{ height: "30px", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "110px", height: "5px", background: "rgba(255,255,255,0.3)", borderRadius: "var(--radius-pill)" }} />
          </div>

          {/* Specular screen glare */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%)",
            borderRadius: "50px",
          }} />

          {/* Scroll pill */}
          {hasOverflow && (
            <div style={{ position: "absolute", bottom: "38px", left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  background: "rgb(var(--gold-rgb) / 0.9)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "var(--radius-pill)", padding: "5px 12px",
                  boxShadow: "0 4px 16px rgb(var(--gold-rgb) / 0.5)",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v8M3 7l3 3 3-3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: "var(--text-micro)", fontWeight: 600, color: "white", whiteSpace: "nowrap" }}>Scroll to explore</span>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
