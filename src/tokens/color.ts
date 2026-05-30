// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import type { ColorScale } from "../schema/index.js";

// Values are OKLCH channel triples "L% C H" (see color.schema.ts).
// `colorLight` is the default mode (emitted at `:root`); `colorDark` is
// emitted under `.dark` by the Tailwind preset. Both define every role in
// COLOR_ROLES - that completeness is the contract.
//
// 0.3.0 adds the five-tone semantic palette (`tone-{ok,warn,bad,info,meta}`)
// each with three ramp positions: `-fg` (base text/border tone), `-bg`
// (saturated tint for pill backgrounds), `-soft` (deeper wash for callout
// surfaces). Defaults are OKLCH translations of the proposal-html `--tone-*`
// hex values, retuned for the dark mode by lifting lightness while preserving
// hue and chroma proportionality.

export const colorLight: ColorScale = {
  background: "98% 0.005 240",
  foreground: "12% 0.01 240",
  card: "100% 0 0",
  "card-foreground": "12% 0.01 240",
  popover: "100% 0 0",
  "popover-foreground": "12% 0.01 240",
  primary: "55% 0.2 250",
  "primary-foreground": "99% 0.005 250",
  secondary: "95% 0.01 240",
  "secondary-foreground": "20% 0.02 240",
  muted: "95% 0.008 240",
  "muted-foreground": "55% 0.015 240",
  accent: "95% 0.01 240",
  "accent-foreground": "20% 0.02 240",
  destructive: "55% 0.22 27",
  "destructive-foreground": "99% 0.005 27",
  success: "55% 0.18 145",
  "success-foreground": "99% 0.005 145",
  warning: "70% 0.18 65",
  "warning-foreground": "20% 0.05 65",
  border: "90% 0.008 240",
  input: "90% 0.008 240",
  ring: "55% 0.2 250",
  // tone-ok    #4a7c59 / #e4ede4 / #eff5ee
  "tone-ok-fg": "49% 0.07 145",
  "tone-ok-bg": "93% 0.018 145",
  "tone-ok-soft": "96% 0.013 145",
  // tone-warn  #b0823f / #f5e8d2 / #f9f1e1
  "tone-warn-fg": "61% 0.1 70",
  "tone-warn-bg": "93% 0.04 80",
  "tone-warn-soft": "96% 0.025 85",
  // tone-bad   #a05a4a / #efd5cd / #f5e3dc
  "tone-bad-fg": "52% 0.09 35",
  "tone-bad-bg": "89% 0.035 35",
  "tone-bad-soft": "93% 0.02 35",
  // tone-info  #4d7ea8 / #d9e3ee / #e8eef5
  "tone-info-fg": "56% 0.08 245",
  "tone-info-bg": "91% 0.02 245",
  "tone-info-soft": "94% 0.013 245",
  // tone-meta  #7a6ea0 / #e2dcef / #ece7f4
  "tone-meta-fg": "52% 0.07 290",
  "tone-meta-bg": "90% 0.025 290",
  "tone-meta-soft": "93% 0.018 290",
};

export const colorDark: ColorScale = {
  background: "10% 0.005 240",
  foreground: "95% 0.005 240",
  card: "13% 0.006 240",
  "card-foreground": "95% 0.005 240",
  popover: "13% 0.006 240",
  "popover-foreground": "95% 0.005 240",
  primary: "65% 0.2 250",
  "primary-foreground": "10% 0.005 250",
  secondary: "22% 0.01 240",
  "secondary-foreground": "95% 0.005 240",
  muted: "22% 0.01 240",
  "muted-foreground": "65% 0.015 240",
  accent: "25% 0.012 240",
  "accent-foreground": "95% 0.005 240",
  destructive: "65% 0.22 27",
  "destructive-foreground": "10% 0.005 27",
  success: "65% 0.18 145",
  "success-foreground": "10% 0.005 145",
  warning: "78% 0.18 65",
  "warning-foreground": "15% 0.05 65",
  border: "25% 0.01 240",
  input: "25% 0.01 240",
  ring: "65% 0.2 250",
  // tone-ok (dark: lift fg, drop bg/soft into low-L washes)
  "tone-ok-fg": "70% 0.09 145",
  "tone-ok-bg": "25% 0.04 145",
  "tone-ok-soft": "20% 0.03 145",
  // tone-warn
  "tone-warn-fg": "75% 0.12 70",
  "tone-warn-bg": "28% 0.06 80",
  "tone-warn-soft": "22% 0.04 85",
  // tone-bad
  "tone-bad-fg": "68% 0.11 35",
  "tone-bad-bg": "26% 0.05 35",
  "tone-bad-soft": "20% 0.035 35",
  // tone-info
  "tone-info-fg": "72% 0.1 245",
  "tone-info-bg": "27% 0.05 245",
  "tone-info-soft": "21% 0.035 245",
  // tone-meta
  "tone-meta-fg": "70% 0.09 290",
  "tone-meta-bg": "27% 0.05 290",
  "tone-meta-soft": "21% 0.035 290",
};
