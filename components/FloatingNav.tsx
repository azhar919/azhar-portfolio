"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Mail } from "lucide-react";
import Button from "./Button";
import { EASE } from "@/lib/motion";

const NAV_H = 72;

/* Client logo chips for the Projects dropdown (replaces a repeated generic icon). */
const COMPANY_LOGO: Record<string, { src: string; bg: string; h: number }> = {
  "Life Healthcare": { src: "/images/lhc-logo-navy.svg",              bg: "#F4ECDE", h: 13 },
  "African Bank":    { src: "/images/African Bank logo black.png",    bg: "#F4ECDE", h: 12 },
  "iqbusiness":     { src: "/images/iqbusiness logo (FC) black.png", bg: "#F4ECDE", h: 13 },
  "Nedbank":         { src: "/images/Nedbank Logo.png",               bg: "#005944", h: 20 },
};

function LogoChip({ company }: { company: string }) {
  const l = COMPANY_LOGO[company];
  if (!l) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: l.bg, borderRadius: "5px", height: "22px", padding: "0 7px", flexShrink: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={l.src} alt="" style={{ height: `${l.h}px`, maxWidth: "62px", objectFit: "contain", display: "block" }} />
    </span>
  );
}

/* Logo — clean sans wordmark that matches the nav typography (the serif version
   read as out of place). "AM" in the heading face with a terracotta accent dot. */
function LogoMark() {
  return (
    <span
      aria-label="AM. — Azhar Mohamed, home"
      className="transition-opacity duration-200 hover:opacity-80"
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        fontFamily: "var(--font-heading)",
        fontWeight: 800,
        fontSize: "22px",
        letterSpacing: "-0.03em",
        color: "#F5F1EC",
        userSelect: "none",
      }}
    >
      AM<span style={{ color: "var(--gold)" }}>.</span>
    </span>
  );
}

const workItems = [
  {
    company: "Life Healthcare",
    links: [
      { label: "Website Redesign",    desc: "A patient-first hospital-group website",               href: "/projects/life-healthcare/website" },
      { label: "Design System",       desc: "The tokenised component library beneath it",           href: "/projects/life-healthcare/design-system" },
    ],
  },
  {
    company: "African Bank",
    links: [
      { label: "Improved Onboarding", desc: "Reducing friction in customer sign-up",                 href: "/projects/african-bank/onboarding" },
      { label: "Website Redesign",    desc: "Rebuilding the digital banking platform",              href: "/projects/african-bank/website-redesign" },
    ],
  },
  {
    company: "iqbusiness",
    links: [
      { label: "SharePoint Redesign", desc: "Restructuring internal information architecture",        href: "/projects/corporate-banking" },
    ],
  },
  {
    company: "Nedbank",
    links: [
      { label: "Corporate Banking",   desc: "Designing for scale, precision, and trust",             href: "/projects/business-banking" },
      { label: "Everyday Banking",    desc: "Retail banking for millions of customers",              href: "/projects/everyday-banking" },
      { label: "Africa Regions",      desc: "Extending digital banking across the continent",        href: "/projects/africa-regions" },
    ],
  },
];

type NavItem = { key: string; label: string; href?: string; dropdown?: boolean };
const NAV_ITEMS: NavItem[] = [
  { key: "home",     label: "Home",     href: "/" },
  { key: "projects", label: "Projects", dropdown: true },
  { key: "about",    label: "About me", href: "/#about" },
  { key: "cv",       label: "CV",       href: "/cv" },
];

export default function FloatingNav() {
  const [dropdownOpen, setDropdownOpen]     = useState(false);
  const [menuOpen, setMenuOpen]             = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const [hoveredKey, setHoveredKey]         = useState<string | null>(null);
  const [scrolled, setScrolled]             = useState(false);
  const [spyKey, setSpyKey]                 = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy (homepage only): light the nav item for the section in view so
  // the sliding pill glides between Home → Projects (#work) → About (#about).
  useEffect(() => {
    if (pathname !== "/") { setSpyKey(null); return; }
    const sections = [
      { id: "about", key: "about" },
      { id: "work",  key: "projects" },
    ];
    const onScroll = () => {
      const mid = window.innerHeight * 0.35;
      const passed = sections
        .map((s) => ({ key: s.key, el: document.getElementById(s.id) }))
        .filter((s) => s.el)
        .map((s) => ({ key: s.key, top: s.el!.getBoundingClientRect().top }))
        .filter((s) => s.top <= mid);
      setSpyKey(passed.length ? passed.sort((a, b) => b.top - a.top)[0].key : "home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Escape closes the dropdown / mobile menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setDropdownOpen(false);
      setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const openDropdown  = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setDropdownOpen(true); };
  const closeDropdown = () => { timeoutRef.current = setTimeout(() => setDropdownOpen(false), 200); };

  const activeKey =
    pathname === "/" ? (spyKey ?? "home")
    : pathname === "/cv" ? "cv"
    : pathname.startsWith("/projects") ? "projects"
    : null;

  return (
    <>
      {/* ── Floating pill nav ── */}
      <div className="no-print fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 pointer-events-none">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="pointer-events-auto flex items-center gap-2 w-full md:w-auto justify-between md:justify-start"
          style={{
            background: scrolled ? "rgba(10,10,10,0.85)" : "rgba(10,10,10,0.55)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "var(--radius-pill)",
            boxShadow: scrolled
              ? "0 12px 40px rgba(0,0,0,0.5)"
              : "0 8px 32px rgba(0,0,0,0.35)",
            padding: "13px 13px 13px 30px",
            transition: "background 0.3s, box-shadow 0.3s",
            position: "relative",
          }}
        >
          {/* Reading progress bar — hugs the bottom of the pill */}
          <div aria-hidden="true" style={{ position: "absolute", left: "30px", right: "30px", bottom: "7px", height: "2px", borderRadius: "var(--radius-pill)", background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
            <motion.div style={{ height: "100%", borderRadius: "var(--radius-pill)", background: "linear-gradient(90deg, var(--gold), var(--teal))", transformOrigin: "0% 50%", scaleX: progressX, boxShadow: "0 0 8px rgb(var(--gold-rgb) / 0.5)" }} />
          </div>

          {/* Logo */}
          <Link href="/" className="text-ghost transition-opacity duration-200 shrink-0 md:mr-10" aria-label="AM. — Azhar Mohamed, home">
            <LogoMark />
          </Link>

          {/* Centre — desktop links with sliding indicator */}
          <nav
            className="hidden md:flex items-center gap-2 relative"
            onMouseLeave={() => { setHoveredKey(null); closeDropdown(); }}
          >
            {NAV_ITEMS.map((item) => {
              const lit = (hoveredKey ?? activeKey) === item.key;
              const inner = (
                <span
                  className="relative z-10 inline-flex items-center gap-1.5"
                  style={{ fontSize: "var(--text-ui)", fontWeight: 500, color: lit ? "#fff" : "rgba(255,255,255,0.62)", transition: "color 0.2s" }}
                >
                  {item.label}
                  {item.dropdown && (
                    <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "flex" }}>
                      <ChevronDown size={14} />
                    </motion.span>
                  )}
                </span>
              );
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => { setHoveredKey(item.key); item.dropdown ? openDropdown() : closeDropdown(); }}
                >
                  {lit && (
                    <motion.div
                      layoutId="navPill"
                      transition={{ type: "spring", stiffness: 260, damping: 30 }}
                      style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.09)", borderRadius: "var(--radius-pill)" }}
                    />
                  )}
                  {item.dropdown ? (
                    <button
                      className="flex items-center px-6 py-2.5 rounded-full"
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                      onClick={() => setDropdownOpen((v) => !v)}
                      onFocus={openDropdown}
                    >
                      {inner}
                    </button>
                  ) : (
                    <Link href={item.href!} className="flex items-center px-6 py-2.5 rounded-full">{inner}</Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Contact + mobile toggle */}
          <span className="hidden md:inline-flex md:ml-8">
            <Button href="mailto:Azhar919@gmail.com" external variant="primary" size="sm" magnetic={false} icon={<Mail size={14} />} iconPosition="left">
              Contact
            </Button>
          </span>
          <button className="flex md:hidden items-center justify-center w-10 h-10 rounded-full" onClick={() => setMenuOpen(v => !v)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-menu">
            <Menu size={20} color="white" />
          </button>
        </motion.header>
      </div>

      {/* ── Floating dropdown card ── */}
      <AnimatePresence>
        {dropdownOpen && (
          <div className="fixed inset-x-0 z-40 hidden md:flex justify-center px-4 pointer-events-none" style={{ top: "76px" }}>
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: EASE }}
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
              className="pointer-events-auto"
              style={{
                width: "min(1040px, calc(100vw - 32px))",
                background: "rgba(14,14,14,0.92)",
                backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "var(--radius-2xl)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", gap: "20px", padding: "24px 28px" }}>
                {workItems.map((col, ci) => (
                  <Fragment key={col.company}>
                    {ci > 0 && <div className="divider-gold-v" aria-hidden="true" />}
                  <div className="flex flex-col" style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "0 12px", marginBottom: "10px" }}>
                      <LogoChip company={col.company} />
                      <p className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {col.company}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      {col.links.map((link) => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          onClick={() => setDropdownOpen(false)}
                          className="group block rounded-xl transition-colors duration-150"
                          style={{ padding: "11px 12px" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                        >
                          <span className="flex items-center" style={{ gap: "7px", fontSize: "var(--text-ui)", fontWeight: 500 }}>
                            <span className="transition-colors duration-150 group-hover:text-[var(--gold)]" style={{ color: "#FFFFFF", whiteSpace: "nowrap" }}>
                              {link.label}
                            </span>
                            <ArrowRight size={13} className="shrink-0 text-white/35 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--gold)]" />
                          </span>
                          <span style={{ display: "block", fontSize: "12.5px", color: "rgba(255,255,255,0.52)", lineHeight: 1.5, marginTop: "4px" }}>{link.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  </Fragment>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[49] flex flex-col md:hidden"
            style={{ background: "#0B0A09" }}
          >
            {/* Mobile header — logo left, X right */}
            <div
              className="flex items-center justify-between px-5 shrink-0"
              style={{ height: `${NAV_H}px`, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Link href="/" className="text-ghost hover:opacity-60 transition-opacity duration-200" aria-label="AM. — Azhar Mohamed, home" onClick={() => setMenuOpen(false)}>
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
                            {colIdx > 0 && (
                              <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "4px 0 0" }} />
                            )}
                            <div style={{ display: "flex", alignItems: "center", gap: "9px", marginTop: "24px", marginBottom: "12px" }}>
                              <LogoChip company={col.company} />
                              <p className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>
                                {col.company}
                              </p>
                            </div>
                            <div className="flex flex-col" style={{ paddingLeft: "16px" }}>
                              {col.links.map(link => (
                                <Link
                                  key={link.href + link.label}
                                  href={link.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="transition-colors duration-150 active:text-white"
                                  style={{ fontSize: "var(--text-md)", fontWeight: 400, color: "rgba(255,255,255,0.7)", marginBottom: "10px" }}
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
              {[{ label: "About me", href: "/#about" }, { label: "CV", href: "/cv" }].map((link, i) => (
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
                <Button href="mailto:Azhar919@gmail.com" external variant="primary" size="md" fullWidth icon={<Mail size={16} />} iconPosition="left" onClick={() => setMenuOpen(false)}>
                  Contact
                </Button>
              </motion.div>

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
