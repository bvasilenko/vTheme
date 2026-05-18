// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import type { SpaceScale } from "../schema/index.js";

// The complete spacing scale — the standard 4px grid (integer keys are 4px
// multiples; `0.5`/`1.5`/`2.5`/`3.5` and `px` are the documented half-steps).
// It is declared in full so the Tailwind contract never falls through to a
// differently-valued default: every spacing key a consumer can write resolves
// from this one source, monotonically. (The earlier partial ×0.5rem scale
// collided with Tailwind's numeric keys and produced a non-monotonic result.)
export const spaceScale: SpaceScale = {
  "0": "0rem",
  px: "1px",
  "0.5": "0.125rem",
  "1": "0.25rem",
  "1.5": "0.375rem",
  "2": "0.5rem",
  "2.5": "0.625rem",
  "3": "0.75rem",
  "3.5": "0.875rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "11": "2.75rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
  "36": "9rem",
  "40": "10rem",
  "44": "11rem",
  "48": "12rem",
  "52": "13rem",
  "56": "14rem",
  "60": "15rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
  "96": "24rem",
};
