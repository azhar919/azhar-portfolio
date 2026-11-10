"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "@/components/icons";

type Theme = "dark" | "light";

const read = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

/**
 * Dark ⇄ warm-paper light. The choice is stored and applied before first paint
 * by the inline script in app/layout.tsx. Where the browser supports view
 * transitions, the new theme opens outward in a circle from the button.
 */
export default function ThemeToggle({ size = 40 }: { size?: number }) {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => { setTheme(read()); }, []);

  const apply = (next: Theme) => {
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* private mode */ }
    setTheme(next);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = read() === "light" ? "dark" : "light";
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) { apply(next); return; }

    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-r", `${radius}px`);
    root.classList.add("theme-switching");
    const vt = document.startViewTransition(() => { flushSync(() => apply(next)); });
    vt.finished.finally(() => root.classList.remove("theme-switching"));
  };

  const toLight = theme === "dark";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={toLight ? "Switch to light theme" : "Switch to dark theme"}
      title={toLight ? "Light theme" : "Dark theme"}
      className="shrink-0 transition-colors duration-200"
      style={{
        width: size, height: size, borderRadius: "50%", display: "grid", placeItems: "center", overflow: "hidden",
        color: "rgb(var(--ink-rgb) / calc(0.75 * var(--ink-k)))",
        background: "rgb(var(--ink-rgb) / calc(0.05 * var(--ink-k)))",
        border: "1px solid rgb(var(--ink-rgb) / calc(0.12 * var(--ink-k)))",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, rotate: -50, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -14, rotate: 50, opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{ display: "inline-flex" }}
        >
          {toLight ? <Sun size={17} /> : <Moon size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
