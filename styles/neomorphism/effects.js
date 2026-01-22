// Neomorphism Style Guide - Interactive Effects

document.addEventListener('DOMContentLoaded', () => {
    initLightSourceTracking();
    initDynamicShadows();
    initShadowControls();
    initDarkModeToggle();
    initSliderUpdates();
    initColorCopy();
    initProgressCircle();
    initButtonEffects();
    initScrollAnimations();
});

// Light Source Tracking
function initLightSourceTracking() {
    const lightSource = document.getElementById('lightSource');
    if (!lightSource) return;

    let targetX = 20;
    let targetY = 20;
    let currentX = 20;
    let currentY = 20;

    document.addEventListener('mousemove', (e) => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Normalize position (0-1)
        const normalizedX = e.clientX / windowWidth;
        const normalizedY = e.clientY / windowHeight;

        // Position light indicator
        targetX = 20 + normalizedX * 60;
        targetY = 20 + normalizedY * 60;

        // Update CSS custom properties for shadow direction
        updateGlobalShadowDirection(normalizedX, normalizedY);
    });

    // Smooth animation loop
    function animateLightSource() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        lightSource.style.left = currentX + 'px';
        lightSource.style.top = currentY + 'px';

        requestAnimationFrame(animateLightSource);
    }

    animateLightSource();
}

// Update shadow direction based on cursor
function updateGlobalShadowDirection(normalizedX, normalizedY) {
    // Calculate shadow offset based on light position
    // Light from top-left = shadows go bottom-right (default)
    const shadowX = (normalizedX - 0.3) * 30;
    const shadowY = (normalizedY - 0.3) * 30;

    document.documentElement.style.setProperty(
        '--shadow-offset-x',
        shadowX + 'px'
    );
    document.documentElement.style.setProperty(
        '--shadow-offset-y',
        shadowY + 'px'
    );
}

// Dynamic Shadows for Demo Elements
function initDynamicShadows() {
    const demoPanel = document.getElementById('demoPanel');
    const dynamicElements = document.querySelectorAll('.neu-dynamic');

    if (!demoPanel || dynamicElements.length === 0) return;

    let settings = {
        distance: 15,
        blur: 30,
        intensity: 30
    };

    demoPanel.addEventListener('mousemove', (e) => {
        const rect = demoPanel.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate offset from center
        const offsetX = (e.clientX - rect.left - centerX) / centerX;
        const offsetY = (e.clientY - rect.top - centerY) / centerY;

        // Calculate shadow direction (opposite of light source)
        const shadowX = -offsetX * settings.distance;
        const shadowY = -offsetY * settings.distance;

        dynamicElements.forEach(elem => {
            updateElementShadow(elem, shadowX, shadowY, settings);
        });
    });

    // Store settings reference for controls
    window.shadowSettings = settings;
}

function updateElementShadow(element, offsetX, offsetY, settings) {
    const lightColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--shadow-light').trim();
    const darkColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--shadow-dark').trim();

    const distance = settings.distance;
    const blur = settings.blur;

    // Create dual shadows
    const lightShadow = `${-offsetX}px ${-offsetY}px ${blur}px ${lightColor}`;
    const darkShadow = `${offsetX}px ${offsetY}px ${blur}px ${darkColor}`;

    element.style.boxShadow = `${lightShadow}, ${darkShadow}`;
}

// Shadow Controls
function initShadowControls() {
    const distanceSlider = document.getElementById('shadowDistance');
    const blurSlider = document.getElementById('shadowBlur');
    const intensitySlider = document.getElementById('shadowIntensity');

    if (!distanceSlider || !blurSlider || !intensitySlider) return;

    distanceSlider.addEventListener('input', (e) => {
        if (window.shadowSettings) {
            window.shadowSettings.distance = parseInt(e.target.value);
        }
    });

    blurSlider.addEventListener('input', (e) => {
        if (window.shadowSettings) {
            window.shadowSettings.blur = parseInt(e.target.value);
        }
    });

    intensitySlider.addEventListener('input', (e) => {
        const intensity = parseInt(e.target.value) / 100;
        document.documentElement.style.setProperty('--shadow-intensity', intensity);
    });
}

// Dark Mode Toggle
function initDarkModeToggle() {
    const toggle = document.getElementById('lightToggle');
    if (!toggle) return;

    const icon = toggle.querySelector('.toggle-icon');
    let isDark = false;

    toggle.addEventListener('click', () => {
        isDark = !isDark;
        document.body.classList.toggle('dark-mode', isDark);

        if (icon) {
            icon.textContent = isDark ? '🌙' : '☀️';
        }

        // Add pressed state briefly
        toggle.classList.add('pressed');
        setTimeout(() => toggle.classList.remove('pressed'), 150);
    });
}

// Slider Value Updates
function initSliderUpdates() {
    const demoSlider = document.getElementById('demoSlider');
    const sliderValue = document.getElementById('sliderValue');

    if (!demoSlider || !sliderValue) return;

    demoSlider.addEventListener('input', (e) => {
        sliderValue.textContent = e.target.value;
    });

    // All sliders show value on hover
    const allSliders = document.querySelectorAll('.neu-slider');
    allSliders.forEach(slider => {
        slider.addEventListener('input', function() {
            // Find associated value display if any
            const container = this.closest('.neu-slider-container');
            if (container) {
                const valueDisplay = container.querySelector('.slider-value');
                if (valueDisplay) {
                    valueDisplay.textContent = this.value;
                }
            }
        });
    });
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
            showToast(toast, `Copied: ${color}`);

            // Visual feedback
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
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

// Progress Circle Animation
function initProgressCircle() {
    const progressCircles = document.querySelectorAll('.neu-progress-circle');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const progress = parseInt(circle.dataset.progress) || 0;
                const fill = circle.querySelector('.fill');

                if (fill) {
                    // Calculate stroke-dashoffset
                    // Full circle = 283 (2 * PI * 45)
                    const offset = 283 - (283 * progress / 100);
                    fill.style.strokeDashoffset = offset;
                }

                observer.unobserve(circle);
            }
        });
    }, { threshold: 0.5 });

    progressCircles.forEach(circle => observer.observe(circle));
}

// Button Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.neu-button:not(.pressed)');

    buttons.forEach(button => {
        // Active state
        button.addEventListener('mousedown', () => {
            button.classList.add('pressed');
        });

        button.addEventListener('mouseup', () => {
            button.classList.remove('pressed');
        });

        button.addEventListener('mouseleave', () => {
            button.classList.remove('pressed');
        });

        // Touch support
        button.addEventListener('touchstart', () => {
            button.classList.add('pressed');
        }, { passive: true });

        button.addEventListener('touchend', () => {
            button.classList.remove('pressed');
        }, { passive: true });
    });

    // Toggle switches animation
    const toggles = document.querySelectorAll('.neu-toggle input');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const track = this.nextElementSibling;
            if (track) {
                track.style.transition = 'all 0.15s ease';
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.palette-card, .type-card, .component-group, .guideline-card, .neu-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Floating Shapes Parallax
(function initShapesParallax() {
    const shapes = document.querySelectorAll('.neu-shape');
    if (shapes.length === 0) return;

    document.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (e.clientX - centerX) / centerX;
        const moveY = (e.clientY - centerY) / centerY;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 10;
            const x = moveX * speed;
            const y = moveY * speed;

            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
})();

// Keyboard Accessibility
document.addEventListener('keydown', (e) => {
    // Toggle dark mode with 'D' key
    if (e.key === 'd' || e.key === 'D') {
        const toggle = document.getElementById('lightToggle');
        if (toggle && document.activeElement === document.body) {
            toggle.click();
        }
    }
});

// Input Focus Effects
(function initInputFocus() {
    const inputs = document.querySelectorAll('.neu-input, .neu-search input');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            const parent = this.closest('.neu-search') || this;
            parent.style.boxShadow = `
                inset -5px -5px 15px var(--shadow-light),
                inset 5px 5px 15px var(--shadow-dark),
                0 0 0 2px var(--accent-primary)
            `;
        });

        input.addEventListener('blur', function() {
            const parent = this.closest('.neu-search') || this;
            parent.style.boxShadow = '';
        });
    });
})();
