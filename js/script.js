
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pointerFine=window.matchMedia('(pointer: fine)').matches;

// mobile nav
const burger=document.getElementById('burger'),navLinks=document.getElementById('navLinks');
burger.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

// course filter chips
const chips=document.querySelectorAll('.chip'),cards=document.querySelectorAll('.c-card');
function applyFilter(f){
  chips.forEach(c=>c.classList.toggle('active',c.dataset.filter===f));
  cards.forEach(card=>{
    const cat=card.dataset.cat;
    card.style.display=(f==='all'||cat==='all'||cat===f)?'':'none';
  });
}
chips.forEach(chip=>chip.addEventListener('click',()=>applyFilter(chip.dataset.filter)));
function goToCourses(filter){ applyFilter(filter); }

// testimonial carousel
function scrollCar(dir){document.getElementById('carousel').scrollBy({left:dir*320,behavior:'smooth'});}

// marquee content
const skills=['Python','JavaScript','React','Node.js','AWS','Docker','SQL','Flutter','Java','TensorFlow','Figma','Power BI'];
const companies=['Infosys','TCS','Wipro','HCL','Cognizant','Accenture','Amazon','Zoho','PayPal','Capgemini','Siemens'];
function buildMarquee(id,list){
  const el=document.getElementById(id);
  const html=list.map(s=>`<span>${s}</span><span class="dot">✦</span>`).join('');
  el.innerHTML=html+html;
  if(reduceMotion) el.style.animation='none';
}
buildMarquee('skillsTrack',skills);
buildMarquee('logosTrack',companies);

// scroll reveal
const revealEls=document.querySelectorAll('.reveal');
if(reduceMotion){revealEls.forEach(el=>el.classList.add('in'));}
else{
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.15});
  revealEls.forEach(el=>io.observe(el));
}

// text scramble
const scrambleChars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function scramble(el){
  const final=el.textContent;
  let iter=0;
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
if(reduceMotion){/* skip, text already correct */}
else{
  const scrambleIO=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){scramble(e.target);scrambleIO.unobserve(e.target);}});
  },{threshold:.6});
  document.querySelectorAll('.scramble').forEach(el=>scrambleIO.observe(el));
}

// line-reveal headline split
document.querySelectorAll('.line-reveal').forEach(el=>{
  const words=el.textContent.trim().split(/\s+/);
  el.innerHTML=words.map((w,i)=>`<span class="lr-line"><span class="lr-word" style="transition-delay:${i*40}ms">${w}</span></span>`).join(' ');
});

// char-stagger split
document.querySelectorAll('.char-stagger').forEach(el=>{
  const text=el.textContent;
  el.setAttribute('aria-label',text);
  el.innerHTML=text.split('').map((ch,i)=>`<span style="transition-delay:${i*18}ms">${ch===' '?'&nbsp;':ch}</span>`).join('');
});

// accordion
document.querySelectorAll('.acc-head').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const panel=btn.nextElementSibling;
    const isOpen=btn.classList.contains('open');
    btn.closest('.acc').querySelectorAll('.acc-head').forEach(b=>{
      b.classList.remove('open');b.setAttribute('aria-expanded','false');
      b.nextElementSibling.style.maxHeight=null;
    });
    if(!isOpen){
      btn.classList.add('open');btn.setAttribute('aria-expanded','true');
      panel.style.maxHeight=panel.scrollHeight+'px';
    }
  });
});
window.addEventListener('load',()=>{
  const first=document.querySelector('.acc-head.open');
  if(first)first.nextElementSibling.style.maxHeight=first.nextElementSibling.scrollHeight+'px';
});

// animated stat counters
const statEls=document.querySelectorAll('.stat strong');
function animateCount(el){
  const target=parseFloat(el.dataset.count),suffix=el.dataset.suffix||'',isDecimal=el.dataset.count.includes('.');
  const dur=1400,start=performance.now();
  function tick(now){
    const p=Math.min((now-start)/dur,1);
    const val=target*p;
    el.textContent=(isDecimal?val.toFixed(2):Math.floor(val).toLocaleString('en-IN'))+suffix;
    if(p<1)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
if(reduceMotion){statEls.forEach(el=>{const t=el.dataset.count,s=el.dataset.suffix||'';el.textContent=(t.includes('.')?parseFloat(t).toFixed(2):parseInt(t).toLocaleString('en-IN'))+s;});}
else{
  const statIO=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){animateCount(e.target);statIO.unobserve(e.target);}});
  },{threshold:.4});
  statEls.forEach(el=>statIO.observe(el));
}

// hero terminal typing loop
const codeStr=`$ whiteboard --weekly-rank
1. Aravind_K      ██████████ 2140 pts
2. Vinitha_G      █████████░ 1985 pts
3. Karthik_M      ████████░░ 1820 pts
4. You            ███████░░░ 1640 pts`;
const termCode=document.getElementById('termCode'),termStatus=document.getElementById('termStatus');
if(reduceMotion){termCode.textContent=codeStr;termStatus.textContent='✓ +50 XP earned this session';}
else{
  let i=0;
  function typeLoop(){
    if(i<=codeStr.length){
      termCode.textContent=codeStr.slice(0,i);i++;
      setTimeout(typeLoop,14);
    }else{
      termStatus.textContent='✓ +50 XP earned this session';
      setTimeout(()=>{termStatus.textContent='';termCode.textContent='';i=0;setTimeout(typeLoop,400);},2600);
    }
  }
  typeLoop();
}

// hover tilt on hero terminal card
const heroTerm=document.querySelector('.hero .term-card');
if(heroTerm&&pointerFine&&!reduceMotion){
  heroTerm.addEventListener('mousemove',e=>{
    const r=heroTerm.getBoundingClientRect();
    const px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5;
    heroTerm.style.transform=`rotateY(${px*6}deg) rotateX(${-py*6}deg)`;
  });
  heroTerm.addEventListener('mouseleave',()=>{heroTerm.style.transform='rotateY(0) rotateX(0)';});
}

// custom trailing cursor (desktop only)
if(pointerFine&&!reduceMotion){
  document.documentElement.classList.add('has-cursor');
  const dot=document.createElement('div');dot.className='cursor-dot';document.body.appendChild(dot);
  let mx=0,my=0,cx=0,cy=0;
  window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  function loop(){
    cx+=(mx-cx)*0.2;cy+=(my-cy)*0.2;
    const size=dot.classList.contains('big')?40:16;
    dot.style.width=size+'px';dot.style.height=size+'px';
    dot.style.transform=`translate(${cx-size/2}px, ${cy-size/2}px)`;
    requestAnimationFrame(loop);
  }
  loop();
  document.querySelectorAll('a,button,.chip').forEach(el=>{
    el.addEventListener('mouseenter',()=>dot.classList.add('big'));
    el.addEventListener('mouseleave',()=>dot.classList.remove('big'));
  });
}

// footer wordmark scale-in
const fWord=document.querySelector('.f-word');
if(fWord){
  if(reduceMotion){fWord.classList.add('in');}
  else{
    const wIO=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');wIO.unobserve(e.target);}});
    },{threshold:.3});
    wIO.observe(fWord);
  }
}



gsap.registerPlugin(ScrollTrigger);

/* Hero Timeline */

const hero = gsap.timeline();

hero

.from(".eyebrow",{
    y:40,
    opacity:0,
    duration:.8
})

.from(".hero-copy h1",{
    y:80,
    opacity:0,
    duration:1
},"-=.3")

.from(".hero-copy p",{
    y:40,
    opacity:0,
    duration:.8
},"-=.5")

.from(".hero-actions .btn",{
    y:40,
    opacity:0,
    stagger:.15,
    duration:.7
},"-=.5")

.from(".hero-stats div",{
    y:30,
    opacity:0,
    stagger:.15,
    duration:.6
},"-=.5")



/* Mouse Parallax */

document.addEventListener("mousemove",(e)=>{

let x=(e.clientX/window.innerWidth)-0.5;
let y=(e.clientY/window.innerHeight)-0.5;

gsap.to(".hero-copy",{

x:x*30,
y:y*20,
duration:1

});

gsap.to(".hero-spark",{

x:x*70,
y:y*70,
duration:1

});

});

/* Glow */

const glow=document.querySelector(".mouse-glow");

document.addEventListener("mousemove",(e)=>{

gsap.to(glow,{

left:e.clientX,
top:e.clientY,
duration:.4

});

});

/* Magnetic Buttons */

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("mousemove",(e)=>{

const rect=btn.getBoundingClientRect();

const x=e.clientX-rect.left-rect.width/2;

const y=e.clientY-rect.top-rect.height/2;

gsap.to(btn,{

x:x*.18,
y:y*.18,
duration:.3

});

});

btn.addEventListener("mouseleave",()=>{

gsap.to(btn,{

x:0,
y:0,
duration:.5

});

});

});

/* Scroll Parallax */

gsap.to(".hero-copy",{

y:-80,

scrollTrigger:{

trigger:".hero",
start:"top top",
end:"bottom top",
scrub:1

}

});

/* Spark Rotation */

gsap.to(".hero-spark",{

rotation:360,
repeat:-1,
duration:18,
ease:"none"

});

/* Floating Card */

/* Counter */

gsap.from(".hero-stats strong",{

textContent:0,
duration:2,
snap:{textContent:1},
stagger:.2,
ease:"power2.out"

});

/*==========================
FLOATING ORBITS
==========================*/

gsap.to(".orbit1",{

rotation:360,
repeat:-1,
duration:60,
ease:"none"

});

gsap.to(".orbit2",{

rotation:-360,
repeat:-1,
duration:45,
ease:"none"

});

/*==========================
BACKGROUND GRADIENT
==========================*/

gsap.to(".hero-gradient",{

scale:1.2,
opacity:.8,
repeat:-1,
yoyo:true,
duration:5,
ease:"sine.inOut"

});

/*==========================
FLOATING RINGS
==========================*/

gsap.to(".hero-rings",{

rotation:360,
repeat:-1,
duration:40,
ease:"none"

});

/*==========================
LINES
==========================*/

gsap.to(".line1",{

x:300,
repeat:-1,
duration:8,
ease:"none"

});

gsap.to(".line2",{

x:-250,
repeat:-1,
duration:10,
ease:"none"

});

/*==========================
SPARK PULSE
==========================*/

gsap.to(".hero-spark",{

scale:1.25,
repeat:-1,
yoyo:true,
duration:1.5

});

/*==========================
PARALLAX LAYERS
==========================*/

gsap.to(".floating-circle",{

y:-80,

scrollTrigger:{

trigger:".hero",
scrub:1

}

});

gsap.to(".hero-gradient",{

y:-150,

scrollTrigger:{

trigger:".hero",
scrub:1

}

});

gsap.to(".orbit1",{

y:120,

scrollTrigger:{

trigger:".hero",
scrub:1

}

});

/*==========================
BUTTON POP
==========================*/

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

gsap.to(btn,{

scale:1.06,
duration:.25

});

});

btn.addEventListener("mouseleave",()=>{

gsap.to(btn,{

scale:1,
duration:.25

});

});

});

/*==========================
SECTION REVEAL
==========================*/

gsap.from(".hero",{

clipPath:"circle(0% at 50% 50%)",
duration:1.4,
ease:"power4.out"

});


// ===============   LAMP JS =================
window.addEventListener("load",()=>{

const title=document.querySelector(".lamp-title");

setTimeout(()=>{

title.animate(

[
{
opacity:0,
transform:"translateY(120px)"
},

{
opacity:1,
transform:"translateY(0px)"
}

],

{
duration:1200,
easing:"cubic-bezier(.22,1,.36,1)",
fill:"forwards"
}

);

},700);

});


// ===============   LAMP JS =================