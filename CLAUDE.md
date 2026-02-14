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
├── brand/                  — Brand identity, market research, launch plan, logo guides
├── infrastructure/         — Hosting cost breakdown (DigitalOcean)
├── mockups/                — HTML mockups (landing page iterations)
├── products/               — Product PRDs and roadmaps
│   ├── SEAFIN_AI_SERVICES_PRD.md      — Master services PRD (BUILD/AUTOMATE/CONNECT/PROTECT)
│   ├── SEAFIN_PRODUCT_CATALOG_RESEARCH.md
│   └── custodian/          — Custodian backup product (ransomware protection roadmap)
└── website/                — Static marketing site (index.html + favicon)
```

## Products & Services

Four pillars defined in the services PRD:

- **BUILD** — Custom AI agents, KnowledgeClaw (RAG bots), SaaS dev, AI websites
- **AUTOMATE** — WorkClaw (workflow automation), document processing, AI analytics
- **CONNECT** — SupportClaw, ChatClaw, VoiceClaw, ContentClaw (hosted via OpenClaw platform)
- **PROTECT** — Custodian managed backup ($9-199/mo tiers)

## Website

Static single-page site at `website/index.html`. No build system — plain HTML/CSS/JS with Google Fonts. Favicon is `website/favicon.svg`.

## Key Context

- No git repo is initialized yet
- No test suite, build tools, or package manager at the root level
- The `elements/` component library has been removed — this is a docs/planning repo only
- Infrastructure target: DigitalOcean App Platform (~$200-300/yr)
- Revenue model: Seafin services (agents $5-25k, consulting $2-5k/mo), Solvity SaaS ($59-299/mo), Custodian managed backup ($9-199/mo)

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
wsl bash -c "source ~/.nvm/nvm.sh && agent-browser open file:///mnt/c/Projects/seafin/website/index.html"
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
