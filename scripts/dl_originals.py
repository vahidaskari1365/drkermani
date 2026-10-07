#!/usr/bin/env python3
"""Try downloading dromfs.com images via Wayback Machine mirrors."""
import subprocess
import sys
import urllib.parse
from pathlib import Path

OUT = Path("/home/z/my-project/upload/dromfs_originals")
OUT.mkdir(parents=True, exist_ok=True)

IMAGES = [
    # doctor profile photos (priority)
    "https://dromfs.com/wp-content/uploads/2025/07/dr-hamed-kermani-profile-1-1.png",
    "https://dromfs.com/wp-content/uploads/2025/07/dr-hamed-kermani-profile-.png",
    "https://dromfs.com/wp-content/uploads/2022/11/photo-of-dr-hamed-kermani.png",
    "https://dromfs.com/wp-content/uploads/2023/09/دکتر-حامد-کرمانی-،-جراحی-فک.jpg",
    "https://dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani-.jpg",
    "https://dromfs.com/wp-content/uploads/2021/10/dr.hamedkermani.omfs_20211003_39.jpg",
    # before/after portfolio
    "https://dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani-bimax-surgery-1.jpg",
    "https://dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani-omfs-bimax-surgery-2-1.jpg",
    "https://dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani-omfs-بلفاروپلاستی-۱.jpg",
    "https://dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani-omfs-بلفاروپلاستی-۲.jpg",
    # gallery / implant portfolio
    "https://dromfs.com/wp-content/uploads/2021/11/کاشت-دندان-بدون-برش-جراحی.jpg",
    "https://dromfs.com/wp-content/uploads/2021/11/کاشت-دندان-های-جلو.jpg",
    "https://dromfs.com/wp-content/uploads/2021/11/کاشت-دندان-در-بهترین-مطب-تهران.jpg",
    "https://dromfs.com/wp-content/uploads/2021/11/بازسازی-کامل-فک-بالا-با-ایمپلنت.jpg",
    "https://dromfs.com/wp-content/uploads/2021/11/hgjhgjhg508.jpg",
    "https://dromfs.com/wp-content/uploads/2022/01/DSC_0149-Recovered-scaled.jpg",
    "https://dromfs.com/wp-content/uploads/2021/11/هزینه-کاشت-دندان.jpg",
]


def try_fetch(url: str, dest: Path) -> bool:
    """Try direct -> wayback latest -> wayback id_."""
    # 1) direct
    r = subprocess.run(["curl", "-sL", "--max-time", "20", "-A",
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0",
                        url, "-o", str(dest), "-w", "%{http_code}"],
                       capture_output=True, text=True)
    if r.stdout.strip() == "200" and dest.exists() and dest.stat().st_size > 5000:
        print(f"  DIRECT ok {dest.name} ({dest.stat().st_size}b)")
        return True
    # 2) wayback latest snapshot
    wb = "https://web.archive.org/web/2024id_/" + urllib.parse.quote(url, safe="/:@")
    r = subprocess.run(["curl", "-sL", "--max-time", "40", wb, "-o", str(dest), "-w", "%{http_code}"],
                       capture_output=True, text=True)
    if r.stdout.strip() == "200" and dest.exists() and dest.stat().st_size > 5000:
        print(f"  WAYBACK ok {dest.name} ({dest.stat().st_size}b)")
        return True
    if dest.exists():
        dest.unlink()
    print(f"  FAIL {url[-70:]} ({r.stdout.strip()})")
    return False


def main() -> None:
    ok = []
    for i, url in enumerate(IMAGES):
        name = url.rsplit("/", 1)[-1]
        dest = OUT / name
        print(f"[{i+1}/{len(IMAGES)}] {name[:60]}")
        if try_fetch(url, dest):
            ok.append(dest.name)
    print(f"\n=== {len(ok)}/{len(IMAGES)} downloaded: {ok}")


if __name__ == "__main__":
    main()
