/**
 * RAG Demo
 * Interactive demonstration of document Q&A
 */

function initRAGDemo() {
  // Find insertion point (after services section)
  const main = document.querySelector('main');
  if (!main) {
    console.error('RAG Demo: main element not found');
    return;
  }

  // Create RAG demo section
  const section = document.createElement('section');
  section.id = 'rag-demo';
  section.className = 'rag-demo-section';
  section.innerHTML = `
    <div class="container">
      <div class="rag-demo-header">
        <span class="coord" style="top: -8px; left: 0;">INTERACTIVE DEMO</span>
        <h2 class="section-title">Try KnowledgeClaw</h2>
        <p class="section-subtitle">
          Upload a document and ask questions. See how AI instantly finds and explains information from your content.
        </p>
      </div>

      <div class="rag-demo-grid">
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

      <div class="rag-demo-cta">
        <p>
          <strong>Want this for your business?</strong> KnowledgeClaw can search thousands of documents instantly, integrate with your systems, and provide 24/7 answers to your team or customers.
        </p>
        <a href="#contact" class="cta-button">Get Your Custom RAG Bot</a>
      </div>
    </div>
  `;

  // Insert before contact section
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    main.insertBefore(section, contactSection);
  } else {
    main.appendChild(section);
  }

  // Event listeners
  const docTextarea = document.getElementById('rag-document');
  const charCount = document.getElementById('char-count');
  const loadSampleBtn = document.getElementById('load-sample');
  const form = document.getElementById('rag-form');

  docTextarea.addEventListener('input', () => {
    charCount.textContent = docTextarea.value.length;
  });

  loadSampleBtn.addEventListener('click', loadSampleDocument);
  form.addEventListener('submit', askQuestion);

  window.AI.log('RAG Demo initialized');
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

  // Suggest sample questions
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

  const document = docTextarea.value.trim();
  const question = questionInput.value.trim();

  // Validation
  if (!document || document.length < 50) {
    showError('Please provide a document (at least 50 characters)');
    return;
  }

  if (!question || question.length < 5) {
    showError('Please ask a question (at least 5 characters)');
    return;
  }

  // Rate limit check
  if (!window.AI.rateLimiter.canCall('rag-query')) {
    showError('Please wait a moment before asking another question');
    return;
  }

  // Show loading
  submitBtn.disabled = true;
  submitBtn.textContent = 'Analyzing...';
  answerDiv.style.display = 'block';
  answerContent.innerHTML = '<div class="loading"><span class="loading-dots">Processing document</span></div>';

  try {
    const response = await fetch('/api/rag-query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document, query: question })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Query failed');
    }

    const data = await response.json();

    // Display answer
    answerContent.innerHTML = escapeHTML(data.answer).replace(/\n/g, '<br>');

    window.AI.log('RAG query successful:', data.metadata);

  } catch (error) {
    answerContent.innerHTML = `<div class="error-message">${escapeHTML(error.message)}</div>`;
    window.AI.log('RAG query error:', error.message);
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
