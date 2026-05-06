// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { tokens } from "../src/index.js";

describe("motion scale — duration value format", () => {
  it.each(Object.entries(tokens.motion.duration))(
    "duration.%s ends with 'ms'",
    (key, value) => {
      expect(value.endsWith("ms"), `duration["${key}"] = "${value}" must end with ms`).toBe(true);
    },
  );

  it.each(Object.entries(tokens.motion.duration))(
    "duration.%s parses to a positive integer millisecond count",
    (key, value) => {
      const ms = parseInt(value, 10);
      expect(Number.isNaN(ms), `duration["${key}"] = "${value}" is not parseable`).toBe(false);
      expect(ms, `duration["${key}"] = "${value}" is not positive`).toBeGreaterThan(0);
      expect(value, `duration["${key}"] has trailing content after integer ms`).toBe(`${ms}ms`);
    },
  );
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
  it.each(Object.entries(tokens.motion.ease))(
    "ease.%s is a non-empty trimmed string",
    (key, value) => {
      expect(typeof value, `ease["${key}"] must be a string`).toBe("string");
      expect(value.length, `ease["${key}"] must not be empty`).toBeGreaterThan(0);
      expect(value, `ease["${key}"] must not have leading or trailing whitespace`).toBe(value.trim());
    },
  );

  it.each(Object.entries(tokens.motion.ease))(
    "ease.%s is a CSS timing function keyword or parametric call",
    (key, value) => {
      const CSS_TIMING_FN = /^(linear|ease(-in(-out)?|-out)?|step-(start|end)|steps\(|cubic-bezier\()/;
      expect(
        CSS_TIMING_FN.test(value),
        `ease["${key}"] = "${value}" is not a recognised CSS timing function`,
      ).toBe(true);
    },
  );
});
