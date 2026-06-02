"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const faqs = [
  { q: "What is your design process?",        a: "My process follows design thinking: research, ideation, prototyping, and user testing. Each phase adapts to project needs and client goals." },
  { q: "Which industries have you worked in?", a: "I have worked with clients in banking, finance, and other sectors, focusing on user-centered design solutions." },
  { q: "Do you offer design operations support?", a: "Yes, I help teams improve workflows, streamline collaboration, and maintain consistent design quality." },
  { q: "How do you collaborate with clients?", a: "I use regular check-ins, feedback sessions, and clear documentation to keep clients informed and involved throughout each project." },
];

function FAQCard({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.18, 0.8, 1], [0.8, 1, 1, 0.88]);
  const y       = useTransform(scrollYProgress, [0, 0.18, 1],       [80, 0, -45]);
  const blur    = useTransform(scrollYProgress, [0, 0.18],           ["blur(10px)", "blur(0px)"]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity, scale, y, filter: blur,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        transition: "background 0.3s, border-color 0.3s",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(196,98,45,0.35)";
        el.style.background = "rgba(255,255,255,0.06)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(255,255,255,0.08)";
        el.style.background = "rgba(255,255,255,0.04)";
      }}
    >
      <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.4, letterSpacing: "-0.01em" }}>
        <span style={{ color: "#C4622D", marginRight: "8px", fontVariantNumeric: "tabular-nums" }}>
          {String(index + 1).padStart(2, "0")}.
        </span>
        {faq.q}
      </h3>
      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>{faq.a}</p>
    </motion.div>
  );
}

export default function FAQ() {
  const headingRef = useRef(null);
  const { scrollYProgress: headingProgress } = useScroll({ target: headingRef, offset: ["start end", "end start"] });
  const headingOpacity = useTransform(headingProgress, [0, 0.1, 0.75, 1], [0, 1, 1, 0]);
  const headingY       = useTransform(headingProgress, [0, 0.12, 1],       [60, 0, -40]);

  return (
    <section id="faq" className="relative overflow-hidden" style={{ background: "#0A0A0A", paddingTop: "120px", paddingBottom: "120px" }}>

      <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
        top: "20%", right: "-10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,98,45,0.13) 0%, transparent 70%)",
      }} />

      <div className="page-container">

        <motion.div
          ref={headingRef}
          style={{ opacity: headingOpacity, y: headingY }}
          className="flex flex-col gap-4 mb-16"
        >
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D" }}>
            FAQ
          </p>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#FFFFFF" }}>
            Your design questions, answered
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <FAQCard key={i} faq={faq} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
