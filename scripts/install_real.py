#!/usr/bin/env python3
"""Optimize real dromfs.com images and install into public/img."""
from PIL import Image
from pathlib import Path

SRC = Path("/home/z/my-project/upload/dromfs_originals")
DST = Path("/home/z/my-project/public/img")
DST.mkdir(exist_ok=True)

# (source, target, max_width)
JOBS = [
    ("doctor-profile-2025-a.png", "dr-kermani-portrait.jpg", 1100),
    ("or-dsc0149.jpg",            "dr-kermani-white.jpg",    1100),
    ("doctor-jaw-surgery-2023.jpg", "dr-kermani-or.jpg",     1400),
    ("ba-bimax-after.jpg",        "ba-bimax-after.jpg",      1100),
    ("ba-bimax-before.jpg",       "ba-bimax-before.jpg",     1100),
    ("ba-blepharo-after.jpg",     "ba-blepharo-after.jpg",   1100),
    ("ba-blepharo-before.jpg",    "ba-blepharo-before.jpg",  1100),
    ("imp-best-clinic.jpg",       "work-implant-parallel.jpg", 1100),
    ("imp-front-teeth.jpg",       "work-implant-front.jpg",  1100),
    ("imp-no-incision.jpg",       "work-implant-flapless.jpg", 1100),
    ("imp-upper-jaw-recon.jpg",   "work-upper-recon.jpg",    1100),
    ("clinic-hgjhgjhg508.jpg",    "work-sinus-lift.jpg",     1100),
    ("implant-price-table.jpg",   "work-macro.jpg",          1100),
]

for src, dst, w in JOBS:
    im = Image.open(SRC / src).convert("RGB")
    if im.width > w:
        h = round(im.height * w / im.width)
        im = im.resize((w, h), Image.LANCZOS)
    out = DST / dst
    im.save(out, quality=86, optimize=True)
    print(f"{dst:32s} {im.size} {out.stat().st_size//1024}KB")
