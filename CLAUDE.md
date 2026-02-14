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
├── api/                    — Serverless functions (Vercel)
│   ├── test.js             — Environment variable test
│   ├── chat.js             — AI chatbot
│   ├── analyze-form.js     — Smart form analyzer
│   ├── rag-query.js        — RAG demo
│   └── roi-calculator.js   — ROI calculator API
├── brand/                  — Brand identity, market research, launch plan, logo guides
├── infrastructure/         — Hosting cost breakdown
├── mockups/                — HTML mockups (landing page iterations)
├── products/               — Product PRDs and roadmaps
│   ├── SEAFIN_AI_SERVICES_PRD.md      — Master services PRD (BUILD/AUTOMATE/CONNECT/PROTECT)
│   ├── SEAFIN_PRODUCT_CATALOG_RESEARCH.md
│   └── custodian/          — Custodian backup product (ransomware protection roadmap)
└── website/                — Static marketing site + client-side JS
    ├── index.html
    ├── favicon.svg
    └── js/                 — AI feature modules
        ├── ai-features.js      — Module loader/orchestrator
        ├── chatbot-widget.js   — AI chatbot widget
        ├── roi-calculator.js   — ROI calculator UI
        ├── smart-form.js       — AI-powered contact form
        └── rag-demo.js         — RAG knowledge base demo
```

## Products & Services

Four pillars defined in the services PRD:

- **BUILD** — Custom AI agents, KnowledgeClaw (RAG bots), SaaS dev, AI websites
- **AUTOMATE** — WorkClaw (workflow automation), document processing, AI analytics
- **CONNECT** — SupportClaw, ChatClaw, VoiceClaw, ContentClaw (hosted via OpenClaw platform)
- **PROTECT** — Custodian managed backup ($9-199/mo tiers)

## Website

Static single-page site at `website/index.html`. No build system — plain HTML/CSS/JS with Google Fonts. Favicon is `website/favicon.svg`.

**AI Features:** The site includes a modular AI features system (`website/js/ai-features.js`) that loads chatbot, ROI calculator, smart form, and RAG demo as independent modules. Each module is self-contained with its own UI injection and API calls.

**Security Layers:** Input validation, rate limiting, cost controls, and prompt injection protection are implemented in the serverless functions. See `AI_SECURITY_BLUEPRINT.md` for the reusable security pattern.

## Deployment & Hosting

### Vercel

The website is hosted on **Vercel** with automatic deployment from GitHub.

**Configuration:**
- **Repository:** `Seafinai/seafin` (GitHub)
- **Branch:** `main` (auto-deploy enabled)
- **Root Directory:** `./`
- **Output Directory:** `website`
- **Framework:** Other (static HTML + serverless functions)

**Config file:** `vercel.json` (in repo root)

### Deployment Workflow

**Automated deployment:**
1. Make changes to `website/index.html`, `website/js/*.js`, or `api/*.js`
2. Commit changes to git
3. Push to `origin/main`
4. Vercel automatically detects the push
5. Builds and deploys in ~30-60 seconds
6. Live at: https://seafin.vercel.app (or custom domain)

**No manual deployment needed** — Vercel watches the GitHub repo and auto-deploys on push.

### Deployment Commands

Standard git workflow:
```bash
git add .
git commit -m "Description of changes

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
git push origin main
```

After push, Vercel auto-deploys in 30-60 seconds.

### Environment Variables

Set in Vercel dashboard (Settings → Environment Variables):
- `OPENROUTER_API_KEY` - OpenRouter API key for AI features
- `MAX_DAILY_COST` - Cost limit (e.g., "5")
- `NODE_ENV` - "production"

**No .env files needed** — Vercel injects them automatically.

### Serverless Functions

Functions are in `api/` (project root) using Next.js format:

```javascript
// api/function-name.js
export default async function handler(req, res) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  return res.status(200).json({ success: true });
}
```

Functions available at:
- `/api/test` - Environment variable test
- `/api/chat` - AI chatbot
- `/api/analyze-form` - Smart form analyzer
- `/api/rag-query` - RAG demo
- `/api/roi-calculator` - ROI calculator

### Cost

**Free tier** (Hobby plan):
- 100GB bandwidth/month
- Unlimited serverless function invocations
- Sufficient for most small-medium businesses

## Key Context

- Git repo initialized and connected to GitHub (`Seafinai/seafin`)
- Deployed to Vercel with auto-deploy from `main` branch
- Static HTML site + serverless functions (Next.js format)
- Environment variables managed in Vercel dashboard (no .env files in repo)
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
