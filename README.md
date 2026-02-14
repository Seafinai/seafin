# Seafin LLC — Company Hub

Central repository for Seafin LLC strategy, planning, brand assets, and the marketing website.

## Company Overview

**Seafin LLC** is an AI consulting and custom development company targeting small-to-medium businesses (1-50 employees).

- **Seafin** (services brand) — Custom AI development, consulting, and managed services delivered through four pillars: BUILD, AUTOMATE, CONNECT, PROTECT
- **Solvity** (product brand) — Self-service AI automation platform (SaaS) at [solvity.ai](https://solvity.ai)

**Domain:** [seafin.ai](https://seafin.ai) · **Tagline:** "Custom AI for small business. Results in weeks, not months."

## Directory Structure

```
seafin/
├── CLAUDE.md                — Claude Code project instructions
├── COMPANY_STRUCTURE.md     — Org chart, brands, domains, GitHub structure
├── README.md                — This file
├── api/                     — Serverless functions (Vercel)
├── brand/                   — Brand identity, market research, launch plan
├── infrastructure/          — Hosting cost breakdown
├── mockups/                 — HTML mockups (landing page iterations)
├── products/                — Product PRDs and roadmaps
│   ├── SEAFIN_AI_SERVICES_PRD.md      — Master services PRD (BUILD/AUTOMATE/CONNECT/PROTECT)
│   ├── SEAFIN_PRODUCT_CATALOG_RESEARCH.md
│   └── custodian/           — Custodian backup product (PROTECT pillar)
└── website/                 — Static marketing site + AI feature modules
```

## Key Documents

- **[Company Structure](COMPANY_STRUCTURE.md)** — Org chart, brand architecture, domain mapping
- **[Services PRD](products/SEAFIN_AI_SERVICES_PRD.md)** — Full service catalog (BUILD/AUTOMATE/CONNECT/PROTECT)
- **[Branding Strategy](brand/BRANDING_STRATEGY.md)** — Two-brand architecture (Seafin + Solvity)
- **[Infrastructure](infrastructure/)** — Hosting specs and costs
- **[Deployment](VERCEL_DEPLOYMENT.md)** — Vercel deployment guide

## Related Repositories

All repos live under the **seafinai** GitHub organization:

| Repo | Purpose |
|------|---------|
| `seafinai/seafin` | This repo — company hub, strategy, marketing site |
| `seafinai/solvity` | Solvity SaaS platform (AI automation product) |

## Current Status

- Website live at seafin.ai (hosted on Vercel with auto-deploy from GitHub)
- AI features live: chatbot, ROI calculator, smart contact form, RAG demo
- Serverless API functions at `/api/*` (Vercel)
- Four service pillars defined (BUILD/AUTOMATE/CONNECT/PROTECT)
- OpenClaw hosted AI worker platform designed
- Solvity SaaS platform in active development

---

*Last Updated: February 2026*
