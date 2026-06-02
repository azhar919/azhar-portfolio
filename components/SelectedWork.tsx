"use client";

import { useState } from "react";
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
  { company: "Nedbank",     title: "Everyday Banking",    description: "Retail banking flows redesigned for millions of customers.", href: "/projects/everyday-banking" },
  { company: "IQ Business", title: "SharePoint Redesign", description: "Restructuring internal information architecture — from chaos to clarity.", href: "/projects/corporate-banking" },
  { company: "Nedbank",     title: "Africa Regions",      description: "Localising onboarding journeys across six African markets.", href: "/projects/africa-regions" },
];

function BrowserFrame({ image, url, title }: { image: string; url: string; title: string }) {
  return (
    <div style={{ borderRadius: "12px 12px 0 0", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", borderBottom: "none" }}>
      <div
        style={{
          height: "36px",
          background: "#1A1A1A",
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
      <div className="w-full relative overflow-hidden h-[180px] md:h-[220px] lg:h-[300px]" style={{ background: "#1A1A1A" }}>
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

function SecondaryCard({ project, index }: { project: typeof secondary[0]; index: number }) {
  const reveal =
    index === 0 ? { x: -120, y: 40, scale: 0.86, blur: 12 } :
    index === 2 ? { x: 120, y: 40, scale: 0.86, blur: 12 } :
    { y: 90, scale: 0.86, blur: 12 };
  const { ref, style } = useReveal(reveal);
  const { handlers, overlay } = useSpotlight({ radius: 300, color: "rgba(196,98,45,0.09)" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div ref={ref} style={{ ...style, height: "100%" }}>
      <Link
        href={project.href}
        className="group flex flex-col transition-all duration-300"
        style={{
          position: "relative",
          overflow: "hidden",
          height: "100%",
          minHeight: "190px",
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${hovered ? "rgba(196,98,45,0.3)" : "rgba(255,255,255,0.06)"}`,
          borderRadius: "16px",
          padding: "26px",
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.4)" : "none",
          transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        }}
        onMouseMove={handlers.onMouseMove}
        onMouseEnter={() => { setHovered(true); handlers.onMouseEnter(); }}
        onMouseLeave={() => { setHovered(false); handlers.onMouseLeave(); }}
      >
        {overlay}
        <div className="flex flex-col h-full" style={{ position: "relative", zIndex: 1 }}>
          <div className="flex items-start justify-between">
            <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#C4622D" }}>
              {project.company}
            </span>
            <motion.span animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
              <ArrowUpRight size={16} style={{ color: hovered ? "#C4622D" : "rgba(255,255,255,0.3)", transition: "color 0.3s" }} />
            </motion.span>
          </div>

          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.01em", marginTop: "12px", lineHeight: 1.25 }}>
            {project.title}
          </h3>
          <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginTop: "8px" }}>
            {project.description}
          </p>

          <motion.span
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.25, ease: EASE }}
            style={{ fontSize: "13px", fontWeight: 500, color: "#C4622D", marginTop: "auto", paddingTop: "16px" }}
          >
            View project →
          </motion.span>
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
      <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#FFFFFF" }}>
        Case studies
      </h2>
    </motion.div>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="relative overflow-hidden" style={{ background: "#111111", paddingTop: "120px", paddingBottom: "120px" }}>

      <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
        bottom: "-10%", left: "30%",
        width: "600px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,98,45,0.12) 0%, transparent 70%)",
      }} />

      <div className="page-container">

        <WorkHeading />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {featured.map((project, i) => (
            <FeaturedCard key={project.href} project={project} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {secondary.map((project, i) => (
            <SecondaryCard key={project.href} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
