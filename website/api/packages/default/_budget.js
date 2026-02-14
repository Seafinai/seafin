/**
 * Budget Monitoring & Cost Control
 * Prevents exceeding DigitalOcean free tier and OpenRouter budgets
 */

// Track monthly invocations (DigitalOcean free tier: 100k/month)
let monthlyInvocations = 0;
const MAX_FREE_INVOCATIONS = 95000; // Buffer below 100k limit

// Track daily OpenRouter spending
let dailySpend = 0;
let lastResetDate = new Date().toDateString();

const MAX_DAILY_COST = parseFloat(process.env.MAX_DAILY_COST || '5.00');
const MONTHLY_BUDGET = MAX_DAILY_COST * 30;

/**
 * Check if we're within DigitalOcean free tier limits
 * @throws {Error} If free tier limit exceeded
 */
export function checkBudget() {
  monthlyInvocations++;

  if (monthlyInvocations > MAX_FREE_INVOCATIONS) {
    throw new Error('Free tier limit reached. AI features temporarily disabled. Please contact support.');
  }

  // Warn at 80% usage
  if (monthlyInvocations > 76000 && monthlyInvocations % 1000 === 0) {
    console.warn(`⚠️  Approaching free tier limit: ${monthlyInvocations}/100,000 invocations`);
  }

  return true;
}

/**
 * Track OpenRouter API costs
 * @param {number} inputTokens - Number of input tokens
 * @param {number} outputTokens - Number of output tokens
 * @throws {Error} If daily budget exceeded
 */
export function trackCost(inputTokens, outputTokens) {
  // Reset daily counter if new day
  const today = new Date().toDateString();
  if (today !== lastResetDate) {
    dailySpend = 0;
    lastResetDate = today;
  }

  // Claude Sonnet 4.5 pricing: $3/MTok input, $15/MTok output
  const cost = (inputTokens * 3 / 1000000) + (outputTokens * 15 / 1000000);
  dailySpend += cost;

  if (dailySpend > MAX_DAILY_COST) {
    throw new Error(`Daily budget of $${MAX_DAILY_COST} exceeded. AI features temporarily disabled.`);
  }

  // Log spending at intervals
  if (dailySpend > MAX_DAILY_COST * 0.8) {
    console.warn(`⚠️  Approaching daily budget: $${dailySpend.toFixed(2)}/$${MAX_DAILY_COST}`);
  }

  return cost;
}

/**
 * Get current usage statistics (for monitoring)
 */
export function getUsageStats() {
  return {
    monthlyInvocations,
    freeInvocationsRemaining: MAX_FREE_INVOCATIONS - monthlyInvocations,
    dailySpend: dailySpend.toFixed(4),
    dailyBudgetRemaining: (MAX_DAILY_COST - dailySpend).toFixed(4),
    lastResetDate
  };
}

/**
 * Manual reset (for testing or month rollover)
 */
export function resetMonthlyCounter() {
  monthlyInvocations = 0;
  console.log('✅ Monthly invocation counter reset');
}
