import { tokens } from "../tokens/index.js";

type FontSizeTuple = [string, { lineHeight: string; fontWeight: string }];

export type TailwindExtendTheme = {
  spacing: Record<string, string>;
  colors: Record<string, string>;
  fontSize: Record<string, FontSizeTuple>;
  transitionDuration: Record<string, string>;
};

export const tailwindTheme: TailwindExtendTheme = {
  spacing: { ...tokens.space },
  colors:  { ...tokens.color },
  fontSize: Object.fromEntries(
    Object.entries(tokens.type).map(([key, step]) => [
      key,
      [step.size, { lineHeight: step.lineHeight, fontWeight: String(step.weight) }] satisfies FontSizeTuple,
    ]),
  ),
  transitionDuration: { ...tokens.motion.duration },
};
