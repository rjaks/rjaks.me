---
title: "Crafting a Terminal-Inspired Portfolio with Astro"
description: "A deep dive into blending minimal editorial typography with developer terminal affordances and instant keyboard navigation."
pubDate: 2026-09-08
tags: ["astro", "typescript", "ui-ux", "tailwind"]
draft: false
---

Building a developer portfolio shouldn't just be about listing past employers; it should reflect how you think about software craftsmanship.

When designing this iteration of `rjaks.me`, I wanted to strike a delicate balance:
1. **Editorial clarity**: Inspired by editorial publications where content and writing take center stage.
2. **Terminal affordances**: Subtle prompts (`rjaks:~$`), monospaced chrome, and native keyboard navigation shortcuts (<kbd>w</kbd>, <kbd>p</kbd>, <kbd>b</kbd>).

## Architectural Foundations

Here is how the system is put together:

### Static Generation with Astro
Astro outputs pure, zero-JS HTML by default for content pages. The blog runs on native **Astro Content Collections** with strict Zod schema validation:

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      tags: z.array(z.string()).default([]),
    }),
  }),
};
```

### Typography: Tight Geist Mono
For headings, we chose **Geist Mono** with extra-bold weighting and tight letter tracking (`letter-spacing: -0.06em`). It creates an assertive, high-precision geometry that looks unmistakably like modern engineering software.

### Keyboard Navigation
To give the feeling of working in a command-line environment, visitors can hit:
- <kbd>h</kbd> for Home
- <kbd>w</kbd> for Work
- <kbd>p</kbd> for Projects
- <kbd>b</kbd> for Blog / Writing
- <kbd>t</kbd> to toggle between Obsidian dark terminal and clean paper light mode.

More technical reflections coming soon.
