# vTheme

Design tokens: spacing on an 8px grid, color in OKLCH, type scale in modular fifths. One source, three targets — a Tailwind preset, CSS variables, TypeScript constants. Build-time only; no runtime, no provider.

## Install

```sh
npm install @booga/vtheme
```

## Tailwind preset — the canonical path

```js
// tailwind.config.js
import vtheme from "@booga/vtheme/preset";

export default {
  presets: [vtheme],
  content: ["./src/**/*.{ts,tsx}"],
};
```

One import wires everything: the token theme (spacing, color, type, motion), every color role as a `--v-color-<role>` CSS variable at `:root`, the dark-mode variant under `.dark`, and `darkMode: "class"`.

## Color roles

vTheme is the single source of color truth. It defines a complete semantic surface-role set — every base role paired with a `-foreground` for contrast:

`background` · `card` · `popover` · `primary` · `secondary` · `muted` · `accent` · `destructive` · `success` · `warning` (each with `-foreground`), plus the line roles `border` · `input` · `ring`.

Each role resolves as `oklch(var(--v-color-<role>) / <alpha-value>)`, so Tailwind opacity modifiers (`bg-primary/80`) and dark mode both work.

## TypeScript / CSS-variable consumers

```ts
import { tokens, cssVars, colorLight, colorDark } from "@booga/vtheme";

tokens.space["4"];          // "2rem"
tokens.color.primary;       // "55% 0.2 250" (OKLCH channels)

cssVars(tokens);            // { "--v-color-primary": "55% 0.2 250", "--v-space-4": "2rem", ... }
```

`colorLight` / `colorDark` carry the two modes; the preset emits both.

## License

MIT © 2026 bvasilenko
