"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Target, Layers, Zap, TrendingUp, RefreshCw, AlertCircle, Lightbulb, Compass, CheckCircle, Hammer, BarChart2, ArrowUpRight, ArrowRight, ChevronDown, ChevronRight, Info, type Icon as LucideIcon } from "@/components/icons";
import { LhcArrowRight, LhcTick, LhcChevronDown, LhcChevronLeft, LhcChevronRight, LhcInfo, LhcMail, LhcMapPin, LhcPhone, LhcX, AbPerson, AbBank, AbVerified, AbCreditCard, AbMenuBook, type ClientIcon } from "@/components/clientIcons";
import FloatingNav from "@/components/FloatingNav";
import SouthernAfricaMap from "@/components/SouthernAfricaMap";
import PhoneMockup from "@/components/PhoneMockup";
import LaptopMockup from "@/components/LaptopMockup";
import Motif from "@/components/Motif";
import Tilt from "@/components/Tilt";
import CompareSlider from "@/components/CompareSlider";
import CaseProgress from "@/components/CaseProgress";
import PinnedScreens from "@/components/PinnedScreens";
import ContactFooter from "@/components/ContactFooter";
import { useSpotlight } from "@/components/useSpotlight";
import { Reveal, RevealText } from "@/components/Reveal";
import { EASE } from "@/lib/motion";
import { morphStyle, isFirstLoad } from "@/lib/viewTransition";
import type { CaseStudy, Section } from "../data";
import { caseStudies } from "../data";

function SectionBody({ section }: { section: Section }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {section.body.map((para, i) => (
        <p key={i} style={{ fontSize: "var(--text-body)", color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))", lineHeight: 1.75 }}>{para}</p>
      ))}
      {section.stats && <CaseStats stats={section.stats} />}
      {section.bullets && section.bulletStyle === "grid" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginTop: "8px" }}>
          {section.bullets.map((bullet, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.09 }}
              whileHover={{ y: -5 }}
              style={{ position: "relative", display: "flex", flexDirection: "column", gap: "16px", background: "var(--bg-raised)", border: "1px solid rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))", borderRadius: "var(--radius-xl)", padding: "26px", overflow: "hidden", boxShadow: "0 20px 50px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))" }}
            >
              <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgb(var(--gold-rgb) / 0.6), transparent)" }} />
              <span style={{ width: "46px", height: "46px", borderRadius: "var(--radius-md)", background: "linear-gradient(150deg, rgb(var(--gold-rgb) / 0.28), rgb(var(--gold-rgb) / 0.07))", border: "1px solid rgb(var(--gold-rgb) / 0.3)", display: "grid", placeItems: "center" }}>
                <CheckCircle size={22} color="var(--gold)" />
              </span>
              <span style={{ fontSize: "var(--text-md)", color: "rgb(var(--ink-rgb) / calc(0.82 * var(--ink-k)))", lineHeight: 1.55, fontWeight: 500 }}>{bullet}</span>
            </motion.div>
          ))}
        </div>
      ) : section.bullets && (
        <ul style={{ display: "flex", flexDirection: "column", gap: "10px", paddingLeft: 0, listStyle: "none", margin: 0 }}>
          {section.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -32, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ margin: "-120px 0px -120px 0px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
              style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "var(--text-body)", color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))", lineHeight: 1.75 }}
            >
              <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: "4px", fontSize: "var(--text-2xs)" }}>→</span>
              {bullet}
            </motion.li>
          ))}
        </ul>
      )}
      {section.footnote && (
        <p style={{ fontSize: "var(--text-body)", color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))", lineHeight: 1.75 }}>{section.footnote}</p>
      )}
    </div>
  );
}

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
  "Before & After": RefreshCw,
  "Impact":         BarChart2,
};

function getHref(slug: string): string {
  if (slug === "african-bank-website-redesign") return "/projects/african-bank/website-redesign";
  if (slug === "african-bank-onboarding") return "/projects/african-bank/onboarding";
  if (slug === "life-healthcare-website") return "/projects/life-healthcare/website";
  if (slug === "life-healthcare-design-system") return "/projects/life-healthcare/design-system";
  return `/projects/${slug}`;
}

/* ── Image components ── */

function LandscapeImage({ src }: { src: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  return (
    <div ref={ref} style={{ width: "100%", borderRadius: "var(--radius-xl)", overflow: "hidden", position: "relative", background: "var(--bg-raised)", border: "1px solid rgb(var(--ink-rgb) / calc(0.07 * var(--ink-k)))", boxShadow: "0 32px 80px rgb(var(--shadow-rgb) / calc(0.45 * var(--shadow-k)))" }}>
      <motion.div style={{ y }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
          <Image src={src} alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} />
        </div>
      </motion.div>
    </div>
  );
}

/* Image that parallaxes within a fixed framed crop (visible on any background) */
function ParallaxFrame({ src, aspectRatio, radius = "14px", shadow = "0 24px 60px rgba(0,0,0,0.4)" }: { src: string; aspectRatio: string; radius?: string; shadow?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  return (
    <div ref={ref} style={{ position: "relative", overflow: "hidden", aspectRatio, borderRadius: radius, background: "var(--bg-raised)", border: "1px solid rgb(var(--ink-rgb) / calc(0.07 * var(--ink-k)))", boxShadow: shadow }}>
      <motion.div style={{ position: "absolute", top: "-12%", left: 0, right: 0, height: "124%", y }}>
        <Image src={src} alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} />
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
        background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", width: "min(300px, 100%)", borderRadius: "var(--radius-2xl)", overflow: "hidden", border: "1px solid rgb(var(--ink-rgb) / calc(0.10 * var(--ink-k)))", boxShadow: "0 40px 100px rgb(var(--shadow-rgb) / calc(0.6 * var(--shadow-k)))", zIndex: 1 }}>
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
    <div style={{ width: "100%", height: hasOverflow ? "clamp(320px, 50vw, 560px)" : "auto", borderRadius: "var(--radius-xl)", overflow: "hidden", background: "var(--bg-raised)", border: "1px solid rgb(var(--ink-rgb) / calc(0.07 * var(--ink-k)))", boxShadow: "0 32px 80px rgb(var(--shadow-rgb) / calc(0.45 * var(--shadow-k)))", position: "relative" }}>
      <div ref={scrollRef} style={{ width: "100%", height: "100%", overflowY: hasOverflow ? "scroll" : "visible", scrollbarWidth: "thin", scrollbarColor: "rgb(var(--gold-rgb) / 0.6) rgb(var(--ink-rgb) / calc(0.06 * var(--ink-k)))" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" ref={imgRef} src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
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
                background: "rgb(var(--gold-rgb) / 0.85)", backdropFilter: "blur(8px)",
                border: "1px solid rgb(var(--ink-rgb) / calc(0.15 * var(--ink-k)))",
                borderRadius: "var(--radius-pill)", padding: "9px 18px",
                boxShadow: "0 8px 32px rgb(var(--gold-rgb) / 0.35)",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M3.5 8l3.5 4 3.5-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: "var(--text-2xs)", fontWeight: 600, letterSpacing: "0.02em", color: "white", whiteSpace: "nowrap" }}>Scroll to explore</span>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}

function ScreenshotImage({ src }: { src: string }) {
  return (
    <div style={{ borderRadius: "var(--radius-xl)", background: "var(--bg-raised)", border: "1px solid rgb(var(--ink-rgb) / calc(0.07 * var(--ink-k)))", boxShadow: "0 24px 60px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))", padding: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" src={src} alt="" style={{ display: "block", maxWidth: "100%", height: "auto", borderRadius: "var(--radius-sm)" }} />
    </div>
  );
}

function BAPanel({ src, label, accent, initialScroll = 0 }: { src: string; label: string; accent: boolean; initialScroll?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay: accent ? 0.12 : 0 }}
      style={{ position: "relative", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}
    >
      {/* Ambient glow — gold behind the redesign, cool/neutral behind the original */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: "8% -6% 4% -6%", borderRadius: "50%", filter: "blur(46px)", pointerEvents: "none",
          background: accent
            ? "radial-gradient(circle at 50% 38%, rgb(var(--gold-rgb) / 0.22), transparent 70%)"
            : "radial-gradient(circle at 50% 38%, rgba(120,140,170,0.12), transparent 70%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{
          fontSize: "var(--text-label)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
          color: accent ? "#1A1206" : "rgb(var(--ink-rgb) / calc(0.7 * var(--ink-k)))",
          background: accent ? "var(--gold)" : "rgb(var(--ink-rgb) / calc(0.06 * var(--ink-k)))",
          border: accent ? "none" : "1px solid rgb(var(--ink-rgb) / calc(0.14 * var(--ink-k)))",
          borderRadius: "var(--radius-pill)", padding: "6px 16px", whiteSpace: "nowrap",
        }}>
          {label}
        </span>
      </div>
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <LaptopMockup src={src} initialScroll={initialScroll} />
      </div>
    </motion.div>
  );
}

function BeforeAfter({ srcs, labels, afterScroll = 0 }: { srcs: string[]; labels?: [string, string]; afterScroll?: number }) {
  const [beforeLabel, afterLabel] = labels ?? ["Before", "After"];
  const [mode, setMode] = useState<"slide" | "side">("slide");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
      {/* View switch: drag-to-compare, or the two pages side by side */}
      <div role="group" aria-label="Comparison view" className="inline-flex self-start" style={{ padding: "4px", gap: "4px", borderRadius: "var(--radius-pill)", background: "rgb(var(--ink-rgb) / calc(0.05 * var(--ink-k)))", border: "1px solid rgb(var(--ink-rgb) / calc(0.1 * var(--ink-k)))" }}>
        {([["slide", "Slider"], ["side", "Side by side"]] as const).map(([key, text]) => (
          <button
            key={key}
            type="button"
            aria-pressed={mode === key}
            onClick={() => setMode(key)}
            style={{
              position: "relative", fontSize: "var(--text-xs)", fontWeight: 600, padding: "8px 16px", borderRadius: "var(--radius-pill)",
              color: mode === key ? "#1A1206" : "rgb(var(--ink-rgb) / calc(0.65 * var(--ink-k)))", transition: "color 0.25s",
            }}
          >
            {mode === key && (
              <motion.span layoutId={`ba-pill-${srcs[0]}`} transition={{ type: "spring", stiffness: 380, damping: 32 }} style={{ position: "absolute", inset: 0, borderRadius: "var(--radius-pill)", background: "var(--gold)" }} />
            )}
            <span style={{ position: "relative" }}>{text}</span>
          </button>
        ))}
      </div>
      {mode === "slide" ? (
        <div style={{ maxWidth: "1080px", width: "100%", margin: "0 auto" }}>
          <CompareSlider before={srcs[0]} after={srcs[1]} beforeLabel={beforeLabel} afterLabel={afterLabel} />
        </div>
      ) : (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]" style={{ gap: "20px", alignItems: "center" }}>
      <BAPanel src={srcs[0]} label={beforeLabel} accent={false} />

      {/* Transition badge — points right on desktop, down on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.25 }}
        className="flex items-center justify-center"
        style={{ alignSelf: "center" }}
      >
        <div className="rotate-90 lg:rotate-0" style={{
          width: "52px", height: "52px", borderRadius: "50%", display: "grid", placeItems: "center", flexShrink: 0,
          background: "linear-gradient(150deg, rgb(var(--gold-rgb) / 0.3), rgb(var(--gold-rgb) / 0.08))",
          border: "1px solid rgb(var(--gold-rgb) / 0.4)", boxShadow: "0 8px 24px rgb(var(--gold-rgb) / 0.25)",
        }}>
          <ArrowRight size={22} color="var(--gold)" />
        </div>
      </motion.div>

      <BAPanel src={srcs[1]} label={afterLabel} accent initialScroll={afterScroll} />
    </div>
      )}
    </div>
  );
}

/* ── Life Healthcare before/after — the two most-improved pages, stacked ── */
const LHC_COMPARES = [
  { title: "Homepage", metric: "Org-chart of divisions → four patient jobs + one search", before: "/images/lhc-before-home.webp", after: "/images/lhc-home.webp", afterScroll: 0 },
  { title: "Find a doctor", metric: "947 links · 23,000px of scroll → one search + filters", before: "/images/lhc-before-doctors.webp", after: "/images/lhc-find-doctors.webp", afterScroll: 0.25 },
  { title: "Find a hospital", metric: "A long unfiltered list → a map with “near me” + filters", before: "/images/lhc-before-hospitals.webp", after: "/images/lhc-find-hospitals-map.webp", afterScroll: 0.34 },
  { title: "Quality measures", metric: "Generic tiles that link out → published, charted safety data", before: "/images/lhc-before-quality.webp", after: "/images/lhc-quality-measures.webp", afterScroll: 0.2 },
];

function LhcBeforeAfter() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 7vw, 96px)" }}>
      {LHC_COMPARES.map((c) => (
        <div key={c.title} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "10px 14px" }}>
            <span style={{ fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--ink-strong)", letterSpacing: "-0.01em" }}>{c.title}</span>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--teal)", fontWeight: 500, lineHeight: 1.4 }}>{c.metric}</span>
          </div>
          <BeforeAfter srcs={[c.before, c.after]} labels={["Before", "After"]} afterScroll={c.afterScroll} />
        </div>
      ))}
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
          <ParallaxFrame src={src} aspectRatio="16/9" />
        </motion.div>
      ))}
    </div>
  );
}

/* ── Information-architecture comparison (hand-built, no screenshots) ──
   A tangled node map (before) vs a clean hierarchy (after). */
type IaNode = { id: string; label: string; x: number; y: number; root?: boolean };

function IaNodeMap({ nodes, edges, accent, dashed }: { nodes: IaNode[]; edges: [string, string][]; accent: string; dashed?: boolean }) {
  const byId: Record<string, IaNode> = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <div style={{ position: "relative", width: "100%", height: "clamp(300px, 40vw, 380px)" }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {edges.map(([a, b], i) => {
          const na = byId[a], nb = byId[b];
          return (
            <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={`rgb(${accent} / 0.5)`} strokeWidth={1.4} strokeDasharray={dashed ? "3 3" : undefined} vectorEffect="non-scaling-stroke" />
          );
        })}
      </svg>
      {nodes.map((n) => (
        <div key={n.id} style={{
          position: "absolute", left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)",
          fontSize: n.root ? "12px" : "11px", fontWeight: n.root ? 700 : 500,
          color: n.root ? "var(--ink-strong)" : "rgb(var(--ink-rgb) / calc(0.8 * var(--ink-k)))",
          background: n.root ? `rgb(${accent} / 0.22)` : "rgba(20,18,15,0.85)",
          border: `1px solid rgb(${accent} / ${n.root ? 0.6 : 0.35})`,
          borderRadius: "var(--radius-pill)", padding: n.root ? "6px 14px" : "5px 11px",
          whiteSpace: "nowrap", boxShadow: "0 4px 14px rgb(var(--shadow-rgb) / calc(0.45 * var(--shadow-k)))", backdropFilter: "blur(4px)",
        }}>
          {n.label}
        </div>
      ))}
    </div>
  );
}

function IaPanel({ title, accent, nodes, edges, dashed }: { title: string; accent: string; nodes: IaNode[]; edges: [string, string][]; dashed?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ position: "relative", borderRadius: "var(--radius-xl)", border: `1px solid rgb(${accent} / 0.22)`, background: "var(--bg-raised)", boxShadow: "0 24px 60px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))", padding: "22px", overflow: "hidden" }}
    >
      <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, rgb(${accent} / 0.6), transparent)` }} />
      <span style={{ display: "inline-block", fontSize: "var(--text-label)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: `rgb(${accent})`, marginBottom: "10px" }}>{title}</span>
      <IaNodeMap nodes={nodes} edges={edges} accent={accent} dashed={dashed} />
    </motion.div>
  );
}

function IaComparison() {
  const before: { nodes: IaNode[]; edges: [string, string][] } = {
    nodes: [
      { id: "r", label: "Intranet", x: 50, y: 12, root: true },
      { id: "a", label: "Home", x: 17, y: 36 },
      { id: "b", label: "Docs", x: 48, y: 30 },
      { id: "c", label: "Files", x: 83, y: 36 },
      { id: "d", label: "HR ?", x: 29, y: 60 },
      { id: "e", label: "Documents", x: 63, y: 56 },
      { id: "f", label: "Policies", x: 16, y: 84 },
      { id: "g", label: "Misc", x: 46, y: 86 },
      { id: "h", label: "Templates", x: 76, y: 80 },
      { id: "i", label: "Old stuff", x: 86, y: 62 },
    ],
    edges: [
      ["r", "a"], ["r", "b"], ["r", "c"],
      ["a", "e"], ["b", "d"], ["c", "d"], ["b", "h"],
      ["d", "g"], ["e", "f"], ["e", "i"], ["c", "g"], ["a", "h"], ["b", "i"], ["e", "g"],
    ],
  };
  const after: { nodes: IaNode[]; edges: [string, string][] } = {
    nodes: [
      { id: "home", label: "Home", x: 50, y: 12, root: true },
      { id: "p", label: "People & HR", x: 22, y: 44 },
      { id: "pr", label: "Projects", x: 50, y: 44 },
      { id: "k", label: "Knowledge", x: 78, y: 44 },
      { id: "p1", label: "Onboarding", x: 15, y: 82 },
      { id: "p2", label: "Policies", x: 31, y: 82 },
      { id: "pr1", label: "Active", x: 43, y: 82 },
      { id: "pr2", label: "Archive", x: 58, y: 82 },
      { id: "k1", label: "Templates", x: 70, y: 82 },
      { id: "k2", label: "Guides", x: 85, y: 82 },
    ],
    edges: [
      ["home", "p"], ["home", "pr"], ["home", "k"],
      ["p", "p1"], ["p", "p2"], ["pr", "pr1"], ["pr", "pr2"], ["k", "k1"], ["k", "k2"],
    ],
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "24px" }}>
      <IaPanel title="Before · Tangled structure" accent="239 68 68" nodes={before.nodes} edges={before.edges} dashed />
      <IaPanel title="After · Logical hierarchy" accent="var(--gold-rgb)" nodes={after.nodes} edges={after.edges} />
    </div>
  );
}

/* Three page-tops side by side — used to show how inconsistent separate pages
   were (different layouts/themes), each faded at the bottom with a caption. */
function PageTriptych({ srcs, captions }: { srcs: string[]; captions?: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "18px" }}>
      {srcs.slice(0, 3).map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
          whileHover={{ y: -6 }}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <div style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid rgb(var(--ink-rgb) / calc(0.1 * var(--ink-k)))", boxShadow: "0 20px 50px rgb(var(--shadow-rgb) / calc(0.5 * var(--shadow-k)))", height: "clamp(300px, 42vh, 430px)", background: "var(--bg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
            <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "110px", background: "linear-gradient(to bottom, transparent, #0B0A09)", pointerEvents: "none" }} />
          </div>
          {captions?.[i] && (
            <span style={{ fontSize: "var(--text-label)", fontWeight: 600, letterSpacing: "0.06em", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", textAlign: "center" }}>{captions[i]}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* Three screens, each in its own laptop frame (3-up on desktop, stacked on mobile).
   Static top-crop with a soft fade — the hero carries the scrollable laptop; here the
   device language stays consistent across the whole case study. */
/* One screen inside the triptych — scrollable like the single LaptopMockup so
   the full page design can be explored (was a static top-crop before). Opens on
   the meaningful region via `offset` (fraction of the scrollable range). */
function TriptychScreen({ src, offset = 0 }: { src: string; offset?: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hasOverflow, setHasOverflow] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const img = imgRef.current;
    const apply = () => {
      setHasOverflow(el.scrollHeight > el.clientHeight + 4);
      const range = el.scrollHeight - el.clientHeight;
      if (offset > 0 && range > 0) el.scrollTop = offset * range;
    };
    if (img?.complete) apply();
    else img?.addEventListener("load", apply);
    window.addEventListener("resize", apply);
    return () => {
      img?.removeEventListener("load", apply);
      window.removeEventListener("resize", apply);
    };
  }, [offset]);

  return (
    <div style={{ position: "relative", aspectRatio: "16/10", borderRadius: "3px", overflow: "hidden", background: "#fff", border: "1px solid #000" }}>
      <div
        ref={scrollRef}
        style={{ position: "absolute", inset: 0, overflowY: "scroll", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" ref={imgRef} src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
      </div>
      {hasOverflow && (
        <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "64px", background: "linear-gradient(to top, rgb(var(--ink-rgb) / calc(0.9 * var(--ink-k))), transparent)", pointerEvents: "none" }} />
      )}
    </div>
  );
}

function LaptopTriptych({ srcs, captions, offsets }: { srcs: string[]; captions?: string[]; offsets?: number[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "clamp(18px, 3vw, 30px)", alignItems: "start" }}>
      {srcs.slice(0, 3).map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
          whileHover={{ y: -6 }}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <div style={{ filter: "drop-shadow(0 26px 44px rgb(var(--shadow-rgb) / calc(0.55 * var(--shadow-k))))" }}>
            {/* lid */}
            <div style={{
              background: "linear-gradient(160deg, #2a2a2c 0%, #161617 100%)",
              borderRadius: "11px 11px 4px 4px",
              padding: "8px 8px 9px",
              border: "1px solid rgb(var(--ink-rgb) / calc(0.12 * var(--ink-k)))",
              boxShadow: "inset 0 1px 0 rgb(var(--ink-rgb) / calc(0.12 * var(--ink-k)))",
            }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "5px" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#0e0e1a", border: "1px solid rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))" }} />
              </div>
              {/* screen — scrollable so the full page design can be explored */}
              <TriptychScreen src={src} offset={offsets?.[i]} />
            </div>
            {/* base / hinge */}
            <div style={{ position: "relative", width: "110%", marginLeft: "-5%", height: "11px", background: "linear-gradient(180deg, #cfd3d6 0%, #a7adb2 45%, #7d8388 100%)", borderRadius: "0 0 11px 11px", boxShadow: "0 6px 11px rgb(var(--shadow-rgb) / calc(0.42 * var(--shadow-k)))" }}>
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "13%", height: "4px", background: "linear-gradient(180deg, #6c7176, #565b60)", borderRadius: "0 0 5px 5px" }} />
            </div>
          </div>
          {captions?.[i] && (
            <span style={{ fontSize: "var(--text-label)", fontWeight: 600, letterSpacing: "0.06em", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", textAlign: "center" }}>{captions[i]}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}


/* ── African Bank design-system sheet — tokens pulled straight from their Figma ──
   (light "artboard" embedded in the dark page; Montserrat, navy + green, real components) */
const AB = {
  navy: "#002B60",    // brand core 500 — primary text / brand surface
  blue: "#3E5D88",    // brand core 400 — secondary text
  green: "#5DC400",   // brand highlight 500 — primary CTA
  surface: "#E3E8EF", // brand core 100 — light surface
  border: "#C9D1DB",  // gray 300 — input border
  strong: "#475365",  // gray 700 — strong border
  slate: "#8A97A8",   // gray 500
  font: "var(--font-montserrat)",
};

function DSBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <span style={{ fontFamily: AB.font, fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: AB.slate }}>{title}</span>
      {children}
    </div>
  );
}

function DSField({ label, value, placeholder, focused }: { label: string; value?: string; placeholder?: string; focused?: boolean }) {
  // Matches AB's input component: label (Montserrat Medium 14) + 48px box, 1px border, 8px radius
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <span style={{ fontFamily: AB.font, fontSize: "14px", fontWeight: 500, color: AB.navy }}>{label}</span>
      <div style={{
        height: "48px", display: "flex", alignItems: "center", padding: "0 12px",
        background: "#fff", borderRadius: "8px",
        border: `1px solid ${focused ? AB.navy : AB.border}`,
        boxShadow: focused ? "0 0 0 3px rgba(0,43,96,0.12)" : "none",
        fontFamily: AB.font, fontSize: "14px", fontWeight: 500, color: value ? AB.navy : "#9AA7B8",
      }}>
        {value || placeholder}
      </div>
    </div>
  );
}

function DesignSystemShowcase() {
  const swatches: { c: string; name: string }[] = [
    { c: AB.navy, name: "Navy" },
    { c: AB.blue, name: "Blue" },
    { c: AB.green, name: "Green" },
    { c: AB.surface, name: "Surface" },
    { c: AB.border, name: "Border" },
    { c: AB.slate, name: "Slate" },
    { c: "#FFFFFF", name: "White" },
  ];
  const icons = [AbPerson, AbBank, AbVerified, AbCreditCard, AbMenuBook];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", border: "1px solid rgb(var(--ink-rgb) / calc(0.1 * var(--ink-k)))", boxShadow: "0 34px 90px rgb(var(--shadow-rgb) / calc(0.55 * var(--shadow-k)))" }}
    >
      {/* Header — African Bank's navy/blue gradient */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "16px clamp(24px, 4vw, 36px)", background: "linear-gradient(135deg, #004AA4 0%, #012046 100%)" }}>
        <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: AB.green }} />
        <span style={{ fontFamily: AB.font, fontSize: "15px", fontWeight: 700, color: "var(--ink-strong)", letterSpacing: "-0.01em" }}>Design System</span>
        <span style={{ fontFamily: AB.font, fontSize: "12px", color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))" }}>· African Bank component library</span>
      </div>

      {/* Light artboard */}
      <div style={{ background: "#F7F8FA", padding: "clamp(24px, 4vw, 36px)", display: "flex", flexDirection: "column", gap: "30px" }}>
        <DSBlock title="Colour">
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {swatches.map((s) => (
              <div key={s.name} title={s.name} style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "center" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "8px", background: s.c, border: "1px solid rgba(0,0,0,0.1)" }} />
                <span style={{ fontFamily: AB.font, fontSize: "9px", color: AB.slate, fontWeight: 500 }}>{s.name}</span>
              </div>
            ))}
          </div>
        </DSBlock>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
            <DSBlock title="Type">
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                <span style={{ fontFamily: AB.font, fontSize: "44px", fontWeight: 700, color: AB.navy, lineHeight: 1, letterSpacing: "-0.02em" }}>Aa</span>
                <span style={{ fontFamily: AB.font, fontSize: "12px", color: AB.blue }}>Montserrat · 400 / 500 / 600</span>
              </div>
            </DSBlock>

            <DSBlock title="Icons">
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {icons.map((Ico, i) => (
                  <span key={i} style={{ width: "40px", height: "40px", borderRadius: "12px", background: AB.surface, display: "grid", placeItems: "center" }}>
                    <Ico size={19} color={AB.navy} strokeWidth={1.8} />
                  </span>
                ))}
              </div>
            </DSBlock>

            <DSBlock title="Buttons">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
                <span style={{ fontFamily: AB.font, fontSize: "13px", fontWeight: 600, color: "var(--ink-strong)", background: AB.green, padding: "10px 20px", borderRadius: "999px" }}>Confirm</span>
                <span style={{ fontFamily: AB.font, fontSize: "13px", fontWeight: 600, color: "var(--ink-strong)", background: AB.navy, padding: "10px 20px", borderRadius: "999px" }}>Apply now</span>
                <span style={{ fontFamily: AB.font, fontSize: "13px", fontWeight: 600, color: AB.blue, background: "#fff", border: `1px solid ${AB.strong}`, padding: "9px 18px", borderRadius: "999px" }}>Edit details</span>
              </div>
            </DSBlock>
          </div>

          <DSBlock title="Input fields">
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <DSField label="Email address" value="jamie@gmail.com" />
              <DSField label="ID number" placeholder="Enter your ID number" focused />
            </div>
          </DSBlock>
        </div>
      </div>
    </motion.div>
  );
}

/* ══ Life Healthcare — coded design-system components (real photos · Helvetica-metric) ══ */
const HN = "'Helvetica Neue', Helvetica, var(--font-arimo), Arial, sans-serif";
const LHC = {
  navy: "#153152", slate: "#445a75", red: "#e71c20", link: "#a41417",
  border: "#d9d9d6", borderStrong: "#607389", tint: "#f8fbfd", grey: "#f0f1f3",
  info: "#e9f3f9", warnBg: "#faf1dd", warnBar: "#e0a43a", errBg: "#fbe8e8", white: "#ffffff",
};

function LhcRoundIcon({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ width: "36px", height: "36px", borderRadius: "9999px", background: "#fff", border: `1px solid ${LHC.border}`, display: "grid", placeItems: "center", color: LHC.navy, flexShrink: 0 }}>
      {children}
    </span>
  );
}

/* Result card (doctor / hospital): photo → scrim → frosted panel */
function LhcResultCard({ photo, name, meta, line1, line2, action, distance }: { photo: string; name: string; meta: string; line1: string; line2?: string; action: string; distance?: string }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "81 / 104", borderRadius: "20px", overflow: "hidden", boxShadow: "0 18px 44px rgba(21,49,82,0.28)", background: LHC.navy }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" src={photo} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(21,49,82,0.10) 0%, rgba(21,49,82,0.04) 45%, rgba(21,49,82,0.22) 100%)" }} />
      {distance && (
        <span style={{ position: "absolute", top: "12px", right: "12px", display: "inline-flex", alignItems: "center", gap: "4px", background: "#fff", color: LHC.navy, fontFamily: HN, fontSize: "12px", fontWeight: 700, padding: "6px 11px", borderRadius: "9999px", boxShadow: "0 4px 12px rgb(var(--shadow-rgb) / calc(0.16 * var(--shadow-k)))" }}>
          <LhcMapPin size={12} strokeWidth={2} /> {distance}
        </span>
      )}
      <div style={{ position: "absolute", left: "10px", right: "10px", bottom: "10px", background: "rgb(var(--ink-rgb) / calc(0.92 * var(--ink-k)))", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderRadius: "14px", padding: "16px 16px 14px" }}>
        <p style={{ fontFamily: HN, fontSize: "17px", fontWeight: 700, color: LHC.navy, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{name}</p>
        <p style={{ fontFamily: HN, fontSize: "13px", color: LHC.slate, marginTop: "3px" }}>{meta}</p>
        <p style={{ fontFamily: HN, fontSize: "13px", color: LHC.slate, marginTop: "12px" }}>{line1}</p>
        {line2 && <p style={{ fontFamily: HN, fontSize: "13px", color: LHC.slate, marginTop: "2px" }}>{line2}</p>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "14px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <LhcRoundIcon><LhcPhone size={15} strokeWidth={1.8} /></LhcRoundIcon>
            <LhcRoundIcon><LhcMail size={15} strokeWidth={1.8} /></LhcRoundIcon>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "2px", fontFamily: HN, fontSize: "13.5px", fontWeight: 700, color: LHC.navy }}>
            {action} <LhcChevronRight size={16} strokeWidth={2.2} />
          </span>
        </div>
      </div>
    </div>
  );
}

function LhcMeasureCard() {
  const yvals = [38, 44, 40, 48, 46, 54, 52, 60, 58, 70, 66, 88];
  const xvals = yvals.map((_, i) => 12 + i * (256 / 11));
  const d = yvals.map((y, i) => `${i === 0 ? "M" : "L"}${xvals[i].toFixed(1)},${y}`).join(" ");
  return (
    <div style={{ width: "100%", background: LHC.tint, borderRadius: "20px", padding: "clamp(18px, 2.2vw, 28px)", display: "flex", flexDirection: "column", gap: "16px", border: `1px solid ${LHC.border}` }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
        <div>
          <p style={{ fontFamily: HN, fontSize: "20px", fontWeight: 700, color: LHC.navy, letterSpacing: "-0.01em", lineHeight: 1.25 }}>Falling adverse events</p>
          <p style={{ fontFamily: HN, fontSize: "14px", color: LHC.slate, marginTop: "6px", lineHeight: 1.4 }}>Falling adverse events as a rate per 1 000 days in hospital</p>
        </div>
        <span style={{ width: "40px", height: "40px", borderRadius: "9999px", background: "#fff", display: "grid", placeItems: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(21,49,82,0.08)" }}>
          <LhcChevronDown size={18} color={LHC.navy} strokeWidth={2} />
        </span>
      </div>
      <div>
        <p style={{ fontFamily: HN, fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", color: LHC.slate, marginBottom: "4px" }}>UPPER CONTROL LIMIT · 1.30</p>
        <svg viewBox="0 0 280 110" width="100%" height="auto" style={{ display: "block", overflow: "visible" }}>
          <line x1="0" y1="6" x2="280" y2="6" stroke={LHC.slate} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="104" x2="280" y2="104" stroke={LHC.slate} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="4 4" />
          <motion.path d={d} fill="none" stroke={LHC.navy} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: EASE }} />
          {yvals.map((y, i) => (
            <circle key={i} cx={xvals[i]} cy={y} r={i === yvals.length - 1 ? 6 : 4} fill={i === yvals.length - 1 ? LHC.navy : "#fff"} stroke={LHC.navy} strokeWidth="2" />
          ))}
        </svg>
        <p style={{ fontFamily: HN, fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", color: LHC.slate, marginTop: "4px" }}>LOWER CONTROL LIMIT · 0.70</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <span style={{ fontFamily: HN, fontSize: "12px", color: LHC.slate }}>Jan 2026</span>
          <span style={{ fontFamily: HN, fontSize: "12px", color: LHC.slate }}>Dec 2026</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingTop: "16px", borderTop: `1px solid ${LHC.border}` }}>
        <div>
          <p style={{ fontFamily: HN, fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: LHC.slate }}>AVERAGE RATE</p>
          <p style={{ fontFamily: HN, fontSize: "40px", fontWeight: 700, color: LHC.navy, lineHeight: 1, letterSpacing: "-0.02em", marginTop: "6px" }}>0.78</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: HN, fontSize: "14px", fontWeight: 700, color: LHC.navy }}>Trending down</p>
          <p style={{ fontFamily: HN, fontSize: "13px", color: LHC.slate, marginTop: "2px" }}>34% lower over 12 months</p>
        </div>
      </div>
    </div>
  );
}

function LhcInfoCard() {
  return (
    <div style={{ width: "100%", background: "#fff", borderRadius: "20px", border: `1px solid ${LHC.border}`, padding: "clamp(22px, 2.4vw, 30px)", display: "flex", flexDirection: "column", gap: "14px" }}>
      <span style={{ fontFamily: HN, fontSize: "40px", fontWeight: 700, color: LHC.red, lineHeight: 1, letterSpacing: "-0.03em" }}>01</span>
      <p style={{ fontFamily: HN, fontSize: "24px", fontWeight: 700, color: LHC.navy, letterSpacing: "-0.01em", lineHeight: 1.25 }}>Nursing qualifications</p>
      <p style={{ fontFamily: HN, fontSize: "15px", color: LHC.slate, lineHeight: 1.6 }}>Enrolled, auxiliary and registered nursing programmes at our learning centres.</p>
    </div>
  );
}

/* ── Controls ── */
function LhcField({ label, value, placeholder, state }: { label: string; value?: string; placeholder?: string; state?: "default" | "focus" | "error" }) {
  const borderColor = state === "error" ? LHC.red : state === "focus" ? LHC.navy : "#c9d1db";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <span style={{ fontFamily: HN, fontSize: "14px", fontWeight: 500, color: LHC.navy }}>{label}</span>
      <div style={{ height: "48px", display: "flex", alignItems: "center", padding: "0 14px", background: "#fff", borderRadius: "8px", border: `1.5px solid ${borderColor}`, boxShadow: state === "focus" ? "0 0 0 3px rgba(21,49,82,0.12)" : "none", fontFamily: HN, fontSize: "15px", color: value ? LHC.navy : "#8a97a8" }}>
        {value || placeholder}
      </div>
      {state === "error" && <span style={{ fontFamily: HN, fontSize: "12px", color: LHC.red }}>This field is required</span>}
    </div>
  );
}

function LhcCheck({ label, state }: { label: string; state: "default" | "checked" | "error" | "disabled" }) {
  const box: React.CSSProperties = {
    width: "20px", height: "20px", borderRadius: "5px", flexShrink: 0, display: "grid", placeItems: "center",
    border: `1.5px solid ${state === "error" ? LHC.red : state === "disabled" ? LHC.border : LHC.borderStrong}`,
    background: state === "checked" ? LHC.navy : state === "disabled" ? "#e5e8ec" : "#fff",
    borderColor: state === "checked" ? LHC.navy : undefined,
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={box}>{state === "checked" && <LhcTick size={13} color="#fff" strokeWidth={3} />}</span>
      <span style={{ fontFamily: HN, fontSize: "15px", color: state === "error" ? LHC.red : state === "disabled" ? "#9aa7b8" : LHC.navy }}>{label}</span>
    </div>
  );
}

function LhcRadioDot({ label, on }: { label: string; on?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ width: "20px", height: "20px", borderRadius: "9999px", flexShrink: 0, display: "grid", placeItems: "center", border: `1.5px solid ${on ? LHC.navy : LHC.borderStrong}` }}>
        {on && <span style={{ width: "10px", height: "10px", borderRadius: "9999px", background: LHC.navy }} />}
      </span>
      <span style={{ fontFamily: HN, fontSize: "15px", color: LHC.navy }}>{label}</span>
    </div>
  );
}

function LhcToggleSwitch({ label, on }: { label: string; on?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ width: "44px", height: "24px", borderRadius: "9999px", flexShrink: 0, background: on ? LHC.navy : "#d9dde3", position: "relative", transition: "background 0.2s" }}>
        <span style={{ position: "absolute", top: "2px", left: on ? "22px" : "2px", width: "20px", height: "20px", borderRadius: "9999px", background: "#fff", boxShadow: "0 1px 3px rgb(var(--shadow-rgb) / calc(0.2 * var(--shadow-k)))", transition: "left 0.2s" }} />
      </span>
      <span style={{ fontFamily: HN, fontSize: "15px", color: LHC.navy }}>{label}</span>
    </div>
  );
}

function LhcChipPill({ label, selected }: { label: string; selected?: boolean }) {
  return (
    <span style={{ fontFamily: HN, fontSize: "14px", fontWeight: 500, padding: "8px 16px", borderRadius: "9999px", background: selected ? LHC.navy : LHC.grey, color: selected ? "var(--ink-strong)" : LHC.navy }}>{label}</span>
  );
}

/* ── Alerts ── */
function LhcNotice({ tone, title, body }: { tone: "info" | "warning" | "error"; title: string; body: string }) {
  const bg = tone === "info" ? LHC.info : tone === "warning" ? LHC.warnBg : LHC.errBg;
  const bar = tone === "info" ? LHC.navy : tone === "warning" ? LHC.warnBar : LHC.red;
  const titleColor = tone === "error" ? LHC.red : LHC.navy;
  return (
    <div style={{ background: bg, borderRadius: "10px", borderLeft: `3px solid ${bar}`, padding: "18px 22px" }}>
      <p style={{ fontFamily: HN, fontSize: "18px", fontWeight: 700, color: titleColor, lineHeight: 1.3 }}>{title}</p>
      <p style={{ fontFamily: HN, fontSize: "15px", color: LHC.slate, marginTop: "6px", lineHeight: 1.5 }}>{body}</p>
    </div>
  );
}

function LhcBanner() {
  return (
    <div style={{ background: LHC.grey, borderRadius: "10px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "14px" }}>
      <span style={{ width: "30px", height: "30px", borderRadius: "9999px", border: `1.5px solid ${LHC.borderStrong}`, display: "grid", placeItems: "center", flexShrink: 0 }}>
        <LhcInfo size={16} color={LHC.navy} strokeWidth={2} />
      </span>
      <span style={{ fontFamily: HN, fontSize: "15px", color: LHC.navy, flex: 1, lineHeight: 1.4 }}>New online booking is now available for all Life Healthcare hospitals.</span>
      <span style={{ fontFamily: HN, fontSize: "15px", fontWeight: 700, color: LHC.navy, whiteSpace: "nowrap" }}>Learn more</span>
      <LhcX size={18} color={LHC.slate} strokeWidth={2} style={{ flexShrink: 0 }} />
    </div>
  );
}

/* ── Tab sub-heading ── */
function LhcTabHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <p style={{ fontFamily: HN, fontSize: "20px", fontWeight: 700, color: LHC.navy, letterSpacing: "-0.01em" }}>{title}</p>
      <p style={{ fontFamily: HN, fontSize: "14px", color: LHC.slate, marginTop: "4px" }}>{sub}</p>
    </div>
  );
}

function LhcTab({ k }: { k: string }) {
  if (k === "colour") {
    const primary = [
      { c: "#153152", n: "Corporate Blue", h: "#153152" },
      { c: "#e71c20", n: "Corporate Red", h: "#e71c20" },
    ];
    const foundation = [
      { c: "#a41417", n: "Link / CTA", h: "#a41417" },
      { c: "#445a75", n: "Text secondary", h: "#445a75" },
      { c: "#607389", n: "Placeholder", h: "#607389" },
      { c: "#d9d9d6", n: "Border", h: "#d9d9d6" },
      { c: "#eceff1", n: "Subtle", h: "#eceff1" },
      { c: "#f0f1f3", n: "Light Grey", h: "#f0f1f3" },
      { c: "#fbfbfb", n: "Cool Grey", h: "#fbfbfb" },
      { c: "#f8fbfd", n: "Powder Blue", h: "#f8fbfd" },
      { c: "#edf9f7", n: "Teal", h: "#edf9f7" },
      { c: "#e9f3f9", n: "Info", h: "#e9f3f9" },
    ];
    return (
      <div>
        <LhcTabHead title="Colour" sub="Two brand primaries over a calm foundation palette — every colour is a semantic token." />
        <span style={{ fontFamily: HN, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: LHC.slate }}>Primary</span>
        <div className="grid grid-cols-2" style={{ gap: "16px", marginTop: "12px", marginBottom: "30px" }}>
          {primary.map((p) => (
            <div key={p.n} style={{ borderRadius: "14px", overflow: "hidden", border: `1px solid ${LHC.border}` }}>
              <div style={{ height: "100px", background: p.c }} />
              <div style={{ padding: "12px 16px", background: "#fff" }}>
                <p style={{ fontFamily: HN, fontSize: "15px", fontWeight: 700, color: LHC.navy }}>{p.n}</p>
                <p style={{ fontFamily: HN, fontSize: "13px", color: LHC.slate, marginTop: "2px" }}>{p.h}</p>
              </div>
            </div>
          ))}
        </div>
        <span style={{ fontFamily: HN, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: LHC.slate }}>Foundation</span>
        <div className="grid grid-cols-3 sm:grid-cols-5" style={{ gap: "12px", marginTop: "12px" }}>
          {foundation.map((s) => (
            <div key={s.n} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ height: "56px", borderRadius: "10px", background: s.c, border: `1px solid ${LHC.border}` }} />
              <span style={{ fontFamily: HN, fontSize: "12px", fontWeight: 600, color: LHC.navy, lineHeight: 1.2 }}>{s.n}</span>
              <span style={{ fontFamily: HN, fontSize: "11px", color: LHC.slate, marginTop: "-4px" }}>{s.h}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (k === "type") {
    const rows = [
      { t: "Care that counts", s: 44, w: 700, l: "Display · 80/84" },
      { t: "A hospital group, reimagined", s: 32, w: 700, l: "H1 · 48/52" },
      { t: "Find a doctor near you", s: 24, w: 700, l: "H3 · 32/36" },
      { t: "Lead paragraph that sets up a section with a calm, confident voice.", s: 20, w: 400, l: "Lead · 20/28" },
      { t: "Body copy that stays legible and comfortable at every size across the site.", s: 16, w: 400, l: "Body · 16/24" },
      { t: "OUR SERVICE OFFERING", s: 15, w: 700, l: "Eyebrow · 15/20", tracked: true },
    ];
    return (
      <div>
        <LhcTabHead title="Typography — Helvetica Neue" sub="A 33-style ramp: headings by breakpoint, plus one-size styles for lead, body, caption and eyebrow." />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {rows.map((r) => (
            <div key={r.l} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "20px", borderBottom: `1px solid ${LHC.border}`, paddingBottom: "12px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: HN, fontSize: `${r.s}px`, fontWeight: r.w, color: LHC.navy, letterSpacing: r.tracked ? "0.14em" : "-0.02em", lineHeight: 1.15 }}>{r.t}</span>
              <span style={{ fontFamily: HN, fontSize: "12px", color: LHC.slate, whiteSpace: "nowrap" }}>{r.l}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (k === "buttons") {
    const base = { fontFamily: HN, fontSize: "16px", fontWeight: 700, borderRadius: "8px", lineHeight: 1 } as const;
    const small = { fontFamily: HN, fontSize: "14px", fontWeight: 700, borderRadius: "8px", lineHeight: 1 } as const;
    return (
      <div>
        <LhcTabHead title="Buttons" sub="One component, three emphases — Primary, Secondary, Tertiary — in default and small, on light and dark." />
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
            <span style={{ ...base, color: "var(--ink-strong)", background: LHC.navy, padding: "14px 26px" }}>Find a hospital</span>
            <span style={{ ...base, color: LHC.navy, background: "#fff", border: `1.5px solid ${LHC.navy}`, padding: "12.5px 24.5px" }}>Learn more</span>
            <span style={{ ...base, color: LHC.navy, display: "inline-flex", alignItems: "center", gap: "4px" }}>View all <LhcChevronRight size={17} strokeWidth={2.2} /></span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", background: LHC.navy, padding: "20px", borderRadius: "12px" }}>
            <span style={{ ...small, color: LHC.navy, background: "#fff", padding: "11px 20px" }}>Book now</span>
            <span style={{ ...small, color: "var(--ink-strong)", background: "transparent", border: "1.5px solid rgb(var(--ink-rgb) / calc(0.7 * var(--ink-k)))", padding: "9.5px 18.5px" }}>Directions</span>
            <span style={{ ...small, color: "var(--ink-strong)", display: "inline-flex", alignItems: "center", gap: "4px" }}>See more <LhcChevronRight size={15} strokeWidth={2.2} /></span>
          </div>
        </div>
      </div>
    );
  }
  if (k === "controls") {
    return (
      <div>
        <LhcTabHead title="Controls" sub="Inputs and selection controls — each with default, focus, error and disabled states." />
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "28px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <LhcField label="Full name" value="Olivia Bennett" />
            <LhcField label="ID number" placeholder="Enter your ID number" state="focus" />
            <LhcField label="Email address" value="olivia@" state="error" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <LhcCheck label="I agree to the terms" state="checked" />
              <LhcCheck label="Send me updates" state="default" />
              <LhcCheck label="Required consent" state="error" />
            </div>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <LhcRadioDot label="Medical aid" on />
              <LhcRadioDot label="Self-pay" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <LhcToggleSwitch label="Email notifications" on />
              <LhcToggleSwitch label="SMS reminders" />
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <LhcChipPill label="Cardiology" selected />
              <LhcChipPill label="Gauteng" />
              <LhcChipPill label="Open now" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (k === "alerts") {
    return (
      <div>
        <LhcTabHead title="Alerts & notices" sub="Left-bar notices in three tones for patient information, plus a neutral announcement banner." />
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <LhcNotice tone="info" title="Under 18?" body="Anyone under 18 must have a parent or guardian with them at admission." />
          <LhcNotice tone="warning" title="Fasting required" body="No food or drink for 6 hours before your procedure unless told otherwise." />
          <LhcNotice tone="error" title="Life-threatening emergency?" body="Call 0860 123 367 or go straight to your nearest emergency unit." />
          <LhcBanner />
        </div>
      </div>
    );
  }
  // cards
  return (
    <div>
      <LhcTabHead title="Cards" sub="One anatomy, reused for every kind of content a patient meets — 29 card types in all." />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" style={{ gap: "20px", alignItems: "start" }}>
        <LhcResultCard photo="/images/lhc-photo-doctor.jpg" name="Dr Olivia Bennett" meta="ENT Specialist · Interventional" line1="Gauteng" line2="Practises at 2 hospitals" action="View profile" />
        <LhcResultCard photo="/images/lhc-photo-hospital.jpg" name="Life Fourways Hospital" meta="Private hospital · Multi-disciplinary" line1="Fourways, Johannesburg" action="View hospital" distance="2.4 km away" />
        <LhcMeasureCard />
        <LhcInfoCard />
      </div>
    </div>
  );
}

const LHC_TABS = [
  { k: "cards", label: "Cards" }, { k: "colour", label: "Colour" }, { k: "type", label: "Type" },
  { k: "buttons", label: "Buttons" }, { k: "controls", label: "Controls" }, { k: "alerts", label: "Alerts" },
];

/* Interactive component browser — tabs sit OUTSIDE the artboard as clear toggles */
function LhcComponents() {
  const [i, setI] = useState(0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: EASE }}
      style={{ display: "flex", flexDirection: "column", gap: "18px" }}
    >
      {/* Tabs — outside the card, clearly clickable */}
      <div role="tablist" aria-label="Component sets" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {LHC_TABS.map((t, idx) => {
          const active = i === idx;
          return (
            <button
              key={t.k}
              role="tab"
              aria-selected={active}
              onClick={() => setI(idx)}
              style={{
                fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, padding: "11px 22px",
                borderRadius: "var(--radius-pill)", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s",
                border: active ? "1px solid var(--gold)" : "1px solid rgb(var(--ink-rgb) / calc(0.18 * var(--ink-k)))",
                background: active ? "var(--gold)" : "rgb(var(--ink-rgb) / calc(0.04 * var(--ink-k)))",
                color: active ? "#1A1206" : "rgb(var(--ink-rgb) / calc(0.8 * var(--ink-k)))",
                boxShadow: active ? "0 8px 24px rgb(var(--gold-rgb) / 0.3)" : "none",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {/* Artboard */}
      <div data-cover="components" style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", border: "1px solid rgb(var(--ink-rgb) / calc(0.1 * var(--ink-k)))", boxShadow: "0 34px 90px rgb(var(--shadow-rgb) / calc(0.55 * var(--shadow-k)))" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "16px clamp(18px, 3vw, 28px)", background: LHC.navy }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: LHC.red }} />
          <span style={{ fontFamily: HN, fontSize: "15px", fontWeight: 700, color: "var(--ink-strong)" }}>Component library</span>
          <span className="hidden sm:inline" style={{ fontFamily: HN, fontSize: "12px", color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))" }}>· Life Healthcare · {LHC_TABS[i].label}</span>
        </div>
        <div style={{ background: "#fff", padding: "clamp(22px, 4vw, 38px)", minHeight: "360px" }}>
          <AnimatePresence mode="wait">
            <motion.div key={LHC_TABS[i].k} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.28, ease: EASE }}>
              <LhcTab k={LHC_TABS[i].k} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Rows & Blocks — the layout system (surfaces · rhythm · slot) ── */
const LHC_SURFACES = [
  { n: "White", c: "#ffffff", dark: false }, { n: "Powder Blue", c: "#f8fbfd", dark: false },
  { n: "Slate Blue", c: "#eef2f7", dark: false }, { n: "Cool Grey", c: "#fbfbfb", dark: false },
  { n: "Light Grey", c: "#f0f1f3", dark: false }, { n: "Teal", c: "#edf9f7", dark: false },
  { n: "Powder Fade", c: "linear-gradient(135deg,#f8fbfd,#ffffff)", dark: false }, { n: "Statement", c: "#1d3a5e", dark: true }, { n: "Navy", c: "#153152", dark: true },
];

/* Coded article card — matches the DS Card/Article (image · badge · meta · title · excerpt · read link) */
function LhcArticleCard({ img, badge, meta, title, excerpt }: { img: string; badge: string; meta: string; title: string; excerpt: string }) {
  return (
    <div style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #e7ebee", boxShadow: "0 2px 10px rgba(21,49,82,0.06)", display: "flex", flexDirection: "column", fontFamily: HN, height: "100%" }}>
      <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: "9px", flexGrow: 1 }}>
        <div className="flex items-center justify-between" style={{ gap: "10px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.02em", color: "var(--ink-strong)", background: LHC.navy, borderRadius: "9999px", padding: "4px 11px" }}>{badge}</span>
          <span style={{ fontSize: "11.5px", color: LHC.slate }}>{meta}</span>
        </div>
        {/* Simulated article-card title — presentational replica of the redesigned
            site's UI, deliberately NOT a document heading so it stays out of the
            page's heading outline for screen-reader users. */}
        <p style={{ fontSize: "17px", fontWeight: 700, color: LHC.navy, lineHeight: 1.25, letterSpacing: "-0.01em" }}>{title}</p>
        <p style={{ fontSize: "13.5px", color: LHC.slate, lineHeight: 1.5 }}>{excerpt}</p>
        <span className="inline-flex items-center" style={{ gap: "6px", marginTop: "auto", paddingTop: "6px", fontSize: "13px", fontWeight: 700, color: LHC.navy }}>
          Read article <LhcArrowRight size={14} />
        </span>
      </div>
    </div>
  );
}

const LHC_ARTICLES = [
  { img: "/images/lhc-article-1.jpg", badge: "Maternity", meta: "6 min read", title: "How to prepare for a caesarean", excerpt: "What to expect on the day, how long recovery takes, and when to call your doctor." },
  { img: "/images/lhc-article-2.jpg", badge: "Heart health", meta: "4 min read", title: "Spotting the early signs of heart disease", excerpt: "The symptoms people miss, and the screenings worth booking." },
  { img: "/images/lhc-article-3.jpg", badge: "Recovery", meta: "5 min read", title: "Getting back on your feet after surgery", excerpt: "A practical guide to a safe, comfortable recovery once you're home." },
  { img: "/images/lhc-article-4.jpg", badge: "Specialists", meta: "3 min read", title: "When to see a specialist, and how to find one", excerpt: "A simple guide to referrals and booking the right expertise." },
  { img: "/images/lhc-article-5.jpg", badge: "Diagnostics", meta: "5 min read", title: "Understanding your test results", excerpt: "What the numbers mean, and the questions worth asking." },
  { img: "/images/lhc-article-6.jpg", badge: "Primary care", meta: "4 min read", title: "Building a relationship with your GP", excerpt: "Why continuity of care leads to better health outcomes." },
];

/* Article carousel block — matches the DS Block/Carousel: 400px cards, a peek of
   the next, and bottom controls (red/grey pagination bar + circular arrow buttons). */
function LhcArticleCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const STEP = 424; // 400 card + 24 gap

  const onScroll = () => {
    const el = trackRef.current;
    if (el) setActive(Math.round(el.scrollLeft / STEP));
  };
  const go = (dir: number) => trackRef.current?.scrollBy({ left: dir * STEP, behavior: "smooth" });

  const arrowBtn = (dir: number, label: string, Icon: ClientIcon) => (
    <button
      onClick={() => go(dir)} aria-label={label}
      style={{ width: "44px", height: "44px", borderRadius: "50%", border: "1px solid #d9d9d6", background: "#fff", display: "grid", placeItems: "center", color: LHC.navy, cursor: "pointer", transition: "border-color 0.2s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = LHC.navy; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#d9d9d6"; }}
    >
      <Icon size={18} />
    </button>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 2.6vw, 28px)", fontFamily: HN }}>
      <div>
        <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#a41417" }}>Health hub</span>
        <p style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 700, color: LHC.navy, letterSpacing: "-0.02em", margin: "10px 0 8px", lineHeight: 1.15 }}>Latest from the health hub</p>
        <p style={{ fontSize: "15px", color: LHC.slate, maxWidth: "460px" }}>Trusted, doctor-reviewed articles — the Card/Article block, eight to a row, carouselled on overflow.</p>
      </div>

      <div ref={trackRef} onScroll={onScroll} className="no-scrollbar" style={{ display: "flex", gap: "24px", overflowX: "auto", scrollSnapType: "x mandatory", padding: "2px 0 4px" }}>
        {LHC_ARTICLES.map((a, i) => (
          <div key={i} style={{ flex: "0 0 400px", maxWidth: "78vw", scrollSnapAlign: "start" }}>
            <LhcArticleCard {...a} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between" style={{ gap: "16px" }}>
        <div className="flex items-center" style={{ gap: "6px" }}>
          {LHC_ARTICLES.map((_, i) => (
            <span key={i} aria-hidden="true" style={{ height: "4px", borderRadius: "4px", width: i === active ? "26px" : "6px", background: i === active ? "#e71c20" : "#d9d9d6", transition: "width 0.3s ease, background 0.3s ease" }} />
          ))}
        </div>
        <div className="flex" style={{ gap: "10px" }}>
          {arrowBtn(-1, "Previous articles", LhcChevronLeft)}
          {arrowBtn(1, "Next articles", LhcChevronRight)}
        </div>
      </div>
    </div>
  );
}

function LhcRowsBlocks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: EASE }}
      style={{ display: "flex", flexDirection: "column", gap: "28px" }}
    >
      {/* the three axes */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]" style={{ gap: "28px", alignItems: "start" }}>
        <div>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-label)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>9 surfaces</span>
          <div className="grid grid-cols-3 sm:grid-cols-3" style={{ gap: "10px", marginTop: "14px" }}>
            {LHC_SURFACES.map((s) => (
              <div key={s.n} style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgb(var(--ink-rgb) / calc(0.1 * var(--ink-k)))" }}>
                <div style={{ height: "42px", background: s.c }} />
                <div style={{ background: "rgb(var(--ink-rgb) / calc(0.04 * var(--ink-k)))", padding: "6px 8px" }}>
                  <span style={{ fontSize: "var(--text-2xs)", color: "rgb(var(--ink-rgb) / calc(0.75 * var(--ink-k)))", fontWeight: 500 }}>{s.n}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-label)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>3 rhythms</span>
            <div style={{ display: "flex", gap: "12px", marginTop: "14px", alignItems: "flex-end" }}>
              {[{ n: "Compact", h: 34 }, { n: "Default", h: 54 }, { n: "Spacious", h: 78 }].map((r) => (
                <div key={r.n} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ height: `${r.h}px`, borderRadius: "8px", background: "rgb(var(--gold-rgb) / 0.18)", border: "1px solid rgb(var(--gold-rgb) / 0.35)" }} />
                  <span style={{ display: "block", fontSize: "var(--text-2xs)", color: "rgb(var(--ink-rgb) / calc(0.7 * var(--ink-k)))", marginTop: "6px" }}>{r.n}</span>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: "var(--text-sm)", color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--ink-strong)", fontWeight: 600 }}>9 surfaces × 2 alignments × 3 rhythms = 54 Row variants</strong>, plus a Row/Split with a heading rail. Every section on the site is one of these.
          </p>
        </div>
      </div>

      {/* A real Row, rendered as it ships — then explained as a clean spec (no wireframe tags) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgb(var(--ink-rgb) / calc(0.1 * var(--ink-k)))", boxShadow: "0 28px 70px rgb(var(--shadow-rgb) / calc(0.5 * var(--shadow-k)))" }}>
          <div style={{ background: "#f8fbfd", padding: "clamp(24px, 3.4vw, 44px)" }}>
            <LhcArticleCarousel />
          </div>
        </div>
        <span style={{ fontSize: "var(--text-xs)", color: "rgb(var(--ink-rgb) / calc(0.45 * var(--ink-k)))", letterSpacing: "0.01em" }}>
          One Row, rendered as it ships — a surface, a Block, and the Cards inside it.
        </span>
      </div>

      {/* The composition, as three tiers — a spec, not a diagram */}
      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "clamp(18px, 2.5vw, 30px)" }}>
        {[
          { n: "Row", c: "var(--gold)", d: "Owns the surface, the 12-column grid and the section rhythm. 54 variants in all." },
          { n: "Block", c: "var(--gold-light)", d: "A head plus a card grid that fills the Row — 129 blocks to choose from." },
          { n: "Card", c: "var(--teal)", d: "One unit from the library: a doctor, a hospital, a measure — anything." },
        ].map((t, i) => (
          <div key={t.n} style={{ paddingTop: "16px", borderTop: `2px solid ${t.c}` }}>
            <div className="flex items-center" style={{ gap: "9px", marginBottom: "8px" }}>
              <span style={{ fontSize: "var(--text-xs)", fontWeight: 800, color: t.c, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--ink-strong)", letterSpacing: "-0.01em" }}>{t.n}</span>
              {i < 2 && <ChevronRight size={15} style={{ color: "rgb(var(--ink-rgb) / calc(0.3 * var(--ink-k)))", marginLeft: "auto" }} />}
            </div>
            <p style={{ fontSize: "var(--text-sm)", color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))", lineHeight: 1.6 }}>{t.d}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Block library — a curated gallery of the real blocks (129 in all) ── */
const LHC_BLOCKS = [
  { src: "journey-timeline", label: "Journey timeline" },
  { src: "quality-measures", label: "Quality measures" },
  { src: "experience-scores", label: "Experience scores" },
  { src: "bento", label: "Bento" },
  { src: "scheme-checker", label: "Medical-aid scheme checker" },
  { src: "process-steps", label: "Process steps" },
  { src: "visiting-hours", label: "Visiting hours" },
  { src: "referral-pathway", label: "Referral pathway" },
  { src: "stats", label: "Stats" },
];

function LhcBlockLibrary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: EASE }}
      className="columns-1 sm:columns-2 lg:columns-3"
      style={{ columnGap: "18px" }}
    >
      {LHC_BLOCKS.map((b) => (
        <figure key={b.src} style={{ margin: "0 0 18px", breakInside: "avoid" }}>
          <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgb(var(--ink-rgb) / calc(0.1 * var(--ink-k)))", boxShadow: "0 20px 50px rgb(var(--shadow-rgb) / calc(0.42 * var(--shadow-k)))", background: "#fff" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" src={`/images/lhc-block-${b.src}.png`} alt={b.label} style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
          <figcaption style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 600, color: "rgb(var(--ink-rgb) / calc(0.65 * var(--ink-k)))", marginTop: "10px", letterSpacing: "0.01em" }}>{b.label}</figcaption>
        </figure>
      ))}
    </motion.div>
  );
}

/* ── Creative hero for the iqbusiness SharePoint case — chaos filed into clarity ── */
const IQ_TREE: { label: string; depth: number; root?: boolean }[] = [
  { label: "Home", depth: 0, root: true },
  { label: "People & HR", depth: 1 },
  { label: "Projects", depth: 1 },
  { label: "Active", depth: 2 },
  { label: "Archive", depth: 2 },
  { label: "Knowledge", depth: 1 },
];

function IqHero() {
  const reduce = useReducedMotion();
  const drift = (dur: number, delay: number) => ({
    animate: reduce ? {} : { y: [0, -9, 0] },
    transition: { duration: dur, repeat: reduce ? 0 : Infinity, ease: "easeInOut" as const, delay },
  });
  const loose: React.CSSProperties = {
    background: "rgb(var(--gold-rgb) / 0.1)", border: "1px solid rgb(var(--gold-rgb) / 0.35)",
    borderRadius: "10px", padding: "11px 15px", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
    boxShadow: "0 16px 34px rgb(var(--shadow-rgb) / calc(0.45 * var(--shadow-k)))", display: "inline-flex", alignItems: "center", gap: "9px", whiteSpace: "nowrap",
  };
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "470px", margin: "0 auto", aspectRatio: "1 / 1" }}>
      {/* clean sitemap panel — clarity */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        style={{ position: "absolute", top: "15%", left: "9%", width: "80%", zIndex: 2 }}
      >
        <motion.div {...drift(7.5, 0.2)} style={{ background: "rgb(var(--ink-rgb) / calc(0.055 * var(--ink-k)))", border: "1px solid rgb(var(--ink-rgb) / calc(0.12 * var(--ink-k)))", borderRadius: "18px", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", boxShadow: "0 34px 80px rgb(var(--shadow-rgb) / calc(0.55 * var(--shadow-k)))", padding: "24px 26px" }}>
          <span style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)" }}>Information architecture</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "13px", marginTop: "18px" }}>
            {IQ_TREE.map((n, i) => (
              <div key={i} className="flex items-center" style={{ gap: "10px", paddingLeft: `${n.depth * 22}px` }}>
                <span style={{
                  width: n.root ? "9px" : n.depth === 1 ? "7px" : "5px",
                  height: n.root ? "9px" : n.depth === 1 ? "7px" : "5px",
                  borderRadius: n.depth === 2 ? "50%" : "2px",
                  transform: n.depth === 2 ? "none" : "rotate(45deg)",
                  background: n.root ? "var(--gold)" : n.depth === 1 ? "var(--teal)" : "rgb(var(--ink-rgb) / calc(0.45 * var(--ink-k)))",
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: n.root ? "15px" : "14px", fontWeight: n.root ? 700 : 500, color: n.root ? "var(--ink)" : "rgb(var(--ink-rgb) / calc(0.78 * var(--ink-k)))" }}>{n.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* loose cards drifting in — the chaos being filed */}
      <motion.div initial={{ opacity: 0, y: -16, rotate: 12 }} animate={{ opacity: 1, y: 0, rotate: 9 }} transition={{ duration: 0.7, delay: 0.75, ease: EASE }} style={{ position: "absolute", top: "1%", right: "0%", zIndex: 3 }}>
        <motion.div {...drift(6.5, 0)} style={loose}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink)" }}>Old stuff</span>
          <ArrowRight size={13} style={{ color: "var(--gold)" }} />
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16, rotate: -12 }} animate={{ opacity: 1, y: 0, rotate: -8 }} transition={{ duration: 0.7, delay: 0.9, ease: EASE }} style={{ position: "absolute", bottom: "5%", left: "-1%", zIndex: 3 }}>
        <motion.div {...drift(7, 0.4)} style={loose}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "rgb(var(--ink-rgb) / calc(0.82 * var(--ink-k)))" }}>Misc?</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── IQ card-sorting result — scrambled cards grouped into clean categories ── */
const IQ_COLS = [
  { name: "People & HR", head: "var(--teal)", cardBg: "rgb(var(--teal-rgb) / 0.12)", cardBorder: "rgb(var(--teal-rgb) / 0.32)", items: ["Onboarding", "Leave & benefits", "Policies"] },
  { name: "Projects", head: "var(--gold)", cardBg: "rgb(var(--gold-rgb) / 0.12)", cardBorder: "rgb(var(--gold-rgb) / 0.32)", items: ["Active work", "Archive", "Templates"] },
  { name: "Knowledge", head: "#9bb3cf", cardBg: "rgba(155,179,207,0.1)", cardBorder: "rgba(155,179,207,0.3)", items: ["Guides", "Training", "FAQs"] },
];
const IQ_SCRAMBLED = ["Where does this go?", "Old links", "Misc docs", "HR forms?", "Templates?"];

function IqCardSort() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.65, ease: EASE }}
      style={{ borderRadius: "20px", border: "1px solid rgb(var(--ink-rgb) / calc(0.1 * var(--ink-k)))", background: "rgb(var(--ink-rgb) / calc(0.025 * var(--ink-k)))", padding: "clamp(22px, 3vw, 40px)", boxShadow: "0 28px 70px rgb(var(--shadow-rgb) / calc(0.45 * var(--shadow-k)))" }}
    >
      <span className="eyebrow" style={{ color: "var(--teal)" }}>Card sorting</span>
      <p style={{ fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em", margin: "10px 0 0", lineHeight: 1.2 }}>How people actually grouped the content</p>

      {/* scrambled input */}
      <div style={{ marginTop: "26px" }}>
        <span style={{ fontSize: "var(--text-2xs)", color: "rgb(var(--ink-rgb) / calc(0.4 * var(--ink-k)))", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scrambled cards</span>
        <div className="flex flex-wrap" style={{ gap: "10px", marginTop: "12px" }}>
          {IQ_SCRAMBLED.map((t, i) => (
            <span key={t} style={{ fontSize: "12.5px", color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))", background: "rgb(var(--ink-rgb) / calc(0.05 * var(--ink-k)))", border: "1px solid rgb(var(--ink-rgb) / calc(0.12 * var(--ink-k)))", borderRadius: "8px", padding: "9px 14px", transform: `rotate(${(i % 2 ? 1 : -1) * (1.5 + i * 0.4)}deg)` }}>{t}</span>
          ))}
        </div>
      </div>

      {/* divider */}
      <div className="flex items-center justify-center" style={{ gap: "8px", margin: "22px 0 20px", color: "rgb(var(--ink-rgb) / calc(0.4 * var(--ink-k)))" }}>
        <ChevronDown size={16} />
        <span style={{ fontSize: "var(--text-2xs)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Sorted into three groups</span>
      </div>

      {/* resulting groups */}
      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "16px" }}>
        {IQ_COLS.map((col) => (
          <div key={col.name} style={{ background: "rgb(var(--ink-rgb) / calc(0.03 * var(--ink-k)))", border: "1px solid rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))", borderRadius: "14px", padding: "16px" }}>
            <div className="flex items-center" style={{ gap: "9px", marginBottom: "14px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: col.head, transform: "rotate(45deg)" }} />
              <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>{col.name}</span>
            </div>
            <div className="flex flex-col" style={{ gap: "9px" }}>
              {col.items.map((it) => (
                <span key={it} style={{ fontSize: "13px", fontWeight: 500, color: "rgb(var(--ink-rgb) / calc(0.88 * var(--ink-k)))", background: col.cardBg, border: `1px solid ${col.cardBorder}`, borderRadius: "8px", padding: "10px 13px" }}>{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Creative hero for the Design System case study — layered components ── */
function LhcDSHero() {
  const reduce = useReducedMotion();
  const bob = (dur: number, delay: number) => ({
    animate: reduce ? {} : { y: [0, -9, 0] },
    transition: { duration: dur, repeat: reduce ? 0 : Infinity, ease: "easeInOut" as const, delay },
  });
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "560px", margin: "0 auto", aspectRatio: "1 / 1" }}>
      {/* glow */}
      <div aria-hidden="true" style={{ position: "absolute", inset: "-35%", background: "radial-gradient(ellipse 55% 55% at 62% 40%, rgba(37,69,107,0.36) 0%, rgba(37,69,107,0.12) 38%, rgba(37,69,107,0.03) 60%, transparent 78%), radial-gradient(ellipse 55% 55% at 30% 74%, rgba(231,28,32,0.13) 0%, rgba(231,28,32,0.04) 42%, transparent 72%)", filter: "blur(55px)", pointerEvents: "none" }} />

      {/* moving journey line — threads behind the components */}
      <HeroJourneyLine vb="0 0 100 100" z={0} strokeWidth={2}
        d="M -2 30 C 16 16 32 30 46 24 C 62 17 70 46 84 46 C 92 46 98 38 102 42"
        nodes={[[12, 24], [46, 24], [84, 46]]} />

      {/* hospital card — behind, tilted right */}
      <motion.div
        initial={{ opacity: 0, y: 34, rotate: 10 }}
        animate={{ opacity: 1, y: 0, rotate: 6 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.25 }}
        style={{ position: "absolute", right: "2%", top: "12%", width: "47%", transformOrigin: "center", filter: "drop-shadow(0 30px 50px rgb(var(--shadow-rgb) / calc(0.5 * var(--shadow-k))))" }}
      >
        <motion.div {...bob(7.5, 0.4)}>
          <LhcResultCard photo="/images/lhc-photo-hospital.jpg" name="Life Fourways Hospital" meta="Private hospital" line1="Fourways, Johannesburg" action="View hospital" distance="2.4 km" />
        </motion.div>
      </motion.div>

      {/* doctor card — front, tilted left */}
      <motion.div
        initial={{ opacity: 0, y: 34, rotate: -10 }}
        animate={{ opacity: 1, y: 0, rotate: -4 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.4 }}
        style={{ position: "absolute", left: "1%", top: "24%", width: "51%", zIndex: 2, transformOrigin: "center", filter: "drop-shadow(0 34px 60px rgb(var(--shadow-rgb) / calc(0.6 * var(--shadow-k))))" }}
      >
        <motion.div {...bob(8.5, 0)}>
          <LhcResultCard photo="/images/lhc-photo-doctor.jpg" name="Dr Olivia Bennett" meta="ENT Specialist" line1="Gauteng" action="View profile" />
        </motion.div>
      </motion.div>

      {/* palette chip — top */}
      <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
        style={{ position: "absolute", left: "8%", top: "0%", zIndex: 3 }}>
        <motion.div {...bob(6, 0.2)} style={{ display: "flex", gap: "7px", background: "#fff", padding: "10px 14px", borderRadius: "9999px", boxShadow: "0 14px 34px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))" }}>
          {["#153152", "#e71c20", "#a41417", "#f8fbfd", "#edf9f7"].map((c) => (
            <span key={c} style={{ width: "17px", height: "17px", borderRadius: "50%", background: c, border: "1px solid rgba(0,0,0,0.08)" }} />
          ))}
        </motion.div>
      </motion.div>

      {/* Aa type tile — bottom left */}
      <motion.div initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.82, ease: EASE }}
        style={{ position: "absolute", left: "-1%", bottom: "8%", zIndex: 3 }}>
        <motion.div {...bob(7, 0.5)} style={{ background: "#fff", borderRadius: "16px", padding: "14px 20px", boxShadow: "0 16px 38px rgb(var(--shadow-rgb) / calc(0.45 * var(--shadow-k)))", textAlign: "center" }}>
          <div style={{ fontFamily: HN, fontSize: "34px", fontWeight: 700, color: "#153152", lineHeight: 1, letterSpacing: "-0.02em" }}>Aa</div>
          <div style={{ fontFamily: HN, fontSize: "10px", color: "#445a75", marginTop: "4px", letterSpacing: "0.04em" }}>Helvetica Neue</div>
        </motion.div>
      </motion.div>

      {/* button pill — bottom right */}
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.92, ease: EASE }}
        style={{ position: "absolute", right: "4%", bottom: "16%", zIndex: 3 }}>
        <motion.div {...bob(6.5, 0.3)} style={{ fontFamily: HN, fontSize: "14px", fontWeight: 700, color: "var(--ink-strong)", background: "#153152", padding: "13px 22px", borderRadius: "8px", boxShadow: "0 14px 32px rgba(21,49,82,0.55)" }}>
          Find a hospital
        </motion.div>
      </motion.div>
    </div>
  );
}

/* Reusable moving journey line for hero banners (self-draw + travelling pulse) */
function HeroJourneyLine({ d, vb, nodes, z = 0, strokeWidth = 2.4 }: { d: string; vb: string; nodes: [number, number][]; z?: number; strokeWidth?: number }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox={vb} preserveAspectRatio="xMidYMid meet" aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: z, overflow: "visible", pointerEvents: "none" }}>
      <defs>
        <linearGradient id="hjl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--gold-rgb) / 0.35)" />
          <stop offset="55%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--gold-light)" />
        </linearGradient>
        <filter id="hjlGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d={d} fill="none" stroke="rgb(var(--ink-rgb) / calc(0.10 * var(--ink-k)))" strokeWidth={strokeWidth} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <motion.path d={d} fill="none" stroke="url(#hjl)" strokeWidth={strokeWidth} strokeLinecap="round" vectorEffect="non-scaling-stroke" filter="url(#hjlGlow)"
        initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduce ? 0 : 2.4, ease: EASE, delay: 0.3 }} />
      {!reduce && (
        <circle r="3.4" fill="var(--gold-light)" filter="url(#hjlGlow)">
          <animateMotion dur="5.5s" repeatCount="indefinite" path={d} rotate="auto" />
        </circle>
      )}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4.4" fill="var(--bg)" stroke="var(--gold)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          <circle cx={x} cy={y} r="1.8" fill="var(--gold)" />
        </g>
      ))}
    </svg>
  );
}

/* ── Creative hero for the Website case study — laptop + phone + journey line ── */
function LhcWebHero() {
  const reduce = useReducedMotion();
  const bob = (dur: number, delay: number) => ({
    animate: reduce ? {} : { y: [0, -9, 0] },
    transition: { duration: dur, repeat: reduce ? 0 : Infinity, ease: "easeInOut" as const, delay },
  });
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "640px", margin: "0 auto", aspectRatio: "1 / 0.92" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: "-32%", background: "radial-gradient(ellipse 55% 55% at 42% 38%, rgba(37,69,107,0.42) 0%, rgba(37,69,107,0.11) 42%, transparent 74%), radial-gradient(ellipse 48% 48% at 80% 74%, rgba(231,28,32,0.12) 0%, transparent 70%)", filter: "blur(55px)", pointerEvents: "none" }} />

      {/* moving journey line — threads the composition */}
      <HeroJourneyLine vb="0 0 100 92" z={4}
        d="M -2 70 C 16 84 30 66 46 60 C 62 54 64 30 78 22 C 86 17 95 24 102 16"
        nodes={[[12, 76], [46, 60], [78, 22]]} />

      {/* Laptop — desktop home */}
      <div style={{ position: "absolute", left: "-3%", top: "2%", width: "80%", zIndex: 1, filter: "drop-shadow(0 30px 55px rgb(var(--shadow-rgb) / calc(0.5 * var(--shadow-k))))" }}>
        <LaptopMockup src="/images/lhc-home.webp" />
      </div>

      {/* Phone — mobile home */}
      <motion.div
        initial={{ opacity: 0, y: 36, rotate: 7 }} animate={{ opacity: 1, y: 0, rotate: 4 }} transition={{ duration: 0.85, ease: EASE, delay: 0.5 }}
        style={{ position: "absolute", right: "0%", bottom: "0%", width: "27%", transformOrigin: "center", filter: "drop-shadow(0 30px 52px rgb(var(--shadow-rgb) / calc(0.6 * var(--shadow-k))))", zIndex: 5 }}
      >
        <motion.div {...bob(7.5, 0.4)}>
          <div style={{ borderRadius: "24px", overflow: "hidden", border: "5px solid #0e1726", background: "#0e1726" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" src="/images/lhc-mobile-home.jpg" alt="" style={{ display: "block", width: "100%", height: "auto", borderRadius: "19px" }} />
          </div>
        </motion.div>
      </motion.div>

      {/* 76% mobile stat chip */}
      <motion.div initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
        style={{ position: "absolute", left: "0%", bottom: "4%", zIndex: 6 }}>
        <motion.div {...bob(6, 0.2)} style={{ background: "#fff", borderRadius: "12px", padding: "12px 18px", boxShadow: "0 16px 38px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))" }}>
          <div style={{ fontFamily: HN, fontSize: "26px", fontWeight: 700, color: "#153152", lineHeight: 1, letterSpacing: "-0.02em" }}>76%</div>
          <div style={{ fontFamily: HN, fontSize: "10px", color: "#445a75", marginTop: "4px", letterSpacing: "0.03em" }}>of traffic is mobile</div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── Animated patient-journey line (self-draw + travelling pulse) ── */
const JOURNEY_D = "M40,210 C 170,150 240,120 360,120 C 480,120 560,172 680,150 C 810,126 880,96 1000,96 C 1090,96 1130,118 1180,110";
const JOURNEY_NODES = [
  { x: 40, y: 210, label: "Find a hospital or doctor" },
  { x: 360, y: 120, label: "Plan your visit" },
  { x: 680, y: 150, label: "During your stay" },
  { x: 1000, y: 96, label: "Leaving & follow-up" },
];
const J_W = 1220, J_H = 300;

function JourneyLine() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", border: "1px solid rgb(var(--ink-rgb) / calc(0.1 * var(--ink-k)))", background: "linear-gradient(135deg, #0F2340 0%, #0B0A09 70%)", boxShadow: "0 34px 90px rgb(var(--shadow-rgb) / calc(0.55 * var(--shadow-k)))", padding: "clamp(24px, 4vw, 44px)" }}
    >
      <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-label)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>The patient journey</span>
      <p style={{ fontSize: "var(--text-md)", color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))", marginTop: "8px", maxWidth: "560px", lineHeight: 1.6 }}>
        The motif that threads the redesign — recreated here as an animated SVG: the line draws itself, and a pulse travels each stage of the journey.
      </p>

      <div style={{ position: "relative", width: "100%", aspectRatio: `${J_W} / ${J_H}`, marginTop: "18px" }}>
        <svg viewBox={`0 0 ${J_W} ${J_H}`} width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
          <defs>
            <linearGradient id="jGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(var(--gold-rgb) / 0.35)" />
              <stop offset="55%" stopColor="var(--gold)" />
              <stop offset="100%" stopColor="var(--gold-light)" />
            </linearGradient>
            <filter id="jGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* faint full track */}
          <path d={JOURNEY_D} fill="none" stroke="rgb(var(--ink-rgb) / calc(0.12 * var(--ink-k)))" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          {/* self-drawing accent line */}
          <motion.path
            d={JOURNEY_D} fill="none" stroke="url(#jGrad)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke"
            initial={{ pathLength: reduce ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 2.2, ease: EASE }}
          />
          {/* travelling pulse (SMIL — follows the exact path in SVG user space) */}
          {!reduce && (
            <circle r="7" fill="var(--gold-light)" filter="url(#jGlow)">
              <animateMotion dur="5s" repeatCount="indefinite" path={JOURNEY_D} rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
            </circle>
          )}
          {/* waypoint nodes */}
          {JOURNEY_NODES.map((n) => (
            <g key={n.label}>
              <circle cx={n.x} cy={n.y} r="9" fill="var(--bg)" stroke="var(--gold)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
              <circle cx={n.x} cy={n.y} r="3.5" fill="var(--gold)" />
            </g>
          ))}
        </svg>

        {/* labels positioned over the responsive SVG */}
        {JOURNEY_NODES.map((n, i) => {
          const below = i % 2 === 1;
          return (
            <div key={n.label} style={{
              position: "absolute", left: `${(n.x / J_W) * 100}%`, top: `${(n.y / J_H) * 100}%`,
              transform: `translate(-50%, ${below ? "18px" : "calc(-100% - 18px)"})`,
              display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", width: "max-content", maxWidth: "150px", pointerEvents: "none",
            }}>
              <span style={{ fontSize: "var(--text-micro)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>{`0${i + 1}`}</span>
              <span style={{ fontSize: "var(--text-2xs)", fontWeight: 500, color: "rgb(var(--ink-rgb) / calc(0.85 * var(--ink-k)))", textAlign: "center", lineHeight: 1.3 }}>{n.label}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function TripleImage({ srcs }: { srcs: [string, string, string] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}>
        <ParallaxFrame src={srcs[0]} aspectRatio="16/7" />
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "16px" }}>
        {srcs.slice(1).map((src, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.1 }}>
            <ParallaxFrame src={src} aspectRatio="4/3" shadow="0 20px 50px rgba(0,0,0,0.4)" />
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
            <div key={i} style={{ flexShrink: 0, width: "80vw", scrollSnapAlign: "start", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid rgb(var(--ink-rgb) / calc(0.10 * var(--ink-k)))", boxShadow: "0 16px 40px rgb(var(--shadow-rgb) / calc(0.5 * var(--shadow-k)))" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
          ))}
        </div>
        <p style={{ fontSize: "var(--text-label)", color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))", textAlign: "center", marginTop: "8px", letterSpacing: "0.06em" }}>Swipe to compare →</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", placeItems: "center", maxWidth: "820px", height: "clamp(280px, 40vw, 560px)", overflow: "visible", paddingTop: "24px", paddingBottom: "24px" }}>
      {srcs.slice(0, 3).map((src, i) => (
        <motion.div
          key={i}
          initial={{ rotate: cards[i].rotate, x: cards[i].x, y: cards[i].y }}
          whileHover={{ rotate: 0, x: cards[i].x, y: -36, scale: 1.85, zIndex: 10 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{
            gridArea: "1 / 1",
            width: "min(58%, 500px)",
            zIndex: cards[i].z,
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            border: "1px solid rgb(var(--ink-rgb) / calc(0.10 * var(--ink-k)))",
            boxShadow: "0 20px 60px rgb(var(--shadow-rgb) / calc(0.6 * var(--shadow-k)))",
            cursor: "pointer",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
        </motion.div>
      ))}
    </div>
  );
}

/* Count-up badge for the winner stat */
function WinnerBadge() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-60px" }); // re-fires every time it scrolls into view
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) { setCount(0); return; } // reset when it leaves so it re-counts on return
    const duration = 1200;
    const target = 44; // 17m 4.9s → 9m 31.7s = 44.2% faster (real Useberry data)
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={ref} style={{
      background: "#22C55E",
      borderRadius: "var(--radius-pill)",
      padding: "8px 18px",
      display: "inline-flex", alignItems: "center", gap: "8px", alignSelf: "flex-start",
      boxShadow: "0 10px 26px rgba(34,197,94,0.32)",
    }}>
      <span style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 800, color: "#06210F", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        ↓ {count}%
      </span>
      <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "rgba(6,33,15,0.72)" }}>faster overall</span>
    </div>
  );
}

function ImageCaption({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "block", textAlign: "center", fontSize: "var(--text-2xs)", fontWeight: 500, letterSpacing: "0.02em", color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))", marginTop: "14px" }}>
      {children}
    </span>
  );
}

function PhoneTrio({ srcs, captions }: { srcs: string[]; captions?: string[] }) {
  // Several screens: on desktop, one pinned phone whose screen swaps as you scroll.
  if (srcs.length > 1) {
    return (
      <>
        <div className="hidden lg:block"><PinnedScreens srcs={srcs.slice(0, 3)} captions={captions} /></div>
        <div className="lg:hidden"><PhoneRow srcs={srcs} captions={captions} /></div>
      </>
    );
  }
  return <PhoneRow srcs={srcs} captions={captions} />;
}

function PhoneRow({ srcs, captions }: { srcs: string[]; captions?: string[] }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
      {srcs.slice(0, 3).map((src, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <PhoneMockup src={src} delay={0.1 + i * 0.15} showStatusBar={false} />
          {captions?.[i] && <ImageCaption>{captions[i]}</ImageCaption>}
        </div>
      ))}
    </div>
  );
}

function FeaturePanorama({ srcs, captions }: { srcs: string[]; captions?: string[] }) {
  return (
    <div style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)", display: "flex", flexDirection: "column", gap: "28px" }}>
      {srcs.map((src, i) => (
        <div key={i}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: EASE, delay: i * 0.12 }}
            style={{
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              background: "var(--bg-raised)",
              border: "1px solid rgb(var(--ink-rgb) / calc(0.07 * var(--ink-k)))",
              boxShadow: "0 24px 60px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))",
              padding: i === 0 ? "20px" : "0",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" src={src} alt="" style={{ display: "block", width: "100%", height: "auto", borderRadius: i === 0 ? "8px" : "0" }} />
          </motion.div>
          {captions?.[i] && <ImageCaption>{captions[i]}</ImageCaption>}
        </div>
      ))}
    </div>
  );
}


// Real Useberry tree-test data — high-friction tasks (>10s in the original),
// avg time-on-task, original vs redesigned IA. Sorted slowest-original first.
const TREE_TASKS: { label: string; before: number; after: number }[] = [
  { label: "Rewards & benefits", before: 134.2, after: 19.1 },
  { label: "Digital Economy", before: 101.6, after: 37.9 },
  { label: "Learning & Development", before: 96.3, after: 14.7 },
  { label: "Data Platforms", before: 57.9, after: 10.1 },
  { label: "Performance Management", before: 52.4, after: 5.7 },
  { label: "Resources for Team Leads", before: 32.0, after: 50.0 },
  { label: "Timesheets", before: 26.4, after: 52.7 },
  { label: "POPIA Compliance", before: 24.3, after: 6.7 },
  { label: "Business Analysis Toolkits", before: 22.0, after: 9.2 },
  { label: "Standard Bank", before: 20.2, after: 20.5 },
  { label: "IQ documents & templates", before: 19.1, after: 13.8 },
  { label: "IQ Formula", before: 12.9, after: 48.3 },
];

function fmtSecs(s: number) {
  return s >= 60 ? `${Math.floor(s / 60)}m ${(s % 60).toFixed(1)}s` : `${s.toFixed(1)}s`;
}

function TreeLegend({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "var(--text-xs)", color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))" }}>
      <span style={{ width: "20px", height: "6px", borderRadius: "var(--radius-pill)", background: `rgb(${color})` }} />
      {label}
    </span>
  );
}

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

function TreeTaskRow({ t, max, p, i }: { t: { label: string; before: number; after: number }; max: number; p: number; i: number }) {
  // Per-row progress with a light top-down stagger; drives bar width + count-up.
  const rp = clamp01(p * 1.32 - i * 0.03);
  const faster = t.after <= t.before;
  const pct = Math.round((1 - t.after / t.before) * 100 * rp);
  const bars = [{ v: t.before, c: "239,68,68" }, { v: t.after, c: "34,197,94" }];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(104px, 30%) 1fr auto", alignItems: "center", gap: "clamp(10px, 2vw, 18px)", padding: "11px 0", borderTop: i === 0 ? "none" : "1px solid rgb(var(--ink-rgb) / calc(0.06 * var(--ink-k)))", opacity: 0.25 + 0.75 * rp, transform: `translateY(${(1 - rp) * 8}px)` }}>
      <span style={{ fontSize: "var(--text-sm)", color: "rgb(var(--ink-rgb) / calc(0.82 * var(--ink-k)))", fontWeight: 500, lineHeight: 1.3 }}>{t.label}</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: 0 }}>
        {bars.map((b, bi) => (
          <div key={bi} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ flex: 1, height: "8px", borderRadius: "var(--radius-pill)", background: "rgb(var(--ink-rgb) / calc(0.05 * var(--ink-k)))", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(b.v / max) * 100 * rp}%`, borderRadius: "var(--radius-pill)", background: `rgb(${b.c})` }} />
            </div>
            <span style={{ width: "58px", textAlign: "right", fontSize: "var(--text-2xs)", color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{fmtSecs(b.v * rp)}</span>
          </div>
        ))}
      </div>
      <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: faster ? "#22C55E" : "#EF4444", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", opacity: rp }}>
        {faster ? `−${pct}%` : `+${Math.abs(pct)}%`}
      </span>
    </div>
  );
}

function TreeTaskChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" }); // re-fires on each scroll-in
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!inView) { setP(0); return; } // reset so it re-animates on return
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const prog = Math.min((now - start) / duration, 1);
      setP(1 - Math.pow(1 - prog, 3));
      if (prog < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const max = Math.max(...TREE_TASKS.map((t) => t.before));
  return (
    <div ref={ref} style={{ borderRadius: "var(--radius-xl)", border: "1px solid rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))", background: "var(--bg-raised)", boxShadow: "0 24px 60px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))", padding: "clamp(22px, 4vw, 32px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "12px", marginBottom: "18px" }}>
        <h3 style={{ fontSize: "var(--text-md)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>Time to find content, by task</h3>
        <div style={{ display: "flex", gap: "18px" }}>
          <TreeLegend color="239,68,68" label="Original" />
          <TreeLegend color="34,197,94" label="Redesigned" />
        </div>
      </div>
      <div>
        {TREE_TASKS.map((t, i) => <TreeTaskRow key={t.label} t={t} max={max} p={p} i={i} />)}
      </div>
      <p style={{ fontSize: "var(--text-xs)", color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))", marginTop: "18px", lineHeight: 1.65 }}>
        Average time-on-task for the high-friction items (over ~10s in the original), original vs redesigned architecture. Task success stayed at 100% across both rounds — the redesign cut the effort to get there. Tree test via Useberry · 4 then 6 participants.
      </p>
    </div>
  );
}

function AnnotatedComparison({ srcs }: { srcs: string[] }) {
  const iterations = [
    { src: srcs[0], label: "Iteration 1", time: "17m 4.9s", tag: "Slower", winner: false, rgb: "239,68,68" },   // red — slower
    { src: srcs[1], label: "Iteration 2", time: "9m 31.7s", tag: "Faster", winner: true,  rgb: "34,197,94" },   // green — faster
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Metric comparison — the iteration story at a glance (re-animates on scroll-in) */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "16px" }}>
        {iterations.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-40px" }}
            transition={{ duration: 0.55, ease: EASE, delay: i * 0.12 }}
            style={{
              borderRadius: "24px", padding: "clamp(32px, 4vw, 44px)",
              border: "1px solid rgb(var(--ink-rgb) / calc(0.10 * var(--ink-k)))",
              background: "var(--bg-raised)",
              boxShadow: "0 24px 60px rgb(var(--shadow-rgb) / calc(0.45 * var(--shadow-k)))",
              display: "flex", flexDirection: "column", gap: "22px",
            }}
          >
            <span style={{ fontSize: "var(--text-label)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))" }}>
              {it.label}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.12 + i * 0.1, ease: EASE }}
                style={{ display: "inline-block", fontSize: "clamp(44px, 7vw, 64px)", fontWeight: 800, color: `rgb(${it.rgb})`, lineHeight: 0.95, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}
              >
                {it.time}
              </motion.span>
              <span style={{ width: "44px", height: "3px", borderRadius: "var(--radius-pill)", background: `rgb(${it.rgb})` }} />
              <span style={{ fontSize: "var(--text-sm)", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))" }}>Average time to find content</span>
            </div>
            {it.winner && <WinnerBadge />}
          </motion.div>
        ))}
      </div>

      {/* Per-task breakdown — the real Useberry time-on-task data */}
      <TreeTaskChart />

      {/* Real Useberry tree-test screens — supporting evidence */}
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "16px" }}>
        {iterations.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.12 }}
          >
            <div style={{ position: "relative", aspectRatio: "16/10", borderRadius: "var(--radius-lg)", overflow: "hidden", border: `1px solid rgba(${it.rgb}, 0.3)`, background: "var(--bg-raised)", boxShadow: "0 20px 50px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src={it.src} alt={it.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
            <ImageCaption>{it.label} · Useberry tree test</ImageCaption>
          </motion.div>
        ))}
      </div>
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
          style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--bg-raised)", border: "1px solid rgb(var(--ink-rgb) / calc(0.07 * var(--ink-k)))", boxShadow: "0 24px 60px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
        </motion.div>
      ))}
    </div>
  );
}

/* Landscape on top + portrait centred below */
function LandscapePortraitStack({ srcs }: { srcs: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", position: "relative", aspectRatio: "16/9", background: "var(--bg-raised)", border: "1px solid rgb(var(--ink-rgb) / calc(0.07 * var(--ink-k)))", boxShadow: "0 24px 60px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))" }}>
        <Image src={srcs[0]} alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "320px", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid rgb(var(--ink-rgb) / calc(0.07 * var(--ink-k)))", boxShadow: "0 24px 60px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))" }}>
          <Image src={srcs[1]} alt="" width={320} height={576} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </div>
    </div>
  );
}

/* Animated metric callout for a section. tone: positive=green, negative=red, default=terracotta */
function CaseStat({ value, prefix = "", suffix = "", label, tone }: { value: number; prefix?: string; suffix?: string; label: string; tone?: "positive" | "negative" }) {
  const color = tone === "positive" ? "#22C55E" : tone === "negative" ? "#EF4444" : "var(--gold)";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" }); // counts up once, then holds
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <span style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 800, color, lineHeight: 1, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
        {prefix}{n}{suffix}
      </span>
      <span style={{ fontSize: "var(--text-xs)", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function CaseStats({ stats }: { stats: NonNullable<Section["stats"]> }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 6vw, 72px)", padding: "28px 0", borderTop: "1px solid rgb(var(--ink-rgb) / calc(0.1 * var(--ink-k)))", borderBottom: "1px solid rgb(var(--ink-rgb) / calc(0.1 * var(--ink-k)))" }}>
      {stats.map((s, i) => <CaseStat key={i} {...s} />)}
    </div>
  );
}

function SectionImages({ section }: { section: Section }) {
  const { image, imageAspect } = section;
  if (!image) return null;
  const images = Array.isArray(image) ? image : [image];
  if (imageAspect === "page")               return <PageImage src={images[0]} />;
  if (imageAspect === "laptop")             return <LaptopMockup src={images[0]} />;
  if (imageAspect === "screenshot")         return <ScreenshotImage src={images[0]} />;
  if (imageAspect === "portrait")           return <PortraitImage src={images[0]} />;
  if (imageAspect === "scattered")          return <ScatteredImages srcs={images} />;
  if (imageAspect === "landscape-portrait")    return <LandscapePortraitStack srcs={images} />;
  if (imageAspect === "screenshots")           return <StackedScreenshots srcs={images} />;
  if (imageAspect === "map")                   return <SouthernAfricaMap />;
  if (imageAspect === "annotated-comparison")  return <AnnotatedComparison srcs={images} />;
  if (imageAspect === "before-after")          return <BeforeAfter srcs={images} labels={section.compareLabels} />;
  if (imageAspect === "page-trio")             return <PageTriptych srcs={images} captions={section.captions} />;
  if (imageAspect === "laptop-trio")           return <LaptopTriptych srcs={images} captions={section.captions} offsets={section.cropOffsets} />;
  if (imageAspect === "ia-comparison")         return <IaComparison />;
  if (imageAspect === "feature-panorama")      return <FeaturePanorama srcs={images} captions={section.captions} />;
  if (imageAspect === "phone-trio")            return <PhoneTrio srcs={images} captions={section.captions} />;
  if (images.length === 1)                  return <LandscapeImage src={images[0]} />;
  if (images.length === 2)                  return <DualImage srcs={[images[0], images[1]]} />;
  return <TripleImage srcs={[images[0], images[1], images[2]]} />;
}

/* Motif variants cycle per row so a case study never repeats the same mark */
const SECTION_MOTIFS = ["orbit", "grid", "contour", "hatch", "arcs", "constellation"] as const;

/* ── Editorial row opener: big outlined index · accent rule · eyebrow ──
   The three parts stagger in as the row enters view (choreographed, not a
   single block fade). */
const OPENER_WRAP = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } } };
const OPENER_PART = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };
function SectionOpener({ index, label }: { index: number; label: string }) {
  const Icon = SECTION_ICONS[label];
  return (
    <motion.div
      variants={OPENER_WRAP}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}
    >
      <motion.span variants={OPENER_PART} style={{
        fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, lineHeight: 1,
        color: "transparent", WebkitTextStroke: "1.3px rgb(var(--teal-rgb) / 0.7)",
        fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em",
      }}>
        {String(index + 1).padStart(2, "0")}
      </motion.span>
      <motion.span variants={OPENER_PART} aria-hidden="true" style={{ width: "34px", height: "2px", borderRadius: "2px", background: "linear-gradient(90deg, var(--teal), transparent)" }} />
      <motion.span variants={OPENER_PART} className="eyebrow eyebrow-row" style={{ color: "var(--teal)" }}>
        {Icon && <Icon size={14} />}{label}
      </motion.span>
    </motion.div>
  );
}

/* ── A: Scroll-driven CaseSection ── */
function CaseSection({ section, index, onInView }: { section: Section; index: number; onInView: (i: number) => void }) {
  const ref = useRef<HTMLElement>(null);
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

  const bg = index % 2 === 0 ? "var(--bg)" : "var(--bg-alt)";
  const isSideBySide = !!section.image && (section.imageAspect === "screenshot" || section.imageAspect === "page" || section.imageAspect === "phone-trio" || section.imageAspect === "scattered");
  const orbPos = index % 2 === 0
    ? { left: "-8%", top: "10%" }
    : { right: "-8%", top: "20%" };

  return (
    <motion.section
      id={`section-${index}`}
      ref={ref}
      style={{ background: bg, paddingTop: "clamp(64px, 7vw, 140px)", paddingBottom: "clamp(64px, 7vw, 140px)", position: "relative", overflow: "clip" }}
    >
      {/* Section motif — a different mark each row, same family */}
      <Motif variant={SECTION_MOTIFS[index % SECTION_MOTIFS.length]} tone={index % 2 === 0 ? "duo" : "teal"} size={540} parallax={55} style={{ ...orbPos, opacity: 0.6 }} />

      <div className="page-container" style={{ position: "relative" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          {isSideBySide ? (
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
              {/* Copy stays pinned while a taller visual scrolls past it */}
              <div className="lg:w-[48%] shrink-0 lg:sticky lg:top-[150px]" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <SectionOpener index={index} label={section.label} />
                <RevealText style={{ fontSize: "var(--text-h2)", fontWeight: 800, color: "var(--ink-strong)", lineHeight: 1.12, letterSpacing: "-0.03em" }}>{section.heading}</RevealText>
                <Reveal variant="rise" delay={0.12}><SectionBody section={section} /></Reveal>
              </div>
              <Reveal variant="wipe" delay={0.1} className="lg:flex-1 mt-10 lg:mt-0">
                <SectionImages section={section} />
              </Reveal>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "52px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "820px" }}>
                <SectionOpener index={index} label={section.label} />
                <RevealText style={{ fontSize: "var(--text-h2)", fontWeight: 800, color: "var(--ink-strong)", lineHeight: 1.12, letterSpacing: "-0.03em" }}>{section.heading}</RevealText>
                <Reveal variant="rise" delay={0.12}><SectionBody section={section} /></Reveal>
              </div>
              {section.showcase && (
                <Reveal variant="rise">
                  {section.showcase === "design-system" && <DesignSystemShowcase />}
                  {section.showcase === "lhc-journey" && <JourneyLine />}
                  {section.showcase === "lhc-components" && <LhcComponents />}
                  {section.showcase === "lhc-blocks" && <LhcBlockLibrary />}
                  {section.showcase === "lhc-rows" && <LhcRowsBlocks />}
                  {section.showcase === "lhc-before-after" && <LhcBeforeAfter />}
                  {section.showcase === "iq-cardsort" && <IqCardSort />}
                </Reveal>
              )}
              {section.image && <Reveal variant="wipe"><SectionImages section={section} /></Reveal>}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

/* ── Single learning as an editorial row on a connecting thread ── */
function LearningRow({ learning, index, featured }: { learning: string; index: number; featured: boolean }) {
  const [hovered, setHovered] = useState(false);
  const words = learning.split(" ");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", display: "flex", gap: "clamp(16px, 2.5vw, 32px)", alignItems: "flex-start", cursor: "default" }}
    >
      {/* Outlined numeral (block-level dark mask hides the thread behind it) */}
      <div style={{
        width: "clamp(46px, 7vw, 72px)", flexShrink: 0,
        display: "flex", justifyContent: "center", alignItems: "center",
        position: "relative", zIndex: 1,
        background: "var(--bg)", paddingTop: "8px", paddingBottom: "8px",
      }}>
        <span style={{
          fontSize: "clamp(34px, 5.5vw, 64px)", fontWeight: 800, lineHeight: 0.9,
          color: hovered ? "var(--gold)" : "transparent",
          WebkitTextFillColor: hovered ? "var(--gold)" : "transparent",
          WebkitTextStroke: `1.5px ${hovered ? "var(--gold)" : "rgb(var(--gold-rgb) / 0.55)"}`,
          fontVariantNumeric: "tabular-nums", letterSpacing: "-0.04em",
          transition: "color 0.3s, -webkit-text-fill-color 0.3s",
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      {/* Statement — serif italic, revealed word by word */}
      <p style={{
        margin: 0, paddingTop: featured ? "6px" : "12px",
        fontFamily: "var(--font-serif), Georgia, 'Times New Roman', serif", fontStyle: "italic",
        fontSize: featured ? "clamp(26px, 3.8vw, 44px)" : "clamp(19px, 2.3vw, 26px)",
        fontWeight: featured ? 500 : 400,
        color: "rgb(var(--ink-rgb) / calc(0.9 * var(--ink-k)))", lineHeight: 1.4, letterSpacing: "-0.01em",
      }}>
        {words.map((w, wi) => (
          <motion.span
            key={wi}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: Math.min(wi * 0.03, 0.7), ease: EASE }}
            style={{ display: "inline-block", marginRight: "0.26em" }}
          >
            {w}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
}

/* ── Learnings with scroll animation ── */
function LearningsSection({ learnings, onInView, navIndex }: { learnings: string[]; onInView: (i: number) => void; navIndex: number }) {
  const ref = useRef<HTMLElement>(null);
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
    <motion.section id="section-learnings" ref={ref} style={{ background: "var(--bg)", paddingTop: "clamp(64px, 7vw, 140px)", paddingBottom: "clamp(64px, 7vw, 140px)", position: "relative", overflow: "hidden" }}>
      <Motif variant="arcs" tone="teal" size={620} style={{ top: "-6%", right: "-10%", opacity: 0.6 }} />
      <div className="page-container" style={{ position: "relative" }}>
        <div>
          <Reveal variant="fade"><p className="eyebrow" style={{ color: "var(--teal)", marginBottom: "16px" }}>Key Learnings</p></Reveal>
          <RevealText style={{ fontSize: "var(--text-h2)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "64px" }}>
            What this project taught me
          </RevealText>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "clamp(28px, 4vw, 44px)" }}>
            {/* Connecting thread */}
            <div aria-hidden="true" style={{ position: "absolute", left: "clamp(23px, 3.5vw, 36px)", top: "24px", bottom: "24px", width: "2px", background: "linear-gradient(to bottom, var(--gold), rgb(var(--gold-rgb) / 0.12))", zIndex: 0 }} />
            {learnings.map((learning, i) => (
              <LearningRow key={i} learning={learning} index={i} featured={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

const COMPANY_LOGO: Record<string, { src: string; bg: string; h: number }> = {
  "African Bank":           { src: "/images/African Bank logo black.png",    bg: "#F5F1EC", h: 18 },
  "iqbusiness":            { src: "/images/iqbusiness logo (FC) black.png", bg: "#F5F1EC", h: 20 },
  "Life Healthcare":        { src: "/images/lhc-logo-navy.svg",              bg: "#F5F1EC", h: 24 },
  "Nedbank":                { src: "/images/Nedbank Logo.png",               bg: "#005944", h: 30 },
  "Nedbank Africa Regions": { src: "/images/Nedbank Logo.png",               bg: "#005944", h: 30 },
};

/* ── More case studies card ── */
function MoreCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const { handlers, overlay } = useSpotlight({ radius: 320, color: "rgb(var(--gold-rgb) / 0.09)" });
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={getHref(cs.slug)} data-cursor-label="View" style={{ display: "block", textDecoration: "none", height: "100%" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 }}
        style={{ height: "100%" }}
      >
        <Tilt fill max={8} sheen={false}>
          <div
            {...handlers}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              position: "relative", overflow: "hidden",
              background: "rgb(var(--ink-rgb) / calc(0.04 * var(--ink-k)))",
              border: `1px solid ${hovered ? "rgb(var(--gold-rgb) / 0.4)" : "rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))"}`,
              borderRadius: "var(--radius-xl)", padding: "26px", height: "100%", cursor: "pointer",
              boxShadow: hovered ? "0 20px 50px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))" : "none",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
          >
            {overlay}
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "8px", height: "100%" }}>
              <span style={{ fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--ink-strong)", letterSpacing: "-0.02em", lineHeight: 1.25 }}>{cs.title}</span>
              <span style={{ fontSize: "var(--text-xs)", color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{cs.subtitle}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--gold)", marginTop: "auto", paddingTop: "20px" }}>
                View case study
                <span className="transition-transform duration-200" style={{ display: "inline-flex", transform: hovered ? "translateX(3px)" : "translateX(0)" }}>
                  <ArrowUpRight size={14} />
                </span>
              </span>
            </div>
          </div>
        </Tilt>
      </motion.div>
    </Link>
  );
}

/* ── F: More case studies, grouped by client ── */
const GROUP_ORDER = ["Life Healthcare", "African Bank", "iqbusiness", "Nedbank"];
function companyGroup(company: string): string {
  return company === "Nedbank Africa Regions" ? "Nedbank" : company;
}

function MoreCaseStudies({ currentSlug }: { currentSlug: string }) {
  const others = caseStudies.filter(cs => cs.slug !== currentSlug);
  // Group by client (Africa Regions rolls up into Nedbank)
  const byCompany: Record<string, CaseStudy[]> = {};
  for (const cs of others) {
    const key = companyGroup(cs.company);
    (byCompany[key] ||= []).push(cs);
  }
  const order = [
    ...GROUP_ORDER.filter(c => byCompany[c]),
    ...Object.keys(byCompany).filter(c => !GROUP_ORDER.includes(c)),
  ];

  return (
    <section style={{ background: "var(--bg-alt)", paddingTop: "80px", paddingBottom: "80px", borderTop: "1px solid rgb(var(--ink-rgb) / calc(0.06 * var(--ink-k)))" }}>
      <div className="page-container">
        <p className="eyebrow" style={{ color: "var(--teal)", marginBottom: "40px" }}>More case studies</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {order.map((company) => {
            const logo = COMPANY_LOGO[company];
            return (
              <div key={company}>
                {/* Client header */}
                <div className="flex items-center" style={{ gap: "12px", marginBottom: "20px" }}>
                  {logo && (
                    <div style={{ background: logo.bg, borderRadius: "9px", padding: "7px 12px", display: "grid", placeItems: "center", border: "1px solid rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img loading="lazy" decoding="async" src={logo.src} alt={company} style={{ height: `${logo.h}px`, width: "auto", maxWidth: "130px", objectFit: "contain", display: "block" }} />
                    </div>
                  )}
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))", letterSpacing: "-0.01em" }}>{company}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {byCompany[company].map((cs, i) => (
                    <MoreCard key={cs.slug} cs={cs} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Main component ── */
export default function CaseStudyClient({ study }: { study: CaseStudy }) {
  // Section tracking now lives in <CaseProgress>; sections still report in for future hooks.
  const handleInView = useCallback((_i: number) => {}, []);
  // Arriving by client navigation: the hero visual is the landing spot of the
  // shared-element morph, so it must already be in place (no entrance).
  const [arrived] = useState(() => !isFirstLoad());
  const morph = morphStyle(study.slug);

  const navItems = useMemo(() => [
    ...study.sections.map((s, i) => ({ label: s.label, id: `section-${i}` })),
    { label: "Learnings", id: "section-learnings" },
  ], [study.sections]);

  // Glue the last two words into one non-breaking unit so the final word never orphans.
  const titleParts = study.title.split(" ");
  const words = titleParts.length > 2
    ? [...titleParts.slice(0, -2), titleParts.slice(-2).join(" ")]
    : titleParts;

  return (
    <main id="main-content" tabIndex={-1}>
      <FloatingNav />

      <div className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="case-hero relative overflow-hidden flex flex-col justify-center" style={{ background: "var(--bg)" }}>
          {/* Drifting dot grid */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none" style={{
            backgroundImage: "radial-gradient(circle, rgb(var(--ink-rgb) / calc(0.9 * var(--ink-k))) 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px", opacity: 0.05, animation: "grid-drift 16s linear infinite",
          }} />
          {/* Signature motif */}
          <Motif variant="orbit" tone="duo" size={780} style={{ top: "-28%", right: "-8%" }} />
          <div className="absolute inset-0 noise-texture opacity-[0.02] pointer-events-none" />

          <div className="page-container relative">
            <div className={`flex flex-col ${(study.heroImage || study.heroShowcase) ? "lg:flex-row lg:items-center lg:gap-16" : ""}`}>
              <div className={(study.heroImage || study.heroShowcase) ? "lg:w-[55%]" : ""}>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="eyebrow"
                  style={{ color: "var(--teal)", marginBottom: "20px" }}
                >
                  {study.company}
                </motion.p>

                {/* Word-by-word title */}
                <h1 style={{ fontSize: "var(--text-h1)", fontWeight: 800, color: "var(--ink)", lineHeight: 1.08, letterSpacing: "-0.04em" }}>
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
                  style={{ marginTop: "24px", fontSize: "var(--text-lg)", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", lineHeight: 1.65, maxWidth: "540px" }}
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
                    <span key={tool} style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "var(--text-2xs)", fontWeight: 500, color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", border: "1px solid rgb(var(--ink-rgb) / calc(0.15 * var(--ink-k)))", borderRadius: "var(--radius-pill)", padding: "6px 14px" }}>
                      <span aria-hidden="true" style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgb(var(--teal-rgb) / 0.8)", flexShrink: 0 }} />
                      {tool}
                    </span>
                  ))}
                </motion.div>

                {study.disclaimer && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
                    style={{ marginTop: "24px", display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "var(--text-2xs)", color: "rgb(var(--ink-rgb) / calc(0.4 * var(--ink-k)))", lineHeight: 1.6, maxWidth: "540px" }}
                  >
                    <Info size={14} style={{ color: "var(--teal)", flexShrink: 0, marginTop: "2px" }} />
                    <span>{study.disclaimer}</span>
                  </motion.p>
                )}
              </div>

              {study.heroShowcase === "lhc-ds" ? (
                <div className="lg:w-[45%] mt-16 lg:mt-0 flex justify-center w-full">
                  <LhcDSHero />
                </div>
              ) : study.heroShowcase === "lhc-web" ? (
                <div className="lg:w-[45%] mt-16 lg:mt-0 flex justify-center w-full">
                  <LhcWebHero />
                </div>
              ) : study.heroShowcase === "iq-ia" ? (
                <div className="lg:w-[42%] mt-16 lg:mt-0 flex justify-center w-full">
                  <IqHero />
                </div>
              ) : study.heroImage && (
                <div className="lg:w-[45%] mt-12 lg:mt-0 flex justify-center">
                  {study.heroImageStyle === "phone" ? (
                    <div style={morph}><PhoneMockup src={study.heroImage} instant={arrived} /></div>
                  ) : (
                    <motion.div
                      initial={arrived ? false : { opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
                      style={{ width: "100%" }}
                    >
                      <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))", boxShadow: "0 32px 80px rgb(var(--shadow-rgb) / calc(0.5 * var(--shadow-k)))", ...morph }}>
                        <Image src={study.heroImage} alt="" fill placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" sizes="(max-width: 1024px) 90vw, 45vw" style={{ objectFit: "cover", objectPosition: "top left" }} />
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1, ease: EASE }}
            className="absolute left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
            style={{ bottom: "32px" }}
          >
            <span style={{ fontSize: "var(--text-micro)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))" }}>Read the story</span>
            <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 7l6 6 6-6" stroke="rgb(var(--ink-rgb) / calc(0.3 * var(--ink-k)))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        <CaseProgress items={navItems} />

        {study.sections.map((section, i) => (
          <CaseSection key={i} section={section} index={i} onInView={handleInView} />
        ))}

        <div className="divider-gold" />
        <LearningsSection learnings={study.learnings} onInView={handleInView} navIndex={study.sections.length} />
        <MoreCaseStudies currentSlug={study.slug} />
        <div className="divider-gold" />
        <ContactFooter />
      </div>
    </main>
  );
}
