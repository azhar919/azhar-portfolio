"use client";

import { motion } from "framer-motion";
import { useReveal } from "./useReveal";

const clients = [
  { name: "IQ Business",  src: "/images/iqbusiness logo (FC) black.png", bg: "#F5F1EC", logoHeight: 46 },
  { name: "Nedbank",      src: "/images/Nedbank Logo.png",               bg: "#005944", logoHeight: 84 },
  { name: "African Bank", src: "/images/African Bank logo black.png",    bg: "#F5F1EC", logoHeight: 38 },
];

function LogoChip({ client, index }: { client: typeof clients[0]; index: number }) {
  const reveal =
    index === 0 ? { x: -120, y: 40, scale: 0.86, blur: 12 } :
    index === 2 ? { x: 120, y: 40, scale: 0.86, blur: 12 } :
    { y: 90, scale: 0.86, blur: 12 };
  const { ref, style } = useReveal(reveal);

  return (
    <motion.div ref={ref} style={style}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          background: client.bg,
          borderRadius: "var(--radius-xl)",
          height: "112px",
          display: "grid",
          placeItems: "center",
          padding: "0 28px",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={client.src}
          alt={client.name}
          style={{ height: `${client.logoHeight}px`, maxWidth: "100%", objectFit: "contain", display: "block" }}
        />
      </motion.div>
    </motion.div>
  );
}

function Eyebrow() {
  const { ref, style } = useReveal({ y: 40, scale: 0.96, blur: 8 });
  return (
    <motion.p
      ref={ref}
      style={{ ...style, fontSize: "var(--text-label)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", textAlign: "center", marginBottom: "32px" }}
    >
      Worked with
    </motion.p>
  );
}

export default function TrustStrip() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#0B0A09", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="page-container">
        <Eyebrow />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5" style={{ maxWidth: "900px", margin: "0 auto" }}>
          {clients.map((client, i) => (
            <LogoChip key={client.name} client={client} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
