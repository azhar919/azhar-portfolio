"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const faqs = [
  { q: "What is your design process?",        a: "My process follows design thinking: research, ideation, prototyping, and user testing. Each phase adapts to project needs and client goals." },
  { q: "Which industries have you worked in?", a: "I have worked with clients in banking, finance, and other sectors, focusing on user-centered design solutions." },
  { q: "Do you offer design operations support?", a: "Yes, I help teams improve workflows, streamline collaboration, and maintain consistent design quality." },
  { q: "How do you collaborate with clients?", a: "I use regular check-ins, feedback sessions, and clear documentation to keep clients informed and involved throughout each project." },
];

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="faq" className="relative overflow-hidden" style={{ background: "#0A0A0A", paddingTop: "120px", paddingBottom: "120px" }}>

      {/* Subtle glow */}
      <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
        top: "20%", right: "-10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,98,45,0.07) 0%, transparent 70%)",
      }} />

      <div className="page-container" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="flex flex-col gap-4 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "32px",
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
                  {String(i + 1).padStart(2, "0")}.
                </span>
                {faq.q}
              </h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>{faq.a}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
