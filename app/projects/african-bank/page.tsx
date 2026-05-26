"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import FloatingNav from "@/components/FloatingNav";
import ContactFooter from "@/components/ContactFooter";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const subProjects = [
  {
    case: "website-redesign",
    title: "Website Redesign",
    image: "/images/ab-website-redesign.png",
    description:
      "Rebuilding a fragmented website and online banking platform into a cohesive, structured, and scalable digital experience — establishing the bank's first unified design system.",
  },
  {
    case: "onboarding",
    title: "An Improved Onboarding",
    image: "/images/ab-onboarding.png",
    description:
      "Redesigning the customer onboarding journey to reduce friction, cut unnecessary steps, and deliver a faster, cleaner, more human experience that converts.",
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
        href={`/projects/african-bank/${project.case}`}
        className="group flex flex-col transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
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
        <div className="w-full relative overflow-hidden" style={{ aspectRatio: "16/9", background: "#1A1A1A" }}>
          <Image src={project.image} alt={project.title} fill style={{ objectFit: "cover" }} />
        </div>

        {/* Content */}
        <div className="flex items-start justify-between" style={{ padding: "28px", flex: 1 }}>
          <div className="flex flex-col gap-3" style={{ flex: 1 }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              {project.title}
            </h3>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>
              {project.description}
            </p>
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#C4622D", marginTop: "4px" }}>
              View case study →
            </span>
          </div>
          <ArrowUpRight size={16} className="shrink-0 mt-1 ml-4" style={{ color: "rgba(255,255,255,0.3)" }} />
        </div>
      </Link>
    </motion.div>
  );
}

export default function AfricanBankPage() {
  return (
    <main>
      <FloatingNav />
      <div className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden flex flex-col justify-center" style={{ background: "#0A0A0A", paddingTop: "100px", paddingBottom: "100px", minHeight: "320px" }}>
          <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
            top: "-20%", right: "-8%",
            width: "600px", height: "600px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,98,45,0.14) 0%, transparent 70%)",
          }} />

          <div className="page-container relative">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D", marginBottom: "16px" }}
            >
              My Work
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.08, letterSpacing: "-0.04em" }}
            >
              African Bank
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              style={{ marginTop: "24px", fontSize: "18px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: "480px" }}
            >
              Two case studies from redesigning the bank's digital presence and customer onboarding.
            </motion.p>
          </div>
        </section>

        {/* ── Case studies ── */}
        <section className="relative overflow-hidden" style={{ background: "#111111", paddingTop: "80px", paddingBottom: "120px" }}>
          <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
            bottom: "5%", left: "20%",
            width: "500px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,98,45,0.05) 0%, transparent 70%)",
          }} />
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
