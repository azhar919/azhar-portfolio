"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import { ChevronDown, Mail, Building2, PenTool, Sparkles, Layers, GraduationCap, Award, BookOpen, TrendingUp, Users, AtSign, Download, type LucideIcon } from "lucide-react";

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

const bio = "With 6 years of experience, Azhar utilises his Design Thinking expertise supplemented with the power of AI to design and develop client-centric solutions in Retail and Corporate Investment Banking. He has taken on roles such as UX, UI, and Design Lead across various projects, working on a wide range of products, including Personal Banking, Value-Added Services, Staff Servicing, Product Maintenance, and Business Banking platforms.";

const industries = ["Consulting", "Banking"];

const toolkit = ["Figma", "Sketch", "Adobe XD", "Invision", "Miro", "Zoom", "Maze", "Jira", "Microsoft Office"];

const aiTools = ["Claude", "Claude Code", "ChatGPT", "Gemini", "GitHub Copilot", "Microsoft Copilot"];

const skills = [
  "UX Design", "UI Design", "User Research", "Customer Journey Mapping",
  "Information Architecture", "Wireframing", "Prototyping", "Design systems",
  "Agile", "Usability Testing", "Problem Solving", "Concept Validation",
  "Leadership", "Communication", "Time management", "Critical thinking",
  "Quality assurance", "Working remotely", "Conflict management",
  "Presentation skills", "Working under pressure",
];

const roles = [
  "Product Designer",
  "UX Training Facilitator",
  "Experience Innovation team leader",
  "CHOC Leadership/Chairperson",
];

const education = [
  {
    institution: "University of Johannesburg",
    qualification: "B.Com Information and Business Management",
    year: "2020",
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
    company: "IQ Business",
    dateRange: "2023 — 2024",
    role: "Senior Principal Consultant",
    logo: "/images/iqbusiness logo (FC) black.png",
    logoBg: "#F5F1EC",
    projects: [
      {
        title: "IQ Business SharePoint",
        overview: "IQ Business required a redesign of their existing SharePoint site. As the business grew, the volume of information increased — resulting in a cluttered, maze-like structure that made it extremely difficult to locate relevant information and documentation.",
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
  const { handlers, overlay } = useSpotlight({ radius: 360, color: "rgba(196,98,45,0.08)" });
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
          background: open ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
          borderRadius: open ? "12px 12px 0 0" : 12,
          borderLeft: `2px solid ${open ? "#C4622D" : "transparent"}`,
          padding: "20px 24px",
          cursor: "pointer",
          transition: "background 0.2s, border-color 0.2s",
        }}
      >
        {overlay}
        <span className="relative z-10" style={{ flex: 1, minWidth: 0, fontSize: 15, fontWeight: 600, color: open ? "#F5F1EC" : "#FFFFFF", letterSpacing: "-0.01em" }}>{project.title}</span>
        <ChevronDown
          size={16}
          color={open ? "#C4622D" : "rgba(255,255,255,0.35)"}
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
              background: "rgba(255,255,255,0.04)",
              borderRadius: "0 0 12px 12px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              borderLeft: "2px solid #C4622D",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ padding: "4px 28px 26px" }}
            >
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", fontWeight: 600, marginTop: 20, marginBottom: 10 }}>
                Project Overview
              </p>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.58)", lineHeight: 1.8, margin: 0 }}>
                {project.overview}
              </p>
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", fontWeight: 600, marginTop: 22, marginBottom: 12 }}>
                Key Contributions
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {project.bullets.map((bullet, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: i < project.bullets.length - 1 ? 10 : 0 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C4622D", marginTop: "0.6em", flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.58)", lineHeight: 1.8 }}>{bullet}</span>
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
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#F5F1EC", margin: 0, letterSpacing: "-0.02em" }}>
            {group.company}
          </h3>
          <span style={{
            fontSize: 11, fontWeight: 600, color: "#C4622D", letterSpacing: "0.02em",
            border: "1px solid rgba(196,98,45,0.3)", background: "rgba(196,98,45,0.1)",
            borderRadius: 9999, padding: "3px 11px", whiteSpace: "nowrap",
          }}>
            {group.dateRange}
          </span>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 5, marginBottom: 0 }}>
          {group.role}
          <span style={{ color: "rgba(255,255,255,0.3)" }}> · {group.projects.length} project{group.projects.length > 1 ? "s" : ""}</span>
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
      <div aria-hidden="true" className="cv-rail" style={{ position: "absolute", left: "31px", top: "14px", bottom: "14px", width: "2px", background: "rgba(255,255,255,0.08)" }} />
      {/* rail fill — grows with scroll */}
      <motion.div aria-hidden="true" className="cv-rail" style={{ position: "absolute", left: "31px", top: "14px", bottom: "14px", width: "2px", background: "linear-gradient(to bottom, #E8A06A, #C4622D, #A8521F)", transformOrigin: "top", scaleY: fill, boxShadow: "0 0 8px rgba(196,98,45,0.5)" }} />

      {experienceTimeline.map((group, gi) => (
        <AnimatedBlock key={`${group.company}-${gi}`} delay={gi * 0.05}>
          <div className="cv-tl-item" style={{ position: "relative", paddingLeft: "88px", paddingBottom: gi < experienceTimeline.length - 1 ? "48px" : "0" }}>
            {/* logo node on the rail */}
            <div className="cv-tl-node" style={{
              position: "absolute", left: 0, top: 0,
              width: "64px", height: "48px", borderRadius: "13px",
              background: group.logoBg, display: "grid", placeItems: "center",
              border: "1px solid rgba(255,255,255,0.14)", overflow: "hidden",
              zIndex: 1, boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
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
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(196,98,45,0.25)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 16,
        padding: "20px 22px",
        transition: "background 0.25s, border-color 0.25s",
      }}
    >
      <h2
        className="flex items-center gap-2"
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.4)",
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Icon size={13} color="#C4622D" />
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
    <div ref={ref} className="flex flex-col">
      <span style={{ fontSize: 30, fontWeight: 800, color: "#F5F1EC", lineHeight: 1, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
        {n}{suffix}
      </span>
      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>{label}</span>
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
              background: "conic-gradient(rgba(196,98,45,0.75) 0deg, rgba(196,98,45,0.12) 55deg, transparent 95deg, transparent 360deg)",
            }}
          />
          <div className="relative overflow-hidden" style={{ width: 200, height: 200, borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)" }}>
            <Image src="/images/profile.jpg" alt="Azhar Mohamed" fill className="object-cover" priority />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function CVPage() {
  const heroSpot = useSpotlight({ radius: 520, color: "rgba(196,98,45,0.08)" });
  const [exporting, setExporting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (exporting) return;
    setExporting(true);
    // Let accordions expand and the export styles apply before capturing.
    await new Promise(r => setTimeout(r, 250));
    try {
      const el = contentRef.current;
      if (!el) return;
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#0B0A09", useCORS: true });
      const w = canvas.width / 2;
      const h = canvas.height / 2;
      const pdf = new jsPDF({ orientation: w > h ? "landscape" : "portrait", unit: "px", format: [w, h] });
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, w, h);
      pdf.save("Azhar-Mohamed-CV.pdf");
    } catch (err) {
      console.error("PDF export failed", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <main style={{ background: "#0B0A09", minHeight: "100vh" }}>
      <FloatingNav />
      <div className="pt-[72px]">
       <div ref={contentRef} className={exporting ? "cv-exporting" : undefined}>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden" style={{ background: "#0B0A09", paddingTop: "72px", paddingBottom: "72px" }} {...heroSpot.handlers}>

          {heroSpot.overlay}

          {/* Ambient orb */}
          <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
            top: "-20%", right: "-5%",
            width: "600px", height: "600px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,98,45,0.14) 0%, transparent 65%)",
          }} />

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
                  style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D" }}
                >
                  Portfolio · CV
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.06, ease: EASE }}
                  style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", color: "#F5F1EC", margin: 0 }}
                >
                  Azhar Mohamed
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
                  style={{ fontSize: 15, fontWeight: 500, color: "#C4622D" }}
                >
                  Senior Product Designer
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
                  style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 560 }}
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
        <section style={{ background: "#0B0A09", paddingTop: "64px", paddingBottom: "96px" }}>
          <div className="page-container">
            <div className="flex flex-col md:flex-row gap-y-14 md:gap-x-16 items-start">

              {/* ── Left — Project experience ── */}
              <div className="flex-1 min-w-0 flex flex-col">

                <AnimatedBlock className="mb-10">
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em", paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.08)", margin: 0 }}>
                    Project experience
                  </h2>
                </AnimatedBlock>

                <ExperienceTimeline forceOpen={exporting} />
              </div>

              {/* ── Right — Sidebar ── */}
              <div className="w-full md:w-[340px] shrink-0 flex flex-col gap-5">

                <AnimatedBlock delay={0.08}>
                  <SidebarSection title="Industries" icon={Building2}>
                    <ul className="flex flex-col gap-2">
                      {industries.map(item => (
                        <li key={item} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item}</li>
                      ))}
                    </ul>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.1}>
                  <SidebarSection title="Toolkit" icon={PenTool}>
                    <div className="flex flex-wrap gap-2">
                      {toolkit.map(tool => (
                        <span
                          key={tool}
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: "rgba(255,255,255,0.55)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.04)",
                            borderRadius: 9999,
                            padding: "4px 12px",
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.11}>
                  <SidebarSection title="AI Tools" icon={Sparkles}>
                    <div className="flex flex-wrap gap-2">
                      {aiTools.map(tool => (
                        <span
                          key={tool}
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: "rgba(255,255,255,0.55)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.04)",
                            borderRadius: 9999,
                            padding: "4px 12px",
                          }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.12}>
                  <SidebarSection title="Skills" icon={Layers}>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span
                          key={skill}
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: "rgba(255,255,255,0.55)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "rgba(255,255,255,0.04)",
                            borderRadius: 9999,
                            padding: "4px 12px",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.14}>
                  <SidebarSection title="Education" icon={GraduationCap}>
                    {education.map(edu => (
                      <div key={edu.institution} className="flex flex-col gap-1">
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>{edu.institution}</p>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", margin: 0 }}>{edu.qualification}</p>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0 }}>{edu.year}</p>
                      </div>
                    ))}
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.16}>
                  <SidebarSection title="Certifications" icon={Award}>
                    <ul className="flex flex-col gap-3">
                      {certifications.map(cert => (
                        <li key={cert.name} className="flex flex-col gap-0.5">
                          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{cert.name}</span>
                          {cert.year && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{cert.year}</span>}
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
                          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item.name}</span>
                          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{item.year}</span>
                        </li>
                      ))}
                    </ul>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.2}>
                  <SidebarSection title="Current Development" icon={TrendingUp}>
                    <ul className="flex flex-col gap-2">
                      {currentDevelopment.map(item => (
                        <li key={item} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item}</li>
                      ))}
                    </ul>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.22}>
                  <SidebarSection title="Roles" icon={Users}>
                    <ul className="flex flex-col gap-2">
                      {roles.map(role => (
                        <li key={role} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{role}</li>
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
                        style={{ fontSize: 13, color: "#C4622D" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#A8521F")}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#C4622D")}
                      >
                        Azhar919@gmail.com
                      </a>
                      <a
                        href="https://www.linkedin.com/in/azhar-mohamed-3624491a3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200"
                        style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF")}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)")}
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
