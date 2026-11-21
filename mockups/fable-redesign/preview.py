#!/usr/bin/env python3
"""Builds a private click-through preview of the redesign for a Claude artifact.

  python3 mockups/fable-redesign/preview.py <out-dir>

Copies the served site files and turns index.html into an artifact page (no doctype or head wrapper).
Nothing here is loaded by seafin.ai.
"""
import pathlib, re, shutil, sys

site = pathlib.Path(__file__).resolve().parent.parent.parent / "seafin-site"
out = pathlib.Path(sys.argv[1]).resolve()
shutil.rmtree(out, ignore_errors=True)

skip = {l.strip() for l in (site / ".assetsignore").read_text().splitlines() if l.strip() and not l.startswith("#")}
skip |= {".assetsignore", "robots.txt", "sitemap.xml", "llms.txt"}
for f in site.rglob("*"):
    rel = f.relative_to(site).as_posix()
    if f.is_file() and rel not in skip and not rel.endswith(".txt") and not rel.startswith("assets/art/"):
        (out / rel).parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(f, out / rel)

# the artifact viewer sets data-theme when the viewer picks a theme, so the dark tokens must follow it
css = (out / "home.css").read_text(encoding="utf-8")
m = re.search(r"@media \(prefers-color-scheme: dark\) \{\n  :root \{(.*?)\n  \}\n\}", css, re.S)
dark = m.group(1)
css = css.replace(m.group(0), "@media (prefers-color-scheme: dark) {\n  :root:not([data-theme=\"light\"]) {" + dark + "\n  }\n}\n:root[data-theme=\"dark\"] {" + dark + "\n}")
css += "\n.pv-top { padding: 10px 20px; font: 600 0.875rem/1.4 var(--font-sans); text-align: center; color: #fff; background: #3563e9; }\n"
(out / "home.css").write_text(css, encoding="utf-8")

top = '<p class="pv-top">Private preview of the redesign. Nothing here is live, and the form does not send.</p>\n'
for f in out.glob("*.html"):
    t = re.sub(r"\.(css|js)\?v=[\w-]+", r".\1", f.read_text(encoding="utf-8")).replace('href="/"', 'href="index.html"')
    if f.name == "index.html":
        body = t[t.index("<body>") + 6 : t.index("</body>")]
        t = '<title>Seafin Redesign Preview</title>\n<link rel="stylesheet" href="home.css">\n' + top + body
    else:
        t = t.replace("<body>", "<body>\n" + top, 1)
    f.write_text(t, encoding="utf-8")
print(sum(1 for f in out.rglob("*") if f.is_file()), "files in", out)
