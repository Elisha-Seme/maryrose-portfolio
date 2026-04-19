lucide.createIcons();

// Navbar
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 60);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const menuIcon  = document.getElementById('menuIcon');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuIcon.setAttribute('data-lucide', open ? 'x' : 'menu');
  lucide.createIcons();
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuIcon.setAttribute('data-lucide', 'menu');
  lucide.createIcons();
}));

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.glass-card, .about-text, .tl-body, .hero-stats, .hero-cta'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Skill bars (trigger once visible)
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.style.getPropertyValue('--w') || getComputedStyle(bar).getPropertyValue('--w');
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// Also trigger via CSS custom property
document.querySelectorAll('.skill-bar').forEach(bar => {
  const w = bar.style.cssText.match(/--w:\s*(\S+)/)?.[1];
  if (w) {
    bar.dataset.width = w;
    bar.style.width = '0';
  }
});
const cssPropObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar').forEach(bar => {
        if (bar.dataset.width) bar.style.width = bar.dataset.width;
      });
      cssPropObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
if (skillsSection) cssPropObserver.observe(skillsSection);

// Contact form
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name    = document.getElementById('name').value;
  const email   = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const status  = document.getElementById('formStatus');

  window.location.href =
    `mailto:maryrosenatiwoi@gmail.com` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

  status.textContent = 'Your email client has opened. Thank you for reaching out!';
  this.reset();
  setTimeout(() => { status.textContent = ''; }, 6000);
});

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.fontWeight = a.getAttribute('href') === `#${current}` ? '700' : '';
  });
}, { passive: true });
