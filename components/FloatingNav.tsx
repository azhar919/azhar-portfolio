"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Briefcase } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const NAV_H = 72;

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Home">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 2L27 26H22.5L19 17H9L5.5 26H1L14 2ZM14 6L11 16H17L14 6Z"
        fill="currentColor"
      />
    </svg>
  );
}

const workItems = [
  {
    company: "African Bank",
    links: [
      { label: "Website Redesign",    desc: "Rebuilding the digital banking platform",                   href: "/projects/african-bank/website-redesign" },
      { label: "Improved Onboarding", desc: "Reducing friction in customer sign-up",                      href: "/projects/african-bank/onboarding" },
    ],
  },
  {
    company: "IQ Business",
    links: [
      { label: "SharePoint Redesign", desc: "Restructuring internal information architecture",             href: "/projects/corporate-banking" },
    ],
  },
  {
    company: "Nedbank",
    links: [
      { label: "Corporate Banking",   desc: "Designing for scale, precision, and trust",                  href: "/projects/business-banking" },
      { label: "Everyday Banking",    desc: "Redesigning retail banking for millions of customers",        href: "/projects/everyday-banking" },
      { label: "Africa Regions",      desc: "Extending digital banking across the continent",             href: "/projects/africa-regions" },
    ],
  },
];

const dim  = "rgba(255,255,255,0.5)";
const full = "#ffffff";

export default function FloatingNav() {
  const [dropdownOpen, setDropdownOpen]     = useState(false);
  const [menuOpen, setMenuOpen]             = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const openDropdown  = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setDropdownOpen(true); };
  const closeDropdown = () => { timeoutRef.current = setTimeout(() => setDropdownOpen(false), 200); };

  return (
    <>
      {/* ── Navbar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center"
        style={{ height: `${NAV_H}px`, background: "rgba(10,10,10,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-[72px] flex items-center justify-between">

          {/* Left — logo with more gap from centre */}
          <Link href="/" className="text-ghost hover:opacity-60 transition-opacity duration-200 shrink-0 mr-16" aria-label="Home">
            <LogoMark />
          </Link>

          {/* Centre — desktop */}
          <nav className="hidden md:flex items-center" style={{ gap: "40px" }}>

            <Link
              href="/"
              className="transition-colors duration-200"
              style={{ fontSize: "16px", fontWeight: 500, color: full }}
            >
              Home
            </Link>

            {/* Projects + dropdown trigger */}
            <div className="relative" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
              <button
                className="flex items-center gap-1.5 transition-colors duration-200"
                style={{ fontSize: "16px", fontWeight: 500, color: full }}
              >
                Projects
                <motion.span
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <ChevronDown size={14} color={full} />
                </motion.span>
              </button>
            </div>

            <Link
              href="/#about"
              className="transition-colors duration-200"
              style={{ fontSize: "16px", fontWeight: 500, color: full }}
              onMouseEnter={e => (e.currentTarget.style.color = full)}
              onMouseLeave={e => (e.currentTarget.style.color = full)}
            >
              About
            </Link>

            <Link
              href="/cv"
              className="transition-colors duration-200"
              style={{ fontSize: "16px", fontWeight: 500, color: full }}
              onMouseEnter={e => (e.currentTarget.style.color = full)}
              onMouseLeave={e => (e.currentTarget.style.color = full)}
            >
              CV
            </Link>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4 shrink-0 ml-auto">
            <a
              href="mailto:Azhar919@gmail.com"
              className="hidden md:inline-flex items-center font-medium transition-colors duration-200"
              style={{ background: "#C4622D", color: "#FFFFFF", fontSize: "13px", fontWeight: 500, padding: "10px 20px", borderRadius: "9999px" }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#A8521F")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#C4622D")}
            >
              Contact
            </a>
            <button className="flex md:hidden" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
              <Menu size={20} color="white" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-width dropdown ── */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            className="fixed left-0 right-0 z-40"
            style={{ top: `${NAV_H}px`, background: "#0F0F0F", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="w-full max-w-[1440px] mx-auto" style={{ padding: "56px 72px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                {workItems.map((col, colIdx) => (
                  <div
                    key={col.company}
                    className="flex flex-col"
                    style={{
                      paddingLeft:  colIdx > 0 ? "40px" : "0",
                      paddingRight: colIdx < workItems.length - 1 ? "40px" : "0",
                      borderRight:  colIdx < workItems.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    }}
                  >
                    {/* Company label */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
                      <Briefcase size={14} color="rgba(255,255,255,0.3)" />
                      <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}>
                        {col.company}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      {col.links.map((link) => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          className="flex items-center justify-between py-2 transition-colors duration-150 group"
                          style={{ marginBottom: "12px" }}
                        >
                          <div className="flex flex-col gap-1">
                            <span
                              className="transition-colors duration-150 group-hover:text-[#C4622D]"
                              style={{ fontSize: "16px", fontWeight: 500, color: "#FFFFFF" }}
                            >
                              {link.label}
                            </span>
                            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>{link.desc}</span>
                          </div>
                          <motion.span
                            className="shrink-0 ml-3"
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight
                              size={14}
                              className="transition-colors duration-200 group-hover:text-[#C4622D]"
                              style={{ color: "rgba(255,255,255,0.3)" }}
                            />
                          </motion.span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[49] flex flex-col md:hidden"
            style={{ background: "#0A0A0A" }}
          >
            {/* Mobile header — logo left, X right */}
            <div
              className="flex items-center justify-between px-5 shrink-0"
              style={{ height: `${NAV_H}px`, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Link href="/" className="text-ghost hover:opacity-60 transition-opacity duration-200" aria-label="Home" onClick={() => setMenuOpen(false)}>
                <LogoMark />
              </Link>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={20} color="white" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6 flex flex-col">

              {/* Home */}
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="block py-5 transition-colors duration-150"
                  style={{ fontSize: "32px", fontWeight: 500, color: "#ffffff" }}
                >
                  Home
                </Link>
              </div>

              {/* Projects accordion */}
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <button
                  className="w-full flex items-center justify-between py-5"
                  onClick={() => setMobileWorkOpen(v => !v)}
                >
                  <span style={{ fontSize: "32px", fontWeight: 500, color: "#ffffff" }}>Projects</span>
                  <motion.span animate={{ rotate: mobileWorkOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "flex" }}>
                    <ChevronDown size={18} color="rgba(255,255,255,0.4)" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileWorkOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 flex flex-col">
                        {workItems.map((col, colIdx) => (
                          <div key={col.company}>
                            {/* Divider between client groups */}
                            {colIdx > 0 && (
                              <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "4px 0 0" }} />
                            )}
                            {/* Client label */}
                            <p style={{
                              fontSize: "11px",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                              color: "rgba(255,255,255,0.4)",
                              marginTop: "24px",
                              marginBottom: "12px",
                            }}>
                              {col.company}
                            </p>
                            {/* Case study links */}
                            <div className="flex flex-col" style={{ paddingLeft: "16px" }}>
                              {col.links.map(link => (
                                <Link
                                  key={link.href + link.label}
                                  href={link.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="transition-colors duration-150 active:text-white"
                                  style={{ fontSize: "16px", fontWeight: 400, color: "rgba(255,255,255,0.7)", marginBottom: "10px" }}
                                  onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About + CV */}
              {[{ label: "About", href: "/#about" }, { label: "CV", href: "/cv" }].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.3, ease: EASE }}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-5 transition-colors duration-150"
                    style={{ fontSize: "32px", fontWeight: 500, color: "#ffffff" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Contact pill */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.24, duration: 0.3 }}
                className="pt-10 mt-auto"
              >
                <a
                  href="mailto:Azhar919@gmail.com"
                  className="flex items-center justify-center w-full font-medium transition-colors duration-200"
                  style={{ background: "#C4622D", color: "#FFFFFF", fontSize: "15px", fontWeight: 500, padding: "16px 24px", borderRadius: "9999px" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#A8521F")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#C4622D")}
                >
                  Contact
                </a>
              </motion.div>

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
