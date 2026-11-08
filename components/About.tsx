"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { MapPin, Camera, ArrowUpRight, Video } from "lucide-react";
import { useReveal } from "./useReveal";
import Motif from "./Motif";
import Tilt from "./Tilt";
import { EASE } from "@/lib/motion";

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const ROLES = ["onboarding flows", "design systems", "banking experiences", "patient journeys"];

const STATS = [
  { value: 6, suffix: "+", label: "Years experience" },
  { value: 16, suffix: "", label: "Projects shipped" },
  { value: 8, suffix: "",  label: "Case studies" },
  { value: 4, suffix: "",  label: "Clients" },
];

/* ── Count-up stat ── */
function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) { setN(0); return; }
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <span style={{ fontSize: "30px", fontWeight: 800, color: "#F5F1EC", letterSpacing: "-0.02em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{n}{suffix}</span>
      <span style={{ fontSize: "var(--text-2xs)", color: "rgba(255,255,255,0.5)", marginTop: "7px", letterSpacing: "0.02em" }}>{label}</span>
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
    <div style={{ fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.6)", display: "flex", gap: "9px", alignItems: "baseline", flexWrap: "wrap" }}>
      <span>I design</span>
      <span style={{ position: "relative", display: "inline-flex", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.span key={i} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}
            style={{ display: "inline-block", color: "var(--teal)", fontWeight: 600 }}>
            {ROLES[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

const tileBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "var(--radius-2xl)", padding: "24px",
};

function BentoTile({ area, children, style, pad = true, delay = 0, tilt = true }: { area: string; children: React.ReactNode; style?: React.CSSProperties; pad?: boolean; delay?: number; tilt?: boolean }) {
  const { ref, style: rev } = useReveal({ y: 36, scale: 0.97, blur: 8 });
  // Gold cursor glow — as a background layer so it sits behind the content
  // (same orange spotlight the home-page cards/accordions use).
  const [g, setG] = useState({ x: -999, y: -999, on: false });
  const onMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    setG({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
  };
  const onLeave = () => setG((s) => ({ ...s, on: false }));

  const base: React.CSSProperties = pad ? tileBase : { ...tileBase, padding: 0 };
  const baseBg = (style?.background as string) ?? (base.background as string);
  const glow = g.on ? `radial-gradient(300px circle at ${g.x}px ${g.y}px, rgb(var(--gold-rgb) / 0.16), transparent 60%), ` : "";

  const surface = (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...base, ...style, background: `${glow}${baseBg}`, height: "100%", position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );

  return (
    <motion.div ref={ref} className={`bt-${area}`} transition={{ delay }} style={rev}>
      {tilt ? <Tilt fill max={5} sheen={false}>{surface}</Tilt> : surface}
    </motion.div>
  );
}

export default function About() {
  const [photoHover, setPhotoHover] = useState(false);
  return (
    <section id="about" className="relative overflow-hidden" style={{ background: "#0B0A09", paddingTop: "120px", paddingBottom: "120px" }}>
      <Motif variant="grid" tone="duo" size={520} parallax={60} style={{ top: "4%", left: "-10%" }} />

      <div className="page-container relative">
        <div className="about-bento">

          {/* Portrait */}
          <BentoTile area="photo" pad={false} style={{ position: "relative", minHeight: "380px" }}>
            <div
              onMouseEnter={() => setPhotoHover(true)} onMouseLeave={() => setPhotoHover(false)}
              style={{ position: "absolute", inset: 0, overflow: "hidden" }}
            >
              <Image src="/images/profile.webp" alt="Azhar Mohamed" fill priority sizes="(max-width:768px) 90vw, 320px"
                style={{ objectFit: "cover", objectPosition: "center 22%", transform: photoHover ? "scale(1.04)" : "scale(1)", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} />
              {/* availability pulse */}
              <div className="flex items-center" style={{ position: "absolute", top: "14px", left: "14px", gap: "7px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", borderRadius: "var(--radius-pill)", padding: "6px 12px" }}>
                <span style={{ position: "relative", width: "7px", height: "7px" }}>
                  <motion.span animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--teal)" }} />
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--teal)" }} />
                </span>
                <span style={{ fontSize: "var(--text-2xs)", fontWeight: 600, color: "#fff", letterSpacing: "0.03em" }}>Available</span>
              </div>
              {/* caption */}
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "40px 20px 18px", background: "linear-gradient(to top, rgba(0,0,0,0.78), transparent)" }}>
                <p style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "#fff" }}>Azhar Mohamed</p>
                <p style={{ fontSize: "var(--text-label)", color: "rgba(255,255,255,0.6)", marginTop: "3px", letterSpacing: "0.04em" }}>Product Designer · Johannesburg</p>
              </div>
            </div>
          </BentoTile>

          {/* Intro */}
          <BentoTile area="intro" style={{ display: "flex", flexDirection: "column", gap: "16px", justifyContent: "center", padding: "30px 32px" }}>
            <span className="eyebrow" style={{ color: "var(--teal)" }}>About me</span>
            <h2 style={{ fontSize: "clamp(30px, 3.6vw, 44px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#F5F1EC" }}>
              Hi, I&apos;m Azhar
            </h2>
            <RotatingRole />
            <p style={{ fontSize: "var(--text-md)", lineHeight: 1.75, color: "rgba(255,255,255,0.58)", maxWidth: "560px" }}>
              Bringing clarity to complexity. With a background in UX and UI design, I&apos;ve worked in environments where trust, usability, and detail matter most — from banking to healthcare.
            </p>
          </BentoTile>

          {/* Pull-quote */}
          <BentoTile area="quote" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px" }}>
            <span aria-hidden="true" style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "48px", lineHeight: 0.5, color: "var(--gold)", height: "20px" }}>&ldquo;</span>
            <p className="accent-serif" style={{ fontSize: "clamp(19px, 2vw, 24px)", lineHeight: 1.45, color: "#F5F1EC", letterSpacing: "-0.01em" }}>
              Create systems that feel intuitive, reliable, and effortless for the people who use them.
            </p>
            <span style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>— my approach, in one line</span>
          </BentoTile>

          {/* Available / location */}
          <BentoTile area="avail" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "16px" }}>
            <div className="flex items-center" style={{ gap: "9px" }}>
              <span style={{ position: "relative", width: "8px", height: "8px", flexShrink: 0 }}>
                <motion.span animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--teal)" }} />
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--teal)" }} />
              </span>
              <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "#F5F1EC" }}>Available for new projects</span>
            </div>
            <div className="flex items-center" style={{ gap: "9px", color: "rgba(255,255,255,0.6)" }}>
              <MapPin size={15} style={{ color: "var(--teal)" }} />
              <span style={{ fontSize: "var(--text-sm)" }}>Johannesburg, South Africa</span>
            </div>
          </BentoTile>

          {/* Stats */}
          <BentoTile area="stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px 12px", alignContent: "center" }}>
            {STATS.map((s) => <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />)}
          </BentoTile>

          {/* Beyond design — photography & video */}
          <BentoTile area="photog" style={{ display: "flex", flexDirection: "column", gap: "14px", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div aria-hidden="true" style={{ position: "absolute", top: "-30%", right: "-6%", width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle, rgb(var(--teal-rgb) / 0.08), transparent 70%)", pointerEvents: "none" }} />
            <div className="flex items-center" style={{ gap: "12px", position: "relative" }}>
              <span style={{ width: "40px", height: "40px", borderRadius: "11px", display: "grid", placeItems: "center", background: "rgb(var(--teal-rgb) / 0.12)", border: "1px solid rgb(var(--teal-rgb) / 0.3)", flexShrink: 0 }}>
                <Camera size={19} style={{ color: "var(--teal)" }} />
              </span>
              <span className="eyebrow" style={{ color: "var(--teal)" }}>Beyond the screen</span>
            </div>
            <p style={{ fontSize: "var(--text-md)", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", position: "relative" }}>
              I explore creativity through <span style={{ color: "#F5F1EC", fontWeight: 500 }}>photography</span> and <span style={{ color: "#F5F1EC", fontWeight: 500 }}>videography</span> — always observing how people interact with the world, and the stories hidden in small details.
            </p>
            <span className="inline-flex items-center" style={{ gap: "7px", position: "relative", fontSize: "var(--text-2xs)", color: "rgba(255,255,255,0.45)" }}>
              <Video size={13} style={{ color: "var(--teal)" }} /> Stills &amp; motion
            </span>
          </BentoTile>

          {/* Connect */}
          <BentoTile area="connect" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
            <span style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>Let&apos;s build something effortless.</span>
            <div className="flex flex-col" style={{ gap: "10px" }}>
              <a href="https://www.linkedin.com/in/azhar-mohamed-3624491a3" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center transition-colors duration-200"
                style={{ gap: "8px", background: "var(--gold-dark)", color: "#fff", fontWeight: 600, fontSize: "var(--text-sm)", borderRadius: "var(--radius-pill)", padding: "11px 16px" }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--gold-darker)")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--gold-dark)")}>
                <LinkedinIcon size={15} /> LinkedIn
              </a>
              <a href="/#contact" className="group inline-flex items-center justify-center transition-colors duration-200"
                style={{ gap: "7px", border: "1px solid rgba(255,255,255,0.14)", color: "#F5F1EC", fontWeight: 500, fontSize: "var(--text-sm)", borderRadius: "var(--radius-pill)", padding: "11px 16px" }}>
                Get in touch
                <span className="transition-transform duration-200 group-hover:translate-x-0.5" style={{ display: "inline-flex" }}><ArrowUpRight size={15} /></span>
              </a>
            </div>
          </BentoTile>

        </div>
      </div>
    </section>
  );
}
