// Vaporwave Style Guide - Interactive Effects

document.addEventListener('DOMContentLoaded', () => {
    initGlitchToggle();
    initDemoControls();
    initColorCopy();
    initButtonEffects();
    initScrollAnimations();
    initVHSEffect();
    initParallax();
});

// Glitch Effect Toggle
function initGlitchToggle() {
    const toggle = document.getElementById('glitchToggle');
    if (!toggle) return;

    let glitchEnabled = false;
    let glitchInterval = null;

    toggle.addEventListener('click', () => {
        glitchEnabled = !glitchEnabled;
        toggle.classList.toggle('active', glitchEnabled);

        if (glitchEnabled) {
            startGlitchEffect();
        } else {
            stopGlitchEffect();
        }
    });

    function startGlitchEffect() {
        glitchInterval = setInterval(() => {
            triggerRandomGlitch();
        }, 2000 + Math.random() * 3000);
    }

    function stopGlitchEffect() {
        if (glitchInterval) {
            clearInterval(glitchInterval);
            glitchInterval = null;
        }
        document.body.classList.remove('glitching');
    }

    function triggerRandomGlitch() {
        document.body.classList.add('glitching');

        const style = document.createElement('style');
        style.id = 'glitch-style';
        style.textContent = `
            .glitching {
                animation: heavyGlitch 0.3s ease;
            }
            @keyframes heavyGlitch {
                0% { transform: translate(0); filter: none; }
                20% { transform: translate(-5px, 2px); filter: hue-rotate(90deg); }
                40% { transform: translate(5px, -2px); filter: hue-rotate(-90deg); }
                60% { transform: translate(-3px, -3px); filter: saturate(2); }
                80% { transform: translate(3px, 3px); filter: contrast(1.5); }
                100% { transform: translate(0); filter: none; }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            document.body.classList.remove('glitching');
            const glitchStyle = document.getElementById('glitch-style');
            if (glitchStyle) glitchStyle.remove();
        }, 300);
    }
}

// Demo Screen Controls
function initDemoControls() {
    const vhsSlider = document.getElementById('vhsTracking');
    const glitchSlider = document.getElementById('glitchIntensity');
    const neonSlider = document.getElementById('neonBrightness');
    const demoScreen = document.getElementById('demoScreen');

    if (!demoScreen) return;

    // VHS Tracking Effect
    if (vhsSlider) {
        vhsSlider.addEventListener('input', (e) => {
            const value = e.target.value / 100;
            const scanlines = demoScreen.querySelector('.screen-scanlines');
            if (scanlines) {
                scanlines.style.opacity = value;
            }

            if (value > 0.5) {
                demoScreen.style.transform = `skewX(${(value - 0.5) * 2}deg)`;
            } else {
                demoScreen.style.transform = 'none';
            }
        });
    }

    // Glitch Intensity
    if (glitchSlider) {
        let glitchTimer = null;

        glitchSlider.addEventListener('input', (e) => {
            const value = e.target.value / 100;

            if (glitchTimer) clearInterval(glitchTimer);

            if (value > 0.1) {
                const interval = 5000 - (value * 4500);
                glitchTimer = setInterval(() => {
                    applyScreenGlitch(demoScreen, value);
                }, interval);
            }
        });
    }

    // Neon Brightness
    if (neonSlider) {
        neonSlider.addEventListener('input', (e) => {
            const value = e.target.value / 100;
            demoScreen.style.filter = `brightness(${0.5 + value * 0.8}) saturate(${0.5 + value})`;
        });
    }
}

function applyScreenGlitch(element, intensity) {
    const offsetX = (Math.random() - 0.5) * 20 * intensity;
    const offsetY = (Math.random() - 0.5) * 10 * intensity;
    const hue = Math.random() * 360 * intensity;

    element.style.transition = 'none';
    element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    element.style.filter = `hue-rotate(${hue}deg)`;

    setTimeout(() => {
        element.style.transition = 'all 0.1s ease';
        element.style.transform = 'none';
        element.style.filter = 'none';
    }, 100);
}

// VHS Effect on Whole Page
function initVHSEffect() {
    const overlay = document.querySelector('.vhs-overlay');
    if (!overlay) return;

    setInterval(() => {
        if (Math.random() > 0.95) {
            overlay.style.opacity = '0.1';
            setTimeout(() => {
                overlay.style.opacity = '0.03';
            }, 100);
        }
    }, 500);

    setInterval(() => {
        if (Math.random() > 0.98) {
            document.body.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                document.body.style.transform = 'none';
            }, 50);
        }
    }, 200);
}

// Color Copy Functionality
function initColorCopy() {
    const paletteCards = document.querySelectorAll('.palette-card');
    const toast = document.getElementById('toast');

    paletteCards.forEach(card => {
        card.addEventListener('click', () => {
            const color = card.dataset.color;
            if (!color) return;

            copyToClipboard(color);
            showToast(toast, `${color} COPIED`);

            card.style.boxShadow = '0 0 30px ' + color;
            setTimeout(() => {
                card.style.boxShadow = '';
            }, 300);
        });
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

function showToast(toast, message) {
    if (!toast) return;

    const messageEl = toast.querySelector('.toast-message');
    if (messageEl) {
        messageEl.textContent = message;
    }

    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Button Effects
function initButtonEffects() {
    const neonButtons = document.querySelectorAll('.neon-button');

    neonButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.02)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });

        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            const rect = button.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    if (!document.getElementById('ripple-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ripple-keyframes';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    const chromeButtons = document.querySelectorAll('.chrome-button');
    chromeButtons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.98) translateY(2px)';
        });

        button.addEventListener('mouseup', () => {
            button.style.transform = '';
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.palette-card, .type-card, .vapor-card, .component-group, .guideline-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Parallax Effects
function initParallax() {
    const sun = document.querySelector('.sun');
    const grid = document.querySelector('.retro-grid');
    const bust = document.getElementById('bust');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        if (scrollY < windowHeight) {
            const progress = scrollY / windowHeight;

            if (sun) {
                sun.style.transform = `translateX(-50%) translateY(${progress * 50}px)`;
                sun.style.opacity = 1 - progress * 0.5;
            }

            if (grid) {
                grid.style.opacity = 0.4 - progress * 0.3;
            }

            if (bust) {
                bust.style.transform = `translateY(${-scrollY * 0.3}px)`;
            }

            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollY * 0.4}px)`;
                heroContent.style.opacity = 1 - progress * 0.8;
            }
        }
    });

    document.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (e.clientX - centerX) / centerX;
        const moveY = (e.clientY - centerY) / centerY;

        if (sun && window.scrollY < window.innerHeight) {
            sun.style.transform = `translateX(calc(-50% + ${moveX * 10}px)) translateY(${moveY * 10}px)`;
        }

        if (bust && window.scrollY < window.innerHeight) {
            bust.style.transform = `translate(${moveX * -15}px, ${moveY * -15}px)`;
        }
    });
}

// Typing Effect for Terminal (using textContent for safety)
(function initTypingEffect() {
    const terminalLines = document.querySelectorAll('.info-terminal p');

    terminalLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';

        let charIndex = 0;
        setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    line.textContent = text.substring(0, charIndex + 1);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 30);
        }, index * 500);
    });
})();

// Random Neon Flicker
(function initNeonFlicker() {
    const neonElements = document.querySelectorAll('.neon-text, .section-title, .nav-japanese');

    setInterval(() => {
        neonElements.forEach(el => {
            if (Math.random() > 0.97) {
                el.style.opacity = '0.8';
                setTimeout(() => {
                    el.style.opacity = '1';
                }, 50);
            }
        });
    }, 100);
})();

// Grid Animation Enhancement
(function initGridPulse() {
    const grids = document.querySelectorAll('.retro-grid, .footer-grid');

    grids.forEach(grid => {
        setInterval(() => {
            if (Math.random() > 0.9) {
                grid.style.opacity = '0.5';
                setTimeout(() => {
                    grid.style.opacity = '0.4';
                }, 100);
            }
        }, 2000);
    });
})();

// Japanese Text Hover Effect
(function initJapaneseHover() {
    const jpTexts = document.querySelectorAll('.jp-text');

    jpTexts.forEach(text => {
        text.addEventListener('mouseenter', () => {
            text.style.textShadow = '0 0 20px #01CDFE, 0 0 40px #01CDFE, 0 0 60px #01CDFE';
        });

        text.addEventListener('mouseleave', () => {
            text.style.textShadow = '';
        });
    });
})();

// Keyboard Easter Egg
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        triggerEasterEgg();
    }
});

function triggerEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    const toast = document.getElementById('toast');
    showToast(toast, 'AESTHETIC UNLOCKED');

    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 5000);
}
