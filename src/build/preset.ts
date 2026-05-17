// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";
import { tailwindTheme } from "./tailwind.js";
import { colorLight, colorDark } from "../tokens/color.js";
import type { ColorScale } from "../schema/index.js";

function colorVars(scale: ColorScale): Record<string, string> {
  return Object.fromEntries(
    Object.entries(scale).map(([role, channels]) => [`--v-color-${role}`, channels]),
  );
}

// The canonical vTheme Tailwind preset. A consumer adds `presets: [vtheme]` to
// its tailwind config and receives, from one import:
//   - the full token theme (spacing / color / type / motion),
//   - every color role defined as a `--v-color-<role>` CSS variable at `:root`,
//   - the dark-mode variant of those variables under `.dark`,
//   - `darkMode: "class"` wiring.
// This preset *is* vTheme's contract surface — there is no translation layer
// between vTheme and its consumers.
const preset: Config = {
  content: [],
  darkMode: "class",
  theme: { extend: tailwindTheme },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ":root": colorVars(colorLight),
        ".dark": colorVars(colorDark),
      });
    }),
  ],
};

export default preset;
