// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { tokens } from "../tokens/index.js";
import { COLOR_ROLES } from "../schema/index.js";

type FontSizeTuple = [string, { lineHeight: string; fontWeight: string }];

export type TailwindExtendTheme = {
  spacing: Record<string, string>;
  colors: Record<string, string>;
  fontSize: Record<string, FontSizeTuple>;
  fontFamily: Record<string, string>;
  letterSpacing: Record<string, string>;
  transitionDuration: Record<string, string>;
};

// Each color role resolves through a CSS variable, wrapped so Tailwind's
// `<alpha-value>` placeholder is honored - `bg-primary/80` works. The variable
// itself (`--v-color-<role>`) is injected by the preset's base layer.
const colors: Record<string, string> = Object.fromEntries(
  COLOR_ROLES.map((role) => [role, `oklch(var(--v-color-${role}) / <alpha-value>)`]),
);

// Font families resolve through `--v-font-<role>` CSS vars so consumers can
// override per-brand (`vbrand emit`) without rebuilding the Tailwind preset.
// The fallback chain in each token is still the source of truth - the CSS var
// carries the full stack as a single string.
const fontFamily: Record<string, string> = Object.fromEntries(
  Object.keys(tokens.font).map((role) => [role, `var(--v-font-${role})`]),
);

// Letter-spacing tokens emit as `tracking-*` Tailwind utilities. The CSS var
// indirection keeps brand overrides token-driven.
const letterSpacing: Record<string, string> = Object.fromEntries(
  Object.keys(tokens.tracking).map((role) => [role, `var(--v-tracking-${role})`]),
);

export const tailwindTheme: TailwindExtendTheme = {
  spacing: { ...tokens.space },
  colors,
  fontSize: Object.fromEntries(
    Object.entries(tokens.type).map(([key, step]) => [
      key,
      [step.size, { lineHeight: step.lineHeight, fontWeight: String(step.weight) }] satisfies FontSizeTuple,
    ]),
  ),
  fontFamily,
  letterSpacing,
  transitionDuration: { ...tokens.motion.duration },
};
