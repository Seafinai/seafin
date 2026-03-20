/**
 * Create a Stripe Checkout session
 *
 * Called when the user submits the signup form with email + subdomain.
 * Returns a Stripe Checkout URL — the frontend redirects there.
 *
 * Required env vars: STRIPE_SECRET_KEY, STRIPE_PRICE_ID
 * Optional:          NEXT_PUBLIC_SITE_URL (defaults to https://seafin.ai)
 */

const SUBDOMAIN_RE = /^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/;

const RESERVED = new Set([
  'www', 'app', 'api', 'admin', 'mail', 'smtp', 'ftp', 'dev', 'staging',
  'test', 'demo', 'beta', 'help', 'support', 'status', 'blog', 'shop',
]);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://seafin.ai');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { email, subdomain } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (!subdomain || !SUBDOMAIN_RE.test(subdomain)) {
    return res.status(400).json({ error: 'Invalid subdomain' });
  }

  if (RESERVED.has(subdomain)) {
    return res.status(400).json({ error: 'That subdomain is reserved' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'seafin.vercel.app';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${host}`;

  if (!stripeSecretKey || !priceId) {
    console.error('Missing STRIPE_SECRET_KEY or STRIPE_PRICE_ID');
    return res.status(500).json({ error: 'Payments not configured' });
  }

  const { default: Stripe } = await import('stripe');
  const stripe = new Stripe(stripeSecretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { subdomain, email },
      success_url: `${siteUrl}/welcome?sub=${encodeURIComponent(subdomain)}&email=${encodeURIComponent(email)}`,
      cancel_url: `${siteUrl}/personal`,
    });

    return res.status(200).json({ url: session.url });

  } catch (err) {
    console.error('Stripe session creation failed:', err.message);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
