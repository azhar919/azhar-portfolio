// Feature flags for gating work that isn't ready to be public yet.
//
// SHOW_LIFE_HEALTHCARE: the Life Healthcare case study is built and wired, but
// held back until the real client site launches. While false, the case-study
// pages 404 and every link/feature to them is hidden (nav, footer, Selected
// Work card, projects list). Flip to true to republish it everywhere at once.
// Note: the "Worked with" logo (TrustStrip) and the CV experience entry are
// intentionally NOT gated — they stay visible as credentials.
export const SHOW_LIFE_HEALTHCARE = false;
