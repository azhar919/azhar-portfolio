"use client";

import { Children, isValidElement, type CSSProperties, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE, SPRING } from "@/lib/motion";

/* ──────────────────────────────────────────────────────────────────
   Reveal system.

   Content enters ONCE as it scrolls into view and then stays put — no
   blur, no fading back out. Each kind of content has its own entrance
   so sections don't all move the same way:

     · RevealText      — headings: words rise out of a mask, in sequence
     · Reveal "rise"   — copy / generic blocks: short lift + fade
     · Reveal "pop"    — small tiles / logos: springy scale-in
     · Reveal "wipe"   — imagery: clip-path wipe from the bottom edge
     · Reveal "slide"  — horizontally-arranged items: slide in from the side
     · Stagger         — sequences a group of the above

   Reduced motion: MotionProvider sets reducedMotion="user", so transforms
   snap and only the opacity fade remains.
   ────────────────────────────────────────────────────────────────── */

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

export type RevealVariant = "rise" | "fade" | "pop" | "wipe" | "slide";

const VARIANTS: Record<RevealVariant, Variants> = {
  rise: {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  },
  pop: {
    hidden: { opacity: 0, scale: 0.9, y: 18 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", ...SPRING.gentle, opacity: { duration: 0.4 } } },
  },
  wipe: {
    // Negative insets on the open edges so shadows / tilt overflow aren't clipped.
    hidden: { opacity: 0, clipPath: "inset(100% -40% -40% -40%)", y: 28 },
    show: { opacity: 1, clipPath: "inset(-40% -40% -40% -40%)", y: 0, transition: { duration: 1, ease: EASE, opacity: { duration: 0.3 } } },
  },
  slide: {
    hidden: { opacity: 0, x: 48 },
    show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
  },
};

/** Adds a delay to a variant's `show` transition, including per-property overrides. */
function withDelay(v: Variants, delay: number): Variants {
  const show = v.show as { transition?: Record<string, unknown> } & Record<string, unknown>;
  const t = show.transition ?? {};
  const next: Record<string, unknown> = { ...t, delay };
  for (const [k, val] of Object.entries(t)) {
    if (val && typeof val === "object" && !Array.isArray(val)) next[k] = { ...(val as object), delay };
  }
  return { ...v, show: { ...show, transition: next } };
}

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  /** Seconds to wait after entering view. Ignored inside a <Stagger>. */
  delay?: number;
  /** Set when this sits inside a <Stagger> — the parent drives the timing. */
  item?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function Reveal({ children, variant = "rise", delay = 0, item = false, className, style }: RevealProps) {
  if (item) {
    return (
      <motion.div variants={VARIANTS[variant]} className={className} style={style}>
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      variants={delay ? withDelay(VARIANTS[variant], delay) : VARIANTS[variant]}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/** Sequences its <Reveal item> / <RevealText item> children as the group enters view. */
export function Stagger({
  children, gap = 0.09, delay = 0, className, style,
}: { children: ReactNode; gap?: number; delay?: number; className?: string; style?: CSSProperties }) {
  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Masked heading reveal ───────────────────────────────────────── */

const WORD: Variants = {
  hidden: { y: "108%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.85, ease: EASE, opacity: { duration: 0.25 } } },
};

// The mask is padded (and pulled back with negative margins) so descenders
// and tall ascenders aren't clipped by the overflow.
const MASK: CSSProperties = {
  display: "inline-block", overflow: "hidden", verticalAlign: "top",
  paddingTop: "0.1em", marginTop: "-0.1em", paddingBottom: "0.18em", marginBottom: "-0.18em",
};

type RevealTextProps = {
  /** Plain text is split into words; any element child is revealed as one unit. */
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  gap?: number;
  delay?: number;
  item?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function RevealText({ children, as = "h2", gap = 0.06, delay = 0, item = false, className, style }: RevealTextProps) {
  const tokens: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      String(child).split(/\s+/).filter(Boolean).forEach((w) => tokens.push(w));
    } else if (isValidElement(child)) {
      tokens.push(child);
    }
  });

  const Tag = motion[as];
  const orchestration: Variants = { hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } };

  return (
    <Tag
      variants={orchestration}
      {...(item ? {} : { initial: "hidden", whileInView: "show", viewport: VIEWPORT })}
      className={className}
      style={style}
    >
      {tokens.map((t, i) => (
        <span key={i}>
          <span style={MASK}>
            <motion.span variants={WORD} style={{ display: "inline-block" }}>{t}</motion.span>
          </span>
          {i < tokens.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
