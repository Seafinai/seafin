/**
 * Stripe webhook handler
 *
 * Receives checkout.session.completed, then triggers provision.yml
 * via the GitHub Actions API.
 *
 * Setup:
 *   1. Add to Vercel env vars: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, GITHUB_PAT
 *   2. In Stripe Dashboard → Webhooks → Add endpoint:
 *        URL: https://seafin.ai/api/webhook-stripe
 *        Events: checkout.session.completed
 *   3. Wire Stripe Checkout to pass metadata: { subdomain: "alice" }
 *
 * Requires raw body for Stripe signature verification.
 */

export const config = {
  api: { bodyParser: false },
};

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const githubPat = process.env.GITHUB_PAT;

  if (!stripeSecretKey || !stripeWebhookSecret) {
    console.error('Missing Stripe env vars');
    return res.status(500).json({ error: 'Stripe not configured' });
  }

  // Read raw body for signature verification
  const rawBody = await getRawBody(req);
  const sig = req.headers['stripe-signature'];

  // Dynamically import stripe (avoids bundler issues in serverless)
  const { default: Stripe } = await import('stripe');
  const stripe = new Stripe(stripeSecretKey);

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, stripeWebhookSecret);
  } catch (err) {
    console.error('Stripe signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const subdomain = session.metadata?.subdomain;
    const email = session.customer_details?.email || session.metadata?.email;

    if (!subdomain) {
      console.error('checkout.session.completed missing subdomain in metadata', session.id);
      return res.status(400).json({ error: 'No subdomain in session metadata' });
    }

    console.log(`[webhook-stripe] Provisioning: subdomain=${subdomain} email=${email} session=${session.id}`);

    if (githubPat) {
      const ghRes = await fetch(
        'https://api.github.com/repos/Trit1967/seafin-customer/actions/workflows/provision.yml/dispatches',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${githubPat}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ref: 'main',
            inputs: {
              subdomain,
              customer_email: email || '',
            },
          }),
        }
      );

      if (!ghRes.ok) {
        const text = await ghRes.text();
        console.error('GitHub Actions dispatch failed:', ghRes.status, text);
        // Return 200 to Stripe anyway — don't let it retry unnecessarily
        // Alert: add monitoring/alerting here in production
      } else {
        console.log(`[webhook-stripe] GitHub Actions triggered for ${subdomain}`);
      }
    } else {
      console.error('[webhook-stripe] GITHUB_PAT not set — cannot trigger provisioning');
    }
  }

  return res.status(200).json({ received: true });
}
