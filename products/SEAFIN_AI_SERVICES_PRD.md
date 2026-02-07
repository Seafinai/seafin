# Seafin.ai — AI Services Product Requirements Document

**Version:** 1.1
**Date:** February 2026
**Target Market:** Small-to-Medium Businesses (1-50 employees)

---

## Organization Context

This document covers **Seafin services** — custom AI development, consulting, and managed services delivered by the Seafin team under four pillars (BUILD/AUTOMATE/CONNECT/PROTECT).

For the **Solvity** self-service AI automation platform (SaaS), see the separate repo at `seafinai/solvity`. Solvity is Seafin LLC's product brand — its Custom Solutions path is fulfilled by the Seafin consulting team described here.

---

## Service Architecture

Seafin delivers AI through four pillars, each containing specific product offerings. The **OpenClaw** platform powers all hosted, always-on AI workers across BUILD and CONNECT.

```
SEAFIN.AI
├── BUILD — Custom AI development (one-time projects)
│   ├── Custom AI Agents
│   ├── KnowledgeClaw (RAG Knowledge Bots)
│   ├── SaaS App Development
│   └── AI-Integrated Websites
│
├── AUTOMATE — Workflow automation (project + retainer)
│   ├── WorkClaw (Workflow Automation)
│   ├── Document Processing
│   └── AI Analytics & BI
│
├── CONNECT — Customer-facing AI (project + monthly) — OpenClaw Hosted Workers
│   ├── SupportClaw (24/7 Support Bots)
│   ├── ChatClaw (Multi-Channel Chatbots)
│   ├── VoiceClaw (Voice AI Agents)
│   └── ContentClaw (AI Content & Marketing)
│
└── PROTECT — Managed services (monthly subscription)
    ├── Custodian Starter ($9/mo — self-service)
    ├── Custodian Pro ($49/mo — managed)
    └── Custodian Enterprise ($199/mo — full support)
```

---

## OpenClaw Platform — Hosted 24/7 AI Workers

**OpenClaw** is Seafin's branded hosted AI worker platform. Every OpenClaw bot is:

- **Built** by Seafin around the client's specific business
- **Hosted** on managed infrastructure (client pays no server bills)
- **Always on** — runs 24/7/365 with monitoring and auto-recovery
- **Managed** — we handle updates, scaling, and optimization

OpenClaw workers span multiple pillars:

| Claw Worker | Pillar | What It Does | Setup | Monthly Hosting |
|-------------|--------|-------------|-------|----------------|
| SupportClaw | CONNECT | 24/7 customer support, FAQ, scheduling, lead qualification | From $2k | $50-350/mo |
| VoiceClaw | CONNECT | Phone AI — natural voice, scheduling, after-hours support | From $2k | $100-700/mo |
| ChatClaw | CONNECT | Omni-channel bot — website, WhatsApp, SMS, social, email | From $1k | $50-500/mo |
| WorkClaw | AUTOMATE | Email triage, doc processing, report generation, data entry | From $2k | $20-200/mo |
| KnowledgeClaw | BUILD | RAG bot — answers from your docs, zero hallucination | From $3k | $25-400/mo |
| ContentClaw | CONNECT | AI content pipeline — blog, social, email, SEO on autopilot | From $2k | $50-300/mo |

**Models used:** Claude Haiku 4.5 (high-volume support), Claude Sonnet 4.5 (complex reasoning), GPT-4o-mini (budget operations)

**Tech stack:** LangChain / LlamaIndex, Supabase, n8n orchestration, Botpress (no-code option), custom Next.js dashboards

**Entry point:** $1k setup (single-channel ChatClaw) — lowest barrier to deploy an always-on AI worker

---

## BUILD Pillar — Custom AI Development

### 1. Custom AI Agents
Purpose-built AI agents designed around specific business workflows.

**What it does:**
- Automates multi-step business processes (lead qualification, intake, scheduling)
- Integrates with existing tools (CRM, email, databases, APIs)
- Learns from business data to make context-aware decisions
- Escalates to humans when confidence is low

**Models used:** Claude Haiku 4.5 (high-volume), Claude Sonnet 4.5 (complex reasoning), GPT-4o-mini (budget)

**Tech stack:** LangChain / LlamaIndex, Supabase, Next.js, n8n for orchestration

**Pricing:** From $5,000 (simple single-workflow agent) to $25,000+ (multi-system)
**Timeline:** 4-8 weeks
**Ongoing cost to client:** $50-300/mo (API + hosting)

**Best for:** Healthcare clinics, real estate, professional services, e-commerce

---

### 2. KnowledgeClaw — RAG Knowledge Bots
AI bots that answer questions using your actual business documents — no hallucination. Hosted 24/7 via OpenClaw.

**What it does:**
- Ingests company docs (manuals, policies, FAQs, contracts, product catalogs)
- Users ask questions in plain English, get accurate grounded answers
- Auto-updates when documents change — no retraining needed
- Works internally (employee knowledge base) or customer-facing

**How it works:**
```
Your Documents → Chunking → Embeddings → Vector Database
                                              ↓
User Question → Semantic Search → Retrieved Context + LLM → Accurate Answer
```

**Models used:** OpenAI text-embedding-3-small (embeddings), Claude Sonnet 4.5 or GPT-4o (generation)

**Tech stack:** LlamaIndex (retrieval), pgvector or Pinecone (vectors), Supabase, Next.js

**Pricing:** From $3,000 (single-source, <100 pages) to $25,000 (multi-source, hybrid search)
**Timeline:** 2-8 weeks
**Ongoing cost to client:** $25-400/mo

**Best for:** Legal firms, healthcare, SaaS, manufacturing, financial services

---

### 3. AI-Powered SaaS Apps
Custom web applications with AI built in from day one.

**What we build:**
- CRM with AI lead scoring and next-best-action suggestions
- Inventory management with demand forecasting
- Automated invoicing with OCR and anomaly detection
- AI-powered scheduling with conflict resolution
- Customer feedback analysis dashboards
- Document management with smart search and auto-tagging
- Field service management with route optimization

**AI features embedded:**
- Natural language queries ("Show me all invoices over $5k from Q3")
- Predictive analytics (churn, demand, revenue forecasting)
- Auto-categorization (tickets, expenses, documents)
- Smart recommendations (products, actions, content)
- Anomaly detection (unusual transactions, usage patterns)

**Tech stack:** Next.js 15, Supabase (PostgreSQL + Auth + Storage), Vercel, Stripe, Claude/GPT-4o API

**Pricing:**
| Tier | Scope | Price | Timeline |
|------|-------|-------|----------|
| MVP | 1-2 AI features, basic CRUD | $5,000-15,000 | 2-4 weeks |
| Standard | 3-5 AI features, integrations, billing | $15,000-40,000 | 4-8 weeks |
| Complex | Full platform, multi-tenant, analytics | $40,000-100,000 | 8-16 weeks |

**Ongoing cost to client:** $75-500/mo (hosting + AI API)

**Best for:** Professional services, e-commerce, healthcare, construction, logistics

---

### 4. AI-Integrated Websites
Modern web platforms with AI capabilities woven in from the start.

**What it includes:**
- Custom responsive website design and development
- AI chatbot integration (FAQ, lead capture, product recommendations)
- Intelligent search (natural language product/content search)
- Recommendation engine (personalized content/products)
- SEO optimization with AI-powered content
- Performance-optimized architecture (95+ Lighthouse score)

**Tech stack:** Next.js, Supabase, Vercel, Botpress or custom LLM chatbot

**Pricing:** From $10,000 (website + single AI feature) to $40,000+ (full AI-integrated platform)
**Timeline:** 6-12 weeks
**Ongoing cost to client:** $50-300/mo

**Best for:** E-commerce, DTC brands, professional services, SaaS

---

## AUTOMATE Pillar — Workflow & Data Intelligence

### 5. Workflow Automation
Connect existing tools and add AI intelligence to eliminate repetitive tasks.

**Workflows we automate:**

| Workflow | What AI Does | Monthly Time Saved |
|----------|-------------|-------------------|
| Email triage & routing | Classifies intent, routes to right person | 10-20 hrs |
| Invoice processing | OCR + LLM extracts data, matches to POs | 20-40 hrs |
| Data entry | Extracts info from forms/emails into CRM | 15-30 hrs |
| Report generation | Auto-generates weekly/monthly reports | 5-15 hrs |
| Lead enrichment | Researches new leads, scores quality | 10-20 hrs |
| Contract review | Extracts key terms, flags risks | 10-30 hrs |
| Customer onboarding | Sends sequences, tracks completion | 10-15 hrs |

**Tech stack:** n8n (primary — 98% cheaper than Zapier for complex workflows), Make, custom Python

**Pricing:** From $2,000 (3-5 simple automations) to $25,000 (10-20 AI-powered workflows)
**Timeline:** 1-4 weeks
**Ongoing cost to client:** $20-200/mo

---

### 6. Document Processing (OCR + AI)
Turn paper and PDF documents into structured, searchable data.

**What it does:**
- Scans invoices, receipts, contracts, forms
- Extracts data with 99%+ accuracy (OCR + LLM)
- Auto-categorizes and routes documents
- Flags anomalies and discrepancies

**Cost comparison:**
| Method | Accuracy | Cost per Document |
|--------|----------|------------------|
| Manual processing | Variable | $12-20 |
| OCR only | 85-95% | $0.01-0.05 |
| OCR + LLM (what we build) | 99%+ | $0.10-1.00 |

**Tech stack:** Google Document AI / Azure AI, Claude Vision for complex docs, n8n orchestration

**Pricing:** Included in Workflow Automation engagements
**Best for:** Accounting, legal, healthcare, logistics

---

### 7. AI Analytics & Business Intelligence
Ask your data questions in plain English. Get answers, charts, and predictions.

**What it does:**
- Natural language querying ("What were our top products last quarter?")
- Predictive analytics (demand forecasting, churn prediction, revenue projection)
- Automated anomaly detection (unusual sales, expense patterns)
- Auto-generated dashboards and reports

**Prediction accuracy ranges:**
- Demand forecasting: 80-95%
- Churn prediction: 75-90%
- Revenue forecasting: 80-90%
- Lead scoring: 70-85%

**Tech stack:** Metabase or custom Next.js dashboard, Claude/GPT-4o query layer, Chart.js/Recharts

**Pricing:** From $3,000 (Metabase setup) to $50,000 (custom AI analytics platform)
**Timeline:** 1-8 weeks
**Ongoing cost to client:** $50-400/mo

**Best for:** Retail, SaaS, healthcare, manufacturing, restaurants

---

## CONNECT Pillar — Customer-Facing AI (OpenClaw Hosted Workers)

### 8. SupportClaw — 24/7 AI Support Bots
Always-on customer service that never sleeps. Hosted and managed via the OpenClaw platform.

**What it handles:**
- FAQ resolution (product info, policies, hours, pricing)
- Order tracking (Shopify, WooCommerce, CRM integration)
- Appointment scheduling (calendar API integration)
- Lead qualification (qualifying questions, contact capture, sales routing)
- Complaint triage (sentiment detection, escalation)
- Product recommendations (based on history/preferences)

**Deployment options:**
| Option | Setup Cost | Monthly Cost | Best For |
|--------|-----------|-------------|----------|
| No-code platform (Botpress/Tidio) | $2,000-8,000 | $50-350/mo | Most SMBs |
| Custom-built | $10,000-50,000 | $100-600/mo | Full control |
| Enterprise platform (Intercom) | $5,000-15,000 | $300-2,000/mo | Scaling teams |

**Models used:** Claude Haiku 4.5 (cost-efficient) or GPT-4o-mini (ultra-cheap)
**Timeline:** 1-8 weeks

**Best for:** E-commerce, healthcare, real estate, professional services, hospitality

---

### 9. ChatClaw — Multi-Channel Chatbots
One bot, every channel — website, WhatsApp, SMS, Messenger, Instagram, email. Hosted via OpenClaw.

**Channels supported:**

| Channel | Platform | Monthly Add-on |
|---------|----------|---------------|
| Website widget | Botpress, Tidio, custom | Included |
| WhatsApp Business | Respond.io, Manychat, Botpress | $50-300/mo |
| Facebook Messenger | Manychat, Botpress | $15-100/mo |
| SMS | Twilio + custom | $50-200/mo + per-message |
| Instagram DM | Manychat, Respond.io | $15-100/mo |
| Email | Custom + LLM | $50-200/mo |
| Slack / Teams | Botpress, custom | $0-100/mo |

**Hybrid approach:** Rules for critical paths (ordering, scheduling) + LLM for open-ended questions. Best of both worlds.

**Pricing:** From $1,000 (single-channel setup) to $40,000 (omni-channel with CRM integration)
**Timeline:** 1-8 weeks
**Ongoing cost to client:** $50-500/mo

**Best for:** E-commerce, restaurants, real estate, healthcare, hospitality

---

### 10. VoiceClaw — Voice AI Agents
AI that answers your phone — 24/7, natural-sounding, context-aware. Hosted via OpenClaw.

**What it handles:**
- Inbound call answering (hours, availability, basic requests)
- Appointment scheduling by phone
- Lead qualification (budget, timeline, needs assessment)
- Outbound reminders (appointments, follow-ups)
- After-hours support (message taking, emergency routing)
- Order status lookups

**Platforms:**

| Platform | Cost/Minute | Best For |
|----------|------------|----------|
| Retell AI | $0.07/min | Healthcare, real estate |
| Bland.ai | $0.09/min | Self-hosted option |
| Vapi | $0.14/min | Maximum customization |
| Synthflow | ~$0.10-0.15/min | Quick no-code deploy |

**Pricing:** From $2,000 (no-code setup) to $20,000 (custom multi-flow system)
**Timeline:** 1-6 weeks
**Ongoing cost to client:** $100-700/mo (usage-based)

**Best for:** Healthcare, dental, real estate, home services, legal, restaurants

---

### 11. ContentClaw — AI Content & Marketing
Automated content creation, email marketing, social media, and SEO. Hosted via OpenClaw.

**What we set up:**

| Service | What It Does | Build Cost | Monthly Run |
|---------|-------------|-----------|-------------|
| Content pipeline | Automated blog + social generation | $3,000-10,000 | $50-200/mo |
| Email marketing | Klaviyo/Mailchimp with AI personalization | $2,000-8,000 | $20-200/mo |
| SEO content system | AI briefs + generation + optimization | $5,000-15,000 | $50-300/mo |
| Social automation | Calendar, auto-posting, analytics | $2,000-8,000 | $30-150/mo |
| Full marketing suite | All of the above integrated | $10,000-30,000 | $100-500/mo |

**Timeline:** 1-8 weeks

**Best for:** E-commerce, professional services, restaurants, healthcare, real estate

---

## PROTECT Pillar — Custodian Managed Services

### 12. Custodian Backup & Monitoring

Three-tier managed service for ongoing AI system and infrastructure care.

| Tier | Price | What's Included |
|------|-------|----------------|
| **Custodian Starter** | $9/mo | Automated daily backups, monitoring dashboard, self-service alerts, 99.9% uptime SLA |
| **Custodian Pro** | $49/mo | Everything in Starter + monthly health check, email support, performance reports, 4hr response SLA |
| **Custodian Enterprise** | $199/mo | Everything in Pro + dedicated account manager, proactive monitoring, quarterly strategy reviews, 1hr response SLA, phone support |

**Note:** Starter tier is fully automated (zero human touch) — functions as client acquisition tool. Revenue lives in Pro and Enterprise tiers.

**Tech stack:** Automated monitoring scripts, encrypted backup pipeline, Supabase dashboard

---

## AI Models Reference

Models we use and when:

| Use Case | Primary Model | Fallback | Why |
|----------|--------------|----------|-----|
| Customer support (high volume) | Claude Haiku 4.5 ($1/$5 per 1M) | GPT-4o-mini ($0.15/$0.60) | Fast, cheap, good quality |
| RAG / complex reasoning | Claude Sonnet 4.5 ($3/$15) | GPT-4o ($5/$15) | Nuanced document understanding |
| Document summarization | Gemini 2.5 Flash ($0.15/$0.60) | Claude Haiku 4.5 | Cost-efficient bulk processing |
| Long document analysis | Gemini 2.5 Pro ($1.25/$10) | — | 1M+ token context window |
| Code generation | Claude Sonnet 4.5 | GPT-4o | Best coding capabilities |
| Privacy-sensitive data | Llama 3.1 70B (self-hosted) | Mistral 7B | Data never leaves client servers |
| Budget bulk processing | DeepSeek R1 ($0.14/$0.56) | GPT-4o-mini | Cheapest reasoning model |
| Embeddings | OpenAI text-embedding-3-small ($0.02/1M) | BGE-large (free, self-hosted) | Best cost/quality ratio |

**Fine-tuning policy:** We recommend RAG + prompt engineering for 90% of use cases. Fine-tuning only when task is highly repetitive and specialized (typical cost: $1,000-5,000 for LoRA fine-tune).

---

## Pricing Summary

### One-Time Projects (BUILD + AUTOMATE + CONNECT)

| Service | Starting Price | Typical Range | Timeline |
|---------|---------------|---------------|----------|
| Custom AI Agent | $5,000 | $5,000-25,000 | 4-8 wk |
| RAG Knowledge Bot | $3,000 | $3,000-25,000 | 2-8 wk |
| SaaS App (MVP) | $5,000 | $5,000-100,000 | 2-16 wk |
| AI Website | $10,000 | $10,000-40,000 | 6-12 wk |
| Workflow Automation | $2,000 | $2,000-25,000 | 1-4 wk |
| AI Analytics | $3,000 | $3,000-50,000 | 1-8 wk |
| 24/7 Support Bot | $2,000 | $2,000-50,000 | 1-8 wk |
| Multi-Channel Chatbot | $1,000 | $1,000-40,000 | 1-8 wk |
| Voice AI Agent | $2,000 | $2,000-20,000 | 1-6 wk |
| AI Marketing Setup | $2,000 | $2,000-30,000 | 1-8 wk |

### Ongoing Retainers

| Service | Monthly |
|---------|---------|
| AI Consulting / Strategy | From $2,000/mo |
| Custodian Starter | $9/mo |
| Custodian Pro | $49/mo |
| Custodian Enterprise | $199/mo |

### Client Ongoing Costs (post-build)
Most solutions cost the client $50-500/mo to run (hosting + AI API costs). We are transparent about these costs upfront.

---

## Entry Points & Upsell Path

```
FREE: 15-min Discovery Call
  ↓
$1,000-5,000: Quick Win (ChatClaw, single automation, simple bot)
  ↓
$5,000-25,000: Core Project (AI agent, KnowledgeClaw, website)
  ↓
$50-700/mo: OpenClaw Hosted Workers (SupportClaw, VoiceClaw, WorkClaw)
  ↓
$2,000/mo: Ongoing Consulting Retainer
  ↓
$9-199/mo: Custodian Managed Services
  ↓
$25,000-100,000: Strategic Build (SaaS app, enterprise platform)
```

Sweet spot for landing new SMB clients: **$1,000-5,000 first OpenClaw deployment** — low barrier to get a 24/7 AI worker running, then upsell into larger builds and retainers.
