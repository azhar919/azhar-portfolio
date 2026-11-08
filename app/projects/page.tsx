"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FloatingNav from "@/components/FloatingNav";
import ContactFooter from "@/components/ContactFooter";
import Motif from "@/components/Motif";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type ProjItem = { slug: string; href?: string; company: string; title: string; description: string };
const projects: ProjItem[] = [
  {
    slug: "life-healthcare",
    href: "/projects/life-healthcare",
    company: "Life Healthcare",
    title: "Website Redesign + Design System",
    description:
      "Reimagining South Africa's largest private-hospital website around the patient — and building the tokenised, accessible design system beneath it. Two case studies.",
  },
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
    company: "iqbusiness",
    title: "SharePoint Redesign",
    description:
      "Restructuring internal information architecture and redesigning the intranet experience for a large consulting firm.",
  },
];

function ProjectCard({ project, index }: { project: ProjItem; index: number }) {
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
        href={project.href ?? `/projects/${project.slug}`}
        className="group flex items-start justify-between transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "var(--radius-2xl)",
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
          <p className="eyebrow" style={{ color: "var(--teal)" }}>
            {project.company}
          </p>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {project.title}
          </h2>
          <p style={{ fontSize: "var(--text-ui)", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "640px" }}>
            {project.description}
          </p>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--gold)", marginTop: "8px" }}>
            View case study →
          </span>
        </div>
        <ArrowUpRight
          size={18}
          className="shrink-0 mt-1 ml-8"
          style={{ color: "rgba(255,255,255,0.55)" }}
        />
      </Link>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <FloatingNav />
      <div className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden flex flex-col justify-center" style={{ background: "#0B0A09", paddingTop: "100px", paddingBottom: "100px", minHeight: "340px" }}>
          <Motif variant="orbit" tone="duo" size={760} parallax={80} style={{ top: "-30%", right: "-8%" }} />

          <div className="page-container relative">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="eyebrow"
              style={{ color: "var(--teal)", marginBottom: "16px" }}
            >
              Selected Work
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              style={{ fontSize: "var(--text-h1)", fontWeight: 800, color: "#F5F1EC", lineHeight: 1.08, letterSpacing: "-0.04em" }}
            >
              Where complexity<br className="hidden md:block" /> becomes clarity
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              style={{ marginTop: "24px", fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: "520px" }}
            >
              Case studies in banking and enterprise design — simplifying what banks make complex.
            </motion.p>
          </div>
        </section>

        {/* ── Projects list ── */}
        <section className="relative overflow-hidden" style={{ background: "#110E0B", paddingTop: "80px", paddingBottom: "120px" }}>
          <Motif variant="constellation" tone="teal" size={560} parallax={55} style={{ bottom: "2%", left: "12%", opacity: 0.6 }} />
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
