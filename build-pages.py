#!/usr/bin/env python3
"""Generates restaurants / kanzel / agencies pages (EN + AR). Run: python3 build-pages.py
Kanzel markup lives in kanzel-section.html / kanzel-section-ar.html, so edit it there and re-run."""
import re
WA='https://wa.me/201271570930?text='
D='https://malvo-eg.vercel.app/'
L={'en':dict(ar=False,home='index.html',nav=[('Home','index.html'),('Services','index.html#services'),('About','index.html#about'),('Sectors','index.html#projects'),('Contact','index.html#contact')],lt='Let’s Talk',dt='Book a demo',skip='Skip to content',
 wa='Hi MALVO, I’d like to book a demo of the restaurant and café system.',sw=('العربية','{}-ar'),
 pr=('Projects','Restaurant and café systems','Menus, table ordering, booking and staff screens, built around how a restaurant or café works.','1 project · Kanzel','More on the way','New sectors and projects will appear here.',
  'Projects.','Systems we build, grouped by the kind of business they serve. Pick one to see what it does for you.','Projects & systems | MALVO','What MALVO builds, by sector.'),
 rs=dict(k='Restaurant systems by MALVO',h='One system for the whole dining room.',l='From the guest’s phone to the waiter, reception and the owner. Already running in a real restaurant.',b1='See it running',b2='Talk to us',
  h2='What your restaurant gets',c=[('Digital menu','Dish photos, categories and search, in Arabic and English. Mark a dish sold out and it disappears for every guest at once.'),('QR on every table','The table number is inside the code. Guests order from their own phone, with no app and no sign-up.'),('Orders to the waiter, live','The order lands on the waiter’s screen in real time. He confirms, edits or declines with a reason, and the guest sees every change.'),('Table and event booking','A booking form that opens ready to fill. Reception confirms and the guest hears back in the chat.'),('One link for your chats','Answer any WhatsApp or Instagram message with one link: menu and booking together.'),('Owner view','Follow orders and bookings as the night unfolds, from a screen made for the owner.')],
  h3='How it works',s=[('We learn your restaurant','We go through your menu, tables and team.'),('We build it for you','Your name, logo, colours and dishes, set up and tested with your staff.'),('You go live','QR codes on the tables, and your guests start ordering.')],
  ph='Already live',ph2='Kanzel Restaurant & Lounge',pp='Our first restaurant system, built end to end and running for real. Try the real site, then follow one order across two phones.',pb1='Open the case study',pb2='Visit live site',
  ch='Want this for your restaurant?',cp='Tell us about your place. We’ll show you how it would work for you.',cb='Message us on WhatsApp',t='Restaurant and café systems: menu, booking, orders | MALVO',d='Digital menu, QR table ordering, table booking and staff screens for restaurants, cafés and multi-branch groups. By MALVO.'),
 kz=dict(t='Kanzel, a restaurant system | MALVO',d='Try the real Kanzel restaurant site and follow one order across two phones.',h='More restaurant systems',p='See everything a restaurant gets, or talk to us about yours.',b1='What your restaurant gets',b2='All sectors',b3='Message us on WhatsApp'),
 foot='© 2026 MALVO. All rights reserved.',back='Back to MALVO'),
 'ar':dict(ar=True,home='ar.html',nav=[('الرئيسية','ar.html'),('الخدمات','ar.html#services'),('من نحن','ar.html#about'),('القطاعات','ar.html#projects'),('تواصل','ar.html#contact')],lt='لنتحدث',dt='احجز ديمو',skip='تخطي إلى المحتوى',
 wa='مرحبًا MALVO، أريد حجز ديمو لنظام المطاعم والكافيهات.',sw=('English','{}'),
 pr=('أعمالنا','أنظمة المطاعم والكافيهات','منيو، طلب من الطاولة، حجز وشاشات للعاملين، مبنية حول طريقة عمل المطعم أو الكافيه.','مشروع واحد · كنزل','المزيد قريبًا','ستظهر هنا قطاعات ومشاريع جديدة.',
  'أعمالنا.','أنظمة نبنيها، مرتبة حسب نوع النشاط. اختر نشاطًا لتعرف ماذا سيقدّم لك.','أعمالنا وأنظمتنا | MALVO','ما تبنيه MALVO، حسب القطاع.'),
 rs=dict(k='أنظمة المطاعم من MALVO',h='نظام واحد لصالة المطعم كلها.',l='من موبايل الضيف إلى الويتر والاستقبال والمالك. يعمل الآن في مطعم حقيقي.',b1='شاهده يعمل',b2='تحدث معنا',
  h2='ماذا سيحصل عليه مطعمك',c=[('منيو رقمي','صور الأطباق والأقسام والبحث، بالعربية والإنجليزية. اجعل الطبق «نفد» فيختفي عن كل الضيوف في نفس اللحظة.'),('QR على كل طاولة','رقم الطاولة داخل الكود. الضيف يطلب من موبايله، بدون تطبيق وبدون تسجيل.'),('الطلب إلى الويتر لحظيًا','يظهر الطلب على شاشة الويتر فورًا. يؤكده أو يعدّله أو يعتذر عنه بسبب، ويرى الضيف كل تغيير.'),('حجز الطاولات والمناسبات','نموذج حجز يفتح جاهزًا للتعبئة. الاستقبال يؤكد ويصل الرد للضيف على الشات.'),('رابط واحد للشات','ردّ على أي رسالة على واتساب أو إنستجرام برابط واحد: المنيو والحجز معًا.'),('شاشة المالك','تابع الطلبات والحجوزات أثناء الليلة، من شاشة مصممة لصاحب المطعم.')],
  h3='كيف يتم',s=[('نتعرف على مطعمك','نراجع معك المنيو والطاولات وفريق العمل.'),('نبنيه لك','اسمك ولوجو وألوان وأطباق مطعمك، مُجهّز ومُجرّب مع فريقك.'),('تبدأ التشغيل','أكواد QR على الطاولات، وضيوفك يبدؤون الطلب.')],
  ph='يعمل الآن',ph2='مطعم كنزل',pp='أول نظام مطعم لدينا، مبني بالكامل ويعمل فعليًا. جرّب الموقع الحقيقي، ثم تابع طلبًا واحدًا عبر موبايلين.',pb1='افتح دراسة الحالة',pb2='زيارة الموقع',
  ch='تريد هذا لمطعمك؟',cp='أخبرنا عن مطعمك، ونوضّح لك كيف سيعمل معك.',cb='راسلنا على واتساب',t='أنظمة المطاعم والكافيهات: منيو وحجز وطلبات | MALVO',d='منيو رقمي، طلب من الطاولة بالـ QR، حجز طاولات وشاشات للعاملين للمطاعم والكافيهات والمجموعات متعددة الفروع، من MALVO.'),
 kz=dict(t='كنزل، نظام مطعم | MALVO',d='جرّب موقع كنزل الحقيقي وتابع طلبًا واحدًا عبر موبايلين.',h='المزيد من أنظمة المطاعم',p='شاهد كل ما يحصل عليه المطعم، أو تحدث معنا عن مطعمك.',b1='ماذا سيحصل عليه مطعمك',b2='كل القطاعات',b3='راسلنا على واتساب'),
 foot='© 2026 MALVO. جميع الحقوق محفوظة.',back='العودة إلى MALVO')}
from urllib.parse import quote
ix={'en':open('index.html',encoding='utf8').read(),'ar':open('ar.html',encoding='utf8').read()}
FONTLINKS={'en':'<link rel="preload" href="fonts/Inter-400.woff" as="font" type="font/woff" crossorigin><link rel="preload" href="fonts/Inter-500.woff" as="font" type="font/woff" crossorigin><link rel="preload" href="fonts/SpaceGrotesk-VF.woff" as="font" type="font/woff" crossorigin><link rel="stylesheet" href="fonts.css">','ar':'<link rel="preload" href="fonts/Cairo-VF.woff" as="font" type="font/woff" crossorigin><link rel="stylesheet" href="fonts-ar.css">'}
FONTS={'en':'Inter:wght@400;500&family=Space+Grotesk:wght@500;600;700&family=Cormorant+Garamond:wght@500;600','ar':'Cairo:wght@400;500;600;700&family=Cormorant+Garamond:wght@500;600&family=Readex+Pro:wght@300;400;500'}
LOGO='<svg viewBox="0 0 442 358" aria-hidden="true"><path d="M0 0 L218 169 L167 218 L0 86 Z"/><path d="M0 171 L72 227 L72 342 L0 342 Z"/><path d="M167 262 L338 98 L338 192 L167 358 Z"/><path d="M370 66 L442 0 L442 342 L370 342 Z"/></svg>'
GLOBE_SVG='<svg class="gl-svg" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><g class="gl-orb" transform="rotate(-24 16 16)"><ellipse cx="16" cy="16" rx="15" ry="5.2"/><circle class="gl-dot" r="1.9"><animateMotion dur="3.6s" repeatCount="indefinite" path="M31 16A15 5.2 0 1 1 1 16A15 5.2 0 1 1 31 16"/></circle></g><circle class="gl-b" cx="16" cy="16" r="10.5"/><path class="gl-l" d="M6.6 11.6h18.8M5.5 16h21M6.6 20.4h18.8"/><ellipse class="gl-m m1" cx="16" cy="16" rx="10.5" ry="10.5"/><ellipse class="gl-m m2" cx="16" cy="16" rx="10.5" ry="10.5"/><ellipse class="gl-m m3" cx="16" cy="16" rx="10.5" ry="10.5"/></svg>'
def globe(href,hl,label,code):
    return f'<a class="lang globe" href="{href}" hreflang="{hl}" lang="{hl}" aria-label="{label}" title="{label}">{GLOBE_SVG}<b class="gl-c" aria-hidden="true">{code}</b><span class="gl-t">{label}</span></a>'
def wa(c):return WA+quote(c['wa'])
AGWA={'en':WA+quote('Hi MALVO, I’m interested in the agency partnership for restaurant systems.'),'ar':WA+quote('مرحبًا MALVO، مهتم بالشراكة مع الوكالات لأنظمة المطاعم.')}
def shell(*a,**k):
    return re.sub(r'&(?!#?\w+;)','&amp;',_shell(*a,**k))
def _shell(lg,slug,title,desc,body,kz=False):
    c=L[lg];sfx='-ar' if lg=='ar' else '';url=D+slug+sfx
    css=''.join(f'<link rel="stylesheet" href="{f}.css">' for f in (['style','kanzel','kanzel-sim']if kz else['style']))+'<link rel="stylesheet" href="pages.css">'+('<link rel="stylesheet" href="rtl.css">'if c['ar']else'')
    nav=''.join(f'<li><a href="{u}"{" aria-current=page"if slug in("restaurants","kanzel")and u.endswith("#projects")else""}>{n}</a></li>'for n,u in c['nav'])
    sw=c['sw'][1].format(slug)
    og=('og-restaurants'+('-ar' if c['ar'] else '')+'.png') if slug=='restaurants' else ('og-image-ar.png' if c['ar'] else 'og-image.png')
    wabtn=re.search(r'<a class="wa".*?</a>',ix[lg],re.S).group(0)
    js=''.join(f'<script src="{s}.js" defer></script>'for s in(['pages','kanzel','kanzel-sim']if kz else['pages']+(['scenes']if slug=='restaurants'else[])))
    return f'''<!DOCTYPE html>
<html lang="{lg}"{' dir="rtl"'if c['ar']else''}>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title><meta name="description" content="{desc}"><meta name="theme-color" content="#151719">
<meta property="og:type" content="website"><meta property="og:site_name" content="MALVO"><meta property="og:title" content="{title}"><meta property="og:description" content="{desc}"><meta property="og:url" content="{url}">
<meta property="og:image" content="{D}{og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:locale" content="{'ar_EG'if c['ar']else'en_US'}"><meta property="og:image:alt" content="{title}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{title}"><meta name="twitter:description" content="{desc}"><meta name="twitter:image" content="{D}{og}">
<link rel="canonical" href="{url}"><link rel="alternate" hreflang="en" href="{D+slug}"><link rel="alternate" hreflang="ar" href="{D+slug}-ar">
<link rel="icon" type="image/svg+xml" href="favicon.svg"><link rel="apple-touch-icon" href="apple-touch-icon.png">
{FONTLINKS[lg]}{css}</head>
<body><a class="skip" href="#main">{c['skip']}</a><div class="prog" id="prog" aria-hidden="true"></div>
<header id="hdr"><div class="wrap bar"><a class="logo" href="{c['home']}" aria-label="{'MALVO، الرئيسية'if c['ar']else'MALVO home'}">{LOGO}<img src="malvo-wordmark.png" alt="" width="73" height="15"></a>
<button class="burger" id="burger" aria-expanded="false" aria-controls="menu" aria-label="{'فتح القائمة'if c['ar']else'Open menu'}"><span></span><span></span><span></span></button>
<nav id="menu" aria-label="{'القائمة الرئيسية'if c['ar']else'Main'}"><ul>{nav}<li>{globe(sw,'en'if c['ar']else'ar',c['sw'][0],'EN'if c['ar']else'ع')}</li><li><a class="btn pri" href="{AGWA[lg] if slug=='agencies' else wa(c)}" target="_blank" rel="noopener">{c['lt']}</a></li></ul></nav></div></header>
<main id="main">{body}</main>
<footer class="pf"><div class="wrap"><span>{c['foot']}</span><a href="{c['home']}">{c['back']}</a></div></footer>
{wabtn}{js}</body></html>'''
def crumb(lg,items):
    return '<div class="crumb" role="navigation" aria-label="'+('مسار التنقل'if lg=='ar'else'Breadcrumb')+'">'+' <span>/</span> '.join(f'<a href="{u}">{n}</a>'if u else f'<span>{n}</span>'for n,u in items)+'</div>'
for lg in('en','ar'):
    c=L[lg];s='-ar'if lg=='ar'else'';p=c['pr'];r=c['rs'];k=c['kz'];ar=c['ar']
    # restaurants pitch (copy and layout in restaurants_page.py)
    import restaurants_page as rp
    body=rp.body(lg,wa(c),s,crumb(lg,[(c['nav'][3][0],c['nav'][3][1]),(p[1],None)]),None)
    open(f'restaurants{s}.html','w',encoding='utf8').write(shell(lg,'restaurants',r['t'],r['d'],body))
    # agencies partner page (not in nav/sitemap, noindex)
    import agencies_page as ap
    body=ap.body(lg,AGWA[lg],s)
    open(f'agencies{s}.html','w',encoding='utf8').write(shell(lg,'agencies',ap.T[lg]['t'],ap.T[lg]['d'],body).replace('<meta name="theme-color"','<meta name="robots" content="noindex"><meta name="theme-color"',1))
    # kanzel case study: the Kanzel world from the home page, standalone
    sec=open('kanzel-section'+('-ar' if lg=='ar' else '')+'.html',encoding='utf8').read().strip().replace('href="#contact"',f'href="{wa(c)}" target="_blank" rel="noopener"')
    sec=re.sub(r'<h2 class="kz-h" id="kz-h1">(.*?)</h2>',r'<h1 class="kz-h" id="kz-h1">\1</h1>',sec,1,flags=re.S)
    body=sec+f'''<section class="kz-next"><div class="wrap"><h2>{k['h']}</h2><p class="lead" style="margin-inline:auto">{k['p']}</p>
<div class="acts"><a class="btn pri" href="restaurants{s}"><span>{k['b1']}</span></a><a class="btn sec" href="{c['nav'][3][1]}"><span>{k['b2']}</span></a><a class="btn sec" href="{wa(c)}" target="_blank" rel="noopener"><span>{k['b3']}</span></a></div></div></section>'''
    open(f'kanzel{s}.html','w',encoding='utf8').write(shell(lg,'kanzel',k['t'],k['d'],body,kz=True))
# sitemap + CSP already allows what is used
sm=open('sitemap.xml',encoding='utf8').read()
add=''.join(f'<url><loc>{D}{n}{s}</loc></url>\n'for n in('restaurants','kanzel')for s in('','-ar')if f'{D}{n}{s}<'not in sm)
open('sitemap.xml','w',encoding='utf8').write(sm.replace('</urlset>',add+'</urlset>'))
print('ok')
