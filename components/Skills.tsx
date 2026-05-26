"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, Layout, Settings } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

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

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="skills" className="relative overflow-hidden" style={{ background: "#0A0A0A", paddingTop: "120px", paddingBottom: "120px" }}>

      {/* Subtle top-right glow */}
      <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
        top: "-10%", right: "-10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,98,45,0.07) 0%, transparent 70%)",
      }} />

      <div className="page-container" ref={ref}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col gap-4 mb-16"
        >
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map(({ icon: Icon, title, description, keywords }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="flex flex-col transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "36px",
                cursor: "default",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = "rgba(255,255,255,0.07)";
                el.style.borderColor = "rgba(196,98,45,0.35)";
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = "0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(196,98,45,0.08)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{ marginBottom: "24px" }}>
                <Icon size={28} color="#C4622D" />
              </div>

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
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
