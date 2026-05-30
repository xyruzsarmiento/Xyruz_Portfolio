/* ========= LOADER ========= */

document.addEventListener("DOMContentLoaded", () => {

  const loader = document.querySelector(".loader")

  setTimeout(() => {
    loader.classList.add("hide")
  }, 1200)

})
const cursor = document.querySelector(".cursor");
const blur = document.querySelector(".cursor-blur");
/* ========= CURSOR ========= */
document.querySelectorAll(
'.work-card,.testimonial-card,.contact-item,.floating-card'
).forEach(card=>{

  card.addEventListener('mousemove',(e)=>{

    const rect = card.getBoundingClientRect()

    card.style.setProperty(
      '--x',
      `${e.clientX - rect.left}px`
    )

    card.style.setProperty(
      '--y',
      `${e.clientY - rect.top}px`
    )

  })

})
document.addEventListener("mousemove", (e) => {

  gsap.to(cursor,{
    x:e.clientX,
    y:e.clientY,
    duration:.08
  })

  gsap.to(blur,{
    x:e.clientX,
    y:e.clientY,
    duration:.35
  })

})

/* ========= LENIS ========= */

const lenis = new Lenis({
  duration:1.2,
  smoothWheel:true
})

function raf(time){
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

/* ========= GSAP ========= */

gsap.registerPlugin(ScrollTrigger)

/* ========= HERO ========= */

gsap.from(".hero-tag",{
  y:40,
  opacity:0,
  duration:1
})

gsap.from(".hero-content h1",{
  y:100,
  opacity:0,
  duration:1.2,
  delay:.2
})

gsap.from(".hero-content p",{
  y:50,
  opacity:0,
  duration:1,
  delay:.5
})

gsap.from(".hero-buttons",{
  y:50,
  opacity:0,
  duration:1,
  delay:.7
})

gsap.from(".stat",{
  y:40,
  opacity:0,
  stagger:.15,
  duration:1,
  delay:.9
})

gsap.from(".hero-image",{
  scale:.8,
  opacity:0,
  duration:1.4,
  delay:.5
})

gsap.from(".floating-card",{
  x:80,
  opacity:0,
  stagger:.2,
  duration:1,
  delay:.9
})

/* ========= WORK ========= */

gsap.utils.toArray(".work-card").forEach(card => {

  gsap.from(card,{
    scrollTrigger:{
      trigger:card,
      start:"top 85%"
    },

    y:100,
    opacity:0,
    duration:1
  })

})

/* ========= SECTION TITLES ========= */

gsap.utils.toArray(".section-title").forEach(title => {

  gsap.from(title,{
    scrollTrigger:{
      trigger:title,
      start:"top 85%"
    },

    y:60,
    opacity:0,
    duration:1
  })

})

/* ========= FLOATING PARALLAX ========= */

gsap.to(".blur-1",{
  y:250,
  scrollTrigger:{
    scrub:true
  }
})

gsap.to(".blur-2",{
  y:-250,
  scrollTrigger:{
    scrub:true
  }
})

/* ========= HEADER ========= */

window.addEventListener("scroll", () => {

  const header = document.querySelector(".header")

  if(window.scrollY > 40){

    header.style.background = "rgba(0,0,0,.45)"
    header.style.backdropFilter = "blur(18px)"
    header.style.borderBottom = "1px solid rgba(255,255,255,.05)"

  }else{

    header.style.background = "transparent"
    header.style.borderBottom = "none"

  }

})

/* ========= MAGNETIC BUTTON ========= */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

for(let i=0;i<180;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
r:Math.random()*3 + 1,
    vx:(Math.random()-.5)*.3,
    vy:(Math.random()-.5)*.3
  });
}

function animateParticles(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{

    p.x += p.vx;
    p.y += p.vy;

    if(p.x<0 || p.x>canvas.width) p.vx *= -1;
    if(p.y<0 || p.y>canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    const glow = ctx.createRadialGradient(
  p.x,
  p.y,
  0,
  p.x,
  p.y,
  p.r * 4
);

glow.addColorStop(0,"rgba(99,255,99,.8)");
glow.addColorStop(1,"rgba(99,255,99,0)");

ctx.fillStyle = glow;
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();
const magnets = document.querySelectorAll(".magnetic")

magnets.forEach(btn => {

  btn.addEventListener("mousemove", e => {

    const position = btn.getBoundingClientRect()

    const x = e.clientX - position.left - position.width / 2
    const y = e.clientY - position.top - position.height / 2

    gsap.to(btn,{
      x:x * .22,
      y:y * .22,
      duration:.3
    })

  })

  btn.addEventListener("mouseleave", () => {

    gsap.to(btn,{
      x:0,
      y:0,
      duration:.3
    })

  })
for(let i=0;i<particles.length;i++){

  for(let j=i+1;j<particles.length;j++){

    const dx = particles[i].x - particles[j].x;
    const dy = particles[i].y - particles[j].y;

    const dist = Math.sqrt(dx*dx + dy*dy);

    if(dist < 120){

      ctx.beginPath();

      ctx.moveTo(
        particles[i].x,
        particles[i].y
      );

      ctx.lineTo(
        particles[j].x,
        particles[j].y
      );

      ctx.strokeStyle =
      `rgba(99,255,99,${
        (120 - dist)/120 * 0.12
      })`;

      ctx.stroke();

    }

  }

}



})

/* ========= FLOATING CARDS ANIMATION ========= */

gsap.to(".floating-card:nth-child(1)",{
  y:-14,
  repeat:-1,
  yoyo:true,
  duration:2
})

gsap.to(".floating-card:nth-child(2)",{
  y:-18,
  repeat:-1,
  yoyo:true,
  duration:2.4
})

gsap.to(".floating-card:nth-child(3)",{
  y:-12,
  repeat:-1,
  yoyo:true,
  duration:1.8
})
