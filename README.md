# Seafin LLC — Company Hub

Central repository for Seafin LLC strategy, planning, brand assets, and the marketing website.

## Company Overview

**Seafin LLC** is an AI consulting and custom development company. The flagship Seafin brand positions as a **Claude deployment partner for businesses without dedicated AI staff** — from solo operators through ~500-person teams.

- **Seafin** (services brand) — Strategy audits, fixed-fee custom AI builds, and managed AI operations on retainer. Anchored on Anthropic Claude + Claude for Small Business, with multi-platform competence and a sovereign / self-hosted LLM specialty.
- **Solvity** (product brand) — Self-service AI automation platform (SaaS) at [solvity.ai](https://solvity.ai)
- **Custodian** (product brand) — Managed backup + ransomware protection. See [products/custodian/](products/custodian/).

**Domain:** [seafin.ai](https://seafin.ai) · **Tagline:** "Your AI department, without the headcount."

## Services Catalog

**Three-tier commercial ladder** (live on seafin.ai):

| Tier | Price | Duration | What |
|------|-------|----------|------|
| **AI Strategy Audit** | $499–$1,500 | 1 week | 90-min deep-dive + written report, top 3 opportunities, ROI estimate, 90-day roadmap |
| **AI-Native Builds** | $5K–$25K | 2–6 weeks | Fixed-fee custom workflows, agents, integrations |
| **AI Concierge** | $1,500–$5K/mo | Month-to-month | Managed AI operations, unlimited Slack support, cost guardrails, one new workflow per month |

**Eight build patterns:** Voice (receptionist), Knowledge Agent, Internal Copilot, Workflow Agent, Browser Agent, Custom Build (apps/sites), Training & Enablement, Sovereign AI (specialty).

**Add-ons:** Cost Optimization Audit · Eval & Governance retainer · Migration from ChatGPT/Gemini · Fine-Tuning.

## Directory Structure

```
seafin-web/
├── CLAUDE.md                — Claude Code project instructions
├── COMPANY_STRUCTURE.md     — Org chart, brands, domains, GitHub structure
├── README.md                — This file
├── api/                     — Serverless functions (Vercel)
│   ├── create-checkout.js, webhook-stripe.js, provision-status.js — Seafin Personal flow
│   ├── classify-email.js, waitlist.js — Internal marketing automation
│   └── test.js, lib/        — Sanity check + shared utilities
├── brand/                   — Brand identity, market research, launch plan
├── infrastructure/          — Hosting cost breakdown
├── mockups/                 — HTML mockups (landing page iterations)
├── products/                — Product PRDs and roadmaps
│   ├── SEAFIN_AI_SERVICES_PRD.md      — Legacy four-pillar PRD (superseded; historical reference)
│   ├── SEAFIN_PRODUCT_CATALOG_RESEARCH.md
│   └── custodian/           — Custodian backup product
└── seafin-site/             — Production marketing site (deployed to seafin.ai)
    ├── index.html, sovereign.html, personal.html, welcome.html, privacy.html, terms.html
    ├── brand.css            — Shared design system tokens + components
    ├── brand.js             — Nav densify + IntersectionObserver reveal
    └── README.md
```

## Key Documents

- **[Company Structure](COMPANY_STRUCTURE.md)** — Org chart, brand architecture, domain mapping
- **[Branding Strategy](brand/BRANDING_STRATEGY.md)** — Two-brand architecture (Seafin + Solvity)
- **[Marketing Plan](MARKETING_PLAN.md)** — Marketing automation flows + brand configurations
- **[Infrastructure](infrastructure/)** — Hosting specs and costs
- **[Deployment](VERCEL_DEPLOYMENT.md)** — Vercel deployment guide
- **[Legacy Services PRD](products/SEAFIN_AI_SERVICES_PRD.md)** — SUPERSEDED. Historical reference for the old four-pillar (BUILD/AUTOMATE/CONNECT/PROTECT) framework. Current positioning is the Claude-partner / 3-SKU model documented above.

## Related Repositories

All repos live under the **seafinai** GitHub organization:

| Repo | Purpose |
|------|---------|
| `seafinai/seafin` | This repo — company hub, strategy, marketing site, Seafin Personal flow |
| `seafinai/solvity` | Solvity SaaS platform (AI automation product) |

## Current Status

- Production marketing site live at [seafin.ai](https://seafin.ai) (Vercel auto-deploy from `seafin-site/`)
- Three commercial SKUs published with transparent pricing
- Eight build patterns + four add-on services documented on the site
- Sovereign AI page live at [seafin.ai/sovereign](https://seafin.ai/sovereign.html) for regulated/air-gapped buyers
- Seafin Personal product (signup, Stripe checkout, post-checkout provisioning) at `/personal.html` + `/welcome.html`
- Solvity SaaS platform in active development (separate repo)
- Anthropic Claude Partner Network application pending

---

*Last Updated: May 2026*
