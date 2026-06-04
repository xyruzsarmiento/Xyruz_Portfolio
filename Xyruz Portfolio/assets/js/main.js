/* ================================================
   XYRUZ PORTFOLIO — PREMIUM JS v2
   Cinematic · Awwwards-level · Immersive
================================================ */

/* -----------------------------------------------
   LOADER — pure JS, fires after 2.5s max
----------------------------------------------- */
(function () {
  var loader = document.getElementById('loader');
  if (!loader) return;
  function hideLoader() {
    loader.style.transition = 'opacity 0.7s ease';
    loader.style.opacity = '0';
    setTimeout(function () { loader.style.display = 'none'; }, 750);
  }
  setTimeout(hideLoader, 2500);
})();

/* -----------------------------------------------
   MOUSE GLOW FOLLOW
----------------------------------------------- */
(function () {
  var glow = document.getElementById('mouseGlow');
  if (!glow) return;
  var tx = 0, ty = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', function (e) {
    tx = e.clientX; ty = e.clientY;
  });
  (function move() {
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(move);
  })();
})();

/* -----------------------------------------------
   WAIT FOR GSAP + LENIS
----------------------------------------------- */
function waitForLibs(callback) {
  if (typeof gsap !== 'undefined' && typeof Lenis !== 'undefined') {
    callback();
  } else {
    setTimeout(function () { waitForLibs(callback); }, 50);
  }
}

waitForLibs(function () {

  /* -----------------------------------------------
     LENIS SMOOTH SCROLL
  ----------------------------------------------- */
  var lenis = new Lenis({
    duration: 1.5,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smooth: true,
    smoothTouch: false,
  });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  /* -----------------------------------------------
     GSAP REGISTER
  ----------------------------------------------- */
  gsap.registerPlugin(ScrollTrigger);

  /* -----------------------------------------------
     AMBIENT PARTICLES CANVAS
  ----------------------------------------------- */
  var canvas = document.getElementById('particles');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var w, h, particles = [];
    function resizeCanvas() {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', function () { resizeCanvas(); buildParticles(); });
    function buildParticles() {
      particles = [];
      var count = Math.min(Math.floor(w * h / 13000), 80);
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          r: Math.random() * 1.6 + 0.3,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          alpha: Math.random() * 0.45 + 0.05,
          hue: Math.random() * 35 + 248
        });
      }
    }
    buildParticles();
    function drawParticles() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = 'hsla(265,80%,70%,' + ((1 - dist / 120) * 0.11) + ')';
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        var p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + p.hue + ',80%,72%,' + p.alpha + ')';
        ctx.fill();
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  /* -----------------------------------------------
     CUSTOM CURSOR
  ----------------------------------------------- */
  if (window.innerWidth >= 768) {
    var cursor = document.getElementById('cursor');
    var trail  = document.getElementById('cursorTrail');
    if (cursor && trail) {
      var mx = 0, my = 0, tx2 = 0, ty2 = 0;
      document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
      (function moveCursor() {
        tx2 += (mx - tx2) * 0.1;
        ty2 += (my - ty2) * 0.1;
        cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
        trail.style.left  = tx2 + 'px'; trail.style.top  = ty2 + 'px';
        requestAnimationFrame(moveCursor);
      })();
      document.querySelectorAll('a, button, .work-card, .contact-item, .stat-card, .skill-card').forEach(function (el) {
        el.addEventListener('mouseenter', function () {
          cursor.style.width = '28px'; cursor.style.height = '28px';
          trail.style.width = '60px'; trail.style.height = '60px';
        });
        el.addEventListener('mouseleave', function () {
          cursor.style.width = ''; cursor.style.height = '';
          trail.style.width = ''; trail.style.height = '';
        });
      });
    }
  } else {
    var c = document.getElementById('cursor');
    var ct = document.getElementById('cursorTrail');
    if (c) c.style.display = 'none';
    if (ct) ct.style.display = 'none';
  }

  /* -----------------------------------------------
     HEADER SCROLL BEHAVIOR
  ----------------------------------------------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* -----------------------------------------------
     MOBILE MENU
  ----------------------------------------------- */
  var menuBtn    = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      var spans = menuBtn.querySelectorAll('span');
      if (mobileMenu.classList.contains('open')) {
        gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
        gsap.to(spans[1], { rotation: -45, y: -7, duration: 0.3 });
      } else {
        gsap.to(spans, { rotation: 0, y: 0, duration: 0.3 });
      }
    });
    document.querySelectorAll('.mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        gsap.to(menuBtn.querySelectorAll('span'), { rotation: 0, y: 0, duration: 0.3 });
      });
    });
  }

  /* -----------------------------------------------
     MAGNETIC BUTTONS
  ----------------------------------------------- */
  document.querySelectorAll('.magnetic').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var dx = (e.clientX - (rect.left + rect.width / 2)) * 0.32;
      var dy = (e.clientY - (rect.top + rect.height / 2)) * 0.32;
      gsap.to(btn, { x: dx, y: dy, duration: 0.5, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', function () {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
    });
  });

  /* -----------------------------------------------
     CARD MOUSE GLOW (radial gradient follow)
  ----------------------------------------------- */
  document.querySelectorAll('.work-card, .testimonial-card, .contact-item, .stat-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left, y = e.clientY - rect.top;
      card.style.background = 'radial-gradient(300px circle at ' + x + 'px ' + y + 'px, rgba(139,92,246,0.12), transparent 40%), linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))';
    });
    card.addEventListener('mouseleave', function () { card.style.background = ''; });
  });

  /* -----------------------------------------------
     CARD TILT EFFECT
  ----------------------------------------------- */
  document.querySelectorAll('.work-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = (e.clientX - cx) / (rect.width / 2);
      var dy = (e.clientY - cy) / (rect.height / 2);
      var rotX = -dy * 4;
      var rotY =  dx * 4;
      gsap.to(card, {
        rotateX: rotX, rotateY: rotY, transformPerspective: 1200,
        duration: 0.4, ease: 'power2.out'
      });
    });
    card.addEventListener('mouseleave', function () {
      gsap.to(card, {
        rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)'
      });
    });
  });

  /* -----------------------------------------------
     PROFILE IMAGE PARALLAX on mouse
  ----------------------------------------------- */
  var profileFrame = document.querySelector('.profile-frame');
  if (profileFrame && window.innerWidth >= 1024) {
    document.addEventListener('mousemove', function (e) {
      var cx = window.innerWidth / 2;
      var cy = window.innerHeight / 2;
      var dx = (e.clientX - cx) / cx;
      var dy = (e.clientY - cy) / cy;
      gsap.to(profileFrame, {
        x: dx * 10, y: dy * 8, duration: 1.2, ease: 'power2.out'
      });
    });
  }

  /* -----------------------------------------------
     GSAP SCROLL ANIMATIONS
  ----------------------------------------------- */

  // ── HERO ENTRANCE ──
  var tl = gsap.timeline({ delay: 0.3 });
  tl.fromTo('.hero-badge',
    { y: 24, opacity: 0 },
    { y: 0,  opacity: 1, duration: 0.7, ease: 'power3.out' }
  )
  .fromTo('.line',
    { y: 90, opacity: 0 },
    { y: 0,  opacity: 1, duration: 1.0, stagger: 0.1, ease: 'power4.out' }, '-=0.2'
  )
  .fromTo(['.hero-desc', '.hero-actions', '.hero-stats', '.tech-stack'],
    { y: 32, opacity: 0 },
    { y: 0,  opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power3.out' }, '-=0.5'
  )
  .fromTo('.profile-frame',
    { scale: 0.88, opacity: 0 },
    { scale: 1,    opacity: 1, duration: 1.3, ease: 'power4.out' }, '-=0.9'
  )
  .fromTo(['.card-1', '.card-2', '.card-3'],
    { y: 36, opacity: 0 },
    { y: 0,  opacity: 1, duration: 1, stagger: 0.15, ease: 'back.out(1.4)' }, '-=0.5'
  );

  // ── SECTION HEADERS ──
  gsap.utils.toArray('.section-header').forEach(function (el) {
    gsap.fromTo(el.children,
      { y: 44, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' } }
    );
  });

  // ── WORK CARDS ──
  gsap.utils.toArray('.work-card').forEach(function (card, i) {
    gsap.fromTo(card,
      { y: 70, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.9, ease: 'power3.out', delay: i * 0.08,
        scrollTrigger: { trigger: card, start: 'top 92%' } }
    );
  });

  // ── ABOUT ──
  gsap.fromTo('.about-text',
    { x: -55, opacity: 0 },
    { x: 0,   opacity: 1, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-grid', start: 'top 82%' } }
  );
  gsap.utils.toArray('.stat-card').forEach(function (card, i) {
    gsap.fromTo(card,
      { y: 44, opacity: 0, scale: 0.9 },
      { y: 0,  opacity: 1, scale: 1, duration: 0.75, ease: 'back.out(1.5)', delay: i * 0.1,
        scrollTrigger: { trigger: '.about-stats-grid', start: 'top 88%' } }
    );
  });

  // ── TESTIMONIALS ──
  gsap.utils.toArray('.testimonial-card').forEach(function (card, i) {
    gsap.fromTo(card,
      { y: 55, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.85, ease: 'power3.out', delay: i * 0.1,
        scrollTrigger: { trigger: card, start: 'top 90%' } }
    );
  });

  // ── CTA ──
  gsap.fromTo('.cta-inner > *',
    { y: 44, opacity: 0 },
    { y: 0,  opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.premium-cta', start: 'top 78%' } }
  );

  // ── CONTACT ──
  gsap.utils.toArray('.contact-item').forEach(function (item, i) {
    gsap.fromTo(item,
      { y: 44, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.75, ease: 'power3.out', delay: i * 0.1,
        scrollTrigger: { trigger: item, start: 'top 92%' } }
    );
  });

  // ── FOOTER ──
  gsap.fromTo('.footer-inner > *',
    { y: 24, opacity: 0 },
    { y: 0,  opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.footer', start: 'top 92%' } }
  );

  // ── PARALLAX: glow follows scroll ──
  gsap.to('.glow-outer', {
    y: -80, ease: 'none',
    scrollTrigger: {
      trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2.5
    }
  });

  // ── HERO TITLE subtle parallax ──
  gsap.to('.hero-left', {
    y: -40, ease: 'none',
    scrollTrigger: {
      trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2
    }
  });

  // ── PROFILE parallax on scroll ──
  gsap.to('.hero-right', {
    y: -60, ease: 'none',
    scrollTrigger: {
      trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.8
    }
  });

  // ── FLOATING IMAGE ANIMATION ──
  gsap.to('.profile-img-wrap', {
    y: -18, duration: 3.5, ease: 'power1.inOut',
    yoyo: true, repeat: -1
  });

  /* -----------------------------------------------
     ACTIVE NAV ON SCROLL
  ----------------------------------------------- */
  var navSections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY + 130;
    navSections.forEach(function (section) {
      var link = document.querySelector('.nav-link[href="#' + section.id + '"]');
      if (!link) return;
      link.classList.toggle(
        'active',
        scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight
      );
    });
  });

}); // end waitForLibs
