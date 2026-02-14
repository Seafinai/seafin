/**
 * RAG Query - Vercel Serverless Function
 * Retrieval-Augmented Generation demo
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
    const { query, document } = req.body;

    if (!query || query.length < 3) {
      return res.status(400).json({ error: 'Query too short' });
    }

    // Simple RAG implementation - in production, this would search a vector database
    const context = document || `
Seafin is an AI consulting company that helps businesses automate workflows.
Services include: Custom AI Assistants, RAG Knowledge Bots, Automation Tools, and AI Workflow Integration.
We work with companies of 25-500 employees and deliver projects in 2-6 weeks.
Pricing ranges from $2K to $25K depending on complexity.
    `.trim();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://seafin.ai',
        'X-Title': 'Seafin RAG Demo'
      },
      body: JSON.stringify({
        model: 'moonshotai/kimi-k2.5',
        messages: [{
          role: 'system',
          content: `You are a helpful assistant. Answer the user's question based on this context:\n\n${context}`
        }, {
          role: 'user',
          content: query
        }],
        max_tokens: 300,
        temperature: 0.5
      })
    });

    if (!response.ok) {
      throw new Error('AI service unavailable');
    }

    const data = await response.json();
    const answer = data.choices[0].message.content;

    return res.status(200).json({
      answer,
      query,
      success: true
    });

  } catch (error) {
    console.error('RAG query error:', error);
    return res.status(500).json({
      error: 'RAG query failed. Please try again.',
      success: false
    });
  }
}
