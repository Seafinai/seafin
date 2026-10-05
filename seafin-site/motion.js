// Motion for the homepage diagrams. Every diagram is complete without this file;
// the inline script at the top of <body> only adds .js-motion when reduced motion is off.
(() => {
  const root = document.documentElement;
  if (!root.classList.contains('js-motion')) return;

  // Run a callback when an element comes into view (and optionally when it leaves).
  const watch = (el, threshold, onIn, onOut) => {
    if (!el) return;
    new IntersectionObserver((entries) => {
      for (const e of entries) (e.isIntersecting ? onIn : onOut)?.(e);
    }, { threshold }).observe(el);
  };

  // The sample report: each cobalt bar shrinks from today's hours to the hours after, once.
  const stack = document.querySelector('.report-stack');
  watch(stack, 0.45, () => stack.classList.add('is-in'));

  // Where it runs: a signal travels each connection and back, only while the panel is on screen.
  const routes = document.querySelector('.routes');
  watch(routes, 0.2, () => routes.classList.add('is-visible'), () => routes.classList.remove('is-visible'));

  // The invoice flow: one job moves down the steps; each step lights as it is reached.
  const flow = document.querySelector('.flow');
  if (!flow) return;
  const steps = flow.querySelector('.flow-steps');
  const items = [...flow.querySelectorAll('li')];
  const token = flow.querySelector('.flow-token');
  let ys = [];
  let gen = 0;
  let visible = false;

  const measure = () => {
    const box = steps.getBoundingClientRect();
    const dots = items.map((li) => li.querySelector('.dot').getBoundingClientRect());
    ys = dots.map((d) => d.top + d.height / 2 - box.top);
    const x = dots[0].left + dots[0].width / 2 - box.left;
    flow.style.setProperty('--rail-top', `${ys[0]}px`);
    flow.style.setProperty('--rail-height', `${ys[ys.length - 1] - ys[0]}px`);
    flow.style.setProperty('--rail-x', `${x}px`);
  };
  const at = (i) => {
    flow.style.setProperty('--ty', `${ys[i]}px`);
    flow.style.setProperty('--fill', String(i / (items.length - 1)));
  };
  const wait = (ms, g) => new Promise((ok, stop) => setTimeout(() => (g === gen ? ok() : stop()), ms));

  async function play(g) {
    flow.classList.add('is-running');
    for (;;) {
      measure();
      flow.classList.add('is-resetting');
      items.forEach((li) => li.classList.remove('is-on'));
      token.classList.remove('is-shown', 'is-moving');
      at(0);
      void flow.offsetWidth; // commit the reset before transitions come back
      flow.classList.remove('is-resetting');
      await wait(500, g);
      token.classList.add('is-shown');
      await wait(320, g);
      items[0].classList.add('is-on');
      await wait(1300, g);
      for (let i = 1; i < items.length; i++) {
        token.classList.add('is-moving');
        at(i);
        await wait(780, g);
        token.classList.remove('is-moving');
        items[i].classList.add('is-on');
        await wait(i === items.length - 1 ? 2600 : 1300, g);
      }
      token.classList.remove('is-shown');
      flow.classList.add('is-settling');
      await wait(700, g);
      flow.classList.remove('is-settling');
    }
  }

  const start = () => {
    if (!visible || document.hidden || flow.classList.contains('is-running')) return;
    play(++gen).catch(() => {});
  };
  const stop = () => {
    gen++;
    flow.classList.remove('is-running', 'is-resetting', 'is-settling');
    token.classList.remove('is-shown', 'is-moving');
    items.forEach((li) => li.classList.remove('is-on'));
  };

  watch(flow, 0.35, () => { visible = true; start(); }, () => { visible = false; stop(); });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  addEventListener('resize', () => { if (flow.classList.contains('is-running')) measure(); });
})();
