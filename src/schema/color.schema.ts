// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { z } from "zod";

// OKLCH channel triple: "L% C H" — lightness percentage, chroma, hue.
// Stored channel-only (no `oklch()` wrapper, no alpha) so the Tailwind
// contract can wrap each role as `oklch(var(--v-color-<role>) / <alpha-value>)`,
// which keeps Tailwind opacity modifiers (`bg-primary/80`) working.
export const OKLCHChannelsSchema = z
  .string()
  .regex(/^\d+(\.\d+)?% \d+(\.\d+)? \d+(\.\d+)?$/);

export type OKLCHChannels = string;

// The semantic surface-role contract. Every vsuite component layer (vUi and
// everything downstream of it) consumes these role names; vTheme is their
// single source of truth (mission anchor 3). Base roles pair with a
// `-foreground` role so text-on-surface contrast is always expressible.
export const COLOR_ROLES = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "success",
  "success-foreground",
  "warning",
  "warning-foreground",
  "border",
  "input",
  "ring",
] as const;

export type ColorRole = (typeof COLOR_ROLES)[number];

// Strict: a color scale MUST define every role, no more, no less. This is the
// machine-checked half of the vTheme<->vUi contract.
type ColorShape = { [K in ColorRole]: typeof OKLCHChannelsSchema };

const colorShape = Object.fromEntries(
  COLOR_ROLES.map((role) => [role, OKLCHChannelsSchema]),
) as ColorShape;

export const ColorScaleSchema = z.object(colorShape);

export type ColorScale = Readonly<Record<ColorRole, string>>;
