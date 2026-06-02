"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import Button from "./Button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const HEADLINE = "Every interaction is a chance to be effortless";

// Interlocked AM monogram — A and M share the bottom-right vertex, drawn as one laser sweep.
// Main path: A left leg → apex → shared vertex → M left stem → valley → peak → right stem.
const AM_MAIN = "M 30 195 L 95 40 L 160 195 L 160 55 L 210 130 L 260 55 L 260 195";
const AM_BAR  = "M 63 128 L 127 128"; // A's crossbar
const DRAW_DUR  = 2.4;  // laser draw time before the glow settles into a pulse
const BAR_DELAY = 0.55; // crossbar draws as the laser descends the A
const BAR_DUR   = 0.35;

function AMMonogram() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 150, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <div
      style={{ perspective: "1100px", position: "relative" }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {/* Pulsing halo behind the mark */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.04, 0.9] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "50%", left: "50%", translateX: "-50%", translateY: "-50%",
          width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,98,45,0.26) 0%, transparent 62%)",
          pointerEvents: "none",
        }}
      />

      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d", width: 360, height: 280, position: "relative" }}>

        {/* ── Back layer: orbit ring (pushed back in Z for parallax depth) ── */}
        <div style={{ position: "absolute", inset: 0, transform: "translateZ(-90px)", display: "grid", placeItems: "center", pointerEvents: "none" }}>
          <svg width="330" height="280" viewBox="0 0 330 280" fill="none" style={{ overflow: "visible" }}>
            <motion.circle
              cx="165" cy="115" r="150"
              stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, delay: 0.2, ease: EASE }}
            />
            <motion.circle
              cx="165" cy="115" r="150"
              stroke="#C4622D" strokeWidth="2" fill="none" style={{ filter: "blur(6px)" }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.25 }}
              transition={{ duration: 1.8, delay: 0.2, ease: EASE }}
            />
          </svg>
        </div>

        {/* ── Mid layer: soft depth shadow of the mark ── */}
        <div style={{ position: "absolute", inset: 0, transform: "translateZ(-30px)", display: "grid", placeItems: "center", pointerEvents: "none" }}>
          <svg width="330" height="267" viewBox="0 0 290 235" fill="none" style={{ overflow: "visible" }}>
            <path d={AM_MAIN} stroke="rgba(0,0,0,0.5)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ filter: "blur(5px)" }} />
            <path d={AM_BAR}  stroke="rgba(0,0,0,0.5)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ filter: "blur(5px)" }} />
          </svg>
        </div>

        {/* ── Front layer: the interlocked AM mark (pulled forward in Z) ── */}
        <div style={{ position: "absolute", inset: 0, transform: "translateZ(55px)", display: "grid", placeItems: "center" }}>
          <svg width="330" height="267" viewBox="0 0 290 235" fill="none" style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="amStroke" x1="0" y1="0" x2="1" y2="0.4">
                <stop offset="0" stopColor="#C4622D" />
                <stop offset="0.55" stopColor="#E8A06A" />
                <stop offset="1" stopColor="#F4E7DA" />
              </linearGradient>
            </defs>

            {/* glow trail — draws with the laser */}
            <motion.path
              d={AM_MAIN} stroke="#C4622D" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none"
              style={{ filter: "blur(9px)" }} opacity={0.5}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: DRAW_DUR, ease: "easeInOut" }}
            />
            <motion.path
              d={AM_BAR} stroke="#C4622D" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none"
              style={{ filter: "blur(9px)" }} opacity={0.5}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: BAR_DUR, delay: BAR_DELAY, ease: "easeInOut" }}
            />

            {/* the mark — warm gradient, stays lit once drawn */}
            <motion.path
              d={AM_MAIN} stroke="url(#amStroke)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: DRAW_DUR, ease: "easeInOut" }}
            />
            <motion.path
              d={AM_BAR} stroke="url(#amStroke)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: BAR_DUR, delay: BAR_DELAY, ease: "easeInOut" }}
            />

            {/* laser head — travels the main path as it draws, then fades */}
            <g>
              <circle r="9" fill="#C4622D" style={{ filter: "blur(7px)" }} opacity={0.95} />
              <circle r="3" fill="#FFF6EF" />
              <animateMotion dur={`${DRAW_DUR}s`} fill="freeze" calcMode="spline" keyTimes="0;1" keyPoints="0;1" keySplines="0.42 0 0.58 1">
                <mpath href="#amMainPath" />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.9;1" dur={`${DRAW_DUR}s`} fill="freeze" />
            </g>
            <path id="amMainPath" d={AM_MAIN} fill="none" stroke="none" />

            {/* breathing glow — fades in after the draw, then pulses forever */}
            <motion.path
              d={AM_MAIN} stroke="#C4622D" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none"
              style={{ filter: "blur(13px)" }} pathLength={1}
              initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0.18, 0.5] }}
              transition={{ duration: 4.5, delay: DRAW_DUR, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>

      </motion.div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentScale   = useTransform(scrollYProgress, [0, 0.5], [1, 0.82]);
  const contentY       = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const monoOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const monoScale   = useTransform(scrollYProgress, [0, 0.35], [1, 0.7]);
  const monoY       = useTransform(scrollYProgress, [0, 0.35], [0, -80]);

  const words = HEADLINE.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#0B0A09" }}
    >
      {/* ── F: Animated dot grid ── */}
      <style>{`
        @keyframes grid-drift {
          0%   { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1.5px, transparent 1.5px)",
          backgroundSize: "40px 40px",
          opacity: 0.10,
          animation: "grid-drift 14s linear infinite",
        }}
      />

      {/* ── Ambient glow orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div style={{
          position: "absolute", top: "-20%", right: "-8%",
          width: "750px", height: "750px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,98,45,0.22) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", bottom: "0%", left: "-20%",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(242,169,0,0.08) 0%, transparent 65%)",
        }} />
      </div>

      <div className="absolute inset-0 noise-texture opacity-[0.025] pointer-events-none select-none" />

      {/* Vignette — darkens edges for depth and focus */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
        style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
      />

      <div className="relative z-10 page-container pt-[96px] pb-24 flex flex-col justify-center min-h-screen">
        <div className="flex flex-col lg:flex-row lg:items-center">

          {/* Left — text content */}
          <motion.div
            style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
            className="flex flex-col gap-8 lg:w-[60%] relative z-10"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D" }}
            >
              UX · UI · Design Operations
            </motion.p>

            {/* ── D: Word-by-word headline ── */}
            <h1
              style={{
                fontSize: "clamp(48px, 6vw, 72px)",
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                color: "#F5F1EC",
                maxWidth: "720px",
              }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08 + i * 0.075, ease: EASE }}
                  style={{ display: "inline-block", marginRight: "0.28em" }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.68, ease: EASE }}
              style={{ fontSize: "18px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: "520px" }}
            >
              Design focused on building intuitive systems, workflows, and interfaces that put people first.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Button href="#work" variant="primary" icon={<ArrowRight size={16} />}>
                View my work
              </Button>
              <Button href="/cv" variant="secondary" icon={<FileText size={15} style={{ opacity: 0.7 }} />} iconPosition="left">
                View CV
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — AM monogram */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
            style={{ opacity: monoOpacity, scale: monoScale, y: monoY, zIndex: 1 }}
            className="hidden md:flex lg:w-[40%] items-center justify-center"
            aria-hidden="true"
          >
            <AMMonogram />
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Scroll</span>
        {/* Mouse-style cue with travelling dot */}
        <div style={{
          width: "22px", height: "34px", borderRadius: "9999px",
          border: "1.5px solid rgba(255,255,255,0.2)",
          display: "flex", justifyContent: "center", paddingTop: "6px",
        }}>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "4px", height: "8px", borderRadius: "9999px", background: "#C4622D" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
