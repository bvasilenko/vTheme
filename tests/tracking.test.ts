// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import {
  tokens,
  trackingScale,
  trackingTight,
  trackingNormal,
  trackingWide,
  TRACKING_ROLES,
  TrackingScaleSchema,
  TrackingValueSchema,
} from "../src/index.js";

describe("tracking scale - role contract", () => {
  it("TRACKING_ROLES is exactly [tight, normal, wide]", () => {
    expect([...TRACKING_ROLES]).toEqual(["tight", "normal", "wide"]);
  });

  it("trackingScale defines exactly the TRACKING_ROLES set", () => {
    expect(Object.keys(trackingScale).sort()).toEqual([...TRACKING_ROLES].sort());
  });

  it("tokens.tracking is the trackingScale reference", () => {
    expect(tokens.tracking).toBe(trackingScale);
  });
});

describe("tracking scale - proposal-richness values", () => {
  it("tight is -0.018em (serif hero headline)", () => {
    expect(trackingTight).toBe("-0.018em");
  });

  it("normal is 0", () => {
    expect(trackingNormal).toBe("0");
  });

  it("wide is 0.04em (uppercase eyebrow and brand-mark)", () => {
    expect(trackingWide).toBe("0.04em");
  });
});

describe("tracking scale - value schema", () => {
  const valid = ["0", "0.04em", "-0.018em", "1px", "-2px"];
  it.each(valid)("accepts value: %s", (v) => {
    expect(TrackingValueSchema.safeParse(v).success).toBe(true);
  });

  const invalid = ["", "wide", "1rem", "1%"];
  it.each(invalid)("rejects value: %s", (v) => {
    expect(TrackingValueSchema.safeParse(v).success).toBe(false);
  });

  it("rejects a scale missing a role", () => {
    const { wide: _omitted, ...incomplete } = trackingScale;
    expect(TrackingScaleSchema.safeParse(incomplete).success).toBe(false);
  });
});
