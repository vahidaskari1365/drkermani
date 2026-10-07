#!/usr/bin/env python3
"""Extract before/after slider image pairs + all unique upload URLs from front.json."""
import json
import re
from pathlib import Path

UP = Path("/home/z/my-project/upload/wpapi")

raw = json.load(open(UP / "front.json"))
html = (raw.get("data") or {}).get("html", "")
m = re.search(r"<pre[^>]*>(.*)</pre>", html, re.S)
content = json.loads(m.group(1).strip())["content"]["rendered"]

print("=== BEFORE/AFTER SHORTCODES ===")
for pat in [r"\[before_after[^\]]*\]", r"\[ba_[^\]]*\]", r"before-after[^\"]*", r"data-before[^\s]*"]:
    for mm in re.finditer(pat, content, re.I):
        print(mm.group(0)[:300])

# images with alt/caption context: find all <img ...> tags
print("\n=== IMG TAGS (unique base) ===")
seen = {}
for mm in re.finditer(r'<img[^>]+>', content):
    tag = mm.group(0)
    src = re.search(r'src="([^"]+)"', tag)
    alt = re.search(r'alt="([^"]*)"', tag)
    if not src:
        continue
    u = src.group(1).replace("&#8221;", "").replace("&#8243;", "")
    # strip size suffix
    base = re.sub(r"-\d+x\d+(?=\.\w+$)", "", u)
    if base not in seen:
        seen[base] = {"first_src": u, "alt": alt.group(1) if alt else "", "count": 0}
    seen[base]["count"] += 1

for base, info in seen.items():
    print(f"  x{info['count']} {base}")
    if info["alt"]:
        print(f"      alt: {info['alt'][:60]}")

# find pairs near "Before/After" markers
print("\n=== CONTEXT AROUND Before/After MARKERS ===")
for mm in re.finditer(r"(After|Before)", content):
    s = max(0, mm.start() - 400)
    seg = content[s:mm.start() + 100]
    urls = re.findall(r'https?://[^\s"\'<>]+?\.(?:jpg|jpeg|png|webp)', seg)
    if urls:
        print(f"--- {mm.group(1)} ---")
        for u in urls[-4:]:
            print("   ", u[-90:])

# json-encoded image lists (sliders often carry JSON)
print("\n=== JSON image arrays in content ===")
for mm in re.finditer(r'\{[^{}]*"(?:url|src|image)"\s*:\s*"[^"]+"[^{}]*\}', content):
    print(mm.group(0)[:200])
