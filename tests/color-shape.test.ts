// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { tokens, colorLight, colorDark, OKLCHSchema } from "../src/index.js";

describe("color scale — OKLCH format validity", () => {
  it.each(Object.entries(colorLight))(
    "colorLight.%s is valid OKLCH",
    (key, value) => {
      expect(
        OKLCHSchema.safeParse(value).success,
        `colorLight.${key} = "${value}" failed OKLCH validation`,
      ).toBe(true);
    },
  );

  it.each(Object.entries(colorDark))(
    "colorDark.%s is valid OKLCH",
    (key, value) => {
      expect(
        OKLCHSchema.safeParse(value).success,
        `colorDark.${key} = "${value}" failed OKLCH validation`,
      ).toBe(true);
    },
  );

  it("tokens.color is the colorLight reference", () => {
    expect(tokens.color).toBe(colorLight);
  });
});

describe("color scale — light/dark structural parity", () => {
  it("colorLight and colorDark export the same set of keys", () => {
    expect(Object.keys(colorLight).sort()).toEqual(Object.keys(colorDark).sort());
  });

  it("at least one semantic key differs between the light and dark scales", () => {
    const sharedKeys = Object.keys(colorLight) as (keyof typeof colorLight)[];
    const allSame = sharedKeys.every((k) => colorLight[k] === colorDark[k]);
    expect(allSame).toBe(false);
  });

  it("both light and dark scales contain at least one semantic color key", () => {
    expect(Object.keys(colorLight).length).toBeGreaterThan(0);
    expect(Object.keys(colorDark).length).toBeGreaterThan(0);
  });
});
