# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-05-17

### Added

- `@booga/vtheme/preset` — canonical Tailwind preset: token theme, `--v-color-<role>` variables at `:root`, dark variant under `.dark`, `darkMode: "class"`. One import is the whole integration surface.
- Complete semantic color-role contract: `background`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `success`, `warning` (each with a `-foreground` pair), plus `border`, `input`, `ring` — exported as `COLOR_ROLES`.

### Changed

- **Breaking.** Color tokens are now the full surface-role set, replacing the flat 7-role palette. `colorLight`/`colorDark` and `tokens.color` carry every role.
- **Breaking.** Color values are OKLCH channel triples (`"55% 0.2 250"`), not wrapped `oklch(...)` strings, so the Tailwind contract can apply opacity modifiers through the `<alpha-value>` channel form.
- **Breaking.** `tailwindTheme.colors` resolves each role through `oklch(var(--v-color-<role>) / <alpha-value>)` instead of literal color values.
- **Breaking.** `OKLCHSchema`/`OKLCH` renamed to `OKLCHChannelsSchema`/`OKLCHChannels`; `ColorScaleSchema` is now strict over `COLOR_ROLES`.

## [0.1.0] - 2026-05-05

### Added

- `tokens` — frozen `TokenTree` with space, color, type, motion scales
- `cssVars` — flattens `TokenTree` to `--v-<group>-<key>` CSS custom property map
- `tailwindTheme` — Tailwind v3 `theme.extend`-compatible shape
- `colorLight` / `colorDark` — separate OKLCH color scales for light and dark modes
- Zod schemas for all token domains (`SpaceScaleSchema`, `OKLCHSchema`, `ColorScaleSchema`, `TypeStepSchema`, `TypeScaleSchema`, `MotionScaleSchema`, `TokenTreeSchema`)
- Full TypeScript type exports (`TokenTree`, `SpaceScale`, `ColorScale`, `TypeScale`, `MotionScale`, `OKLCH`)

[Unreleased]: https://github.com/bvasilenko/vTheme/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/bvasilenko/vTheme/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/bvasilenko/vTheme/releases/tag/v0.1.0
