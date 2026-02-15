# Seafin Marketing Automation Plan

## Overview

Fully automated marketing across all Seafin LLC brands (Seafin, Solvity, Custodian) using a services-first approach. Custom code only where no service exists.

**Total cost: $12-31/month** for 100% automated marketing.

---

## Service Stack

### Core Services

| Function | Service | Cost | What It Does |
|---|---|---|---|
| **Orchestration** | n8n (self-hosted on DO) | $12/mo | Central brain. Runs all automated workflows on cron schedules. Visual editor. Unlimited executions. |
| **Social media** | Publer (or Ocoya) | Free-$19/mo | AI generates posts, schedules, publishes to LinkedIn/Twitter/Facebook/Instagram. Analytics. |
| **Lead database + outreach** | Apollo.io | Free | 210M contact database, 250 emails/day, 2 automated sequences, email finder, basic CRM. |
| **LinkedIn outreach** | Waalaxy | Free | 80 auto-connection requests/month + message sequences. $21/mo for 300/mo. |
| **CRM** | HubSpot | Free | Contact management, deal pipeline, email tracking, meeting scheduler, forms, reports. |
| **Transactional email** | Resend | Free | 3,000 emails/month. For auto-replies from email classifier. Modern API. |
| **Email classifier** | Custom (existing) | ~$0.60/mo | Multi-brand AI classification of incoming emails. Already built. |

### Optional Add-ons (later)

| Function | Service | Cost | When |
|---|---|---|---|
| LinkedIn analytics | Shield | $6/mo | When you want to track post performance |
| Social analytics | Metricool | Free | When you want cross-platform analytics |
| Email campaigns | Brevo | Free (300/day) | When you want newsletter/drip sequences |
| More LinkedIn volume | Waalaxy Pro | $21/mo | When 80 invites/mo isn't enough |

---

## Automation Flows

### Flow 1: Incoming Email Classification (already working, needs multi-brand)

```
Gmail (new email)
  → n8n trigger (or Gmail Apps Script)
  → POST /api/classify-email { brand: "seafin", from, subject, body }
  → AI classifies: lead / inquiry / scheduling / spam / other
  → IF lead or inquiry:
      → Create HubSpot contact (via n8n)
      → Send auto-reply via Resend (via n8n)
      → Notify you via Slack/email
  → IF spam/other:
      → Log and skip
```

### Flow 2: AI Content Generation + Social Posting

```
n8n cron (e.g., Mon/Wed/Fri 9am)
  → For each brand (Seafin, Solvity, Custodian):
      → Call OpenRouter AI with brand-specific prompt
      → Generate LinkedIn post, Twitter post, Facebook post
      → Push to Publer API (auto-schedules for optimal time)
  → Posts go live across all platforms automatically
```

### Flow 3: LinkedIn Outreach

```
Waalaxy (runs continuously):
  → Auto-visits target profiles
  → Sends connection requests with personalized note
  → Follow-up message sequence (day 3, day 7)
  → Interested prospects → manually move to HubSpot
```

### Flow 4: Email Outreach

```
Apollo.io (runs continuously):
  → Search contacts matching ICP (e.g., "CTO, 10-50 employees, US")
  → Add to email sequence
  → Automated follow-ups on day 2, 5, 10
  → Replies auto-detected
  → n8n syncs hot leads to HubSpot
```

### Flow 5: Lead Nurture

```
HubSpot (ongoing):
  → New contact created (from any flow above)
  → Pipeline stage: New → Contacted → Meeting → Proposal → Won/Lost
  → Email tracking on all outgoing emails
  → Meeting scheduler link in all communications
```

---

## Brand Configurations

### Seafin (AI Consulting)
- **Tone:** Professional, warm, direct. Not corporate.
- **Audience:** SMB owners/CTOs, 10-50 employees
- **Services:** Custom AI agents, RAG bots, workflow automation, AI consulting
- **Booking URL:** https://cal.com/seafin/intro
- **Sign-off:** "Rob at Seafin"
- **Social topics:** AI adoption for SMBs, automation ROI, case studies, industry trends

### Solvity (SaaS Platform)
- **Tone:** Friendly, product-focused, value-driven
- **Audience:** SMB operations managers, non-technical buyers
- **Services:** Self-service AI automation platform ($59-299/mo)
- **Booking URL:** https://cal.com/solvity/demo
- **Sign-off:** "The Solvity Team"
- **Social topics:** Product updates, automation tips, customer success stories

### Custodian (Managed Backup)
- **Tone:** Trustworthy, security-focused, reassuring
- **Audience:** SMB IT managers, compliance officers
- **Services:** Managed backup + ransomware protection ($9-199/mo)
- **Booking URL:** https://cal.com/custodian/consult
- **Sign-off:** "The Custodian Team"
- **Social topics:** Data security, ransomware stats, backup best practices, compliance

---

## Custom Code Required

### 1. Multi-brand email classifier (update existing)

**File:** `api/classify-email.js`
**Change:** Accept `brand` parameter in payload, load brand-specific config (tone, services, booking URL, sign-off), build system prompt dynamically.

### 2. Brand config file (new)

**File:** `api/lib/brands.json`
**Content:** Brand configs for Seafin, Solvity, Custodian (tone, services, booking URL, sign-off, audience).

### 3. Gmail Apps Script update

**File:** `tools/email-scheduler/gmail-script.js`
**Change:** Add `brand: 'seafin'` to API payload.

### That's it. No new repos, no dashboards, no databases.

---

## Setup Checklist

### Phase 1: Foundation (Week 1)
- [ ] Sign up for HubSpot Free — set up CRM pipeline for all 3 brands
- [ ] Sign up for Apollo.io Free — configure ICP filters for target prospects
- [ ] Sign up for Resend Free — verify seafin.ai domain for sending
- [ ] Update email classifier to multi-brand (custom code)
- [ ] Update Gmail Apps Script to send `brand: 'seafin'`

### Phase 2: Social Automation (Week 2)
- [ ] Sign up for Publer (or Ocoya) — connect LinkedIn, Twitter, Facebook for each brand
- [ ] Provision DigitalOcean droplet ($12/mo) — install n8n
- [ ] Build n8n workflow: AI content generation → Publer API
- [ ] Test: verify posts appear on all social channels

### Phase 3: Outreach (Week 3)
- [ ] Sign up for Waalaxy Free — connect LinkedIn account
- [ ] Configure Waalaxy connection sequences per brand
- [ ] Configure Apollo.io email sequences per brand
- [ ] Build n8n workflow: classified lead → HubSpot contact creation
- [ ] Build n8n workflow: Apollo.io reply → HubSpot update

### Phase 4: Full Automation (Week 4)
- [ ] Set n8n content generation to cron schedule (3x/week per brand)
- [ ] Enable auto-reply in Gmail Apps Script (set AUTO_REPLY_ENABLED: true)
- [ ] Build n8n weekly digest workflow (email summary of all activity)
- [ ] Monitor for 1 week, adjust content quality prompts
- [ ] Go fully autonomous

---

## Monthly Costs

### Minimum viable ($12/mo)
- n8n on DO: $12
- Publer Free: $0
- Apollo.io Free: $0
- Waalaxy Free: $0
- HubSpot Free: $0
- Resend Free: $0
- AI (OpenRouter): ~$1-2
- **Total: ~$14/mo**

### Comfortable ($50/mo)
- n8n on DO: $12
- Publer Pro: $12
- Apollo.io Free: $0
- Waalaxy Pro: $21
- HubSpot Free: $0
- Resend Free: $0
- AI (OpenRouter): ~$2
- Shield (LinkedIn analytics): $6
- **Total: ~$53/mo**

---

## Human Touchpoints (per week)

- **15 min/week:** Review AI-generated content queue in Publer, approve/tweak
- **10 min/week:** Check HubSpot for new hot leads, respond to high-priority ones
- **5 min/week:** Glance at n8n dashboard for failed workflows
- **Monthly (30 min):** Review analytics, adjust targeting, update messaging

**Target: <1 hour/week of human involvement** after initial 4-week setup.

---

## Services Evaluated and Rejected

| Service | Why Rejected |
|---|---|
| Hootsuite ($199/mo) | Too expensive |
| Sprout Social ($199/mo) | Too expensive |
| Buffer | No API available |
| SendGrid | No free tier (killed May 2025) |
| PhantomBuster ($69/mo) | Too expensive for LinkedIn |
| Jasper ($39/mo) | Overkill, OpenRouter is cheaper |
| Reddit automation | Platform bans marketers |
| Loomly ($65/mo) | No free tier |
| Custom dashboard | Services have their own UIs |
| Custom database | HubSpot + Apollo handle this |
| Separate marketing-engine repo | Not needed with services approach |

---

## Architecture Diagram

```
                    ┌─────────────────┐
                    │   n8n (brain)   │ $12/mo on DigitalOcean
                    │  Cron + Webhooks│
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                     │
        ▼                    ▼                     ▼
┌──────────────┐   ┌─────────────────┐   ┌──────────────┐
│  OpenRouter  │   │ Classify Email  │   │   Webhooks   │
│  (AI brain)  │   │   (custom API)  │   │  (triggers)  │
│  ~$2/mo      │   │   seafin repo   │   │              │
└──────┬───────┘   └────────┬────────┘   └──────┬───────┘
       │                    │                    │
       ▼                    ▼                    ▼
┌──────────────┐   ┌─────────────────┐   ┌──────────────┐
│   Publer     │   │    HubSpot      │   │   Resend     │
│ Social posts │   │   CRM + Leads   │   │  Auto-reply  │
│ Free-$19/mo  │   │     Free        │   │    Free      │
└──────────────┘   └─────────────────┘   └──────────────┘

┌──────────────┐   ┌─────────────────┐
│   Waalaxy    │   │   Apollo.io     │
│ LinkedIn     │   │  Email outreach │
│ outreach     │   │  + lead database│
│   Free       │   │     Free        │
└──────────────┘   └─────────────────┘
```

---

*Last updated: February 15, 2026*
*Decision: Services-first approach. Build only what no service can do (multi-brand AI email classification).*
