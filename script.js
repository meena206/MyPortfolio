(function(){
  var root=document.documentElement;
  
  // Theme toggle
  try{var saved=localStorage.getItem("theme");if(saved)root.setAttribute("data-theme",saved);}catch(e){}
  document.getElementById("theme").addEventListener("click",function(){
    var dark=root.getAttribute("data-theme")==="dark";
    var next=dark?"light":"dark";
    root.setAttribute("data-theme",next);
    try{localStorage.setItem("theme",next);}catch(e){}
  });

  // Mobile menu
  var menu=document.getElementById("menu"),list=document.getElementById("navlist");
  menu.addEventListener("click",function(){var o=list.classList.toggle("open");menu.setAttribute("aria-expanded",o);});
  list.addEventListener("click",function(e){if(e.target.matches("a")){list.classList.remove("open");menu.setAttribute("aria-expanded","false");}});

  // Highlight current section in nav
  var links=[].slice.call(document.querySelectorAll("a.link"));
  var io=new IntersectionObserver(function(es){es.forEach(function(en){
    if(en.isIntersecting){links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+en.target.id);});}
  });},{rootMargin:"-40% 0px -55% 0px"});
  document.querySelectorAll("main section").forEach(function(s){io.observe(s);});

  // Project filter
  var btns=document.querySelectorAll(".filters button"),cards=document.querySelectorAll(".card");
  btns.forEach(function(b){b.addEventListener("click",function(){
    btns.forEach(function(x){x.setAttribute("aria-pressed",x===b);});
    cards.forEach(function(c){c.hidden=!(b.dataset.f==="all"||c.dataset.t===b.dataset.f);});
  });});

  // Contact form -> mailto (replace the address below with your own)
  var TO="your.email@example.com";
  document.getElementById("form").addEventListener("submit",function(ev){
    ev.preventDefault();
    var n=document.getElementById("n").value,e=document.getElementById("e").value,m=document.getElementById("m").value;
    location.href="mailto:"+TO+"?subject="+encodeURIComponent("Portfolio message from "+n)+"&body="+encodeURIComponent(m+"\n\n"+n+" ("+e+")");
  });
  document.getElementById("yr").textContent=new Date().getFullYear();
})();