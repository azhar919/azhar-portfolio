"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";

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
  projects: TimelineProject[];
};

const experienceTimeline: TimelineGroup[] = [
  {
    company: "African Bank",
    dateRange: "2024 — Feb 2026",
    role: "Design Lead",
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
}: {
  project: TimelineProject;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ marginBottom: 6 }}>
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center border-0 text-left transition-colors duration-200"
        style={{
          background: isOpen ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
          borderRadius: isOpen ? "10px 10px 0 0" : 10,
          padding: "15px 20px",
          cursor: "pointer",
        }}
        onMouseEnter={e => {
          if (!isOpen) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)";
        }}
        onMouseLeave={e => {
          if (!isOpen) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}>{project.title}</span>
        <ChevronDown
          size={15}
          color="rgba(255,255,255,0.35)"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{
              overflow: "hidden",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "0 0 10px 10px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ padding: "0 20px 20px" }}
            >
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
                Project Overview
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>
                {project.overview}
              </p>
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
                Key Contributions
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {project.bullets.map((bullet, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: i < project.bullets.length - 1 ? 6 : 0 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C4622D", marginTop: "0.55em", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>{bullet}</span>
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
function CompanyGroup({ group }: { group: TimelineGroup }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", margin: 0, letterSpacing: "-0.01em" }}>
            {group.company}
          </h3>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>{group.dateRange}</span>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 3, marginBottom: 0 }}>{group.role}</p>
      </div>
      <div>
        {group.projects.map((project, index) => (
          <AccordionItem
            key={project.title}
            project={project}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Sidebar section ───────────────────────────────────────── */
function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.3)",
          marginBottom: 14,
          paddingBottom: 10,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function CVPage() {
  return (
    <main style={{ background: "#0B0A09", minHeight: "100vh" }}>
      <FloatingNav />
      <div className="pt-[72px]">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden" style={{ background: "#0B0A09", paddingTop: "72px", paddingBottom: "72px" }}>

          {/* Ambient orb */}
          <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
            top: "-20%", right: "-5%",
            width: "600px", height: "600px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,98,45,0.14) 0%, transparent 65%)",
          }} />

          <div className="page-container">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start relative z-10">

              {/* Profile photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="shrink-0 relative overflow-hidden"
                style={{ width: 200, height: 200, borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Image src="/images/profile.jpg" alt="Azhar Mohamed" fill className="object-cover" priority />
              </motion.div>

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

                {experienceTimeline.map((group, gi) => (
                  <div key={`${group.company}-${gi}`}>
                    {gi > 0 && (
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "28px 0" }} />
                    )}
                    <AnimatedBlock delay={gi * 0.05}>
                      <CompanyGroup group={group} />
                    </AnimatedBlock>
                  </div>
                ))}
              </div>

              {/* ── Right — Sidebar ── */}
              <div className="w-full md:w-[300px] shrink-0 flex flex-col gap-8">

                <AnimatedBlock delay={0.08}>
                  <SidebarSection title="Industries">
                    <ul className="flex flex-col gap-2">
                      {industries.map(item => (
                        <li key={item} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item}</li>
                      ))}
                    </ul>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.1}>
                  <SidebarSection title="Toolkit">
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
                  <SidebarSection title="AI Tools">
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
                  <SidebarSection title="Skills">
                    <ul className="flex flex-col gap-2">
                      {skills.map(skill => (
                        <li key={skill} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{skill}</li>
                      ))}
                    </ul>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.14}>
                  <SidebarSection title="Education">
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
                  <SidebarSection title="Certifications">
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
                  <SidebarSection title="Training">
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
                  <SidebarSection title="Current Development">
                    <ul className="flex flex-col gap-2">
                      {currentDevelopment.map(item => (
                        <li key={item} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item}</li>
                      ))}
                    </ul>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.22}>
                  <SidebarSection title="Roles">
                    <ul className="flex flex-col gap-2">
                      {roles.map(role => (
                        <li key={role} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{role}</li>
                      ))}
                    </ul>
                  </SidebarSection>
                </AnimatedBlock>

                <AnimatedBlock delay={0.24}>
                  <SidebarSection title="Online Profile">
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

        <ContactFooter />
      </div>
    </main>
  );
}
