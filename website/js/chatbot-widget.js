/**
 * Chatbot Widget
 * Floating chat interface for Seafin AI assistant
 */

let conversationId = null;
let isOpen = false;
let totalCost = 0;
let messageCount = 0;
let retryAttempts = 0; // Track total retries to prevent abuse
let lastRetryTime = 0; // Track when last retry occurred

function initChatbot() {
  // Create chat widget HTML
  const widget = document.createElement('div');
  widget.id = 'chatbot-widget';
  widget.innerHTML = `
    <!-- Chat bubble button -->
    <button id="chat-bubble" class="chat-bubble" aria-label="Open chat">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <span class="chat-badge">AI</span>
    </button>

    <!-- Chat panel -->
    <div id="chat-panel" class="chat-panel">
      <div class="chat-header">
        <div class="chat-header-content">
          <span class="chat-title">Seafin AI Assistant</span>
          <span class="chat-subtitle">Ask about our services, pricing, and how AI can help your business</span>
          <span class="chat-status">● Online</span>
        </div>
        <button id="chat-close" class="chat-close" aria-label="Close chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div id="chat-messages" class="chat-messages">
        <div class="chat-message bot-message">
          <div class="message-content">
            👋 Hi! I'm Seafin's AI assistant. Ask me about our services, pricing, timelines, or how AI can help your business. What would you like to know?
          </div>
        </div>
      </div>

      <form id="chat-form" class="chat-input-container">
        <input
          type="text"
          id="chat-input"
          class="chat-input"
          placeholder="Ask about our services..."
          autocomplete="off"
          maxlength="500"
        />
        <button type="submit" class="chat-send" aria-label="Send message">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </form>
      <div id="chat-cost" class="chat-cost" style="display: none;" title="Real-time AI cost tracking">
        <span id="chat-cost-text">0 msgs • $0.000</span>
      </div>
    </div>
  `;

  document.body.appendChild(widget);

  // Event listeners
  document.getElementById('chat-bubble').addEventListener('click', toggleChat);
  document.getElementById('chat-close').addEventListener('click', toggleChat);
  document.getElementById('chat-form').addEventListener('submit', sendMessage);

  if (window.AI && window.AI.log) {
    window.AI.log('Chatbot widget initialized');
  }
}

function toggleChat() {
  isOpen = !isOpen;
  const panel = document.getElementById('chat-panel');
  const bubble = document.getElementById('chat-bubble');

  if (isOpen) {
    panel.classList.add('open');
    bubble.classList.add('hidden');
    document.getElementById('chat-input').focus();
  } else {
    panel.classList.remove('open');
    bubble.classList.remove('hidden');
  }
}

async function sendMessage(e) {
  e.preventDefault();

  const input = document.getElementById('chat-input');
  const message = input.value.trim();

  if (!message || message.length < 1) return;

  // Check rate limit
  if (window.AI && window.AI.rateLimiter && !window.AI.rateLimiter.canCall('chat')) {
    addMessage('Please wait a moment before sending another message.', 'bot');
    return;
  }

  // Add user message to UI
  addMessage(message, 'user');
  input.value = '';

  // Try to get response with retry on empty
  await sendMessageWithRetry(message);
}

async function sendMessageWithRetry(message, retryCount = 0) {
  const maxRetries = 2;
  const maxRetriesPerMinute = 5; // Prevent abuse: max 5 retries per minute
  const retryWindowMs = 60000; // 1 minute window

  const funnyMessages = [
    "🤔 Hmm, the AI seems to be taking a coffee break. Let me try again...",
    "🎭 The AI is being mysterious. One more time...",
    "🔄 Got the silent treatment there. Asking again...",
    "💭 That was awkwardly quiet. Retrying...",
    "🎲 The AI rolled snake eyes. Rolling again..."
  ];

  // Anti-abuse: Check global retry limit
  const now = Date.now();
  if (now - lastRetryTime > retryWindowMs) {
    // Reset counter if window expired
    retryAttempts = 0;
  }

  if (retryAttempts >= maxRetriesPerMinute) {
    const typingId = addTypingIndicator();
    removeTypingIndicator(typingId);
    addMessage('⏸️ Taking a quick breather. Please wait a moment before trying again.', 'bot');
    return;
  }

  // Show typing indicator
  const typingId = addTypingIndicator();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        conversationId
      })
    });

    removeTypingIndicator(typingId);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Chat failed');
    }

    const data = await response.json();
    conversationId = data.conversationId;

    // Validate we got a real reply
    if (!data.reply || data.reply.trim().length === 0) {
      // Empty response - check if we can retry
      if (retryCount < maxRetries && retryAttempts < maxRetriesPerMinute) {
        removeTypingIndicator(typingId);

        // Track retry attempt (anti-abuse)
        retryAttempts++;
        lastRetryTime = Date.now();

        const funnyMsg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
        addMessage(funnyMsg, 'bot');

        if (window.AI && window.AI.log) {
          window.AI.log(`Empty response (attempt ${retryCount + 1}/${retryAttempts} total), retrying...`);
        }

        // Exponential backoff: 1s, 2s, 4s
        const backoffDelay = Math.min(1000 * Math.pow(2, retryCount), 4000);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));

        // Check rate limit before retry
        if (window.AI && window.AI.rateLimiter && !window.AI.rateLimiter.canCall('chat')) {
          addMessage('⏸️ Rate limit reached. Please wait a moment before trying again.', 'bot');
          return;
        }

        return sendMessageWithRetry(message, retryCount + 1);
      } else {
        throw new Error('The AI is being extra shy today. Please try rephrasing your question! 😅');
      }
    }

    // Success! Reset retry counter on successful response
    if (retryCount === 0) {
      retryAttempts = Math.max(0, retryAttempts - 1); // Reward successful requests
    }

    addMessage(data.reply, 'bot');

    // Update cost tracking
    if (data.usage) {
      messageCount++;
      totalCost += data.usage.cost || 0;
      updateCostDisplay();
    }

  } catch (error) {
    removeTypingIndicator(typingId);

    // Show specific error if available, otherwise generic message
    const errorMessage = error.message === 'Message too short'
      ? 'Please send a longer message (at least 3 characters).'
      : error.message || 'Sorry, I\'m having trouble connecting. Please try the contact form below.';

    addMessage(errorMessage, 'bot');

    if (window.AI && window.AI.log) {
      window.AI.log('Chat error:', error.message);
    }
  }
}

function addMessage(content, type) {
  const messagesContainer = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${type}-message`;

  messageDiv.innerHTML = `
    <div class="message-content">${escapeHTML(content)}</div>
  `;

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addTypingIndicator() {
  const messagesContainer = document.getElementById('chat-messages');
  const typingDiv = document.createElement('div');
  const id = 'typing-' + Date.now();
  typingDiv.id = id;
  typingDiv.className = 'chat-message bot-message typing';
  typingDiv.innerHTML = `
    <div class="message-content">
      <span class="typing-dots">
        <span></span><span></span><span></span>
      </span>
    </div>
  `;
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function updateCostDisplay() {
  const costEl = document.getElementById('chat-cost');
  const costText = document.getElementById('chat-cost-text');

  if (messageCount > 0) {
    costEl.style.display = 'block';
    const formattedCost = totalCost < 0.001 ? '<$0.001' : `$${totalCost.toFixed(3)}`;
    costText.textContent = `${messageCount} msg${messageCount > 1 ? 's' : ''} • ${formattedCost}`;
  }
}

// Initialize chatbot
initChatbot();
