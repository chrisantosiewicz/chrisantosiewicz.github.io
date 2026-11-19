(() => {
  'use strict';
  document.querySelectorAll('.year').forEach(n => { n.textContent = new Date().getFullYear(); });
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .08 });
  document.querySelectorAll('.section-heading,.about-grid,.contact-row,.project-layout').forEach(node => {
    node.classList.add('reveal');
    observer.observe(node);
  });
})();
