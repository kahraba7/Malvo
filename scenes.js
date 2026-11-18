/* Before / after scenes. Each .stage runs a looped timeline: elements with data-t/data-o toggle .on; a touch dot (data-fg) moves between taps; a timer chip counts the time. */
(()=>{
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,AR=document.documentElement.lang==='ar';
const fmt=s=>{s=Math.round(s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
document.querySelectorAll('.stage').forEach(st=>{
  const els=[...st.querySelectorAll('[data-t]')],L=(+st.dataset.len||10)*1000,ph=st.querySelector('.ph2'),tm=st.querySelector('.tm'),tb=tm&&tm.querySelector('b');
  const fgs=(st.dataset.fg||'').split(';').filter(Boolean).map(x=>x.split(',').map(Number));
  const fg=fgs.length?ph.appendChild(Object.assign(document.createElement('i'),{className:'fg'})):null;
  let li=-1,raf=0,t0=0,pt;
  const draw=(t,rm)=>{
    els.forEach(e=>{const a=+e.dataset.t*1000,b=e.dataset.o?+e.dataset.o*1000:1e9;e.classList.toggle('on',t>=a&&t<b)});
    if(tm){const sp=+tm.dataset.stop*1000,p=Math.min(1,t/sp);tb.textContent=(AR?'الوقت ':'Time ')+fmt(+tm.dataset.end*(p*p*(3-2*p)));tm.classList.toggle('done',p>=1)}
    if(fg&&!rm){let k=-1;fgs.forEach((f,i)=>{if(t+700>=f[0]*1000)k=i});
      if(k<0){fg.style.opacity=0;li=-1}else{const f=fgs[k],x=AR?234-f[1]:f[1];fg.style.opacity=1;fg.style.transform=`translate(${x}px,${f[2]}px)`;
        if(k!==li){li=k;if(f[3])setTimeout(()=>{fg.classList.remove('prs');void fg.offsetWidth;fg.classList.add('prs')},650)}}}
    st.classList.toggle('fd',!rm&&t>L-500)};
  const tick=()=>{draw((performance.now()-t0)%L);raf=requestAnimationFrame(tick)};
  if(RM||!('IntersectionObserver'in window)){draw(L-100,true);return}
  new IntersectionObserver(([x])=>{cancelAnimationFrame(raf);if(x.isIntersecting){t0=performance.now();tick()}},{threshold:.35}).observe(st);
});
})();
