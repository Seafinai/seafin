// Serves seafin-site/ as static assets and handles the homepage
// "Book a free call" form by emailing it through Cloudflare Email Routing.
import { EmailMessage } from 'cloudflare:email';

const FROM = 'website@seafin.ai'; // must be an address on the seafin.ai zone
const oneLine = (s, max) => String(s ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
const EMAIL = /^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]+$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/request') return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

    let data;
    try { data = await request.json(); } catch { return json({ error: 'bad_request' }, 400); }

    // Honeypot: real visitors never see or fill this field.
    if (oneLine(data.company_website, 200)) return json({ ok: true });

    const name = oneLine(data.name, 120);
    const email = oneLine(data.email, 200);
    const message = String(data.message ?? '').trim().slice(0, 500);
    if (!name || !EMAIL.test(email)) return json({ error: 'invalid' }, 422);
    if (!env.CONTACT_TO) return json({ error: 'not_configured' }, 500);

    const raw = [
      `From: Seafin website <${FROM}>`,
      `To: ${env.CONTACT_TO}`,
      `Reply-To: ${name} <${email}>`,
      `Subject: Discovery call request from ${name}`,
      `Message-ID: <${crypto.randomUUID()}@seafin.ai>`,
      `Date: ${new Date().toUTCString()}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=utf-8',
      'Content-Transfer-Encoding: 8bit',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'What they would hand off first:',
      message || '(left blank)',
    ].join('\r\n');

    try {
      await env.SEND_EMAIL.send(new EmailMessage(FROM, env.CONTACT_TO, raw));
    } catch (err) {
      console.error('send failed', err);
      return json({ error: 'send_failed' }, 502);
    }
    return json({ ok: true });
  },
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}
