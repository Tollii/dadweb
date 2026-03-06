document.addEventListener('DOMContentLoaded', function () {
  // Auto-update "years of experience" counters from founding year.
  var experienceCounters = document.querySelectorAll('.trust-number[data-start-year]');
  experienceCounters.forEach(function (counter) {
    var startYear = parseInt(counter.getAttribute('data-start-year'), 10);
    if (!Number.isFinite(startYear)) {
      return;
    }

    var currentYear = new Date().getFullYear();
    var years = Math.max(0, currentYear - startYear);
    counter.textContent = years + '+';
  });

  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = mobileNav.querySelectorAll('a[href^="#"]');

  // Header scroll shadow
  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Hamburger toggle
  hamburger.addEventListener('click', function () {
    const isOpen = mobileNav.classList.toggle('is-open');
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile nav on link click
  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Scroll-triggered animations
  var animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animatedElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
});
