const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

window.addEventListener('load',()=>setTimeout(()=>$('.loader')?.classList.add('done'),950));

const cursor=$('.cursor'),dot=$('.cursor-dot');
window.addEventListener('pointermove',e=>{
  if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';}
  if(dot){dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';}
});

const interactive=()=>$$('a,button,.fake-project').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor?.style.setProperty('transform','translate(-50%,-50%) scale(1.7)'));
  el.addEventListener('mouseleave',()=>cursor?.style.setProperty('transform','translate(-50%,-50%) scale(1)'));
});
interactive();

const words=$('.swap');
if(words){
  const list=words.dataset.words.split('|'); let i=0;
  setInterval(()=>{
    words.classList.add('change');
    setTimeout(()=>{i=(i+1)%list.length;words.textContent=list[i];words.classList.remove('change')},260);
  },2400);
}

const io=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting)e.target.classList.add('in');
}),{threshold:.12});
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
  if(e.isIntersecting)nav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));
}),{rootMargin:'-40% 0px -45% 0px'});
sections.forEach(s=>s&&activeIO.observe(s));

$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const t=document.querySelector(a.getAttribute('href'));
  if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
}));

const serviceData={
 design:{
  n:'01',title:'Design',eyebrow:'03 / WHAT I DO — DESIGN',
  lead:'Визуальная система, которая помогает бизнесу выглядеть цельно, понятно и узнаваемо.',
  pills:['Figma','Photoshop','VK','Visual system'],
  points:[
   ['Разбор задачи','Понимаю продукт, аудиторию, позиционирование и задачу коммуникации.'],
   ['Визуальная концепция','Определяю направление, типографику, композицию, цвет и характер бренда.'],
   ['Соцсети и креативы','Собираю обложки, посты, сторис, рекламные форматы и шаблоны.'],
   ['Айдентика и материалы','Логотипы, презентации, баннеры, полиграфия и другие точки контакта.'],
   ['Система для команды','Передаю правила и готовые шаблоны, чтобы визуал можно было продолжать без меня.']
  ],
  result:'На выходе — не набор отдельных макетов, а цельная визуальная система, которую можно использовать и масштабировать.'
 },
 web:{
  n:'02',title:'Web',eyebrow:'03 / WHAT I DO — WEB',
  lead:'Сайт, который не просто выглядит современно, а ведёт человека от первого экрана к нужному действию.',
  pills:['Structure','UI / UX','Tilda / Code','Adaptive'],
  points:[
   ['Структура и сценарий','Разбираю продукт и собираю путь пользователя: что показать, когда и зачем.'],
   ['UI и визуальный язык','Проектирую интерфейс, типографику, сетку, состояния и интерактивные элементы.'],
   ['Лендинг или сайт','Собираю страницы, блоки, формы, CTA и адаптацию под разные экраны.'],
   ['Анимация','Добавляю микро-взаимодействия и плавные переходы, которые усиливают ощущение продукта.'],
   ['Запуск','Помогаю довести сайт до публикации и проверить ключевые сценарии.']
  ],
  result:'Клиент получает готовый digital-инструмент: понятный, адаптивный и собранный вокруг конкретной бизнес-задачи.'
 },
 smm:{
  n:'03',title:'SMM',eyebrow:'03 / WHAT I DO — SMM',
  lead:'Упаковка социальных сетей и контент-система, чтобы бренд выглядел единообразно и говорил одним голосом.',
  pills:['VK','Instagram','Content','Visual system'],
  points:[
   ['Упаковка площадок','Оформляю профиль, обложки, аватары, меню и ключевые точки контакта.'],
   ['Контент-система','Определяю визуальные рубрики, шаблоны и правила оформления публикаций.'],
   ['Креативы','Делаю посты, stories, рекламные макеты, анонсы и промо-материалы.'],
   ['Контент-план','Помогаю связать темы, форматы и цели, чтобы публикации работали как система.'],
   ['Масштабирование','Создаю набор шаблонов, с которыми контент можно выпускать быстрее.']
  ],
  result:'Вместо разрозненной ленты появляется узнаваемая система, которую проще поддерживать и развивать.'
 },
 marketing:{
  n:'04',title:'Marketing',eyebrow:'03 / WHAT I DO — MARKETING',
  lead:'Идеи и визуальные решения, которые помогают объяснить ценность продукта и привлечь внимание.',
  pills:['Concept','Creative','Promotion','Growth'],
  points:[
   ['Погружаюсь в задачу','Разбираю продукт, аудиторию, предложение и контекст, в котором нужно привлечь внимание.'],
   ['Придумываю концепцию','Формирую идею кампании, визуальную метафору или коммуникационный ход.'],
   ['Собираю креативы','Адаптирую концепцию в баннеры, social ads, посты, лендинги и другие форматы.'],
   ['Связываю каналы','Помогаю сделать так, чтобы сайт, соцсети и рекламные материалы говорили одним языком.'],
   ['Тестирую подачу','Готовлю несколько визуальных направлений и помогаю выбрать рабочую подачу.']
  ],
  result:'Клиент получает не просто красивый креатив, а понятную идею, которую можно разворачивать в разных каналах.'
 }
};

const main=document.querySelector('main');
const view=$('#serviceView'),back=$('#serviceBack'),cta=$('#serviceCta');
let previousScroll=0,previousHash='#services';

function openService(key,push=true){
  const d=serviceData[key]; if(!d)return;
  previousScroll=window.scrollY;
  previousHash='#services';
  document.title=`${d.title} — Nikita Manin`;
  $('#serviceCounter').textContent=`SERVICE / ${d.n}`;
  $('#serviceEyebrow').textContent=d.eyebrow;
  $('#serviceTitle').textContent=d.title;
  $('#serviceLead').textContent=d.lead;
  $('#servicePills').innerHTML=d.pills.map(x=>`<span class="service-pill">${x}</span>`).join('');
  $('#servicePoints').innerHTML=d.points.map((p,i)=>`<div class="service-point"><span class="service-point-num">0${i+1}</span><span class="service-point-title">${p[0]}<small>${p[1]}</small></span><span class="service-point-arrow">↗</span></div>`).join('');
  $('#serviceResult').textContent=d.result;
  view.classList.add('is-open'); view.setAttribute('aria-hidden','false'); main.style.display='none';
  if(push)history.pushState({service:key,scroll:previousScroll},'',`#service-${key}`);
  window.scrollTo({top:0,behavior:'auto'});
  setTimeout(()=>view.querySelectorAll('.reveal').forEach((el,i)=>setTimeout(()=>el.classList.add('in'),80+i*60)),30);
  interactive();
}

function closeService(pop=false){
  view.classList.remove('is-open'); view.setAttribute('aria-hidden','true'); main.style.display='';
  document.title='Nikita Manin — design, web, marketing';
  if(!pop)history.pushState({},'',previousHash);
  requestAnimationFrame(()=>window.scrollTo({top:previousScroll,behavior:'auto'}));
}

$$('.service-card').forEach(card=>card.addEventListener('click',()=>openService(card.dataset.service)));
back?.addEventListener('click',()=>history.back());
cta?.addEventListener('click',()=>{closeService(false);document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'});});

window.addEventListener('popstate',()=>{
  const m=location.hash.match(/^#service-(design|web|smm|marketing)$/);
  if(m)openService(m[1],false); else if(view.classList.contains('is-open'))closeService(true);
});
const initial=location.hash.match(/^#service-(design|web|smm|marketing)$/);
if(initial)openService(initial[1],false);

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&view.classList.contains('is-open'))history.back();
});
