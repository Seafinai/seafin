# Vercel Deployment Guide for Seafin

**Last Updated:** February 14, 2026
**Status:** ✅ PRODUCTION READY

## Table of Contents
1. [Quick Reference](#quick-reference)
2. [Project Structure](#project-structure)
3. [How Vercel Deployment Works](#how-vercel-deployment-works)
4. [Environment Variables](#environment-variables)
5. [Deployment Workflow](#deployment-workflow)
6. [Troubleshooting](#troubleshooting)
7. [Sources](#sources)

---

## Quick Reference

### Production URL
**https://seafin.vercel.app**

### Deploy Command
```bash
git push origin main
```

That's it! Vercel auto-deploys in ~30-60 seconds.

### Environment Variables (Set in Vercel Dashboard)
- `OPENROUTER_API_KEY` - Your OpenRouter API key
- `MAX_DAILY_COST` - Cost limit (e.g., "5")
- `NODE_ENV` - "production"

---

## Project Structure

### CRITICAL: Directory Layout

```
seafin/                          ← Project root
├── api/                         ← ⚠️ MUST BE AT ROOT
│   ├── test.js                  → /api/test
│   ├── chat.js                  → /api/chat
│   ├── analyze-form.js          → /api/analyze-form
│   └── rag-query.js             → /api/rag-query
├── website/                     ← Static files (HTML/CSS/JS)
│   ├── index.html               → / (root)
│   ├── favicon.svg              → /favicon.svg
│   └── ...other static files
├── vercel.json                  ← Vercel configuration
├── package.json
└── README.md
```

### Why This Structure?

**Static Files:**
- Served from `website/` directory (set as `outputDirectory` in Vercel settings)
- Files in `website/index.html` → served at `/`
- Files in `website/assets/style.css` → served at `/assets/style.css`

**Serverless Functions:**
- **MUST** be at `/api/` in project root (NOT inside `website/`)
- Vercel auto-detects `.js` files in `/api/` as serverless functions
- Functions in `api/test.js` → available at `/api/test`

**❌ WRONG (What We Fixed):**
```
seafin/
└── website/
    ├── index.html
    └── api/              ← This doesn't work!
        └── test.js
```

**✅ CORRECT:**
```
seafin/
├── api/                  ← Functions at root!
│   └── test.js
└── website/              ← Static files in output dir
    └── index.html
```

---

## How Vercel Deployment Works

### 1. Git Push Trigger
When you push to `main` branch:
```bash
git push origin main
```

Vercel webhook detects the push within seconds.

### 2. Build Process
```
1. Clone repository
2. Load environment variables from Vercel dashboard
3. Detect framework/build system (we use "Other" - no build)
4. Copy static files from outputDirectory (`website/`) to CDN
5. Detect serverless functions in `/api/`
6. Bundle each function as a Lambda
7. Deploy to edge network
8. Assign to production URL
```

### 3. Function Detection
Vercel automatically detects serverless functions by:
- Looking in `/api/` directory at project root
- Finding `.js`, `.ts`, `.go`, `.py`, `.rb` files
- Checking for valid handler exports

**Each function MUST export a default handler:**
```javascript
// api/function-name.js
export default async function handler(req, res) {
  // Your code here
  return res.status(200).json({ success: true });
}
```

### 4. Environment Variable Injection
- Env vars set in Vercel dashboard are automatically injected at runtime
- Access via `process.env.VARIABLE_NAME`
- No `.env` files needed (Vercel handles this)

---

## Environment Variables

### Setting Environment Variables

**Option 1: Vercel Dashboard (Recommended)**
1. Go to https://vercel.com/dashboard
2. Select "seafin" project
3. Settings → Environment Variables
4. Add variable:
   - **Key:** `OPENROUTER_API_KEY`
   - **Value:** `sk-or-v1-your-key-here`
   - **Environments:** Production, Preview, Development (check all)
5. Click "Save"

**Option 2: Vercel CLI**
```bash
vercel env add OPENROUTER_API_KEY production
```

**Option 3: Vercel MCP Server (if available)**
```
Use mcp__vercel__vercel_create_env_var tool
```

### Required Variables
- `OPENROUTER_API_KEY` (type: encrypted, sensitive)
- `MAX_DAILY_COST` (type: plain)
- `NODE_ENV` (type: plain, value: "production")

### Accessing in Functions
```javascript
export default async function handler(req, res) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const maxCost = process.env.MAX_DAILY_COST;
  const env = process.env.NODE_ENV;

  // Use variables...
}
```

---

## Deployment Workflow

### Standard Deployment
```bash
# 1. Make changes to code
# 2. Commit changes
git add .
git commit -m "Description of changes

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 3. Push to GitHub
git push origin main

# 4. Wait ~30-60 seconds
# 5. Verify at https://seafin.vercel.app
```

### Testing API Endpoints
```bash
# Test endpoint
curl -X POST https://seafin.vercel.app/api/test \
  -H "Content-Type: application/json" \
  -d '{}'

# Expected response:
# {"success": true, "message": "Vercel deployment test", ...}
```

### Monitoring Deployments

**Via Vercel Dashboard:**
- https://vercel.com/robcrider-9851s-projects/seafin
- View deployment status, logs, errors

**Via Vercel MCP Server:**
```javascript
// List recent deployments
mcp__vercel__vercel_list_deployments({ projectId: "seafin", limit: 5 })

// Get deployment details
mcp__vercel__vercel_get_deployment({ deploymentId: "dpl_xxx" })

// Get error logs
mcp__vercel__vercel_get_error_logs({ deploymentId: "dpl_xxx" })
```

---

## Troubleshooting

### Issue: API Returns 404

**Symptom:**
```bash
curl https://seafin.vercel.app/api/test
# Response: The page could not be found - NOT_FOUND
```

**Cause:** Functions not detected by Vercel

**Solution:**
1. Ensure `/api/` is at project root (NOT in `website/`)
2. Check build logs for function detection:
   ```javascript
   mcp__vercel__vercel_get_build_logs({ deploymentId: "dpl_xxx" })
   ```
3. Look for `"lambdaRuntimeStats": "{\"nodejs\":4}"` in deployment metadata
4. If not detected, move `website/api/` to `api/`

### Issue: Environment Variables Not Working

**Symptom:**
```javascript
process.env.OPENROUTER_API_KEY === undefined
```

**Solution:**
1. Check Vercel dashboard: Settings → Environment Variables
2. Ensure variables are set for correct environment (Production/Preview/Development)
3. Verify in test endpoint:
   ```bash
   curl https://seafin.vercel.app/api/test
   # Check "environment" object in response
   ```
4. Re-deploy after adding new env vars:
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push origin main
   ```

### Issue: Deployment Protection (Authentication Required)

**Symptom:**
Accessing deployment shows "Vercel Authentication" page

**Cause:**
- Preview deployments have protection enabled by default
- Using auto-generated URL instead of production URL

**Solution:**
Use production URL: **https://seafin.vercel.app**

Auto-generated URLs (like `seafin-jsem3tthy-robcrider-9851s-projects.vercel.app`) require auth.

### Issue: Build Failed

**Steps to Debug:**
1. Get build logs:
   ```javascript
   mcp__vercel__vercel_get_build_logs({ deploymentId: "dpl_xxx" })
   ```
2. Check error logs:
   ```javascript
   mcp__vercel__vercel_get_error_logs({ deploymentId: "dpl_xxx" })
   ```
3. Common issues:
   - Invalid `vercel.json` syntax
   - Missing dependencies in `package.json`
   - Build command errors (not applicable for static sites)

### Issue: Functions Timeout

**Symptom:**
Function takes >10 seconds and times out

**Solution:**
1. Check Vercel function limits (Hobby plan: 10s max)
2. Optimize function code
3. Consider upgrading plan for longer timeouts

---

## Sources

Based on official Vercel documentation (January 2026):

- [Vercel Functions](https://vercel.com/docs/functions) - Official functions documentation
- [Functions API Reference](https://vercel.com/docs/functions/functions-api-reference) - API handler reference
- [Project Configuration](https://vercel.com/docs/projects/project-configuration) - Project settings
- [Build Output API](https://vercel.com/docs/build-output-api) - Build output specification
- [Vercel Primitives](https://vercel.com/docs/build-output-api/primitives) - Directory structure

---

## Vercel Configuration File

### Current `vercel.json`
```json
{}
```

**Why empty?**
- No rewrites needed (output directory handles static files)
- Functions auto-detected in `/api/`
- Simplest configuration that works

**Previous (WRONG) configuration:**
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/website/api/:path*"  ← This caused 404s!
    }
  ]
}
```

---

## Quick Checklist

Before deploying, verify:

- [ ] `/api/` directory exists at project root
- [ ] API functions export default handler: `export default async function handler(req, res)`
- [ ] `website/` contains static files (HTML/CSS/JS)
- [ ] Environment variables set in Vercel dashboard
- [ ] `vercel.json` is minimal (ideally `{}`)
- [ ] Git working tree is clean
- [ ] Changes committed with descriptive message

Deploy:
```bash
git push origin main
```

Test:
```bash
curl https://seafin.vercel.app/api/test
```

---

**Status:** ✅ All systems operational
**Deployment:** Auto-deploy enabled on `main` branch
**Functions:** 4 detected and working
**Environment:** Production
