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

**Products on the homepage** (user, 2026-10-04) — status differs and the page must not overstate any of it:
- **Wardix** — self-hosted Windows infrastructure monitoring appliance. **Available now**, v1.1.35. Community free (15 checks), Standard $49/mo, Pro $99/mo (AI-assisted triage). Product site live at `tracelet.seafin.ai` (branded Wardix; currently never mentions Seafin).
- **Authwell** — AI-powered prior-authorization management for small medical practices. Phases 1–7 built. **Currently offline**: `authwell.seafin.ai` returns HTTP 526 and the GitHub repo is archived.
- **Remana** — aging-in-place SaaS: SMS medication reminders, family dashboard, nurse concierge (planned $99/$299/mo). **Prototype**: `v0-remana.vercel.app` returns 404; last code change Feb 2026.
- **Wardex Operator** — agent-native monitoring and operations; planned successor to Wardix. **In early development (Phase 0), not a production product.**

**Claims that are safe for Wardix** (verified in code, `licensing.py`, `routes/license.py`, `app_update_vendor.py`): runs on the customer's own Windows server; license verified offline; no install reporting to Seafin in current code. It *does* contact Seafin's server to check for updates (can be pointed elsewhere), and optional AI triage uses the customer's own model key or a local model. Do **not** claim "never contacts the internet."

**Domains:** `seafin.ai` and `www.seafin.ai` do not resolve today; `wardix.ai` is not registered. Fixing DNS is out of scope for design work.

**Open decisions:**
- How to present Authwell (offline) and Remana (prototype): "in development", "built for clients", or link-less.
- Whether the consulting prices above still hold.
- Whether `personal.html` / `welcome.html` (Seafin Personal) are retired.

## Brand Commitments

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
