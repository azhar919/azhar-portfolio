"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useVelocity, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "./useReveal";
import { useSpotlight } from "./useSpotlight";
import Motif from "./Motif";
import { EASE, SPRING } from "@/lib/motion";
import { SHOW_LIFE_HEALTHCARE } from "@/lib/flags";

// Tiny dark placeholder — fades from the card's #1C1813 backing into the image.
const BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const lifeHealthcare = {
  company: "Life Healthcare",
  title: "Website Redesign + Design System",
  description: "Reimagining South Africa's largest private-hospital website around the patient — and building the tokenised, accessible design system beneath it.",
  image: "/images/lhc-website-cover.png",
  url: "lifehealthcare.co.za",
  href: "/projects/life-healthcare",
};

const featured = [
  {
    company: "African Bank",
    title: "Improved Onboarding",
    description: "Redesigning a high-friction onboarding journey into a streamlined, intuitive experience that guides users with clarity.",
    image: "/images/Step 3 - Personal details.webp",
    url: "africanbank.co.za/apply",
    href: "/projects/african-bank/onboarding",
  },
  {
    company: "African Bank",
    title: "Website Redesign",
    description: "Rebuilding a fragmented digital banking platform into a cohesive, scalable experience.",
    image: "/images/african-bank-landing.png.webp",
    url: "africanbank.co.za/digital",
    href: "/projects/african-bank/website-redesign",
  },
];

const secondary = [
  {
    company: "Nedbank",
    title: "Everyday Banking",
    description: "Simplifying personal banking onboarding into faster, clearer, more human journeys.",
    image: "/images/EDB_creditcard-27main Copy.webp",
    url: "nedbank.co.za/banking",
    href: "/projects/everyday-banking",
  },
  {
    company: "Nedbank",
    title: "Corporate Banking",
    description: "Designing high-stakes corporate banking tools for scale, precision, and trust.",
    image: "/images/nedbank-dashboard.png.png",
    url: "nedbank.co.za/business",
    href: "/projects/business-banking",
  },
];

// Life Healthcare is held back until the live client site launches (see lib/flags).
const workItems = SHOW_LIFE_HEALTHCARE
  ? [lifeHealthcare, ...featured, ...secondary]
  : [...featured, ...secondary];

function BrowserFrame({ image, url, title }: { image: string; url: string; title: string }) {
  return (
    <div style={{ borderRadius: "12px 12px 0 0", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", borderBottom: "none" }}>
      <div
        style={{
          height: "36px",
          background: "#1C1813",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
        }}
      >
        <div style={{ display: "flex", gap: "6px", alignItems: "center", marginRight: "12px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27C93F" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0, display: "flex", justifyContent: "center", padding: "0 8px" }}>
          <div
            style={{
              maxWidth: "100%", height: "22px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "4px",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0 12px", overflow: "hidden",
            }}
          >
            <span style={{ fontSize: "var(--text-label)", color: "rgba(255,255,255,0.55)", userSelect: "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{url}</span>
          </div>
        </div>
      </div>
      <div className="w-full relative overflow-hidden h-[180px] md:h-[220px] lg:h-[300px]" style={{ background: "#1C1813" }}>
        <Image src={image} alt={title} fill placeholder="blur" blurDataURL={BLUR} sizes="(max-width: 768px) 82vw, 50vw" style={{ objectFit: "cover", objectPosition: "top left" }} />
      </div>
    </div>
  );
}

// ── Desktop: editorial index with a cursor-following preview ──────────────
function WorkIndex() {
  const [hover, setHover] = useState<number | null>(null);
  const [shown, setShown] = useState<string>(workItems[0].image ?? "");
  const items: MobileItem[] = workItems;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING.snappy);
  const sy = useSpring(my, SPRING.snappy);

  // Scroll-velocity skew — the whole index leans with scroll speed, settling
  // when you stop. Applied to the rows only (not the fixed preview).
  const { scrollY } = useScroll();
  const scrollVel = useVelocity(scrollY);
  const skewRaw = useTransform(scrollVel, [-2600, 0, 2600], [-3.2, 0, 3.2], { clamp: true });
  const skewY = useSpring(skewRaw, { stiffness: 220, damping: 40, mass: 0.6 });

  const onMove = (e: React.MouseEvent) => {
    // keep the preview on-screen near the right edge
    const nearRight = e.clientX > window.innerWidth - 400;
    mx.set(nearRight ? e.clientX - 372 : e.clientX + 28);
    my.set(e.clientY - 112);
  };

  return (
    <div onMouseMove={onMove} style={{ position: "relative", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <motion.div style={{ skewY }}>
      {items.map((p, i) => {
        const dim = hover !== null && hover !== i;
        const on = hover === i;
        return (
          <Link
            key={p.href}
            href={p.href}
            onMouseEnter={() => { setHover(i); if (p.image) setShown(p.image); }}
            onMouseLeave={() => setHover(null)}
            className="group"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px",
              padding: "clamp(22px, 2.6vw, 34px) 8px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              opacity: dim ? 0.4 : 1, transition: "opacity 0.35s ease",
            }}
          >
            <div className="flex items-baseline" style={{ gap: "clamp(16px, 2.6vw, 40px)" }}>
              <span aria-hidden="true" style={{
                fontSize: "clamp(20px, 1.9vw, 28px)", fontWeight: 800, color: "transparent",
                WebkitTextStroke: `1.2px rgb(var(--teal-rgb) / ${on ? 0.9 : 0.5})`,
                fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em",
                transition: "-webkit-text-stroke-color 0.3s",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col" style={{ gap: "7px" }}>
                <span className="eyebrow" style={{ color: "var(--teal)" }}>
                  {p.company}
                </span>
                <h3 style={{
                  fontSize: "clamp(25px, 3.3vw, 46px)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.025em",
                  color: on ? "#FFFFFF" : "#F5F1EC",
                  transform: on ? "translateX(10px)" : "translateX(0)",
                  transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), color 0.3s",
                }}>
                  {p.title}
                </h3>
              </div>
            </div>
            <span className="inline-flex items-center shrink-0" style={{ gap: "10px", color: on ? "var(--gold)" : "rgba(255,255,255,0.45)", fontSize: "var(--text-sm)", fontWeight: 500, transition: "color 0.3s" }}>
              <span className="hidden lg:inline">View</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ display: "inline-flex" }}>
                <ArrowUpRight size={20} />
              </span>
            </span>
          </Link>
        );
      })}
      </motion.div>

      {/* Floating preview — follows the cursor, fades with hover */}
      <motion.div
        aria-hidden="true"
        className="hidden lg:block"
        style={{ position: "fixed", left: sx, top: sy, zIndex: 40, pointerEvents: "none", width: "344px" }}
        animate={{ opacity: hover !== null ? 1 : 0, scale: hover !== null ? 1 : 0.92 }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 30px 70px rgba(0,0,0,0.6)", aspectRatio: "16/10", background: "#1C1813" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shown} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left" }} />
        </div>
      </motion.div>
    </div>
  );
}

function WorkHeading() {
  const { ref, style } = useReveal({ y: 70, scale: 0.92, blur: 10 });
  return (
    <motion.div ref={ref} style={style} className="flex flex-col gap-4 mb-16">
      <p className="eyebrow" style={{ color: "var(--teal)" }}>
        Selected Work
      </p>
      <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#F5F1EC" }}>
        Case studies
      </h2>
    </motion.div>
  );
}

// ── Mobile-only ──────────────────────────────────────────────────────────
type MobileItem = {
  company: string; title: string; description: string; href: string;
  image?: string; url?: string;
};
const mobileItems: MobileItem[] = workItems;

function MobileWorkCard({ project }: { project: MobileItem }) {
  const { handlers, overlay } = useSpotlight({ radius: 360, color: "rgb(var(--gold-rgb) / 0.12)" });
  // Scroll-linked reveal: rises + sharpens on the way in, recedes on the way out.
  const { ref, style } = useReveal({ y: 90, scale: 0.82, blur: 14 });
  return (
    <motion.div ref={ref} style={{ ...style, height: "100%" }}>
      <Link
        href={project.href}
        className="group flex flex-col h-full"
        style={{
          position: "relative",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
        }}
        onTouchStart={handlers.onTouchStart}
        onTouchMove={handlers.onTouchMove}
        onTouchEnd={handlers.onTouchEnd}
      >
        {overlay}
        {project.image && project.url && (
          <BrowserFrame image={project.image} url={project.url} title={project.title} />
        )}
        <div className="flex flex-col gap-2.5 flex-1" style={{ padding: "22px", position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "var(--text-label)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--teal)" }}>
            {project.company}
          </p>
          <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {project.title}
          </h3>
          <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>
            {project.description}
          </p>
          <span className="inline-flex items-center gap-1.5" style={{ fontSize: "13.5px", fontWeight: 500, color: "var(--gold)", marginTop: "auto", paddingTop: "10px" }}>
            View project
            <ArrowUpRight size={15} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function MobileCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = scrollerRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const itemWidth = first.offsetWidth + 14; // card width + gap
    setActive(Math.max(0, Math.min(mobileItems.length - 1, Math.round(el.scrollLeft / itemWidth))));
  };

  return (
    <div className="md:hidden">
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="-mx-5 px-5"
        style={{
          display: "flex",
          gap: "14px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: "20px",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {mobileItems.map((project) => (
          <div key={project.href} style={{ flex: "0 0 82%", scrollSnapAlign: "start", scrollSnapStop: "always" }}>
            <MobileWorkCard project={project} />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {mobileItems.map((_, i) => (
          <span
            key={i}
            style={{
              width: i === active ? "20px" : "7px",
              height: "7px",
              borderRadius: "var(--radius-pill)",
              background: i === active ? "var(--gold)" : "rgba(255,255,255,0.22)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="relative overflow-hidden" style={{ background: "#0B0A09", paddingTop: "120px", paddingBottom: "120px" }}>

      <Motif variant="constellation" tone="teal" size={620} parallax={55} style={{ bottom: "-16%", left: "22%" }} />

      <div className="page-container">

        <WorkHeading />

        {/* Desktop: editorial index with cursor-following preview */}
        <div className="hidden md:block">
          <WorkIndex />
        </div>

        {/* Mobile: swipe carousel */}
        <MobileCarousel />

      </div>
    </section>
  );
}
