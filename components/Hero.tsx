"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, useReducedMotion, type MotionValue } from "framer-motion";
import { ArrowRight, FileText } from "@/components/icons";
import Button from "./Button";
import Motif from "./Motif";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const HEADLINE = "Every interaction is a chance to be effortless";

/* One parallax layer of the hero: holds its position, travels `depth` px over the
   hero's scroll (negative = rises faster than the page, positive = lags behind),
   and plays its entrance inside so the two motions never fight. */
function Layer({ progress, depth, delay, spring, style, children }: {
  progress: MotionValue<number>; depth: number; delay: number; spring?: boolean; style?: React.CSSProperties; children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : depth]);
  return (
    <motion.div style={{ ...style, y }}>
      <motion.div
        initial={spring ? { opacity: 0, y: 22, scale: 0.9 } : { opacity: 0, y: 24 }}
        animate={spring ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0 }}
        transition={spring ? { type: "spring", stiffness: 160, damping: 18, delay } : { duration: 0.7, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* Floating design artifacts — abstract proof of craft on the hero's right side.
   Type tile, palette, a button component and a control, drifting over the motif. */
function HeroArtifacts({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const float = (dur: number, delay: number) => ({
    animate: reduce ? {} : { y: [0, -10, 0] },
    transition: { duration: dur, repeat: reduce ? 0 : Infinity, ease: "easeInOut" as const, delay },
  });
  const card: React.CSSProperties = {
    background: "rgb(var(--ink-rgb) / calc(0.05 * var(--ink-k)))", border: "1px solid rgb(var(--ink-rgb) / calc(0.1 * var(--ink-k)))",
    borderRadius: "16px", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 24px 60px rgb(var(--shadow-rgb) / calc(0.5 * var(--shadow-k)))",
  };
  return (
    <div aria-hidden="true" className="hidden lg:block absolute inset-0 pointer-events-none select-none" style={{ zIndex: 5 }}>
      {/* Type tile */}
      <Layer progress={progress} depth={-150} delay={0.6} style={{ position: "absolute", top: "19%", right: "25%", rotate: "-5deg" }}>
        <motion.div {...float(7, 0)} style={{ ...card, padding: "20px 28px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "48px", fontWeight: 800, color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.03em" }}>Aa</div>
          <div style={{ fontSize: "10.5px", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", marginTop: "9px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Bricolage · Display</div>
        </motion.div>
      </Layer>

      {/* Control / toggle */}
      <Layer progress={progress} depth={-320} delay={0.76} style={{ position: "absolute", top: "30%", right: "5%", rotate: "6deg" }}>
        <motion.div {...float(7.5, 0.5)} style={{ ...card, padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: "40px", height: "23px", borderRadius: "9999px", background: "var(--teal)", position: "relative", flexShrink: 0 }}>
            <span style={{ position: "absolute", top: "3px", right: "3px", width: "17px", height: "17px", borderRadius: "50%", background: "#fff" }} />
          </span>
          <span style={{ fontSize: "12px", color: "rgb(var(--ink-rgb) / calc(0.7 * var(--ink-k)))", fontWeight: 500 }}>Accessible</span>
        </motion.div>
      </Layer>

      {/* Palette */}
      <Layer progress={progress} depth={70} delay={0.9} style={{ position: "absolute", top: "46%", right: "11%", rotate: "4deg" }}>
        <motion.div {...float(8, 0.3)} style={{ ...card, padding: "15px 17px", display: "flex", flexDirection: "column", gap: "11px" }}>
          <span style={{ fontSize: "10px", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", letterSpacing: "0.1em", textTransform: "uppercase" }}>Palette</span>
          <div style={{ display: "flex", gap: "7px" }}>
            {["var(--gold)", "var(--gold-light)", "var(--teal)", "#F5F1EC", "#161210"].map((c) => (
              <span key={c} style={{ width: "22px", height: "22px", borderRadius: "50%", background: c, border: "1px solid rgb(var(--ink-rgb) / calc(0.12 * var(--ink-k)))" }} />
            ))}
          </div>
        </motion.div>
      </Layer>

      {/* Button component */}
      <Layer progress={progress} depth={-230} delay={1.04} style={{ position: "absolute", top: "63%", right: "27%" }}>
        <motion.div {...float(6.5, 0.2)} style={{ ...card, padding: "16px 18px", display: "flex", flexDirection: "column", gap: "11px", alignItems: "flex-start" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--gold-dark)", color: "#fff", fontWeight: 600, fontSize: "13px", borderRadius: "9999px", padding: "9px 17px" }}>Get started <ArrowRight size={14} /></span>
          <span style={{ fontSize: "10px", color: "rgb(var(--ink-rgb) / calc(0.45 * var(--ink-k)))", letterSpacing: "0.08em", textTransform: "uppercase" }}>Button · Primary</span>
        </motion.div>
      </Layer>
    </div>
  );
}

/* Mobile / tablet take on the artifacts: the same pieces of craft as a compact,
   gently drifting cluster under the CTAs (the desktop scatter needs the room
   a wide hero has). */
function HeroArtifactsCompact({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const card: React.CSSProperties = {
    background: "rgb(var(--ink-rgb) / calc(0.05 * var(--ink-k)))", border: "1px solid rgb(var(--ink-rgb) / calc(0.1 * var(--ink-k)))",
    borderRadius: "14px", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 18px 40px rgb(var(--shadow-rgb) / calc(0.45 * var(--shadow-k)))",
  };
  const drift = (dur: number, delay: number) => ({
    animate: reduce ? {} : { y: [0, -7, 0] },
    transition: { duration: dur, repeat: reduce ? 0 : Infinity, ease: "easeInOut" as const, delay },
  });
  return (
    <div aria-hidden="true" className="lg:hidden flex items-center select-none pointer-events-none" style={{ gap: "12px", paddingTop: "14px", flexWrap: "wrap" }}>
      <Layer spring progress={progress} depth={-10} delay={1.35} style={{ rotate: "-5deg" }}>
        <motion.div {...drift(6.5, 0)} style={{ ...card, padding: "12px 16px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 800, color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.03em" }}>Aa</div>
          <div style={{ fontSize: "8.5px", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", marginTop: "6px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Bricolage</div>
        </motion.div>
      </Layer>
      <Layer spring progress={progress} depth={-30} delay={1.47} style={{ rotate: "3deg" }}>
        <motion.div {...drift(7.5, 0.4)} style={{ ...card, padding: "11px 13px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: "8.5px", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", letterSpacing: "0.1em", textTransform: "uppercase" }}>Palette</span>
          <div style={{ display: "flex", gap: "5px" }}>
            {["var(--gold)", "var(--gold-light)", "var(--teal)", "var(--ink)"].map((c) => (
              <span key={c} style={{ width: "16px", height: "16px", borderRadius: "50%", background: c, border: "1px solid rgb(var(--ink-rgb) / calc(0.12 * var(--ink-k)))" }} />
            ))}
          </div>
        </motion.div>
      </Layer>
      <Layer spring progress={progress} depth={-50} delay={1.59} style={{ rotate: "-2deg" }}>
        <motion.div {...drift(7, 0.2)} style={{ ...card, padding: "11px 13px", display: "flex", alignItems: "center", gap: "9px" }}>
          <span style={{ width: "32px", height: "19px", borderRadius: "9999px", background: "var(--teal)", position: "relative", flexShrink: 0 }}>
            <motion.span
              animate={reduce ? {} : { x: [0, -13, -13, 0, 0] }}
              transition={{ duration: 5, times: [0, 0.08, 0.5, 0.58, 1], repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
              style={{ position: "absolute", top: "3px", right: "3px", width: "13px", height: "13px", borderRadius: "50%", background: "#fff" }}
            />
          </span>
          <span style={{ fontSize: "11px", color: "rgb(var(--ink-rgb) / calc(0.7 * var(--ink-k)))", fontWeight: 500 }}>Accessible</span>
        </motion.div>
      </Layer>
    </div>
  );
}

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

      {/* ── Signature motif (orbit = the hero's signature; other sections use
            different variants from the same family so nothing repeats) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <Motif variant="orbit" tone="duo" size={840} parallax={90} draw style={{ top: "-16%", right: "-14%" }} />
      </div>

      {/* ── Floating design artifacts (right side) ── */}
      <HeroArtifacts progress={scrollYProgress} />

      <div className="absolute inset-0 noise-texture opacity-[0.025] pointer-events-none select-none" />

      {/* Vignette — darkens edges for depth and focus */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none"
        style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 55%, var(--vignette) 100%)" }}
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
              className="eyebrow"
              style={{ color: "var(--teal)" }}
            >
              UX · UI · Design Operations
            </motion.p>

            {/* ── D: Word-by-word headline ── */}
            <h1
              style={{
                fontSize: "var(--text-hero)",
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                maxWidth: "720px",
              }}
            >
              {words.map((word, i) => {
                // Deterministic scatter so SSR and client match (no hydration mismatch)
                const rand = (n: number) => { const r = Math.sin(n * 99.73) * 43758.55; return r - Math.floor(r); };
                const sx = (rand(i + 1) - 0.5) * 220;
                const sy = (rand(i + 7) - 0.5) * 130;
                const sr = (rand(i + 13) - 0.5) * 50;
                const isAccent = i === words.length - 1; // "effortless"
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: sx, y: sy, rotate: sr, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)" }}
                    transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.18 + i * 0.12 }}
                    className={isAccent ? "accent-serif" : undefined}
                    style={{
                      display: "inline-block",
                      marginRight: "0.28em",
                      ...(isAccent
                        ? { color: "var(--teal)", letterSpacing: "-0.01em", fontWeight: 500, paddingRight: "0.06em" }
                        : null),
                    }}
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
              style={{ fontSize: "var(--text-lg)", color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))", lineHeight: 1.7, maxWidth: "520px" }}
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

            <HeroArtifactsCompact progress={scrollYProgress} />
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
        <span style={{ fontSize: "var(--text-micro)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))" }}>Scroll</span>
        {/* Journey-thread cue — a node travels down a gradient line (echoes the journey motif) */}
        <div style={{ position: "relative", width: "2px", height: "56px", borderRadius: "2px", background: "linear-gradient(180deg, rgb(var(--ink-rgb) / calc(0.22 * var(--ink-k))) 0%, rgb(var(--ink-rgb) / calc(0.02 * var(--ink-k))) 100%)" }}>
          <motion.div
            animate={{ y: [-2, 50, -2], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", left: "50%", top: 0, marginLeft: "-3.5px",
              width: "7px", height: "7px", borderRadius: "50%",
              background: "var(--gold)", boxShadow: "0 0 10px rgb(var(--gold-rgb) / 0.8)",
            }}
          />
          {/* teal waypoint at the end of the thread */}
          <span aria-hidden="true" style={{ position: "absolute", left: "50%", bottom: "-3px", marginLeft: "-2.5px", width: "5px", height: "5px", borderRadius: "50%", background: "var(--teal)", boxShadow: "0 0 8px rgb(var(--teal-rgb) / 0.7)" }} />
        </div>
      </motion.div>
    </section>
  );
}
