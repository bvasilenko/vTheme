// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { tokens } from "../src/index.js";

describe("motion scale — duration value format", () => {
  it("every duration value ends with 'ms'", () => {
    for (const [key, value] of Object.entries(tokens.motion.duration)) {
      expect(value.endsWith("ms"), `duration["${key}"] = "${value}" must end with ms`).toBe(true);
    }
  });

  it("every duration value parses to a positive integer count of milliseconds", () => {
    for (const [key, value] of Object.entries(tokens.motion.duration)) {
      const ms = parseInt(value, 10);
      expect(Number.isNaN(ms), `duration["${key}"] = "${value}" is not parseable`).toBe(false);
      expect(ms, `duration["${key}"] = "${value}" is not positive`).toBeGreaterThan(0);
      expect(value, `duration["${key}"] has trailing content after integer ms`).toBe(`${ms}ms`);
    }
  });
});

describe("motion scale — duration ordering", () => {
  it("duration ms values are strictly increasing when keys are sorted numerically", () => {
    const keys = Object.keys(tokens.motion.duration).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    const msValues = keys.map((k) => parseInt(tokens.motion.duration[k]!, 10));
    for (let i = 1; i < msValues.length; i++) {
      expect(
        msValues[i]!,
        `duration["${keys[i]}"] is not greater than duration["${keys[i - 1]}"]`,
      ).toBeGreaterThan(msValues[i - 1]!);
    }
  });
});

describe("motion scale — ease value format", () => {
  it("every ease value is a non-empty string without leading or trailing whitespace", () => {
    for (const [key, value] of Object.entries(tokens.motion.ease)) {
      expect(typeof value, `ease["${key}"] must be a string`).toBe("string");
      expect(value.length, `ease["${key}"] must not be empty`).toBeGreaterThan(0);
      expect(value, `ease["${key}"] must not have leading or trailing whitespace`).toBe(value.trim());
    }
  });

  it("every ease value is a CSS timing function keyword or parametric function call", () => {
    const CSS_TIMING_FN = /^(linear|ease(-in(-out)?|-out)?|step-(start|end)|steps\(|cubic-bezier\()/;
    for (const [key, value] of Object.entries(tokens.motion.ease)) {
      expect(
        CSS_TIMING_FN.test(value),
        `ease["${key}"] = "${value}" is not a recognised CSS timing function`,
      ).toBe(true);
    }
  });
});
