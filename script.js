const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
window.addEventListener('load',()=>setTimeout(()=>$('.loader')?.classList.add('done'),950));
const cursor=$('.cursor'),dot=$('.cursor-dot');
window.addEventListener('pointermove',e=>{if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'}});
const refreshCursor=()=>{$$('a,button,.service-card,.fake-project').forEach(el=>{el.addEventListener('mouseenter',()=>cursor?.style.setProperty('transform','translate(-50%,-50%) scale(1.6)'));el.addEventListener('mouseleave',()=>cursor?.style.setProperty('transform','translate(-50%,-50%) scale(1)'))})};
refreshCursor();
// Hero: the dot belongs to the animated word, so it never disappears.
const words=$('.swap'); if(words){const list=words.dataset.words.split('|');let i=0;setInterval(()=>{words.classList.add('change');setTimeout(()=>{i=(i+1)%list.length;words.firstChild.nodeValue=list[i];words.classList.remove('change')},250)},2200)}
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.14}); $$('.reveal').forEach(e=>io.observe(e));
const track=$('.horizontal-track'),hsec=$('.horizontal-section'),progress=$('.h-progress span');
function horizontal(){if(!track||!hsec)return;const r=hsec.getBoundingClientRect();const max=hsec.offsetHeight-innerHeight;const p=Math.min(1,Math.max(0,-r.top/max));track.style.transform=`translate3d(${-p*66.6667}%,0,0)`;if(progress)progress.style.transform=`scaleX(${Math.max(.03,p)})`}
window.addEventListener('scroll',horizontal,{passive:true});horizontal();
const nav=$$('.side nav a');const sections=['top','about','work','services','process','contact'].map(id=>document.getElementById(id));const activeIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){nav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-40% 0px -45% 0px'});sections.forEach(s=>s&&activeIO.observe(s));
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));

const data={
 '01':{kicker:'01 / DESIGN',title:'Design',intro:'Визуальная система, которая помогает бизнесу выглядеть цельно и понятно.',items:['Айдентика и визуальное направление','Упаковка VK и социальных сетей','Креативы для рекламы и контента','Презентации и полиграфия'],note:'Подбираю решение под задачу, а не просто собираю отдельные макеты.'},
 '02':{kicker:'02 / WEB',title:'Web',intro:'Сайт как инструмент: от структуры и первого экрана до адаптива и запуска.',items:['Лендинги и сайты под ключ','Структура и UX-сценарии','UI-дизайн и визуальная система','Адаптив под разные устройства','Подготовка к запуску'],note:'Фокус на понятном пути пользователя и действии, которое должен совершить посетитель.'},
 '03':{kicker:'03 / SMM',title:'SMM',intro:'Система контента и упаковка социальных сетей, чтобы бренд говорил единым голосом.',items:['Упаковка профиля и сообщества','Контент-концепция','Идеи для постов, Reels и Shorts','Визуальные шаблоны','Контент-направление'],note:'Собираю не набор публикаций, а повторяемую систему, которую можно развивать.'},
 '04':{kicker:'04 / MARKETING',title:'Marketing',intro:'Креатив и коммуникация вокруг задачи бизнеса — от идеи до визуального воплощения.',items:['Концепции продвижения','Креативные идеи','Рекламные визуалы','Коммуникационные решения','Связка дизайна и контента'],note:'Ищу формулировку и визуальный ход, которые помогают объяснить ценность продукта.'}
};
const cases={
 brand:{kicker:'CASE / SOCIAL SYSTEM',title:'Brand in Motion',intro:'Концепция упаковки социальных сетей как единой визуальной системы.',items:['Задача — сделать коммуникацию бренда цельной','Собираем визуальное направление и правила','Проектируем шаблоны для регулярного контента','Закладываем систему, которую можно масштабировать'],note:'Демонстрационный кейс. Реальные работы и результаты добавим позже.'},
 web:{kicker:'CASE / WEB',title:'Make the First Move',intro:'Концепция лендинга, где каждый экран ведёт пользователя к следующему действию.',items:['Структура и логика первого экрана','UI / UX и визуальная иерархия','Адаптивная система','Подготовка к запуску'],note:'Демонстрационный кейс. Реальные проекты появятся после загрузки портфолио.'},
 marketing:{kicker:'CASE / MARKETING',title:'Make Them Look',intro:'Креативная концепция для коммуникации продукта через сильный визуальный образ.',items:['Идея и визуальный концепт','Рекламные форматы','Контентные адаптации','Связка сообщения и визуала'],note:'Демонстрационный кейс. Позже заменим его реальной работой.'}
};
const modal=$('#detailModal'),mk=$('#detailKicker'),mt=$('#detailTitle'),mc=$('#detailContent');
function openDetail(d){if(!modal)return;mk.textContent=d.kicker;mt.textContent=d.title;mc.innerHTML=`<p class="detail-intro">${d.intro}</p><div class="detail-list">${d.items.map((x,i)=>`<div><span>0${i+1}</span><p>${x}</p></div>`).join('')}</div><p class="detail-note">${d.note}</p>`;modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');setTimeout(()=>$('.detail-close')?.focus(),50)}
function closeDetail(){modal?.classList.remove('is-open');modal?.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
$$('.service-trigger').forEach(b=>b.addEventListener('click',()=>openDetail(data[b.dataset.service])));
$$('.case-trigger').forEach(b=>b.addEventListener('click',()=>openDetail(cases[b.dataset.case])));
$$('[data-close-modal]').forEach(b=>b.addEventListener('click',closeDetail));
$('.contact-trigger')?.addEventListener('click',()=>openDetail({kicker:'START / CONTACT',title:'Давайте обсудим задачу',intro:'Опишите, что нужно сделать, в каком формате и к какому сроку. На основе вводных можно определить подходящий формат работы.',items:['Дизайн и визуальная упаковка','Сайт или интерфейс','SMM и контент','Маркетинг и креатив'],note:'Контактный канал добавим, когда ты дашь актуальный Telegram или другой способ связи.'}));
$$('[data-contact-from-detail]').forEach(b=>b.addEventListener('click',()=>{closeDetail();document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDetail()});
