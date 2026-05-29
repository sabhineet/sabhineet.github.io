/* ============================================================
   SCRIPT.JS — Academic Portfolio
   Handles:
     1. Navbar scroll behaviour
     2. Mobile menu toggle
     3. Scroll-reveal animations (IntersectionObserver)
     4. Contact form pseudo-submission
     5. Smooth scrolling
   ============================================================ */

/* 1. NAVBAR */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
})();

/* 2. MOBILE MENU */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn   = document.getElementById('mobileClose');
  if (!hamburger || !mobileMenu) return;

  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
})();

/* 3. SCROLL REVEAL */
(function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* 4. CONTACT FORM */
(function initContactForm() {
  const sendBtn      = document.getElementById('sendBtn');
  const feedback     = document.getElementById('formFeedback');
  const nameField    = document.getElementById('name');
  const emailField   = document.getElementById('email');
  const messageField = document.getElementById('message');

  if (!sendBtn) return;

  sendBtn.addEventListener('click', () => {
    const name    = nameField.value.trim();
    const email   = emailField.value.trim();
    const message = messageField.value.trim();

    if (!name || !email || !message) {
      feedback.style.color = '#8b2020';
      feedback.textContent = 'Please fill in all fields before sending.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      feedback.style.color = '#8b2020';
      feedback.textContent = 'Please enter a valid email address.';
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending…';
    feedback.style.color = 'var(--clr-text-muted)';
    feedback.textContent = '';

    setTimeout(() => {
      nameField.value = '';
      emailField.value = '';
      messageField.value = '';
      feedback.style.color = 'var(--clr-accent)';
      feedback.textContent = 'Message sent. I\'ll be in touch soon.';
      sendBtn.textContent = 'Send Message';
      sendBtn.disabled = false;
      setTimeout(() => { feedback.textContent = ''; }, 6000);
    }, 1200);
  });
})();

/* 5. SMOOTH SCROLLING */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
