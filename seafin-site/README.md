# Seafin Site

Refreshed Seafin.ai marketing site. Deep navy + cyan with warm coral accents, Inter Tight / Instrument Serif italic / JetBrains Mono.

## Files

| File | What |
|---|---|
| `index.html` | Main landing — hero canvas, services, process, case studies, compare, pricing, about, FAQ, contact |
| `sovereign.html` | Self-hosted / regulated AI offering (warm theme) |
| `personal.html` | Seafin Personal product page with signup form |
| `welcome.html` | Post-checkout provisioning screen (4-step progress + ready + error states) |
| `privacy.html` | Privacy policy with sticky table-of-contents |
| `terms.html` | Terms of service with sticky table-of-contents |
| `brand.css` | Shared design tokens, nav, footer, buttons, typography, glass cards, reveal-on-scroll base |
| `brand.js` | Nav scroll-densify + IntersectionObserver reveal with 3s fail-safe |
| `tweaks-panel.jsx` + `seafin-tweaks.js` | Optional Tweaks panel for hero animation / headline variant on the landing |

## Quick start

Open `index.html` in a browser. No build step. Everything is plain HTML/CSS/JS.

## Endpoints expected

The two stateful flows assume your existing endpoints from the previous site:

- **`POST /api/create-checkout`** — from `personal.html` signup form. Receives `{ email, subdomain }`, returns `{ url }` (Stripe Checkout URL).
- **`GET /api/provision-status?sub=<subdomain>`** — polled from `welcome.html`. Returns `{ ready: true }` when the workspace is provisioned.

Wire the landing-page contact form to your existing Web3Forms endpoint (or any other) by updating the `<form>` action; right now it's a stub.

## Design tokens (in `brand.css`)

```
--ink-void  #03060f    Page background (deepest)
--ink       #0a1424    Mid surfaces
--aqua-100  #b8edff    Primary highlight / italic accents
--aqua-200  #7fdfff    Primary brand cyan
--warm-100  #ffe2c0    Warm highlight
--warm      #ff9d5c    Warm primary (Most-popular, LIVE badge, Sovereign)
--text      #f3f8ff    Body text
```

Color rule: cyan for system / tech / primary moments. Warm for human / featured / spotlight moments.

## Deploy

Drop the folder onto any static host — Vercel, Netlify, Cloudflare Pages, S3 + CloudFront. No server-side rendering needed except for the two API routes above, which already exist in your previous site under `/api/`.
