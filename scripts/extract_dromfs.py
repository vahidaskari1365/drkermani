#!/usr/bin/env python3
"""Extract structured content (text, services, images, contact) from dromfs.com HTML."""
import json
import re
from html import unescape

with open('/home/z/my-project/upload/dromfs_content.json') as f:
    data = json.load(f)

html = data['data']['html']
title = data['data']['title']

# ---------- Extract images ----------
img_urls = re.findall(r'(?:src|data-src|href)=["\']([^"\']+\.(?:jpg|jpeg|png|webp|gif|svg)[^"\']*)["\']', html, re.I)
bg_urls = re.findall(r'(?:background-image:\s*url\([\'"]?)([^\'")]+)[\'"]?\)', html, re.I)
all_imgs = []
seen = set()
for u in img_urls + bg_urls:
    u = u.strip()
    if u.startswith('data:') or u in seen:
        continue
    if len(u) < 10:
        continue
    seen.add(u)
    all_imgs.append(u)

# ---------- Extract text structure ----------
# Remove scripts/styles
clean = re.sub(r'<script[^>]*>[\s\S]*?</script>', '', html, flags=re.I)
clean = re.sub(r'<style[^>]*>[\s\S]*?</style>', '', clean, flags=re.I)
clean = re.sub(r'<!--[\s\S]*?-->', '', clean)

# Find headings and their following paragraphs
headings = re.findall(r'<(h[1-6])[^>]*>([\s\S]*?)</\1>', clean, re.I)

def strip_tags(s):
    s = re.sub(r'<[^>]+>', ' ', s)
    s = unescape(s)
    return re.sub(r'\s+', ' ', s).strip()

print("=" * 60)
print("PAGE TITLE:", title)
print("=" * 60)
print("\n--- HEADINGS ---")
for tag, content in headings:
    txt = strip_tags(content)
    if txt:
        print(f"[{tag}] {txt}")

print("\n--- META DESCRIPTION ---")
for m in re.findall(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\']', html, re.I):
    print(m)
for m in re.findall(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']description["\']', html, re.I):
    print(m)

print("\n--- IMAGES ({}) ---".format(len(all_imgs)))
for u in all_imgs:
    print(u)

print("\n--- LINKS ---")
links = re.findall(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>([\s\S]*?)</a>', clean, re.I)
for href, txt in links[:60]:
    t = strip_tags(txt)
    if t:
        print(f"{href}  =>  {t[:80]}")

# ---------- Save structured output ----------
with open('/home/z/my-project/upload/dromfs_extracted.txt', 'w') as f:
    f.write(f"TITLE: {title}\n\n")
    f.write("HEADINGS:\n")
    for tag, content in headings:
        txt = strip_tags(content)
        if txt:
            f.write(f"[{tag}] {txt}\n")
    f.write("\nIMAGES:\n")
    for u in all_imgs:
        f.write(u + "\n")
print("\nSaved to /home/z/my-project/upload/dromfs_extracted.txt")
