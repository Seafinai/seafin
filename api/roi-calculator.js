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
          content: `You are an AI automation expert. Analyze tasks and estimate automation potential.

Return ONLY valid JSON with this exact structure:
{
  "automationPotential": 75,
  "complexity": "medium",
  "estimatedCost": 8000,
  "timelineWeeks": 4,
  "recommendation": "Brief recommendation text"
}

Rules:
- automationPotential: 0-100 (percentage of task that can be automated)
- complexity: "low" (simple) | "medium" (moderate) | "high" (complex)
- estimatedCost: Implementation cost in USD ($2,000 - $25,000)
- timelineWeeks: Implementation timeline (1-8 weeks)
- recommendation: One sentence recommendation`
        }, {
          role: 'user',
          content: `Task: "${task}"
Hours per week: ${hoursPerWeek}
Hourly rate: $${rate}/hour

Analyze this task and estimate automation potential.`
        }],
        max_tokens: 300,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      throw new Error('AI analysis failed');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content.trim();

    // Parse JSON response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }

    const analysis = JSON.parse(jsonMatch[0]);

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
      success: false
    });
  }
}
