# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing static HTML/CSS/JS site in `seafin-site/` (plus Vercel serverless functions in `api/` for the old Seafin Personal checkout). **Hosting must move to Cloudflare** (user, 2026-10-04); it currently deploys to Vercel at `seafin.vercel.app`.

## Users

Primary: owners and operators of small-to-mid businesses (solo up to ~500 people) who have no in-house AI staff and want AI doing real work in their business. Regulated or data-sensitive shops (healthcare, legal, finance, gov contractors, manufacturing) are a key segment because they cannot send data to cloud AI.

Secondary: Windows IT admins and MSPs who arrive for the products (Wardix in particular).

## Product Purpose

Seafin LLC is an AI consulting company that also builds its own software. The homepage sells the consulting first; the products show what Seafin builds and give visitors a second way in.

## Positioning

Seafin builds AI and infrastructure that small businesses can own: consulting delivered by the founder, built on Anthropic Claude, with a self-hosted / on-premises option for businesses that can't put their data in someone else's cloud. Unlike typical AI agencies, Seafin ships and runs its own products (Wardix and others), which is evidence it can build, not just advise.

## Operating Context

Visitors evaluate Seafin before booking a call. The company is founder-led (Rob Crider); clients work with the founder directly. Sales motion: free discovery call → paid Strategy Audit → fixed-fee build or retainer.

## Capabilities and Constraints

**Lead offer — AI consulting** (from the live site, May 2026; confirm prices before publishing):
- AI Strategy Audit — $499–$1,500, 1 week
- AI-Native Builds — $5K–$25K fixed fee, 2–6 weeks
- AI Concierge — $1,500–$5K/mo, month-to-month
- Sovereign / self-hosted AI as a specialty

The live site also lists five add-ons (Cost Optimization Audit, Eval & Governance, Migration, Fine-Tuning, Sovereign AI build $25–150K + GPU). Not confirmed for the new homepage.

**Products on the homepage** (user, 2026-10-04; facts verified 2026-10-04) — status differs and the page must not overstate any of it:
- **Wardix** — self-hosted Windows infrastructure monitoring appliance. **Available now.** Published release is **1.1.9** (vendor API `/v1/releases/latest`, 2026-08-12); 1.1.35 is unreleased source on `dev`. Community is free; Standard $49/mo; Pro $99/mo. The Community check cap is **inconsistent** (live site says 15; code and hosted API say 50) — state no number. Paid checkout is **unconfirmed** (production license key mismatch; Stripe IDs labelled test mode) — the homepage offers the free download, not "Buy". The Community download requires an emailed sign-in link. Product site live at `tracelet.seafin.ai` (branded Wardix; never mentions Seafin).
- **Authwell** — AI-powered prior-authorization management for small medical practices (case board, denial analysis and appeals, document intake, payer rules, outbound fax, analytics). Marketing site live at `authwell.vercel.app`; the app at `authwell.seafin.ai` fails at the Cloudflare edge (526); repo archived. Its own site says "HIPAA compliant" while its roadmap lists PII redaction before LLM calls as open — **do not repeat any compliance claim**.
- **Remana** — aging-in-place SaaS: SMS medication reminders, family dashboard, nurse concierge. **Prototype**: no live deployment; last code change Feb 2026.
- **Wardex Operator** — agent-native monitoring and operations; planned successor to Wardix. **Prototype, not customer-ready** (README: Phase 0 open; very active development since Aug 2026).

**Data-handling claims for Wardix** (verified in code): runs on the customer's own Windows server; the license is verified offline; monitoring data stays on that server. Every 12 hours the update check sends Seafin the install ID, version, hashed machine ID and license state (`app_update_vendor.py:493-518`). Optional AI triage uses the customer's own model key or a local model. Do **not** claim "nothing leaves your network" or "never contacts the internet."

**Domains:** `seafin.ai` is registered with Cloudflare DNS (mail works) but has no web record, so it doesn't load; `www.seafin.ai` returns 522. `wardix.ai` and `authwell.ai` are unregistered even though `hello@wardix.ai` and `hello@authwell.ai` are published contact addresses. Fixing DNS is out of scope for design work.

**Open decisions:**
- Whether the five add-ons stay on the homepage.
- Whether `personal.html` / `welcome.html` (Seafin Personal) are retired.

## Brand Commitments

- **Seafin's site uses the Wardix design system** ("Vigilant Infrastructure", `tracelet` repo `design.md`: indigo `#1A227E` + signal teal `#0076A3`, light canvas `#F5F6F9`, white surfaces, Public Sans / Source Serif 4 / Geist Mono, radii 6/10/14/26). Standing preference from the user, 2026-10-04: "keep the same design scheme as most of the apps." Themed concept worlds (nameplate, storefront, work order) were rejected.
- Company name **Seafin** (LLC); founder **Rob Crider** is the face of the consulting.
- Prior tagline candidates: "Your AI department — without the headcount." (current site) and "Custom AI for small business. Results in weeks, not months." (brand doc). Not locked.
- Existing brand doc (`brand/SEAFIN_BRAND_IDENTITY.md`) specifies Deep Ocean Blue `#1a2f5a`, Cyan `#00d4ff`, Inter, and a fin logo mark. The user's standing UI rules (`ui-slop.md`) flag Inter as a generated-look tell; treat the old palette/type as replaceable in the redesign unless the user says otherwise.
- Voice: plain, direct, honest about where AI does and doesn't pay off. No hype. The user's slop rules apply to all page copy: no explanatory prose about the page itself, no decorative bold, no repeated sentences, no invented labels.

## Evidence on Hand

- **No real case studies, client logos, testimonials, or customer counts.** The current site's case studies ("8-person marketing agency", "professional services firm") are hypothetical and must be removed, not reworded. Do not invent proof.
- Real, showable evidence: the shipped Wardix product (live site, real pricing, real dashboard), the founder, and the published pricing.

## Product Principles

1. Consulting leads; products prove capability.
2. Never claim more than is true — product status, data handling, and proof are stated exactly.
3. Ownership over lock-in: the client owns what Seafin builds and can keep data on their own infrastructure.
4. Founder-direct: the person on the call is the person who builds it.
