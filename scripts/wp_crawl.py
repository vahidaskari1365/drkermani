#!/usr/bin/env python3
"""Comprehensive dromfs.com crawler via WP REST API through page_reader."""
import json
import re
import subprocess
import sys
import time
from pathlib import Path

UP = Path("/home/z/my-project/upload/wpapi")
UP.mkdir(parents=True, exist_ok=True)
BASE = "https://dromfs.com/wp-json/wp/v2"


def fetch(name: str, endpoint: str) -> dict | None:
    """Fetch a WP REST endpoint via page_reader, extract embedded JSON."""
    out = UP / f"{name}.json"
    url = f"{BASE}{endpoint}"
    if out.exists() and out.stat().st_size > 200:
        print(f"[skip] {name} cached")
    else:
        print(f"[get ] {url}")
        r = subprocess.run(
            ["z-ai", "function", "-n", "page_reader", "-a", json.dumps({"url": url}), "-o", str(out)],
            capture_output=True, text=True, timeout=120,
        )
        if not out.exists():
            print(f"  !! failed: {r.stdout[-200:]} {r.stderr[-200:]}")
            return None
        time.sleep(1)
    raw = json.load(open(out))
    html = (raw.get("data") or {}).get("html", "")
    m = re.search(r"<pre[^>]*>(.*)</pre>", html, re.S)
    if not m:
        print(f"  !! no <pre> payload in {name}")
        return None
    payload = m.group(1).strip()
    try:
        return json.loads(payload)
    except json.JSONDecodeError as e:
        print(f"  !! JSON parse fail {name}: {e}")
        return None


def main() -> None:
    report = {}

    # 1) All pages list
    pages = fetch("pages", "/pages?per_page=100&_fields=id,slug,link,title,parent,modified")
    if isinstance(pages, list):
        report["pages"] = pages
        print(f"pages: {len(pages)}")
        for p in pages:
            print(f"  - [{p['id']}] /{p['slug']} :: {p['title']['rendered'][:50]}")

    # 2) All posts list
    posts = fetch("posts", "/posts?per_page=100&_fields=id,slug,link,title,featured_media,categories,date")
    if isinstance(posts, list):
        report["posts"] = posts
        print(f"posts: {len(posts)}")
        for p in posts[:40]:
            print(f"  - [{p['id']}] {p['link']} :: {p['title']['rendered'][:60]}")

    # 3) All categories
    cats = fetch("cats", "/categories?per_page=100&_fields=id,name,slug,count")
    if isinstance(cats, list):
        report["categories"] = cats
        print("categories:")
        for c in cats:
            print(f"  - [{c['id']}] {c['slug']} ({c['name']}) x{c['count']}")

    # 4) Media library — the gold: every image URL + alt text
    media_all = []
    for page in range(1, 6):
        m = fetch(f"media_p{page}", f"/media?per_page=100&page={page}&_fields=id,source_url,alt_text,title,caption,media_type,mime_type,media_details,date")
        if not isinstance(m, list) or not m:
            break
        media_all.extend(m)
        print(f"media page {page}: +{len(m)} (total {len(media_all)})")
        if len(m) < 100:
            break
    report["media"] = media_all

    images = [m for m in media_all if m.get("media_type") == "image"]
    print(f"TOTAL media items: {len(media_all)}, images: {len(images)}")

    # Highlight doctor-related and gallery images
    for m in images:
        alt = (m.get("alt_text") or "").strip()
        title = (m.get("title") or {}).get("rendered", "") if isinstance(m.get("title"), dict) else ""
        blob = f"{alt} {title}".lower()
        tag = ""
        if any(k in blob for k in ["دکتر", "doctor", "dr-", "hamed", "کرمانی", "kermani"]):
            tag = " <== DOCTOR?"
        print(f"  [{m['id']}] {m['source_url'][-70:]} alt={alt[:40]!r}{tag}")

    json.dump(report, open(UP / "report.json", "w"), ensure_ascii=False, indent=1)
    print(f"\nsaved {UP/'report.json'}")


if __name__ == "__main__":
    main()
