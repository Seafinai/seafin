/**
 * RAG Demo API Handler
 * Document Q&A demonstration using Claude's extended context
 */

import { validateCORS } from './_cors.js';
import { checkBudget, trackCost } from './_budget.js';
import { verifyAPIKeyExists, secureLog } from './_middleware.js';

const rateLimit = new Map();
const sessionLimits = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const limit = rateLimit.get(ip) || { count: 0, resetTime: now + 60000 };

  if (now > limit.resetTime) {
    limit.count = 0;
    limit.resetTime = now + 60000;
  }

  limit.count++;
  rateLimit.set(ip, limit);
  return limit.count <= 5; // Stricter for RAG (5/min)
}

function generateSessionId(req) {
  const userAgent = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  return `${ip}:${userAgent.slice(0, 50)}`;
}

function checkSessionLimit(sessionId) {
  const now = Date.now();
  const session = sessionLimits.get(sessionId);

  if (!session) {
    sessionLimits.set(sessionId, { count: 1, firstRequest: now });
    return true;
  }

  const hoursSinceFirst = (now - session.firstRequest) / (1000 * 60 * 60);
  if (hoursSinceFirst >= 24) {
    sessionLimits.set(sessionId, { count: 1, firstRequest: now });
    return true;
  }

  if (session.count >= 20) { // 20 RAG queries per day
    return false;
  }

  session.count++;
  return true;
}

function validateInput(text, maxLength) {
  if (!text || typeof text !== 'string') {
    throw new Error('Input is required');
  }

  if (text.length > maxLength) {
    throw new Error(`Input too long (max ${maxLength} characters)`);
  }

  return text.trim().slice(0, maxLength);
}

export default async function handler(req, res) {
  const startTime = Date.now();

  try {
    if (!validateCORS(req, res)) return;
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    if (!verifyAPIKeyExists(req, res)) return;

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please wait a moment.' });
    }

    const sessionId = generateSessionId(req);
    if (!checkSessionLimit(sessionId)) {
      return res.status(429).json({ error: 'Daily query limit reached.' });
    }

    checkBudget();

    const { document, question } = req.body;

    // Validate inputs
    const sanitizedDoc = validateInput(document, 10000); // 10k chars max for demo
    const sanitizedQuestion = validateInput(question, 500);

    // Call Claude with document context
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://seafin.ai',
        'X-Title': 'Seafin RAG Demo'
      },
      body: JSON.stringify({
        model: 'moonshot/kimi-k2-5',
        messages: [{
          role: 'user',
          content: `You are demonstrating RAG (Retrieval-Augmented Generation) for Seafin's KnowledgeClaw product.

**DOCUMENT CONTENT:**
${sanitizedDoc}

**USER QUESTION:**
${sanitizedQuestion}

**INSTRUCTIONS:**
1. Answer the question using ONLY information from the document above
2. If the answer isn't in the document, say "I don't see that information in the provided document"
3. Quote relevant parts of the document in your answer
4. Keep your answer concise (under 150 words)
5. Be helpful and accurate`
        }],
        max_tokens: 300,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      throw new Error('RAG service temporarily unavailable');
    }

    const data = await response.json();

    if (data.usage) {
      trackCost(data.usage.prompt_tokens, data.usage.completion_tokens);
    }

    const answer = data.choices[0].message.content;

    const responseTime = Date.now() - startTime;
    secureLog('rag_query_success', {
      ip,
      docLength: sanitizedDoc.length,
      questionLength: sanitizedQuestion.length,
      responseTime
    });

    return res.status(200).json({
      answer,
      metadata: {
        documentLength: sanitizedDoc.length,
        responseTime
      }
    });

  } catch (error) {
    secureLog('rag_query_error', {
      ip: req.headers['x-forwarded-for'] || 'unknown',
      error: error.message
    });

    if (error.message.includes('too long')) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({
      error: 'RAG demo temporarily unavailable. Please try again.'
    });
  }
}
