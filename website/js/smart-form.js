/**
 * Smart Contact Form
 * Real-time AI analysis of user inquiries with service suggestions
 *
 * Features:
 * - Debounced input analysis (1.5s delay)
 * - Client-side rate limiting (2s between calls)
 * - Graceful error handling
 * - Blueprint-styled UI integration
 */

// DOM elements
const textarea = document.getElementById('contact-challenge');
const suggestionsPanel = document.getElementById('ai-suggestions');

if (!textarea) {
  console.error('Smart Form: contact-challenge textarea not found');
} else if (!suggestionsPanel) {
  console.error('Smart Form: ai-suggestions panel not found');
} else {
  initSmartForm();
}

/**
 * Initialize smart form functionality
 */
function initSmartForm() {
  let debounceTimer;
  let isAnalyzing = false;

  // Listen to textarea input
  textarea.addEventListener('input', () => {
    clearTimeout(debounceTimer);

    const message = textarea.value.trim();

    // Hide suggestions if message is too short
    if (message.length < 20) {
      hideSuggestions();
      return;
    }

    // Debounce: Wait 1.5 seconds after user stops typing
    debounceTimer = setTimeout(() => {
      analyzeMessage(message);
    }, 1500);
  });

  window.AI.log('Smart Form initialized');
}

/**
 * Analyze user message and show AI suggestions
 */
async function analyzeMessage(message) {
  // Check client-side rate limit
  if (!window.AI.rateLimiter.canCall('analyze-form')) {
    window.AI.log('Rate limit active, skipping analysis');
    return;
  }

  // Show loading state
  showLoading();

  try {
    const response = await fetch('/api/analyze-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Analysis failed');
    }

    const data = await response.json();
    displaySuggestions(data);

    window.AI.log('Analysis complete:', data);

  } catch (error) {
    window.AI.log('Analysis error:', error.message);

    // Graceful degradation: just hide the panel
    hideSuggestions();

    // Show user-friendly error for specific cases
    if (error.message.includes('Rate limit')) {
      showError('Too many requests. Please wait a moment.');
    } else if (error.message.includes('budget') || error.message.includes('limit')) {
      showError('AI analysis temporarily unavailable. Form still works!');
    }
    // For other errors, silently fail (form still works)
  }
}

/**
 * Display AI suggestions in blueprint-styled panel
 */
function displaySuggestions(data) {
  suggestionsPanel.innerHTML = `
    <span class="coord" style="top: 6px; left: 8px;">AI-DETECTED</span>
    <div class="overline">RECOMMENDED SERVICE</div>
    <h4 style="color: var(--accent); margin-bottom: 12px;">${escapeHTML(data.service)}</h4>
    <div class="suggestion-details">
      <span><strong>TIMELINE:</strong> ${escapeHTML(data.timeline)}</span>
      <span><strong>BUDGET:</strong> ${escapeHTML(data.budget)}</span>
    </div>
    <div class="suggestion-note">
      This is an AI-powered suggestion based on your inquiry. Our team will provide a detailed quote after reviewing your specific needs.
    </div>
  `;
  suggestionsPanel.style.display = 'block';
}

/**
 * Show loading state
 */
function showLoading() {
  suggestionsPanel.innerHTML = `
    <div class="loading">
      <span class="loading-dots">Analyzing</span>
    </div>
  `;
  suggestionsPanel.style.display = 'block';
}

/**
 * Show error message
 */
function showError(message) {
  suggestionsPanel.innerHTML = `
    <div class="error-message">
      <span class="coord" style="top: 6px; left: 8px;">ERROR</span>
      ${escapeHTML(message)}
    </div>
  `;
  suggestionsPanel.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(hideSuggestions, 5000);
}

/**
 * Hide suggestions panel
 */
function hideSuggestions() {
  suggestionsPanel.style.display = 'none';
  suggestionsPanel.innerHTML = '';
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
