/**
 * Chatbot API - Vercel Serverless Function
 * Simple conversational AI for Seafin services
 */

// In-memory rate limiting (resets on cold start)
// For production, use Redis/KV store
const rateLimitStore = new Map();
const MAX_REQUESTS_PER_HOUR = 20; // Per IP
const MAX_COST_PER_SESSION = 0.10; // $0.10 per session
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in ms

function checkRateLimit(ip) {
  const now = Date.now();
  const key = `ip:${ip}`;

  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, { count: 0, resetTime: now + RATE_LIMIT_WINDOW });
  }

  const record = rateLimitStore.get(key);

  // Reset if window expired
  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + RATE_LIMIT_WINDOW;
  }

  record.count++;

  return {
    allowed: record.count <= MAX_REQUESTS_PER_HOUR,
    remaining: Math.max(0, MAX_REQUESTS_PER_HOUR - record.count),
    resetIn: Math.ceil((record.resetTime - now) / 60000) // minutes
  };
}

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
    const { message } = req.body;

    // Get client IP for rate limiting
    const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
               req.headers['x-real-ip'] ||
               'unknown';

    // RATE LIMIT: Check per-IP limits
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return res.status(429).json({
        error: `Rate limit exceeded. Please try again in ${rateCheck.resetIn} minutes.`,
        success: false,
        rateLimited: true,
        resetIn: rateCheck.resetIn
      });
    }

    if (!message || message.length < 3) {
      return res.status(400).json({ error: 'Message too short' });
    }

    // GUARDRAIL 1: Prompt Injection Detection
    const injectionPatterns = [
      /ignore\s+(all\s+)?(previous|above|prior)\s+instructions?/i,
      /ignore\s+instructions?/i,
      /you\s+are\s+now/i,
      /new\s+instructions?/i,
      /system\s*:/i,
      /\[INST\]/i,
      /<\|system\|>/i,
      /forget\s+(everything|all|previous|prior)/i,
      /disregard\s+(all\s+)?(previous|above|prior)/i,
      /SUDO\s+MODE/i,
      /developer\s+mode/i,
      /jailbreak/i,
      /act\s+as\s+(a|an)\s+/i
    ];

    const containsInjection = injectionPatterns.some(pattern => pattern.test(message));
    if (containsInjection) {
      return res.status(400).json({
        error: 'Invalid input detected. Please rephrase your question.',
        success: false,
        blocked: true
      });
    }

    // GUARDRAIL 2: Topic Relevancy Check (Dynamic)
    const offTopicKeywords = [
      'crypto', 'cryptocurrency', 'bitcoin', 'trading', 'stocks', 'investment',
      'recipe', 'weather', 'sports', 'politics', 'dating', 'medical advice',
      'legal advice', 'homework', 'essay', 'write code', 'hack', 'jailbreak'
    ];

    const messageLower = message.toLowerCase();
    const containsOffTopic = offTopicKeywords.some(keyword => messageLower.includes(keyword));

    // Check if message contains AI/automation/business keywords
    const relevantKeywords = [
      'ai', 'automation', 'workflow', 'chatbot', 'assistant', 'machine learning',
      'business', 'service', 'pricing', 'consultation', 'help', 'seafin'
    ];
    const containsRelevant = relevantKeywords.some(keyword => messageLower.includes(keyword));

    // If clearly off-topic and no relevant keywords, reject
    if (containsOffTopic && !containsRelevant && message.length > 20) {
      return res.status(200).json({
        reply: "I'm here to help you learn about Seafin's AI consulting services. We specialize in custom AI development, workflow automation, and intelligent solutions for businesses. How can I help you explore what Seafin offers?",
        success: true,
        filtered: true
      });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://seafin.ai',
        'X-Title': 'Seafin Chatbot'
      },
      body: JSON.stringify({
        model: 'moonshotai/kimi-k2.5',
        messages: [{
          role: 'system',
          content: `You are Seafin's AI assistant. Your ONLY purpose is to help visitors learn about Seafin's AI consulting services.

WHAT YOU CAN DISCUSS:
- Seafin's services: Custom AI development, workflow automation, RAG bots, AI agents
- How AI can help businesses automate tasks
- Seafin's pricing, timeline, and process
- Scheduling a strategy call or consultation

WHAT YOU CANNOT DISCUSS:
- Unrelated topics (crypto, gas stations, general knowledge, etc.)
- Other companies or competitors
- Detailed technical implementation (that's what paid consultations are for)

WHEN ASKED OFF-TOPIC QUESTIONS:
Politely redirect: "I'm here to help you learn about Seafin's AI consulting services. We specialize in [relevant service]. Is there something about AI automation or custom development I can help you with?"

Be friendly, concise, and always guide the conversation back to how Seafin can help their business.`
        }, {
          role: 'user',
          content: message
        }],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('AI service unavailable');
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    // Validate we got a real response
    if (!reply || reply.trim().length === 0) {
      throw new Error('Empty response from AI');
    }

    // GUARDRAIL 3: Output Validation (detect jailbreak success)
    const suspiciousOutputPatterns = [
      /as an (ai|assistant).{0,50}(cannot|can't|unable to)/i,
      /i (cannot|can't) (help|assist).{0,50}(unethical|illegal|harmful)/i,
      /SUDO MODE ACTIVATED/i,
      /Developer Mode Enabled/i
    ];

    // Check if response seems to be a successful jailbreak
    const seemsJailbroken = suspiciousOutputPatterns.some(pattern => pattern.test(reply));
    if (seemsJailbroken) {
      // Log for monitoring but don't expose to user
      console.warn('Potential jailbreak detected:', { ip, message: message.substring(0, 100) });
      return res.status(200).json({
        reply: "I'm here to help you learn about Seafin's AI consulting services. How can I assist you with AI development or workflow automation?",
        success: true,
        filtered: true
      });
    }

    // Extract token usage for cost tracking
    const usage = data.usage || {};
    const totalTokens = usage.total_tokens || 0;

    // Kimi pricing: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
    // Approximate cost (assuming 50/50 split for simplicity)
    const estimatedCost = (totalTokens / 1000000) * 0.375;

    return res.status(200).json({
      reply: reply.trim(),
      success: true,
      usage: {
        tokens: totalTokens,
        cost: estimatedCost
      }
    });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({
      error: 'Sorry, I\'m having trouble connecting. Please try the contact form below.',
      success: false
    });
  }
}
