/**
 * Provision status check
 * Polls whether a tenant subdomain is live by sending a HEAD request.
 * Called by welcome.html every 5 seconds.
 */

const SUBDOMAIN_RE = /^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://seafin.ai');

  const { sub } = req.query;

  if (!sub || !SUBDOMAIN_RE.test(sub)) {
    return res.status(400).json({ error: 'Invalid subdomain', ready: false });
  }

  try {
    const response = await fetch(`https://${sub}.seafin.ai`, {
      method: 'HEAD',
      signal: AbortSignal.timeout(6000),
      redirect: 'follow',
    });

    // 404 = Traefik no-route (tenant not provisioned yet) → not ready
    // 5xx = server error → not ready
    // 200, 302 (Clerk redirect), 401, 403 (Cloudflare auth) → app is serving → ready
    const ready = response.status !== 404 && response.status < 500;
    return res.status(200).json({ ready, status: response.status });

  } catch {
    // Connection refused, timeout, DNS NXDOMAIN — not ready yet
    return res.status(200).json({ ready: false });
  }
}
