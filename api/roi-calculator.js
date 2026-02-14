/**
 * AI ROI Calculator - Vercel Serverless Function
 * Analyzes tasks and calculates automation ROI
 */

// In-memory rate limiting (resets on cold start)
const rateLimitStore = new Map();
const MAX_REQUESTS_PER_HOUR = 100; // TEMPORARILY INCREASED FOR TESTING - Reset to 10 after tests
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in ms

function checkRateLimit(ip) {
  const now = Date.now();
  const key = `roi:${ip}`;

  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, { count: 0, resetTime: now + RATE_LIMIT_WINDOW });
  }

  const record = rateLimitStore.get(key);

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + RATE_LIMIT_WINDOW;
  }

  record.count++;

  return {
    allowed: record.count <= MAX_REQUESTS_PER_HOUR,
    remaining: Math.max(0, MAX_REQUESTS_PER_HOUR - record.count),
    resetIn: Math.ceil((record.resetTime - now) / 60000)
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
    const { task, hoursPerWeek, hourlyRate } = req.body;

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

    // Basic validation
    if (!task || task.length < 10) {
      return res.status(400).json({ error: 'Please describe the task (at least 10 characters)' });
    }

    if (task.length > 500) {
      return res.status(400).json({ error: 'Task description too long (max 500 characters)' });
    }

    if (!hoursPerWeek || hoursPerWeek < 0.5 || hoursPerWeek > 168) {
      return res.status(400).json({ error: 'Hours per week must be between 0.5 and 168' });
    }

    const rate = hourlyRate || 50; // Default $50/hour

    // GUARDRAIL 1: Prompt Injection Detection (from chatbot)
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
      /act\s+as\s+(a|an)\s+/i,
      /pretend\s+(you\s+are|to\s+be)/i,
      /\bDAN\b/i,
      /roleplay\s+as/i,
      /simulate\s+(being|a)/i,
      /1gn[o0]r[e3]/i,
      /pr[e3]v[i1][o0]us/i,
      /[i1]nstruct[i1][o0]ns?/i
    ];

    const containsInjection = injectionPatterns.some(pattern => pattern.test(task));
    if (containsInjection) {
      return res.status(400).json({
        error: 'Invalid input detected. Please describe a legitimate business task.',
        success: false,
        blocked: true
      });
    }

    // GUARDRAIL 2: Inappropriate content detection (comprehensive)
    const inappropriatePatterns = [
      // Sexual content (explicit and euphemisms)
      /\b(sex|porn|xxx|nude|naked|blow\s*job|hand\s*job|sexual|intercourse|masturbat|erotic|orgasm)\b/i,
      /\b(penis|vagina|dick|cock|pussy|tits|boobs|breast|genital|anal)\b/i,
      /\b(escort|prostitut|stripper|cam\s*girl|only\s*fans)\b/i,

      // Bodily functions
      /\b(poop|shit|pee|urinat|defecate|fart|vomit|puke)\b/i,
      /\b(toilet|bathroom|restroom|latrine)\b/i,

      // Profanity
      /\b(fuck|damn|crap|ass|bastard|bitch)\b/i,

      // Personal activities (non-business)
      /\b(sleeping|napping|relaxing|resting|leisure)\b/i,
      /\b(watching\s+(tv|netflix|youtube|movies?))\b/i,
      /\b(playing\s+(games?|video\s*games?|fortnite|minecraft))\b/i,
      /\b(hobby|hobbies|personal\s+time|free\s+time)\b/i,
      /\b(dating|tinder|bumble|romance)\b/i,

      // Medical/care services that could be misused
      /\b(nurse|doctor|physician|caregiver|therapist).{0,50}(sex|intimate|pleasure|satisfaction)/i,
      /\b(massage).{0,30}(happy\s*ending|sexual|erotic)/i,

      // Non-tasks (questions, complaints)
      /^(what|why|when|where|who|how|can you|could you|will you|do you)/i,
      /\b(i\s+hate|i\s+don't\s+like|annoying|frustrated|upset)\b/i
    ];

    const containsInappropriate = inappropriatePatterns.some(pattern => pattern.test(task));
    if (containsInappropriate) {
      return res.status(400).json({
        error: 'Please describe a professional business task that could be automated.',
        success: false,
        blocked: true
      });
    }

    // Security: Sanitize input to prevent prompt injection
    const sanitizedTask = task
      .replace(/[<>]/g, '') // Remove HTML tags
      .replace(/system:|assistant:|user:/gi, '') // Remove role injections
      .trim();

    // Use AI to analyze the task and estimate automation potential
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://seafin.ai',
        'X-Title': 'Seafin ROI Calculator'
      },
      body: JSON.stringify({
        model: 'moonshotai/kimi-k2.5',
        messages: [{
          role: 'system',
          content: `Return ONLY valid JSON. No explanation, no reasoning, just JSON.

Format:
{"automationPotential":75,"complexity":"medium","estimatedCost":8000,"timelineWeeks":4,"recommendation":"text"}

Rules:
- automationPotential: 0-100
- complexity: "low"|"medium"|"high"
- estimatedCost: $2000-$25000
- timelineWeeks: 1-8
- recommendation: one sentence`
        }, {
          role: 'user',
          content: `Task: "${sanitizedTask}" | ${hoursPerWeek}h/week | $${rate}/h
Return JSON only:`
        }],
        max_tokens: 2000,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`AI analysis failed: ${response.status} - ${errorData}`);
    }

    const data = await response.json();

    // Validate response structure
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error(`Invalid OpenRouter response structure: ${JSON.stringify(data).substring(0, 200)}`);
    }

    const aiResponse = data.choices[0].message.content?.trim() || '';

    if (!aiResponse || aiResponse.length === 0) {
      throw new Error(`Empty AI response. Full response: ${JSON.stringify(data).substring(0, 500)}`);
    }

    // Parse JSON response (handle markdown code blocks)
    let jsonText = aiResponse;

    // Remove markdown code blocks if present
    const codeBlockMatch = aiResponse.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (codeBlockMatch) {
      jsonText = codeBlockMatch[1];
    } else {
      // Try to find raw JSON object
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonText = jsonMatch[0];
      }
    }

    // Parse the JSON
    let analysis;
    try {
      analysis = JSON.parse(jsonText);
    } catch (parseError) {
      throw new Error(`Failed to parse AI response: ${parseError.message} | Response: ${aiResponse.substring(0, 200)}`);
    }

    // Validate required fields
    if (!analysis.automationPotential || !analysis.complexity || !analysis.estimatedCost || !analysis.timelineWeeks || !analysis.recommendation) {
      throw new Error(`Missing required fields in AI response. Got: ${JSON.stringify(analysis)}`);
    }

    // Calculate ROI metrics
    const weeklyHours = parseFloat(hoursPerWeek);
    const hourlyRateNum = parseFloat(rate);

    const annualCost = weeklyHours * hourlyRateNum * 52;
    const automationPercent = analysis.automationPotential / 100;
    const hoursSaved = weeklyHours * automationPercent;
    const annualSavings = annualCost * automationPercent;
    const implementationCost = analysis.estimatedCost;
    const netSavingsYear1 = annualSavings - implementationCost;
    const paybackMonths = implementationCost / (annualSavings / 12);
    const roi = ((annualSavings - implementationCost) / implementationCost) * 100;

    // Extract token usage for cost tracking
    const usage = data.usage || {};
    const totalTokens = usage.total_tokens || 0;
    const estimatedCost = (totalTokens / 1000000) * 0.375;

    return res.status(200).json({
      success: true,
      input: {
        task: sanitizedTask,
        hoursPerWeek: weeklyHours,
        hourlyRate: hourlyRateNum
      },
      analysis: {
        automationPotential: analysis.automationPotential,
        complexity: analysis.complexity,
        recommendation: analysis.recommendation
      },
      calculations: {
        currentAnnualCost: Math.round(annualCost),
        hoursSavedPerWeek: parseFloat(hoursSaved.toFixed(1)),
        annualSavings: Math.round(annualSavings),
        implementationCost: implementationCost,
        netSavingsYear1: Math.round(netSavingsYear1),
        paybackMonths: parseFloat(paybackMonths.toFixed(1)),
        roi: parseFloat(roi.toFixed(0)),
        timelineWeeks: analysis.timelineWeeks
      },
      usage: {
        tokens: totalTokens,
        cost: estimatedCost
      }
    });

  } catch (error) {
    console.error('ROI Calculator error:', error);
    return res.status(500).json({
      error: 'Unable to calculate ROI. Please try again.',
      details: error.message,
      success: false
    });
  }
}
