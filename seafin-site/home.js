const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const panel = document.getElementById('book');
const form = document.getElementById('request');
const nameField = document.getElementById('f-name');

// Every "Book a free call" link lands on the form, cursor in the first field.
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
    status.textContent = 'Request sent. We’ll reply by email.';
  } catch {
    status.innerHTML = 'That didn’t send. Email <a href="mailto:hello@seafin.ai">hello@seafin.ai</a> instead.';
    status.classList.add('is-error');
    button.disabled = false;
    button.textContent = LABEL;
  }
});
