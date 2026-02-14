# Seafin.ai — Company Launch Plan

**Company:** Seafin LLC
**Domain:** seafin.ai (~$70/year on Cloudflare)
**Business:** AI consulting + custom agentic development + SaaS + web dev for SMBs
**Tagline:** "Custom AI for small business. Results in weeks, not months."

---

## What's Already Done

| Asset | Status | Location |
|-------|--------|----------|
| Brand identity (name, colors, typography, voice, messaging) | Done | `SEAFIN_BRAND_IDENTITY.md` |
| SMB market research ($254B opportunity, pain points, buying process) | Done | `SEAFIN_SMB_MARKET_RESEARCH.md` |
| Landing page copy (hero, pricing, FAQ, use cases, CTAs) | Done | `SEAFIN_LANDING_PAGE_COPY.md` |
| 10 landing page HTML variants | Done | `landing_pages/01-10_*.html` |
| 14 logo variants (React components, dark/light) | Done | `SEAFIN-COLLECTION-GUIDE.md` |
| Logo registered in Elements registry | Done | `SEAFIN-LOGO-REGISTRY-COMPLETE.md` |
| Custodian product roadmap (retention locks, anomaly detection) | Done | `products/custodian/RANSOMWARE_PROTECTION_ROADMAP.md` |
| Infrastructure cost estimates ($200-400/yr lean) | Done | `infrastructure/COST_BREAKDOWN.md` |
| Cloud backup market analysis ($25.97B TAM) | Done | `docs/MARKET_ANALYSIS.md` |
| Pricing model (agents $5-25k, consulting $2-5k/mo, SaaS $9-99/mo) | Done | `SEAFIN_BRAND_IDENTITY.md` |
| Revenue projections (Yr1 $150-200k, Yr2 $600-750k, Yr3 $1.5-2M) | Done | `SEAFIN_SMB_MARKET_RESEARCH.md` |
| Competitive positioning (vs freelancers, enterprise, offshore) | Done | `SEAFIN_BRAND_IDENTITY.md` |

---

## Phase 1: Legal & Business Formation (Week 1-2)

### Form the LLC
- [ ] Choose state of formation (home state or Wyoming/Delaware for cost/privacy)
- [ ] File LLC Articles of Organization with the state
- [ ] Get an EIN (Employer Identification Number) from IRS — free at irs.gov
- [ ] Draft and sign Operating Agreement (single-member LLC template is fine)
- [ ] Register for state business license if required
- [ ] Check if you need a local business permit or DBA

### Business Banking
- [ ] Open a business checking account (Mercury, Relay, or local credit union)
- [ ] Keep personal and business finances completely separate from day one
- [ ] Set up accounting (Wave — free, or QuickBooks Self-Employed)

### Insurance
- [ ] Get general liability insurance (look into Hiscox or Next Insurance, ~$500-1000/yr)
- [ ] Consider professional liability / E&O insurance for consulting work

**Estimated cost:** $50-500 (state filing fees vary) + ~$500/yr insurance

---

## Phase 2: Domain & Online Presence (Week 2-3)

### Domain Registration
- [ ] Register **seafin.ai** on Cloudflare (~$70/year)
- [ ] Configure DNS, DNSSEC, domain lock
- [ ] Set up email forwarding: hello@seafin.ai, support@seafin.ai

### Email
- [ ] Set up professional email (Google Workspace $6/mo or Zoho Mail free tier)
- [ ] Create email signature with logo, tagline, and booking link

### Landing Page Deployment
- [ ] Pick best landing page variant from the 10 HTML templates in `landing_pages/`
- [ ] Deploy to Vercel or GitHub Pages (free)
- [ ] Point seafin.ai DNS to deployment
- [ ] Test mobile responsiveness
- [ ] Add contact form (Formspree free tier or Tally)
- [ ] Add Calendly/Cal.com booking link for 15-min strategy calls
- [ ] Add basic analytics (Vercel Analytics or Plausible)

### Subdomain Plan (future)
```
seafin.ai              → main landing page
custodian.seafin.ai    → Custodian backup SaaS (when ready)
blog.seafin.ai         → content/resources (when ready)
```

**Estimated cost:** $70/yr domain + $0/mo hosting (Vercel free tier)

---

## Phase 3: Legal Templates & Sales Infrastructure (Week 3-4)

### Client Contracts
- [ ] Create a Master Services Agreement (MSA) template
- [ ] Create a Statement of Work (SOW) template for custom agent projects
- [ ] Create a consulting retainer agreement (month-to-month)
- [ ] Create Terms of Service for Custodian SaaS (when ready)
- [ ] Create Privacy Policy for seafin.ai (use a generator like Termly or iubenda)

> Tip: Start with templates from Bonsai, AND CO, or have an attorney review (~$500-1000 one-time)

### Invoicing & Payments
- [ ] Set up Stripe account for payments
- [ ] Connect Stripe to invoicing (Stripe Invoicing, or Wave)
- [ ] Define payment terms: 50% upfront / 50% on delivery for projects, monthly for retainers

### CRM & Pipeline
- [ ] Set up a lightweight CRM (HubSpot free, Attio free, or even a Notion board)
- [ ] Define pipeline stages: Lead → Discovery Call → Proposal → Signed → Building → Delivered
- [ ] Create proposal template (1-page: scope, timeline, cost, guarantee)

**Estimated cost:** $0-1000 (contracts template or attorney review)

---

## Phase 4: Service Offerings — Go Live (Week 4-6)

### Custom AI Agent Development (60% of revenue)

**Offer tiers (from brand identity doc):**

| Tier | Price | Timeline | Scope |
|------|-------|----------|-------|
| Quick Agent | $5-8k | 2-3 weeks | Single automation or integration |
| Standard Agent | $10-15k | 4-6 weeks | Complex workflow, 2-3 integrations |
| Complex Agent | $15-25k | 6-8 weeks | Multi-step, 3+ system integrations |

**To prepare:**
- [ ] Build 1-2 demo agents you can show prospects (e.g., a lead qualifier, a support bot)
- [ ] Write up 2-3 hypothetical case studies with ROI numbers (from landing page copy)
- [ ] Define your tech stack for agent delivery (Claude API, LangChain, custom, etc.)
- [ ] Create a project kickoff checklist (discovery → build → test → deliver → 30-day support)
- [ ] Set up a dev environment and deployment pipeline for client projects

### Consulting & Strategy (25% of revenue)

**Offer tiers:**

| Tier | Price | Hours/Week | Best For |
|------|-------|------------|----------|
| Advisory | $2k/mo | 3-4 hrs | Getting started, decisions |
| Strategic | $3-5k/mo | 6-8 hrs | Ongoing transformation |
| Leadership | $5k/mo | 10-12 hrs | Fractional CTO |

**To prepare:**
- [ ] Create a consulting engagement onboarding doc
- [ ] Define deliverables per tier (weekly calls, Slack access, quarterly plans, etc.)
- [ ] Prepare an AI readiness assessment template you can walk SMBs through

### SaaS — Custodian Backup (10% of revenue)

**Status:** Planning phase. No code yet.

**Tiers:**
- Free: 1 agent, 3 jobs, 7-day history
- Starter $9/mo: 5 agents, unlimited
- Team $29/mo: 25 agents, unlimited
- Business $99/mo: 100 agents, unlimited

**To build (later, Phase 6):**
- [ ] Python Flask backend + PostgreSQL (per roadmap)
- [ ] Retention locks (Phase 1 of roadmap, 4-6 hours)
- [ ] Anomaly detection with PyOD (Phase 2, 4-5 hours)
- [ ] Desktop/server agent for backup execution
- [ ] Deploy backend to hosting platform (e.g., DigitalOcean App Platform or Vercel)

### Web Development (5% of revenue)
- [ ] Define scope: modern apps with AI built in, $10-30k, 2-3 months
- [ ] Leverage Elements component library for faster delivery

---

## Phase 5: Customer Acquisition (Week 5+, Ongoing)

### Outbound — Get First 3-5 Clients

**Target: SMBs with 10-500 employees who have a specific pain point AI can solve.**

- [ ] Identify 50 local/online SMBs in 1-2 verticals (home services, e-commerce, professional services)
- [ ] Craft a cold outreach message (email + LinkedIn) focused on their specific pain point
- [ ] Offer free 15-minute strategy call (Calendly)
- [ ] Follow the sales process from brand doc:
  1. Discovery call (15 min) — "What's your biggest bottleneck?"
  2. Proposal (24 hours) — 1-page, clear scope/timeline/cost
  3. Pilot project (4-8 weeks) — deliver, show ROI
  4. Expand — retainer or next project

### Inbound — Build Pipeline Over Time

- [ ] Start a blog on seafin.ai (1-2 posts/month)
  - "How SMBs are using AI agents to cut support costs by 60%"
  - "Custom AI vs off-the-shelf: which is right for your business?"
  - "What AI agents actually cost in 2025 (honest pricing guide)"
- [ ] LinkedIn presence — post 2-3x/week about SMB + AI
- [ ] Prepare for Product Hunt / Hacker News launch (when Custodian SaaS is ready)
- [ ] Set up referral incentive (10-15% commission or $500 per referred client)

### Partnerships
- [ ] Connect with MSPs who serve SMBs (for Custodian resale)
- [ ] Connect with marketing agencies, design firms who don't do AI (referral partners)
- [ ] Join local business groups / chambers of commerce

**Target:** 10 paying customers in Year 1 (~$150-200k revenue)

---

## Phase 6: Build Custodian SaaS (Month 3-6)

This is the recurring revenue product. Build after landing first consulting/agent clients.

### MVP Scope (from existing roadmap)

- [ ] **Backend:** Python Flask app
- [ ] **Database:** PostgreSQL (managed, ~$12/mo)
- [ ] **Auth:** Self-managed (Flask-Login + bcrypt) to start
- [ ] **Core features:**
  - [ ] User registration, login, dashboard
  - [ ] Backup job configuration (source, destination, schedule)
  - [ ] Agent-based architecture (desktop/server agent executes backups)
  - [ ] Retention locks — prevent API-based deletion for N days
  - [ ] Basic anomaly detection (PyOD — size spikes, compression changes)
  - [ ] Audit logging
- [ ] **Deployment:** Cloud platform (Vercel, DigitalOcean, or similar)
- [ ] **Payments:** Stripe (4 tiers: Free, $9, $29, $99)
- [ ] **Landing page:** custodian.seafin.ai

### Implementation Order (from roadmap)
1. Retention locks (4-6 hours) — DB schema + lock validation + API endpoint
2. Anomaly detection (4-5 hours) — PyOD integration + metrics tracking
3. Incremental chain protection (2-3 hours) — prevent orphaned backup chains
4. Validation gates (5-7 hours, optional) — backup state machine

---

## Phase 7: Scale & Optimize (Month 6-12)

- [ ] Publish 2-3 real case studies with measurable ROI from delivered projects
- [ ] Identify best-performing vertical and double down
- [ ] Grow consulting retainer base to 3-5 active clients
- [ ] Evaluate: hire first contractor or part-time help?
- [ ] Upgrade monitoring if needed (Sentry $29/mo, Datadog $50/mo)
- [ ] Consider Custodian on Product Hunt / Hacker News launch
- [ ] Build repeatable agent templates from completed projects (speed up delivery)

---

## Financial Summary

### Startup Costs (One-Time)

| Item | Cost |
|------|------|
| LLC formation (state filing) | $50-500 |
| seafin.ai domain (Cloudflare, 1 year) | $70 |
| Business insurance (E&O + general liability) | $500-1000 |
| Contract templates (DIY or attorney) | $0-1000 |
| **Total** | **$620-2,570** |

### Monthly Operating Costs (Lean)

| Item | Cost |
|------|------|
| Website hosting (Vercel free tier) | $0 |
| Email (Google Workspace or Zoho) | $0-6 |
| CRM (HubSpot/Attio free) | $0 |
| Stripe fees (2.9% + $0.30/tx) | Variable |
| Custodian backend (when live) | $12 |
| Analytics (Plausible or Vercel) | $0-9 |
| **Total before Custodian** | **$0-15/mo** |
| **Total with Custodian** | **$12-27/mo** |

### Year 1 Revenue Targets (from market research)

| Service | Customers | Revenue |
|---------|-----------|---------|
| Custom AI agents (8-10 projects) | 8-10 | $80-120k |
| Consulting retainers (3-5 clients, avg 5 mo) | 3-5 | $25-50k |
| Custodian SaaS (50+ users) | 50+ | $5-10k |
| **Total Year 1** | | **$110-180k** |

### 3-Year Revenue Path

| Year | Revenue | Customers |
|------|---------|-----------|
| Year 1 | $150-200k | 10 SMB customers |
| Year 2 | $600-750k | 40-50 customers |
| Year 3 | $1.5-2M | 100+ customers |

---

## Key Metrics to Track

| Metric | Target |
|--------|--------|
| Discovery calls booked / month | 8-10 |
| Proposal → Signed conversion | 30-40% |
| Average project value | $12k |
| Average consulting retainer | $2.5k/mo |
| Customer satisfaction | 80%+ |
| Retainer churn (monthly) | <10% |
| Time from signed → delivered | 4-8 weeks |
| Custodian free → paid conversion | 10% |

---

## Critical Path — What to Do First

**This week:**
1. File LLC formation paperwork
2. Register seafin.ai on Cloudflare
3. Deploy best landing page variant to Vercel
4. Set up professional email (hello@seafin.ai)
5. Set up Calendly for strategy calls

**Next 2 weeks:**
6. Open business bank account
7. Create MSA + SOW templates
8. Set up Stripe
9. Build 1 demo agent to show prospects
10. Start outreach to first 20 SMBs

**Month 2-3:**
11. Land first paying client
12. Start blog content
13. Begin Custodian MVP development
14. Refine pitch based on discovery call feedback

---

## Existing Docs That Need Updating

These files previously referenced "Cloud Works LLC" and have been updated to Seafin:

- [x] `README.md` (root) — rewritten as Seafin company hub
- [x] `brand/BRANDING_STRATEGY.md` — rewritten with Seafin + Solvity two-brand architecture
- [x] `brand/MARKET_ANALYSIS.md` — updated company name references
- [x] `infrastructure/COST_BREAKDOWN.md` — updated company name and domain references
- [x] `products/custodian/RANSOMWARE_PROTECTION_ROADMAP.md` — updated "Cloud Works LLC" to "Seafin LLC"

---

*Last Updated: 2025-02-05*
*Status: Ready to execute*
