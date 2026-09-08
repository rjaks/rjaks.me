# rjaks.me — Design System

> **Theme:** Minimalist Dual-Mode Terminal × Developer Editorial (Inspired by kavin.me)
> **Identity:** Adrian Reforsado (`rjaks`)
> **Personality:** Fast, technical, clean, intentional — quiet confidence with terminal charm.

---

## Brand Direction

This site merges the ultra-clean, readable editorial structure of developer portfolios (e.g. kavin.me) with a modern terminal/CLI aesthetic. It embraces:
- Default **dark terminal** mode with an obsidian canvas, paired with a clean **light paper editor** alternate mode.
- Subtle CLI motifs: shell prompts (`rjaks:~$`), command traces (`> cd ~/work`), `<kbd>` shortcut indicators, and monospaced metadata.
- Preserved signature **Golden Amber** (`#E8A427`) accent color for highlights, focus rings, and active states.
- High accessibility, instant load speed, and distraction-free typography.

---

## Color Palette

### Dark Mode (Default / `:root` / `[data-theme="dark"]`)

| CSS Variable | Name | Hex | Usage |
|---|---|---|---|
| `--color-bg` | Obsidian Terminal | `#0D1117` | Root background |
| `--color-surface` | Terminal Pane | `#161B22` | Cards, terminal windows, code blocks |
| `--color-surface-hover` | Lifted Pane | `#1F242C` | Card hover state, active items |
| `--color-border` | Terminal Border | `#30363D` | Borders, dividers, keycaps |
| `--color-border-subtle` | Subtle Border | `#21262D` | Inactive tags, table row borders |
| `--color-text-primary` | Terminal White | `#F0F6FC` | Headings, primary text |
| `--color-text-secondary` | Muted Silver | `#8B949E` | Secondary/meta text, dates, bio details |
| `--color-text-muted` | Faded Gray | `#6E7681` | Footers, subtle hints |
| `--color-accent` | Golden Amber | `#E8A427` | Primary accent, active links, glow |
| `--color-accent-hover` | Warm Amber | `#F59E0B` | Accent hover state |
| `--color-accent-secondary` | Terminal Cyan/Blue | `#58A6FF` | Inline links, directory paths |
| `--color-prompt` | Shell Green | `#3FB950` | Command prompt symbol |

### Light Mode (`[data-theme="light"]`)

| CSS Variable | Name | Hex | Usage |
|---|---|---|---|
| `--color-bg` | Clean Paper | `#F8FAFC` | Root background |
| `--color-surface` | Pure White | `#FFFFFF` | Cards, panels, inputs |
| `--color-surface-hover` | Soft Slate | `#F1F5F9` | Hover state |
| `--color-border` | Slate Border | `#E2E8F0` | Borders, dividers |
| `--color-border-subtle` | Faint Border | `#EDF2F7` | Subtle dividers |
| `--color-text-primary` | Deep Slate | `#0F172A` | Primary text |
| `--color-text-secondary` | Slate Gray | `#64748B` | Secondary/meta text |
| `--color-text-muted` | Muted Slate | `#94A3B8` | Footers, subtle hints |
| `--color-accent` | Golden Bronze | `#D97706` | Primary accent |
| `--color-accent-hover` | Deep Bronze | `#B45309` | Hover state |
| `--color-accent-secondary` | Code Blue | `#2563EB` | Inline links |
| `--color-prompt` | Editor Green | `#16A34A` | Command prompt symbol |

---

## Typography

### Font Stack

| Role | Font | Fallback | CSS Variable |
|---|---|---|---|
| **Headings** | Geist Mono (700, 800) | Space Mono, monospace | `--font-family-heading` |
| **Body / UI** | JUST Sans (400, 700, 800) | -apple-system, sans-serif | `--font-family-base` |
| **Terminal & Meta** | Geist Mono / Space Mono | monospace | `--font-family-mono` |
| **Serif Accent** | Recoleta (400) | Georgia, serif | `--font-family-serif` |

### Typography Guidelines
- Headings use tight-spaced `Geist Mono` (`letter-spacing: -0.04em`, `font-weight: 700`) for a modern, high-precision developer aesthetic.
- Terminal prompts (`rjaks:~$`), badges, keycaps (`<kbd>`), code blocks, dates, and navigation hints use `Geist Mono`.
- Body paragraphs use `JUST Sans` for clean editorial readability.

---

## Layout & Container

- **Focused Editorial Width:** `max-width: 760px` centered with `margin: 0 auto`.
- Padding: `var(--space-lg)` (24px) horizontal gutter on desktop, `var(--space-md)` (16px) on mobile.
- Clean vertical rhythm using `1.5rem` to `3rem` section spacing.

---

## Key Components & Patterns

### 1. Terminal Prompt & Brand
- Brand in nav: `rjaks:~$` with blinking cursor or prompt dot.
- Page header prompt: `rjaks:~$ whoami` leading into display name `Adrian Reforsado`.

### 2. Editorial Inline Links
- Links within prose have a subtle underline (`text-decoration-color: var(--color-border)`).
- On hover, transitions cleanly to `var(--color-accent)`.
- External links include the subtle diagonal arrow glyph: `↗` (`.ext-arrow`).

### 3. Keyboard Shortcuts (`<kbd>`)
- Keycaps are rendered with `<kbd>`:
  - `<kbd>h</kbd>` → Home
  - `<kbd>w</kbd>` → Work
  - `<kbd>p</kbd>` → Projects
  - `<kbd>b</kbd>` → Writing (Blog)
  - `<kbd>t</kbd>` → Toggle theme
  - `<kbd>?</kbd>` → Shortcuts cheat sheet modal
- Visible `<kbd>` hint pills appear in navbar links and the footer status bar.

### 4. GitHub Contribution Heatmap
- Live contribution grid styled to match the dark/light palette.
- Displays yearly total badge (`[XXX this year]`) and kavin.me inspired subtext.

### 5. Terminal Panels & Cards
- Minimalist borders (`1px solid var(--color-border)`), crisp corners (`border-radius: var(--radius-md)`), with subtle amber border glow on hover.

---

## Tone of Voice
- Direct, concise, technical, and understated.
- Avoid corporate fluff and unnecessary decorations.
- Embrace developer authenticity and craft.
