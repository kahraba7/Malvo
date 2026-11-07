(function(){
  const root=document.getElementById('about');
  if(!root)return;
  const sg=document.getElementById('ab-sg'),st=document.getElementById('ab-st');
  const sc=[...root.querySelectorAll('.ab-scene')];
  const names=['Commerce','Analytics','AI assistant'];
  let cur=0,tm,visible=true;

  names.forEach((n,i)=>{
    const b=document.createElement('button');
    b.type='button';b.setAttribute('role','tab');
    b.innerHTML=n+'<i></i>';
    b.addEventListener('click',()=>go(i));
    sg.appendChild(b);
  });

  function go(i){
    cur=i;clearTimeout(tm);
    [...sg.children].forEach((b,j)=>{
      b.setAttribute('aria-selected',j===i);
      const p=b.querySelector('i');
      p.style.animation='none';void p.offsetWidth;p.style.animation='';
    });
    sc.forEach((s,j)=>{
      s.classList.remove('ab-on');
      if(j===i){void s.offsetWidth;s.classList.add('ab-on')}
    });
    if(visible)tm=setTimeout(()=>go((i+1)%sc.length),6000);
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
