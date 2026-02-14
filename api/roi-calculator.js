/**
 * AI ROI Calculator - Vercel Serverless Function
 * Analyzes tasks and calculates automation ROI
 */

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

    // Validation
    if (!task || task.length < 10) {
      return res.status(400).json({ error: 'Please describe the task (at least 10 characters)' });
    }

    if (!hoursPerWeek || hoursPerWeek < 0.5 || hoursPerWeek > 168) {
      return res.status(400).json({ error: 'Hours per week must be between 0.5 and 168' });
    }

    const rate = hourlyRate || 50; // Default $50/hour

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
          content: `Task: "${task}" | ${hoursPerWeek}h/week | $${rate}/h
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
        task,
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
