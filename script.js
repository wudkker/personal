const words=["растёт","работает","выглядит","запоминается"];
let wi=0;
const word=document.querySelector("#word");
setInterval(()=>{
  word.animate([{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(12px)"}],{duration:220,easing:"ease-in"}).finished.then(()=>{
    wi=(wi+1)%words.length; word.textContent=words[wi];
    word.animate([{opacity:0,transform:"translateY(-12px)"},{opacity:1,transform:"translateY(0)"}],{duration:320,easing:"cubic-bezier(.2,.8,.2,1)"});
  });
},2600);

const cursor=document.querySelector(".cursor");
window.addEventListener("pointermove",e=>{cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px"});
document.querySelectorAll("a,.service-card,.work-card").forEach(el=>{
  el.addEventListener("mouseenter",()=>{cursor.style.width="34px";cursor.style.height="34px"});
  el.addEventListener("mouseleave",()=>{cursor.style.width="14px";cursor.style.height="14px"});
});

const sections=[...document.querySelectorAll("section[id]")];
const nav=[...document.querySelectorAll("[data-nav]")];
const obs=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
  if(entry.isIntersecting){
   nav.forEach(a=>a.classList.toggle("active",a.dataset.nav===entry.target.id));
  }
 });
},{threshold:.45});
sections.forEach(s=>obs.observe(s));

const tracks=document.querySelectorAll(".service-track,.process-track,.work-row");
let targetX=0, currentX=0;
window.addEventListener("wheel",e=>{
 if(innerWidth>900){
  const active=[...document.querySelectorAll(".panel")].find(s=>{
   const r=s.getBoundingClientRect(); return r.top<innerHeight*.5&&r.bottom>innerHeight*.5;
  });
  if(active && (active.classList.contains("services")||active.classList.contains("process")||active.classList.contains("works"))){
   active.scrollLeft += e.deltaY*.65;
  }
 }
},{passive:true});

const reveal=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")});
},{threshold:.12});
document.querySelectorAll(".service-card,.step,.work-card,.intro-text,.giant").forEach(el=>{el.classList.add("reveal");reveal.observe(el)});
