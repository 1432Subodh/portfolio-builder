---
version: alpha
name: Profilio-design-system
description: The Profilio design language — a dark-first portfolio builder with a near-black canvas (`#121214`), off-white text (`#f5f5f4`), and a deep green primary (`#006239`) as the only chromatic event. Built on Inter (weight 500 for display, 400 for body) with tight negative letter-spacing, 6px square-ish button radii, and composited product UI mockups as the dominant decorative element. A full light theme mirror is available via `data-theme="light"`.

colors:
  --background: #121214;
  --foreground: #f5f5f4;
  --primary: #006239;
  --primary-deep: #057748;
  --on-primary: #f5f5f4;
  --ink: #f5f5f4;
  --ink-2: #e8e8e7;
  --ink-mute: #a3a3a3;
  --ink-mute-2: #737373;
  --ink-faint: #525252;
  --canvas: #18181b;
  --canvas-soft: #1c1c1e;
  --canvas-night: #0d0d0f;
  --canvas-night-soft: #202023;
  --hairline: #2a2a2e;
  --hairline-strong: #3f3f46;
  --hairline-cool: #26262a;
  --hairline-cool-3: #3a3a40;
  # Light theme overrides (data-theme="light")
  --background-light: #f4f4f5;
  --foreground-light: #17171a;
  --primary-light: #028a56;
  --primary-deep-light: #01794b;
  --ink-light: #17171a;
  --ink-2-light: #27272a;
  --ink-mute-light: #52525b;
  --ink-mute-2-light: #71717a;
  --ink-faint-light: #a1a1aa;
  --canvas-light: #ffffff;
  --canvas-soft-light: #fafafa;
  --canvas-night-light: #f4f4f5;
  --canvas-night-soft-light: #ffffff;
  --hairline-light: #e4e4e7;
  --hairline-strong-light: #d4d4d8;
  --hairline-cool-light: #ececee;
  --hairline-cool-3-light: #dcdcdf;

typography:
  display-xxl:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 72px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.04em
  display-xl:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 60px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.04em
  display-lg:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 48px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.03em
  display-md:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 36px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.03em
  heading-lg:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0
  heading-md:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  body-lg:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: 0
  body-md:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  button-md:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0
  caption:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0
  micro:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: 0.18em
  code:
    fontFamily: "ui-monospace, Menlo, Monaco, Consolas, 'Liberation Mono', monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0

rounded:
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  2xl: 16px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  huge: 64px

components:
  button-primary-green:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  button-primary-green-pressed:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  button-secondary-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  button-on-dark:
    backgroundColor: "{colors.canvas-night}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 8px 16px
  button-link:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.sm}"
    padding: 0px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 8px 12px
  card-feature-light:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-pricing:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-pricing-featured:
    backgroundColor: "{colors.canvas-night}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  card-feature-dark:
    backgroundColor: "{colors.canvas-night}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  code-block:
    backgroundColor: "{colors.canvas-night}"
    textColor: "{colors.ink}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: 16px
  pill-tag-green:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.micro}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  pill-tag-soft:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.micro}"
    rounded: "{rounded.full}"
    padding: 2px 8px
  nav-bar:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 16px 24px
  link-on-dark:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 0px
  footer:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink-mute}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: 64px 24px
---

## Overview

Profilio's design language is built on a **dark-first** canvas. The default theme sits on `{colors.background}` (`#121214` — near-black), with text rendered in `{colors.ink}` (`#f5f5f4` — off-white, never pure white). The primary chromatic event is **deep green** (`{colors.primary}` — `#006239`) — used as the filled CTA background with white-on-green text, accent dots, and active state indicators. Everything else is a calibrated dark-grey ladder from `{colors.hairline}` (`#2a2a2e`) to `{colors.ink}` (`#f5f5f4`), with thin light-on-dark typography doing most of the visual work.

A light theme variant is available via `data-theme="light"` on `<html>`, flipping to white canvas (`#ffffff`), near-black ink (`#17171a`), and a brighter primary (`#028a56`). The light palette is a full mirror of the dark tokens.

Typography runs **Inter** (loaded via `next/font/google`) at weight 500 for display and 400 for body. The display tier uses tight negative letter-spacing (-0.04em at 72px) to pull the geometric letterforms into editorial density. The brand commits to dark canvas for the marketing track — no atmospheric gradients, no full-bleed photography.

The product itself appears as composited UI screenshots on every page: dashboard tables, SQL editors, query builders, log streams. These screenshots are the brand's argument. They sit inside `{rounded.lg}` (8px) containers with subtle Level 2 shadows, often arranged 2-up or in a floating "stacked panes" composition above the hero band.

**Key Characteristics:**
- Dark-first canvas (`{colors.background}` `#121214`) as the default marketing surface; light theme available via `data-theme="light"`.
- Deep green primary (`{colors.primary}` `#006239`) with white text (`{colors.on-primary}` `#f5f5f4`) on filled CTAs.
- Inter at weight 500 with negative letter-spacing of -0.04em to -0.03em for display tiers.
- Composited product UI screenshots (dashboard, SQL editor, log stream) are the dominant decorative element — never photography, never illustrations.
- Tight `{rounded.md}` (6px) button radii — square-ish, technical, never pill-shaped.
- Code blocks rendered in deep `{colors.canvas-night}` (`#0d0d0f`) with monospace inline code; the brand's developer DNA is visible in every snippet.
- Pricing tiers use a dark `{colors.canvas-night}` featured tier with primary-colored badge, not a green-filled tier — the green is reserved for CTA buttons and dot accents.
- Light theme mirrors all dark tokens: white canvas, near-black ink, brighter primary (`#028a56`), with the same component structure.

## Colors

> **Source pages:** home (`/`), `/database`, `/partners/integrations`, `/partners/integrations/powersync`, `/solutions/ai-builders`, `/pricing`.
> **Theme system:** Dark is default. Light theme applied via `<html data-theme="light">` with full token overrides in `:root[data-theme="light"]`.

### Brand & Accent
- **Deep Green** (`{colors.primary}` — `#006239`): The signature CTA color. Filled-button background, active indicators, accent dots.
- **Deep Green Hover** (`{colors.primary-deep}` — `#057748`): Pressed-state lift of the primary.
- **Light Green** (`{colors.primary-light}` — `#028a56`): Brighter emerald used in the light theme variant.
- **Light Green Hover** (`{colors.primary-deep-light}` — `#01794b`): Pressed-state for light theme.
- **Accent Purple** (`{colors.accent-purple}` — `#6b01c2`): Rare accent used in integration logos and chart points; never a button.
- **Accent Violet** (`{colors.accent-violet}` — `#644fc1`): Secondary accent in the same role as accent purple.
- **Accent Yellow** (`{colors.accent-yellow}` — `#ffdb13`): Chart accent / status indicator only.
- **Accent Pink / Crimson / Indigo / Tomato**: Reserved for integration logos and rare chart highlights, never as system colors.

### Surface
- **Background** (`{colors.background}` — `#121214`): Default page background (dark theme).
- **Background Light** (`{colors.background-light}` — `#f4f4f5`): Page background (light theme).
- **Canvas** (`{colors.canvas}` — `#18181b`): Card and component background (dark theme).
- **Canvas Light** (`{colors.canvas-light}` — `#ffffff`): Card and component background (light theme).
- **Canvas Soft** (`{colors.canvas-soft}` — `#1c1c1e`): Slightly lifted dark surface for alternating sections, filter bars, input backgrounds.
- **Canvas Soft Light** (`{colors.canvas-soft-light}` — `#fafafa`): Barely-tinted off-white (light theme).
- **Canvas Night** (`{colors.canvas-night}` — `#0d0d0f`): Deep near-black used in code blocks, dashboard mockups, mobile drawer, featured pricing tier.
- **Canvas Night Light** (`{colors.canvas-night-light}` — `#f4f4f5`): Mapped to background in light theme.
- **Canvas Night Soft** (`{colors.canvas-night-soft}` — `#202023`): Slightly lifted dark for nested chrome (dark theme).
- **Canvas Night Soft Light** (`{colors.canvas-night-soft-light}` — `#ffffff`): White in light theme.
- **Hairline** (`{colors.hairline}` — `#2a2a2e`): 1px borders on cards and tables (dark theme).
- **Hairline Light** (`{colors.hairline-light}` — `#e4e4e7`): 1px borders (light theme).
- **Hairline Strong** (`{colors.hairline-strong}` — `#3f3f46`): Slightly darker border for emphasis (dark theme).
- **Hairline Strong Light** (`{colors.hairline-strong-light}` — `#d4d4d8`): Emphasis border (light theme).
- **Hairline Cool** (`{colors.hairline-cool}` — `#26262a`): The brand's grey ladder for fine chrome work (dark theme).
- **Hairline Cool Light** (`{colors.hairline-cool-light}` — `#ececee`): Grey ladder (light theme).
- **Hairline Cool 3** (`{colors.hairline-cool-3}` — `#3a3a40`): Darker grey ladder step (dark theme).
- **Hairline Cool 3 Light** (`{colors.hairline-cool-3-light}` — `#dcdcdf`): Darker grey ladder step (light theme).

### Text
- **Ink** (`{colors.ink}` — `#f5f5f4`): Default body text (dark theme). Off-white, never pure white.
- **Ink Light** (`{colors.ink-light}` — `#17171a`): Default body text (light theme). Near-black, never pure black.
- **Ink 2** (`{colors.ink-2}` — `#e8e8e7`): Slightly cooler off-white for body emphasis (dark theme).
- **Ink 2 Light** (`{colors.ink-2-light}` — `#27272a`): Body emphasis (light theme).
- **Ink Mute** (`{colors.ink-mute}` — `#a3a3a3`): Secondary text and helper copy (dark theme).
- **Ink Mute Light** (`{colors.ink-mute-light}` — `#52525b`): Secondary text (light theme).
- **Ink Mute 2** (`{colors.ink-mute-2}` — `#737373`): Tertiary text (dark theme).
- **Ink Mute 2 Light** (`{colors.ink-mute-2-light}` — `#71717a`): Tertiary text (light theme).
- **Ink Faint** (`{colors.ink-faint}` — `#525252`): Disabled / placeholder text (dark theme).
- **Ink Faint Light** (`{colors.ink-faint-light}` — `#a1a1aa`): Disabled / placeholder text (light theme).
- **On Primary** (`{colors.on-primary}` — `#f5f5f4`): Text on the deep green fill — white on dark green. The button reads as a "lit" surface with light type.
- **On Primary Light** — Same white text on green in both themes.
- **Foreground** (`{colors.foreground}` — `#f5f5f4`): Default text color mapped to body (dark theme).
- **Foreground Light** (`{colors.foreground-light}` — `#17171a`): Default text color (light theme).

## Typography

### Font Family

The display and UI tier is **Inter** — an open-source geometric humanist sans loaded via `next/font/google`. Fallback chain: `'Helvetica Neue', Helvetica, Arial, sans-serif`.

Code blocks use **system mono** (`ui-monospace`, with Menlo / Monaco / Consolas fallbacks).

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xxl}` | 72px (lg) / 60px (sm) / 48px (mobile) | 500 | 1.1 | -0.04em | Hero headline |
| `{typography.display-xl}` | 48px | 500 | 1.15 | -0.03em | Section heading (SectionHeading) |
| `{typography.display-lg}` | 36px | 500 | 1.15 | -0.03em | Sub-section heading |
| `{typography.display-md}` | 30px | 500 | 1.15 | -0.03em | Card title |
| `{typography.heading-lg}` | 22px | 500 | 1.2 | 0 | Compact heading |
| `{typography.heading-md}` | 18px | 500 | 1.4 | 0 | Section sub-heading |
| `{typography.body-lg}` | 18px | 400 | 1.625 | 0 | Marketing body lead, hero description |
| `{typography.body-md}` | 16px | 400 | 1.5 | 0 | Default UI body |
| `{typography.button-md}` | 14px | 500 | 1.0 | 0 | Button label |
| `{typography.caption}` | 13px | 400 | 1.45 | 0 | Helper, footnote |
| `{typography.micro}` | 12px | 600 | 1.45 | 0.18em | Eyebrow label, uppercase tags |
| `{typography.code}` | 14px | 400 | 1.5 | 0 | Code block content |

### Principles
- **Weight 500 across display.** Mid-weight reads as engineered, not decorative.
- **Negative tracking on display.** -0.04em at hero size, -0.03em at section level — tightens the geometric letterforms into editorial density.
- **Mono for code.** System mono families (Menlo / Monaco) — no proprietary mono webfont.
- **Micro token uses weight 600 + 0.18em tracking** for uppercase eyebrows and fine-print labels.

### Note on Font Choice
Inter is loaded via `next/font/google` with `--font-inter` CSS variable. It provides the geometric humanist character used throughout the design system. The `font-sans` variable maps to `var(--font-inter), 'Helvetica Neue', Helvetica, Arial, sans-serif`.

## Layout

### Spacing System
- **Base unit**: 8px (with 2 / 4 / 12 sub-tokens for fine work).
- **Tokens**: `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.lg}` 16px · `{spacing.xl}` 24px · `{spacing.xxl}` 32px · `{spacing.huge}` 64px.
- **Section padding**: 64–96px on marketing surfaces.
- **Card internal padding**: 32px on feature/pricing cards.

### Grid & Container
- Marketing pages center in a ~1280px container with no edge-bleed; the brand keeps content inside the box.
- Pricing collapses 4-up → 2-up → 1-up at 1024 / 768 breakpoints.
- Product UI mockups stack 2-up or render as overlapping panes inside the same container.

### Whitespace Philosophy
The brand uses generous 64–96px section padding without atmospheric gradients filling the space — the white canvas is the design. The composited product UI mockups break up sections without requiring decoration.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 | Flat, 1px hairline | Default cards |
| 1 | `box-shadow: 0 1px 3px rgba(0,0,0,0.4)` | Subtle card lift, scrolled header, active tabs |
| 2 | `box-shadow: 0 8px 24px rgba(0,0,0,0.5)` | Floating composited UI mockups, solution panels |
| 3 | `box-shadow: 0 16px 48px rgba(0,0,0,0.6)` | Modal overlays, deep elevation, featured pricing tier |

### Decorative Depth
The brand's depth is **product UI mockups** rather than gradients. Stacked dashboard / SQL editor / log panes composite together with subtle Level 2 shadows to suggest spatial hierarchy. On dark surfaces, shadows blend with the near-black canvas for a seamless layered effect.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 2px | Decorative micro-elements |
| `{rounded.sm}` | 4px | Form inputs, hairline tags, dropdown items |
| `{rounded.md}` | 6px | Buttons (the brand's signature button radius), code blocks, filter pills |
| `{rounded.lg}` | 8px | Cards, alerts, icon containers, dropdown panels |
| `{rounded.xl}` | 12px | Mobile drawer items, featured cards, modal chrome |
| `{rounded.2xl}` | 16px | Modal dialogs, large container chrome |
| `{rounded.full}` | 9999px | Pill tags, avatars, filter badges |

### Photography Geometry
The brand uses minimal photography. Customer logo strips display wordmarks at uniform height (~24–32px) in greyscale; case-study cards (rare) use 4:3 photos inset in `{rounded.lg}` (8px) containers.

## Components

### Buttons

**`button-primary-green`** — the signature CTA.
- Background `{colors.primary}` (`#006239`), text `{colors.on-primary}` (`#f5f5f4` — white), type `{typography.button-md}`, padding `{spacing.sm} {spacing.lg}` (8px 16px), rounded `{rounded.md}` (6px). On light theme, same white-on-green.
- Pressed state `button-primary-green-pressed` shifts to `{colors.primary-deep}` (`#057748`).

**`button-secondary-outline`** — outline alternative on dark.
- Background `{colors.canvas}` (`#18181b`), text `{colors.ink}` (`#f5f5f4`), 1px solid `{colors.hairline-strong}` border, same shape.

**`button-on-dark`** — used on dark surfaces / code-block CTAs.
- Background `{colors.canvas-night}` (`#0d0d0f`), text `{colors.ink}` (`#f5f5f4`), same shape.

**`button-link`** — text-only inline button.
- Transparent background, text `{colors.ink}` rendered in `{typography.button-md}`, no padding, with a subtle underline on hover.

### Cards & Containers

**`card-feature-light`** — feature card on dark surface.
- Background `{colors.canvas-soft}` (`#1c1c1e`), padding `{spacing.xxl}` (32px), rounded `{rounded.lg}` (8px), 1px `{colors.hairline}` border. Hover lifts to `{colors.hairline-strong}` border.

**`card-pricing`** — standard pricing tier.
- Background `{colors.canvas-soft}` (`#1c1c1e`), padding `{spacing.xxl}`, rounded `{rounded.lg}`, 1px `{colors.hairline}` border. Title in `{typography.heading-lg}`, price in `{typography.display-md}`, body in `{typography.body-md}`, CTA `button-primary-green` pinned bottom.

**`card-pricing-featured`** — featured dark tier.
- Background `{colors.canvas-night}` (`#0d0d0f`), text `{colors.ink}`, with primary-colored badge at top, shadow `0 16px 48px rgba(0,0,0,0.6)`. Same structure as standard pricing.

**`card-feature-dark`** — feature card with deep dark fill.
- Background `{colors.canvas-night}`, text `{colors.ink}`, padding `{spacing.xxl}`, rounded `{rounded.lg}`. Used for code-heavy feature explanations and terminal mockups.

**`code-block`** — code snippet container.
- Background `{colors.canvas-night}`, text `{colors.ink}` rendered in `{typography.code}`. Padding `{spacing.lg}` (16px), rounded `{rounded.md}` (6px).

### Inputs & Forms

**`text-input`** — standard form input.
- Background `{colors.canvas}` (`#18181b`), text `{colors.ink}`, type `{typography.body-md}`, padding `{spacing.sm} {spacing.md}` (8px 12px), rounded `{rounded.md}` (6px), 1px `{colors.hairline}` border.

### Navigation

**`nav-bar`** — top nav across the site (dark theme default).
- Background `{colors.background}` (`#121214`), text `{colors.ink}`, padding `{spacing.lg} {spacing.xl}` (16px 24px). Logo on the left, primary nav center, "Sign In" link + filled `button-primary-green` on the right. Bottom border `{colors.hairline-cool}`, elevated with `elev-1` on scroll.

### Pills, Tags, and Chips

**`pill-tag-green`** — small green pill used for "new" or featured indicators.
- Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.micro}` (12px/600/0.18em), padding `{spacing.xxs} {spacing.sm}` (2px 8px), rounded `{rounded.full}` (9999px).

**`pill-tag-soft`** — neutral pill on dark surfaces.
- Background `{colors.canvas-soft}`, text `{colors.ink}`, otherwise same shape.

### Signature Components

**Composited Product UI Mockups** — multi-layer dashboard / SQL editor / log pane composites with subtle Level 2 shadows. The product is the brand's argument; mockups always sit on `{colors.canvas-night}` backgrounds with no surrounding decoration.

**`link-on-light`** — inline links in body copy.
- Text `{colors.ink}` rendered in `{typography.body-md}` with a persistent underline.

**`footer`** — site-wide footer.
- Background `{colors.canvas-soft}` (`#1c1c1e`), text `{colors.ink-mute}` (`#a3a3a3`), type `{typography.caption}`, padding `{spacing.huge} {spacing.xl}` (64px 24px). Holds 4–5 columns of link groups, social icons, and a small legal row with theme switcher.

## Do's and Don'ts

### Do
- Reserve `{colors.primary}` deep green for filled CTAs and accent dots — it should appear sparingly against the dark canvas.
- Render display tiers at weight 500 with negative letter-spacing — the engineered tightness is part of the brand.
- Use `{rounded.md}` 6px for buttons — square-ish radii, never pill-shaped.
- Composite product UI mockups inside `{rounded.lg}` containers with subtle Level 2 shadows.
- Use white text `{colors.on-primary}` on the deep green button — the green reads as "lit" with light type, which is the brand's signature.
- Apply system mono for every code block.
- Default to dark canvas (`{colors.background}` `#121214`) for marketing surfaces.

### Don't
- Don't introduce additional accent colors as system colors — purples, yellows, and pinks belong inside chart points and integration logos only.
- Don't bump display weight above 500 — the brand's calibrated mid-weight breaks at 600+.
- Don't use pill-shaped buttons; the brand's button radius is square-ish 6px (`{rounded.md}`).
- Don't use dark text on the deep green button — the brand specifically uses white on green.
- Don't add atmospheric gradients to hero bands — the dark canvas is the design.
- Don't use pure white (`#ffffff`) for text — always use off-white `{colors.ink}` (`#f5f5f4`) to avoid harsh contrast on dark surfaces.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Wide | ≥ 1440px | Full container width; product mockups at full scale |
| Desktop | 1024–1440px | Default content max-width (1280px); pricing 4-up |
| Tablet | 768–1023px | Pricing 2-up; mockups simplify to single panel; hamburger nav |
| Mobile | < 768px | Pricing 1-up; slide-in drawer nav; display drops 72 → 48px |

### Touch Targets
- Buttons hit ≥ 36×36px on mobile; vertical padding scales up to maintain WCAG AA minimum.
- Form fields stay at 36px minimum height.

### Collapsing Strategy
- Display tiers stair-step 72 → 60 → 48px (hero); 48 → 36px (section headings).
- Product UI mockups simplify to a single primary panel on mobile.
- Pricing tiers stair-step 4-up → 2-up → 1-up; dark featured tier always distinguished.
- Header nav collapses to hamburger + slide-in drawer at 1024px.

### Image Behavior
Product UI mockups use `srcset` with desktop / mobile crops; mobile crops focus on the most actionable inner panel.

## Iteration Guide

1. Focus on ONE component at a time.
2. Reference component names and tokens directly.
3. Run `npx @google/design.md lint DESIGN.md` after edits.
4. Default body to `{typography.body-md}` (16px); use `{typography.body-lg}` (18px) for marketing leads and `{typography.code}` for any developer-facing snippet.
5. Keep deep green scarce; one filled green button per viewport.
6. The dark-canvas commitment is non-negotiable — adding atmospheric backdrops or light backgrounds breaks the brand.
7. Theme support: dark is default; light theme is available via `data-theme="light"` with full token overrides.
