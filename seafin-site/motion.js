// Motion for the site. Every page is complete without this file: the inline script at the top of
// <body> adds .js-motion only when reduced motion is off, and nothing is hidden until this file runs.
(() => {
  const root = document.documentElement;
  if (!root.classList.contains('js-motion') || !('IntersectionObserver' in window)) return;

  // Sections come up into place the first time they are reached.
  const rise = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); rise.unobserve(e.target); }
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('[data-rise]').forEach((el) => rise.observe(el));
  root.classList.add('reveal-ready');

  // The fin in the opening moves a little slower than the page, for depth.
  const fin = document.querySelector('.fin');
  if (fin) {
    let ticking = false;
    const shift = () => {
      ticking = false;
      fin.style.translate = `0 ${(Math.min(scrollY, innerHeight) * 0.14).toFixed(1)}px`;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(shift); } }, { passive: true });
  }

  // The six drawings play their scene only while they are on screen.
  const live = new IntersectionObserver((entries) => {
    for (const e of entries) e.target.classList.toggle('is-live', e.isIntersecting);
  }, { threshold: 0.35 });
  document.querySelectorAll('.v').forEach((el) => live.observe(el));

  // The sample report: each cobalt bar shrinks from today's hours to the hours after, once.
  const stack = document.querySelector('.report-stack');
  if (stack) new IntersectionObserver((entries, io) => {
    for (const e of entries) if (e.isIntersecting) { stack.classList.add('is-in'); io.disconnect(); }
  }, { threshold: 0.45 }).observe(stack);
})();
