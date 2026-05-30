// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import type { TrackingScale } from "../schema/index.js";

// The proposal-richness letter-spacing tokens. `tight` for the serif hero
// headline (-0.018em matches the proposal-html `h1.hero`), `normal` for body
// copy, `wide` for uppercase eyebrows and brand-mark labels (0.04em matches
// the proposal-html `.brand-name` letter-spacing).
export const trackingScale: TrackingScale = {
  tight: "-0.018em",
  normal: "0",
  wide: "0.04em",
};

export const trackingTight = trackingScale.tight;
export const trackingNormal = trackingScale.normal;
export const trackingWide = trackingScale.wide;
