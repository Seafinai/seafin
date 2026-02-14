/**
 * Test function for Vercel deployment
 * Verifies environment variables are working
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Check environment variables
    const envCheck = {
      OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY ? `EXISTS (${process.env.OPENROUTER_API_KEY.substring(0, 10)}...)` : 'NOT FOUND',
      MAX_DAILY_COST: process.env.MAX_DAILY_COST || 'NOT FOUND',
      NODE_ENV: process.env.NODE_ENV || 'NOT FOUND'
    };

    // Get all env vars (masked)
    const allEnvVars = {};
    for (const key in process.env) {
      if (key.includes('KEY') || key.includes('SECRET') || key.includes('TOKEN')) {
        allEnvVars[key] = process.env[key] ? `[SET - length: ${process.env[key].length}]` : '[NOT SET]';
      } else {
        allEnvVars[key] = process.env[key];
      }
    }

    return res.status(200).json({
      success: true,
      message: "Vercel deployment test",
      platform: "Vercel",
      environment: envCheck,
      allVars: allEnvVars,
      totalEnvVars: Object.keys(process.env).length,
      request: {
        method: req.method,
        headers: req.headers,
        body: req.body
      }
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
}
