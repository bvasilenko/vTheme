// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { z } from "zod";

export const OKLCHSchema = z.string().regex(
  /^oklch\(\d+(\.\d+)?% \d+(\.\d+)? \d+(\.\d+)?\)$/,
);

export const ColorScaleSchema = z.record(z.string(), OKLCHSchema);

export type OKLCH = `oklch(${number}% ${number} ${number})`;
export type ColorScale = Readonly<Record<string, OKLCH>>;
