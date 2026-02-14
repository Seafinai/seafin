/**
 * Smart Contact Form API Handler
 * Analyzes user inquiries and suggests appropriate Seafin services
 *
 * Security: Rate limiting, input validation, CORS, budget monitoring
 */

import { validateCORS } from './_cors.js';
import { checkBudget, trackCost } from './_budget.js';
import { verifyAPIKeyExists, secureLog } from './_middleware.js';

// Rate limiting: IP-based tracking
const rateLimit = new Map();

// Session-based limits: Prevent automated abuse
const sessionLimits = new Map();

/**
 * Check IP-based rate limit (10 requests per minute)
 */
function checkRateLimit(ip) {
  const now = Date.now();
  const limit = rateLimit.get(ip) || { count: 0, resetTime: now + 60000 };

  // Reset counter every 60 seconds
  if (now > limit.resetTime) {
    limit.count = 0;
    limit.resetTime = now + 60000;
  }

  limit.count++;
  rateLimit.set(ip, limit);

  return limit.count <= 10; // Max 10 requests per minute per IP
}

/**
 * Generate session fingerprint (for abuse prevention, not authentication)
 */
function generateSessionId(req) {
  const userAgent = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  return `${ip}:${userAgent.slice(0, 50)}`;
}

/**
 * Check session-based limits (50 requests per 24 hours)
 */
function checkSessionLimit(sessionId) {
  const now = Date.now();
  const session = sessionLimits.get(sessionId);

  if (!session) {
    sessionLimits.set(sessionId, { count: 1, firstRequest: now });
    return true;
  }

  // Reset after 24 hours
  const hoursSinceFirst = (now - session.firstRequest) / (1000 * 60 * 60);
  if (hoursSinceFirst >= 24) {
    sessionLimits.set(sessionId, { count: 1, firstRequest: now });
    return true;
  }

  // Max 50 requests per day
  if (session.count >= 50) {
    return false;
  }

  session.count++;
  return true;
}

/**
 * Validate and sanitize user input
 * Prevents prompt injection and other attacks
 */
function validateInput(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('Message is required');
  }

  if (message.length < 20) {
    throw new Error('Message too short (minimum 20 characters)');
  }

  if (message.length > 2000) {
    throw new Error('Message too long (maximum 2000 characters)');
  }

  // Detect prompt injection attempts
  const dangerousPatterns = [
    /ignore\s+previous\s+instructions/i,
    /ignore\s+all\s+previous/i,
    /you\s+are\s+now/i,
    /system\s*:/i,
    /\[INST\]/i,
    /<\|im_start\|>/i,
    /\<\|system\|\>/i,
    /forget\s+everything/i,
    /disregard\s+previous/i,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(message)) {
      throw new Error('Invalid input detected');
    }
  }

  // Sanitize: Remove control characters
  return message
    .trim()
    .replace(/[\x00-\x1F\x7F]/g, '')
    .slice(0, 2000);
}

/**
 * Main API handler
 */
export default async function handler(req, res) {
  const startTime = Date.now();

  try {
    // 1. CORS validation
    if (!validateCORS(req, res)) {
      return;
    }

    // Handle OPTIONS pre-flight
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // 2. Method check
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // 3. API key verification
    if (!verifyAPIKeyExists(req, res)) {
      return;
    }

    // 4. Rate limiting
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(ip)) {
      secureLog('rate_limit_exceeded', { ip });
      return res.status(429).json({
        error: 'Rate limit exceeded. Please wait 60 seconds.',
        retryAfter: 60
      });
    }

    // 5. Session limits
    const sessionId = generateSessionId(req);
    if (!checkSessionLimit(sessionId)) {
      secureLog('session_limit_exceeded', { ip });
      return res.status(429).json({
        error: 'Daily limit reached. Please try again tomorrow.',
        retryAfter: 86400 // 24 hours
      });
    }

    // 6. Budget check (DigitalOcean free tier)
    checkBudget();

    // 7. Input validation
    const { message } = req.body;
    const sanitized = validateInput(message);

    // 8. Call OpenRouter API
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

1. **Custom AI Assistants** - 24/7 AI agents, custom workflows, integrations
   - Timeline: 4-8 weeks
   - Budget: $5-25K
   - Best for: Customer support automation, complex business workflows

2. **RAG Knowledge Bots** - Document Q&A systems, internal knowledge bases
   - Timeline: 2-4 weeks
   - Budget: $2-5K
   - Best for: Document search, FAQ automation, knowledge management

3. **Custom Automation Tools** - Dashboards, analytics, data processing
   - Timeline: 2-6 weeks
   - Budget: $5-25K
   - Best for: Custom software, reporting tools, data pipelines

4. **AI Workflow Automation (n8n)** - Email triage, data sync, integrations
   - Timeline: 1-4 weeks
   - Budget: $2-5K
   - Best for: Business process automation, data integration

**Customer Inquiry:**
"${sanitized}"

**Instructions:**
Analyze the inquiry and determine which service best fits their needs. Consider keywords like "chatbot" (Custom AI), "documents" (RAG), "dashboard" (Custom Tools), "automate email" (Workflow).

Return ONLY valid JSON in this exact format:
{"service": "Service Name", "timeline": "X-Y weeks", "budget": "$X-YK"}`
        }],
        max_tokens: 150,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      throw new Error('AI service temporarily unavailable');
    }

    const data = await response.json();

    // 9. Track costs
    if (data.usage) {
      trackCost(data.usage.prompt_tokens, data.usage.completion_tokens);
    }

    // 10. Parse AI response
    let suggestion;
    try {
      const content = data.choices[0].message.content.trim();
      // Handle markdown code blocks if present
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      suggestion = JSON.parse(jsonMatch ? jsonMatch[0] : content);
    } catch (parseError) {
      console.error('Failed to parse AI response:', data.choices[0].message.content);
      throw new Error('Invalid AI response format');
    }

    // 11. Validate response structure
    if (!suggestion.service || !suggestion.timeline || !suggestion.budget) {
      throw new Error('Incomplete AI response');
    }

    const responseTime = Date.now() - startTime;
    secureLog('analyze_form_success', {
      ip,
      messageLength: sanitized.length,
      responseTime
    });

    return res.status(200).json(suggestion);

  } catch (error) {
    const responseTime = Date.now() - startTime;
    secureLog('analyze_form_error', {
      ip: req.headers['x-forwarded-for'] || 'unknown',
      error: error.message,
      responseTime
    });

    // User-friendly error messages
    if (error.message.includes('budget')) {
      return res.status(503).json({
        error: 'AI features temporarily disabled due to high demand. Please try again later.'
      });
    }

    if (error.message.includes('Invalid input')) {
      return res.status(400).json({
        error: 'Invalid input. Please check your message and try again.'
      });
    }

    return res.status(500).json({
      error: 'Analysis temporarily unavailable. Please try again in a moment.'
    });
  }
}
