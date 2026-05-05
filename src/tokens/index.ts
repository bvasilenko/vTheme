// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { deepFreeze } from "../utils/deepFreeze.js";
import type { TokenTree } from "../schema/index.js";
import { spaceScale } from "./space.js";
import { colorLight } from "./color.js";
import { typeScale } from "./type.js";
import { motionScale } from "./motion.js";

export const tokens: Readonly<TokenTree> = deepFreeze({
  space:  spaceScale,
  color:  colorLight,
  type:   typeScale,
  motion: motionScale,
});

export { colorLight, colorDark } from "./color.js";
