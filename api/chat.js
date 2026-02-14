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
          content: 'You are a helpful AI assistant for Seafin, an AI consulting company. Answer questions about AI development, workflow automation, and custom AI solutions. Be concise and helpful.'
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

    return res.status(200).json({
      reply: reply.trim(),
      success: true
    });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({
      error: 'Sorry, I\'m having trouble connecting. Please try the contact form below.',
      success: false
    });
  }
}
