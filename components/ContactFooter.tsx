"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useSpotlight } from "./useSpotlight";
import Button from "./Button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Azhar Mohamed">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 2L27 26H22.5L19 17H9L5.5 26H1L14 2ZM14 6L11 16H17L14 6Z"
        fill="currentColor"
      />
    </svg>
  );
}

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Projects", href: "/#work" },
  { label: "About",    href: "/#about" },
  { label: "CV",       href: "/cv" },
];

const projectLinks = [
  { label: "African Bank", href: "/projects/african-bank" },
  { label: "IQ Business",  href: "/projects/corporate-banking" },
  { label: "Nedbank",      href: "/projects/everyday-banking" },
];

const connectLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/azhar-mohamed-3624491a3", external: true },
  { label: "Email",    href: "mailto:Azhar919@gmail.com", external: false },
];

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "rgba(255,255,255,0.3)",
  marginBottom: "16px",
  display: "block",
};

function FooterLinkCol({ label, links }: { label: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div className="flex flex-col">
      <span style={labelStyle}>{label}</span>
      {links.map(link =>
        link.external ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ fontSize: "14px", fontWeight: 400, color: "rgba(255,255,255,0.5)", marginBottom: "10px" }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)")}
          >
            {link.label}
          </a>
        ) : (
          <a
            key={link.label}
            href={link.href}
            className="transition-colors duration-200"
            style={{ fontSize: "14px", fontWeight: 400, color: "rgba(255,255,255,0.5)", marginBottom: "10px" }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)")}
          >
            {link.label}
          </a>
        )
      )}
    </div>
  );
}

export default function ContactFooter() {
  const { handlers, overlay } = useSpotlight({ radius: 600, color: "rgba(196,98,45,0.1)" });
  return (
    <footer className="no-print" style={{ background: "#0D0B09", position: "relative", overflow: "hidden" }} {...handlers}>
      {overlay}
      <div className="page-container relative z-10" style={{ paddingTop: "100px", paddingBottom: "72px" }}>

        {/* ── Contact CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-start"
          style={{ paddingBottom: "64px", marginBottom: "56px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="inline-flex items-center" style={{ gap: "8px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D", marginBottom: "24px" }}>
            <motion.span
              animate={{ opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px rgba(34,197,94,0.7)" }}
            />
            Available for new projects
          </span>

          <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.04, color: "#F5F1EC", maxWidth: "820px" }}>
            Let&apos;s create something <span style={{ color: "#C4622D" }}>effortless</span>.
          </h2>

          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginTop: "24px", maxWidth: "520px" }}>
            Have a project, role, or idea in mind? I&apos;m always open to a good conversation.
          </p>

          <a
            href="mailto:Azhar919@gmail.com"
            className="group relative inline-block after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-accent after:transition-[width] after:duration-300 hover:after:w-full"
            style={{ marginTop: "40px", fontSize: "clamp(22px, 4vw, 44px)", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.02em" }}
          >
            Azhar919@gmail.com
          </a>

          <div className="flex flex-wrap gap-3" style={{ marginTop: "36px" }}>
            <Button href="mailto:Azhar919@gmail.com" external variant="primary" icon={<Mail size={16} />} iconPosition="left">
              Send a message
            </Button>
            <Button href="https://www.linkedin.com/in/azhar-mohamed-3624491a3" external variant="secondary" icon={<LinkedinIcon size={15} />} iconPosition="left">
              LinkedIn
            </Button>
          </div>
        </motion.div>

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-0">

          {/* Left — logo + tagline */}
          <div style={{ maxWidth: "300px" }}>
            <Link href="/" className="text-white hover:opacity-60 transition-opacity duration-200 inline-block" style={{ marginBottom: "16px" }}>
              <LogoMark />
            </Link>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
              Designing effortless digital experiences from Johannesburg, South Africa.
            </p>
          </div>

          {/* Right — link columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">
            <FooterLinkCol label="Navigation" links={navLinks} />
            <FooterLinkCol label="Projects"   links={projectLinks} />
            <FooterLinkCol label="Connect"    links={connectLinks} />
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "40px 0 24px" }} />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)" }}>
            © 2026 Azhar Mohamed. All rights reserved.
          </span>
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)" }}>
            Built with Claude Code
          </span>
        </div>

      </div>
    </footer>
  );
}
