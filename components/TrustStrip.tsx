"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReveal } from "./useReveal";
import Motif from "./Motif";
import Tilt from "./Tilt";

const clients = [
  { name: "Life Healthcare", src: "/images/lhc-logo-navy.svg",              bg: "#F4ECDE", logoHeight: 30, sector: "Healthcare", role: "Website redesign + design system" },
  { name: "African Bank",    src: "/images/African Bank logo black.png",    bg: "#F4ECDE", logoHeight: 34, sector: "Banking",    role: "Onboarding & website redesign" },
  { name: "Nedbank",         src: "/images/Nedbank Logo.png",               bg: "#005944", logoHeight: 72, sector: "Banking",    role: "Everyday & corporate banking" },
  { name: "iqbusiness",     src: "/images/iqbusiness logo (FC) black.png", bg: "#F4ECDE", logoHeight: 40, sector: "Consulting", role: "IA for an internal platform" },
];

function LogoChip({ client, index }: { client: typeof clients[0]; index: number }) {
  const { ref, style } = useReveal({ y: 70, scale: 0.88, blur: 12 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div ref={ref} style={style}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        {/* logo tile */}
        <Tilt
          max={9}
          glare="rgba(0,0,0,0.10)"
          style={{
            position: "relative",
            background: client.bg,
            borderRadius: "var(--radius-xl)",
            height: "116px",
            display: "grid",
            placeItems: "center",
            padding: "0 24px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: hovered ? "0 22px 55px rgba(0,0,0,0.45)" : "0 8px 30px rgba(0,0,0,0.25)",
            outline: hovered ? "2px solid rgb(var(--gold-rgb) / 0.55)" : "2px solid transparent",
            outlineOffset: "3px",
            transition: "box-shadow 0.3s ease, outline-color 0.3s ease",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={client.src}
            alt={client.name}
            style={{ height: `${client.logoHeight}px`, maxWidth: "100%", objectFit: "contain", display: "block" }}
          />
        </Tilt>

        {/* proof caption — sector eyebrow + what the work was */}
        <div className="flex flex-col items-center text-center" style={{ gap: "4px", padding: "0 4px" }}>
          <span className="eyebrow" style={{ color: "var(--teal)" }}>
            {client.sector}
          </span>
          <span style={{ fontSize: "var(--text-xs)", color: hovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.55)", lineHeight: 1.45, transition: "color 0.3s" }}>
            {client.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Heading() {
  const { ref, style } = useReveal({ y: 40, scale: 0.96, blur: 8 });
  return (
    <motion.div ref={ref} style={{ ...style, marginBottom: "44px" }} className="flex flex-col items-center text-center gap-3">
      <p className="eyebrow" style={{ color: "var(--teal)" }}>
        Worked with
      </p>
      <h2 style={{ fontSize: "var(--text-h3)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.12, color: "#F5F1EC", maxWidth: "640px" }}>
        Trusted by teams across banking, healthcare{" "}
        <span className="accent-serif" style={{ color: "var(--teal)" }}>&amp;</span> consulting
      </h2>
    </motion.div>
  );
}

export default function TrustStrip() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0B0A09", paddingTop: "88px", paddingBottom: "88px" }}>
      <Motif variant="hatch" tone="duo" size={720} parallax={70} style={{ top: "-24%", left: "50%", marginLeft: "-360px", opacity: 0.6 }} />
      <div className="divider-gold" style={{ marginBottom: "60px" }} />
      <div className="page-container relative">
        <Heading />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {clients.map((client, i) => (
            <LogoChip key={client.name} client={client} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
