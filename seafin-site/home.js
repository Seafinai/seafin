const reduce = matchMedia('(prefers-reduced-motion: reduce)');

// Light catches the anodized plate as the pointer moves.
const plate = document.querySelector('.plate');
if (plate && matchMedia('(pointer: fine)').matches && !reduce.matches) {
  let frame = 0, x = 0, y = 0;
  plate.addEventListener('pointermove', (e) => {
    const r = plate.getBoundingClientRect();
    x = e.clientX - r.left;
    y = e.clientY - r.top;
    if (!frame) frame = requestAnimationFrame(() => {
      plate.style.setProperty('--mx', `${x}px`);
      plate.style.setProperty('--my', `${y}px`);
      frame = 0;
    });
  });
}

// Every "Book a free call" link lands on the form on the plate.
const form = document.getElementById('request');
const nameField = document.getElementById('f-name');
document.querySelectorAll('a[href="#request"]').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  form.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'center' });
  nameField.focus({ preventScroll: true });
}));

const status = form.querySelector('.band-status');
const button = form.querySelector('button[type="submit"]');
const LABEL = button.textContent;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  button.disabled = true;
  button.textContent = 'Sending…';
  status.className = 'band-status';
  status.textContent = '';
  try {
    const res = await fetch('/api/request', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (!res.ok) throw new Error(String(res.status));
    form.querySelectorAll('input').forEach((i) => { i.disabled = true; });
    button.textContent = 'Sent';
    status.textContent = 'Request logged. Rob will reply by email.';
    status.classList.add('is-ok');
  } catch {
    status.innerHTML = 'That didn’t send. Email <a href="mailto:hello@seafin.ai">hello@seafin.ai</a> instead.';
    status.classList.add('is-error');
    button.disabled = false;
    button.textContent = LABEL;
  }
});
