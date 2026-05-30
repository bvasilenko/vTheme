// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { z } from "zod";

// OKLCH channel triple: "L% C H" - lightness percentage, chroma, hue.
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
//
// 0.3.0 adds the five-tone semantic palette - `tone-ok | tone-warn | tone-bad
// | tone-info | tone-meta` - each in three ramp positions (`-fg` base, `-bg`
// saturated tint for pill backgrounds, `-soft` deep wash for callout
// surfaces). This is the proposal-richness tone vocabulary; downstream
// primitives (Badge `tone=*`, Pill, callout cards) resolve against it.
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
  // Five-tone semantic palette - each tone carries a base fg + bg tint + soft
  // wash, mirroring the proposal-html `--tone-*` set. 15 roles total.
  "tone-ok-fg",
  "tone-ok-bg",
  "tone-ok-soft",
  "tone-warn-fg",
  "tone-warn-bg",
  "tone-warn-soft",
  "tone-bad-fg",
  "tone-bad-bg",
  "tone-bad-soft",
  "tone-info-fg",
  "tone-info-bg",
  "tone-info-soft",
  "tone-meta-fg",
  "tone-meta-bg",
  "tone-meta-soft",
] as const;

export type ColorRole = (typeof COLOR_ROLES)[number];

// Strict: a color scale MUST define every role, no more, no less. This is the
// machine-checked half of the vTheme<->vUi contract. The strict shape is the
// default exported under `ColorScaleSchema`.
type ColorShape = { [K in ColorRole]: typeof OKLCHChannelsSchema };

const colorShape = Object.fromEntries(
  COLOR_ROLES.map((role) => [role, OKLCHChannelsSchema]),
) as ColorShape;

export const ColorScaleSchema = z.object(colorShape);

// Transitional opt-out for the 0.3.0 tone-roles addition. Consumers carrying a
// 0.2.x ColorScale that has not yet been extended with the 15 tone-* roles can
// parse against `ColorScaleSchema.passthrough()` directly via zod, or use the
// helper below which accepts a `--strict` flag mirroring a CLI ergonomic. When
// `strict` is `false`, missing tone-* roles are tolerated; when `true` (the
// default), the full COLOR_ROLES contract is enforced.
type ColorScaleParseOptions = { strict?: boolean };

export function parseColorScale(
  value: unknown,
  options: ColorScaleParseOptions = {},
): z.SafeParseReturnType<unknown, Record<string, string>> {
  const strict = options.strict ?? true;
  if (strict) {
    return ColorScaleSchema.safeParse(value) as z.SafeParseReturnType<
      unknown,
      Record<string, string>
    >;
  }
  // Loose mode: require the 0.2.x core roles, tolerate missing tone-* roles,
  // and allow unknown extra keys to pass through unchanged.
  const looseShape = Object.fromEntries(
    COLOR_ROLES.filter((role) => !role.startsWith("tone-")).map((role) => [
      role,
      OKLCHChannelsSchema,
    ]),
  );
  const LooseSchema = z.object(looseShape).passthrough();
  return LooseSchema.safeParse(value) as z.SafeParseReturnType<
    unknown,
    Record<string, string>
  >;
}

export type ColorScale = Readonly<Record<ColorRole, string>>;
