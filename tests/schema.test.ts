// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import {
  OKLCHChannelsSchema,
  SpaceKeySchema,
  SpaceScaleSchema,
  ColorScaleSchema,
  TypeStepSchema,
  TypeScaleSchema,
  MotionScaleSchema,
  TokenTreeSchema,
  COLOR_ROLES,
  tokens,
  colorLight,
} from "../src/index.js";

describe("OKLCHChannelsSchema — valid inputs", () => {
  const validCases = [
    "0% 0 0",
    "100% 0 0",
    "50% 0.2 180",
    "98% 0.005 240",
    "73% 0.15 30",
  ];

  it.each(validCases)("accepts channel triple: %s", (value) => {
    expect(OKLCHChannelsSchema.safeParse(value).success).toBe(true);
  });
});

describe("OKLCHChannelsSchema — invalid inputs", () => {
  const invalidCases: [string, string][] = [
    ["oklch(98% 0.005 240)", "must be channels only, no oklch() wrapper"],
    ["98%0.005 240", "no space between % and chroma"],
    ["98 0.005 240", "missing % on lightness"],
    ["98% 0.005", "missing hue component"],
    ["98% 0.005 240 / 0.5", "alpha not part of the channel form"],
    ["", "empty string"],
  ];

  it.each(invalidCases)("rejects: %s — %s", (value) => {
    expect(OKLCHChannelsSchema.safeParse(value).success).toBe(false);
  });
});

describe("SpaceKeySchema — valid and invalid keys", () => {
  const validKeys = ["0", "1", "2", "3", "4", "6", "8", "12", "16", "24", "32"];
  const invalidKeys = ["5", "7", "9", "10", "100", "", "0.5"];

  it.each(validKeys)("accepts valid key: %s", (key) => {
    expect(SpaceKeySchema.safeParse(key).success).toBe(true);
  });

  it.each(invalidKeys)("rejects non-scale key: %s", (key) => {
    expect(SpaceKeySchema.safeParse(key).success).toBe(false);
  });
});

describe("SpaceScaleSchema — value format validation", () => {
  const validValues: [string, string][] = [
    ["{ '0': '0rem' }", "0rem"],
    ["{ '1': '0.5rem' }", "0.5rem"],
    ["{ '2': '8px' }", "8px"],
    ["{ '3': '0.25rem' }", "0.25rem"],
  ];

  it.each(validValues)("accepts %s", (_, value) => {
    expect(SpaceScaleSchema.safeParse({ "0": value }).success).toBe(true);
  });

  const invalidValues: [string, string][] = [
    ["em unit", "0.5em"],
    ["no unit", "0.5"],
    ["unit only", "rem"],
    ["empty", ""],
    ["vw unit", "100vw"],
  ];

  it.each(invalidValues)("rejects value with %s", (_, value) => {
    expect(SpaceScaleSchema.safeParse({ "0": value }).success).toBe(false);
  });
});

describe("SpaceScaleSchema — key validation", () => {
  it("rejects a key outside the canonical space key enum", () => {
    expect(SpaceScaleSchema.safeParse({ "5": "2rem" }).success).toBe(false);
  });

  it("accepts a partial subset of canonical keys", () => {
    expect(SpaceScaleSchema.safeParse({ "0": "0rem", "4": "2rem" }).success).toBe(true);
  });
});

describe("ColorScaleSchema — full-role contract", () => {
  it("accepts a scale defining every color role", () => {
    expect(ColorScaleSchema.safeParse(colorLight).success).toBe(true);
  });

  it("rejects a scale missing one or more roles", () => {
    const { ring: _omitted, ...incomplete } = colorLight;
    expect(ColorScaleSchema.safeParse(incomplete).success).toBe(false);
  });

  it("rejects a scale with an invalid channel value on a role", () => {
    const invalid = { ...colorLight, primary: "oklch(50% 0.1 200)" };
    expect(ColorScaleSchema.safeParse(invalid).success).toBe(false);
  });

  it("requires exactly the COLOR_ROLES key set", () => {
    expect(Object.keys(colorLight).sort()).toEqual([...COLOR_ROLES].sort());
  });
});

describe("TypeStepSchema — weight boundary validation", () => {
  it("accepts weight at minimum boundary (100)", () => {
    expect(TypeStepSchema.safeParse({ size: "1rem", lineHeight: "1.5", weight: 100 }).success).toBe(true);
  });

  it("accepts weight at maximum boundary (900)", () => {
    expect(TypeStepSchema.safeParse({ size: "1rem", lineHeight: "1.5", weight: 900 }).success).toBe(true);
  });

  const invalidWeights: [string, number][] = [
    ["below minimum", 99],
    ["above maximum", 901],
    ["non-integer", 400.5],
    ["negative", -100],
    ["zero", 0],
  ];

  it.each(invalidWeights)("rejects weight %s (%d)", (_, weight) => {
    expect(
      TypeStepSchema.safeParse({ size: "1rem", lineHeight: "1.5", weight }).success,
    ).toBe(false);
  });
});

describe("TypeStepSchema — required field presence", () => {
  it("rejects when size is missing", () => {
    expect(TypeStepSchema.safeParse({ lineHeight: "1.5", weight: 400 }).success).toBe(false);
  });

  it("rejects when lineHeight is missing", () => {
    expect(TypeStepSchema.safeParse({ size: "1rem", weight: 400 }).success).toBe(false);
  });

  it("rejects when weight is missing", () => {
    expect(TypeStepSchema.safeParse({ size: "1rem", lineHeight: "1.5" }).success).toBe(false);
  });
});

describe("TypeScaleSchema — key and value validation", () => {
  const validStep = { size: "1rem", lineHeight: "1.5", weight: 400 };

  it("accepts a record containing a valid TypeKey", () => {
    expect(TypeScaleSchema.safeParse({ base: validStep }).success).toBe(true);
  });

  it("rejects a key outside the canonical type key enum", () => {
    expect(TypeScaleSchema.safeParse({ huge: validStep }).success).toBe(false);
  });

  it("rejects a step with an out-of-range weight", () => {
    expect(TypeScaleSchema.safeParse({ base: { ...validStep, weight: 9999 } }).success).toBe(false);
  });
});

describe("MotionScaleSchema — valid inputs", () => {
  it("accepts a well-formed motion scale with non-empty maps", () => {
    expect(MotionScaleSchema.safeParse({
      ease: { default: "cubic-bezier(0.4, 0, 0.2, 1)" },
      duration: { "100": "100ms" },
    }).success).toBe(true);
  });

  it("accepts empty ease and duration maps", () => {
    expect(MotionScaleSchema.safeParse({ ease: {}, duration: {} }).success).toBe(true);
  });
});

describe("MotionScaleSchema — invalid inputs", () => {
  it("rejects when ease is missing", () => {
    expect(MotionScaleSchema.safeParse({ duration: {} }).success).toBe(false);
  });

  it("rejects when duration is missing", () => {
    expect(MotionScaleSchema.safeParse({ ease: {} }).success).toBe(false);
  });

  it("rejects when an ease value is not a string", () => {
    expect(MotionScaleSchema.safeParse({ ease: { default: 42 }, duration: {} }).success).toBe(false);
  });

  it("rejects when a duration value is not a string", () => {
    expect(MotionScaleSchema.safeParse({ ease: {}, duration: { "100": 100 } }).success).toBe(false);
  });
});

describe("TokenTreeSchema — round-trip validation", () => {
  it("parses the bundled tokens object successfully", () => {
    const result = TokenTreeSchema.safeParse(tokens);
    expect(result.success).toBe(true);
  });

  it("rejects a tree with an invalid color value", () => {
    const invalid = { ...tokens, color: { ...colorLight, background: "not-a-channel-triple" } };
    expect(TokenTreeSchema.safeParse(invalid).success).toBe(false);
  });

  it("rejects a tree with a missing top-level group", () => {
    const { space: _omitted, ...withoutSpace } = tokens;
    expect(TokenTreeSchema.safeParse(withoutSpace).success).toBe(false);
  });

  it("rejects a tree with an invalid type weight", () => {
    const invalid = {
      ...tokens,
      type: { ...tokens.type, base: { ...tokens.type.base, weight: 9999 } },
    };
    expect(TokenTreeSchema.safeParse(invalid).success).toBe(false);
  });
});
