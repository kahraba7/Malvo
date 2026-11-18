/* Header, menu and progress bar for the standalone pages (projects, restaurants, kanzel). */
(()=>{
const h=document.getElementById('hdr'),b=document.getElementById('burger'),p=document.getElementById('prog');
const AR=document.documentElement.lang==='ar';
const tick=()=>{h.classList.toggle('solid',scrollY>40);const m=document.documentElement.scrollHeight-innerHeight;p.style.transform='scaleX('+(m>0?scrollY/m:0)+')'};
const set=o=>{h.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',AR?(o?'إغلاق القائمة':'فتح القائمة'):(o?'Close menu':'Open menu'))};
b.addEventListener('click',()=>set(!h.classList.contains('open')));
addEventListener('keydown',e=>{if(e.key==='Escape'&&h.classList.contains('open')){set(false);b.focus()}});
addEventListener('scroll',tick,{passive:true});tick();
})();
