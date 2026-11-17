/* Kanzel world: entry reveal, live phone (lazy iframe), scroll story, exit wipe, header colours. */
(()=>{
const kz=document.getElementById('restaurants');if(!kz)return;
const $=(s,r=kz)=>r.querySelector(s),$$=(s,r=kz)=>[...r.querySelectorAll(s)];
const cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,hdr=document.getElementById('hdr'),IO='IntersectionObserver' in window;

/* 1. entry */
const ent=$('.kz-in');
if(IO&&!RM)new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){ent.classList.add('in');o.disconnect()}},{threshold:.3}).observe(ent);
else ent.classList.add('in');

/* 2. live phone: the real Kanzel site in an iframe. Loads when near the screen; on small screens or Save-Data it waits for a tap. */
const live=$('.kz-live'),slot=$('.kz-fs'),go=$('.kz-go');let started=false,slow;
function start(){
  if(started)return;started=true;live.classList.add('loading');
  const sbw=(()=>{const d=document.createElement('div');d.style.cssText='position:absolute;top:-999px;width:100px;height:100px;overflow:scroll';document.body.appendChild(d);const w=d.offsetWidth-d.clientWidth;d.remove();return w})();
  live.style.setProperty('--sb',sbw+'px');
  /* built here (not in the HTML) so the sandbox is set together with the address */
  const fr=document.createElement('iframe');fr.className='kz-frame';fr.title=slot.dataset.title;
  fr.setAttribute('sandbox','allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox');fr.referrerPolicy='no-referrer';
  fr.addEventListener('load',()=>{clearTimeout(slow);live.classList.add('ready')},{once:true});
  slow=setTimeout(()=>live.classList.add('slow'),12000);
  fr.src=slot.dataset.src;slot.replaceWith(fr);
}
const manual=matchMedia('(max-width:860px)').matches||(navigator.connection&&navigator.connection.saveData);
if(manual){live.classList.add('manual');go.addEventListener('click',start)}
else if(IO)new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){start();o.disconnect()}},{rootMargin:'400px 0px'}).observe(live);
else start();

/* 4. exit: green -> white wipe */
const out=$('#kz-out');
function frame(){
  tk=0;const vh=innerHeight;
    const or=out.getBoundingClientRect(),q=cl(-or.top/(or.height-vh)),t=RM?1:cl((q-.12)/.62);
  out.style.setProperty('--t',t.toFixed(3));out.classList.toggle('done',t>.78);
  const kr=kz.getBoundingClientRect();
  hdr.classList.toggle('kz-on',kr.top<=40&&kr.bottom>40&&t<.62);
}
const sch=()=>{if(!tk){tk=1;requestAnimationFrame(frame)}};
addEventListener('scroll',sch,{passive:true});addEventListener('resize',sch);
addEventListener('load',sch);frame();
})();
