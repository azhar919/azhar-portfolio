"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Layout, Settings } from "lucide-react";
import { useReveal } from "./useReveal";

const services = [
  {
    icon: Compass,
    title: "User Experience",
    description:
      "Research, mapping journeys, and designing workflows that are intuitive, usable, and human-centered.",
    keywords: ["Research", "Prototyping", "Testing"],
  },
  {
    icon: Layout,
    title: "User Interface",
    description:
      "Translating ideas into visually compelling, consistent, and accessible interfaces that scale across platforms.",
    keywords: ["Design Systems", "Components", "Accessibility"],
  },
  {
    icon: Settings,
    title: "Design Operations",
    description:
      "Setting up systems, processes, and frameworks so design stays consistent, collaborative, and impactful.",
    keywords: ["Workflows", "Documentation", "Quality"],
  },
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  const [hovered, setHovered] = useState(false);
  const { ref, style } = useReveal({ y: 120, scale: 0.76, blur: 18 });
  const { icon: Icon, title, description, keywords } = service;

  return (
    <motion.div ref={ref} style={{ ...style, height: "100%" }}>
      <div
        style={{
          height: "100%",
          background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${hovered ? "rgba(196,98,45,0.35)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "20px",
          padding: "36px",
          cursor: "default",
          display: "flex",
          flexDirection: "column",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(196,98,45,0.08)" : "none",
          transition: "background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          animate={{ rotate: hovered ? -8 : 0, scale: hovered ? 1.15 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          style={{ marginBottom: "24px", width: "fit-content", transformOrigin: "center" }}
        >
          <Icon size={28} color="#C4622D" />
        </motion.div>
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", marginBottom: "12px", letterSpacing: "-0.01em" }}>
          {title}
        </h3>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, flexGrow: 1 }}>
          {description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "24px" }}>
          {keywords.map(kw => (
            <span
              key={kw}
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "9999px",
                padding: "4px 12px",
              }}
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SkillsHeading() {
  const { ref, style } = useReveal({ y: 70, scale: 0.92, blur: 10 });
  return (
    <motion.div ref={ref} style={style} className="flex flex-col gap-4 mb-16">
      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D" }}>
        Services
      </p>
      <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#FFFFFF" }}>
        What I do
      </h2>
      <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", maxWidth: "420px" }}>
        Three core disciplines I bring to every project
      </p>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden" style={{ background: "#0A0A0A", paddingTop: "120px", paddingBottom: "120px" }}>

      <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
        top: "-10%", right: "-10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,98,45,0.13) 0%, transparent 70%)",
      }} />

      <div className="page-container">

        <SkillsHeading />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
}
