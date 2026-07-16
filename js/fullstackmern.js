
// mobile nav
const burger=document.getElementById('burger'),navLinks=document.getElementById('navLinks');
burger.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

// ---- syllabus data & render ----
const modules=[
  {t:"Web Foundations",d:"10 lectures",topics:["HTML5","CSS3","Flexbox/Grid","Responsive Design","Git & GitHub"]},
  {t:"JavaScript & ES6+",d:"14 lectures",topics:["DOM","Async/Await","Fetch API","Closures","ES6 Modules"]},
  {t:"React.js",d:"16 lectures",topics:["Components","Hooks","Context API","React Router","Forms"]},
  {t:"State Management & UI",d:"10 lectures",topics:["Redux Toolkit","Tailwind CSS","Component Libraries"]},
  {t:"Node.js & Express",d:"14 lectures",topics:["REST APIs","Middleware","JWT Auth","Error Handling"]},
  {t:"MongoDB & Mongoose",d:"10 lectures",topics:["Schema Design","Aggregation","Atlas Cloud","Indexing"]},
  {t:"Full Stack Integration",d:"12 lectures",topics:["MERN Architecture","File Uploads","Socket.io","API Integration"]},
  {t:"Deployment & Capstone",d:"8 lectures + project",topics:["CI/CD","Vercel/Render","Code Review","Capstone Build"]}
];
const syllabusEl=document.getElementById('syllabus');
syllabusEl.innerHTML=modules.map((m,i)=>`
  <div class="mod">
    <button class="mod-head" aria-expanded="false">
      <span class="mod-num">${String(i+1).padStart(2,'0')}</span>
      <span class="mod-title"><strong>${m.t}</strong><span>${m.d}</span></span>
      <span class="mod-plus">+</span>
    </button>
    <div class="mod-panel">
      <div class="mod-panel-inner">
        <div class="mod-topics">${m.topics.map(tp=>`<span>${tp}</span>`).join('')}</div>
      </div>
    </div>
  </div>
`).join('');

document.querySelectorAll('.mod-head').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const mod=btn.closest('.mod'), panel=btn.nextElementSibling, isOpen=mod.classList.contains('open');
    document.querySelectorAll('.mod').forEach(m=>{
      m.classList.remove('open');
      m.querySelector('.mod-head').setAttribute('aria-expanded','false');
      m.querySelector('.mod-panel').style.maxHeight=null;
    });
    if(!isOpen){
      mod.classList.add('open');
      btn.setAttribute('aria-expanded','true');
      panel.style.maxHeight=panel.scrollHeight+'px';
    }
  });
});
// open first module by default
document.querySelector('.mod-head').click();

// ---- scroll reveal ----
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls=document.querySelectorAll('.reveal');
if(reduceMotion){revealEls.forEach(el=>el.classList.add('in'));}
else{
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.15});
  revealEls.forEach(el=>io.observe(el));
}

// ---- eyebrow scramble ----
const scrambleChars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function scramble(el){
  const final=el.textContent;let iter=0;
  const id=setInterval(()=>{
    el.textContent=final.split('').map((ch,i)=>{
      if(ch===' '||ch==='/'||ch==='·')return ch;
      if(i<iter)return final[i];
      return scrambleChars[Math.floor(Math.random()*scrambleChars.length)];
    }).join('');
    iter+=0.7;
    if(iter>=final.length){clearInterval(id);el.textContent=final;}
  },28);
}
if(!reduceMotion){
  const scrambleIO=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){scramble(e.target);scrambleIO.unobserve(e.target);}});
  },{threshold:.6});
  document.querySelectorAll('.scramble').forEach(el=>scrambleIO.observe(el));
}

// ---- line-reveal headline split ----
document.querySelectorAll('.line-reveal').forEach(el=>{
  const words=el.textContent.trim().split(/\s+/);
  el.innerHTML=words.map((w,i)=>`<span class="lr-line"><span class="lr-word" style="transition-delay:${i*40}ms">${w}</span></span>`).join(' ');
});

// ---- animated stat counters ----
const statEls=document.querySelectorAll('.stat strong');
function animateCount(el){
  const target=parseFloat(el.dataset.count),suffix=el.dataset.suffix||'';
  const dur=1400,start=performance.now();
  function tick(now){
    const p=Math.min((now-start)/dur,1);
    el.textContent=Math.floor(target*p).toLocaleString('en-IN')+suffix;
    if(p<1)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
if(reduceMotion){statEls.forEach(el=>{el.textContent=parseInt(el.dataset.count).toLocaleString('en-IN')+(el.dataset.suffix||'');});}
else{
  const statIO=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){animateCount(e.target);statIO.unobserve(e.target);}});
  },{threshold:.4});
  statEls.forEach(el=>statIO.observe(el));
}

// ---- lamp title reveal ----
window.addEventListener('load',()=>{
  const title=document.getElementById('lampTitle');
  const lampIO=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        title.animate([{opacity:0,transform:"translateY(80px)"},{opacity:1,transform:"translateY(0px)"}],{duration:1000,easing:"cubic-bezier(.22,1,.36,1)",fill:"forwards"});
        lampIO.unobserve(e.target);
      }
    });
  },{threshold:.3});
  lampIO.observe(title);
});