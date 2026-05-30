// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { z } from "zod";

// Letter-spacing tokens for the proposal-richness typestack. `tight` for serif
// hero headlines (-0.018em), `normal` for body (0), `wide` for uppercase
// eyebrows and brand-mark labels (0.04em). Values are CSS `letter-spacing`
// strings (em / px / 0) so the Tailwind contract can paste them straight into
// `theme.extend.letterSpacing`.
export const TRACKING_ROLES = ["tight", "normal", "wide"] as const;

export type TrackingRole = (typeof TRACKING_ROLES)[number];

export const TrackingValueSchema = z
  .string()
  .regex(/^-?\d+(\.\d+)?(em|px)?$|^0$/);

type TrackingShape = { [K in TrackingRole]: typeof TrackingValueSchema };

const trackingShape = Object.fromEntries(
  TRACKING_ROLES.map((role) => [role, TrackingValueSchema]),
) as TrackingShape;

export const TrackingScaleSchema = z.object(trackingShape);

export type TrackingScale = Readonly<Record<TrackingRole, string>>;
