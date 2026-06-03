"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const countries = [
  { id: "angola",       label: null,       path: "M 0,0 L 162,0 L 162,32 L 112,102 L 0,112 Z",                                                                                          highlighted: false },
  { id: "tanzania",     label: null,       path: "M 162,0 L 520,0 L 520,142 L 452,142 L 392,177 L 372,157 L 357,102 L 382,62 L 362,32 L 162,32 Z",                                      highlighted: false },
  { id: "zambia",       label: null,       path: "M 162,32 L 362,32 L 382,62 L 357,102 L 372,157 L 298,177 L 262,157 L 222,177 L 172,167 L 142,132 L 112,102 L 162,32 Z",             highlighted: false },
  { id: "botswana",     label: null,       path: "M 117,182 L 298,182 L 298,317 L 112,332 L 92,267 L 117,182 Z",                                                                         highlighted: false },
  { id: "mozambique",   label: null,       path: "M 392,177 L 452,142 L 520,192 L 520,392 L 447,357 L 427,322 L 397,287 L 412,217 Z",                                                   highlighted: false },
  { id: "south-africa", label: null,       path: "M 67,392 L 112,332 L 298,317 L 347,302 L 397,287 L 427,322 L 447,357 L 520,392 L 520,500 L 0,500 L 67,392 Z",                        highlighted: false },
  { id: "namibia",      label: "Namibia",  path: "M 0,112 L 112,102 L 142,132 L 117,182 L 92,267 L 112,332 L 67,392 L 0,392 Z",   dotPos: [62, 252] as [number,number], labelPos: [62, 278]  as [number,number], highlighted: true  },
  { id: "zimbabwe",     label: "Zimbabwe", path: "M 298,177 L 392,177 L 412,217 L 397,287 L 347,302 L 298,317 L 298,177 Z",        dotPos: [348, 240] as [number,number], labelPos: [348, 266] as [number,number], highlighted: true  },
  { id: "lesotho",      label: "Lesotho",  path: "M 278,408 L 308,400 L 318,427 L 292,437 L 270,422 Z",                            dotPos: [293, 419] as [number,number], labelPos: [240, 462] as [number,number], highlighted: true  },
  { id: "eswatini",     label: "Eswatini", path: "M 418,318 L 443,318 L 443,343 L 418,343 Z",                                      dotPos: [430, 330] as [number,number], labelPos: [480, 310] as [number,number], highlighted: true  },
];

function PulsingDot({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <g>
      {/* Outer glow */}
      <motion.circle
        cx={cx} cy={cy} r="10" fill="none" stroke="var(--gold)" strokeWidth="1.5"
        initial={{ opacity: 0.6, scale: 1 }}
        animate={{ opacity: 0, scale: 2.2 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay }}
      />
      {/* Mid ring */}
      <motion.circle
        cx={cx} cy={cy} r="7" fill="none" stroke="var(--gold)" strokeWidth="1"
        initial={{ opacity: 0.4, scale: 1 }}
        animate={{ opacity: 0, scale: 1.8 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: delay + 0.3 }}
      />
      {/* Core dot */}
      <circle cx={cx} cy={cy} r="4" fill="var(--gold)" />
      <circle cx={cx} cy={cy} r="2" fill="#fff" opacity="0.9" />
    </g>
  );
}

export default function SouthernAfricaMap() {
  return (
    <div style={{ position: "relative", borderRadius: "var(--radius-2xl)", overflow: "hidden", background: "#0D0D0D", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 32px 80px rgba(0,0,0,0.5)", padding: "40px" }}>
      <svg viewBox="0 0 520 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.06)" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect width="520" height="500" fill="url(#dots)" />

        {/* Country fills */}
        {countries.map((c, i) => (
          <motion.path
            key={c.id}
            d={c.path}
            fill={c.highlighted ? "rgb(var(--gold-rgb) / 0.2)" : "rgba(255,255,255,0.04)"}
            stroke={c.highlighted ? "var(--gold)" : "rgba(255,255,255,0.12)"}
            strokeWidth={c.highlighted ? 1.5 : 0.8}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
          />
        ))}

        {/* Glow halos on highlighted countries */}
        {countries.filter(c => c.highlighted).map(c => (
          <path key={`${c.id}-glow`} d={c.path} fill="none" stroke="var(--gold)" strokeWidth="8" opacity="0.12" style={{ filter: "blur(5px)" }} />
        ))}

        {/* Labels + connectors + pulsing dots */}
        {countries.filter(c => c.label && c.dotPos && c.labelPos).map((c, i) => {
          const [dx, dy] = c.dotPos!;
          const [lx, ly] = c.labelPos!;
          const isSmall = c.id === "lesotho" || c.id === "eswatini";
          return (
            <motion.g
              key={`${c.id}-label`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.7 + i * 0.1 }}
            >
              {/* Connector line for small countries */}
              {isSmall && (
                <line x1={dx} y1={dy} x2={lx} y2={ly - 6} stroke="rgb(var(--gold-rgb) / 0.4)" strokeWidth="0.8" strokeDasharray="3,2" />
              )}
              {/* Pulsing dot */}
              <PulsingDot cx={dx} cy={dy} delay={i * 0.4} />
              {/* Label */}
              <text
                x={lx} y={ly}
                textAnchor={isSmall && c.id === "eswatini" ? "start" : isSmall ? "end" : "middle"}
                fontSize={isSmall ? "9" : "11"}
                fontWeight="600"
                fontFamily="system-ui, sans-serif"
                fill="#FFFFFF"
                letterSpacing="0.4"
              >
                {c.label}
              </text>
            </motion.g>
          );
        })}
      </svg>

      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "20px", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "rgb(var(--gold-rgb) / 0.25)", border: "1.5px solid var(--gold)" }} />
          <span style={{ fontSize: "var(--text-label)", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Nedbank operating regions</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: "rgba(255,255,255,0.04)", border: "0.8px solid rgba(255,255,255,0.12)" }} />
          <span style={{ fontSize: "var(--text-label)", color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>Surrounding countries</span>
        </div>
      </div>
    </div>
  );
}
