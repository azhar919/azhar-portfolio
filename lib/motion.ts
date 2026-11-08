/* ──────────────────────────────────────────────────────────────────
   Shared motion tokens.

   One easing curve and a small set of named springs for the whole site,
   so every transition shares the same physics. Inconsistent easing is
   itself a "designed by committee" tell — these keep it coherent.

   EASE  — the signature ease-out (expo-ish). Use for tween transitions.
   SPRING — named spring presets for interactive, physics-driven motion:
     · snappy  — crisp cursor tracking (spotlights, previews)
     · smooth  — general UI springs (reveals settling, layout)
     · gentle  — soft, weighty settle (large cards, parallax)
     · magnetic— the cursor-pull on CTAs / tilt return
   ────────────────────────────────────────────────────────────────── */

export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const SPRING = {
  snappy: { stiffness: 350, damping: 34, mass: 0.6 },
  smooth: { stiffness: 260, damping: 32, mass: 0.5 },
  gentle: { stiffness: 140, damping: 24, mass: 0.8 },
  magnetic: { stiffness: 220, damping: 18, mass: 0.4 },
} as const;
