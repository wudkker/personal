const cursor=document.querySelector('.cursor');
if(cursor&&matchMedia('(pointer:fine)').matches){
 window.addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
 document.querySelectorAll('a,.service-row').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'))});
}
const orbs=[...document.querySelectorAll('.orb,.orb-ring')];
window.addEventListener('pointermove',e=>{if(!matchMedia('(pointer:fine)').matches)return;const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;orbs.forEach((o,i)=>{const d=(i+1)*7;o.style.transform=`translate3d(${x*d}px,${y*d}px,0)`})});
const reveals=document.querySelectorAll('.statement,.services,.contact');
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';observer.unobserve(e.target)}}),{threshold:.12});
reveals.forEach(e=>{e.style.opacity='0';e.style.transform='translateY(35px)';e.style.transition='opacity 900ms cubic-bezier(.16,1,.3,1),transform 900ms cubic-bezier(.16,1,.3,1)';observer.observe(e)});
