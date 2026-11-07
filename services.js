/* "What We Do" — colour-wipe scroll panels */
(()=>{
const $=(s,r=document)=>[...r.querySelectorAll(s)],cl=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
// AI network
(()=>{const L=[3,4,4,2],X=[50,150,250,350],P=L.map((n,i)=>Array.from({length:n},(_,j)=>[X[i],150+(j-(n-1)/2)*(n>3?66:84)]));let s='',n='',k=0;
for(let i=0;i<3;i++)P[i].forEach(a=>P[i+1].forEach(b=>{const d=`M${a}L${b}`;s+=`<path class="w-d" pathLength="1" d="${d}" style="--k:${(i*.35+Math.random()*.4).toFixed(2)}s;opacity:.55"/>`;if(k++%3==0)s+=`<path class="w-pls" pathLength="1" d="${d}" style="--w:${(Math.random()*2.4).toFixed(2)}s"/>`}));
P.flat().forEach((p,i)=>n+=`<circle class="w-nd" cx="${p[0]}" cy="${p[1]}" r="8" style="--w:${((i*.37)%2.4).toFixed(2)}s"/>`);document.getElementById('wwd-ai').innerHTML=s+n})();
// marquee text
$('.wwd .w-mq').forEach(m=>{const t=m.dataset.t.repeat(3);m.innerHTML=`<div><span>${t}</span><span>${t}</span></div>`});
const cw=document.getElementById('wwd-cw'),ps=$('#wwd-cw .w-p'),mqs=$('.wwd .w-mq'),rail=document.getElementById('wwd-rail'),bar=rail.firstElementChild;
let tk=0;
function up(){tk=0;const vh=innerHeight,r=cw.getBoundingClientRect();
 rail.classList.toggle('w-on',r.top<vh*.5&&r.bottom>vh*.5);bar.style.transform=`scaleY(${cl(-r.top/(r.height-vh))})`;
 ps.forEach((p,i)=>{const t=i?cl(1-p.getBoundingClientRect().top/vh):cl((vh-p.getBoundingClientRect().top)/(vh*.6));
  if(i)p.style.clipPath=`circle(${t*145}% at 50% 100%)`;
  const nx=ps[i+1];if(nx){const u=cl(1-nx.getBoundingClientRect().top/vh);p.style.transform=`scale(${1-u*.06})`}
  p.firstElementChild.style.transform=`translateY(${(1-t)*140}px)`;
  p.classList.toggle('w-act',i?(t>.6?true:t<.25?false:p.classList.contains('w-act')):t>.5)});
 mqs.forEach(m=>{const d=m.firstElementChild,w=d.firstElementChild.offsetWidth,x=(scrollY*.7)%w;d.style.transform=`translateX(${m.dataset.r?x-w:-x}px)`})}
const sch=()=>{if(!tk){tk=1;requestAnimationFrame(up)}};
addEventListener('scroll',sch,{passive:true});addEventListener('resize',sch);up();
})();
