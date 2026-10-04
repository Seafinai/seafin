---
name: Seafin
description: Seafin's consulting site on the Wardix "Vigilant Infrastructure" system; calm, operational, premium through restraint.
colors:
  indigo: "#1a227e"
  indigo-deep: "#0f1556"
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
    fontSize: "clamp(2.75rem, 6.6vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.875rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  index:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.625rem, 2.4vw, 2.125rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Public Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 700
    lineHeight: 1.3
  body-large:
    fontFamily: "Public Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Public Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "tnum"
  lede:
    fontFamily: "Public Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.1875rem"
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
  highlight: "4px"
  control: "6px"
  input: "10px"
  panel: "14px"
  media: "26px"
spacing:
  gutter: "clamp(16px, 4vw, 32px)"
  section: "clamp(56px, 7vw, 96px)"
  panel-pad: "28px"
  form-gap: "12px"
  row-pad: "24px"
components:
  button-primary:
    backgroundColor: "{colors.indigo}"
    textColor: "#ffffff"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  button-primary-large:
    backgroundColor: "{colors.indigo}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
    padding: "0 28px"
    height: "54px"
  input:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.input}"
    padding: "11px 13px"
    height: "46px"
  hero:
    backgroundColor: "{colors.indigo-deep}"
    textColor: "#e9ecf6"
    padding: "clamp(48px, 6vw, 96px) 0 clamp(48px, 6vw, 88px)"
  form-panel:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.panel}"
    padding: "clamp(20px, 2.2vw, 28px)"
  demo-stage:
    backgroundColor: "{colors.indigo-deep}"
    rounded: "{rounded.media}"
    padding: "16px"
    height: "486px"
  demo-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.input}"
  demo-chip:
    backgroundColor: "{colors.teal}"
    textColor: "#ffffff"
    rounded: "{rounded.highlight}"
    padding: "0 4px"
    height: "1.5rem"
  index-row:
    typography: "{typography.index}"
    padding: "{spacing.row-pad} 0"
  case-row:
    typography: "{typography.body}"
    padding: "18px 0 20px"
  panel:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-pad}"
  diagram:
    backgroundColor: "{colors.paper-2}"
    rounded: "{rounded.input}"
    padding: "26px 20px 20px"
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

The page is built on the Metalab model (chosen 2026-10-04 after a study of leading design studios): the opening is one big serif statement and one crafted object on the Wardix dark field (deep indigo under the fading engineering grid and a soft teal glow), with nothing else on the first screen. Below it the page runs white with hairline rules, one Canvas band and a Bastion close: the form in its own section, the practice index, a played demo of real-world builds, and where the work runs. Serif headings, sans everything else, one gradient button. Restraint carries the premium feel; the two crafted pieces (the opening object and the build demo) carry the craft. It reads as a consulting practice's page, not a person's or a product's.

Seafin departs from the Wardix marketing site in four places, each on purpose. There are no mono labels above headings, because Impeccable's craft floor bans them. There is no photography or raster imagery: no scenic hero (it would make Seafin read as a copy of the Wardix site), no founder portrait, no product screenshot. The pictures are made, not shot: one rendered 3D object in the opening, the demo's mock app cards (four scenes modelled on published small-business cases), and drawn teal route diagrams. The brand gradient is narrowed to the single primary action. And only two things move on their own, each in its own section.

**Key Characteristics:**
- A deep indigo opening holding one serif statement and one glossy 3D object, then a white page with one Canvas band and a Bastion close; dark mode from the same token pairs, with light surfaces pinned light.
- Source Serif 4 for the statement, the section headings and the service names; Public Sans for everything readable; Geist Mono only for short functional tags.
- One radius family: 6 / 10 / 14 / 26, plus 4px for inline highlights.
- One action per page, one label for it, one gradient on it.
- Two self-moving pieces (the opening object, the build demo), everything else still; no photography; no invented proof.

## Colors

Neutral cool surfaces with one control color (indigo), one accent (teal), and two dark grounds: Deep Indigo for the opening and the demo stage, Bastion Navy to close.

### Primary
- **Primary Indigo** (`indigo`): the control and brand color. Starts the brand gradient, sets `theme-color` and the text-selection background. Never used as a flat page fill.
- **Deep Indigo** (`indigo-deep`): the middle stop of the opening's radial field (#19207a at the light point, #080c33 at the edge) and of the demo stage's (#1d2590 to #0a0f40); the tint source for every light-mode shadow. The opening keeps the same field in both modes. Indigo Tint (#e8eaf5) is still declared from the Wardix set but unused here.

### Secondary
- **Signal Teal** (`teal`): links, focus outlines, input focus borders, caret, duration tags, diagram icons, the dashed boundary and its label, the sent-state border on the form panel; in the demo, the chips, the status dot, the playing case's input line and its 2px progress line. In dark mode it becomes Soft Teal (#38b3da) so it stays legible on navy; upstream Wardix does not make this swap.
- **Deep Teal** (`teal-deep`): link hover and the text of a lit demo mark. In dark mode it lightens to #8fd6ee, so hover always moves away from the background.
- **Soft Teal** (`teal-soft`): ends the brand gradient; the route-diagram wires; the opening object's teal rim light; focus outline color on the dark grounds.
- **Teal Tint** (`teal-tint`): the 3px focus halo around inputs, the sent-state halo around the form panel, and the highlight behind a lit demo mark or a freshly filled demo field. Dark pair #0c2c3a.

### Tertiary
- **Bastion Navy** (`bastion`): the closing band only, the same in both modes.

### Neutral
- **Ink 900 / 700 / 500** (`ink-900`, `ink-700`, `ink-500`): headings, primary text, demo app-bar names, the playing case's result line and the practice-index top rule / field labels, diagram node labels, demo card body text, resting case results, the "which one fits" line and the footer maker name / descriptions, case input lines, the call sub-line, demo field keys, nav and footer links. Dark pairs #e9ecf6 / #cdd3e6 / #9aa3c0.
- **Paper** (`paper`): the page background, the form panel, the demo's app cards, the routes panel, nav (at 94%). Dark pair #121732.
- **Paper 2** (`paper-2`): input fills, diagram wells and the document and table-header insets in a demo card. Dark pair #0f1430.
- **Canvas** (`bg`): the "Where it runs" band only. Dark pair #0b0e1a.
- **Line** (`line`): panel and card borders, practice-index and case row rules, section dividers, nav bottom border. Dark #262c44.
- **Line Soft** (`line-soft`): dividers inside a panel or card, diagram well borders. Dark #1e2438.
- **Line Strong** (`line-strong`): input borders (hover mixes in 45% Ink 500); the idle demo status dot. Seafin's addition, not in the upstream token set. Dark #3a4466.
- **Danger** (`danger`): form error text only. Dark #ff8a80. Seafin's name for upstream's critical red.
- **Pinned light surfaces:** the form panel, the demo's app cards and its chips keep the light values of every token above in both modes, so they read as white objects on dark grounds and on the dark-mode page.
- **Dark-ground local colors:** white for the H1, #b9c4de for the lede and the demo's step label, white at 28% for the demo relay line, white at 4.5% to 5.5% for grid lines. The opening object's second rim light is violet (#7d86ff), a light color only, never a fill.

### Named Rules
**The One Gradient Rule.** The indigo-to-teal brand gradient appears only on "Request a free call" buttons (nav, opening, form submit, closing band) and on the favicon tile. Not on text, cards, section backgrounds, or a second button. The tonal indigo radials behind the opening and the demo stage, their grid lines and the teal glow are fields, not the brand gradient, and appear nowhere else.

**The Dark Grounds Rule.** Deep Indigo is for the opening field and the demo stage; Bastion Navy is for the closing band. They never swap, and no other surface goes dark.

**The Status-Means-State Rule.** Green, gold and red mean real system state. Seafin uses only red, and only for a failed form send. The demo's status dot is teal, never green.

## Typography

**Display Font:** Source Serif 4 (with Georgia, serif)
**Body Font:** Public Sans (with Helvetica Neue, Helvetica, Arial, sans-serif)
**Label/Mono Font:** Geist Mono (with ui-monospace, SF Mono, Menlo, Consolas, monospace)

All three are self-hosted WOFF2 files in `seafin-site/fonts`, using `font-display: swap`. Public Sans and Source Serif 4 are preloaded.

**Character:** an editorial serif for the page's statements and the names of what Seafin sells, over a plain, sturdy civic sans that does all the reading. Tabular numerals are on across the whole body.

### Hierarchy
- **Display** (500, clamp(2.75rem, 6.6vw, 6rem), 0.98, -0.03em, white, max 11.5em): the opening statement only. The closing phrase ("without the headcount.") is held on one line above 480px; at ≤480px the statement is 2.625rem / 1.02 and wraps freely.
- **Headline** (600, clamp(1.875rem, 3vw, 2.5rem), 1.12, -0.015em): section H2s, including the call section's "Free 30-minute call", and the closing-band H2.
- **Index** (600, clamp(1.625rem, 2.4vw, 2.125rem), 1.15, -0.015em): service names in the practice index.
- **Title** (Public Sans 700, 1.1875rem, 1.3): route H3s in the routes panel.
- **Lede** (400, 1.1875rem, 1.5, #b9c4de, max 38ch): the opening sentence.
- **Body Large** (400, 1.125rem): the call section's sub-line (ink-500, max 34ch).
- **Body** (400, 1.0625rem, 1.6): running text. Descriptions cap at 52 to 60ch. Case rows: the input line at 0.9375rem, the result line at 600 1.0625rem / 1.4.
- **Label** (Geist Mono 600, 0.75rem, 0.06em, uppercase, teal): duration tags in the practice index. The diagram boundary label uses the same face at 0.6875rem. Nothing inside the demo is mono.
- **Field label** (Public Sans 600, 0.875rem, 1.3, ink-700): form labels and diagram node labels.
- **Demo scale:** inside the demo cards text runs smaller to read as software, all in Public Sans: app-bar names 600 0.8125rem (meta 400 ink-500), 0.875rem body, field values and chips (one fixed 1.5rem line), 0.8125rem documents and tables, 0.75rem field keys and table headers (body, values and chips one step smaller at ≤480px).

### Named Rules
**The Serif-Is-For-The-Page Rule.** Serif is for the opening statement, section H2s, the closing H2 and the service names in the practice index, which act as the headings of what Seafin sells. Panel titles and everything inside the demo are Public Sans.

**The Mono-Tags-Never-Lead Rule.** Geist Mono uppercase labels are short and functional: duration tags set beside their title (desktop) or beneath it (≤960px), and the one label that names a drawn boundary in a diagram. A mono label never sits above a heading, never leads a row, and never stands in for interface chrome.

## Layout

Single column centered at 1180px max width with a gutter of clamp(16px, 4vw, 32px). Sections pad clamp(56px, 7vw, 96px) top and bottom and are separated by a 1px Line rule.

The opening fills the first screen: at least 560px, at most 880px, otherwise the viewport less the 64px nav. Its content is anchored to the bottom (padding clamp(48px, 6vw, 96px) top, clamp(48px, 6vw, 88px) bottom): the statement, then clamp(28px, 3vw, 40px) below it one row with the lede on the left and the large primary button on the right, wrapping when narrow. The 3D object fills the field behind the text, framed large and partly cropped to the right of the statement on wide screens (≥900px canvas) and above it on narrow ones.

The sections change shape instead of repeating one template:
1. The call: heading and sub-line on the left, the form panel on the right (1fr / 1.2fr, vertically centered).
2. The practice index: open ruled rows, three columns (16rem / 13.5rem / 1fr) of name, duration tag and description, after clamp(48px, 6vw, 80px) and opened by a 1px ink-900 rule; its section heading is visually hidden (Services). The pattern was borrowed from Accenture's and Capgemini's practice pages (chosen 2026-10-04).
3. A heading over a split: the four cases as a ruled list on the left, the demo stage on the right (1fr / 1.15fr, vertically centered) (What a build looks like).
4. A Canvas band with a heading over one two-route panel and a single line beneath it (Where it runs).
5. A full-bleed Bastion band with the heading and actions on one line (closing).
6. A one-line footer: maker name left, mail and legal links right.

Breakpoints: at ≤960px the call and build splits collapse to one column (the demo capped at 600px wide) and index rows stack (name, tag, description). At ≤760px nav links hide, the two form fields stack, and the routes panel stacks. At ≤480px the statement steps down and wraps, the opening button and closing-band buttons go full width, and the demo's padding and type tighten.

## Elevation & Depth

A hybrid that leans flat: hairline borders, rules and the dark grounds do the separating. One quiet indigo-tinted shadow gives the routes panel and buttons a little lift; the form panel, as the page's one action, rests on Raised. On the dark demo stage, the white app cards float on a dark navy shadow. In dark mode, Raised and Overlay become neutral black and stronger, while Resting keeps its light indigo tint. The opening object's depth is its own lighting (clearcoat highlights and rim light), not a CSS shadow.

### Shadow Vocabulary
- **Resting** (`box-shadow: 0 1px 2px rgba(15, 21, 86, 0.06), 0 1px 3px rgba(15, 21, 86, 0.04)`): the routes panel and primary buttons at rest.
- **Raised** (`box-shadow: 0 4px 12px rgba(15, 21, 86, 0.08), 0 2px 4px rgba(15, 21, 86, 0.04)`): the form panel at rest, button hover, and under the form panel's sent-state halo. Dark: `0 4px 14px rgba(0, 0, 0, 0.4)`.
- **Card on Stage** (`box-shadow: 0 10px 30px rgba(3, 6, 30, 0.35)`): the demo's app cards, on the dark stage only.
- **Chip** (`box-shadow: 0 2px 6px rgba(3, 6, 30, 0.18)`): a demo chip in transit.
- **Overlay** (`box-shadow: 0 14px 32px rgba(15, 21, 86, 0.1), 0 4px 12px rgba(15, 21, 86, 0.05)`; dark `0 18px 40px rgba(0, 0, 0, 0.5)`): kept for menus and dialogs.

### Named Rules
**The Quiet Elevation Rule.** Nothing at rest sits above Resting except the form panel (the one action) and the demo stage (the one showcase), which rest on Raised. Overlay is for overlays. The deep Card on Stage shadow exists only on a dark ground, where a light shadow would vanish.

## Shapes

One radius family from upstream: 6px for buttons and the documents and tables inside demo cards, 10px for inputs, diagram wells and demo app cards, 14px for the form panel and the routes panel, 26px (upstream's media radius) for the demo stage. Below the family, 4px rounds inline highlights: lit demo marks, chips, filled demo fields and the focus ring. The practice index and the case list have no corners at all: they are rules, not containers. No pills, no icon tiles; the only round shape is the 8px demo status dot. Borders and rules are 1px; lines inside a panel use Line Soft, outer lines use Line. Marked exceptions: the ink-900 rule that opens the practice index, the 2px teal progress line under the playing case, and the 1.5px dashed teal boundary around the self-hosted diagram. Icons are open line strokes (1.5, round caps and joins) in teal, never filled.

## Components

### Buttons
- **Shape:** gently rounded (6px), min height 44px, padding 0 20px, Public Sans 700 at 0.9375rem. Sizes: 40px with 16px padding in the nav; 48px full-width at 1rem in the form panel; large, 54px with 28px padding at 1.0625rem, in the opening (full width at ≤480px).
- **Primary:** brand gradient (`linear-gradient(100deg, indigo 0%, teal 62%, teal-soft 100%)`; dark: #2b35a8 / #0a85b6 / #38b3da; the frontmatter records indigo as its solid fallback), white text, Resting shadow. One label everywhere: "Request a free call".
- **Hover / Focus:** hover brightens (`filter: brightness(1.08)`) and lifts to Raised; press shifts down 1px and dims slightly (0.96). Transitions are 160ms ease-out. Focus is the global 2px teal outline, offset 3px (Soft Teal on the dark grounds). While sending, the button is desaturated and the label reads "Sending…".
- **Secondary:** none.

### Inputs / Fields
- **Style:** Paper 2 fill, 1px Line Strong border, 10px radius, padding 11px 13px, min height 46px. Labels sit above the field, 6px apart.
- **Hover / Focus:** hover darkens the border (Line Strong mixed 55/45 with Ink 500). Focus turns the border teal with a 3px Teal Tint halo; no outline. 140ms ease-out.
- **Error:** one line of Danger-colored status text across the full width of the form, with a mailto fallback.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** Paper, with a 1px Line border.
- **Shadow Strategy:** Resting (see Elevation).
- **Internal Padding:** 28px (22px 20px at ≤760px).
- **One panel per comparison:** a two-option comparison is one panel split by a vertical Line Soft divider. Related items are never split into separate cards.

### Navigation
- Sticky, 64px tall, Paper at 94% with a 10px backdrop blur and a bottom Line border, sitting over the dark opening. Serif wordmark "Seafin" (700, 1.375rem, -0.02em). Three links (Services, What we build, Where it runs) in Public Sans 500 0.9375rem ink-500, turning ink-900 on hover. The primary button sits at the right.
- On this one-page build, links hide at ≤760px with no menu replacement. The primary button stays in the header.

### Opening (signature)
One statement, one line of lede, one large button, one object. The field is a radial deep indigo (#19207a at 75% / 40% through Deep Indigo to #080c33), with the Wardix engineering grid (1px white lines at 5.5% on a 54px square, radially masked from the top right) and a blurred teal glow (Signal Teal at 35%) at the bottom right. Field, grid and glow are the same in both modes and appear only here.

### Opening Object (signature)
One crafted WebGL object behind the statement, rendered by `hero3d.js` with three.js 0.170 (loaded from jsDelivr through an import map): an abstract ribbon ring with a stadium-shaped section (wide, thin, fully rounded edges) and one full twist per lap. Its finish is a glossy near-black indigo (#151b6e, metalness 0.55, roughness 0.17, mirror clearcoat) lit by a teal rim (#38b3da), a violet rim (#7d86ff) and a faint white key, under ACES tone mapping and a studio environment; the light, not the color, draws the form. It turns slowly about its own axis so the twist carries the highlights round the loop, inside a slow lean and float that never shows it edge-on, and tilts a few degrees toward the pointer (eased at 5% per frame). It fades in over 900ms on its first frame, pauses when off screen or in a hidden tab, renders one still pose under reduced motion, and if WebGL or the module fails the indigo field simply stays. There is one object per page.

### Call Section and Form Panel
The form lives in its own section straight after the opening: the serif heading and a Body Large ink-500 sub-line on the left, the form panel on the right. The panel is Paper with a 1px Line border, 14px radius, padded clamp(20px, 2.2vw, 28px), resting on Raised, its tokens pinned light in both modes. Name and work email sit side by side (14px gap, stacking at ≤760px) over a full-width 48px primary button; an `aria-live` status line spans beneath. On a successful send, the fields disable, the button hides, the border warms to teal with a 3px Teal Tint halo plus Raised (400ms ease-out), and the confirmation fades up 4px (420ms, cubic-bezier(0.16, 1, 0.3, 1)). Every "Request a free call" link scrolls to the panel and focuses the first field.

### The Build, Played (signature)
"What a build looks like" plays four builds, each modelled on a published small-business case: a supplier invoice becomes a QuickBooks bill, a carrier invoice is checked against the contract rate, a faxed referral becomes a patient and an order, a recorded intake call becomes a case summary.
- **Case list:** the four cases are the demo's controls, a ruled list of buttons under a Line top rule with a Line rule under each (18px top, 20px bottom). Each shows the input line (0.9375rem, ink-500) over the result line (600 1.0625rem, ink-700, ink-900 on hover). The playing case turns its input line teal and its result ink-900, and a 2px teal line grows along its bottom edge over the scene's 7.6s. Clicking a case jumps to it.
- **Stage:** a solid dark panel 486px tall (470px and 12px padding at ≤480px), 26px radius, 16px padding: a radial indigo field (#1d2590 through Deep Indigo to #0a0f40) under a 40px grid of white lines at 4.5%. Three rows: the source card, a 44px relay, the destination card.
- **App cards:** two fixed frames, Paper (pinned light), 1px Line border, 10px radius, Card on Stage shadow; they never leave the stage. A Line Soft app bar names the mock app in Public Sans 600 with its meta in 400 ink-500. The source body is a fixed 188px (180px at ≤480px) holding an email, document, carrier table, fax or transcript in 6px-radius insets. The destination holds a two-by-two field list (key in 0.75rem ink-500; value in 600 ink-900 on one fixed 1.5rem line with ellipsis, so nothing shifts when a value lands; an empty value is a short Line bar) and a status row with an 8px dot pinned to the bottom.
- **Relay:** a plain 1px hairline (white at 28%) beside a step label in Public Sans 500 0.8125rem #b9c4de that changes per step with a 280ms fade-up.
- **Rhythm (one for every scene):** the frames' contents cross-fade (out 200ms, in 360ms with a 40ms stagger); the source is read top to bottom over 1300ms and each mark lights Teal Tint / Deep Teal in turn (260ms ease-out); Signal Teal chips travel one at a time (280ms apart, 900ms each, cubic-bezier(0.45, 0, 0.2, 1)) on a shallow arc and settle exactly on the field's value line, which flashes Teal Tint as it fills (900ms); computed fields (an overcharge, a next step) then land in place without a chip; the status dot stops breathing and settles to teal with a halo; the record holds until the scene reaches 7.6s (at least 1.6s). Sequencing runs on timers, never on animation completion, so a throttled browser cannot stall the loop.
- **Restraint:** the loop pauses when less than 20% of the stage is on screen and when the browser tab is hidden. Under reduced motion, and without JS, the markup shows one composed still frame (the finished invoice scene); with reduced motion, cases swap still frames.
- **Sample data:** names, amounts and dates are illustrative, labelled "Example build" to assistive tech; the source businesses (listed in PRODUCT.md) are never named, quoted or presented as Seafin's clients.

### Practice Index (signature)
The three services as an open, ruled index: a 1px ink-900 rule on top, a 1px Line rule under each row, no panel, fill or shadow. Each row (24px top and bottom) sets the serif service name, the teal mono duration tag and the ink-500 description on one baseline across 16rem / 13.5rem / 1fr columns, 32px apart. At ≤960px each row stacks with the tag directly beneath the name.

### Route Diagram
Inside each half of the routes panel, above the route title: a Paper 2 well (10px radius, Line Soft border, padded 26px 20px 20px) holding two nodes joined by a static 2px dashed Soft Teal wire. Nodes are 36px teal line icons over a field-label caption, with no tile or fill behind them. The self-hosted route's well swaps its border for a 1.5px dashed teal boundary, named by a 0.6875rem mono label set into the top edge.

### Closing Band
Full-bleed Bastion Navy, padded clamp(56px, 7vw, 96px), with a white serif headline beside the primary button and a mail link in pale cyan (#9fd8ec, white on hover). Text and focus colors are set locally, so the band looks the same in both modes.

### Footer
One line under the band: "Seafin LLC" in ink-700 600 on the left, then the mail, Privacy and Terms links in ink-500 at 0.875rem, unadorned until hover (ink-900, underline).

### Motion
Two self-moving pieces, each in its own section: the opening object (slow, continuous, ambient) and the build demo (narrative, with the shared rhythm above). Everything else is still apart from state changes: the demo's breathing status dot, case color changes (200ms ease-out), the form's sent state, and hover and focus transitions (140 to 160ms ease-out). Entrances ease out on cubic-bezier(0.16, 1, 0.3, 1); outgoing content leaves faster than incoming content arrives; containers stay put and only their contents change. Both moving pieces pause off screen and in hidden tabs, and all motion turns off under prefers-reduced-motion, leaving composed still frames.

## Do's and Don'ts

### Do:
- **Do** take every token from the Wardix set (upstream `design.md` + `tracelet-landing.css`) and add a Seafin-local token only when the build needs it (as with `line-strong`, `danger`).
- **Do** reserve the brand gradient for "Request a free call" buttons, and use that same label everywhere the action appears.
- **Do** open with one serif statement, one lede line, one button and one crafted object on the deep indigo field with the 54px grid; nothing else on the first screen.
- **Do** use Source Serif 4 for the statement, section headings and practice-index service names only, and Public Sans for panel titles and everything inside a mock interface.
- **Do** use Geist Mono uppercase only for short functional tags beside or beneath their title, or to name a drawn boundary.
- **Do** give every looping animation a shared rhythm, keep its frames fixed so nothing shifts as content lands, pause it off screen and in hidden tabs, and make its markup a composed still frame for reduced motion and no-JS.
- **Do** pin light surfaces (the form panel, demo cards) to the light tokens when they sit on a dark ground or in dark mode.
- **Do** list services and cases as open ruled rows, and put a two-option comparison in one 14px panel, rather than a grid of cards.

### Don't:
- **Don't** place an uppercase mono label, kicker or eyebrow above a heading or at the head of a row, or use mono as interface chrome (the Wardix marketing site's `.eyebrow` pattern is not carried over).
- **Don't** add photography or raster imagery to the consulting page: no scenic photos, no founder portrait, no product screenshots.
- **Don't** add a second 3D object or a third self-moving piece; anything else stays still until the visitor acts.
- **Don't** put icons in tiles, circles or filled badges, or use emoji icons.
- **Don't** use Card on Stage off a dark ground, or Overlay on anything at rest.
- **Don't** add prose explaining the page to the visitor, section intros, decorative bold, or decorative numbers.
- **Don't** show invented proof: no hypothetical case studies, logos, testimonials or counts. Demo scenes may be modelled on published cases, but their data stays illustrative and the source businesses are never named or framed as clients or results.
- **Don't** use pills, radii outside 4 / 6 / 10 / 14 / 26, or sharp cards.
