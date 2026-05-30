// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import {
  tokens,
  fontFamilyScale,
  fontSans,
  fontSerif,
  fontMono,
  FONT_ROLES,
  FontFamilyScaleSchema,
} from "../src/index.js";

describe("font scale - role contract", () => {
  it("FONT_ROLES is exactly [sans, serif, mono]", () => {
    expect([...FONT_ROLES]).toEqual(["sans", "serif", "mono"]);
  });

  it("fontFamilyScale defines exactly the FONT_ROLES set", () => {
    expect(Object.keys(fontFamilyScale).sort()).toEqual([...FONT_ROLES].sort());
  });

  it("tokens.font is the fontFamilyScale reference", () => {
    expect(tokens.font).toBe(fontFamilyScale);
  });
});

describe("font scale - typestack composition", () => {
  it("sans stack opens with Inter", () => {
    expect(fontSans).toMatch(/^"Inter"/);
  });

  it("serif stack opens with Playfair Display", () => {
    expect(fontSerif).toMatch(/^"Playfair Display"/);
  });

  it("mono stack opens with JetBrains Mono", () => {
    expect(fontMono).toMatch(/^"JetBrains Mono"/);
  });

  it("every stack carries a final generic fallback keyword", () => {
    expect(fontSans.endsWith("sans-serif")).toBe(true);
    expect(fontSerif.endsWith("serif")).toBe(true);
    expect(fontMono.endsWith("monospace")).toBe(true);
  });
});

describe("font scale - schema validation", () => {
  it("accepts the bundled fontFamilyScale", () => {
    expect(FontFamilyScaleSchema.safeParse(fontFamilyScale).success).toBe(true);
  });

  it("rejects a scale missing a role", () => {
    const { mono: _omitted, ...incomplete } = fontFamilyScale;
    expect(FontFamilyScaleSchema.safeParse(incomplete).success).toBe(false);
  });

  it("rejects an empty stack string", () => {
    expect(
      FontFamilyScaleSchema.safeParse({ ...fontFamilyScale, sans: "" }).success,
    ).toBe(false);
  });
});
