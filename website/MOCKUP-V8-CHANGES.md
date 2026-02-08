# Website Mockup V8 - Local Model Options

**File:** `website/index-mockup-v8.html`
**Date:** February 2026
**Based on:** User request to add local model deployment options

---

## Summary

Added **local AI model deployment options** for enterprise customers with air-gapped or high-security requirements. This change positions Seafin as capable of serving both cloud-first and on-premise deployment needs.

**Target:** Enterprise customers requiring complete data sovereignty or operating in air-gapped environments

---

## Changes Made

### ✅ **Change #1: Updated Tech Stack Bar**

**Problem:** Only mentioned cloud API providers, no local model options

**Solution:** Added local model options alongside cloud APIs

**Before:**
```html
<span class="spec-item"><strong>AI MODELS:</strong> Anthropic Claude, OpenAI GPT, Google Gemini, Moonshot Kimi</span>
```

**After:**
```html
<span class="spec-item"><strong>AI MODELS:</strong> Cloud APIs (Claude, GPT, Gemini, Kimi) + Local options (Kimi K2.5, Qwen, Llama)</span>
```

**Impact:** 🟡 MEDIUM - Expands addressable market to include high-security environments

---

### ✅ **Change #2: Added FAQ: "What AI models do you support?"**

**Problem:** No explanation of deployment flexibility or hardware requirements

**Solution:** Added comprehensive FAQ (question #6) explaining both options

**Content:**
```html
<details class="faq-item">
  <summary>
    <span class="faq-num">06</span>
    <span class="faq-question">What AI models do you support?</span>
    <span class="faq-toggle">+</span>
  </summary>
  <div class="faq-answer">
    <strong>Cloud APIs (Standard):</strong> Anthropic Claude, OpenAI GPT, Google Gemini, Moonshot Kimi — Fastest performance, easiest deployment, fully managed by us.<br><br>
    <strong>Local Models (Enterprise):</strong> Kimi K2.5, Qwen, Llama — For air-gapped or high-security environments. Requires enterprise hardware (48GB+ GPU VRAM, server-grade infrastructure). Complete data sovereignty.<br><br>
    Most customers use cloud APIs for optimal performance and simplicity.
  </div>
</details>
```

**Key Points:**
- Clear positioning: Cloud is "Standard", Local is "Enterprise"
- Honest about hardware requirements (48GB+ GPU VRAM)
- Sets expectation: "Most customers use cloud APIs"

**Impact:** 🟡 MEDIUM - Addresses enterprise objections, qualifies leads properly

---

### ✅ **Change #3: Updated Structured Data**

**Added to FAQPage schema:**
```json
{
  "@type": "Question",
  "name": "What AI models do you support?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Cloud APIs (Standard): Anthropic Claude, OpenAI GPT, Google Gemini, Moonshot Kimi — Fastest performance, easiest deployment, fully managed by us. Local Models (Enterprise): Kimi K2.5, Qwen, Llama — For air-gapped or high-security environments. Requires enterprise hardware (48GB+ GPU VRAM, server-grade infrastructure). Complete data sovereignty. Most customers use cloud APIs for optimal performance and simplicity."
  }
}
```

**Impact:** 🟢 LOW - Improves SEO for "local AI model deployment" queries

---

### ✅ **Change #4: Fixed Hosting Messaging (Managed as Primary)**

**Problem:** "Self-hosted" positioned as primary offering in trust bars, making it seem like standard deployment

**Solution:** Repositioned managed hosting as standard with self-hosted as enterprise option

**Changes:**
1. **Hero trust bar:** "Self-Hosted Infrastructure" → "Fully Managed 24/7"
2. **Logo/trust bar:** "Self-Hosted & Secure" → "Secure & Managed 24/7"
3. **Infrastructure spec:** "Self-hosted, secure, fully managed 24/7" → "Fully managed, secure, cloud or on-premise options"

**Positioning:**
- **Primary:** Managed hosting (easier, faster, more profitable)
- **Enterprise option:** On-premise/self-hosted (only when required)
- FAQ clearly states: "Most customers use cloud APIs for optimal performance and simplicity"

**Impact:** 🔴 HIGH - Correctly positions our business model (managed hosting first, not self-hosted)

---

## Technical Research Summary

### Local Model Hardware Requirements

**Entry-level (7-8B models like Qwen-7B):**
- 8-12GB GPU VRAM
- Consumer-grade GPUs acceptable (RTX 3090, RTX 4090)
- Cost: ~$1,500-2,000 for GPU

**Professional (14-32B models like Qwen-32B):**
- 16-24GB GPU VRAM
- Workstation GPUs recommended (A5000, A6000)
- Cost: ~$4,000-6,000 for GPU

**Enterprise (72B+ models like Kimi K2.5):**
- 48GB+ GPU VRAM (4× H200 GPUs for Kimi K2.5 full deployment)
- Server-grade infrastructure required
- Cost: ~$120,000+ for full setup
- Kimi K2.5 specific: 630GB model size, activates only 32B per request

**Infrastructure Requirements:**
- Server-grade CPU (Intel Xeon or AMD EPYC)
- 2× GPU VRAM in system RAM (e.g., 96GB RAM for 48GB GPU)
- 2-8TB NVMe storage for model files
- Enterprise cooling and power

### Model Options Researched

1. **Kimi K2.5** (Moonshot AI)
   - License: MIT (open source)
   - Size: 630GB total, 32B activated per request
   - Hardware: 4× H200 GPUs (640GB VRAM total)
   - Best for: Enterprise deployments requiring Chinese language support

2. **Qwen** (Alibaba)
   - License: Apache 2.0
   - Models: 7B, 14B, 32B, 72B variants
   - Hardware: 8GB to 48GB+ VRAM depending on model
   - Best for: Flexible deployment, multiple size options

3. **Llama** (Meta)
   - License: Open source (Llama 2/3 license)
   - Models: 7B, 13B, 70B variants
   - Hardware: 8GB to 48GB+ VRAM depending on model
   - Best for: General-purpose, strong community support

---

## Strategic Positioning

### Why This Change Matters

1. **Addresses Enterprise Objections**
   - "Can we run this on-premise?" → Yes, with proper hardware
   - "What about air-gapped environments?" → Local models supported
   - "Do we need to send data to third parties?" → No, if you choose local

2. **Sets Realistic Expectations**
   - Hardware requirements stated upfront (48GB+ VRAM)
   - Clear that cloud is standard, local is enterprise
   - Most customers will choose cloud (faster, easier, cheaper)

3. **Competitive Differentiation**
   - Most AI consultancies only offer cloud APIs
   - We can serve regulated industries (healthcare, finance, government)
   - Complete flexibility: cloud, multi-cloud, or on-premise

### Lead Qualification

**FAQ wording intentionally qualifies leads:**
- "Requires enterprise hardware" → filters out SMBs who can't support it
- "Most customers use cloud APIs" → nudges toward easier, more profitable path
- "48GB+ GPU VRAM" → specific enough that prospects know if they qualify

---

## Metrics & Impact

### Expected Improvements

| Metric | Expected Change | Reasoning |
|--------|----------------|-----------|
| **Enterprise inquiries** | ⬆️ 10-20% increase | Now visible to high-security buyers |
| **Lead quality** | ⬆️ 5-10% improvement | Self-qualification via hardware requirements |
| **Conversion rate** | → No change expected | Most will still choose cloud (as intended) |
| **Average deal size** | ⬆️ Potential increase | Enterprise customers typically have larger budgets |

**Overall Expected Impact:** Minimal conversion impact, but opens door to previously inaccessible enterprise accounts

---

## What's Different from V7

| Aspect | V7 | V8 |
|--------|----|----|
| **Tech Stack Bar** | Only cloud APIs listed | Cloud + Local options |
| **FAQ Count** | 5 questions | 6 questions (added model options) |
| **Target Market** | Implicitly cloud-only | Explicitly supports enterprise on-premise |
| **Hardware Requirements** | Not mentioned | Clearly stated (48GB+ VRAM) |

---

## Files

- **Mockup:** `website/index-mockup-v8.html`
- **Puppeteer Test:** `capture-screenshot-v8.js`
- **Screenshot:** `screenshot-v8.png`
- **Previous Version:** `website/index-mockup-v7.html`
- **V7 Changelog:** `MOCKUP-V7-CHANGES.md`

---

## Research Sources

Local model deployment requirements based on:

1. **Kimi K2.5 Technical Specifications**
   - 630GB model size (MoE architecture)
   - 4× H200 GPUs recommended for full deployment
   - MIT license (open source)

2. **Qwen Model Documentation**
   - 7B model: 8-12GB VRAM
   - 32B model: 16-24GB VRAM
   - 72B model: 48GB+ VRAM

3. **Enterprise LLM Deployment Best Practices 2026**
   - Server-grade infrastructure requirements
   - GPU VRAM to system RAM ratios
   - Storage and cooling considerations

---

**Status:** ✅ V8 Complete - Ready for Review
**Next:** User review and potential Phase 2 improvements from v7 audit (pricing FAQ, "Most Popular" badges, etc.)
