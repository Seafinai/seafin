// The build, played: four example builds shown as one looping demo in the hero.
// Every scene has the same rhythm: a message arrives, a scan reads it, its key
// details fly into the tool, and the result is confirmed. The markup in
// index.html is the still frame for no-JS and reduced motion.
(() => {
  const root = document.getElementById('demo');
  if (!root || !('animate' in Element.prototype)) return;

  const stage = root.querySelector('.demo-stage');
  const tabsWrap = root.querySelector('.demo-tabs');
  const tabs = [...tabsWrap.querySelectorAll('.tab')];
  const src = stage.querySelector('.app-src');
  const dst = stage.querySelector('.app-dst');
  const srcName = src.querySelector('.app-name');
  const srcMeta = src.querySelector('.app-meta');
  const srcBody = src.querySelector('.app-body');
  const dstName = dst.querySelector('.app-name');
  const fields = dst.querySelector('.fields');
  const typed = dst.querySelector('.typed');
  const status = dst.querySelector('.app-status');
  const statusText = dst.querySelector('.status-text');
  const relayState = stage.querySelector('.relay-state');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const EASE_IN = 'cubic-bezier(0.7, 0, 0.84, 0)';
  const SCAN_MS = 1100;
  const TYPE_MS = 22;
  const HOLD_MS = 2200;
  const STOP = Symbol('stop');

  const SCENES = [
    {
      label: 'Example build: an emailed invoice becomes a draft bill in QuickBooks, waiting for your approval.',
      src: ['Inbox', '9:41',
        '<div class="mail"><span class="from">Harbor Supply Co.</span><span class="subj">Invoice INV-2207</span></div>' +
        '<div class="doc"><span class="ln doc-h">Invoice</span><span class="ln"><mark>Harbor Supply Co.</mark></span>' +
        '<span class="ln">Packaging, 40 cases</span><span class="ln">Total <mark>$1,240.00</mark></span>' +
        '<span class="ln">Due <mark>Oct 18</mark></span></div>'],
      steps: ['Reading invoice', 'Pulling out details', 'Drafting bill'],
      dst: ['QuickBooks · Draft bill', ['Supplier', 'Amount', 'Due']],
      typed: '',
      done: 'Waiting for your approval',
    },
    {
      label: 'Example build: a website enquiry becomes a researched HubSpot contact with a first reply drafted.',
      src: ['Website form', 'New',
        '<div class="row"><span class="k">Name</span><span>Dana Ruiz</span></div>' +
        '<div class="row"><span class="k">Email</span><span>dana@bayside.example</span></div>' +
        '<div class="row"><span class="k">Company</span><span><mark>Bayside Dental</mark></span></div>' +
        '<div class="row"><span class="k">Message</span><span>Can you help with <mark data-v="After-hours booking">after-hours booking</mark>? ' +
        'We&rsquo;re a team of <mark data-v="12 staff">12</mark>.</span></div>'],
      steps: ['Reading enquiry', 'Researching company', 'Drafting reply'],
      dst: ['HubSpot · New contact', ['Company', 'Interest', 'Team']],
      typed: 'Hi Dana, thanks for asking about after-hours booking. Here’s how it would work…',
      done: 'First reply drafted',
    },
    {
      label: 'Example build: a customer email in a shared inbox is sorted, answered in draft and routed in Outlook.',
      src: ['Shared inbox', '10:12',
        '<div class="mail"><span class="from">Jordan Lee</span><span class="subj">Order <mark data-f="1">#4471</mark> hasn&rsquo;t arrived</span></div>' +
        '<p class="msg">I ordered last week and it still isn&rsquo;t here. Can someone check ' +
        '<mark data-f="0" data-v="Delivery">the delivery</mark>? It&rsquo;s <mark data-f="2" data-v="High">urgent</mark>, ' +
        'it&rsquo;s a gift for Saturday.</p><p class="msg sig">Thanks, Jordan</p>'],
      steps: ['Reading message', 'Sorting', 'Routing to Operations'],
      dst: ['Outlook · Operations', ['Topic', 'Order', 'Priority']],
      typed: 'Thanks for letting us know. I’m checking order #4471 now and…',
      done: 'Draft reply ready',
    },
    {
      label: 'Example build: a client call becomes meeting notes in Google Docs, with the task added to Sheets.',
      src: ['Client call', '32 min',
        '<p class="line"><span class="who">Client</span>The new site looks good. One change on timing.</p>' +
        '<p class="line"><span class="who">Client</span>Can we <mark data-f="0" data-v="Launch moves to the 14th">move the launch to the 14th</mark>?</p>' +
        '<p class="line"><span class="who">You</span>Yes. <mark data-f="2" data-v="Sam">Sam</mark> will ' +
        '<mark data-f="1" data-v="Send pricing sheet">send the pricing sheet</mark> by Friday.</p>' +
        '<p class="line"><span class="who">Client</span>Perfect, talk then.</p>'],
      steps: ['Reading transcript', 'Finding decisions', 'Filing tasks'],
      dst: ['Google Docs · Meeting notes', ['Decision', 'Task', 'Owner']],
      typed: '',
      done: 'Task added to Sheets',
    },
  ];

  let run = 0;
  let current = 0;
  let inView = false;

  const value = (m) => m.dataset.v || m.textContent;
  const marksInOrder = () => [...srcBody.querySelectorAll('mark')]
    .map((m, n) => [m, m.dataset.f ? Number(m.dataset.f) : n])
    .sort((a, b) => a[1] - b[1])
    .map(([m]) => m);
  const wait = (ms, id) => new Promise((resolve, reject) => {
    setTimeout(() => (id === run ? resolve() : reject(STOP)), ms);
  });

  function clear() {
    stage.querySelectorAll('.chip').forEach((c) => c.remove());
    [src, dst, relayState, statusText, ...tabs.map((t) => t.firstElementChild)]
      .forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
  }

  function render(i, final) {
    const s = SCENES[i];
    current = i;
    clear();
    stage.setAttribute('aria-label', s.label);
    srcName.textContent = s.src[0];
    srcMeta.textContent = s.src[1];
    srcBody.innerHTML = s.src[2] + '<span class="scan"></span>';
    dstName.textContent = s.dst[0];
    const marks = marksInOrder();
    fields.innerHTML = s.dst[1].map((k, n) => `<div><dt>${k}</dt><dd>${final ? value(marks[n]) : ''}</dd></div>`).join('');
    if (final) marks.forEach((m) => m.classList.add('hit'));
    typed.hidden = !s.typed;
    typed.textContent = final ? s.typed : '';
    relayState.textContent = s.steps[final ? 2 : 0];
    status.className = `app-status ${final ? 'is-done' : 'is-working'}`;
    statusText.textContent = final ? s.done : 'Working';
    tabs.forEach((t, n) => {
      t.setAttribute('aria-pressed', String(n === i));
      t.classList.toggle('done', !final && n < i);
    });
  }

  function step(text) {
    relayState.textContent = text;
    relayState.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 280, easing: EASE });
  }

  async function scene(i, id) {
    const s = SCENES[i];
    render(i, false);

    const total = 6400 + (s.typed ? s.typed.length * TYPE_MS - 500 : 0);
    tabs[i].firstElementChild.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: total, fill: 'forwards' });

    // 1. The message and the destination arrive.
    const enter = [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }];
    src.animate(enter, { duration: 520, easing: EASE, fill: 'both' });
    dst.animate(enter, { duration: 520, delay: 140, easing: EASE, fill: 'both' });
    await wait(650, id);

    // 2. A scan reads it; each detail lights up as the scan passes.
    const scan = srcBody.querySelector('.scan');
    const h = srcBody.clientHeight;
    scan.animate([
      { opacity: 0, transform: 'translateY(-40px)' },
      { opacity: 1, offset: 0.15 },
      { opacity: 1, offset: 0.85 },
      { opacity: 0, transform: `translateY(${h}px)` },
    ], { duration: SCAN_MS, easing: 'cubic-bezier(0.45, 0, 0.55, 1)' });
    const top = srcBody.getBoundingClientRect().top;
    const marks = marksInOrder();
    await Promise.all(marks.map(async (m) => {
      const y = m.getBoundingClientRect().top - top;
      await wait(Math.min(SCAN_MS, ((y + 40) / (h + 40)) * SCAN_MS), id);
      m.classList.add('hit');
    }));
    await wait(250, id);

    // 3. The details fly into the tool.
    step(s.steps[1]);
    const box = stage.getBoundingClientRect();
    const slots = [...fields.querySelectorAll('dd')];
    await Promise.all(marks.map(async (m, n) => {
      await wait(n * 150, id);
      const a = m.getBoundingClientRect();
      const b = slots[n].getBoundingClientRect();
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = value(m);
      chip.style.left = `${a.left - box.left}px`;
      chip.style.top = `${a.top - box.top}px`;
      stage.append(chip);
      const fly = chip.animate([
        { transform: 'translate(0, 0) scale(0.9)', opacity: 0 },
        { transform: 'translate(0, 0) scale(1)', opacity: 1, offset: 0.12 },
        { transform: `translate(${b.left - a.left}px, ${b.top - a.top}px)`, opacity: 1 },
      ], { duration: 820, easing: EASE, fill: 'forwards' });
      await fly.finished.catch(() => {});
      if (id !== run) { chip.remove(); throw STOP; }
      slots[n].textContent = value(m);
      const tint = getComputedStyle(document.documentElement).getPropertyValue('--tracelet-teal-tint').trim();
      slots[n].animate([{ backgroundColor: tint }, { backgroundColor: 'transparent' }], { duration: 700, easing: 'ease-out' });
      chip.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' }).finished.then(() => chip.remove(), () => chip.remove());
    }));

    // 4. The tool finishes the job.
    step(s.steps[2]);
    if (s.typed) {
      typed.classList.add('typing');
      for (let k = 1; k <= s.typed.length; k += 1) {
        typed.textContent = s.typed.slice(0, k);
        await wait(TYPE_MS, id);
      }
      typed.classList.remove('typing');
    } else {
      await wait(500, id);
    }
    status.className = 'app-status is-done';
    statusText.textContent = s.done;
    statusText.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: EASE });
    await wait(HOLD_MS, id);

    // 5. Clear the stage for the next example.
    const leave = [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-10px)' }];
    src.animate(leave, { duration: 320, easing: EASE_IN, fill: 'forwards' });
    dst.animate(leave, { duration: 320, delay: 60, easing: EASE_IN, fill: 'forwards' });
    await wait(420, id);
  }

  async function loop(start) {
    const id = ++run;
    let i = start;
    try {
      for (;;) {
        await scene(i, id);
        i = (i + 1) % SCENES.length;
      }
    } catch (e) {
      if (e !== STOP) throw e;
    }
  }

  function stop() {
    run += 1;
  }

  function resume() {
    if (reduce.matches) render(current, true);
    else if (inView && !document.hidden) loop(current);
  }

  tabs.forEach((t, n) => t.addEventListener('click', () => {
    current = n;
    if (reduce.matches) render(n, true);
    else loop(n);
  }));

  // Only run while the demo is on screen and the tab is visible.
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) resume(); else stop();
  }, { threshold: 0.2 }).observe(stage);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : resume()));
  reduce.addEventListener('change', () => { stop(); resume(); });

  tabsWrap.hidden = false;
  if (reduce.matches) render(0, true);
})();
