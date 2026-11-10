"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import FloatingNav from "@/components/FloatingNav";
import ContactFooter from "@/components/ContactFooter";
import Motif from "@/components/Motif";
import { SHOW_LIFE_HEALTHCARE } from "@/lib/flags";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type ProjItem = { slug: string; href?: string; company: string; title: string; description: string };
const projects: ProjItem[] = [
  // Life Healthcare is held back until the live client site launches (see lib/flags).
  ...(SHOW_LIFE_HEALTHCARE
    ? [{
        slug: "life-healthcare",
        href: "/projects/life-healthcare",
        company: "Life Healthcare",
        title: "Website Redesign + Design System",
        description:
          "Reimagining South Africa's largest private-hospital website around the patient — and building the tokenised, accessible design system beneath it. Two case studies.",
      }]
    : []),
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
          background: "rgb(var(--ink-rgb) / calc(0.04 * var(--ink-k)))",
          border: "1px solid rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))",
          borderRadius: "var(--radius-2xl)",
          padding: "36px",
          display: "flex",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "rgb(var(--ink-rgb) / calc(0.07 * var(--ink-k)))";
          el.style.borderColor = "rgb(var(--ink-rgb) / calc(0.14 * var(--ink-k)))";
          el.style.transform = "translateY(-4px)";
          el.style.boxShadow = "0 24px 60px rgb(var(--shadow-rgb) / calc(0.45 * var(--shadow-k)))";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "rgb(var(--ink-rgb) / calc(0.04 * var(--ink-k)))";
          el.style.borderColor = "rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))";
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
        }}
      >
        <div className="flex flex-col gap-3" style={{ flex: 1 }}>
          <p className="eyebrow" style={{ color: "var(--teal)" }}>
            {project.company}
          </p>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--ink-strong)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {project.title}
          </h2>
          <p style={{ fontSize: "var(--text-ui)", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", lineHeight: 1.75, maxWidth: "640px" }}>
            {project.description}
          </p>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--gold)", marginTop: "8px" }}>
            View case study →
          </span>
        </div>
        <ArrowUpRight
          size={18}
          className="shrink-0 mt-1 ml-8"
          style={{ color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))" }}
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
        <section className="relative overflow-hidden flex flex-col justify-center" style={{ background: "var(--bg)", paddingTop: "100px", paddingBottom: "100px", minHeight: "340px" }}>
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
              style={{ fontSize: "var(--text-h1)", fontWeight: 800, color: "var(--ink)", lineHeight: 1.08, letterSpacing: "-0.04em" }}
            >
              Where complexity<br className="hidden md:block" /> becomes clarity
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              style={{ marginTop: "24px", fontSize: "var(--text-lg)", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", lineHeight: 1.65, maxWidth: "520px" }}
            >
              Case studies in banking and enterprise design — simplifying what banks make complex.
            </motion.p>
          </div>
        </section>

        {/* ── Projects list ── */}
        <section className="relative overflow-hidden" style={{ background: "var(--bg-alt)", paddingTop: "80px", paddingBottom: "120px" }}>
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
