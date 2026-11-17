/* Kanzel story: two phones play one real night, on their own. Guest side (left) and Kanzel staff (right). */
(()=>{
const root=document.getElementById('kz-story');if(!root)return;
const AR=document.documentElement.dir==='rtl'||/^ar/.test(document.documentElement.lang);
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const $=(s,r=root)=>r.querySelector(s),$$=(s,r=root)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>n.toLocaleString('en-US');

/* ---------- copy ---------- */
const TX={en:{
 egp:'EGP',tbl:'Table',lbG:['Sara · on chat','Omar · Table 5'],lbR:['Kanzel staff','Reception','Waiter · Ahmed'],ahmed:'Ahmed',
 ch:[['Ask on chat.','A guest asks for the menu. The reply carries a link that opens it. No app, no sign-up.'],
  ['Book a table.','Another message, another link: the booking form opens ready to fill. Reception confirms and the guest hears back in the chat.'],
  ['Scan the table’s QR.','At the restaurant, the table number is already inside the code.'],
  ['Pick and send.','Photos, quantities and a note for the kitchen. One tap sends it to the waiter.'],
  ['The waiter confirms.','It lands in real time. The waiter edits it, confirms it, and the guest sees every change.'],
  ['Kitchen to table.','Confirmed, ready, served. The guest follows each status on the same screen.'],
  ['Sold out? Decline.','Mark a dish sold out, decline with a reason, and the guest is told why.'],
  ['Changed their mind? Cancel.','A call from the table, then a confirmed order cancelled with a reason the guest can see.']],
 pause:'Pause',play:'Play',note:'Screens redrawn for illustration.',
 chatName:'Kanzel',chatSub:'online',ph:'Message',
 m1:'Hi! Can I see the menu?',r1:'Welcome to Kanzel. Here is our menu:',lk1:'Kanzel · Menu',
 m2:'Thanks! Can I book a table for Friday?',r2:'Of course. Fill this in and reception will confirm:',lk2:'Kanzel · Book a table',
 r3:'Your table is confirmed ✓<br>Fri 20 Nov · 9:00 PM · 4 guests',
 menu:'Menu',tabs:['Food','Drinks','Desserts','Shisha'],book:'Book a table',fDate:'Date',fName:'Reservation name',fGuests:'Total number of guests',fPhone:'Phone number',fTime:'Arrival time',
 date:'Fri 20 Nov',name:'Sara Hassan',phone:'0100 555 0142',times:['8:00 PM','9:00 PM','10:00 PM'],bGo:'Confirm booking',sent:'Request sent',sentS:'Reception will confirm on chat.',
 hint:'Point the camera at the code',open:'Open',
 tm:'Menu',search:'Search the menu',addTo:'Add to order',items:'items',view:'View order',yo:'Your order',notePh:'Note for the kitchen (optional)',note1:'No basil on one please',
 sub:'Subtotal',svc:'Service 12%',vat:'Tax 14%',tot:'Total to pay',send:'Send order to waiter',
 s:['Sent','Confirmed','Ready','Served'],
 sNew:'Order sent',sNewM:'Waiting for the waiter to confirm…',sOk:'Confirmed',sOkM:'Confirmed by',sRd:'Your order is ready',sRdM:'Your waiter is bringing it to you.',sSv:'Enjoy your meal',sSvM:'Anything else, just ask.',
 sRj:'Order declined',sCn:'Order cancelled',reason:'Reason',edT:'Your waiter updated your order',chg:'Changed',add:'Added',
 w:{h1:'Orders',tabW:'Orders',tabR:'Reception',l:['New','Preparing','Ready','Calls'],hN:'New orders',hP:'Preparing',hR:'Ready to serve',hC:'Table requests',hX:'Declined and cancelled',none:'Nothing here',
  you:'You',edited:'Edited',note:'Note',total:'Total',a:['Confirm order','Mark ready','Mark served'],edit:'Edit order',dec:'Decline',cnl:'Cancel order',sold:'Sold out',sw:'Switch',
  call:'Waiter call',done:'Done',editT:'Edit order',addQ:'Add an item: search the menu',saveC:'Save & confirm',cancel:'Cancel',saved:'Order updated and sent to the guest',
  rjD:'Decline this order',rjC:'Cancel this order',rjSub:'Choose a reason or write one. The guest will see it.',rjGoD:'Decline order',rjGoC:'Cancel order',keep:'Keep order',rjDone:'The guest was told why',
  sT:'Sold out dishes',sNone:'Nothing is marked sold out right now.',sNow:'Marked sold out now (tap to bring back)',sQ:'Search a dish to mark it sold out',sMark:'Sold out',sBack:'Back in stock',sDone:'Done',
  rejected:'Declined',cancelled:'Cancelled',nw:'New order',nb:'New booking',nc:'Waiter call',bk:'Bookings',bkN:'Reservation',conf:'Confirm',confd:'Confirmed',call:'Call',wa:'WhatsApp',gst:'guests',svcw:'service',taxw:'tax'},
 reasons:{stock:'Out of stock',guest:'Guest asked to cancel'},
 d:{burrata:['Burrata','Fresh burrata cheese center with basil'],fattoush:['Fattoush Salad','A vibrant lebanese salad with crispy fried bread.'],porch:['Porchetta Shrimp','Shrimp, mushroom, parmesan cheese, mozzarella, and herbs.'],pasta:['Seafood Pasta','Mixed seafood in a rich tomato sauce.'],lava:['Lava Cake','Warm chocolate cake with a molten centre.'],tira:['Tiramisu','Mascarpone, espresso and cocoa.'],mojito:['Virgin Mojito','Mint, lime and soda over crushed ice.'],lemon:['Fresh Lemonade','Lemon, mint and a little sugar.']},
 clk:['9:12 PM','9:48 PM','10:21 PM','10:34 PM'],now:'now'},
ar:{
 egp:'ج.م',tbl:'ترابيزة',lbG:['سارة · على الشات','عمر · ترابيزة 5'],lbR:['فريق Kanzel','الريسبشن','الويتر · أحمد'],ahmed:'أحمد',
 ch:[['اسأل على الشات.','ضيف بيسأل عن المنيو. الرد فيه لينك بيفتحه. من غير تطبيق ولا تسجيل.'],
  ['احجز ترابيزة.','رسالة تانية ولينك تاني: فورم الحجز بيفتح جاهز. الريسبشن بيأكد والضيف بيعرف على الشات.'],
  ['امسح QR الترابيزة.','في المطعم، رقم الترابيزة جوه الكود.'],
  ['اختار وابعت.','صور وكميات وملاحظة للمطبخ. ضغطة واحدة بتوصّل الطلب للويتر.'],
  ['الويتر بيأكد.','الطلب بيوصل لحظياً. الويتر بيعدّله وبيأكده والضيف بيشوف كل تغيير.'],
  ['من المطبخ للترابيزة.','متأكد، جاهز، اتسلّم. الضيف بيتابع كل حالة على نفس الشاشة.'],
  ['نفد؟ ارفض.','علّم الصنف إنه نفد، ارفض بسبب، والضيف بيعرف السبب.'],
  ['غيّر رأيه؟ الغي.','نداء من الترابيزة، وبعدين طلب متأكد بيتلغي بسبب الضيف بيشوفه.']],
 pause:'إيقاف مؤقت',play:'تشغيل',note:'شاشات مُعاد رسمها للتوضيح.',
 chatName:'Kanzel',chatSub:'متصل',ph:'اكتب رسالة',
 m1:'أهلاً! ممكن أشوف المنيو؟',r1:'أهلاً بيك في Kanzel. دي المنيو:',lk1:'Kanzel · المنيو',
 m2:'شكراً! ممكن أحجز ترابيزة يوم الجمعة؟',r2:'أكيد. املا الفورم دي والريسبشن هيأكد:',lk2:'Kanzel · احجز ترابيزة',
 r3:'ترابيزتك اتأكدت ✓<br>الجمعة 20 نوفمبر · 9:00 م · 4 أفراد',
 menu:'المنيو',tabs:['أكل','مشروبات','حلويات','شيشة'],book:'احجز ترابيزة',fDate:'التاريخ',fName:'اسم الحجز',fGuests:'إجمالي عدد الأفراد',fPhone:'رقم الموبايل',fTime:'وقت الوصول',
 date:'الجمعة 20 نوفمبر',name:'سارة حسن',phone:'0100 555 0142',times:['8:00 م','9:00 م','10:00 م'],bGo:'أكّد الحجز',sent:'الطلب اتبعت',sentS:'الريسبشن هيأكد على الشات.',
 hint:'وجّه الكاميرا على الكود',open:'فتح',
 tm:'المنيو',search:'ابحث في المنيو',addTo:'ضيف للطلب',items:'أصناف',view:'شوف الطلب',yo:'طلبك',notePh:'ملاحظة للمطبخ (اختياري)',note1:'من غير ريحان على واحدة لو سمحت',
 sub:'المجموع',svc:'خدمة 12%',vat:'ضريبة 14%',tot:'الإجمالي',send:'ابعت الطلب للويتر',
 s:['اتبعت','متأكد','جاهز','اتسلّم'],
 sNew:'الطلب اتبعت',sNewM:'مستنيين الويتر يأكد…',sOk:'متأكد',sOkM:'أكّده',sRd:'طلبك جاهز',sRdM:'الويتر جايبه لحضرتك.',sSv:'بالهنا والشفا',sSvM:'لو محتاج حاجة قولنا.',
 sRj:'الطلب اتّرفض',sCn:'الطلب اتلغى',reason:'السبب',edT:'الويتر عدّل طلبك',chg:'اتغيّر',add:'اتضاف',
 w:{h1:'الطلبات',tabW:'الطلبات',tabR:'الريسبشن',l:['جديد','بيتجهز','جاهز','نداءات'],hN:'طلبات جديدة',hP:'بيتجهز',hR:'جاهز للتسليم',hC:'طلبات الترابيزات',hX:'المرفوض والملغي',none:'مفيش حاجة هنا',
  you:'انت',edited:'اتعدّل',note:'ملاحظة',total:'الإجمالي',a:['أكّد الطلب','جاهز','اتسلّم'],edit:'عدّل الطلب',dec:'ارفض',cnl:'إلغاء الطلب',sold:'نفد',sw:'غيّر',
  call:'نداء الويتر',done:'تم',editT:'تعديل الطلب',addQ:'ضيف صنف: ابحث في المنيو',saveC:'احفظ وأكّد',cancel:'إلغاء',saved:'الطلب اتعدّل واتبعت للضيف',
  rjD:'رفض الطلب',rjC:'إلغاء الطلب',rjSub:'اختار سبب أو اكتبه. الضيف هيشوفه.',rjGoD:'ارفض الطلب',rjGoC:'الغي الطلب',keep:'سيب الطلب',rjDone:'الضيف عرف السبب',
  sT:'أصناف نفدت',sNone:'مفيش أصناف نفدت دلوقتي.',sNow:'نفدت دلوقتي (دوس عشان ترجّعه)',sQ:'ابحث عن صنف عشان تعلّم إنه نفد',sMark:'نفد',sBack:'رجع متاح',sDone:'تم',
  rejected:'مرفوض',cancelled:'ملغي',nw:'طلب جديد',nb:'حجز جديد',nc:'نداء ويتر',bk:'الحجوزات',bkN:'حجز',conf:'أكّد',confd:'متأكد',call:'اتصال',wa:'واتساب',gst:'أفراد',svcw:'خدمة',taxw:'ضريبة'},
 reasons:{stock:'الصنف نفد',guest:'الضيف طلب الإلغاء'},
 d:{burrata:['بوراطا','جبن بوراطا طازج في الوسط، مع أوراق الريحان'],fattoush:['سلطة فتوش','سلطة لبنانية بخبز مقلي مقرمش.'],porch:['جمبري بورشيتا','جمبري وماشروم وبارميزان وموتزاريلا وأعشاب.'],pasta:['باستا سي فود','مأكولات بحرية في صوص طماطم غني.'],lava:['لافا كيك','كيك شوكولاتة دافي بقلب سايح.'],tira:['تيراميسو','ماسكاربوني وإسبريسو وكاكاو.'],mojito:['فيرجن موهيتو','نعناع وليمون وصودا على تلج مجروش.'],lemon:['ليمونادة فريش','ليمون ونعناع وسكر خفيف.']},
 clk:['9:12 م','9:48 م','10:21 م','10:34 م'],now:'دلوقتي'}};
const t=TX[AR?'ar':'en'],W_=t.w;
const DB={burrata:[450,'kz-d1.jpg'],fattoush:[210,'kz-d4.jpg'],porch:[475,'kz-d5.jpg'],pasta:[520,'kz-d2.jpg'],lava:[190,''],tira:[210,''],mojito:[110,''],lemon:[95,'']};
const nm=k=>t.d[k][0],calc=sub=>{const sv=Math.round(sub*.12),tx=Math.round((sub+sv)*.14);return{sub,sv,tx,grand:sub+sv+tx}};
const money=n=>fmt(n)+' '+t.egp;
const I={back:'<svg viewBox="0 0 24 24"><path d="'+(AR?'M9 5l7 7-7 7':'M15 5l-7 7 7 7')+'"/></svg>',x:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 bell:'<svg viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0112 0v6l1.5 2h-15zM10 21h4"/></svg>',lock:'<svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 018 0v2.5"/></svg>',
 snd:'<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',chk:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'};
const LOGO='kz-logo.png';

/* ---------- build the two phones ---------- */
const L=$('#kzsL'),R=$('#kzsR'),dvL=$('[data-s=L]'),dvR=$('[data-s=R]');
const top=(l,r)=>`<div class="q-top"><span class="q-rd">${l}</span><img class="lg" src="${LOGO}" alt=""><span class="q-g">${r}</span></div>`;
const row=(k,extra='')=>{const d=DB[k];return`<div class="q-row${d[1]?'':' np'}" data-d="${k}">${d[1]?`<img src="${d[1]}" alt="">`:''}<div><h4>${esc(nm(k))}</h4><p>${esc(t.d[k][1])}</p><span class="q-pr">${d[0]}<small>${t.egp}</small></span></div></div>`};
const tabs=on=>`<div class="q-tabs">${t.tabs.map((x,i)=>`<b data-t="${i}" class="${i===on?'on':''}">${x}</b>`).join('')}</div>`;
L.innerHTML=`
<div class="q-s q-chat" data-s="chat"><div class="q-ch-h"><span class="q-rd" style="border:0">${I.back}</span><span class="q-av"><img src="${LOGO}" alt=""></span><div><b>${t.chatName}</b><small>${t.chatSub}</small></div></div>
 <div class="q-ms" id="ms"><div class="q-ty" id="ty"><i></i><i></i><i></i></div></div>
 <div class="q-ib"><div class="q-in" id="inp" data-ph="${t.ph}"></div><span class="q-snd" id="snd">${I.snd}</span></div></div>
<div class="q-s q-web" data-s="web"><div class="q-ub"><span class="q-rd" id="wx" style="width:32px;height:32px">${I.x}</span><div class="q-url"><svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 018 0v2.5"/></svg><span id="url">kanzel-eg.vercel.app</span></div></div>
 <div class="q-pg" data-p="menu"><div class="q-sc" id="pmS"><div class="q-h">${t.menu}</div><span class="q-rule"></span>${tabs(0)}${['burrata','porch','fattoush','pasta'].map(k=>row(k)).join('')}</div></div>
 <div class="q-pg" data-p="book"><div class="q-sc"><div class="q-h">${t.book}</div><span class="q-rule"></span>
  <div class="q-fl"><span>${t.fDate}</span><div class="q-fi" id="bD"><span class="v"></span></div></div>
  <div class="q-fl"><span>${t.fName}</span><div class="q-fi" id="bN"><span class="v"></span></div></div>
  <div class="q-fl"><span>${t.fGuests}</span><div class="q-st2"><b id="gm">−</b><output id="gv">2</output><b id="gp">+</b></div></div>
  <div class="q-fl"><span>${t.fPhone}</span><div class="q-fi" id="bP" dir="ltr"><span class="v"></span></div></div>
  <div class="q-fl"><span>${t.fTime}</span><div class="q-chs" id="bT">${t.times.map((x,i)=>`<b data-i="${i}">${x}</b>`).join('')}</div></div>
  <div class="q-btn" id="bGo" style="margin-top:20px">${t.bGo}</div></div></div>
 <div class="q-pg" data-p="done"><div class="q-ok">${I.chk}</div><div class="q-h" style="text-align:center;font-size:30px">${t.sent}</div><p class="q-sm" style="text-align:center;margin-top:6px">${t.sentS}</p>
  <div class="q-sum"><div><span>${t.fDate}</span><b>${t.date}</b></div><div><span>${t.fName}</span><b>${t.name}</b></div><div><span>${t.fGuests}</span><b>4</b></div><div><span>${t.fTime}</span><b>${t.times[1]}</b></div></div></div></div>
<div class="q-s q-cam" data-s="cam"><div class="tb" id="qrc"><svg viewBox="0 0 29 29" shape-rendering="crispEdges"><use href="#kz-qr"/></svg><small>${t.tbl.toUpperCase()}</small><b>5</b></div><div class="vf"><i></i><i></i><i></i><i></i><u></u></div><p class="hint">${t.hint}</p></div>
<div class="q-s" data-s="tm">${top(I.back,`<span class="q-chip">${t.tbl} 5</span><span class="q-rd" id="bell">${I.bell}</span>`)}<div class="q-h">${t.tm}</div><span class="q-rule"></span><div id="tmT">${tabs(0)}</div><div id="tmR"></div>
 <div class="q-cb" id="cb"><span id="cbT"></span><span>${t.view}</span></div>
 <div class="q-ov q-sh" id="sh"><div class="bk"></div><div class="pn"><div class="ph" id="shP"></div><div class="bd"><h3 id="shN"></h3><p id="shD"></p><div class="q-qt"><span class="q-pr" id="shPr"></span><div class="q-st2"><b id="sm">−</b><output id="sq">1</output><b id="sp">+</b></div></div><div class="q-btn" id="shA"></div></div></div></div></div>
<div class="q-s" data-s="ord">${top(I.back,`<span class="q-chip">${t.tbl} 5</span>`)}<div class="q-h">${t.yo}</div><span class="q-rule"></span><div id="oL" style="margin-top:6px"></div><div class="q-ta" id="oN" data-ph="${t.notePh}"></div><div id="oT" style="margin-top:12px"></div><div class="q-btn q-bt" id="oGo">${t.send}</div></div>
<div class="q-s" data-s="st">${top(I.back,`<span class="q-chip">${t.tbl} 5</span><span class="q-rd" id="bell2">${I.bell}</span>`)}<div id="stB"></div></div>
<div class="q-tst" id="lt"></div><i class="q-fg"></i>`;

const sbar=`<div class="q-top"><span class="q-rd">${I.back}</span><img class="lg" src="${LOGO}" alt=""><span class="q-g"><span class="q-rd">${I.lock}</span></span></div>`;
R.innerHTML=`
<div class="q-nt" id="nt"><img src="${LOGO}" alt=""><div><b id="ntT"></b><small id="ntS"></small></div></div>
<div class="q-s q-w" data-s="rw"><div class="q-ws" id="rwS">${sbar}<h1>${W_.h1}</h1>
 <div class="q-wr"><span class="q-who">${t.ahmed} · ${W_.sw}</span><span class="q-who so" id="soB">${W_.sold}</span></div>
 <div class="q-tb"><b class="on">${W_.tabW}</b><b id="goR">${W_.tabR}</b></div><div class="q-sts" id="sts"></div><div id="wL"></div></div></div>
<div class="q-s q-w" data-s="rr"><div class="q-ws">${sbar}<h1>${W_.tabR}</h1>
 <div class="q-tb"><b id="goW">${W_.tabW}</b><b class="on">${W_.tabR}</b></div><div class="q-hd">${W_.bk}</div><div id="bL"></div></div></div>
<div class="q-ov" id="ed"><div class="bk"></div><div class="pn"><h3 id="edT"></h3><div id="edL"></div><div class="sr" id="edQ" data-ph="${W_.addQ}"></div><div class="q-rs" id="edRs"></div><div id="edTt" style="margin-top:10px"></div><div class="q-btn" id="edS"></div><div class="q-btn o">${W_.cancel}</div></div></div>
<div class="q-ov" id="rj"><div class="bk"></div><div class="pn"><h3 id="rjT"></h3><p class="lbl">${W_.rjSub}</p><div class="chp" id="rjC"></div><div class="q-btn dg" id="rjGo"></div><div class="q-btn o">${W_.keep}</div></div></div>
<div class="q-ov" id="sd"><div class="bk"></div><div class="pn"><h3>${W_.sT}</h3><p class="lbl" id="sdN"></p><div class="sdl" id="sdL"></div><div class="sr" id="sdQ" data-ph="${W_.sQ}"></div><div class="q-rs" id="sdRs"></div><div class="q-btn o" id="sdD">${W_.sDone}</div></div></div>
<div class="q-tst" id="rt"></div><i class="q-fg"></i>`;
const g=(vp,s)=>vp.querySelector(s);

/* ---------- engine ---------- */
let run=0,paused=false,vis=false,fast=false,S;
const CANCEL=Symbol('c');
const W=ms=>new Promise((ok,no)=>{const id=run;if(fast)return ok();let left=ms,last=performance.now();(function tick(){if(id!==run)return no(CANCEL);const n=performance.now();if(!paused&&vis)left-=n-last;last=n;left<=0?ok():setTimeout(tick,30)})()});
const show=(vp,id)=>$$('.q-s',vp).forEach(e=>e.classList.toggle('on',e.dataset.s===id));
const ov=(el,on)=>el.classList.toggle('on',on);
const act=side=>{dvL.classList.toggle('act',side==='L');dvR.classList.toggle('act',side==='R')};
const lab=(side,i)=>{(side==='L'?$('.kzs-lb',dvL):$('.kzs-lb',dvR)).textContent=(side==='L'?t.lbG:t.lbR)[i]};
async function tap(vp,el){act(vp===L?'L':'R');if(fast||!el)return;const f=g(vp,'.q-fg'),r=el.getBoundingClientRect(),v=vp.getBoundingClientRect(),s=v.width/390;
 f.style.left=((r.left+r.width/2-v.left)/s)+'px';f.style.top=((r.top+r.height*.55-v.top)/s)+'px';f.classList.add('go');clearTimeout(f._h);f._h=setTimeout(()=>f.classList.remove('go'),2200);
 await W(520);f.classList.remove('rp');void f.offsetWidth;f.classList.add('rp');el.classList.add('pr');await W(170);el.classList.remove('pr');await W(120)}
async function type(el,txt,ms=48){const box=el.classList.contains('q-fi')?g(el,'.v'):el;el.classList.add('ty');if(fast){box.textContent=txt;el.classList.remove('ty');return}box.textContent='';for(const c of txt){box.textContent+=c;await W(ms)}await W(160);el.classList.remove('ty')}
const toast=async(vp,sel,txt,ms=1700)=>{const e=g(vp,sel);e.textContent=txt;ov(e,true);await W(ms);ov(e,false)};
async function notify(a,b){$('#ntT',R).textContent=a;$('#ntS',R).textContent=b;ov($('#nt',R),true);act('R');await W(1700);ov($('#nt',R),false)}

/* ---------- chat ---------- */
const ms=$('#ms',L),ty=$('#ty',L),inp=$('#inp',L);
function msg(html,me){const d=document.createElement('div');d.className='q-b '+(me?'me':'th');d.innerHTML=html;ms.insertBefore(d,ty);ms.scrollTop=1e5;requestAnimationFrame(()=>requestAnimationFrame(()=>d.classList.add('q-on')));return d}
async function ask(txt){act('L');await type(inp,txt,42);await tap(L,$('#snd',L));inp.textContent='';msg(esc(txt),1);await W(400)}
async function reply(html,link){ov(ty,true);ty.classList.add('on');ms.scrollTop=1e5;await W(1100);ty.classList.remove('on');return msg(html+(link?`<div class="q-lk" data-lk="${link[0]}"><div class="im"><img src="${LOGO}" alt=""></div><div class="tx"><b>${link[1]}</b><small>kanzel-eg.vercel.app${link[0]==='book'?'/booking':''}</small></div></div>`:''),0)}
const page=p=>{$$('.q-pg',L).forEach(e=>e.classList.toggle('on',e.dataset.p===p));$('#url',L).textContent='kanzel-eg.vercel.app'+(p==='book'||p==='done'?'/booking':'')};
const scr=(el,y)=>el.scrollTo({top:y,behavior:fast?'auto':'smooth'});

/* ---------- guest: menu, cart, order, status ---------- */
const tm=$('[data-s=tm]',L),sh=$('#sh',L),cb=$('#cb',L);
const TM={0:['burrata','porch','fattoush','pasta'],1:['mojito','lemon'],2:['lava','tira']};
function paintTm(tab){$('#tmT',L).innerHTML=tabs(tab);$('#tmR',L).innerHTML=(TM[tab]||[]).map(k=>row(k)).join('')}
function paintCart(){const n=S.cart.reduce((a,x)=>a+x.q,0),sum=S.cart.reduce((a,x)=>a+x.q*DB[x.k][0],0);$('#cbT',L).textContent=`${n} ${t.items} · ${fmt(sum)} ${t.egp}`;ov(cb,n>0)}
function paintSheet(){const d=DB[S.sk];$('#shP',L).style.backgroundImage=d[1]?`url(${d[1]})`:'';$('#shP',L).style.display=d[1]?'':'none';$('#shN',L).textContent=nm(S.sk);$('#shD',L).textContent=t.d[S.sk][1];$('#shPr',L).innerHTML=`${d[0]}<small>${t.egp}</small>`;$('#sq',L).textContent=S.sq;$('#shA',L).textContent=`${t.addTo} · ${fmt(d[0]*S.sq)}`}
async function addDish(k,qty,quick){const r=g(L,`[data-d="${k}"]`);await tap(L,r);S.sk=k;S.sq=1;paintSheet();ov(sh,true);await W(quick?500:800);
 for(let i=1;i<qty;i++){await tap(L,$('#sp',L));S.sq++;paintSheet()}await tap(L,$('#shA',L));ov(sh,false);S.cart.push({k,q:S.sq});paintCart();await W(400)}
const lines=(items,ed)=>items.map(x=>`<div class="q-ln"><span>${x.q} × ${esc(nm(x.k))}${x.n?`<small>${esc(x.n)}</small>`:''}</span><i>${fmt(DB[x.k][0]*x.q)}</i></div>`).join('');
const totals=items=>{const c=calc(items.reduce((a,x)=>a+x.q*DB[x.k][0],0));return`<div class="q-tx"><span>${t.sub}</span><i>${fmt(c.sub)}</i></div><div class="q-tx"><span>${t.svc}</span><i>${fmt(c.sv)}</i></div><div class="q-tx"><span>${t.vat}</span><i>${fmt(c.tx)}</i></div><div class="q-tx g"><span>${t.tot}</span><i>${fmt(c.grand)} ${t.egp}</i></div>`};
function paintOrd(){$('#oL',L).innerHTML=lines(S.cart.map(x=>({...x,n:x.n})));$('#oT',L).innerHTML=totals(S.cart)}
async function sendOrder(note,quick){ /* guest taps cart bar, writes a note, sends */
 await tap(L,cb);paintOrd();show(L,'ord');await W(quick?500:800);
 if(note){await tap(L,$('#oN',L));await type($('#oN',L),note,40)}
 await tap(L,$('#oGo',L));
 const items=S.cart.map(x=>({k:x.k,q:x.q,n:x===S.cart[0]?note:''}));const o={id:++S.id,items,note:note||'',status:'new',ts:S.clk++,by:null,edited:false,changes:[],reason:null,rid:null};
 S.orders.push(o);S.go=o;S.cart=[];paintCart();paintSt();show(L,'st');renderW();await W(300)}
function paintSt(){const o=S.go;if(!o)return;const k={new:0,confirmed:1,ready:2,served:3}[o.status],bad=o.status==='rejected'||o.status==='cancelled';
 const T=bad?[t.sRj,'']:o.status==='new'?[t.sNew,t.sNewM]:o.status==='confirmed'?[t.sOk,t.sOkM+' '+t.ahmed]:o.status==='ready'?[t.sRd,t.sRdM]:[t.sSv,t.sSvM];
 if(o.status==='cancelled')T[0]=t.sCn;
 $('#stB',L).innerHTML=`<div class="q-stt">${T[0]}</div><p class="q-sm">${T[1]}</p>
 <div class="q-tl${bad?' x':''}">${t.s.map((x,i)=>`<b class="${bad?(i===0?'on':''):i<=k?'on':''}">${x}</b>`).join('')}</div>
 ${bad?`<div class="q-bx bad"><b>${t.reason}</b>${esc(o.rid?t.reasons[o.rid]:'')}</div>`:''}
 ${o.edited?`<div class="q-bx"><b>${t.edT}</b>${o.changes.map(c=>c.f===0?`${t.add}: ${esc(nm(c.k))} × ${c.to}`:`${t.chg}: ${esc(nm(c.k))} ${c.f} → ${c.to}`).join('<br>')}</div>`:''}
 <div class="q-card2" style="${bad?'opacity:.6':''}">${lines(o.items)}<div style="padding:8px 0 4px">${totals(o.items)}</div></div>`}

/* ---------- staff ---------- */
const endAt=o=>o.status==='rejected'||o.status==='cancelled';
function card(o){const a=['new','confirmed','ready'].indexOf(o.status);const c=calc(o.items.reduce((x,i)=>x+i.q*DB[i.k][0],0));
 return`<div class="q-c${o.status==='new'?' hl':''}" data-o="${o.id}"><div class="tp"><div class="tbl"><small>${t.tbl}</small>5${o.by?`<span class="q-tag g">${W_.you}</span>`:''}${o.edited?`<span class="q-tag">${W_.edited}</span>`:''}</div><div class="tm">${t.clk[o.ts]}<br>${t.now}</div></div>
 <div class="it">${o.items.map(x=>`<div class="q-r"><span>${x.q} × ${esc(nm(x.k))}${S.sold.includes(x.k)?`<em class="q-so">${W_.sold}</em>`:''}${x.n?`<small>${esc(x.n)}</small>`:''}</span><i>${fmt(DB[x.k][0]*x.q)} ${t.egp}</i></div>`).join('')}</div>
 <div class="tt"><span>${W_.total}</span><i>${fmt(c.grand)} ${t.egp}</i></div>
 <div class="q-btn bt" data-a="go">${W_.a[a]}</div><div class="r2">${a<2?`<div class="q-btn o" data-a="edit">${W_.edit}</div>`:''}<div class="q-btn bd" data-a="end"${a>=2?' style="grid-column:1/-1"':''}>${a===0?W_.dec:W_.cnl}</div></div></div>`}
function dead(o){return`<div class="q-c dead"><div class="tp"><div class="tbl"><small>${t.tbl}</small>5<span class="q-tag b">${o.status==='rejected'?W_.rejected:W_.cancelled}</span></div><div class="tm">${t.clk[o.ts]}</div></div><div class="it">${o.items.map(x=>`<div class="q-r"><span>${x.q} × ${esc(nm(x.k))}</span><i>${fmt(DB[x.k][0]*x.q)} ${t.egp}</i></div>`).join('')}</div><div class="why">${W_.rjC.slice(0,0)}${t.reason}: ${esc(t.reasons[o.rid]||'')} · ${t.ahmed}</div></div>`}
function renderW(){const by=s=>S.orders.filter(o=>o.status===s),n=by('new'),p=by('confirmed'),r=by('ready'),d=S.orders.filter(endAt).slice().reverse(),cl=S.calls.filter(c=>!c.done);
 $('#sts',R).innerHTML=[n.length,p.length,r.length,cl.length].map((v,i)=>`<div><b>${v}</b><span>${W_.l[i]}</span></div>`).join('');
 const sec=(h,a,f)=>a.length?`<div class="q-hd">${h}</div>${a.map(f).join('')}`:'';
 const none=!n.length&&!p.length&&!r.length&&!cl.length;
 $('#wL',R).innerHTML=sec(W_.hC,cl,c=>`<div class="q-c hl"><div class="tp"><div class="tbl"><small>${t.tbl}</small>5</div><div class="tm">${t.clk[c.ts]}<br>${t.now}</div></div><div class="tt"><span>${W_.call}</span></div><div class="q-btn bt" data-a="call">${W_.done}</div></div>`)+sec(W_.hN,n,card)+sec(W_.hP,p,card)+sec(W_.hR,r,card)+(none?`<div class="q-em" style="margin-top:18px">${W_.none}</div>`:'')+sec(W_.hX,d,dead);
 $('#soB',R).textContent=W_.sold+(S.sold.length?' · '+S.sold.length:'')}
function renderB(){$('#bL',R).innerHTML=S.bk.map(b=>`<div class="q-c${b.st==='new'?' hl':''}"><div class="tp"><div class="tbl" style="font-size:22px">${t.name}<span class="q-tag ${b.st==='new'?'g':''}">${b.st==='new'?W_.l[0]:W_.confd}</span></div><div class="tm">${t.now}</div></div>
 <div class="it"><div class="q-r"><span>${t.fDate}</span><i>${t.date}</i></div><div class="q-r"><span>${t.fTime}</span><i>${t.times[1]}</i></div><div class="q-r"><span>${t.fGuests}</span><i>4</i></div><div class="q-r"><span>${t.fPhone}</span><i dir="ltr">${t.phone}</i></div></div>
 ${b.st==='new'?`<div class="q-btn bt" data-a="bk">${W_.conf}</div>`:''}<div class="r2"><div class="q-btn o">${W_.call}</div><div class="q-btn o">${W_.wa}</div></div></div>`).join('')}
const cardBtn=(a,o)=>g(R,`[data-o="${o.id}"] [data-a="${a}"]`);
const reasonChips=(on)=>$('#rjC',R).innerHTML=Object.keys(t.reasons).concat(['kitchen','dup'].filter(()=>false)).map(id=>`<b data-r="${id}" class="${on===id?'on':''}">${t.reasons[id]}</b>`).join('');
const NEXT=['confirmed','ready','served'];
async function wGo(o){await tap(R,cardBtn('go',o));const i=['new','confirmed','ready'].indexOf(o.status);o.status=NEXT[i];o.by=1;renderW();paintSt();renderW()}
async function wReject(o,kind,rid){await tap(R,cardBtn('end',o));$('#rjT',R).textContent=(kind==='rejected'?W_.rjD:W_.rjC)+' · '+t.tbl+' 5';$('#rjGo',R).textContent=kind==='rejected'?W_.rjGoD:W_.rjGoC;reasonChips('');ov($('#rj',R),true);await W(900);
 await tap(R,g(R,`#rjC [data-r="${rid}"]`));reasonChips(rid);await W(500);await tap(R,$('#rjGo',R));ov($('#rj',R),false);
 o.status=kind;o.rid=rid;renderW();paintSt();await toast(R,'#rt',W_.rjDone,1500)}

/* ---------- chapters ---------- */
const N=8,D=[19,32,12,26,30,15,36,34]; /* seconds, rough, only for the progress line */
const chL=$('#kzsCh'),bars=$('.kzs-bars');
chL.innerHTML=t.ch.map((c,i)=>`<li><button type="button" data-i="${i}" aria-label="${i+1}. ${esc(c[0])}"><span class="n">${i+1}</span><b>${c[0]}</b><span class="d"><span>${c[1]}</span></span><i class="pg" style="--dur:${D[i]}s"></i></button></li>`).join('');
bars.innerHTML=t.ch.map((c,i)=>`<button type="button" data-i="${i}" aria-label="${i+1}. ${esc(c[0])}"></button>`).join('');
const lis=$$('li',chL),bs=$$('button',bars);
function chap(i){lis.forEach((l,k)=>{l.classList.toggle('on',k===i);l.classList.toggle('done',k<i);const p=g(l,'.pg');if(k===i){p.style.animation='none';void p.offsetWidth;p.style.animation=''}});bs.forEach((b,k)=>{b.classList.toggle('on',k===i);b.classList.toggle('done',k<i)})}
function reset(){S={cart:[],orders:[],calls:[],bk:[],sold:[],id:0,clk:0,go:null,sk:'burrata',sq:1};
 $$('.q-b',ms).forEach(e=>e.remove());inp.textContent='';ty.classList.remove('on');
 ['#bD','#bN','#bP'].forEach(s=>{g(L,s+' .v').textContent=''});$('#gv',L).textContent='2';$$('#bT b',L).forEach(b=>b.classList.remove('on'));
 $$('.q-ov',L).forEach(e=>ov(e,false));$$('.q-ov',R).forEach(e=>ov(e,false));ov(cb,false);ov($('#nt',R),false);$$('.q-nt',L).forEach(e=>ov(e,false));
 paintTm(0);$('#stB',L).innerHTML='';$('#qrc',L).classList.remove('lock');$$('.q-cam',L).forEach(e=>e.classList.remove('on'));
 page('');show(L,'chat');show(R,'rw');renderW();renderB();$('#rwS',R).scrollTop=0;lab('L',0);lab('R',0);scr(ms,0)}
const CH=[
async()=>{chap(0);lab('L',0);lab('R',0);show(L,'chat');act('L');await W(900);await ask(t.m1);await reply(t.r1,['menu',t.lk1]);await W(700);
 await tap(L,g(L,'[data-lk=menu]'));page('menu');show(L,'web');await W(900);const s=$('#pmS',L);scr(s,150);await W(1100);scr(s,320);await W(1100);scr(s,0);await W(500);await tap(L,$('#wx',L));show(L,'chat');await W(700)},
async()=>{chap(1);show(L,'chat');act('L');await ask(t.m2);await reply(t.r2,['book',t.lk2]);await W(700);
 await tap(L,g(L,'[data-lk=book]'));page('book');show(L,'web');await W(900);
 await tap(L,$('#bD',L));await type($('#bD',L),t.date,50);await tap(L,$('#bN',L));await type($('#bN',L),t.name,50);
 await tap(L,$('#gp',L));$('#gv',L).textContent='3';await W(200);await tap(L,$('#gp',L));$('#gv',L).textContent='4';
 await tap(L,$('#bP',L));await type($('#bP',L),t.phone,50);await tap(L,g(L,'#bT [data-i="1"]'));g(L,'#bT [data-i="1"]').classList.add('on');await W(300);
 await tap(L,$('#bGo',L));page('done');await W(1700);await tap(L,$('#wx',L));show(L,'chat');
 S.bk.push({st:'new'});renderB();show(R,'rr');lab('R',1);await notify(t.w.nb,t.name+' · 4 '+W_.gst);await W(500);
 await tap(R,g(R,'[data-a=bk]'));S.bk[0].st='ok';renderB();await W(900);
 act('L');await reply(t.r3);await W(1700)},
async()=>{chap(2);lab('L',1);lab('R',2);show(R,'rw');renderW();$('#rwS',R).scrollTop=0;act('L');show(L,'cam');$('#qrc',L).classList.remove('lock');$('.q-cam',L).classList.add('on');await W(2300);$('#qrc',L).classList.add('lock');
 const n=document.createElement('div');await W(600);
 /* banner appears from the scan */
 let b=$('.q-nt',L);if(!b){b=document.createElement('div');b.className='q-nt';b.innerHTML=`<img src="${LOGO}" alt=""><div><b>Kanzel · ${t.tbl} 5</b><small>kanzel-eg.vercel.app</small></div><span style="font:500 12px var(--kb);color:#fff;background:var(--km);padding:7px 14px;border-radius:99px" id="bo">${t.open}</span>`;L.append(b)}
 b.classList.add('on');await W(1100);await tap(L,$('#bo',L));b.classList.remove('on');$('.q-cam',L).classList.remove('on');paintTm(0);show(L,'tm');await W(700)},
async()=>{chap(3);act('L');show(L,'tm');await W(500);await addDish('burrata',2);await addDish('fattoush',1);await sendOrder(t.note1);
 await notify(W_.nw,t.tbl+' 5 · 3 '+t.items);act('L');await W(1300)},
async()=>{chap(4);const o=S.go;act('R');lab('R',2);show(R,'rw');renderW();await W(1200);
 /* edit sheet */
 await tap(R,cardBtn('edit',o));const e=$('#ed',R);S.ed=o.items.map(x=>({...x}));const paintEd=(rs)=>{$('#edT',R).textContent=W_.editT+' · '+t.tbl+' 5';$('#edL',R).innerHTML=S.ed.map((x,i)=>`<div class="q-ln2"><div class="nm">${esc(nm(x.k))}<small>${fmt(DB[x.k][0])} ${t.egp}</small></div><div class="ctl"><b data-m="${i}">−</b><em>${x.q}</em><b>+</b></div></div>`).join('');
  $('#edRs',R).innerHTML=rs?`<button data-ad="${rs}"><span>${esc(nm(rs))}</span><i>${fmt(DB[rs][0])} ${t.egp}</i></button>`:'';const c=calc(S.ed.reduce((a,x)=>a+x.q*DB[x.k][0],0));
  $('#edTt',R).innerHTML=`<div class="sm"><span>${t.sub}</span><i>${fmt(c.sub)} ${t.egp}</i></div><div class="sm"><span>${t.svc}</span><i>${fmt(c.sv)}</i></div><div class="sm"><span>${t.vat}</span><i>${fmt(c.tx)}</i></div><div class="sm g"><span>${W_.total}</span><i>${fmt(c.grand)} ${t.egp}</i></div>`;$('#edS',R).textContent=W_.saveC};
 paintEd();ov(e,true);await W(1000);await tap(R,g(R,'[data-m="0"]'));S.ed[0].q=1;paintEd();await W(500);
 await tap(R,$('#edQ',R));await type($('#edQ',R),AR?'جمبري':'porch',70);paintEd('porch');await W(500);await tap(R,g(R,'[data-ad]'));
 S.ed.push({k:'porch',q:1,n:''});$('#edQ',R).textContent='';paintEd();await W(700);await tap(R,$('#edS',R));ov(e,false);
 o.changes=[{k:'burrata',f:2,to:1},{k:'porch',f:0,to:1}];o.items=S.ed;o.edited=true;o.status='confirmed';o.by=1;renderW();await toast(R,'#rt',W_.saved,1300);
 act('L');paintSt();show(L,'st');await W(2800)},
async()=>{chap(5);const o=S.go;act('R');show(R,'rw');renderW();await W(1700);await wGo(o);act('L');await W(2200);act('R');await W(500);await wGo(o);act('L');await W(2600)},
async()=>{chap(6);act('L');S.go.status='served';paintSt();show(L,'st');await W(500);await tap(L,g(L,'.q-top .q-rd'));paintTm(0);show(L,'tm');await W(600);
 await tap(L,g(L,'#tmT [data-t="2"]'));paintTm(2);await W(500);await addDish('lava',1,1);await sendOrder('',1);
 const o=S.go;await notify(W_.nw,t.tbl+' 5 · 1 '+t.items);act('R');renderW();await W(900);
 await tap(R,$('#soB',R));const sd=$('#sd',R),pnt=(q)=>{$('#sdN',R).textContent=S.sold.length?W_.sNow:W_.sNone;$('#sdL',R).innerHTML=S.sold.map(k=>`<span>${esc(nm(k))}<b>${W_.sBack}</b></span>`).join('');$('#sdRs',R).innerHTML=q?`<button><span>${esc(nm('lava'))}</span><i>${S.sold.includes('lava')?W_.sBack:W_.sMark}</i></button>`:''};
 pnt();ov(sd,true);await W(900);await tap(R,$('#sdQ',R));await type($('#sdQ',R),AR?'لافا':'lava',80);pnt(1);await W(400);await tap(R,g(R,'#sdRs button'));S.sold.push('lava');pnt(1);await W(900);
 await tap(R,$('#sdD',R));ov(sd,false);$('#sdQ',R).textContent='';renderW();await W(700);
 await wReject(o,'rejected','stock');act('L');await W(2800)},
async()=>{chap(7);act('L');await tap(L,g(L,'.q-top .q-rd'));paintTm(1);show(L,'tm');S.cart=[];paintCart();await W(500);await tap(L,g(L,'#tmT [data-t="1"]'));paintTm(1);await W(400);await addDish('mojito',2,1);await sendOrder('',1);
 const o=S.go;await notify(W_.nw,t.tbl+' 5 · 2 '+t.items);act('R');renderW();await W(800);await wGo(o);act('L');await W(1500);
 await tap(L,$('#bell2',L));await toast(L,'#lt',t.w.call,1300);S.calls.push({id:1,ts:3,done:false});act('R');await notify(W_.nc,t.tbl+' 5');renderW();await W(600);
 await tap(R,g(R,'[data-a=call]'));S.calls[0].done=true;renderW();await W(800);
 await wReject(o,'cancelled','guest');act('L');await W(3600)}];

/* ---------- play ---------- */
let loopOn=true,gen=0;
async function play(start){const my=++gen;run++;fast=false;paused=false;root.classList.remove('pz');
 try{reset();for(let c=0;c<N;c++){if(c<start){fast=true;root.classList.add('ff')}else if(fast){fast=false;void root.offsetWidth;root.classList.remove('ff')}await CH[c]()}
  fast=false;root.classList.remove('ff');if(loopOn&&!RM){await W(900);play(0)}}
 catch(e){if(e!==CANCEL)throw e}}
async function still(i){run++;fast=true;root.classList.add('ff');try{reset();for(let c=0;c<=i;c++)await CH[c]()}catch(e){if(e!==CANCEL)throw e}fast=false;await new Promise(r=>setTimeout(r,50));root.classList.remove('ff')}
const jump=i=>{started=true;return RM?still(i):play(i)};
[chL,bars].forEach(c=>c.addEventListener('click',e=>{const b=e.target.closest('button[data-i]');if(b)jump(+b.dataset.i)}));
let started=false;
const pp=$('.kzs-pp'),setPP=()=>{pp.setAttribute('aria-label',paused?t.play:t.pause);root.classList.toggle('pz',paused)};
pp.addEventListener('click',()=>{paused=!paused;setPP()});setPP();
const IO=new IntersectionObserver(e=>{vis=e[0].isIntersecting;if(vis&&!started){started=true;if(RM)still(4);else play(0)}},{threshold:.25});IO.observe(root);
document.addEventListener('visibilitychange',()=>{if(document.hidden)vis=false});
reset();act('L');
})();
