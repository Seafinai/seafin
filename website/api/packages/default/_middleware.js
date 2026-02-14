/**
 * API Security Middleware
 * Centralizes security checks and API key validation
 */

/**
 * Verify API key is configured (without exposing it)
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {boolean} True if API key exists
 */
export function verifyAPIKeyExists(req, res) {
  if (!process.env.OPENROUTER_API_KEY) {
    console.error('❌ OPENROUTER_API_KEY not configured');
    res.status(500).json({
      error: 'Server configuration error. AI features temporarily unavailable.'
    });
    return false;
  }

  // Safe to expose that key is configured (not the actual key)
  res.setHeader('X-API-Key-Configured', 'true');
  return true;
}

/**
 * Secure logging (never logs sensitive data)
 * @param {string} action - Action being performed
 * @param {Object} metadata - Safe metadata to log
 */
export function secureLog(action, metadata = {}) {
  const safeMetadata = {
    timestamp: new Date().toISOString(),
    action,
    // Partial IP for privacy
    ip: metadata.ip ? metadata.ip.slice(0, 8) + '...' : 'unknown',
    // Truncated user agent
    userAgent: metadata.userAgent ? metadata.userAgent.slice(0, 30) + '...' : 'unknown',
    // Generic stats only
    messageLength: metadata.messageLength || 0,
    responseTime: metadata.responseTime || 0,
  };

  // DO NOT LOG: API keys, full messages, personal info, email addresses
  console.log(JSON.stringify(safeMetadata));
}
