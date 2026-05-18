// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { z } from "zod";

// The complete standard spacing-key set. Declared in full so the spacing
// contract is closed: any key a consumer writes is part of the scale.
export const SpaceKeySchema = z.enum([
  "0", "px", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "7",
  "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40",
  "44", "48", "52", "56", "60", "64", "72", "80", "96",
]);

export const SpaceScaleSchema = z.record(
  SpaceKeySchema,
  z.string().regex(/^\d+(\.\d+)?(rem|px)$/),
);

export type SpaceKey = z.infer<typeof SpaceKeySchema>;
export type SpaceScale = Readonly<z.infer<typeof SpaceScaleSchema>>;
