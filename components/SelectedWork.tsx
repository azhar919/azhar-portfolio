"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const featured = [
  {
    company: "African Bank",
    title: "Website Redesign",
    description: "Rebuilding a fragmented digital banking platform into a cohesive, scalable experience.",
    image: "/images/african-bank-landing.png.png",
    url: "africanbank.co.za/digital",
    href: "/projects/african-bank/website-redesign",
  },
  {
    company: "Nedbank",
    title: "Everyday Banking",
    description: "Redesigning retail banking flows for millions of customers across web and mobile.",
    image: "/images/nedbank-dashboard.png.png",
    url: "nedbank.co.za/personal",
    href: "/projects/everyday-banking",
  },
];

const secondary = [
  { company: "African Bank", title: "Improved Onboarding",  href: "/projects/african-bank/onboarding" },
  { company: "IQ Business",  title: "SharePoint Redesign",  href: "/projects/corporate-banking" },
  { company: "Nedbank",      title: "Africa Regions",       href: "/projects/africa-regions" },
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

function FeaturedCard({ project }: { project: typeof featured[0] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.14, 0.78, 1], [0, 1, 1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.16, 0.78, 1], [0.78, 1, 1, 0.88]);
  const y       = useTransform(scrollYProgress, [0, 0.18, 1],        [100, 0, -60]);
  const blur    = useTransform(scrollYProgress, [0, 0.16],           ["blur(12px)", "blur(0px)"]);

  return (
    <motion.div ref={ref} style={{ opacity, scale, y, filter: blur }}>
      <Link
        href={project.href}
        className="group flex flex-col transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = "rgba(255,255,255,0.16)";
          el.style.transform = "translateY(-6px)";
          el.style.boxShadow = "0 32px 80px rgba(0,0,0,0.5)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = "rgba(255,255,255,0.08)";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
        }}
      >
        <BrowserFrame image={project.image} url={project.url} title={project.title} />
        <div className="flex flex-col gap-3" style={{ padding: "28px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}>
            {project.company}
          </p>
          <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {project.title}
          </h3>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            {project.description}
          </p>
          <span style={{ fontSize: "14px", fontWeight: 500, color: "#C4622D", marginTop: "4px" }}>
            View project →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function SecondaryCard({ project }: { project: typeof secondary[0] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.2, 1],         [50, 0, -30]);
  const scale   = useTransform(scrollYProgress, [0, 0.18, 0.82, 1],  [0.85, 1, 1, 0.9]);
  const blur    = useTransform(scrollYProgress, [0, 0.18],            ["blur(8px)", "blur(0px)"]);

  return (
    <motion.div ref={ref} style={{ opacity, y, scale, filter: blur }}>
      <Link
        href={project.href}
        className="group flex items-start justify-between transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px",
          padding: "22px",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "rgba(255,255,255,0.07)";
          el.style.borderColor = "rgba(255,255,255,0.12)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "rgba(255,255,255,0.04)";
          el.style.borderColor = "rgba(255,255,255,0.06)";
        }}
      >
        <div className="flex flex-col gap-1.5">
          <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}>
            {project.company}
          </span>
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#FFFFFF" }}>
            {project.title}
          </span>
        </div>
        <ArrowUpRight size={16} className="shrink-0 mt-1" style={{ color: "rgba(255,255,255,0.3)" }} />
      </Link>
    </motion.div>
  );
}

export default function SelectedWork() {
  const headingRef = useRef(null);
  const { scrollYProgress: headingProgress } = useScroll({ target: headingRef, offset: ["start end", "end start"] });
  const headingOpacity = useTransform(headingProgress, [0, 0.1, 0.75, 1], [0, 1, 1, 0]);
  const headingY       = useTransform(headingProgress, [0, 0.12, 1],       [60, 0, -40]);

  return (
    <section id="work" className="relative overflow-hidden" style={{ background: "#111111", paddingTop: "120px", paddingBottom: "120px" }}>

      <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
        bottom: "-10%", left: "30%",
        width: "600px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,98,45,0.06) 0%, transparent 70%)",
      }} />

      <div className="page-container">

        <motion.div
          ref={headingRef}
          style={{ opacity: headingOpacity, y: headingY }}
          className="flex flex-col gap-4 mb-16"
        >
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D" }}>
            Selected Work
          </p>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#FFFFFF" }}>
            Case studies
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {featured.map((project) => (
            <FeaturedCard key={project.href} project={project} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {secondary.map((project) => (
            <SecondaryCard key={project.href} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
