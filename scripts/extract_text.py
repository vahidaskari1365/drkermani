#!/usr/bin/env python3
"""Extract full text paragraphs from dromfs.com homepage HTML."""
import json
import re
from html import unescape

with open('/home/z/my-project/upload/dromfs_content.json') as f:
    data = json.load(f)

html = data['data']['html']

clean = re.sub(r'<script[^>]*>[\s\S]*?</script>', '', html, flags=re.I)
clean = re.sub(r'<style[^>]*>[\s\S]*?</style>', '', clean, flags=re.I)
clean = re.sub(r'<!--[\s\S]*?-->', '', clean)

def strip_tags(s):
    s = re.sub(r'<[^>]+>', ' ', s)
    s = unescape(s)
    return re.sub(r'\s+', ' ', s).strip()

# Extract all block-level text
blocks = re.findall(r'<(?:p|div|span|li|h[1-6]|td|th)[^>]*>([^<>]{20,})</', clean)
seen = set()
out = []
for b in blocks:
    t = strip_tags(b)
    if t and t not in seen and not t.startswith('function') and 'wp-content' not in t:
        seen.add(t)
        out.append(t)

print("--- TEXT BLOCKS ---")
for t in out:
    print(t)
    print()

# Working hours / contact section raw
m = re.search(r'ساعات کاری[\s\S]{0,3000}', clean)
if m:
    print("--- WORKING HOURS RAW ---")
    print(strip_tags(m.group(0))[:1500])
