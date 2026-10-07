#!/usr/bin/env python3
"""Download selected OSS-hosted images + Vazirmatn fonts."""
import os
import urllib.request

BASE = '/home/z/my-project/public'
CDN = 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt'

IMAGES = {
    # clinic / about
    f'{BASE}/img/clinic-interior.jpg': f'{CDN}/8e969cccba05.jpg',
    f'{BASE}/img/clinic-wide.jpg': f'{CDN}/e28088e00c63.jpeg',
    f'{BASE}/img/consult-1.jpg': f'{CDN}/9b825a7ecd38.jpg',
    f'{BASE}/img/consult-2.jpg': f'{CDN}/a520a3027bcf.jpg',
    f'{BASE}/img/consult-3.jpg': f'{CDN}/18031a4d5521.jpg',
    f'{BASE}/img/consult-4.jpg': f'{CDN}/aa76a517dcdc.jpg',
    # jaw surgery gallery (before/after style)
    f'{BASE}/img/jaw-1.jpg': f'{CDN}/f2e643427264.jpg',
    f'{BASE}/img/jaw-2.jpg': f'{CDN}/305af8480a90.jpg',
    f'{BASE}/img/jaw-3.jpg': f'{CDN}/2d298b95f300.jpg',
    f'{BASE}/img/jaw-4.jpg': f'{CDN}/0d26faac940d.jpg',
    f'{BASE}/img/jaw-5.jpg': f'{CDN}/a0d0ab00c3a1.jpg',
    f'{BASE}/img/jaw-6.jpg': f'{CDN}/1fc4e472128a.jpg',
    # implant gallery
    f'{BASE}/img/implant-1.jpg': f'{CDN}/2179b0158f70.jpg',
    f'{BASE}/img/implant-2.jpg': f'{CDN}/4ae479cf8053.jpg',
    f'{BASE}/img/implant-3.jpg': f'{CDN}/21f378570c7b.jpg',
    f'{BASE}/img/implant-4.jpg': f'{CDN}/0a53dfe94509.png',
    # blepharoplasty
    f'{BASE}/img/blepharo-1.jpg': f'{CDN}/266e3b16915d.jpg',
    f'{BASE}/img/blepharo-2.jpg': f'{CDN}/939cf43f95c0.jpg',
    f'{BASE}/img/blepharo-3.jpg': f'{CDN}/b07702dbc059.jpg',
    # doctor / team (persian medical context)
    f'{BASE}/img/doctor-1.jpg': f'{CDN}/dcb0754afd26.jpg',
    f'{BASE}/img/doctor-2.jpg': f'{CDN}/29db14adf916.jpg',
    f'{BASE}/img/doctor-3.jpg': f'{CDN}/03005569760c.jpg',
    f'{BASE}/img/surgeon-1.jpg': f'{CDN}/6034dfee1240.jpg',
    f'{BASE}/img/surgeon-2.jpg': f'{CDN}/5eafbec04208.jpg',
    f'{BASE}/img/surgeon-3.jpg': f'{CDN}/01f55d170611.jpg',
}

FONTS = {
    f'{BASE}/fonts/Vazirmatn-Regular.woff2': 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Regular.woff2',
    f'{BASE}/fonts/Vazirmatn-Medium.woff2': 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Medium.woff2',
    f'{BASE}/fonts/Vazirmatn-Bold.woff2': 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Bold.woff2',
    f'{BASE}/fonts/Vazirmatn-Light.woff2': 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Light.woff2',
    f'{BASE}/fonts/Vazirmatn-Black.woff2': 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Black.woff2',
}

UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
ok = fail = 0

for path, url in {**IMAGES, **FONTS}.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if os.path.exists(path) and os.path.getsize(path) > 2000:
        print('skip', os.path.basename(path)); ok += 1; continue
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=40) as r, open(path, 'wb') as f:
            f.write(r.read())
        print('OK  ', os.path.basename(path), os.path.getsize(path) // 1024, 'KB'); ok += 1
    except Exception as e:
        print('FAIL', os.path.basename(path), e); fail += 1

print(f'\nDone: {ok} ok, {fail} failed')
