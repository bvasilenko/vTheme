// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
export {
  SpaceKeySchema,
  SpaceScaleSchema,
  type SpaceKey,
  type SpaceScale,
} from "./space.schema.js";

export {
  OKLCHChannelsSchema,
  ColorScaleSchema,
  COLOR_ROLES,
  parseColorScale,
  type OKLCHChannels,
  type ColorRole,
  type ColorScale,
} from "./color.schema.js";

export {
  TypeKeySchema,
  TypeStepSchema,
  TypeScaleSchema,
  type TypeKey,
  type TypeStep,
  type TypeScale,
} from "./type.schema.js";

export {
  EaseMapSchema,
  DurationMapSchema,
  MotionScaleSchema,
  type EaseMap,
  type DurationMap,
  type MotionScale,
} from "./motion.schema.js";

export {
  FONT_ROLES,
  FontFamilyValueSchema,
  FontFamilyScaleSchema,
  type FontRole,
  type FontFamilyScale,
} from "./font.schema.js";

export {
  TRACKING_ROLES,
  TrackingValueSchema,
  TrackingScaleSchema,
  type TrackingRole,
  type TrackingScale,
} from "./tracking.schema.js";

export {
  TokenTreeSchema,
  type TokenTree,
} from "./token.schema.js";
