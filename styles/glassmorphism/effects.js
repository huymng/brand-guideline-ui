/**
 * Glassmorphism Effects
 * Light refraction, parallax blur, floating elements
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

    // Light Refraction Effect on Demo Glass
    function initLightRefraction() {
        const demoGlass = document.getElementById('demoGlass');
        const shine = document.getElementById('glassShine');

        if (!demoGlass || !shine) return;

        demoGlass.addEventListener('mousemove', (e) => {
            const rect = demoGlass.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            shine.style.left = x + 'px';
            shine.style.top = y + 'px';
            shine.style.opacity = '1';
        });

        demoGlass.addEventListener('mouseleave', () => {
            shine.style.opacity = '0';
        });
    }

    // Blur and Opacity Sliders
    function initDemoControls() {
        const blurSlider = document.getElementById('blurSlider');
        const opacitySlider = document.getElementById('opacitySlider');
        const blurValue = document.getElementById('blurValue');
        const opacityValue = document.getElementById('opacityValue');
        const demoGlass = document.getElementById('demoGlass');

        if (blurSlider && demoGlass) {
            blurSlider.addEventListener('input', () => {
                const value = blurSlider.value;
                demoGlass.style.backdropFilter = `blur(${value}px)`;
                demoGlass.style.webkitBackdropFilter = `blur(${value}px)`;
                if (blurValue) blurValue.textContent = `${value}px`;
            });
        }

        if (opacitySlider && demoGlass) {
            opacitySlider.addEventListener('input', () => {
                const value = opacitySlider.value;
                demoGlass.style.background = `rgba(255, 255, 255, 0.${value})`;
                if (opacityValue) opacityValue.textContent = `${value}%`;
            });
        }
    }

    // Scroll Reveal with Glass Effect
    function initScrollReveal() {
        const elements = document.querySelectorAll('.section, .card, .guideline');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Parallax Background Blobs
    function initParallaxBlobs() {
        const blobs = document.querySelectorAll('.bg-blob');

        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 20;
                const xOffset = (x - 0.5) * speed;
                const yOffset = (y - 0.5) * speed;

                blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
    }

    // Card Hover Glow Effect
    function initCardGlow() {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.background = `
                    radial-gradient(
                        circle at ${x}px ${y}px,
                        rgba(255, 255, 255, 0.4) 0%,
                        rgba(255, 255, 255, 0.25) 50%,
                        rgba(255, 255, 255, 0.25) 100%
                    )
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.background = 'rgba(255, 255, 255, 0.25)';
            });
        });
    }

    // Floating Shapes Animation Enhancement
    function initFloatingShapes() {
        const shapes = document.querySelectorAll('.floating-shape');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.1;
                const yPos = scrolled * speed;
                shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
            });
        });
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
                    animation: glassRipple 0.6s ease-out forwards;
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
            @keyframes glassRipple {
                to {
                    transform: scale(30);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Glass Border Shimmer on Hover
    function initBorderShimmer() {
        const glassElements = document.querySelectorAll('.glass');

        glassElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                el.style.transition = 'border-color 0.3s ease';
            });

            el.addEventListener('mouseleave', () => {
                el.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            });
        });
    }

    // Smooth Scroll
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

    // Input Focus Glow
    function initInputGlow() {
        const inputs = document.querySelectorAll('.input, .select');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
            });

            input.addEventListener('blur', () => {
                input.style.boxShadow = '';
            });
        });
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        initColorCopy();
        initLightRefraction();
        initDemoControls();
        initScrollReveal();
        initParallaxBlobs();
        initCardGlow();
        initFloatingShapes();
        initButtonRipple();
        initBorderShimmer();
        initSmoothScroll();
        initInputGlow();
    });

})();
