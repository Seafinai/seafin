# Seafin.ai — AI Services Product Requirements Document

**Version:** 2.0
**Date:** February 2026
**Target Market:** Small-to-Mid-Market Businesses (25-500 employees)

---

## Organization Context

This document covers **Seafin's service offerings** — custom AI development, consulting, and managed services delivered by the Seafin team.

**Solvity** and **Custodian** are separate SaaS products developed by Seafin LLC, but custom implementations and enterprise clients are handled by Seafin's consulting team.

---

## Seafin Services

Seafin delivers custom AI solutions for businesses with 25-500 employees. We build five core products, each tailored to your specific needs:

---

### 1. Custom AI Assistants

24/7 AI agents built on the OpenClaw framework — persistent memory, multi-channel messaging (WhatsApp, Discord, Slack, Telegram, email), and proactive task execution.

**What we build:**
- Multi-step workflow automation agents
- 24/7 customer service assistants
- Lead qualification and routing systems
- Appointment scheduling agents
- Email triage and response automation
- After-hours support systems

**Key capabilities:**
- Runs 24/7 with persistent memory across conversations
- Multi-channel deployment (WhatsApp, Discord, Slack, email, SMS)
- Proactive behavior via scheduled tasks (cron jobs)
- Integrates with existing tools (CRM, email, calendars, databases)
- Escalates to humans when confidence is low

**Tech stack:** OpenClaw (TypeScript), Python + LangChain, PostgreSQL, OpenRouter (Claude/GPT), Docker, DigitalOcean

**Timeline:** 4-8 weeks depending on complexity
**Ongoing hosting:** $30-100/mo (DigitalOcean + LLM API usage)

**Best for:** Healthcare, real estate, professional services, e-commerce, hospitality

---

### 2. RAG Knowledge Bots

AI-powered knowledge base that answers questions using your actual business documents with zero hallucination.

**What we build:**
- Internal employee knowledge bases
- Customer-facing FAQ systems
- Policy and procedure lookup tools
- Product documentation assistants
- Contract and legal document search
- Training and onboarding assistants

**How it works:**
Documents → Chunking → Embeddings → Vector Database → Semantic Search → LLM Generation with Retrieved Context

**Key capabilities:**
- Ingests company docs (manuals, policies, FAQs, contracts, product catalogs)
- Users ask questions in plain English, get accurate grounded answers
- Auto-updates when documents change — no retraining needed
- Works internally (employee knowledge base) or customer-facing

**Tech stack:** Python + LangChain, pgvector (PostgreSQL), OpenRouter (Claude/GPT), FastAPI, Docker, DigitalOcean

**Timeline:** 2-4 weeks depending on document volume
**Ongoing hosting:** $12-30/mo (DigitalOcean + LLM API usage)

**Best for:** Legal firms, healthcare, SaaS, manufacturing, financial services

---

### 3. Custom Automation Tools & Dashboards

Focused web applications that automate specific workflows or provide AI-powered insights.

**What we build:**
- Lead qualification and scoring dashboards
- Document processing automation tools
- AI-powered analytics and forecasting dashboards
- Smart scheduling assistants
- Data entry and extraction automation
- Invoice and receipt processing systems

**AI features:**
- Natural language queries ("Show me all invoices over $5k from Q3")
- Predictive analytics (demand forecasting, churn prediction)
- Auto-categorization (tickets, expenses, documents)
- Anomaly detection (unusual transactions, patterns)
- Smart recommendations (next-best actions, prioritization)

**Tech stack:** Python/Next.js, PostgreSQL, Docker, DigitalOcean, OpenRouter (Claude/GPT)

**Timeline:** 2-6 weeks depending on scope
**Ongoing hosting:** $50-200/mo (DigitalOcean + LLM API usage)

**Best for:** Companies with 25-500 employees needing specific automation, not full enterprise platforms

---

### 4. AI Workflow Automation

Connect your existing tools and add AI intelligence using n8n — the cost-effective, self-hosted alternative to Zapier and Make.

**What we build:**
- Email triage and intelligent routing (sentiment analysis, intent classification)
- Support ticket analysis and auto-categorization
- Document processing pipelines (OCR + LLM extraction, validation, routing)
- Lead enrichment and scoring (research, data enrichment, CRM updates)
- Customer onboarding automation (sequences, tracking, Q&A)
- Contract and document review (key term extraction, risk flagging)
- Review monitoring and response generation

**How it works:**
n8n workflows connect your existing tools (email, CRM, databases, APIs) with AI models (Claude, GPT) to automate repetitive tasks. Unlike Zapier's per-task pricing, n8n charges per workflow execution — a complex 50-step workflow costs the same as a 2-step workflow.

**Why n8n:**
- 98% cheaper than Zapier for complex AI workflows
- Self-hosted on your infrastructure (data privacy for healthcare, legal, finance)
- Native Claude + GPT integration with drag-and-drop AI nodes
- Full customization with code nodes (Python, JavaScript)
- Built faster using Claude Code + n8n MCP integration

**Key time savings:**
- Email triage: 10-20 hrs/month
- Invoice processing: 20-40 hrs/month
- Data entry: 15-30 hrs/month
- Lead enrichment: 10-20 hrs/month
- Contract review: 10-30 hrs/month

**Tech stack:** n8n (self-hosted), Python + LangChain, OpenRouter (Claude/GPT), Docker, DigitalOcean

**Timeline:** 1-4 weeks depending on complexity
**Ongoing hosting:** $10-50/mo (DigitalOcean only, vs. $100-300/mo for Zapier)

**Best for:** Companies with 25-500 employees needing to connect existing tools, automate repetitive tasks, and add AI intelligence without expensive per-task pricing

---

### 5. AI-Integrated Websites

Modern websites with AI capabilities built in. We can build a complete site from scratch or add AI features to your existing site.

**What we build:**
- Full website design + development (or add to existing site)
- AI chatbot (FAQ, lead capture, product recommendations)
- Intelligent search (natural language product/content queries)
- Personalized content and product recommendations
- AI-powered contact forms and lead qualification
- SEO optimization
- Performance-optimized (targeting 95+ Lighthouse score)

**Tech stack:** Next.js, PostgreSQL, Docker, DigitalOcean, OpenRouter (Claude/GPT)

**Timeline:** 1-6 weeks depending on scope
**Ongoing hosting:** $12-50/mo (DigitalOcean + LLM API usage)

**Best for:** E-commerce, professional services, SaaS, DTC brands

---

## AI Models

**Models are configurable per client via OpenRouter** (supports Claude, GPT, Gemini, Llama, and 100+ models). We recommend the best model for your budget and use case.

**Common recommendations:**
- High-volume support: Claude Haiku 4.5, GPT-4o-mini (cost-efficient)
- Complex reasoning: Claude Sonnet 4.5, GPT-4o (best quality)
- Embeddings: OpenAI text-embedding-3-small (best cost/quality)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **AI Orchestration** | OpenClaw (TypeScript) for 24/7 agents |
| **Application Logic** | Python + LangChain |
| **Workflow Automation** | n8n (self-hosted) |
| **Frontend** | Next.js 15 + React + Tailwind CSS |
| **Database** | PostgreSQL + pgvector (vector storage) |
| **AI Models** | OpenRouter (Claude, GPT, Gemini, Llama) |
| **Deployment** | Docker + DigitalOcean App Platform |

---

## Getting Started

All projects are custom-quoted based on your specific needs, timeline, and complexity.

**Contact us for a free consultation:**
[Contact information TBD]

---

## Typical Client Journey

Most clients start small and expand as they see results:

### **Phase 1: Quick Win (1-4 weeks)**

Start with a focused project to prove value:
- **AI Workflow Automation (n8n)** — connect existing tools, automate repetitive tasks
- **RAG Knowledge Bot** — answer questions from your documents
- **Simple Custom Automation Tool** — solve one specific pain point

### **Phase 2: Core Solution (4-8 weeks)**

Build a more substantial AI system:
- **Custom AI Assistant (OpenClaw)** — 24/7 multi-channel agent
- **Custom SaaS Tool** — dedicated app for key workflow
- **AI-Integrated Website** — website with intelligent features

### **Phase 3: Expansion (ongoing)**

Add capabilities as needs grow:
- Additional workflows and automations
- New channels and integrations
- More sophisticated AI features
- Ongoing optimization and support

---

## Ongoing Costs

Most solutions cost **$10-200/mo** to run (DigitalOcean hosting + LLM API usage). We're transparent about these costs upfront.

**Typical hosting costs by service:**
- RAG Knowledge Bot: $12-30/mo
- OpenClaw AI Assistant: $30-100/mo
- n8n Workflow Automation: $10-50/mo
- Custom Automation Tool: $50-200/mo
- AI-Integrated Website: $12-50/mo

---

## TODO

### Website Implementation Tasks

- [ ] **Activate Google Analytics 4 Tracking**
  - Create GA4 property in Google Analytics dashboard
  - Obtain Measurement ID (format: G-XXXXXXXXXX)
  - Replace placeholder in `website/index.html` lines ~30 and ~38 with actual Measurement ID
  - Verify tracking is working using GA4 Realtime reports
  - **Status:** Code deployed, awaiting GA4 property creation

---

## License

Proprietary — Seafin LLC
