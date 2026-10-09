// Trial: GSAP + ScrollTrigger reveals and Lenis smooth scrolling on the homepage.
// Off when the visitor asks for reduced motion (no .js-motion class), so the page reads the same without it.
(() => {
  if (!document.documentElement.classList.contains('js-motion')) return;
  if (!window.gsap || !window.ScrollTrigger || !window.Lenis) return;
  gsap.registerPlugin(ScrollTrigger);

  // Lenis eases the scroll and drives ScrollTrigger from the same frame loop.
  const lenis = new Lenis({ lerp: 0.12 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // Other in-page links go through Lenis so they glide too (home.js already handles #book).
  document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', () => {
    const id = a.getAttribute('href');
    if (id.length > 1 && id !== '#book' && document.querySelector(id)) lenis.scrollTo(id, { offset: -88 });
  }));

  // Section headings and intro lines rise in as each section reaches the screen.
  gsap.utils.toArray('.section h2, .section .section-sub').forEach((el) => {
    gsap.from(el, { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  // Cards in each grid follow one after another.
  ['.builds > li', '.offers > li', '#questions details'].forEach((sel) => {
    const items = gsap.utils.toArray(sel);
    if (!items.length) return;
    ScrollTrigger.batch(items, { start: 'top 90%', once: true,
      onEnter: (batch) => gsap.from(batch, { y: 32, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }) });
  });

  // The card photos drift slightly against the scroll.
  gsap.utils.toArray('.build-art').forEach((img) => {
    gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: 'none',
      scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
})();
