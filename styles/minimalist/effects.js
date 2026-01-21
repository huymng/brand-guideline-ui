/**
 * Minimalist Effects
 * Subtle animations, smooth scrolling, and micro-interactions
 */

(function() {
    'use strict';

    // Color Copy
    function initColorCopy() {
        const colorCards = document.querySelectorAll('.color-card');
        const toast = document.getElementById('copyToast');

        colorCards.forEach(card => {
            card.addEventListener('click', async () => {
                const color = card.dataset.color;
                try {
                    await navigator.clipboard.writeText(color);

                    if (toast) {
                        toast.textContent = `Copied: ${color}`;
                        toast.classList.add('show');
                        setTimeout(() => toast.classList.remove('show'), 2000);
                    }
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    }

    // Scroll Reveal - subtle fade in
    function initScrollReveal() {
        const elements = document.querySelectorAll('.section, .card, .demo-card, .guideline');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Add revealed styles
        const style = document.createElement('style');
        style.textContent = `
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Smooth hover for cards
    function initCardHover() {
        const cards = document.querySelectorAll('.card, .demo-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.3s ease';
            });
        });
    }

    // Input focus effects
    function initInputEffects() {
        const inputs = document.querySelectorAll('.input, .select');

        inputs.forEach(input => {
            const parent = input.closest('.input-group');

            input.addEventListener('focus', () => {
                if (parent) {
                    parent.style.transform = 'translateY(-2px)';
                    parent.style.transition = 'transform 0.2s ease';
                }
            });

            input.addEventListener('blur', () => {
                if (parent) {
                    parent.style.transform = 'translateY(0)';
                }
            });
        });
    }

    // Button ripple effect (minimal version)
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.4s ease-out forwards;
                    pointer-events: none;
                    left: ${x}px;
                    top: ${y}px;
                `;

                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);

                ripple.addEventListener('animationend', () => {
                    ripple.remove();
                });
            });
        });

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(100);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Parallax on hero (subtle)
    function initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight * 0.5);
            }
        });
    }

    // Type scale interaction
    function initTypeScale() {
        const items = document.querySelectorAll('.type-scale__item');

        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = '#f5f5f5';
                item.style.transition = 'background-color 0.2s ease';
            });

            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = '';
            });
        });
    }

    // Quote animation
    function initQuoteAnimation() {
        const quote = document.querySelector('.quote');
        if (!quote) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    quote.style.opacity = '0';
                    quote.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        quote.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        quote.style.opacity = '1';
                        quote.style.transform = 'translateY(0)';
                    }, 100);

                    observer.unobserve(quote);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(quote);
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        initColorCopy();
        initScrollReveal();
        initCardHover();
        initInputEffects();
        initButtonEffects();
        initSmoothScroll();
        initParallax();
        initTypeScale();
        initQuoteAnimation();
    });

})();
