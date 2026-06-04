"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Target, Layers, Zap, TrendingUp, RefreshCw, AlertCircle, Lightbulb, Compass, CheckCircle, Hammer, BarChart2, PenTool, ArrowUpRight, User, Building2, CreditCard, BadgeCheck, BookOpen, type LucideIcon } from "lucide-react";
import FloatingNav from "@/components/FloatingNav";
import SouthernAfricaMap from "@/components/SouthernAfricaMap";
import PhoneMockup from "@/components/PhoneMockup";
import LaptopMockup from "@/components/LaptopMockup";
import ContactFooter from "@/components/ContactFooter";
import { useSpotlight } from "@/components/useSpotlight";
import type { CaseStudy, Section } from "../data";
import { caseStudies } from "../data";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function SectionBody({ section }: { section: Section }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {section.body.map((para, i) => (
        <p key={i} style={{ fontSize: "var(--text-body)", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>{para}</p>
      ))}
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
              style={{ position: "relative", display: "flex", flexDirection: "column", gap: "16px", background: "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "var(--radius-xl)", padding: "26px", overflow: "hidden" }}
            >
              <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgb(var(--gold-rgb) / 0.6), transparent)" }} />
              <span style={{ width: "46px", height: "46px", borderRadius: "var(--radius-md)", background: "linear-gradient(150deg, rgb(var(--gold-rgb) / 0.28), rgb(var(--gold-rgb) / 0.07))", border: "1px solid rgb(var(--gold-rgb) / 0.3)", display: "grid", placeItems: "center" }}>
                <CheckCircle size={22} color="var(--gold)" strokeWidth={2} />
              </span>
              <span style={{ fontSize: "var(--text-md)", color: "rgba(255,255,255,0.82)", lineHeight: 1.55, fontWeight: 500 }}>{bullet}</span>
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
              style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "var(--text-body)", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}
            >
              <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: "4px", fontSize: "var(--text-2xs)" }}>→</span>
              {bullet}
            </motion.li>
          ))}
        </ul>
      )}
      {section.footnote && (
        <p style={{ fontSize: "var(--text-body)", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>{section.footnote}</p>
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
  "Impact":         BarChart2,
};

function getHref(slug: string): string {
  if (slug === "african-bank-website-redesign") return "/projects/african-bank/website-redesign";
  if (slug === "african-bank-onboarding") return "/projects/african-bank/onboarding";
  return `/projects/${slug}`;
}

/* ── Sticky horizontal process stepper ── */
function ProcessStepper({ items, activeIndex }: { items: { label: string; id: string }[]; activeIndex: number }) {
  return (
    <div className="hidden md:block" style={{ position: "sticky", top: "84px", zIndex: 30 }}>
      <div className="page-container">
        <div style={{
          display: "flex", alignItems: "center", gap: "2px",
          background: "rgba(11,10,9,0.82)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: "var(--radius-pill)",
          padding: "7px 8px", boxShadow: "0 10px 36px rgba(0,0,0,0.4)",
        }}>
          {items.map((item, i) => {
            const active = i === activeIndex;
            const done = i < activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                className="group"
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "8px 10px", borderRadius: "var(--radius-pill)",
                  background: active ? "rgb(var(--gold-rgb) / 0.15)" : "transparent",
                  transition: "background 0.3s",
                }}
              >
                <span style={{
                  width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                  display: "grid", placeItems: "center", fontSize: "var(--text-micro)", fontWeight: 700,
                  background: active || done ? "var(--gold)" : "rgba(255,255,255,0.1)",
                  color: active || done ? "white" : "rgba(255,255,255,0.5)",
                  transition: "background 0.3s, color 0.3s",
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: "var(--text-2xs)", fontWeight: 500, color: active ? "#fff" : "rgba(255,255,255,0.45)", whiteSpace: "nowrap", transition: "color 0.3s" }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Image components ── */

function LandscapeImage({ src }: { src: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  return (
    <div ref={ref} style={{ width: "100%", borderRadius: "var(--radius-xl)", overflow: "hidden", position: "relative", background: "#17130E", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 32px 80px rgba(0,0,0,0.45)" }}>
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
    <div ref={ref} style={{ position: "relative", overflow: "hidden", aspectRatio, borderRadius: radius, background: "#17130E", border: "1px solid rgba(255,255,255,0.07)", boxShadow: shadow }}>
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
      <div style={{ position: "relative", width: "min(300px, 100%)", borderRadius: "var(--radius-2xl)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 40px 100px rgba(0,0,0,0.6)", zIndex: 1 }}>
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
    <div style={{ width: "100%", height: hasOverflow ? "clamp(320px, 50vw, 560px)" : "auto", borderRadius: "var(--radius-xl)", overflow: "hidden", background: "#17130E", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 32px 80px rgba(0,0,0,0.45)", position: "relative" }}>
      <div ref={scrollRef} style={{ width: "100%", height: "100%", overflowY: hasOverflow ? "scroll" : "visible", scrollbarWidth: "thin", scrollbarColor: "rgb(var(--gold-rgb) / 0.6) rgba(255,255,255,0.06)" }}>
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
                background: "rgb(var(--gold-rgb) / 0.85)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)",
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
    <div style={{ borderRadius: "var(--radius-xl)", background: "#17130E", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)", padding: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" style={{ display: "block", maxWidth: "100%", height: "auto", borderRadius: "var(--radius-sm)" }} />
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
  const icons = [User, Building2, BadgeCheck, CreditCard, BookOpen];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ borderRadius: "var(--radius-2xl)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 34px 90px rgba(0,0,0,0.55)" }}
    >
      {/* Header — African Bank's navy/blue gradient */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "16px clamp(24px, 4vw, 36px)", background: "linear-gradient(135deg, #004AA4 0%, #012046 100%)" }}>
        <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: AB.green }} />
        <span style={{ fontFamily: AB.font, fontSize: "15px", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>Design System</span>
        <span style={{ fontFamily: AB.font, fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>· African Bank component library</span>
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
                <span style={{ fontFamily: AB.font, fontSize: "13px", fontWeight: 600, color: "#fff", background: AB.green, padding: "10px 20px", borderRadius: "999px" }}>Confirm</span>
                <span style={{ fontFamily: AB.font, fontSize: "13px", fontWeight: 600, color: "#fff", background: AB.navy, padding: "10px 20px", borderRadius: "999px" }}>Apply now</span>
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
            <div key={i} style={{ flexShrink: 0, width: "80vw", scrollSnapAlign: "start", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
          ))}
        </div>
        <p style={{ fontSize: "var(--text-label)", color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: "8px", letterSpacing: "0.06em" }}>Swipe to compare →</p>
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
  const inView = useInView(ref, { margin: "-60px" }); // re-fires every time it scrolls into view
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) { setCount(0); return; } // reset when it leaves so it re-counts on return
    const duration = 1200;
    const target = 45;
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
      background: "rgba(34,197,94,0.12)",
      border: "1px solid rgba(34,197,94,0.35)",
      borderRadius: "var(--radius-pill)",
      padding: "6px 18px",
      display: "inline-flex", alignItems: "center", gap: "8px",
    }}>
      <span style={{ fontSize: "clamp(18px, 4vw, 24px)", fontWeight: 800, color: "#22C55E", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        ↓ {count}%
      </span>
      <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>faster overall</span>
    </div>
  );
}

function ImageCaption({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "block", textAlign: "center", fontSize: "var(--text-2xs)", fontWeight: 500, letterSpacing: "0.02em", color: "rgba(255,255,255,0.42)", marginTop: "14px" }}>
      {children}
    </span>
  );
}

function PhoneTrio({ srcs, captions }: { srcs: string[]; captions?: string[] }) {
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
              background: "#17130E",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
              padding: i === 0 ? "20px" : "0",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" style={{ display: "block", width: "100%", height: "auto", borderRadius: i === 0 ? "8px" : "0" }} />
          </motion.div>
          {captions?.[i] && <ImageCaption>{captions[i]}</ImageCaption>}
        </div>
      ))}
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
              position: "relative", borderRadius: "var(--radius-xl)", padding: "26px",
              border: `1px solid rgba(${it.rgb}, 0.4)`,
              background: `linear-gradient(160deg, rgba(${it.rgb}, 0.12) 0%, rgba(255,255,255,0.02) 100%)`,
              display: "flex", flexDirection: "column", gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "var(--text-label)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 12px", borderRadius: "var(--radius-pill)", background: `rgb(${it.rgb})`, color: "#fff" }}>
                {it.label}
              </span>
              <span style={{ fontSize: "var(--text-2xs)", fontWeight: 700, color: `rgb(${it.rgb})` }}>
                {it.winner ? "↓ " : "↑ "}{it.tag}
              </span>
            </div>
            <div>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: EASE }}
                style={{ display: "inline-block", fontSize: "clamp(34px, 5vw, 50px)", fontWeight: 800, color: `rgb(${it.rgb})`, letterSpacing: "-0.03em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
              >
                {it.time}
              </motion.span>
              <span style={{ display: "block", fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.45)", marginTop: "8px" }}>Average time to find content</span>
            </div>
            {it.winner && <WinnerBadge />}
          </motion.div>
        ))}
      </div>

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
            <div style={{ position: "relative", aspectRatio: "16/10", borderRadius: "var(--radius-lg)", overflow: "hidden", border: `1px solid rgba(${it.rgb}, 0.3)`, background: "#17130E", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.src} alt={it.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
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
          style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", background: "#17130E", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}
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
      <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", position: "relative", aspectRatio: "16/9", background: "#17130E", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
        <Image src={srcs[0]} alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "320px", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
          <Image src={srcs[1]} alt="" width={320} height={576} style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </div>
    </div>
  );
}

/* Animated metric callout for a section */
function CaseStat({ value, prefix = "", suffix = "", label }: { value: number; prefix?: string; suffix?: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
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
      <span style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 800, color: "var(--gold)", lineHeight: 1, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
        {prefix}{n}{suffix}
      </span>
      <span style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function CaseStats({ stats }: { stats: NonNullable<Section["stats"]> }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 6vw, 72px)", padding: "28px 0", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
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
  if (imageAspect === "feature-panorama")      return <FeaturePanorama srcs={images} captions={section.captions} />;
  if (imageAspect === "phone-trio")            return <PhoneTrio srcs={images} captions={section.captions} />;
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

  const bg = index % 2 === 0 ? "#0B0A09" : "#110E0B";
  const isSideBySide = !!section.image && (section.imageAspect === "screenshot" || section.imageAspect === "page" || section.imageAspect === "phone-trio" || section.imageAspect === "scattered");
  const orbPos = index % 2 === 0
    ? { left: "-8%", top: "10%" }
    : { right: "-8%", top: "20%" };

  return (
    <motion.section
      id={`section-${index}`}
      ref={ref}
      style={{ background: bg, paddingTop: "clamp(64px, 7vw, 140px)", paddingBottom: "clamp(64px, 7vw, 140px)", position: "relative", overflow: "hidden" }}
    >
      {/* E: Ambient orb */}
      <div aria-hidden="true" style={{
        position: "absolute", ...orbPos,
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.10) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="page-container" style={{ position: "relative" }}>
        <motion.div style={{ opacity, y, filter: blur, scale, position: "relative", zIndex: 1 }}>
          {isSideBySide ? (
            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
              <div className="lg:w-[48%] shrink-0" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {(() => { const Icon = SECTION_ICONS[section.label]; return (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "var(--text-label)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--gold)" }}>
                    {Icon && <Icon size={12} />}{section.label}
                  </span>
                ); })()}
                <h2 style={{ fontSize: "var(--text-h3)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.25, letterSpacing: "-0.02em" }}>{section.heading}</h2>
                <SectionBody section={section} />
                {section.stats && <CaseStats stats={section.stats} />}
              </div>
              <div className="lg:flex-1 mt-10 lg:mt-0">
                <SectionImages section={section} />
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "52px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px" }}>
                {(() => { const Icon = SECTION_ICONS[section.label]; return (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "var(--text-label)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--gold)" }}>
                    {Icon && <Icon size={12} />}{section.label}
                  </span>
                ); })()}
                <h2 style={{ fontSize: "var(--text-h3)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.25, letterSpacing: "-0.02em" }}>{section.heading}</h2>
                <SectionBody section={section} />
                {section.stats && <CaseStats stats={section.stats} />}
              </div>
              {section.showcase === "design-system" && <DesignSystemShowcase />}
              {section.image && <SectionImages section={section} />}
            </div>
          )}
        </motion.div>
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
        background: "#0B0A09", paddingTop: "8px", paddingBottom: "8px",
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
        fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic",
        fontSize: featured ? "clamp(24px, 3.6vw, 40px)" : "clamp(18px, 2.2vw, 24px)",
        fontWeight: featured ? 500 : 400,
        color: "rgba(255,255,255,0.9)", lineHeight: 1.4, letterSpacing: "-0.01em",
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
    <motion.section id="section-learnings" ref={ref} style={{ background: "#0B0A09", paddingTop: "clamp(64px, 7vw, 140px)", paddingBottom: "clamp(64px, 7vw, 140px)", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: "0%", right: "-10%",
        width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.13) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div className="page-container" style={{ position: "relative" }}>
        <motion.div style={{ opacity, y, filter: blur }}>
          <p style={{ fontSize: "var(--text-label)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold)", marginBottom: "16px" }}>Key Learnings</p>
          <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 800, color: "#F5F1EC", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "64px" }}>
            What this project taught me
          </h2>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "clamp(28px, 4vw, 44px)" }}>
            {/* Connecting thread */}
            <div aria-hidden="true" style={{ position: "absolute", left: "clamp(23px, 3.5vw, 36px)", top: "24px", bottom: "24px", width: "2px", background: "linear-gradient(to bottom, var(--gold), rgb(var(--gold-rgb) / 0.12))", zIndex: 0 }} />
            {learnings.map((learning, i) => (
              <LearningRow key={i} learning={learning} index={i} featured={i === 0} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

const COMPANY_LOGO: Record<string, { src: string; bg: string; h: number }> = {
  "African Bank":           { src: "/images/African Bank logo black.png",    bg: "#F5F1EC", h: 18 },
  "IQ Business":            { src: "/images/iqbusiness logo (FC) black.png", bg: "#F5F1EC", h: 20 },
  "Nedbank":                { src: "/images/Nedbank Logo.png",               bg: "#005944", h: 30 },
  "Nedbank Africa Regions": { src: "/images/Nedbank Logo.png",               bg: "#005944", h: 30 },
};

/* ── More case studies card ── */
function MoreCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const { handlers, overlay } = useSpotlight({ radius: 320, color: "rgb(var(--gold-rgb) / 0.09)" });
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={getHref(cs.slug)} style={{ display: "block", textDecoration: "none", height: "100%" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 }}
        {...handlers}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative", overflow: "hidden",
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${hovered ? "rgb(var(--gold-rgb) / 0.4)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "var(--radius-xl)", padding: "26px", height: "100%", cursor: "pointer",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.4)" : "none",
          transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {overlay}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "8px", height: "100%" }}>
          <span style={{ fontSize: "var(--text-lg)", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.25 }}>{cs.title}</span>
          <span style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{cs.subtitle}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--gold)", marginTop: "auto", paddingTop: "20px" }}>
            View case study
            <span className="transition-transform duration-200" style={{ display: "inline-flex", transform: hovered ? "translateX(3px)" : "translateX(0)" }}>
              <ArrowUpRight size={14} />
            </span>
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

/* ── F: More case studies, grouped by client ── */
const GROUP_ORDER = ["African Bank", "IQ Business", "Nedbank"];
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
    <section style={{ background: "#110E0B", paddingTop: "80px", paddingBottom: "80px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="page-container">
        <p style={{ fontSize: "var(--text-label)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: "40px" }}>More case studies</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {order.map((company) => {
            const logo = COMPANY_LOGO[company];
            return (
              <div key={company}>
                {/* Client header */}
                <div className="flex items-center" style={{ gap: "12px", marginBottom: "20px" }}>
                  {logo && (
                    <div style={{ background: logo.bg, borderRadius: "9px", padding: "7px 12px", display: "grid", placeItems: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={logo.src} alt={company} style={{ height: `${logo.h}px`, width: "auto", maxWidth: "130px", objectFit: "contain", display: "block" }} />
                    </div>
                  )}
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "-0.01em" }}>{company}</span>
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

      <div className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="case-hero relative overflow-hidden flex flex-col justify-center" style={{ background: "#0B0A09" }}>
          {/* Drifting dot grid */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px", opacity: 0.05, animation: "grid-drift 16s linear infinite",
          }} />
          {/* Breathing orb */}
          <motion.div
            className="absolute pointer-events-none select-none" aria-hidden="true"
            animate={{ opacity: [0.7, 1, 0.7], scale: [0.92, 1.05, 0.92] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              top: "-20%", right: "-8%",
              width: "700px", height: "700px", borderRadius: "50%",
              background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.18) 0%, transparent 65%)",
            }}
          />
          <div className="absolute inset-0 noise-texture opacity-[0.02] pointer-events-none" />

          <div className="page-container relative">
            <div className={`flex flex-col ${study.heroImage ? "lg:flex-row lg:items-center lg:gap-16" : ""}`}>
              <div className={study.heroImage ? "lg:w-[55%]" : ""}>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ fontSize: "var(--text-label)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}
                >
                  {study.company}
                </motion.p>

                {/* Word-by-word title */}
                <h1 style={{ fontSize: "var(--text-h1)", fontWeight: 800, color: "#F5F1EC", lineHeight: 1.08, letterSpacing: "-0.04em" }}>
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
                  style={{ marginTop: "24px", fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: "540px" }}
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
                    <span key={tool} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "var(--text-2xs)", fontWeight: 500, color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "var(--radius-pill)", padding: "6px 14px" }}>
                      <PenTool size={10} />
                      {tool}
                    </span>
                  ))}
                </motion.div>
              </div>

              {study.heroImage && (
                <div className="lg:w-[45%] mt-12 lg:mt-0 flex justify-center">
                  {study.heroImageStyle === "phone" ? (
                    <PhoneMockup src={study.heroImage} />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
                      style={{ width: "100%" }}
                    >
                      <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
                        <Image src={study.heroImage} alt="" fill style={{ objectFit: "cover", objectPosition: "top left" }} />
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
            <span style={{ fontSize: "var(--text-micro)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Read the story</span>
            <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 7l6 6 6-6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        <ProcessStepper items={navItems} activeIndex={activeSection} />

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
