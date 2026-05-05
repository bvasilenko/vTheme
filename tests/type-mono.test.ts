// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { tokens } from "../src/index.js";
import type { TypeKey } from "../src/index.js";

const TYPE_KEY_ORDER: TypeKey[] = [
  "xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl",
];

describe("type scale monotonicity", () => {
  it("sizes are strictly increasing across the ordered scale", () => {
    const sizes = TYPE_KEY_ORDER.map((k) => parseFloat(tokens.type[k]!.size));
    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i]!, `${TYPE_KEY_ORDER[i]} size is not larger than ${TYPE_KEY_ORDER[i - 1]}`).toBeGreaterThan(sizes[i - 1]!);
    }
  });

  it("lineHeight values are strictly decreasing across the ordered scale", () => {
    const lineHeights = TYPE_KEY_ORDER.map((k) => parseFloat(tokens.type[k]!.lineHeight));
    for (let i = 1; i < lineHeights.length; i++) {
      expect(
        lineHeights[i]!,
        `${TYPE_KEY_ORDER[i]} lineHeight is not smaller than ${TYPE_KEY_ORDER[i - 1]}`,
      ).toBeLessThan(lineHeights[i - 1]!);
    }
  });
});
