// Capacity line ("Taking on 3 new clients in December."). Change it here and nowhere else.
// It shows only until the end of that month, then hides itself, so the page never carries a stale number.
// PLACEHOLDER: 3 is not confirmed. Rob sets the real number before this goes live.
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
  panel.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'center' });
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
