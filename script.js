/* ============================================================
   SCRIPT.JS — Abhineet Srivastava Portfolio
   1. Theme toggle (dark default, persisted)
   2. Navbar scroll behaviour
   3. Mobile menu
   4. Scroll-reveal (IntersectionObserver)
   5. Star canvas (hero background)
   6. Contact form
   7. Smooth scrolling
   8. Certification filter (certifications page)
   ============================================================ */

/* ── 1. THEME ───────────────────────────────────────────────── */
(function initTheme() {
  const root  = document.documentElement;
  const btn   = document.getElementById('themeToggle');
  const label = document.getElementById('themeLabel');
  const icon  = document.getElementById('themeIcon');

  // Default is dark; respect saved preference
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved, false);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark', true);
    });
  }

  function applyTheme(theme, animate) {
    if (animate) {
      root.style.transition = 'background 0.45s, color 0.45s';
      setTimeout(() => root.style.transition = '', 500);
    }
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
    if (icon)  icon.textContent  = theme === 'dark' ? '☀' : '◑';
  }
})();

/* ── 2. NAVBAR ──────────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const update = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── 3. MOBILE MENU ─────────────────────────────────────────── */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn   = document.getElementById('mobileClose');
  if (!hamburger || !mobileMenu) return;

  const links = mobileMenu.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const close = () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', close);
  links.forEach(l => l.addEventListener('click', close));
})();

/* ── 4. SCROLL REVEAL ───────────────────────────────────────── */
(function initReveal() {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

/* ── 5. STAR CANVAS ─────────────────────────────────────────── */
(function initStars() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let stars = [];
  let W, H, raf;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildStars();
  }

  function buildStars() {
    const count = Math.floor((W * H) / 3000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 245, 220, ${alpha})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement);
  resize();
  raf = requestAnimationFrame(draw);
})();

/* ── 6. CONTACT FORM ────────────────────────────────────────── */
(function initContactForm() {
  const sendBtn  = document.getElementById('sendBtn');
  const feedback = document.getElementById('formFeedback');
  const name$    = document.getElementById('name');
  const email$   = document.getElementById('email');
  const message$ = document.getElementById('message');
  if (!sendBtn) return;

  sendBtn.addEventListener('click', () => {
    const name    = name$.value.trim();
    const email   = email$.value.trim();
    const message = message$.value.trim();

    if (!name || !email || !message) {
      feedback.style.color = '#c0392b';
      feedback.textContent  = 'Please fill in all fields.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      feedback.style.color = '#c0392b';
      feedback.textContent  = 'Please enter a valid email address.';
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending…';
    feedback.textContent = '';

    setTimeout(() => {
      name$.value = email$.value = message$.value = '';
      feedback.style.color = 'var(--accent)';
      feedback.textContent  = 'Message received — I\'ll be in touch soon.';
      sendBtn.textContent   = 'Send Message';
      sendBtn.disabled      = false;
      setTimeout(() => { feedback.textContent = ''; }, 7000);
    }, 1200);
  });
})();

/* ── 7. SMOOTH SCROLL ───────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ── 8. CERTIFICATION FILTER ────────────────────────────────── */
(function initCertFilter() {
  const filters = document.querySelectorAll('.filter-btn');
  const cards   = document.querySelectorAll('.cert-card[data-category]');
  if (!filters.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      cards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat)
          ? '' : 'none';
      });
    });
  });
})();
