// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import type { TypeScale } from "../schema/index.js";

export const typeScale: TypeScale = {
  xs:   { size: "0.444rem", lineHeight: "1.6",  weight: 400 },
  sm:   { size: "0.667rem", lineHeight: "1.55", weight: 400 },
  base: { size: "1rem",     lineHeight: "1.5",  weight: 400 },
  lg:   { size: "1.5rem",   lineHeight: "1.45", weight: 500 },
  xl:   { size: "2.25rem",  lineHeight: "1.4",  weight: 600 },
  "2xl": { size: "3.375rem", lineHeight: "1.35", weight: 600 },
  "3xl": { size: "5.063rem", lineHeight: "1.3",  weight: 700 },
  "4xl": { size: "7.594rem", lineHeight: "1.2",  weight: 700 },
  "5xl": { size: "11.39rem", lineHeight: "1.1",  weight: 800 },
};
