/**
 * AI Features Coordinator
 * Central control for all AI-powered features on Seafin website
 *
 * Features:
 * - Smart Contact Form (Phase 1) ✅
 * - Intelligent Chatbot (Phase 2) ✅
 * - Live RAG Demo (Phase 3) ✅
 * - ROI Calculator (Phase 4) ✅
 */

const AI_FEATURES = {
  smartForm: true,      // Phase 1: Real-time form analysis
  chatbot: true,        // Phase 2: Claude-powered assistant ✅
  ragDemo: true,        // Phase 3: Document Q&A showcase ✅
  roiCalculator: true,  // Phase 4: Automation ROI analysis ✅
  debug: false          // Set to true for console logging (production: false)
};

/**
 * Client-side rate limiter
 * Prevents excessive API calls before they reach the server
 */
const rateLimiter = {
  lastCall: {},

  canCall(endpoint) {
    const now = Date.now();
    const lastCall = this.lastCall[endpoint] || 0;
    const timeSinceLastCall = now - lastCall;

    // Minimum 2 seconds between calls per endpoint
    if (timeSinceLastCall < 2000) {
      if (AI_FEATURES.debug) {
        console.log(`Rate limit: ${endpoint} called ${timeSinceLastCall}ms ago (min 2000ms)`);
      }
      return false;
    }

    this.lastCall[endpoint] = now;
    return true;
  },

  reset(endpoint) {
    if (endpoint) {
      delete this.lastCall[endpoint];
    } else {
      this.lastCall = {};
    }
  }
};

/**
 * Initialize AI features when DOM is ready
 */
function initAIFeatures() {
  if (AI_FEATURES.debug) {
    console.log('🤖 AI Features initialized:', AI_FEATURES);
  }

  // Phase 1: Smart Contact Form
  if (AI_FEATURES.smartForm) {
    loadSmartForm();
  }

  // Phase 2: Intelligent Chatbot
  if (AI_FEATURES.chatbot) {
    loadChatbot();
  }

  // Phase 3: Live RAG Demo
  if (AI_FEATURES.ragDemo) {
    loadRAGDemo();
  }

  // Phase 4: ROI Calculator
  if (AI_FEATURES.roiCalculator) {
    loadROICalculator();
  }
}

// Initialize when DOM is ready (handles both cases: before and after load)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAIFeatures);
} else {
  // DOM already loaded (common for modules which are deferred)
  initAIFeatures();
}

/**
 * Load Smart Contact Form feature
 */
function loadSmartForm() {
  // Dynamically import the module
  import('./smart-form.js')
    .then(module => {
      if (AI_FEATURES.debug) {
        console.log('✅ Smart Form loaded');
      }
    })
    .catch(error => {
      console.error('❌ Smart Form failed to load:', error);
      // Graceful degradation: form still works without AI suggestions
    });
}

/**
 * Load Chatbot Widget (Phase 2)
 */
function loadChatbot() {
  import('./chatbot-widget.js')
    .then(module => {
      if (AI_FEATURES.debug) {
        console.log('✅ Chatbot loaded');
      }
    })
    .catch(error => {
      console.error('❌ Chatbot failed to load:', error);
    });
}

/**
 * Load RAG Demo (Phase 3)
 */
function loadRAGDemo() {
  import('./rag-demo.js')
    .then(module => {
      if (AI_FEATURES.debug) {
        console.log('✅ RAG Demo loaded');
      }
    })
    .catch(error => {
      console.error('❌ RAG Demo failed to load:', error);
    });
}

/**
 * Load ROI Calculator (Phase 4)
 */
function loadROICalculator() {
  import('./roi-calculator.js')
    .then(module => {
      if (AI_FEATURES.debug) {
        console.log('✅ ROI Calculator loaded');
      }
    })
    .catch(error => {
      console.error('❌ ROI Calculator failed to load:', error);
    });
}

// Export for use by feature modules
window.AI = {
  features: AI_FEATURES,
  rateLimiter,
  log: (message, ...args) => {
    if (AI_FEATURES.debug) {
      console.log(`[AI] ${message}`, ...args);
    }
  }
};
