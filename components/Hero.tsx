"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const AM_PATH =
  "M 185 305 L 185 45 L 40 305 L 99 200 L 185 200 L 185 45 L 245 185 L 305 45 L 305 305";

const CX = 173;
const CY = 175;
const CR = 160;

const HEADLINE = "Every interaction is a chance to be effortless";

const PARTICLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

function AMMonogram() {
  return (
    <div style={{ width: 350, height: 350, position: "relative" }}>
      <style>{`
        @keyframes am-trace {
          0%    { stroke-dashoffset: 1; opacity: 1; }
          44.4% { stroke-dashoffset: 0; opacity: 1; }
          52%   { stroke-dashoffset: 0; opacity: 0.4; }
          60%   { stroke-dashoffset: 0; opacity: 1; }
          66.7% { stroke-dashoffset: 0; opacity: 1; }
          77.8% { stroke-dashoffset: 0; opacity: 0; }
          99%   { stroke-dashoffset: 1; opacity: 0; }
          100%  { stroke-dashoffset: 1; opacity: 0; }
        }
        @keyframes am-circle {
          0%    { stroke-dashoffset: 1; opacity: 0; }
          43%   { stroke-dashoffset: 1; opacity: 0; }
          44.4% { stroke-dashoffset: 1; opacity: 1; }
          66.7% { stroke-dashoffset: 0; opacity: 1; }
          72%   { stroke-dashoffset: 0; opacity: 0.4; }
          77%   { stroke-dashoffset: 0; opacity: 1; }
          77.8% { stroke-dashoffset: 0; opacity: 0; }
          99%   { stroke-dashoffset: 1; opacity: 0; }
          100%  { stroke-dashoffset: 1; opacity: 0; }
        }
      `}</style>

      <svg width="350" height="350" viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* Background static reference path — also the motion path anchor */}
        <path
          id="am-motion-path"
          d={AM_PATH}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Orange glow trace */}
        <path
          d={AM_PATH}
          stroke="#C4622D"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          style={{
            strokeDasharray: "1",
            strokeDashoffset: "1",
            filter: "blur(8px)",
            opacity: 0.5,
            animation: "am-trace 9s ease-in-out infinite",
          }}
        />

        {/* White main trace */}
        <path
          d={AM_PATH}
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          style={{
            strokeDasharray: "1",
            strokeDashoffset: "1",
            animation: "am-trace 9s ease-in-out infinite",
          }}
        />

        {/* ── A: Comet head — travels at the leading edge of the trace ── */}
        <g>
          {/* glow aura */}
          <circle r="13" fill="#C4622D" style={{ filter: "blur(10px)" }} opacity={0.9} />
          {/* hot white point */}
          <circle r="3" fill="#FFFFFF" />
          <animateMotion
            dur="9s"
            repeatCount="indefinite"
            {...{ calcMode: "spline", keyTimes: "0;0.444;1", keyPoints: "0;1;1", keySplines: "0.42 0 0.58 1;0 0 1 1" }}
          >
            <mpath href="#am-motion-path" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0;0"
            keyTimes="0;0.015;0.43;0.50;1"
            dur="9s"
            repeatCount="indefinite"
          />
        </g>

        {/* Background dim circle */}
        <circle
          cx={CX} cy={CY} r={CR}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1.5"
          fill="none"
          transform={`rotate(-45 ${CX} ${CY})`}
        />

        {/* Orange circle glow trace */}
        <circle
          cx={CX} cy={CY} r={CR}
          stroke="#C4622D"
          strokeWidth="5"
          fill="none"
          pathLength="1"
          transform={`rotate(-45 ${CX} ${CY})`}
          style={{
            strokeDasharray: "1",
            strokeDashoffset: "1",
            filter: "blur(8px)",
            opacity: 0.5,
            animation: "am-circle 9s ease-in-out infinite",
          }}
        />

        {/* White circle trace */}
        <circle
          cx={CX} cy={CY} r={CR}
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          pathLength="1"
          transform={`rotate(-45 ${CX} ${CY})`}
          style={{
            strokeDasharray: "1",
            strokeDashoffset: "1",
            animation: "am-circle 9s ease-in-out infinite",
          }}
        />

        {/* ── C: Particle burst at trace completion ── */}
        {PARTICLE_ANGLES.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const tx = Math.round(Math.cos(rad) * 72);
          const ty = Math.round(Math.sin(rad) * 72);
          const tx2 = Math.round(tx * 1.55);
          const ty2 = Math.round(ty * 1.55);
          const r = i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5;
          const fill = i % 2 === 0 ? "#C4622D" : "#FFFFFF";
          return (
            <circle key={i} cx={CX} cy={CY} r={r} fill={fill}>
              <animate
                attributeName="opacity"
                values="0;0;0.9;0;0"
                keyTimes="0;0.44;0.47;0.62;1"
                dur="9s"
                repeatCount="indefinite"
                calcMode="linear"
              />
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`0 0;0 0;${tx} ${ty};${tx2} ${ty2};${tx2} ${ty2}`}
                keyTimes="0;0.44;0.52;0.62;1"
                dur="9s"
                repeatCount="indefinite"
                {...{ calcMode: "spline", keySplines: "0 0 1 1;0.1 0 0.25 1;0.8 0 1 1;0 0 1 1" }}
              />
            </circle>
          );
        })}

      </svg>
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
      style={{ background: "#0A0A0A" }}
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
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.22) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.045,
          animation: "grid-drift 28s linear infinite",
        }}
      />

      {/* ── Ambient glow orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div style={{
          position: "absolute", top: "-20%", right: "-8%",
          width: "750px", height: "750px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,98,45,0.18) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", bottom: "0%", left: "-20%",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(242,169,0,0.05) 0%, transparent 65%)",
        }} />
      </div>

      <div className="absolute inset-0 noise-texture opacity-[0.025] pointer-events-none select-none" />

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
                color: "#FFFFFF",
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
              <a
                href="#work"
                className="inline-flex items-center font-semibold transition-all duration-200"
                style={{
                  height: "52px", padding: "0 32px",
                  background: "#C4622D", color: "#FFFFFF",
                  borderRadius: "9999px", fontSize: "15px",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#A8521F"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#C4622D"; }}
              >
                View my work
              </a>
              <Link
                href="/cv"
                className="inline-flex items-center font-medium transition-all duration-200"
                style={{
                  height: "52px", padding: "0 32px",
                  border: "1px solid rgba(255,255,255,0.15)", color: "#FFFFFF",
                  borderRadius: "9999px", fontSize: "15px",
                  background: "rgba(255,255,255,0.04)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
              >
                View CV
              </Link>
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
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 7l6 6 6-6" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
