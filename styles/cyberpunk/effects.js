/**
 * Cyberpunk Effects
 * Matrix rain, glitch effects, RGB split, typing animation, neon pulse
 */

(function() {
    'use strict';

    // Matrix Rain Effect
    function initMatrixRain() {
        const canvas = document.getElementById('matrixRain');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resize();
        window.addEventListener('resize', resize);

        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        function draw() {
            ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00f0ff';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = charArray[Math.floor(Math.random() * charArray.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(char, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        }

        let animationId;
        function animate() {
            draw();
            animationId = requestAnimationFrame(animate);
        }

        animate();

        // Toggle handler
        const toggle = document.getElementById('toggleMatrix');
        if (toggle) {
            toggle.addEventListener('change', () => {
                canvas.classList.toggle('hidden', !toggle.checked);
            });
        }
    }

    // Typing Animation
    function initTypingAnimation() {
        const element = document.getElementById('tagline');
        if (!element) return;

        const text = 'The future is now. Jack in or get left behind.';
        let index = 0;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50 + Math.random() * 50);
            }
        }

        // Start after a delay
        setTimeout(type, 1000);
    }

    // System Time
    function initSystemTime() {
        const timeElement = document.getElementById('systemTime');
        if (!timeElement) return;

        function updateTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        }

        updateTime();
        setInterval(updateTime, 1000);
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
                        const textElement = toast.querySelector('.copy-toast__text');
                        if (textElement) {
                            textElement.textContent = `COPIED: ${color.toUpperCase()}`;
                        }
                        toast.classList.add('show');
                        setTimeout(() => toast.classList.remove('show'), 2000);
                    }
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    }

    // Glitch Effect Toggle
    function initGlitchToggle() {
        const toggle = document.getElementById('toggleGlitch');

        if (toggle) {
            toggle.addEventListener('change', () => {
                document.body.classList.toggle('glitch-active', toggle.checked);
            });
        }
    }

    // Scanlines Toggle
    function initScanlinesToggle() {
        const toggle = document.getElementById('toggleScanlines');
        const overlay = document.querySelector('.glitch-overlay');

        if (toggle && overlay) {
            toggle.addEventListener('change', () => {
                overlay.classList.toggle('hidden', !toggle.checked);
            });
        }
    }

    // Neon Pulse Toggle
    function initNeonPulseToggle() {
        const toggle = document.getElementById('toggleNeonPulse');

        if (toggle) {
            toggle.addEventListener('change', () => {
                document.body.classList.toggle('no-pulse', !toggle.checked);
            });
        }
    }

    // RGB Split on Hover
    function initRGBSplit() {
        const cards = document.querySelectorAll('.card, .color-card, .btn--glitch');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.animation = 'rgbSplit 0.1s ease';
            });

            card.addEventListener('animationend', () => {
                card.style.animation = '';
            });
        });

        // Add RGB split keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rgbSplit {
                0%, 100% {
                    text-shadow: none;
                    filter: none;
                }
                25% {
                    text-shadow: -2px 0 #ff2a6d, 2px 0 #00f0ff;
                    filter: hue-rotate(10deg);
                }
                50% {
                    text-shadow: 2px 0 #ff2a6d, -2px 0 #00f0ff;
                    filter: hue-rotate(-10deg);
                }
                75% {
                    text-shadow: -1px 0 #ff2a6d, 1px 0 #00f0ff;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Scroll Reveal
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

    // Terminal Demo
    function initTerminalDemo() {
        const terminal = document.getElementById('terminalOutput');
        if (!terminal) return;

        // Random glitch effect on terminal
        setInterval(() => {
            if (Math.random() > 0.95) {
                terminal.style.textShadow = '2px 0 #ff2a6d, -2px 0 #00f0ff';
                setTimeout(() => {
                    terminal.style.textShadow = '';
                }, 100);
            }
        }, 500);
    }

    // Button Hover Sound (optional visual feedback)
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                // Create scan line effect
                const scanline = document.createElement('div');
                scanline.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.8), transparent);
                    animation: scanBtn 0.3s ease-out forwards;
                    pointer-events: none;
                `;

                btn.style.position = 'relative';
                btn.appendChild(scanline);

                scanline.addEventListener('animationend', () => {
                    scanline.remove();
                });
            });
        });

        // Add scan animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scanBtn {
                0% { top: 0; opacity: 1; }
                100% { top: 100%; opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Card Flicker Effect
    function initCardFlicker() {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            // Random subtle flicker
            setInterval(() => {
                if (Math.random() > 0.98) {
                    card.style.opacity = '0.95';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                }
            }, 100);
        });
    }

    // HUD Bar Animation
    function initHUDAnimation() {
        const bars = document.querySelectorAll('.hud-bar__fill');

        bars.forEach(bar => {
            const originalWidth = bar.style.width;
            let currentWidth = parseInt(originalWidth);

            setInterval(() => {
                // Subtle fluctuation
                const fluctuation = (Math.random() - 0.5) * 4;
                const newWidth = Math.max(0, Math.min(100, currentWidth + fluctuation));
                bar.style.width = newWidth + '%';

                // Occasionally jump back to original
                if (Math.random() > 0.95) {
                    bar.style.width = originalWidth;
                }
            }, 500);
        });
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        initMatrixRain();
        initTypingAnimation();
        initSystemTime();
        initColorCopy();
        initGlitchToggle();
        initScanlinesToggle();
        initNeonPulseToggle();
        initRGBSplit();
        initScrollReveal();
        initTerminalDemo();
        initButtonEffects();
        initCardFlicker();
        initHUDAnimation();
    });

})();
