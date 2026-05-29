/* ============================================================
   SCRIPT.JS — Scientific Portfolio
   Handles:
     1. Animated starfield background (canvas)
     2. Navbar scroll behaviour
     3. Mobile menu toggle
     4. Scroll-reveal animations (IntersectionObserver)
     5. Skill bar animations
     6. Smooth active nav link highlighting
     7. Contact form pseudo-submission
   ============================================================ */

/* ===========================================================
   1. STARFIELD CANVAS
   Draws tiny animated stars on a full-screen canvas that sits
   behind all content, giving the page a "deep space" feel.
   =========================================================== */
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx    = canvas.getContext('2d');

  // Star objects
  let stars = [];
  const STAR_COUNT = 180;

  /* Resize the canvas to fill the viewport */
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /* Create a single star with random properties */
  function createStar() {
    return {
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      radius:  Math.random() * 1.2 + 0.2,           // 0.2–1.4 px
      opacity: Math.random() * 0.6 + 0.1,            // 0.1–0.7
      speed:   Math.random() * 0.15 + 0.02,          // drift speed
      twinkle: Math.random() * Math.PI * 2,          // phase offset for twinkling
    };
  }

  /* Populate the stars array */
  function populateStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(createStar());
    }
  }

  /* Draw one animation frame */
  function draw() {
    // Clear with a near-transparent fill so stars leave a very faint trail
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = Date.now() / 1000; // seconds

    stars.forEach(star => {
      // Twinkling effect: oscillate opacity slightly
      const twinkledOpacity = star.opacity + Math.sin(now * 1.2 + star.twinkle) * 0.15;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190, 215, 255, ${Math.max(0, Math.min(1, twinkledOpacity))})`;
      ctx.fill();

      // Very slow upward drift (stars slowly scroll up)
      star.y -= star.speed;

      // When a star drifts off the top, respawn it at the bottom
      if (star.y < -2) {
        star.y = canvas.height + 2;
        star.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(draw);
  }

  /* Initialise */
  resize();
  populateStars();
  draw();

  // Re-create stars on window resize
  window.addEventListener('resize', () => {
    resize();
    populateStars();
  });
})();


/* ===========================================================
   2. NAVBAR SCROLL BEHAVIOUR
   Adds a .scrolled class to the navbar once the user scrolls
   down, which makes it more opaque (defined in CSS).
   =========================================================== */
(function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();


/* ===========================================================
   3. MOBILE MENU TOGGLE
   Opens and closes the full-screen mobile navigation drawer.
   =========================================================== */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn   = document.getElementById('mobileClose');

  // All links inside the mobile menu (clicking any of them closes the menu)
  const mobileLinks = document.querySelectorAll('.mobile-link');

  /* Open the drawer */
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden'; // prevent scrolling while open
  });

  /* Close the drawer */
  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
})();


/* ===========================================================
   4. SCROLL-REVEAL ANIMATIONS
   Uses IntersectionObserver to add .visible to elements with
   .reveal or .reveal-children when they enter the viewport.
   =========================================================== */
(function initScrollReveal() {

  // Elements to watch
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-children, .info-card, .project-card, ' +
    '.timeline-item, .contact-item, .contributor, .skill-group'
  );

  // Add base reveal class to elements that don't already have it
  revealElements.forEach(el => {
    if (!el.classList.contains('reveal') && !el.classList.contains('reveal-children')) {
      el.classList.add('reveal');
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, stop observing this element
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,    // trigger when 12% of the element is visible
      rootMargin: '0px 0px -40px 0px'  // slight bottom offset
    }
  );

  // Observe every element
  document.querySelectorAll('.reveal, .reveal-children').forEach(el => {
    observer.observe(el);
  });
})();


/* ===========================================================
   5. SKILL BAR ANIMATIONS
   When a .skill-fill element enters the viewport, animate its
   width from 0 to the target percentage (--pct CSS variable).
   =========================================================== */
(function initSkillBars() {

  const fills = document.querySelectorAll('.skill-fill');

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // A small delay makes the animation feel more polished
          setTimeout(() => {
            entry.target.classList.add('animated');
          }, 200);
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  fills.forEach(fill => barObserver.observe(fill));
})();


/* ===========================================================
   6. SMOOTH ACTIVE NAV LINK HIGHLIGHTING
   Uses IntersectionObserver on sections to highlight the
   correct nav link based on which section is in view.
   =========================================================== */
(function initActiveNav() {

  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  // Helper: remove 'active' from all nav links, then add to the one matching href
  function setActive(id) {
    navLinks.forEach(link => {
      link.style.color = '';          // reset to CSS default
      link.style.borderBottom = '';
    });

    const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (activeLink) {
      activeLink.style.color = 'var(--clr-accent)';
    }
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-40% 0px -40% 0px',  // only trigger near the vertical centre
      threshold: 0
    }
  );

  sections.forEach(sec => sectionObserver.observe(sec));
})();


/* ===========================================================
   7. CONTACT FORM PSEUDO-SUBMISSION
   A simple client-side handler that shows a confirmation
   message — replace with a real backend or form service later.
   =========================================================== */
(function initContactForm() {

  const sendBtn      = document.getElementById('sendBtn');
  const feedback     = document.getElementById('formFeedback');
  const nameField    = document.getElementById('name');
  const emailField   = document.getElementById('email');
  const messageField = document.getElementById('message');

  if (!sendBtn) return;

  sendBtn.addEventListener('click', () => {
    // Basic validation
    const name    = nameField.value.trim();
    const email   = emailField.value.trim();
    const message = messageField.value.trim();

    if (!name || !email || !message) {
      feedback.style.color = '#ff6b6b';
      feedback.textContent = '⚠ Please fill in all fields before sending.';
      return;
    }

    // Email format check (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      feedback.style.color = '#ff6b6b';
      feedback.textContent = '⚠ Please enter a valid email address.';
      return;
    }

    // Simulate sending (disable button, show spinner text, then confirm)
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending…';
    feedback.style.color = 'var(--clr-accent)';
    feedback.textContent = '';

    setTimeout(() => {
      // Reset form
      nameField.value    = '';
      emailField.value   = '';
      messageField.value = '';

      // Show success
      feedback.textContent = '✓ Message sent! I\'ll get back to you soon.';
      sendBtn.textContent  = 'Send Message';
      sendBtn.disabled     = false;

      // Clear feedback after 5 seconds
      setTimeout(() => { feedback.textContent = ''; }, 5000);
    }, 1200);
  });
})();


/* ===========================================================
   8. SMOOTH SCROLLING (fallback for browsers that don't
   support CSS scroll-behavior: smooth)
   =========================================================== */
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


/* ===========================================================
   9. TYPED HERO SUBTITLE (Optional visual flair)
   Cycles through different descriptors after a short delay,
   re-typing them character by character for a terminal effect.
   =========================================================== */
(function initTypedSubtitle() {

  const titleEl = document.querySelector('.hero-title');
  if (!titleEl) return;

  const phrases = [
    'Computational Physicist & Scientific Developer',
    'Numerical Methods · Algorithms · Data Analysis',
    'Python · C++ · Astrophysics · Spectroscopy',
    'Turning Equations Into Elegant Code',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPaused    = false;

  // Typing speed (ms per character)
  const TYPE_SPEED   = 45;
  const DELETE_SPEED = 22;
  const PAUSE_AFTER  = 2200;  // pause before deleting
  const PAUSE_BEFORE = 400;   // pause before typing next

  function tick() {
    const current = phrases[phraseIndex];

    if (isPaused) return;  // handled by setTimeout

    if (!isDeleting) {
      // Type next character
      charIndex++;
      titleEl.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        // Finished typing → pause, then start deleting
        isPaused = true;
        setTimeout(() => {
          isPaused    = false;
          isDeleting  = true;
          requestAnimationFrame(loop);
        }, PAUSE_AFTER);
        return;
      }
    } else {
      // Delete one character
      charIndex--;
      titleEl.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        // Finished deleting → move to next phrase
        isDeleting  = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        isPaused    = true;
        setTimeout(() => {
          isPaused = false;
          requestAnimationFrame(loop);
        }, PAUSE_BEFORE);
        return;
      }
    }

    setTimeout(() => requestAnimationFrame(loop), isDeleting ? DELETE_SPEED : TYPE_SPEED);
  }

  let loopId;
  function loop() { tick(); }

  // Start after a delay so the page load animations finish first
  setTimeout(() => {
    charIndex   = phrases[0].length;  // start from the initial text
    isDeleting  = false;
    isPaused    = true;

    // Wait for the initial pause, then start cycling
    setTimeout(() => {
      isPaused   = false;
      isDeleting = true;
      requestAnimationFrame(loop);
    }, PAUSE_AFTER);
  }, 1500);
})();