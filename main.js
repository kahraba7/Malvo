/* ---- Projects data: add approved projects here and they render automatically.
   { title:"Name", category:"Web Development", year:"2026", image:"/path.jpg", imageAlt:"...", url:"https://..." } ---- */
const PROJECTS = [];

const $ = s => document.querySelector(s);
const work = $('#work');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function projectCard(p){
  const tag = p.url ? 'a' : 'div';
  return `<${tag} class="proj"${p.url ? ` href="${esc(p.url)}" target="_blank" rel="noopener"` : ''}>
    ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.title)}" loading="lazy">` : ''}
    <h3>${esc(p.title)}</h3><p>${esc([p.category, p.year].filter(Boolean).join(' — '))}</p></${tag}>`;
}
function renderProjects(){
  if (PROJECTS.length){ work.innerHTML = `<div class="pgrid">${PROJECTS.map(projectCard).join('')}</div>`; return; }
  const P = ['M0 0 L218 169 L167 218 L0 86 Z','M0 171 L72 227 L72 342 L0 342 Z','M167 262 L338 98 L338 192 L167 358 Z','M370 66 L442 0 L442 342 L370 342 Z'];
  const svg = `<svg viewBox="0 0 442 358" aria-hidden="true">${P.map((d,i)=>`<path class="bp-p bp-p${i+1}" pathLength="1" d="${d}"/>`).join('')}</svg>`;
  const slots = [['01','Web Development'],['02','AI Solutions'],['03','Digital Products']]
    .map(([n,t])=>`<div class="bp-slot"><b>${n}</b><h3>${t}</h3><p>Case study in progress</p><span class="bp-bar"><i></i></span></div>`).join('');
  work.innerHTML = `<div class="bp" id="bp">
    <div class="bp-top"><span>MALVO / PLATE 01</span><span class="bp-live"><i></i>Building</span></div>
    <div class="bp-stage"><u class="bp-c a"></u><u class="bp-c b"></u><u class="bp-c c"></u><u class="bp-c d"></u>
      <div class="bp-mark">${svg}<span class="bp-scan"></span></div>
      <small class="bp-dim">442 × 358</small></div>
    <div class="bp-slots">${slots}</div>
    <a class="bp-cta" href="#contact"><span>Want to be our first story?</span><span aria-hidden="true">↗</span></a></div>`;
  const bp = document.getElementById('bp');
  if ('IntersectionObserver' in window){
    new IntersectionObserver((e,o)=>{ if (e[0].isIntersecting){ bp.classList.add('in'); o.disconnect(); } },{threshold:.25}).observe(bp);
  } else bp.classList.add('in');
}
renderProjects();

const hdr = $('#hdr'), burger = $('#burger');
const onScroll = () => hdr.classList.toggle('solid', scrollY > 40);
addEventListener('scroll', onScroll, {passive:true}); onScroll();
function setMenu(open){
  hdr.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
}
burger.addEventListener('click', () => setMenu(!hdr.classList.contains('open')));
document.querySelectorAll('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', e => { if (e.key === 'Escape' && hdr.classList.contains('open')){ setMenu(false); burger.focus(); } });
matchMedia('(min-width:861px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

$('#yr').textContent = new Date().getFullYear();

const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
const prog = $('#prog'), stmt = $('#stmt');
stmt.innerHTML = stmt.textContent.split(' ').map(w => `<span class="w">${w}</span>`).join(' ');
const ws = [...stmt.children];
function tick(){
  const max = document.documentElement.scrollHeight - innerHeight;
  prog.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  const r = stmt.getBoundingClientRect();
  const p = RM ? 1 : Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .3)));
  ws.forEach((w, i) => w.classList.toggle('on', i / ws.length < p));
}
addEventListener('scroll', tick, {passive:true}); addEventListener('resize', tick); tick();

/* Hero: particle M that reacts to cursor/touch, with a network of lines */
(() => {
  const P = ["M0 0 L218 169 L167 218 L0 86 Z","M0 171 L72 227 L72 342 L0 342 Z","M167 262 L338 98 L338 192 L167 358 Z","M370 66 L442 0 L442 342 L370 342 Z"];
  const touch = matchMedia('(hover:none)').matches;
  const sec = $('.hero'), c = $('#heroCv'), x = c.getContext('2d'), hint = $('#heroHint');
  hint.textContent = touch ? 'Touch and drag through the M' : 'Move your cursor through the M';
  let w, h, pts = [], mx = -999, my = -999, s = 2, g = 6, geo = {}, tt = 0, vis = true, rings = [], hp = 0, first = true, last = 0, lw = innerWidth, lh = innerHeight;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  function init(){
    const r = sec.getBoundingClientRect(); w = r.width; h = r.height;
    const d = Math.min(devicePixelRatio || 1, touch ? 1.75 : 2);
    c.width = w * d; c.height = h * d; x.setTransform(d, 0, 0, d, 0, 0);
    const mob = w <= 860, tx = mob ? $('.hero .txt').getBoundingClientRect().top - r.top - 40 : 0, zt = 84, W = mob ? Math.max(120, Math.min(w * .86, (tx - zt) * .9 * 442 / 358)) : Math.min(h * .7, w * .5), H = W * 358 / 442;
    const wp = parseFloat(getComputedStyle($('.hero .wrap')).paddingRight) || 0, edge = w / 2 + Math.min(w, 1280) / 2 - wp;
    const cx = mob ? w / 2 : edge - W / 2, cy = mob ? (zt + tx) / 2 : h * .5; geo = {W, H, cx, cy};
    hint.style.left = cx + 'px'; hint.style.top = (cy + H / 2 + 16) + 'px';
    const o = document.createElement('canvas'); o.width = Math.ceil(W); o.height = Math.ceil(H);
    const q = o.getContext('2d'); q.scale(W / 442, H / 358);
    P.forEach((p, i) => { q.fillStyle = i == 2 ? '#315BFF' : '#fff'; q.fill(new Path2D(p)); });
    g = Math.max(mob ? 4.5 : 5, Math.round(W / 78)); s = g * .45;
    const D = q.getImageData(0, 0, o.width, o.height).data; pts = [];
    for (let yy = 0; yy < o.height; yy += g) for (let xx = 0; xx < o.width; xx += g){
      const k = (Math.floor(yy) * o.width + Math.floor(xx)) * 4;
      if (D[k + 3] > 128){
        const hx = cx - W / 2 + xx, hy = cy - H / 2 + yy;
        pts.push({hx, hy, x: RM || !first ? hx : Math.random() * w, y: RM || !first ? hy : Math.random() * h, vx: 0, vy: 0, k: Math.random() * 6, z: .7 + Math.random() * .7, b: D[k + 2] > 200 && D[k] < 120, t0: first && !RM ? .3 + xx / W * 1.1 + Math.random() * .3 : 0});
      }
    }
    first = false; frame(-999, -999);
  }
  function frame(gx, gy){
    x.clearRect(0, 0, w, h);
    const R = Math.max(80, w * .08) * 1.5, n = [], fade = 1 - hp * .75;
    for (const f of [false, true]){
      x.fillStyle = f ? '#315BFF' : '#fff';
      for (const p of pts) if (p.b === f){
        const sh = Math.max(0, Math.sin((p.hx + p.hy) * .011 - tt * 1.7));
        x.globalAlpha = clamp((.42 + p.z * .38 + sh * sh * .35) * fade * (tt < p.t0 ? .35 : 1), 0, 1);
        x.fillRect(p.x, p.y, s * p.z, s * p.z);
        if (n.length < 110 && Math.hypot(p.x - gx, p.y - gy) < R) n.push(p);
      }
    }
    x.lineWidth = 1; const L = g * 2.3;
    for (let i = 0; i < n.length; i++) for (let j = i + 1; j < n.length; j++){
      const d = Math.hypot(n[i].x - n[j].x, n[i].y - n[j].y);
      if (d < L){ x.globalAlpha = 1; x.strokeStyle = `rgba(${n[i].b || n[j].b ? '110,140,255' : '255,255,255'},${(1 - d / L) * .7 * fade})`; x.beginPath(); x.moveTo(n[i].x + s / 2, n[i].y + s / 2); x.lineTo(n[j].x + s / 2, n[j].y + s / 2); x.stroke(); }
    }
    for (const r of rings){ x.globalAlpha = 1; x.strokeStyle = `rgba(110,140,255,${(1 - r.r / r.max) * .8})`; x.lineWidth = 2; x.beginPath(); x.arc(r.x, r.y, r.r, 0, 7); x.stroke(); }
  }
  function loop(now){
    requestAnimationFrame(loop);
    const dt = Math.min(.05, ((now || 0) - last) / 1000 || .016); last = now || 0;
    if (!vis || RM) return; tt += dt; const k = dt * 60;
    /* the demo cursor plays once after the intro, then the M rests complete */
    const real = mx > -900, env = real ? 1 : clamp(Math.min(tt - 1.6, 7 - tt), 0, 1);
    const gx = real ? mx : geo.cx + Math.cos(tt * .6) * geo.W * .42, gy = real ? my : geo.cy + Math.sin(tt * .9) * geo.H * .34, R = Math.max(70, w * .07);
    for (const p of pts){
      if (tt < p.t0) continue;
      const dx = p.x - gx, dy = p.y - gy, d = Math.hypot(dx, dy) || 1;
      if (d < R){ const f = (1 - d / R) * 5 * env * k; p.vx += dx / d * f; p.vy += dy / d * f; }
      for (const r of rings){ const rd = Math.hypot(p.x - r.x, p.y - r.y) || 1; if (Math.abs(rd - r.r) < 16){ const f = 1.4 * (1 - r.r / r.max) * k; p.vx += (p.x - r.x) / rd * f; p.vy += (p.y - r.y) / rd * f; } }
      const tx = p.hx + Math.sin(tt * 1.3 + p.k) * 1.2 + (p.hx - geo.cx) * hp * 1.4, ty = p.hy + Math.cos(tt * 1.1 + p.k) * 1.2 + (p.hy - geo.cy) * hp * 1.4 - hp * 60;
      const damp = Math.pow(.84, k); p.vx += (tx - p.x) * .05 * k; p.vy += (ty - p.y) * .05 * k; p.vx *= damp; p.vy *= damp; p.x += p.vx * k; p.y += p.vy * k;
    }
    for (let i = rings.length - 1; i >= 0; i--){ rings[i].r += 8 * k; if (rings[i].r > rings[i].max) rings.splice(i, 1); }
    frame(hp > .5 || env < .05 ? -999 : gx, gy);
  }
  const pos = e => { const r = sec.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; hint.classList.add('off'); };
  const clear = () => { mx = my = -999; };
  sec.addEventListener('pointermove', pos);
  sec.addEventListener('pointerleave', clear);
  sec.addEventListener('pointercancel', clear);
  sec.addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') clear(); });
  sec.addEventListener('pointerdown', e => { if (e.target.closest('a')) return; pos(e); rings.push({x: mx, y: my, r: 0, max: Math.max(w, h) * .45}); if (navigator.vibrate && touch) navigator.vibrate(8); });
  addEventListener('scroll', () => { hp = clamp(scrollY / (h * .8), 0, 1); }, {passive:true});
  let rt; addEventListener('resize', () => { if (innerWidth === lw && Math.abs(innerHeight - lh) < 150) return; clearTimeout(rt); rt = setTimeout(() => { lw = innerWidth; lh = innerHeight; init(); }, 150); });
  new IntersectionObserver(e => { vis = e[0].isIntersecting; }).observe(sec);
  /* re-fit when the hero or its text box changes size (fonts, slow load, browser toolbars) so the M never drifts behind the text */
  const key = () => { const r = sec.getBoundingClientRect(), t = $('.hero .txt').getBoundingClientRect(); return [r.width, r.height, t.top - r.top, t.height]; };
  let lk = null, st;
  const fit = () => { clearTimeout(st); st = setTimeout(() => { const k = key(); if (!lk || k.some((v, i) => Math.abs(v - lk[i]) > 1)) { lw = innerWidth; lh = innerHeight; init(); } }, 100); };
  const _init = init; init = function(){ _init(); lk = key(); };
  if (window.ResizeObserver){ const ro = new ResizeObserver(fit); ro.observe(sec); ro.observe($('.hero .txt')); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  addEventListener('load', fit); addEventListener('pageshow', fit);
  init(); loop();
})();

/* Contact form: no backend, so it composes an email in the visitor's mail app. */
const form = $('#form'), status = $('#status');
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form)); let ok = true;
  const rules = {
    name: v => v.trim().length < 2 && 'Enter your name.',
    email: v => !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) && 'Enter a valid email address.',
    msg: v => v.trim().length < 10 && 'Describe your project in at least 10 characters.'
  };
  for (const k in rules){
    const msg = rules[k](d[k] || ''), el = form.elements[k];
    document.querySelector(`[data-for=${k}]`).textContent = msg || '';
    el.setAttribute('aria-invalid', !!msg); if (msg && ok){ el.focus(); } if (msg) ok = false;
  }
  if (!ok){ status.textContent = 'Please fix the highlighted fields.'; return; }
  const body = `${d.msg.trim()}\n\n— ${d.name.trim()} (${d.email.trim()})`;
  location.href = `mailto:malvo.egypt@gmail.com?subject=${encodeURIComponent('Project inquiry from ' + d.name.trim())}&body=${encodeURIComponent(body)}`;
  status.textContent = 'Your email app should open with the message ready to send. Nothing is sent until you send it there. If it doesn’t open, write to malvo.egypt@gmail.com.';
});

/* hero buttons: cursor spotlight */
document.querySelectorAll('.hero .btn').forEach(el=>{
  el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px');el.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*14+'deg');el.style.setProperty('--rx',((e.clientY-r.top)/r.height-.5)*-12+'deg');});
  el.addEventListener('pointerleave',()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg');});
});

(()=>{const w=document.querySelector('.why');if(!w)return;w.classList.add('js');
if('IntersectionObserver' in window)new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){w.classList.add('in');o.disconnect()}},{threshold:.2}).observe(w);else w.classList.add('in')})();
