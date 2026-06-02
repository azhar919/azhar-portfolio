"use client";

import Link from "next/link";
import { useSpotlight } from "./useSpotlight";

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
    <footer style={{ background: "#0C0C0C", position: "relative", overflow: "hidden" }} {...handlers}>
      {overlay}
      <div className="page-container py-[80px] relative z-10">
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
