"""Install clean replacement images chosen from upload/replacements review."""
import shutil, os
from PIL import Image

SRC = '/home/z/my-project/upload/replacements'
DST = '/home/z/my-project/public/img'

# chosen clean, watermark-free images -> descriptive names
PICKS = {
    'jaw-0.jpg': 'profile-f.jpg',        # woman profile before/after (bimax)
    'jaw-1.jpg': 'profile-m.jpg',        # young man profile before/after
    'jaw-3.png': 'profile-dark.jpg',     # elegant dark profile
    'blepharo-3.jpg': 'eyes.jpg',        # eyes closeup
    'blepharo-4.png': 'eyes-profile.jpg',# elegant eyelid profile
    'implant-4.png': 'implant-hand.jpg', # implant model in glove
    'implant-3.jpg': 'implant-models.jpg', # dental models dark bg
    'surgeon-0.jpg': 'or-surgery.jpg',   # dark operating room (cinematic)
    'surgeon-2.jpeg': 'or-team.jpg',     # OR team closeup
    'clinic-0.jpg': 'clinic-dark.jpg',   # dark luxury hallway
    'clinic-1.jpg': 'clinic-dark2.jpg',  # dark modern operatory
    'clinic-2.jpg': 'clinic-wood.jpg',   # warm wood dental office
    'clinic-3.jpg': 'clinic-bright.jpg', # bright waiting room
    'consult-1.jpg': 'consult-xray.jpg', # dentist showing xray
    'consult-5.webp': 'consult-tablet.jpg', # tablet consult (convert)
    'consult-7.jpg': 'consult-talk.jpg', # surgeon consulting patient
}

for src, dst in PICKS.items():
    s, d = os.path.join(SRC, src), os.path.join(DST, dst)
    if src.endswith('.webp'):
        Image.open(s).convert('RGB').save(d, 'JPEG', quality=88)
    else:
        shutil.copy(s, d)
    print('installed', dst)

# remove watermarked / non-premium images that are no longer referenced
BAD = ['jaw-1.jpg','jaw-3.jpg','jaw-4.jpg','jaw-5.jpg','jaw-6.jpg',
       'implant-1.jpg','implant-2.jpg','implant-4.jpg',
       'blepharo-1.jpg','blepharo-2.jpg',
       'consult-3.jpg','consult-4.jpg','surgeon-1.jpg','doctor-2.jpg']
for f in BAD:
    p = os.path.join(DST, f)
    if os.path.exists(p):
        os.remove(p)
        print('removed', f)

print('--- remaining ---')
print(sorted(os.listdir(DST)))
