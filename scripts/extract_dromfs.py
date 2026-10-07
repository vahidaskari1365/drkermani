#!/usr/bin/env python3
"""Extract readable text + image URLs from saved page_reader JSON dumps of dromfs.com."""
import json, re, html, os

FILES = {
    'home': '/home/z/my-project/upload/dromfs_content.json',
    'services': '/home/z/my-project/upload/dromfs_services.json',
    'contact': '/home/z/my-project/upload/dromfs_contact.json',
}

def clean(raw: str) -> str:
    if not raw:
        return ''
    # capture img srcs before stripping tags
    imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', raw)
    txt = re.sub(r'<script[\s\S]*?</script>', ' ', raw, flags=re.I)
    txt = re.sub(r'<style[\s\S]*?</style>', ' ', txt, flags=re.I)
    txt = re.sub(r'<br\s*/?>', '\n', txt, flags=re.I)
    txt = re.sub(r'</(p|div|h[1-6]|li|tr|figcaption|blockquote)>', '\n', txt, flags=re.I)
    txt = re.sub(r'<[^>]+>', ' ', txt)
    txt = html.unescape(txt)
    txt = re.sub(r'[ \t\r\f\v]+', ' ', txt)
    txt = re.sub(r' ?\n ?', '\n', txt)
    txt = re.sub(r'\n{2,}', '\n', txt)
    lines = [l.strip() for l in txt.split('\n')]
    lines = [l for l in lines if l and not re.fullmatch(r'[\s\W_]*', l)]
    return '\n'.join(lines) + ('\n\nIMAGES:\n' + '\n'.join(dict.fromkeys(imgs)) if imgs else '')

out = {}
for name, path in FILES.items():
    with open(path) as f:
        j = json.load(f)
    d = j.get('data', {})
    out[name] = {
        'title': d.get('title', ''),
        'text': clean(d.get('content', '') or d.get('html', '') or d.get('text', '')),
    }

with open('/home/z/my-project/upload/dromfs_all_text.txt', 'w') as f:
    for name, v in out.items():
        f.write(f'\n{"="*70}\nPAGE: {name}  |  TITLE: {v["title"]}\n{"="*70}\n')
        f.write(v['text'])
        f.write('\n')

print('written /home/z/my-project/upload/dromfs_all_text.txt')
for name, v in out.items():
    print(f'--- {name}: {len(v["text"])} chars, title={v["title"]!r}')
