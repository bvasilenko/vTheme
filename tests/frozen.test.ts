// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { tokens } from "../src/index.js";

describe("frozen tokens — Object.isFrozen on every group", () => {
  it.each(Object.keys(tokens) as (keyof typeof tokens)[])(
    "tokens.%s is frozen",
    (group) => {
      expect(Object.isFrozen(tokens[group])).toBe(true);
    },
  );
});

describe("frozen tokens — nested objects frozen recursively", () => {
  it.each(Object.entries(tokens.type))(
    "type.%s step object is frozen",
    (_, step) => {
      expect(Object.isFrozen(step)).toBe(true);
    },
  );

  it("motion.ease map is frozen", () => {
    expect(Object.isFrozen(tokens.motion.ease)).toBe(true);
  });

  it("motion.duration map is frozen", () => {
    expect(Object.isFrozen(tokens.motion.duration)).toBe(true);
  });
});

describe("frozen tokens — mutations throw in strict mode", () => {
  it("throws when replacing a space value", () => {
    expect(() => {
      (tokens.space as Record<string, string>)["0"] = "999px";
    }).toThrow();
  });

  it("throws when replacing a color value", () => {
    expect(() => {
      (tokens.color as Record<string, string>).bg = "red";
    }).toThrow();
  });

  it("throws when mutating a nested TypeStep property", () => {
    expect(() => {
      (tokens.type.base as Record<string, unknown>).weight = 999;
    }).toThrow();
  });

  it("throws when mutating a motion ease value", () => {
    expect(() => {
      (tokens.motion.ease as Record<string, string>).default = "none";
    }).toThrow();
  });
});
