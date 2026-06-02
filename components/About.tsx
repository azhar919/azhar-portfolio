"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
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

function PhotoCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scrollScale   = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.82, 1, 1, 0.9]);
  const scrollBlur    = useTransform(scrollYProgress, [0, 0.15], ["blur(14px)", "blur(0px)"]);
  const scrollY       = useTransform(scrollYProgress, [0, 0.18, 1], [60, 0, -30]);

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

  return (
    <motion.div ref={containerRef} style={{ opacity: scrollOpacity, scale: scrollScale, filter: scrollBlur, y: scrollY }}>
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

export default function About() {
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start end", "end start"] });

  // Staggered entry — each element has its own input range, 0.05 apart
  const eyebrowO    = useTransform(scrollYProgress, [0.04, 0.14, 0.76, 1], [0, 1, 1, 0]);
  const eyebrowY    = useTransform(scrollYProgress, [0.04, 0.14, 1],        [48, 0, -28]);
  const eyebrowBlur = useTransform(scrollYProgress, [0.04, 0.16],            ["blur(10px)", "blur(0px)"]);

  const headingO    = useTransform(scrollYProgress, [0.09, 0.19, 0.76, 1], [0, 1, 1, 0]);
  const headingY    = useTransform(scrollYProgress, [0.09, 0.19, 1],        [48, 0, -28]);
  const headingBlur = useTransform(scrollYProgress, [0.09, 0.21],            ["blur(10px)", "blur(0px)"]);

  const p1O         = useTransform(scrollYProgress, [0.14, 0.24, 0.76, 1], [0, 1, 1, 0]);
  const p1Y         = useTransform(scrollYProgress, [0.14, 0.24, 1],        [48, 0, -28]);
  const p1Blur      = useTransform(scrollYProgress, [0.14, 0.26],            ["blur(10px)", "blur(0px)"]);

  const p2O         = useTransform(scrollYProgress, [0.19, 0.29, 0.76, 1], [0, 1, 1, 0]);
  const p2Y         = useTransform(scrollYProgress, [0.19, 0.29, 1],        [48, 0, -28]);
  const p2Blur      = useTransform(scrollYProgress, [0.19, 0.31],            ["blur(10px)", "blur(0px)"]);

  const p3O         = useTransform(scrollYProgress, [0.24, 0.34, 0.76, 1], [0, 1, 1, 0]);
  const p3Y         = useTransform(scrollYProgress, [0.24, 0.34, 1],        [48, 0, -28]);
  const p3Blur      = useTransform(scrollYProgress, [0.24, 0.36],            ["blur(10px)", "blur(0px)"]);

  const btnO        = useTransform(scrollYProgress, [0.29, 0.39, 0.76, 1], [0, 1, 1, 0]);
  const btnY        = useTransform(scrollYProgress, [0.29, 0.39, 1],        [48, 0, -28]);
  const btnBlur     = useTransform(scrollYProgress, [0.29, 0.41],            ["blur(10px)", "blur(0px)"]);

  const tagsO       = useTransform(scrollYProgress, [0.34, 0.44, 0.76, 1], [0, 1, 1, 0]);
  const tagsY       = useTransform(scrollYProgress, [0.34, 0.44, 1],        [48, 0, -28]);
  const tagsBlur    = useTransform(scrollYProgress, [0.34, 0.46],            ["blur(10px)", "blur(0px)"]);

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

          <div ref={textRef} className="flex flex-col gap-8 md:pt-6">

            <motion.p style={{ opacity: eyebrowO, y: eyebrowY, filter: eyebrowBlur, fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D" }}>
              About Me
            </motion.p>

            <motion.h2 style={{ opacity: headingO, y: headingY, filter: headingBlur, fontSize: "42px", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#FFFFFF" }}>
              Hi, I&apos;m Azhar
            </motion.h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <motion.p style={{ opacity: p1O, y: p1Y, filter: p1Blur, fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}>
                {paragraphs[0]}
              </motion.p>
              <motion.p style={{ opacity: p2O, y: p2Y, filter: p2Blur, fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}>
                {paragraphs[1]}
              </motion.p>
              <motion.p style={{ opacity: p3O, y: p3Y, filter: p3Blur, fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}>
                {paragraphs[2]}
              </motion.p>
            </div>

            <motion.div style={{ opacity: btnO, y: btnY, filter: btnBlur }}>
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

            <motion.div style={{ opacity: tagsO, y: tagsY, filter: tagsBlur }} className="flex flex-wrap gap-2">
              {tags.map(({ label, icon: Icon }) => (
                <span
                  key={label}
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
                </span>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
