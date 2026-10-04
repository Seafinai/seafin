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
    fontSize: "clamp(2.625rem, 4.6vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.03
    letterSpacing: "-0.025em"
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
    padding: "18px 20px 20px"
  demo-stage:
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
  flow-row:
    typography: "{typography.body-large}"
    padding: "22px 0"
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

The page should look like it comes from the same company as Wardix: it opens on the Wardix dark hero (Deep Indigo under a fading engineering grid and a soft teal glow, the same treatment `tracelet-landing.css` uses), then runs white with hairline rules, one Canvas band, one bordered panel, serif headings, sans everything else, and one gradient button. Restraint carries the premium feel everywhere except one place: the hero's demo, "the build, played", where the page shows what Seafin does by playing it. It reads as a consulting practice's page, not a person's or a product's. Density is moderate: a compact first viewport and generous spacing below.

Seafin departs from the Wardix marketing site in four places, each on purpose. There are no mono labels above headings, because Impeccable's craft floor bans them. There is no photography or raster imagery: no scenic hero (it would make Seafin read as a copy of the Wardix site), no founder portrait, no product screenshot. The pictures are built from markup: the hero demo's mock app cards, whose four scenes are modelled on published small-business cases, and the drawn teal route diagrams. The brand gradient is narrowed to the single primary action. And motion has one focal point, the demo; everything else that moves is quiet.

**Key Characteristics:**
- A Deep Indigo opening with the upstream engineering grid, then a white page with one Canvas band and a Bastion close; dark mode from the same token pairs.
- Source Serif 4 for the page's headings and the service names, Public Sans for everything readable, Geist Mono only for short functional tags and mock-software chrome.
- One radius family: 6 / 10 / 14 / 26, plus 4px for inline highlights.
- One action per page, one label for it, one gradient on it.
- One focal motion (the hero demo), quiet supporting motion elsewhere; no photography; no invented proof.

## Colors

Neutral cool surfaces with one control color (indigo), one accent (teal), and two dark fields: Deep Indigo to open, Bastion Navy to close.

### Primary
- **Primary Indigo** (`indigo`): the control and brand color. Starts the brand gradient, sets `theme-color` and the text-selection background. Never used as a flat page fill.
- **Deep Indigo** (`indigo-deep`): the hero field (#070a18 in dark mode, set on the hero itself) and the tint source for every light-mode shadow. Indigo Tint (#e8eaf5) is still declared from the Wardix set but unused here.

### Secondary
- **Signal Teal** (`teal`): links, focus outlines, input focus borders, caret, duration tags, flow arrows, diagram icons, the dashed boundary and its label, the sent-state border on the form panel, and in the demo the flying chips, the working/done status dot and the typing caret. In dark mode it becomes Soft Teal (#38b3da) so it stays legible on navy; upstream Wardix does not make this swap.
- **Deep Teal** (`teal-deep`): link hover and the text of a demo mark once the scan has lit it. In dark mode it lightens to #8fd6ee, so hover always moves away from the background.
- **Soft Teal** (`teal-soft`): ends the brand gradient; every wire (route diagrams, demo relay); the demo scan line and tab progress fill; focus outline color on the dark fields.
- **Teal Tint** (`teal-tint`): the 3px focus halo around inputs, the sent-state halo around the form panel, and the highlight behind a lit demo mark or a freshly filled demo field. Dark pair #0c2c3a.

### Tertiary
- **Bastion Navy** (`bastion`): the closing band only, the same in both modes.

### Neutral
- **Ink 900 / 700 / 500** (`ink-900`, `ink-700`, `ink-500`): headings, primary text, flow results and the practice-index top rule / field labels, diagram node labels, demo card body text, the "which one fits" line and the footer maker name / descriptions, flow inputs, demo field keys and app-bar text, nav and footer links. Dark pairs #e9ecf6 / #cdd3e6 / #9aa3c0.
- **Paper** (`paper`): the page background, the form panel, the demo's app cards, the routes panel, nav (at 94%). Dark pair #121732.
- **Paper 2** (`paper-2`): input fills, diagram wells and the document inset in a demo card. Dark pair #0f1430.
- **Canvas** (`bg`): the "Where it runs" band only. Dark pair #0b0e1a.
- **Line** (`line`): panel and card borders, practice-index and flow row rules, section dividers, nav bottom border. Dark #262c44.
- **Line Soft** (`line-soft`): dividers inside a panel or card, diagram well borders. Dark #1e2438.
- **Line Strong** (`line-strong`): input borders (hover mixes in 45% Ink 500); the idle demo status dot. Seafin's addition, not in the upstream token set. Dark #3a4466.
- **Danger** (`danger`): form error text only. Dark #ff8a80. Seafin's name for upstream's critical red.
- **Hero-local colors:** white for the H1, #b9c4de for the lede, #9fb0d4 for idle demo tabs (white when active or hovered), #8fd6ee for the demo's step label; the glass stage is white at 7% to 2.5% with a 13% white border. All set on the hero so it reads the same in both modes.

### Named Rules
**The One Gradient Rule.** The indigo-to-teal brand gradient appears only on "Request a free call" buttons (nav, form submit, closing band) and on the favicon tile. Not on text, cards, section backgrounds, or a second button. The hero's grid, teal glow, the demo's glass sheen and its scan line are translucent tints confined to the hero, not the brand gradient.

**The Two Dark Fields Rule.** Deep Indigo opens the page (the hero); Bastion Navy closes it (the closing band). Neither appears anywhere else, and they never swap.

**The Status-Means-State Rule.** Green, gold and red mean real system state. Seafin uses only red, and only for a failed form send. The demo's status dot is teal, never green.

## Typography

**Display Font:** Source Serif 4 (with Georgia, serif)
**Body Font:** Public Sans (with Helvetica Neue, Helvetica, Arial, sans-serif)
**Label/Mono Font:** Geist Mono (with ui-monospace, SF Mono, Menlo, Consolas, monospace)

All three are self-hosted WOFF2 files in `seafin-site/fonts`, using `font-display: swap`. Public Sans and Source Serif 4 are preloaded.

**Character:** an editorial serif for the page's statements and the names of what Seafin sells, over a plain, sturdy civic sans that does all the reading. Tabular numerals are on across the whole body.

### Hierarchy
- **Display** (600, clamp(2.625rem, 4.6vw, 4rem), 1.03, -0.025em, white): the hero H1 only. Balanced wrap. Drops to 2rem / 1.1 at ≤480px.
- **Headline** (600, clamp(1.875rem, 3vw, 2.5rem), 1.12, -0.015em): section H2s and the closing-band H2.
- **Index** (600, clamp(1.625rem, 2.4vw, 2.125rem), 1.15, -0.015em): service names in the practice index.
- **Title** (Public Sans 700, 1.1875rem, 1.3): route H3s in the routes panel. The form-panel heading is a smaller sans title (700, 1.0625rem, 1.3, -0.01em).
- **Lede** (400, 1.1875rem, 1.5, #b9c4de, max 40ch): the hero sentence, 20px under the H1.
- **Body Large** (400, 1.125rem): flow rows; the result side is ink-900 at 600, the input side ink-500.
- **Body** (400, 1.0625rem, 1.6): running text. Descriptions cap at 52 to 60ch.
- **Label** (Geist Mono 600, 0.75rem, 0.06em, uppercase, teal): duration tags in the practice index; the demo's step label. The diagram boundary label and the demo's app-bar and document headers use the same face at 0.6875rem.
- **Field label** (Public Sans 600, 0.875rem, 1.3, ink-700): form labels and diagram node labels.
- **Demo scale:** inside the demo cards text runs smaller to read as software: 0.875rem body, field values and chips (one fixed 1.5rem line), 0.8125rem documents, tables and tabs, 0.75rem field keys (body, values and chips one step smaller at ≤480px).

### Named Rules
**The Serif-Is-For-The-Page Rule.** Serif is for page-level headings (the H1, section H2s, the closing H2) and for the service names in the practice index, which act as the headings of what Seafin sells. Panel titles, including the form-panel heading and the route H3s, are Public Sans bold. Nothing inside the demo is serif.

**The Mono-Tags-Never-Lead Rule.** On the page, Geist Mono uppercase labels are short and functional: duration tags set beside their title (desktop) or beneath it (≤960px), the step label on the demo's wire, and the one label that names a drawn boundary in a diagram. A mono label never sits above a page heading and never leads a page row. Inside the demo's mock app cards, mono is the mock software's own chrome (app name and meta, document and table headers, speaker names) and depicts an interface; it is not a page device to reuse elsewhere.

## Layout

Single column centered at 1180px max width with a gutter of clamp(16px, 4vw, 32px). Sections pad clamp(56px, 7vw, 96px) top and bottom and are separated by a 1px Line rule.

The first viewport is the dark hero (clamp(48px, 6vw, 96px) top, clamp(48px, 6vw, 88px) bottom), two columns at 1fr / 1.04fr, vertically centered, 40px by clamp(32px, 5vw, 72px) apart. Left: the serif H1, the lede, and clamp(28px, 3.5vw, 44px) below them the form panel. Right: the demo. The practice index follows on white after clamp(48px, 6vw, 80px), opened by its 1px ink-900 rule (its section heading is visually hidden). The practice index pattern was borrowed from Accenture's and Capgemini's practice pages (chosen 2026-10-04).

The sections change shape instead of repeating one template:
1. The practice index: open ruled rows, three columns (16rem / 13.5rem / 1fr) of name, duration tag and description (Services).
2. A heading over full-width flow rows: input, arrow, result (What a build looks like).
3. A Canvas band with a heading over one two-route panel and a single line beneath it (Where it runs).
4. A full-bleed Bastion band with the heading and actions on one line (closing).
5. A one-line footer: maker name left, mail and legal links right.

Breakpoints: at ≤960px the hero collapses to one column with the demo below the form (capped at 560px wide), and index rows stack (name, tag, description). At ≤760px nav links hide, the two form fields stack, flow rows stack with the arrow turned to point down, and the routes panel stacks. At ≤480px the hero type steps down, the demo's padding and type tighten, and closing-band buttons go full width.

## Elevation & Depth

A hybrid that leans flat: hairline borders, rules and two dark fields do the separating. On light ground, one quiet indigo-tinted shadow gives the routes panel and buttons a little lift. On the dark hero, depth is deliberate and deep: the form panel and the demo float on dark navy shadows, and the demo's cards sit inside a glass stage. In dark mode, Raised and Overlay become neutral black and stronger, while Resting keeps its light indigo tint.

### Shadow Vocabulary
- **Resting** (`box-shadow: 0 1px 2px rgba(15, 21, 86, 0.06), 0 1px 3px rgba(15, 21, 86, 0.04)`): the routes panel and primary buttons at rest.
- **Raised** (`box-shadow: 0 4px 12px rgba(15, 21, 86, 0.08), 0 2px 4px rgba(15, 21, 86, 0.04)`): button hover and the form panel's sent state only. Dark: `0 4px 14px rgba(0, 0, 0, 0.4)`.
- **Hero Lift** (`box-shadow: 0 24px 56px rgba(3, 6, 30, 0.45)`): the form panel on the dark hero.
- **Stage** (`box-shadow: 0 40px 90px rgba(3, 6, 30, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.08)`): the demo's glass stage.
- **Card on Stage** (`box-shadow: 0 10px 30px rgba(3, 6, 30, 0.35)`): the demo's app cards.
- **Chip Glow** (`box-shadow: 0 8px 20px rgba(0, 118, 163, 0.4)`): a demo chip in flight.
- **Overlay** (`box-shadow: 0 14px 32px rgba(15, 21, 86, 0.1), 0 4px 12px rgba(15, 21, 86, 0.05)`): defined but unused on this page. Kept for menus and dialogs.

### Named Rules
**The Quiet Elevation Rule.** On light ground nothing at rest sits above Resting; Raised appears only in response to state (hover, a sent form) and Overlay is for overlays. Deep shadows (Hero Lift, Stage, Card on Stage, Chip Glow) exist only on the dark hero, where a light shadow would vanish.

## Shapes

One radius family from upstream: 6px for buttons and the documents and tables inside demo cards, 10px for inputs, diagram wells and demo app cards, 14px for the form panel and the routes panel, 26px (upstream's media radius) for the demo stage. Below the family, 4px rounds inline highlights: lit demo marks, chips, filled demo fields and the focus ring. The practice index and flow rows have no corners at all: they are rules, not containers. No pills, no icon tiles; the only round shape is the 8px demo status dot. Borders and rules are 1px; lines inside a panel use Line Soft, outer lines use Line. Two marked exceptions: the ink-900 rule that opens the practice index, and the 1.5px dashed teal boundary around the self-hosted diagram. Icons and arrows are open line strokes (1.5 to 1.75, round caps and joins) in teal, never filled.

## Components

### Buttons
- **Shape:** gently rounded (6px), min height 44px (40px with 16px padding in the nav, 48px full-width at 1rem in the form panel), padding 0 20px, Public Sans 700 at 0.9375rem.
- **Primary:** brand gradient (`linear-gradient(100deg, indigo 0%, teal 62%, teal-soft 100%)`; dark: #2b35a8 / #0a85b6 / #38b3da; the frontmatter records indigo as its solid fallback), white text, Resting shadow. One label everywhere: "Request a free call".
- **Hover / Focus:** hover brightens (`filter: brightness(1.08)`) and lifts to Raised; press shifts down 1px and dims slightly (0.96). Transitions are 160ms ease-out. Focus is the global 2px teal outline, offset 3px (Soft Teal on the dark fields). While sending, the button is desaturated and the label reads "Sending…".
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
- Sticky, 64px tall, Paper at 94% with a 10px backdrop blur and a bottom Line border, sitting over the dark hero. Serif wordmark "Seafin" (700, 1.375rem, -0.02em). Three links (Services, What we build, Where it runs) in Public Sans 500 0.9375rem ink-500, turning ink-900 on hover. The primary button sits at the right.
- On this one-page build, links hide at ≤760px with no menu replacement. The primary button stays in the header.

### Hero
The Wardix opening, adopted from upstream: a Deep Indigo field (#070a18 in dark mode) under an engineering grid of 1px white lines at 5.5% opacity on a 54px square, faded out by a radial mask from the top right, with a blurred teal glow (Signal Teal at 35%) rising from the bottom right. The grid and glow sit behind the content and carry no meaning; they appear only here.

### Form Panel
The one action, in the hero's left column under the lede: Paper fill, transparent border, 14px radius, padded 18px 20px 20px, Hero Lift shadow. The sans heading and its one-line ink-500 sub-line (1rem) share a baseline row and wrap when narrow. Below, 14px down, name and work email sit side by side (12px gap, stacking at ≤760px) over a full-width 48px primary button; an `aria-live` status line spans beneath. On a successful send, the fields disable, the button hides, the border warms to teal with a 3px Teal Tint halo plus Raised (400ms ease-out), and the confirmation fades up 4px (420ms, cubic-bezier(0.16, 1, 0.3, 1)). Every "Request a free call" link scrolls to the panel and focuses the first field.

### The Build, Played (signature)
The hero's right column: a looping demo of four example builds (invoices, leads, inbox, meetings), each showing a message turning into finished work in a real tool.
- **Stage:** a glass panel 486px tall (470px and 12px padding at ≤480px), 26px radius, 16px padding, a top-to-bottom white sheen (7% to 2.5%), a 13% white border and the Stage shadow. Three rows: the source card, a 44px relay, the destination card.
- **App cards:** two fixed frames, Paper, 1px Line border, 10px radius, Card on Stage shadow; they never leave the stage. A Line Soft app bar carries the mock app's name and meta in 0.6875rem mono ink-500. The source body is a fixed 188px (180px at ≤480px) holding an email, document, carrier table, fax or transcript in 6px-radius Paper 2 insets. The destination holds a two-by-two field list (key in 0.75rem ink-500; value in 600 ink-900 on one fixed 1.5rem line with ellipsis, so nothing shifts when a value lands; an empty value is a short Line bar) and a status row with an 8px dot pinned to the bottom.
- **Relay:** a vertical 2px dashed Soft Teal wire drifting downward (900ms linear) beside a mono step label in #8fd6ee that changes per step with a 280ms fade-up.
- **Tabs:** four progress tabs (Invoices, Shipping, Referrals, Intake) under the stage, each a 2px track (white 16%) that fills with Soft Teal over 7.6s, the exact length of a scene (the hold stretches to land on it). Clicking a tab jumps to that scene. Hidden without JS.
- **Rhythm (one for every scene):** the frames' contents cross-fade (out 200ms, in 360ms with a 40ms stagger); a Soft Teal scan line sweeps the source (1300ms) and lights each mark Teal Tint / Deep Teal as it passes; Signal Teal chips travel one at a time (280ms apart, 900ms each, cubic-bezier(0.45, 0, 0.2, 1)) on a shallow arc and settle exactly on the field's value line, which flashes Teal Tint as it fills (900ms); computed fields (an overcharge, a next step) then land in place without a chip; the status dot stops breathing and settles to teal with a halo; the record holds until the scene reaches 7.6s (at least 1.6s). Sequencing runs on timers, never on animation completion, so a throttled browser cannot stall the loop.
- **Restraint:** the loop pauses when less than 20% of the stage is on screen and when the browser tab is hidden. Under reduced motion, and without JS, the markup shows one composed still frame (the finished invoice scene); with reduced motion, tabs swap still frames.
- **Sample data:** each scene is modelled on a published small-business case (sources in PRODUCT.md); names, amounts and dates are illustrative, labelled "Example build" to assistive tech, and the source businesses are never named, quoted or presented as Seafin's clients.

### Practice Index (signature)
The three services as an open, ruled index: a 1px ink-900 rule on top, a 1px Line rule under each row, no panel, fill or shadow. Each row (24px top and bottom) sets the serif service name, the teal mono duration tag and the ink-500 description on one baseline across 16rem / 13.5rem / 1fr columns, 32px apart. At ≤960px each row stacks with the tag directly beneath the name.

### Flow Rows
Full-width rows of input, arrow, result (1fr / 22px / 1.25fr), 22px top and bottom, ruled with Line above each row and below the last. The input is ink-500, the result ink-900 at 600, the arrow a 22px teal line stroke. No tag or label leads a row; the tool is named inside the result sentence. At ≤760px the row stacks and the arrow points down.

### Route Diagram
Inside each half of the routes panel, above the route title: a Paper 2 well (10px radius, Line Soft border, padded 26px 20px 20px) holding two nodes joined by a wire. Nodes are 36px teal line icons over a field-label caption, with no tile or fill behind them. The wire is a 2px dashed Soft Teal line that drifts continuously (900ms linear), quiet supporting motion. The self-hosted route's well swaps its border for a 1.5px dashed teal boundary, named by a 0.6875rem mono label set into the top edge.

### Closing Band
Full-bleed Bastion Navy, padded clamp(56px, 7vw, 96px), with a white serif headline beside the primary button and a mail link in pale cyan (#9fd8ec, white on hover). Text and focus colors are set locally, so the band looks the same in both modes.

### Footer
One line under the band: "Seafin LLC" in ink-700 600 on the left, then the mail, Privacy and Terms links in ink-500 at 0.875rem, unadorned until hover (ink-900, underline).

### Motion
One focal motion and quiet support. The hero demo is the page's focal motion, with the shared rhythm above. Supporting motion is limited to the drifting dashed wires (route diagrams and demo relay, 900ms linear), the form's sent state, and hover and focus transitions (140 to 160ms ease-out). Entrances ease out on cubic-bezier(0.16, 1, 0.3, 1); outgoing content leaves faster than incoming content arrives; containers stay put and only their contents change. All motion turns off under prefers-reduced-motion, leaving composed still frames.

## Do's and Don'ts

### Do:
- **Do** take every token from the Wardix set (upstream `design.md` + `tracelet-landing.css`) and add a Seafin-local token only when the build needs it (as with `line-strong`, `danger`).
- **Do** reserve the brand gradient for "Request a free call" buttons, and use that same label everywhere the action appears.
- **Do** open on the upstream dark hero (Deep Indigo, 54px grid, radial mask, teal glow) and close on Bastion Navy; keep everything between them light.
- **Do** use Source Serif 4 for page-level headings and practice-index service names only, and Public Sans 700 for panel titles.
- **Do** use Geist Mono uppercase only for short functional tags beside or beneath their title, step labels on a wire, a drawn boundary's name, or the chrome of a mock app.
- **Do** give every looping animation a shared rhythm, keep its frames fixed so nothing shifts as content lands, pause it off-screen and in hidden tabs, and make its markup a composed still frame for reduced motion and no-JS.
- **Do** list services and examples as open ruled rows, and put a two-option comparison in one 14px panel, rather than a grid of cards.
- **Do** keep every color a light/dark token pair; check link and hover colors in both modes.

### Don't:
- **Don't** place an uppercase mono label, kicker or eyebrow above a page heading or at the head of a page row (the Wardix marketing site's `.eyebrow` pattern is not carried over).
- **Don't** add photography or raster imagery to the consulting page: no scenic photos, no founder portrait, no product screenshots.
- **Don't** put icons in tiles, circles or filled badges, or use emoji icons.
- **Don't** add a second focal motion; anything else that moves stays as quiet as the dashed wires.
- **Don't** use deep shadows (Hero Lift, Stage, Card on Stage, Chip Glow) off the dark hero, or Raised and Overlay on anything at rest.
- **Don't** add prose explaining the page to the visitor, section intros, decorative bold, or decorative numbers.
- **Don't** show invented proof: no hypothetical case studies, logos, testimonials or counts. Demo scenes may be modelled on published cases, but their data stays illustrative and the source businesses are never named or framed as clients or results.
- **Don't** use pills, radii outside 4 / 6 / 10 / 14 / 26, or sharp cards.
