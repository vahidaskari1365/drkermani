#!/usr/bin/env python3
"""Fetch full page content (about 18, gallery 560, front 574) + extract all media URLs."""
import json
import re
import subprocess
import time
from pathlib import Path

UP = Path("/home/z/my-project/upload/wpapi")
BASE = "https://dromfs.com/wp-json/wp/v2"


def fetch(name: str, endpoint: str) -> dict | None:
    out = UP / f"{name}.json"
    if out.exists() and out.stat().st_size > 200:
        print(f"[skip] {name}")
    else:
        print(f"[get ] {endpoint}")
        r = subprocess.run(
            ["z-ai", "function", "-n", "page_reader", "-a", json.dumps({"url": f"{BASE}{endpoint}"}), "-o", str(out)],
            capture_output=True, text=True, timeout=120,
        )
        if not out.exists():
            print(f"  !! failed {name}")
            return None
        time.sleep(1)
    raw = json.load(open(out))
    html = (raw.get("data") or {}).get("html", "")
    m = re.search(r"<pre[^>]*>(.*)</pre>", html, re.S)
    if not m:
        return None
    try:
        return json.loads(m.group(1).strip())
    except json.JSONDecodeError:
        return None


def extract_urls(content: str) -> dict:
    urls = {"img": [], "video": [], "link": []}
    for m in re.finditer(r'https?://[^\s"\'<>\)\]\\]+', content):
        u = m.group(0)
        # unescape WP slashes
        u = u.replace("\\/", "/")
        if any(u.lower().endswith(ext) or f"{ext}?" in u.lower() for ext in [".jpg", ".jpeg", ".png", ".webp", ".gif"]):
            if u not in urls["img"]:
                urls["img"].append(u)
        elif any(k in u.lower() for k in [".mp4", ".webm", "youtube", "youtu.be", "aparat.com", "vimeo"]):
            if u not in urls["video"]:
                urls["video"].append(u)
    return urls


def main() -> None:
    pages = {"about": "/pages/18", "gallery": "/pages/560", "front": "/pages/574",
             "ortho": "/pages/242", "contact": "/pages/5"}
    for name, ep in pages.items():
        d = fetch(name, ep)
        if not d:
            print(f"== {name}: FETCH FAILED")
            continue
        content = (d.get("content") or {}).get("rendered", "")
        title = (d.get("title") or {}).get("rendered", "")
        urls = extract_urls(content)
        print(f"\n===== PAGE {name} [{d.get('id')}] «{title}» len={len(content)} =====")
        print(" IMAGES:")
        for u in urls["img"]:
            print(f"   - {u}")
        print(" VIDEOS:")
        for u in urls["video"][:15]:
            print(f"   - {u}")
        # plain text
        text = re.sub(r"\[/?[a-z0-9_ -]+[^\]]*\]", "\n", content)
        text = re.sub(r"<[^>]+>", " ", text)
        text = re.sub(r"\s+", " ", text).strip()
        open(UP / f"{name}_text.txt", "w").write(text)
        print(f" TEXT (first 900): {text[:900]}")

    # retry pages list
    d = fetch("pages", "/pages?per_page=100&_fields=id,slug,link,title")
    if isinstance(d, list):
        print(f"\n===== ALL PAGES ({len(d)}) =====")
        for p in d:
            print(f"  [{p['id']}] {p['slug'][:40]:40s} {p['title']['rendered'][:50]}")


if __name__ == "__main__":
    main()
