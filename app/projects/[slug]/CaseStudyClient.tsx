"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Target, Layers, Zap, TrendingUp, RefreshCw, AlertCircle, Lightbulb, Compass, CheckCircle, Hammer, BarChart2, PenTool, ArrowUpRight, type LucideIcon } from "lucide-react";
import FloatingNav from "@/components/FloatingNav";
import SouthernAfricaMap from "@/components/SouthernAfricaMap";
import ContactFooter from "@/components/ContactFooter";
import type { CaseStudy, Section } from "../data";
import { caseStudies } from "../data";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const SECTION_ICONS: Record<string, LucideIcon> = {
  "Discover":       Search,
  "Define":         Target,
  "Design":         Layers,
  "Deliver":        Zap,
  "Results":        TrendingUp,
  "Test & Iterate": RefreshCw,
  "The Challenge":  AlertCircle,
  "Insights":       Lightbulb,
  "Approach":       Compass,
  "The Solution":   CheckCircle,
  "The Build":      Hammer,
  "Impact":         BarChart2,
};

function getHref(slug: string): string {
  if (slug === "african-bank-website-redesign") return "/projects/african-bank/website-redesign";
  if (slug === "african-bank-onboarding") return "/projects/african-bank/onboarding";
  return `/projects/${slug}`;
}

/* ── B: Reading progress bar ── */
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{
        position: "fixed", top: "80px", left: 0, right: 0, height: "3px",
        background: "#C4622D", transformOrigin: "0%", scaleX, zIndex: 200,
        boxShadow: "0 0 10px rgba(196,98,45,0.8), 0 0 20px rgba(196,98,45,0.4)",
      }}
    />
  );
}

/* ── C: Sticky section dot nav ── */
function SectionNav({ items, activeIndex }: { items: { label: string; id: string }[]; activeIndex: number }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div
      className="hidden lg:flex"
      style={{ position: "fixed", right: "28px", top: "50%", transform: "translateY(-50%)", flexDirection: "column", gap: "10px", zIndex: 50 }}
    >
      {items.map((item, i) => {
        const isActive = activeIndex === i;
        const isHovered = hoveredIndex === i;
        return (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "flex-end", cursor: "pointer" }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
          >
            <motion.span
              animate={{ opacity: isActive || isHovered ? 1 : 0, x: isActive || isHovered ? 0 : 8 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: isActive ? "#C4622D" : "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}
            >
              {item.label}
            </motion.span>
            <motion.div
              animate={{ height: isActive ? "24px" : "6px", background: isActive ? "#C4622D" : isHovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}
              transition={{ duration: 0.25 }}
              style={{ width: "6px", borderRadius: "9999px", flexShrink: 0 }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ── D: Background section number ── */
function SectionNumber({ n }: { n: number }) {
  return (
    <div aria-hidden="true" style={{
      position: "absolute", top: "-24px", left: "-8px",
      fontSize: "clamp(100px, 14vw, 180px)", fontWeight: 800,
      color: "rgba(255,255,255,0.06)", lineHeight: 1,
      letterSpacing: "-0.05em", userSelect: "none", pointerEvents: "none",
      fontVariantNumeric: "tabular-nums", zIndex: 0,
    }}>
      {String(n).padStart(2, "0")}
    </div>
  );
}

/* ── Image components ── */

function LandscapeImage({ src }: { src: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  return (
    <div ref={ref} style={{ width: "100%", borderRadius: "16px", overflow: "hidden", position: "relative", background: "#141414", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 32px 80px rgba(0,0,0,0.45)" }}>
      <motion.div style={{ y }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
          <Image src={src} alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} />
        </div>
      </motion.div>
    </div>
  );
}

function PortraitImage({ src }: { src: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,98,45,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", width: "min(300px, 100%)", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 40px 100px rgba(0,0,0,0.6)", zIndex: 1 }}>
        <Image src={src} alt="" width={300} height={600} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
    </div>
  );
}

function PageImage({ src }: { src: string }) {
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
    <div style={{ width: "100%", height: hasOverflow ? "clamp(320px, 50vw, 560px)" : "auto", borderRadius: "16px", overflow: "hidden", background: "#141414", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 32px 80px rgba(0,0,0,0.45)", position: "relative" }}>
      <div ref={scrollRef} style={{ width: "100%", height: "100%", overflowY: hasOverflow ? "scroll" : "visible", scrollbarWidth: "thin", scrollbarColor: "rgba(196,98,45,0.6) rgba(255,255,255,0.06)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imgRef} src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
      </div>
      {hasOverflow && (
        <>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100px", background: "linear-gradient(to top, rgba(20,20,20,1), transparent)", pointerEvents: "none", borderRadius: "0 0 16px 16px" }} />
          {/* Centering wrapper — keeps translateX out of framer-motion's transform */}
          <div style={{ position: "absolute", bottom: "20px", left: 0, right: 0, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "rgba(196,98,45,0.85)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "9999px", padding: "9px 18px",
                boxShadow: "0 8px 32px rgba(196,98,45,0.35)",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M3.5 8l3.5 4 3.5-4" stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.02em", color: "rgba(255,255,255,0.95)", whiteSpace: "nowrap" }}>Scroll to explore</span>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}

function ScreenshotImage({ src }: { src: string }) {
  return (
    <div style={{ borderRadius: "16px", background: "#141414", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)", padding: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" style={{ display: "block", maxWidth: "100%", height: "auto", borderRadius: "8px" }} />
    </div>
  );
}

function DualImage({ srcs }: { srcs: [string, string] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "16px" }}>
      {srcs.map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
        >
          <div style={{ borderRadius: "14px", overflow: "hidden", position: "relative", aspectRatio: "16/9", background: "#141414", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
            <Image src={src} alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TripleImage({ srcs }: { srcs: [string, string, string] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}>
        <div style={{ borderRadius: "14px", overflow: "hidden", position: "relative", aspectRatio: "16/7", background: "#141414", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
          <Image src={srcs[0]} alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} />
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "16px" }}>
        {srcs.slice(1).map((src, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.1 }}>
            <div style={{ borderRadius: "14px", overflow: "hidden", position: "relative", aspectRatio: "4/3", background: "#141414", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
              <Image src={src} alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* Scattered — desktop: rotated overlapping cards; mobile: horizontal swipe strip */
function ScatteredImages({ srcs }: { srcs: string[] }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cards = [
    { rotate: -4, x: -160, y: 8,  z: 1 },
    { rotate:  1, x:    0, y: -8, z: 3 },
    { rotate:  4, x:  160, y: 12, z: 2 },
  ];

  if (isMobile) {
    return (
      <div>
        <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "12px", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>
          {srcs.slice(0, 3).map((src, i) => (
            <div key={i} style={{ flexShrink: 0, width: "80vw", scrollSnapAlign: "start", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
          ))}
        </div>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: "8px", letterSpacing: "0.06em" }}>Swipe to compare →</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", placeItems: "center", height: "clamp(280px, 40vw, 520px)", overflow: "visible" }}>
      {srcs.slice(0, 3).map((src, i) => (
        <motion.div
          key={i}
          initial={{ rotate: cards[i].rotate, x: cards[i].x, y: cards[i].y }}
          whileHover={{ rotate: 0, x: cards[i].x, y: -16, scale: 1.06, zIndex: 10 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{
            gridArea: "1 / 1",
            width: "58%",
            zIndex: cards[i].z,
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            cursor: "pointer",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
        </motion.div>
      ))}
    </div>
  );
}

/* Count-up badge for the winner stat */
function WinnerBadge() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const target = 45;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView]);

  return (
    <div ref={ref} style={{
      background: "rgba(34,197,94,0.12)",
      border: "1px solid rgba(34,197,94,0.35)",
      borderRadius: "9999px",
      padding: "6px 18px",
      display: "inline-flex", alignItems: "center", gap: "8px",
    }}>
      <span style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 800, color: "#22C55E", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        ↓ {count}%
      </span>
      <span style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>faster overall</span>
    </div>
  );
}

/* Annotated before/after comparison with pulsing metric callouts */
function AnnotationPin({ x, y, label, value, side = "right" }: { x: number; y: number; label: string; value: string; side?: "left" | "right" }) {
  return (
    <div style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", zIndex: 10, pointerEvents: "none" }}>
      {/* Pulsing ring */}
      <motion.div
        animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", inset: "-10px", borderRadius: "50%", border: "2px solid #C4622D" }}
      />
      {/* Centre dot */}
      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#C4622D", boxShadow: "0 0 8px rgba(196,98,45,0.8)", position: "relative", zIndex: 1 }} />
      {/* Callout — hidden on mobile */}
      <div className="hidden md:block" style={{
        position: "absolute", top: "50%", transform: "translateY(-50%)",
        [side === "right" ? "left" : "right"]: "18px",
        background: "#C4622D", borderRadius: "8px", padding: "5px 10px",
        whiteSpace: "nowrap", boxShadow: "0 4px 20px rgba(196,98,45,0.4)",
      }}>
        <div style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{value}</div>
      </div>
    </div>
  );
}

function AnnotatedComparison({ srcs }: { srcs: string[] }) {
  const frames = [
    {
      src: srcs[0],
      label: "Iteration 1",
      isWinner: false,
      pins: [
        { x: 53, y: 32, label: "Avg time", value: "17m 4.9s", side: "right" as const },
        { x: 65, y: 60, label: "Time on task", value: "↑ Slower", side: "left" as const },
      ],
    },
    {
      src: srcs[1],
      label: "Iteration 2",
      isWinner: true,
      pins: [
        { x: 53, y: 32, label: "Avg time", value: "9m 31.7s", side: "right" as const },
        { x: 65, y: 60, label: "Time on task", value: "↓ Faster", side: "left" as const },
      ],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {frames.map((frame, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.15 }}
        >
          {/* Label row */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "4px 12px", borderRadius: "9999px",
              background: frame.isWinner ? "#C4622D" : "rgba(255,255,255,0.08)",
              color: frame.isWinner ? "#fff" : "rgba(255,255,255,0.5)",
            }}>
              {frame.label}
            </span>
            {frame.isWinner && <WinnerBadge />}
          </div>
          {/* Image + pins */}
          <div style={{ position: "relative", borderRadius: "14px", overflow: "hidden", border: `1px solid ${frame.isWinner ? "rgba(196,98,45,0.35)" : "rgba(255,255,255,0.07)"}`, boxShadow: "0 24px 60px rgba(0,0,0,0.45)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={frame.src} alt={frame.label} style={{ display: "block", width: "100%", height: "auto" }} />
            {frame.pins.map((pin, j) => (
              <AnnotationPin key={j} {...pin} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* Multiple screenshots stacked vertically at natural proportions */
function StackedScreenshots({ srcs }: { srcs: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {srcs.map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
          style={{ borderRadius: "14px", overflow: "hidden", background: "#141414", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
        </motion.div>
      ))}
    </div>
  );
}

/* Landscape on top + portrait centred below */
function LandscapePortraitStack({ srcs }: { srcs: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ borderRadius: "14px", overflow: "hidden", position: "relative", aspectRatio: "16/9", background: "#141414", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
        <Image src={srcs[0]} alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "320px", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
          <Image src={srcs[1]} alt="" width={320} height={576} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </div>
    </div>
  );
}

function SectionImages({ section }: { section: Section }) {
  const { image, imageAspect } = section;
  if (!image) return null;
  const images = Array.isArray(image) ? image : [image];
  if (imageAspect === "page")               return <PageImage src={images[0]} />;
  if (imageAspect === "screenshot")         return <ScreenshotImage src={images[0]} />;
  if (imageAspect === "portrait")           return <PortraitImage src={images[0]} />;
  if (imageAspect === "scattered")          return <ScatteredImages srcs={images} />;
  if (imageAspect === "landscape-portrait")    return <LandscapePortraitStack srcs={images} />;
  if (imageAspect === "screenshots")           return <StackedScreenshots srcs={images} />;
  if (imageAspect === "map")                   return <SouthernAfricaMap />;
  if (imageAspect === "annotated-comparison")  return <AnnotatedComparison srcs={images} />;
  if (images.length === 1)                  return <LandscapeImage src={images[0]} />;
  if (images.length === 2)                  return <DualImage srcs={[images[0], images[1]]} />;
  return <TripleImage srcs={[images[0], images[1], images[2]]} />;
}

/* ── A: Scroll-driven CaseSection ── */
function CaseSection({ section, index, onInView }: { section: Section; index: number; onInView: (i: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 20%"] });

  const opacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const y       = useTransform(scrollYProgress, [0, 0.6],  [90, 0]);
  const blur    = useTransform(scrollYProgress, [0, 0.55], ["blur(18px)", "blur(0px)"]);
  const scale   = useTransform(scrollYProgress, [0, 0.6],  [0.88, 1]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onInView(index); },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index, onInView]);

  const bg = index % 2 === 0 ? "#0A0A0A" : "#111111";
  const isSideBySide = section.image && section.imageAspect === "screenshot";
  const orbPos = index % 2 === 0
    ? { left: "-8%", top: "10%" }
    : { right: "-8%", top: "20%" };

  return (
    <motion.section
      id={`section-${index}`}
      ref={ref}
      style={{ background: bg, paddingTop: "96px", paddingBottom: "96px", position: "relative", overflow: "hidden" }}
    >
      {/* E: Ambient orb */}
      <div aria-hidden="true" style={{
        position: "absolute", ...orbPos,
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,98,45,0.055) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="page-container" style={{ position: "relative" }}>
        {/* D: Background section number */}
        <SectionNumber n={index + 1} />

        <motion.div style={{ opacity, y, filter: blur, scale, position: "relative", zIndex: 1 }}>
          {isSideBySide ? (
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
              <div className="lg:w-[48%] shrink-0" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {(() => { const Icon = SECTION_ICONS[section.label]; return (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#C4622D" }}>
                    {Icon && <Icon size={12} />}{section.label}
                  </span>
                ); })()}
                <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.25, letterSpacing: "-0.02em" }}>{section.heading}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {section.body.map((para, i) => (
                    <p key={i} style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>{para}</p>
                  ))}
                </div>
              </div>
              <div className="lg:flex-1 mt-10 lg:mt-0">
                <SectionImages section={section} />
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "52px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px" }}>
                {(() => { const Icon = SECTION_ICONS[section.label]; return (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#C4622D" }}>
                    {Icon && <Icon size={12} />}{section.label}
                  </span>
                ); })()}
                <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.25, letterSpacing: "-0.02em" }}>{section.heading}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {section.body.map((para, i) => (
                    <p key={i} style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>{para}</p>
                  ))}
                </div>
              </div>
              {section.image && <SectionImages section={section} />}
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ── Learnings with scroll animation ── */
function LearningsSection({ learnings, onInView, navIndex }: { learnings: string[]; onInView: (i: number) => void; navIndex: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 20%"] });
  const opacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const y       = useTransform(scrollYProgress, [0, 0.6],  [90, 0]);
  const blur    = useTransform(scrollYProgress, [0, 0.55], ["blur(18px)", "blur(0px)"]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onInView(navIndex); },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [navIndex, onInView]);

  return (
    <motion.section id="section-learnings" ref={ref} style={{ background: "#0A0A0A", paddingTop: "96px", paddingBottom: "96px", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: "0%", right: "-10%",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,98,45,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div className="page-container" style={{ position: "relative" }}>
        <motion.div style={{ opacity, y, filter: blur }}>
          <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#C4622D", marginBottom: "16px" }}>Key Learnings</p>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "64px", whiteSpace: "nowrap" }}>
            What this project taught me
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {learnings.map((learning, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
                style={{
                  position: "relative",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "20px",
                  padding: "40px 48px 40px 52px",
                  overflow: "hidden",
                }}
              >
                {/* Decorative quote mark */}
                <div aria-hidden="true" style={{
                  position: "absolute", top: "-8px", left: "20px",
                  fontSize: "120px", lineHeight: 1,
                  color: "#C4622D", opacity: 0.25,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  userSelect: "none", pointerEvents: "none",
                  fontWeight: 900,
                }}>
                  &ldquo;
                </div>
                {/* Number */}
                <span style={{
                  position: "absolute", top: "20px", right: "24px",
                  fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
                  color: "rgba(196,98,45,0.5)", fontVariantNumeric: "tabular-nums",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: "20px", fontWeight: 500, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: 0, position: "relative" }}>
                  {learning}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ── F: More case studies grid ── */
function MoreCaseStudies({ currentSlug }: { currentSlug: string }) {
  const others = caseStudies.filter(cs => cs.slug !== currentSlug);
  return (
    <section style={{ background: "#111111", paddingTop: "80px", paddingBottom: "80px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="page-container">
        <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: "32px" }}>More case studies</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {others.map((cs, i) => (
            <Link key={cs.slug} href={getHref(cs.slug)} style={{ display: "block", textDecoration: "none" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
                whileHover={{ y: -5, borderColor: "rgba(196,98,45,0.4)", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px", display: "flex", flexDirection: "column", gap: "8px", height: "100%", cursor: "pointer" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#C4622D" }}>{cs.company}</span>
                  <motion.div
                    whileHover={{ x: 2, y: -2 }}
                    transition={{ duration: 0.2 }}
                    style={{ flexShrink: 0 }}
                  >
                    <ArrowUpRight size={16} style={{ color: "rgba(255,255,255,0.25)" }} />
                  </motion.div>
                </div>
                <span style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.25 }}>{cs.title}</span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px", lineHeight: 1.6 }}>{cs.subtitle.slice(0, 72)}…</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Main component ── */
export default function CaseStudyClient({ study }: { study: CaseStudy }) {
  const [activeSection, setActiveSection] = useState(0);
  const handleInView = useCallback((i: number) => setActiveSection(i), []);

  const navItems = [
    ...study.sections.map((s, i) => ({ label: s.label, id: `section-${i}` })),
    { label: "Learnings", id: "section-learnings" },
  ];

  const words = study.title.split(" ");

  return (
    <main>
      <FloatingNav />
      <ProgressBar />
      <SectionNav items={navItems} activeIndex={activeSection} />

      <div className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden flex flex-col justify-center" style={{ background: "#0A0A0A", paddingTop: "100px", paddingBottom: "100px", minHeight: "420px" }}>
          <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
            top: "-20%", right: "-8%",
            width: "700px", height: "700px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,98,45,0.14) 0%, transparent 65%)",
          }} />
          <div className="absolute inset-0 noise-texture opacity-[0.02] pointer-events-none" />

          <div className="page-container relative">
            <div className={`flex flex-col ${study.heroImage ? "lg:flex-row lg:items-center lg:gap-16" : ""}`}>
              <div className={study.heroImage ? "lg:w-[55%]" : ""}>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}
                >
                  {study.company}
                </motion.p>

                {/* Word-by-word title */}
                <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.08, letterSpacing: "-0.04em" }}>
                  {words.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.05 + i * 0.07, ease: EASE }}
                      style={{ display: "inline-block", marginRight: "0.25em" }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
                  style={{ marginTop: "24px", fontSize: "18px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: "540px" }}
                >
                  {study.subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
                  style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "10px" }}
                >
                  {study.tools.map((tool) => (
                    <span key={tool} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "9999px", padding: "6px 14px" }}>
                      <PenTool size={10} />
                      {tool}
                    </span>
                  ))}
                </motion.div>
              </div>

              {study.heroImage && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
                  className="lg:w-[45%] mt-12 lg:mt-0"
                >
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
                    <Image src={study.heroImage} alt="" fill style={{ objectFit: "cover", objectPosition: "top left" }} />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {study.sections.map((section, i) => (
          <CaseSection key={i} section={section} index={i} onInView={handleInView} />
        ))}

        <LearningsSection learnings={study.learnings} onInView={handleInView} navIndex={study.sections.length} />
        <MoreCaseStudies currentSlug={study.slug} />
        <ContactFooter />
      </div>
    </main>
  );
}
