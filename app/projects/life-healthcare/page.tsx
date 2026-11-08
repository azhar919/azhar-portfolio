"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import FloatingNav from "@/components/FloatingNav";
import ContactFooter from "@/components/ContactFooter";
import Motif from "@/components/Motif";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const subProjects = [
  {
    case: "website",
    title: "Website Redesign",
    image: "/images/lhc-website-cover.png",
    description:
      "Rebuilding South Africa's largest private-hospital website from an org-chart structure into a patient-first experience — search-led, mobile-first, and accessible by default.",
  },
  {
    case: "design-system",
    title: "Design System",
    image: "/images/lhc-ds-cover-v2.webp",
    description:
      "Turning a UI with four navies, six button styles and 118 contrast failures into a tokenised, accessible component library — the backbone the whole redesign is built on.",
  },
];

function CaseCard({ project, index }: { project: typeof subProjects[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
    >
      <Link
        href={`/projects/life-healthcare/${project.case}`}
        className="group flex flex-col transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          display: "flex",
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
        {/* Image */}
        <div className="w-full relative overflow-hidden" style={{ aspectRatio: "16/9", background: "#1C1813" }}>
          <Image src={project.image} alt={project.title} fill style={{ objectFit: "cover", objectPosition: "top" }} />
        </div>

        {/* Content */}
        <div className="flex items-start justify-between" style={{ padding: "28px", flex: 1 }}>
          <div className="flex flex-col gap-3" style={{ flex: 1 }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              {project.title}
            </h2>
            <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>
              {project.description}
            </p>
            <span style={{ fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--gold)", marginTop: "4px" }}>
              View case study →
            </span>
          </div>
          <ArrowUpRight size={16} className="shrink-0 mt-1 ml-4" style={{ color: "rgba(255,255,255,0.55)" }} />
        </div>
      </Link>
    </motion.div>
  );
}

export default function LifeHealthcarePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <FloatingNav />
      <div className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden flex flex-col justify-center" style={{ background: "#0B0A09", paddingTop: "100px", paddingBottom: "100px", minHeight: "320px" }}>
          <Motif variant="orbit" tone="duo" size={720} parallax={80} style={{ top: "-28%", right: "-8%" }} />

          <div className="page-container relative">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="eyebrow"
              style={{ color: "var(--teal)", marginBottom: "16px" }}
            >
              My Work · Bluegrass Digital
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              style={{ fontSize: "var(--text-h1)", fontWeight: 800, color: "#F5F1EC", lineHeight: 1.08, letterSpacing: "-0.04em" }}
            >
              Life Healthcare
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              style={{ marginTop: "24px", fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: "520px" }}
            >
              Two case studies from reimagining a hospital group's digital presence — the patient-first website, and the design system beneath it.
            </motion.p>
          </div>
        </section>

        {/* ── Case studies ── */}
        <section className="relative overflow-hidden" style={{ background: "#110E0B", paddingTop: "80px", paddingBottom: "120px" }}>
          <Motif variant="hatch" tone="teal" size={620} parallax={60} style={{ bottom: "0%", left: "16%", opacity: 0.6 }} />
          <div className="page-container relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {subProjects.map((project, i) => (
                <CaseCard key={project.case} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        <ContactFooter />
      </div>
    </main>
  );
}
