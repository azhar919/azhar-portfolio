"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Target, Layers, Zap, TrendingUp, RefreshCw, AlertCircle, Lightbulb, Compass, CheckCircle, Hammer, BarChart2, PenTool, type LucideIcon } from "lucide-react";
import FloatingNav from "@/components/FloatingNav";
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
      <div style={{ position: "relative", width: "300px", borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 40px 100px rgba(0,0,0,0.6)", zIndex: 1 }}>
        <Image src={src} alt="" width={300} height={600} style={{ width: "100%", height: "auto", display: "block" }} />
      </div>
    </div>
  );
}

function PageImage({ src }: { src: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => setHasOverflow(el.scrollHeight > el.clientHeight + 4);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{ width: "100%", height: hasOverflow ? "560px" : "auto", borderRadius: "16px", overflow: "hidden", background: "#141414", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 32px 80px rgba(0,0,0,0.45)", position: "relative" }}>
      <div ref={scrollRef} style={{ width: "100%", height: "100%", overflowY: hasOverflow ? "scroll" : "visible", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.15) transparent" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" style={{ display: "block", width: "100%", height: "auto" }} />
      </div>
      {hasOverflow && (
        <>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top, rgba(20,20,20,0.95), transparent)", pointerEvents: "none", borderRadius: "0 0 16px 16px" }} />
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)",
              display: "flex", alignItems: "center", gap: "6px",
              background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "9999px", padding: "7px 14px",
              pointerEvents: "none",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2v8M3 7l3 3 3-3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap" }}>Scroll to explore</span>
          </motion.div>
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
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
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

function SectionImages({ section }: { section: Section }) {
  const { image, imageAspect } = section;
  if (!image) return null;
  const images = Array.isArray(image) ? image : [image];
  if (imageAspect === "page")       return <PageImage src={images[0]} />;
  if (imageAspect === "screenshot") return <ScreenshotImage src={images[0]} />;
  if (imageAspect === "portrait")   return <PortraitImage src={images[0]} />;
  if (images.length === 1)          return <LandscapeImage src={images[0]} />;
  if (images.length === 2)          return <DualImage srcs={[images[0], images[1]]} />;
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
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {learnings.map((learning, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
                style={{
                  display: "flex", gap: "0", alignItems: "stretch",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderLeft: "3px solid #C4622D",
                  borderRadius: "12px", overflow: "hidden",
                }}
              >
                <div style={{ padding: "28px 32px", display: "flex", gap: "20px", alignItems: "flex-start", width: "100%" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", flexShrink: 0, marginTop: "2px" }}>
                    <Lightbulb size={16} color="#C4622D" />
                    <span style={{ fontWeight: 800, color: "rgba(196,98,45,0.5)", fontSize: "11px", lineHeight: 1, fontVariantNumeric: "tabular-nums", letterSpacing: "0.08em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, margin: 0 }}>{learning}</p>
                </div>
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
                whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.16)" }}
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px", display: "flex", flexDirection: "column", gap: "8px", height: "100%", transition: "border-color 0.2s" }}
              >
                <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#C4622D" }}>{cs.company}</span>
                <span style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.25 }}>{cs.title}</span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>{cs.subtitle.slice(0, 72)}…</span>
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
