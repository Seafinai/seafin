---
name: Seafin.ai
description: AI consulting for small businesses; a plain, printed-report look in charcoal and cobalt, taken from the Seafin.ai logo.
colors:
  charcoal: "#292d32"
  cobalt: "#3563e9"
  cobalt-deep: "#2448b8"
  accent-soft: "#8ea8f3"
  accent-tint: "#eaf0fd"
  ink-700: "#41464e"
  ink-500: "#5c636d"
  line: "#e3e5e8"
  line-soft: "#eff0f2"
  line-strong: "#cdd0d5"
  bg: "#f5f6f8"
  paper: "#ffffff"
  paper-2: "#fbfbfc"
  hero-stone: "#eceae6"
  danger: "#b50909"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.5rem, 4.6vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.875rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  headline-sm:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: "Public Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 700
    lineHeight: 1.3
  lede:
    fontFamily: "Public Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Public Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "tnum"
  label:
    fontFamily: "Public Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.3
  mono:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
rounded:
  control: "6px"
  input: "10px"
  panel: "14px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 32px)"
  section: "clamp(56px, 7vw, 96px)"
  maxw: "1180px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-deep}"
  button-lg:
    padding: "0 26px"
    height: "52px"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  input:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.input}"
    padding: "11px 13px"
    height: "46px"
  tier-pill:
    textColor: "{colors.ink-700}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  panel:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.panel}"
---

# Design System: Seafin.ai

## Overview

**Creative North Star: "The Working Report"**

The site reads like a well-made consulting report: white paper, charcoal ink, hairline rules, serif headings, and cobalt only where something matters. Colour comes from the Seafin.ai logo; type, radii and spacing carry over from the Wardix system. One idea per section; lists are ruled rows, not cards.

White sections alternate with grey bands, with one charcoal section. The homepage opens on a light still-life photograph; the sample report, guides and policy pages are plain document pages on the same tokens.

**Key Characteristics:**
- Charcoal and cobalt from the logo; neutrals tinted toward charcoal.
- Serif headings over a sans body; tabular numbers everywhere.
- Ruled lists (a dark top rule, light dividers) instead of cards.
- One motion idea: a signal travels a line and lights what it reaches.
- Every diagram is complete without JavaScript.

## Colors

A two-colour brand (charcoal ink, cobalt mark) on cool white and grey paper.

### Primary
- **Logo Cobalt**: buttons, prices, dates, markers, links, focus rings, chart highlights, lit steps; hover deepens to **Cobalt Deep**. **Soft Cobalt** draws dashed wires; **Cobalt Tint** fills focus halos, the sample label and chart zones.

### Neutral
- **Logo Charcoal**: body ink, the strong top rule on lists, the report cover, and the dark section's surface.
- **Ink 700 / Ink 500**: secondary text and captions.
- **Line / Line Soft / Line Strong**: hairline dividers, inner borders, input borders.
- **Paper / Paper 2 / Band Grey (bg)**: page, inset panels, alternating bands.
- **Hero Stone**: the hero's warm backing under the photograph, with a left-to-right paper scrim (`rgba(246,245,242,0.92 → 0)`).
- **Danger**: form errors and stalled steps in process maps.

**Dark mode** (`prefers-color-scheme: dark`) swaps to the logo's charcoal family: paper `#212429`, bg `#1a1c20`, ink `#eceef1`, and a lighter cobalt `#7c9bf5` for links and markers (5.8:1 on paper). The logo's own cobalt stays as drawn.

### Named Rules
**The Logo Palette Rule.** Every colour comes from the logo's charcoal and cobalt or a neutral tinted toward them. No second accent.

**The One Dark Section Rule.** Only "How we build it" is dark: charcoal `#292d32` in light mode, `#111316` in dark mode (darker than the page, never lighter), with white ink and translucent white lines.

**The Light Hero Rule.** The opening photo is light in both schemes, so the hero keeps light tokens in dark mode.

## Typography

**Display Font:** Source Serif 4 (Georgia fallback)
**Body Font:** Public Sans (Helvetica Neue, Arial fallback)
**Mono Font:** Geist Mono, loaded but not yet used on any page.

**Character:** A bookish serif over a plain, sturdy sans; a printed report, not an app.

### Hierarchy
- **Display**: hero headline only, balanced wrap.
- **Headline**: section headings; report pages use slightly smaller serif steps.
- **Headline small**: service names, guide titles, news title, report key figures.
- **Title** (sans bold, 1.0625–1.1875rem): builds, steps, promises, routes, FAQ questions.
- **Lede**: hero and section intros, 46–62ch.
- **Body**: running text, 64–68ch, tabular numbers.
- **Label**: dates, captions, table heads, pills. Sentence case, no tracking.

## Layout

One centred column, 1180px max with a fluid gutter; report pages narrow to 860px. Sections have fluid vertical padding and a hairline between neighbours; `band` sections sit on the grey background.

Recurring ruled-list patterns: **services** in a 2×2 grid under a charcoal top rule with a vertical divider; **builds** four across with a 4:3 photo each; **guides** four across, each under a charcoal rule; **promises** three across; **news** four across; **steps** four dated columns on subgrid so every "You get" line aligns. Two-column splits (FAQ, sample, flow, booking) put the heading or object on the left; the FAQ heading stays sticky.

Breakpoints: 1100px routes stack; 1024px hero photo moves above the headline; 960px splits stack, grids halve; 760px nav links hide, ruled rows go single; 560px builds become thumbnail rows, steps a left-edge timeline; 480px smaller hero type, full-width buttons; 400px tighter nav for 320px phones.

## Elevation & Depth

Mostly flat; depth comes from rules and bands. Soft charcoal-tinted shadows: **shadow-1** on primary buttons and the routes panel, **shadow-2** on hover and the booking form. The report preview pages carry a deeper shadow; glow belongs only to moving signals.

## Shapes

Three radii: controls 6px, inputs and inset panels 10px, panels 14px; tier and tag labels are full pills. Hairline 1px borders throughout; dashed borders mean "inside your walls" or "no AI" (local route fence, no-model tier, sample label). Dots (6–11px circles) mark list items and timeline steps.

## Components

### Buttons
- **Primary:** cobalt, white bold text, 44px (52px large, 40px in the nav). Hover deepens and lifts to shadow-2; press moves 1px down.
- **Secondary:** paper with a line-strong outline; hover turns the outline charcoal.
- **Link button:** bold charcoal text, turns cobalt and underlines on hover.

### Inputs / Fields
Paper-2 fill, line-strong border. Focus and a sent form both show a cobalt border with a 3px cobalt-tint halo.

### Navigation
Sticky white bar, 64px, hairline bottom. The logo lockup is the inline `#seafin-logo` symbol: ink paths follow `currentColor`, the triangle and ".ai" stay cobalt. Links are 0.9375rem ink-500, darkening on hover; one primary button sits at the right.

### Report preview
A charcoal cover over a white inside page, sized in container-query units so they scale as one object. Hover nudges the pages apart.

### Flow diagram
On the dark section: numbered steps on a vertical rail, each tagged with a pill (cobalt for the top model, dashed for no model, white for a person).

### Route diagrams
Three routes in one panel: outline icons joined by dashed cobalt wires; the local route is fenced by a dashed cobalt border.

### News panel
Four dated releases in a ruled row inside the dark section, linking to whats-new.html.

### Report document
An 860px page with a dashed sample label, label/value meta rows, a two-column contents list, a key-figures strip, process maps (numbered rail, red stalls), inline SVG charts on the page tokens, today-vs-after tables, tier tags, and a 90-day gantt with a diamond decision gate. Wide tables stack into labelled blocks under 560px.

### Motion
One idea in three places: a signal travels a line and lights what it reaches (the flow token, the wire dots, the report bars). The finished state is the default; `motion.js` runs only when an inline script has added `.js-motion` (skipped under reduced motion), animates only while on screen and while the tab is visible, and `prefers-reduced-motion` removes all transitions.

## Do's and Don'ts

### Do:
- **Do** draw lists as ruled rows: charcoal top rule, hairline dividers.
- **Do** keep cobalt for actions, prices, dates, markers and lit states.
- **Do** make every diagram read correctly with no script and no motion.
- **Do** use editorial still-life photos per `.impeccable/art/prompts.md`: soft daylight, warm neutrals, one or two charcoal or cobalt props, no people, logos, readable text or sci-fi glow.

### Don't:
- **Don't** add a second accent colour or recolour the logo's cobalt.
- **Don't** add a second dark section, or darken the hero in dark mode.
- **Don't** put each list item in its own shadowed card; lists are ruled rows, inside one shared panel at most.

### Content rules in force
- Plain language for small-business owners; no vendor jargon on the homepage.
- No invented client results on the homepage.
- The sample report is always labelled as a sample with a fictional firm and illustrative numbers.
