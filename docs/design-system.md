# rjaks.me — Design System

> **Theme:** Modern Minimalist × Subtle Golden Retriever Branding
> **Personality:** Warm, smart, welcoming — professionally playful.

---

## Brand Direction

This site uses a **light-first** design with a warm, editorial aesthetic subtly influenced by Golden Retriever energy — warm tones, cozy surfaces, and playful micro-interactions that don't announce themselves. The dog theme is **never literal in content**; it lives in texture, interaction, color, and personality.

---

## Color Palette

### Light Mode (default)

| CSS Variable | Name | Hex | Usage |
|---|---|---|---|
| `--color-bg` | Oat White | `#FAF7F2` | Page background |
| `--color-surface` | Soft Cream | `#F5EFE0` | Cards, panels |
| `--color-surface-hover` | Warm Cream | `#EDE4D2` | Card/panel hover state |
| `--color-border` | Muted Warm | `#E2D9CC` | Borders, dividers |
| `--color-text-primary` | Warm Charcoal | `#2C2520` | Primary text |
| `--color-text-secondary` | Muted Brown | `#8A7D74` | Secondary/meta text |
| `--color-accent` | Golden Amber | `#E8A427` | Primary accent, CTAs, highlights |
| `--color-accent-hover` | Deep Amber | `#C98A1A` | Accent hover state |
| `--color-accent-secondary` | Dusty Sage | `#8FA68E` | Secondary accent, success states |

### Dark Mode (`[data-theme="dark"]`)

| CSS Variable | Name | Hex | Usage |
|---|---|---|---|
| `--color-bg` | Dark Espresso | `#1C1917` | Page background |
| `--color-surface` | Rich Charcoal | `#28211E` | Cards, panels |
| `--color-surface-hover` | Lifted Charcoal | `#342B27` | Card/panel hover state |
| `--color-border` | Warm Dark Border | `#3D3229` | Borders, dividers |
| `--color-text-primary` | Oat Cream | `#FAF7F2` | Primary text |
| `--color-text-secondary` | Warm Gray | `#A89990` | Secondary/meta text |
| `--color-accent` | Golden Amber | `#E8A427` | Same accent across modes |
| `--color-accent-hover` | Deep Amber | `#C98A1A` | Same hover across modes |
| `--color-accent-secondary` | Dusty Sage | `#8FA68E` | Same secondary across modes |

> Dark mode toggle label: ☀️ / 🌙 — no dog theming on the toggle itself.

---

## Typography

### Font Stack

| Role | Font | Fallback | CSS Variable |
|---|---|---|---|
| **Headings** | Recoleta (400) | Georgia, serif | `--font-family-heading` |
| **Body / UI** | JUST Sans (400, 800) | -apple-system, sans-serif | `--font-family-base` |
| **Mono / Meta** | Space Mono (400, 700) | monospace | `--font-family-mono` |

Both `JUST Sans` and `Recoleta` are loaded as local `@font-face` from `/public/fonts/`. `Space Mono` is loaded from Google Fonts.

### Type Scale

| Token | Value | Usage |
|---|---|---|
| `--font-size-display` | `4.5rem` | Hero name |
| `--font-size-5xl` | `3.5rem` | Hero headings |
| `--font-size-4xl` | `2.5rem` | Section titles |
| `--font-size-3xl` | `2rem` | Card/subsection headings |
| `--font-size-2xl` | `1.5rem` | Large intro text |
| `--font-size-xl` | `1.25rem` | Emphasized body |
| `--font-size-base` | `1rem` | Default body |
| `--font-size-sm` | `0.875rem` | Meta, captions |
| `--font-size-xs` | `0.75rem` | Tags, badges |

### Letter Spacing
- **Recoleta headings:** `letter-spacing: -0.02em`
- **Space Mono:** `letter-spacing: -0.03em`
- **JUST Sans:** `letter-spacing: 0`

---

## Spacing Scale

| Token | Value |
|---|---|
| `--space-2xs` | `0.25rem` (4px) |
| `--space-xs` | `0.5rem` (8px) |
| `--space-sm` | `0.75rem` (12px) |
| `--space-md` | `1rem` (16px) |
| `--space-lg` | `1.5rem` (24px) |
| `--space-xl` | `2rem` (32px) |
| `--space-2xl` | `3rem` (48px) |
| `--space-3xl` | `4rem` (64px) |
| `--space-4xl` | `6rem` (96px) |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `0.375rem` | Inline elements |
| `--radius-md` | `0.5rem` | Inputs, small components |
| `--radius-lg` | `0.75rem` | Buttons, tags |
| `--radius-xl` | `1rem` | Cards (small) |
| `--radius-2xl` | `1.5rem` | Cards (standard) |
| `--radius-full` | `9999px` | Pills, badges |

Cards use `--radius-2xl` (24px) for a soft, pillow-like feel consistent with the warm aesthetic.

---

## Shadows

All shadows use warm-tinted values (no cool gray/blue shadows):

| Name | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 4px rgba(44, 37, 32, 0.06)` | Subtle lift |
| `--shadow-md` | `0 4px 16px rgba(44, 37, 32, 0.08)` | Cards |
| `--shadow-lg` | `0 8px 32px rgba(44, 37, 32, 0.12)` | Elevated panels |
| `--shadow-accent` | `0 4px 20px rgba(232, 164, 39, 0.25)` | Accent glow on hover |

---

## UI Components

### Cards
- Background: `var(--color-surface)`
- Border: `1px solid var(--color-border)`
- Border radius: `var(--radius-2xl)` (24px)
- Shadow: `var(--shadow-md)`
- Hover: background shifts to `var(--color-surface-hover)` + `translateY(-3px)` + `var(--shadow-lg)`
- Transition: `var(--transition-normal)`

### Buttons
- **Primary:** Background `var(--color-accent)`, text `var(--color-bg)`, `border-radius: var(--radius-full)`
- **Secondary:** Border `1px solid var(--color-border)`, background transparent, text `var(--color-text-primary)`
- **Ghost:** Text `var(--color-accent)`, no background or border
- All buttons: hover uses `var(--color-accent-hover)` or `var(--shadow-accent)`

### Tags / Badges
- Font: `var(--font-family-mono)`, `var(--font-size-xs)`
- Shape: `border-radius: var(--radius-full)` (pill)
- Background: `var(--color-border)`
- Text: `var(--color-text-secondary)`
- Padding: `0.25rem 0.75rem`

### Dividers
- Default: `1px solid var(--color-border)`
- Decorative option: wavy SVG line in `var(--color-border)` color

---

## Transitions

| Token | Value | Usage |
|---|---|---|
| `--transition-fast` | `150ms cubic-bezier(0.4, 0, 0.2, 1)` | Micro state changes |
| `--transition-normal` | `250ms cubic-bezier(0.4, 0, 0.2, 1)` | Standard interactions |
| `--transition-slow` | `400ms cubic-bezier(0.4, 0, 0.2, 1)` | Page/section transitions |
| `--transition-spring` | `400ms cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy/playful hover elements |

`--transition-spring` uses an overshoot easing curve for a subtle bouncy energy on interactive elements.

---

## Micro-Interactions & Dog Branding

The dog theme is expressed through **behavior and texture**, not content.

### Cursor
- Custom cursor with a subtle paw-print stamp effect on click.
- The paw effect is an overlay layer only — standard pointer behavior is preserved.

### Spring Physics
- Apply `--transition-spring` to: card hover lift, CTA button press, tag hover scale.
- Creates an eager, bouncy feel without being cartoonish.

### Corner Mascot Widget
- A minimal line-art Golden Retriever SVG fixed to the bottom-right corner.
- **Idle state:** Sleeping (subtle looping breathing animation).
- **Hover state:** Eyes open, subtle tail-wag.
- **Click state:** Stands up, speech bubble appears briefly.
- Style: SVG, single color (`var(--color-accent)`), ~80px footprint.
- This is the **only** explicit dog visual on the site.

### Dark Mode Toggle
- Light label: Day Walk ☀️ / Dark label: Bedtime 🌙
- Transition: full-page warm crossfade (300ms).

### 404 Page
- Headline: *"Looks like this page wandered off."*
- Subtext: *"Let's head back home."*
- Visual: the corner mascot in a confused/sniffing pose.

---

## Page Structure & Layout

### Container
- `max-width: 1100px`
- `padding: 0 var(--space-lg)`
- Centered with `margin: 0 auto`

### Grid
- Base: 12-column CSS Grid
- Card grids: 2–3 columns desktop, 1 column mobile
- Gap: `var(--space-lg)`

### Standard Page Sections
- Hero
- Projects
- Experience
- Skills
- About
- Contact

---

## Tone of Voice

- Direct, warm, self-aware.
- Professional without stiffness.
- Subtle wit — never forced.
- Example taglines:
  - *"Loyal to clean code & sharp design."*
  - *"Chasing ambitious ideas."*
  - *"Always eager to learn new tricks."*

---

## What NOT to Do

- Do not use blue, cyan, or indigo as accent colors.
- Do not use cool-gray shadows — warm-tinted shadows only.
- Do not name sections with dog puns.
- Do not use cartoon or clipart dog imagery.
- Do not add dog imagery to every section — the mascot widget is the single explicit dog visual.
