---
name: PEP — Parti de l'Émancipation Populaire
description: Le site du mouvement lu comme un réseau de transport — quatre axes politiques tracés comme des lignes qu'on peut suivre.
colors:
  bg: "#0c0f0c"
  ink: "#f4f2ec"
  ink-soft: "#cdd1c5"
  muted: "#8f9689"
  line-eco: "#e2703f"
  line-services: "#3f9169"
  line-justice: "#8577ad"
  line-gouv: "#dcac57"
  line-jeunesse: "#c96b81"
  line-trunk: "#aab0a2"
typography:
  display:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontWeight: 800
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "8px"
  md: "10px"
  lg: "14px"
spacing:
  sm: "14px"
  md: "22px"
  lg: "48px"
components:
  button-primary:
    backgroundColor: "{colors.line-eco}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0 22px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 22px"
---

# Design System: PEP — Réseau des quatre axes

## Overview

**Creative North Star: "The Transit Map"**

The site reads as the movement's own wayfinding system rather than a government portal or a SaaS marketing template. The four programme axes — Économie, Services publics, Justice, Bonne gouvernance — are drawn as four named, colored lines. The party's own organisational chart is the network those lines run on: a hub-and-spoke diagram of roundel stations connected by orthogonal, color-coded paths that draw themselves in as the visitor scrolls. Nothing on the site is decorative in the generic-AI sense — no glassmorphism, no gradient blobs, no icon-tile grids, no kicker labels floating above headings. Every surface is a flat signage panel; every color-coding choice ties back to one of the four lines.

Confirmed visual rejections (explicit, from the prior pass this system replaced): rounded glass cards with backdrop-blur, pill-shaped primary buttons, a small-caps "eyebrow" chip above every heading, colored `border-left` accents on quotes, radial-gradient decorative blobs, emoji used as icons.

**Key Characteristics:**
- Four named axis-lines carry all color meaning; nothing else introduces a new hue.
- Flat signage panels (hairline border + one colored top-tab), never stacked border-and-shadow.
- Overpass (signage grotesk) for every heading and label; Barlow for body and controls.
- The org chart is the signature interaction: its connectors draw themselves in on scroll.

## Colors

The palette is desaturated and earthy at rest (near-black ink, warm cream in light mode), with exactly five saturated hues reserved for line-coding — never used decoratively outside that role.

### Primary
- **Économie — Terracotta** (`#e2703f` dark / `#b8551f` light): the économie productive axis; also the default primary-button fill and focus color.

### Secondary
- **Services publics — Green** (`#3f9169` dark / `#2c704c` light): the services publics axis (santé, éducation, eau, énergie).
- **Justice — Plum** (`#8577ad` dark / `#5f5486` light): the justice & droit axis.
- **Bonne gouvernance — Ochre** (`#dcac57` dark / `#8a6217` light): the bonne-gouvernance axis; also citations and CTA highlights inherited from the previous pass.

### Tertiary
- **Jeunesse — Rose** (`#c96b81` dark / `#a24e63` light): the youth pole and the Odyans video-series accent; the one hue that isn't one of the four programme axes.

### Neutral
- **Trunk ink** (`#aab0a2` dark / `#5c6154` light): every structural (non-axis-specific) connector and panel top-tab — Congrès, Bureau, Secrétariat, Sections, Formation.
- **Ink** (`#f4f2ec` dark / `#181a13` light): primary text.
- **Ink-soft** (`#cdd1c5` dark / `#3c4032` light): body copy.
- **Muted** (`#8f9689` dark / `#666b5a` light): labels, captions, metadata.

### Named Rules
**The One Line, One Meaning Rule.** A line color always means the same axis everywhere it appears — hero diagram, org chart, feature-card top-tab, timeline dot. Never reuse a line color for an unrelated accent.

## Typography

**Display Font:** Overpass (with system-ui, sans-serif)
**Body Font:** Barlow (with system-ui, sans-serif)

**Character:** Both are humanist grotesks with signage lineage (Overpass derives from U.S. highway gothic) — legible at small station-label sizes and confident at hero scale, with no serif anywhere in the system.

### Hierarchy
- **Display** (800, `clamp(2rem, 3.4vw, 3.6rem)`, 1.12): hero and article-title headlines.
- **Headline** (700, `clamp(1.5rem, 2.5vw, 2.5rem)`): section heads — carries its own weight, no kicker above it.
- **Title** (700, `clamp(1.1rem, 1.6vw, 1.32rem)`): card and panel titles.
- **Body** (400, 1.02rem, 1.6-1.8 line-height, ~70ch measure): paragraph copy.
- **Label** (800, 0.7-0.86rem, uppercase, tracked): nav items, tags, org-chart station labels.

### Named Rules
**The No-Kicker Rule.** No small-caps label ever sits above a heading. The heading carries its own weight; if it needs a numeral (an axis or commission number), the numeral goes inline inside the heading as a circular tag, never floating above it.

## Layout

Single shared `assets/styles.css` drives all 74 pages (37 French + 37 Haitian Creole mirrors under `ht/`); there is no build step. Container max-width 1280px. Section rhythm: 64px vertical padding at desktop, 48px at mobile. Breakpoints at 1100px (nav collapses to the mobile menu) and 760px (single-column stacking, hero network-diagram hidden). The homepage hero's network-map SVG is a fixed-height in-flow strip (not an absolutely-positioned background) specifically so it never collides with headline or paragraph text regardless of copy length.

## Elevation & Depth

Flat by design. No shadows carry meaning; every surface sits at one declared elevation — a 1px hairline border — and nothing stacks a shadow on top of a border. Depth, where it exists at all, comes from the 3px colored top-tab that identifies which line a panel belongs to, not from a lifted appearance.

### Named Rules
**The Single Elevation Rule.** A panel declares its edge exactly once: a hairline border. Hover states shift the top-tab's color, never add a shadow.

## Shapes

Corners stay small and structural: 8px on buttons and inputs, 10-14px on panels, full circles on org-chart roundels and line-origin station dots. No pill-shaped primary buttons — pills are reserved for the language switch and small tag chips only. Connectors are strictly orthogonal (elbow) paths, never smooth bezier curves, matching the transit-diagram grammar.

## Components

### Buttons
- **Shape:** 8px radius rectangular tab (not a pill).
- **Primary:** solid économie-terracotta fill, white text, a 3px darker inset line standing in for a baseplate edge.
- **Hover / Focus:** brightness lift on hover, no translateY shadow-lift; focus ring uses the terracotta line color.
- **Secondary / Ghost:** transparent fill, 2px hairline border, no background at rest.

### Signage Panel (the system's "card")
- **Corner Style:** 14px (`--r`).
- **Background:** flat surface color (`--surface`), no gradient.
- **Shadow Strategy:** none — see Elevation & Depth.
- **Border:** 1px hairline + 3px colored top border (the line-coding tab).
- **Internal Padding:** 22-24px.

### Inputs / Fields
- **Style:** 8px radius, 1px border, flat input background, no inset shadow.
- **Focus:** border shifts to économie-terracotta.
- **Label:** uppercase, tracked, muted color, always visible (never placeholder-only).

### Navigation
- Desktop: pill-free text links with a 3px bottom-border reveal on hover (a "line underline," not a background pill). Dropdown panels use a left-border reveal per item on hover, matching the org-chart's own line-of-descent motif.
- Mobile: full-width accordion sheet; the hamburger glyph swaps to a close glyph via `.mobile-toggle.is-open`.

### Organigramme (signature component)
A hub-and-spoke network diagram, not a box grid. Structural nodes (Congrès, Bureau, Secrétariat, Sections, Formation) are neutral trunk-colored roundels holding a small hand-drawn glyph (institution, compass, eye, globe, folder, pin, book — no emoji). The five thematic pôles are roundels colored to their matching axis line. Connectors are orthogonal SVG paths that animate in via `stroke-dashoffset` as the section enters the viewport (`IntersectionObserver`, staggered ~90ms per connector), and snap to fully-drawn instantly under `prefers-reduced-motion` or on a subsequent resize (the state persists in a `hasRevealed` flag so a rebuilt SVG never re-hides already-shown lines).

## Do's and Don'ts

### Do:
- **Do** keep every line-color assignment consistent across the hero diagram, the org chart, and feature-card top-tabs — an axis's color is a fact about the party's programme, not a per-component choice.
- **Do** put the org chart's connector-drawing logic through the `hasRevealed` guard whenever the canvas is rebuilt (resize, language toggle) so the signature animation can't silently break.
- **Do** keep the homepage network diagram as a bounded-height in-flow element, never an absolutely-positioned full-bleed background — the party's manifesto-length hero copy is real content that must never be fought for space by decoration.

### Don't:
- **Don't** add a kicker/eyebrow label above any heading — this system's one hard ban, carried over from the redesign that replaced it.
- **Don't** reach for a pill-shaped primary button, a glass/blur surface, or a colored `border-left` accent — all three were the previous system's tells and are explicitly retired.
- **Don't** introduce a sixth accent color. Five hues (four axes + jeunesse) is the complete palette; a new accent dilutes the one-line-one-meaning rule.
