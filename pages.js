/* Header, menu and progress bar for the standalone pages (projects, restaurants, kanzel). */
(()=>{
const h=document.getElementById('hdr'),b=document.getElementById('burger'),p=document.getElementById('prog');
const AR=document.documentElement.lang==='ar';
const tick=()=>{h.classList.toggle('solid',scrollY>40);const m=document.documentElement.scrollHeight-innerHeight;p.style.transform='scaleX('+(m>0?scrollY/m:0)+')'};
const set=o=>{h.classList.toggle('open',o);document.body.style.overflow=o?'hidden':'';b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',AR?(o?'إغلاق القائمة':'فتح القائمة'):(o?'Close menu':'Open menu'))};
document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>set(false)));
matchMedia('(min-width:861px)').addEventListener('change',e=>{if(e.matches)set(false)});
b.addEventListener('click',()=>set(!h.classList.contains('open')));
addEventListener('keydown',e=>{if(e.key==='Escape'&&h.classList.contains('open')){set(false);b.focus()}});
addEventListener('scroll',tick,{passive:true});tick();
/* Extras grid: show the first four cards, blur the peek below, expand on demand. */
const xg=document.getElementById('xg'),xb=document.querySelector('.xbtn');
if(xg&&xb){
 const PEEK=120;let open=false;
 const collapsedH=()=>{const c=xg.children[3];return c?c.offsetTop+c.offsetHeight+PEEK:0};
 const apply=()=>{if(open)return;const h=collapsedH();if(!h||h>=xg.scrollHeight){xg.classList.remove('is-collapsed');xg.style.maxHeight='';xb.parentNode.hidden=true;return}
  xb.parentNode.hidden=false;xg.classList.add('is-collapsed');xg.style.maxHeight=h+'px'};
 const set=o=>{open=o;xb.setAttribute('aria-expanded',o);xb.textContent=o?xb.dataset.less:xb.dataset.more;
  if(o){xg.style.maxHeight=xg.scrollHeight+'px';setTimeout(()=>{if(open){xg.classList.remove('is-collapsed');xg.style.maxHeight='none'}},520);xg.classList.remove('is-collapsed')}
  else{xg.style.maxHeight=xg.scrollHeight+'px';requestAnimationFrame(()=>{xg.classList.add('is-collapsed');xg.style.maxHeight=collapsedH()+'px'});
   const top=xg.getBoundingClientRect().top;if(top<80)scrollBy({top:top-100,behavior:'smooth'})}};
 xb.addEventListener('click',()=>set(!open));
 apply();addEventListener('resize',apply);addEventListener('load',apply);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(apply);
}
})();
