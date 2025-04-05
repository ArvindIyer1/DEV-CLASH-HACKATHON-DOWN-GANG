// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Button click pulse effect
document.addEventListener('DOMContentLoaded', () => {
  const exploreBtn = document.querySelector('.btn-primary');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', function () {
      this.classList.add('pulse');
      setTimeout(() => this.classList.remove('pulse'), 500);
    });
  }
});
