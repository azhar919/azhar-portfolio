"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Mail } from "@/components/icons";
import { Reveal, RevealText, Stagger } from "./Reveal";
import { useSpotlight } from "./useSpotlight";
import Button from "./Button";
import Motif from "./Motif";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const faqs = [
  { q: "What is your design process?",            a: "My process follows design thinking: research, ideation, prototyping, and user testing. Each phase adapts to project needs and client goals." },
  { q: "Which industries have you worked in?",    a: "I have worked with clients in banking, finance, and other sectors, focusing on user-centered design solutions." },
  { q: "Do you offer design operations support?", a: "Yes, I help teams improve workflows, streamline collaboration, and maintain consistent design quality." },
  { q: "How do you collaborate with clients?",    a: "I use regular check-ins, feedback sessions, and clear documentation to keep clients informed and involved throughout each project." },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  const { handlers, overlay } = useSpotlight({ radius: 260, color: "rgb(var(--gold-rgb) / 0.08)" });
  return (
    <div style={{ borderBottom: "1px solid rgb(var(--ink-rgb) / calc(0.08 * var(--ink-k)))", position: "relative", overflow: "hidden" }} {...handlers}>
      {overlay}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group relative z-10"
        style={{ padding: "22px 0", gap: "16px" }}
        aria-expanded={isOpen}
      >
        <span
          className="transition-colors duration-200 group-hover:text-white"
          style={{ fontSize: "var(--text-lg)", fontWeight: 600, color: isOpen ? "var(--ink-strong)" : "rgb(var(--ink-rgb) / calc(0.82 * var(--ink-k)))", lineHeight: 1.4, letterSpacing: "-0.01em" }}
        >
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{
            flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%",
            display: "grid", placeItems: "center",
            border: `1px solid ${isOpen ? "rgb(var(--gold-rgb) / 0.45)" : "rgb(var(--ink-rgb) / calc(0.15 * var(--ink-k)))"}`,
            background: isOpen ? "rgb(var(--gold-rgb) / 0.12)" : "transparent",
            transition: "background 0.25s, border-color 0.25s",
          }}
        >
          <Plus size={16} color={isOpen ? "var(--gold)" : "rgb(var(--ink-rgb) / calc(0.6 * var(--ink-k)))"} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ overflow: "hidden", position: "relative", zIndex: 1 }}
          >
            <p style={{ fontSize: "var(--text-ui)", color: "rgb(var(--ink-rgb) / calc(0.5 * var(--ink-k)))", lineHeight: 1.8, paddingBottom: "24px", paddingRight: "40px" }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQLeft() {
  return (
    <Stagger gap={0.12} className="md:sticky md:top-32 flex flex-col gap-5 self-start">
      <Reveal item variant="fade">
        <p className="eyebrow" style={{ color: "var(--teal)" }}>
          FAQ
        </p>
      </Reveal>
      <RevealText item style={{ fontSize: "var(--text-h2)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "var(--ink)" }}>
        Your design questions, answered
      </RevealText>
      <Reveal item variant="rise">
        <p style={{ fontSize: "var(--text-md)", color: "rgb(var(--ink-rgb) / calc(0.55 * var(--ink-k)))", lineHeight: 1.7, maxWidth: "360px" }}>
          A few things people often ask about how I work. Still curious about something?
        </p>
      </Reveal>
      <Reveal item variant="rise" className="pt-2">
        <Button href="mailto:Azhar919@gmail.com" external variant="secondary" size="sm" icon={<Mail size={14} />} iconPosition="left">
          Get in touch
        </Button>
      </Reveal>
    </Stagger>
  );
}

function FAQList() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  return (
    <Stagger gap={0.09} delay={0.15} className="flex flex-col">
      {faqs.map((faq, i) => (
        <Reveal item variant="rise" key={i}>
          <FAQItem
            faq={faq}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        </Reveal>
      ))}
    </Stagger>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden" style={{ background: "var(--bg)", paddingTop: "120px", paddingBottom: "120px" }}>

      <Motif variant="arcs" tone="teal" size={560} parallax={55} style={{ top: "10%", right: "-10%" }} />

      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">
          <FAQLeft />
          <FAQList />
        </div>
      </div>
    </section>
  );
}
