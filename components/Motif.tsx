"use client";

import { useId, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/* ── Signature motif family ─────────────────────────────────────────
   Replaces the generic radial "glow-orbs" with custom geometric marks.
   One shared visual language — thin lines, the two brand accents
   (terracotta + teal), low opacity — expressed as several DIFFERENT
   forms so no single shape repeats across the site.

   variant: "orbit" | "grid" | "contour" | "hatch" | "arcs" | "constellation"
   tone:    "duo" | "gold" | "teal"   — which accents to draw
   size:    px diameter of the artwork
   spin:    slow rotation (orbit/arcs only look right spinning)
   wash:    faint warm radial behind for depth
   style/className: positioning from the parent (absolute, offsets, opacity)
──────────────────────────────────────────────────────────────────── */

type Tone = "duo" | "gold" | "teal";
type Variant = "orbit" | "grid" | "contour" | "hatch" | "arcs" | "constellation";

export default function Motif({
  variant = "orbit",
  tone = "duo",
  size = 560,
  spin,
  wash = true,
  parallax = 0,
  draw = false,
  style,
  className,
}: {
  variant?: Variant;
  tone?: Tone;
  size?: number;
  spin?: boolean;
  wash?: boolean;
  /** Vertical scroll-parallax travel in px (drifts as the section scrolls past). 0 = static position. */
  parallax?: number;
  /** Orbit only: rings draw themselves in on mount, then the nodes pop on. */
  draw?: boolean;
  style?: React.CSSProperties;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const py = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const gold = "rgb(var(--gold-rgb))";
  const teal = "rgb(var(--teal-rgb))";
  const a = tone === "teal" ? teal : gold;
  const b = tone === "gold" ? gold : teal;
  const drawIn = draw && !reduced;
  const doSpin = (spin ?? (variant === "orbit" || variant === "arcs" || variant === "constellation")) && !reduced;

  return (
    <motion.div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className ?? ""}`}
      style={{ position: "absolute", width: size, height: size, ...style, y: parallax && !reduced ? py : 0 }}
    >
      {wash && (
        <div
          style={{
            position: "absolute",
            inset: "8%",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgb(var(--gold-rgb) / 0.09) 0%, rgb(var(--teal-rgb) / 0.035) 42%, transparent 72%)`,
            filter: "blur(18px)",
          }}
        />
      )}
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        fill="none"
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "50% 50%",
          animation: doSpin ? `motif-spin ${variant === "arcs" ? 90 : variant === "constellation" ? 150 : 60}s linear infinite` : undefined,
        }}
      >
        <defs>
          <radialGradient id={`fade-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="62%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={`mask-${uid}`}>
            <rect width="200" height="200" fill={`url(#fade-${uid})`} />
          </mask>
        </defs>

        {variant === "orbit" && (
          <>
            {/* Rings: innermost first, each drawn as a stroke when `draw` is set */}
            {[
              { r: 24, c: b, o: 0.34, w: 0.8 },
              { r: 46, c: a, o: 0.26, w: 0.7 },
              { r: 70, c: b, o: 0.20, w: 0.6 },
              { r: 92, c: a, o: 0.16, w: 0.6 },
            ].map((ring, i) => (
              <motion.circle
                key={ring.r} cx="100" cy="100" r={ring.r} stroke={ring.c} strokeOpacity={ring.o} strokeWidth={ring.w}
                initial={drawIn ? { pathLength: 0, opacity: 0 } : false}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ pathLength: { duration: 1.5, delay: 0.15 + i * 0.22, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.2, delay: 0.15 + i * 0.22 } }}
              />
            ))}
            <motion.ellipse
              cx="100" cy="100" rx="92" ry="40" stroke={b} strokeOpacity="0.14" strokeWidth="0.6" transform="rotate(-24 100 100)"
              initial={drawIn ? { pathLength: 0, opacity: 0 } : false}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ pathLength: { duration: 1.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.2, delay: 0.9 } }}
            />
            {[
              { cx: 100, cy: 100, r: 2.2, c: a, o: 0.9 },
              { cx: 54, cy: 100, r: 1.4, c: a, o: 0.7 },
              { cx: 100, cy: 146, r: 1.6, c: b, o: 0.7 },
              { cx: 170, cy: 100, r: 1.8, c: b, o: 0.85 },
              { cx: 100, cy: 8, r: 2.4, c: a, o: 0.9 },
            ].map((n, i) => (
              <motion.circle
                key={i} cx={n.cx} cy={n.cy} r={n.r} fill={n.c} fillOpacity={n.o}
                initial={drawIn ? { scale: 0, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.5 + i * 0.26 }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            ))}
          </>
        )}

        {variant === "grid" && (
          <g mask={`url(#mask-${uid})`}>
            {Array.from({ length: 11 }, (_, i) => 20 + i * 16).map((v) => (
              <g key={v}>
                <line x1={v} y1="12" x2={v} y2="188" stroke={a} strokeOpacity="0.09" strokeWidth="0.5" />
                <line x1="12" y1={v} x2="188" y2={v} stroke={a} strokeOpacity="0.09" strokeWidth="0.5" />
              </g>
            ))}
            {/* a few lit intersections */}
            <circle cx="68" cy="84" r="1.8" fill={b} fillOpacity="0.9" />
            <circle cx="132" cy="116" r="1.8" fill={a} fillOpacity="0.9" />
            <circle cx="116" cy="52" r="1.3" fill={b} fillOpacity="0.7" />
            <rect x="60" y="76" width="16" height="16" stroke={b} strokeOpacity="0.4" strokeWidth="0.7" />
          </g>
        )}

        {variant === "contour" && (
          <g mask={`url(#mask-${uid})`}>
            {Array.from({ length: 7 }, (_, i) => 36 + i * 20).map((y, i) => (
              <path
                key={y}
                d={`M -6 ${y} C 40 ${y - 16}, 70 ${y + 18}, 104 ${y} S 168 ${y - 18}, 206 ${y + 8}`}
                stroke={i % 2 ? b : a}
                strokeOpacity={0.1 + (i % 2 ? 0.04 : 0.08)}
                strokeWidth="0.7"
              />
            ))}
            <circle cx="104" cy="96" r="2" fill={a} fillOpacity="0.9" />
          </g>
        )}

        {variant === "hatch" && (
          <g mask={`url(#mask-${uid})`}>
            {Array.from({ length: 18 }, (_, i) => -40 + i * 18).map((off, i) => (
              <line
                key={off}
                x1={off} y1="200" x2={off + 200} y2="0"
                stroke={i % 3 === 0 ? b : a}
                strokeOpacity={i % 3 === 0 ? 0.14 : 0.08}
                strokeWidth="0.6"
              />
            ))}
          </g>
        )}

        {variant === "arcs" && (
          <g>
            {[52, 86, 120, 154, 188].map((r, i) => (
              <circle key={r} cx="196" cy="8" r={r} stroke={i % 2 ? b : a} strokeOpacity={0.22 - i * 0.03} strokeWidth="0.7" />
            ))}
            <circle cx="196" cy="8" r="2.4" fill={a} fillOpacity="0.9" />
            <circle cx="120" cy="60" r="1.6" fill={b} fillOpacity="0.8" />
          </g>
        )}

        {variant === "constellation" && (
          <g mask={`url(#mask-${uid})`}>
            {/* connecting threads */}
            <path d="M34 60 L96 42 L150 78 L176 140 L112 150 L58 120 Z" stroke={a} strokeOpacity="0.1" strokeWidth="0.5" />
            <path d="M96 42 L112 150 M58 120 L150 78" stroke={b} strokeOpacity="0.08" strokeWidth="0.5" />
            {/* nodes — gently twinkle (staggered), like stars */}
            {[[34, 60, a, 2], [96, 42, b, 2.4], [150, 78, a, 1.8], [176, 140, b, 1.6], [112, 150, a, 2.2], [58, 120, b, 1.6]].map(
              ([x, y, c, r], i) => (
                <motion.circle
                  key={i}
                  cx={x as number}
                  cy={y as number}
                  r={r as number}
                  fill={c as string}
                  initial={{ opacity: 0.9 }}
                  animate={reduced ? { opacity: 0.9 } : { opacity: [0.9, 0.28, 0.9] }}
                  transition={reduced ? undefined : { duration: 2.6 + (i % 3) * 0.9, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: i * 0.5 }}
                />
              )
            )}
            {/* small plus marks */}
            {[[130, 40], [40, 150], [170, 100]].map(([x, y], i) => (
              <g key={`p${i}`} stroke={i % 2 ? b : a} strokeOpacity="0.5" strokeWidth="0.7">
                <line x1={(x as number) - 4} y1={y as number} x2={(x as number) + 4} y2={y as number} />
                <line x1={x as number} y1={(y as number) - 4} x2={x as number} y2={(y as number) + 4} />
              </g>
            ))}
          </g>
        )}
      </svg>
    </motion.div>
  );
}
