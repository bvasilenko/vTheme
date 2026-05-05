// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { tokens } from "../tokens/index.js";
import type { TokenTree } from "../schema/index.js";

function toKebabCase(camel: string): string {
  return camel.replace(/([A-Z])/g, "-$1").toLowerCase();
}

function flattenToVars(
  obj: Record<string, unknown>,
  prefix: string,
): Record<string, string> {
  return Object.entries(obj).reduce<Record<string, string>>((acc, [key, val]) => {
    const cssKey = `${prefix}-${toKebabCase(key)}`;
    if (val !== null && typeof val === "object") {
      Object.assign(acc, flattenToVars(val as Record<string, unknown>, cssKey));
    } else {
      acc[cssKey] = String(val);
    }
    return acc;
  }, {});
}

export function cssVars(t: TokenTree = tokens): Record<string, string> {
  return Object.entries(t).reduce<Record<string, string>>((acc, [group, scale]) => {
    return Object.assign(
      acc,
      flattenToVars(scale as Record<string, unknown>, `--v-${group}`),
    );
  }, {});
}
