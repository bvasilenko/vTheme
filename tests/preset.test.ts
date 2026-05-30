// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import preset from "../src/preset.js";
import {
  COLOR_ROLES,
  FONT_ROLES,
  TRACKING_ROLES,
  colorLight,
  colorDark,
  fontFamilyScale,
  trackingScale,
} from "../src/index.js";

describe("vTheme Tailwind preset — config shape", () => {
  it("enables class-based dark mode", () => {
    expect(preset.darkMode).toBe("class");
  });

  it("extends the theme with every color role", () => {
    const colors = preset.theme?.extend?.colors ?? {};
    for (const role of COLOR_ROLES) {
      expect(colors).toHaveProperty(role);
    }
  });

  it("each color role resolves through its --v-color variable with an alpha channel", () => {
    const colors = (preset.theme?.extend?.colors ?? {}) as Record<string, string>;
    for (const role of COLOR_ROLES) {
      expect(colors[role]).toBe(`oklch(var(--v-color-${role}) / <alpha-value>)`);
    }
  });

  it("ships exactly one plugin (the base-layer variable injector)", () => {
    expect(Array.isArray(preset.plugins)).toBe(true);
    expect(preset.plugins).toHaveLength(1);
  });
});

describe("vTheme Tailwind preset — base layer variable injection", () => {
  // Invoke the plugin handler with a mock `addBase` to capture what it injects.
  function runPlugin(): Record<string, Record<string, string>> {
    const captured: Record<string, Record<string, string>> = {};
    const pluginObj = preset.plugins![0] as {
      handler: (api: { addBase: (b: Record<string, Record<string, string>>) => void }) => void;
    };
    pluginObj.handler({
      addBase: (base) => Object.assign(captured, base),
    });
    return captured;
  }

  it("injects :root with every light color role as a --v-color variable", () => {
    const base = runPlugin();
    expect(base).toHaveProperty(":root");
    for (const role of COLOR_ROLES) {
      expect(base[":root"][`--v-color-${role}`]).toBe(colorLight[role]);
    }
  });

  it("injects .dark with every dark color role as a --v-color variable", () => {
    const base = runPlugin();
    expect(base).toHaveProperty(".dark");
    for (const role of COLOR_ROLES) {
      expect(base[".dark"][`--v-color-${role}`]).toBe(colorDark[role]);
    }
  });

  it("injects :root with every font role as a --v-font variable", () => {
    const base = runPlugin();
    for (const role of FONT_ROLES) {
      expect(base[":root"][`--v-font-${role}`]).toBe(fontFamilyScale[role]);
    }
  });

  it("injects :root with every tracking role as a --v-tracking variable", () => {
    const base = runPlugin();
    for (const role of TRACKING_ROLES) {
      expect(base[":root"][`--v-tracking-${role}`]).toBe(trackingScale[role]);
    }
  });
});

describe("vTheme Tailwind preset - fontFamily and letterSpacing theme extends", () => {
  it("extends theme.fontFamily with sans, serif, mono via --v-font vars", () => {
    const fontFamily = (preset.theme?.extend?.fontFamily ?? {}) as Record<string, string>;
    for (const role of FONT_ROLES) {
      expect(fontFamily[role]).toBe(`var(--v-font-${role})`);
    }
  });

  it("extends theme.letterSpacing with tight, normal, wide via --v-tracking vars", () => {
    const letterSpacing = (preset.theme?.extend?.letterSpacing ?? {}) as Record<string, string>;
    for (const role of TRACKING_ROLES) {
      expect(letterSpacing[role]).toBe(`var(--v-tracking-${role})`);
    }
  });
});
