const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
window.addEventListener('load',()=>setTimeout(()=>$('.loader')?.classList.add('done'),950));
const cursor=$('.cursor'),dot=$('.cursor-dot');
window.addEventListener('pointermove',e=>{if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'}});
$$('a,.service-card,.fake-project,.contact-btn,.detail-cta').forEach(el=>{el.addEventListener('mouseenter',()=>cursor?.style.setProperty('transform','translate(-50%,-50%) scale(1.6)'));el.addEventListener('mouseleave',()=>cursor?.style.setProperty('transform','translate(-50%,-50%) scale(1)'))});
const words=$('.swap');if(words){const list=words.dataset.words.split('|');let i=0;setInterval(()=>{words.classList.add('change');setTimeout(()=>{i=(i+1)%list.length;words.textContent=list[i];words.classList.remove('change')},250)},2200)}
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.14});$$('.reveal').forEach(e=>io.observe(e));
const track=$('.horizontal-track'),hsec=$('.horizontal-section'),progress=$('.h-progress span');
function horizontal(){if(!track||!hsec)return;const r=hsec.getBoundingClientRect(),max=hsec.offsetHeight-innerHeight,p=Math.min(1,Math.max(0,-r.top/max));track.style.transform=`translate3d(${-p*66.6667}%,0,0)`;if(progress)progress.style.transform=`scaleX(${Math.max(.03,p)})`}window.addEventListener('scroll',horizontal,{passive:true});horizontal();
const nav=$$('.side nav a');const sections=['top','about','work','services','process','contact'].map(id=>document.getElementById(id));const activeIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)nav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-40% 0px -45% 0px'});sections.forEach(s=>s&&activeIO.observe(s));
const serviceData={
design:{title:'Design',kicker:'01 / Design',intro:'Визуальная система, которая помогает бизнесу выглядеть цельно и понятно во всех точках контакта с клиентом.',tasks:['Айдентика и визуальное направление','Оформление VK и социальных сетей','Рекламные креативы и баннеры','Презентации, коммерческие материалы и полиграфия','Система шаблонов для регулярного контента'],results:['Готовые макеты и исходники','Единый визуальный стиль','Понятная система для дальнейшего контента','Адаптации под нужные форматы'],tags:['Branding','Social','Creative','Print']},
web:{title:'Web',kicker:'02 / Web',intro:'Сайт не просто выглядит — он ведет человека от первого экрана к нужному действию.',tasks:['Структура и прототипирование','Дизайн интерфейса и адаптив','Лендинги и многостраничные сайты','Тексты, CTA и логика пользовательского пути','Микроанимации и интерактивные состояния'],results:['Готовый дизайн сайта','Адаптив под desktop и mobile','Понятная структура и сценарии','Подготовка к запуску и передаче в разработку'],tags:['UI/UX','Landing','Tilda','Animation']},
smm:{title:'SMM',kicker:'03 / SMM',intro:'Упаковываю соцсети так, чтобы контент выглядел как система, а не набор случайных публикаций.',tasks:['Оформление сообщества и профиля','Контент-система и визуальные шаблоны','Посты, stories и рекламные форматы','Визуальная логика рубрик','Идеи для регулярного контента'],results:['Цельная упаковка соцсетей','Набор рабочих шаблонов','Визуальная система для контент-команды','Понятная подача продукта и оффера'],tags:['VK','Content','Templates','SMM']},
marketing:{title:'Marketing',kicker:'04 / Marketing',intro:'Соединяю идею, визуал и задачу бизнеса, чтобы коммуникация не просто привлекала внимание, а объясняла ценность продукта.',tasks:['Концепции рекламных кампаний','Идеи и механики продвижения','Креативные направления','Рекламные материалы и офферы','Визуальная упаковка маркетинговых задач'],results:['Концепция и направление','Набор готовых креативов','Понятный оффер','Материалы для запуска и тестирования'],tags:['Concept','Ads','Creative','Growth']}};
const servicePage=$('#service-page');let serviceReturnY=0;
function openService(key){const d=serviceData[key];if(!d||!servicePage)return;serviceReturnY=window.scrollY;$('#detail-kicker').textContent=d.kicker;$('#detail-title').textContent=d.title;$('#detail-intro').textContent=d.intro;$('#detail-tasks').innerHTML=d.tasks.map(x=>`<li>${x}</li>`).join('');$('#detail-results').innerHTML=d.results.map(x=>`<li>${x}</li>`).join('');$('#detail-tags').innerHTML=d.tags.map(x=>`<span>${x}</span>`).join('');servicePage.classList.add('open');servicePage.setAttribute('aria-hidden','false');history.pushState({service:key},'',`#service-${key}`);window.scrollTo({top:0,behavior:'smooth'})}
function closeService(push=true){if(!servicePage)return;servicePage.classList.remove('open');servicePage.setAttribute('aria-hidden','true');if(push)history.pushState({},'',location.pathname+location.search);requestAnimationFrame(()=>window.scrollTo({top:serviceReturnY,behavior:'smooth'}))}
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id.startsWith('#service-')){e.preventDefault();openService(id.slice(9));return}const t=document.querySelector(id);if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));
$('.service-back')?.addEventListener('click',()=>closeService(true));
window.addEventListener('popstate',()=>{const m=location.hash.match(/^#service-(design|web|smm|marketing)$/);if(m)openService(m[1]);else if(servicePage?.classList.contains('open'))closeService(false)});
const initial=location.hash.match(/^#service-(design|web|smm|marketing)$/);if(initial)openService(initial[1]);


// V14 motion layer: tiny cursor-driven parallax on process nodes.
const processVisual=document.querySelector('.process-visual');
if(processVisual){
  processVisual.addEventListener('pointermove',e=>{
    const r=processVisual.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    processVisual.querySelectorAll('.process-node').forEach((n,i)=>{
      const k=(i+1)*1.8;
      n.style.setProperty('--mx',`${x*k}px`); n.style.setProperty('--my',`${y*k}px`);
    });
  });
  processVisual.addEventListener('pointerleave',()=>processVisual.querySelectorAll('.process-node').forEach(n=>{n.style.setProperty('--mx','0px');n.style.setProperty('--my','0px')}));
}
// Magnetic-feel hover for links: deliberately tiny so the layout never jumps.
document.querySelectorAll('.service-link,.contact-btn,.detail-cta').forEach(el=>{
  el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)/r.width*7;const y=(e.clientY-r.top-r.height/2)/r.height*4;el.style.setProperty('--hx',`${x}px`);el.style.setProperty('--hy',`${y}px`);});
  el.addEventListener('pointerleave',()=>{el.style.setProperty('--hx','0px');el.style.setProperty('--hy','0px')});
});
