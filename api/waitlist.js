/**
 * Waitlist / signup handler
 *
 * Phase 1 (now):  Validates request, notifies admin via email or logs intent.
 *                 Rob manually triggers provision.yml from GitHub Actions UI.
 *
 * Phase 2 (Stripe): Replace this with a redirect to Stripe Checkout.
 *                   The actual provisioning moves to webhook-stripe.js.
 */

const SUBDOMAIN_RE = /^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/;

// Reserved names that can't be used as subdomains
const RESERVED = new Set([
  'www', 'api', 'admin', 'mail', 'smtp', 'ftp', 'pop', 'imap',
  'manage', 'status', 'health', 'dashboard', 'app', 'login',
  'auth', 'static', 'assets', 'cdn', 'dev', 'staging', 'prod',
  'shared', 'monitoring', 'grafana', 'seafin', 'support',
]);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://seafin.ai');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, subdomain } = req.body || {};

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  // Validate subdomain
  const sub = (subdomain || '').toLowerCase().trim();
  if (!sub || !SUBDOMAIN_RE.test(sub)) {
    return res.status(400).json({
      error: 'Subdomain must be 3–32 characters, lowercase letters and hyphens only.'
    });
  }
  if (RESERVED.has(sub)) {
    return res.status(400).json({ error: `"${sub}" is reserved. Please choose a different name.` });
  }

  // TODO Phase 2: Create Stripe Checkout session and return checkout URL instead
  // const checkoutUrl = await createStripeCheckout(email.trim(), sub);
  // return res.status(200).json({ checkoutUrl });

  // Phase 1: Notify admin via GitHub Actions (if GITHUB_PAT is set)
  // Otherwise just log and return success — Rob provisions manually
  const ghToken = process.env.GITHUB_PAT;
  if (ghToken) {
    try {
      const ghRes = await fetch(
        'https://api.github.com/repos/Trit1967/seafin-customer/actions/workflows/provision.yml/dispatches',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${ghToken}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ref: 'main',
            inputs: {
              subdomain: sub,
              customer_email: email.trim(),
            },
          }),
        }
      );

      if (!ghRes.ok) {
        const text = await ghRes.text();
        console.error('GitHub Actions dispatch failed:', ghRes.status, text);
        // Don't fail the user — admin can provision manually
      }
    } catch (err) {
      console.error('GitHub dispatch error:', err.message);
    }
  } else {
    // No PAT configured — log for manual provisioning
    console.log(`[waitlist] New signup: subdomain=${sub} email=${email.trim()}`);
  }

  return res.status(200).json({
    success: true,
    subdomain: sub,
    message: 'Workspace request received. Setting up your environment.',
  });
}
