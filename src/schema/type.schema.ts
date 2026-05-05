// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { z } from "zod";

export const TypeKeySchema = z.enum([
  "xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl",
]);

export const TypeStepSchema = z.object({
  size: z.string(),
  lineHeight: z.string(),
  weight: z.number().int().min(100).max(900),
});

export const TypeScaleSchema = z.record(TypeKeySchema, TypeStepSchema);

export type TypeKey = z.infer<typeof TypeKeySchema>;
export type TypeStep = Readonly<z.infer<typeof TypeStepSchema>>;
export type TypeScale = Readonly<Record<TypeKey, TypeStep>>;
