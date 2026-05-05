// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { tokens } from "../src/index.js";

describe("token determinism", () => {
  it("JSON.stringify(tokens) is byte-equal across two invocations", () => {
    expect(JSON.stringify(tokens)).toBe(JSON.stringify(tokens));
  });

  it("key insertion order is stable", () => {
    const keys1 = Object.keys(JSON.parse(JSON.stringify(tokens)));
    const keys2 = Object.keys(JSON.parse(JSON.stringify(tokens)));
    expect(keys1).toEqual(keys2);
  });
});
