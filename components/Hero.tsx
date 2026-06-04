"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import Button from "./Button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const HEADLINE = "Every interaction is a chance to be effortless";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentScale   = useTransform(scrollYProgress, [0, 0.5], [1, 0.82]);
  const contentY       = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  // ── Cursor / touch-following light (replaces the static dot grid) ──
  // Normalised 0–1 target; spring lag gives the light a trailing "comet" feel.
  const gx = useMotionValue(0.62);
  const gy = useMotionValue(0.38);
  // Snappy spring — tracks the cursor crisply (like the card spotlight),
  // while still smoothing the idle ambient drift on touch devices.
  const sgx = useSpring(gx, { stiffness: 260, damping: 32, mass: 0.5 });
  const sgy = useSpring(gy, { stiffness: 260, damping: 32, mass: 0.5 });
  const lastMove = useRef(0);

  const handlePointer = (e: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    gx.set((e.clientX - r.left) / r.width);
    gy.set((e.clientY - r.top) / r.height);
    lastMove.current = performance.now();
  };

  // Ambient drift — when there's no pointer activity (i.e. mobile/touch idle),
  // the light slowly roams a Lissajous path so the hero never feels dead.
  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const loop = () => {
      if (performance.now() - lastMove.current > 2200) {
        const t = performance.now() / 1000;
        gx.set(0.5 + Math.sin(t * 0.17) * 0.34);
        gy.set(0.42 + Math.cos(t * 0.12) * 0.28);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [gx, gy, reducedMotion]);

  // Gyroscope tilt — on touch devices the light tracks how the phone is
  // tilted (a touch-free "cursor"). iOS 13+ needs a one-time tap to grant
  // motion access; if unavailable/declined, the idle drift above stays.
  useEffect(() => {
    if (reducedMotion) return;
    const DOE = window.DeviceOrientationEvent as
      | (typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> })
      | undefined;
    if (!DOE) return;

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const nx = (clamp(e.gamma, -25, 25) + 25) / 50;        // left/right tilt
      const ny = (clamp(e.beta - 45, -25, 25) + 25) / 50;    // forward/back tilt
      gx.set(0.15 + nx * 0.7);
      gy.set(0.15 + ny * 0.7);
      lastMove.current = performance.now();
    };
    const start = () => window.addEventListener("deviceorientation", onOrient);

    if (typeof DOE.requestPermission === "function") {
      const ask = () => {
        DOE.requestPermission!()
          .then((s) => { if (s === "granted") start(); })
          .catch(() => {});
        window.removeEventListener("touchend", ask);
      };
      window.addEventListener("touchend", ask, { once: true });
      return () => {
        window.removeEventListener("touchend", ask);
        window.removeEventListener("deviceorientation", onOrient);
      };
    }
    start();
    return () => window.removeEventListener("deviceorientation", onOrient);
  }, [gx, gy, reducedMotion]);

  const glowX = useTransform(sgx, (v) => `${v * 100}%`);
  const glowY = useTransform(sgy, (v) => `${v * 100}%`);
  // Single subtle terracotta radial — same recipe as the card spotlight.
  const glowBg = useMotionTemplate`radial-gradient(380px circle at ${glowX} ${glowY}, rgb(var(--gold-rgb) / 0.14), transparent 65%)`;

  const words = HEADLINE.split(" ");

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointer}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* ── Cursor / touch-following light (roams on its own when idle) ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
        style={{ background: glowBg }}
      />

      {/* ── Ambient glow orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div style={{
          position: "absolute", top: "-20%", right: "-8%",
          width: "750px", height: "750px", borderRadius: "50%",
          background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.22) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", bottom: "0%", left: "-20%",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.08) 0%, transparent 65%)",
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
            className="flex flex-col gap-8 relative z-10"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ fontSize: "var(--text-label)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}
            >
              UX · UI · Design Operations
            </motion.p>

            {/* ── D: Word-by-word headline ── */}
            <h1
              style={{
                fontSize: "var(--text-hero)",
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
                color: "#F5F1EC",
                maxWidth: "720px",
              }}
            >
              {words.map((word, i) => {
                // Deterministic scatter so SSR and client match (no hydration mismatch)
                const rand = (n: number) => { const r = Math.sin(n * 99.73) * 43758.55; return r - Math.floor(r); };
                const sx = (rand(i + 1) - 0.5) * 220;
                const sy = (rand(i + 7) - 0.5) * 130;
                const sr = (rand(i + 13) - 0.5) * 50;
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: sx, y: sy, rotate: sr, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)" }}
                    transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.18 + i * 0.12 }}
                    style={{ display: "inline-block", marginRight: "0.28em" }}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05, ease: EASE }}
              style={{ fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: "520px" }}
            >
              Design focused on building intuitive systems, workflows, and interfaces that put people first.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.25, ease: EASE }}
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
        <span style={{ fontSize: "var(--text-micro)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Scroll</span>
        {/* Mouse-style cue with travelling dot */}
        <div style={{
          width: "22px", height: "34px", borderRadius: "var(--radius-pill)",
          border: "1.5px solid rgba(255,255,255,0.2)",
          display: "flex", justifyContent: "center", paddingTop: "6px",
        }}>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "4px", height: "8px", borderRadius: "var(--radius-pill)", background: "var(--gold)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
