// mobile nav
const burger=document.getElementById('burger'),navLinks=document.getElementById('navLinks');
burger.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

// ---- syllabus data (from the C Programming SLM, theory-only) & render ----
const modules=[
  {
    t: "Introduction to Web Technologies & HTML Fundamentals",
    d: "Hour 01",
    topics: [
      "Internet & Web",
      "Website vs Web Application",
      "Client-Server Architecture",
      "Frontend, Backend & Full Stack",
      "VS Code Setup",
      "First Web Page",
      "HTML Structure"
    ]
  },
  {
    t: "HTML Fundamentals & Head Tags",
    d: "Hour 02",
    topics: [
      "HTML Structure",
      "Elements & Attributes",
      "Head Tags"
    ]
  },
  {
    t: "Text Formatting & Lists",
    d: "Hour 03",
    topics: [
      "Headings & Paragraphs",
      "Text Formatting Tags",
      "Lists",
      "Quotations",
      "HTML Entities"
    ]
  },
  {
    t: "Hyperlinks & Multimedia",
    d: "Hour 04",
    topics: [
      "Hyperlinks",
      "Images",
      "Audio & Video",
      "Iframe",
      "Favicon"
    ]
  },
  {
    t: "Tables, Forms & Semantic HTML",
    d: "Hour 05-06",
    topics: [
      "HTML Tables",
      "HTML Forms",
      "Input Types",
      "Form Validation",
      "Semantic Tags"
    ]
  },
  {
    t: "Div & Semantic Tags",
    d: "Hour 07",
    topics: [
      "Div Tag",
      "Inline & Block Level Elements",
      "Semantic Tags"
    ]
  },
  {
    t: "CSS Fundamentals",
    d: "Hour 08",
    topics: [
      "CSS Introduction",
      "Types of CSS",
      "Selectors",
      "Colors & Units",
      "CSS Priority"
    ]
  },
  {
    t: "Styling & CSS Box Model",
    d: "Hour 09",
    topics: [
      "Font Properties",
      "Text Styling",
      "Backgrounds",
      "Borders",
      "Shadows",
      "CSS Box Model"
    ]
  },
  {
    t: "CSS Layout",
    d: "Hour 10",
    topics: [
      "Display Property",
      "Position Property",
      "Float & Clear",
      "Z-Index",
      "Visibility"
    ]
  },
  {
    t: "Flexbox & Grid",
    d: "Hour 11",
    topics: [
      "Flex Container",
      "Flex Items",
      "Alignment",
      "Spacing",
      "Responsive Layouts"
    ]
  },
  {
    t: "Responsive Design",
    d: "Hour 12",
    topics: [
      "Viewport",
      "Media Queries",
      "Responsive Images",
      "CSS Units",
      "Mobile-First Design"
    ]
  },
  {
    t: "CSS Animation",
    d: "Hour 13",
    topics: [
      "Transitions",
      "Transform",
      "Animations",
      "Keyframes",
      "Hover Effects"
    ]
  },
  {
    t: "Bootstrap Basics",
    d: "Hour 14",
    topics: [
      "Bootstrap Introduction",
      "Installation",
      "Containers",
      "Grid System",
      "Breakpoints"
    ]
  },
  {
    t: "Bootstrap Components & Utilities",
    d: "Hour 15",
    topics: [
      "Navbar",
      "Cards",
      "Buttons",
      "Forms",
      "Carousel",
      "Modal",
      "Spacing Utilities",
      "Color Utilities",
      "Display Utilities",
      "Flex Utilities",
      "Bootstrap Icons"
    ]
  },
  {
    t: "Mini Project Development",
    d: "Hour 16",
    topics: [
      "Project Planning",
      "Layout Design",
      "Responsive Design",
      "Testing",
      "Debugging"
    ]
  },
  {
    t: "Website Project 1",
    d: "Hour 17",
    topics: [
      "Landing Page Design",
      "Responsive Layout",
      "Bootstrap Components"
    ]
  },
  {
    t: "Website Project 2",
    d: "Hour 18",
    topics: [
      "Business Website",
      "Responsive Sections",
      "Navigation Design"
    ]
  },
  {
    t: "Website Project 3",
    d: "Hour 19",
    topics: [
      "Portfolio Website",
      "Animations",
      "Interactive UI"
    ]
  },
  {
    t: "Website Project 4",
    d: "Hour 20",
    topics: [
      "Education Website",
      "Forms",
      "Bootstrap Grid"
    ]
  },
  {
    t: "Website Project 5",
    d: "Hour 21",
    topics: [
      "Corporate Website",
      "Advanced Layout",
      "Responsive Design"
    ]
  },
  {
    t: "Code Optimization & Review",
    d: "Hour 22",
    topics: [
      "Clean Code",
      "CSS Optimization",
      "Bootstrap Best Practices"
    ]
  },
  {
    t: "Project Review & Debugging",
    d: "Hour 23",
    topics: [
      "Debugging",
      "Cross Browser Testing",
      "Performance Improvements"
    ]
  },
  {
    t: "Final Project Enhancement",
    d: "Hour 24",
    topics: [
      "UI Improvements",
      "Responsive Fixes",
      "Project Completion"
    ]
  },
  {
    t: "Final Assessment & Portfolio",
    d: "Hour 25",
    topics: [
      "Project Presentation",
      "Portfolio Building",
      "Interview Preparation",
      "Course Wrap-up"
    ]
  }
];
const syllabusEl=document.getElementById('syllabusList');
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
// open first hour by default
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

// ---- animated stat counters (decimal-safe) ----
const statEls=document.querySelectorAll('.stat strong');
function animateCount(el){
  const raw=el.dataset.count,target=parseFloat(raw),suffix=el.dataset.suffix||'',isDecimal=raw.includes('.');
  const dur=1400,start=performance.now();
  function tick(now){
    const p=Math.min((now-start)/dur,1);
    const val=target*p;
    el.textContent=(isDecimal?val.toFixed(1):Math.floor(val).toLocaleString('en-IN'))+suffix;
    if(p<1)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
if(reduceMotion){statEls.forEach(el=>{const raw=el.dataset.count;el.textContent=(raw.includes('.')?parseFloat(raw).toFixed(1):parseInt(raw).toLocaleString('en-IN'))+(el.dataset.suffix||'');});}
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
