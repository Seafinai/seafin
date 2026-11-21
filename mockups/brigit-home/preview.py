#!/usr/bin/env python3
"""Builds a click-through preview of the home page mockup for a private Claude artifact.

  python3 mockups/brigit-home/preview.py <out-dir> [<shots-dir>]

Copies the served site files, turns index.html into an artifact page (no doctype or head wrapper),
and adds a "Preview only" layout switch (options A, B and C) directly above the section it changes.
<shots-dir> is the folder shots.cjs wrote: its layout-a/b/c.png pictures are shown to phone viewers,
because on a phone all three options stack in one column. Nothing here is loaded by seafin.ai.
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
.pv-top { padding: 10px 20px; font: 600 0.875rem/1.4 var(--font-sans); text-align: center; color: #fff; background: #292d32; }
.pv-top a { color: #a9bef8; white-space: nowrap; }
.pv-switch { scroll-margin-top: 88px; padding: 20px 0 22px; color: #fff; background: #292d32; }
.pv-switch .wrap { display: grid; gap: 12px; }
.pv-label { font: 600 0.8125rem/1.3 var(--font-sans); color: #a9afb8; }
.pv-buttons { display: flex; flex-wrap: wrap; gap: 8px; }
.pv-buttons button { min-height: 44px; padding: 0 18px; font: 600 1rem/1.2 var(--font-sans); color: #fff; background: transparent; border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 999px; cursor: pointer; }
.pv-buttons button[aria-pressed="true"] { color: #292d32; background: #fff; border-color: #fff; }
.pv-buttons button:focus-visible { outline: 2px solid #a9bef8; outline-offset: 2px; }
.pv-caption { max-width: 70ch; font: 400 1rem/1.5 var(--font-sans); color: #d0d4d9; }
.pv-picture { display: none; margin: 0; }
.pv-picture figcaption { margin-bottom: 8px; font: 600 0.875rem/1.4 var(--font-sans); color: #fff; }
.pv-picture img { display: block; width: 100%; height: auto; border-radius: 6px; }
.pv-below { display: none; font: 600 0.875rem/1.4 var(--font-sans); color: #fff; }
@media (max-width: 960px) {
  .pv-picture.has-picture, .pv-picture.has-picture + .pv-below { display: block; }
  .pv-buttons button { flex: 1 1 auto; padding: 0 12px; }
}
"""
(out / "home.css").write_text(css, encoding="utf-8")

for f in out.glob("*.html"):
    t = f.read_text(encoding="utf-8")
    f.write_text(re.sub(r'\.(css|js)\?v=[\w-]+', r".\1", t).replace('href="/"', 'href="index.html"'), encoding="utf-8")

html = (out / "index.html").read_text(encoding="utf-8")
body = html[html.index("<body>") + 6 : html.index("</body>")]
body = re.sub(r'(home\.(?:css|js))\?v=[\w-]+', r"\1", body).replace('href="/"', 'href="index.html"')
switch = """
<div class="pv-switch" id="pv-switch" role="group" aria-label="Preview only: layout options">
  <div class="wrap">
    <p class="pv-label">Preview only. Pick a layout for the section below.</p>
    <div class="pv-buttons">
      <button type="button" id="pv-a" data-layout="a" aria-pressed="true">A &middot; Rows</button>
      <button type="button" id="pv-b" data-layout="b" aria-pressed="false">B &middot; Grid</button>
      <button type="button" id="pv-c" data-layout="c" aria-pressed="false">C &middot; Side heading</button>
    </div>
    <p class="pv-caption" id="pv-caption" aria-live="polite"></p>
    <figure class="pv-picture__HAS__">
      <figcaption>On a computer it looks like this:</figcaption>
      <img id="pv-img" src="pv/layout-a.png" alt="">
    </figure>
    <p class="pv-below">On this phone it looks like this:</p>
  </div>
</div>
"""
script = """
<script>
(() => {
  const wrap = document.querySelector('#services .wrap');
  const areas = wrap.querySelector('.areas');
  const head = document.createElement('div');
  head.className = 'split-head';
  const h2 = wrap.querySelector('h2').cloneNode(true);
  h2.removeAttribute('id');
  head.append(h2, wrap.querySelector('.section-sub').cloneNode(true), ...[...wrap.querySelector('.area-action').children].map((n) => n.cloneNode(true)));
  wrap.prepend(head);
  const captions = {
    a: 'Rows. Each job is one full-width row, with the call button under the list.',
    b: 'Grid. On a computer the jobs sit two across and the call button fills the sixth box. On a phone they stack, and the call button gets a shaded box.',
    c: 'Side heading. On a computer the heading and call button stay on the left while the jobs scroll past. On a phone the call button moves above the list.',
  };
  const alts = { a: 'Layout A on a computer: five full-width rows', b: 'Layout B on a computer: a two-column grid', c: 'Layout C on a computer: heading on the left, jobs on the right' };
  let layout = 'a';
  try { const saved = localStorage.getItem('pv-layout'); if (captions[saved]) layout = saved; } catch {}
  const img = document.querySelector('#pv-img');
  const apply = () => {
    areas.classList.toggle('v-grid', layout === 'b');
    wrap.classList.toggle('v-split', layout === 'c');
    document.querySelectorAll('.pv-buttons button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.layout === layout)));
    document.querySelector('#pv-caption').textContent = captions[layout];
    img.src = 'pv/layout-' + layout + '.png';
    img.alt = alts[layout];
    try { localStorage.setItem('pv-layout', layout); } catch {}
  };
  document.querySelector('.pv-buttons').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    layout = b.dataset.layout;
    apply();
  });
  document.querySelector('.pv-top a').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#pv-switch').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  apply();
})();
</script>
"""
top = '<p class="pv-top">Private preview of the home page mockup. Nothing here is live. <a href="#pv-switch">Go to the layout switch</a></p>\n'

shots = pathlib.Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else None
pictures = shots is not None and all((shots / f"layout-{k}.png").is_file() for k in "abc")
if pictures:
    (out / "pv").mkdir(exist_ok=True)
    for k in "abc":
        shutil.copy2(shots / f"layout-{k}.png", out / "pv" / f"layout-{k}.png")
switch = switch.replace("__HAS__", " has-picture" if pictures else "")

s = body.index('<section class="section" id="services"')
body = top + body[:s] + switch + body[s:]
i = body.rindex('<script src="motion.js"')
page = '<title>Seafin Home Mockup</title>\n<link rel="stylesheet" href="home.css">\n' + body[:i] + script + body[i:]
(out / "index.html").write_text(page, encoding="utf-8")
print(sum(1 for f in out.rglob("*") if f.is_file()), "files in", out, "| phone pictures:", pictures)
