import { useCallback, useSyncExternalStore, type CSSProperties } from "react";

// Shared-element naming for the card → case-study hero morph.
// Both ends derive the same name: a card from its href, the hero from its slug.
//   /projects/african-bank/onboarding  →  case-african-bank-onboarding
//   slug "african-bank-onboarding"     →  case-african-bank-onboarding
export function caseVtName(hrefOrSlug: string): string {
  return "case-" + hrefOrSlug.replace(/^\/projects\//, "").replace(/\//g, "-");
}

/** Inline style that makes an element one end of the morph (see .morph in globals.css).
    The browser pairs the two ends by name across the route change. Only one
    *rendered* element may carry a given name at a time. */
export function morphStyle(hrefOrSlug: string | null | undefined): CSSProperties {
  if (!hrefOrSlug) return {};
  return { viewTransitionName: caseVtName(hrefOrSlug), viewTransitionClass: "morph" } as CSSProperties;
}

/* ── Which card is the active morph source ───────────────────────────
   Only the card that was actually clicked should be lifted out of the page
   for the transition (naming every card makes each one animate on its own).
   The last-clicked card is remembered, so navigating Back morphs the hero
   back into the same card. */
let activeMorph: string | null = null;
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };

export function useMorphSource(hrefOrSlug: string) {
  const name = caseVtName(hrefOrSlug);
  const active = useSyncExternalStore(subscribe, () => activeMorph === name, () => false);
  const arm = useCallback(() => {
    if (activeMorph === name) return;
    activeMorph = name;
    listeners.forEach((fn) => fn());
  }, [name]);
  return { style: active ? morphStyle(hrefOrSlug) : {}, arm };
}

// True only while the very first page of the visit is rendering. Entrance
// animations on shared elements are skipped on later (client) navigations, so
// the view-transition snapshot captures them already in place.
let firstLoad = true;
export const isFirstLoad = () => firstLoad;
export const markLoaded = () => { firstLoad = false; };
