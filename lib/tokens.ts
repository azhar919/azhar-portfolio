/**
 * Design system tokens — canonical source of truth.
 * CSS custom properties in app/globals.css mirror these values.
 * Tailwind utilities are generated from globals.css @theme.
 */

// ── Colours ───────────────────────────────────────────────────
export const colors = {
  // Brand
  primary:         "#0C0C0C",
  // Accent
  accent:          "#C4622D",
  accentHover:     "#A8521F",
  // Backgrounds
  bgDark:          "#0C0C0C",
  bgWhite:         "#FFFFFF",
  bgLight:         "#F5F5F5",
  // Text
  textPrimary:     "#0C0C0C",
  textSecondary:   "#6B6B6B",
  textMuted:       "#9B9B9B",
  textInverse:     "#FFFFFF",
  // Borders
  borderDefault:   "#E5E5E5",
  borderSubtle:    "#F0F0F0",
} as const;

// ── Gradients ─────────────────────────────────────────────────
export const gradients = {
  hero:       "radial-gradient(ellipse at 80% 20%, #1A1A1A 0%, #0C0C0C 60%)",
  heroSubtle: "radial-gradient(ellipse at 60% 0%,  #1A1A1A 0%, #0C0C0C 50%)",
} as const;

// ── Typography ────────────────────────────────────────────────
export const typography = {
  fontDisplay: "Plus Jakarta Sans",
  fontBody:    "Inter",
  scale: {
    display: { size: "72px",  lineHeight: 1.05, weight: 700, tracking: "-0.03em" },
    h1:      { size: "56px",  lineHeight: 1.1,  weight: 700, tracking: "-0.02em" },
    h2:      { size: "40px",  lineHeight: 1.2,  weight: 600, tracking: "-0.02em" },
    h3:      { size: "28px",  lineHeight: 1.3,  weight: 600, tracking: "-0.01em" },
    h4:      { size: "20px",  lineHeight: 1.4,  weight: 500, tracking: "0"       },
    bodyLg:  { size: "18px",  lineHeight: 1.7,  weight: 400, tracking: "0"       },
    body:    { size: "16px",  lineHeight: 1.7,  weight: 400, tracking: "0"       },
    small:   { size: "14px",  lineHeight: 1.6,  weight: 400, tracking: "0"       },
    label:   { size: "11px",  lineHeight: 1.4,  weight: 500, tracking: "0.08em", transform: "uppercase" },
  },
} as const;

// ── Spacing ───────────────────────────────────────────────────
export const spacing = {
  xs:  "4px",
  sm:  "8px",
  md:  "16px",
  lg:  "24px",
  xl:  "40px",
  "2xl": "64px",
  "3xl": "96px",
  "4xl": "128px",
} as const;

// ── Border radius ─────────────────────────────────────────────
export const radius = {
  sm:   "4px",
  md:   "8px",
  lg:   "12px",
  xl:   "16px",
  "2xl":"24px",
  full: "9999px",
} as const;

// ── Shadows ───────────────────────────────────────────────────
export const shadows = {
  sm:    "0 1px 4px rgba(0,0,0,0.06)",
  md:    "0 4px 16px rgba(0,0,0,0.08)",
  lg:    "0 8px 32px rgba(0,0,0,0.12)",
  float: "0 2px 12px rgba(0,0,0,0.08)",
} as const;

export type ColorToken    = keyof typeof colors;
export type SpacingToken  = keyof typeof spacing;
export type RadiusToken   = keyof typeof radius;
export type ShadowToken   = keyof typeof shadows;
