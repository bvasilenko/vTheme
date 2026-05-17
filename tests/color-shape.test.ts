// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import {
  tokens,
  colorLight,
  colorDark,
  OKLCHChannelsSchema,
  COLOR_ROLES,
} from "../src/index.js";

describe("color scale — OKLCH channel format validity", () => {
  it.each(Object.entries(colorLight))(
    "colorLight.%s is a valid OKLCH channel triple",
    (key, value) => {
      expect(
        OKLCHChannelsSchema.safeParse(value).success,
        `colorLight.${key} = "${value}" failed channel validation`,
      ).toBe(true);
    },
  );

  it.each(Object.entries(colorDark))(
    "colorDark.%s is a valid OKLCH channel triple",
    (key, value) => {
      expect(
        OKLCHChannelsSchema.safeParse(value).success,
        `colorDark.${key} = "${value}" failed channel validation`,
      ).toBe(true);
    },
  );

  it("tokens.color is the colorLight reference", () => {
    expect(tokens.color).toBe(colorLight);
  });
});

describe("color scale — full role contract", () => {
  it("colorLight defines exactly the COLOR_ROLES set", () => {
    expect(Object.keys(colorLight).sort()).toEqual([...COLOR_ROLES].sort());
  });

  it("colorDark defines exactly the COLOR_ROLES set", () => {
    expect(Object.keys(colorDark).sort()).toEqual([...COLOR_ROLES].sort());
  });

  it("every base role has a paired -foreground role", () => {
    const paired = [
      "background",
      "card",
      "popover",
      "primary",
      "secondary",
      "muted",
      "accent",
      "destructive",
      "success",
      "warning",
    ];
    for (const base of paired) {
      const fg = base === "background" ? "foreground" : `${base}-foreground`;
      expect(COLOR_ROLES).toContain(base);
      expect(COLOR_ROLES).toContain(fg);
    }
  });

  it("line roles border / input / ring are present", () => {
    expect(COLOR_ROLES).toContain("border");
    expect(COLOR_ROLES).toContain("input");
    expect(COLOR_ROLES).toContain("ring");
  });
});

describe("color scale — light/dark structural parity", () => {
  it("colorLight and colorDark export the same set of keys", () => {
    expect(Object.keys(colorLight).sort()).toEqual(Object.keys(colorDark).sort());
  });

  it("at least one role differs between the light and dark scales", () => {
    const roles = Object.keys(colorLight) as (keyof typeof colorLight)[];
    const allSame = roles.every((k) => colorLight[k] === colorDark[k]);
    expect(allSame).toBe(false);
  });
});
