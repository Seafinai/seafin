#!/usr/bin/env python3
"""Builds a click-through preview of the home page mockup for a private Claude artifact.

  python3 mockups/brigit-home/preview.py <out-dir>

Copies the served site files, turns index.html into an artifact page (no doctype or head wrapper),
and adds a small "Preview" bar that switches between layout options A, B and C and the white or
charcoal "How we work" strip. Nothing here is loaded by seafin.ai.
"""
import pathlib, re, shutil, sys

here = pathlib.Path(__file__).resolve().parent
site = here.parent.parent / "seafin-site"
out = pathlib.Path(sys.argv[1]).resolve()
shutil.rmtree(out, ignore_errors=True)

skip = {l.strip() for l in (site / ".assetsignore").read_text().splitlines() if l.strip() and not l.startswith("#")}
skip |= {".assetsignore", "robots.txt", "sitemap.xml", "llms.txt"}
for f in site.rglob("*"):
    rel = f.relative_to(site).as_posix()
    if f.is_file() and rel not in skip and not rel.endswith(".txt"):
        (out / rel).parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(f, out / rel)

# the artifact viewer sets data-theme when the viewer picks a theme, so the dark tokens must follow it
css = (out / "home.css").read_text(encoding="utf-8")
m = re.search(r"@media \(prefers-color-scheme: dark\) \{\n  :root \{(.*?)\n  \}\n\}", css, re.S)
dark = m.group(1)
css = css.replace(m.group(0), "@media (prefers-color-scheme: dark) {\n  :root:not([data-theme=\"light\"]) {" + dark + "\n  }\n}\n:root[data-theme=\"dark\"] {" + dark + "\n}")
css += "\n" + (here / "variants.css").read_text(encoding="utf-8") + """
/* preview-only: option C keeps a second copy of the heading in the left column */
.wrap:not(.v-split) > .split-head { display: none; }
.wrap.v-split > h2, .wrap.v-split > .section-sub { display: none; }
.pv-bar { position: fixed; left: 50%; bottom: calc(12px + env(safe-area-inset-bottom, 0px)); transform: translateX(-50%); z-index: 50; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 6px 14px; max-width: calc(100vw - 24px); padding: 8px 14px; font: 600 0.8125rem/1.2 var(--font-sans); color: #fff; background: #292d32; border: 1px solid rgba(255, 255, 255, 0.18); border-radius: 22px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28); }
.pv-bar span { display: flex; align-items: center; gap: 4px; white-space: nowrap; }
.pv-bar button { min-width: 32px; min-height: 32px; padding: 0 10px; font: inherit; color: #fff; background: transparent; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 999px; cursor: pointer; }
.pv-bar button[aria-pressed="true"] { color: #292d32; background: #fff; border-color: #fff; }
.pv-bar button:focus-visible { outline: 2px solid #8ea8f3; outline-offset: 2px; }
.foot { padding-bottom: 96px; }
"""
(out / "home.css").write_text(css, encoding="utf-8")

for f in out.glob("*.html"):
    t = f.read_text(encoding="utf-8")
    f.write_text(re.sub(r'\.(css|js)\?v=[\w-]+', r".\1", t).replace('href="/"', 'href="index.html"'), encoding="utf-8")

html = (out / "index.html").read_text(encoding="utf-8")
body = html[html.index("<body>") + 6 : html.index("</body>")]
body = re.sub(r'(home\.(?:css|js))\?v=[\w-]+', r"\1", body).replace('href="/"', 'href="index.html"')
bar = """
<div class="pv-bar" role="group" aria-label="Preview options">
  <span>Layout
    <button type="button" id="pv-a" data-layout="a" aria-pressed="true">A</button>
    <button type="button" id="pv-b" data-layout="b" aria-pressed="false">B</button>
    <button type="button" id="pv-c" data-layout="c" aria-pressed="false">C</button>
  </span>
  <span>Text
    <button type="button" id="pv-full" data-text="full" aria-pressed="true">Full</button>
    <button type="button" id="pv-lean" data-text="lean" aria-pressed="false">Lean</button>
  </span>
  <span>How we work
    <button type="button" id="pv-white" data-strip="white" aria-pressed="true">White</button>
    <button type="button" id="pv-charcoal" data-strip="charcoal" aria-pressed="false">Charcoal</button>
  </span>
</div>
<script>
(() => {
  const wrap = document.querySelector('#services .wrap');
  const areas = wrap.querySelector('.areas');
  const strip = document.querySelector('#how-we-work');
  const head = document.createElement('div');
  head.className = 'split-head';
  const h2 = wrap.querySelector('h2').cloneNode(true);
  h2.removeAttribute('id');
  head.append(h2, wrap.querySelector('.section-sub').cloneNode(true), ...[...wrap.querySelector('.area-action').children].map((n) => n.cloneNode(true)));
  wrap.prepend(head);
  const state = { layout: 'a', strip: 'white', text: 'full' };
  try { Object.assign(state, JSON.parse(localStorage.getItem('pv') || '{}')); } catch {}
  const apply = () => {
    areas.classList.toggle('v-grid', state.layout === 'b');
    wrap.classList.toggle('v-split', state.layout === 'c');
    strip.classList.toggle('dark', state.strip === 'charcoal');
    document.body.classList.toggle('lean', state.text === 'lean');
    document.querySelectorAll('.pv-bar button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.layout === state.layout || b.dataset.strip === state.strip || b.dataset.text === state.text)));
    try { localStorage.setItem('pv', JSON.stringify(state)); } catch {}
  };
  document.querySelector('.pv-bar').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.layout) state.layout = b.dataset.layout;
    if (b.dataset.strip) state.strip = b.dataset.strip;
    if (b.dataset.text) state.text = b.dataset.text;
    apply();
  });
  // lean text: a job's description opens when its row is tapped
  areas.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li || li.classList.contains('areas-cta') || e.target.closest('a') || !document.body.classList.contains('lean')) return;
    li.classList.toggle('open');
  });
  apply();
})();
</script>
"""
i = body.rindex('<script src="motion.js"')
page = '<title>Seafin Home Mockup</title>\n<link rel="stylesheet" href="home.css">\n' + body[:i] + bar + body[i:]
(out / "index.html").write_text(page, encoding="utf-8")
print(sum(1 for f in out.rglob("*") if f.is_file()), "files in", out)
