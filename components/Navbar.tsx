"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "My Profile",  href: "/" },
  { label: "My Projects", href: "/projects" },
  { label: "My CV",       href: "/cv" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark h-[80px] flex items-center justify-between px-5 md:px-10 lg:px-[72px]">
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
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
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
