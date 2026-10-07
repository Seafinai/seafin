---
version: 1
slug: "seafin-site-index-html"
primary_target: "seafin-site/index.html"
related_targets: []
---

# Seafin homepage — surface brief

## Scope and mode
`seafin-site/index.html`, the seafin.ai homepage. Mode: **Persuade**. Redesign of the May 2026 page in the user's pinned visual system: the **Wardix design system** (`tracelet` repo `design.md`), executed straight. Themed directions (Equipment Nameplate, Storefront Window, Work Order, HyperCard) were shown and set aside; the user: "keep the same design scheme as most of the apps".

## Audience, job, action
- Owner/operator of a small-to-mid business with no AI staff, often regulated or data-sensitive, judging whether Seafin is real and safe before talking.
- One action: **book a free discovery call** through a short form that emails hello@seafin.ai (Cloudflare Worker). The form itself is the primary control, in the first viewport.
- Consulting only. Three offers shown without prices: Strategy Audit (1 week), Custom Builds (fixed fee, 2–6 weeks), Managed AI (month-to-month). Self-hosted option explained, including when to pick cloud vs self-hosted; self-hosted means open-source models, never Claude.
- No products (Wardix, Authwell, Remana, Wardex Operator) and no founder: both removed by the user 2026-10-04 ("this is the consulting page", "I'm not selling me").

## Proof and constraints
- No client proof exists; show none. Real evidence: the offers and their terms.
- Copy follows the user's ui-slop rules: no section intros explaining the page, no repeated sentences, no decorative bold, no initials badges, no decorative numbers, no eyebrow labels above headings, em dashes ≈ 0, plain words. Not a copy of the repo.
- Hosting: Cloudflare (Workers static assets + form Worker). Deploying is a separate, confirmed step.
- No scenic photography: the Wardix library images are Wardix's own hero scenes and would make Seafin read as a copy of that site.

## Unresolved
- Whether the five add-on offers return; whether Seafin Personal pages are retired (sub-pages still use the old brand.css).
- seafin.ai has no web record yet (DNS out of scope).

## Direction contract
THESIS: Seafin's homepage looks like it comes from the same company as Wardix: calm, operational, premium through restraint, the offer and the booking form readable in one glance. It refuses themed metaphors and the category default of a dark navy page with one coloured headline word.

OWN-WORLD: The Wardix system as documented. Light canvas #F5F6F9, white panels with #E2E6EC borders and quiet indigo-tinted shadows; primary indigo #1A227E, signal teal #0076A3 for links and focus, bastion navy #071426 for the closing band; the indigo-to-teal gradient only on the one primary action. Source Serif 4 for marketing headings, Public Sans for everything readable, Geist Mono uppercase only for brief functional labels (form labels, duration tags, facts strip). Radii 6 / 10 / 14 / 26. Dark mode from the same token pairs.

STORY: The visitor learns in the first screen what Seafin does and that they own it, can book a free call on the spot, and sees all three offers without scrolling. Below, they learn when to run on Claude versus open-source models on their own servers, then meet the closing call to action.

FIRST VIEWPORT: Compact white nav with the Seafin wordmark, two links and the gradient "Request a free call" button. The serif H1 over two lines with the one-sentence offer beside it; under them the form as one bar (name, work email, submit). Under the form, the practice index (borrowed from Accenture and Capgemini, chosen 2026-10-04): the three offers as ruled rows with serif names, mono duration tags and one description each, all inside the first 900px.

FORM: Pinned by the user: the Wardix design system (`tracelet` `design.md` and the vendor site `tracelet-landing.css` tokens), no roll. Signature moment: on submit the form panel's border warms to teal and a one-line confirmation replaces the button with a short fade; nothing else animates beyond hover and focus. Motion respects prefers-reduced-motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
