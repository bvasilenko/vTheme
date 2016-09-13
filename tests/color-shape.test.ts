import { describe, it, expect } from "vitest";
import { tokens, colorLight, colorDark, OKLCHSchema } from "../src/index.js";

function assertAllOKLCH(scale: Record<string, string>, label: string): void {
  for (const [key, value] of Object.entries(scale)) {
    const result = OKLCHSchema.safeParse(value);
    expect(result.success, `${label}.${key} = "${value}" failed OKLCH validation`).toBe(true);
  }
}

describe("color scale — OKLCH format validity", () => {
  it("every colorLight value is valid OKLCH", () => {
    assertAllOKLCH(colorLight, "colorLight");
  });

  it("every colorDark value is valid OKLCH", () => {
    assertAllOKLCH(colorDark, "colorDark");
  });

  it("tokens.color is the colorLight reference", () => {
    expect(tokens.color).toBe(colorLight);
  });
});

describe("color scale — light/dark structural parity", () => {
  it("colorLight and colorDark export the same set of keys", () => {
    expect(Object.keys(colorLight).sort()).toEqual(Object.keys(colorDark).sort());
  });

  it("colorLight and colorDark are distinct objects with distinct values", () => {
    expect(colorLight).not.toBe(colorDark);
    const sharedKeys = Object.keys(colorLight) as (keyof typeof colorLight)[];
    const allSame = sharedKeys.every((k) => colorLight[k] === colorDark[k]);
    expect(allSame).toBe(false);
  });
});
