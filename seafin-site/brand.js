// Seafin shared brand JS — nav scroll state, scroll reveal observer
(() => {
  document.body.classList.add('js-loaded');

  // Nav scroll state
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 16) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Scroll reveal — auto-tag common elements
  const autoReveal = document.querySelectorAll(
    '.section-head, .glass-card, .tier-card, .feature-card, .matrix-card, ' +
    '.compare-wrap, .passthrough, .cta-card, .contact-form, .stats-row, .stat'
  );
  autoReveal.forEach(el => el.classList.add('reveal'));

  const revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealTargets.forEach(el => io.observe(el));
    // Fail-safe: reveal elements in viewport after 3s
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
      });
    }, 3000);
  } else {
    revealTargets.forEach(el => el.classList.add('in'));
  }
})();
