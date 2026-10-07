#!/usr/bin/env python3
"""Contact sheet of downloaded dromfs originals."""
from PIL import Image, ImageDraw
from pathlib import Path

SRC = Path("/home/z/my-project/upload/dromfs_originals")
files = sorted(SRC.glob("*.jpg")) + sorted(SRC.glob("*.png"))
COLS, TW, TH, CAP = 4, 340, 260, 26
rows = (len(files) + COLS - 1) // COLS
sheet = Image.new("RGB", (COLS * TW, rows * (TH + CAP)), (18, 18, 20))
d = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    try:
        im = Image.open(f).convert("RGB")
        im.thumbnail((TW - 8, TH - 8))
        x, y = (i % COLS) * TW, (i // COLS) * (TH + CAP)
        sheet.paste(im, (x + (TW - im.width) // 2, y + (TH - im.height) // 2))
        d.text((x + 6, y + TH + 4), f"{i}: {f.name[:44]}", fill=(240, 240, 240))
    except Exception as e:
        print(f"err {f.name}: {e}")
out = Path("/home/z/my-project/scripts/originals-sheet.jpg")
sheet.save(out, quality=88)
print(f"saved {out} ({sheet.width}x{sheet.height})")
for i, f in enumerate(files):
    im = Image.open(f)
    print(f"{i}: {f.name} {im.size}")
