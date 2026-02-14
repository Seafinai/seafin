/**
 * AI ROI Calculator
 * Interactive tool to calculate automation ROI
 */

function initROICalculator() {
  // Find insertion point (after services section)
  const servicesSection = document.getElementById('services');
  if (!servicesSection) {
    console.error('ROI Calculator: services section not found');
    return;
  }

  // Create ROI calculator section
  const section = document.createElement('section');
  section.id = 'roi-calculator';
  section.className = 'roi-calculator-section';
  section.innerHTML = `
    <div class="container">
      <div class="roi-header">
        <span class="coord" style="top: -8px; left: 0;">ROI CALCULATOR</span>
        <h2 class="section-title">See Your Automation ROI</h2>
        <p class="section-subtitle">
          Tell us about a repetitive task. Get instant ROI analysis with implementation cost, timeline, and payback period.
        </p>
      </div>

      <div class="roi-grid">
        <!-- Input Panel -->
        <div class="roi-panel">
          <div class="panel-header">
            <span class="panel-number">01</span>
            <h3>Your Task</h3>
          </div>
          <form id="roi-form">
            <div class="form-group">
              <label for="roi-task">Describe the repetitive task</label>
              <textarea
                id="roi-task"
                class="roi-textarea"
                placeholder="e.g., Manually entering customer data from emails into our CRM system..."
                maxlength="500"
                required
              ></textarea>
              <div class="char-counter">
                <span id="roi-char-count">0</span> / 500 characters
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="roi-hours">Hours per week</label>
                <input
                  type="number"
                  id="roi-hours"
                  class="roi-input"
                  placeholder="e.g., 10"
                  min="0.5"
                  max="168"
                  step="0.5"
                  required
                />
              </div>
              <div class="form-group">
                <label for="roi-rate">Hourly rate ($)</label>
                <input
                  type="number"
                  id="roi-rate"
                  class="roi-input"
                  placeholder="50"
                  value="50"
                  min="1"
                  max="500"
                  step="1"
                  required
                />
              </div>
            </div>

            <button type="submit" class="roi-submit" id="roi-submit-btn">
              Calculate ROI
            </button>
          </form>
        </div>

        <!-- Results Panel -->
        <div class="roi-panel">
          <div class="panel-header">
            <span class="panel-number">02</span>
            <h3>Your Results</h3>
          </div>
          <div id="roi-results" class="roi-results" style="display: none;">
            <div id="roi-results-content" class="results-content"></div>
          </div>
          <div id="roi-placeholder" class="roi-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="48" height="48" style="opacity: 0.3;">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <p>Fill out the form to see your automation ROI analysis</p>
          </div>
        </div>
      </div>

      <div class="roi-cta">
        <p>
          <strong>Ready to automate?</strong> Schedule a free 45-minute strategy call to discuss your specific automation opportunities.
        </p>
        <a href="#contact" class="cta-button">Get Custom Automation Quote</a>
      </div>
    </div>
  `;

  // Insert after services section
  const nextElement = servicesSection.nextElementSibling;
  servicesSection.parentNode.insertBefore(section, nextElement);

  // Add section divider before the calculator
  const divider = document.createElement('hr');
  divider.className = 'section-divider';
  servicesSection.parentNode.insertBefore(divider, section);

  // Event listeners
  const taskTextarea = document.getElementById('roi-task');
  const charCount = document.getElementById('roi-char-count');
  const form = document.getElementById('roi-form');

  taskTextarea.addEventListener('input', () => {
    charCount.textContent = taskTextarea.value.length;
  });

  form.addEventListener('submit', calculateROI);

  if (window.AI && window.AI.log) {
    window.AI.log('ROI Calculator initialized');
  }
}

async function calculateROI(e) {
  e.preventDefault();

  const taskInput = document.getElementById('roi-task');
  const hoursInput = document.getElementById('roi-hours');
  const rateInput = document.getElementById('roi-rate');
  const resultsDiv = document.getElementById('roi-results');
  const resultsContent = document.getElementById('roi-results-content');
  const placeholder = document.getElementById('roi-placeholder');
  const submitBtn = document.getElementById('roi-submit-btn');

  const task = taskInput.value.trim();
  const hoursPerWeek = parseFloat(hoursInput.value);
  const hourlyRate = parseFloat(rateInput.value);

  // Validation
  if (!task || task.length < 10) {
    showError('Please describe the task (at least 10 characters)');
    return;
  }

  if (!hoursPerWeek || hoursPerWeek < 0.5 || hoursPerWeek > 168) {
    showError('Hours per week must be between 0.5 and 168');
    return;
  }

  if (!hourlyRate || hourlyRate < 1) {
    showError('Please enter a valid hourly rate');
    return;
  }

  // Rate limit check
  if (window.AI && window.AI.rateLimiter && !window.AI.rateLimiter.canCall('roi-calculator')) {
    showError('Please wait a moment before calculating again');
    return;
  }

  // Show loading
  submitBtn.disabled = true;
  submitBtn.textContent = 'Analyzing...';
  placeholder.style.display = 'none';
  resultsDiv.style.display = 'block';
  resultsContent.innerHTML = '<div class="loading"><span class="loading-dots">Analyzing automation potential</span></div>';

  try {
    const response = await fetch('/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task, hoursPerWeek, hourlyRate })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'ROI calculation failed');
    }

    const data = await response.json();

    // Display results
    displayResults(data);

    if (window.AI && window.AI.log) {
      window.AI.log('ROI calculation successful:', data.usage);
    }

  } catch (error) {
    resultsContent.innerHTML = `<div class="error-message">${escapeHTML(error.message)}</div>`;
    if (window.AI && window.AI.log) {
      window.AI.log('ROI calculation error:', error.message);
    }
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Calculate ROI';
  }
}

function displayResults(data) {
  const resultsContent = document.getElementById('roi-results-content');
  const calc = data.calculations;
  const analysis = data.analysis;

  // Format numbers
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const formatHours = (num) => {
    return num.toFixed(1);
  };

  // Determine complexity badge color
  const complexityColors = {
    low: 'rgba(0, 255, 100, 0.8)',
    medium: 'rgba(0, 212, 255, 0.8)',
    high: 'rgba(255, 100, 0, 0.8)'
  };

  const complexityColor = complexityColors[analysis.complexity] || complexityColors.medium;

  // Build cost badge if available
  let costBadge = '';
  if (data.usage && data.usage.cost) {
    const cost = data.usage.cost < 0.001 ? '<$0.001' : `$${data.usage.cost.toFixed(3)}`;
    costBadge = `<div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(0, 212, 255, 0.1); font-size: 10px; font-family: 'IBM Plex Mono', monospace; color: rgba(0, 212, 255, 0.5);" title="Real-time AI cost">Analysis cost: ${cost}</div>`;
  }

  resultsContent.innerHTML = `
    <!-- Key Metrics -->
    <div class="roi-metrics-grid">
      <div class="roi-metric">
        <div class="metric-label">Automation Potential</div>
        <div class="metric-value" style="color: rgba(0, 255, 100, 0.9);">
          ${analysis.automationPotential}%
        </div>
      </div>
      <div class="roi-metric">
        <div class="metric-label">Payback Period</div>
        <div class="metric-value" style="color: var(--accent);">
          ${formatHours(calc.paybackMonths)} mo
        </div>
      </div>
      <div class="roi-metric">
        <div class="metric-label">ROI Year 1</div>
        <div class="metric-value" style="color: ${calc.roi >= 0 ? 'rgba(0, 255, 100, 0.9)' : 'rgba(255, 100, 0, 0.8)'};">
          ${calc.roi >= 0 ? '+' : ''}${calc.roi}%
        </div>
      </div>
    </div>

    <!-- Before/After Comparison -->
    <div class="roi-comparison">
      <div class="comparison-item">
        <div class="comparison-label">Current Annual Cost</div>
        <div class="comparison-value" style="color: rgba(255, 100, 0, 0.8);">
          ${formatCurrency(calc.currentAnnualCost)}
        </div>
        <div class="comparison-detail">${data.input.hoursPerWeek} hrs/week × ${formatCurrency(data.input.hourlyRate)}/hr</div>
      </div>
      <div class="comparison-arrow">→</div>
      <div class="comparison-item">
        <div class="comparison-label">With Automation</div>
        <div class="comparison-value" style="color: rgba(0, 255, 100, 0.9);">
          ${formatCurrency(calc.annualSavings)}
        </div>
        <div class="comparison-detail">Save ${formatHours(calc.hoursSavedPerWeek)} hrs/week</div>
      </div>
    </div>

    <!-- Implementation Details -->
    <div class="roi-details">
      <div class="detail-row">
        <span class="detail-label">Implementation Cost:</span>
        <span class="detail-value">${formatCurrency(calc.implementationCost)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Timeline:</span>
        <span class="detail-value">${calc.timelineWeeks} weeks</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Complexity:</span>
        <span class="detail-value" style="color: ${complexityColor}; text-transform: uppercase; font-weight: 600;">
          ${analysis.complexity}
        </span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Net Savings (Year 1):</span>
        <span class="detail-value" style="color: ${calc.netSavingsYear1 >= 0 ? 'rgba(0, 255, 100, 0.9)' : 'rgba(255, 100, 0, 0.8)'}; font-weight: 700;">
          ${calc.netSavingsYear1 >= 0 ? '+' : ''}${formatCurrency(calc.netSavingsYear1)}
        </span>
      </div>
    </div>

    <!-- AI Recommendation -->
    <div class="roi-recommendation">
      <div class="recommendation-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span>AI Recommendation</span>
      </div>
      <div class="recommendation-text">${escapeHTML(analysis.recommendation)}</div>
    </div>

    ${costBadge}
  `;
}

function showError(message) {
  const resultsDiv = document.getElementById('roi-results');
  const resultsContent = document.getElementById('roi-results-content');
  const placeholder = document.getElementById('roi-placeholder');

  placeholder.style.display = 'none';
  resultsDiv.style.display = 'block';
  resultsContent.innerHTML = `<div class="error-message">${escapeHTML(message)}</div>`;

  setTimeout(() => {
    resultsDiv.style.display = 'none';
    placeholder.style.display = 'flex';
  }, 3000);
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Initialize
initROICalculator();
