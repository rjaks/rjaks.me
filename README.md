# rjaks.me

Personal website and terminal-inspired portfolio of **Adrian Reforsado (`rjaks`)** — Software Engineer & Computer Science student.

Built with **Astro 7**, **Tailwind CSS v4**, and **TypeScript**, styled around a Minimalist Dual-Mode Terminal × Developer Editorial aesthetic with warm amber accents.

## Tech Stack & Architecture

- **Framework:** [Astro 7](https://astro.build) (Static output, ClientRouter / View Transitions)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/vite` plugin)
- **Icons & Graphics:** Inline SVG icons & terminal UI motifs
- **Deployment:** Cloudflare Pages (`wrangler` / static build `./dist`)
- **Typography:** Google Fonts (`Geist`, `Geist Mono`, `Space Mono`)

## Project Structure

```text
/
├── public/                 # Static public assets (avatars, project thumbnails, favicons)
├── docs/
│   └── design-system.md    # Canonical design system specification
├── src/
│   ├── components/         # Reusable Astro UI components
│   │   ├── Navbar.astro    # Responsive navigation (desktop sidebar, tablet bar, mobile drawer)
│   │   ├── Footer.astro    # Bottom status bar, quick links, shortcut hint
│   │   ├── GithubHeatmap.astro # Live / cached GitHub contribution calendar
│   │   ├── KeyboardShortcuts.astro # Global single-key navigation & cheat sheet dialog
│   │   ├── NowSection.astro # /now snapshot & personal interests
│   │   ├── SocialLinks.astro # Social profile links
│   │   └── game/
│   │       └── WordleModal.astro # Embedded Wordle terminal game (daily & practice modes)
│   ├── content/
│   │   └── blog/           # Markdown blog posts
│   ├── data/               # Structured data sources
│   │   ├── contact.ts      # Contact channels & metadata
│   │   ├── experience.ts   # Work history & role progressions
│   │   ├── now.ts          # Current focus areas & hobbies
│   │   ├── projects.ts     # Portfolio projects & tech tags
│   │   ├── skills.ts       # Categorized technical competencies
│   │   └── wordleWords.ts  # Target dictionary & Wordle solver evaluation
│   ├── layouts/
│   │   └── BaseLayout.astro # Shared document shell, meta tags, and transitions
│   ├── pages/              # Astro file-based routes
│   │   ├── index.astro     # Home page (/): hero, heatmap, now, featured projects
│   │   ├── work.astro      # Experience & career timeline (/work)
│   │   ├── projects.astro  # Full projects directory (/projects)
│   │   ├── skills.astro    # Detailed skills directory (/skills)
│   │   ├── contact.astro   # Contact details & live Philippine analog clock (/contact)
│   │   ├── writing/        # Blog index and dynamic [...slug].astro post routes
│   │   └── 404.astro       # Custom terminal-themed 404 page
│   ├── styles/
│   │   └── global.css      # Core theme variables, typography, animations
│   └── utils/
│       ├── heatmap.ts      # SVG calendar grid generator
│       └── theme.ts        # CRT scanline wipe theme transition controller
```

## Key Features

1. **Dual Theme with CRT Scanline Wipe:** Seamless dark (Obsidian Terminal) and light (Clean Paper) modes using View Transitions API inset wipe.
2. **Global Single-Key Shortcuts:**
   - `h` → Home
   - `w` → Work
   - `p` → Projects
   - `b` → Writing
   - `s` → Skills
   - `t` → Toggle theme
   - `alt+g` → Open Wordle mini-game
   - `?` → Shortcuts cheat sheet
3. **Wordle Terminal Mini-game:** Fully functional 5-letter Wordle game inside a `<dialog>` terminal modal with daily seeded mode, practice mode, and shareable results.
4. **Live GitHub Heatmap:** Fetches real contribution counts with fallback generation and client-side caching.
5. **Philippine Analog Clock:** Real-time SVG clock tracking Naga City, Camarines Sur (UTC+08:00 PHT) rendered on the Contact page.

## Development

```sh
# Run dev server
npm run dev

# Or with background mode
astro dev --background

# Check types and diagnostics
npm run astro check

# Production build
npm run build

# Preview build locally
npm run preview
```

## CI & Dependency Invariants

- **`@emnapi/core` & `@emnapi/runtime`:** Mandatory in `devDependencies`. Required by `@img/sharp-wasm32` / WebAssembly runtime fallbacks and Cloudflare Pages CI (`npm ci`). Do not remove.
- **Lockfile Integrity:** Always verify lockfile integrity with `npm ci` and `npm run build` after dependency updates.
