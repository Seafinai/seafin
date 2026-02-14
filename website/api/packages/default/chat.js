/**
 * Chatbot API Handler
 * Conversational AI assistant for Seafin services
 */

import { validateCORS } from './_cors.js';
import { checkBudget, trackCost } from './_budget.js';
import { verifyAPIKeyExists, secureLog } from './_middleware.js';

const rateLimit = new Map();
const sessionLimits = new Map();
const conversationHistory = new Map(); // sessionId -> messages[]

function checkRateLimit(ip) {
  const now = Date.now();
  const limit = rateLimit.get(ip) || { count: 0, resetTime: now + 60000 };

  if (now > limit.resetTime) {
    limit.count = 0;
    limit.resetTime = now + 60000;
  }

  limit.count++;
  rateLimit.set(ip, limit);
  return limit.count <= 20; // More generous for chat (20/min)
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

  if (session.count >= 100) { // 100 chat messages per day
    return false;
  }

  session.count++;
  return true;
}

function validateInput(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('Message is required');
  }

  if (message.length > 500) {
    throw new Error('Message too long (max 500 characters)');
  }

  const dangerousPatterns = [
    /ignore\s+previous\s+instructions/i,
    /you\s+are\s+now/i,
    /system\s*:/i,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(message)) {
      throw new Error('Invalid input');
    }
  }

  return message.trim().slice(0, 500);
}

export async function main(req, res) {
  const startTime = Date.now();

  try {
    if (!validateCORS(req, res)) return;
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    if (!verifyAPIKeyExists(req, res)) return;

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ error: 'Too many messages. Please wait a moment.' });
    }

    const sessionId = generateSessionId(req);
    if (!checkSessionLimit(sessionId)) {
      return res.status(429).json({ error: 'Daily message limit reached.' });
    }

    checkBudget();

    const { message, conversationId } = req.body;
    const sanitized = validateInput(message);

    // Get or initialize conversation history
    const historyKey = conversationId || sessionId;
    let history = conversationHistory.get(historyKey) || [];

    // Limit history to last 10 messages (5 exchanges)
    if (history.length > 10) {
      history = history.slice(-10);
    }

    // Build messages for Claude
    const messages = [
      ...history,
      { role: 'user', content: sanitized }
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://seafin.ai',
        'X-Title': 'Seafin Chatbot'
      },
      body: JSON.stringify({
        model: 'moonshot/kimi-k2-5',
        messages: [{
          role: 'system',
          content: `You are a helpful AI assistant for Seafin, an AI consulting firm for small businesses.

**About Seafin:**
- Custom AI for small business
- Results in weeks, not months
- Services: Custom AI Assistants, RAG Knowledge Bots, Workflow Automation, Custom Tools
- Pricing: $2-25K depending on complexity
- Timeline: 1-8 weeks depending on project

**Your role:**
- Answer questions about Seafin's services
- Help visitors understand if AI can help their business
- Be friendly, concise, and professional
- If asked for a quote or to start a project, direct them to book a call
- Don't make up information - stick to what you know about Seafin

**Keep responses:**
- Under 100 words
- Friendly and conversational
- Focused on helping the visitor`
        }, ...messages],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('Chat service temporarily unavailable');
    }

    const data = await response.json();

    if (data.usage) {
      trackCost(data.usage.prompt_tokens, data.usage.completion_tokens);
    }

    const reply = data.choices[0].message.content;

    // Update conversation history
    history.push(
      { role: 'user', content: sanitized },
      { role: 'assistant', content: reply }
    );
    conversationHistory.set(historyKey, history);

    // Clean up old conversations (after 1 hour)
    setTimeout(() => {
      conversationHistory.delete(historyKey);
    }, 3600000);

    const responseTime = Date.now() - startTime;
    secureLog('chat_success', { ip, responseTime });

    return res.status(200).json({
      reply,
      conversationId: historyKey
    });

  } catch (error) {
    secureLog('chat_error', {
      ip: req.headers['x-forwarded-for'] || 'unknown',
      error: error.message
    });

    return res.status(500).json({
      error: 'Chat temporarily unavailable. Please try the contact form.'
    });
  }
}
