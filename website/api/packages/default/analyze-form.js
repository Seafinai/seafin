/**
 * Smart Contact Form API Handler - DigitalOcean Functions Format
 * Analyzes user inquiries and suggests appropriate Seafin services
 *
 * Security: Rate limiting, input validation, CORS, budget monitoring
 */

import { checkBudget, trackCost } from './_budget.js';
import { verifyAPIKeyExists, secureLog } from './_middleware.js';

// Rate limiting: IP-based tracking
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
  return limit.count <= 10;
}

function generateSessionId(headers) {
  const userAgent = headers['user-agent'] || '';
  const ip = headers['x-forwarded-for'] || 'unknown';
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

  if (session.count >= 50) return false;
  session.count++;
  return true;
}

function validateInput(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('Message is required');
  }
  if (message.length < 20) throw new Error('Message too short (minimum 20 characters)');
  if (message.length > 2000) throw new Error('Message too long (maximum 2000 characters)');

  const dangerousPatterns = [
    /ignore\s+previous\s+instructions/i,
    /you\s+are\s+now/i,
    /system\s*:/i,
    /forget\s+everything/i
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(message)) throw new Error('Invalid input detected');
  }

  return message.trim().replace(/[\x00-\x1F\x7F]/g, '').slice(0, 2000);
}

/**
 * DigitalOcean Functions Handler
 * @param {Object} event - { http: { method, headers, path }, ...requestBody }
 */
export async function main(event) {
  const startTime = Date.now();
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    // Handle OPTIONS preflight
    if (event.http.method === 'OPTIONS') {
      return { statusCode: 200, headers };
    }

    // Method check
    if (event.http.method !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: { error: 'Method not allowed' }
      };
    }

    // API key check
    if (!process.env.OPENROUTER_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: { error: 'API configuration error' }
      };
    }

    // Rate limiting
    const ip = event.http.headers['x-forwarded-for'] || 'unknown';
    if (!checkRateLimit(ip)) {
      secureLog('rate_limit_exceeded', { ip });
      return {
        statusCode: 429,
        headers,
        body: { error: 'Rate limit exceeded. Please wait 60 seconds.', retryAfter: 60 }
      };
    }

    // Session limits
    const sessionId = generateSessionId(event.http.headers);
    if (!checkSessionLimit(sessionId)) {
      secureLog('session_limit_exceeded', { ip });
      return {
        statusCode: 429,
        headers,
        body: { error: 'Daily limit reached. Please try again tomorrow.', retryAfter: 86400 }
      };
    }

    // Budget check
    checkBudget();

    // Input validation - event body fields become top-level properties
    const message = event.userInput || event.message;
    const sanitized = validateInput(message);

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://seafin.ai',
        'X-Title': 'Seafin Smart Form'
      },
      body: JSON.stringify({
        model: 'moonshot/kimi-k2-5',
        messages: [{
          role: 'user',
          content: `You are a business consultant for Seafin, an AI consulting firm. Analyze this inquiry and suggest the most appropriate service.

**Available Services:**
1. **Custom AI Assistants** - Timeline: 4-8 weeks, Budget: $5-25K
2. **RAG Knowledge Bots** - Timeline: 2-4 weeks, Budget: $2-5K
3. **Custom Automation Tools** - Timeline: 2-6 weeks, Budget: $5-25K
4. **AI Workflow Automation** - Timeline: 1-4 weeks, Budget: $2-5K

**Customer Inquiry:** "${sanitized}"

Return ONLY valid JSON: {"service": "Service Name", "timeline": "X-Y weeks", "budget": "$X-YK"}`
        }],
        max_tokens: 150,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      throw new Error('AI service temporarily unavailable');
    }

    const data = await response.json();

    // Track costs
    if (data.usage) {
      trackCost(data.usage.prompt_tokens, data.usage.completion_tokens);
    }

    // Parse AI response
    const content = data.choices[0].message.content.trim();
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const suggestion = JSON.parse(jsonMatch ? jsonMatch[0] : content);

    if (!suggestion.service || !suggestion.timeline || !suggestion.budget) {
      throw new Error('Incomplete AI response');
    }

    const responseTime = Date.now() - startTime;
    secureLog('analyze_form_success', { ip, messageLength: sanitized.length, responseTime });

    return {
      statusCode: 200,
      headers,
      body: suggestion
    };

  } catch (error) {
    const responseTime = Date.now() - startTime;
    secureLog('analyze_form_error', {
      ip: event.http.headers['x-forwarded-for'] || 'unknown',
      error: error.message,
      responseTime
    });

    if (error.message.includes('budget')) {
      return {
        statusCode: 503,
        headers,
        body: { error: 'AI features temporarily disabled due to high demand. Please try again later.' }
      };
    }

    if (error.message.includes('Invalid input')) {
      return {
        statusCode: 400,
        headers,
        body: { error: 'Invalid input. Please check your message and try again.' }
      };
    }

    return {
      statusCode: 500,
      headers,
      body: { error: 'Analysis temporarily unavailable. Please try again in a moment.' }
    };
  }
}
