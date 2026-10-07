#!/usr/bin/env python3
"""Batch-download dromfs.com originals via wsrv.nl image proxy."""
import subprocess
import time
from pathlib import Path

OUT = Path("/home/z/my-project/upload/dromfs_originals")
OUT.mkdir(parents=True, exist_ok=True)

IMAGES = [
    ("doctor-profile-2025-a.png", "dromfs.com/wp-content/uploads/2025/07/dr-hamed-kermani-profile-1-1.png"),
    ("doctor-profile-2025-b.png", "dromfs.com/wp-content/uploads/2025/07/dr-hamed-kermani-profile-.png"),
    ("doctor-photo-2022.png", "dromfs.com/wp-content/uploads/2022/11/photo-of-dr-hamed-kermani.png"),
    ("doctor-jaw-surgery-2023.jpg", "dromfs.com/wp-content/uploads/2023/09/دکتر-حامد-کرمانی-،-جراحی-فک.jpg"),
    ("doctor-2021.jpg", "dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani-.jpg"),
    ("doctor-omfs-2021.jpg", "dromfs.com/wp-content/uploads/2021/10/dr.hamedkermani.omfs_20211003_39.jpg"),
    ("ba-bimax-after.jpg", "dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani-bimax-surgery-1.jpg"),
    ("ba-bimax-before.jpg", "dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani-omfs-bimax-surgery-2-1.jpg"),
    ("ba-blepharo-after.jpg", "dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani-omfs-بلفاروپلاستی-۱.jpg"),
    ("ba-blepharo-before.jpg", "dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani-omfs-بلفاروپلاستی-۲.jpg"),
    ("imp-no-incision.jpg", "dromfs.com/wp-content/uploads/2021/11/کاشت-دندان-بدون-برش-جراحی.jpg"),
    ("imp-front-teeth.jpg", "dromfs.com/wp-content/uploads/2021/11/کاشت-دندان-های-جلو.jpg"),
    ("imp-best-clinic.jpg", "dromfs.com/wp-content/uploads/2021/11/کاشت-دندان-در-بهترین-مطب-تهران.jpg"),
    ("imp-upper-jaw-recon.jpg", "dromfs.com/wp-content/uploads/2021/11/بازسازی-کامل-فک-بالا-با-ایمپلنت.jpg"),
    ("clinic-hgjhgjhg508.jpg", "dromfs.com/wp-content/uploads/2021/11/hgjhgjhg508.jpg"),
    ("or-dsc0149.jpg", "dromfs.com/wp-content/uploads/2022/01/DSC_0149-Recovered-scaled.jpg"),
    ("implant-price-table.jpg", "dromfs.com/wp-content/uploads/2021/11/هزینه-کاشت-دندان.jpg"),
]

ok = []
for name, path in IMAGES:
    dest = OUT / name
    if dest.exists() and dest.stat().st_size > 5000:
        ok.append(name)
        print(f"[skip] {name}")
        continue
    from urllib.parse import quote
    url = f"https://wsrv.nl/?url={quote(path, safe='/')}&w=1400&q=85&output=jpg"
    r = subprocess.run(["curl", "-sL", "--max-time", "30", url, "-o", str(dest), "-w", "%{http_code}"],
                       capture_output=True, text=True)
    code = r.stdout.strip()
    size = dest.stat().st_size if dest.exists() else 0
    if code == "200" and size > 5000:
        ok.append(name)
        print(f"[ ok ] {name} {size}b")
    else:
        print(f"[FAIL] {name} code={code} size={size}")
        if dest.exists():
            dest.unlink()
    time.sleep(0.6)

print(f"\n=== {len(ok)}/{len(IMAGES)}: {ok}")
