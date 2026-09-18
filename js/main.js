/* ─── Sticky nav ─── */
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 180) current = s.id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ─── Mobile menu ─── */
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});
navLinksContainer.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    navToggle.classList.remove('open');
    navLinksContainer.classList.remove('open');
  }
});

/* ─── Profile menu ─── */
const profile = document.getElementById('profile');
const profileMenu = document.getElementById('profileMenu');
profile.addEventListener('click', e => {
  e.stopPropagation();
  profileMenu.classList.toggle('open');
});
document.addEventListener('click', () => profileMenu.classList.remove('open'));

/* ─── Lightbox ─── */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(img, title, desc) {
  lightboxImg.src = img;
  lightboxImg.alt = title;
  lightboxTitle.textContent = title;
  lightboxDesc.textContent = desc;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

document.querySelectorAll('.card[data-img]').forEach(card => {
  card.addEventListener('click', () => {
    openLightbox(card.dataset.img, card.dataset.title, card.dataset.desc);
  });
});

/* ─── Hero "More Info" ─── */
const heroMoreInfo = document.getElementById('heroMoreInfo');
const heroImg = document.querySelector('[data-hero-img]');
if (heroMoreInfo && heroImg) {
  heroMoreInfo.addEventListener('click', () => {
    openLightbox(heroImg.dataset.heroImg, heroImg.dataset.heroTitle, heroImg.dataset.heroDesc);
  });
}
/* hero backdrop opens lightbox too */
const heroBackdrop = document.querySelector('.hero-backdrop img');
if (heroBackdrop) {
  heroBackdrop.addEventListener('click', e => {
    if (e.target === heroBackdrop) {
      openLightbox(heroBackdrop.dataset.heroImg, heroBackdrop.dataset.heroTitle, heroBackdrop.dataset.heroDesc);
    }
  });
}

/* ─── Row horizontal scroll ─── */
document.querySelectorAll('[data-row]').forEach(row => {
  const track = row.querySelector('[data-row-track]');
  const prev = row.querySelector('[data-row-prev]');
  const next = row.querySelector('[data-row-next]');

  const updateArrows = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const atStart = track.scrollLeft <= 8;
    const atEnd = track.scrollLeft >= maxScroll - 8;
    if (prev) prev.disabled = atStart;
    if (next) next.disabled = atEnd || maxScroll <= 0;
  };

  const scrollBy = dir => {
    const card = track.querySelector('.card');
    const amount = (card ? card.offsetWidth + 8 : 260) * 2.5;
    track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  if (prev) prev.addEventListener('click', () => scrollBy(-1));
  if (next) next.addEventListener('click', () => scrollBy(1));
  track.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);
  updateArrows();
});