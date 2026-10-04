---
name: Seafin
description: Seafin's site on the Wardix "Vigilant Infrastructure" system; calm, operational, premium through restraint.
colors:
  indigo: "#1a227e"
  indigo-deep: "#0f1556"
  indigo-tint: "#e8eaf5"
  teal: "#0076a3"
  teal-deep: "#005682"
  teal-soft: "#38b3da"
  teal-tint: "#e1f4f9"
  bastion: "#071426"
  ink-900: "#1a1f2a"
  ink-700: "#2d3748"
  ink-500: "#4a5568"
  line: "#e2e6ec"
  line-soft: "#eef0f4"
  line-strong: "#cbd2dc"
  bg: "#f5f6f9"
  paper: "#ffffff"
  paper-2: "#fbfcfe"
  danger: "#b50909"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.5rem, 4.7vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.875rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Public Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Public Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "tnum"
  lede:
    fontFamily: "Public Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.06em"
  button:
    fontFamily: "Public Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
    lineHeight: 1
  field-label:
    fontFamily: "Public Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.3
rounded:
  control: "6px"
  input: "10px"
  panel: "14px"
  media: "26px"
spacing:
  gutter: "clamp(16px, 4vw, 32px)"
  section: "clamp(64px, 8vw, 112px)"
  panel-pad: "28px"
  form-gap: "16px"
  row-gap: "24px"
components:
  button-primary:
    backgroundColor: "{colors.indigo}"
    textColor: "#ffffff"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-900}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  input:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.input}"
    padding: "11px 13px"
    height: "46px"
  form-panel:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.panel}"
    padding: "clamp(22px, 2.4vw, 32px)"
  panel:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-pad}"
  media-frame:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.media}"
    padding: "clamp(10px, 1.2vw, 16px)"
  nav:
    backgroundColor: "{colors.paper}"
    height: "64px"
  closing-band:
    backgroundColor: "{colors.bastion}"
    textColor: "#e9ecf6"
---

# Design System: Seafin

## Overview

**Creative North Star: "Vigilant Infrastructure" (inherited)**

Seafin does not have its own visual world. By the user's standing pin (PRODUCT.md, Brand Commitments), Seafin's site uses the Wardix design system: `tracelet` repo `design.md` on `origin/dev` ("Vigilant Infrastructure") for doctrine, and `tracelet-vendor/pages/css/tracelet-landing.css` for token values. This file records how that system landed on Seafin, and where Seafin departs from the Wardix marketing site. When this file is silent, the upstream `design.md` governs; when they disagree, this file records what Seafin shipped.

The page should look like it comes from the same company as Wardix: a light cool canvas, white panels with hairline borders and quiet indigo-tinted shadows, serif page headings, sans everything else, and one gradient button. Restraint carries the premium feel. Density is moderate: generous section spacing around compact, scannable content (ruled lists, fact rows, a single form).

Seafin departs from the Wardix marketing site in four places, each on purpose. There are no mono labels above headings, because Impeccable's craft floor bans them. There is no scenic hero photograph: the Wardix landscape library would make Seafin read as a copy of the Wardix site, so Seafin's only imagery is the real Wardix product screenshot, shown as proof. Resting panels use the light and medium shadows only; the strong shadow is kept for overlays, as upstream `design.md` says. And the gradient is narrowed to the single primary action.

**Key Characteristics:**
- Light canvas, white panels, hairline borders, cool indigo-tinted shadows; dark mode from the same token pairs.
- Source Serif 4 for page-level headings, Public Sans for everything readable, Geist Mono only for short functional labels.
- One radius family: 6 / 10 / 14 / 26.
- One action per page, one label for it, one gradient on it.
- Real product screenshots are the only imagery; no scenic photography, no invented proof.

## Colors

Neutral cool surfaces with one control color (indigo), one accent (teal), and a deep navy reserved for the closing band.

### Primary
- **Primary Indigo** (`indigo`): the control and brand color. Starts the brand gradient, sets `theme-color` and the text-selection background. Never used as a flat page fill.
- **Deep Indigo** (`indigo-deep`) and **Indigo Tint** (`indigo-tint`): carried from the Wardix token set. Deep Indigo is the tint source for every shadow.

### Secondary
- **Signal Teal** (`teal`): links, focus outlines, input focus borders, caret, the duration tags under service titles, the dot separators in the product facts, and the sent-state border on the form panel. In dark mode it becomes Soft Teal (#38b3da) so it stays legible on navy; upstream Wardix does not make this swap.
- **Deep Teal** (`teal-deep`): link hover in light mode.
- **Soft Teal** (`teal-soft`): ends the brand gradient; focus outline color inside the closing band.
- **Teal Tint** (`teal-tint`): the 3px focus halo around inputs and the sent-state halo around the form panel. Dark pair #0c2c3a.

### Tertiary
- **Bastion Navy** (`bastion`): the closing band only. It is the one dark field on a light page and the same in both modes.

### Neutral
- **Ink 900 / 700 / 500** (`ink-900`, `ink-700`, `ink-500`): headings and primary text / fact values, field labels and about text / secondary text, ledes, nav links. Dark pairs #e9ecf6 / #cdd3e6 / #9aa3c0.
- **Canvas** (`bg`): page background. Dark pair #0b0e1a.
- **Paper** (`paper`) and **Paper 2** (`paper-2`): panels and buttons / input fills. Dark pairs #121732 / #0f1430.
- **Line** (`line`): panel borders, section dividers, fact-row rules. Dark #262c44.
- **Line Soft** (`line-soft`): dividers inside a panel (between service rows, between compare columns). Dark #1e2438.
- **Line Strong** (`line-strong`): hover border on inputs and secondary buttons. Seafin's addition, not in the upstream token set. Dark #3a4466.
- **Danger** (`danger`): form error text only. Dark #ff8a80. Seafin's name for upstream's critical red.

### Named Rules
**The One Gradient Rule.** The indigo-to-teal gradient appears only on the primary action, "Request a free call" (nav, form submit, closing band). Not on text, cards, section backgrounds, or a second button. Upstream allows it on hero treatments and thin accents; Seafin does not use it there. The favicon tile is the only non-button use.

**The Status-Means-State Rule.** Green, gold and red mean real system state. Seafin uses only red, and only for a failed form send.

## Typography

**Display Font:** Source Serif 4 (with Georgia, serif)
**Body Font:** Public Sans (with Helvetica Neue, Helvetica, Arial, sans-serif)
**Label/Mono Font:** Geist Mono (with ui-monospace, SF Mono, Menlo, Consolas, monospace)

All three are self-hosted WOFF2 files in `seafin-site/fonts`, using `font-display: swap`. Public Sans and Source Serif 4 are preloaded.

**Character:** an editorial serif for the page's few big statements, over a plain, sturdy civic sans that does all the reading. Tabular numerals are on across the whole body.

### Hierarchy
- **Display** (600, clamp(2.5rem, 4.7vw, 4rem), 1.06, -0.02em): the hero H1 only. Balanced wrap, max 20ch. Drops to 2rem / 1.1 at ≤480px.
- **Headline** (600, clamp(1.875rem, 3vw, 2.5rem), 1.12, -0.015em): section H2s and the closing-band H2.
- **Title** (Public Sans 700, 1.1875rem, 1.3): H3s in service rows, the compare panel, and the founder name. The form panel heading is the same family at 1.3125rem / 1.25 with -0.01em tracking; project names use 1.0625rem / 1.4.
- **Lede** (400, 1.25rem, 1.5, ink-500, max 44ch): the hero sentence. The product line under the Wardix heading is a smaller version (1.1875rem, max 40ch).
- **Body** (400, 1.0625rem, 1.6): running text. Measure is 54 to 60ch.
- **Label** (Geist Mono 600, 0.75rem, 0.06em, uppercase): fact-row terms ("Runs on", "Built by", "You own") and the duration tags under service titles.
- **Field label** (Public Sans 600, 0.875rem, 1.3, ink-700): form labels; "Optional" drops to weight 400, ink-500.

### Named Rules
**The Serif-Is-For-The-Page Rule.** Serif is for page-level headings: the H1 and section H2s. Panel and card titles, including the form panel heading, are Public Sans bold.

**The Mono-Labels-Below Rule.** Geist Mono uppercase labels are short and functional: definition-list terms, and duration tags placed beneath their title. A mono label never sits above a heading.

## Layout

Single column centered at 1180px max width with a gutter of clamp(16px, 4vw, 32px). Sections pad clamp(64px, 8vw, 112px) top and bottom and are separated by a 1px line. The hero pads a little less (clamp(40px, 6vw, 88px) top, clamp(56px, 7vw, 104px) bottom).

The hero is an asymmetric split, 1.35fr / 1fr (about 57/43): the heading, lede and fact list on the left; the working form panel on the right as the one action. The sections below deliberately change shape instead of repeating one template:
1. A heading stacked over a full-width panel (Services).
2. A heading beside its content, 1fr / 1.6fr (Where it runs).
3. A two-column heading/facts row over a full-width product screenshot (Wardix).
4. A two-column split of equal peers (Who you work with + Other projects).
5. A full-bleed bastion band with the heading and actions on one line (closing).

Breakpoints: at ≤960px every two-column grid collapses to one column. At ≤760px nav links hide, the compare panel stacks, and list rows go single-column with 20px side padding. At ≤560px the product screenshot swaps to a mobile crop and the fact dots drop. At ≤480px the hero type steps down, fact rows stack, and closing-band buttons go full width.

## Elevation & Depth

A hybrid: hairline borders do the separating, and quiet indigo-tinted shadows (rgba of Deep Indigo) add a little lift. In dark mode, borders and surface contrast carry depth; the shadows become neutral black and stronger.

### Shadow Vocabulary
- **Resting** (`box-shadow: 0 1px 2px rgba(15, 21, 86, 0.06), 0 1px 3px rgba(15, 21, 86, 0.04)`): content panels and buttons at rest.
- **Raised** (`box-shadow: 0 4px 12px rgba(15, 21, 86, 0.08), 0 2px 4px rgba(15, 21, 86, 0.04)`): the form panel, the screenshot frame, and button hover. Dark: `0 4px 14px rgba(0, 0, 0, 0.4)`.
- **Overlay** (`box-shadow: 0 14px 32px rgba(15, 21, 86, 0.1), 0 4px 12px rgba(15, 21, 86, 0.05)`): defined but unused on this page. Kept for menus and dialogs.

### Named Rules
**The Quiet Elevation Rule.** Resting surfaces never use the Overlay shadow. Only the action panel and the product image use Raised at rest.

## Shapes

One radius family, matching upstream: 6px for buttons and small controls, 10px for inputs, 14px for panels, 26px for the large media frame. An image inside the media frame uses 26px minus the frame padding (14px), so the corners stay concentric. No pills: the only round shape is the 4px dot between product facts. Borders are always 1px; lines inside a panel use Line Soft, outer lines use Line.

## Components

### Buttons
- **Shape:** gently rounded (6px), min height 44px (40px in the nav, 48px full-width in the form), padding 0 20px, Public Sans 700 at 0.9375rem.
- **Primary:** brand gradient (`linear-gradient(100deg, indigo 0%, teal 62%, teal-soft 100%)`; dark: #2b35a8 / #0a85b6 / #38b3da; the frontmatter records indigo as its solid fallback), white text, Resting shadow. One label everywhere: "Request a free call".
- **Hover / Focus:** hover brightens (`filter: brightness(1.08)`) and lifts to Raised; press shifts down 1px and dims slightly (0.96). Transitions are 160ms ease-out. Focus is the global 2px teal outline, offset 3px. While sending, the button is desaturated and the label reads "Sending…".
- **Secondary:** paper fill, ink-900 text, Line border, Resting shadow; on hover the border goes Line Strong and the shadow Raised. Used for the outbound "Get Wardix free" link.

### Inputs / Fields
- **Style:** Paper 2 fill, 1px Line border, 10px radius, padding 11px 13px, min height 46px (textarea 84px, resizes vertically). Labels sit above the field, 6px apart.
- **Focus:** the border turns teal and a 3px Teal Tint halo appears; no outline. Hover sets the border to Line Strong. 140ms ease-out.
- **Error:** one line of Danger-colored status text below the button, with a mailto fallback.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** Paper, with a 1px Line border.
- **Shadow Strategy:** Resting (see Elevation).
- **Internal Padding:** 28px horizontal (20px at ≤760px), 26 to 28px vertical.
- **Ruled list, not a card grid:** related items (services) sit as rows in one panel, divided by Line Soft. They are never split into separate cards. Each row puts the title and duration tag beside the description (13rem / 1fr). A two-option comparison is one panel with a vertical Line Soft divider and a full-width footer row.

### Navigation
- Sticky, 64px tall, Paper at 94% with a 10px backdrop blur and a bottom Line border. Serif wordmark "Seafin" (700, 1.375rem, -0.02em). Links are Public Sans 500 0.9375rem in ink-500 and turn ink-900 on hover. The primary button sits at the right.
- On this one-page build, links hide at ≤760px with no menu replacement. The primary button stays in the header.

### Form Panel (signature)
The one action, in the first viewport. A white 14px panel with a Raised shadow, padded clamp(22px, 2.4vw, 32px). It holds a sans title, a one-line subhead, three labelled fields (one optional), a full-width primary button, and an `aria-live` status line. On a successful send, the fields disable, the button hides, the panel border warms to teal with a 3px Teal Tint halo (400ms ease-out), and the confirmation fades up 4px (420ms, cubic-bezier(0.16, 1, 0.3, 1)). Every "Request a free call" link scrolls to this panel and focuses the first field. Nothing else on the page animates beyond hover and focus. All motion turns off under prefers-reduced-motion.

### Fact Rows
A definition list ruled top and bottom with Line. Each row has a 6.5rem mono label column and an ink-700 value; rows stack at ≤480px.

### Product Facts
Short facts set inline in Public Sans 600 and separated by 4px teal dots. These are not chips or pills. They stack and lose the dots at ≤560px.

### Media Frame
A real product screenshot in a Paper frame: 26px radius, 1px Line border, Raised shadow, and clamp(10px, 1.2vw, 16px) of padding around a 14px-radius image. Below 560px it switches to a separate mobile crop via `<picture>`. Every shipped raster carries embedded provenance.

### Closing Band
Full-bleed Bastion Navy, with a white serif headline beside the primary button and a mail link in pale cyan (#9fd8ec, white on hover). Text and focus colors are set locally, so the band looks the same in both modes.

## Do's and Don'ts

### Do:
- **Do** take every token from the Wardix set (upstream `design.md` + `tracelet-landing.css`) and add a Seafin-local token only when the build needs it (as with `line-strong`, `danger`).
- **Do** reserve the brand gradient for the single primary action, and use the same label ("Request a free call") everywhere it appears.
- **Do** use Source Serif 4 for page-level headings only, and Public Sans 700 for panel, card and list titles.
- **Do** use Geist Mono uppercase (0.75rem, 0.06em) only for short functional labels: definition-list terms and duration tags under a title.
- **Do** group related items as ruled rows inside one 14px panel rather than a grid of cards.
- **Do** change the section shape from one section to the next (stacked, side-by-side, full-width proof, duo, band) rather than repeating one template.
- **Do** use real Wardix product screenshots as the imagery, in the 26px media frame, with light and dark captures of the current UI.
- **Do** keep every color a light/dark token pair; check link and hover colors in both modes.

### Don't:
- **Don't** place an uppercase mono label, kicker or eyebrow above a heading (the Wardix marketing site's `.eyebrow` pattern is not carried over).
- **Don't** use the Wardix scenic hero photographs or any other scenic photography on Seafin pages.
- **Don't** use the Overlay shadow on resting panels.
- **Don't** add prose explaining the page to the visitor, section intros, decorative bold, or decorative numbers.
- **Don't** show invented proof: no hypothetical case studies, logos, testimonials or counts.
- **Don't** stand in initials or a monogram badge for the founder photo; leave the photo out until a real one exists.
- **Don't** use pills, mixed radii, or sharp cards; one radius family per surface.
