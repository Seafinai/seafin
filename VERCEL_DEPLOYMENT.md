# Vercel Deployment Guide

**TL;DR:** Push to git → Vercel auto-deploys → Environment variables work → Done. 🎉

## Why Vercel?

- ✅ **Git auto-deploy** - Push code, Vercel deploys automatically
- ✅ **Environment variables** - Set once in dashboard, automatically injected
- ✅ **Serverless functions** - Just export a function, Vercel handles the rest
- ✅ **Free tier** - 100GB bandwidth, unlimited function invocations
- ✅ **Simple** - No CLI tools, no complex config files

## One-Time Setup (5 Minutes)

### Step 1: Create Vercel Account

1. Go to: **https://vercel.com/signup**
2. Sign up with GitHub (recommended)
3. Authorize Vercel to access your GitHub repos

### Step 2: Import Your Project

1. Click **"Add New Project"**
2. Select **"Import Git Repository"**
3. Choose: `Seafinai/seafin`
4. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** (leave empty for static site)
   - **Output Directory:** `website`

### Step 3: Set Environment Variables

In the Vercel dashboard:

1. Go to: **Settings** → **Environment Variables**
2. Add these variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `OPENROUTER_API_KEY` | `sk-or-v1-your-key` | Production, Preview, Development |
   | `MAX_DAILY_COST` | `5` | Production, Preview, Development |
   | `NODE_ENV` | `production` | Production |

3. Click **"Save"**

### Step 4: Deploy

Click **"Deploy"** - Vercel will:
- Build your site
- Deploy functions
- Inject environment variables
- Give you a live URL (e.g., `seafin.vercel.app`)

**Done!** 🎉

## Project Structure for Vercel

```
seafin/
├── website/
│   ├── index.html              # Static site
│   └── api/
│       ├── test.js             # Function at /api/test
│       ├── analyze-form.js     # Function at /api/analyze-form
│       ├── chat.js             # Function at /api/chat
│       └── rag-query.js        # Function at /api/rag-query
├── vercel.json                 # Vercel config
└── package.json                # Dependencies
```

## Function Format (Vercel/Next.js Style)

```javascript
// website/api/test.js
export default async function handler(req, res) {
  // Access environment variables
  const apiKey = process.env.OPENROUTER_API_KEY;

  // Parse request body
  const { message } = req.body;

  // Return JSON response
  return res.status(200).json({
    success: true,
    data: "Hello from Vercel!"
  });
}
```

**That's it!** No special event object, no template substitution, just simple `req`/`res`.

## Environment Variables Access

```javascript
// Just use process.env - Vercel injects them automatically
const apiKey = process.env.OPENROUTER_API_KEY;
const maxCost = process.env.MAX_DAILY_COST;
const nodeEnv = process.env.NODE_ENV;
```

## Deployment Workflow

**Every time you update code:**

```bash
git add .
git commit -m "Update functions"
git push origin main
```

Vercel automatically:
1. Detects the push
2. Builds and deploys
3. Updates live site
4. Takes ~30-60 seconds

## Testing Functions

Your functions will be available at:
```
https://your-project.vercel.app/api/test
https://your-project.vercel.app/api/analyze-form
https://your-project.vercel.app/api/chat
https://your-project.vercel.app/api/rag-query
```

Test with curl:
```bash
curl -X POST https://your-project.vercel.app/api/test \
  -H "Content-Type: application/json" \
  -d '{"message":"test"}'
```

## Custom Domain (Optional)

1. Go to: **Settings** → **Domains**
2. Add: `seafin.ai`
3. Follow DNS configuration instructions
4. Vercel handles SSL automatically

## vercel.json Configuration

```json
{
  "version": 2,
  "builds": [
    {
      "src": "website/**",
      "use": "@vercel/static"
    },
    {
      "src": "website/api/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/website/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/website/$1"
    }
  ]
}
```

## Common Issues

### "Module not found"
**Solution:** Add `package.json` in project root:
```json
{
  "type": "module",
  "dependencies": {}
}
```

### Environment variables not working
**Solution:** Make sure you set them in **all three environments**: Production, Preview, Development

### Function timeout
**Solution:** Vercel free tier has 10s timeout. For longer operations, upgrade to Pro.

## Differences from DigitalOcean

| Feature | DigitalOcean | Vercel |
|---------|--------------|--------|
| **Deploy** | `doctl deploy` | `git push` |
| **Env vars** | .env file + template substitution | Dashboard UI |
| **Function format** | `main(event)` | `handler(req, res)` |
| **Setup complexity** | High | Low |
| **Auto-deploy** | ❌ (for functions) | ✅ |

## Pricing

**Vercel Free Tier:**
- Unlimited websites
- 100GB bandwidth/month
- Unlimited serverless function invocations
- 100GB-hours function execution

**Vercel Pro** ($20/month):
- 1TB bandwidth
- Unlimited team members
- Analytics
- Password protection

For most small-medium businesses, **free tier is enough**.

## Next Steps

1. ✅ Create Vercel account
2. ✅ Import GitHub repo
3. ✅ Add environment variables
4. ✅ Deploy
5. ✅ Test functions
6. ✅ Update website API URLs (if needed)
7. ✅ Point domain (optional)

---

**You're done!** No CLI tools, no .env files, no complex config. Just push code and it works. 🚀
