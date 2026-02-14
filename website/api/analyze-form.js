/**
 * Smart Form Analyzer - Vercel Serverless Function
 * Analyzes user inquiries and suggests appropriate services
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
    const { userInput, message, challenge } = req.body;
    const inputText = userInput || message || challenge;

    if (!inputText || inputText.length < 20) {
      return res.status(400).json({ error: 'Message too short (minimum 20 characters)' });
    }

    if (inputText.length > 2000) {
      return res.status(400).json({ error: 'Message too long (maximum 2000 characters)' });
    }

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

**Customer Inquiry:** "${inputText}"

Return ONLY valid JSON: {"service": "Service Name", "timeline": "X-Y weeks", "budget": "$X-YK"}`
        }],
        max_tokens: 150,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      throw new Error('AI service unavailable');
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const suggestion = JSON.parse(jsonMatch ? jsonMatch[0] : content);

    if (!suggestion.service || !suggestion.timeline || !suggestion.budget) {
      throw new Error('Incomplete AI response');
    }

    return res.status(200).json(suggestion);

  } catch (error) {
    console.error('Analyze form error:', error);
    return res.status(500).json({
      error: 'Analysis temporarily unavailable. Please try again.',
      success: false
    });
  }
}
