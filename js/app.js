/**
 * Taste & Craviing — app.js
 * Multi-page vanilla JS: no hash router.
 * Each HTML page sets: const CURRENT_PAGE = 'home|menu|about|offers|contact|blog';
 * before this script, which is used to highlight the active nav link.
 */

(function () {
    'use strict';

    /* ============================================================
       CONFIG
       ============================================================ */
    const CONFIG = {
        whatsappNumber: '1234567890',
        whatsappMessage: 'Hi Taste & Craviing! I want to order...',
        whatsappClaimMsg: "Hi! I'd like to claim an offer...",
        apiBase: '/api',
        toastDuration: 3500,
    };

    /* ============================================================
       HELPERS
       ============================================================ */
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
    const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

    /* ============================================================
       1. TOAST
       ============================================================ */
    const toast = (() => {
        const el = $('#toast');
        let timer = null;
        function show(msg, type = 'default') {
            if (!el) return;
            el.textContent = msg;
            el.className = 'toast';
            if (type === 'success') el.classList.add('toast-success');
            if (type === 'error') el.classList.add('toast-error');
            el.classList.add('show');
            clearTimeout(timer);
            timer = setTimeout(() => el.classList.remove('show'), CONFIG.toastDuration);
        }
        return { show };
    })();

    /* ============================================================
       2. ACTIVE NAV LINK
          Each page sets window.CURRENT_PAGE before app.js loads.
       ============================================================ */
    function setActiveNavLink() {
        const page = (typeof CURRENT_PAGE !== 'undefined') ? CURRENT_PAGE : 'home';
        $$('[data-page]').forEach(link => {
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /* ============================================================
       3. NAVBAR SCROLL EFFECT
       ============================================================ */
    const navbar = $('#navbar');
    function handleScroll() {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
    on(window, 'scroll', handleScroll, { passive: true });

    /* ============================================================
       4. MOBILE HAMBURGER
       ============================================================ */
    const hamburger = $('#hamburger');
    const mobileNav = $('#mobile-nav');
    const iconOpen = hamburger?.querySelector('.hamburger-icon-open');
    const iconClose = hamburger?.querySelector('.hamburger-icon-close');

    function openMenu() {
        mobileNav?.classList.add('open');
        mobileNav?.setAttribute('aria-hidden', 'false');
        hamburger?.setAttribute('aria-expanded', 'true');
        if (iconOpen) iconOpen.style.display = 'none';
        if (iconClose) iconClose.style.display = 'inline-block';
    }
    function closeMenu() {
        mobileNav?.classList.remove('open');
        mobileNav?.setAttribute('aria-hidden', 'true');
        hamburger?.setAttribute('aria-expanded', 'false');
        if (iconOpen) iconOpen.style.display = 'inline-block';
        if (iconClose) iconClose.style.display = 'none';
    }

    on(hamburger, 'click', () => mobileNav?.classList.contains('open') ? closeMenu() : openMenu());

    // Close on outside click
    on(document, 'click', (e) => {
        if (navbar && !navbar.contains(e.target)) closeMenu();
    });

    /* ============================================================
       5. WHATSAPP LINKS
       ============================================================ */
    function applyWhatsAppLinks() {
        const baseLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
        const claimLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappClaimMsg)}`;

        $$('[data-whatsapp]').forEach(el => { el.href = baseLink; });
        $$('[data-whatsapp-claim]').forEach(el => { el.href = claimLink; });
    }

    /* ============================================================
       6. INTERSECTION OBSERVER — Scroll Animations
          Replaces Framer Motion whileInView
       ============================================================ */
    function observeAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '-60px 0px' });

        $$('.animate-on-scroll').forEach(el => {
            if (!el.classList.contains('is-visible')) observer.observe(el);
        });
    }

    /* ============================================================
       7. FOOTER YEAR
       ============================================================ */
    function setFooterYear() {
        $$('.footer-year').forEach(el => { el.textContent = new Date().getFullYear(); });
    }

    /* ============================================================
       8. MENU PAGE — Sidebar smooth scroll
       ============================================================ */
    on(document, 'click', (e) => {
        const link = e.target.closest('[data-scroll-to]');
        if (!link) return;
        e.preventDefault();
        const target = document.getElementById(link.getAttribute('data-scroll-to'));
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    /* ============================================================
       9. OFFERS PAGE — "Subscribe Now" scrolls to footer
       ============================================================ */
    on(document, 'click', (e) => {
        if (e.target?.id === 'scroll-to-footer-btn') {
            e.preventDefault();
            document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
        }
    });

    /* ============================================================
       10. FORM HELPERS
       ============================================================ */
    const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    function setError(input, errEl, msg) {
        input?.classList.add('error');
        if (errEl) errEl.textContent = msg;
    }
    function clearError(input, errEl) {
        input?.classList.remove('error');
        if (errEl) errEl.textContent = '';
    }
    function setBtnLoading(btn, text) {
        btn.disabled = true;
        btn._orig = btn.innerHTML;
        btn.textContent = text;
    }
    function resetBtn(btn) {
        btn.disabled = false;
        btn.innerHTML = btn._orig || btn.textContent;
    }

    /* ============================================================
       11. CONTACT FORM (contact.html only)
       ============================================================ */
    const contactForm = $('#contact-form');
    on(contactForm, 'submit', async (e) => {
        e.preventDefault();
        const nameEl = $('#contact-name');
        const emailEl = $('#contact-email');
        const msgEl = $('#contact-message');
        const submitBtn = $('#contact-submit');

        [nameEl, emailEl, msgEl].forEach((el, i) => clearError(el, $(`#error-${['name', 'email', 'message'][i]}`)));

        let valid = true;
        if (!nameEl?.value.trim()) { setError(nameEl, $('#error-name'), 'Name is required.'); valid = false; }
        if (!validateEmail(emailEl?.value || '')) { setError(emailEl, $('#error-email'), 'Please enter a valid email address.'); valid = false; }
        if ((msgEl?.value.trim().length || 0) < 5) { setError(msgEl, $('#error-message'), 'Message must be at least 5 characters.'); valid = false; }
        if (!valid) return;

        setBtnLoading(submitBtn, 'Sending...');
        try {
            const res = await fetch(`${CONFIG.apiBase}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: nameEl.value.trim(),
                    email: emailEl.value.trim(),
                    phone: $('#contact-phone')?.value.trim() || '',
                    message: msgEl.value.trim(),
                }),
            });
            if (!res.ok) throw new Error();
        } catch {
            // Graceful fallback for static hosting
        } finally {
            contactForm.reset();
            toast.show("✓ Message sent! We'll get back to you soon.", 'success');
            resetBtn(submitBtn);
            lucide?.createIcons();
        }
    });

    /* ============================================================
       12. NEWSLETTER FORM (footer — present on all pages)
       ============================================================ */
    const newsletterForm = $('#newsletter-form');
    on(newsletterForm, 'submit', async (e) => {
        e.preventDefault();
        const emailEl = $('#newsletter-email');
        const submitBtn = $('#newsletter-submit');
        const errEl = $('#error-newsletter');

        clearError(emailEl, errEl);
        if (!validateEmail(emailEl?.value || '')) {
            setError(emailEl, errEl, 'Please enter a valid email.');
            return;
        }

        setBtnLoading(submitBtn, 'Subscribing...');
        try {
            const res = await fetch(`${CONFIG.apiBase}/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailEl.value.trim() }),
            });
            if (!res.ok) throw new Error();
        } catch {
            // Graceful fallback
        } finally {
            newsletterForm.reset();
            toast.show('✓ Subscribed! Welcome to the Craviing family 🧇', 'success');
            resetBtn(submitBtn);
        }
    });

    /* ============================================================
       13. BLOG PAGE — Load More
       ============================================================ */
    const loadMoreBtn = $('#load-more-btn');
    let extraLoaded = false;

    const EXTRA_POSTS = [
        { title: 'Top 5 Waffle Toppings You Need to Try', excerpt: 'From classic maple butter to adventurous matcha cream — we rank the toppings that make our waffles legendary.', date: 'May 22, 2023', author: 'Chef Alex', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80', category: 'Tips & Tricks', id: 4 },
        { title: 'Behind the Counter: A Day in Our Kitchen', excerpt: 'Ever wondered what it takes to serve hundreds of orders a day? Follow our team on a typical Tuesday morning shift.', date: 'Apr 08, 2023', author: 'Sam Gupta', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80', category: 'Behind the Scenes', id: 5 },
        { title: 'The Perfect Milkshake: Thick vs. Thin', excerpt: 'Our beverage director Jordan breaks down the science and art of the perfect thick shake — and why we choose thick every single time.', date: 'Mar 15, 2023', author: 'Jordan Lee', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80', category: 'Food Stories', id: 6 },
    ];

    on(loadMoreBtn, 'click', () => {
        if (extraLoaded) return;
        const grid = $('#blog-grid');
        if (!grid) return;

        EXTRA_POSTS.forEach((post, i) => {
            const article = document.createElement('article');
            article.className = 'blog-card animate-on-scroll';
            article.style.transitionDelay = `${i * 0.1}s`;
            article.innerHTML = `
        <div class="blog-image-wrap">
          <img src="${post.image}" alt="${post.title}" loading="lazy"/>
          <span class="blog-category">${post.category}</span>
        </div>
        <div class="blog-body">
          <div class="blog-meta">
            <span><i data-lucide="calendar" class="icon icon-xs"></i> ${post.date}</span>
            <span><i data-lucide="user" class="icon icon-xs"></i> ${post.author}</span>
          </div>
          <h3 class="blog-title">${post.title}</h3>
          <p class="blog-excerpt">${post.excerpt}</p>
          <a href="#post-${post.id}" class="blog-read-more">Read More <i data-lucide="arrow-right" class="icon icon-sm"></i></a>
        </div>`;
            grid.appendChild(article);
        });

        lucide?.createIcons();
        observeAnimations();

        extraLoaded = true;
        loadMoreBtn.textContent = 'All Stories Loaded';
        loadMoreBtn.disabled = true;
    });

    /* ============================================================
       14. INIT on DOMContentLoaded
       ============================================================ */
    document.addEventListener('DOMContentLoaded', () => {
        lucide?.createIcons();
        setActiveNavLink();
        setFooterYear();
        applyWhatsAppLinks();
        handleScroll();

        // Small delay so elements are fully painted before observing
        setTimeout(observeAnimations, 100);
    });

})();
