"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, RevealText, Stagger } from "./Reveal";
import Motif from "./Motif";
import Parallax from "./Parallax";
import Tilt from "./Tilt";

const GOLD = "rgb(var(--gold-rgb))";
const TEAL = "rgb(var(--teal-rgb))";

/* ── Bespoke service glyphs ──────────────────────────────────────────
   Hand-drawn in the same thin-line, dual-accent language as the motifs —
   NOT a generic icon set. One custom mark per discipline. */
function Glyph({ kind, hovered }: { kind: "ux" | "ui" | "ops"; hovered: boolean }) {
  const common = { width: 46, height: 46, viewBox: "0 0 48 48", fill: "none" as const };
  if (kind === "ux") {
    // User Experience — a mapped journey: a flowing path through nodes
    return (
      <svg {...common}>
        <motion.path
          d="M6 33 C 15 33, 14 15, 24 15 C 34 15, 33 31, 42 20"
          stroke={GOLD} strokeWidth="2" strokeLinecap="round"
          initial={false} animate={{ pathLength: hovered ? 1 : 0.82 }} transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ pathLength: 1 }}
        />
        <circle cx="6" cy="33" r="3.2" fill={TEAL} />
        <circle cx="24" cy="15" r="3.2" fill={GOLD} />
        <circle cx="42" cy="20" r="3.2" fill={TEAL} />
      </svg>
    );
  }
  if (kind === "ui") {
    // User Interface — nested frame with a content block + text lines
    return (
      <svg {...common}>
        <rect x="7" y="9" width="34" height="30" rx="4.5" stroke={GOLD} strokeWidth="2" />
        <line x1="7" y1="17.5" x2="41" y2="17.5" stroke={GOLD} strokeWidth="2" />
        <circle cx="12" cy="13.2" r="1.4" fill={TEAL} />
        <rect x="12" y="23" width="12" height="11" rx="2.5" stroke={TEAL} strokeWidth="1.6" fill={TEAL} fillOpacity="0.18" />
        <line x1="28" y1="24.5" x2="36" y2="24.5" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="30" x2="34" y2="30" stroke="rgb(var(--ink-rgb) / calc(0.4 * var(--ink-k)))" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  // Design Operations — a connected system of nodes
  return (
    <svg {...common}>
      <path d="M11 13 L24 25 L37 11 M24 25 L13 38 M24 25 L38 36" stroke={GOLD} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="11" cy="13" r="3" fill={TEAL} />
      <circle cx="37" cy="11" r="2.4" fill={GOLD} />
      <circle cx="24" cy="25" r="3.4" fill={GOLD} />
      <circle cx="13" cy="38" r="2.4" fill={TEAL} />
      <circle cx="38" cy="36" r="2.4" fill={TEAL} />
    </svg>
  );
}

const services = [
  {
    kind: "ux" as const,
    title: "User Experience",
    description:
      "Research, mapping journeys, and designing workflows that are intuitive, usable, and human-centered.",
    keywords: ["Research", "Prototyping", "Testing"],
  },
  {
    kind: "ui" as const,
    title: "User Interface",
    description:
      "Translating ideas into visually compelling, consistent, and accessible interfaces that scale across platforms.",
    keywords: ["Design Systems", "Components", "Accessibility"],
  },
  {
    kind: "ops" as const,
    title: "Design Operations",
    description:
      "Setting up systems, processes, and frameworks so design stays consistent, collaborative, and impactful.",
    keywords: ["Workflows", "Documentation", "Quality"],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 120, y: 80 });
  const { kind, title, description, keywords } = service;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <Reveal item variant="rise" style={{ height: "100%" }}>
      <Tilt fill max={7} sheen={false}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={onMove}
        style={{
          position: "relative",
          overflow: "hidden",
          height: "100%",
          background: hovered ? "rgb(var(--ink-rgb) / calc(0.055 * var(--ink-k)))" : "rgb(var(--ink-rgb) / calc(0.035 * var(--ink-k)))",
          border: `1px solid ${hovered ? "rgb(var(--gold-rgb) / 0.35)" : "rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))"}`,
          borderRadius: "var(--radius-2xl)",
          padding: "34px",
          cursor: "default",
          boxShadow: hovered ? "0 24px 60px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))" : "none",
          transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Cursor-following spotlight */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(340px circle at ${pos.x}px ${pos.y}px, rgb(var(--gold-rgb) / 0.12), transparent 65%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Top row: bespoke glyph + outlined index */}
          <div className="flex items-start justify-between" style={{ marginBottom: "26px" }}>
            <motion.div
              animate={{ y: hovered ? -2 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Glyph kind={kind} hovered={hovered} />
            </motion.div>
            <span aria-hidden="true" style={{
              fontSize: "clamp(34px, 4vw, 50px)", fontWeight: 800, lineHeight: 1,
              color: "transparent", WebkitTextStroke: `1.3px rgb(var(--teal-rgb) / ${hovered ? 0.85 : 0.45})`,
              fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em",
              userSelect: "none", pointerEvents: "none", transition: "-webkit-text-stroke-color 0.3s",
            }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--ink-strong)", marginBottom: "10px", letterSpacing: "-0.01em" }}>
            {title}
          </h3>

          {/* Accent underline grows on hover — terracotta→teal */}
          <motion.div
            animate={{ width: hovered ? 48 : 20, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: "2px", background: "linear-gradient(90deg, var(--gold), var(--teal))", borderRadius: "2px", marginBottom: "14px" }}
          />

          <p style={{ fontSize: "var(--text-sm)", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", lineHeight: 1.75, flexGrow: 1 }}>
            {description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "24px" }}>
            {keywords.map(kw => (
              <span
                key={kw}
                style={{
                  fontSize: "var(--text-label)",
                  fontWeight: 600,
                  color: hovered ? "var(--teal)" : "rgb(var(--teal-rgb) / 0.82)",
                  background: `rgb(var(--teal-rgb) / ${hovered ? 0.1 : 0.06})`,
                  border: `1px solid rgb(var(--teal-rgb) / ${hovered ? 0.5 : 0.28})`,
                  borderRadius: "var(--radius-pill)",
                  padding: "4px 12px",
                  transition: "color 0.3s, border-color 0.3s, background 0.3s",
                }}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
      </Tilt>
    </Reveal>
  );
}

function SkillsHeading() {
  return (
    <Parallax travel={-22}>
    <Stagger gap={0.12} className="flex flex-col gap-4 mb-16">
      <Reveal item variant="fade">
        <p className="eyebrow" style={{ color: "var(--teal)" }}>
          Services
        </p>
      </Reveal>
      <RevealText item style={{ fontSize: "var(--text-h2)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "var(--ink)" }}>
        What I do
      </RevealText>
      <Reveal item variant="rise">
        <p style={{ fontSize: "var(--text-md)", color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))", maxWidth: "420px" }}>
          Three core disciplines I bring to every project
        </p>
      </Reveal>
    </Stagger>
    </Parallax>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden" style={{ background: "var(--bg)", paddingTop: "120px", paddingBottom: "120px" }}>

      <Motif variant="contour" tone="gold" size={560} parallax={60} style={{ top: "-12%", right: "-10%" }} />

      <div className="page-container">

        <SkillsHeading />

        <Stagger gap={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </Stagger>

      </div>
    </section>
  );
}
