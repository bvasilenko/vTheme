// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import type { ColorScale } from "../schema/index.js";

// Values are OKLCH channel triples "L% C H" (see color.schema.ts).
// `colorLight` is the default mode (emitted at `:root`); `colorDark` is
// emitted under `.dark` by the Tailwind preset. Both define every role in
// COLOR_ROLES — that completeness is the contract.

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
};
