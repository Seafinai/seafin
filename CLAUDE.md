# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Seafin.ai is the company hub for **Seafin LLC** — an AI consulting and custom development shop targeting SMBs (1-50 employees). This repo contains all strategy docs, brand assets, product planning, infrastructure specs, and the marketing website.

**Domain:** seafin.ai · **Tagline:** "Custom AI for small business. Results in weeks, not months."

## Company Structure

Seafin LLC operates two brands:

- **Seafin** (services) — Custom AI development, consulting, managed services (this repo)
- **Solvity** (products) — Self-service AI automation SaaS platform ([solvity.ai](https://solvity.ai), separate repo at `seafinai/solvity`)

GitHub org: **seafinai** — separate repos per project. See `COMPANY_STRUCTURE.md` for full org mapping.

## Directory Structure

```
seafin/
├── CLAUDE.md
├── README.md
├── api/                    — Legacy Vercel functions (not used by the live site)
│   ├── test.js             — Environment variable sanity check
│   ├── create-checkout.js  — Stripe checkout for Seafin Personal
│   ├── webhook-stripe.js   — Stripe webhook handler
│   ├── provision-status.js — Provisioning status for welcome page
│   ├── waitlist.js         — Seafin Personal waitlist capture
│   ├── classify-email.js   — Internal marketing automation (email triage)
│   └── lib/                — Shared utilities
├── brand/                  — Brand identity, market research, launch plan, logo guides
├── infrastructure/         — Hosting cost breakdown
├── mockups/                — HTML mockups (landing page iterations)
├── products/               — Product PRDs and roadmaps
│   ├── SEAFIN_AI_SERVICES_PRD.md      — Legacy services PRD (SUPERSEDED — see seafin-site for current positioning)
│   ├── SEAFIN_PRODUCT_CATALOG_RESEARCH.md
│   └── custodian/          — Custodian backup product (ransomware protection roadmap)
└── seafin-site/            — Production marketing site (deployed to seafin.ai)
    ├── index.html              — Main landing
    ├── sovereign.html          — Self-hosted / regulated AI offering
    ├── personal.html           — Seafin Personal signup
    ├── welcome.html            — Post-checkout provisioning screen
    ├── privacy.html / terms.html
    ├── brand.css               — Shared design system tokens + components
    ├── brand.js                — Nav densify + IntersectionObserver reveal
    └── README.md               — Site-specific notes
```

## Products & Services (current positioning)

Seafin is positioned as a **Claude deployment partner for businesses without dedicated AI staff** (solo operator through ~500-person teams).

**Three-SKU commercial ladder:**
- **AI Strategy Audit** — $499–$1,500 · 1 week · written report with top 3 opportunities + 90-day roadmap
- **AI-Native Builds** — $5K–$25K · 2–6 weeks · fixed-fee custom workflows and agents
- **AI Concierge** — $1,500–$5K/mo · month-to-month managed AI operations

**Eight build patterns surfaced on the site:**
01 AI Receptionist (voice), 02 Knowledge Agent, 03 Internal Copilot, 04 Workflow Agent, 05 Browser Agent, 06 Custom Build (apps/sites), 07 Training & Enablement, 08 Sovereign AI (specialty, see `sovereign.html`)

Plus add-on services: Cost Optimization Audit, Eval & Governance retainer, Migration from ChatGPT/Gemini, Fine-Tuning.

**Sister products under Seafin LLC** (separate funnels, not on the consulting site): Solvity (SaaS), Custodian (managed backup). See `COMPANY_STRUCTURE.md`.

**Note on legacy docs:** `products/SEAFIN_AI_SERVICES_PRD.md` describes an older four-pillar framework (BUILD/AUTOMATE/CONNECT/PROTECT) with "claw" product names. That framework was abandoned in favor of the Claude-deployment-partner positioning. Treat the old PRD as historical reference.

## Website

Production site at `seafin-site/index.html` (plus sovereign/personal/welcome/privacy/terms). No build system — plain HTML/CSS/JS with shared `brand.css` and `brand.js`.

**Design system:** Inter Tight + Instrument Serif + JetBrains Mono. Deep ink-void surfaces, dual aqua/warm accent palette (cyan for system/tech moments, warm orange for human/featured moments). Glass morphism + IntersectionObserver reveal animations.

**Security Layers:** Input validation, rate limiting, cost controls, and prompt injection protection are implemented in the serverless functions. See `AI_SECURITY_BLUEPRINT.md` for the reusable security pattern.

## Deployment & Hosting

### Cloudflare Workers

seafin.ai is the Cloudflare Worker **`seafin-site`**, configured in `wrangler.toml`:
- **Custom domains:** `seafin.ai` and `www.seafin.ai`
- **Static assets:** `./seafin-site` (binding `ASSETS`). Files listed in `seafin-site/.assetsignore` stay in the repo but are not served (old pages like `personal.html`, `sovereign.html`, `welcome.html`).
- **Worker code:** `worker/index.js` serves the assets and handles `POST /api/request`, the homepage "Book a free call" form. It emails the request through Cloudflare Email Routing (`send_email` binding `SEND_EMAIL`, from `website@seafin.ai`) to the address in the `CONTACT_TO` secret. Only `/api/*` runs the Worker first.

### Deploying

Pushing to GitHub does **not** deploy. Deploy from this folder:
```bash
npx wrangler deploy
```

One-time setup of the form destination (must be a verified Email Routing destination address):
```bash
npx wrangler secret put CONTACT_TO
```

Never commit secrets: `.dev.vars`, `.env` and `.wrangler/` are in `.gitignore`.

### Legacy `api/` functions

`api/` holds the old Vercel serverless functions (Stripe checkout, waitlist, provisioning, email triage). The live Worker does not run them; only the unserved `personal.html` and `welcome.html` reference them.

## Key Context

- Git repo initialized and connected to GitHub (`Seafinai/seafin`)
- Deployed as a Cloudflare Worker with `npx wrangler deploy` (no auto-deploy from GitHub)
- Static HTML site + one Worker route (`/api/request`)
- Secrets set with `wrangler secret put` (no .env files in repo)
- The `elements/` component library has been removed — this is a docs/planning repo + production website
- Revenue model: Seafin services (agents $5-25k, consulting $2-5k/mo), Solvity SaaS ($59-299/mo), Custodian managed backup ($9-199/mo)

## Working Style

**CRITICAL: Avoid excessive documentation**
- Do NOT create multiple README/guide files unless explicitly requested
- Focus on working code, not documentation
- Only create docs if absolutely required for deployment or critical security info
- When implementing features, write the code first - ask about docs later
- Keep responses action-focused, not documentation-focused

## Browser Automation with Agent-Browser

**Agent-browser** is installed globally and available for browser automation tasks. Due to Windows socket compatibility issues, it runs via WSL.

### Usage Pattern

All agent-browser commands must be run through WSL with NVM sourced:

```bash
wsl bash -c "source ~/.nvm/nvm.sh && agent-browser <command>"
```

### Common Commands

```bash
# Navigate to URL
wsl bash -c "source ~/.nvm/nvm.sh && agent-browser open https://example.com"

# Get accessibility tree snapshot (AI-optimized output)
wsl bash -c "source ~/.nvm/nvm.sh && agent-browser snapshot"

# Take screenshot
wsl bash -c "source ~/.nvm/nvm.sh && agent-browser screenshot /tmp/screenshot.png"

# Get page title
wsl bash -c "source ~/.nvm/nvm.sh && agent-browser get title"

# Click element by ref (from snapshot)
wsl bash -c "source ~/.nvm/nvm.sh && agent-browser click @ref"

# Type into form field
wsl bash -c "source ~/.nvm/nvm.sh && agent-browser type 'selector' 'text'"
```

### Accessing Local Files

To view local HTML files from this repo:

```bash
wsl bash -c "source ~/.nvm/nvm.sh && agent-browser open file:///mnt/c/seafin-web/seafin-site/index.html"
```

### Installation Details

- **Version:** agent-browser 0.10.0
- **Location:** Installed in WSL Ubuntu (via npm global)
- **Browser:** Chromium 145.0.7632.6 (downloaded via agent-browser install)
- **Node.js:** v20.19.2 (via nvm in WSL)

### Why WSL?

Agent-browser uses Unix sockets which have compatibility issues on Windows. Running via WSL provides:
- Full socket support
- Native Linux browser automation
- 93% less context usage vs traditional automation
- Fast Rust CLI with ref-based element selection
