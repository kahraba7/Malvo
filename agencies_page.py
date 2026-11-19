# Short partner page for agencies (not in nav or sitemap). Built by build-pages.py.
T={'en':dict(
 eb='For agencies',h='A better dining experience for your restaurant clients.',
 l='A menu guests enjoy, a button to call the waiter and table booking, all from one link and a QR code. Built for each of your restaurants, with its own name and look.',
 b1='Talk to us on WhatsApp',b2='See it live at Kanzel',
 chips=['No app to install','Arabic and English','Each client’s own brand'],
 gh='What each client gets',
 g=[('A menu guests enjoy','Photos, search and sold-out dishes. Update it once, it changes for every guest.'),('Call the waiter','Guests call from the table. No waving, no waiting.'),('Table booking','A booking form on the same link. Reception sees every request and confirms it.'),('Order from the table','Guests order by QR and the waiter confirms on their own screen.')],
 ph='Running today',ph2='Live at Kanzel Restaurant & Lounge',
 pp='Kanzel is a real restaurant we work with. Waiter, reception and owner screens run there every day. Try the real site yourself.',
 pa='Waiter, reception and owner screens at Kanzel',
 pb1='Try the live site',pb2='Open the case study',
 sh='How a partnership works',
 st=[('Pick a client','Choose a restaurant from your portfolio.'),('Tell us what it needs','Menu, booking, waiter call, orders, payment. Only what fits that place.'),('We build it for you','A working system with the client’s name, logo and colours, ready for you to present.')],
 ah='Agreed project by project',
 ac=['Scope set by the client’s needs','Any payment provider the client chooses','Timeline by project size','Works alongside the client’s cashier system'],
 ch='Let’s build it for one of your clients.',cp='Tell us which restaurant and what it needs.',cb='Talk to us on WhatsApp',ml='Or email',more='See the full system',
 t='Restaurant systems for agencies | MALVO',d='Menu, waiter call and table booking for your restaurant clients, built under their own brand. Running today at Kanzel.'),
'ar':dict(
 eb='للوكالات',h='تجربة طعام أفضل لعملائك من المطاعم.',
 l='منيو يستمتع به الضيف، وزر لنداء الويتر، وحجز للطاولات، كلها من رابط واحد وكود QR. نبنيها لكل مطعم باسمه وشكله.',
 b1='راسلنا على واتساب',b2='شاهده يعمل في كنزل',
 chips=['بدون تحميل تطبيق','عربي وإنجليزي','هوية كل عميل'],
 gh='ماذا يحصل عليه كل عميل',
 g=[('منيو يستمتع به الضيف','صور وبحث وأطباق «نفدت». تحدّثه مرة واحدة فيتغير عند كل الضيوف.'),('نداء الويتر','الضيف ينادي الويتر من طاولته. بدون إشارات وانتظار.'),('حجز الطاولات','نموذج حجز على نفس الرابط. الاستقبال يرى كل طلب ويؤكده.'),('الطلب من الطاولة','الضيف يطلب بالـ QR والويتر يؤكد من شاشته.')],
 ph='يعمل الآن',ph2='يعمل فعليًا في مطعم كنزل',
 pp='كنزل مطعم حقيقي نعمل معه. شاشات الويتر والاستقبال والمالك تعمل هناك كل يوم. جرّب الموقع الحقيقي بنفسك.',
 pa='شاشات الويتر والاستقبال والمالك في كنزل',
 pb1='جرّب الموقع الحقيقي',pb2='افتح دراسة الحالة',
 sh='كيف تعمل الشراكة',
 st=[('اختر عميلًا','اختر مطعمًا من عملائك.'),('أخبرنا بما يحتاجه','منيو، حجز، نداء الويتر، طلبات، دفع. فقط ما يناسب هذا المكان.'),('نبنيه لك','نظام يعمل باسم العميل وشعاره وألوانه، جاهز لتعرضه عليه.')],
 ah='يُتفق عليه لكل مشروع',
 ac=['النطاق حسب احتياج العميل','أي وسيلة دفع يختارها العميل','المدة حسب حجم المشروع','يعمل بجانب نظام الكاشير عند العميل'],
 ch='لنبنيه لأحد عملائك.',cp='أخبرنا أي مطعم وماذا يحتاج.',cb='راسلنا على واتساب',ml='أو راسلنا على',more='شاهد تفاصيل النظام كاملة',
 t='أنظمة المطاعم للوكالات | MALVO',d='منيو ونداء الويتر وحجز الطاولات لعملاء الوكالة من المطاعم، باسم كل مطعم. يعمل الآن في كنزل.')}
def body(lg,wa,s_):
    r=T[lg];ar=lg=='ar';arw='↖'if ar else'↗'
    chips=''.join(f'<li>{c}</li>'for c in r['chips'])
    g=''.join(f'<div><b>{a}</b><p>{b}</p></div>'for a,b in r['g'])
    st=''.join(f'<li><span>{i+1}</span><b>{a}</b><p>{b}</p></li>'for i,(a,b) in enumerate(r['st']))
    ac=''.join(f'<li>{x}</li>'for x in r['ac'])
    return f'''<section class="r-hero ag-h"><div class="wrap r-hg2"><div><p class="r-eb">{r['eb']}</p><h1>{r['h']}</h1><p class="lead">{r['l']}</p><div class="acts"><a class="btn pri" href="{wa}" target="_blank" rel="noopener"><span>{r['b1']}</span><span aria-hidden="true">{arw}</span></a><a class="btn sec" href="https://kanzel-eg.vercel.app/" target="_blank" rel="noopener"><span>{r['b2']}</span><span aria-hidden="true">{arw}</span></a></div><ul class="chips">{chips}</ul></div>
<div class="ag-vid"><video src="kanzel-reel.mp4" poster="kanzel-poster.jpg" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video></div></div></section>
<section class="pgs r-fx ag-g"><div class="wrap"><div class="r-hd"><h2>{r['gh']}</h2></div><div class="fxg">{g}</div></div></section>
<section class="pgs ag-p"><div class="wrap"><img src="kanzel-screens.jpg" alt="{r['pa']}" width="1080" height="864" loading="lazy"><div><p class="r-eb">{r['ph']}</p><h2>{r['ph2']}</h2><p>{r['pp']}</p><div class="acts"><a class="btn pri" href="https://kanzel-eg.vercel.app/" target="_blank" rel="noopener"><span>{r['pb1']}</span><span aria-hidden="true">{arw}</span></a><a class="btn sec" href="kanzel{s_}"><span>{r['pb2']}</span></a></div></div></div></section>
<section class="pgs ag-s"><div class="wrap"><div class="r-hd"><h2>{r['sh']}</h2></div><ol>{st}</ol><div class="ag-a"><b>{r['ah']}</b><ul>{ac}</ul></div></div></section>
<section class="r-cta"><div class="wrap"><h2>{r['ch']}</h2><p>{r['cp']}</p><a class="btn pri" href="{wa}" target="_blank" rel="noopener"><span>{r['cb']}</span><span aria-hidden="true">{arw}</span></a><p class="r-mail">{r['ml']} <a href="mailto:malvo.egypt@gmail.com">malvo.egypt@gmail.com</a> · <a href="restaurants{s_}">{r['more']}</a></p></div></section>'''
