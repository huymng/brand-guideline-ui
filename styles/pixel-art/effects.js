/**
 * Pixel Art Effects
 * Sprite editor, pixelated cursor, chunky animations
 */

(function() {
    'use strict';

    // Color copy functionality
    function initColorCopy() {
        const colorCards = document.querySelectorAll('.color-card');
        const toast = document.getElementById('copyToast');

        colorCards.forEach(card => {
            card.addEventListener('click', async () => {
                const color = card.dataset.color;
                try {
                    await navigator.clipboard.writeText(color);

                    if (toast) {
                        toast.textContent = `COPIED: ${color.toUpperCase()}`;
                        toast.classList.add('show');
                        setTimeout(() => toast.classList.remove('show'), 2000);
                    }
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    }

    // Mini sprite editor
    function initSpriteEditor() {
        const grid = document.getElementById('spriteGrid');
        const palette = document.getElementById('colorPalette');
        const clearBtn = document.getElementById('clearSprite');

        if (!grid || !palette) return;

        let currentColor = '#1a1c2c';
        let isDrawing = false;

        // Create 8x8 grid
        for (let i = 0; i < 64; i++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';

            pixel.addEventListener('mousedown', (e) => {
                e.preventDefault();
                isDrawing = true;
                pixel.style.background = currentColor;
            });

            pixel.addEventListener('mouseenter', () => {
                if (isDrawing) {
                    pixel.style.background = currentColor;
                }
            });

            pixel.addEventListener('touchstart', (e) => {
                e.preventDefault();
                pixel.style.background = currentColor;
            });

            grid.appendChild(pixel);
        }

        document.addEventListener('mouseup', () => {
            isDrawing = false;
        });

        // Palette selection
        const paletteColors = palette.querySelectorAll('.palette-color');
        paletteColors.forEach(btn => {
            btn.addEventListener('click', () => {
                paletteColors.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentColor = btn.dataset.color;
            });
        });

        // Clear button
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                const pixels = grid.querySelectorAll('.pixel');
                pixels.forEach(pixel => {
                    pixel.style.background = '';
                });
            });
        }
    }

    // Character animation demo
    function initCharacterDemo() {
        const character = document.getElementById('pixelCharacter');
        const idleBtn = document.getElementById('animIdle');
        const walkBtn = document.getElementById('animWalk');
        const jumpBtn = document.getElementById('animJump');

        if (!character) return;

        let currentAnimation = null;

        function stopAnimation() {
            if (currentAnimation) {
                character.style.animation = 'none';
                character.offsetHeight; // Trigger reflow
            }
        }

        function idle() {
            stopAnimation();
            character.style.animation = 'idle 1s steps(2) infinite';
            currentAnimation = 'idle';
        }

        function walk() {
            stopAnimation();
            character.style.animation = 'walk 0.4s steps(4) infinite';
            currentAnimation = 'walk';
        }

        function jump() {
            stopAnimation();
            character.style.animation = 'jump 0.5s steps(3) forwards';
            currentAnimation = 'jump';

            setTimeout(() => {
                idle();
            }, 500);
        }

        // Add CSS animations dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes idle {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
            }

            @keyframes walk {
                0% { transform: translateX(0) translateY(0); }
                25% { transform: translateX(4px) translateY(-2px); }
                50% { transform: translateX(8px) translateY(0); }
                75% { transform: translateX(12px) translateY(-2px); }
                100% { transform: translateX(16px) translateY(0); }
            }

            @keyframes jump {
                0% { transform: translateY(0); }
                33% { transform: translateY(-24px); }
                66% { transform: translateY(-16px); }
                100% { transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);

        if (idleBtn) idleBtn.addEventListener('click', idle);
        if (walkBtn) walkBtn.addEventListener('click', walk);
        if (jumpBtn) jumpBtn.addEventListener('click', jump);

        // Start with idle animation
        idle();
    }

    // Pixelated cursor (optional, can be intensive)
    function initPixelCursor() {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: #f4f4f4;
            pointer-events: none;
            z-index: 10000;
            mix-blend-mode: difference;
            transition: none;
        `;

        // Only add custom cursor on desktop
        if (window.matchMedia('(hover: hover)').matches) {
            document.body.appendChild(cursor);
            document.body.style.cursor = 'none';

            document.addEventListener('mousemove', (e) => {
                // Snap to pixel grid (4px)
                const x = Math.floor(e.clientX / 4) * 4;
                const y = Math.floor(e.clientY / 4) * 4;
                cursor.style.left = x + 'px';
                cursor.style.top = y + 'px';
            });

            document.addEventListener('mouseleave', () => {
                cursor.style.display = 'none';
            });

            document.addEventListener('mouseenter', () => {
                cursor.style.display = 'block';
            });
        }
    }

    // Scroll reveal with chunky animation
    function initScrollReveal() {
        const sections = document.querySelectorAll('.section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Chunky 4-step reveal
                    let step = 0;
                    const steps = [0.25, 0.5, 0.75, 1];

                    const interval = setInterval(() => {
                        entry.target.style.opacity = steps[step];
                        entry.target.style.transform = `translateY(${(4 - step) * 8}px)`;
                        step++;

                        if (step >= steps.length) {
                            clearInterval(interval);
                        }
                    }, 50);
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(32px)';
            observer.observe(section);
        });
    }

    // Button press effect
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(btn => {
            btn.addEventListener('mousedown', () => {
                btn.style.transform = 'translate(2px, 2px)';
            });

            btn.addEventListener('mouseup', () => {
                btn.style.transform = '';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // Card hover effects
    function initCardEffects() {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Add pixel sparkle effect
                const sparkle = document.createElement('div');
                sparkle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #ffcd75;
                    top: 8px;
                    right: 8px;
                    animation: sparkle 0.3s steps(3) forwards;
                `;
                card.style.position = 'relative';
                card.appendChild(sparkle);

                setTimeout(() => sparkle.remove(), 300);
            });
        });

        // Add sparkle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes sparkle {
                0% { opacity: 1; transform: scale(1); }
                50% { opacity: 1; transform: scale(2); }
                100% { opacity: 0; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    // Progress bar animation
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress__fill');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const targetWidth = fill.style.width;

                    // Reset and animate
                    fill.style.width = '0';
                    fill.style.transition = 'none';

                    setTimeout(() => {
                        // Chunky step animation
                        const steps = 10;
                        const targetPercent = parseInt(targetWidth);
                        let currentStep = 0;

                        const interval = setInterval(() => {
                            currentStep++;
                            fill.style.width = (targetPercent / steps * currentStep) + '%';

                            if (currentStep >= steps) {
                                clearInterval(interval);
                            }
                        }, 50);
                    }, 100);

                    observer.unobserve(fill);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observer.observe(bar));
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        initColorCopy();
        initSpriteEditor();
        initCharacterDemo();
        initPixelCursor();
        initScrollReveal();
        initButtonEffects();
        initCardEffects();
        initProgressBars();
    });

})();
