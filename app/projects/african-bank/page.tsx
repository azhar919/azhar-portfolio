"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import FloatingNav from "@/components/FloatingNav";
import ContactFooter from "@/components/ContactFooter";
import Motif from "@/components/Motif";
import { useMorphSource } from "@/lib/viewTransition";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const subProjects = [
  {
    case: "website-redesign",
    title: "Website Redesign",
    image: "/images/ab-website-redesign.webp",
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
  const morph = useMorphSource("african-bank-" + project.case);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
    >
      <Link
        href={`/projects/african-bank/${project.case}`}
        onClick={morph.arm}
        data-cursor-label="View"
        className="group flex flex-col transition-all duration-300"
        style={{
          background: "rgb(var(--ink-rgb) / calc(0.04 * var(--ink-k)))",
          border: "1px solid rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          display: "flex",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = "rgb(var(--ink-rgb) / calc(0.16 * var(--ink-k)))";
          el.style.transform = "translateY(-6px)";
          el.style.boxShadow = "0 32px 80px rgb(var(--shadow-rgb) / calc(0.5 * var(--shadow-k)))";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.borderColor = "rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Image */}
        <div className="w-full relative overflow-hidden" style={{ aspectRatio: "16/9", background: "#1C1813", ...morph.style }}>
          <Image src={project.image} alt={project.title} fill style={{ objectFit: "cover" }} />
        </div>

        {/* Content */}
        <div className="flex items-start justify-between" style={{ padding: "28px", flex: 1 }}>
          <div className="flex flex-col gap-3" style={{ flex: 1 }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--ink-strong)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              {project.title}
            </h2>
            <p style={{ fontSize: "var(--text-sm)", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", lineHeight: 1.75 }}>
              {project.description}
            </p>
            <span style={{ fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--gold)", marginTop: "4px" }}>
              View case study →
            </span>
          </div>
          <ArrowUpRight size={16} className="shrink-0 mt-1 ml-4" style={{ color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))" }} />
        </div>
      </Link>
    </motion.div>
  );
}

export default function AfricanBankPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <FloatingNav />
      <div className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden flex flex-col justify-center" style={{ background: "var(--bg)", paddingTop: "100px", paddingBottom: "100px", minHeight: "320px" }}>
          <Motif variant="orbit" tone="duo" size={720} parallax={80} style={{ top: "-28%", right: "-8%" }} />

          <div className="page-container relative">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="eyebrow"
              style={{ color: "var(--teal)", marginBottom: "16px" }}
            >
              My Work
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              style={{ fontSize: "var(--text-h1)", fontWeight: 800, color: "var(--ink)", lineHeight: 1.08, letterSpacing: "-0.04em" }}
            >
              African Bank
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              style={{ marginTop: "24px", fontSize: "var(--text-lg)", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", lineHeight: 1.65, maxWidth: "480px" }}
            >
              Two case studies from redesigning the bank's digital presence and customer onboarding.
            </motion.p>
          </div>
        </section>

        {/* ── Case studies ── */}
        <section className="relative overflow-hidden" style={{ background: "var(--bg-alt)", paddingTop: "80px", paddingBottom: "120px" }}>
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
