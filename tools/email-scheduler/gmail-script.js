/**
 * Seafin Email → AI → Auto-Booking Pipeline
 * Google Apps Script — paste into script.google.com
 *
 * Setup:
 *   1. Go to script.google.com → New Project
 *   2. Paste this entire file
 *   3. Update CONFIG below with your values
 *   4. Run setup() once to create labels
 *   5. Add trigger: Edit → Triggers → Add → processNewEmails → Time-driven → Every 5 minutes
 */

// ============================================================================
// CONFIG — Update these values
// ============================================================================

const CONFIG = {
  // Your Vercel API URL
  API_URL: 'https://seafin.vercel.app/api/classify-email',

  // Shared secret — must match EMAIL_API_KEY in Vercel dashboard
  API_KEY: 'YOUR_API_KEY_HERE',

  // Cal.com booking link (used as fallback; the API also injects it)
  BOOKING_URL: 'https://cal.com/seafin/intro',

  // Gmail label for processed emails
  LABEL_NAME: 'AI-Processed',

  // Max emails to process per run (stay within Apps Script limits)
  BATCH_SIZE: 10,

  // Skip emails older than this many hours
  MAX_AGE_HOURS: 24,

  // Google Sheet ID for logging (optional — leave empty to skip)
  // Create a sheet, grab the ID from the URL: docs.google.com/spreadsheets/d/THIS_PART/edit
  LOG_SHEET_ID: '',

  // Set to true to enable auto-replies. Start with false to test classification only.
  AUTO_REPLY_ENABLED: false,

  // Email addresses to never process (your own, team, etc.)
  SKIP_ADDRESSES: [
    'noreply@',
    'no-reply@',
    'mailer-daemon@',
    'notifications@',
    'newsletter@'
  ]
};

// ============================================================================
// SETUP — Run once to create Gmail label
// ============================================================================

function setup() {
  getOrCreateLabel(CONFIG.LABEL_NAME);
  Logger.log('Setup complete. Label "' + CONFIG.LABEL_NAME + '" created.');
  Logger.log('Next: Add a time-driven trigger for processNewEmails (every 5 minutes).');

  if (CONFIG.API_KEY === 'YOUR_API_KEY_HERE') {
    Logger.log('WARNING: Update CONFIG.API_KEY with your actual key!');
  }

  if (CONFIG.LOG_SHEET_ID) {
    initLogSheet();
    Logger.log('Log sheet initialized.');
  }
}

// ============================================================================
// MAIN — Process new emails
// ============================================================================

function processNewEmails() {
  const label = getOrCreateLabel(CONFIG.LABEL_NAME);
  const cutoff = new Date(Date.now() - CONFIG.MAX_AGE_HOURS * 60 * 60 * 1000);

  // Search for unread emails not already labeled
  const query = 'is:unread -label:' + CONFIG.LABEL_NAME;
  const threads = GmailApp.search(query, 0, CONFIG.BATCH_SIZE);

  if (threads.length === 0) {
    Logger.log('No new emails to process.');
    return;
  }

  Logger.log('Found ' + threads.length + ' threads to process.');

  for (const thread of threads) {
    try {
      const messages = thread.getMessages();
      const latest = messages[messages.length - 1];

      // Skip old emails
      if (latest.getDate() < cutoff) {
        thread.addLabel(label);
        continue;
      }

      // Skip emails from addresses we want to ignore
      const fromAddress = latest.getFrom().toLowerCase();
      if (shouldSkip(fromAddress)) {
        thread.addLabel(label);
        continue;
      }

      // Classify
      const result = classifyEmail(
        latest.getFrom(),
        latest.getSubject(),
        latest.getPlainBody()
      );

      if (!result.success) {
        Logger.log('Classification failed for: ' + latest.getSubject());
        continue;
      }

      Logger.log(
        'Classified "' + latest.getSubject() + '" as ' +
        result.classification + ' (confidence: ' + result.confidence + ')'
      );

      // Auto-reply if enabled and we have a suggested reply
      if (CONFIG.AUTO_REPLY_ENABLED && result.suggestedReply && result.classification !== 'spam') {
        latest.reply(result.suggestedReply);
        Logger.log('Auto-replied to: ' + latest.getFrom());
      }

      // Label as processed
      thread.addLabel(label);
      thread.markRead();

      // Log to sheet
      logToSheet({
        timestamp: new Date(),
        from: latest.getFrom(),
        subject: latest.getSubject(),
        classification: result.classification,
        confidence: result.confidence,
        shouldBook: result.shouldBook,
        need: result.extracted?.need || '',
        replied: CONFIG.AUTO_REPLY_ENABLED && result.suggestedReply && result.classification !== 'spam',
        cost: result.cost || 0
      });

    } catch (err) {
      Logger.log('Error processing thread: ' + err.message);
    }
  }
}

// ============================================================================
// API CALL — Send email to Vercel for classification
// ============================================================================

function classifyEmail(from, subject, body) {
  // Truncate body to stay within limits
  const truncatedBody = (body || '').substring(0, 5000);

  const payload = {
    from: from,
    subject: subject || '(no subject)',
    body: truncatedBody,
    apiKey: CONFIG.API_KEY
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(CONFIG.API_URL, options);
  const code = response.getResponseCode();

  if (code === 429) {
    Logger.log('Rate limited. Will retry next run.');
    return { success: false, error: 'rate_limited' };
  }

  if (code !== 200) {
    Logger.log('API error ' + code + ': ' + response.getContentText());
    return { success: false, error: 'api_error_' + code };
  }

  return JSON.parse(response.getContentText());
}

// ============================================================================
// HELPERS
// ============================================================================

function getOrCreateLabel(name) {
  let label = GmailApp.getUserLabelByName(name);
  if (!label) {
    label = GmailApp.createLabel(name);
  }
  return label;
}

function shouldSkip(fromAddress) {
  return CONFIG.SKIP_ADDRESSES.some(function(pattern) {
    return fromAddress.indexOf(pattern) !== -1;
  });
}

// ============================================================================
// LOGGING — Optional Google Sheets logging
// ============================================================================

function initLogSheet() {
  if (!CONFIG.LOG_SHEET_ID) return;

  const ss = SpreadsheetApp.openById(CONFIG.LOG_SHEET_ID);
  let sheet = ss.getSheetByName('Email Log');

  if (!sheet) {
    sheet = ss.insertSheet('Email Log');
    sheet.appendRow([
      'Timestamp', 'From', 'Subject', 'Classification',
      'Confidence', 'Should Book', 'Need', 'Replied', 'Cost ($)'
    ]);
    sheet.getRange('1:1').setFontWeight('bold');
  }
}

function logToSheet(data) {
  if (!CONFIG.LOG_SHEET_ID) return;

  try {
    const ss = SpreadsheetApp.openById(CONFIG.LOG_SHEET_ID);
    const sheet = ss.getSheetByName('Email Log');

    if (!sheet) {
      initLogSheet();
      return logToSheet(data);
    }

    sheet.appendRow([
      data.timestamp,
      data.from,
      data.subject,
      data.classification,
      data.confidence,
      data.shouldBook,
      data.need,
      data.replied,
      data.cost
    ]);
  } catch (err) {
    Logger.log('Sheet logging failed: ' + err.message);
  }
}

// ============================================================================
// MANUAL TEST — Run this to test with a fake email
// ============================================================================

function testClassification() {
  const result = classifyEmail(
    'jane@acmecorp.com',
    'Looking for AI chatbot solution',
    'Hi, we are a 25-person marketing agency looking for an AI chatbot for our customer support. We currently handle about 200 tickets per day and want to automate the common ones. Budget is flexible. Can we set up a call this week?'
  );

  Logger.log('Test result:');
  Logger.log(JSON.stringify(result, null, 2));
}
