/* ─── Reveal on scroll ─── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in-view'), i * 60);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

/* ─── Sticky nav ─── */
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 150) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
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
navLinksContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navToggle.classList.remove('open');
    navLinksContainer.classList.remove('open');
  }
});

/* ─── Gallery filter ─── */
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (f === 'all' || item.dataset.category === f) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

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
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

/* Gallery cards */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    if (item.dataset.img) {
      openLightbox(item.dataset.img, item.dataset.title, item.dataset.desc);
    } else if (item.dataset.link) {
      window.open(item.dataset.link, '_blank', 'noopener');
    }
  });
});

/* Event images */
document.querySelectorAll('.event-img').forEach(item => {
  item.addEventListener('click', () => {
    openLightbox(item.dataset.img, item.dataset.title, item.dataset.desc);
  });
});

/* Media post */
document.querySelectorAll('.media-post img').forEach(img => {
  img.addEventListener('click', () => {
    openLightbox(img.dataset.img, img.dataset.title, img.dataset.desc);
  });
});

/* ─── Logo lightbox ─── */
const logoLightbox = document.getElementById('logoLightbox');
const logoLightboxImg = document.getElementById('logoLightboxImg');
const logoLightboxTitle = document.getElementById('logoLightboxTitle');
const logoLightboxDesc = document.getElementById('logoLightboxDesc');
const logoLightboxClose = document.getElementById('logoLightboxClose');

function openLogoLightbox(img, title, desc) {
  logoLightboxImg.src = img;
  logoLightboxImg.alt = title;
  logoLightboxTitle.textContent = title;
  logoLightboxDesc.textContent = desc;
  logoLightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLogoLightbox() {
  logoLightbox.classList.remove('open');
  document.body.style.overflow = '';
  logoLightboxImg.src = '';
}
logoLightboxClose.addEventListener('click', closeLogoLightbox);
logoLightbox.addEventListener('click', (e) => { if (e.target === logoLightbox) closeLogoLightbox(); });

document.querySelectorAll('.logo-item').forEach(item => {
  item.addEventListener('click', () => {
    openLogoLightbox(item.dataset.img, item.dataset.title, item.dataset.desc);
  });
});

/* ─── Keyboard close ─── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeLogoLightbox();
  }
});