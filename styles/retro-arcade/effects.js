/**
 * Retro Arcade Effects
 * CRT scanlines, 8-bit sounds, neon glow, and interactive demos
 */

(function() {
    'use strict';

    // Audio Context for 8-bit sounds
    let audioContext = null;

    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    }

    // 8-bit sound generator
    function playSound(type) {
        const ctx = initAudio();
        if (!ctx || !document.getElementById('toggleSound')?.checked) return;

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        switch(type) {
            case 'select':
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(440, ctx.currentTime);
                oscillator.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.2);
                break;

            case 'coin':
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(987.77, ctx.currentTime);
                oscillator.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.3);
                break;

            case 'copy':
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
                oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.05);
                oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + 0.15);
                break;
        }
    }

    // Scanlines toggle
    function initScanlines() {
        const toggle = document.getElementById('toggleScanlines');
        const scanlines = document.querySelector('.scanlines');

        if (toggle && scanlines) {
            toggle.addEventListener('change', () => {
                scanlines.classList.toggle('hidden', !toggle.checked);
            });
        }
    }

    // Screen flicker toggle
    function initFlicker() {
        const toggle = document.getElementById('toggleFlicker');

        if (toggle) {
            toggle.addEventListener('change', () => {
                document.body.classList.toggle('flicker', toggle.checked);
            });
        }
    }

    // Neon glow toggle
    function initGlow() {
        const toggle = document.getElementById('toggleGlow');

        if (toggle) {
            toggle.addEventListener('change', () => {
                document.body.classList.toggle('no-glow', !toggle.checked);
            });
        }
    }

    // Color copy functionality
    function initColorCopy() {
        const colorCards = document.querySelectorAll('.color-card');
        const toast = document.getElementById('copyToast');

        colorCards.forEach(card => {
            card.addEventListener('click', async () => {
                const color = card.dataset.color;
                try {
                    await navigator.clipboard.writeText(color);
                    playSound('copy');

                    if (toast) {
                        toast.textContent = `COPIED: ${color}`;
                        toast.classList.add('show');
                        setTimeout(() => toast.classList.remove('show'), 2000);
                    }
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    }

    // Button sound effects
    function initButtonSounds() {
        const buttons = document.querySelectorAll('[data-sound]');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const soundType = btn.dataset.sound;
                playSound(soundType);
            });
        });
    }

    // Score counter demo
    function initScoreDemo() {
        const addBtn = document.getElementById('addScore');
        const scoreDisplay = document.getElementById('scoreValue');
        let score = 0;

        if (addBtn && scoreDisplay) {
            addBtn.addEventListener('click', () => {
                score += 1000;
                scoreDisplay.textContent = score.toString().padStart(7, '0');

                // Add flash effect
                scoreDisplay.style.color = '#ffff00';
                scoreDisplay.style.textShadow = '0 0 20px #ffff00, 0 0 40px #ffff00';

                setTimeout(() => {
                    scoreDisplay.style.color = '';
                    scoreDisplay.style.textShadow = '';
                }, 200);
            });
        }
    }

    // Scroll reveal animation
    function initScrollReveal() {
        const sections = document.querySelectorAll('.section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

    // Random glitch effect on title
    function initGlitchEffect() {
        const glitchElement = document.querySelector('.glitch');

        if (glitchElement) {
            setInterval(() => {
                if (Math.random() > 0.95) {
                    glitchElement.style.animation = 'none';
                    glitchElement.offsetHeight; // Trigger reflow
                    glitchElement.style.animation = '';
                }
            }, 100);
        }
    }

    // Hover sound for interactive elements
    function initHoverEffects() {
        const interactiveElements = document.querySelectorAll('.card, .color-card, .btn');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (document.getElementById('toggleSound')?.checked) {
                    const ctx = initAudio();
                    if (!ctx) return;

                    const oscillator = ctx.createOscillator();
                    const gainNode = ctx.createGain();

                    oscillator.connect(gainNode);
                    gainNode.connect(ctx.destination);

                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
                    gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

                    oscillator.start(ctx.currentTime);
                    oscillator.stop(ctx.currentTime + 0.05);
                }
            });
        });
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        initScanlines();
        initFlicker();
        initGlow();
        initColorCopy();
        initButtonSounds();
        initScoreDemo();
        initScrollReveal();
        initGlitchEffect();
        initHoverEffects();

        // Initialize audio context on first user interaction
        document.addEventListener('click', () => initAudio(), { once: true });
    });

})();
