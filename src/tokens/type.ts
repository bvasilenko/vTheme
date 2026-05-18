// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import type { TypeScale } from "../schema/index.js";

// A bounded modular type scale. `base` is 1rem; steps move in restrained
// increments and the display sizes are capped (5xl = 3rem) so headings stay
// usable in real layouts. Line-height loosens for body copy and tightens for
// display text; weight rises with size.
export const typeScale: TypeScale = {
  xs:    { size: "0.75rem",  lineHeight: "1.6",  weight: 400 },
  sm:    { size: "0.875rem", lineHeight: "1.55", weight: 400 },
  base:  { size: "1rem",     lineHeight: "1.5",  weight: 400 },
  lg:    { size: "1.125rem", lineHeight: "1.45", weight: 500 },
  xl:    { size: "1.25rem",  lineHeight: "1.4",  weight: 600 },
  "2xl": { size: "1.5rem",   lineHeight: "1.35", weight: 600 },
  "3xl": { size: "1.875rem", lineHeight: "1.3",  weight: 700 },
  "4xl": { size: "2.25rem",  lineHeight: "1.2",  weight: 700 },
  "5xl": { size: "3rem",     lineHeight: "1.1",  weight: 800 },
};
