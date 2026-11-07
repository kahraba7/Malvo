(function(){
  const root=document.getElementById('about');
  if(!root)return;
  const sg=document.getElementById('ab-sg'),st=document.getElementById('ab-st');
  const sc=[...root.querySelectorAll('.ab-scene')];
  const names=document.documentElement.lang==='ar'?['التجارة','التحليلات','مساعد ذكي']:['Commerce','Analytics','AI assistant'];
  let cur=0,tm,visible=true;
  const AR=document.documentElement.lang==='ar';
  let paused=matchMedia('(prefers-reduced-motion:reduce)').matches;
  sg.setAttribute('role','group');

  names.forEach((n,i)=>{
    const b=document.createElement('button');
    b.type='button';
    b.innerHTML=n+'<i></i>';
    b.addEventListener('click',()=>{setPaused(true);go(i)});
    sg.appendChild(b);
  });

  const pp=document.createElement('button');
  pp.type='button';pp.className='ab-pp';pp.textContent=AR?'إيقاف':'Pause';
  pp.setAttribute('aria-pressed',paused);
  pp.title=AR?'إيقاف التبديل التلقائي':'Pause automatic switching';
  pp.addEventListener('click',()=>setPaused(!paused));
  sg.appendChild(pp);
  sg.classList.toggle('paused',paused);
  function setPaused(v){
    paused=v;pp.setAttribute('aria-pressed',v);sg.classList.toggle('paused',v);
    if(v)clearTimeout(tm);else go(cur);
  }

  function go(i){
    cur=i;clearTimeout(tm);
    [...sg.children].filter(b=>b!==pp).forEach((b,j)=>{
      b.setAttribute('aria-pressed',j===i);
      const p=b.querySelector('i');
      p.style.animation='none';void p.offsetWidth;p.style.animation='';
    });
    sc.forEach((s,j)=>{
      s.classList.remove('ab-on');
      if(j===i){void s.offsetWidth;s.classList.add('ab-on')}
    });
    if(visible&&!paused)tm=setTimeout(()=>go((i+1)%sc.length),6000);
  }
  go(0);

  // pause the rotation while the section is off screen
  new IntersectionObserver(es=>{
    const v=es[0].isIntersecting;
    if(v===visible)return;
    visible=v;
    if(v)go(cur);else clearTimeout(tm);
  },{threshold:0}).observe(root);

  // subtle 3D tilt (mouse only)
  const hero=st.parentNode;
  hero.addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse')return;
    const r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    st.style.transform='perspective(900px) rotateY('+x*8+'deg) rotateX('+-y*6+'deg)';
  });
  hero.addEventListener('pointerleave',()=>{st.style.transform=''});

  // highlight the symbol piece of each row when it is fully in view
  const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('ab-in',e.isIntersecting&&e.intersectionRatio>.9)),{threshold:.9});
  root.querySelectorAll('.ab-row').forEach(r=>io.observe(r));
})();
