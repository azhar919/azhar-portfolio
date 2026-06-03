"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "./useReveal";
import { useSpotlight } from "./useSpotlight";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const featured = [
  {
    company: "African Bank",
    title: "Improved Onboarding",
    description: "Redesigning a high-friction onboarding journey into a streamlined, intuitive experience that guides users with clarity.",
    image: "/images/Step 3 - Personal details.png",
    url: "africanbank.co.za/apply",
    href: "/projects/african-bank/onboarding",
  },
  {
    company: "African Bank",
    title: "Website Redesign",
    description: "Rebuilding a fragmented digital banking platform into a cohesive, scalable experience.",
    image: "/images/african-bank-landing.png.png",
    url: "africanbank.co.za/digital",
    href: "/projects/african-bank/website-redesign",
  },
];

const secondary = [
  {
    company: "Nedbank",
    title: "Everyday Banking",
    description: "Simplifying personal banking onboarding into faster, clearer, more human journeys.",
    image: "/images/EDB_creditcard-27main Copy.jpg",
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
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "40%", height: "22px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "4px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", userSelect: "none" }}>{url}</span>
          </div>
        </div>
      </div>
      <div className="w-full relative overflow-hidden h-[180px] md:h-[220px] lg:h-[300px]" style={{ background: "#1C1813" }}>
        <Image src={image} alt={title} fill style={{ objectFit: "cover", objectPosition: "top left" }} />
      </div>
    </div>
  );
}

function FeaturedCard({ project, index }: { project: typeof featured[0]; index: number }) {
  const { ref, style } = useReveal({ x: index % 2 === 0 ? -120 : 120, y: 60, scale: 0.86, blur: 14 });
  const { handlers, overlay } = useSpotlight({ radius: 460, color: "rgba(196,98,45,0.1)" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div ref={ref} style={{ ...style, height: "100%" }}>
      <Link
        href={project.href}
        className="group flex flex-col h-full transition-all duration-300"
        style={{
          position: "relative",
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${hovered ? "rgba(196,98,45,0.3)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "16px",
          overflow: "hidden",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? "0 32px 80px rgba(0,0,0,0.5)" : "none",
          transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        }}
        onMouseMove={handlers.onMouseMove}
        onMouseEnter={() => { setHovered(true); handlers.onMouseEnter(); }}
        onMouseLeave={() => { setHovered(false); handlers.onMouseLeave(); }}
        onTouchStart={(e) => { setHovered(true); handlers.onTouchStart(e); }}
        onTouchMove={handlers.onTouchMove}
        onTouchEnd={() => { handlers.onTouchEnd(); setTimeout(() => setHovered(false), 900); }}
      >
        {overlay}
        <BrowserFrame image={project.image} url={project.url} title={project.title} />
        <div className="flex flex-col gap-3 flex-1" style={{ padding: "28px", position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}>
            {project.company}
          </p>
          <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {project.title}
          </h3>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            {project.description}
          </p>
          <span
            className="inline-flex items-center gap-1.5"
            style={{ fontSize: "14px", fontWeight: 500, color: "#C4622D", marginTop: "auto", paddingTop: "8px" }}
          >
            View project
            <span className="transition-transform duration-200 group-hover:translate-x-1" style={{ display: "inline-flex" }}>
              <ArrowUpRight size={15} />
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function WorkHeading() {
  const { ref, style } = useReveal({ y: 70, scale: 0.92, blur: 10 });
  return (
    <motion.div ref={ref} style={style} className="flex flex-col gap-4 mb-16">
      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D" }}>
        Selected Work
      </p>
      <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#F5F1EC" }}>
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
const mobileItems: MobileItem[] = [...featured, ...secondary];

function MobileWorkCard({ project }: { project: MobileItem }) {
  const { handlers, overlay } = useSpotlight({ radius: 360, color: "rgba(196,98,45,0.12)" });
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
          borderRadius: "16px",
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
          <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#C4622D" }}>
            {project.company}
          </p>
          <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {project.title}
          </h3>
          <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>
            {project.description}
          </p>
          <span className="inline-flex items-center gap-1.5" style={{ fontSize: "13.5px", fontWeight: 500, color: "#C4622D", marginTop: "auto", paddingTop: "10px" }}>
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
          <div key={project.href} style={{ flex: "0 0 82%", scrollSnapAlign: "start" }}>
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
              borderRadius: "9999px",
              background: i === active ? "#C4622D" : "rgba(255,255,255,0.22)",
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
    <section id="work" className="relative overflow-hidden" style={{ background: "#110E0B", paddingTop: "120px", paddingBottom: "120px" }}>

      <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
        bottom: "-10%", left: "30%",
        width: "600px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,98,45,0.12) 0%, transparent 70%)",
      }} />

      <div className="page-container">

        <WorkHeading />

        {/* Desktop: 2×2 grid of image cards */}
        <div className="hidden md:grid md:grid-cols-2 gap-5 mb-5">
          {featured.map((project, i) => (
            <FeaturedCard key={project.href} project={project} index={i} />
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-5">
          {secondary.map((project, i) => (
            <FeaturedCard key={project.href} project={project} index={i} />
          ))}
        </div>

        {/* Mobile: swipe carousel */}
        <MobileCarousel />

      </div>
    </section>
  );
}
