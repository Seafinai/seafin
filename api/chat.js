/**
 * Chatbot API - Vercel Serverless Function
 * Simple conversational AI for Seafin services
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
    const { message } = req.body;

    if (!message || message.length < 3) {
      return res.status(400).json({ error: 'Message too short' });
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
