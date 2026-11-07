#!/usr/bin/env python3
"""Self-host the Google Fonts used by the site. Run once, on a machine with internet:
    python3 self-host-fonts.py
Downloads the woff2 files into fonts/, writes fonts.css (English) and fonts-ar.css (Arabic),
points every .html file at them, adds preloads, and tightens vercel.json (no Google hosts).
Safe to re-run."""
import glob, json, os, re, urllib.request
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
SETS = {'fonts.css': ('Inter:wght@400;500&family=Space+Grotesk:wght@500;600;700', 'latin'),
        'fonts-ar.css': ('Cairo:wght@400;500;600;700', 'arabic')}

def get(url, binary=False):
    data = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA})).read()
    return data if binary else data.decode('utf8')

def build(out, fam, subset):
    css = get('https://fonts.googleapis.com/css2?family=%s&display=swap' % fam)
    os.makedirs('fonts', exist_ok=True)
    pre, seen = [], set()
    def swap(m):
        url = m.group(1); name = os.path.basename(url.split('?')[0])
        if not os.path.exists('fonts/' + name):
            open('fonts/' + name, 'wb').write(get(url, True))
        return 'url(fonts/%s)' % name
    # remember which files belong to the main subset, to preload them
    for blk in re.finditer(r'/\*\s*([\w-]+)\s*\*/\s*@font-face\s*\{[^}]*?url\((https://[^)]+)\)', css):
        if blk.group(1) == subset:
            n = os.path.basename(blk.group(2).split('?')[0])
            if n not in seen: seen.add(n); pre.append(n)
    css = re.sub(r'url\((https://fonts\.gstatic\.com/[^)]+)\)', swap, css)
    open(out, 'w', encoding='utf8').write(css)
    return pre

preloads = {out: build(out, fam, sub) for out, (fam, sub) in SETS.items()}

for f in glob.glob('*.html'):
    s = open(f, encoding='utf8').read()
    if 'fonts.googleapis.com' not in s: continue
    out = 'fonts-ar.css' if 'family=Cairo' in s else 'fonts.css'
    tags = ''.join('<link rel="preload" href="fonts/%s" as="font" type="font/woff2" crossorigin>' % n for n in preloads[out])
    s = re.sub(r'<link rel="preconnect"[^>]*fonts\.g[^>]*>\n?', '', s)
    s = re.sub(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com/[^"]*">', tags + '<link rel="stylesheet" href="%s">' % out, s)
    s = s.replace('Fonts are loaded from Google Fonts, which means your IP address is sent to Google when the page loads. ', 'Fonts are served from our own domain. ')
    s = s.replace('تُحمَّل الخطوط من Google Fonts، أي أن عنوان IP الخاص بك يُرسل إلى Google عند تحميل الصفحة. ', 'تُقدَّم الخطوط من نطاقنا نفسه. ')
    open(f, 'w', encoding='utf8').write(s)

v = json.load(open('vercel.json'))
for rule in v['headers']:
    for h in rule['headers']:
        if h['key'] == 'Content-Security-Policy':
            h['value'] = h['value'].replace(' https://fonts.googleapis.com', '').replace('font-src https://fonts.gstatic.com', "font-src 'self'")
if not any(r['source'].startswith('/fonts') for r in v['headers']):
    v['headers'].append({'source': '/fonts/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=31536000, immutable'}]})
json.dump(v, open('vercel.json', 'w'), indent=1)
print('Done. Deploy, then check the Network tab: no requests to fonts.googleapis.com / fonts.gstatic.com.')
