// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { tokens } from "../tokens/index.js";
import { COLOR_ROLES } from "../schema/index.js";

type FontSizeTuple = [string, { lineHeight: string; fontWeight: string }];

export type TailwindExtendTheme = {
  spacing: Record<string, string>;
  colors: Record<string, string>;
  fontSize: Record<string, FontSizeTuple>;
  transitionDuration: Record<string, string>;
};

// Each color role resolves through a CSS variable, wrapped so Tailwind's
// `<alpha-value>` placeholder is honored — `bg-primary/80` works. The variable
// itself (`--v-color-<role>`) is injected by the preset's base layer.
const colors: Record<string, string> = Object.fromEntries(
  COLOR_ROLES.map((role) => [role, `oklch(var(--v-color-${role}) / <alpha-value>)`]),
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
  transitionDuration: { ...tokens.motion.duration },
};
