---
version: 1
slug: "seafin-site-index-html"
primary_target: "seafin-site/index.html"
related_targets: []
---

# Seafin homepage — surface brief

## Scope and mode
`seafin-site/index.html`, the seafin.ai homepage. Mode: **Persuade**. Redesign: full visual replacement of the May 2026 page.

## Audience, job, action
- Owner/operator of a small-to-mid business with no AI staff, often regulated or data-sensitive, judging whether Seafin is real and safe before talking.
- One action: **book a free discovery call** through a short form that emails hello@seafin.ai (Cloudflare Worker). The form itself is the primary control.
- Consulting leads. Three offers shown without prices: Strategy Audit (1 week), Custom Builds (fixed fee, 2–6 weeks), Managed AI (month-to-month). Sovereign/self-hosted option explained plainly, including when to pick cloud vs self-hosted.
- Products: **Wardix** large, with a real current screenshot and "free to start" (no tier cap number, no Buy button). **Authwell, Remana, Wardex Operator** in a short "on the bench" row: one plain line each, no links, no status claims, no compliance claims.

## Proof and constraints
- No client proof exists; show none. Remove the hypothetical case studies. Real evidence on the page: the running Wardix product, the founder, the offers.
- Data claims only as PRODUCT.md permits ("monitoring data stays on your server"; never "nothing leaves your network").
- Copy follows the user's ui-slop rules: no section intros explaining the page, no repeated sentences, no decorative bold, no initials badges, no decorative numbers, em dashes ≈ 0, plain words over jargon. The site must not read like the repo (no feature dumps, no internal names).
- Hosting: Cloudflare (Workers static assets + a form Worker). Deploying is a separate, confirmed step.

## Unresolved
- Founder photo (none exists; leave a marked slot, never initials).
- Whether the five add-on offers return; whether Seafin Personal pages are retired (not linked from the homepage meanwhile).
- seafin.ai has no web record yet (DNS out of scope).

## Direction contract
THESIS: The homepage is one anodized equipment nameplate: Seafin's AI consulting plated like equipment a small business owns, stating what it does, where it runs, who services it and whose property it is. It refuses the category default of a dark navy page, one coloured headline word, a 3-step process and a logo wall.

OWN-WORLD: Flat anodized cobalt plate (#1e4a8a) with bright-aluminum engraved lettering, four slotted screw heads, hairline engraved rules and recessed stamped input slots; below it a cool aluminum ground (#c8cbcc family) with black-fill engraving (#16181a). One safety-amber (#f2b705) stamped button, reserved for the single action. Barlow Condensed uppercase, letterspaced, for plate labels; Barlow for reading text (California plate and road-sign lettering). No photo textures, no fake serial numbers, no gradients beyond the moving sheen.

STORY: The owner reads one plate and learns what Seafin does, that it can run on their own servers, that Rob builds and services it, and that they own the result. They request a free call on the plate itself, then scroll to see Wardix running as proof Seafin ships real software.

FIRST VIEWPORT: A thin nav strip on aluminum. The cobalt plate fills about 85% of the viewport within the content width. Top row: engraved wordmark and "AI consulting for small business". The H1 is engraved large across two lines. Below it a ruled field table (Service / Runs on / Serviced by / Property of) with "Property of — your business" set at monumental scale. The bottom band, "Request service", holds three stamped fields and the amber "Book my free call" button: the working form is the primary action.

FORM: Equipment nameplate, #3 of 7 on the ordered list, seed 1909fd23. Raises: one label column runs down the whole page (from Mesophotic Deep Dive); one strict engraving grid, nothing off it (from Teletext Service); one field at monumental scale (from Anime Command Wall). Signature interaction: a soft light sheen tracks the cursor across the anodized plate; submitting the form engraves a confirmation line into the plate's service band. Motion stops under prefers-reduced-motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
