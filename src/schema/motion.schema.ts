import { z } from "zod";

export const EaseMapSchema = z.record(z.string(), z.string());
export const DurationMapSchema = z.record(z.string(), z.string());

export const MotionScaleSchema = z.object({
  ease: EaseMapSchema,
  duration: DurationMapSchema,
});

export type EaseMap = Readonly<z.infer<typeof EaseMapSchema>>;
export type DurationMap = Readonly<z.infer<typeof DurationMapSchema>>;
export type MotionScale = Readonly<z.infer<typeof MotionScaleSchema>>;
