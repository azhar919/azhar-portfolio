"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import { ChevronDown, Mail, Building2, PenTool, Sparkles, Layers, GraduationCap, Award, BookOpen, TrendingUp, Users, AtSign, Download, Briefcase, type Icon as LucideIcon } from "@/components/icons";
import Motif from "@/components/Motif";

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import Image from "next/image";
import FloatingNav from "@/components/FloatingNav";
import ContactFooter from "@/components/ContactFooter";
import Button from "@/components/Button";
import { useSpotlight } from "@/components/useSpotlight";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function AnimatedBlock({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Sidebar inline list — dot-separated; each item stays unbreakable, the
   line wraps only at the separators ── */
function InlineItems({ items }: { items: string[] }) {
  return (
    <p style={{ fontSize: 13, color: "rgb(var(--ink-rgb) / calc(0.68 * var(--ink-k)))", lineHeight: 1.75, margin: 0 }}>
      {items.map((it, i) => (
        <span key={it}>
          {i > 0 && <span style={{ color: "rgb(var(--ink-rgb) / calc(0.22 * var(--ink-k)))" }}> · </span>}
          <span style={{ whiteSpace: "nowrap" }}>{it}</span>
        </span>
      ))}
    </p>
  );
}

/* ── Sidebar grouped list — a small teal sub-label over each inline group,
   so a long list reads as structure instead of a chip cloud ── */
function GroupedList({ groups }: { groups: { label: string; items: string[] }[] }) {
  return (
    <div className="flex flex-col" style={{ gap: 15 }}>
      {groups.map(g => (
        <div key={g.label}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgb(var(--teal-rgb) / 0.85)", margin: "0 0 6px" }}>
            {g.label}
          </p>
          <InlineItems items={g.items} />
        </div>
      ))}
    </div>
  );
}

/* ── iqbusiness brand mark — just the gradient "iq" glyph lifted from the full
   logo lockup, so it reads cleanly as a square brand tile ── */
function IqMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={(size * 100) / 148} height={size} viewBox="0 0 100 148" fill="none" aria-hidden="true">
      <path d="M96.9659 61.7089C94.5977 43.7742 79.2665 29.889 60.7569 29.889C40.6131 29.889 24.2224 46.3303 24.2224 66.5364C24.2224 86.7426 40.6131 103.184 60.7569 103.184C68.2148 103.184 75.1533 100.926 80.9354 97.0644V147.993L97.4091 125.349V66.8004C97.4091 64.8277 97.1114 63.5774 96.9659 61.702V61.7089ZM60.75 86.6662C49.6844 86.6662 40.6893 77.6363 40.6893 66.5434C40.6893 55.4505 49.6913 46.4206 60.75 46.4206C71.8087 46.4206 80.8107 55.4505 80.8107 66.5434C80.8107 77.6363 71.8087 86.6662 60.75 86.6662ZM0 11.0443C0 4.9456 4.93035 0 11.0102 0C17.09 0 22.0204 4.9456 22.0204 11.0443C22.0204 17.1429 17.09 22.0885 11.0102 22.0885C4.93035 22.0885 0 17.1429 0 11.0443ZM43.2652 102.962H35.3642C17.3947 102.962 2.77679 88.2985 2.77679 70.2734V30.6808H19.3821V66.5434C19.3821 70.3359 19.8045 74.6356 20.7324 78.3031C24.3402 89.8891 32.719 98.2522 43.2722 102.962H43.2652Z" fill="url(#iqmark)" />
      <defs>
        <linearGradient id="iqmark" x1="48.7011" y1="148" x2="48.7011" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0.04" stopColor="#1CB0DF" />
          <stop offset="0.35" stopColor="#B330E0" />
          <stop offset="0.71" stopColor="#DE229A" />
          <stop offset="1" stopColor="#E88751" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Employment timeline — LinkedIn-style: one employer, a promotion ladder on
   a connected rail, current role marked in gold ── */
function EmploymentTimeline() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
        <span style={{ width: 40, height: 40, borderRadius: 10, background: "rgb(var(--ink-rgb) / calc(0.05 * var(--ink-k)))", border: "1px solid rgb(var(--ink-rgb) / calc(0.09 * var(--ink-k)))", display: "grid", placeItems: "center", flexShrink: 0 }}>
          <IqMark size={23} />
        </span>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink-strong)", margin: 0, letterSpacing: "-0.01em" }}>{employment.company}</p>
          <p style={{ fontSize: 12, color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", margin: "2px 0 0" }}>{employment.meta}</p>
        </div>
      </div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {employment.roles.map((r, i) => {
          const last = i === employment.roles.length - 1;
          const current = i === 0;
          return (
            <li key={r.title} style={{ position: "relative", paddingLeft: 22, paddingBottom: last ? 0 : 16 }}>
              {!last && (
                <span aria-hidden="true" style={{ position: "absolute", left: 4, top: 13, bottom: -1, width: 1.5, background: "rgb(var(--ink-rgb) / calc(0.12 * var(--ink-k)))" }} />
              )}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute", left: 0, top: 4, width: 9, height: 9, borderRadius: "50%",
                  background: current ? "var(--gold)" : "#2a2622",
                  border: current ? "none" : "1.5px solid rgb(var(--ink-rgb) / calc(0.28 * var(--ink-k)))",
                  boxShadow: current ? "0 0 0 3px rgb(var(--gold-rgb) / 0.18)" : "none",
                }}
              />
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", margin: 0, lineHeight: 1.35 }}>{r.title}</p>
              <p style={{ fontSize: 12, color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", margin: "2px 0 0" }}>{r.period}{r.duration ? ` · ${r.duration}` : ""}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const bio = "With 6 years of experience, Azhar utilises his Design Thinking expertise supplemented with the power of AI to design and develop client-centric solutions in Retail and Corporate Investment Banking. He has taken on roles such as UX, UI, and Design Lead across various projects, working on a wide range of products, including Personal Banking, Value-Added Services, Staff Servicing, Product Maintenance, and Business Banking platforms.";

const industries = ["Healthcare", "Banking", "Consulting"];

const toolkitGroups = [
  { label: "Design", items: ["Figma", "Sketch", "Adobe XD", "Invision"] },
  { label: "Research", items: ["Maze", "Miro"] },
  { label: "Delivery", items: ["Jira", "Zoom", "Microsoft Office"] },
];

const aiTools = ["Claude", "Claude Code", "ChatGPT", "Gemini", "GitHub Copilot", "Microsoft Copilot"];

const skillGroups = [
  { label: "Craft", items: ["UX Design", "UI Design", "Information Architecture", "Wireframing", "Prototyping"] },
  { label: "Research", items: ["User Research", "Customer Journey Mapping", "Usability Testing", "Concept Validation"] },
  { label: "Systems & delivery", items: ["Design systems", "Agile", "Quality assurance", "Problem Solving"] },
  { label: "Collaboration", items: ["Leadership", "Communication", "Presentation skills", "Conflict management", "Critical thinking", "Time management", "Working under pressure", "Working remotely"] },
];

const roles = [
  "Product Designer",
  "UX Training Facilitator",
  "Experience Innovation team leader",
  "CHOC Leadership/Chairperson",
];

/* ── Employment & promotions (from LinkedIn) — a single employer with a title
   ladder. The clients (Nedbank, African Bank, Life Healthcare) live in the
   left-column project timeline; this is the actual employment record. ── */
const employment = {
  company: "iqbusiness South Africa",
  meta: "Full-time · 6 yrs 10 mos",
  roles: [
    { title: "Manager", period: "Oct 2026 – Present", duration: "" },
    { title: "Senior Principal Consultant", period: "Mar 2024 – Oct 2026", duration: "2 yrs 8 mos" },
    { title: "Principal Consultant", period: "Dec 2021 – Mar 2024", duration: "2 yrs 4 mos" },
    { title: "Senior Associate Consultant", period: "Feb 2021 – Dec 2021", duration: "11 mos" },
    { title: "Associate Consultant", period: "Jan 2020 – Feb 2021", duration: "1 yr 2 mos" },
  ],
};

const education = [
  {
    institution: "University of Johannesburg",
    qualification: "B.Com Information and Business Management",
    year: "2016 – 2020",
  },
];

const certifications = [
  { name: "Strive for Leadership — Duke's Fuqua School of Business", year: "01/2026" },
  { name: "Certified Usability Analyst — Human Factors International", year: "11/2022" },
  { name: "SQL Database Administrative Fundamentals", year: "09/2020" },
  { name: "ICAgileCertified Professional", year: "04/2020" },
  { name: "CCP — Certified Process Professional", year: "12/2021" },
  { name: "Agile methods for UX Design — Interaction Design Foundation", year: "" },
];

const training = [
  { name: "BA Bootcamp Lite", year: "11/2020" },
  { name: "UX Bootcamp", year: "05/2020" },
  { name: "Microsoft Excel — Beginner to Advanced", year: "04/2020" },
  { name: "Microsoft Smart Selling", year: "12/2020" },
  { name: "Design Thinking Fundamentals", year: "08/2021" },
];

const currentDevelopment = ["Figma — Advanced Course"];

type TimelineProject = {
  title: string;
  overview: string;
  bullets: string[];
};

type TimelineGroup = {
  company: string;
  dateRange: string;
  role: string;
  logo: string;
  logoBg: string;
  projects: TimelineProject[];
};

const experienceTimeline: TimelineGroup[] = [
  {
    company: "Life Healthcare",
    dateRange: "2026 — Present",
    role: "Design Lead",
    logo: "/images/lhc-logo-navy.svg",
    logoBg: "#F4ECDE",
    projects: [
      {
        title: "Website Redesign",
        overview: "At Bluegrass Digital, led the end-to-end redesign of Life Healthcare's website — South Africa's largest private-hospital group. Restructured a site built around the company's org chart into a patient-first experience organised around four core jobs: find a hospital, find a doctor, plan a hospital visit, and get in touch.",
        bullets: [
          "Ran the full UX audit — heuristic review, a machine-verified WCAG 2.1 AA scan, and an information-architecture review across the core patient journeys",
          "Reframed the IA around patient mental models, replacing a 947-link find-a-doctor page with a single search and filterable results",
          "Designed find-a-hospital around a map with \"near me\", built mobile-first for the 76% of traffic on mobile",
          "Directed the UI across every core flow — homepage, search, and hospital and doctor profiles",
        ],
      },
      {
        title: "Design System",
        overview: "Built the tokenised, accessible component library beneath the redesign — turning a UI with four navies, six button styles and ~118 contrast failures into a single themed system that lets the whole team build on-grid.",
        bullets: [
          "Defined semantic colour tokens, a single Helvetica Neue type ramp, and one spacing and radius scale",
          "Built a card family (doctor, hospital, metric, information) and a library of 129 ready-made blocks",
          "Established the Rows & Blocks layout contract so any page assembles from the system without breaking the grid",
          "Closed the ~118 contrast failures at the source by making accessibility a property of the tokens",
        ],
      },
    ],
  },
  {
    company: "African Bank",
    dateRange: "2024 — Feb 2026",
    role: "Design Lead",
    logo: "/images/African Bank logo black.png",
    logoBg: "#F5F1EC",
    projects: [
      {
        title: "Re-imagined Onboarding",
        overview: "Led a comprehensive redesign of African Bank's onboarding experience across web, mobile, app, and WhatsApp. Prior to the redesign, the process suffered from a high drop-off rate, with users citing its length, complexity, and inconsistency. The initiative also resulted in the development of a new enterprise-wide design system.",
        bullets: [
          "Managed end-to-end product development timelines and delivery processes",
          "Redesigned the onboarding flow, reducing friction and improving user retention",
          "Created wireframes, prototypes, and provided strategic UI design direction",
          "Facilitated comprehensive user testing sessions and synthesised findings",
        ],
      },
      {
        title: "Design Operations",
        overview: "Developed a comprehensive strategy to establish a structured Design Operation at African Bank, addressing misalignments and inconsistent user experiences across Personal and Business Banking. The initiative introduced unified design principles, dedicated product squads, and iterative design practices.",
        bullets: [
          "Developed a design operations strategy organising squads across Personal and Business Banking",
          "Defined core UX and UI principles to guide the transition to structured design operations",
          "Established a centralised design library overseen by a dedicated team",
          "Promoted consistency and collaboration across all design functions",
        ],
      },
      {
        title: "African Bank Design System",
        overview: "Led the introduction of a comprehensive design system to harmonise user experiences across all channels and product offerings. Previously, banking teams operated in silos, resulting in significant inconsistencies across onboarding flows, maintenance platforms, and the bank's website.",
        bullets: [
          "Led the UI team in identifying, building, and testing a comprehensive component library",
          "Established design patterns for common screens across diverse workflows",
          "Upheld quality standards and best practices throughout component development",
          "Facilitated library rollout and implementation across multiple product teams",
        ],
      },
      {
        title: "Project Helix",
        overview: "Redesigned African Bank's digital onboarding experience for Business Loans and overhauled the associated maintenance platform, which was previously outdated and unintuitive. Delivered a streamlined digital solution that improved accessibility and user engagement.",
        bullets: [
          "Led the design team across both onboarding experience and maintenance platform",
          "Developed low- and high-fidelity wireframes and prototypes to industry standards",
          "Conducted thorough user testing to gather feedback and refine the design",
          "Delivered a seamless onboarding experience with consistent UI and functionality",
        ],
      },
      {
        title: "Project Springboard",
        overview: "Led the design of African Bank's online business banking platform, enabling clients to manage accounts, transactions, inventory, and payroll. A high-priority initiative to retain existing business clients and establish a competitive digital presence.",
        bullets: [
          "Researched business banking platform features including bulk and batch payment flows",
          "Designed and prototyped high-fidelity wireframes compliant with UX standards",
          "Facilitated user testing sessions with business clients to refine platform usability",
          "Enhanced user experience and optimised platform functionality across key workflows",
        ],
      },
      {
        title: "Business Banking Website",
        overview: "Led the complete redesign of African Bank's Business Banking website — covering Bank, Borrow, Invest, Insure, and Contact Us pages. Transformed a confusing, inconsistent, and dated design within a high-pressure environment, delivering results in under two months.",
        bullets: [
          "Established a structured UX practice using design thinking methodologies",
          "Created wireframes, prototypes, and reusable design library components",
          "Devised strategic timelines and content strategies aligned with project objectives",
          "Conducted in-person user testing at each phase to iteratively refine the design",
        ],
      },
    ],
  },
  {
    company: "iqbusiness",
    dateRange: "2023 — 2024",
    role: "Senior Principal Consultant",
    logo: "/images/iqbusiness logo (FC) black.png",
    logoBg: "#F5F1EC",
    projects: [
      {
        title: "iqbusiness SharePoint",
        overview: "iqbusiness required a redesign of their existing SharePoint site. As the business grew, the volume of information increased — resulting in a cluttered, maze-like structure that made it extremely difficult to locate relevant information and documentation.",
        bullets: [
          "Led squad organisation and managed project timelines throughout the engagement",
          "Conducted heuristic evaluations and mapped the full existing information architecture",
          "Performed card-sorting exercises with users across different roles to surface mental models",
          "Collaborated with the Knowledge Management Lead to review and validate each iteration",
        ],
      },
    ],
  },
  {
    company: "Nedbank",
    dateRange: "2018 — 2023",
    role: "Product Designer",
    logo: "/images/Nedbank Logo.png",
    logoBg: "#005944",
    projects: [
      {
        title: "Corporate Investment Banking / Core Banking",
        overview: "Core banking encompasses numerous products across various teams. Many onboarding and servicing flows contained design flaws impacting user experience and adoption rates. Analysed existing designs and implemented improvements across Current Accounts, PayShap, NetBank Business Apply, Call Investment, Term Deposit, and GAP Access.",
        bullets: [
          "Conducted heuristic evaluations across multiple core banking product flows",
          "Collaborated with Business Analysts to align on design objectives and requirements",
          "Produced low- and high-fidelity wireframes and a fully functional prototype for developers",
          "Made critical decisions on design direction and component selection as the sole designer",
        ],
      },
      {
        title: "Corporate Investment Banking / Global — Maintenance",
        overview: "Nedbank needed a fully redesigned platform to digitise the maintenance process for their Global Transactional Banking product, previously managed manually through a relationship manager. The redesign also addressed entry points and integration with other Nedbank Business Hub services.",
        bullets: [
          "Liaised with Business Analysts and collaborated closely with the CX team",
          "Designed low- and high-fidelity wireframes for the maintenance platform",
          "Delivered a full working prototype ready for development handoff",
          "Made design direction decisions and element selections as the sole designer",
        ],
      },
      {
        title: "Corporate Investment Banking / Global — Onboarding",
        overview: "Designed the onboarding journeys for Nedbank's Global Transactional Banking and Global Documentary Trade products, which were previously handled through a fully manual process. Also delivered design enhancements for BPM process screens.",
        bullets: [
          "Liaised with Business Analysts and the CX team to align on design requirements",
          "Designed low- and high-fidelity wireframes for end-to-end onboarding journeys",
          "Made design direction decisions for Global Transactional Banking and Documentary Trade",
          "Enhanced BPM process screens to streamline workflows and improve usability",
        ],
      },
      {
        title: "Nedbank Africa Regions",
        overview: "Nedbank required a new digital design of their onboarding process for Transactional products and Personal Loans across Namibia, Zimbabwe, Lesotho, and Eswatini — addressing both front-end and back-end requirements.",
        bullets: [
          "Liaised with Business Analysts to understand regional regulatory requirements",
          "Designed low- and high-fidelity wireframes for onboarding across four African markets",
          "Adapted designs to accommodate both front-end and back-end technical requirements per region",
        ],
      },
      {
        title: "Staff Servicing",
        overview: "Nedbank required new designs for new features applicable to the back-end staff servicing platform.",
        bullets: [
          "Collaborated with Business Analysts to gather feature requirements",
          "Designed low- and high-fidelity wireframes for the staff servicing platform",
        ],
      },
      {
        title: "Nedbank Business Banking App Suite",
        overview: "Nedbank required a new login process for their Business Banking Suite App to integrate login with a user's NedID as well as Profile username and password.",
        bullets: [
          "Liaised with Business Analysts to define login integration requirements",
          "Designed wireframes for the NedID and profile-based login integration flows",
        ],
      },
      {
        title: "Everyday Banking",
        overview: "Nedbank required a redesign of their onboarding process for Everyday Banking products, with the primary objective of cross-selling within the client journey. Spanning 52 design flows across Transactional Products, Personal Loans, Credit Cards, Overdraft, Professional Banking, American Express, and Business Banking Products.",
        bullets: [
          "Coordinated across Business Analysts, Credit Risk, Marketing, Legal, and Research teams",
          "Designed 52 onboarding flows covering the full Everyday Banking product suite",
          "Delivered low- and high-fidelity wireframes across all product categories",
          "Led user testing sessions and analysed findings to iteratively refine the experience",
        ],
      },
    ],
  },
];

/* ── Accordion item ────────────────────────────────────────── */
function AccordionItem({
  project,
  isOpen,
  onToggle,
  forceOpen = false,
}: {
  project: TimelineProject;
  isOpen: boolean;
  onToggle: () => void;
  forceOpen?: boolean;
}) {
  const { handlers, overlay } = useSpotlight({ radius: 360, color: "rgb(var(--gold-rgb) / 0.08)" });
  const open = isOpen || forceOpen;
  return (
    <div style={{ marginBottom: 10 }}>
      <button
        onClick={onToggle}
        {...handlers}
        className="w-full flex justify-between items-center border-0 text-left transition-colors duration-200"
        style={{
          position: "relative",
          overflow: "hidden",
          gap: 16,
          background: open ? "rgb(var(--ink-rgb) / calc(0.07 * var(--ink-k)))" : "rgb(var(--ink-rgb) / calc(0.04 * var(--ink-k)))",
          borderRadius: open ? "12px 12px 0 0" : 12,
          borderLeft: `2px solid ${open ? "var(--gold)" : "transparent"}`,
          padding: "20px 24px",
          cursor: "pointer",
          transition: "background 0.2s, border-color 0.2s",
        }}
      >
        {overlay}
        <span className="relative z-10" style={{ flex: 1, minWidth: 0, fontSize: 15, fontWeight: 600, color: open ? "var(--ink)" : "var(--ink-strong)", letterSpacing: "-0.01em" }}>{project.title}</span>
        <ChevronDown
          size={16}
          color={open ? "var(--gold)" : "rgb(var(--ink-rgb) / calc(0.35 * var(--ink-k)))"}
          className="relative z-10"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s, color 0.2s", flexShrink: 0 }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={forceOpen ? false : { height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{
              overflow: "hidden",
              background: "rgb(var(--ink-rgb) / calc(0.04 * var(--ink-k)))",
              borderRadius: "0 0 12px 12px",
              borderTop: "1px solid rgb(var(--ink-rgb) / calc(0.05 * var(--ink-k)))",
              borderLeft: "2px solid var(--gold)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ padding: "4px 28px 26px" }}
            >
              <p className="eyebrow" style={{ color: "var(--teal)", marginTop: 20, marginBottom: 10 }}>
                Project Overview
              </p>
              <p style={{ fontSize: 13.5, color: "rgb(var(--ink-rgb) / calc(0.58 * var(--ink-k)))", lineHeight: 1.8, margin: 0 }}>
                {project.overview}
              </p>
              <p className="eyebrow" style={{ color: "var(--teal)", marginTop: 22, marginBottom: 12 }}>
                Key Contributions
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {project.bullets.map((bullet, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: i < project.bullets.length - 1 ? 10 : 0 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", marginTop: "0.6em", flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, color: "rgb(var(--ink-rgb) / calc(0.58 * var(--ink-k)))", lineHeight: 1.8 }}>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Company group ─────────────────────────────────────────── */
function CompanyGroup({ group, forceOpen = false }: { group: TimelineGroup; forceOpen?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <div style={{ marginBottom: 16, minHeight: 48, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>
            {group.company}
          </h3>
          <span style={{
            fontSize: 11, fontWeight: 600, color: "var(--gold)", letterSpacing: "0.02em",
            border: "1px solid rgb(var(--gold-rgb) / 0.3)", background: "rgb(var(--gold-rgb) / 0.1)",
            borderRadius: 9999, padding: "3px 11px", whiteSpace: "nowrap",
          }}>
            {group.dateRange}
          </span>
        </div>
        <p style={{ fontSize: 13, color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", marginTop: 5, marginBottom: 0 }}>
          {group.role}
          <span style={{ color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))" }}> · {group.projects.length} project{group.projects.length > 1 ? "s" : ""}</span>
        </p>
      </div>
      <div>
        {group.projects.map((project, index) => (
          <AccordionItem
            key={project.title}
            project={project}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            forceOpen={forceOpen}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Experience timeline with scroll-filled rail ───────────── */
function ExperienceTimeline({ forceOpen = false }: { forceOpen?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* rail track */}
      <div aria-hidden="true" className="cv-rail" style={{ position: "absolute", left: "31px", top: "14px", bottom: "14px", width: "2px", background: "rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))" }} />
      {/* rail fill — grows with scroll */}
      <motion.div aria-hidden="true" className="cv-rail" style={{ position: "absolute", left: "31px", top: "14px", bottom: "14px", width: "2px", background: "linear-gradient(to bottom, var(--teal-light), var(--teal), var(--teal-dark))", transformOrigin: "top", scaleY: fill, boxShadow: "0 0 8px rgb(var(--teal-rgb) / 0.55)" }} />

      {experienceTimeline.map((group, gi) => (
        <AnimatedBlock key={`${group.company}-${gi}`} delay={gi * 0.05}>
          <div className="cv-tl-item" style={{ position: "relative", paddingLeft: "88px", paddingBottom: gi < experienceTimeline.length - 1 ? "48px" : "0" }}>
            {/* logo node on the rail */}
            <div className="cv-tl-node" style={{
              position: "absolute", left: 0, top: 0,
              width: "64px", height: "48px", borderRadius: "13px",
              background: group.logoBg, display: "grid", placeItems: "center",
              border: "1px solid rgb(var(--ink-rgb) / calc(0.14 * var(--ink-k)))", overflow: "hidden",
              zIndex: 1, boxShadow: "0 6px 20px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={group.logo} alt={group.company} style={{ maxWidth: "76%", maxHeight: "60%", objectFit: "contain", display: "block" }} />
            </div>
            <CompanyGroup group={group} forceOpen={forceOpen} />
          </div>
        </AnimatedBlock>
      ))}
    </div>
  );
}

/* ── Sidebar section ───────────────────────────────────────── */
function SidebarSection({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgb(var(--ink-rgb) / calc(0.04 * var(--ink-k)))" : "rgb(var(--ink-rgb) / calc(0.02 * var(--ink-k)))",
        border: `1px solid ${hovered ? "rgb(var(--gold-rgb) / 0.25)" : "rgb(var(--ink-rgb) / calc(0.06 * var(--ink-k)))"}`,
        borderRadius: 16,
        padding: "20px 22px",
        transition: "background 0.25s, border-color 0.25s",
      }}
    >
      <h2
        className="eyebrow eyebrow-row"
        style={{
          color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))",
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: "1px solid rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))",
        }}
      >
        <Icon size={14} color="var(--teal)" />
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ── Count-up stat ─────────────────────────────────────────── */
function HeroStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) { setN(0); return; }
    const duration = 1300;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <span style={{ fontSize: 30, fontWeight: 800, color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
        {n}{suffix}
      </span>
      <span style={{ fontSize: 12, color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))", marginTop: 6 }}>{label}</span>
    </div>
  );
}

const totalProjects = experienceTimeline.reduce((a, g) => a + g.projects.length, 0);
const heroStats = [
  { value: 6, suffix: "+", label: "Years experience" },
  { value: experienceTimeline.length, suffix: "", label: "Clients" },
  { value: totalProjects, suffix: "", label: "Projects shipped" },
];

/* ── Hero photo: rotating arc + 3D tilt ────────────────────── */
function CVPhoto() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 25 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="shrink-0"
      style={{ perspective: "900px" }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} onMouseMove={onMove} onMouseLeave={reset}>
        <div style={{ position: "relative", borderRadius: 22, padding: 2 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, borderRadius: 22,
              background: "conic-gradient(rgb(var(--gold-rgb) / 0.75) 0deg, rgb(var(--gold-rgb) / 0.12) 55deg, transparent 95deg, transparent 360deg)",
            }}
          />
          <div className="relative overflow-hidden" style={{ width: 200, height: 200, borderRadius: 20, border: "1px solid rgb(var(--ink-rgb) / calc(0.1 * var(--ink-k)))" }}>
            <Image src="/images/profile.webp" alt="Azhar Mohamed" fill className="object-cover" priority />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function CVPage() {
  const heroSpot = useSpotlight({ radius: 520, color: "rgb(var(--gold-rgb) / 0.08)" });
  const [exporting, setExporting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (exporting) return;
    setExporting(true);
    const SCALE = 3;
    try {
      // Make sure the web fonts are loaded before capture, otherwise html2canvas
      // falls back to a default font and the text renders squished/mismeasured.
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      // Let accordions expand and the export styles apply before capturing.
      await new Promise(r => setTimeout(r, 300));

      const el = contentRef.current;
      if (!el) return;
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(el, {
        scale: SCALE,
        backgroundColor: "var(--bg)",
        useCORS: true,
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
      });
      const w = canvas.width / SCALE;
      const h = canvas.height / SCALE;
      const pdf = new jsPDF({ orientation: w > h ? "landscape" : "portrait", unit: "px", format: [w, h], compress: true });
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, w, h, undefined, "FAST");
      pdf.save("Azhar-Mohamed-CV.pdf");
    } catch (err) {
      console.error("PDF export failed", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <main id="main-content" tabIndex={-1} style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <FloatingNav />
      <div className="pt-[72px]">
       <div ref={contentRef} className={exporting ? "cv-exporting" : undefined}>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden" style={{ background: "var(--bg)", paddingTop: "72px", paddingBottom: "72px" }} {...heroSpot.handlers}>

          {heroSpot.overlay}

          {/* Signature motif */}
          <Motif variant="orbit" tone="duo" size={640} parallax={70} style={{ top: "-18%", right: "-7%" }} />

          <div className="page-container">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start relative z-10">

              {/* Profile photo — rotating arc + 3D tilt */}
              <CVPhoto />

              {/* Text */}
              <div className="flex flex-col gap-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="eyebrow"
                  style={{ color: "var(--teal)" }}
                >
                  Portfolio · CV
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.06, ease: EASE }}
                  style={{ fontSize: "var(--text-h2)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", color: "var(--ink)", margin: 0 }}
                >
                  Azhar Mohamed
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
                  style={{ fontSize: 15, fontWeight: 500, color: "var(--gold)" }}
                >
                  Senior Product Designer
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
                  style={{ fontSize: 14, color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", lineHeight: 1.75, maxWidth: 560 }}
                >
                  {bio}
                </motion.p>

                {!exporting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
                    className="flex gap-3 flex-wrap pt-1"
                  >
                    <Button href="mailto:Azhar919@gmail.com" external variant="primary" size="sm" icon={<Mail size={14} />} iconPosition="left">
                      Get in touch
                    </Button>
                    <Button href="https://www.linkedin.com/in/azhar-mohamed-3624491a3" external variant="secondary" size="sm" icon={<LinkedinIcon size={14} />} iconPosition="left">
                      LinkedIn
                    </Button>
                    <Button variant="secondary" size="sm" icon={<Download size={14} />} iconPosition="left" onClick={handleDownload}>
                      Download PDF
                    </Button>
                  </motion.div>
                )}

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.34, ease: EASE }}
                  className="flex gap-10 pt-4"
                >
                  {heroStats.map((s) => (
                    <HeroStat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Main grid ── */}
        <section style={{ background: "var(--bg)", paddingTop: "64px", paddingBottom: "96px" }}>
          <div className="page-container">
            <div className="flex flex-col md:flex-row gap-y-14 md:gap-x-16 items-start">

              {/* ── Left — Project experience ── */}
              <div className="flex-1 min-w-0 flex flex-col">

                <AnimatedBlock className="mb-10">
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--ink-strong)", letterSpacing: "-0.02em", paddingBottom: 16, borderBottom: "1px solid rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))", margin: 0 }}>
                    Project experience
                  </h2>
                </AnimatedBlock>

                <ExperienceTimeline forceOpen={exporting} />
              </div>

              {/* ── Right — Sidebar ── */}
              <div className="w-full md:w-[340px] shrink-0 flex flex-col gap-5">

                <AnimatedBlock delay={0.06}>
                  <SidebarSection title="Experience" icon={Briefcase}>
                    <EmploymentTimeline />
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.08}>
                  <SidebarSection title="Industries" icon={Building2}>
                    <ul className="flex flex-col gap-2">
                      {industries.map(item => (
                        <li key={item} style={{ fontSize: 13, color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))" }}>{item}</li>
                      ))}
                    </ul>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.1}>
                  <SidebarSection title="Toolkit" icon={PenTool}>
                    <GroupedList groups={toolkitGroups} />
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.11}>
                  <SidebarSection title="AI Tools" icon={Sparkles}>
                    <InlineItems items={aiTools} />
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.12}>
                  <SidebarSection title="Skills" icon={Layers}>
                    <GroupedList groups={skillGroups} />
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.14}>
                  <SidebarSection title="Education" icon={GraduationCap}>
                    {education.map(edu => (
                      <div key={edu.institution} className="flex flex-col gap-1">
                        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-strong)", margin: 0 }}>{edu.institution}</p>
                        <p style={{ fontSize: 13, color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))", margin: 0 }}>{edu.qualification}</p>
                        <p style={{ fontSize: 12, color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))", margin: 0 }}>{edu.year}</p>
                      </div>
                    ))}
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.16}>
                  <SidebarSection title="Certifications" icon={Award}>
                    <ul className="flex flex-col gap-3">
                      {certifications.map(cert => (
                        <li key={cert.name} className="flex flex-col gap-0.5">
                          <span style={{ fontSize: 13, color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))", lineHeight: 1.5 }}>{cert.name}</span>
                          {cert.year && <span style={{ fontSize: 12, color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))" }}>{cert.year}</span>}
                        </li>
                      ))}
                    </ul>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.18}>
                  <SidebarSection title="Training" icon={BookOpen}>
                    <ul className="flex flex-col gap-3">
                      {training.map(item => (
                        <li key={item.name} className="flex flex-col gap-0.5">
                          <span style={{ fontSize: 13, color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))" }}>{item.name}</span>
                          <span style={{ fontSize: 12, color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))" }}>{item.year}</span>
                        </li>
                      ))}
                    </ul>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.2}>
                  <SidebarSection title="Current Development" icon={TrendingUp}>
                    <ul className="flex flex-col gap-2">
                      {currentDevelopment.map(item => (
                        <li key={item} style={{ fontSize: 13, color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))" }}>{item}</li>
                      ))}
                    </ul>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.22}>
                  <SidebarSection title="Roles" icon={Users}>
                    <ul className="flex flex-col gap-2">
                      {roles.map(role => (
                        <li key={role} style={{ fontSize: 13, color: "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))" }}>{role}</li>
                      ))}
                    </ul>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.24}>
                  <SidebarSection title="Online Profile" icon={AtSign}>
                    <div className="flex flex-col gap-2">
                      <a
                        href="mailto:Azhar919@gmail.com"
                        className="transition-colors duration-200"
                        style={{ fontSize: 13, color: "var(--gold)" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold-dark)")}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)")}
                      >
                        Azhar919@gmail.com
                      </a>
                      <a
                        href="https://www.linkedin.com/in/azhar-mohamed-3624491a3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200"
                        style={{ fontSize: 13, color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF")}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))")}
                      >
                        LinkedIn
                      </a>
                    </div>
                  </SidebarSection>
                </AnimatedBlock>

              </div>
            </div>
          </div>
        </section>

       </div>
        <ContactFooter />
      </div>
    </main>
  );
}
