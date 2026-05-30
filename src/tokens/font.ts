// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import type { FontFamilyScale } from "../schema/index.js";

// The proposal-richness typestack. Each value is a comma-separated CSS
// font-family stack: the design-driver face first, then a progressively safer
// fallback chain so a missing webfont degrades through system stacks rather
// than the browser default. Mirrors the proposal-html `font-family` choices
// (Playfair Display headings, Inter body, JetBrains Mono code).
export const fontFamilyScale: FontFamilyScale = {
  sans: '"Inter", ui-sans-serif, system-ui, sans-serif',
  serif: '"Playfair Display", Georgia, serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};

// Individual TypeScript constants for non-token consumers (style objects,
// document.head font-face injection, JS-driven canvas labels, etc.).
export const fontSerif = fontFamilyScale.serif;
export const fontSans = fontFamilyScale.sans;
export const fontMono = fontFamilyScale.mono;
