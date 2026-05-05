/* Cybernet Solutions — Interactivity */
(function () {
    'use strict';

    // ---------- Mobile menu ----------
    const menuToggle = document.getElementById('menuToggle');
    const overlay = document.getElementById('overlay');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function setMenu(open) {
        document.body.classList.toggle('menu-open', open);
        if (menuToggle) menuToggle.setAttribute('aria-expanded', String(open));
        if (mobileNav) mobileNav.setAttribute('aria-hidden', String(!open));
    }
    if (menuToggle) menuToggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
    if (overlay) overlay.addEventListener('click', () => setMenu(false));
    mobileLinks.forEach(l => l.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

    // ---------- Header scroll state ----------
    const header = document.getElementById('siteHeader');
    function onScroll() {
        if (!header) return;
        if (window.scrollY > 8) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---------- Active nav on scroll ----------
    const sections = ['top', 'about', 'services', 'contact']
        .map(id => document.getElementById(id))
        .filter(Boolean);
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    function setActive(id) {
        navLinks.forEach(a => {
            const href = a.getAttribute('href');
            a.classList.toggle('active', href === '#' + id);
        });
    }
    if ('IntersectionObserver' in window && sections.length) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { threshold: 0.4, rootMargin: '-20% 0px -55% 0px' });
        sections.forEach(s => obs.observe(s));
    }

    // ---------- Reveal on scroll ----------
    const revealTargets = document.querySelectorAll(
        '.section-head, .service-card, .pillar, .stat-card, .testimonial, .timeline-item, .growth-card, .founder-copy, .founder-visual, .about-copy, .about-stats, .cta-card, .hero-copy, .hero-visual'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));
    if ('IntersectionObserver' in window) {
        const revealObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        revealTargets.forEach(el => revealObs.observe(el));
    } else {
        revealTargets.forEach(el => el.classList.add('visible'));
    }

    // ---------- Stat counters ----------
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    function animateCount(el) {
        const target = parseInt(el.dataset.count, 10);
        const original = el.textContent;
        const suffix = original.replace(/[0-9]/g, '');
        if (isNaN(target)) return;
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            const value = Math.floor(target * eased);
            el.textContent = value + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = original;
        }
        requestAnimationFrame(tick);
    }
    if ('IntersectionObserver' in window) {
        const countObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    countObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        statNumbers.forEach(el => countObs.observe(el));
    }

    // ---------- Smooth scroll offset ----------
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const headerH = header ? header.offsetHeight : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - headerH - 10;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // ---------- Contact form ----------
    const form = document.getElementById('contactForm');
    const formNote = document.getElementById('formNote');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const data = new FormData(form);
            const name = data.get('name');
            const email = data.get('email');
            if (!name || !email) {
                form.reportValidity();
                return;
            }
            const subject = encodeURIComponent('New contact from Cybernet Solutions');
            const body = encodeURIComponent(
                `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company') || '-'}\n\nMessage:\n${data.get('message') || '-'}`
            );
            window.location.href = `mailto:cybernetsolutionss@hotmail.com?subject=${subject}&body=${body}`;
            if (formNote) {
                formNote.hidden = false;
                form.reset();
                setTimeout(() => { formNote.hidden = true; }, 6000);
            }
        });
    }

    // ---------- Subscribe form ----------
    const sub = document.getElementById('subscribeForm');
    if (sub) {
        sub.addEventListener('submit', e => {
            e.preventDefault();
            const input = sub.querySelector('input');
            if (!input.value) return;
            input.value = '';
            input.placeholder = 'Thanks for subscribing!';
        });
    }

    // ---------- Footer year ----------
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ---------- Language toggle (placeholder) ----------
    const langToggle = document.getElementById('langToggle');
    const langCurrent = document.getElementById('langCurrent');
    if (langToggle && langCurrent) {
        langToggle.addEventListener('click', () => {
            langCurrent.textContent = langCurrent.textContent === 'EN' ? 'ES' : 'EN';
        });
    }
})();
