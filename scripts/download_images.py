#!/usr/bin/env python3
"""Download dromfs.com images with ASCII-safe filenames."""
import os
import urllib.request
import urllib.parse

OUT = '/home/z/my-project/public/images/dromfs'
os.makedirs(OUT, exist_ok=True)

IMAGES = {
    # name: url
    'logo.png': 'https://dromfs.com/wp-content/uploads/2023/08/dr-hamed-kermani-logo.png',
    'clinic-1.jpg': 'https://dromfs.com/wp-content/uploads/2021/07/DSC_0476-scaled.jpg',
    'clinic-2.jpg': 'https://dromfs.com/wp-content/uploads/2022/01/DSC_0149-Recovered-scaled.jpg',
    'doctor-portrait-1.jpg': 'https://dromfs.com/wp-content/uploads/2021/10/dr.hamedkermani.omfs_.jpg',
    'doctor-portrait-2.jpg': 'https://dromfs.com/wp-content/uploads/2021/10/dr.hamedkermani.omfs_20211003_39.jpg',
    'doctor-portrait-3.jpg': 'https://dromfs.com/wp-content/uploads/2021/10/dr.hamedkermani.omfs_20211003_37.jpg',
    'bimax-1.jpg': 'https://dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani-bimax-surgery-1.jpg',
    'bimax-2.jpg': 'https://dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani-omfs-bimax-surgery-2-1.jpg',
    'gallery-1.jpg': 'https://dromfs.com/wp-content/uploads/2022/08/JHNAJAFZADEH-600x600.jpg',
    'gallery-2.jpg': 'https://dromfs.com/wp-content/uploads/2021/10/dr.hamedkermani.omfs_-600x600.jpg',
    'gallery-3.jpg': 'https://dromfs.com/wp-content/uploads/2021/10/dr.hamedkermani.omfs_20211003_11-600x600.jpg',
    'gallery-4.jpg': 'https://dromfs.com/wp-content/uploads/2021/10/axsa508-600x600.jpg',
    'gallery-5.jpg': 'https://dromfs.com/wp-content/uploads/2021/10/dr.hamedkermani.omfs_20211003_5-600x600.jpg',
    'gallery-6.jpg': 'https://dromfs.com/wp-content/uploads/2022/01/%D8%AC%D8%B1%D8%A7%D8%AD%DB%8C-%D9%81%DA%A9-%D9%88-%D8%B5%D9%88%D8%B1%D8%AA-%D9%82%D8%A8%D9%84-%D9%88-%D8%A8%D8%B9%D8%AF-600x600.jpg',
    'blepharo-1.jpg': 'https://dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani-omfs-%D8%A8%D9%84%D9%81%D8%A7%D8%B1%D9%88%D9%BE%D9%84%D8%A7%D8%B3%D8%AA%DB%8C-%DB%B1.jpg',
    'blepharo-2.jpg': 'https://dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani-omfs-%D8%A8%D9%84%D9%81%D8%A7%D8%B1%D9%88%D9%BE%D9%84%D8%A7%D8%B3%D8%AA%DB%8C-%DB%B2.jpg',
    'implant-1.jpg': 'https://dromfs.com/wp-content/uploads/2021/11/%D9%81%D9%88%D9%84-%D8%A7%DB%8C%D9%85%D9%BE%D9%84%D9%86%D8%AA-300x300.jpg',
    'implant-2.jpg': 'https://dromfs.com/wp-content/uploads/2021/10/dr.hamedkermani.omfs_20211003_37-300x300.jpg',
    'implant-3.jpg': 'https://dromfs.com/wp-content/uploads/2021/11/hgjhgjhg508-300x300.jpg',
    'implant-4.jpg': 'https://dromfs.com/wp-content/uploads/2021/11/dr-hamed-kermani--300x300.jpg',
    'implant-5.jpg': 'https://dromfs.com/wp-content/uploads/2021/11/%DA%A9%D8%A7%D8%B4%D8%AA-%D8%AF%D9%86%D8%AF%D8%A7%D9%86-%D8%A8%D8%AF%D9%88%D9%86-%D8%A8%D8%B1%D8%B4-%D8%AC%D8%B1%D8%A7%D8%AD%DB%8C-300x300.jpg',
    'implant-6.jpg': 'https://dromfs.com/wp-content/uploads/2021/11/%DA%A9%D8%A7%D8%B4%D8%AA-%D8%AF%D9%86%D8%AF%D8%A7%D9%86-%D9%87%D8%A7%DB%8C-%D8%AC%D9%84%D9%88-300x300.jpg',
    'implant-7.jpg': 'https://dromfs.com/wp-content/uploads/2021/11/%DA%A9%D8%A7%D8%B4%D8%AA-%D8%AF%D9%86%D8%AF%D8%A7%D9%86-%D8%AF%D8%B1-%D8%A8%D9%87%D8%AA%D8%B1%DB%8C%D9%86-%D9%85%D8%B7%D8%A8-%D8%AA%D9%87%D8%B1%D8%A7%D9%86-300x300.jpg',
    'implant-8.jpg': 'https://dromfs.com/wp-content/uploads/2021/11/%D8%A8%D8%A7%D8%B2%D8%B3%D8%A7%D8%B2%DB%8C-%DA%A9%D8%A7%D9%85%D9%84-%D9%81%DA%A9-%D8%A8%D8%A7%D9%84%D8%A7-%D8%A8%D8%A7-%D8%A7%DB%8C%D9%85%D9%BE%D9%84%D9%86%D8%AA-300x300.jpg',
}

ok, fail = 0, 0
for name, url in IMAGES.items():
    path = os.path.join(OUT, name)
    if os.path.exists(path) and os.path.getsize(path) > 1000:
        print(f'skip {name}')
        ok += 1
        continue
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=30) as r, open(path, 'wb') as f:
            f.write(r.read())
        size = os.path.getsize(path)
        print(f'OK   {name}  {size//1024}KB')
        ok += 1
    except Exception as e:
        print(f'FAIL {name}: {e}')
        fail += 1

print(f'\nDone: {ok} ok, {fail} failed')
