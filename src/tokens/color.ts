// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import type { ColorScale } from "../schema/index.js";

export const colorLight: ColorScale = {
  bg:          "oklch(98% 0.005 240)",
  fg:          "oklch(12% 0.01 240)",
  muted:       "oklch(60% 0.012 240)",
  accent:      "oklch(55% 0.2 250)",
  destructive: "oklch(55% 0.22 27)",
  success:     "oklch(55% 0.18 145)",
  warning:     "oklch(70% 0.18 65)",
};

export const colorDark: ColorScale = {
  bg:          "oklch(10% 0.005 240)",
  fg:          "oklch(95% 0.005 240)",
  muted:       "oklch(45% 0.012 240)",
  accent:      "oklch(65% 0.2 250)",
  destructive: "oklch(65% 0.22 27)",
  success:     "oklch(65% 0.18 145)",
  warning:     "oklch(78% 0.18 65)",
};
