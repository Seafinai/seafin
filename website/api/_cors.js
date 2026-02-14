/**
 * CORS Protection Middleware
 * Validates request origins to prevent unauthorized API access
 */

const ALLOWED_ORIGINS = [
  'https://seafin.ai',
  'https://www.seafin.ai',
  // Development environments
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
  process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : null,
].filter(Boolean);

export function validateCORS(req, res) {
  const origin = req.headers.origin;

  // Check if origin is allowed
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    res.status(403).json({ error: 'Forbidden origin' });
    return false;
  }

  // Set CORS headers
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

  return true;
}
