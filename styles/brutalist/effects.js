/**
 * Brutalist Effects
 * Harsh cursor trails, jarring interactions, intentionally broken animations
 */

(function() {
    'use strict';

    // Cursor Trail Effect
    function initCursorTrail() {
        const trail = document.getElementById('cursorTrail');
        if (!trail) return;

        const dots = [];
        const numDots = 10;

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                width: ${20 - i * 2}px;
                height: ${20 - i * 2}px;
                background: ${i % 2 === 0 ? '#ff0000' : '#0000ff'};
                pointer-events: none;
                z-index: 9999;
                transition: all ${0.1 + i * 0.02}s;
            `;
            trail.appendChild(dot);
            dots.push(dot);
        }

        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animate() {
            dots.forEach((dot, index) => {
                const delay = index * 0.05;
                setTimeout(() => {
                    dot.style.left = mouseX - parseInt(dot.style.width) / 2 + 'px';
                    dot.style.top = mouseY - parseInt(dot.style.height) / 2 + 'px';
                }, delay * 1000);
            });
            requestAnimationFrame(animate);
        }

        animate();

        // Only show on desktop
        if (!window.matchMedia('(hover: hover)').matches) {
            trail.style.display = 'none';
        }
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
                        toast.textContent = `COPIED: ${color.toUpperCase()} !!!`;
                        toast.classList.add('show');

                        // Shake effect
                        toast.style.animation = 'shake 0.2s ease';
                        setTimeout(() => {
                            toast.style.animation = '';
                        }, 200);

                        setTimeout(() => toast.classList.remove('show'), 1500);
                    }
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });

        // Add shake animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(-50%) translateY(0); }
                25% { transform: translateX(-50%) translateY(0) rotate(-3deg); }
                75% { transform: translateX(-50%) translateY(0) rotate(3deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Demo Box Interactions
    function initDemoBox() {
        const box = document.getElementById('demoBox');
        const rotateBtn = document.getElementById('rotateBtn');
        const colorBtn = document.getElementById('colorBtn');
        const sizeBtn = document.getElementById('sizeBtn');
        const resetBtn = document.getElementById('resetBtn');

        if (!box) return;

        let rotation = 0;
        let colorIndex = 0;
        let scale = 1;

        const colors = ['#000000', '#ff0000', '#0000ff', '#ffff00', '#808080'];
        const bgColors = ['#ffffff', '#ffff00', '#ff0000', '#0000ff', '#000000'];
        const textColors = ['#ffffff', '#000000', '#ffffff', '#ffffff', '#ff0000'];

        box.addEventListener('click', () => {
            // Random glitch effect
            box.style.transform = `rotate(${Math.random() * 10 - 5}deg) scale(${0.9 + Math.random() * 0.2})`;
            setTimeout(() => {
                box.style.transform = `rotate(${rotation}deg) scale(${scale})`;
            }, 100);
        });

        if (rotateBtn) {
            rotateBtn.addEventListener('click', () => {
                rotation += 45;
                box.style.transform = `rotate(${rotation}deg) scale(${scale})`;
            });
        }

        if (colorBtn) {
            colorBtn.addEventListener('click', () => {
                colorIndex = (colorIndex + 1) % colors.length;
                box.style.background = bgColors[colorIndex];
                box.style.color = textColors[colorIndex];
                box.style.borderColor = colors[colorIndex];
            });
        }

        if (sizeBtn) {
            sizeBtn.addEventListener('click', () => {
                scale = scale >= 2 ? 0.5 : scale + 0.25;
                box.style.transform = `rotate(${rotation}deg) scale(${scale})`;
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                rotation = 0;
                colorIndex = 0;
                scale = 1;
                box.style.transform = 'rotate(0) scale(1)';
                box.style.background = '#000000';
                box.style.color = '#ffffff';
                box.style.borderColor = '#000000';
            });
        }
    }

    // Checkbox toggle
    function initCheckboxes() {
        const checkboxes = document.querySelectorAll('.checkbox');

        checkboxes.forEach(checkbox => {
            const input = checkbox.querySelector('input');
            const box = checkbox.querySelector('.checkbox__box');

            if (input && box) {
                function updateBox() {
                    box.textContent = input.checked ? '[X]' : '[ ]';
                }

                input.addEventListener('change', updateBox);
                updateBox();
            }
        });
    }

    // Random glitch on elements
    function initRandomGlitch() {
        const glitchTargets = document.querySelectorAll('.card, .btn, .tag');

        glitchTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                // Random chance of glitch
                if (Math.random() > 0.7) {
                    el.style.transform = 'skewX(-3deg)';
                    el.style.filter = 'hue-rotate(180deg)';

                    setTimeout(() => {
                        el.style.transform = '';
                        el.style.filter = '';
                    }, 100);
                }
            });
        });
    }

    // Jarring scroll effect
    function initJarringScroll() {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const direction = currentScroll > lastScroll ? 1 : -1;

            // Occasionally add a small jarring offset
            if (Math.random() > 0.98) {
                document.body.style.transform = `translateX(${direction * 2}px)`;
                setTimeout(() => {
                    document.body.style.transform = '';
                }, 50);
            }

            lastScroll = currentScroll;
        });
    }

    // Make cards tilt randomly on hover
    function initCardTilt() {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const randomRotation = (Math.random() - 0.5) * 4;
                card.style.transform = `rotate(${randomRotation}deg) translate(-4px, -4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // Button click feedback
    function initButtonFeedback() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Brief color inversion
                const originalBg = btn.style.background;
                const originalColor = btn.style.color;

                btn.style.background = btn.style.color || '#ffffff';
                btn.style.color = originalBg || '#000000';

                setTimeout(() => {
                    btn.style.background = originalBg;
                    btn.style.color = originalColor;
                }, 100);
            });
        });
    }

    // Text scramble on hover for titles
    function initTextScramble() {
        const titles = document.querySelectorAll('.section__title');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';

        titles.forEach(title => {
            const originalText = title.textContent;

            title.addEventListener('mouseenter', () => {
                let iterations = 0;

                const interval = setInterval(() => {
                    title.textContent = originalText
                        .split('')
                        .map((char, index) => {
                            if (index < iterations) {
                                return originalText[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('');

                    iterations += 1 / 2;

                    if (iterations >= originalText.length) {
                        clearInterval(interval);
                        title.textContent = originalText;
                    }
                }, 30);
            });
        });
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        initCursorTrail();
        initColorCopy();
        initDemoBox();
        initCheckboxes();
        initRandomGlitch();
        initJarringScroll();
        initCardTilt();
        initButtonFeedback();
        initTextScramble();
    });

})();
