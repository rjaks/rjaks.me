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
