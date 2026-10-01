const menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("navLinks");
menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));
document.getElementById("year").textContent=new Date().getFullYear();
