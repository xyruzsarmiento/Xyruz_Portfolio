(function () {
  var loader = document.getElementById("loader");
  window.addEventListener("load", function () {
    window.setTimeout(function () {
      if (loader) loader.classList.add("hide");
    }, 650);
  });

  /* Sticky nav state */
  var nav = document.querySelector(".nav");
  function syncNav() {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  syncNav();
  window.addEventListener("scroll", syncNav, { passive: true });

  /* GSAP navbar animation */
  if (window.gsap) {
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    gsap.fromTo(
      ".site-header",
      { y: -32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.15 }
    );

    gsap.fromTo(
      ".brand, .nav-link, .nav-cta",
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.045, delay: 0.35 }
    );

    if (window.ScrollTrigger) {
      ScrollTrigger.create({
        start: 80,
        end: 999999,
        onEnter: function () {
          gsap.to(".nav", { y: 0, scale: 0.985, duration: 0.28, ease: "power2.out" });
        },
        onLeaveBack: function () {
          gsap.to(".nav", { y: 0, scale: 1, duration: 0.28, ease: "power2.out" });
        }
      });
    }

    document.querySelectorAll(".nav-link, .nav-cta").forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        gsap.to(item, { y: -2, duration: 0.25, ease: "power2.out" });
      });
      item.addEventListener("mouseleave", function () {
        gsap.to(item, { y: 0, duration: 0.35, ease: "elastic.out(1, 0.55)" });
      });
    });
  }

  /* Scroll progress bar */
  var progressBar = document.getElementById("progressBar");
  function syncProgress() {
    if (!progressBar) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progressBar.style.transform = "scaleX(" + ratio + ")";
  }
  syncProgress();
  window.addEventListener("scroll", syncProgress, { passive: true });
  window.addEventListener("resize", syncProgress);

  /* Mobile menu */
  var menuBtn = document.getElementById("menuBtn");
  var mobileMenu = document.getElementById("mobileMenu");
  function closeMenu() {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      var open = !mobileMenu.classList.contains("is-open");
      menuBtn.classList.toggle("is-open", open);
      mobileMenu.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* Spotlight + custom cursor */
  var spotlight = document.getElementById("spotlight");
  var cursor = document.getElementById("cursor");
  var cursorRing = document.getElementById("cursorRing");
  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;
  var ringX = mouseX;
  var ringY = mouseY;

  window.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    if (spotlight) {
      spotlight.style.setProperty("--x", mouseX + "px");
      spotlight.style.setProperty("--y", mouseY + "px");
    }
    if (cursor) {
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    }
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    if (cursorRing) {
      cursorRing.style.left = ringX + "px";
      cursorRing.style.top = ringY + "px";
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll(
    "a, button, .project-card, .tech-strip article, .stat-item, .contact-item, .social-links a, .footer-socials a"
  ).forEach(function (element) {
    element.addEventListener("mouseenter", function () {
      if (cursorRing) cursorRing.classList.add("is-hovering");
    });
    element.addEventListener("mouseleave", function () {
      if (cursorRing) cursorRing.classList.remove("is-hovering");
    });
  });

  /* Radial glow follow on cards */
  document.querySelectorAll(".project-card, .tech-strip article, .stat-item, .contact-item").forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
      var rect = card.getBoundingClientRect();
      var x = ((event.clientX - rect.left) / rect.width) * 100;
      var y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", x + "%");
      card.style.setProperty("--my", y + "%");
    });
  });

  /* Portrait tilt */
  document.querySelectorAll(".tilt").forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
      if (window.innerWidth < 900) return;
      var rect = card.getBoundingClientRect();
      var x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      var y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      card.style.transform = "perspective(900px) rotateY(" + x * 7 + "deg) rotateX(" + -y * 6 + "deg)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  /* Scroll reveals */
  var reveals = document.querySelectorAll(".reveal");
  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  reveals.forEach(function (element, index) {
    element.style.transitionDelay = Math.min(index * 45, 260) + "ms";
    revealObserver.observe(element);
  });

  /* Active section sync: top nav + dot nav */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-link");
  var dotLinks = document.querySelectorAll(".dot-nav a");
  var activeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = "#" + entry.target.id;
      navLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === id);
      });
      dotLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === id);
      });
    });
  }, { threshold: 0.42 });

  sections.forEach(function (section) {
    activeObserver.observe(section);
  });

  /* Magnetic buttons */
  document.querySelectorAll(".magnetic").forEach(function (element) {
    element.addEventListener("mousemove", function (event) {
      if (window.innerWidth < 900) return;
      var rect = element.getBoundingClientRect();
      var x = (event.clientX - rect.left - rect.width / 2) * 0.18;
      var y = (event.clientY - rect.top - rect.height / 2) * 0.18;
      element.style.transform = "translate(" + x + "px, " + y + "px)";
    });
    element.addEventListener("mouseleave", function () {
      element.style.transform = "";
    });
  });

  /* Ambient particle field */
  var canvas = document.getElementById("particles");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var width = 0;
    var height = 0;
    var particles = [];

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      var count = Math.min(95, Math.max(36, Math.floor((width * height) / 15000)));
      particles = Array.from({ length: count }, function () {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          r: Math.random() * 1.5 + 0.4,
          a: Math.random() * 0.42 + 0.14
        };
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(function (particle, index) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        for (var j = index + 1; j < particles.length; j += 1) {
          var other = particles[j];
          var dx = particle.x - other.x;
          var dy = particle.y - other.y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255, 45, 137, " + (0.12 * (1 - distance / 120)) + ")";
            ctx.lineWidth = 0.7;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 94, 170, " + particle.a + ")";
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas);
  }
})();
