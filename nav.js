// nav.js — shared across all docs pages

// ── Active nav link ──
document.querySelectorAll('.nav-links a, .sidebar-link').forEach(a => {
  if (a.href === window.location.href || a.href === window.location.href.replace(/\/$/, '')) {
    a.classList.add('active');
  }
});

// ── Copy code buttons ──
function copyCode(btn) {
  const block = btn.closest('.code-block');
  const code  = block.querySelector('pre code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = 'Copied ✓';
    btn.style.color = '#4ade80';
    setTimeout(() => { btn.textContent = 'Copy'; btn.style.color = ''; }, 2000);
  });
}

// ── Endpoint accordion ──
document.querySelectorAll('.endpoint-header').forEach(header => {
  header.addEventListener('click', () => {
    const card = header.closest('.endpoint-card');
    const wasOpen = card.classList.contains('open');
    document.querySelectorAll('.endpoint-card.open').forEach(c => c.classList.remove('open'));
    if (!wasOpen) card.classList.add('open');
  });
});

// ── On this page highlight ──
const sections = document.querySelectorAll('h2[id], h3[id]');
const otpLinks = document.querySelectorAll('.on-this-page a');

if (sections.length && otpLinks.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        otpLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.on-this-page a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
}
