/**
 * RAG Demo - Slide-Out Panel
 * Interactive demonstration of document Q&A (KnowledgeClaw)
 * Floating bubble trigger + slide-out panel from the right
 */

function initRAGDemo() {
  // 1. Create floating bubble button (like chatbot, but left side)
  const bubble = document.createElement('button');
  bubble.id = 'rag-bubble';
  bubble.className = 'rag-bubble';
  bubble.setAttribute('aria-label', 'Try AI Demo');
  bubble.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
    <span class="rag-badge">Demo</span>
  `;

  // 2. Create slide-out panel
  const panel = document.createElement('div');
  panel.id = 'rag-panel';
  panel.className = 'rag-slide-panel';
  panel.innerHTML = `
    <div class="rag-panel-header">
      <div class="rag-panel-title-group">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <div>
          <h2>KnowledgeClaw Demo</h2>
          <span class="rag-panel-subtitle">Document Q&A powered by AI</span>
        </div>
      </div>
      <button id="rag-panel-close" class="rag-panel-close" aria-label="Close demo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>

    <div class="rag-panel-body">
      <!-- Document Input -->
      <div class="rag-demo-panel">
        <div class="panel-header">
          <span class="panel-number">01</span>
          <h3>Your Document</h3>
        </div>
        <textarea
          id="rag-document"
          class="rag-textarea"
          placeholder="Paste your document here (up to 10,000 characters)

Try it with a company policy, product description, meeting notes, or any text document..."
          maxlength="10000"
        ></textarea>
        <div class="char-counter">
          <span id="char-count">0</span> / 10,000 characters
        </div>
        <button id="load-sample" class="sample-button">
          Load Sample Document
        </button>
      </div>

      <!-- Question Input -->
      <div class="rag-demo-panel">
        <div class="panel-header">
          <span class="panel-number">02</span>
          <h3>Ask a Question</h3>
        </div>
        <form id="rag-form">
          <input
            type="text"
            id="rag-question"
            class="rag-input"
            placeholder="What would you like to know about this document?"
            maxlength="500"
          />
          <button type="submit" class="rag-submit" id="rag-submit-btn">
            Ask Question
          </button>
        </form>

        <!-- Answer -->
        <div id="rag-answer" class="rag-answer" style="display: none;">
          <div class="answer-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
            <span>AI Answer</span>
          </div>
          <div id="rag-answer-content" class="answer-content"></div>
          <div class="answer-footer">
            Powered by Claude Sonnet 4.5
          </div>
        </div>
      </div>
    </div>

    <div class="rag-panel-footer">
      <a href="#contact" class="cta-button" id="rag-cta-contact">Get Your Custom RAG Bot</a>
    </div>
  `;

  // Append to body
  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  // Event listeners
  bubble.addEventListener('click', toggleRAGPanel);
  document.getElementById('rag-panel-close').addEventListener('click', closeRAGPanel);
  document.getElementById('rag-document').addEventListener('input', () => {
    document.getElementById('char-count').textContent =
      document.getElementById('rag-document').value.length;
  });
  document.getElementById('load-sample').addEventListener('click', loadSampleDocument);
  document.getElementById('rag-form').addEventListener('submit', askQuestion);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      closeRAGPanel();
    }
  });

  // Close panel when CTA contact link is clicked
  document.getElementById('rag-cta-contact').addEventListener('click', () => {
    closeRAGPanel();
  });

  if (window.AI && window.AI.log) {
    window.AI.log('RAG Demo initialized (bubble + slide-out)');
  }
}

function toggleRAGPanel() {
  const panel = document.getElementById('rag-panel');
  const bubble = document.getElementById('rag-bubble');
  if (panel.classList.contains('open')) {
    closeRAGPanel();
  } else {
    panel.classList.add('open');
    bubble.classList.add('hidden');
  }
}

function closeRAGPanel() {
  document.getElementById('rag-panel').classList.remove('open');
  document.getElementById('rag-bubble').classList.remove('hidden');
}

function loadSampleDocument() {
  const sampleDoc = `SEAFIN AI SERVICES - PRODUCT OVERVIEW

Company: Seafin LLC
Tagline: Custom AI for small business. Results in weeks, not months.

SERVICES OFFERED:

1. Custom AI Assistants ($5,000 - $25,000, 4-8 weeks)
   - 24/7 AI agents for customer support, sales, or internal operations
   - Custom workflows and integrations
   - Full control and customization
   - Best for: Complex business workflows, customer-facing automation

2. RAG Knowledge Bots ($2,000 - $5,000, 2-4 weeks)
   - Document Q&A systems
   - Internal knowledge bases
   - Instant answers from your documents
   - Best for: Document search, FAQ automation, knowledge management

3. Custom Automation Tools ($5,000 - $25,000, 2-6 weeks)
   - Dashboards and analytics
   - Data processing pipelines
   - Custom software solutions
   - Best for: Reporting tools, data pipelines, custom software

4. AI Workflow Automation ($2,000 - $5,000, 1-4 weeks)
   - Email triage and routing
   - Data synchronization
   - Third-party integrations
   - Best for: Business process automation, data integration

TARGET MARKET:
Small to medium businesses (1-50 employees) looking to automate repetitive tasks and scale without hiring.

COMPETITIVE ADVANTAGES:
- Fast delivery (weeks, not months)
- Transparent pricing
- No vendor lock-in
- Expert implementation team`;

  document.getElementById('rag-document').value = sampleDoc;
  document.getElementById('char-count').textContent = sampleDoc.length;

  const suggestions = [
    "What services does Seafin offer?",
    "How much does a RAG Knowledge Bot cost?",
    "What's the timeline for a custom AI assistant?",
    "Who is Seafin's target market?"
  ];

  const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
  document.getElementById('rag-question').placeholder = randomSuggestion;
}

async function askQuestion(e) {
  e.preventDefault();

  const docTextarea = document.getElementById('rag-document');
  const questionInput = document.getElementById('rag-question');
  const answerDiv = document.getElementById('rag-answer');
  const answerContent = document.getElementById('rag-answer-content');
  const submitBtn = document.getElementById('rag-submit-btn');

  const docText = docTextarea.value.trim();
  const question = questionInput.value.trim();

  if (!docText || docText.length < 50) {
    showError('Please provide a document (at least 50 characters)');
    return;
  }

  if (!question || question.length < 5) {
    showError('Please ask a question (at least 5 characters)');
    return;
  }

  if (window.AI && window.AI.rateLimiter && !window.AI.rateLimiter.canCall('rag-query')) {
    showError('Please wait a moment before asking another question');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Analyzing...';
  answerDiv.style.display = 'block';
  answerContent.innerHTML = '<div class="loading"><span class="loading-dots">Processing document</span></div>';

  try {
    const response = await fetch('/api/rag-query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document: docText, query: question })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Query failed');
    }

    const data = await response.json();

    let costBadge = '';
    if (data.usage && data.usage.cost) {
      const cost = data.usage.cost < 0.001 ? '<$0.001' : `$${data.usage.cost.toFixed(3)}`;
      costBadge = `<div style="margin-top: 12px; font-size: 11px; font-family: 'IBM Plex Mono', monospace; color: rgba(0, 212, 255, 0.6);" title="Real-time AI cost">Query cost: ${cost}</div>`;
    }

    answerContent.innerHTML = escapeHTML(data.answer).replace(/\n/g, '<br>') + costBadge;

    if (window.AI && window.AI.log) {
      window.AI.log('RAG query successful:', data.usage);
    }

  } catch (error) {
    answerContent.innerHTML = `<div class="error-message">${escapeHTML(error.message)}</div>`;
    if (window.AI && window.AI.log) {
      window.AI.log('RAG query error:', error.message);
    }
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Ask Question';
  }
}

function showError(message) {
  const answerDiv = document.getElementById('rag-answer');
  const answerContent = document.getElementById('rag-answer-content');

  answerDiv.style.display = 'block';
  answerContent.innerHTML = `<div class="error-message">${escapeHTML(message)}</div>`;

  setTimeout(() => {
    answerDiv.style.display = 'none';
  }, 3000);
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Initialize
initRAGDemo();
