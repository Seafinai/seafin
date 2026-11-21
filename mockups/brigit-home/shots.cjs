// Renders the home page mockup and its layout options, desktop (1440) and phone (390), full scroll.
// Run from the repo root:  (cd seafin-site && python3 -m http.server 8765) &  node mockups/brigit-home/shots.cjs <out-dir>
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const out = process.argv[2] || path.join(__dirname, 'out');
const css = fs.readFileSync(path.join(__dirname, 'variants.css'), 'utf8');
const URL = process.env.MOCK_URL || 'http://localhost:8765/index.html';

const variants = {
  'option-a-rows': () => {},
  'option-b-grid': () => document.querySelector('.areas').classList.add('v-grid'),
  'option-c-split': () => {
    const wrap = document.querySelector('#services .wrap');
    const head = document.createElement('div');
    head.className = 'split-head';
    head.append(wrap.querySelector('h2'), wrap.querySelector('.section-sub'), ...wrap.querySelector('.area-action').children);
    wrap.prepend(head);
    wrap.classList.add('v-split');
  },
  'lean-text': () => document.body.classList.add('lean'),
  'how-we-work-charcoal': () => document.querySelector('#how-we-work').classList.add('dark'),
};

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const [name, apply] of Object.entries(variants)) {
    for (const [size, viewport, dsf] of [['desktop', { width: 1440, height: 900 }, 1], ['phone', { width: 390, height: 844 }, 2]]) {
      const ctx = await b.newContext({ viewport, deviceScaleFactor: dsf, colorScheme: process.env.SCHEME || 'light', reducedMotion: 'reduce' });
      const p = await ctx.newPage();
      await p.goto(URL, { waitUntil: 'networkidle' });
      await p.addStyleTag({ content: css });
      await p.evaluate(apply);
      await p.evaluate(async () => {
        document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; });
        await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
        await document.fonts.ready;
      });
      // stills can't show the sticky heading in option C following the scroll, so pin it to the top of its column
      await p.evaluate(() => { const h = document.querySelector('.split-head'); if (h) h.style.position = 'static'; });
      await p.waitForTimeout(300);
      const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (name.startsWith('how-we-work')) {
        await p.evaluate(() => { document.querySelector('.nav').style.position = 'static'; });
        await p.locator('#how-we-work').screenshot({ path: path.join(out, `${name}-${size}.png`) });
      } else {
        await p.screenshot({ path: path.join(out, `${name}-${size}.png`), fullPage: true });
        await p.evaluate(() => { document.querySelector('.nav').style.position = 'static'; const h = document.querySelector('.split-head'); if (h) h.style.position = 'static'; });
        await p.locator('#services').screenshot({ path: path.join(out, `${name}-${size}-section.png`) });
      }
      console.log(name, size, 'sideways overflow:', over, 'px');
      await ctx.close();
    }
  }
  await b.close();
})();
