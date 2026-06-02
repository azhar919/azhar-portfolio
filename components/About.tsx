"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { MapPin, Building2, Camera, Clock, type LucideIcon } from "lucide-react";
import { useReveal } from "./useReveal";
import Button from "./Button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const tags = [
  { label: "Johannesburg", icon: MapPin },
  { label: "Banking",      icon: Building2 },
  { label: "Photography",  icon: Camera },
  { label: "6+ years",     icon: Clock },
];

const paragraphs = [
  "Bringing clarity to complexity. With a background in UX and UI design, I've worked in environments where trust, usability, and detail matter most.",
  "My approach is simple: create systems that feel intuitive, reliable, and effortless for the people who use them.",
  "Beyond design, I explore creativity through photography and videography — always observing how people interact with the world and the stories hidden in small details.",
];

const ROLES = ["onboarding flows", "design systems", "banking experiences", "user research"];

const STATS = [
  { value: 6, suffix: "+", label: "Years experience" },
  { value: 6, suffix: "",  label: "Case studies" },
  { value: 3, suffix: "",  label: "Clients" },
];

/* ── Count-up stat ── */
function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) { setN(0); return; }
    const duration = 1600;
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
    <div ref={ref} className="flex flex-col">
      <span style={{ fontSize: "34px", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        {n}{suffix}
      </span>
      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", marginTop: "8px", letterSpacing: "0.02em" }}>{label}</span>
    </div>
  );
}

/* ── Rotating role word ── */
function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", display: "flex", gap: "9px", alignItems: "baseline", flexWrap: "wrap" }}>
      <span>I design</span>
      <span style={{ position: "relative", display: "inline-flex", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ display: "inline-block", color: "#C4622D", fontWeight: 600 }}
          >
            {ROLES[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

/* ── Interactive tag chip ── */
function TagChip({ label, Icon }: { label: string; Icon: LucideIcon }) {
  const [h, setH] = useState(false);
  return (
    <motion.span
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      animate={{ y: h ? -3 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-flex items-center"
      style={{
        gap: "6px",
        background: h ? "rgba(196,98,45,0.1)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${h ? "rgba(196,98,45,0.35)" : "rgba(255,255,255,0.09)"}`,
        borderRadius: "9999px",
        padding: "7px 16px",
        fontSize: "13px",
        fontWeight: 500,
        color: h ? "#fff" : "rgba(255,255,255,0.5)",
        transition: "background 0.2s, border-color 0.2s, color 0.2s",
        cursor: "default",
      }}
    >
      <motion.span
        animate={{ rotate: h ? -12 : 0, scale: h ? 1.18 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 14 }}
        style={{ display: "inline-flex" }}
      >
        <Icon size={12} color={h ? "#C4622D" : "rgba(255,255,255,0.3)"} />
      </motion.span>
      {label}
    </motion.span>
  );
}

function PhotoCard() {
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 25 });

  const [glint, setGlint] = useState({ x: 50, y: 50, visible: false });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
    setGlint({ x: x * 100, y: y * 100, visible: true });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setGlint(prev => ({ ...prev, visible: false }));
    setHovered(false);
  };

  const { ref, style } = useReveal({ x: -120, scale: 0.85, blur: 16 });

  return (
    <motion.div ref={ref} style={style}>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <div style={{ perspective: "900px" }}>
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setHovered(true)}
          >
            {/* Rotating arc border */}
            <div style={{ position: "relative", borderRadius: "18px", padding: "2px", cursor: "pointer" }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: hovered ? 1.8 : 6, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute", inset: 0,
                  borderRadius: "18px",
                  background: hovered
                    ? "conic-gradient(rgba(196,98,45,0.95) 0deg, rgba(196,98,45,0.3) 50deg, transparent 90deg, transparent 360deg)"
                    : "conic-gradient(rgba(196,98,45,0.6) 0deg, rgba(196,98,45,0.1) 40deg, transparent 70deg, transparent 360deg)",
                  transition: "background 0.4s ease",
                }}
              />
              <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Image
                  src="/images/profile.jpg"
                  alt="Azhar Mohamed"
                  width={420}
                  height={420}
                  style={{ objectFit: "cover", objectPosition: "top", display: "block", width: "100%", height: "420px" }}
                  priority
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute", inset: 0,
                    background: `radial-gradient(circle at ${glint.x}% ${glint.y}%, rgba(255,255,255,0.2) 0%, transparent 55%)`,
                    opacity: glint.visible ? 1 : 0,
                    transition: "opacity 0.25s ease",
                    pointerEvents: "none",
                  }}
                />
                <motion.div
                  animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "32px 20px 16px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                >
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#fff", letterSpacing: "0.01em" }}>Azhar Mohamed</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", marginTop: "2px" }}>UX · UI Designer — Johannesburg</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AboutText() {
  const { ref, style } = useReveal({ y: 90, scale: 0.94, blur: 12 });
  return (
    <motion.div ref={ref} style={style} className="flex flex-col gap-8 md:pt-6">

      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D" }}>
        About Me
      </p>

      <div className="flex flex-col gap-3">
        <h2 style={{ fontSize: "42px", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#FFFFFF" }}>
          Hi, I&apos;m Azhar
        </h2>
        <RotatingRole />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {paragraphs.map((para, i) => (
          <p key={i} style={{ fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}>
            {para}
          </p>
        ))}
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-3"
        style={{ gap: "16px", padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        {STATS.map((s) => (
          <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>

      <div>
        <Button
          href="https://www.linkedin.com/in/azhar-mohamed-3624491a3"
          external
          variant="primary"
          icon={<LinkedinIcon />}
          iconPosition="left"
        >
          LinkedIn profile
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map(({ label, icon: Icon }) => (
          <TagChip key={label} label={label} Icon={Icon} />
        ))}
      </div>

    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden" style={{ background: "#111111", paddingTop: "120px", paddingBottom: "120px" }}>

      <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
        top: "10%", left: "-5%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,98,45,0.14) 0%, transparent 70%)",
      }} />

      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-[420px_1fr] gap-12 lg:gap-20 items-start">
          <PhotoCard />
          <AboutText />
        </div>
      </div>
    </section>
  );
}
