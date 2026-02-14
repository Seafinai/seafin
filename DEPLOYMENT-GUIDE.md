# Seafin Website - Deployment Guide

## ✅ What's Ready

Your site is production-ready with:
- Production `index.html` file
- Contact form connected to Formspree
- Privacy Policy and Terms of Service pages
- Mobile-responsive navigation
- ROI calculator
- All content optimized

---

## Step 1: Push to GitHub

### If GitHub repo doesn't exist yet:

1. **Create repo on GitHub:**
   - Go to: https://github.com/new
   - Repository name: `seafin`
   - Make it **Public** (required for free hosting)
   - Don't initialize with README
   - Click "Create repository"

2. **Push your code:**
   ```bash
   cd C:\Projects\seafin
   git push -u origin main
   ```

### If authentication fails:

Use GitHub CLI or Personal Access Token:

**Option A: GitHub CLI (recommended)**
```bash
# Install: winget install GitHub.cli
gh auth login
git push
```

**Option B: Personal Access Token**
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo`
4. Copy token
5. Use when prompted for password

---

## Step 2: Deploy to DigitalOcean App Platform

1. **Go to DigitalOcean Apps:**
   https://cloud.digitalocean.com/apps

2. **Create New App:**
   - Click "Create App"
   - Choose "GitHub" as source
   - Authorize DigitalOcean to access your repos
   - Select `Seafinai/seafin` repository
   - Select `main` branch

3. **Configure Build Settings:**
   - **Name:** seafin-website
   - **Source Directory:** `/website`
   - **Build Command:** (leave empty - static site)
   - **Output Directory:** `/website`
   - **Environment:** Static Site

4. **Configure App:**
   - **App Name:** seafin-website
   - **Region:** Choose closest to your users (e.g., NYC, SFO)
   - **Plan:** Static Site - **FREE**

5. **Deploy:**
   - Review settings
   - Click "Create Resources"
   - Wait 2-3 minutes for deployment

6. **Your site is live!**
   - You'll get a URL like: `seafin-website-xxxxx.ondigitalocean.app`

---

## Step 3: Add Custom Domain (seafin.ai)

1. **In App Platform:**
   - Go to your app
   - Click "Settings" tab
   - Click "Domains"
   - Click "Add Domain"
   - Enter: `seafin.ai` and `www.seafin.ai`

2. **Update DNS (at your domain registrar):**

   Add these records:

   **For seafin.ai:**
   ```
   Type: A
   Name: @
   Value: [IP provided by DigitalOcean]
   TTL: 3600
   ```

   **For www.seafin.ai:**
   ```
   Type: CNAME
   Name: www
   Value: [domain provided by DigitalOcean]
   TTL: 3600
   ```

3. **SSL Certificate:**
   - DigitalOcean automatically provisions free SSL
   - Takes 5-10 minutes after DNS propagates
   - Your site will be accessible via HTTPS

---

## Step 4: Test Everything

1. **Test Contact Form:**
   - Fill out form on live site
   - Verify you receive email
   - Check success message appears

2. **Test Mobile:**
   - Open on phone
   - Verify hamburger menu works
   - Check all links work

3. **Test Pages:**
   - Privacy Policy loads
   - Terms of Service loads
   - All internal links work

---

## Ongoing: Auto-Deploy on Git Push

Once set up, any changes you push to GitHub will automatically deploy:

```bash
cd C:\Projects\seafin

# Make changes to files
git add .
git commit -m "Update pricing"
git push

# DigitalOcean automatically deploys in 2-3 minutes
```

---

## Summary of Costs

- **GitHub:** Free (public repo)
- **DigitalOcean App Platform:** FREE (static sites)
- **SSL Certificate:** FREE (auto-provisioned)
- **Formspree:** Free tier (50 submissions/month)

**Total monthly cost: $0**

(Upgrade to Formspree paid plan at $10/mo if you exceed 50 submissions)

---

## Troubleshooting

**"Build failed" on DigitalOcean:**
- Make sure Source Directory is `/website`
- Output Directory should be `/website`
- Build command should be empty

**Form not working:**
- Verify Formspree ID: `xreagnvq`
- Check spam folder for test emails
- First submission requires confirmation

**Domain not connecting:**
- DNS propagation takes 1-24 hours
- Use https://dnschecker.org to verify
- Make sure SSL certificate shows "Active"

---

## Next Steps After Launch

1. **Monitor Formspree dashboard** for submissions
2. **Set up Google Analytics** (optional)
3. **Update social media links** when accounts are created
4. **Add actual client testimonials** as you get them
5. **Consider adding blog** for SEO (optional)

---

**Need help?** Check DigitalOcean docs: https://docs.digitalocean.com/products/app-platform/
