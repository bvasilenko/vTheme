# vTheme

Design tokens: spacing on an 8px grid, color in OKLCH, type scale in modular fifths. One source, three targets — CSS variables, Tailwind theme config, TypeScript constants. Build-time only; no runtime, no provider.

## Install

```sh
npm install @booga/vtheme
```

## Usage

```ts
import { tokens, cssVars, tailwindTheme } from "@booga/vtheme";

// TypeScript constants — frozen, mutation throws
tokens.space["4"]; // "2rem"
tokens.color.accent; // "oklch(55% 0.2 250)"

// CSS custom properties for :root { ... }
const vars = cssVars(tokens);
// { "--v-color-bg": "oklch(98% 0.005 240)", "--v-space-4": "2rem", ... }

// Tailwind v3 theme.extend
// tailwind.config.ts → theme: { extend: tailwindTheme }
```

## Tailwind v4

CSS-first config consumers: pipe `cssVars(tokens)` entries into `@theme { }`.

## Light / Dark

```ts
import { colorLight, colorDark } from "@booga/vtheme";
```

Switch via CSS class; no runtime provider required.

## License

MIT © 2026 bvasilenko
