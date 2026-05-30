// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { z } from "zod";
import { SpaceScaleSchema } from "./space.schema.js";
import { ColorScaleSchema } from "./color.schema.js";
import { TypeScaleSchema } from "./type.schema.js";
import { MotionScaleSchema } from "./motion.schema.js";
import { FontFamilyScaleSchema } from "./font.schema.js";
import { TrackingScaleSchema } from "./tracking.schema.js";
import type { SpaceScale } from "./space.schema.js";
import type { ColorScale } from "./color.schema.js";
import type { TypeScale } from "./type.schema.js";
import type { MotionScale } from "./motion.schema.js";
import type { FontFamilyScale } from "./font.schema.js";
import type { TrackingScale } from "./tracking.schema.js";

export const TokenTreeSchema = z.object({
  space: SpaceScaleSchema,
  color: ColorScaleSchema,
  type: TypeScaleSchema,
  motion: MotionScaleSchema,
  font: FontFamilyScaleSchema,
  tracking: TrackingScaleSchema,
});

export type TokenTree = {
  space: SpaceScale;
  color: ColorScale;
  type: TypeScale;
  motion: MotionScale;
  font: FontFamilyScale;
  tracking: TrackingScale;
};
