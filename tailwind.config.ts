import type { Config } from "tailwindcss";

/**
 * Tailwind CSS v4 — CSS-first configuration.
 * All design tokens are defined in app/globals.css via @theme {}.
 * This file handles content scanning and plugin registration only.
 * Canonical token values live in lib/tokens.ts.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
};

export default config;
