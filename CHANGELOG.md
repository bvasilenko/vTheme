# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2026-05-31

The richness-anchor release for the vsuite upstream-richness flow. vTheme carries the typography and tone vocabulary every downstream package (vUi, vBlocks, vBrand) consumes; this release closes the missing-font-tokens and missing-tone-roles gaps so a `vbrand pull -> fuse -> emit` pipeline can produce a proposal-rich landing page without leaf-consumer CSS overrides.

### Added

- `font` token group with `sans` / `serif` / `mono` roles. Defaults pair the proposal-richness typestack with credible system fallbacks: Inter (sans), Playfair Display (serif), JetBrains Mono (mono). Exported as both `tokens.font.*` and standalone TypeScript constants (`fontSans`, `fontSerif`, `fontMono`).
- `tracking` token group with `tight` (-0.018em), `normal` (0), `wide` (0.04em) roles. Values mirror the proposal-html headline and brand-mark letter-spacing.
- 15 new `tone-*` color roles - `tone-{ok,warn,bad,info,meta}` each with `-fg` (base), `-bg` (saturated tint), `-soft` (deep wash) - extending `COLOR_ROLES` from 23 to 38. Defaults are OKLCH translations of the proposal-html `--tone-*` hex palette, retuned per mode (light: lower-L tints, dark: lift fg, drop bg/soft into low-L washes).
- `FontFamilyScaleSchema` and `TrackingScaleSchema` zod contracts; `FONT_ROLES` and `TRACKING_ROLES` const arrays exported.
- `parseColorScale(value, { strict })` helper: a transitional opt-out for the breaking schema shape change. `strict: true` (default) enforces the full 38-role contract; `strict: false` requires only the 23 pre-0.3 surface roles, tolerates missing `tone-*` roles, and passes unknown extra keys through unchanged so a 0.2.x scale can still parse during migration.
- Tailwind preset now extends `theme.fontFamily` (`sans`/`serif`/`mono` via `var(--v-font-<role>)`) and `theme.letterSpacing` (`tight`/`normal`/`wide` via `var(--v-tracking-<role>)`).
- Tailwind preset injects `--v-font-<role>` and `--v-tracking-<role>` vars at `:root` so non-Tailwind consumers can write `font-family: var(--v-font-serif)` directly.

### Changed

- **Breaking.** `ColorScaleSchema` strict shape now requires the 15 `tone-*` roles in addition to the prior 23 surface roles. Consumers carrying a custom `ColorScale` will fail strict validation until they extend it; use `parseColorScale(scale, { strict: false })` for a migration window that tolerates missing tone roles.
- **Breaking.** `TokenTreeSchema` now requires `font` and `tracking` groups at the top level. Any consumer constructing a `TokenTree` from a 0.2.x scale must add the two groups.
- `cssVars` output count grows by the new font (3) + tracking (3) + tone (15) scalars; downstream consumers reading the emitted CSS-var map (e.g. `vbrand emit`) automatically pick up the new vars.

### Breaking

- `ColorScale` shape: 23 -> 38 roles. Migration: extend custom scales with the 15 `tone-*` roles or call `parseColorScale(scale, { strict: false })`.
- `TokenTree` shape: adds required `font` and `tracking` groups. Migration: include both when constructing a custom `TokenTree` literal.

## [0.2.2] - 2026-05-18

### Fixed

- Type scale was a runaway ×1.5 geometric progression - `5xl` reached 11.39rem (182px) and `xs` fell to 0.444rem (7px, unreadable), so component headings rendered unusably large. Replaced with a bounded modular scale (`xs` 0.75rem ... `base` 1rem ... `5xl` 3rem); display sizes are capped to stay usable in real layouts. Line-height and weight columns unchanged.

## [0.2.1] - 2026-05-18

### Fixed

- Spacing scale is now complete and coherent. The previous scale defined only `0,1,2,3,4,6,8,12,16,24,32` at a non-standard ×0.5rem multiplier; under Tailwind's `extend`, consumer classes on undefined keys (`h-10`, `p-2.5`, `w-11`, ...) fell through to Tailwind's ×0.25rem defaults, producing a non-monotonic scale (`h-6` resolved larger than `h-10`). `spaceScale` is now the full standard 4px-grid scale (`0`...`96` plus `px` and the `0.5`/`1.5`/`2.5`/`3.5` half-steps), so every spacing key resolves from one source, monotonically.
- `SpaceKeySchema` widened to the full standard key set.

## [0.2.0] - 2026-05-17

### Added

- `@booga/vtheme/preset` - canonical Tailwind preset: token theme, `--v-color-<role>` variables at `:root`, dark variant under `.dark`, `darkMode: "class"`. One import is the whole integration surface.
- Complete semantic color-role contract: `background`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `success`, `warning` (each with a `-foreground` pair), plus `border`, `input`, `ring` - exported as `COLOR_ROLES`.

### Changed

- **Breaking.** Color tokens are now the full surface-role set, replacing the flat 7-role palette. `colorLight`/`colorDark` and `tokens.color` carry every role.
- **Breaking.** Color values are OKLCH channel triples (`"55% 0.2 250"`), not wrapped `oklch(...)` strings, so the Tailwind contract can apply opacity modifiers through the `<alpha-value>` channel form.
- **Breaking.** `tailwindTheme.colors` resolves each role through `oklch(var(--v-color-<role>) / <alpha-value>)` instead of literal color values.
- **Breaking.** `OKLCHSchema`/`OKLCH` renamed to `OKLCHChannelsSchema`/`OKLCHChannels`; `ColorScaleSchema` is now strict over `COLOR_ROLES`.

## [0.1.0] - 2026-05-05

### Added

- `tokens` - frozen `TokenTree` with space, color, type, motion scales
- `cssVars` - flattens `TokenTree` to `--v-<group>-<key>` CSS custom property map
- `tailwindTheme` - Tailwind v3 `theme.extend`-compatible shape
- `colorLight` / `colorDark` - separate OKLCH color scales for light and dark modes
- Zod schemas for all token domains (`SpaceScaleSchema`, `OKLCHSchema`, `ColorScaleSchema`, `TypeStepSchema`, `TypeScaleSchema`, `MotionScaleSchema`, `TokenTreeSchema`)
- Full TypeScript type exports (`TokenTree`, `SpaceScale`, `ColorScale`, `TypeScale`, `MotionScale`, `OKLCH`)

[Unreleased]: https://github.com/bvasilenko/vTheme/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/bvasilenko/vTheme/compare/v0.2.2...v0.3.0
[0.2.2]: https://github.com/bvasilenko/vTheme/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/bvasilenko/vTheme/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/bvasilenko/vTheme/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/bvasilenko/vTheme/releases/tag/v0.1.0
