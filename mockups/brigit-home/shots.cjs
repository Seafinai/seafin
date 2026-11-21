// Renders the home page mockup in layout options A, B and C, desktop (1440) and phone (390), full scroll.
// Also writes layout-a/b/c.png (the section at 1100 wide), which preview.py shows to phone viewers.
// Run from the repo root:  (cd seafin-site && python3 -m http.server 8765) &  node mockups/brigit-home/shots.cjs <out-dir>
// SCHEME=dark renders the dark theme.
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
};
const sizes = [
  ['desktop', { width: 1440, height: 900 }, 1],
  ['phone', { width: 390, height: 844 }, 2],
  ['picture', { width: 1100, height: 800 }, 1.5],
];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  for (const [name, apply] of Object.entries(variants)) {
    for (const [size, viewport, dsf] of sizes) {
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
      await p.waitForTimeout(300);
      const over = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (size !== 'picture') await p.screenshot({ path: path.join(out, `${name}-${size}.png`), fullPage: true });
      // stills can't show the sticky heading in option C following the scroll, so pin it to the top of its column
      await p.evaluate(() => { document.querySelector('.nav').style.position = 'static'; const h = document.querySelector('.split-head'); if (h) h.style.position = 'static'; });
      const file = size === 'picture' ? `layout-${name.split('-')[1]}.png` : `${name}-${size}-section.png`;
      await p.locator('#services').screenshot({ path: path.join(out, file) });
      if (size !== 'picture') await p.locator('#how-we-work').screenshot({ path: path.join(out, `how-we-work-${size}.png`) });
      console.log(name, size, 'sideways overflow:', over, 'px');
      await ctx.close();
    }
  }
  await b.close();
})();
