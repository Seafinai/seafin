/**
 * Email Classification API - Vercel Serverless Function
 * Multi-brand: accepts a `brand` slug to load brand-specific config.
 * Classifies incoming emails and generates auto-replies with booking links.
 * Auth: shared secret via apiKey field.
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const brands = require('./lib/brands.json');

// ============================================================================
// RATE LIMITING
// ============================================================================

const rateLimitStore = new Map();

const LIMITS = {
  requestsPerHour: 50,
  hourWindow: 3600000
};

function checkRateLimit(apiKey) {
  const now = Date.now();
  const key = `email:${apiKey}`;

  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, { requests: [] });
  }

  const record = rateLimitStore.get(key);
  record.requests = record.requests.filter(t => now - t < LIMITS.hourWindow);

  if (record.requests.length >= LIMITS.requestsPerHour) {
    const oldestRequest = record.requests[0];
    const resetIn = Math.ceil((oldestRequest + LIMITS.hourWindow - now) / 60000);
    return { allowed: false, reason: `Rate limit: ${LIMITS.requestsPerHour} emails/hour exceeded`, resetIn };
  }

  record.requests.push(now);
  return { allowed: true, remaining: LIMITS.requestsPerHour - record.requests.length };
}

// ============================================================================
// INPUT SANITIZATION (reused pattern from chat.js)
// ============================================================================

function sanitizeInput(text) {
  if (!text) return '';
  text = text.replace(/[\u200B\u200C\u200D\uFEFF\u2060]/g, '');
  text = text.replace(/[\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180E]/g, '');
  text = text.normalize('NFKC');
  text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');
  return text.trim();
}

// ============================================================================
// SYSTEM PROMPT
// ============================================================================

function getBrand(slug) {
  const brand = brands[slug || 'seafin'];
  if (!brand) return brands['seafin']; // fallback to seafin
  return brand;
}

function buildSystemPrompt(brand) {
  const servicesList = brand.services.map(s => `  - ${s}`).join('\n');

  return `You are an email classification assistant for ${brand.name}, ${brand.serviceDescription}.

Your job: Analyze an incoming email and return a JSON object with your classification.

=== ABOUT ${brand.name.toUpperCase()} ===
Tagline: "${brand.tagline}"
Target audience: ${brand.audience}
Services offered:
${servicesList}

=== CLASSIFICATIONS ===
- "lead" — Someone interested in buying services. They mention a business need, team size, budget, or project.
- "scheduling" — Someone trying to schedule a meeting, call, or demo that's already in progress (follow-up, rescheduling).
- "inquiry" — General question about ${brand.name}'s services, pricing, or capabilities. Not yet a strong lead.
- "spam" — Marketing, newsletters, automated notifications, cold outreach selling TO ${brand.name}, or irrelevant.
- "other" — Anything that doesn't fit above (personal, internal, support, etc).

=== EXTRACTION ===
Extract from the email:
- name: sender's first name (from email body greeting or email address)
- company: their company name if mentioned
- need: what they're looking for (1 sentence)
- urgency: "high" (ASAP/urgent language), "medium" (normal), "low" (casual/exploratory)
- employeeCount: number if mentioned, null otherwise

=== REPLY GENERATION ===
Generate a short, professional reply (3-5 sentences max):
- For "lead": Thank them, briefly acknowledge their need, include this booking link naturally: ${brand.bookingUrl}
- For "scheduling": Confirm interest, provide the booking link: ${brand.bookingUrl}
- For "inquiry": Answer briefly, mention ${brand.name}'s services, invite them to book a call: ${brand.bookingUrl}
- For "spam" or "other": Set suggestedReply to null

=== REPLY STYLE ===
- ${brand.tone}
- Never mention AI or automation in the reply process itself
- Sign off as "${brand.signOff}"
- Keep it concise — busy people appreciate short emails

=== OUTPUT FORMAT ===
Return ONLY valid JSON, no markdown fences, no explanation:
{
  "classification": "lead|scheduling|inquiry|spam|other",
  "confidence": 0.0-1.0,
  "extracted": {
    "name": "string or null",
    "company": "string or null",
    "need": "string or null",
    "urgency": "high|medium|low",
    "employeeCount": number or null
  },
  "suggestedReply": "string or null",
  "shouldBook": true/false
}`;
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { from, subject, body, apiKey, brand: brandSlug } = req.body;

    // --- AUTH ---
    const expectedKey = process.env.EMAIL_API_KEY;
    if (!expectedKey || apiKey !== expectedKey) {
      return res.status(401).json({ error: 'Unauthorized', success: false });
    }

    // --- VALIDATE INPUTS ---
    if (!from || !subject || !body) {
      return res.status(400).json({ error: 'Missing required fields: from, subject, body', success: false });
    }

    // --- RATE LIMIT ---
    const rateCheck = checkRateLimit(apiKey);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        error: rateCheck.reason,
        success: false,
        rateLimited: true,
        resetIn: rateCheck.resetIn
      });
    }

    // --- SANITIZE ---
    const cleanFrom = sanitizeInput(from).slice(0, 200);
    const cleanSubject = sanitizeInput(subject).slice(0, 500);
    const cleanBody = sanitizeInput(body).slice(0, 5000);

    // --- LOAD BRAND CONFIG ---
    const brand = getBrand(brandSlug);
    const systemPrompt = buildSystemPrompt(brand);

    const userMessage = `Classify this email:

From: ${cleanFrom}
Subject: ${cleanSubject}
Body:
${cleanBody}`;

    // --- CALL LLM ---
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://seafin.ai',
        'X-Title': 'Seafin Email Classifier'
      },
      body: JSON.stringify({
        model: 'moonshotai/kimi-k2.5',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 2000,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`AI service error ${response.status}: ${errBody.slice(0, 200)}`);
    }

    const data = await response.json();
    const llmReply = data.choices?.[0]?.message?.content;

    if (!llmReply || llmReply.trim().length === 0) {
      throw new Error(`Empty response from AI. Model: ${data.model || 'unknown'}, finish: ${data.choices?.[0]?.finish_reason || 'unknown'}, error: ${JSON.stringify(data.error || 'none')}`);
    }

    // --- PARSE JSON RESPONSE ---
    let parsed;
    try {
      // Strip markdown fences if present
      const jsonStr = llmReply.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      parsed = JSON.parse(jsonStr);
    } catch (parseErr) {
      console.error('Failed to parse LLM response:', llmReply);
      return res.status(500).json({
        error: 'Failed to parse classification',
        success: false
      });
    }

    // --- VALIDATE PARSED OUTPUT ---
    const validClassifications = ['lead', 'scheduling', 'inquiry', 'spam', 'other'];
    if (!validClassifications.includes(parsed.classification)) {
      parsed.classification = 'other';
    }

    if (typeof parsed.confidence !== 'number' || parsed.confidence < 0 || parsed.confidence > 1) {
      parsed.confidence = 0.5;
    }

    if (typeof parsed.shouldBook !== 'boolean') {
      parsed.shouldBook = parsed.classification === 'lead' || parsed.classification === 'scheduling';
    }

    // --- CALCULATE COST ---
    const usage = data.usage || {};
    const totalTokens = usage.total_tokens || 0;
    const cost = (totalTokens / 1000000) * 0.375;

    return res.status(200).json({
      success: true,
      brand: brand.slug,
      classification: parsed.classification,
      confidence: parsed.confidence,
      extracted: parsed.extracted || {},
      suggestedReply: parsed.suggestedReply || null,
      shouldBook: parsed.shouldBook,
      cost: Math.round(cost * 10000) / 10000
    });

  } catch (error) {
    console.error('Email classification error:', error);
    return res.status(500).json({
      error: 'Classification failed: ' + error.message,
      success: false
    });
  }
}
