"use client";

// TEMPORARY full-home mock in the "warm paper" light concept. Delete after review.
// Visit /light-preview

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, FileText, Mail, Plus,
  Compass, Layout, Settings, MapPin, Building2, Camera, Clock, type LucideIcon,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* palette */
const PAPER = "#F4ECDE";
const PAPER_DEEP = "#EEE4D3";
const SURFACE = "#FBF6EC";
const INK = "#2A2018";
const INK_SOFT = "rgba(42,32,24,0.62)";
const INK_MUTE = "rgba(42,32,24,0.42)";
const TERRA = "#C4622D";
const TERRA_DEEP = "#A8521F";
const BORDER = "rgba(42,32,24,0.12)";
const CARD_SHADOW = "0 24px 48px -22px rgba(74,52,32,0.45)";

const wrap: React.CSSProperties = { maxWidth: "1180px", margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px)" };

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: TERRA_DEEP }}>{children}</p>;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(30px, 4.5vw, 46px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: INK }}>{children}</h2>;
}
function PrimaryBtn({ children }: { children: React.ReactNode }) {
  return <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: TERRA, color: "#FFF7EF", fontWeight: 600, fontSize: "15px", padding: "14px 24px", borderRadius: "999px", boxShadow: "0 18px 36px -12px rgba(196,98,45,0.55)" }}>{children}</a>;
}
function SecondaryBtn({ children }: { children: React.ReactNode }) {
  return <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "transparent", color: INK, fontWeight: 600, fontSize: "15px", padding: "14px 24px", borderRadius: "999px", border: `1px solid rgba(42,32,24,0.22)` }}>{children}</a>;
}
function Reveal({ children, y = 30, delay = 0 }: { children: React.ReactNode; y?: number; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}
function Divider() {
  return <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(196,98,45,0.45), transparent)" }} />;
}

/* ── Nav ── */
function Nav() {
  const items = ["Home", "Projects", "About me", "CV"];
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 40, display: "flex", justifyContent: "center", padding: "14px", pointerEvents: "none" }}>
      <header style={{ pointerEvents: "auto", display: "flex", alignItems: "center", gap: "8px", background: "rgba(251,246,236,0.8)", backdropFilter: "blur(16px)", border: `1px solid ${BORDER}`, borderRadius: "999px", padding: "11px 12px 11px 26px", boxShadow: "0 10px 30px -12px rgba(74,52,32,0.35)" }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "22px", letterSpacing: "-0.03em", color: INK, marginRight: "26px" }}>AM<span style={{ color: TERRA }}>.</span></span>
        <nav className="hidden md:flex" style={{ gap: "4px" }}>
          {items.map((it, i) => (
            <span key={it} style={{ fontSize: "15px", fontWeight: 500, color: i === 0 ? INK : INK_SOFT, padding: "8px 16px", borderRadius: "999px", background: i === 0 ? "rgba(42,32,24,0.06)" : "transparent" }}>{it}</span>
          ))}
        </nav>
        <span style={{ marginLeft: "18px" }}><a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: TERRA, color: "#FFF7EF", fontWeight: 600, fontSize: "13px", padding: "9px 18px", borderRadius: "999px" }}><Mail size={14} /> Contact</a></span>
      </header>
    </div>
  );
}

/* ── Hero ── */
function Hero() {
  const lines = ["Every interaction", "is a chance to be", "effortless"];
  return (
    <section style={{ position: "relative", overflow: "hidden", minHeight: "92vh", display: "flex", alignItems: "center" }}>
      <div aria-hidden style={{ position: "absolute", top: "-15%", right: "-10%", width: "780px", height: "780px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,98,45,0.10) 0%, transparent 65%)" }} />
      <div aria-hidden style={{ position: "absolute", bottom: "-20%", left: "-12%", width: "640px", height: "640px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,82,31,0.07) 0%, transparent 65%)" }} />
      <div className="noise-texture" aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.05, mixBlendMode: "multiply" }} />
      <div style={{ ...wrap, position: "relative", display: "flex", flexDirection: "column", gap: "30px" }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}><Eyebrow>UX · UI · Design Operations</Eyebrow></motion.div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(44px, 8vw, 86px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.04em", color: INK, maxWidth: "820px" }}>
          {lines.map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: EASE }} style={{ display: "block" }}>
              {line === "effortless" ? <span style={{ color: TERRA, fontStyle: "italic", fontFamily: "var(--font-serif)" }}>{line}</span> : line}
            </motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6, ease: EASE }} style={{ fontSize: "clamp(17px, 2vw, 20px)", color: INK_SOFT, lineHeight: 1.7, maxWidth: "520px" }}>
          Design focused on building intuitive systems, workflows, and interfaces that put people first.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.75, ease: EASE }} style={{ display: "flex", flexWrap: "wrap", gap: "16px", paddingTop: "8px" }}>
          <PrimaryBtn>View my work <ArrowRight size={16} /></PrimaryBtn>
          <SecondaryBtn><FileText size={15} style={{ opacity: 0.7 }} /> View CV</SecondaryBtn>
        </motion.div>
      </div>
    </section>
  );
}

/* ── About ── */
function About() {
  const paragraphs = [
    "Bringing clarity to complexity. With a background in UX and UI design, I've worked in environments where trust, usability, and detail matter most.",
    "My approach is simple: create systems that feel intuitive, reliable, and effortless for the people who use them.",
    "Beyond design, I explore creativity through photography and videography — always observing how people interact with the world and the stories hidden in small details.",
  ];
  const stats = [["6+", "Years experience"], ["14", "Projects shipped"], ["6", "Case studies"], ["3", "Clients"]];
  const tags: [string, LucideIcon][] = [["Johannesburg", MapPin], ["Banking", Building2], ["Photography", Camera], ["6+ years", Clock]];
  return (
    <section style={{ padding: "120px 0" }}>
      <div style={wrap}>
        <div className="grid grid-cols-1 md:grid-cols-[420px_1fr]" style={{ gap: "60px", alignItems: "start" }}>
          <Reveal>
            <div style={{ borderRadius: "20px", overflow: "hidden", border: `1px solid ${BORDER}`, boxShadow: CARD_SHADOW }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/profile.jpg" alt="Azhar Mohamed" style={{ display: "block", width: "100%", height: "420px", objectFit: "cover", objectPosition: "top" }} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <Eyebrow>About Me</Eyebrow>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "42px", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: INK }}>Hi, I&apos;m Azhar</h2>
                <p style={{ fontSize: "20px", color: INK_SOFT }}>I design <span style={{ color: TERRA, fontWeight: 600 }}>onboarding flows</span></p>
              </div>
              {paragraphs.map((p, i) => <p key={i} style={{ fontSize: "16px", lineHeight: 1.8, color: INK_SOFT }}>{p}</p>)}
              <div className="flex flex-wrap" style={{ gap: "40px", padding: "24px 0", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
                {stats.map(([v, l]) => (
                  <div key={l} style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "34px", fontWeight: 800, color: INK, letterSpacing: "-0.02em", lineHeight: 1 }}>{v}</span>
                    <span style={{ fontSize: "12px", color: INK_MUTE, marginTop: "8px" }}>{l}</span>
                  </div>
                ))}
              </div>
              <div><PrimaryBtn>LinkedIn profile</PrimaryBtn></div>
              <div className="flex flex-wrap" style={{ gap: "8px" }}>
                {tags.map(([label, Icon]) => (
                  <span key={label} className="inline-flex items-center" style={{ gap: "6px", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "999px", padding: "7px 16px", fontSize: "13px", fontWeight: 500, color: INK_SOFT }}>
                    <Icon size={12} color={TERRA} /> {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Skills ── */
function Skills() {
  const services = [
    { icon: Compass, title: "User Experience", description: "Research, mapping journeys, and designing workflows that are intuitive, usable, and human-centered.", keywords: ["Research", "Prototyping", "Testing"] },
    { icon: Layout, title: "User Interface", description: "Translating ideas into visually compelling, consistent, and accessible interfaces that scale across platforms.", keywords: ["Design Systems", "Components", "Accessibility"] },
    { icon: Settings, title: "Design Operations", description: "Setting up systems, processes, and frameworks so design stays consistent, collaborative, and impactful.", keywords: ["Workflows", "Documentation", "Quality"] },
  ];
  return (
    <section style={{ padding: "120px 0", background: PAPER_DEEP }}>
      <div style={wrap}>
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "56px" }}>
            <Eyebrow>Services</Eyebrow>
            <H2>What I do</H2>
            <p style={{ fontSize: "16px", color: INK_MUTE, maxWidth: "420px" }}>Three core disciplines I bring to every project</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "20px" }}>
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} style={{ position: "relative", overflow: "hidden", height: "100%", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "24px", padding: "36px", boxShadow: CARD_SHADOW }}>
                  <span aria-hidden style={{ position: "absolute", top: "20px", right: "26px", fontSize: "clamp(40px,5vw,60px)", fontWeight: 800, lineHeight: 1, color: "rgba(42,32,24,0.06)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <div style={{ width: "54px", height: "54px", borderRadius: "16px", display: "grid", placeItems: "center", marginBottom: "24px", background: "rgba(196,98,45,0.10)", border: "1px solid rgba(196,98,45,0.25)" }}>
                    <Icon size={24} color={TERRA} />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: INK, marginBottom: "12px", letterSpacing: "-0.01em" }}>{s.title}</h3>
                  <p style={{ fontSize: "14px", color: INK_SOFT, lineHeight: 1.75 }}>{s.description}</p>
                  <div className="flex flex-wrap" style={{ gap: "6px", marginTop: "24px" }}>
                    {s.keywords.map(kw => <span key={kw} style={{ fontSize: "12px", fontWeight: 500, color: INK_MUTE, border: `1px solid ${BORDER}`, borderRadius: "999px", padding: "4px 12px" }}>{kw}</span>)}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Trust ── */
function Trust() {
  const clients = [
    { name: "IQ Business", src: "/images/iqbusiness logo (FC) black.png", bg: "#FBF6EC", h: 46 },
    { name: "Nedbank", src: "/images/Nedbank Logo.png", bg: "#005944", h: 84 },
    { name: "African Bank", src: "/images/African Bank logo black.png", bg: "#FBF6EC", h: 38 },
  ];
  return (
    <section style={{ padding: "80px 0" }}>
      <div style={wrap}>
        <Reveal><p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: INK_MUTE, textAlign: "center", marginBottom: "32px" }}>Worked with</p></Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "20px", maxWidth: "900px", margin: "0 auto" }}>
          {clients.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <div style={{ background: c.bg, borderRadius: "20px", height: "112px", display: "grid", placeItems: "center", padding: "0 28px", border: `1px solid ${BORDER}`, boxShadow: CARD_SHADOW }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.src} alt={c.name} style={{ height: `${c.h}px`, maxWidth: "100%", objectFit: "contain" }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Selected Work ── */
function Work() {
  const projects = [
    { company: "African Bank", title: "Improved Onboarding", desc: "Redesigning a high-friction onboarding journey into a streamlined, intuitive experience that guides users with clarity.", image: "/images/Step 3 - Personal details.png", url: "africanbank.co.za/apply" },
    { company: "African Bank", title: "Website Redesign", desc: "Rebuilding a fragmented digital banking platform into a cohesive, scalable experience.", image: "/images/african-bank-landing.png.png", url: "africanbank.co.za/digital" },
    { company: "Nedbank", title: "Everyday Banking", desc: "Simplifying personal banking onboarding into faster, clearer, more human journeys.", image: "/images/EDB_creditcard-27main Copy.jpg", url: "nedbank.co.za/banking" },
    { company: "Nedbank", title: "Corporate Banking", desc: "Designing high-stakes corporate banking tools for scale, precision, and trust.", image: "/images/nedbank-dashboard.png.png", url: "nedbank.co.za/business" },
  ];
  return (
    <section style={{ padding: "120px 0", background: PAPER_DEEP }}>
      <div style={wrap}>
        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "56px" }}>
            <Eyebrow>Selected Work</Eyebrow>
            <H2>Case studies</H2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "20px" }}>
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} style={{ height: "100%", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "20px", overflow: "hidden", boxShadow: CARD_SHADOW }}>
                {/* browser frame */}
                <div style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ height: "36px", background: PAPER_DEEP, display: "flex", alignItems: "center", padding: "0 12px", gap: "6px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#E0876B" }} />
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#E8C07A" }} />
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#9FC08A" }} />
                    <span style={{ flex: 1, textAlign: "center", fontSize: "11px", color: INK_MUTE }}>{p.url}</span>
                  </div>
                  <div style={{ height: "240px", overflow: "hidden", background: "#fff" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left" }} />
                  </div>
                </div>
                <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: INK_MUTE }}>{p.company}</span>
                  <h3 style={{ fontSize: "22px", fontWeight: 700, color: INK, letterSpacing: "-0.02em" }}>{p.title}</h3>
                  <p style={{ fontSize: "14px", color: INK_SOFT, lineHeight: 1.7 }}>{p.desc}</p>
                  <span className="inline-flex items-center" style={{ gap: "6px", fontSize: "14px", fontWeight: 500, color: TERRA, marginTop: "4px" }}>View project <ArrowUpRight size={15} /></span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQ() {
  const faqs = [
    { q: "What is your design process?", a: "My process follows design thinking: research, ideation, prototyping, and user testing. Each phase adapts to project needs and client goals." },
    { q: "Which industries have you worked in?", a: "I have worked with clients in banking, finance, and other sectors, focusing on user-centered design solutions." },
    { q: "Do you offer design operations support?", a: "Yes, I help teams improve workflows, streamline collaboration, and maintain consistent design quality." },
    { q: "How do you collaborate with clients?", a: "I use regular check-ins, feedback sessions, and clear documentation to keep clients informed and involved throughout each project." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section style={{ padding: "120px 0" }}>
      <div style={wrap}>
        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr]" style={{ gap: "60px", alignItems: "start" }}>
          <Reveal>
            <div className="flex flex-col" style={{ gap: "20px" }}>
              <Eyebrow>FAQ</Eyebrow>
              <H2>Your design questions, answered</H2>
              <p style={{ fontSize: "16px", color: INK_MUTE, lineHeight: 1.7, maxWidth: "360px" }}>A few things people often ask about how I work. Still curious about something?</p>
              <div style={{ paddingTop: "4px" }}><SecondaryBtn><Mail size={14} /> Get in touch</SecondaryBtn></div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col">
              {faqs.map((f, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between text-left" style={{ padding: "22px 0", gap: "16px" }}>
                    <span style={{ fontSize: "18px", fontWeight: 600, color: open === i ? INK : INK_SOFT, lineHeight: 1.4, letterSpacing: "-0.01em" }}>{f.q}</span>
                    <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25, ease: EASE }} style={{ flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%", display: "grid", placeItems: "center", border: `1px solid ${open === i ? "rgba(196,98,45,0.45)" : BORDER}`, background: open === i ? "rgba(196,98,45,0.10)" : "transparent" }}>
                      <Plus size={16} color={open === i ? TERRA : INK_SOFT} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} style={{ overflow: "hidden" }}>
                        <p style={{ fontSize: "15px", color: INK_SOFT, lineHeight: 1.8, paddingBottom: "24px", paddingRight: "40px" }}>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  const cols: [string, string[]][] = [
    ["Navigate", ["Home", "Projects", "About", "CV"]],
    ["Projects", ["African Bank", "IQ Business", "Nedbank"]],
    ["Connect", ["LinkedIn", "Email"]],
  ];
  return (
    <footer style={{ background: PAPER_DEEP, borderTop: `1px solid ${BORDER}` }}>
      <div style={{ ...wrap, paddingTop: "100px", paddingBottom: "72px" }}>
        <Reveal>
          <div style={{ paddingBottom: "64px", marginBottom: "56px", borderBottom: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span className="inline-flex items-center" style={{ gap: "8px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: TERRA_DEEP, marginBottom: "24px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#3F9A2E" }} /> Available for new projects
            </span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.04, color: INK, maxWidth: "820px" }}>
              Let&apos;s create something <span style={{ color: TERRA, fontStyle: "italic", fontFamily: "var(--font-serif)" }}>effortless</span>.
            </h2>
            <p style={{ fontSize: "16px", color: INK_SOFT, lineHeight: 1.7, marginTop: "24px", maxWidth: "520px" }}>Have a project, role, or idea in mind? I&apos;m always open to a good conversation.</p>
            <a href="#" style={{ marginTop: "40px", fontSize: "clamp(22px, 4vw, 44px)", fontWeight: 700, color: INK, letterSpacing: "-0.02em" }}>Azhar919@gmail.com</a>
            <div className="flex flex-wrap" style={{ gap: "12px", marginTop: "36px" }}>
              <PrimaryBtn><Mail size={16} /> Send a message</PrimaryBtn>
              <SecondaryBtn>LinkedIn</SecondaryBtn>
            </div>
          </div>
        </Reveal>
        <div className="flex flex-col md:flex-row md:justify-between" style={{ gap: "48px" }}>
          <div style={{ maxWidth: "300px" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "22px", color: INK }}>AM<span style={{ color: TERRA }}>.</span></span>
            <p style={{ fontSize: "14px", color: INK_MUTE, lineHeight: 1.7, marginTop: "16px" }}>Designing effortless digital experiences from Johannesburg, South Africa.</p>
          </div>
          <div className="flex" style={{ gap: "64px" }}>
            {cols.map(([label, links]) => (
              <div key={label} className="flex flex-col">
                <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: INK_MUTE, marginBottom: "16px" }}>{label}</span>
                {links.map(l => <a key={l} href="#" style={{ fontSize: "14px", color: INK_SOFT, marginBottom: "10px" }}>{l}</a>)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LightHomePreview() {
  return (
    <main style={{ background: PAPER, fontFamily: "var(--font-body)", color: INK }}>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Divider />
      <Trust />
      <Work />
      <FAQ />
      <Divider />
      <Footer />
    </main>
  );
}
