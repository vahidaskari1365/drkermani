#!/usr/bin/env python3
"""Extract text + images from services & contact page JSONs."""
import json
import re
from html import unescape

def strip_tags(s):
    s = re.sub(r'<[^>]+>', ' ', s)
    s = unescape(s)
    return re.sub(r'\s+', ' ', s).strip()

def parse(path, label):
    print("=" * 70)
    print(label)
    print("=" * 70)
    with open(path) as f:
        data = json.load(f)
    html = data['data']['html']
    clean = re.sub(r'<script[^>]*>[\s\S]*?</script>', '', html, flags=re.I)
    clean = re.sub(r'<style[^>]*>[\s\S]*?</style>', '', clean, flags=re.I)

    headings = re.findall(r'<(h[1-6])[^>]*>([\s\S]*?)</\1>', clean, re.I)
    print("--- HEADINGS ---")
    seen = set()
    for tag, content in headings:
        t = strip_tags(content)
        if t and t not in seen:
            seen.add(t)
            print(f"[{tag}] {t}")

    blocks = re.findall(r'<(?:p|li)[^>]*>([^<>]{15,})</', clean)
    print("--- TEXT ---")
    seen = set()
    for b in blocks:
        t = strip_tags(b)
        if t and t not in seen and 'wp-content' not in t and 'function' not in t:
            seen.add(t)
            print(t)

    imgs = re.findall(r'(?:src|data-src)=["\']([^"\']+\.(?:jpg|jpeg|png|webp)[^"\']*)["\']', clean, re.I)
    print("--- IMAGES ---")
    seen = set()
    for u in imgs:
        if u not in seen and not u.startswith('data:'):
            seen.add(u)
            print(u)
    print()

parse('/home/z/my-project/upload/dromfs_services.json', 'SERVICES PAGE')
parse('/home/z/my-project/upload/dromfs_contact.json', 'CONTACT PAGE')
