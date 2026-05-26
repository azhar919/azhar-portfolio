"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import FloatingNav from "@/components/FloatingNav";
import ContactFooter from "@/components/ContactFooter";
import type { CaseStudy, Section } from "../data";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function AnimatedSection({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function CaseSection({ section, index }: { section: Section; index: number }) {
  const bg = index % 2 === 0 ? "#0A0A0A" : "#111111";

  return (
    <section style={{ background: bg, paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="page-container">
        <AnimatedSection>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#C4622D" }}>
              {section.label}
            </span>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
              {section.heading}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {section.body.map((para, i) => (
                <p key={i} style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {section.image && (
          <AnimatedSection style={{ marginTop: "48px" }}>
            {section.imageAspect === "portrait" ? (
              /* Phone mockup — centered, narrow */
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative", width: "340px", height: "680px", borderRadius: "24px", overflow: "hidden", background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Image src={Array.isArray(section.image) ? section.image[0] : section.image} alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} />
                </div>
              </div>
            ) : section.imageAspect === "page" ? (
              /* Full-page screenshot — wide, taller crop showing top */
              <div style={{ width: "100%", height: "520px", borderRadius: "12px", overflow: "hidden", position: "relative", background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.07)" }}>
                <Image src={Array.isArray(section.image) ? section.image[0] : section.image} alt="" fill style={{ objectFit: "cover", objectPosition: "top" }} />
              </div>
            ) : Array.isArray(section.image) ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {section.image.map((src, i) => (
                  <div key={i} style={{ width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", position: "relative", background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <Image src={src} alt="" fill style={{ objectFit: "contain" }} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", position: "relative", background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.07)" }}>
                <Image src={section.image} alt="" fill style={{ objectFit: "contain" }} />
              </div>
            )}
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

function LearningsSection({ learnings }: { learnings: string[] }) {
  return (
    <section style={{ background: "#0A0A0A", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="page-container">
        <AnimatedSection>
          <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#C4622D", marginBottom: "16px" }}>
            Reflections
          </p>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "48px" }}>
            Key Learnings
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {learnings.map((learning, i) => (
              <div key={i} style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                <span style={{ fontWeight: 700, color: "#C4622D", fontSize: "20px", lineHeight: 1, marginTop: "2px", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.65)", lineHeight: 1.75 }}>
                  {learning}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function CaseStudyClient({ study }: { study: CaseStudy }) {
  return (
    <main>
      <FloatingNav />
      <div className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden flex flex-col justify-center" style={{ background: "#0A0A0A", paddingTop: "100px", paddingBottom: "100px", minHeight: "400px" }}>
          <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
            top: "-20%", right: "-8%",
            width: "650px", height: "650px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,98,45,0.13) 0%, transparent 70%)",
          }} />

          <div className="page-container relative">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", marginBottom: "16px" }}
            >
              {study.company}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
              style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.08, letterSpacing: "-0.04em" }}
            >
              {study.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              style={{ marginTop: "24px", fontSize: "18px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: "560px" }}
            >
              {study.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "10px" }}
            >
              {study.tools.map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "9999px",
                    padding: "6px 14px",
                  }}
                >
                  {tool}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {study.sections.map((section, i) => (
          <CaseSection key={i} section={section} index={i} />
        ))}

        <LearningsSection learnings={study.learnings} />

        <ContactFooter />
      </div>
    </main>
  );
}
