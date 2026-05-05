// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { tokens, cssVars } from "../src/index.js";

describe("cssVars — key prefix contract", () => {
  it("every emitted key starts with --v-", () => {
    for (const key of Object.keys(cssVars(tokens))) {
      expect(key.startsWith("--v-"), `"${key}" does not start with --v-`).toBe(true);
    }
  });
});

describe("cssVars — group key coverage", () => {
  const vars = cssVars(tokens);

  it("every space key appears as --v-space-{key}", () => {
    for (const key of Object.keys(tokens.space)) {
      expect(vars).toHaveProperty(`--v-space-${key}`);
    }
  });

  it("every color key appears as --v-color-{key}", () => {
    for (const key of Object.keys(tokens.color)) {
      expect(vars).toHaveProperty(`--v-color-${key}`);
    }
  });

  it("every motion ease key appears as --v-motion-ease-{key}", () => {
    for (const key of Object.keys(tokens.motion.ease)) {
      expect(vars).toHaveProperty(`--v-motion-ease-${key}`);
    }
  });

  it("every motion duration key appears as --v-motion-duration-{key}", () => {
    for (const key of Object.keys(tokens.motion.duration)) {
      expect(vars).toHaveProperty(`--v-motion-duration-${key}`);
    }
  });
});

describe("cssVars — camelCase to kebab-case conversion", () => {
  const vars = cssVars(tokens);

  it("TypeStep.lineHeight maps to --v-type-{step}-line-height for every step", () => {
    for (const key of Object.keys(tokens.type)) {
      expect(vars).toHaveProperty(`--v-type-${key}-line-height`);
    }
  });

  it("TypeStep.size maps to --v-type-{step}-size for every step", () => {
    for (const key of Object.keys(tokens.type)) {
      expect(vars).toHaveProperty(`--v-type-${key}-size`);
    }
  });

  it("TypeStep.weight maps to --v-type-{step}-weight for every step", () => {
    for (const key of Object.keys(tokens.type)) {
      expect(vars).toHaveProperty(`--v-type-${key}-weight`);
    }
  });
});

describe("cssVars — value serialisation", () => {
  const vars = cssVars(tokens);

  it("numeric values are stringified (TypeStep.weight → string)", () => {
    for (const [key, step] of Object.entries(tokens.type)) {
      const cssKey = `--v-type-${key}-weight`;
      expect(typeof vars[cssKey]).toBe("string");
      expect(vars[cssKey]).toBe(String(step.weight));
    }
  });

  it("space values are passed through unchanged", () => {
    for (const [key, value] of Object.entries(tokens.space)) {
      expect(vars[`--v-space-${key}`]).toBe(value);
    }
  });

  it("color values are passed through unchanged", () => {
    for (const [key, value] of Object.entries(tokens.color)) {
      expect(vars[`--v-color-${key}`]).toBe(value);
    }
  });
});

describe("cssVars — override behaviour", () => {
  it("defaults to tokens when called with no argument", () => {
    expect(cssVars()).toEqual(cssVars(tokens));
  });

  it("reflects overridden values when a custom TokenTree is supplied", () => {
    const custom = { ...tokens, space: { ...tokens.space, "0": "999rem" } };
    expect(cssVars(custom)["--v-space-0"]).toBe("999rem");
  });

  it("does not affect the original tokens output after a custom call", () => {
    const custom = { ...tokens, space: { ...tokens.space, "0": "999rem" } };
    cssVars(custom);
    expect(cssVars(tokens)["--v-space-0"]).toBe(tokens.space["0"]);
  });
});

describe("cssVars — output completeness", () => {
  it("emits exactly one CSS variable per scalar token value across the entire tree", () => {
    const vars = cssVars(tokens);
    const typeFieldCount = Object.keys(Object.values(tokens.type)[0]!).length;
    const expected =
      Object.keys(tokens.space).length +
      Object.keys(tokens.color).length +
      Object.keys(tokens.type).length * typeFieldCount +
      Object.keys(tokens.motion.ease).length +
      Object.keys(tokens.motion.duration).length;
    expect(Object.keys(vars).length).toBe(expected);
  });
});
