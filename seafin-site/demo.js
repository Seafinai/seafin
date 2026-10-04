// The build, played: four example builds shown as one looping demo in the hero.
// Each scene is modelled on a published small-business case (sources in
// PRODUCT.md); names and amounts are illustrative. Every scene has the same
// rhythm: a document arrives, a scan reads it, its key details travel into the
// destination record, and the record waits for a person. The markup in
// index.html is the still frame for no-JS and reduced motion.
(() => {
  const root = document.getElementById('demo');
  if (!root || !('animate' in Element.prototype)) return;

  const stage = root.querySelector('.demo-stage');
  const tabsWrap = root.querySelector('.demo-tabs');
  const tabs = [...tabsWrap.querySelectorAll('.tab')];
  const srcName = stage.querySelector('.app-src .app-name');
  const srcMeta = stage.querySelector('.app-src .app-meta');
  const srcBody = stage.querySelector('.app-src .app-body');
  const dstName = stage.querySelector('.app-dst .app-name');
  const fields = stage.querySelector('.app-dst .fields');
  const status = stage.querySelector('.app-dst .app-status');
  const statusText = status.querySelector('.status-text');
  const relayState = stage.querySelector('.relay-state');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const SCAN_MS = 1300; // reading pace, top to bottom
  const SCENE_MS = 7600; // from first frame to the end of the hold; the tab's bar fills over exactly this
  const MIN_HOLD_MS = 1600;
  const STOP = Symbol('stop');

  // src: [app, meta, body]. Each <mark data-f="n"> fills field n; data-v is the
  // value as the destination stores it. calc holds fields worked out, not copied.
  const SCENES = [
    {
      // Bookkeeping firm: client invoices become bills the owner approves (Dext case).
      label: 'Example build: an emailed supplier invoice becomes a QuickBooks bill, waiting for your approval.',
      src: ['Inbox', 'Northline Packaging',
        '<p class="subj">Invoice 10482 attached</p>' +
        '<div class="doc"><span class="ln doc-h">Invoice <mark data-f="1">10482</mark></span>' +
        '<span class="ln"><mark data-f="0">Northline Packaging</mark></span>' +
        '<span class="ln">Corrugated boxes, 40 cases</span>' +
        '<span class="ln">Total <mark data-f="3">$1,240.00</mark> &middot; Due <mark data-f="2" data-v="Oct 30, 2026">Oct 30</mark></span></div>'],
      steps: ['Reading invoice', 'Matching vendor', 'Drafting bill'],
      dst: ['QuickBooks · Bill', ['Vendor', 'Bill no.', 'Due date', 'Amount']],
      calc: {},
      done: 'Waiting for your approval',
    },
    {
      // Shipper: weekly carrier invoices checked against the contract rate (Fortune, Claude-built agent).
      label: 'Example build: a weekly carrier invoice is checked against the contract rate and an overcharge dispute is drafted.',
      src: ['Carrier invoice', 'Week 39',
        '<div class="tbl"><span class="tr th"><span>Service</span><span>Billed</span></span>' +
        '<span class="tr"><span>Ground &middot; Zone 3 &middot; 4 lb</span><span>$12.85</span></span>' +
        '<span class="tr"><span><mark data-f="0" data-v="Ground, Zone 5, 12 lb">Ground &middot; Zone 5 &middot; 12 lb</mark></span><span><mark data-f="1">$38.40</mark></span></span>' +
        '<span class="tr"><span>Residential surcharge</span><span>$5.95</span></span></div>' +
        '<p class="ref">Contract rate, Zone 5, 12 lb <mark data-f="2">$31.10</mark></p>'],
      steps: ['Reading invoice', 'Checking contract rates', 'Drafting dispute'],
      dst: ['Carrier audit · Overcharge', ['Shipment', 'Billed', 'Contract rate', 'Overcharge']],
      calc: { 3: '$7.30' },
      done: 'Dispute drafted for your approval',
    },
    {
      // Medical equipment supplier: faxed referrals become a patient and an order (Tennr cases).
      label: 'Example build: a faxed referral becomes a patient record and an equipment order, ready for staff review.',
      src: ['Fax', 'Page 1 of 3',
        '<div class="doc"><span class="ln doc-h">Order / referral</span>' +
        '<span class="ln">Patient <mark data-f="0" data-v="Maria Delgado">DELGADO, MARIA</mark></span>' +
        '<span class="ln">DOB <mark data-f="1">04/12/1951</mark> &middot; Ins. <mark data-f="2" data-v="Medicare Part B">MEDICARE B</mark></span>' +
        '<span class="ln">Item <mark data-f="3" data-v="Wheelchair, K0001">Std wheelchair K0001</mark></span>' +
        '<span class="ln">Ordering: Dr. R. Shah</span></div>'],
      steps: ['Reading fax', 'Finding patient details', 'Creating order'],
      dst: ['Patient record · New order', ['Patient', 'Date of birth', 'Insurance', 'Item']],
      calc: {},
      done: 'Ready for staff review',
    },
    {
      // Employment law firm: recorded intake calls become a summary for the attorney (Eve case).
      label: 'Example build: a recorded intake call becomes a case summary with possible claims, strengths and weaknesses for the attorney.',
      src: ['Intake call', '14 min',
        '<p class="line"><span class="who">Intake</span>What happened after you raised it?</p>' +
        '<p class="line"><span class="who">Caller</span>They let me go two weeks after I <mark data-f="0" data-v="Retaliation">reported the safety issue</mark>.</p>' +
        '<p class="line"><span class="who">Caller</span>I kept the <mark data-f="1" data-v="Emails to HR">emails I sent HR</mark>.</p>' +
        '<p class="line"><span class="who">Caller</span>I <mark data-f="2" data-v="Signed exit paperwork">signed something at the exit meeting</mark>.</p>'],
      steps: ['Transcribing call', 'Flagging claims', 'Writing summary'],
      dst: ['Case intake · Summary', ['Possible claim', 'Strength', 'Weakness', 'Next step']],
      calc: { 3: 'Attorney review' },
      done: 'Waiting for attorney review',
    },
  ];

  let run = 0;
  let current = 0;
  let inView = false;

  // Everything that changes between scenes. The two app frames never leave
  // the stage; only what is inside them cross-fades.
  const contents = [srcName, srcMeta, srcBody, dstName, fields, status];

  const value = (m) => m.dataset.v || m.textContent;
  const marks = () => [...srcBody.querySelectorAll('mark')].sort((a, b) => a.dataset.f - b.dataset.f);
  const wait = (ms, id) => new Promise((resolve, reject) => {
    setTimeout(() => (id === run ? resolve() : reject(STOP)), ms);
  });
  const tint = (el) => getComputedStyle(el).getPropertyValue('--tracelet-teal-tint').trim();

  function clear() {
    stage.querySelectorAll('.chip').forEach((c) => c.remove());
    [...contents, relayState, statusText, ...tabs.map((t) => t.firstElementChild)]
      .forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
  }

  // Sequencing runs on timers, never on animation.finished, so a browser that
  // throttles animations can't stall the loop.
  function fade(els, from, to, ms, stagger = 0) {
    els.forEach((el, n) => el.animate(
      [{ opacity: from }, { opacity: to }],
      { duration: ms, delay: n * stagger, easing: 'ease-out', fill: 'both' },
    ));
    return ms + stagger * (els.length - 1);
  }

  function render(i, final) {
    const s = SCENES[i];
    current = i;
    clear();
    stage.setAttribute('aria-label', s.label);
    [srcName.textContent, srcMeta.textContent] = s.src;
    srcBody.innerHTML = s.src[2];
    dstName.textContent = s.dst[0];
    const byField = Object.fromEntries(marks().map((m) => [m.dataset.f, value(m)]));
    fields.innerHTML = s.dst[1].map((k, n) => `<div><dt>${k}</dt><dd>${final ? (s.calc[n] || byField[n]) : ''}</dd></div>`).join('');
    if (final) marks().forEach((m) => m.classList.add('hit'));
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

  function land(slot, text) {
    slot.textContent = text;
    const t = tint(slot);
    slot.animate([
      { opacity: 0, backgroundColor: t },
      { opacity: 1, backgroundColor: t, offset: 0.3 },
      { opacity: 1, backgroundColor: 'transparent' },
    ], { duration: 900, easing: 'ease-out' });
  }

  async function scene(i, id) {
    const s = SCENES[i];

    // 1. The previous example fades out inside the same frames; the next fades in.
    await wait(fade(contents, 1, 0, 200), id);
    render(i, false);
    const t0 = performance.now();
    tabs[i].firstElementChild.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: SCENE_MS, fill: 'forwards' });
    await wait(fade(contents, 0, 1, 360, 40) + 200, id);

    // 2. The document is read top to bottom; each detail lights up in turn.
    const h = srcBody.clientHeight;
    const top = srcBody.getBoundingClientRect().top;
    const found = marks();
    await Promise.all(found.map(async (m) => {
      const y = m.getBoundingClientRect().top - top;
      await wait(Math.min(SCAN_MS, ((y + 40) / (h + 40)) * SCAN_MS), id);
      m.classList.add('hit');
    }));
    await wait(250, id);

    // 3. The details travel into the record one at a time, each on a shallow
    //    arc, and settle exactly where the field's value sits.
    step(s.steps[1]);
    const box = stage.getBoundingClientRect();
    const slots = [...fields.querySelectorAll('dd')];
    await Promise.all(found.map(async (m, n) => {
      await wait(n * 280, id);
      const slot = slots[m.dataset.f];
      const a = m.getBoundingClientRect();
      const b = slot.getBoundingClientRect();
      const dx = b.left - a.left;
      const dy = b.top - a.top;
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = value(m);
      chip.style.left = `${a.left - box.left}px`;
      chip.style.top = `${a.top - box.top}px`;
      stage.append(chip);
      chip.animate([
        { transform: 'translate(0, 0) scale(0.96)', opacity: 0 },
        { transform: 'translate(0, 0) scale(1)', opacity: 1, offset: 0.1 },
        { transform: `translate(${dx * 0.5 + 26}px, ${dy * 0.5}px) scale(1.03)`, offset: 0.55 },
        { transform: `translate(${dx}px, ${dy}px) scale(1)`, opacity: 1 },
      ], { duration: 900, easing: 'cubic-bezier(0.45, 0, 0.2, 1)', fill: 'forwards' });
      try { await wait(900, id); } catch (e) { chip.remove(); throw e; }
      land(slot, value(m));
      chip.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: 'ease-out', fill: 'forwards' });
      setTimeout(() => chip.remove(), 240);
    }));

    // 4. The record is finished and waits for a person.
    step(s.steps[2]);
    await wait(350, id);
    Object.entries(s.calc).forEach(([n, v]) => land(slots[n], v));
    await wait(Object.keys(s.calc).length ? 600 : 200, id);
    status.className = 'app-status is-done';
    statusText.textContent = s.done;
    statusText.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: EASE });
    await wait(Math.max(MIN_HOLD_MS, SCENE_MS - (performance.now() - t0)), id);
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
