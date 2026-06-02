"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Briefcase, Mail } from "lucide-react";
import Button from "./Button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const NAV_H = 72;
const LOGO_PATH = "M14 2L27 26H22.5L19 17H9L5.5 26H1L14 2ZM14 6L11 16H17L14 6Z";

/* Interactive logo — terracotta outline redraws + glow on hover */
function LogoMark() {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      style={{ width: 26, height: 26, position: "relative", display: "inline-flex" }}
    >
      <motion.div variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.1, rotate: -4 } }} transition={{ type: "spring", stiffness: 300, damping: 15 }} style={{ width: "100%", height: "100%" }}>
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Home" style={{ overflow: "visible" }}>
          <path fillRule="evenodd" clipRule="evenodd" d={LOGO_PATH} fill="currentColor" />
          <motion.path
            d={LOGO_PATH}
            fill="none"
            stroke="#C4622D"
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 4px rgba(196,98,45,0.8))" }}
            variants={{ rest: { pathLength: 0, opacity: 0 }, hover: { pathLength: 1, opacity: 1 } }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* Magnetic wrapper — child eases toward the cursor */
function Magnetic({ children, strength = 0.4 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15 });
  const sy = useSpring(y, { stiffness: 220, damping: 15 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy, display: "inline-flex" }}>
      {children}
    </motion.div>
  );
}

const workItems = [
  {
    company: "African Bank",
    links: [
      { label: "Improved Onboarding", desc: "Reducing friction in customer sign-up",                 href: "/projects/african-bank/onboarding" },
      { label: "Website Redesign",    desc: "Rebuilding the digital banking platform",              href: "/projects/african-bank/website-redesign" },
    ],
  },
  {
    company: "IQ Business",
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
  { key: "about",    label: "About",    href: "/#about" },
  { key: "cv",       label: "CV",       href: "/cv" },
];

export default function FloatingNav() {
  const [dropdownOpen, setDropdownOpen]     = useState(false);
  const [menuOpen, setMenuOpen]             = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const [hoveredKey, setHoveredKey]         = useState<string | null>(null);
  const [scrolled, setScrolled]             = useState(false);
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

  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const openDropdown  = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setDropdownOpen(true); };
  const closeDropdown = () => { timeoutRef.current = setTimeout(() => setDropdownOpen(false), 200); };

  const activeKey =
    pathname === "/" ? "home"
    : pathname === "/cv" ? "cv"
    : pathname.startsWith("/projects") ? "projects"
    : null;

  return (
    <>
      {/* ── Floating pill nav ── */}
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 pointer-events-none">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="pointer-events-auto flex items-center gap-2 w-full md:w-auto justify-between md:justify-start"
          style={{
            background: scrolled ? "rgba(10,10,10,0.85)" : "rgba(10,10,10,0.55)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "9999px",
            boxShadow: scrolled
              ? "0 12px 40px rgba(0,0,0,0.5)"
              : "0 8px 32px rgba(0,0,0,0.35)",
            padding: "10px 10px 10px 26px",
            transition: "background 0.3s, box-shadow 0.3s",
            position: "relative",
          }}
        >
          {/* Reading progress bar — hugs the bottom of the pill */}
          <div aria-hidden="true" style={{ position: "absolute", left: "26px", right: "26px", bottom: "6px", height: "2px", borderRadius: "9999px", background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
            <motion.div style={{ height: "100%", borderRadius: "9999px", background: "#C4622D", transformOrigin: "0% 50%", scaleX: progressX, boxShadow: "0 0 8px rgba(196,98,45,0.6)" }} />
          </div>

          {/* Logo */}
          <Link href="/" className="text-ghost transition-opacity duration-200 shrink-0 md:mr-6" aria-label="Home">
            <LogoMark />
          </Link>

          {/* Centre — desktop links with sliding indicator */}
          <nav
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={() => { setHoveredKey(null); closeDropdown(); }}
          >
            {NAV_ITEMS.map((item) => {
              const lit = (hoveredKey ?? activeKey) === item.key;
              const inner = (
                <span
                  className="relative z-10 inline-flex items-center gap-1.5"
                  style={{ fontSize: "15px", fontWeight: 500, color: lit ? "#fff" : "rgba(255,255,255,0.62)", transition: "color 0.2s" }}
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
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.09)", borderRadius: "9999px" }}
                    />
                  )}
                  {item.dropdown ? (
                    <button className="flex items-center px-5 py-2.5 rounded-full">{inner}</button>
                  ) : (
                    <Link href={item.href!} className="flex items-center px-5 py-2.5 rounded-full">{inner}</Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Contact + mobile toggle */}
          <span className="hidden md:inline-flex md:ml-5">
            <Magnetic strength={0.5}>
              <Button href="mailto:Azhar919@gmail.com" external variant="primary" size="sm" icon={<Mail size={14} />} iconPosition="left">
                Contact
              </Button>
            </Magnetic>
          </span>
          <button className="flex md:hidden items-center justify-center w-10 h-10 rounded-full" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
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
                width: "min(900px, calc(100vw - 32px))",
                background: "rgba(14,14,14,0.92)",
                backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "22px",
                boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", padding: "24px" }}>
                {workItems.map((col) => (
                  <div key={col.company} className="flex flex-col">
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0 12px", marginBottom: "10px" }}>
                      <Briefcase size={13} color="#C4622D" />
                      <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)" }}>
                        {col.company}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      {col.links.map((link) => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          onClick={() => setDropdownOpen(false)}
                          className="group flex items-center justify-between rounded-xl transition-colors duration-150"
                          style={{ padding: "10px 12px" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="transition-colors duration-150 group-hover:text-[#C4622D]" style={{ fontSize: "15px", fontWeight: 500, color: "#FFFFFF" }}>
                              {link.label}
                            </span>
                            <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{link.desc}</span>
                          </div>
                          <span className="shrink-0 ml-3 transition-transform duration-200 group-hover:translate-x-1">
                            <ArrowRight size={14} className="transition-colors duration-200 group-hover:text-[#C4622D]" style={{ color: "rgba(255,255,255,0.3)" }} />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
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
                            {colIdx > 0 && (
                              <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "4px 0 0" }} />
                            )}
                            <p style={{
                              fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
                              color: "rgba(255,255,255,0.4)", marginTop: "24px", marginBottom: "12px",
                            }}>
                              {col.company}
                            </p>
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
