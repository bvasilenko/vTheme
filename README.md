# vTheme

Design tokens: spacing on a 4px grid, color in OKLCH, type scale in modular fifths, font-family and letter-spacing tokens for proposal-rich typography, and a 15-role semantic tone palette. One source, three targets - a Tailwind preset, CSS variables, TypeScript constants. Build-time only; no runtime, no provider.

## Install

```sh
npm install @booga/vtheme
```

## Tailwind preset - the canonical path

```js
// tailwind.config.js
import vtheme from "@booga/vtheme/preset";

export default {
  presets: [vtheme],
  content: ["./src/**/*.{ts,tsx}"],
};
```

One import wires everything: the token theme (spacing, color, type, motion, font, tracking), every color role as a `--v-color-<role>` CSS variable at `:root`, the dark-mode variant under `.dark`, `--v-font-<role>` and `--v-tracking-<role>` vars at `:root`, and `darkMode: "class"`.

## Color roles

vTheme is the single source of color truth. It defines a complete semantic surface-role set plus a five-tone semantic palette:

- Surface roles: `background` `card` `popover` `primary` `secondary` `muted` `accent` `destructive` `success` `warning` (each with `-foreground`), plus the line roles `border` `input` `ring`.
- Tone palette (0.3.0): `tone-{ok,warn,bad,info,meta}` each with `-fg` (base), `-bg` (saturated tint), `-soft` (deep wash). 15 roles.

Each role resolves as `oklch(var(--v-color-<role>) / <alpha-value>)`, so Tailwind opacity modifiers (`bg-primary/80`, `bg-tone-ok-soft`) and dark mode both work.

## Typography roles

- `font.sans` defaults to `"Inter", ui-sans-serif, system-ui, sans-serif`
- `font.serif` defaults to `"Playfair Display", Georgia, serif`
- `font.mono` defaults to `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

Each emits as a `--v-font-<role>` CSS var and as a Tailwind `font-{sans,serif,mono}` utility resolving through that var, so brand pulls can override the typestack token-side without rebuilding the preset.

Letter-spacing tokens map to `tracking-*` utilities: `tracking-tight` (-0.018em), `tracking-normal` (0), `tracking-wide` (0.04em).

## TypeScript / CSS-variable consumers

```ts
import {
  tokens,
  cssVars,
  colorLight,
  colorDark,
  fontSerif,
  trackingWide,
} from "@booga/vtheme";

tokens.space["4"];          // "1rem"
tokens.color.primary;       // "55% 0.2 250" (OKLCH channels)
tokens.font.serif;          // '"Playfair Display", Georgia, serif'
tokens.tracking.wide;       // "0.04em"

cssVars(tokens);            // { "--v-color-primary": "55% 0.2 250", "--v-font-serif": "...", ... }
```

`colorLight` / `colorDark` carry the two modes; the preset emits both.

## Schema strict mode and the 0.3.0 transitional opt-out

`ColorScaleSchema` is strict over the full 38-role contract (23 surface roles + 15 tone roles). A 0.2.x scale that has not yet been extended with the tone roles will fail strict parsing. Use `parseColorScale(scale, { strict: false })` during the migration window to accept legacy scales without tone roles (extra keys pass through; missing core roles still reject).

```ts
import { parseColorScale } from "@booga/vtheme";

const result = parseColorScale(legacyScale, { strict: false });
if (result.success) {
  // use result.data
}
```

## License

MIT - 2026 bvasilenko
