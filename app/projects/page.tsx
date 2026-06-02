"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FloatingNav from "@/components/FloatingNav";
import ContactFooter from "@/components/ContactFooter";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const projects = [
  {
    slug: "everyday-banking",
    company: "Nedbank",
    title: "Everyday Banking",
    description:
      "Redesigning retail banking flows for millions of customers across web and mobile — making daily banking feel simple and effortless.",
  },
  {
    slug: "business-banking",
    company: "Nedbank",
    title: "Corporate Banking",
    description:
      "Designing precision tools for corporate clients managing complex financial operations — built for scale, trust, and the power users who depend on it daily.",
  },
  {
    slug: "africa-regions",
    company: "Nedbank",
    title: "Africa Regions",
    description:
      "Adapting digital banking for six African markets — each with unique regulatory requirements, connectivity constraints, and customer expectations.",
  },
  {
    slug: "corporate-banking",
    company: "IQ Business",
    title: "SharePoint Redesign",
    description:
      "Restructuring internal information architecture and redesigning the intranet experience for a large consulting firm.",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: EASE }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex items-start justify-between transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "36px",
          display: "flex",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "rgba(255,255,255,0.07)";
          el.style.borderColor = "rgba(255,255,255,0.14)";
          el.style.transform = "translateY(-4px)";
          el.style.boxShadow = "0 24px 60px rgba(0,0,0,0.45)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "rgba(255,255,255,0.04)";
          el.style.borderColor = "rgba(255,255,255,0.08)";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
        }}
      >
        <div className="flex flex-col gap-3" style={{ flex: 1 }}>
          <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}>
            {project.company}
          </p>
          <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {project.title}
          </h3>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "640px" }}>
            {project.description}
          </p>
          <span style={{ fontSize: "14px", fontWeight: 500, color: "#C4622D", marginTop: "8px" }}>
            View case study →
          </span>
        </div>
        <ArrowUpRight
          size={18}
          className="shrink-0 mt-1 ml-8"
          style={{ color: "rgba(255,255,255,0.25)" }}
        />
      </Link>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <main>
      <FloatingNav />
      <div className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden flex flex-col justify-center" style={{ background: "#0B0A09", paddingTop: "100px", paddingBottom: "100px", minHeight: "340px" }}>
          <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
            top: "-20%", right: "-8%",
            width: "650px", height: "650px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,98,45,0.14) 0%, transparent 70%)",
          }} />

          <div className="page-container relative">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D", marginBottom: "16px" }}
            >
              Selected Work
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.08, letterSpacing: "-0.04em" }}
            >
              Where complexity<br className="hidden md:block" /> becomes clarity
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              style={{ marginTop: "24px", fontSize: "18px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: "520px" }}
            >
              Case studies in banking and enterprise design — simplifying what banks make complex.
            </motion.p>
          </div>
        </section>

        {/* ── Projects list ── */}
        <section className="relative overflow-hidden" style={{ background: "#110E0B", paddingTop: "80px", paddingBottom: "120px" }}>
          <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
            bottom: "5%", left: "15%",
            width: "500px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,98,45,0.05) 0%, transparent 70%)",
          }} />
          <div className="page-container relative">
            <div className="flex flex-col gap-4">
              {projects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        <ContactFooter />
      </div>
    </main>
  );
}
