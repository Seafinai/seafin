# Seafin Infrastructure Cost Breakdown

## Summary: Year 1 Budget

```
Initial Setup (One-time):    $25-40
Monthly Recurring:           $13-75
Year 1 Total:              $175-940
```

**Most likely scenario:** ~$200-300/year until you reach profitability

---

## Detailed Monthly Costs

### Hosting (Primary Cost)

#### Vercel (CURRENT) - $0/mo

```
Current setup (Hobby/Free plan):
- Static site hosting: $0/mo
- Serverless functions (API): $0/mo
- 100GB bandwidth/month: included
- Auto-deploy from GitHub: included
- SSL/HTTPS: included
- Preview deployments: included

Total: $0/mo
```

**What's included:**
- ✅ Static website hosting (website/)
- ✅ Serverless API functions (api/)
- ✅ Git auto-deploy on push
- ✅ Preview deployments per PR
- ✅ HTTPS/SSL automatic
- ✅ 100GB bandwidth/month

**Scaling path:**
```
$0/mo   → Free tier (current, sufficient for launch)
$20/mo  → Pro tier (1TB bandwidth, analytics, team)
```

#### DigitalOcean App Platform (Future - Custodian SaaS) - $12-15/mo

```
For future Custodian product (when built):
- Flask app containers: $0-5/mo
- PostgreSQL database (12GB/mo): $12/mo
- Bandwidth: included

Total: $12/mo
```

#### Alternative: Fly.io - $5-20/mo

```
Fly Compute (shared CPU):      $0-5/mo (free tier exists)
Postgres (managed):             $15/mo
Bandwidth:                      $0 (generous free tier)

Total: $15-20/mo
```

**Pros:** Ultra cheap
**Cons:** Database add-on makes it more expensive than DigitalOcean

#### Alternative: Hetzner Cloud - $4-10/mo

```
VPS (2GB RAM, 2vCPU):           $4-7/mo
Manual PostgreSQL setup:        DIY
Maintenance & updates:          Your responsibility

Total: $4-7/mo (but requires work)
```

**Pros:** Cheapest raw compute
**Cons:** You manage everything, higher operational burden

---

### Domain Registration - $20-30/year

```
custodian.io (or alternative):  $10-15/year
seafin.ai:                      $10-15/year

Total: $20-30/year ($1.50-2.50/mo amortized)
```

**Where to buy:**
- NameCheap (cheapest, good support)
- GoDaddy (expensive but well-known)
- Route53 (if using AWS)

**Recommendation:** NameCheap ($8.88/year first year)

---

### Payment Processing - Variable (2.9% + $0.30/tx)

```
Per transaction cost: 2.9% + $0.30

Examples:
$9/mo: Charge = $9, Stripe takes = $0.56, You keep = $8.44
$29/mo: Charge = $29, Stripe takes = $1.14, You keep = $27.86
$99/mo: Charge = $99, Stripe takes = $3.17, You keep = $95.83

At 10 customers ($30/mo avg):
  Revenue: $300, Stripe: $9, Net: $291
At 100 customers:
  Revenue: $3,000, Stripe: $117, Net: $2,883
```

**No upfront cost. Scales with revenue.**

---

### Email Service - $0-20/mo

#### SendGrid Free Tier
```
Free: 100 emails/day
Cost: $0/mo

Covers:
- Signup emails
- Password reset
- Backup notifications
- Payment receipts
```

**Sufficient for Year 1.** Upgrade when you hit 100 emails/day.

#### SendGrid Paid (if needed)
```
Pro plan: 100k emails/month
Cost: $20/mo
```

---

### Authentication - $0-600/mo

#### Option A: Self-Managed (Free)
```
Use Flask-Login + bcrypt (already in your code)
Cost: $0/mo
Included with: Your EC2 instance

Tradeoff: You handle password resets, security, etc.
```

#### Option B: Auth0 (Managed)
```
Free tier: 7,000 users/month
Cost: $0/mo initially
Pro plan: $600/mo (when you outgrow free)

Benefit: SSO, social login, advanced security
```

**Recommendation for launch:** Self-managed (save $600/mo)

---

### Monitoring & Analytics - $0-79/mo

#### Sentry (Error Tracking)
```
Free tier: 10k events/month
Cost: $0/mo
Paid: $29/mo for more events

Benefit: Catch bugs, see production errors
```

#### Google Analytics (Traffic)
```
Free: Unlimited hits
Cost: $0/mo

Benefit: Understand user behavior, conversions
```

#### Datadog or New Relic (Infrastructure)
```
Datadog free tier: Basic monitoring
Cost: $0/mo initially
Paid: $15-50/mo for detailed metrics

Benefit: Database performance, API latency, errors
```

**Recommendation:** Skip for Year 1. Add when you reach 100 paying customers.

---

### Landing Page Hosting - $0-10/mo

#### GitHub Pages (Free)
```
Domain: seafin.ai (points to GitHub Pages)
Cost: $0/mo
Platform: Static HTML/CSS/JS
Deployment: Push to GitHub, auto-deploy

Perfect for: Company website, product homepage
```

#### Vercel (Free, Recommended)
```
Connect GitHub repo
Auto-deploy on push
Domain pointing
Cost: $0/mo (free tier)

Better than GitHub Pages: Faster, better analytics
```

#### Traditional Web Hosting
```
Bluehost, GoDaddy, etc.
Cost: $5-10/mo
Worse than: GitHub Pages/Vercel (outdated)
```

**Recommendation:** Vercel (free, fast, modern)

---

## Year 1 Cost Estimate

### Scenario A: Lean Startup (Recommended)

```
Domains (custodian.io + seafin.ai):
  Year 1: $25 (one-time)

Monthly:
  DigitalOcean: $12
  Stripe fees: ~$50 (est. 10-20 paying customers)
  SendGrid: $0 (free tier)
  Auth0: $0 (self-managed)
  Sentry: $0 (free tier)
  Landing page: $0 (Vercel)
  ─────────────
  Monthly avg: $12

Year 1 Total: $25 + ($12 × 12) + Stripe = $169 + ~$200 Stripe = ~$370
```

**More realistic if you get traction:**
```
Months 1-3: $12/mo = $36
Months 4-6: $12/mo + $50 Stripe = $62 × 3 = $186
Months 7-12: $12/mo + $150 Stripe = $162 × 6 = $972
─────────────────────────────────────────────
Year 1 Total: ~$1,200 (with successful traction)
```

---

### Scenario B: Comfortable (Add Monitoring)

```
Monthly:
  DigitalOcean: $12
  Sentry: $29
  Datadog: $50
  Stripe: ~$100 (more customers)
  ─────────────
  Monthly avg: $191

Year 1 Total: $25 + ($191 × 12) = ~$2,320
```

**Only go this route if you're profitable.** Most startups can't afford this.

---

### Scenario C: Bare Bones (Save Every Dollar)

```
Domains: $20
Hetzner VPS: $5/mo
Self-managed auth: $0
Self-managed email: $0
Self-managed monitoring: $0
─────────────────
Year 1 Total: ~$80

Tradeoff: You do all ops work yourself
```

---

## Monthly Breakdown by Milestone

### Months 1-3 (Bootstrap)
```
Hosting (DigitalOcean):    $12
Domains (amortized):       $2
Stripe fees (est):         $10
─────────────────────
Monthly: $24
Quarterly: $72
```

### Months 4-6 (Early Growth)
```
Hosting:                   $12
Stripe fees (more sales):  $75
─────────────────────
Monthly: $87
Quarterly: $260
```

### Months 7-12 (Scaling)
```
Hosting:                   $12
Stripe fees (continued):   $150
Optional monitoring:       $30
─────────────────────
Monthly: $192
For 6 months: $1,152
```

---

## When Costs Will Increase

| Trigger | What to Add | Cost |
|---------|-------------|------|
| 100+ active users | Better database (more storage) | +$8/mo |
| 100+ emails/day | SendGrid paid tier | +$20/mo |
| Need error tracking | Sentry | +$29/mo |
| Need performance monitoring | Datadog | +$50/mo |
| Need auth management | Auth0 | +$600/mo |
| 10,000+ users | Scale infrastructure | +$100+/mo |

**Most likely progression:**
```
Month 1-3: $24/mo (bootstrap)
Month 3-6: $50/mo (add monitoring when successful)
Month 6-12: $100+/mo (add auth, analytics)
```

---

## Stripe Fee Projection

### Year 1 Revenue Forecast

```
Month 1-2: 0 customers, $0 revenue
Month 3: 10 customers × $30 = $300/mo
Month 4-6: 20 customers × $32 = $640/mo
Month 7-9: 50 customers × $35 = $1,750/mo
Month 10-12: 100 customers × $40 = $4,000/mo

Year 1 Revenue Total: ~$9,900
Year 1 Stripe Fees (2.9% + $0.30): ~$350-400
```

---

## Pro Tip: AWS Free Tier Alternative

If you want to experiment with AWS:

```
AWS Free Tier (12 months):
- EC2 t2.micro: Free
- RDS MySQL: Free
- S3: Free (5GB)
- Bandwidth: Free (1GB/month)

Cost: $0 for 12 months, then ~$30-50/mo

Good if: You want enterprise features
Bad if: Overkill for startup, more complex
```

---

## Cost Optimization Tips

1. **Don't pre-pay:** Start monthly, upgrade as you grow
2. **Use free tiers:** SendGrid (100 emails/day), Sentry (10k errors/mo)
3. **Automate:** GitHub Pages (free deployment)
4. **Monitor usage:** Watch DigitalOcean metrics, scale when needed
5. **Negotiate:** At $5k MRR, you can negotiate better Stripe rates

---

## Final Recommendation

**Launch with Scenario A (Lean):**

```
Total Year 1 Budget: $200-400

✅ DigitalOcean App Platform ($12/mo)
✅ Domains ($25/year)
✅ Vercel landing page ($0)
✅ Stripe fees (pay as you grow)
✅ SendGrid free tier ($0)
✅ Self-managed auth ($0)

Upgrade components only when you hit the bottleneck.
```

This is a professional setup that costs less than a single developer's lunch per month.

---

*Last Updated: 2026-02-14*
