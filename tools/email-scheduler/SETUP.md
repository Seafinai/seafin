# Email → AI → Auto-Booking Pipeline

Automatically classify incoming emails with AI and reply to qualified leads with a booking link.

## How It Works

```
Gmail Inbox
    ↓ (Google Apps Script checks every 5 min)
POST /api/classify-email
    ↓ (AI classifies: lead / inquiry / spam / other)
Auto-reply with Cal.com booking link (leads only)
```

## Setup (15 minutes)

### Step 1: Cal.com Booking Link

1. Sign up at [cal.com](https://cal.com) (free)
2. Create an event type (e.g., "15-min Intro Call")
3. Copy the booking URL (e.g., `https://cal.com/seafin/intro`)

### Step 2: Vercel Environment Variables

In your [Vercel dashboard](https://vercel.com) → Project → Settings → Environment Variables, add:

| Variable | Value | Example |
|---|---|---|
| `EMAIL_API_KEY` | Any random secret string | `sk-email-a8f3b2c1d4e5` |
| `BOOKING_URL` | Your Cal.com link | `https://cal.com/seafin/intro` |

`OPENROUTER_API_KEY` should already be set.

### Step 3: Deploy

Push the code (Vercel auto-deploys):

```bash
git add api/classify-email.js
git commit -m "feat: add email classification API"
git push origin main
```

### Step 4: Test the API

```bash
curl -X POST https://seafin.vercel.app/api/classify-email \
  -H "Content-Type: application/json" \
  -d '{
    "from": "jane@acmecorp.com",
    "subject": "Need AI chatbot",
    "body": "Hi, we are a 25-person company looking for a chatbot solution.",
    "apiKey": "YOUR_EMAIL_API_KEY"
  }'
```

You should get back a JSON response with classification, extracted info, and a suggested reply.

### Step 5: Google Apps Script

1. Go to [script.google.com](https://script.google.com) → New Project
2. Delete the default code
3. Copy-paste the entire contents of `gmail-script.js`
4. Update the `CONFIG` section at the top:
   - `API_KEY` → your `EMAIL_API_KEY` from Step 2
   - `BOOKING_URL` → your Cal.com link
   - `LOG_SHEET_ID` → (optional) ID of a Google Sheet for logging
5. Run `setup()` once (authorize when prompted)
6. Run `testClassification()` to verify the API connection works

### Step 6: Enable Auto-Replies

Once you've verified classifications look correct:

1. In `gmail-script.js`, set `AUTO_REPLY_ENABLED: true`
2. Save

### Step 7: Set Up Trigger

1. In Apps Script: Edit → Triggers → Add Trigger
2. Function: `processNewEmails`
3. Event source: Time-driven
4. Type: Minutes timer
5. Interval: Every 5 minutes
6. Save

## Google Sheets Logging (Optional)

1. Create a new Google Sheet
2. Copy the ID from the URL: `docs.google.com/spreadsheets/d/THIS_PART/edit`
3. Paste into `LOG_SHEET_ID` in the script config
4. Run `setup()` again to create the headers

Columns logged: Timestamp, From, Subject, Classification, Confidence, Should Book, Need, Replied, Cost.

## Cost

- **Cal.com**: Free tier
- **Google Apps Script**: Free (runs on your Google account)
- **Vercel**: Free tier (already deployed)
- **AI classification**: ~$0.0004 per email (Kimi via OpenRouter)
- **50 emails/day** ≈ $0.02/day ≈ $0.60/month

## Security

- API key auth prevents unauthorized access
- Rate limited to 50 emails/hour
- Email body truncated to 5,000 characters
- Input sanitized (invisible characters stripped)
- No email content stored server-side

## Troubleshooting

**"Unauthorized" error**: Check that `API_KEY` in the script matches `EMAIL_API_KEY` in Vercel.

**"Rate limited"**: You're processing more than 50 emails/hour. Wait or increase the limit in `classify-email.js`.

**No auto-replies**: Check `AUTO_REPLY_ENABLED` is `true`. Check Apps Script logs (View → Executions).

**Script not running**: Verify the trigger is set (Edit → Triggers). Check that the script has Gmail permissions.
