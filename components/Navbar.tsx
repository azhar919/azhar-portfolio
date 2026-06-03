"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const caseStudies = [
  { company: "African Bank", title: "Website Redesign",    href: "/projects/african-bank/website-redesign" },
  { company: "Nedbank",      title: "Corporate Banking",   href: "/projects/business-banking" },
  { company: "Nedbank",      title: "Everyday Banking",    href: "/projects/everyday-banking" },
  { company: "African Bank", title: "Improved Onboarding", href: "/projects/african-bank/onboarding" },
  { company: "IQ Business",  title: "SharePoint Redesign", href: "/projects/corporate-banking" },
  { company: "Nedbank",      title: "Africa Regions",      href: "/projects/africa-regions" },
];

const navLinks = [
  { label: "My Profile",  href: "/" },
  { label: "My Projects", href: "/projects" },
  { label: "My CV",       href: "/cv" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const pathname = usePathname();

  const closeAll = () => { setMenuOpen(false); setProjectsOpen(false); };

  return (
    <>
      {/* Desktop navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark h-[80px] flex items-center">
        <div className="page-container flex items-center justify-between">
        <Link
          href="/"
          className="font-grotesk font-bold text-white text-body whitespace-nowrap"
        >
          Azhar Mohamed
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <span key={link.label} className="flex items-center gap-6">
                {i > 0 && <div className="w-px h-6 bg-white/30" />}
                <Link
                  href={link.href}
                  className={`font-medium text-white text-body hover:opacity-80 transition-opacity ${
                    isActive ? "underline underline-offset-4" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </span>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.span animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-white rounded-full" />
          <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-0.5 bg-white rounded-full" />
          <motion.span animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-white rounded-full" />
        </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[80px] left-0 right-0 z-40 bg-dark flex flex-col px-6 py-4 gap-1 md:hidden shadow-lg"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isProjects = link.href === "/projects";

              if (isProjects) {
                return (
                  <div key={link.label} className="border-b border-white/10">
                    <button
                      onClick={() => setProjectsOpen((v) => !v)}
                      className="w-full flex items-center justify-between font-medium text-white text-body py-3"
                    >
                      {link.label}
                      <motion.span animate={{ rotate: projectsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={16} className="opacity-50" />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {projectsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22 }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="flex flex-col pb-2">
                            {caseStudies.map((cs) => (
                              <Link
                                key={cs.href}
                                href={cs.href}
                                onClick={closeAll}
                                className="flex items-center justify-between py-2.5 pl-2 pr-1 rounded-lg"
                                style={{ transition: "background 0.15s" }}
                                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                              >
                                <div className="flex flex-col gap-0.5">
                                  <span style={{ fontSize: "var(--text-micro)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                                    {cs.company}
                                  </span>
                                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 500, color: "#FFFFFF" }}>
                                    {cs.title}
                                  </span>
                                </div>
                                <ArrowUpRight size={14} style={{ color: "var(--gold)", flexShrink: 0 }} />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeAll}
                  className={`font-medium text-white text-body py-3 border-b border-white/10 last:border-0 ${isActive ? "underline underline-offset-4" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
