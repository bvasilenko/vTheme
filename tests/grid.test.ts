import { describe, it, expect } from "vitest";
import { tokens, SpaceKeySchema } from "../src/index.js";
import type { SpaceKey } from "../src/index.js";

const CANONICAL_SPACE_KEYS = SpaceKeySchema.options;

function toPx(value: string): number {
  if (value.endsWith("rem")) return parseFloat(value) * 16;
  if (value.endsWith("px"))  return parseFloat(value);
  throw new Error(`Unsupported unit: ${value}`);
}

describe("space grid alignment", () => {
  it("every space value is a 4px multiple", () => {
    for (const [key, value] of Object.entries(tokens.space)) {
      const px = toPx(value);
      expect(px % 4, `space["${key}"] = "${value}" (${px}px) is not a 4px multiple`).toBe(0);
    }
  });
});

describe("space scale key completeness", () => {
  it("contains exactly the canonical keys defined by SpaceKeySchema", () => {
    expect(Object.keys(tokens.space).sort()).toEqual([...CANONICAL_SPACE_KEYS].sort());
  });
});

describe("space scale ordering", () => {
  it("px values are strictly increasing in canonical key order", () => {
    const pxValues = CANONICAL_SPACE_KEYS.map((k) => toPx(tokens.space[k as SpaceKey]!));
    for (let i = 1; i < pxValues.length; i++) {
      expect(
        pxValues[i]!,
        `space["${CANONICAL_SPACE_KEYS[i]}"] px is not greater than space["${CANONICAL_SPACE_KEYS[i - 1]}"]`,
      ).toBeGreaterThan(pxValues[i - 1]!);
    }
  });
});
