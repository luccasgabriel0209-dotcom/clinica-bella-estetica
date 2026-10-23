const phone = '5511978850967';
const defaultMessage = 'Olá! Vim pelo site da Clínica Bella Estética e gostaria de mais informações sobre os procedimentos.';
const makeWhatsAppLink = message => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = makeWhatsAppLink(defaultMessage);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});
document.querySelectorAll('[data-service]').forEach(link => {
  link.href = makeWhatsAppLink(`Olá! Vim pelo site da Clínica Bella Estética e gostaria de saber mais sobre ${link.dataset.service}.`);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
  mobileNav.hidden = true;
}
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  toggle.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
  mobileNav.hidden = expanded;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

document.querySelector('#year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const sections = document.querySelectorAll('.intro-body,.doctor-copy,.section-heading,.service,.manifesto-inner,.reviews-top,.review-themes,.gallery-heading,.journey-heading,.steps,.faq-grid,.final-inner');
  sections.forEach(section => section.dataset.reveal = '');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
  }, { threshold: .08, rootMargin: '0px 0px 40px 0px' });
  document.body.classList.add('reveal-ready');
  sections.forEach(section => observer.observe(section));
}

