## Project Overview

This is the personal portfolio and terminal-inspired website for **Adrian Reforsado (`rjaks`)**, a full-stack software engineer and CS student.

- **Stack:** Astro 7 (static output, ClientRouter / View Transitions), Tailwind CSS v4 (`@tailwindcss/vite`), TypeScript.
- **Hosting:** Cloudflare Pages (wrangler static output `./dist`).
- **Core Aesthetic:** Minimalist Dual-Mode Terminal × Developer Editorial with warm amber (`#f59e0b` / `#d97706`) accents.

## Architecture & Directory Conventions

- `src/pages/`: File-based routes (`index.astro`, `work.astro`, `projects.astro`, `skills.astro`, `contact.astro`, `writing/`, `404.astro`).
- `src/components/`: Astro components. Key components:
  - `Navbar.astro`: Desktop sidebar (>= lg), tablet navigation (sm to lg), mobile drawer (< sm).
  - `Footer.astro`: Bottom status bar with shortcut hints and links.
  - `GithubHeatmap.astro`: SVG contribution calendar with client caching and fallback.
  - `KeyboardShortcuts.astro`: Single-key navigation listener and cheat sheet `<dialog>`.
  - `NowSection.astro`: Snapshot of current projects, books, music, and off-terminal interests.
  - `game/WordleModal.astro`: Embedded terminal Wordle game (`<dialog>`) triggered via `alt+g` or UI buttons.
- `src/data/`: Structured TypeScript data files (`projects.ts`, `experience.ts`, `skills.ts`, `now.ts`, `contact.ts`, `wordleWords.ts`). Edit data here rather than hardcoding in pages.
- `src/content/blog/`: Markdown posts managed by Astro Content Collections (`src/content.config.ts`).
- `src/utils/`: Lightweight client/build utilities:
  - `theme.ts`: `toggleThemeWithRipple()` CRT terminal scanline wipe transition.
  - `heatmap.ts`: `buildHeatmapSvg()` grid builder.
- `src/styles/global.css`: Core Tailwind theme, CSS custom properties, and animations.

## Design System

Before making any UI, styling, or component changes, read the canonical design system:

- [docs/design-system.md](./docs/design-system.md)

This document is the source of truth for colors, typography, spacing, components, interactions, and tone of voice. Do not deviate from it without explicit instruction.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Dependencies & CI Invariants

- **Do not remove `@emnapi/core` or `@emnapi/runtime`** from `devDependencies`. They are required by `@img/sharp-wasm32` / WebAssembly runtime fallbacks and Cloudflare Pages CI (`npm ci`).
- **Always verify lockfile integrity**: Whenever modifying dependencies or performing cleanup, test with `npm ci` (clean install) and `npm run build` to ensure remote CI pipelines will not break on missing lockfile entries.
