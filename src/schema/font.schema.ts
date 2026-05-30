// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { z } from "zod";

// Three font-family roles cover the proposal-richness typestack: a serif for
// hero/section headlines (Playfair Display), a sans for body and UI chrome
// (Inter), and a mono for code and metadata lines (JetBrains Mono). Each value
// is a CSS font-family stack string, including the fallback chain so a
// missing webfont degrades to a credible system stack rather than browser
// default.
export const FONT_ROLES = ["sans", "serif", "mono"] as const;

export type FontRole = (typeof FONT_ROLES)[number];

export const FontFamilyValueSchema = z.string().min(1);

type FontShape = { [K in FontRole]: typeof FontFamilyValueSchema };

const fontShape = Object.fromEntries(
  FONT_ROLES.map((role) => [role, FontFamilyValueSchema]),
) as FontShape;

export const FontFamilyScaleSchema = z.object(fontShape);

export type FontFamilyScale = Readonly<Record<FontRole, string>>;
