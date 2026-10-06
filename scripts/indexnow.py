"""Tell Bing (and other IndexNow search engines) about every page in the sitemap.
Run after each deploy:  python scripts/indexnow.py
The key file seafin-site/<KEY>.txt must be live on the site first."""
import json
import re
import urllib.request

KEY = "21010e75ee417c0aeefb97fabbf1f4a6"
HOST = "seafin.ai"
sitemap = open("seafin-site/sitemap.xml", encoding="utf-8").read()
urls = re.findall(r"<loc>(.*?)</loc>", sitemap)
body = json.dumps({"host": HOST, "key": KEY, "keyLocation": f"https://{HOST}/{KEY}.txt", "urlList": urls}).encode()
req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body,
                             headers={"Content-Type": "application/json; charset=utf-8"})
with urllib.request.urlopen(req, timeout=30) as r:
    print(r.status, f"sent {len(urls)} URLs")
