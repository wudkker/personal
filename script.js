const reveal = new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');reveal.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.project,.service,.process-grid>div,.about-big,.statement p').forEach(el=>{el.classList.add('reveal');reveal.observe(el)});
