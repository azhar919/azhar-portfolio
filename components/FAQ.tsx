"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Mail } from "lucide-react";
import { useReveal } from "./useReveal";
import { useSpotlight } from "./useSpotlight";
import Button from "./Button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const faqs = [
  { q: "What is your design process?",            a: "My process follows design thinking: research, ideation, prototyping, and user testing. Each phase adapts to project needs and client goals." },
  { q: "Which industries have you worked in?",    a: "I have worked with clients in banking, finance, and other sectors, focusing on user-centered design solutions." },
  { q: "Do you offer design operations support?", a: "Yes, I help teams improve workflows, streamline collaboration, and maintain consistent design quality." },
  { q: "How do you collaborate with clients?",    a: "I use regular check-ins, feedback sessions, and clear documentation to keep clients informed and involved throughout each project." },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  const { handlers, overlay } = useSpotlight({ radius: 260, color: "rgba(196,98,45,0.08)" });
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", position: "relative", overflow: "hidden" }} {...handlers}>
      {overlay}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group relative z-10"
        style={{ padding: "22px 0", gap: "16px" }}
        aria-expanded={isOpen}
      >
        <span
          className="transition-colors duration-200 group-hover:text-white"
          style={{ fontSize: "18px", fontWeight: 600, color: isOpen ? "#fff" : "rgba(255,255,255,0.82)", lineHeight: 1.4, letterSpacing: "-0.01em" }}
        >
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{
            flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%",
            display: "grid", placeItems: "center",
            border: `1px solid ${isOpen ? "rgba(196,98,45,0.45)" : "rgba(255,255,255,0.15)"}`,
            background: isOpen ? "rgba(196,98,45,0.12)" : "transparent",
            transition: "background 0.25s, border-color 0.25s",
          }}
        >
          <Plus size={16} color={isOpen ? "#C4622D" : "rgba(255,255,255,0.6)"} />
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
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, paddingBottom: "24px", paddingRight: "40px" }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQLeft() {
  const { ref, style } = useReveal({ y: 70, scale: 0.94, blur: 10 });
  return (
    <motion.div ref={ref} style={style} className="md:sticky md:top-32 flex flex-col gap-5 self-start">
      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4622D" }}>
        FAQ
      </p>
      <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#F5F1EC" }}>
        Your design questions, answered
      </h2>
      <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: "360px" }}>
        A few things people often ask about how I work. Still curious about something?
      </p>
      <div className="pt-2">
        <Button href="mailto:Azhar919@gmail.com" external variant="secondary" size="sm" icon={<Mail size={14} />} iconPosition="left">
          Get in touch
        </Button>
      </div>
    </motion.div>
  );
}

function FAQList() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const { ref, style } = useReveal({ y: 90, scale: 0.96, blur: 10 });
  return (
    <motion.div ref={ref} style={style} className="flex flex-col">
      {faqs.map((faq, i) => (
        <FAQItem
          key={i}
          faq={faq}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden" style={{ background: "#0B0A09", paddingTop: "120px", paddingBottom: "120px" }}>

      <div className="absolute pointer-events-none select-none" aria-hidden="true" style={{
        top: "20%", right: "-10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,98,45,0.13) 0%, transparent 70%)",
      }} />

      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">
          <FAQLeft />
          <FAQList />
        </div>
      </div>
    </section>
  );
}
