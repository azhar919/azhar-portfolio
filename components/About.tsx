"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { MapPin, Building2, Camera, Clock } from "lucide-react";

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const tags = [
  { label: "Johannesburg", icon: MapPin },
  { label: "Banking",      icon: Building2 },
  { label: "Photography",  icon: Camera },
  { label: "6+ years",     icon: Clock },
];

const paragraphs = [
  "I design digital experiences that bring clarity to complexity. With a background in UX and UI design, I've worked in environments where trust, usability, and detail matter most.",
  "My approach is simple: create systems that feel intuitive, reliable, and effortless for the people who use them.",
  "Beyond design, I explore creativity through photography and videography — always observing how people interact with the world and the stories hidden in small details.",
];

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="about" className="relative overflow-hidden" style={{ background: "#111111", paddingTop: "120px", paddingBottom: "120px" }}>

      {/* Ambient glow behind photo */}
      <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
        top: "10%", left: "-5%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,98,45,0.08) 0%, transparent 70%)",
      }} />

      <div className="page-container">
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-[420px_1fr] gap-12 lg:gap-20 items-start"
        >
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            style={{
              width: "100%",
              maxHeight: "420px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
              src="/images/profile.jpg"
              alt="Azhar Mohamed"
              width={420}
              height={420}
              style={{ objectFit: "cover", objectPosition: "top", display: "block", width: "100%", height: "420px" }}
              priority
            />
          </motion.div>

          {/* Text content */}
          <div className="flex flex-col gap-8 md:pt-6">

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D" }}
            >
              About Me
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              style={{ fontSize: "42px", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#FFFFFF" }}
            >
              Hi, I&apos;m Azhar
            </motion.h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.28 + i * 0.1, ease: EASE }}
                  style={{ fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
            >
              <a
                href="https://www.linkedin.com/in/azhar-mohamed-3624491a3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-medium transition-all duration-200"
                style={{ background: "#C4622D", color: "#FFFFFF", fontSize: "14px", fontWeight: 500, padding: "11px 24px", borderRadius: "9999px", gap: "8px" }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#A8521F")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#C4622D")}
              >
                <LinkedinIcon />
                LinkedIn profile
              </a>
            </motion.div>

            <div className="flex flex-wrap gap-2">
              {tags.map(({ label, icon: Icon }, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.07, ease: EASE }}
                  className="inline-flex items-center"
                  style={{
                    gap: "6px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "9999px",
                    padding: "7px 16px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  <Icon size={12} color="rgba(255,255,255,0.3)" />
                  {label}
                </motion.span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
