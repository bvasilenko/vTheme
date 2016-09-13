# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-05-05

### Added

- `tokens` — frozen `TokenTree` with space, color, type, motion scales
- `cssVars` — flattens `TokenTree` to `--v-<group>-<key>` CSS custom property map
- `tailwindTheme` — Tailwind v3 `theme.extend`-compatible shape
- `colorLight` / `colorDark` — separate OKLCH color scales for light and dark modes
- Zod schemas for all token domains (`SpaceScaleSchema`, `OKLCHSchema`, `ColorScaleSchema`, `TypeStepSchema`, `TypeScaleSchema`, `MotionScaleSchema`, `TokenTreeSchema`)
- Full TypeScript type exports (`TokenTree`, `SpaceScale`, `ColorScale`, `TypeScale`, `MotionScale`, `OKLCH`)

[Unreleased]: https://github.com/bvasilenko/vTheme/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/bvasilenko/vTheme/releases/tag/v0.1.0
