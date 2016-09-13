import { z } from "zod";

export const SpaceKeySchema = z.enum([
  "0", "1", "2", "3", "4", "6", "8", "12", "16", "24", "32",
]);

export const SpaceScaleSchema = z.record(
  SpaceKeySchema,
  z.string().regex(/^\d+(\.\d+)?(rem|px)$/),
);

export type SpaceKey = z.infer<typeof SpaceKeySchema>;
export type SpaceScale = Readonly<z.infer<typeof SpaceScaleSchema>>;
