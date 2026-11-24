// Capacity line ("Taking on 3 new clients in December."). Change it here and nowhere else.
// It shows only until the end of that month, then hides itself, so the page never carries a stale number.
// Rob confirmed 3 for December on 2026-11-21. clients: 0 turns the line off.
const CAPACITY = { clients: 3, month: '2026-12' };
(() => {
  const [y, m] = CAPACITY.month.split('-').map(Number);
  if (!CAPACITY.clients || Date.now() >= Date.UTC(y, m, 1, 8)) return; // 8:00 UTC = midnight Pacific
  const name = new Date(Date.UTC(y, m - 1, 15)).toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  const text = `Taking on ${CAPACITY.clients} new client${CAPACITY.clients === 1 ? '' : 's'} in ${name}.`;
  document.querySelectorAll('[data-capacity]').forEach((el) => { el.textContent = text; el.hidden = false; });
})();

const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const panel = document.getElementById('book');
const form = document.getElementById('request');
const nameField = document.getElementById('f-name');

// Every "Request a free call" link lands on the form, cursor in the first field.
document.querySelectorAll('a[href="#book"]').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  // On a phone the form is taller than the screen, so line its first field up under the header
  // instead of centering the panel, which would hide the "Name" label behind the header.
  // offsetTop is used because the panel may still be mid-way through its rise-in transform.
  const behavior = reduce.matches ? 'auto' : 'smooth';
  if (panel.offsetHeight > innerHeight - 100) {
    let top = 0;
    for (let el = form; el; el = el.offsetParent) top += el.offsetTop;
    scrollTo({ top: top - document.querySelector('.nav').offsetHeight - 20, behavior });
  } else panel.scrollIntoView({ behavior, block: 'center' });
  nameField.focus({ preventScroll: true });
}));

const status = form.querySelector('.status');
const button = form.querySelector('button[type="submit"]');
const LABEL = button.textContent;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  button.disabled = true;
  button.textContent = 'Sending…';
  status.className = 'status';
  status.textContent = '';
  try {
    const res = await fetch('/api/request', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (!res.ok) throw new Error(String(res.status));
    form.querySelectorAll('input, textarea').forEach((el) => { el.disabled = true; });
    button.hidden = true;
    panel.classList.add('is-sent');
    status.textContent = 'Request sent. We’ll reply by email, or you can pick a time now.';
    const book = document.createElement('a');
    book.className = 'btn btn-primary';
    book.href = 'book.html';
    book.textContent = 'Pick a time';
    status.after(book);
  } catch {
    status.innerHTML = 'That didn’t send. Email <a href="mailto:hello@seafin.ai">hello@seafin.ai</a> instead.';
    status.classList.add('is-error');
    button.disabled = false;
    button.textContent = LABEL;
  }
});

// On phones the six drawings sit in one swipe row. Numbered buttons under the row jump straight
// to each one, and the lit number follows the swipe. Without this script the row still swipes.
const row = document.querySelector('.builds');
if (row && 'IntersectionObserver' in window) {
  const cards = [...row.children];
  const pager = document.createElement('div');
  pager.className = 'pager';
  pager.setAttribute('role', 'group');
  pager.setAttribute('aria-label', 'Jump to one of the six jobs');
  const buttons = cards.map((card, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = String(i + 1).padStart(2, '0');
    b.setAttribute('aria-label', card.querySelector('h3').textContent);
    b.addEventListener('click', () => card.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', inline: 'start', block: 'nearest' }));
    pager.append(b);
    return b;
  });
  buttons[0].setAttribute('aria-current', 'true');
  row.after(pager);
  const seen = new Set();
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) e.isIntersecting ? seen.add(e.target) : seen.delete(e.target);
    const at = cards.findIndex((c) => seen.has(c));
    if (at < 0) return;
    buttons.forEach((b, i) => (i === at ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current')));
  }, { root: row, threshold: 0.6 });
  cards.forEach((c) => io.observe(c));
}
