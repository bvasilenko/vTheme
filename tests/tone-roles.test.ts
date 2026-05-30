// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import {
  COLOR_ROLES,
  colorLight,
  colorDark,
  ColorScaleSchema,
  parseColorScale,
  OKLCHChannelsSchema,
} from "../src/index.js";

const TONES = ["ok", "warn", "bad", "info", "meta"] as const;
const POSITIONS = ["fg", "bg", "soft"] as const;
const TONE_ROLES = TONES.flatMap((t) => POSITIONS.map((p) => `tone-${t}-${p}`));

describe("tone-* color roles - 15-role completeness", () => {
  it("COLOR_ROLES contains every tone-{ok,warn,bad,info,meta}-{fg,bg,soft} role", () => {
    for (const role of TONE_ROLES) {
      expect(COLOR_ROLES).toContain(role);
    }
  });

  it("colorLight defines every tone role with a valid OKLCH channel triple", () => {
    for (const role of TONE_ROLES) {
      const value = (colorLight as Record<string, string>)[role];
      expect(value, `colorLight.${role} missing`).toBeDefined();
      expect(
        OKLCHChannelsSchema.safeParse(value).success,
        `colorLight.${role} = "${value}" not a valid OKLCH triple`,
      ).toBe(true);
    }
  });

  it("colorDark defines every tone role with a valid OKLCH channel triple", () => {
    for (const role of TONE_ROLES) {
      const value = (colorDark as Record<string, string>)[role];
      expect(value, `colorDark.${role} missing`).toBeDefined();
      expect(
        OKLCHChannelsSchema.safeParse(value).success,
        `colorDark.${role} = "${value}" not a valid OKLCH triple`,
      ).toBe(true);
    }
  });
});

describe("ColorScaleSchema - strict mode rejects 0.2.x scales missing tone roles", () => {
  it("rejects a scale that omits all tone-* roles", () => {
    const without = { ...colorLight } as Record<string, string>;
    for (const role of TONE_ROLES) delete without[role];
    expect(ColorScaleSchema.safeParse(without).success).toBe(false);
  });

  it("rejects a scale missing even a single tone-* role", () => {
    const without = { ...colorLight } as Record<string, string>;
    delete without["tone-ok-soft"];
    expect(ColorScaleSchema.safeParse(without).success).toBe(false);
  });
});

describe("parseColorScale - transitional opt-out via { strict: false }", () => {
  it("strict=true (default) rejects a 0.2.x scale without tone-* roles", () => {
    const legacy = { ...colorLight } as Record<string, string>;
    for (const role of TONE_ROLES) delete legacy[role];
    expect(parseColorScale(legacy).success).toBe(false);
    expect(parseColorScale(legacy, { strict: true }).success).toBe(false);
  });

  it("strict=false accepts a 0.2.x scale without tone-* roles", () => {
    const legacy = { ...colorLight } as Record<string, string>;
    for (const role of TONE_ROLES) delete legacy[role];
    expect(parseColorScale(legacy, { strict: false }).success).toBe(true);
  });

  it("strict=false still rejects a scale missing a core (non-tone) role", () => {
    const legacy = { ...colorLight } as Record<string, string>;
    delete legacy["primary"];
    expect(parseColorScale(legacy, { strict: false }).success).toBe(false);
  });

  it("strict=false passes through extra unknown keys", () => {
    const extended = { ...colorLight, "brand-x": "50% 0.1 200" } as Record<string, string>;
    expect(parseColorScale(extended, { strict: false }).success).toBe(true);
  });

  it("strict=false still rejects invalid OKLCH channel values on core roles", () => {
    const broken = { ...colorLight, primary: "not-a-channel" } as Record<string, string>;
    expect(parseColorScale(broken, { strict: false }).success).toBe(false);
  });
});
