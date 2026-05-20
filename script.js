/* ═══════════════════════════════════════════════════════════
   FLOOD SEGMENTATION DASHBOARD — NEUROBRUTALISM SCRIPT
   Glitch effects, Scanline, Tab switching, Stepped counters
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar Scroll Effect ─────────────────────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── Mobile Nav Toggle ────────────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  // ── Active Nav Link ──────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observer.observe(s));

  // ── Reveal on Scroll (stepped) ────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => revealObserver.observe(el));

  // ── Counter Animation (stepped for brutalist feel) ────────
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = (el.dataset.decimals || 0) * 1;
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const stepped = Math.floor(progress * 20) / 20; // 20 steps
      const current = target * stepped;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // ── EDA Tab Switcher ─────────────────────────────────────
  const edaTabs = document.querySelectorAll('.eda-tab');
  const edaItems = document.querySelectorAll('.eda-item');

  edaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      edaTabs.forEach(t => t.classList.remove('active'));
      edaItems.forEach(i => i.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  // ── IoU Bar Animation (stepped) ─────────────────────────
  const iouBars = document.querySelectorAll('.iou-bar-fill');
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  iouBars.forEach(bar => barObserver.observe(bar));

  // ── Random Glitch Effect on Hero ─────────────────────────
  const hero = document.querySelector('.hero h1.glitch');
  if (hero) {
    setInterval(() => {
      if (Math.random() > 0.85) {
        hero.style.transform = `translate(${(Math.random()-0.5)*6}px, ${(Math.random()-0.5)*3}px)`;
        hero.style.textShadow = `${(Math.random()-0.5)*4}px 0 #ED1E28, ${(Math.random()-0.5)*-4}px 0 #B6252A`;
        setTimeout(() => {
          hero.style.transform = '';
          hero.style.textShadow = '';
        }, 100 + Math.random() * 100);
      }
    }, 200);
  }

});
