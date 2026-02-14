# Testing Guide - How to Verify PRs Don't Break Anything

This guide shows you how to verify that security updates and dependency changes won't break your site.

## 🎯 Quick Answer: 3-Layer Safety Net

Your site now has **three layers of protection** to catch breaking changes:

### 1. **Automated GitHub Actions Tests** (Runs on Every PR)
- ✅ Installs dependencies
- ✅ Runs security audit
- ✅ Checks JavaScript syntax
- ✅ Validates Vercel config
- ✅ Posts results as PR comment

### 2. **Vercel Preview Deployments** (Automatic)
- ✅ Deploys every PR to a preview URL
- ✅ Test the live site before merging
- ✅ No risk to production

### 3. **Local Testing** (Manual, Before Merge)
- ✅ Test on your machine
- ✅ Catch issues early
- ✅ Full control

---

## 🚀 Method 1: GitHub Actions (Automatic - Best for Most PRs)

**This runs automatically on every PR!**

### How It Works

1. **Dependabot creates PR** (e.g., update puppeteer)
2. **GitHub Actions runs tests automatically**
3. **Test results appear as PR comment**
4. **Review results, merge if passing**

### What Gets Tested

- ✅ Dependencies install without errors
- ✅ No high/critical security vulnerabilities
- ✅ JavaScript syntax is valid
- ✅ Vercel config is correct
- ✅ Website files exist
- ✅ Dependency size is reasonable

### View Test Results

1. Go to PR: https://github.com/Seafinai/seafin/pulls
2. Click on a PR
3. Scroll to "Checks" section
4. See test results:
   - ✅ Green checkmark = Safe to merge
   - ❌ Red X = Review failures
   - ⚠️ Yellow warning = Check logs

**Example:**
```
✅ All checks have passed
  ✅ test-dependencies
  ✅ test-vercel-deployment
  ✅ comment-results
```

---

## 🌐 Method 2: Vercel Preview Deployments (Automatic)

**Every PR gets a live preview URL!**

### How to Use

1. **Go to the PR** on GitHub
2. **Find Vercel bot comment** (appears ~30 seconds after PR creation)
3. **Click "Visit Preview"** link
4. **Test the live site**:
   - Check homepage loads
   - Test chatbot
   - Test ROI calculator
   - Test contact form

### What to Check

```bash
# Example: PR #5 (puppeteer update)
1. Click "Visit Preview" → https://seafin-{pr-number}.vercel.app
2. Test homepage: Does it load?
3. Test interactive features: Do they work?
4. Check console: Any JavaScript errors?
5. If everything works → Safe to merge!
```

**Vercel Preview URLs:**
- Each PR gets unique URL: `seafin-git-{branch-name}-seafinai.vercel.app`
- URL shown in PR comments by Vercel bot
- Automatically updated on new commits

---

## 💻 Method 3: Test Locally (Manual)

**For critical updates or if you want extra confidence:**

### Quick Test (1 minute)

```bash
# Run automated test script
./scripts/test-locally.sh
```

This tests:
- ✅ Dependencies install
- ✅ Security audit passes
- ✅ API functions syntax is valid
- ✅ Puppeteer loads (if updated)
- ✅ Website files exist

### Manual Test of Specific PR

```bash
# 1. Checkout the PR branch
gh pr checkout 5  # Replace 5 with PR number

# 2. Install dependencies
npm install

# 3. Run security audit
npm run security:check

# 4. Test API functions
node --check api/chat.js
node --check api/analyze-form.js
node --check api/rag-query.js
node --check api/roi-calculator.js

# 5. Test puppeteer (if updated)
node -e "const p = require('puppeteer'); console.log(p.version);"

# 6. If everything passes, merge the PR
gh pr merge 5 --squash
```

### Full Local Development Test

```bash
# 1. Checkout PR
gh pr checkout 5

# 2. Install dependencies
npm install

# 3. Run security audit
npm audit

# 4. Test with Vercel CLI (optional)
npm install -g vercel
vercel dev  # Runs local dev server at http://localhost:3000

# 5. Open browser and test:
#    - http://localhost:3000 (website)
#    - http://localhost:3000/api/test (API test)

# 6. If working, merge!
gh pr merge 5
```

---

## 📋 What to Test for Each PR Type

### Puppeteer Updates (PR #5)

**Risk Level:** Low (dev dependency, only affects screenshots)

**What to Test:**
```bash
# Quick test
node -e "require('puppeteer'); console.log('✅ Works');"

# If you use puppeteer scripts
node capture-screenshot.js  # Or whatever script you use
```

**Safe to merge if:** Test runs without errors

---

### GitHub Actions Updates (PR #1-4)

**Risk Level:** Very Low (only affects CI/CD, not production)

**What to Test:**
- ✅ Check that GitHub Actions workflow still runs (it does automatically)
- ✅ View workflow results in PR checks

**Safe to merge if:** PR checks pass (green checkmark)

---

### API Function Changes

**Risk Level:** High (affects production website)

**What to Test:**
```bash
# 1. Syntax check
node --check api/chat.js

# 2. Test API locally
node test-roi-api.js  # Or create simple test

# 3. Test on Vercel preview
curl https://seafin-git-{branch}.vercel.app/api/test
```

**Safe to merge if:**
- ✅ Syntax check passes
- ✅ API returns expected response
- ✅ No errors in console

---

## 🎯 Decision Tree: Should I Merge This PR?

```
Is it a Dependabot PR?
│
├─ Yes → GitHub Actions tests pass?
│        │
│        ├─ Yes → ✅ SAFE TO MERGE
│        └─ No → ⚠️ Review failures, test locally
│
└─ No → Is it a code change PR?
         │
         ├─ Yes → Test locally + Vercel preview?
         │        │
         │        ├─ Both pass → ✅ SAFE TO MERGE
         │        └─ Issues found → ❌ DON'T MERGE, fix issues
         │
         └─ No → Manual review needed
```

---

## 🚨 Red Flags - Don't Merge If:

- ❌ GitHub Actions tests fail
- ❌ Vercel preview shows errors
- ❌ Security audit shows new high/critical vulnerabilities
- ❌ API functions have syntax errors
- ❌ Website doesn't load on preview
- ❌ Console shows JavaScript errors

---

## ✅ Green Lights - Safe to Merge If:

- ✅ All GitHub Actions checks pass (green checkmarks)
- ✅ Vercel preview works correctly
- ✅ No new security vulnerabilities
- ✅ Local tests pass (if you ran them)

---

## 📊 Current PR Testing Status

Run this to check all open PRs:

```bash
# List all PRs with status
gh pr list

# View specific PR with checks
gh pr view 5 --comments

# Check workflow runs
gh run list --workflow="PR Tests & Validation"
```

---

## 🔧 Troubleshooting

### "Tests are failing but I don't know why"

```bash
# View detailed logs
gh run view <run-id> --log-failed

# Or on GitHub
# Go to PR → Checks → Click failed check → View details
```

### "Vercel preview isn't deploying"

1. Check Vercel dashboard: https://vercel.com/seafinai/seafin
2. Look for deployment errors
3. Check `vercel.json` syntax: `cat vercel.json | jq empty`

### "Local tests pass but GitHub Actions fail"

- Different Node.js version? (GitHub uses v20)
- Different dependencies? (Run `npm ci` instead of `npm install`)
- Environment variables? (Check Vercel dashboard)

---

## 📚 Additional Resources

- **GitHub Actions Workflows:** `.github/workflows/test-pr.yml`
- **Local Test Script:** `scripts/test-locally.sh`
- **Security Guide:** `SECURITY.md`
- **Deployment Guide:** `CLAUDE.md`

---

## 🎓 Best Practices

1. **For Dependabot PRs:** Trust the automated tests
2. **For code changes:** Always test on Vercel preview
3. **For major updates:** Test locally first
4. **When unsure:** Test locally before merging

**Remember:** Vercel auto-deploys after merge, so test before merging!

---

**Last Updated:** 2026-02-14
**Automated Tests:** Enabled
**Vercel Previews:** Enabled
**Risk Level:** Low (multiple safety nets in place)
