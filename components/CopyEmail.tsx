"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "@/components/icons";
import { EASE } from "@/lib/motion";

/** The big email address: click copies it to the clipboard and confirms inline.
    Falls back to opening the mail client if the clipboard isn't available. */
export default function CopyEmail({ email, style }: { email: string; style?: React.CSSProperties }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(id);
  }, [copied]);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Copy email address ${email}`}
      className="group relative inline-flex items-center text-left after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-accent after:transition-[width] after:duration-300 hover:after:w-full"
      style={{ gap: "14px", flexWrap: "wrap", color: "var(--ink-strong)", fontWeight: 700, letterSpacing: "-0.02em", ...style }}
    >
      <span style={{ overflowWrap: "anywhere" }}>{email}</span>
      <span
        aria-live="polite"
        className="inline-flex items-center"
        style={{
          gap: "6px", fontSize: "var(--text-xs)", fontWeight: 600, letterSpacing: "0.02em",
          borderRadius: "var(--radius-pill)", padding: "6px 12px", whiteSpace: "nowrap",
          color: copied ? "var(--bg)" : "rgb(var(--ink-rgb) / calc(0.7 * var(--ink-k)))",
          background: copied ? "var(--teal)" : "rgb(var(--ink-rgb) / calc(0.06 * var(--ink-k)))",
          border: `1px solid ${copied ? "transparent" : "rgb(var(--ink-rgb) / calc(0.14 * var(--ink-k)))"}`,
          transition: "background 0.25s, color 0.25s, border-color 0.25s",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "done" : "idle"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="inline-flex items-center"
            style={{ gap: "6px" }}
          >
            {copied ? <Check size={13} strokeWidth={2} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
