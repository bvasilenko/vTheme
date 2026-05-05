// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { tokens, tailwindTheme } from "../src/index.js";
import type { TypeKey } from "../src/index.js";

describe("tailwindTheme — required top-level keys", () => {
  it.each(["spacing", "colors", "fontSize", "transitionDuration"] as const)(
    "has the %s key",
    (key) => {
      expect(tailwindTheme).toHaveProperty(key);
    },
  );
});

describe("tailwindTheme — key set parity with token scales", () => {
  it("spacing keys match the space scale keys", () => {
    expect(Object.keys(tailwindTheme.spacing).sort()).toEqual(
      Object.keys(tokens.space).sort(),
    );
  });

  it("colors keys match the color scale keys", () => {
    expect(Object.keys(tailwindTheme.colors).sort()).toEqual(
      Object.keys(tokens.color).sort(),
    );
  });

  it("fontSize keys match the type scale keys", () => {
    expect(Object.keys(tailwindTheme.fontSize).sort()).toEqual(
      Object.keys(tokens.type).sort(),
    );
  });

  it("transitionDuration keys match the motion duration keys", () => {
    expect(Object.keys(tailwindTheme.transitionDuration).sort()).toEqual(
      Object.keys(tokens.motion.duration).sort(),
    );
  });
});

describe("tailwindTheme — value correctness against token source", () => {
  it("fontSize sizes match the type scale sizes", () => {
    for (const [key, [size]] of Object.entries(tailwindTheme.fontSize)) {
      expect(size).toBe(tokens.type[key as TypeKey]!.size);
    }
  });

  it("fontSize lineHeights match the type scale lineHeights", () => {
    for (const [key, [, meta]] of Object.entries(tailwindTheme.fontSize)) {
      expect(meta.lineHeight).toBe(tokens.type[key as TypeKey]!.lineHeight);
    }
  });

  it("fontSize fontWeights are the stringified type scale weights", () => {
    for (const [key, [, meta]] of Object.entries(tailwindTheme.fontSize)) {
      expect(meta.fontWeight).toBe(String(tokens.type[key as TypeKey]!.weight));
    }
  });

  it("spacing values match the space scale values", () => {
    for (const [key, value] of Object.entries(tailwindTheme.spacing)) {
      expect(value).toBe(tokens.space[key as keyof typeof tokens.space]);
    }
  });

  it("colors values match the color scale values", () => {
    for (const [key, value] of Object.entries(tailwindTheme.colors)) {
      expect(value).toBe(tokens.color[key]);
    }
  });

  it("transitionDuration values match the motion duration values", () => {
    for (const [key, value] of Object.entries(tailwindTheme.transitionDuration)) {
      expect(value).toBe(tokens.motion.duration[key]);
    }
  });

  it("spacing values are rem or px strings", () => {
    for (const [key, value] of Object.entries(tailwindTheme.spacing)) {
      expect(
        value.endsWith("rem") || value.endsWith("px"),
        `spacing.${key} = "${value}" must be rem or px`,
      ).toBe(true);
    }
  });

  it("transitionDuration values end with ms", () => {
    for (const [key, value] of Object.entries(tailwindTheme.transitionDuration)) {
      expect(value.endsWith("ms"), `transitionDuration.${key} = "${value}" must end with ms`).toBe(true);
    }
  });
});
