/**
 * Corporate SaaS Effects
 * Animated counters, smooth reveals, professional micro-interactions
 */

(function() {
    'use strict';

    // Animated Counter
    function initAnimatedCounters() {
        const counters = document.querySelectorAll('.stat__number');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseFloat(counter.dataset.target);
                    const isDecimal = target % 1 !== 0;
                    const duration = 2000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Ease out cubic
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = easeOut * target;

                        counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = isDecimal ? target.toFixed(1) : target;
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

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
                        toast.querySelector('span').textContent = `Copied: ${color}`;
                        toast.classList.add('show');
                        setTimeout(() => toast.classList.remove('show'), 2000);
                    }
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    }

    // Scroll Reveal
    function initScrollReveal() {
        const elements = document.querySelectorAll('.section__container, .card, .pricing-card, .guideline, .alert');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, index * 50);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
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

    // Pricing Toggle
    function initPricingToggle() {
        const toggle = document.getElementById('pricingToggle');
        const amounts = document.querySelectorAll('.pricing-card__amount');

        if (toggle) {
            toggle.addEventListener('change', () => {
                const isAnnual = toggle.checked;

                amounts.forEach(amount => {
                    const monthly = amount.dataset.monthly;
                    const annual = amount.dataset.annual;

                    if (monthly && annual) {
                        // Animate the change
                        amount.style.transform = 'scale(0.8)';
                        amount.style.opacity = '0';

                        setTimeout(() => {
                            amount.textContent = isAnnual ? annual : monthly;
                            amount.style.transform = 'scale(1)';
                            amount.style.opacity = '1';
                        }, 150);
                    }
                });
            });
        }
    }

    // Button Ripple Effect
    function initButtonRipple() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out forwards;
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
                    transform: scale(40);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Input Focus Effects
    function initInputEffects() {
        const inputs = document.querySelectorAll('.input, .select');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                const group = input.closest('.input-group');
                if (group) {
                    group.style.transform = 'translateY(-2px)';
                    group.style.transition = 'transform 0.2s ease';
                }
            });

            input.addEventListener('blur', () => {
                const group = input.closest('.input-group');
                if (group) {
                    group.style.transform = '';
                }
            });
        });
    }

    // Card Hover Effects
    function initCardEffects() {
        const cards = document.querySelectorAll('.card, .pricing-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add subtle glow based on card type
                const icon = card.querySelector('.card__icon');
                if (icon) {
                    if (icon.classList.contains('card__icon--blue')) {
                        card.style.boxShadow = '0 20px 40px -10px rgba(59, 130, 246, 0.2)';
                    } else if (icon.classList.contains('card__icon--green')) {
                        card.style.boxShadow = '0 20px 40px -10px rgba(16, 185, 129, 0.2)';
                    } else if (icon.classList.contains('card__icon--purple')) {
                        card.style.boxShadow = '0 20px 40px -10px rgba(168, 85, 247, 0.2)';
                    }
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = '';
            });
        });
    }

    // Smooth Scroll for Navigation
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

    // Navigation Background on Scroll
    function initNavScroll() {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
            } else {
                nav.style.boxShadow = '';
            }
        });
    }

    // Badge Animation
    function initBadgeAnimation() {
        const badges = document.querySelectorAll('.badge, .hero__badge, .pricing-card__badge');

        badges.forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                badge.style.transform = 'scale(1.05)';
                badge.style.transition = 'transform 0.2s ease';
            });

            badge.addEventListener('mouseleave', () => {
                badge.style.transform = '';
            });
        });
    }

    // Alert Dismiss (example functionality)
    function initAlertDismiss() {
        const alerts = document.querySelectorAll('.alert');

        alerts.forEach(alert => {
            alert.style.cursor = 'pointer';
            alert.title = 'Click to dismiss';

            alert.addEventListener('click', () => {
                alert.style.opacity = '0';
                alert.style.transform = 'translateX(20px)';
                alert.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

                setTimeout(() => {
                    alert.style.display = 'none';
                }, 300);
            });
        });
    }

    // Feature Card Icon Animation
    function initIconAnimation() {
        const icons = document.querySelectorAll('.card__icon');

        icons.forEach(icon => {
            const card = icon.closest('.card');

            if (card) {
                card.addEventListener('mouseenter', () => {
                    icon.style.transform = 'scale(1.1) rotate(-5deg)';
                    icon.style.transition = 'transform 0.3s ease';
                });

                card.addEventListener('mouseleave', () => {
                    icon.style.transform = '';
                });
            }
        });
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        initAnimatedCounters();
        initColorCopy();
        initScrollReveal();
        initPricingToggle();
        initButtonRipple();
        initInputEffects();
        initCardEffects();
        initSmoothScroll();
        initNavScroll();
        initBadgeAnimation();
        initAlertDismiss();
        initIconAnimation();
    });

})();
