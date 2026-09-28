const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

window.addEventListener('load',()=>setTimeout(()=>$('.loader')?.classList.add('done'),950));

const cursor=$('.cursor'), dot=$('.cursor-dot');
window.addEventListener('pointermove',e=>{
  if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'}
  if(dot){dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'}
});

$$('a,.service-card,.fake-project,[data-tilt-object]').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor?.style.setProperty('transform','translate(-50%,-50%) scale(1.65)'));
  el.addEventListener('mouseleave',()=>cursor?.style.setProperty('transform','translate(-50%,-50%) scale(1)'));
});

const words=$('.swap');
if(words){
  const list=words.dataset.words.split('|');
  let i=0;
  const dot=words.parentElement?.querySelector('.swap-dot');
  setInterval(()=>{
    words.classList.add('change');
    setTimeout(()=>{
      i=(i+1)%list.length;
      words.firstChild.nodeValue=list[i];
      words.classList.remove('change');
    },250);
  },2200);
}

const io=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting)e.target.classList.add('in')
}),{threshold:.14});
$$('.reveal').forEach(e=>io.observe(e));

const track=$('.horizontal-track'),hsec=$('.horizontal-section'),progress=$('.h-progress span');
function horizontal(){
  if(!track||!hsec)return;
  const r=hsec.getBoundingClientRect(),max=hsec.offsetHeight-innerHeight;
  const p=Math.min(1,Math.max(0,-r.top/max));
  track.style.transform=`translate3d(${-p*66.6667}%,0,0)`;
  if(progress)progress.style.transform=`scaleX(${Math.max(.03,p)})`;
}
window.addEventListener('scroll',horizontal,{passive:true});horizontal();

const nav=$$('.side nav a');
const sections=['top','about','work','services','process','contact'].map(id=>document.getElementById(id));
const activeIO=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting)nav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))
}),{rootMargin:'-40% 0px -45% 0px'});
sections.forEach(s=>s&&activeIO.observe(s));

$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const t=document.querySelector(a.getAttribute('href'));
  if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}
}));

const tiltWrap=$('[data-tilt-object]'),tiltCore=$('[data-tilt-core]');
if(tiltWrap&&tiltCore){
  tiltWrap.addEventListener('pointermove',e=>{
    const r=tiltWrap.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    tiltCore.style.transform=`rotateX(${-18-y*28}deg) rotateY(${28+x*42}deg) rotateZ(${-8+x*8}deg)`;
    tiltWrap.style.setProperty('--mx',`${x*18}px`);
    tiltWrap.style.setProperty('--my',`${y*18}px`);
  });
  tiltWrap.addEventListener('pointerleave',()=>tiltCore.style.transform='rotateX(-18deg) rotateY(28deg) rotateZ(-8deg)');
}

$$('.service-card,.project-link,.contact-btn').forEach(el=>{
  el.addEventListener('pointermove',e=>{
    const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2;
    el.style.setProperty('--hover-x',`${Math.max(-8,Math.min(8,x/18))}px`);
  });
  el.addEventListener('pointerleave',()=>el.style.removeProperty('--hover-x'));
});
