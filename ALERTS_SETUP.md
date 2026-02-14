# Automated Alerts Setup

Your site now has **automated alerts** that notify you when something breaks!

## 🚨 What Gets Monitored

### 1. **PR Test Failures**
- ✅ Runs on every pull request
- ✅ Creates GitHub issue if tests fail
- ✅ Comments on PR with failure details
- ✅ Blocks merge until fixed

### 2. **Security Vulnerabilities**
- ✅ Weekly security scans
- ✅ Creates high-priority issue for vulnerabilities
- ✅ Includes fix instructions
- ✅ Auto-creates PR with fixes

### 3. **Deployment Failures**
- ✅ Monitors website availability (hourly)
- ✅ Checks after every deployment
- ✅ Creates critical issue if site is down
- ✅ Tests API endpoints

### 4. **Workflow Failures**
- ✅ Monitors all GitHub Actions workflows
- ✅ Creates issue on failure
- ✅ Links to failure logs
- ✅ Suggests fixes

---

## 📬 How You'll Be Notified

### GitHub Issues (Automatic)

When something breaks, you'll get a **GitHub issue** automatically created:

**Examples:**
- `🚨 Workflow Failure: PR Tests & Validation`
- `🔒 SECURITY ALERT: Vulnerabilities Detected`
- `🚨 CRITICAL: Website Down!`

**Where to see them:** https://github.com/Seafinai/seafin/issues

### GitHub Email Notifications (Built-in)

GitHub automatically emails you when:
- ✅ New issue is created
- ✅ PR has failing checks
- ✅ Workflow fails
- ✅ Security alert detected

**Default:** Enabled for your account

**Configure:**
1. Go to: https://github.com/settings/notifications
2. Enable: "Issues", "Pull requests", "Actions"
3. Choose email frequency

### GitHub Mobile App (Optional)

Get push notifications on your phone:
1. Install: GitHub Mobile (iOS/Android)
2. Enable notifications for the `seafin` repo
3. Get instant alerts when issues are created

### Vercel Notifications (Built-in)

Vercel automatically emails you when:
- ✅ Deployment fails
- ✅ Build errors occur
- ✅ Domain issues

**Configure:**
1. Go to: https://vercel.com/seafinai/seafin/settings/notifications
2. Enable email notifications
3. Add additional email addresses if needed

---

## 🎯 Alert Types & What They Mean

### 🚨 CRITICAL: Website Down

**What it means:** Your production website is not accessible

**What to do:**
1. Check Vercel dashboard immediately
2. View deployment logs for errors
3. Rollback to previous version if needed
4. Check recent commits for breaking changes

**Example Issue:**
```
🚨 CRITICAL: Website Down!

Status: ❌ Not accessible
HTTP Code: 500
URL: https://seafin.vercel.app/
```

---

### 🔒 SECURITY ALERT: Vulnerabilities Detected

**What it means:** Security scan found vulnerable dependencies

**What to do:**
1. Review security scan results
2. Run `npm run security:fix`
3. Test locally
4. Merge auto-generated security PR

**Example Issue:**
```
🔒 High-Priority Security Alert

Vulnerabilities detected in your dependencies.
Quick Fix: npm run security:fix
```

---

### 🚨 Tests Failed

**What it means:** PR tests are failing

**What to do:**
1. Review test failure details
2. Fix issues locally
3. Push updates to PR
4. Tests will re-run automatically

**Example PR Comment:**
```
🚨 Tests Failed!

This PR has failing tests that need to be fixed.
View failure details → [link]
```

---

### ⚠️ Workflow Failure

**What it means:** A GitHub Actions workflow failed

**What to do:**
1. View workflow logs
2. Identify the error
3. Fix and re-run workflow

**Example Issue:**
```
🚨 Workflow Failure: Weekly Security Scan

Status: ❌ Failed
View logs → [link]
```

---

## 🔧 Configure Additional Alerts (Optional)

### Slack Notifications

Want Slack alerts? Add this to `.github/workflows/notify-failures.yml`:

```yaml
- name: Send Slack notification
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "🚨 Alert: ${{ steps.details.outputs.failure_type }}",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Workflow:* ${{ steps.details.outputs.workflow_name }}\n*Status:* Failed"
            }
          }
        ]
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

Then add `SLACK_WEBHOOK` secret to GitHub repo.

### Email Notifications (Custom)

Want custom email alerts? Add to workflow:

```yaml
- name: Send email
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 465
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: "🚨 Alert: Build Failed"
    to: your-email@example.com
    from: GitHub Actions
    body: "Workflow ${{ github.workflow }} failed!"
```

### Discord Notifications

```yaml
- name: Discord notification
  uses: sarisia/actions-status-discord@v1
  with:
    webhook: ${{ secrets.DISCORD_WEBHOOK }}
    title: "🚨 Deployment Failed"
    description: "Check logs immediately"
```

---

## 📊 Monitoring Dashboard

### GitHub Actions Dashboard

View all workflow runs:
- **URL:** https://github.com/Seafinai/seafin/actions
- **Shows:** All workflows, pass/fail status, logs

### Vercel Dashboard

View all deployments:
- **URL:** https://vercel.com/seafinai/seafin
- **Shows:** Deployment status, build logs, analytics

### GitHub Issues Dashboard

View all alerts:
- **URL:** https://github.com/Seafinai/seafin/issues
- **Filter by label:** `automated-alert`, `security`, `critical`

---

## 🧪 Test the Alert System

### Test 1: PR Failure Alert

```bash
# Create a test PR with broken code
git checkout -b test-alert
echo "syntax error here {{" > api/test-broken.js
git add api/test-broken.js
git commit -m "test: trigger alert"
git push origin test-alert

# Create PR
gh pr create --title "Test Alert" --body "Testing alert system"

# Wait 1-2 minutes, you should get:
# - Failed GitHub Actions check
# - Comment on PR about failure
# - Email notification
```

### Test 2: Security Alert (Safe Test)

```bash
# Manually trigger security workflow
gh workflow run "Weekly Security Scan & Auto-Update"

# Wait for completion
gh run list --workflow="Weekly Security Scan" --limit 1

# If vulnerabilities exist, you'll get an alert
```

### Test 3: Deployment Monitor

```bash
# Manually trigger deployment check
gh workflow run "Monitor Deployments"

# View results
gh run list --workflow="Monitor Deployments" --limit 1
```

---

## 📋 Alert Summary

| Alert Type | Frequency | Channel | Priority |
|------------|-----------|---------|----------|
| **Website Down** | Hourly check | Issue + Email | 🚨 Critical |
| **Security Vuln** | Weekly | Issue + Email | 🔒 High |
| **PR Test Fail** | Per PR | Comment + Email | ⚠️ Medium |
| **Workflow Fail** | Per workflow | Issue + Email | ⚠️ Medium |
| **Deployment Fail** | Per deploy | Vercel email | 🚨 Critical |

---

## ✅ Current Alert Status

Run this to check alert system health:

```bash
# View recent workflow runs
gh run list --limit 10

# Check for alert issues
gh issue list --label automated-alert

# Test deployment status
curl -I https://seafin.vercel.app/
```

---

## 🔕 Disable Alerts (Not Recommended)

If you need to temporarily disable alerts:

1. **Pause workflows:**
   - Go to: https://github.com/Seafinai/seafin/actions
   - Click workflow → Disable workflow

2. **Unsubscribe from issue notifications:**
   - Go to issue → Click "Unsubscribe"

3. **Turn off GitHub emails:**
   - https://github.com/settings/notifications
   - Uncheck notification types

**⚠️ Warning:** Disabling alerts means you won't know when things break!

---

## 📚 Additional Resources

- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **Vercel Deployment Docs:** https://vercel.com/docs
- **GitHub Notifications:** https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github

---

**Last Updated:** 2026-02-14
**Alert System:** ✅ Active
**Monitoring:** Website, Security, Deployments, Workflows
**Notification Channels:** GitHub Issues, Email, Vercel
