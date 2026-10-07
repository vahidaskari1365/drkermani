"""Download replacement image candidates and build review sheets."""
import json, re, os, urllib.request
from PIL import Image, ImageDraw

SRC = '/home/z/my-project/upload/imgsearch2'
OUT = '/home/z/my-project/upload/replacements'
os.makedirs(OUT, exist_ok=True)

def dl(url, path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=30) as r, open(path, 'wb') as f:
        f.write(r.read())

manifest = {}
for name in ['jaw', 'implant', 'blepharo', 'surgeon', 'clinic', 'consult']:
    raw = open(f'{SRC}/{name}.raw').read()
    m = re.search(r'\{.*\}', raw, re.S)
    d = json.loads(m.group(0))
    for i, r in enumerate(d['results']):
        url = r['original_url']
        ext = os.path.splitext(url)[1] or '.jpg'
        fn = f'{name}-{i}{ext}'
        p = os.path.join(OUT, fn)
        try:
            dl(url, p)
            manifest[fn] = url
        except Exception as e:
            print('FAIL', fn, e)

# review sheet
files = sorted(os.listdir(OUT))
cols, thumb = 6, 230
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * thumb, rows * (thumb + 20)), 'white')
dr = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    try:
        im = Image.open(os.path.join(OUT, f)).convert('RGB')
        im.thumbnail((thumb, thumb))
        x, y = (i % cols) * thumb, (i // cols) * (thumb + 20)
        sheet.paste(im, (x, y + 20))
        dr.text((x + 4, y + 4), f, fill='black')
    except Exception as e:
        print('skip', f, e)
sheet.save('/home/z/my-project/scripts/replacement-sheet.jpg', quality=80)
print('downloaded', len(files))
