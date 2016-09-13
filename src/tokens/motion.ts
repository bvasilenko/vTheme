import type { MotionScale } from "../schema/index.js";

export const motionScale: MotionScale = {
  ease: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in:      "cubic-bezier(0.4, 0, 1, 1)",
    out:     "cubic-bezier(0, 0, 0.2, 1)",
    linear:  "linear",
  },
  duration: {
    "75":  "75ms",
    "100": "100ms",
    "150": "150ms",
    "200": "200ms",
    "300": "300ms",
    "500": "500ms",
  },
};
